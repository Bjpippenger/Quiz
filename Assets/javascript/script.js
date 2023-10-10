const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Earth"],
    answer: "Jupiter",
  },
 {
    question: "What is the capital of California?",
    options: ["Sacramento", "Redding", "Monterey", "Santa Cruz"],
    answer: "Sacramento"
 }
];

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let time = 60;

function startQuiz() {
  startBtn.style.display = "none";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", checkAnswer);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(event) {
  const selectedOption = event.target.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.answer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  const timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  questionContainer.textContent = `Quiz completed! Your score is ${score}/${questions.length}.`;
  optionsContainer.innerHTML = "";
}

startBtn.addEventListener("click", startQuiz);
