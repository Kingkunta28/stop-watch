const display = document.querySelector(".display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
const STORAGE_KEY = "stopwatchTime";

// Load saved time from local storage on page load
function loadTime(){
    const savedTime = localStorage.getItem(STORAGE_KEY);
    if (savedTime) {
        elapsedTime = parseInt(savedTime);
        updateDisplay();
    }
}

// Save time to local storage
function saveTime(){
    localStorage.setItem(STORAGE_KEY, elapsedTime.toString());
}

function start(){
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}
function stop(){
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        saveTime();
        isRunning = false;
    }
}
function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    localStorage.removeItem(STORAGE_KEY);
    display.textContent = "00:00:00:00";
}
function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    updateDisplay();
    saveTime();
}

function updateDisplay(){
    let hours = Math.floor(elapsedTime / (1000*60*60));
    let minutes = Math.floor(elapsedTime / (1000*60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 %60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Initialize by loading saved time when page loads
loadTime();