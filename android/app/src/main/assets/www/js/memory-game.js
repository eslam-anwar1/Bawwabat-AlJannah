/**
 * بوابة الجنة - لعبة الذاكرة والذكاء الإيماني (بطاقات الجنة السحرية)
 * لعبة إدمانية محبوبة للأطفال والكبار تطور التركيز وتكافئ اللاعب بالحسنات وقطرات الماء
 */

const RawhMemoryGame = {
  CARDS_DATA: [
    { id: 'kaaba', name: 'الكعبة المشرفة', icon: '🕋' },
    { id: 'quran', name: 'المصحف الشريف', icon: '📖' },
    { id: 'mosque', name: 'المسجد النبوي', icon: '🕌' },
    { id: 'crescent', name: 'هلال البركة', icon: '🌙' },
    { id: 'palm', name: 'نخلة الجنة', icon: '🌴' },
    { id: 'tasbeeh', name: 'مسبحة النور', icon: '📿' },
    { id: 'lantern', name: 'فانوس الخير', icon: '🏮' },
    { id: 'rayan', name: 'باب الريان', icon: '🚪' }
  ],

  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  moves: 0,
  timerInterval: null,
  secondsElapsed: 0,
  isLocked: false,

  init() {
    this.bindEvents();
    this.startNewGame();
  },

  bindEvents() {
    const restartBtn = document.getElementById('btn-restart-memory');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.startNewGame());
    }
  },

  startNewGame() {
    this.stopTimer();
    this.secondsElapsed = 0;
    this.moves = 0;
    this.matchedPairs = 0;
    this.flippedCards = [];
    this.isLocked = false;

    this.updateStatsDom();

    // تجهيز 16 بطاقة (زوج من كل رمز)
    const deck = [...this.CARDS_DATA, ...this.CARDS_DATA];
    // خلط البطاقات عشوائياً (Fisher-Yates Shuffle)
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.cards = deck;
    this.renderBoard();
    this.startTimer();

    const victoryBox = document.getElementById('memory-victory-modal');
    if (victoryBox) victoryBox.style.display = 'none';
  },

  renderBoard() {
    const board = document.getElementById('memory-board-grid');
    if (!board) return;

    board.innerHTML = this.cards.map((c, idx) => `
      <div class="memory-card" data-idx="${idx}" data-id="${c.id}">
        <div class="memory-card-inner">
          <div class="memory-card-front">
            <span>✨</span>
          </div>
          <div class="memory-card-back">
            <span class="card-icon">${c.icon}</span>
            <span class="card-name">${c.name}</span>
          </div>
        </div>
      </div>
    `).join('');

    board.querySelectorAll('.memory-card').forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        this.handleCardClick(cardEl);
      });
    });
  },

  handleCardClick(cardEl) {
    if (this.isLocked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    cardEl.classList.add('flipped');
    this.flippedCards.push(cardEl);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.updateStatsDom();
      this.checkForMatch();
    }
  },

  checkForMatch() {
    this.isLocked = true;
    const [card1, card2] = this.flippedCards;
    const id1 = card1.getAttribute('data-id');
    const id2 = card2.getAttribute('data-id');

    if (id1 === id2) {
      // تطابق صحيح!
      card1.classList.add('matched');
      card2.classList.add('matched');
      this.matchedPairs++;
      this.flippedCards = [];
      this.isLocked = false;

      // نغمة نجاح لطيفة
      if (window.RawhGarden) RawhGarden.playWaterSound();

      this.updateStatsDom();

      if (this.matchedPairs === this.CARDS_DATA.length) {
        this.handleGameVictory();
      }
    } else {
      // غير متطابق: إعادة قلب البطاقات بعد 800 مللي ثانية
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        this.flippedCards = [];
        this.isLocked = false;
      }, 800);
    }
  },

  handleGameVictory() {
    this.stopTimer();
    const victoryBox = document.getElementById('memory-victory-modal');
    const movesEl = document.getElementById('victory-moves-val');
    const timeEl = document.getElementById('victory-time-val');

    if (movesEl) movesEl.innerText = `${this.moves} حركة`;
    if (timeEl) timeEl.innerText = this.formatTime(this.secondsElapsed);

    if (victoryBox) {
      victoryBox.style.display = 'block';
      victoryBox.classList.add('pop-in');
    }

    try {
      const victoryAudio = new Audio('assets/audio/success_chime.wav');
      victoryAudio.volume = 0.8;
      victoryAudio.play().catch(() => {});
    } catch (e) {}

    // مكافأة الفوز: حسنات وماء للحديقة
    if (window.RawhStorage) {
      RawhStorage.addXP(30, 'الفوز في لعبة بطاقات الجنة');
      const data = RawhStorage.getGardenData();
      data.waterDrops = (data.waterDrops || 0) + 1;
      RawhStorage.saveGardenData(data);
      if (window.RawhGarden) RawhGarden.renderGarden();
    }
  },

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.secondsElapsed++;
      const timeVal = document.getElementById('memory-timer-val');
      if (timeVal) timeVal.innerText = this.formatTime(this.secondsElapsed);
    }, 1000);
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  updateStatsDom() {
    const movesVal = document.getElementById('memory-moves-val');
    const matchesVal = document.getElementById('memory-matches-val');

    if (movesVal) movesVal.innerText = this.moves;
    if (matchesVal) matchesVal.innerText = `${this.matchedPairs}/${this.CARDS_DATA.length}`;
  },

  formatTime(totalSecs) {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
};
