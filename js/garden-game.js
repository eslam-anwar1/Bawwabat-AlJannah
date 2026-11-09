/**
 * بوابة الجنة - نظام التحفيز والتفاعل الإيماني اليومي
 * حديقة الفردوس الافتراضية، سقاية شجرة الحسنات، عداد تتابع الأيام والشارات
 */

const RawhGarden = {
  LEVEL_NAMES: [
    "",
    "🌱 بذرة الإيمان الطيبة (في تربة خصبة)",
    "🌿 برعم السكينة المبارك (يتفتّح بالنور)",
    "🌳 شتلة النور والبركة (تزهر وتكبر)",
    "🌴 شجرة الحسنات المزهرة (مثمرة بالخيرات)",
    "🌺 بستان وروضة الفردوس الأعلى (جنة وارفة)"
  ],

  LEVEL_THRESHOLDS: [0, 0, 75, 175, 350, 600],

  init() {
    this.renderGarden();
    this.bindEvents();
  },

  bindEvents() {
    const waterBtn = document.getElementById('btn-water-garden');
    if (waterBtn) {
      waterBtn.addEventListener('click', () => this.handleWatering());
    }
  },

  handleWatering() {
    let data = RawhStorage.getGardenData();

    // إذا نفدت القطرات، نمنحه هدية ربانية للاستمرار دون توقف
    if ((data.waterDrops || 0) <= 0) {
      data.waterDrops = 3;
      RawhStorage.saveGardenData(data);
      this.showToast('مكافأة ربانية! +3 قطرات ماء لمواصلة رعاية بستانك 💧✨', 'success');
    }

    const result = RawhStorage.waterGarden();
    data = result.data;

    // تأثير صوتي مهدئ
    this.playWaterSound();

    // تشغيل أنيميشن السقاية ونمو النبتة
    this.triggerWaterAnimation();

    const stage = document.getElementById('garden-visual-stage');
    if (stage) {
      stage.classList.remove('tree-growth-pulse');
      void stage.offsetWidth; // trigger reflow
      stage.classList.add('tree-growth-pulse');

      // نص طائر مبارك
      const floatXp = document.createElement('div');
      floatXp.className = 'floating-blessing-xp';
      floatXp.innerText = '+25 حسنة! 🌿💧';
      stage.appendChild(floatXp);
      setTimeout(() => floatXp.remove(), 1400);
    }

    this.showToast('ما شاء الله! سقيت بذرة الإيمان ونالت روحك حسنات مباركة 🌿✨', 'success');
    this.renderGarden();
  },

  renderGarden() {
    const data = RawhStorage.getGardenData();

    // تحديث عداد التتابع Streak
    const streakVal = document.getElementById('streak-count-val');
    if (streakVal) streakVal.innerText = `${data.streak || 1} يوم`;

    // قطرات الماء المتوفرة
    const dropsVal = document.getElementById('water-drops-val');
    if (dropsVal) dropsVal.innerText = `${data.waterDrops || 0} قطرة`;

    // نقاط الحسنات والبركة
    const xpVal = document.getElementById('garden-xp-val');
    if (xpVal) xpVal.innerText = `${data.xp || 0} حسنة`;

    // اسم المستوى الحالي
    const levelName = document.getElementById('garden-level-name');
    if (levelName) levelName.innerText = this.LEVEL_NAMES[data.level] || 'شجرة الحسنات';

    // شريط التقدم نحو المستوى التالي
    const curThreshold = this.LEVEL_THRESHOLDS[data.level];
    const nextThreshold = this.LEVEL_THRESHOLDS[data.level + 1] || 1500;
    const progress = Math.min(100, Math.max(0, ((data.xp - curThreshold) / (nextThreshold - curThreshold)) * 100));

    const progressBar = document.getElementById('garden-progress-bar');
    if (progressBar) progressBar.style.width = `${progress}%`;

    const progressLabel = document.getElementById('garden-progress-label');
    if (progressLabel) {
      progressLabel.innerText = data.level >= 5 ? 'وصلت إلى أبهى حديقة مباركة!' : `${Math.round(progress)}% حتى الترقية للمستوى التالي`;
    }

    // رسم صورة الحديقة أو الشجرة التفاعلية حسب المستوى
    this.renderTreeGraphic(data.level);

    // تحديث الشارات
    this.renderBadges(data.badges || []);
  },

  renderTreeGraphic(level) {
    const container = document.getElementById('garden-visual-stage');
    if (!container) return;

    // تمثيل فني راقٍ للشجرة بمستوياتها الخمسة المتدرجة نحو بستان الجنة
    const svgs = {
      1: `<svg class="garden-svg" viewBox="0 0 200 200">
            <!-- أشعة الشمس والسكينة -->
            <circle cx="100" cy="50" r="28" fill="#FEF3C7" opacity="0.6"/>
            <circle cx="100" cy="50" r="14" fill="#FDE047"/>
            <!-- التربة الخصبة -->
            <ellipse cx="100" cy="175" rx="75" ry="16" fill="#582F0E"/>
            <ellipse cx="100" cy="170" rx="55" ry="10" fill="#7F4F24"/>
            <!-- البذرة النابتة وساق البداية -->
            <path d="M100 168 Q97 148 100 135" stroke="#15803D" stroke-width="4.5" stroke-linecap="round"/>
            <!-- ورقتان خضراوان يانعتان -->
            <path d="M100 138 Q82 130 84 120 Q95 125 100 136" fill="#22C55E"/>
            <path d="M100 136 Q118 128 116 118 Q105 124 100 135" fill="#16A34A"/>
            <!-- قطرة ندى مباركة تلمع -->
            <circle cx="100" cy="133" r="3.5" fill="#60A5FA" filter="drop-shadow(0 0 4px #3B82F6)"/>
            <text x="100" y="194" text-anchor="middle" font-size="11" fill="#15803D" font-weight="bold">بذرة الإيمان الطيبة</text>
          </svg>`,
      2: `<svg class="garden-svg" viewBox="0 0 200 200">
            <circle cx="100" cy="40" r="32" fill="#FEF3C7" opacity="0.7"/>
            <ellipse cx="100" cy="175" rx="80" ry="16" fill="#582F0E"/>
            <!-- ساق نامية قوية -->
            <path d="M100 172 Q96 135 100 105" stroke="#15803D" stroke-width="6" stroke-linecap="round"/>
            <!-- أوراق خضراء متفتحة -->
            <path d="M100 145 Q70 135 68 118 Q88 122 100 140" fill="#22C55E"/>
            <path d="M100 135 Q130 125 132 108 Q112 112 100 130" fill="#16A34A"/>
            <path d="M100 120 Q80 100 82 86 Q96 95 100 115" fill="#4ADE80"/>
            <path d="M100 115 Q120 98 118 84 Q104 93 100 110" fill="#22C55E"/>
            <!-- برعم زهرة صفراء يافعة -->
            <circle cx="100" cy="100" r="8" fill="#FBBF24" filter="drop-shadow(0 0 6px #F59E0B)"/>
            <circle cx="100" cy="98" r="4" fill="#FEF08A"/>
            <text x="100" y="194" text-anchor="middle" font-size="11" fill="#15803D" font-weight="bold">برعم السكينة المبارك</text>
          </svg>`,
      3: `<svg class="garden-svg" viewBox="0 0 200 200">
            <ellipse cx="100" cy="175" rx="82" ry="18" fill="#582F0E"/>
            <!-- جذع الشتلة الفتية -->
            <path d="M100 172 Q95 125 100 85" stroke="#78350F" stroke-width="9" stroke-linecap="round"/>
            <path d="M98 120 Q75 105 65 95" stroke="#78350F" stroke-width="4.5" stroke-linecap="round"/>
            <path d="M100 110 Q125 98 135 88" stroke="#78350F" stroke-width="4.5" stroke-linecap="round"/>
            <!-- كتل الأوراق الخضراء النضرة -->
            <circle cx="100" cy="72" r="36" fill="#15803D"/>
            <circle cx="70" cy="82" r="26" fill="#22C55E"/>
            <circle cx="130" cy="82" r="26" fill="#16A34A"/>
            <circle cx="100" cy="52" r="24" fill="#4ADE80"/>
            <!-- زهور بيضاء مباركة -->
            <circle cx="85" cy="65" r="4" fill="#FFFFFF"/>
            <circle cx="115" cy="68" r="4" fill="#FFFFFF"/>
            <circle cx="100" cy="85" r="4.5" fill="#FDE047"/>
            <text x="100" y="194" text-anchor="middle" font-size="11" fill="#15803D" font-weight="bold">شتلة النور والبركة</text>
          </svg>`,
      4: `<svg class="garden-svg" viewBox="0 0 200 200">
            <ellipse cx="100" cy="176" rx="88" ry="18" fill="#432818"/>
            <!-- الجذع المتين المتفرع -->
            <path d="M96 174 Q92 110 100 68" stroke="#78350F" stroke-width="13" stroke-linecap="round"/>
            <path d="M96 125 Q65 105 55 90" stroke="#78350F" stroke-width="7" stroke-linecap="round"/>
            <path d="M102 115 Q135 98 145 85" stroke="#78350F" stroke-width="7" stroke-linecap="round"/>
            <!-- التاج الملكي الأخضر المورق -->
            <circle cx="100" cy="55" r="46" fill="#14532D"/>
            <circle cx="65" cy="70" r="34" fill="#15803D"/>
            <circle cx="135" cy="70" r="34" fill="#16A34A"/>
            <circle cx="80" cy="38" r="28" fill="#22C55E"/>
            <circle cx="120" cy="38" r="28" fill="#4ADE80"/>
            <!-- ثمار ذهبية فواحة متلألئة -->
            <circle cx="68" cy="62" r="6" fill="#FBBF24" filter="drop-shadow(0 0 5px #F59E0B)"/>
            <circle cx="132" cy="62" r="6" fill="#FBBF24" filter="drop-shadow(0 0 5px #F59E0B)"/>
            <circle cx="100" cy="45" r="6.5" fill="#FDE047" filter="drop-shadow(0 0 6px #F59E0B)"/>
            <circle cx="95" cy="80" r="5.5" fill="#F59E0B"/>
            <circle cx="118" cy="80" r="5.5" fill="#F59E0B"/>
            <text x="100" y="194" text-anchor="middle" font-size="11" fill="#15803D" font-weight="bold">شجرة الحسنات المزهرة</text>
          </svg>`,
      5: `<svg class="garden-svg glowing-garden" viewBox="0 0 200 200">
            <!-- خلفية شمس الفردوس والهالة النورانية -->
            <circle cx="100" cy="50" r="55" fill="#FEF3C7" opacity="0.4"/>
            <!-- أرضية رياض الجنة الخضراء ومجرى ماء الكوثر -->
            <ellipse cx="100" cy="176" rx="95" ry="20" fill="#15803D"/>
            <path d="M40 178 Q100 168 160 178 Q100 186 40 178" fill="#38BDF8" opacity="0.85"/>
            <!-- الجذع الراسخ لشجرة طوبى -->
            <path d="M94 174 Q88 100 100 58" stroke="#713F12" stroke-width="16" stroke-linecap="round"/>
            <path d="M92 118 Q55 98 40 82" stroke="#713F12" stroke-width="8" stroke-linecap="round"/>
            <path d="M106 108 Q145 92 160 78" stroke="#713F12" stroke-width="8" stroke-linecap="round"/>
            <!-- التيجان الخضراء الوارفة -->
            <circle cx="100" cy="50" r="52" fill="#047857"/>
            <circle cx="50" cy="65" r="38" fill="#059669"/>
            <circle cx="150" cy="65" r="38" fill="#059669"/>
            <circle cx="75" cy="30" r="34" fill="#10B981"/>
            <circle cx="125" cy="30" r="34" fill="#34D399"/>
            <!-- ثمار الجنة الذهبية المتلألئة والنور -->
            <circle cx="50" cy="55" r="7" fill="#FBBF24" filter="drop-shadow(0 0 6px #F59E0B)"/>
            <circle cx="150" cy="55" r="7" fill="#FBBF24" filter="drop-shadow(0 0 6px #F59E0B)"/>
            <circle cx="100" cy="25" r="7.5" fill="#FDE047" filter="drop-shadow(0 0 8px #FBBF24)"/>
            <circle cx="75" cy="50" r="6" fill="#F59E0B"/>
            <circle cx="125" cy="50" r="6" fill="#F59E0B"/>
            <circle cx="95" cy="75" r="7" fill="#FBBF24"/>
            <!-- فراشات وطيور الخير -->
            <text x="35" y="45" font-size="14">🦋</text>
            <text x="155" y="42" font-size="14">🕊️</text>
            <text x="100" y="195" text-anchor="middle" font-size="11" fill="#047857" font-weight="bold">بستان وروضة الفردوس الأعلى 🌸</text>
          </svg>`
    };

    container.innerHTML = svgs[level] || svgs[1];
  },

  renderBadges(unlockedIds) {
    const list = [
      { id: 'first_step', title: 'خطوة مباركة', desc: 'الانضمام لتطبيق بوابة الجنة', icon: '🌟' },
      { id: 'first_water', title: 'ساقي الخير', desc: 'سقاية الحديقة لأول مرة', icon: '💧' },
      { id: 'garden_master', title: 'بستاني الجنة', desc: 'سقاية الحديقة 10 مرات', icon: '🌳' },
      { id: 'week_streak', title: 'شعلة الاستمرار', desc: 'تتابع 7 أيام متتالية', icon: '🔥' },
      { id: 'dhikr_lover', title: 'اللسان الذاكر', desc: 'إتمام 100 تسبيحة بالمسبحة', icon: '📿' }
    ];

    const badgesContainer = document.getElementById('garden-badges-list');
    if (!badgesContainer) return;

    badgesContainer.innerHTML = list.map(b => {
      const isUnlocked = unlockedIds.includes(b.id);
      return `
        <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-title">${b.title}</div>
          <div class="badge-status">${isUnlocked ? 'مُكتمل' : 'قيد الإنجاز'}</div>
        </div>
      `;
    }).join('');
  },

  triggerWaterAnimation() {
    const container = document.getElementById('garden-visual-stage');
    if (!container) return;

    for (let i = 0; i < 8; i++) {
      const drop = document.createElement('div');
      drop.className = 'animated-droplet';
      drop.style.left = `${40 + Math.random() * 40}%`;
      drop.style.animationDelay = `${i * 0.1}s`;
      container.appendChild(drop);
      setTimeout(() => drop.remove(), 1200);
    }
  },

  playWaterSound() {
    try {
      const audio = new Audio('assets/audio/water_drop.wav');
      audio.volume = 0.8;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => this.fallbackWebAudioWater());
      }
    } catch (e) {
      this.fallbackWebAudioWater();
    }
  },

  fallbackWebAudioWater() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  },

  showToast(message, type = 'info') {
    const toast = document.getElementById('app-toast');
    if (!toast) return;

    toast.innerText = message;
    toast.className = `app-toast active ${type}`;
    setTimeout(() => {
      toast.className = 'app-toast';
    }, 3500);
  }
};

if (typeof window !== 'undefined') {
  window.RawhGarden = RawhGarden;
}
