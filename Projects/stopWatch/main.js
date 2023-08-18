class Timer {
    constructor() {
        this.timeDisplay = document.querySelector('#time');
        this.startBtn = document.querySelector('#startBtn');
        this.pauseBtn = document.querySelector('#pauseBtn');
        this.resetBtn = document.querySelector('#resetBtn');

        this.interval = null;
        this.miliSeconds = 0;
        this.seconds = 0;
        this.mintues = 0;
        this.hours = 0;

        this.startBtnDisabled = false;
        this.pauseBtnDisabled = true;
        this.resetBtnDisabled = true;

        this.startBtn.addEventListener('click', this.startClicked.bind(this));
        this.pauseBtn.addEventListener('click', this.pauseClicked.bind(this));
        this.resetBtn.addEventListener('click', this.resetClicked.bind(this));
    }

    startClicked() {
        if (!this.startBtnDisabled) {
            this.startBtnDisabled = true;
            this.pauseBtnDisabled = false;
            this.resetBtnDisabled = false;
            this.startTime();
        }
    }

    pauseClicked() {
        if (!this.pauseBtnDisabled) {
            this.startBtnDisabled = false;
            this.pauseBtnDisabled = true;
            this.resetBtnDisabled = false;
            this.pause();
        }
    }

    resetClicked() {
        if (!this.resetBtnDisabled) {
            this.startBtnDisabled = false;
            this.pauseBtnDisabled = true;
            this.resetBtnDisabled = true;
            this.reset();
        }
    }

    DisplayTimer() {
        this.miliSeconds += 10;
        if (this.miliSeconds === 1000) {
            this.miliSeconds = 0;
            this.seconds++;
            if (this.seconds === 60) {
                this.seconds = 0;
                this.mintues++;
                if (this.mintues === 60) {
                    this.mintues = 0;
                    this.hours++;
                }
            }
        }
        let h = this.hours < 10 ? `0${this.hours}` : this.hours;
        let m = this.mintues < 10 ? `0${this.mintues}` : this.mintues;
        let s = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
        let miliS = this.miliSeconds < 10 ? `00${this.miliSeconds}` : this.miliSeconds < 100 ? `0${this.miliSeconds}` : this.miliSeconds;

        this.timeDisplay.innerHTML = `${h}:${m}:${s}:${miliS}`;
    }

    startTime() {
        this.interval = setInterval(this.DisplayTimer.bind(this), 10);
    }

    pause() {
        clearInterval(this.interval);
    }

    reset() {
        clearInterval(this.interval);
        this.miliSeconds = 0;
        this.seconds = 0;
        this.mintues = 0;
        this.hours = 0;

        let miliS = this.miliSeconds < 10 ? `00${this.miliSeconds}` : this.miliSeconds < 100 ? `0${this.miliSeconds}` : this.miliSeconds;

        this.timeDisplay.innerHTML = '00:00:00:' + miliS;
    }
}

const timer = new Timer();
