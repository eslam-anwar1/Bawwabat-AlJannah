/**
 * بوابة الجنة - حاسبة مواقيت الصلاة الدقيقة والأذان الذكي
 * مبنية على معادلات الفلك الإسلامي الموثوقة مع دعم تحديد الموقع والمدن
 */

const RawhPrayerTimes = {
  // المدن الافتراضية الجاهزة في حال عدم تفعيل GPS
  CITIES: [
    { name: "مكة المكرمة (أم القرى)", lat: 21.4225, lng: 39.8262, tz: 3, method: "Makkah" },
    { name: "المدينة المنورة", lat: 24.5247, lng: 39.5692, tz: 3, method: "Makkah" },
    { name: "القدس الشريف", lat: 31.7683, lng: 35.2137, tz: 3, method: "MWL" },
    { name: "القاهرة", lat: 30.0444, lng: 31.2357, tz: 2, method: "Egypt" },
    { name: "الرياض", lat: 24.7136, lng: 46.6753, tz: 3, method: "Makkah" },
    { name: "دبي", lat: 25.2048, lng: 55.2708, tz: 4, method: "Gulf" },
    { name: "عَمّان", lat: 31.9454, lng: 35.9284, tz: 3, method: "MWL" },
    { name: "بغداد", lat: 33.3152, lng: 44.3661, tz: 3, method: "MWL" },
    { name: "إسطنبول", lat: 41.0082, lng: 28.9784, tz: 3, method: "MWL" },
    { name: "الرباط", lat: 34.0209, lng: -6.8416, tz: 1, method: "MWL" }
  ],

  currentLocation: {
    name: "مكة المكرمة (أم القرى)",
    lat: 21.4225,
    lng: 39.8262,
    tz: 3
  },

  times: {},
  nextPrayer: null,
  updateTimer: null,

  init() {
    // استعادة المدينة المحفوظة إن وجدت
    const saved = RawhStorage.getSavedCity();
    if (saved) {
      this.currentLocation = saved;
    }

    this.calculateTimes();
    this.renderTimes();
    this.startCountdownTimer();
    this.bindEvents();
  },

  bindEvents() {
    // زر تحديد الموقع التلقائي عبر GPS
    const gpsBtn = document.getElementById('btn-gps-location');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => this.detectLocationViaGps());
    }

    // القائمة المنسدلة للمدن
    const citySelect = document.getElementById('city-selector');
    if (citySelect) {
      citySelect.addEventListener('change', (e) => {
        const selected = this.CITIES.find(c => c.name === e.target.value);
        if (selected) {
          this.currentLocation = selected;
          RawhStorage.saveCity(selected);
          this.calculateTimes();
          this.renderTimes();
          // تحديث بوصلة القبلة للمدينة الجديدة
          if (window.RawhQibla) {
            window.RawhQibla.updateCoordinates(selected.lat, selected.lng);
          }
        }
      });
    }
  },

  // كشف الموقع الجغرافي بالـ GPS
  detectLocationViaGps() {
    const locStatus = document.getElementById('location-status-text');
    if (locStatus) locStatus.innerText = 'جارٍ تحديد موقعك بدقة...';

    if (!navigator.geolocation) {
      if (locStatus) locStatus.innerText = 'المتصفح لا يدعم تحديد الموقع، تم اعتماد مكة المكرمة.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const tz = -new Date().getTimezoneOffset() / 60;

        this.currentLocation = {
          name: "موقعي الحالي (GPS)",
          lat: lat,
          lng: lng,
          tz: tz
        };
        RawhStorage.saveCity(this.currentLocation);

        if (locStatus) locStatus.innerText = `تم تحديد الموقع بدقة (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`;
        this.calculateTimes();
        this.renderTimes();

        if (window.RawhQibla) {
          window.RawhQibla.updateCoordinates(lat, lng);
        }
      },
      (err) => {
        console.warn('Geolocation error:', err);
        if (locStatus) locStatus.innerText = 'تعذر الوصول للموقع، يرجى اختيار مدينتك من القائمة.';
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  },

  // الحساب الفلكي لمواقيت الصلاة
  calculateTimes() {
    const date = new Date();
    const lat = this.currentLocation.lat;
    const lng = this.currentLocation.lng;
    const tz = this.currentLocation.tz;

    const julianDate = this.getJulianDate(date);
    const d = julianDate - 2451545.0;

    // حساب موقع الشمس
    const g = (357.529 + 0.98560028 * d) % 360;
    const q = (280.459 + 0.98564736 * d) % 360;
    const L = (q + 1.915 * Math.sin(this.degToRad(g)) + 0.020 * Math.sin(this.degToRad(2 * g))) % 360;
    const e = 23.439 - 0.00000036 * d;

    // ميل الشمس وميل الزوال
    const RA = this.radToDeg(Math.atan2(Math.cos(this.degToRad(e)) * Math.sin(this.degToRad(L)), Math.cos(this.degToRad(L)))) / 15;
    const declination = this.radToDeg(Math.asin(Math.sin(this.degToRad(e)) * Math.sin(this.degToRad(L))));

    // معادلة الوقت
    const eqTime = (q / 15) - (RA < 0 ? RA + 24 : RA);

    // زوال الشمس (الظهر)
    const noon = 12 + tz - (lng / 15) - eqTime;

    // زوايا الحساب (زاوية الفجر والعشاء حسب أم القرى أو الرابطة)
    const fajrAngle = 18.5; // أم القرى
    const ishaAngle = 18.5;

    // حساب الشروق والغروب
    const sunriseAngle = 0.833;
    const sunAltSunrise = -sunriseAngle;

    const sunriseHourAngle = this.getHourAngle(lat, declination, sunAltSunrise);
    const fajrHourAngle = this.getHourAngle(lat, declination, -fajrAngle);
    const ishaHourAngle = this.getHourAngle(lat, declination, -ishaAngle);

    // صلاة العصر (المذهب الشافعي والجمهور: ظل الشيء مثله)
    const asrAlt = this.radToDeg(Math.atan(1 / (1 + Math.tan(this.degToRad(Math.abs(lat - declination))))));
    const asrHourAngle = this.getHourAngle(lat, declination, asrAlt);

    const timesObj = {
      fajr: noon - (fajrHourAngle / 15),
      sunrise: noon - (sunriseHourAngle / 15),
      dhuhr: noon,
      asr: noon + (asrHourAngle / 15),
      maghrib: noon + (sunriseHourAngle / 15),
      isha: noon + (ishaHourAngle / 15)
    };

    this.times = {
      fajr: this.formatFloatHours(timesObj.fajr),
      sunrise: this.formatFloatHours(timesObj.sunrise),
      dhuhr: this.formatFloatHours(timesObj.dhuhr),
      asr: this.formatFloatHours(timesObj.asr),
      maghrib: this.formatFloatHours(timesObj.maghrib),
      isha: this.formatFloatHours(timesObj.isha)
    };

    this.determineNextPrayer();
  },

  getHourAngle(lat, dec, alt) {
    const num = Math.sin(this.degToRad(alt)) - Math.sin(this.degToRad(lat)) * Math.sin(this.degToRad(dec));
    const den = Math.cos(this.degToRad(lat)) * Math.cos(this.degToRad(dec));
    const val = num / den;
    if (val > 1) return 0;
    if (val < -1) return 180;
    return this.radToDeg(Math.acos(val));
  },

  getJulianDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();

    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  },

  degToRad(deg) { return (deg * Math.PI) / 180.0; },
  radToDeg(rad) { return (rad * 180.0) / Math.PI; },

  formatFloatHours(hoursFloat) {
    let h = (hoursFloat + 24) % 24;
    const hours = Math.floor(h);
    const mins = Math.floor((h - hours) * 60);
    return {
      hours24: hours,
      minutes: mins,
      formatted: `${hours % 12 || 12}:${mins.toString().padStart(2, '0')} ${hours >= 12 ? 'م' : 'ص'}`
    };
  },

  determineNextPrayer() {
    const now = new Date();
    const curMinutes = now.getHours() * 60 + now.getMinutes();

    const prayerOrder = [
      { key: 'fajr', name: 'صلاة الفجر', icon: '🌅' },
      { key: 'sunrise', name: 'الشروق', icon: '☀️' },
      { key: 'dhuhr', name: 'صلاة الظهر', icon: '🌤️' },
      { key: 'asr', name: 'صلاة العصر', icon: '⛅' },
      { key: 'maghrib', name: 'صلاة المغرب', icon: '🌇' },
      { key: 'isha', name: 'صلاة العشاء', icon: '🌌' }
    ];

    let next = null;
    for (const p of prayerOrder) {
      const pTime = this.times[p.key];
      const pMinutes = pTime.hours24 * 60 + pTime.minutes;
      if (pMinutes > curMinutes) {
        next = { ...p, time: pTime, diffMinutes: pMinutes - curMinutes };
        break;
      }
    }

    if (!next) {
      // الصلاة القادمة فجر الغد
      const pTime = this.times.fajr;
      const pMinutes = pTime.hours24 * 60 + pTime.minutes + (24 * 60);
      next = { key: 'fajr', name: 'صلاة الفجر', icon: '🌅', time: pTime, diffMinutes: pMinutes - curMinutes };
    }

    this.nextPrayer = next;
  },

  renderTimes() {
    const prayers = [
      { key: 'fajr', id: 'time-fajr' },
      { key: 'sunrise', id: 'time-sunrise' },
      { key: 'dhuhr', id: 'time-dhuhr' },
      { key: 'asr', id: 'time-asr' },
      { key: 'maghrib', id: 'time-maghrib' },
      { key: 'isha', id: 'time-isha' }
    ];

    prayers.forEach(p => {
      const el = document.getElementById(p.id);
      if (el && this.times[p.key]) {
        el.innerText = this.times[p.key].formatted;
      }
    });

    // تحديث بطاقة الصلاة القادمة والعد التنازلي
    this.updateNextPrayerDom();

    // مزامنة حالة الأزرار مع التفضيلات
    const settings = RawhStorage.getPrayerSettings();
    ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(key => {
      const toggle = document.getElementById(`notif-${key}`);
      if (toggle) {
        toggle.checked = !!settings[key];
        toggle.onchange = (e) => {
          settings[key] = e.target.checked;
          RawhStorage.savePrayerSettings(settings);
        };
      }
    });

    const activeCityEl = document.getElementById('current-city-label');
    if (activeCityEl) activeCityEl.innerText = this.currentLocation.name;
  },

  updateNextPrayerDom() {
    if (!this.nextPrayer) return;

    const nameEl = document.getElementById('next-prayer-name');
    const timeEl = document.getElementById('next-prayer-time');
    const countdownEl = document.getElementById('next-prayer-countdown');

    if (nameEl) nameEl.innerText = this.nextPrayer.name;
    if (timeEl) timeEl.innerText = this.nextPrayer.time.formatted;

    if (countdownEl) {
      const h = Math.floor(this.nextPrayer.diffMinutes / 60);
      const m = this.nextPrayer.diffMinutes % 60;
      countdownEl.innerText = `متبقي: ${h > 0 ? h + ' س و ' : ''}${m} دقيقة`;
    }
  },

  startCountdownTimer() {
    if (this.updateTimer) clearInterval(this.updateTimer);
    this.updateTimer = setInterval(() => {
      this.determineNextPrayer();
      this.updateNextPrayerDom();
    }, 60000); // تحديث كل دقيقة
  }
};

if (typeof window !== 'undefined') {
  window.RawhPrayerTimes = RawhPrayerTimes;
}
