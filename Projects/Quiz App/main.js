const questions = [
    {
		question: 'what is your name?',
		answers: [
			{ opt: 'Alina', correct: false },
			{ opt: 'Laiba', correct: true },
			{ opt: 'Asad', correct: false },
			{ opt: 'Abdullah', correct: false },
		],
	},
	{
		question: 'whats your age?',
		answers: [
			{ opt: '20', correct: false },
			{ opt: '18', correct: false },
			{ opt: '19', correct: true },
			{ opt: '17', correct: false },
		],
	},
	{
		question: 'what is your university name?',
		answers: [
			{ opt: 'IBU', correct: false },
			{ opt: 'GC', correct: false },
			{ opt: 'UMT', correct: false },
			{ opt: 'AGRI', correct: true },
		],
	},
];

const Question = document.querySelector('.question');
const Answerbtns = document.querySelector('.answers-btns');
const NexQBtn = document.querySelector('.next-btn');

let currentQuestionIndex = 0;
let score = 0;

const resetState = () => {
    NexQBtn.style.display = 'none';
    Answerbtns.innerHTML = '';
};

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    NexQBtn.innerHTML = 'Next';
    showQuestion();
};

const showQuestion = () => {
    resetState();

    const currentQ = questions[currentQuestionIndex];
    const qNo = currentQuestionIndex + 1;
    Question.innerText = `${qNo}. ${currentQ.question}`;

    currentQ.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.opt;
        button.classList.add('btn');
        if (answer.correct) {
            // data-correct="true"   * in html
            button.dataset.correct = 'true';
        }
        button.addEventListener('click', checkAnswer);
        Answerbtns.appendChild(button);
    });
};

const checkAnswer = (event) => {
    const selectBtn = event.target;
    const isTrue = selectBtn.dataset.correct === 'true';

    selectBtn.classList.toggle('correct', isTrue);
    selectBtn.classList.toggle('incorrect', !isTrue);

    Array.from(Answerbtns.children).forEach((button) => {
        const isCorrect = button.dataset.correct === 'true';
        button.classList.toggle('correct', isCorrect);
        button.disabled = true;
    });

    NexQBtn.style.display = 'block';

    if (isTrue) {
        score++;
    }
};

const showScore = () => {
    resetState();
    Question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    NexQBtn.innerHTML = 'Play Again';
    NexQBtn.style.display = 'block';
};

const handleNextQ = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

NexQBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextQ();
    } else {
        startQuiz();
    }
});

startQuiz();
