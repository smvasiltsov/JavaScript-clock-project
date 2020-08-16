// document elements
const clock = document.getElementById('clock');
// const image = document.getElementById('image');

// const variables
const ONE_SECOND = 1000;
const ENTER_KEY_CODE = 13;

// Images
// const nightCatSrc = 'http://www.leadervet.com/night.jpg'
// const morningCatSrc = 'https://cathumor.net/wp-content/uploads/2015/03/Cat-humor-Good-Morning.jpg'
// const daytimeCatSrc = 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg'

let secondsLeft = 0;
let seconds = minutes = hours = 0;


function updateTimer() {
    if (secondsLeft===0) return
    secondsLeft--;
    if (secondsLeft > 59) {
        minutes = Math.floor(secondsLeft / 60);
        seconds = secondsLeft % 60;
        timerText = `${minutes} : ${seconds}`;
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
            timerText = `${hours} : ${minutes} : ${seconds}`;
        }
    } else {
        seconds = secondsLeft;
        timerText = `${seconds}`;
    }

    if (hours < 10) { hours = '0' + hours };
    if (minutes < 10) { minutes = '0' + minutes };
    if (seconds < 10) { seconds = '0' + seconds };

    clock.innerText = timerText;
}


// function changeImage() {
//     let fullHours = currentTime.getHours();

//     if (fullHours >= goToSleepHour || fullHours < wakeupHour) {
//         image.src = nightCatSrc;
//     } else if (fullHours >= wakeupHour && fullHours < dayTimeHour) {
//         image.src = morningCatSrc;
//     } else if (fullHours >= dayTimeHour && fullHours < goToSleepHour) {
//         image.src = daytimeCatSrc;
//     }
// }

// function for button
function submitGoal() {
    const newGoal = document.getElementById("newGoal").value;
    document.getElementById("goal").innerText = newGoal;
    secondsLeft = document.getElementById("minutesToWork").value * 60;
    updateTimer();
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
updateTimer();
enableEnterForInput();

// update
setInterval(updateTimer, ONE_SECOND)

