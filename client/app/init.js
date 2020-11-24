// start button, open question container

const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-btn');

startButton.addEventListener('click', function() {
  startButton.classList.add('hide');
  questionContainer.classList.remove('hide');
  nextButton.classList.remove('hide');
  showQuestion(1);
});

// actions after click on next-button
let currentQuestionIndex = 1;

nextButton.addEventListener('click', function() {
  currentQuestionIndex++
  addScoreQuestion(currentQuestionIndex);
  showQuestion(currentQuestionIndex);

})

// add score-question
const scoreQuestion = document.getElementById('score-question');

function addScoreQuestion(n) {
  scoreQuestion.innerHTML = `Question ${n} from 10`
};

// show next question
const question = document.getElementById('question');
console.log(question);
function showQuestion(m) {
  question.innerHTML = `This is question number ${m}`;
}


// -----------------*******---------------------
fetch('/api')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.getElementById('root')
      .innerHTML = data.message;
  })
  .catch(err => console.error(err));

