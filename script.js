let totalSeconds = 10 * 60; // default 10 minutes
let speed = 10; // 10x faster for recording
let startTime = 0;
let elapsedPaused = 0;
let timerRunning = false;
let interval;

const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const timeInput = document.getElementById("timeInput");

// Initialize clock hands at 12 o’clock (vertical)
hourHand.style.transform = `translateX(-50%) rotate(0deg)`;
minuteHand.style.transform = `translateX(-50%) rotate(0deg)`;
secondHand.style.transform = `translateX(-50%) rotate(0deg)`;

function updateClock(secondsLeft) {
    const totalElapsed = totalSeconds - secondsLeft;

    // Fractional hours, minutes, seconds for smooth rotation
    const hours = totalElapsed / 3600;
    const minutes = totalElapsed / 60;
    const seconds = totalElapsed;

    // Convert to angles (0deg = vertical at 12 o'clock)
    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = (minutes / 60) * 360;
    const hourDeg = (hours / 12) * 360;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

function startTimer() {
    if (timerRunning) return;

    totalSeconds = parseInt(timeInput.value) * 60; // read input
    speed = 10; // time-lapse speed factor
    startTime = performance.now();
    timerRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    startBtn.innerText = "Timer Running...";

    interval = setInterval(() => {
        const elapsedReal = (performance.now() - startTime) / 1000 + elapsedPaused;
        // Use division to get precise time-lapse speed
        let remainingSeconds = totalSeconds - (elapsedReal * speed);

        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
            updateClock(remainingSeconds);
            clearInterval(interval);
            alert("⏳ Time’s Up!");
            startBtn.innerText = "Start Again";
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            timerRunning = false;
            elapsedPaused = 0;
            return;
        }

        updateClock(remainingSeconds);
    }, 16); // ~60fps for smooth rotation
}

function pauseTimer() {
    if (!timerRunning) return;

    clearInterval(interval);
    elapsedPaused += (performance.now() - startTime) / 1000;
    timerRunning = false;
    startBtn.innerText = "Resume";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Event listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
