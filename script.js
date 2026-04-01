// ==================== DOM ELEMENTS ====================
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const categoryLabel = document.getElementById("category-label"); // NEW: For category display
const explanationBox = document.getElementById("explanation-box"); // NEW: For answer explanation

// ==================== NURSING QUESTION BANK ====================
// Structure: Array of Objects with metadata
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
    explanation: "The normal resting heart rate for adults is 60-100 beats per minute. Athletes may have lower rates (40-60 bpm)."
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
    explanation: "The pancreas produces insulin, which regulates blood glucose levels. Dysfunction leads to diabetes."
  },
  {
    id: 3,
    question: "What does the acronym 'ABC' stand for in emergency nursing?",
    category: "Emergency Care",
    difficulty: "medium",
    answers: [
      { text: "Airway, Breathing, Circulation", correct: true },
      { text: "Assessment, Bandage, Care", correct: false },
      { text: "Alert, Breathing, Conscious", correct: false },
      { text: "Airway, Blood, Compression", correct: false }
    ],
    explanation: "ABC = Airway, Breathing, Circulation. This is the primary survey sequence in emergency care."
  },
  {
    id: 4,
    question: "Which blood type is known as the 'universal donor'?",
    category: "Hematology",
    difficulty: "medium",
    answers: [
      { text: "A+", correct: false },
      { text: "AB+", correct: false },
      { text: "O-", correct: true },
      { text: "B-", correct: false }
    ],
    explanation: "O- blood lacks A, B, and Rh antigens, making it safe to transfuse to any recipient in emergencies."
  },
  {
    id: 5,
    question: "What is the first-line treatment for anaphylaxis?",
    category: "Pharmacology",
    difficulty: "hard",
    answers: [
      { text: "Antihistamines (Benadryl)", correct: false },
      { text: "Corticosteroids", correct: false },
      { text: "Epinephrine (EpiPen)", correct: true },
      { text: "Albuterol inhaler", correct: false }
    ],
    explanation: "Epinephrine is the first-line treatment for anaphylaxis. It reverses airway swelling and hypotension rapidly."
  }
    {
    id: 6,
    question: "What does the medical abbreviation 'NPO' stand for?",
    category: "Medical Terminology",
    difficulty: "easy",
    answers: [
      { text: "No Prescription Orders", correct: false },
      { text: "Nothing by Mouth", correct: true },
      { text: "Nurse Practice Order", correct: false },
      { text: "Normal Patient Observation", correct: false }
    ],
    explanation: "NPO = 'Nil Per Os' (Latin) meaning 'Nothing by Mouth'. Patients are kept NPO before surgery to prevent aspiration."
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
    explanation: "Gloves are required when there's potential exposure to blood, body fluids, secretions, or contaminated surfaces (Standard Precautions)."
  }
];

// ==================== QUIZ STATE VARIABLES ====================
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // Track user selections for review

// ==================== INITIALIZATION ====================
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// ==================== EVENT LISTENERS ====================
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// ==================== CORE FUNCTIONS ====================

function startQuiz() {
  // Reset state
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  scoreSpan.textContent = score;
  
  // Switch screens
  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");
  
  showQuestion();
}

function showQuestion() {
  resetState();
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Update UI with question data
  currentQuestionSpan.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  questionText.textContent = currentQuestion.question;
  
  // Display category (NEW FEATURE)
  if (categoryLabel) {
    categoryLabel.textContent = `📚 ${currentQuestion.category} • ${currentQuestion.difficulty.toUpperCase()}`;
  }
  
  // Update progress bar
  const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
  
  // Generate answer buttons
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.dataset.index = index;
    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

function resetState() {
  // Clear previous answers
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
  
  // Hide explanation box
  if (explanationBox) {
    explanationBox.style.display = "none";
    explanationBox.textContent = "";
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Save user answer for review
  userAnswers.push({
    question: currentQuestion.question,
    selected: selectedBtn.textContent,
    correct: currentQuestion.answers.find(a => a.correct).text,
    isCorrect: isCorrect,
    explanation: currentQuestion.explanation
  });
  
  // Visual feedback
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    selectedBtn.classList.add("incorrect");
    // Highlight the correct answer
    Array.from(answerContainer.children).forEach(btn => {
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
      }
    });
  }
  
  // Show explanation (NEW FEATURE)
  if (explanationBox) {
    explanationBox.textContent = `💡 ${currentQuestion.explanation}`;
    explanationBox.style.display = "block";
  }
  
  // Disable all buttons after selection
  Array.from(answerContainer.children).forEach(btn => {
    btn.disabled = true;
  });
  
  // Auto-advance after 2 seconds
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 2000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  
  finalScoreSpan.textContent = score;
  
  // Personalized feedback
  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "🏆 Perfect! You're ready for clinicals!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "🎉 Excellent! Keep up the great work!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "📚 Good effort! Review the explanations below.";
  } else {
    resultMessage.textContent = "💪 Keep studying! Nursing school is a marathon.";
  }
  
  // TODO: Day 3 - Save results to localStorage
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}