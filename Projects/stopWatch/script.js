const timeDisplay = document.querySelector('#time');
const startBtn = document.querySelector('#startBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const resetBtn = document.querySelector('#resetBtn');

let interval;
let startBtnDisabled = false;
let pauseBtnDisabled = true;
let resetBtnDisabled = true;
let [miliSeconds, seconds, mintues,  hours] = [0,0,0,0];

let DisplayTimer = () => {
    miliSeconds+=10;
    if (miliSeconds == 1000) {
        miliSeconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            mintues++;
            if (mintues == 60) {
                mintues = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? `0${hours}` : hours;
    let m = mintues < 10 ? `0${mintues}` : mintues;
    let s = seconds < 10 ? `0${seconds}` : seconds;
    let miliS = miliSeconds < 10 ? `00${miliSeconds}` : miliSeconds < 100 ? `0${miliSeconds}` : miliSeconds;

    timeDisplay.innerHTML = `${h}:${m}:${s}:${miliS}`;
}


let startTime = () => {
    interval = setInterval(DisplayTimer, 10);
}

let pause = () => {
    clearInterval(interval);
}

let reset = () => {
    clearInterval(interval);
    [miliSeconds, seconds, mintues,  hours] = [0,0,0,0];
    timeDisplay.innerHTML = '00:00:00:000';
}

let startClicked = () => {
    if (!startBtnDisabled) {
        startBtnDisabled = true;
        pauseBtnDisabled = false;
        resetBtnDisabled = false;
        startTime();
    }
};

let pauseClicked = () => {
    if (!pauseBtnDisabled) {
        startBtnDisabled = false;
        pauseBtnDisabled = true;
        resetBtnDisabled = false;
        pause();
    }
};

let resetClicked = () => {
    if (!resetBtnDisabled) {
        startBtnDisabled = false;
        pauseBtnDisabled = true;
        resetBtnDisabled = true;
        reset();
    }
};

startBtn.addEventListener('click', startClicked);
pauseBtn.addEventListener('click', pauseClicked);
resetBtn.addEventListener('click', resetClicked);












