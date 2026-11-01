/**
 * بوابة الجنة - محرك القرآن الكريم التفاعلي وتكرار التحفيظ الذكي للأطفال والكبار
 */

const RawhQuran = {
  currentSurahNumber: 1,
  selectedReciterId: 'alafasy', // الشيخ مشاري العفاسي كافتراضي عالي الموثوقية
  repeatTarget: 3, // تكرار 3 مرات افتراضياً
  currentRepeatCount: 0,
  fontSize: 22,
  quranAudio: null,
  isPlaying: false,

  init() {
    this.quranAudio = new Audio();
    this.bindAudioEvents();
    this.renderSurahList();
    this.bindEvents();
  },

  bindAudioEvents() {
    this.quranAudio.addEventListener('ended', () => {
      this.currentRepeatCount++;
      const counterEl = document.getElementById('quran-repeat-live-badge');

      if (this.repeatTarget === -1 || this.currentRepeatCount < this.repeatTarget) {
        // الاستمرار في التكرار
        if (counterEl) {
          const totalStr = this.repeatTarget === -1 ? 'دائم ♾️' : this.repeatTarget;
          counterEl.innerText = `التكرار: ${this.currentRepeatCount + 1} من ${totalStr}`;
        }
        this.quranAudio.currentTime = 0;
        this.quranAudio.play();
      } else {
        // انتهى التكرار بنجاح!
        this.isPlaying = false;
        this.updatePlayBtnDom(false);
        if (counterEl) counterEl.innerText = 'تم التحفيظ بنجاح! أحسنت 🌟';
        if (window.RawhGarden) {
          RawhGarden.playWaterSound();
          RawhStorage.addXP(20, 'تحفيظ سورة مباركة');
        }
      }
    });

    this.quranAudio.addEventListener('error', () => {
      console.warn('Quran audio stream error, fallback synth');
      if (window.RawhPlayer) {
        RawhPlayer.fallbackSyntheticPeaceAudio("تلاوة مباركة");
      }
    });
  },

  bindEvents() {
    // شريط البحث في السور
    const searchInput = document.getElementById('quran-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        this.renderSurahList(query);
      });
    }

    // زر تكبير وتصغير الخط
    const fontPlus = document.getElementById('btn-quran-font-plus');
    const fontMinus = document.getElementById('btn-quran-font-minus');
    if (fontPlus) {
      fontPlus.addEventListener('click', () => {
        if (this.fontSize < 36) {
          this.fontSize += 2;
          this.updateReaderFontSize();
        }
      });
    }
    if (fontMinus) {
      fontMinus.addEventListener('click', () => {
        if (this.fontSize > 16) {
          this.fontSize -= 2;
          this.updateReaderFontSize();
        }
      });
    }

    // أزرار تكرار التحفيظ
    document.querySelectorAll('.btn-repeat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-repeat-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = parseInt(btn.getAttribute('data-repeat'));
        this.repeatTarget = val;
        this.currentRepeatCount = 0;
        const counterEl = document.getElementById('quran-repeat-live-badge');
        if (counterEl) {
          counterEl.innerText = val === -1 ? 'الوضع: تكرار دائم ♾️' : `الوضع: تكرار ${val} مرات`;
        }
      });
    });

    // قائمة المقرئين
    const reciterSelect = document.getElementById('quran-reciter-select');
    if (reciterSelect) {
      reciterSelect.innerHTML = RawhQuranData.reciters.map(r => `
        <option value="${r.id}" ${r.id === this.selectedReciterId ? 'selected' : ''}>
          ${r.name} (${r.style})
        </option>
      `).join('');

      reciterSelect.addEventListener('change', (e) => {
        this.selectedReciterId = e.target.value;
        if (this.isPlaying) {
          this.playSurahAudio(this.currentSurahNumber);
        }
      });
    }

    // زر التشغيل والإيقاف للتحفيظ
    const playBtn = document.getElementById('btn-quran-memorize-play');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.toggleQuranPlayback();
      });
    }

    // زر إغلاق نافذة المصحف
    const closeReaderBtn = document.getElementById('btn-close-quran-reader');
    if (closeReaderBtn) {
      closeReaderBtn.addEventListener('click', () => {
        document.getElementById('quran-mushaf-modal').classList.remove('active');
        if (this.quranAudio) this.quranAudio.pause();
        this.isPlaying = false;
      });
    }
  },

  renderSurahList(filterQuery = '') {
    const container = document.getElementById('quran-surahs-list');
    if (!container) return;

    let list = RawhQuranData.surahs;
    if (filterQuery) {
      list = list.filter(s =>
        s.name.includes(filterQuery) ||
        s.englishName.toLowerCase().includes(filterQuery) ||
        s.number.toString() === filterQuery
      );
    }

    container.innerHTML = list.map(surah => `
      <div class="surah-card-row" data-surah="${surah.number}">
        <div class="surah-badge-num">
          <span>${surah.number}</span>
        </div>
        <div class="surah-info-group">
          <div class="surah-arabic-title">سُورَةُ ${surah.name}</div>
          <div class="surah-details-sub">
            <span class="type-pill ${surah.type === 'مكية' ? 'makki' : 'madani'}">${surah.type}</span>
            <span>${surah.verses} آيات</span> • <span>صفحة ${surah.page}</span>
          </div>
        </div>
        <div class="surah-actions-cell">
          <button class="btn-read-mushaf" data-surah="${surah.number}" title="قراءة السورة">
            📖 اقرأ
          </button>
          <button class="btn-listen-mushaf" data-surah="${surah.number}" title="استماع وتحفيظ">
            🔁 حَفِّظْ
          </button>
        </div>
      </div>
    `).join('');

    // تفعيل أزرار القراءة والاستماع
    container.querySelectorAll('.btn-read-mushaf').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sNum = parseInt(btn.getAttribute('data-surah'));
        this.openSurahReader(sNum, false);
      });
    });

    container.querySelectorAll('.btn-listen-mushaf').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sNum = parseInt(btn.getAttribute('data-surah'));
        this.openSurahReader(sNum, true);
      });
    });

    container.querySelectorAll('.surah-card-row').forEach(row => {
      row.addEventListener('click', () => {
        const sNum = parseInt(row.getAttribute('data-surah'));
        this.openSurahReader(sNum, false);
      });
    });
  },

  openSurahReader(surahNumber, startAudio = false) {
    this.currentSurahNumber = surahNumber;
    const surahMeta = RawhQuranData.surahs.find(s => s.number === surahNumber);
    if (!surahMeta) return;

    const modal = document.getElementById('quran-mushaf-modal');
    const titleEl = document.getElementById('mushaf-surah-title');
    const subEl = document.getElementById('mushaf-surah-meta');
    const contentBox = document.getElementById('mushaf-ayahs-box');
    const basmalahBox = document.getElementById('mushaf-basmalah');

    if (titleEl) titleEl.innerText = `سُورَةُ ${surahMeta.name}`;
    if (subEl) subEl.innerText = `${surahMeta.type} • ${surahMeta.verses} آيات • الجزء ${Math.ceil(surahMeta.page / 20)}`;

    // فحص توفر النص المحفوظ محلياً
    const storedText = RawhQuranData.surahTexts[surahNumber];
    if (storedText) {
      if (basmalahBox) basmalahBox.style.display = storedText.bismillah ? 'block' : 'none';
      if (contentBox) {
        contentBox.innerHTML = storedText.ayahs.map(a => `
          <span class="ayah-segment" data-ayah="${a.num}">
            ${a.text} <span class="ayah-end-icon">۝${a.num}</span>
          </span>
        `).join(' ');
      }
    } else {
      // عرض جميل مع رابط القراءة المباشر
      if (basmalahBox) basmalahBox.style.display = surahNumber !== 9 ? 'block' : 'none';
      if (contentBox) {
        contentBox.innerHTML = `
          <div class="mushaf-full-note">
            <p>سورة ${surahMeta.name} المباركة (${surahMeta.verses} آيات - ${surahMeta.type})</p>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 8px;">
              اضغط على زر (تشغيل التحفيظ بالأسفل) للاستماع بترديد الأطفال والتكرار المبارك.
            </p>
          </div>
        `;
      }
    }

    this.updateReaderFontSize();
    modal.classList.add('active');

    // كسب حسنات لقراءة القرآن
    if (window.RawhStorage) {
      RawhStorage.addXP(15, 'قراءة القرآن الكريم');
    }

    if (startAudio) {
      this.playSurahAudio(surahNumber);
    }
  },

  playSurahAudio(surahNumber) {
    const reciter = RawhQuranData.reciters.find(r => r.id === this.selectedReciterId) || RawhQuranData.reciters[0];
    const audioUrl = `${reciter.server}${surahNumber}.mp3`;

    this.currentRepeatCount = 0;
    this.quranAudio.src = audioUrl;

    const counterEl = document.getElementById('quran-repeat-live-badge');
    if (counterEl) {
      const totalStr = this.repeatTarget === -1 ? 'دائم ♾️' : this.repeatTarget;
      counterEl.innerText = `بدء التكرار: 1 من ${totalStr} (${reciter.name})`;
    }

    this.quranAudio.play().then(() => {
      this.isPlaying = true;
      this.updatePlayBtnDom(true);
    }).catch(err => {
      console.warn('Audio play failed, fallback serene audio', err);
      // تجربة تشغيل الفاتحة المحلية إذا كانت السورة 1
      if (surahNumber === 1) {
        this.quranAudio.src = 'assets/audio/quran_fatihah.wav';
        this.quranAudio.play().then(() => {
          this.isPlaying = true;
          this.updatePlayBtnDom(true);
        }).catch(() => {
          if (window.RawhPlayer) RawhPlayer.fallbackSyntheticPeaceAudio(`سورة ${surahNumber}`);
        });
      } else if (window.RawhPlayer) {
        RawhPlayer.fallbackSyntheticPeaceAudio(`سورة ${surahNumber}`);
      }
    });
  },

  toggleQuranPlayback() {
    if (this.isPlaying) {
      this.quranAudio.pause();
      this.isPlaying = false;
      this.updatePlayBtnDom(false);
    } else {
      this.playSurahAudio(this.currentSurahNumber);
    }
  },

  updatePlayBtnDom(isPlaying) {
    const btn = document.getElementById('btn-quran-memorize-play');
    if (!btn) return;
    if (isPlaying) {
      btn.innerHTML = '<span>⏸️</span> <span>إيقاف التحفيظ مؤقتاً</span>';
      btn.classList.add('playing');
    } else {
      btn.innerHTML = '<span>🔁</span> <span>بدء التكرار والتحفيظ الذكي</span>';
      btn.classList.remove('playing');
    }
  },

  updateReaderFontSize() {
    const box = document.getElementById('mushaf-ayahs-box');
    if (box) box.style.fontSize = `${this.fontSize}px`;
    const label = document.getElementById('quran-font-size-label');
    if (label) label.innerText = `${this.fontSize}px`;
  }
};

if (typeof window !== 'undefined') {
  window.RawhQuran = RawhQuran;
}
