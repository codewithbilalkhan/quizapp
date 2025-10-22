let currentQuestion = 0;
let score = 0;
let timerId;

let quizcontainer = document.getElementById('quiz-container');
let question = document.getElementById('question');
let options = document.getElementById('options');
let next = document.getElementById('next');
let result = document.getElementById('result');
let timerDisplay = document.getElementById('timer');

let questions = [
  {
    question: "What is the capital of Pakistan?",
    options: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'],
    answer: 'Islamabad'
  },
  {
    question: "What is the capital of India?",
    options: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata'],
    answer: 'New Delhi'
  },
  {
    question: "What is the capital of China?",
    options: ['Beijing', 'Shanghai', 'Tianjin', 'Chongqing'],
    answer: 'Beijing'
  }
];


function displayQuestions() {
  question.innerHTML = questions[currentQuestion].question;
  options.innerHTML = "";
  clearInterval(timerId); 

  let timeLeft = 10;
  timerDisplay.innerText = timeLeft;

  timerId = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      disableOptions();
      next.disabled = false;
      timerDisplay.innerText = "Time's up!";
    }
  }, 1000);

  questions[currentQuestion].options.forEach(optionText => {
    let li = document.createElement("li");
    li.innerText = optionText;
    li.onclick = () => checkAnswer(optionText);
    options.appendChild(li);
  });

  next.disabled = true;
}


function checkAnswer(selectedOption) {
  clearInterval(timerId);

  let correctAnswer = questions[currentQuestion].answer;
  if (selectedOption === correctAnswer) {
    score++;
  }

  let allOptions = document.querySelectorAll("#options li");
  allOptions.forEach(li => {
    if (li.innerText === correctAnswer) {
      li.style.backgroundColor = "lightgreen";
    } else if (li.innerText === selectedOption) {
      li.style.backgroundColor = "lightcoral";
    }
    li.style.pointerEvents = "none";
  });

  next.disabled = false;
}


function disableOptions() {
  let allOptions = document.querySelectorAll("#options li");
  allOptions.forEach(li => {
    li.style.pointerEvents = "none";
    li.style.backgroundColor = "#ddd";
  });
}


next.onclick = function () {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestions();
  } else {
    showResult();
  }
};

// ✅ Show result
function showResult() {
  quizcontainer.style.display = "none";
  result.style.display = "block";
  document.getElementById("score").innerText = score + " / " + questions.length;
}

// ✅ Start quiz
displayQuestions();
