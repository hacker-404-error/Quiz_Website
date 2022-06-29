const question = document.querySelector("#question");

const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");

const scoreText = document.querySelector("#score");

const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};

let acceptingAnswers = true;

let score = 0;

let questionCounter = 0;

let availableQuestions = [];

let questions = [
  {
    question: "High level language is a .?",
    choice1: "Human readable like language.",
    choice2: "language with small program size",
    choice3: "language with big program size",
    choice4: "language which is difficult to understand and not human readable.",
    answer: 1,
  },
  {
    question: "C Language is a successor to which language.?",
    choice1: "FORTRAN",
    choice2: "D Language",
    choice3: "BASIC",
    choice4: "B Language",
    answer: 4,
  },
  {
    question: "C language was invented in which laboratories.?",
    choice1: "Uniliver Labs",
    choice2: "IBM Labs",
    choice3: "AT&T Bell Labs",
    choice4: "Verizon Labs",
    answer: 3,
  },
  {
    question: "BCPL Language is also called..?",
    choice1: "C Language",
    choice2: "B Language",
    choice3: "D Language",
    choice4: "None",
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
