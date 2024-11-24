// Quiz Data
const quizData = [
    { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink and Text Markup Language"], correct: 0 },
    { question: "Which language is used for styling web pages?", answers: ["HTML", "CSS", "JavaScript"], correct: 1 },
    { question: "Which is not a programming language?", answers: ["Python", "HTML", "Java"], correct: 1 },
    { question: "Which symbol is used for comments in JavaScript?", answers: ["//", "/*", "#"], correct: 0 },
    { question: "Som kokot?", answers: ["Ano", "Nie", "Mozno"], correct: 2 },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startButton = document.querySelector('.start-button');
const quizSection = document.querySelector('.quiz-section');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const resultSection = document.querySelector('.result-section');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const emailForm = document.getElementById('email-form');
const emailInput = document.getElementById('email');

// Event Listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', showNextQuestion);
emailForm.addEventListener('submit', sendEmail);

function startQuiz() {
    startButton.classList.add('hidden');
    quizSection.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function selectAnswer(selected) {
    const correctAnswer = quizData[currentQuestionIndex].correct;
    if (selected === correctAnswer) {
        score++;
    }
    nextButton.classList.remove('hidden');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        nextButton.classList.add('hidden');
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = quizData.length;
}
// Initialize EmailJS
emailjs.init('v3snUmsHfxsO9qFc0'); // Replace 'your_public_key' with your EmailJS public key

function sendEmail(event) {
    event.preventDefault();
    const email = emailInput.value;

    // EmailJS integration (requires setup at https://www.emailjs.com/)
    emailjs.send('service_nqcr2u8', 'template_1faetre', {
        email: email,
        score: `${score}/${quizData.length}`,
    }).then(() => {
        alert('Results sent successfully!');
    }).catch(() => {
        alert('Error sending email. Please try again.');
    });
}
