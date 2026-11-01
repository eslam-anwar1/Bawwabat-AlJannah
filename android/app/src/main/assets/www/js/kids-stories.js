/**
 * بوابة الجنة - مسرح وقصص الأطفال الدينية والتربوية (فيديو كرتوني تفاعلي وقراءة ممتعة)
 * يشمل: فضل الأم وبرها، أهمية الصلاة، وقصص الأنبياء المؤثرة
 */

const RawhKidsStories = {
  currentStory: null,
  currentSceneIdx: 0,
  isPlayingStoryAudio: false,

  stories: [
    {
      id: "kids-mother-kindness",
      category: "mother",
      categoryName: "فضل الأم وبرها",
      badgeIcon: "❤️",
      title: "ريحانة الجنة: سر الشاب البار بأمه",
      subtitle: "حكاية ساحرة عن كيف فتحت دعوة الأم أبواب التوفيق والجنة لسعد",
      duration: "4 دقائق",
      videoUrl: "https://www.youtube-nocookie.com/embed/gI8-v1r1N88",
      cover: "assets/icons/app-icon.svg",
      scenes: [
        {
          title: "إشراقة الصباح وتقبيل يد الأم",
          desc: "كان سعد يستيقظ مبكراً كل يوم، فيذهب إلى غرفة أمه يقبل رأسها ويديها بحنان ويسألها عن رضاها.",
          character: "👦🧕",
          bgGradient: "linear-gradient(135deg, #FEF3C7, #FDE68A)"
        },
        {
          title: "دعوة مستجابة تفتح أبواب السماء",
          desc: "ترفع الأم كفيها بالدعاء: 'اللهم افتح لولدي أبواب الخير واجعله من رفقاء النبي ﷺ في الفردوس'.",
          character: "🤲✨",
          bgGradient: "linear-gradient(135deg, #ECFDF5, #A7F3D0)"
        },
        {
          title: "القافلة والبركة العجيبة في الرزق",
          desc: "في السفر والتجارة، نجا سعد من العواصف وربحت تجارته أضعافاً كثيرة بفضل بركة دعاء والدته.",
          character: "🐫💎",
          bgGradient: "linear-gradient(135deg, #EFF6FF, #BFDBFE)"
        },
        {
          title: "هدية البر ودخول الجنة",
          desc: "عاد سعد لأمه بأجمل هدية وضمها إلى صدره، متذكراً وصية النبي ﷺ: 'أمك ثم أمك ثم أمك'.",
          character: "🎁🌸",
          bgGradient: "linear-gradient(135deg, #FDF2F8, #FBCFE8)"
        }
      ],
      content: `كان هناك شابٌّ طيبٌ اسمه "سعد"، كان كلما استيقظ في الصباح وقبل أن يبدأ أي عمل في يومه، يذهب إلى حجرة أمه الحبيبة، فينحني ويقبّل يديها ورأسها، ويسألها بلطف وابتسامة: "يا أمي الغالية، هل تحتاجين شيئاً اليوم؟ هل أنتِ راضية عني؟".

وكانت الأم تنظر إليه بدموع الفرح وتدعو له قائلة: "يا بني، أسأل الله العظيم أن يفتح لك أبواب الخير، وأن يجعلك من رفقاء النبي ﷺ في الفردوس الأعلى!".

وفي يوم من الأيام، سافر سعد في تجارة مع قافلة كبيرة. فبينما القوافل تصيبها المتاعب والرياح، كان سعد يرى التوفيق والبركة في كل خطوة يخطوها! فسأله رفاقه بدهشة: "ما هو سر هذا التيسير العجيب والربح المبارك؟!".

فابتسم سعد وقال: "إنه ليس بذكائي ولا قوتي، بل هو سر دعوة أمي في صلاة الفجر!".

وعندما عاد، اشترى لأمه أجمل هدية وضمها إلى صدره، وتذكر وصية الحبيب المصطفى ﷺ حين جاءه رجل يسأله: "من أحق الناس بحسن صحابتي؟ قال: أمك، قال: ثم من؟ قال: أمك، قال: ثم من؟ قال: أمك!".`,
      lessons: [
        "الجنة تحت أقدام الأمهات، ورضا الله مقرون برضا الوالدين.",
        "تقبيل يد الأم ورأسها كل يوم يجلب البركة والنجاح في كل خطوة.",
        "دعوة الأم مستجابة لا تُردّ، وهي أعظم كنز يملكه الإنسان في حياته."
      ],
      interactiveQuestion: {
        question: "ما هو سر البركة والتوفيق العجيب في حياة سعد؟",
        options: ["كثرة أمواله", "دعوات أمه ورضاه عنها", "سفره البعيد"],
        correct: 1
      }
    },
    {
      id: "kids-prayer-importance",
      category: "prayer",
      categoryName: "أهمية الصلاة وفضلها",
      badgeIcon: "🕌",
      title: "صلاتي نور قلبي: الفتى الشجاع وعمود الدين",
      subtitle: "كيف جعلت المحافظة على الصلوات الخمس قلب عمر قوياً لا يخاف شيئاً",
      duration: "5 دقائق",
      videoUrl: "https://www.youtube-nocookie.com/embed/5F_P-jXyZkg",
      cover: "assets/icons/app-icon.svg",
      scenes: [
        {
          title: "الخوف والقلق في الظلام",
          desc: "كان عمر يشعر بالخوف من الليل والظلام ويقلق في امتحاناته المدرسية.",
          character: "👦🌑",
          bgGradient: "linear-gradient(135deg, #E2E8F0, #CBD5E1)"
        },
        {
          title: "نصيحة الجد في ساحة المسجد",
          desc: "أخبره جده: 'يا عمر، الصلاة هي لقاء مباشر مع الله العظيم، بالسجود تصبح أقرب الناس لربك!'.",
          character: "👴🕌",
          bgGradient: "linear-gradient(135deg, #FEF3C7, #FDE68A)"
        },
        {
          title: "الوضوء بنور وماء يتلألأ",
          desc: "بدأ عمر يتوضأ بنشاط ويسرع إلى صلاته كلما سمع 'حي على الصلاة'.",
          character: "💧✨",
          bgGradient: "linear-gradient(135deg, #E0F2FE, #BAE6FD)"
        },
        {
          title: "الشجاعة والتفوق الدراسي المبهر",
          desc: "زال الخوف من قلبه وأصبح الأول على مدرسته ووجهه مشرق بنور الصلاة والإيمان.",
          character: "🏆🌟",
          bgGradient: "linear-gradient(135deg, #DCFCE7, #86EFAC)"
        }
      ],
      content: `كان الطفل "عمر" يخاف من الظلام، ويهاب الامتحانات المدرسية ويشعر بالقلق دائماً.

وفي يوم من الأيام، جلس معه جده الحكيم في ساحة المسجد وقت الغروب، وقال له بحنان: "يا عمر، هل تعلم ما هو النور الذي لا ينطفئ أبداً؟ وهل تعلم ما هو السلاح الذي يجعلك أقوى طفل في العالم؟!".

تعجب عمر وقال: "ما هو يا جدي؟!".

أجابه الجد: "إنها الصلاة يا بني! فالصلاة ليست مجرد حركات، بل هي لقاء مباشر بينك وبين الله العظيم خالق الكون. عندما تقول (الله أكبر)، فإنك تضع كل مخاوفك خلف ظهرك، وعندما تسجد، فأنت أقرب ما تكون إلى الله، فتطلب منه النجاح والأمان فيعطيك!".

منذ ذلك اليوم، عاهد عمر ربه ألا يفوّت صلاة واحدة. كان إذا سمع المؤذن ينادي "حي على الصلاة"، يترك ألعابه فوراً ويتوضأ بماء عذب يتلألأ.

وسرعان ما شعر بقلبه يمتلئ شجاعة، وذهب الخوف من قلبه، وأصبح الأول على مدرسته! وقال لأصدقائه فخوراً: "السر كله في الصلوات الخمس!".`,
      lessons: [
        "الصلاة هي عمود الدين والصلة الحية بين العبد وربه.",
        "المحافظة على الصلاة في وقتها تجلب السكينة، الشجاعة، والتفوق.",
        "الوضوء يغسل الخطايا ويجعل الوجه مشرقاً بنور الإيمان والرضا."
      ],
      interactiveQuestion: {
        question: "متى يكون العبد أقرب ما يكون إلى ربه كما علمنا النبي ﷺ؟",
        options: ["وهو يلعب", "وهو ساجد في الصلاة", "وهو نائم"],
        correct: 1
      }
    },
    {
      id: "kids-prophet-yusuf",
      category: "prophets",
      categoryName: "قصص الأنبياء للصغار",
      badgeIcon: "⭐",
      title: "يوسف الصديق: قصة الصبر والعفو الجميل",
      subtitle: "رحلة الفتى الصابر من البئر المظلم إلى عرش مصر العظيم",
      duration: "6 دقائق",
      videoUrl: "https://www.youtube-nocookie.com/embed/x9N-q_2nQe8",
      cover: "assets/icons/app-icon.svg",
      scenes: [
        {
          title: "رؤيا الكواكب والشمس والقمر",
          desc: "رأى يوسف الصغير أحد عشر كوكباً والشمس والقمر له ساجدين في منام مبارك.",
          character: "✨🌙",
          bgGradient: "linear-gradient(135deg, #F3E8FF, #D8B4FE)"
        },
        {
          title: "الحفظ الإلهي في ظلمات البئر",
          desc: "حسده إخوته وألقوه في البئر، لكن الله طمأنه بحفظه ورعايته ولم يتوقف عن ذكر ربه.",
          character: "💧🤲",
          bgGradient: "linear-gradient(135deg, #E0E7FF, #C7D2FE)"
        },
        {
          title: "الأمانة وتفسير رؤيا ملك مصر",
          desc: "أصبح يوسف على خزائن مصر بحكمته وأمانته وأنقذ الناس جميعاً من الجوع.",
          character: "🌾👑",
          bgGradient: "linear-gradient(135deg, #FEF3C7, #FDE68A)"
        },
        {
          title: "العفو عند المقدرة واللقاء العظيم",
          desc: "سامح إخوته وقال: 'لا تثريب عليكم اليوم يغفر الله لكم وهو أرحم الراحمين'.",
          character: "🤝❤️",
          bgGradient: "linear-gradient(135deg, #DCFCE7, #BBF7D0)"
        }
      ],
      content: `كان نبي الله يوسف عليه السلام فتى جميلاً مؤدباً، يحبه والده يعقوب عليه السلام حباً شديداً.

لكن إخوته حسدوه وألقوه في بئر عميق، ولكن الله حفظه وأخرجه منها، وانتقل إلى مصر. ورغم كل الصعوبات والظلم والسجن، كان يوسف صادقاً، أميناً، ومسبحاً لربه دائماً.

وبسبب أمانته وحكمته، جعله ملك مصر مسؤولاً عن خزائن الطعام، وأنقذ البلاد من الجوع! وعندما جاءه إخوته نادمين، لم ينتقم منهم بل قال لهم بعفو رحيم: "لا تثريب عليكم اليوم يغفر الله لكم وهو أرحم الراحمين".`,
      lessons: [
        "الصبر الجميل نهايته دائماً فرج وتمكين.",
        "الحسد يؤذي صاحبه، والأمانة ترفع الإنسان في الدنيا والآخرة.",
        "العفو عن المسيء شيمة الأبطال والأنبياء الكرام."
      ],
      interactiveQuestion: {
        question: "ماذا فعل يوسف عليه السلام بإخوته عندما اعتذروا له؟",
        options: ["عاقبهم", "عفا عنهم وسامحهم", "طردهم"],
        correct: 1
      }
    },
    {
      id: "kids-prophet-yunus",
      category: "prophets",
      categoryName: "قصص الأنبياء للصغار",
      badgeIcon: "🐋",
      title: "يونس عليه السلام: نداء التسبيح في بطن الحوت",
      subtitle: "كيف نجى نبي الله يونس من أظلم مكان بكلمة واحدة عظيمة",
      duration: "4 دقائق",
      videoUrl: "https://www.youtube-nocookie.com/embed/0G_T8W1sK7E",
      cover: "assets/icons/app-icon.svg",
      scenes: [
        {
          title: "الأمواج العاتية وسفينة البحر",
          desc: "ركب يونس السفينة وهاج البحر بأمواج كالجبال، فاقترع الركاب ووقع في الماء.",
          character: "🌊⛵",
          bgGradient: "linear-gradient(135deg, #BAE6FD, #7DD3FC)"
        },
        {
          title: "الحوت العميق والظلمات الثلاث",
          desc: "أرسل الله حوتاً عظيماً ابتلعه برحمة دون أن يؤذيه، فسبح يونس في بطنه.",
          character: "🐋🕯️",
          bgGradient: "linear-gradient(135deg, #0F172A, #1E293B)"
        },
        {
          title: "دعاء ذي النون المبارك",
          desc: "نادى في الظلمات: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ'.",
          character: "✨🤲",
          bgGradient: "linear-gradient(135deg, #14532D, #052E16)"
        },
        {
          title: "شجرة اليقطين والنجاة",
          desc: "قذفه الحوت إلى الشاطئ بسلام وأنبت الله عليه شجرة يقطين تظله وتشفيه.",
          character: "🌱🏖️",
          bgGradient: "linear-gradient(135deg, #FEF3C7, #86EFAC)"
        }
      ],
      content: `ركب نبي الله يونس عليه السلام سفينة في البحر، فهاجت الأمواج واضطربت. واقترع ركاب السفينة فسقط يونس في أعماق البحر الأزرق!

وهناك أرسل الله حوتاً ضخماً ابتلعه بلطف دون أن يؤذيه. وفي ظلمات ثلاث: ظلمة البحر، وظلمة الليل، وظلمة بطن الحوت، تذكر يونس تسبيح ربه وقال:
"لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ"

فأمر الله الحوت أن يقذفه على شاطئ آمن، وأنبت عليه شجرة يقطين تظله!`,
      lessons: [
        "التسبيح والدعاء ينقذ الإنسان من كل هم وضيق.",
        "الله قريب يسمع دعاءنا حتى لو كنا في أعمق بحر.",
        "الرجوع إلى الله والاستغفار مفتاح النجاة والسلام."
      ],
      interactiveQuestion: {
        question: "ما هو الذكر العظيم الذي دعا به يونس عليه السلام في بطن الحوت؟",
        options: ["لا حول ولا قوة إلا بالله", "لا إله إلا أنت سبحانك إني كنت من الظالمين", "الحمد لله رب العالمين"],
        correct: 1
      }
    }
  ],

  init() {
    this.renderKidsStoriesList();
    this.bindEvents();
  },

  bindEvents() {
    // إغلاق نافذة القراءة التفاعلية
    const closeReader = document.getElementById('btn-close-kids-reader');
    if (closeReader) {
      closeReader.addEventListener('click', () => {
        document.getElementById('kids-reader-modal').classList.remove('active');
      });
    }

    // إغلاق مسرح الفيديو التفاعلي
    const closeVideo = document.getElementById('btn-close-video-theater');
    if (closeVideo) {
      closeVideo.addEventListener('click', () => {
        const modal = document.getElementById('kids-video-modal');
        modal.classList.remove('active');
        const iframe = document.getElementById('kids-video-iframe');
        if (iframe) iframe.src = '';
        this.stopSpeech();
      });
    }

    // أزرار التحكم في مشاهد المسرح
    const prevSceneBtn = document.getElementById('btn-theater-prev-scene');
    const nextSceneBtn = document.getElementById('btn-theater-next-scene');
    const playNarrationBtn = document.getElementById('btn-theater-narration');

    if (prevSceneBtn) {
      prevSceneBtn.addEventListener('click', () => this.stepScene(-1));
    }
    if (nextSceneBtn) {
      nextSceneBtn.addEventListener('click', () => this.stepScene(1));
    }
    if (playNarrationBtn) {
      playNarrationBtn.addEventListener('click', () => this.toggleNarration());
    }
    // تبديل نمط العرض بين المسرح التفاعلي وبث الفيديو
    const tabStage = document.getElementById('tab-btn-interactive-stage');
    const tabVideo = document.getElementById('tab-btn-video-stream');
    const stageBox = document.getElementById('theater-stage-container');
    const videoBox = document.getElementById('theater-video-container');

    if (tabStage && tabVideo) {
      tabStage.addEventListener('click', () => {
        tabStage.classList.add('active');
        tabVideo.classList.remove('active');
        if (stageBox) stageBox.style.display = 'block';
        if (videoBox) videoBox.style.display = 'none';
      });

      tabVideo.addEventListener('click', () => {
        tabVideo.classList.add('active');
        tabStage.classList.remove('active');
        if (stageBox) stageBox.style.display = 'none';
        if (videoBox) videoBox.style.display = 'block';
      });
    }
  },

  renderKidsStoriesList() {
    const container = document.getElementById('kids-stories-cards-grid');
    if (!container) return;

    container.innerHTML = this.stories.map(s => `
      <div class="kids-story-card" data-id="${s.id}">
        <div class="kids-story-badge">
          <span>${s.badgeIcon}</span>
          <span>${s.categoryName}</span>
        </div>
        <h3 class="kids-story-title">${s.title}</h3>
        <p class="kids-story-subtitle">${s.subtitle}</p>
        <div class="kids-story-actions">
          <button class="btn-kids-action btn-read" data-id="${s.id}">
            <span>📖</span>
            <span>قراءة القصة</span>
          </button>
          <button class="btn-kids-action btn-watch" data-id="${s.id}">
            <span>🎬</span>
            <span>مسرح القصة والمرئي</span>
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-read').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        this.openReadingStory(id);
      });
    });

    container.querySelectorAll('.btn-watch').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        this.openVideoStory(id);
      });
    });
  },

  openReadingStory(storyId) {
    const story = this.stories.find(s => s.id === storyId);
    if (!story) return;
    this.currentStory = story;

    const modal = document.getElementById('kids-reader-modal');
    const titleEl = document.getElementById('kids-reader-title');
    const subEl = document.getElementById('kids-reader-category');
    const bodyEl = document.getElementById('kids-reader-body');
    const lessonsEl = document.getElementById('kids-reader-lessons');
    const quizArea = document.getElementById('kids-story-quiz-area');

    if (titleEl) titleEl.innerText = story.title;
    if (subEl) subEl.innerText = `${story.badgeIcon} ${story.categoryName} • ${story.duration} قراءة ممتعة`;

    if (bodyEl) {
      bodyEl.innerHTML = story.content.split('\n\n').map(p => `
        <p class="kids-story-p">${p}</p>
      `).join('');
    }

    if (lessonsEl) {
      lessonsEl.innerHTML = `
        <div class="kids-lessons-box">
          <h4>🌟 الدروس الذهبية المستفادة:</h4>
          <ul>
            ${story.lessons.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (quizArea && story.interactiveQuestion) {
      const q = story.interactiveQuestion;
      quizArea.innerHTML = `
        <div class="kids-quiz-box">
          <h4>🧠 سؤال الذكاء الذهبي للقصة:</h4>
          <p class="kids-quiz-q">${q.question}</p>
          <div class="kids-quiz-options">
            ${q.options.map((opt, idx) => `
              <button class="kids-quiz-opt" data-idx="${idx}">${opt}</button>
            `).join('')}
          </div>
          <div class="kids-quiz-result" id="kids-story-quiz-res" style="display: none;"></div>
        </div>
      `;

      quizArea.querySelectorAll('.kids-quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-idx'));
          const resBox = document.getElementById('kids-story-quiz-res');
          if (idx === q.correct) {
            btn.classList.add('correct');
            if (resBox) {
              resBox.style.display = 'block';
              resBox.className = 'kids-quiz-result success';
              resBox.innerText = 'أحسنت يا بطل! إجابة صحيحة +15 حسنة وقطرة ماء لحديقتك 🌟💧';
            }
            if (window.RawhGarden) {
              RawhGarden.playWaterSound();
              RawhStorage.addXP(15, 'إجابة قصة الأطفال');
            }
          } else {
            btn.classList.add('wrong');
            if (resBox) {
              resBox.style.display = 'block';
              resBox.className = 'kids-quiz-result error';
              resBox.innerText = 'حاول مرة أخرى يا بطل، فكّر جيداً في القصة!';
            }
          }
        });
      });
    }

    modal.classList.add('active');
  },

  openVideoStory(storyId) {
    const story = this.stories.find(s => s.id === storyId);
    if (!story) return;
    this.currentStory = story;
    this.currentSceneIdx = 0;

    const modal = document.getElementById('kids-video-modal');
    const titleEl = document.getElementById('kids-video-title');
    const iframe = document.getElementById('kids-video-iframe');

    if (titleEl) titleEl.innerText = `مسرح بوابة الجنة: ${story.title}`;
    if (iframe) iframe.src = story.videoUrl;

    this.renderSceneVisual();
    modal.classList.add('active');

    // كسب حسنات لمشاهدة القصة التربوية
    if (window.RawhStorage) {
      RawhStorage.addXP(10, 'مشاهدة قصة مرئية');
    }
  },

  renderSceneVisual() {
    if (!this.currentStory || !this.currentStory.scenes) return;
    const scene = this.currentStory.scenes[this.currentSceneIdx];
    if (!scene) return;

    const stage = document.getElementById('theater-scene-stage');
    const titleEl = document.getElementById('theater-scene-title');
    const descEl = document.getElementById('theater-scene-desc');
    const badgeEl = document.getElementById('theater-scene-badge');

    if (stage) {
      stage.style.background = scene.bgGradient;
      stage.innerHTML = `
        <div class="scene-anim-char pop-in">${scene.character}</div>
      `;
    }

    if (titleEl) titleEl.innerText = scene.title;
    if (descEl) descEl.innerText = scene.desc;
    if (badgeEl) badgeEl.innerText = `المشهد ${this.currentSceneIdx + 1} من ${this.currentStory.scenes.length}`;

    // إضافة رابط المشاهدة الخارجية إن وجد
    const ytContainer = document.getElementById('theater-yt-link-box');
    if (ytContainer) {
      const directUrl = this.currentStory.videoUrl.replace('/embed/', '/watch?v=').replace('youtube-nocookie.com', 'youtube.com');
      ytContainer.innerHTML = `
        <a href="${directUrl}" target="_blank" rel="noopener noreferrer" class="btn-yt-external" style="display: inline-flex; align-items: center; gap: 6px; background: #DC2626; color: #FFF; padding: 7px 16px; border-radius: 20px; font-size: 0.8rem; text-decoration: none; font-weight: bold; margin-top: 10px; box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);">
          <span>▶</span>
          <span>فتح الفيديو على يوتيوب ↗</span>
        </a>
      `;
    }
  },

  stepScene(delta) {
    if (!this.currentStory || !this.currentStory.scenes) return;
    const total = this.currentStory.scenes.length;
    this.currentSceneIdx = (this.currentSceneIdx + delta + total) % total;
    this.renderSceneVisual();
    if (this.isPlayingStoryAudio) {
      this.speakCurrentScene();
    }
  },

  toggleNarration() {
    if (this.isPlayingStoryAudio) {
      this.stopSpeech();
    } else {
      this.speakCurrentScene();
    }
  },

  speakCurrentScene() {
    if (!this.currentStory || !this.currentStory.scenes) return;
    const scene = this.currentStory.scenes[this.currentSceneIdx];
    const textToSpeak = `${scene.title}. ${scene.desc}`;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(textToSpeak);
      utter.lang = 'ar-SA';
      utter.rate = 0.9; // سرعة هادئة للأطفال

      utter.onstart = () => {
        this.isPlayingStoryAudio = true;
        this.updateNarrationBtn(true);
      };

      utter.onend = () => {
        this.isPlayingStoryAudio = false;
        this.updateNarrationBtn(false);
      };

      utter.onerror = () => {
        this.isPlayingStoryAudio = false;
        this.updateNarrationBtn(false);
      };

      window.speechSynthesis.speak(utter);
    } else {
      // نغمة رنانة بديلة في حال عدم دعم النطق
      if (window.RawhPlayer) RawhPlayer.fallbackSyntheticPeaceAudio(scene.title);
    }
  },

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlayingStoryAudio = false;
    this.updateNarrationBtn(false);
  },

  updateNarrationBtn(isPlaying) {
    const btn = document.getElementById('btn-theater-narration');
    if (!btn) return;
    if (isPlaying) {
      btn.innerHTML = '<span>🔊</span> <span>إيقاف الراوي الصوتي</span>';
      btn.classList.add('speaking');
    } else {
      btn.innerHTML = '<span>🎙️</span> <span>استمع لرواية المشهد</span>';
      btn.classList.remove('speaking');
    }
  }
};

if (typeof window !== 'undefined') {
  window.RawhKidsStories = RawhKidsStories;
}
