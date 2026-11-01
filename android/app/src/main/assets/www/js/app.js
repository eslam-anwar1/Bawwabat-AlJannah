/**
 * بوابة الجنة - المنسق والمحرك الرئيسي للتطبيق
 * توثيق رسمي: تم عمل وتطوير هذا التطبيق بواسطة المهندسة إسلام أنور الفجم
 */

const RawhApp = {
  currentTab: 'home',
  activeDhikrCategory: 'morning',
  tasbeehCount: 0,
  tasbeehTotal: 0,
  tasbeehPhrase: 'سبحان الله وبحمده',

  init() {
    this.setupNavigation();
    this.setupDailyQuote();
    this.setupDhikrSection();
    this.setupTasbeeh();
    this.setupStoriesSection();
    this.setupAudioList();
    this.setupAboutAndPrivacy();
    this.registerServiceWorker();

    // تشغيل الأنظمة الفرعية بأمان وموثوقية
    try {
      if (typeof RawhPlayer !== 'undefined' && RawhPlayer.init) RawhPlayer.init();
      if (typeof RawhPrayerTimes !== 'undefined' && RawhPrayerTimes.init) RawhPrayerTimes.init();
      if (typeof RawhQibla !== 'undefined' && RawhQibla.init) RawhQibla.init();
      if (typeof RawhGarden !== 'undefined' && RawhGarden.init) RawhGarden.init();
      if (typeof RawhQuiz !== 'undefined' && RawhQuiz.init) RawhQuiz.init();
      if (typeof RawhQuran !== 'undefined' && RawhQuran.init) RawhQuran.init();
      if (typeof RawhKidsStories !== 'undefined' && RawhKidsStories.init) RawhKidsStories.init();
      if (typeof RawhMemoryGame !== 'undefined' && RawhMemoryGame.init) RawhMemoryGame.init();
    } catch (e) {
      console.warn('Subsystem init notification:', e);
    }
  },

  setupNavigation() {
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetTab = item.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });

    // روابط سريعة داخل الصفحة الرئيسية
    document.querySelectorAll('[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dest = btn.getAttribute('data-goto');
        this.switchTab(dest);
      });
    });
  },

  switchTab(tabId) {
    this.currentTab = tabId;

    // تحديث الواجهات المعروضة
    document.querySelectorAll('.app-screen').forEach(screen => {
      screen.classList.remove('active');
    });

    const activeScreen = document.getElementById(`screen-${tabId}`);
    if (activeScreen) {
      activeScreen.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // تحديث أزرار شريط التنقل السفلي
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      const match = item.getAttribute('data-tab') === tabId;
      item.classList.toggle('active', match);
    });

    // تحديث عنوان الشريط العلوي
    const titles = {
      home: 'بوابة الجنة',
      quran: 'القرآن الكريم والتحفيظ',
      kids_stories: 'قصص الأطفال المرئية',
      audio: 'أناشيد وصوتيات الجنة',
      dhikr: 'الأذكار والرقية',
      games: 'ألعاب وألغاز الجنة',
      tools: 'أدوات المسلم والمواقيت',
      about: 'حول التطبيق'
    };

    const headerTitle = document.getElementById('top-bar-title');
    if (headerTitle) headerTitle.innerText = titles[tabId] || 'بوابة الجنة';

    // تنشيط شاشات الألعاب أو السور عند الانتقال لها
    if (tabId === 'games') {
      if (typeof RawhMemoryGame !== 'undefined') RawhMemoryGame.startNewGame();
      if (typeof RawhQuiz !== 'undefined') {
        RawhQuiz.renderQuestion();
        RawhQuiz.renderRiddle();
        RawhQuiz.renderWordGame();
      }
    }
    if (tabId === 'quran' && typeof RawhQuran !== 'undefined') {
      RawhQuran.renderSurahList();
    }
    if (tabId === 'kids_stories' && typeof RawhKidsStories !== 'undefined') {
      RawhKidsStories.renderKidsStoriesList();
    }
    if (tabId === 'home' && typeof RawhGarden !== 'undefined') {
      RawhGarden.renderGarden();
    }
    if (tabId === 'audio') {
      this.setupAudioList();
    }
    if (tabId === 'dhikr') {
      this.renderDhikrItems();
    }
  },

  setupDailyQuote() {
    const quotes = RawhContent.dailyQuotes || [];
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quote = quotes[dayOfYear % quotes.length] || quotes[0];

    const quoteText = document.getElementById('daily-quote-text');
    const quoteSource = document.getElementById('daily-quote-source');

    if (quoteText) quoteText.innerText = `"${quote.text}"`;
    if (quoteSource) quoteSource.innerText = quote.source;
  },

  // إعداد قسم الأذكار وحصن المسلم
  setupDhikrSection() {
    const tabsContainer = document.getElementById('dhikr-tabs-nav');
    const itemsContainer = document.getElementById('dhikr-items-list');

    if (!tabsContainer || !itemsContainer) return;

    // أزرار فئات الأذكار
    tabsContainer.innerHTML = RawhContent.dhikrCategories.map(cat => `
      <button class="dhikr-tab-pill ${cat.id === this.activeDhikrCategory ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span> ${cat.name}
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.dhikr-tab-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.dhikr-tab-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeDhikrCategory = btn.getAttribute('data-cat');
        this.renderDhikrItems();
      });
    });

    this.renderDhikrItems();
  },

  currentDhikrBtn: null,

  speakDhikr(text, btnEl) {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        if (this.currentDhikrBtn) {
          this.currentDhikrBtn.classList.remove('speaking');
          this.currentDhikrBtn.innerHTML = '<span>🔊</span> <span>استمع</span>';
        }
        if (this.currentDhikrBtn === btnEl) {
          this.currentDhikrBtn = null;
          return;
        }
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.88;
      
      btnEl.classList.add('speaking');
      btnEl.innerHTML = '<span>⏹️</span> <span>جارٍ القراءة...</span>';
      this.currentDhikrBtn = btnEl;

      utterance.onend = () => {
        btnEl.classList.remove('speaking');
        btnEl.innerHTML = '<span>🔊</span> <span>استمع</span>';
        this.currentDhikrBtn = null;
      };

      utterance.onerror = () => {
        btnEl.classList.remove('speaking');
        btnEl.innerHTML = '<span>🔊</span> <span>استمع</span>';
        this.currentDhikrBtn = null;
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (window.RawhPlayer) RawhPlayer.fallbackSyntheticPeaceAudio(text);
    }
  },

  renderDhikrItems() {
    const container = document.getElementById('dhikr-items-list');
    if (!container) return;

    const currentCat = RawhContent.dhikrCategories.find(c => c.id === this.activeDhikrCategory);
    if (!currentCat) return;

    container.innerHTML = currentCat.items.map(item => `
      <div class="dhikr-card" id="dhikr-card-${item.id}">
        <p class="dhikr-text">${item.text}</p>
        <div class="dhikr-reward-tag">${item.reward}</div>
        <div class="dhikr-actions-row">
          <button class="dhikr-sound-btn" data-text="${encodeURIComponent(item.text)}" title="استماع للذكر مسموعاً">
            <span>🔊</span>
            <span>استمع</span>
          </button>
          <div class="dhikr-counter-action">
            <button class="dhikr-press-btn" data-id="${item.id}" data-max="${item.count}" data-current="${item.count}">
              <span class="count-num">${item.count}</span>
              <span class="count-sub">اضغط للتكرار</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // تفعيل الاستماع الصوتي لكل ذكر
    container.querySelectorAll('.dhikr-sound-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = decodeURIComponent(btn.getAttribute('data-text'));
        this.speakDhikr(text, btn);
      });
    });

    // تفعيل التفاعل مع كل ذكر
    container.querySelectorAll('.dhikr-press-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        let current = parseInt(btn.getAttribute('data-current'));
        if (current > 0) {
          current--;
          btn.setAttribute('data-current', current);
          btn.querySelector('.count-num').innerText = current;

          // اهتزاز لمسي لطيف
          if (navigator.vibrate) navigator.vibrate(25);

          if (current === 0) {
            btn.classList.add('completed');
            btn.querySelector('.count-num').innerText = '✓';
            btn.querySelector('.count-sub').innerText = 'تم بحمد الله';
            RawhGarden.playWaterSound();
            RawhStorage.addXP(10, 'إتمام ذكر');
            const data = RawhStorage.getGardenData();
            data.waterDrops = (data.waterDrops || 0) + 1;
            RawhStorage.saveGardenData(data);
          }
        }
      });
    });
  },

  // المسبحة الإلكترونية التفاعلية
  setupTasbeeh() {
    const tasbeehBtn = document.getElementById('tasbeeh-click-btn');
    const tasbeehDisplay = document.getElementById('tasbeeh-display-val');
    const tasbeehTotalEl = document.getElementById('tasbeeh-total-val');
    const resetBtn = document.getElementById('btn-reset-tasbeeh');
    const phraseSelect = document.getElementById('tasbeeh-phrase-select');

    if (phraseSelect) {
      phraseSelect.addEventListener('change', (e) => {
        this.tasbeehPhrase = e.target.value;
      });
    }

    if (tasbeehBtn) {
      tasbeehBtn.addEventListener('click', () => {
        this.tasbeehCount++;
        this.tasbeehTotal++;

        if (tasbeehDisplay) tasbeehDisplay.innerText = this.tasbeehCount;
        if (tasbeehTotalEl) tasbeehTotalEl.innerText = this.tasbeehTotal;

        try {
          const clickSound = new Audio('assets/audio/tasbeeh_click.wav');
          clickSound.volume = 0.5;
          clickSound.play().catch(() => {});
        } catch (e) {}

        if (navigator.vibrate) navigator.vibrate(35);

        // كل 33 تسبيحة دورة مباركة
        if (this.tasbeehCount % 33 === 0) {
          if (navigator.vibrate) navigator.vibrate([60, 60, 80]);
          RawhGarden.playWaterSound();
          RawhStorage.addXP(10, 'إتمام 33 تسبيحة');
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.tasbeehCount = 0;
        if (tasbeehDisplay) tasbeehDisplay.innerText = 0;
      });
    }
  },

  // قسم القصص والحكايات
  setupStoriesSection() {
    const listContainer = document.getElementById('stories-cards-list');
    if (!listContainer) return;

    listContainer.innerHTML = RawhContent.stories.map(story => `
      <div class="story-preview-card" data-story-id="${story.id}">
        <div class="story-card-badge">${story.categoryName}</div>
        <h3 class="story-card-title">${story.title}</h3>
        <p class="story-card-subtitle">${story.subtitle}</p>
        <div class="story-card-footer">
          <span class="story-time">⏱️ ${story.duration}</span>
          <button class="btn-read-story" data-story-id="${story.id}">اقرأ القصة 📖</button>
        </div>
      </div>
    `).join('');

    listContainer.querySelectorAll('.btn-read-story').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-story-id');
        this.openStoryModal(id);
      });
    });

    const closeBtn = document.getElementById('story-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('story-reader-modal').classList.remove('active');
      });
    }
  },

  openStoryModal(storyId) {
    const story = RawhContent.stories.find(s => s.id === storyId);
    if (!story) return;

    const modal = document.getElementById('story-reader-modal');
    const titleEl = document.getElementById('story-modal-title');
    const subtitleEl = document.getElementById('story-modal-subtitle');
    const contentEl = document.getElementById('story-modal-body');
    const lessonsEl = document.getElementById('story-modal-lessons');
    const listenBtn = document.getElementById('btn-story-listen');

    if (titleEl) titleEl.innerText = story.title;
    if (subtitleEl) subtitleEl.innerText = story.subtitle;
    if (contentEl) {
      contentEl.innerHTML = story.content.split('\n\n').map(p => `<p>${p}</p>`).join('');
    }

    if (lessonsEl) {
      lessonsEl.innerHTML = `
        <h4>الفوائد والدروس المستفادة:</h4>
        <ul>
          ${story.lessons.map(l => `<li>${l}</li>`).join('')}
        </ul>
      `;
    }

    if (listenBtn) {
      if (story.audioSrc) {
        listenBtn.style.display = 'inline-flex';
        listenBtn.onclick = () => {
          RawhPlayer.playTrack({
            id: `story-${story.id}`,
            title: story.title,
            artist: story.categoryName,
            src: story.audioSrc,
            categoryName: 'قصص الروح'
          });
        };
      } else {
        listenBtn.style.display = 'none';
      }
    }

    modal.classList.add('active');

    // كسب نقاط قراءة في الحديقة
    RawhStorage.addXP(15, 'قراءة قصة');
  },

  // إعداد قائمة الصوتيات مع البحث الفوري
  setupAudioList() {
    const container = document.getElementById('audio-tracks-list');
    const searchInput = document.getElementById('audio-search-input');
    if (!container) return;

    const renderTracks = (filter = '') => {
      let tracks = RawhContent.audioTracks || [];
      if (filter) {
        const query = filter.toLowerCase().trim();
        tracks = tracks.filter(t => 
          t.title.toLowerCase().includes(query) ||
          t.artist.toLowerCase().includes(query) ||
          (t.categoryName && t.categoryName.toLowerCase().includes(query))
        );
      }

      if (tracks.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 30px; color: var(--text-muted); background: #FFF; border-radius: 12px; border: 1px dashed #CBD5E1;">
            <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
            <p style="font-weight: bold;">لم نجد أي نشيد أو تلاوة تطابق "${filter}"</p>
            <p style="font-size: 0.8rem; margin-top: 4px;">جرّب كتابة كلمة أخرى مثل "أمي" أو "الصلاة" أو "رمضان"</p>
          </div>
        `;
        return;
      }

      container.innerHTML = tracks.map((track) => `
        <div class="audio-track-item" data-id="${track.id}">
          <div class="track-play-avatar">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div class="track-details">
            <div class="track-name">${track.title}</div>
            <div class="track-sub">${track.artist} • <span class="text-gold">${track.categoryName}</span></div>
          </div>
          <div class="track-duration">${track.duration}</div>
        </div>
      `).join('');

      container.querySelectorAll('.audio-track-item').forEach(item => {
        item.addEventListener('click', () => {
          const trackId = item.getAttribute('data-id');
          const targetTrack = RawhContent.audioTracks.find(t => t.id === trackId);
          if (targetTrack && window.RawhPlayer) {
            RawhPlayer.playTrack(targetTrack);
          }
        });
      });
    };

    renderTracks();

    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', (e) => {
        renderTracks(e.target.value);
      });
    }
  },

  // قسم حول التطبيق والتوثيق الرسمي الصارم
  setupAboutAndPrivacy() {
    // الزر في الشريط العلوي للانتقال لحول التطبيق
    const aboutHeaderBtn = document.getElementById('btn-header-about');
    if (aboutHeaderBtn) {
      aboutHeaderBtn.addEventListener('click', () => this.switchTab('about'));
    }
  },

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('Service Worker Registered successfully'))
          .catch(err => console.log('SW registration error:', err));
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.RawhApp = RawhApp;
}

// تشغيل التطبيق بأمان فور جاهزية المستند
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    RawhApp.init();
  });
} else {
  RawhApp.init();
}
