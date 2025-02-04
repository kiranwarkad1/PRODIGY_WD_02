let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(2, '0')
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
        lapBtn.disabled = true;
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    }
    isRunning = !isRunning;
    resetBtn.disabled = false;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    isRunning = false;
    lapList.innerHTML = '';
}

function lap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
}

startPauseBtn.addEventListener('click', startPause);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);