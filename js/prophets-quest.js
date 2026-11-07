/**
 * بوابة الجنة - لعبة مسابقات وتاريخ الأنبياء الكرام (Prophets Quest)
 * لعبة إسلامية تفاعلية مشوقة تروي معجزات ومسيرات الأنبياء عبر أسئلة ذكية ونظام أوسمة
 */

const RawhProphetsQuest = {
  currentLevel: 0,
  score: 0,
  streak: 0,
  answered: false,

  prophetsData: [
    {
      id: 1,
      name: "سيدنا آدم عليه السلام",
      title: "أبو البشر وأول الأنبياء",
      icon: "🌱",
      era: "بداية الخلق في الجنة",
      question: "مِمَّ خلق الله تعالى سيدنا آدم عليه السلام، وما هي الكلمات التي تلقاها ربه فتاب عليه بها؟",
      options: [
        "خُلق من طين لازب وتراب، وتلقى كلمات التوبة: {ربنا ظلمنا أنفسنا وإن لم تغفر لنا وترحمنا لنكونن من الخاسرين}",
        "خُلق من نور ساطع، وتلقى كلمات التسبيح الدائم",
        "خُلق من نار السموم، وتلقى كلمات الشكر",
        "خُلق من ماء مهين في الأرض مباشرة"
      ],
      correctIndex: 0,
      explanation: "خلق الله آدم من تراب وطين ونفخ فيه من روحه، وعلمه الأسماء كلها، وحين أكل من الشجرة تاب الله عليه بكلمات الاستغفار العظيمة.",
      quote: "{فَتَلَقَّىٰ آدَمُ مِن رَّبِّهِ كَلِمَاتٍ فَتَابَ عَلَيْهِ ۚ إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ}"
    },
    {
      id: 2,
      name: "سيدنا نوح عليه السلام",
      title: "شيخ المرسلين وصاحب الفلك المشحون",
      icon: "🌊",
      era: "دعوة استمرت 950 عاماً",
      question: "كم لبث سيدنا نوح عليه السلام يدعو قومه ليلاً ونهاراً وسراً وجهاراً؟ وعلى أي جبل استوت سفينته؟",
      options: [
        "لبث 500 سنة، واستوت على جبل أحد",
        "لبث 950 سنة (ألف سنة إلا خمسين عاماً)، واستوت على جبل الجودي",
        "لبث 300 سنة، واستوت على جبل الطور",
        "لبث 700 سنة، واستوت على جبل النور"
      ],
      correctIndex: 1,
      explanation: "قال تعالى: {فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا}، وبعد الطوفان العظيم رست السفينة بأمر الله على جبل الجودي.",
      quote: "{وَقِيلَ يَا أَرْضُ ابْلَعِي مَاءَكِ وَيَا سَمَاءُ أَقْلِعِي وَغِيضَ الْمَاءُ وَقُضِيَ الْأَمْرُ وَاسْتَوَتْ عَلَى الْجُودِيِّ}"
    },
    {
      id: 3,
      name: "سيدنا إبراهيم عليه السلام",
      title: "خليل الرحمن وإمام الحنفاء وباني الكعبة",
      icon: "🔥",
      era: "بابل ومكة المكرمة",
      question: "ماذا قال الله تعالى للنار حين ألقى النمروذ وقومه سيدنا إبراهيم فيها؟",
      options: [
        "{قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ}",
        "{قُلْنَا يَا نَارُ انْطَفِئِي بِأَمْرِ رَبِّكِ}",
        "{وَأَنْزَلْنَا مَاءً فَأَطْفَأَ النَّارَ}",
        "{فَانْشَقَّتِ الْأَرْضُ وَابْتَلَعَتِ النَّارَ}"
      ],
      correctIndex: 0,
      explanation: "أمر الله النار ألا تؤذيه فكانت برداً وسلاماً، وبنى بعدها بيت الله الحرام مع ابنه إسماعيل ورفع القواعد.",
      quote: "{قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ • وَأَرَادُوا بِهِ كَيْدًا فَجَعَلْنَاهُمُ الْأَخْسَرِينَ}"
    },
    {
      id: 4,
      name: "سيدنا إسماعيل عليه السلام",
      title: "الذبيح الصابر وجدّ العرب العدنانيين",
      icon: "💧",
      era: "وادي مكة غير ذي زرع",
      question: "ما هي البئر المباركة التي فجرها الله تحت قدمي إسماعيل وهو رضيع استجابة لسعي أمه هاجر؟",
      options: [
        "بئر رومة",
        "بئر زمزم المباركة",
        "بئر ذي طوى",
        "بئر حراء"
      ],
      correctIndex: 1,
      explanation: "فجر جبريل عليه السلام ماء زمزم تحت أقدام إسماعيل لما سعت أمه هاجر سبع مرات بين الصفا والمروة، فصارت زمزم طعام طعم وشفاء سقم.",
      quote: "{رَّبَّنَا إِنِّي أَسْكَنتُ مِن ذُرِّيَّتِي بِوَادٍ غَيْرِ ذِي زَرْعٍ عِندَ بَيْتِكَ الْمُحَرَّمِ}"
    },
    {
      id: 5,
      name: "سيدنا يوسف عليه السلام",
      title: "الصديق الجميل صاحب أحسن القصص",
      icon: "👑",
      era: "أرض كنعان ومصر القديمة",
      question: "ما هي الرؤيا العجيبة التي رآها يوسف في صباه وتحققت بعد سنوات طوال في مصر؟",
      options: [
        "رأى أحد عشر كوكباً والشمس والقمر له ساجدين",
        "رأى سبع بقرات سمان يأكلهن سبع عجاف",
        "رأى أنه يعصر خمراً وأخوه يحمل خبزاً",
        "رأى شجرة طوبى تمتد في السماء"
      ],
      correctIndex: 0,
      explanation: "بدأت القصة برؤيا السجود الأحد عشر كوكباً (إخوته) والشمس والقمر (أبوه وأمه)، وتحققت برفع أبويه على العرش وخروا له سجداً سجود تحية وتكريم.",
      quote: "{إِذْ قَالَ يُوسُفُ لِأَبِيهِ يَا أَبَتِ إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا وَالشَّمْسَ وَالْقَمَرَ رَأَيْتُهُمْ لِي سَاجِدِينَ}"
    },
    {
      id: 6,
      name: "سيدنا موسى عليه السلام",
      title: "كليم الله صاحب المعجزات التسع",
      icon: "⚡",
      era: "مصر وسيناء وجبل الطور",
      question: "ما هي المعجزة العظيمة التي نجى الله بها موسى وبني إسرائيل من بطش فرعون وجنوده؟",
      options: [
        "انفلاق البحر بعصاه إلى اثني عشر طريقاً يابساً وغرق فرعون",
        "نزول طير أبابيل ترميهم بحجارة من سجيل",
        "إرسال ريح صرصر عاتية أهلكت فرعون",
        "خسف الأرض بقصر فرعون وجنده"
      ],
      correctIndex: 0,
      explanation: "أوحى الله لموسى أن يضرب البحر بعصاه، فانفلق فكان كل فرق كالطود العظيم، ونجى الله المؤمنين وأغرق الظالمين.",
      quote: "{فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ ۖ فَانفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ}"
    },
    {
      id: 7,
      name: "سيدنا سليمان عليه السلام",
      title: "النبي الملك الذي دانت له الإنس والجن والريح",
      icon: "🕊️",
      era: "بيت المقدس ومملكة سبأ",
      question: "ما هي اللغة والقدرة الخاصة التي وهبها الله لسليمان عليه السلام ولم تعطَ لأحد غيره؟",
      options: [
        "علمه منطق الطير والحيوان وسخر له الجن والريح غدوها شهر ورواحها شهر",
        "ألان له الحديد كالشمع بيده",
        "أعطاه مفاتيح كنوز قارون",
        "علمه علم الفلك وحركة النجوم"
      ],
      correctIndex: 0,
      explanation: "سليمان بن داود عليهما السلام آتاه الله ملكاً لا ينبغي لأحد من بعده، وعلمه منطق الطير وفهم تسبيح النملة وكلم الهدهد.",
      quote: "{وَوَرِثَ سُلَيْمَانُ دَاوُودَ ۖ وَقَالَ يَا أَيُّهَا النَّاسُ عُلِّمْنَا مَنطِقَ الطَّيْرِ وَأُوتِينَا مِن كُلِّ شَيْءٍ}"
    },
    {
      id: 8,
      name: "سيدنا يونس عليه السلام",
      title: "ذو النون وصاحب الحوت",
      icon: "🐋",
      era: "نينوى والبحر العظيم",
      question: "ما هي الدعوة الخالدة التي نادى بها يونس في بطن الحوت فاستجاب الله له ونجاه من الغم؟",
      options: [
        "{لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ}",
        "{رَبِّ إِنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ}",
        "{رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً}",
        "{حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ}"
      ],
      correctIndex: 0,
      explanation: "دعوة ذي النون في ظلمات ثلاث (الليل والبحر وبطن الحوت) ما دعا بها مكروب إلا فرج الله عنه، وأنبت الله عليه شجرة من يقطين تظله وتشفيه.",
      quote: "{فَنَادَىٰ فِي الظُّلُمَاتِ أَن لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ • فَاسْتَجَبْنَا لَهُ وَنَجَّيْنَاهُ مِنَ الْغَمِّ}"
    },
    {
      id: 9,
      name: "سيدنا عيسى عليه السلام",
      title: "المسيح كلمة الله وروح منه",
      icon: "🕊️",
      era: "بيت لحم والقدس",
      question: "ما هي المعجزات الباهرة التي أيد الله بها نبيه عيسى ابن مريم عليه السلام بإذن الله؟",
      options: [
        "تكلم في المهد صبياً، وأبرأ الأكمه والأبرص، وأحيا الموتى بإذن الله وخلق من الطين كهيئة الطير",
        "شق القمر إلى نصفين وانفجار الماء من بين أصابعه",
        "صنع سفينة ضخمة في الصحراء",
        "تسخير الجبال تسبح معه بالعشي والإشراق"
      ],
      correctIndex: 0,
      explanation: "وُلد عيسى بمعجزة من غير أب من أمه العذراء البتول مريم، ونطق بالمهد قائلاً: {إني عبد الله آتاني الكتاب وجعلني نبياً}، ورُفع إلى السماء حياً.",
      quote: "{إِذْ قَالَ اللَّهُ يَا عِيسَى ابْنَ مَرْيَمَ اذْكُرْ نِعْمَتِي عَلَيْكَ وَعَلَىٰ وَالِدَتِكَ إِذْ أَيَّدتُّكَ بِرُوحِ الْقُدُسِ تُكَلِّمُ النَّاسَ فِي الْمَهْدِ وَكَهْلًا}"
    },
    {
      id: 10,
      name: "سيدنا محمد صلى الله عليه وسلم",
      title: "خاتم الأنبياء والمرسلين والرحمة المهداة للعالمين",
      icon: "⭐",
      era: "مكة والمدينة ورسالة الإسلام الخالدة",
      question: "ما هي المعجزة الكبرى الخالدة لنبينا محمد ﷺ المحفوظة بحفظ الله إلى يوم الدين؟",
      options: [
        "القرآن الكريم العظيم المعجز بلفظه ومعناه وأحكامه وهدايته",
        "شق صدره الشريف في بادية بني سعد",
        "حنين الجذع حين فارقه",
        "نبع الماء من بين أصابعه الشريفة"
      ],
      correctIndex: 0,
      explanation: "القرآن الكريم هو معجزة الإسلام الخالدة التي تحدى الله بها الثقلين الإنس والجن، وهو نور القلوب وشفاء الصدور ودستور السعادة الأبدية.",
      quote: "{إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ}"
    }
  ],

  init() {
    this.currentLevel = 0;
    this.score = 0;
    this.streak = 0;
    this.answered = false;
    this.renderGame();
  },

  renderGame() {
    const container = document.getElementById('prophets-quest-container');
    if (!container) return;

    if (this.currentLevel >= this.prophetsData.length) {
      this.renderVictory(container);
      return;
    }

    const p = this.prophetsData[this.currentLevel];
    const total = this.prophetsData.length;
    const progressPct = ((this.currentLevel) / total) * 100;

    container.innerHTML = `
      <div class="prophets-quest-card">
        <!-- شريط التقدم والمراحل -->
        <div class="pq-header-bar">
          <div class="pq-step-badge">
            <span>👑</span>
            <span>نبي الله: المرحلة ${this.currentLevel + 1} من ${total}</span>
          </div>
          <div class="pq-score-badge">
            <span>🌱</span>
            <span>${this.score} حسنة</span>
          </div>
        </div>

        <div class="pq-progress-track">
          <div class="pq-progress-fill" style="width: ${progressPct}%;"></div>
        </div>

        <!-- بطاقة هوية النبي -->
        <div class="prophet-identity-box">
          <div class="prophet-icon-circle">${p.icon}</div>
          <div class="prophet-meta-text">
            <h3 class="prophet-name">${p.name}</h3>
            <span class="prophet-title-tag">${p.title}</span>
            <span class="prophet-era-text">📍 ${p.era}</span>
          </div>
        </div>

        <!-- نص السؤال الذكي -->
        <div class="pq-question-bubble">
          <p>${p.question}</p>
        </div>

        <!-- خيارات الإجابة -->
        <div class="pq-options-grid" id="pq-options-list">
          ${p.options.map((opt, idx) => `
            <button class="pq-option-btn" data-index="${idx}">
              <span class="pq-opt-letter">${['أ', 'ب', 'ج', 'د'][idx]}</span>
              <span class="pq-opt-text">${opt}</span>
            </button>
          `).join('')}
        </div>

        <!-- لوحة النتيجة والتفسير عند الإجابة -->
        <div class="pq-feedback-drawer" id="pq-feedback-drawer" style="display: none;">
          <div class="pq-feedback-status" id="pq-feedback-status"></div>
          <div class="pq-feedback-explanation" id="pq-feedback-explanation"></div>
          <div class="pq-feedback-ayah" id="pq-feedback-ayah"></div>
          <button class="pq-next-btn" id="pq-next-level-btn">المرحلة التالية ◀</button>
        </div>
      </div>
    `;

    this.bindOptionClicks(p);
  },

  bindOptionClicks(prophet) {
    const list = document.getElementById('pq-options-list');
    if (!list) return;

    list.querySelectorAll('.pq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.answered) return;
        this.answered = true;

        const selectedIdx = parseInt(btn.getAttribute('data-index'));
        const isCorrect = selectedIdx === prophet.correctIndex;

        const drawer = document.getElementById('pq-feedback-drawer');
        const statusEl = document.getElementById('pq-feedback-status');
        const explEl = document.getElementById('pq-feedback-explanation');
        const ayahEl = document.getElementById('pq-feedback-ayah');
        const nextBtn = document.getElementById('pq-next-level-btn');

        // تلوين الخيارات
        list.querySelectorAll('.pq-option-btn').forEach((b, idx) => {
          if (idx === prophet.correctIndex) {
            b.classList.add('correct');
          } else if (idx === selectedIdx && !isCorrect) {
            b.classList.add('wrong');
          }
        });

        if (isCorrect) {
          this.score += 25;
          this.streak++;
          statusEl.innerHTML = '<span style="color: #10B981; font-weight: bold; font-size: 1.15rem;">✨ إجابة صحيحة ومباركة! أحسنت (+25 حسنة)</span>';
          
          if (navigator.vibrate) navigator.vibrate([40, 30, 60]);
          if (window.RawhGarden) {
            RawhGarden.playWaterSound();
            RawhStorage.addXP(25, `معرفة سيرة ${prophet.name}`);
          }
        } else {
          this.streak = 0;
          statusEl.innerHTML = '<span style="color: #EF4444; font-weight: bold; font-size: 1.15rem;">علمٌ مبارك يُضاف لمعلوماتك 🌿</span>';
          if (navigator.vibrate) navigator.vibrate(80);
        }

        explEl.innerText = prophet.explanation;
        ayahEl.innerText = prophet.quote;

        drawer.style.display = 'block';

        nextBtn.onclick = () => {
          this.currentLevel++;
          this.answered = false;
          this.renderGame();
        };
      });
    });
  },

  renderVictory(container) {
    // منح وسام الأنبياء العظيم وقطرات ماء
    if (window.RawhStorage) {
      const data = RawhStorage.getGardenData();
      data.waterDrops = (data.waterDrops || 0) + 3;
      if (!data.badges) data.badges = [];
      if (!data.badges.includes('prophets_master')) {
        data.badges.push('prophets_master');
      }
      RawhStorage.saveGardenData(data);
      RawhStorage.addXP(100, 'إتمام مسابقات الأنبياء كاملة');
    }

    container.innerHTML = `
      <div class="prophets-victory-card">
        <div class="victory-trophy">🏆🌟</div>
        <h2 style="color: var(--primary-emerald); margin-bottom: 8px;">مبارك! نلت وسام معرفة الأنبياء الكرام</h2>
        <p style="font-size: 0.95rem; color: var(--text-dark); line-height: 1.6; margin-bottom: 14px;">
          لقد أتممت كافة مراحل مسابقات قصص الأنبياء بنجاح واكتسبت علماً نافعاً في سيرة خيرة خلق الله عليهم الصلاة والسلام!
        </p>
        <div class="victory-rewards-tag">
          <span>🎁 المكافأة المباركة:</span>
          <strong>+100 حسنة و +3 قطرات ماء لبستان الجنة 💧🌱</strong>
        </div>
        <button class="pq-next-btn" style="width: auto; padding: 12px 24px; margin-top: 15px;" id="btn-restart-pq">
          إعادة المسابقة وتثبيت المعلومات 🔄
        </button>
      </div>
    `;

    const restartBtn = document.getElementById('btn-restart-pq');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.init();
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.RawhProphetsQuest = RawhProphetsQuest;
}
