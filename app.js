// document elements
const clockOutput = document.getElementById("clock");
const goalOutput = document.getElementById("goal");
const image = document.getElementById("image");

// const variables
const ONE_SECOND = 1000;
const ENTER_KEY_CODE = 13;
const END_KEY_CODE = 35;
const ESC_KEY_CODE = 27;
const defaultGoalText = "Input your goal and time!";
const defaultFinishedText = "It's time to take a break";
const defaultPauseText = "paused";
const defaultTitle = "Motivation for work";

// Images
const canselledCatSrc = "canselled.jpg"
const progressCatSrc = "progress.jpg"
const pauseCatSrc = "pause.jpg"
const finishedCatSrc = "finished.jpg"

let secondsLeft = 0;
let seconds = minutes = hours = 0;
let state = "done"

class Timer {
    constructor() {
        this.defaultStates = ["progress", "pause", "canselled", "finished"];
        this.currentState = "canselled";
        this.secondsLeft = 0;
        this.seconds = minutes = hours = 0;
    }

    // should run every second
    checkState() {
        switch (this.currentState) {
            case "progress":
                this.updateTimer(this.secondsLeft--);
                image.src = progressCatSrc;
                document.title = clockOutput.innerText;
                break;
            case "pause":
                clockOutput.innerText = defaultPauseText;
                image.src = pauseCatSrc;
                document.title = clockOutput.innerText;
                break;
            case "canselled":
                clockOutput.innerText = "";
                goalOutput.innerText = defaultGoalText;
                image.src = canselledCatSrc;
                document.title = defaultTitle;
                break;
            case "finished":
                clockOutput.innerText = defaultFinishedText;
                image.src = finishedCatSrc;
                document.title = defaultTitle;
                break;
        }
    }

    setState(newState) {
        this.defaultStates.includes(newState) ? this.currentState = newState : console.log("Inappropriate state. Check 'SetState' parameters");
    }

    setTime(newTime) {
        newTime != NaN && newTime > 0 ? this.secondsLeft = newTime : alert("Enter correct time");
    }

    updateTimer(seconds) {
        // converting seconds to minutes and hours
        let tempTimerText = "";
        if (this.secondsLeft <= 0) {
            this.setState("finished");
            document.getElementById("tone").play()
            this.checkState();
        }

        time.countTimeFromSeconds(this.secondsLeft);
        tempTimerText = `${time.seconds}`;
        if(time.minutesExist()) tempTimerText = `${time.minutes} : ` + tempTimerText;
        if(time.hoursExists()) tempTimerText = `${time.hours} : ` + tempTimerText;

        // showing exact time left
        clockOutput.innerText = tempTimerText;
    }
}

class Time {
    constructor() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    minutesExist() {
        return this.minutes > 0 || this.hours > 0
    }
    hoursExists() {
        return this.hours > 0
    }
    countTimeFromSeconds(inputSeconds) {
        const SECONDS_IN_HOUR = 3600;
        const SECONDS_IN_MINUTE = 60;
        this.hours = Math.floor(inputSeconds / SECONDS_IN_HOUR);
        this.minutes = Math.floor((inputSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
        this.seconds = Math.floor(((inputSeconds % SECONDS_IN_HOUR) % SECONDS_IN_MINUTE));
        if (this.minutes > 0) this.seconds = ("0" + this.seconds.toString()).slice(-2);
        if (this.hours > 0) this.minutes = ("0" + this.minutes.toString()).slice(-2);
    }
}

function submitNewGoal() {
    const newGoalValue = document.getElementById("newGoal").value;
    const newTimeValue = document.getElementById("newTime").value;

    if (newGoalValue == "" || newTimeValue == "" || newTimeValue == NaN || newTimeValue <= 0) {
        alert("Enter correct goal and time");
        return;
    }

    goalOutput.innerText = newGoalValue;
    timer.setTime(newTimeValue * 60);
    timer.setState("progress");
    timer.checkState();
}

function enableKeyboardInteractions() {
    this.addEventListener("keyup", function (event) {
        switch (event.keyCode) {
            case ENTER_KEY_CODE:
                submitNewGoal();
                break;
            case END_KEY_CODE:
                if (timer.currentState == "progress") {
                    timer.setState("pause");
                } else if (timer.currentState == "pause") {
                    timer.setState("progress");
                }

                timer.checkState();
                break;
            case ESC_KEY_CODE:
                timer.setState("canselled");
                timer.checkState();
                break;
        }
    });
}

//initialize
enableKeyboardInteractions();
let timer = new Timer();
let time = new Time();

function runEverySecond() {
    timer.checkState();
}

// update
setInterval(runEverySecond, ONE_SECOND)

