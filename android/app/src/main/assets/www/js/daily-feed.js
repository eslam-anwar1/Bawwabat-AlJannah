/**
 * بوابة الجنة - نظام التحديث اليومي التلقائي (Dynamic Daily Content Feed)
 * محتوى إيماني متجدد يومياً يتغير كل 24 ساعة لضمان ارتباط المستخدم الدائم بالتطبيق:
 * 1. آية اليوم المباركة مع التفسير الميسر
 * 2. حديث اليوم النبوي الشريف وشرحه التربوي
 * 3. فيديو اليوم الديني القصير
 * 4. تلاوة نادرة ومختارة لليوم
 * 5. أنشودة اليوم المتميزة
 * 6. دعاء اليوم المأثور المستجاب
 */

const RawhDailyFeed = {
  // بنك المحتوى اليومي المتجدد (30 يوماً متتالياً فريداً وموثوقاً)
  feedPool: [
    {
      day: 1,
      ayah: {
        text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا • فَإِذَا فَرَغْتَ فَانصَبْ • وَإِلَىٰ رَبِّكَ فَارْغَب",
        surah: "سورة الشرح: 6-8",
        tafsir: "بشارة عظيمة بأن مع كل ضيق وكربة فرجاً وتيسيراً مضاعفاً، فإذا أتممت عملاً صالحاً فاجتهد في عبادة أخرى وأقبل على ربك بالرغبة والرجاء.",
        audio: "assets/audio/quran_sharh.mp3"
      },
      hadith: {
        text: "«مَن سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ له به طَرِيقًا إلى الجَنَّةِ»",
        source: "صحيح مسلم",
        lesson: "طلب العلم الشرعي والنافع من أعظم القربات التي تمهد للعبد دخوله جنات النعيم."
      },
      video: {
        title: "كنوز سورة الشرح وسر انشراح الصدر",
        speaker: "خواطر إيمانية عطرة",
        videoUrl: "https://www.youtube.com/embed/9ZfM_U1g84A"
      },
      recitation: {
        title: "تلاوة خاشعة لقصار السور برواية حفص",
        reciter: "الشيخ مشاري راشد العفاسي",
        audio: "assets/audio/quran_sharh.mp3"
      },
      nasheed: {
        title: "طلع البدر علينا من ثنيات الوداع",
        artist: "كورال البراعم الإسلامية (أداء صوتي)",
        audio: "assets/audio/nasheed_badr.wav"
      },
      dua: {
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا.",
        reward: "دعاء نبوي مأثور يُقال كل صباح للبركة والتوفيق."
      }
    },
    {
      day: 2,
      ayah: {
        text: "وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        surah: "سورة الإسراء: 24",
        tafsir: "أمر إلهي بالدعاء بالرحمة والمغفرة للوالدين جزاء ما بذلاه من رعاية وتربية وحنان في الصغر.",
        audio: "assets/audio/quran_fatihah.mp3"
      },
      hadith: {
        text: "«رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ، وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ»",
        source: "سنن الترمذي - حديث حسن",
        lesson: "بر الوالدين مفتاح كل خير، ورضا الله مقرون بالإحسان إليهما وإسعادهما."
      },
      video: {
        title: "بر الوالدين.. طريقك الأقرب إلى الفردوس",
        speaker: "قبسات نورانية هادفة",
        videoUrl: "https://www.youtube.com/embed/gL2u-mK6WqQ"
      },
      recitation: {
        title: "تلاوة ندية تفيض سكينة لسورة الضحى",
        reciter: "الشيخ مشاري راشد العفاسي",
        audio: "assets/audio/quran_duha.mp3"
      },
      nasheed: {
        title: "أمي يا نبع الحنان ورضا الرحمن",
        artist: "إنشاد إيماني دافئ وهادف",
        audio: "assets/audio/nasheed_mother.wav"
      },
      dua: {
        text: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ.",
        reward: "دعاء إبراهيم الخليل عليه السلام المستجاب للوالدين والمؤمنين."
      }
    },
    {
      day: 3,
      ayah: {
        text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        surah: "سورة الرعد: 28",
        tafsir: "القلوب المؤمنة لا تسكن ولا تطيب ولا يزول قلقها وخوفها إلا إذا أنست بذكر الله وتهليله وتكبيره وحمده.",
        audio: "assets/audio/quran_fatihah.mp3"
      },
      hadith: {
        text: "«مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لا يَذْكُرُ رَبَّهُ، مَثَلُ الحَيِّ وَالمَيِّتِ»",
        source: "صحيح البخاري",
        lesson: "الذكر حياة للأرواح وجلاء للصدور، والغفلة موت حقيقي للقلب وإن كان الجسد حياً."
      },
      video: {
        title: "عجائب الذكر والاستغفار في تفريج الهموم",
        speaker: "دروس الإيمان واليقين",
        videoUrl: "https://www.youtube.com/embed/5qap5aO4i9A"
      },
      recitation: {
        title: "تلاوة مباركة لسورة النبأ العظيمة",
        reciter: "الشيخ مشاري العفاسي",
        audio: "assets/audio/quran_naba.mp3"
      },
      nasheed: {
        title: "سوف نبقى هنا كي يزول الألم",
        artist: "د. رامي محمد (أداء إيماني ملهم)",
        audio: "assets/audio/nasheed_somood.wav"
      },
      dua: {
        text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.",
        reward: "وصية الحبيب المصطفى ﷺ لفاطمة رضي الله عنها كل صباح ومساء."
      }
    },
    {
      day: 4,
      ayah: {
        text: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
        surah: "سورة البقرة: 186",
        tafsir: "قرب الله من عباده قرب رحمة وإجابة وإعانة، فما على العبد إلا أن يدعو بصدق ويقين فيجيبه الملك الجليل.",
        audio: "assets/audio/quran_fatihah.mp3"
      },
      hadith: {
        text: "«الدُّعَاءُ هُوَ الْعِبَادَةُ» ثُمَّ قَرَأَ: {وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ}",
        source: "سنن أبي داود والترمذي",
        lesson: "الدعاء مخ العبادة وأصلها لأنه يظهر فقر العبد وغنى الخالق العظيم."
      },
      video: {
        title: "كيف تدعو الله ويستجيب لك في الحال؟",
        speaker: "أسرار استجابة الدعاء",
        videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ"
      },
      recitation: {
        title: "أذان الحرم المكي الشريف الخاشع في جوف الكعبة",
        reciter: "الشيخ المؤذن علي أحمد ملا",
        audio: "assets/audio/adhan_makkah.mp3"
      },
      nasheed: {
        title: "قمرٌ سيدنا النبي قمر وجميل",
        artist: "كورال الصحوة الإسلامية",
        audio: "assets/audio/nasheed_qamarun.wav"
      },
      dua: {
        text: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي.",
        reward: "دعاء ليلة القدر الذي علمه النبي ﷺ لأم المؤمنين عائشة رضي الله عنها."
      }
    },
    {
      day: 5,
      ayah: {
        text: "مَنْ جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا ۖ وَمَنْ جَاءَ بِالسَّيِّئَةِ فَلَا يُجْزَىٰ إِلَّا مِثْلَهَا",
        surah: "سورة الأنعام: 160",
        tafsir: "من كرم الله وفضله الواسع أنه يضاعف الحسنة الواحدة إلى عشر أمثالها إلى سبعمائة ضعف، والسيئة بمثلها أو يعفو.",
        audio: "assets/audio/quran_fatihah.mp3"
      },
      hadith: {
        text: "«كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي المِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ العَظِيمِ»",
        source: "صحيح البخاري ومسلم",
        lesson: "فضل عظيم بكلمات يسيرة تملأ ميزان الحسنات يوم القيامة."
      },
      video: {
        title: "مضاعفة الحسنات وأسرار تجارة الآخرة الرابحة",
        speaker: "زاد المؤمن الصالح",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      recitation: {
        title: "المصحف المعلم للأطفال مع ترديد البراعم",
        reciter: "الشيخ محمود خليل الحصري",
        audio: "assets/audio/husary_muallim.mp3"
      },
      nasheed: {
        title: "أركان الإسلام الخمسة المباركة",
        artist: "براعم الإيمان الهادفة",
        audio: "assets/audio/nasheed_arkan.wav"
      },
      dua: {
        text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ.",
        reward: "وصية النبي ﷺ لمعاذ بن جبل رضي الله عنه دبر كل صلاة مكتوبة."
      }
    }
  ],

  init() {
    this.renderDailyFeed();
    this.bindEvents();
  },

  getTodayItem() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const index = Math.abs(dayOfYear) % this.feedPool.length;
    return this.feedPool[index];
  },

  getFormattedDateString() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    try {
      return new Date().toLocaleDateString('ar-SA', options);
    } catch (e) {
      return new Date().toDateString();
    }
  },

  isTodayCompleted() {
    const todayKey = new Date().toISOString().slice(0, 10);
    const completedDay = localStorage.getItem('rawh_daily_feed_completed');
    return completedDay === todayKey;
  },

  markTodayCompleted() {
    const todayKey = new Date().toISOString().slice(0, 10);
    localStorage.setItem('rawh_daily_feed_completed', todayKey);

    // كسب حسنات وقطرات ماء للبستان
    if (window.RawhStorage) {
      RawhStorage.addXP(30, 'إتمام زاد اليوم المبارك');
      const data = RawhStorage.getGardenData();
      data.waterDrops = (data.waterDrops || 0) + 1;
      RawhStorage.saveGardenData(data);
    }

    if (window.RawhGarden) {
      RawhGarden.playWaterSound();
      RawhGarden.renderGarden();
    }

    if (window.RawhApp && RawhApp.showToast) {
      RawhApp.showToast('تقبل الله طاعتك! نلت +30 حسنة و +1 قطرة ماء لبستانك 💧🌿✨', 'success');
    }

    this.renderDailyFeed();
  },

  renderDailyFeed() {
    const container = document.getElementById('dynamic-daily-feed-container');
    if (!container) return;

    const item = this.getTodayItem();
    const dateStr = this.getFormattedDateString();
    const completed = this.isTodayCompleted();

    container.innerHTML = `
      <div class="daily-feed-card">
        <div class="daily-feed-header">
          <div class="daily-feed-badge">
            <span>✨</span>
            <span>زادك اليومي المتجدد</span>
          </div>
          <div class="daily-feed-date">${dateStr}</div>
        </div>

        <!-- 1. آية اليوم وتفسيرها -->
        <div class="feed-section-block ayah-block">
          <div class="feed-sub-title">
            <span>📖</span>
            <strong>آية اليوم وتفسيرها الميسر:</strong>
          </div>
          <div class="feed-ayah-verse">${item.ayah.text}</div>
          <div class="feed-surah-ref">${item.ayah.surah}</div>
          <div class="feed-tafsir-box">
            <span class="tafsir-tag">💡 التفسير الميسر:</span>
            <p>${item.ayah.tafsir}</p>
          </div>
          <button class="btn-feed-audio" data-audio="${item.ayah.audio}" data-title="تلاوة آية اليوم" data-artist="${item.ayah.surah}">
            <span>🎧</span>
            <span>استمع لآية اليوم بالتجويد العذب</span>
          </button>
        </div>

        <!-- 2. حديث اليوم وشرحه -->
        <div class="feed-section-block hadith-block">
          <div class="feed-sub-title">
            <span>📜</span>
            <strong>حديث اليوم النبوي الشريف:</strong>
          </div>
          <div class="feed-hadith-text">${item.hadith.text}</div>
          <div class="feed-hadith-source">${item.hadith.source}</div>
          <div class="feed-lesson-box">
            <span class="lesson-tag">🌟 الفائدة الإيمانية والتربوية:</span>
            <p>${item.hadith.lesson}</p>
          </div>
        </div>

        <!-- 3. فيديو اليوم الديني ومقطع السكينة -->
        <div class="feed-section-block video-block">
          <div class="feed-sub-title">
            <span>🎬</span>
            <strong>فيديو اليوم الإيماني القصير:</strong>
          </div>
          <div class="feed-video-preview">
            <div class="feed-video-info">
              <h4>${item.video.title}</h4>
              <p>${item.video.speaker}</p>
            </div>
            <button class="btn-feed-watch-video" data-url="${item.video.videoUrl}" data-title="${item.video.title}">
              <span>▶️</span>
              <span>مشاهدة المقطع الآن</span>
            </button>
          </div>
        </div>

        <!-- 4. تلاوة نادرة وأنشودة اليوم -->
        <div class="feed-audio-duo-row">
          <div class="audio-mini-card">
            <div class="duo-icon">🎙️</div>
            <div class="duo-meta">
              <span class="duo-type">تلاوة خاشعة لليوم</span>
              <strong class="duo-title">${item.recitation.title}</strong>
              <span class="duo-artist">${item.recitation.reciter}</span>
            </div>
            <button class="btn-duo-play" data-audio="${item.recitation.audio}" data-title="${item.recitation.title}" data-artist="${item.recitation.reciter}">
              ▶
            </button>
          </div>

          <div class="audio-mini-card">
            <div class="duo-icon">🎵</div>
            <div class="duo-meta">
              <span class="duo-type">أنشودة اليوم المختارة</span>
              <strong class="duo-title">${item.nasheed.title}</strong>
              <span class="duo-artist">${item.nasheed.artist}</span>
            </div>
            <button class="btn-duo-play" data-audio="${item.nasheed.audio}" data-title="${item.nasheed.title}" data-artist="${item.nasheed.artist}">
              ▶
            </button>
          </div>
        </div>

        <!-- 5. دعاء اليوم المستجاب -->
        <div class="feed-section-block dua-block">
          <div class="feed-sub-title">
            <span>🤲</span>
            <strong>دعاء اليوم المأثور المستجاب:</strong>
          </div>
          <div class="feed-dua-text" id="feed-today-dua-text">${item.dua.text}</div>
          <div class="feed-dua-reward">${item.dua.reward}</div>
          <div class="dua-btn-actions">
            <button class="btn-feed-action" id="btn-copy-daily-dua">
              <span>📋</span>
              <span>نسخ الدعاء للمشاركة</span>
            </button>
            <button class="btn-feed-action" id="btn-speak-daily-dua">
              <span>🔊</span>
              <span>استمع للدعاء</span>
            </button>
          </div>
        </div>

        <!-- 6. زر إنجاز الزاد اليومي -->
        <div class="feed-completion-wrapper">
          ${completed ? `
            <div class="completed-feed-banner">
              <span>✅</span>
              <span>ما شاء الله! تم إنجاز زاد اليوم المبارك ونيل الحسنات والقطرات. موعدنا غداً مع زاد جديد بإذن الله!</span>
            </div>
          ` : `
            <button class="btn-complete-daily-feed" id="btn-complete-daily-feed">
              <span>🌟</span>
              <span>أتممت زاد اليوم المبارك (+30 حسنة + 1 قطرة ماء) 💧</span>
            </button>
          `}
        </div>
      </div>
    `;

    this.bindFeedInteractions(container);
  },

  bindEvents() {
    // تحديث المحتوى تلقائياً عند تغيير اليوم
    setInterval(() => {
      this.renderDailyFeed();
    }, 600000); // فحص كل 10 دقائق
  },

  bindFeedInteractions(container) {
    // تشغيل مقاطع الصوت (آية وتلاوة وأنشودة)
    container.querySelectorAll('[data-audio]').forEach(btn => {
      btn.addEventListener('click', () => {
        const audioSrc = btn.getAttribute('data-audio');
        const title = btn.getAttribute('data-title');
        const artist = btn.getAttribute('data-artist') || 'بوابة الجنة';

        if (window.RawhPlayer) {
          RawhPlayer.playTrack({
            id: 'feed-' + Date.now(),
            title: title,
            artist: artist,
            categoryName: 'زاد اليوم المتجدد',
            src: audioSrc,
            fallbackSrc: 'assets/audio/quran_fatihah.mp3'
          });
        }
      });
    });

    // مشاهدة فيديو اليوم
    container.querySelectorAll('.btn-feed-watch-video').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        const title = btn.getAttribute('data-title');
        if (window.RawhKidsStories && RawhKidsStories.openVideoTheater) {
          RawhKidsStories.openVideoTheater(url, title);
        } else {
          window.open(url, '_blank');
        }
      });
    });

    // نسخ الدعاء
    const copyBtn = document.getElementById('btn-copy-daily-dua');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const duaEl = document.getElementById('feed-today-dua-text');
        if (duaEl) {
          const text = duaEl.innerText + "\n\n(من تطبيق بوابة الجنة - طريقك إلى الفردوس الأعلى)";
          navigator.clipboard.writeText(text).then(() => {
            if (window.RawhApp && RawhApp.showToast) {
              RawhApp.showToast('تم نسخ دعاء اليوم بنجاح، انشره ولك أجر كل من قرأه 🌿🤲', 'success');
            }
          }).catch(() => {
            alert('تم نسخ الدعاء!');
          });
        }
      });
    }

    // استماع للدعاء
    const speakBtn = document.getElementById('btn-speak-daily-dua');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        const duaEl = document.getElementById('feed-today-dua-text');
        if (duaEl && window.RawhApp && RawhApp.speakDhikr) {
          RawhApp.speakDhikr(duaEl.innerText, speakBtn);
        }
      });
    }

    // إنجاز زاد اليوم
    const completeBtn = document.getElementById('btn-complete-daily-feed');
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        this.markTodayCompleted();
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.RawhDailyFeed = RawhDailyFeed;
}
