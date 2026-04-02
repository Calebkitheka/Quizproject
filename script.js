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
    explanation: "O- blood lacks A, B, and Rh antigens, making it safe to transfuse to any recipient."
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
    explanation: "Epinephrine is the first-line treatment for anaphylaxis."
  },
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
  }
];

// ==================== STATE VARIABLES ====================
let currentQuestionIndex = 0;
let score = 0;

// ==================== INITIALIZATION ====================
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// ==================== EVENT LISTENERS ====================
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// ==================== FUNCTIONS ====================

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  
  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");
  
  showQuestion();
}

function showQuestion() {
  resetState();
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  currentQuestionSpan.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  questionText.textContent = currentQuestion.question;
  
  // Update progress bar
  const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  
  // CREATE ANSWER BUTTONS (This was missing!)
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

function resetState() {
  // Clear previous answer buttons
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  
  // Show correct answer
  Array.from(answerContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // Disable all buttons after selection
  });
  
  // Move to next question after 1.5 seconds
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  
  finalScoreSpan.textContent = score;
  
  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "🏆 Perfect Score!";
  } else if (percentage >= 70) {
    resultMessage.textContent = "🎉 Great Job!";
  } else {
    resultMessage.textContent = "📚 Keep Studying!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}