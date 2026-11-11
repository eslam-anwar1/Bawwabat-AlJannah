/**
 * بوابة الجنة - نظام الأذكار الصوتية التلقائية الناطقة
 * تذكير صوتي إيماني دوري بالاستغفار والتسبيح والصلاة على النبي ﷺ
 * يمنح المستخدم تحكماً كاملاً للإيقاف والتشغيل الفوري بنقرة واحدة
 */

const RawhVoiceAzkar = {
  enabled: true,
  timer: null,
  intervalMinutes: 20,
  currentIndex: 0,
  isSpeaking: false,

  phrases: [
    { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ", reward: "حبيبتان إلى الرحمن، ثقيلتان في الميزان" },
    { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", reward: "أفضل ما قاله النبيون، حرز من الشيطان" },
    { text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ", reward: "من صلى عليّ صلاة صلى الله عليه بها عشراً" },
    { text: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ", reward: "مغفرة للذنوب وتفريج للكروب وسعة في الرزق" },
    { text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ", reward: "كنز عظيم من كنوز الجنة" },
    { text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ حَمْداً كَثِيراً طَيِّباً مُبَارَكاً فِيهِ", reward: "ملء الميزان ونور في القلب" },
    { text: "سُبْحَانَ اللَّهِ ، وَالْحَمْدُ لِلَّهِ ، وَلَا إِلَهَ إِلَّا اللَّهُ ، وَاللَّهُ أَكْبَرُ", reward: "أحب الكلام إلى الله تعالى" },
    { text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ ، أَصْلِحْ لِي شَأْنِي كُلَّهُ", reward: "دعاء الكرب واليقين المستجاب" }
  ],

  init() {
    const saved = localStorage.getItem('bawwabat_voice_azkar_enabled');
    this.enabled = saved !== null ? saved === 'true' : true;

    const savedInterval = localStorage.getItem('bawwabat_voice_azkar_interval');
    if (savedInterval) this.intervalMinutes = parseInt(savedInterval, 10);

    this.bindEvents();
    if (this.enabled) {
      this.startTimer();
    }
  },

  bindEvents() {
    // أزرار تفعيل/إيقاف الأذكار الصوتية التلقائية
    const toggle = document.getElementById('toggle-auto-voice-azkar');
    if (toggle) {
      toggle.checked = this.enabled;
      toggle.addEventListener('change', (e) => {
        this.setEnabled(e.target.checked);
      });
    }

    // زر تسميع ذكر الآن
    const speakBtn = document.getElementById('btn-play-voice-azkar-now');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        if (this.isSpeaking) {
          this.stopSpeech();
        } else {
          this.triggerNextDhikr(true);
        }
      });
    }

    // زر إيقاف الصوت السريع
    const stopBtn = document.getElementById('btn-stop-voice-azkar');
    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        this.stopSpeech();
      });
    }

    // محدد التكرار الزمني
    const intervalSelect = document.getElementById('voice-azkar-interval-select');
    if (intervalSelect) {
      intervalSelect.value = this.intervalMinutes.toString();
      intervalSelect.addEventListener('change', (e) => {
        this.intervalMinutes = parseInt(e.target.value, 10);
        localStorage.setItem('bawwabat_voice_azkar_interval', this.intervalMinutes.toString());
        this.startTimer();
        if (window.RawhApp && RawhApp.showToast) {
          RawhApp.showToast(`تم ضبط تكرار الذكر الصوتي كل ${this.intervalMinutes} دقيقة`, 'info');
        }
      });
    }
  },

  setEnabled(val) {
    this.enabled = val;
    localStorage.setItem('bawwabat_voice_azkar_enabled', val.toString());
    if (val) {
      this.startTimer();
      if (window.RawhApp && RawhApp.showToast) {
        RawhApp.showToast('تم تفعيل الأذكار الصوتية التلقائية الناطقة 🔊', 'success');
      }
    } else {
      this.stopTimer();
      this.stopSpeech();
      if (window.RawhApp && RawhApp.showToast) {
        RawhApp.showToast('تم إيقاف الأذكار الصوتية التلقائية 🔇', 'info');
      }
    }
    this.updateDomState();
  },

  startTimer() {
    this.stopTimer();
    if (!this.enabled) return;
    const ms = this.intervalMinutes * 60 * 1000;
    this.timer = setInterval(() => {
      this.triggerNextDhikr(false);
    }, ms);
  },

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  triggerNextDhikr(isManual) {
    const item = this.phrases[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
    this.speakText(item.text, item.reward, isManual);
  },

  speakText(text, reward, isManual) {
    this.stopSpeech();

    // تشغيل نغمة سكينة هادئة أولاً
    try {
      const chime = new Audio('assets/audio/peace_tone.wav');
      chime.volume = 0.4;
      chime.play().catch(() => {});
    } catch(e) {}

    if ('speechSynthesis' in window) {
      setTimeout(() => {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'ar-SA';
        utter.rate = 0.85; // تلاوة وقورة وهادئة
        utter.pitch = 1.0;

        utter.onstart = () => {
          this.isSpeaking = true;
          this.updateSpeakButton(true);
        };

        utter.onend = () => {
          this.isSpeaking = false;
          this.updateSpeakButton(false);
        };

        utter.onerror = () => {
          this.isSpeaking = false;
          this.updateSpeakButton(false);
        };

        window.speechSynthesis.speak(utter);
      }, 350);
    }

    if (window.RawhApp && RawhApp.showToast) {
      RawhApp.showToast(`📿 ${text}`, 'success');
    }

    // زيادة حسنات الاستماع للذكر
    if (window.RawhStorage) {
      RawhStorage.addXP(5, 'سماع ذكر إيماني');
    }
  },

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.updateSpeakButton(false);
  },

  updateSpeakButton(speaking) {
    const speakBtn = document.getElementById('btn-play-voice-azkar-now');
    if (speakBtn) {
      if (speaking) {
        speakBtn.innerHTML = '<span>⏹️</span> <span>إيقاف الصوت الآن</span>';
        speakBtn.style.background = '#DC2626';
        speakBtn.style.color = '#FFF';
      } else {
        speakBtn.innerHTML = '<span>🔊</span> <span>تسميع ذكر صوتي الآن</span>';
        speakBtn.style.background = '';
        speakBtn.style.color = '';
      }
    }
  },

  updateDomState() {
    const toggle = document.getElementById('toggle-auto-voice-azkar');
    if (toggle) toggle.checked = this.enabled;
  }
};

if (typeof window !== 'undefined') {
  window.RawhVoiceAzkar = RawhVoiceAzkar;
}
