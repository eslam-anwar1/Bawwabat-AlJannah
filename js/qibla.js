/**
 * بوابة الجنة - بوصلة القبلة التفاعلية الحية والدقيقة
 * تحسب زاوية القبلة من موقع المستخدم نحو الكعبة المشرفة بمكة المكرمة
 * وتستجيب لحساسات الاتجاه في الهاتف الذكي
 */

const RawhQibla = {
  KAABA_LAT: 21.4225,
  KAABA_LNG: 39.8262,
  userLat: 21.4225,
  userLng: 39.8262,
  qiblaBearing: 0,
  deviceHeading: 0,
  isAligned: false,
  hasSensor: false,

  init() {
    // جلب موقع المستخدم من حاسبة الصلاة إن وجد
    if (window.RawhPrayerTimes && window.RawhPrayerTimes.currentLocation) {
      this.userLat = window.RawhPrayerTimes.currentLocation.lat;
      this.userLng = window.RawhPrayerTimes.currentLocation.lng;
    }

    this.calculateQiblaBearing();
    this.setupSensors();
    this.bindEvents();
    this.updateCompassUI();
  },

  updateCoordinates(lat, lng) {
    this.userLat = lat;
    this.userLng = lng;
    this.calculateQiblaBearing();
    this.updateCompassUI();
  },

  calculateQiblaBearing() {
    const phi1 = this.degToRad(this.userLat);
    const phi2 = this.degToRad(this.KAABA_LAT);
    const deltaLambda = this.degToRad(this.KAABA_LNG - this.userLng);

    const y = Math.sin(deltaLambda);
    const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

    let qibla = this.radToDeg(Math.atan2(y, x));
    this.qiblaBearing = (qibla + 360) % 360;

    const angleDisplay = document.getElementById('qibla-angle-val');
    if (angleDisplay) {
      angleDisplay.innerText = `${Math.round(this.qiblaBearing)}°`;
    }
  },

  setupSensors() {
    const handleOrientation = (e) => {
      let heading = null;

      // أجهزة iOS
      if (e.webkitCompassHeading !== undefined) {
        heading = e.webkitCompassHeading;
      }
      // أجهزة أندرويد والمتصفحات القياسية
      else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }

      if (heading !== null) {
        this.hasSensor = true;
        this.deviceHeading = heading;
        this.updateCompassUI();
      }
    };

    if (window.DeviceOrientationEvent) {
      // طلب الإذن في متصفحات iOS 13+
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permBtn = document.getElementById('btn-qibla-permission');
        if (permBtn) {
          permBtn.style.display = 'inline-block';
          permBtn.onclick = () => {
            DeviceOrientationEvent.requestPermission()
              .then(state => {
                if (state === 'granted') {
                  window.addEventListener('deviceorientation', handleOrientation, true);
                  permBtn.style.display = 'none';
                }
              })
              .catch(console.error);
          };
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      }
    }
  },

  bindEvents() {
    // شريط المعايرة اليدوية (لتجربة البوصلة على أجهزة الكمبيوتر دون حساسات)
    const manualSlider = document.getElementById('qibla-manual-slider');
    if (manualSlider) {
      manualSlider.addEventListener('input', (e) => {
        this.deviceHeading = parseFloat(e.target.value);
        this.updateCompassUI();
      });
    }
  },

  updateCompassUI() {
    const compassDisc = document.getElementById('compass-disc');
    const kaabaNeedle = document.getElementById('kaaba-needle');
    const statusText = document.getElementById('qibla-status-desc');
    const compassContainer = document.getElementById('compass-container');

    // تدوير قرص البوصلة عكس اتجاه الهاتف ليشير الشمال للأعلى
    if (compassDisc) {
      compassDisc.style.transform = `rotate(${-this.deviceHeading}deg)`;
    }

    // إبرة الكعبة تشير إلى زاوية القبلة النسبية للهاتف
    const relativeAngle = (this.qiblaBearing - this.deviceHeading + 360) % 360;
    if (kaabaNeedle) {
      kaabaNeedle.style.transform = `rotate(${relativeAngle}deg)`;
    }

    // فحص المحاذاة الدقيقة (+/- 4 درجات)
    const diff = Math.min(Math.abs(relativeAngle), Math.abs(relativeAngle - 360));
    const alignedNow = diff < 4;

    if (alignedNow && !this.isAligned) {
      // اهتزاز ترحيبي عند العثور على القبلة
      if (navigator.vibrate) {
        navigator.vibrate([50, 40, 80]);
      }
    }

    this.isAligned = alignedNow;

    if (compassContainer) {
      compassContainer.classList.toggle('qibla-aligned', this.isAligned);
    }

    if (statusText) {
      if (this.isAligned) {
        statusText.innerHTML = '<span class="text-gold">✨ أنت الآن في اتجاه القبلة المشرفة بدقة (تقبّل الله)</span>';
      } else {
        const dir = relativeAngle > 180 ? 'يساراً' : 'يميناً';
        statusText.innerText = `در بالهاتف ${dir} لتتطابق الإبرة الذهبية مع الكعبة`;
      }
    }
  },

  degToRad(d) { return (d * Math.PI) / 180.0; },
  radToDeg(r) { return (r * 180.0) / Math.PI; }
};
