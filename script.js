// ==================== DOM ELEMENTS ====================
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const reviewScreen = document.getElementById("review-screen");
const statsScreen = document.getElementById("stats-screen");
const startButton = document.getElementById("start-btn");
const statsButton = document.getElementById("stats-btn");
const themeToggle = document.getElementById("theme-toggle");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const reviewButton = document.getElementById("review-btn");
const backToHomeBtn = document.getElementById("back-to-home-btn");
const backToHomeFromStats = document.getElementById("back-to-home-from-stats");
const progressBar = document.getElementById("progress");
const highScoreDisplay = document.getElementById("high-score-display");
const streakCount = document.getElementById("streak-count");
const categoryLabel = document.getElementById("category-label");
const explanationBox = document.getElementById("explanation-box");
const reviewContainer = document.getElementById("review-container");
const categorySelect = document.getElementById("category-select");
const timerDisplay = document.getElementById("timer");

// Statistics Elements
const totalQuizzesEl = document.getElementById("total-quizzes");
const averageScoreEl = document.getElementById("average-score");
const bestScoreEl = document.getElementById("best-score");

// ==================== NURSING QUESTIONS ====================
const quizQuestions = [
  {
    id: 1,
    question: "What is the normal resting heart rate for a healthy adult?",
    category: "Vital Signs",
    difficulty: "easy",
    answers: [
      { text: "40-50 bpm", correct: false },
      { text: "60-100 bpm", correct: true },
      { text: "110-130 bpm", correct: false },
      { text: "140-160 bpm", correct: false }
    ],
    explanation: "The normal resting heart rate for adults is 60-100 beats per minute."
  },
  {
    id: 2,
    question: "Which organ is responsible for producing insulin?",
    category: "Anatomy & Physiology",
    difficulty: "easy",
    answers: [
      { text: "Liver", correct: false },
      { text: "Pancreas", correct: true },
      { text: "Kidney", correct: false },
      { text: "Spleen", correct: false }
    ],
    explanation: "The pancreas produces insulin, which regulates blood glucose levels."
  },
  {
    id: 3,
    question: "What does the acronym 'ABC' stand for in emergency nursing?",
    category: "Patient Safety",
    difficulty: "medium",
    answers: [
      { text: "Airway, Breathing, Circulation", correct: true },
      { text: "Assessment, Bandage, Care", correct: false },
      { text: "Alert, Breathing, Conscious", correct: false },
      { text: "Airway, Blood, Compression", correct: false }
    ],
    explanation: "ABC = Airway, Breathing, Circulation. This is the primary survey sequence."
  },
  {
    id: 4,
    question: "Which blood type is known as the 'universal donor'?",
    category: "Assessment",
    difficulty: "medium",
    answers: [
      { text: "A+", correct: false },
      { text: "AB+", correct: false },
      { text: "O-", correct: true },
      { text: "B-", correct: false }
    ],
    explanation: "O- blood lacks A, B, and Rh antigens, making it safe for any recipient."
  },
  {
    id: 5,
    question: "What is the first-line treatment for anaphylaxis?",
    category: "Medication Safety",
    difficulty: "hard",
    answers: [
      { text: "Antihistamines (Benadryl)", correct: false },
      { text: "Corticosteroids", correct: false },
      { text: "Epinephrine (EpiPen)", correct: true },
      { text: "Albuterol inhaler", correct: false }
    ],
    explanation: "Epinephrine is the first-line treatment for anaphylaxis."
  },
  {
    id: 6,
    question: "What does the medical abbreviation 'NPO' stand for?",
    category: "Nursing Process",
    difficulty: "easy",
    answers: [
      { text: "No Prescription Orders", correct: false },
      { text: "Nothing by Mouth", correct: true },
      { text: "Nurse Practice Order", correct: false },
      { text: "Normal Patient Observation", correct: false }
    ],
    explanation: "NPO = 'Nil Per Os' (Latin) meaning 'Nothing by Mouth'."
  },
  {
    id: 7,
    question: "When is it MOST important for a nurse to wear gloves?",
    category: "Infection Control",
    difficulty: "medium",
    answers: [
      { text: "When taking blood pressure", correct: false },
      { text: "When there is potential contact with blood or body fluids", correct: true },
      { text: "When entering any patient room", correct: false },
      { text: "When documenting in charts", correct: false }
    ],
    explanation: "Gloves are required when there's potential exposure to blood or body fluids."
  },
  {
    id: 8,
    question: "Which step of the nursing process involves collecting comprehensive patient data?",
    category: "Nursing Process",
    difficulty: "easy",
    answers: [
      { text: "Assessment", correct: true },
      { text: "Diagnosis", correct: false },
      { text: "Planning", correct: false },
      { text: "Implementation", correct: false }
    ],
    explanation: "Assessment is the first step of ADPIE, where nurses gather subjective and objective data."
  },
  {
    id: 9,
    question: "A nurse identifies 'Risk for Falls' in a patient's care plan. This is which nursing process step?",
    category: "Nursing Process",
    difficulty: "medium",
    answers: [
      { text: "Assessment", correct: false },
      { text: "Nursing Diagnosis", correct: true },
      { text: "Evaluation", correct: false },
      { text: "Implementation", correct: false }
    ],
    explanation: "Nursing diagnoses are formulated during the Diagnosis step based on assessment data."
  },
  {
    id: 10,
    question: "Setting a goal that a patient will ambulate 50 feet by day 3 occurs during which phase?",
    category: "Nursing Process",
    difficulty: "easy",
    answers: [
      { text: "Assessment", correct: false },
      { text: "Diagnosis", correct: false },
      { text: "Planning", correct: true },
      { text: "Evaluation", correct: false }
    ],
    explanation: "Planning involves setting measurable, patient-centered goals and outcomes."
  }
];

// ==================== STATE VARIABLES ====================
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let filteredQuestions = [];
let timerInterval = null;
let timeLeft = 15;
const TIME_PER_QUESTION = 15;
let performanceChart = null;

// ==================== INITIALIZATION ====================
maxScoreSpan.textContent = quizQuestions.length;

// Load data when page loads
loadHighScore();
loadStreak();
loadStatistics();
loadTheme();

// ==================== EVENT LISTENERS ====================
startButton.addEventListener("click", startQuiz);
statsButton.addEventListener("click", showStatistics);
themeToggle.addEventListener("click", toggleTheme);
restartButton.addEventListener("click", restartQuiz);
reviewButton.addEventListener("click", showReview);
backToHomeBtn.addEventListener("click", goHome);
backToHomeFromStats.addEventListener("click", goHomeFromStats);

// ==================== CORE FUNCTIONS ====================

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  scoreSpan.textContent = score;
  
  const selectedCategory = categorySelect.value;
  if (selectedCategory === "all") {
    filteredQuestions = quizQuestions;
  } else {
    filteredQuestions = quizQuestions.filter(q => q.category === selectedCategory);
  }
  
  totalQuestionsSpan.textContent = filteredQuestions.length;
  maxScoreSpan.textContent = filteredQuestions.length;
  
  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  reviewScreen.classList.remove("active");
  statsScreen.classList.remove("active");
  quizScreen.classList.add("active");
  
  updateStreak();
  showQuestion();
}

function showQuestion() {
  resetState();
  
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  currentQuestionSpan.textContent = `Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}`;
  questionText.textContent = currentQuestion.question;
  
  // Add animation class
  questionText.classList.remove("fade-in");
  void questionText.offsetWidth; // Trigger reflow
  questionText.classList.add("fade-in");
  
  if (categoryLabel) {
    categoryLabel.textContent = `📚 ${currentQuestion.category} • ${currentQuestion.difficulty.toUpperCase()}`;
  }
  
  const progressPercent = ((currentQuestionIndex) / filteredQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  
  startTimer();
  
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn", "slide-up");
    button.style.animationDelay = `${index * 0.1}s`; // Staggered animation
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

// ==================== TIMER FUNCTIONS ====================

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  timeLeft = TIME_PER_QUESTION;
  timerDisplay.textContent = timeLeft;
  timerDisplay.classList.remove("warning");
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    
    if (timeLeft <= 5) {
      timerDisplay.classList.add("warning");
    }
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function handleTimeOut() {
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  userAnswers.push({
    questionId: currentQuestion.id,
    question: currentQuestion.question,
    category: currentQuestion.category,
    selectedAnswer: "Time Out",
    correctAnswer: currentQuestion.answers.find(a => a.correct).text,
    isCorrect: false,
    explanation: currentQuestion.explanation
  });
  
  Array.from(answerContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  
  if (explanationBox) {
    explanationBox.textContent = `⏰ Time's up! 💡 ${currentQuestion.explanation}`;
    explanationBox.style.display = "block";
  }
  
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < filteredQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 2000);
}

// ==================== ANSWER SELECTION ====================

function resetState() {
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
  if (explanationBox) {
    explanationBox.style.display = "none";
    explanationBox.textContent = "";
  }
}

function selectAnswer(e) {
  stopTimer();
  
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  userAnswers.push({
    questionId: currentQuestion.id,
    question: currentQuestion.question,
    category: currentQuestion.category,
    selectedAnswer: selectedBtn.textContent,
    correctAnswer: currentQuestion.answers.find(a => a.correct).text,
    isCorrect: isCorrect,
    explanation: currentQuestion.explanation
  });
  
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  
  Array.from(answerContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  
  if (explanationBox) {
    explanationBox.textContent = `💡 ${currentQuestion.explanation}`;
    explanationBox.style.display = "block";
  }
  
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < filteredQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 2000);
}

function showResults() {
  stopTimer();
  
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  
  finalScoreSpan.textContent = score;
  
  saveQuizResult(score, filteredQuestions.length);
  saveHighScore(score);
  
  const percentage = (score / filteredQuestions.length) * 100;
  
  // ===== NEW: CONFETTI CELEBRATION (Day 10) =====
  if (percentage === 100) {
    resultMessage.textContent = "🏆 Perfect! You're ready for clinicals!";
    triggerConfetti();
  } else if (percentage >= 80) {
    resultMessage.textContent = "🎉 Excellent! Keep up the great work!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "📚 Good effort! Review the explanations.";
  } else {
    resultMessage.textContent = "💪 Keep studying! Nursing school is a marathon.";
  }
}

// ===== NEW: CONFETTI FUNCTION =====
function triggerConfetti() {
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  var random = function(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}

// ==================== REVIEW FUNCTIONS ====================

function showReview() {
  resultScreen.classList.remove("active");
  reviewScreen.classList.add("active");
  
  reviewContainer.innerHTML = "";
  
  userAnswers.forEach((answer, index) => {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");
    reviewItem.classList.add(answer.isCorrect ? "correct" : "incorrect");
    
    reviewItem.innerHTML = `
      <div class="review-status ${answer.isCorrect ? "correct" : "incorrect"}">
        ${answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
      </div>
      <div class="review-question">
        Q${index + 1}: ${answer.question}
      </div>
      <div class="review-answer your-answer">
        Your Answer: ${answer.selectedAnswer}
      </div>
      ${!answer.isCorrect ? `
      <div class="review-answer correct-answer">
        Correct Answer: ${answer.correctAnswer}
      </div>
      ` : ''}
      <div class="review-explanation">
        💡 ${answer.explanation}
      </div>
    `;
    
    reviewContainer.appendChild(reviewItem);
  });
}

function goHome() {
  reviewScreen.classList.remove("active");
  startScreen.classList.add("active");
}

// ==================== STATISTICS FUNCTIONS ====================

function showStatistics() {
  startScreen.classList.remove("active");
  statsScreen.classList.add("active");
  
  loadStatistics();
  renderChart();
}

function goHomeFromStats() {
  statsScreen.classList.remove("active");
  startScreen.classList.add("active");
}

function saveQuizResult(score, total) {
  const percentage = Math.round((score / total) * 100);
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
  
  quizHistory.push({
    date: new Date().toLocaleDateString(),
    score: score,
    total: total,
    percentage: percentage
  });
  
  if (quizHistory.length > 10) {
    quizHistory.shift();
  }
  
  localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
}

function loadStatistics() {
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
  
  const totalQuizzes = quizHistory.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round(quizHistory.reduce((sum, q) => sum + q.percentage, 0) / totalQuizzes) 
    : 0;
  const bestScore = totalQuizzes > 0 
    ? Math.max(...quizHistory.map(q => q.percentage)) 
    : 0;
  
  totalQuizzesEl.textContent = totalQuizzes;
  averageScoreEl.textContent = `${averageScore}%`;
  bestScoreEl.textContent = `${bestScore}%`;
}

function renderChart() {
  const ctx = document.getElementById("performance-chart").getContext("2d");
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
  
  if (performanceChart) {
    performanceChart.destroy();
  }
  
  const isDarkMode = document.body.classList.contains("dark-mode");
  const chartColor = isDarkMode ? '#4db6ac' : '#00796b';
  const chartText = isDarkMode ? '#e0e0e0' : '#333333';
  
  performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: quizHistory.map((q, i) => `Quiz ${i + 1}`),
      datasets: [{
        label: 'Score Percentage',
        data: quizHistory.map(q => q.percentage),
        borderColor: chartColor,
        backgroundColor: isDarkMode ? 'rgba(77, 182, 172, 0.1)' : 'rgba(0, 121, 107, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: chartText },
          grid: { color: isDarkMode ? '#444' : '#e0e0e0' }
        },
        x: {
          ticks: { color: chartText },
          grid: { display: false }
        }
      },
      plugins: {
        legend: { labels: { color: chartText } }
      }
    }
  });
}

// ==================== THEME TOGGLE FUNCTIONS ====================

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  
  const isDarkMode = document.body.classList.contains("dark-mode");
  
  themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
  
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  
  if (statsScreen.classList.contains("active")) {
    renderChart();
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
}

// ==================== LOCAL STORAGE FUNCTIONS ====================

function saveHighScore(currentScore) {
  const storedHighScore = localStorage.getItem("nurseQuizHighScore");
  const highScore = storedHighScore ? parseInt(storedHighScore) : 0;
  
  if (currentScore > highScore) {
    localStorage.setItem("nurseQuizHighScore", currentScore);
    loadHighScore();
  }
}

function loadHighScore() {
  const storedHighScore = localStorage.getItem("nurseQuizHighScore");
  const highScore = storedHighScore ? parseInt(storedHighScore) : 0;
  
  if (highScoreDisplay) {
    highScoreDisplay.textContent = `🏆 High Score: ${highScore}`;
  }
}

// ==================== STREAK SYSTEM ====================

function updateStreak() {
  const today = new Date().toDateString();
  const lastStudyDate = localStorage.getItem("lastStudyDate");
  let currentStreak = parseInt(localStorage.getItem("currentStreak")) || 0;
  
  if (lastStudyDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastStudyDate === yesterday.toDateString()) {
      currentStreak++;
    } else if (lastStudyDate !== today) {
      currentStreak = 1;
    }
    
    localStorage.setItem("currentStreak", currentStreak);
    localStorage.setItem("lastStudyDate", today);
    
    if (streakCount) {
      streakCount.textContent = currentStreak;
    }
  }
}

function loadStreak() {
  const currentStreak = parseInt(localStorage.getItem("currentStreak")) || 0;
  
  if (streakCount) {
    streakCount.textContent = currentStreak;
  }
}