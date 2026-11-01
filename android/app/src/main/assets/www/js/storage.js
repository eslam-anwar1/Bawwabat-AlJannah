/**
 * بوابة الجنة - إدارة البيانات المحلية والخصوصية التامة
 * جميع البيانات محفوظة محلياً فقط على جهاز المستخدم (100% Private)
 */

const RawhStorage = {
  KEYS: {
    STREAK: 'rawh_streak_data',
    GARDEN: 'rawh_garden_data',
    DHIKR_LOG: 'rawh_dhikr_log',
    SETTINGS: 'rawh_settings',
    BADGES: 'rawh_badges_data',
    PRAYER_NOTIFS: 'rawh_prayer_notifs',
    SAVED_CITY: 'rawh_saved_city'
  },

  // استرجاع أو تهيئة بيانات الحديقة وعداد الاستمرارية
  getGardenData() {
    const defaultData = {
      xp: 40,              // نقاط الحسنات والبركة
      waterDrops: 3,       // قطرات الماء المتوفرة للسقاية
      level: 1,            // مستوى نمو الحديقة (1: بذرة، 2: برعم، 3: شتلة، 4: شجرة مزهرة، 5: روضة غناء)
      lastWateredDate: null,
      totalWateredTimes: 0,
      streak: 1,           // تتابع الأيام الحالي
      lastVisitDate: new Date().toISOString().slice(0, 10),
      badges: ['first_step']
    };

    try {
      const raw = localStorage.getItem(this.KEYS.GARDEN);
      if (!raw) {
        this.saveGardenData(defaultData);
        return defaultData;
      }
      const data = JSON.parse(raw);
      this.updateStreakIfNeeded(data);
      return data;
    } catch (e) {
      console.warn('Error reading garden data:', e);
      return defaultData;
    }
  },

  saveGardenData(data) {
    try {
      localStorage.setItem(this.KEYS.GARDEN, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save garden data:', e);
    }
  },

  // فحص وتحديث تتابع الأيام (Daily Streak)
  updateStreakIfNeeded(data) {
    const today = new Date().toISOString().slice(0, 10);
    if (!data.lastVisitDate) {
      data.lastVisitDate = today;
      data.streak = 1;
      this.saveGardenData(data);
      return;
    }

    if (data.lastVisitDate === today) {
      return; // زار التطبيق اليوم بالفعل
    }

    const last = new Date(data.lastVisitDate);
    const curr = new Date(today);
    const diffTime = Math.abs(curr - last);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // زار التطبيق في اليوم التالي مباشرة: تتابع مستمر
      data.streak = (data.streak || 0) + 1;
      data.waterDrops = (data.waterDrops || 0) + 2; // مكافأة قطرتين ماء لليوم الجديد!
    } else if (diffDays > 1) {
      // انقطع أكثر من يوم، نعيد العداد إلى 1
      data.streak = 1;
      data.waterDrops = (data.waterDrops || 0) + 1;
    }

    data.lastVisitDate = today;
    this.saveGardenData(data);
  },

  // إضافة حسنات أو نقاط للحديقة
  addXP(amount, actionName = '') {
    const data = this.getGardenData();
    data.xp = (data.xp || 0) + amount;

    // حساب مستوى الحديقة حسب النقاط
    // المستوى 1: 0-99, المستوى 2: 100-249, المستوى 3: 250-499, المستوى 4: 500-999, المستوى 5: 1000+
    const prevLevel = data.level;
    if (data.xp >= 1000) data.level = 5;
    else if (data.xp >= 500) data.level = 4;
    else if (data.xp >= 250) data.level = 3;
    else if (data.xp >= 100) data.level = 2;
    else data.level = 1;

    // إضافة قطرة ماء كل 50 نقطة
    if (Math.floor(data.xp / 50) > Math.floor((data.xp - amount) / 50)) {
      data.waterDrops = (data.waterDrops || 0) + 1;
    }

    this.saveGardenData(data);
    return { data, leveledUp: data.level > prevLevel };
  },

  // سقاية الحديقة
  waterGarden() {
    const data = this.getGardenData();
    if (data.waterDrops <= 0) {
      data.waterDrops = 3;
    }

    data.waterDrops -= 1;
    data.totalWateredTimes = (data.totalWateredTimes || 0) + 1;
    data.xp = (data.xp || 0) + 25; // السقاية تمنح 25 حسنة
    data.lastWateredDate = new Date().toISOString();

    // تحديث المستوى الفوري للحديقة حسب النقاط المكتسبة
    if (data.xp >= 600) data.level = 5;
    else if (data.xp >= 350) data.level = 4;
    else if (data.xp >= 175) data.level = 3;
    else if (data.xp >= 75) data.level = 2;
    else data.level = 1;

    // فحص الشارات
    if (data.totalWateredTimes >= 1 && !data.badges.includes('first_water')) {
      data.badges.push('first_water');
    }
    if (data.totalWateredTimes >= 10 && !data.badges.includes('garden_master')) {
      data.badges.push('garden_master');
    }
    if (data.streak >= 7 && !data.badges.includes('week_streak')) {
      data.badges.push('week_streak');
    }

    this.saveGardenData(data);
    return { success: true, data };
  },

  // تفضيلات التنبيهات وإعدادات الصلوات
  getPrayerSettings() {
    const defaultSettings = {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
      soundEnabled: true,
      method: 'MWL' // رابطة العالم الإسلامي كافتراضي
    };
    try {
      const raw = localStorage.getItem(this.KEYS.PRAYER_NOTIFS);
      return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  },

  savePrayerSettings(settings) {
    try {
      localStorage.setItem(this.KEYS.PRAYER_NOTIFS, JSON.stringify(settings));
    } catch (e) {}
  },

  // حفظ المدينة المختارة للمواقيت
  getSavedCity() {
    try {
      const raw = localStorage.getItem(this.KEYS.SAVED_CITY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  saveCity(cityObj) {
    try {
      localStorage.setItem(this.KEYS.SAVED_CITY, JSON.stringify(cityObj));
    } catch (e) {}
  }
};

if (typeof window !== 'undefined') {
  window.RawhStorage = RawhStorage;
}
