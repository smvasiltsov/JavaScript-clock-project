// document elements
const clock = document.getElementById('clock');
const image = document.getElementById('image');

// const variables
const ONE_SECOND = 1000;
const ENTER_KEY_CODE = 13;
const wakeupHour = 3;
const dayTimeHour = 12;
const goToSleepHour = 21;

// Images
const nightCatSrc = 'http://www.leadervet.com/night.jpg'
const morningCatSrc = 'https://cathumor.net/wp-content/uploads/2015/03/Cat-humor-Good-Morning.jpg'
const daytimeCatSrc = 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg'

let currentTime = new Date()
let hours = currentTime.getHours()
let minutes = currentTime.getMinutes()
let seconds = currentTime.getSeconds()
let midday = ''



function updateClock() {
    getCurrentTime();
    changeImage();
}


function getCurrentTime() {
    currentTime = new Date()
    hours = currentTime.getHours()
    minutes = currentTime.getMinutes()
    seconds = currentTime.getSeconds()
    formatCurrentTime()

    clock.innerText = `${hours} : ${minutes} : ${seconds} ${midday}`
}

function formatCurrentTime() {
    if (hours > 12) {
        hours -= 12
        midday = 'PM'
    } else {
        midday = 'AM'
    }

    if (hours < 10) { hours = '0' + hours };
    if (minutes < 10) { minutes = '0' + minutes };
    if (seconds < 10) { seconds = '0' + seconds };
}

function changeImage() {
    let fullHours = currentTime.getHours();

    if (fullHours >= goToSleepHour || fullHours < wakeupHour) {
        image.src = nightCatSrc;
    } else if (fullHours >= wakeupHour && fullHours < dayTimeHour) {
        image.src = morningCatSrc;
    } else if (fullHours >= dayTimeHour && fullHours < goToSleepHour) {
        image.src = daytimeCatSrc;
    }
}

// function for button
function submitGoal() {
    const newGoal = document.getElementById("newGoal").value;
    document.getElementById("goal").innerText = newGoal;
}

function enableEnterForInput() {
    const goalInput = document.getElementById("newGoal");
    const timeInput = document.getElementById("minutesToWork");

    goalInput.addEventListener("keyup", function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            submitGoal();
        }
    });

    timeInput.addEventListener("keyup", function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            submitGoal();
        }
    });
}


//initialize
updateClock();
enableEnterForInput();

// update
setInterval(updateClock, ONE_SECOND)

