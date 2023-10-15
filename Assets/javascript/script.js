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
    answer: "Sacramento",
  },
  {
    question: "What is the word?",
    options: ["Octopus", "Ball", "Donkey", "Bird"],
    answer: "Bird",
  },
];

const resetBtn = document.getElementById("reset-btn");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");

let timePenalty = 10;
let currentQuestionIndex = 0;
let score = 0;
let time = 60;
let highScore = 0;
let playerInitials = "";
let timer;

function updateScore() {
  document.getElementById("score").textContent = `Score: ${score}`;
}

function updateTimer() {
  timeDisplay.textContent = time;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  time = 60;
  clearInterval(timer);
  updateScore();
  updateTimer();
  displayQuestion();
  startTimer();
}

resetBtn.addEventListener("click", resetQuiz);

function updateHighScore() {
  const storedHighScore = localStorage.getItem("highScore");
  if (storedHighScore !== null) {
    highScore = parseInt(storedHighScore);
  }
  document.getElementById("highscore").textContent = `High Score: ${highScore}`;
}

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
  } else {
    time -= timePenalty;
    timeDisplay.textContent = time;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
document.getElementById("score").textContent = `Score: ${score}`;
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);

  questionContainer.textContent = `Quiz completed! Your score is ${score}/${questions.length}.`;
  optionsContainer.innerHTML = "";
  score = 0;

  if (time <= 0) {
    questionContainer.textContent = "Time's up! Quiz completed.";
  }

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    updateHighScore();
  }
}

startBtn.addEventListener("click", startQuiz);

document.getElementById("saveInitials").addEventListener("click", function () {
  const initialsInput = document.getElementById("initialsInput");
  const newInitials = initialsInput.value;

  if (newInitials) {
    playerInitials = newInitials;
  }
});

updateHighScore();
