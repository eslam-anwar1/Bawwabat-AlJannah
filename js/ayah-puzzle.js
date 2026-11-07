/**
 * بوابة الجنة - لعبة تركيب وترتيب الآيات والسور المباركة
 * لعبة ذكية، ممتعة، وتفاعلية لترسيخ حفظ وفهم القرآن الكريم للأطفال والكبار
 */

const RawhAyahPuzzle = {
  levels: [
    {
      id: "surah-kawthar",
      title: "سورة الكوثر",
      badge: "السهل • 3 آيات",
      audioSrc: "assets/audio/quran_kawthar.mp3",
      verses: [
        {
          verseNumber: 1,
          words: ["إِنَّا", "أَعْطَيْنَاكَ", "الْكَوْثَرَ"]
        },
        {
          verseNumber: 2,
          words: ["فَصَلِّ", "لِرَبِّكَ", "وَانْحَرْ"]
        },
        {
          verseNumber: 3,
          words: ["إِنَّ", "شَانِئَكَ", "هُوَ", "الْأَبْتَرُ"]
        }
      ]
    },
    {
      id: "surah-ikhlas",
      title: "سورة الإخلاص",
      badge: "تعدل ثلث القرآن • 4 آيات",
      audioSrc: "assets/audio/quran_ikhlas.mp3",
      verses: [
        {
          verseNumber: 1,
          words: ["قُلْ", "هُوَ", "اللَّهُ", "أَحَدٌ"]
        },
        {
          verseNumber: 2,
          words: ["اللَّهُ", "الصَّمَدُ"]
        },
        {
          verseNumber: 3,
          words: ["لَمْ", "يَلِدْ", "وَلَمْ", "يُولَدْ"]
        },
        {
          verseNumber: 4,
          words: ["وَلَمْ", "يَكُن", "لَّهُ", "كُفُوًا", "أَحَدٌ"]
        }
      ]
    },
    {
      id: "surah-nasr",
      title: "سورة النصر",
      badge: "بشارة الفتح • 3 آيات",
      audioSrc: "assets/audio/quran_nasr.mp3",
      verses: [
        {
          verseNumber: 1,
          words: ["إِذَا", "جَاءَ", "نَصْرُ", "اللَّهِ", "وَالْفَتْحُ"]
        },
        {
          verseNumber: 2,
          words: ["وَرَأَيْتَ", "النَّاسَ", "يَدْخُلُونَ", "فِي", "دِينِ", "اللَّهِ", "أَفْوَاجًا"]
        },
        {
          verseNumber: 3,
          words: ["فَسَبِّحْ", "بِحَمْدِ", "رَبِّكَ", "وَاسْتَغْفِرْهُ", "إِنَّهُ", "كَانَ", "تَوَّابًا"]
        }
      ]
    },
    {
      id: "surah-fatihah",
      title: "سورة الفاتحة",
      badge: "أم الكتاب والسبع المثاني",
      audioSrc: "assets/audio/quran_fatihah.mp3",
      verses: [
        {
          verseNumber: 1,
          words: ["بِسْمِ", "اللَّهِ", "الرَّحْمَٰنِ", "الرَّحِيمِ"]
        },
        {
          verseNumber: 2,
          words: ["الْحَمْدُ", "لِلَّهِ", "رَبِّ", "الْعَالَمِينَ"]
        },
        {
          verseNumber: 3,
          words: ["الرَّحْمَٰنِ", "الرَّحِيمِ"]
        },
        {
          verseNumber: 4,
          words: ["مَالِكِ", "يَوْمِ", "الدِّينِ"]
        },
        {
          verseNumber: 5,
          words: ["إِيَّاكَ", "نَعْبُدُ", "وَإِيَّاكَ", "نَسْتَعِينُ"]
        },
        {
          verseNumber: 6,
          words: ["اهْدِنَا", "الصِّرَاطَ", "الْمُسْتَقِيمَ"]
        },
        {
          verseNumber: 7,
          words: ["صِرَاطَ", "الَّذِينَ", "أَنْعَمْتَ", "عَلَيْهِمْ", "غَيْرِ", "الْمَغْضُوبِ", "عَلَيْهِمْ", "وَلَا", "الضَّالِّينَ"]
        }
      ]
    },
    {
      id: "ayah-kursi",
      title: "آية الكرسي المباركة",
      badge: "سيدة آي القرآن وعظمة التوحيد",
      audioSrc: "assets/audio/quran_fatihah.mp3",
      verses: [
        {
          verseNumber: 1,
          words: ["اللَّهُ", "لَا", "إِلَٰهَ", "إِلَّا", "هُوَ", "الْحَيُّ", "الْقَيُّومُ"]
        },
        {
          verseNumber: 2,
          words: ["لَا", "تَأْخُذُهُ", "سِنَةٌ", "وَلَا", "نَوْمٌ"]
        },
        {
          verseNumber: 3,
          words: ["لَّهُ", "مَا", "فِي", "السَّمَاوَاتِ", "وَمَا", "فِي", "الْأَرْضِ"]
        },
        {
          verseNumber: 4,
          words: ["مَن", "ذَا", "الَّذِي", "يَشْفَعُ", "عِندَهُ", "إِلَّا", "بِإِذْنِهِ"]
        },
        {
          verseNumber: 5,
          words: ["يَعْلَمُ", "مَا", "بَيْنَ", "أَيْدِيهِمْ", "وَمَا", "خَلْفَهُمْ"]
        },
        {
          verseNumber: 6,
          words: ["وَسِعَ", "كُرْسِيُّهُ", "السَّمَاوَاتِ", "وَالْأَرْضَ", "وَلَا", "يَئُودُهُ", "حِفْظُهُمَا", "وَهُوَ", "الْعَلِيُّ", "الْعَظِيمُ"]
        }
      ]
    }
  ],

  currentLevelIdx: 0,
  currentVerseIdx: 0,
  currentPlacedWords: [],
  shuffledWords: [],

  init() {
    this.renderLevelSelector();
    this.startLevel(0);
    this.bindEvents();
  },

  bindEvents() {
    const restartBtn = document.getElementById('btn-restart-puzzle');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.startLevel(this.currentLevelIdx);
      });
    }

    const nextLevelBtn = document.getElementById('btn-next-puzzle-level');
    if (nextLevelBtn) {
      nextLevelBtn.addEventListener('click', () => {
        this.nextLevel();
      });
    }

    const listenBtn = document.getElementById('btn-listen-puzzle-surah');
    if (listenBtn) {
      listenBtn.addEventListener('click', () => {
        const curLevel = this.levels[this.currentLevelIdx];
        if (curLevel && curLevel.audioSrc && window.RawhPlayer) {
          RawhPlayer.playTrack({
            id: 'puzzle-' + curLevel.id,
            title: curLevel.title,
            artist: 'الشيخ مشاري راشد العفاسي',
            src: curLevel.audioSrc,
            cover: 'assets/icons/app-icon-circular.png'
          });
        }
      });
    }
  },

  renderLevelSelector() {
    const sel = document.getElementById('puzzle-level-select');
    if (!sel) return;

    sel.innerHTML = this.levels.map((lvl, idx) => `
      <option value="${idx}">${lvl.title} (${lvl.badge})</option>
    `).join('');

    sel.addEventListener('change', (e) => {
      this.startLevel(parseInt(e.target.value, 10));
    });
  },

  startLevel(levelIdx) {
    this.currentLevelIdx = levelIdx;
    this.currentVerseIdx = 0;
    this.currentPlacedWords = [];

    const level = this.levels[this.currentLevelIdx];
    if (!level) return;

    const titleEl = document.getElementById('puzzle-surah-title');
    const badgeEl = document.getElementById('puzzle-surah-badge');
    if (titleEl) titleEl.innerText = level.title;
    if (badgeEl) badgeEl.innerText = level.badge;

    const sel = document.getElementById('puzzle-level-select');
    if (sel) sel.value = levelIdx;

    const victoryBox = document.getElementById('puzzle-victory-banner');
    if (victoryBox) victoryBox.style.display = 'none';

    this.loadVerse(0);
  },

  loadVerse(verseIdx) {
    const level = this.levels[this.currentLevelIdx];
    if (!level || !level.verses[verseIdx]) return;

    this.currentVerseIdx = verseIdx;
    this.currentPlacedWords = [];

    const verse = level.verses[verseIdx];
    const targetWords = verse.words;

    // بعثرة الكلمات مع حفظ الموضع الأصلي
    const indexedWords = targetWords.map((w, i) => ({ text: w, originalIndex: i }));
    this.shuffledWords = this.shuffleArray([...indexedWords]);

    // تحديث مؤشر الآية
    const progressEl = document.getElementById('puzzle-verse-progress');
    if (progressEl) {
      progressEl.innerText = `الآية ${verse.verseNumber} من ${level.verses.length}`;
    }

    this.renderSlots(targetWords.length);
    this.renderBank(this.shuffledWords);
  },

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // التأكد من أنها ليست مرتبة بالصدفة إذا كانت أكثر من كلمة
    if (arr.length > 2 && arr.every((item, i) => item.originalIndex === i)) {
      [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
    }
    return arr;
  },

  renderSlots(count) {
    const slotsContainer = document.getElementById('puzzle-slots-container');
    if (!slotsContainer) return;

    slotsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const slot = document.createElement('div');
      slot.className = 'ayah-word-slot empty';
      slot.dataset.slotIndex = i;
      slot.innerText = (i + 1);
      slotsContainer.appendChild(slot);
    }
  },

  renderBank(words) {
    const bankContainer = document.getElementById('puzzle-words-bank');
    if (!bankContainer) return;

    bankContainer.innerHTML = '';
    words.forEach((item, index) => {
      const tile = document.createElement('button');
      tile.className = 'ayah-word-tile';
      tile.dataset.tileIndex = index;
      tile.dataset.originalIndex = item.originalIndex;
      tile.innerText = item.text;

      tile.addEventListener('click', () => {
        this.handleTileClick(tile, item);
      });

      bankContainer.appendChild(tile);
    });
  },

  handleTileClick(tile, item) {
    if (tile.classList.contains('placed')) return;

    const level = this.levels[this.currentLevelIdx];
    const verse = level.verses[this.currentVerseIdx];
    const expectedIndex = this.currentPlacedWords.length;

    // التحقق من صحة موضع الكلمة
    if (item.originalIndex === expectedIndex) {
      // إجابة صحيحة!
      this.playTone(true);
      tile.classList.add('placed');
      this.currentPlacedWords.push(item);

      // وضع الكلمة في الخانة المخصصة
      const slotsContainer = document.getElementById('puzzle-slots-container');
      if (slotsContainer) {
        const slot = slotsContainer.children[expectedIndex];
        if (slot) {
          slot.className = 'ayah-word-slot filled pop-in';
          slot.innerText = item.text;
        }
      }

      // هل اكتملت الآية؟
      if (this.currentPlacedWords.length === verse.words.length) {
        this.onVerseCompleted();
      }
    } else {
      // موضع خاطئ: تنبيه بصري لطيف
      this.playTone(false);
      tile.classList.add('shake-error');
      setTimeout(() => tile.classList.remove('shake-error'), 500);

      const feedback = document.getElementById('puzzle-feedback-hint');
      if (feedback) {
        feedback.innerText = 'فكّر جيداً في ترتيب الكلمات حسب الآية الكريمة 🌿';
        feedback.style.opacity = '1';
        setTimeout(() => feedback.style.opacity = '0', 1800);
      }
    }
  },

  onVerseCompleted() {
    const level = this.levels[this.currentLevelIdx];

    // إضافة حسنات
    if (window.RawhStorage) {
      RawhStorage.addXP(15, 'تركيب آية كريمة');
    }

    const slotsContainer = document.getElementById('puzzle-slots-container');
    if (slotsContainer) {
      slotsContainer.classList.add('verse-complete-glow');
      setTimeout(() => slotsContainer.classList.remove('verse-complete-glow'), 1000);
    }

    // هل اكتملت السورة بالكامل؟
    if (this.currentVerseIdx + 1 >= level.verses.length) {
      setTimeout(() => {
        this.onLevelCompleted();
      }, 700);
    } else {
      setTimeout(() => {
        this.loadVerse(this.currentVerseIdx + 1);
      }, 900);
    }
  },

  onLevelCompleted() {
    const level = this.levels[this.currentLevelIdx];

    // مكافأة الحديقة الكبرى
    if (window.RawhStorage) {
      RawhStorage.addXP(50, 'إتمام سورة مباركة في لغز الآيات');
      const data = RawhStorage.getGardenData();
      data.waterDrops = (data.waterDrops || 0) + 2;
      RawhStorage.saveGardenData(data);
      if (window.RawhGarden) RawhGarden.renderGarden();
    }

    const victoryBox = document.getElementById('puzzle-victory-banner');
    if (victoryBox) {
      victoryBox.style.display = 'block';
      victoryBox.scrollIntoView({ behavior: 'smooth' });
    }

    // صوت إتمام مبارك
    try {
      const chime = new Audio('assets/audio/success_chime.wav');
      chime.volume = 0.8;
      chime.play().catch(() => {});
    } catch (e) {}
  },

  nextLevel() {
    const nextIdx = (this.currentLevelIdx + 1) % this.levels.length;
    this.startLevel(nextIdx);
  },

  playTone(isSuccess) {
    try {
      if (isSuccess) {
        const click = new Audio('assets/audio/tasbeeh_click.wav');
        click.volume = 0.6;
        click.play().catch(() => {});
      }
    } catch (e) {}
  }
};

if (typeof window !== 'undefined') {
  window.RawhAyahPuzzle = RawhAyahPuzzle;
}
