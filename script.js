// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton =  document.getElementById("start-btn");
const questionText =  document.getElementById("question-text");
const answerContainer =  document.getElementById("answer-container");
const currentQuestionSpan =  document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-messsage");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
{
    question: "What is the capital of France?",
    answers: [
        {text: "London",correct: false },
        {text: "Berlin",correct: false},
        {text: "Paris",correct: true},
        {text:"Madrid",correct: false},
    ],
},
{
    question: "Which planet do human live?",
    answers: [
        {text: "Earth",correct: true },
        {text: "venus",correct: false},
        {text: "Jupiter",correct: false},
        {text: "Saturn",correct: false},
    ]
},
{
    question: "What is the capital of Kenya",
    answers: [
        {text: "Nairobi",correct: true},
        {text: "Kampala",correct: false},
        {text: "Addis Ababa",correct: false},
        {text: "Mogadishu",correct:false},
    ]
},
{
    question: "What is the largest organ of the body",
    answers: [
        {text: "skin",correct: true},
        {text: "kidney",correct: false},
        {text: "ear",correct: false},
        {text: "eye",correct: false},
    ]
},{
    question: "What is the fastest animal on earth",
    answers: [
        {text: "lion",correct: false},
        {text: "turtle",correct: false},
        {text: "cheetah",correct: true},
        {text: "tiger",correct: false},
    ]
}];



// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContext = quizQuestions.length;

// event listeners

startButton.addEventListener("click". startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    // reset state
    answerDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textcontent = currentQuestionIndex + 1

    const progressPercent = {currentQuestionIndex / quizQuestions.length} * 100;
    progressBar.style.width = progressPercent +  "%"

    questionText.textContent = currentQuestion.question

    // todo: explain this in a second
}