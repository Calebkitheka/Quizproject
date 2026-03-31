// DOM Elements
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

// Nursing Questions (Educational Purpose Only)
const quizQuestions = [
    {
        question: "What is the normal resting heart rate for an adult?",
        answers: [
            { text: "40-50 bpm", correct: false },
            { text: "60-100 bpm", correct: true },
            { text: "120-140 bpm", correct: false },
            { text: "100-120 bpm", correct: false },
        ],
    },
    {
        question: "Which organ produces insulin?",
        answers: [
            { text: "Liver", correct: false },
            { text: "Pancreas", correct: true },
            { text: "Kidney", correct: false },
            { text: "Spleen", correct: false },
        ]
    },
    {
        question: "What does 'BP' stand for in medical terms?",
        answers: [
            { text: "Blood Pressure", correct: true },
            { text: "Body Pulse", correct: false },
            { text: "Breathing Pattern", correct: false },
            { text: "Bone Density", correct: false },
        ]
    },
    {
        question: "What is the largest organ of the human body?",
        answers: [
            { text: "Liver", correct: false },
            { text: "Brain", correct: false },
            { text: "Skin", correct: true },
            { text: "Heart", correct: false },
        ]
    },
    {
        question: "Which blood type is the universal donor?",
        answers: [
            { text: "A+", correct: false },
            { text: "AB-", correct: false },
            { text: "O-", correct: true },
            { text: "B+", correct: false },
        ]
    }
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;

// Initialize Total Questions
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

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

    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerContainer.appendChild(button);
    });
}

function resetState() {
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

    // Show correct answer automatically if wrong was picked
    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; 
    });

    // Wait 1 second then go to next question
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    
    finalScoreSpan.textContent = score;
    
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect Score! 🏆";
    } else if (percentage >= 70) {
        resultMessage.textContent = "Great Job! 🎉";
    } else {
        resultMessage.textContent = "Keep Studying! 📚";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}