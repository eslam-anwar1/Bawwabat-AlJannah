/**
 * رَوْح - المشغل الصوتي التفاعلي الشامل
 * يدعم التلاوات، الأناشيد بدون إيقاع، قراءة القصص، والأدعية مع مؤقت النوم والسرعات
 */

const RawhPlayer = {
  audio: null,
  currentTrack: null,
  isPlaying: false,
  isMuted: false,
  playbackRate: 1.0,
  loopMode: false,
  sleepTimerTimeout: null,
  sleepTimerMinutes: 0,
  playlist: [],
  currentIndex: 0,
  synthContext: null,

  init() {
    this.audio = new Audio();
    this.playlist = RawhContent.audioTracks || [];

    // ربط أحداث المشغل الصوتي
    this.audio.addEventListener('play', () => this.onPlayStateChange(true));
    this.audio.addEventListener('pause', () => this.onPlayStateChange(false));
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('loadedmetadata', () => this.onMetadataLoaded());
    this.audio.addEventListener('ended', () => this.onTrackEnded());
    this.audio.addEventListener('error', (e) => this.onAudioError(e));

    this.bindDomEvents();
  },

  bindDomEvents() {
    // أزرار التحكم في المشغل المصغر
    const miniPlayBtn = document.getElementById('mini-play-btn');
    if (miniPlayBtn) {
      miniPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlay();
      });
    }

    const miniPlayer = document.getElementById('mini-player');
    if (miniPlayer) {
      miniPlayer.addEventListener('click', () => {
        this.openFullPlayerModal();
      });
    }

    // المشغل الكامل
    const modalCloseBtn = document.getElementById('player-modal-close');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => this.closeFullPlayerModal());
    }

    const fullPlayBtn = document.getElementById('full-play-btn');
    if (fullPlayBtn) {
      fullPlayBtn.addEventListener('click', () => this.togglePlay());
    }

    const nextBtn = document.getElementById('player-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.playNext());
    }

    const prevBtn = document.getElementById('player-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.playPrevious());
    }

    // شريط التمرير
    const progressSlider = document.getElementById('player-progress');
    if (progressSlider) {
      progressSlider.addEventListener('input', (e) => {
        if (this.audio.duration) {
          const seekTo = (e.target.value / 100) * this.audio.duration;
          this.audio.currentTime = seekTo;
        }
      });
    }

    // زر التكرار
    const loopBtn = document.getElementById('player-loop-btn');
    if (loopBtn) {
      loopBtn.addEventListener('click', () => {
        this.loopMode = !this.loopMode;
        this.audio.loop = this.loopMode;
        loopBtn.classList.toggle('active', this.loopMode);
      });
    }

    // قائمة السرعات
    const speedBtn = document.getElementById('player-speed-btn');
    if (speedBtn) {
      const speeds = [1.0, 1.25, 1.5, 0.75];
      let speedIdx = 0;
      speedBtn.addEventListener('click', () => {
        speedIdx = (speedIdx + 1) % speeds.length;
        this.playbackRate = speeds[speedIdx];
        this.audio.playbackRate = this.playbackRate;
        speedBtn.innerText = `${this.playbackRate}x`;
      });
    }

    // مؤقت النوم (Sleep Timer)
    const sleepBtn = document.getElementById('player-sleep-btn');
    if (sleepBtn) {
      const timers = [0, 15, 30, 45, 60];
      let timerIdx = 0;
      sleepBtn.addEventListener('click', () => {
        timerIdx = (timerIdx + 1) % timers.length;
        const mins = timers[timerIdx];
        this.setSleepTimer(mins);
        sleepBtn.innerText = mins === 0 ? 'مؤقت' : `${mins} د`;
        sleepBtn.classList.toggle('active', mins > 0);
      });
    }
  },

  playTrack(track) {
    if (!track) return;
    this.currentTrack = track;
    this.currentIndex = this.playlist.findIndex(t => t.id === track.id);
    if (this.currentIndex === -1) {
      this.playlist.unshift(track);
      this.currentIndex = 0;
    }

    this.audio.src = track.src || '';
    this.audio.playbackRate = this.playbackRate;
    this.audio.loop = this.loopMode;

    this.updateDomTrackInfo(track);
    this.showMiniPlayer();

    // تشغيل
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Playback error or auto-play prevented:', err);
        // تجربة التوليد الهادئ إذا تعذر الرابط
        this.fallbackSyntheticPeaceAudio(track.title);
      });
    }

    // منح نقاط حسنات للاستماع في الحديقة
    RawhStorage.addXP(5, 'استماع لمقطع صوتي مبارك');
  },

  playTrackByIndex(index) {
    if (index >= 0 && index < this.playlist.length) {
      this.playTrack(this.playlist[index]);
    }
  },

  togglePlay() {
    if (!this.currentTrack && this.playlist.length > 0) {
      this.playTrack(this.playlist[0]);
      return;
    }

    if (this.audio.paused) {
      this.audio.play().catch(e => console.warn(e));
    } else {
      this.audio.pause();
    }
  },

  playNext() {
    if (this.playlist.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.playTrack(this.playlist[this.currentIndex]);
  },

  playPrevious() {
    if (this.playlist.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    this.playTrack(this.playlist[this.currentIndex]);
  },

  onPlayStateChange(isPlaying) {
    this.isPlaying = isPlaying;
    const miniIcon = document.getElementById('mini-play-icon');
    const fullIcon = document.getElementById('full-play-icon');

    const playPath = 'M8 5v14l11-7z';
    const pausePath = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z';

    if (miniIcon) miniIcon.setAttribute('d', isPlaying ? pausePath : playPath);
    if (fullIcon) fullIcon.setAttribute('d', isPlaying ? pausePath : playPath);

    const vinyl = document.getElementById('player-vinyl-disc');
    if (vinyl) {
      if (isPlaying) vinyl.classList.add('rotating');
      else vinyl.classList.remove('rotating');
    }
  },

  onTimeUpdate() {
    if (!this.audio.duration) return;
    const progress = (this.audio.currentTime / this.audio.duration) * 100;

    const miniProgress = document.getElementById('mini-progress-fill');
    if (miniProgress) miniProgress.style.width = `${progress}%`;

    const slider = document.getElementById('player-progress');
    if (slider) slider.value = progress;

    const currentTimeEl = document.getElementById('player-current-time');
    if (currentTimeEl) currentTimeEl.innerText = this.formatTime(this.audio.currentTime);
  },

  onMetadataLoaded() {
    const totalTimeEl = document.getElementById('player-total-time');
    if (totalTimeEl && this.audio.duration) {
      totalTimeEl.innerText = this.formatTime(this.audio.duration);
    }
  },

  onTrackEnded() {
    if (this.loopMode) {
      this.audio.currentTime = 0;
      this.audio.play();
    } else {
      this.playNext();
    }
  },

  onAudioError(e) {
    console.warn('Audio stream error, engaging bulletproof local engine:', e);
    // التحويل فوراً للصوت المحلي الموثوق
    if (this.currentTrack) {
      if (this.currentTrack.fallbackSrc && this.audio.src !== this.currentTrack.fallbackSrc && !this.audio.src.includes('.wav')) {
        this.audio.src = this.currentTrack.fallbackSrc;
        this.audio.play().catch(() => this.fallbackSyntheticPeaceAudio(this.currentTrack.title));
        return;
      }
      this.fallbackSyntheticPeaceAudio(this.currentTrack.title);
    } else {
      this.fallbackSyntheticPeaceAudio('سكينة الروح');
    }
  },

  // نغمات روحية عذبة توليدية نقية ومحلية لضمان عمل الصوت دائماً
  fallbackSyntheticPeaceAudio(title) {
    try {
      const localAudio = new Audio('assets/audio/peace_tone.wav');
      localAudio.volume = 0.8;
      localAudio.loop = this.loopMode;
      const p = localAudio.play();
      if (p !== undefined) {
        p.then(() => {
          this.onPlayStateChange(true);
        }).catch(() => {
          this.playSynthChords();
          this.onPlayStateChange(true);
        });
      }
    } catch (e) {
      this.playSynthChords();
      this.onPlayStateChange(true);
    }
  },

  playSynthChords() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.synthContext) this.synthContext = new AudioCtx();
      const ctx = this.synthContext;
      if (ctx.state === 'suspended') ctx.resume();

      const chords = [261.63, 329.63, 392.00, 523.25]; // C-E-G-C Harmonic serenity
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.4);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + idx * 0.4 + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.4 + 2.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.4);
        osc.stop(ctx.currentTime + idx * 0.4 + 2.8);
      });
    } catch (err) {}
  },

  setSleepTimer(minutes) {
    if (this.sleepTimerTimeout) {
      clearTimeout(this.sleepTimerTimeout);
      this.sleepTimerTimeout = null;
    }
    this.sleepTimerMinutes = minutes;
    if (minutes > 0) {
      this.sleepTimerTimeout = setTimeout(() => {
        this.audio.pause();
        this.sleepTimerMinutes = 0;
        const sleepBtn = document.getElementById('player-sleep-btn');
        if (sleepBtn) {
          sleepBtn.innerText = 'مؤقت';
          sleepBtn.classList.remove('active');
        }
      }, minutes * 60 * 1000);
    }
  },

  updateDomTrackInfo(track) {
    const miniTitle = document.getElementById('mini-track-title');
    const miniArtist = document.getElementById('mini-track-artist');
    const fullTitle = document.getElementById('full-track-title');
    const fullArtist = document.getElementById('full-track-artist');
    const categoryBadge = document.getElementById('full-track-category');

    if (miniTitle) miniTitle.innerText = track.title;
    if (miniArtist) miniArtist.innerText = track.artist;
    if (fullTitle) fullTitle.innerText = track.title;
    if (fullArtist) fullArtist.innerText = track.artist;
    if (categoryBadge) categoryBadge.innerText = track.categoryName || 'بوابة الجنة ميديا';
  },

  showMiniPlayer() {
    const mini = document.getElementById('mini-player');
    if (mini) mini.classList.add('visible');
  },

  openFullPlayerModal() {
    const modal = document.getElementById('full-player-modal');
    if (modal) modal.classList.add('active');
  },

  closeFullPlayerModal() {
    const modal = document.getElementById('full-player-modal');
    if (modal) modal.classList.remove('active');
  },

  formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
};

if (typeof window !== 'undefined') {
  window.RawhPlayer = RawhPlayer;
}
