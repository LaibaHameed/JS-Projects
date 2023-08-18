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

 resetState = () =>{
    NexQBtn.style.display = 'none';
    while (Answerbtns.firstChild) {
            Answerbtns.removeChild(Answerbtns.firstChild);
        }
        
    }

let startQuiz = () => {
	currentQuestionIndex = 0;
	score = 0;
	NexQBtn.innerHTML = 'Next';
	ShowQuestion();
};

let ShowQuestion = () => {
    resetState();
	let currentQ = questions[currentQuestionIndex];
	let qNo = currentQuestionIndex + 1;
	Question.innerText = qNo + '. ' + currentQ.question;

	Answerbtns.innerHTML = '';

	let answers = currentQ.answers;
	answers.forEach((answer) => {
		const button = document.createElement('button');
		button.innerText = answer.opt;
		button.classList.add('btn');
		Answerbtns.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', checkAnswer);
	});
};

let checkAnswer = (event) => {
	const selectBtn = event.target;
	const isTrue = selectBtn.dataset.correct === 'true';
	if (isTrue) {
		selectBtn.classList.add('correct');
		score++;
	} else {
		selectBtn.classList.add('incorrect');
	}

	//  Array.from method to create an array from the collection of child elements inside the Answerbtns container. It then uses the forEach method to loop through each button element.
	Array.from(Answerbtns.children).forEach((button) => {
        const isCorrect = button.dataset.correct === 'true';
        button.classList.toggle('correct', isCorrect);
        button.disabled = true;
    });
	NexQBtn.style.display = 'block';
};

let showScore = () => {
    resetState();
	Question.innerHTML = `You scored ${score} out of ${questions.length}!`;
	NexQBtn.innerHTML = "Play Again";
    NexQBtn.style.display = 'block';
};

let handleNexQBtn = () => {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		ShowQuestion();
	} else {
		showScore();
	}
};

NexQBtn.addEventListener('click', () => {
	if (currentQuestionIndex < questions.length) {
		handleNexQBtn();
	} else {
		startQuiz();
	}
});

startQuiz();
