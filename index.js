class MathGame {
  constructor() {
    this.score = 0;
    this.streak = 0;
    this.currentDifficulty = 'easy';
    this.currentAnswer = 0;
    
    this.operators = ['+', '-', '*', '/'];
    
    this.responses = {
      correct: [
        { emoji: '🎉', message: 'Excellent!', sub: 'You nailed it!' },
        { emoji: '⭐', message: 'Amazing!', sub: 'Math genius at work!' },
        { emoji: '🚀', message: 'Perfect!', sub: 'You\'re on fire!' },
        { emoji: '💯', message: 'Outstanding!', sub: 'Keep the streak going!' },
        { emoji: '🏆', message: 'Brilliant!', sub: 'Math master level!' },
        { emoji: '✨', message: 'Spectacular!', sub: 'You make it look easy!' }
      ],
      incorrect: [
        { emoji: '🤔', message: 'Not quite!', sub: 'Give it another shot!' },
        { emoji: '😅', message: 'Close, but no cigar!', sub: 'Try again!' },
        { emoji: '🎯', message: 'Almost there!', sub: 'You can do better!' },
        { emoji: '💪', message: 'Keep trying!', sub: 'Practice makes perfect!' }
      ],
      funny: [
        { emoji: '🤯', message: 'Whoa there!', sub: 'That\'s way off! Did you use a calculator from Mars?' },
        { emoji: '😂', message: 'LOL!', sub: 'Are you trying to break the universe with that answer?' },
        { emoji: '🎪', message: 'Creative!', sub: 'That\'s some next-level imagination right there!' },
        { emoji: '🦄', message: 'Magical!', sub: 'In what dimension is that the right answer?' },
        { emoji: '🌮', message: 'Spicy!', sub: 'That answer is as wild as a taco on roller skates!' },
        { emoji: '🐙', message: 'Tentacular!', sub: 'Did an octopus help you with that calculation?' }
      ],
      streak: [
        { threshold: 5, emoji: '🔥', message: 'You\'re heating up!' },
        { threshold: 10, emoji: '⚡', message: 'Lightning fast!' },
        { threshold: 15, emoji: '🌟', message: 'Superstar mode!' },
        { threshold: 20, emoji: '🎆', message: 'Unstoppable!' }
      ]
    };

    this.initializeElements();
    this.setupEventListeners();
    this.createParticles();
    this.generateQuestion();
  }

  initializeElements() {
    this.scoreEl = document.getElementById('score');
    this.streakEl = document.getElementById('streak');
    this.streakIndicator = document.getElementById('streak-indicator');
    this.num1El = document.getElementById('num1');
    this.operatorEl = document.getElementById('operator');
    this.num2El = document.getElementById('num2');
    this.answerInput = document.getElementById('answerInput');
    this.checkBtn = document.getElementById('checkBtn');
    this.modal = document.getElementById('modal');
    this.modalContent = document.getElementById('modalContent');
    this.modalEmoji = document.getElementById('modalEmoji');
    this.modalMessage = document.getElementById('modalMessage');
    this.modalSubmessage = document.getElementById('modalSubmessage');
    this.closeBtn = document.getElementById('closeBtn');
  }

  setupEventListeners() {
    this.checkBtn.addEventListener('click', () => this.checkAnswer());
    this.closeBtn.addEventListener('click', () => this.closeModal());
    this.answerInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.checkAnswer();
    });

    // Difficulty selector
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentDifficulty = e.target.dataset.level;
        this.generateQuestion();
      });
    });
  }

  createParticles() {
    const particles = document.querySelector('.particles');
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particles.appendChild(particle);
    }
  }

  generateQuestion() {
    const operator = this.operators[Math.floor(Math.random() * this.operators.length)];
    let num1, num2;

    switch (this.currentDifficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
    }

    // Special handling for division to avoid decimals
    if (operator === '/') {
      const result = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      num1 = result * num2;
      this.currentAnswer = result;
    } else {
      switch (operator) {
        case '+':
          this.currentAnswer = num1 + num2;
          break;
        case '-':
          if (num2 > num1) [num1, num2] = [num2, num1]; // Ensure positive result
          this.currentAnswer = num1 - num2;
          break;
        case '*':
          this.currentAnswer = num1 * num2;
          break;
      }
    }

    this.num1El.textContent = num1;
    this.operatorEl.textContent = operator;
    this.num2El.textContent = num2;
    this.answerInput.value = '';
    this.answerInput.focus();

    // Animate question change
    document.getElementById('question').style.animation = 'none';
    setTimeout(() => {
      document.getElementById('question').style.animation = 'slideIn 0.5s ease-out';
    }, 10);
  }

  checkAnswer() {
    const userAnswer = parseInt(this.answerInput.value);
    
    if (isNaN(userAnswer)) {
      this.showModal('incorrect');
      return;
    }

    const difference = Math.abs(userAnswer - this.currentAnswer);
    
    if (userAnswer === this.currentAnswer) {
      this.score += 10 + (this.streak * 2);
      this.streak++;
      this.updateScore();
      this.showModal('correct');
      this.createConfetti();
      this.checkStreakMilestone();
    } else if (difference > 50) {
      this.streak = 0;
      this.updateScore();
      this.showModal('funny');
    } else {
      this.streak = 0;
      this.updateScore();
      this.showModal('incorrect');
    }
  }

  showModal(type) {
    const responses = this.responses[type];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    this.modalEmoji.textContent = response.emoji;
    this.modalMessage.textContent = response.message;
    this.modalSubmessage.textContent = response.sub;
    
    // Add correct answer for incorrect responses
    if (type !== 'correct') {
      this.modalSubmessage.textContent += ` The correct answer was ${this.currentAnswer}.`;
    }
    
    this.modalContent.className = `modal-content ${type}`;
    this.modal.style.display = 'flex';
  }

  closeModal() {
    this.modal.style.display = 'none';
    this.generateQuestion();
  }

  updateScore() {
    this.scoreEl.textContent = this.score;
    this.streakEl.textContent = this.streak;
    
    // Update streak indicator
    if (this.streak >= 5) {
      this.streakIndicator.textContent = ' 🔥';
      this.streakIndicator.className = 'streak-fire';
    } else {
      this.streakIndicator.textContent = '';
    }
  }

  checkStreakMilestone() {
    const milestone = this.responses.streak.find(s => s.threshold === this.streak);
    if (milestone) {
      setTimeout(() => {
        this.modalSubmessage.textContent = `${milestone.emoji} ${milestone.message}`;
      }, 500);
    }
  }

  createConfetti() {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = `hsl(${Math.random() * 60 + 200}, 20%, 40%)`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }, i * 50);
    }
  }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
  new MathGame();
});