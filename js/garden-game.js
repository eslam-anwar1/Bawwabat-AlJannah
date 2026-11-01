/**
 * بوابة الجنة - نظام الجذب الذكي والإدمان الإيجابي
 * حديقة الفردوس الافتراضية، سقاية شجرة الحسنات، عداد تتابع الأيام والشارات
 */

const RawhGarden = {
  LEVEL_NAMES: [
    "",
    "بذرة الإيمان الطيبة",
    "برعم السكينة",
    "شتلة النور",
    "شجرة الحسنات المزهرة",
    "روضة الروح الوارفة"
  ],

  LEVEL_THRESHOLDS: [0, 0, 100, 250, 500, 1000],

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
    const result = RawhStorage.waterGarden();
    if (!result.success) {
      this.showToast(result.message, 'warning');
      return;
    }

    // تأثير صوتي هادئ لقطرة الماء
    this.playWaterSound();

    // تشغيل أنيميشن قطرات الماء وتفتّح الزهر
    this.triggerWaterAnimation();

    this.showToast('بارك الله فيك! سقيت حديقتك ونالت روحك +15 حسنة 🌿✨', 'success');
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

    // تمثيل فني راقٍ للشجرة بمستوياتها الخمسة
    const svgs = {
      1: `<svg class="garden-svg" viewBox="0 0 200 200">
            <ellipse cx="100" cy="180" rx="70" ry="15" fill="#4B3621" opacity="0.4"/>
            <path d="M100 170 C95 155 105 150 100 140" stroke="#8B5A2B" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="100" cy="138" rx="8" ry="12" fill="#10B981"/>
            <circle cx="100" cy="135" r="3" fill="#34D399"/>
          </svg>`,
      2: `<svg class="garden-svg" viewBox="0 0 200 200">
            <ellipse cx="100" cy="180" rx="70" ry="15" fill="#4B3621" opacity="0.4"/>
            <path d="M100 175 C98 145 102 130 100 110" stroke="#8B5A2B" stroke-width="6" stroke-linecap="round"/>
            <path d="M100 135 Q75 125 70 110 Q90 115 100 130" fill="#10B981"/>
            <path d="M100 125 Q125 115 130 100 Q110 105 100 120" fill="#059669"/>
            <circle cx="100" cy="105" r="7" fill="#34D399"/>
          </svg>`,
      3: `<svg class="garden-svg" viewBox="0 0 200 200">
            <ellipse cx="100" cy="180" rx="80" ry="16" fill="#4B3621" opacity="0.4"/>
            <path d="M100 175 Q96 120 100 90" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
            <circle cx="100" cy="80" r="32" fill="#10B981" opacity="0.9"/>
            <circle cx="80" cy="88" r="22" fill="#059669" opacity="0.9"/>
            <circle cx="120" cy="88" r="22" fill="#34D399" opacity="0.9"/>
            <circle cx="95" cy="70" r="5" fill="#FDE047"/>
            <circle cx="115" cy="75" r="4" fill="#FDE047"/>
          </svg>`,
      4: `<svg class="garden-svg" viewBox="0 0 200 200">
            <ellipse cx="100" cy="180" rx="85" ry="18" fill="#4B3621" opacity="0.45"/>
            <path d="M96 180 Q93 115 100 75" stroke="#78350F" stroke-width="12" stroke-linecap="round"/>
            <path d="M98 120 Q70 100 60 90" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
            <path d="M100 110 Q130 95 140 85" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
            <circle cx="100" cy="65" r="42" fill="#059669"/>
            <circle cx="70" cy="75" r="30" fill="#10B981"/>
            <circle cx="130" cy="75" r="30" fill="#10B981"/>
            <circle cx="100" cy="45" r="28" fill="#34D399"/>
            <!-- زهور ذهبية متفتحة -->
            <circle cx="75" cy="65" r="5" fill="#FBBF24"/>
            <circle cx="125" cy="65" r="5" fill="#FBBF24"/>
            <circle cx="100" cy="85" r="6" fill="#F59E0B"/>
            <circle cx="100" cy="40" r="5" fill="#FDE047"/>
          </svg>`,
      5: `<svg class="garden-svg glowing-garden" viewBox="0 0 200 200">
            <ellipse cx="100" cy="180" rx="90" ry="20" fill="#4B3621" opacity="0.5"/>
            <!-- الجذع الراسخ -->
            <path d="M94 185 Q90 105 100 65" stroke="#78350F" stroke-width="16" stroke-linecap="round"/>
            <!-- التاج الملكي الأخضر -->
            <circle cx="100" cy="60" r="52" fill="#047857"/>
            <circle cx="60" cy="70" r="38" fill="#059669"/>
            <circle cx="140" cy="70" r="38" fill="#059669"/>
            <circle cx="75" cy="40" r="34" fill="#10B981"/>
            <circle cx="125" cy="40" r="34" fill="#10B981"/>
            <circle cx="100" cy="30" r="30" fill="#34D399"/>
            <!-- هالة نور وثمار ذهبية -->
            <circle cx="70" cy="55" r="6" fill="#FBBF24" filter="drop-shadow(0 0 4px #F59E0B)"/>
            <circle cx="130" cy="55" r="6" fill="#FBBF24" filter="drop-shadow(0 0 4px #F59E0B)"/>
            <circle cx="95" cy="40" r="6" fill="#FDE047" filter="drop-shadow(0 0 5px #FBBF24)"/>
            <circle cx="105" cy="80" r="7" fill="#F59E0B" filter="drop-shadow(0 0 4px #D97706)"/>
            <circle cx="55" cy="85" r="5" fill="#FDE047"/>
            <circle cx="145" cy="85" r="5" fill="#FDE047"/>
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
