// Global variables
let currentNumber;
let counter;
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
let likeButton = document.getElementById('heart');


// Start the timer
function startTimer() {
    counter = document.getElementById('counter');
    currentNumber = parseFloat(counter.innerText);

    counterInterval = setInterval(() => {
        currentNumber++;
        counter.innerText = currentNumber;
    }, 1000);
}

startTimer(); // Start the timer

// Handle the plus and minus buttons
minus.addEventListener('click', handleMinus);
plus.addEventListener('click', handlePlus);

function handleMinus() {
    counter.innerText = currentNumber -= 1
}

function handlePlus() {
    counter.innerText = currentNumber += 1
}

// Handle liking and updating the likes list
likeButton.addEventListener('click', function (event) {
    handleLike();
});

function handleLike() {
    let valueLiked = document.getElementById('counter').innerText;

    let likeList = document.getElementsByClassName('likes')[0];

    if (!window.likeCounts) {
        window.likeCounts = {};
    }

    if (window.likeCounts[valueLiked]) {
        window.likeCounts[valueLiked]++;
    } else {
        window.likeCounts[valueLiked] = 1;
    }

    let li = document.createElement('li');
    li.innerText = `${valueLiked} has been clicked ${window.likeCounts[valueLiked]} times`;

    likeList.appendChild(li);
}

// Handle starting and stopping the timer
let pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', toggleTimer);
//comment submit gets disabled if paused
let submitBtn = document.getElementById('submit');

let timerRunning = true; // Start the timer initially

function toggleTimer() {
    if (timerRunning) {
        clearInterval(counterInterval); // Clear the counter interval
        timerRunning = false;
        pauseButton.innerText = "Resume";
        submitBtn.disabled = true;
        plus.disabled = true;
        minus.disabled = true;
        likeButton.disabled = true;
    } else {
        startTimer();
        timerRunning = true;
        pauseButton.innerText = "Pause";
        submitBtn.disabled = false;
        plus.disabled = false;
        minus.disabled = false;
        likeButton.disabled = false;
    }
}

// Handle the comment section
submitBtn.addEventListener('click', handleSubmitComment);

function handleSubmitComment(event) {
    event.preventDefault();
    let commentBox = document.getElementById('comment-input');
    let commentValue = commentBox.value;
    let form = document.getElementById('comment-form');

    let comment =  document.createElement('p');
    comment.innerText = commentValue;

    form.appendChild(comment);
    commentBox.value = ' ';
}