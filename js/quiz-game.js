/**
 * بوابة الجنة - قسم الألعاب والألغاز الذكية
 * يشمل: مسابقة فرسان الجنة الثقافية، ألغاز الحكمة، وترتيب الحديث النبوي
 */

const RawhQuiz = {
  currentQuestionIndex: 0,
  score: 0,
  isAnswered: false,
  activeRiddleIndex: 0,
  activeArrangeIndex: 0,
  userArrangedWords: [],

  init() {
    this.renderQuestion();
    this.renderRiddle();
    this.renderWordGame();
    this.bindEvents();
  },

  bindEvents() {
    // زر السؤال التالي
    const nextQBtn = document.getElementById('btn-next-question');
    if (nextQBtn) {
      nextQBtn.addEventListener('click', () => this.nextQuestion());
    }

    // زر إعادة التحدي
    const restartBtn = document.getElementById('btn-restart-quiz');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    // زر كشف إجابة اللغز
    const revealRiddleBtn = document.getElementById('btn-reveal-riddle');
    if (revealRiddleBtn) {
      revealRiddleBtn.addEventListener('click', () => this.revealRiddleAnswer());
    }

    // زر لغز آخر
    const nextRiddleBtn = document.getElementById('btn-next-riddle');
    if (nextRiddleBtn) {
      nextRiddleBtn.addEventListener('click', () => this.nextRiddle());
    }

    // زر فحص ترتيب الحديث
    const checkWordBtn = document.getElementById('btn-check-word-arrange');
    if (checkWordBtn) {
      checkWordBtn.addEventListener('click', () => this.checkWordArrangement());
    }

    // زر إعادة ترتيب الكلمات
    const resetWordBtn = document.getElementById('btn-reset-word-arrange');
    if (resetWordBtn) {
      resetWordBtn.addEventListener('click', () => this.resetWordArrangement());
    }
  },

  // 1. لعبة تحدي الروح
  renderQuestion() {
    const questions = RawhContent.quizQuestions || [];
    if (this.currentQuestionIndex >= questions.length) {
      this.showQuizSummary();
      return;
    }

    this.isAnswered = false;
    const q = questions[this.currentQuestionIndex];

    const countEl = document.getElementById('quiz-progress-text');
    if (countEl) countEl.innerText = `السؤال ${this.currentQuestionIndex + 1} من ${questions.length}`;

    const questionTitle = document.getElementById('quiz-question-title');
    if (questionTitle) questionTitle.innerText = q.question;

    const feedbackEl = document.getElementById('quiz-feedback-box');
    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.className = 'quiz-feedback-box';
    }

    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) nextBtn.style.display = 'none';

    const optionsContainer = document.getElementById('quiz-options-list');
    if (!optionsContainer) return;

    optionsContainer.innerHTML = q.options.map((opt, idx) => `
      <button class="quiz-option-btn" data-index="${idx}">
        <span class="option-marker">${['أ', 'ب', 'ج', 'د'][idx]}</span>
        <span class="option-text">${opt}</span>
      </button>
    `).join('');

    optionsContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedIdx = parseInt(btn.getAttribute('data-index'));
        this.handleAnswerSelection(selectedIdx, btn);
      });
    });
  },

  handleAnswerSelection(selectedIdx, btnEl) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const questions = RawhContent.quizQuestions;
    const q = questions[this.currentQuestionIndex];
    const isCorrect = selectedIdx === q.correctIndex;

    const allBtns = document.querySelectorAll('.quiz-option-btn');
    allBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.correctIndex) {
        b.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        b.classList.add('wrong');
      }
    });

    const feedbackEl = document.getElementById('quiz-feedback-box');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      if (isCorrect) {
        this.score++;
        feedbackEl.className = 'quiz-feedback-box success';
        feedbackEl.innerHTML = `<strong>إجابة صحيحة وموفقة! ✨</strong><br>${q.explanation}`;
        RawhGarden.playWaterSound();
        RawhStorage.addXP(10, 'إجابة صحيحة في المسابقة');
      } else {
        feedbackEl.className = 'quiz-feedback-box warning';
        feedbackEl.innerHTML = `<strong>معلومة قيمة للمستقبل! 💡</strong><br>${q.explanation}`;
      }
    }

    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) nextBtn.style.display = 'inline-block';
  },

  nextQuestion() {
    this.currentQuestionIndex++;
    this.renderQuestion();
  },

  showQuizSummary() {
    const container = document.getElementById('quiz-active-area');
    const summary = document.getElementById('quiz-summary-area');
    const scoreVal = document.getElementById('quiz-final-score');

    if (container) container.style.display = 'none';
    if (summary) summary.style.display = 'block';
    if (scoreVal) scoreVal.innerText = `${this.score} من ${RawhContent.quizQuestions.length}`;

    // مكافأة إضافية عند إتمام الاختبار كاملاً
    RawhStorage.addXP(25, 'إتمام اختبار بوابة الجنة');
  },

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    const container = document.getElementById('quiz-active-area');
    const summary = document.getElementById('quiz-summary-area');
    if (container) container.style.display = 'block';
    if (summary) summary.style.display = 'none';
    this.renderQuestion();
  },

  // 2. قسم الألغاز والفوازير الإسلامية
  renderRiddle() {
    const riddles = RawhContent.riddles || [];
    const r = riddles[this.activeRiddleIndex % riddles.length];

    const titleEl = document.getElementById('riddle-title');
    const hintEl = document.getElementById('riddle-hint-text');
    const answerBox = document.getElementById('riddle-answer-box');
    const revealBtn = document.getElementById('btn-reveal-riddle');

    if (titleEl) titleEl.innerText = r.riddle;
    if (hintEl) hintEl.innerText = `تلميح: ${r.hint}`;
    if (answerBox) {
      answerBox.style.display = 'none';
      answerBox.innerText = r.answer;
    }
    if (revealBtn) revealBtn.style.display = 'inline-block';
  },

  revealRiddleAnswer() {
    const answerBox = document.getElementById('riddle-answer-box');
    const revealBtn = document.getElementById('btn-reveal-riddle');
    if (answerBox) {
      answerBox.style.display = 'block';
      answerBox.classList.add('pop-in');
    }
    if (revealBtn) revealBtn.style.display = 'none';

    RawhStorage.addXP(5, 'حل لغز فكري');
  },

  nextRiddle() {
    this.activeRiddleIndex = (this.activeRiddleIndex + 1) % RawhContent.riddles.length;
    this.renderRiddle();
  },

  // 3. لعبة ترتيب كلمات الحديث الشريف
  renderWordGame() {
    const game = RawhContent.wordArrangements[this.activeArrangeIndex % RawhContent.wordArrangements.length];
    this.userArrangedWords = [];

    const poolContainer = document.getElementById('word-pool-container');
    const answerContainer = document.getElementById('word-arranged-container');
    const resultBox = document.getElementById('word-game-result');

    if (resultBox) {
      resultBox.style.display = 'none';
      resultBox.className = 'word-game-result';
    }

    if (answerContainer) {
      answerContainer.innerHTML = '<span class="empty-placeholder">اضغط على الكلمات أدناه لترتيبها هنا بالترتيب الصحيح...</span>';
    }

    if (poolContainer) {
      poolContainer.innerHTML = '';
      game.scrambled.forEach((word) => {
        const chip = document.createElement('button');
        chip.className = 'word-chip';
        chip.innerText = word;
        chip.onclick = () => this.handleWordChipClick(word, chip);
        poolContainer.appendChild(chip);
      });
    }
  },

  handleWordChipClick(word, chipEl) {
    if (chipEl.classList.contains('selected')) return;

    chipEl.classList.add('selected');
    this.userArrangedWords.push(word);
    this.renderArrangedWords();
  },

  renderArrangedWords() {
    const container = document.getElementById('word-arranged-container');
    if (!container) return;

    if (this.userArrangedWords.length === 0) {
      container.innerHTML = '<span class="empty-placeholder">اضغط على الكلمات أدناه لترتيبها هنا بالترتيب الصحيح...</span>';
      return;
    }

    container.innerHTML = this.userArrangedWords.map((w, idx) => `
      <span class="arranged-chip" data-idx="${idx}">${w}</span>
    `).join(' ');
  },

  resetWordArrangement() {
    this.userArrangedWords = [];
    document.querySelectorAll('.word-chip').forEach(c => c.classList.remove('selected'));
    this.renderArrangedWords();
    const resultBox = document.getElementById('word-game-result');
    if (resultBox) resultBox.style.display = 'none';
  },

  checkWordArrangement() {
    const game = RawhContent.wordArrangements[this.activeArrangeIndex % RawhContent.wordArrangements.length];
    const userSentence = this.userArrangedWords.join(' ');
    const resultBox = document.getElementById('word-game-result');

    if (this.userArrangedWords.length < game.scrambled.length) {
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.className = 'word-game-result warning';
        resultBox.innerText = 'يرجى اختيار جميع الكلمات أولاً لتكتمل الجملة!';
      }
      return;
    }

    if (userSentence === game.correct) {
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.className = 'word-game-result success';
        resultBox.innerHTML = `<strong>أحسنت! ترتيب متقن وصحيح ✨ (+15 حسنة وماء للحديقة)</strong><br>${game.reference}`;
      }
      RawhGarden.playWaterSound();
      RawhStorage.addXP(15, 'ترتيب حديث نبوي صحيح');
      const data = RawhStorage.getGardenData();
      data.waterDrops = (data.waterDrops || 0) + 1;
      RawhStorage.saveGardenData(data);
      if (window.RawhGarden) RawhGarden.renderGarden();

      setTimeout(() => {
        this.activeArrangeIndex = (this.activeArrangeIndex + 1) % RawhContent.wordArrangements.length;
        this.renderWordGame();
      }, 2800);
    } else {
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.className = 'word-game-result error';
        resultBox.innerText = 'الترتيب غير دقيق، حاول مجدداً بالضغط على زر إعادة!';
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.RawhQuiz = RawhQuiz;
}
