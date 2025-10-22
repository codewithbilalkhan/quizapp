let currentQuestion = 0;
let score = 0;

let quizcontainer = document.getElementById('quiz-container');
let question = document.getElementById('question');
let options = document.getElementById('options');
let next = document.getElementById('next');
let result = document.getElementById('result');


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
]

function displayQuestions() {
    
    question.innerHTML = questions[currentQuestion].question;
    options.innerHTML = "";
    questions[currentQuestion].options.forEach(optionText => {
      let li = document.createElement("li");
      li.innerText = optionText;
      li.onclick = () => checkanswers(optionText);
      options.appendChild(li);
    });
  }
  

  function checkanswers(selectedOption)
  {
    let correctanswer  = questions[currentQuestion].answer;
    if(selectedOption === correctanswer)
    {
        score++;
    }
    let allOptions = document.querySelectorAll("#options li");
    allOptions.forEach(li => {
      if (li.innerText === correctanswer) {
        li.style.backgroundColor = "lightgreen";
      } else if (li.innerText === selectedOption) {
        li.style.backgroundColor = "lightcoral";
      }
    
      
      li.style.pointerEvents = "none";
    });
    
  }
  next.onclick = function(){
    currentQuestion++;
    if(currentQuestion < questions.length)
    {
        displayQuestions();
    }else{
        showResult();
    }
  }

  function showResult() {
    quizcontainer.style.display = "none";
    result.style.display = "block";
  
    document.getElementById("score").innerText = score + " / " + questions.length;
  }
  


  displayQuestions();