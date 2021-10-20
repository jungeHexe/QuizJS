/*массив полей вариантов ответа и вопрос*/
const options = document.querySelectorAll('.option');
const questionElem = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'), //поле вверху для вывода текущего номера вопроса
      numberOfAllQuestion = document.getElementById('number-of-all-questions'); //колво вопросов вообще

const btnNext = document.getElementById('btn-next'); //кнопка далее

const answersTracer = document.getElementById('answers-tracker'); //трекер для верных/неверных ответов внизу формы

const overModal = document.querySelector('.quiz-over-modal');
      correctAns = document.getElementById('correct-answer'), //колво верных ответов для модалки
      countQuestion = document.getElementById('number-of-all-questions-2'), //всего вопросов в модалке
      btnTryAgain = document.getElementById('btn-try-again'); //кнопка начать заново в модалке


let indexOfQuestion = 0, indexOfPage = 0, score = 0; //индексы текущего вопроса и страницы


//массив вопросов
const questions = [
    {
        question : 'Фреймворк Java для бэкенда:',
        options : [
            'Spring', 
            'Maven', 
            'Autumn', 
            'Node',
        ],
        rightAns : 0
    },
    {
        question : 'Фреймворк JS для бэкенда:',
        options : [
            'Spring', 
            'Maven', 
            'Autumn', 
            'Node',
        ],
        rightAns : 3
    },
    {
        question : 'На каком языке написан VS Code:',
        options : [
            'Java', 
            'JavaScript', 
            'C#', 
            'C++',
        ],
        rightAns : 1
    },
    {
        question : 'Откуда пошло название языка Python:',
        options : [
            'комик-группа Monty Python', 
            'разработчик языка любил змей', 
            'это псевдоним разработчика', 
            'разработчик проиграл спор с другом',
        ],
        rightAns : 0
    },
];

numberOfAllQuestion.innerHTML = questions.length;
let completeQuest = []; //вопросы которые уже были

const randomQuestion = () => {
    let randomNum = Math.floor(Math.random() * questions.length);
    if(indexOfPage == questions.length){
        quizOver();
    }else{
        if(completeQuest.length == 0 || completeQuest.indexOf(randomNum) == -1){
            indexOfQuestion = randomNum;
            load();
        }
        else if(completeQuest.indexOf(randomNum) != -1){
            randomQuestion();
        }
    }
    completeQuest.push(indexOfQuestion);
}

const load = () => {
    questionElem.innerHTML = questions[indexOfQuestion].question;
    for(let i = 0; i < options.length; i++){
        options[i].innerHTML = questions[indexOfQuestion].options[i];
    }
    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

const disabledOptions = () => {
    options.forEach(el => {
        el.classList.add('disabled');
        if(el.dataset.id == questions[indexOfQuestion].rightAns){
            el.classList.add('correct');
        }
    });
}

const checkAnswer = (el) => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAns){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

const enableOptions = () => {
    options.forEach(el => {
        el.classList.remove('disabled', 'correct', 'wrong');
    })
}

const validate = () => {
    if(!options[0].classList.contains('disabled')){
        alert('Нельзя пропустить вопрос');
    }else{
        randomQuestion();
        enableOptions();
    }
}

for(option of options){
    option.addEventListener('click', e => checkAnswer(e));
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracer.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracer.children[indexOfPage - 1].classList.add(`${status}`);
}

btnNext.addEventListener('click', () => validate());

const quizOver = () => {
    overModal.classList.add('active');
    correctAns.innerHTML = score;
    countQuestion.innerHTML = questions.length;
}

btnTryAgain.addEventListener('click', () => {
    window.location.reload();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})

