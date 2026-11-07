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
  isTafsirActive: false,

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
      console.warn('Quran audio stream error, trying local authentic voice');
      const localMap = {
        1: 'assets/audio/quran_fatihah.mp3',
        112: 'assets/audio/quran_ikhlas.mp3',
        113: 'assets/audio/quran_falaq.mp3',
        114: 'assets/audio/quran_nas.mp3',
        108: 'assets/audio/quran_kawthar.mp3',
        97: 'assets/audio/quran_qadr.mp3',
        94: 'assets/audio/quran_sharh.mp3',
        93: 'assets/audio/quran_duha.mp3'
      };
      const fallbackLocal = localMap[this.currentSurahNumber] || 'assets/audio/quran_fatihah.mp3';
      if (this.quranAudio.src !== fallbackLocal) {
        this.quranAudio.src = fallbackLocal;
        this.quranAudio.play().then(() => {
          this.isPlaying = true;
          this.updatePlayBtnDom(true);
        }).catch(() => {
          this.isPlaying = false;
          this.updatePlayBtnDom(false);
        });
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

    // زر التفسير الميسر
    const tafsirBtn = document.getElementById('btn-toggle-tafsir');
    if (tafsirBtn) {
      tafsirBtn.addEventListener('click', () => {
        this.isTafsirActive = !this.isTafsirActive;
        tafsirBtn.classList.toggle('active', this.isTafsirActive);
        tafsirBtn.innerHTML = this.isTafsirActive ? '<span>📖</span> <span>إخفاء التفسير</span>' : '<span>💡</span> <span>التفسير الميسر</span>';
        this.openSurahReader(this.currentSurahNumber, false);
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
      this.renderAyahsBox(contentBox, storedText.ayahs, surahNumber);
    } else {
      // تحميل الآيات مباشرة من واجهة القرآن السحابية
      if (basmalahBox) basmalahBox.style.display = surahNumber !== 9 ? 'block' : 'none';
      if (contentBox) {
        contentBox.innerHTML = `
          <div style="text-align: center; padding: 25px; color: var(--primary-emerald);">
            <div style="font-size: 1.8rem; margin-bottom: 8px;">📖✨</div>
            <p style="font-weight: bold;">سورة ${surahMeta.name} المباركة (${surahMeta.verses} آيات - ${surahMeta.type})</p>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">جارٍ استرجاع الآيات الكريمة كاملة...</p>
          </div>
        `;

        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.data && data.data.ayahs) {
              const ayahs = data.data.ayahs.map(a => ({
                num: a.numberInSurah,
                text: a.text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '')
              }));
              RawhQuranData.surahTexts[surahNumber] = {
                name: `سورة ${surahMeta.name}`,
                bismillah: surahNumber !== 9,
                ayahs: ayahs
              };
              this.renderAyahsBox(contentBox, ayahs, surahNumber);
            }
          })
          .catch(err => {
            console.warn('API cloud fetch note:', err);
            contentBox.innerHTML = `
              <div class="mushaf-full-note" style="text-align: center; padding: 20px;">
                <p style="font-weight: bold; font-size: 1.1rem; color: var(--primary-emerald);">سورة ${surahMeta.name} المباركة</p>
                <p style="margin-top: 8px; color: var(--text-muted); font-size: 0.9rem;">${surahMeta.type} • ${surahMeta.verses} آيات • الجزء ${Math.ceil(surahMeta.page / 20)}</p>
                <p style="margin-top: 14px; font-weight: bold; color: #166534;">استمع للتلاوة العذبة الآن عبر زر التحفيظ بالأسفل 🎧👇</p>
              </div>
            `;
          });
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

  renderAyahsBox(contentBox, ayahs, surahNumber) {
    if (!contentBox || !ayahs) return;
    const tafsirMap = (RawhQuranData.tafsir && RawhQuranData.tafsir[surahNumber]) || {};

    if (this.isTafsirActive) {
      contentBox.innerHTML = ayahs.map(a => `
        <div class="mushaf-ayah-tafsir-card">
          <div class="ayah-arabic-line">
            <span class="ayah-segment" data-ayah="${a.num}">
              ${a.text} <span class="ayah-end-icon">۝${a.num}</span>
            </span>
          </div>
          <div class="ayah-tafsir-line">
            <span class="tafsir-tag-badge">💡 التفسير الميسر:</span>
            <span>${tafsirMap[a.num] || 'تفسير ميسر مستفاد من معاني الآية الكريمة.'}</span>
          </div>
        </div>
      `).join('');
    } else {
      contentBox.innerHTML = ayahs.map(a => `
        <span class="ayah-segment" data-ayah="${a.num}">
          ${a.text} <span class="ayah-end-icon">۝${a.num}</span>
        </span>
      `).join(' ');
    }
  },

  playSurahAudio(surahNumber) {
    const reciter = RawhQuranData.reciters.find(r => r.id === this.selectedReciterId) || RawhQuranData.reciters[0];
    const surahMeta = RawhQuranData.surahs.find(s => s.number === surahNumber);
    const padNum = String(surahNumber).padStart(3, '0');
    const audioUrl = `${reciter.server}${padNum}.mp3`;

    this.currentRepeatCount = 0;
    this.quranAudio.src = audioUrl;

    // تحديث تحكم الخلفية وشاشة القفل (Background MediaSession)
    this.updateQuranMediaSession(surahMeta, reciter);

    const nativeAudio = document.getElementById('quran-html5-audio');
    if (nativeAudio) {
      nativeAudio.src = audioUrl;
      nativeAudio.style.display = 'block';
    }

    const counterEl = document.getElementById('quran-repeat-live-badge');
    if (counterEl) {
      const totalStr = this.repeatTarget === -1 ? 'دائم ♾️' : this.repeatTarget;
      counterEl.innerText = `التكرار: 1 من ${totalStr} (${reciter.name})`;
    }

    const p = this.quranAudio.play();
    if (p !== undefined) {
      p.then(() => {
        this.isPlaying = true;
        this.updatePlayBtnDom(true);
      }).catch(err => {
        console.warn('Audio programmatic autoplay restricted, engaging fallback/native', err);
        if (nativeAudio) {
          nativeAudio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayBtnDom(true);
          }).catch(() => {});
        }
        const localMap = {
          1: 'assets/audio/quran_fatihah.mp3',
          112: 'assets/audio/quran_ikhlas.mp3',
          113: 'assets/audio/quran_falaq.mp3',
          114: 'assets/audio/quran_nas.mp3',
          108: 'assets/audio/quran_kawthar.mp3',
          97: 'assets/audio/quran_qadr.mp3',
          94: 'assets/audio/quran_sharh.mp3',
          93: 'assets/audio/quran_duha.mp3'
        };
        const localSrc = localMap[surahNumber] || 'assets/audio/quran_fatihah.mp3';
        this.quranAudio.src = localSrc;
        this.quranAudio.play().then(() => {
          this.isPlaying = true;
          this.updatePlayBtnDom(true);
        }).catch(() => {});
      });
    }
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
  },

  updateQuranMediaSession(surahMeta, reciter) {
    if (!('mediaSession' in navigator) || !surahMeta) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `سورة ${surahMeta.name} المباركة`,
        artist: reciter ? reciter.name : 'الشيخ مشاري راشد العفاسي',
        album: 'المصحف الشريف - بوابة الجنة',
        artwork: [
          { src: 'assets/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'assets/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'assets/icons/app-icon-circular.png', sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        this.quranAudio.play();
        this.isPlaying = true;
        this.updatePlayBtnDom(true);
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        this.quranAudio.pause();
        this.isPlaying = false;
        this.updatePlayBtnDom(false);
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (this.currentSurahNumber > 1) {
          this.openSurahReader(this.currentSurahNumber - 1, true);
        }
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (this.currentSurahNumber < 114) {
          this.openSurahReader(this.currentSurahNumber + 1, true);
        }
      });
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined && this.quranAudio.duration) {
          this.quranAudio.currentTime = details.seekTime;
        }
      });
    } catch (e) {
      console.warn('Quran MediaSession setup note:', e);
    }
  }
};

if (typeof window !== 'undefined') {
  window.RawhQuran = RawhQuran;
}
