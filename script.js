const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const modeButtons = document.querySelectorAll(".mode-btn");

const modes = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

let currentMode = "pomodoro";
let secondsLeft = modes[currentMode];
let timer;
let running = false;

function updateDisplay() {
  const min = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const sec = String(secondsLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${min}:${sec}`;
}

function setMode(mode) {
  currentMode = mode;
  secondsLeft = modes[mode];
  updateDisplay();
  stopTimer();
  startBtn.textContent = "Start";

  modeButtons.forEach((btn) => btn.classList.remove("active"));
  const index = ["pomodoro", "short", "long"].indexOf(mode);
  if (index >= 0) modeButtons[index].classList.add("active");
}

function startTimer() {
  if (running) {
    stopTimer();
    startBtn.textContent = "Start";
  } else {
    running = true;
    timer = setInterval(() => {
      if (secondsLeft <= 0) {
        stopTimer();
        playAlarm();        // 🔔 Play ding.mp3
        showNotification(); // 🔔 Optional browser notif
        return;
      }
      secondsLeft--;
      updateDisplay();
    }, 1000);
    startBtn.textContent = "Pause";
  }
}

function stopTimer() {
  running = false;
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  secondsLeft = modes[currentMode];
  updateDisplay();
  startBtn.textContent = "Start";
}

// 🔊 Suara ding saat selesai
function playAlarm() {
  const sound = document.getElementById("alarmSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {
      console.warn("Autoplay dicegah browser.");
    });
  }
}

// 🎵 Musik manual (lofi)
const music = document.getElementById("bgMusic");
const musicStatus = document.getElementById("musicStatus");

function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play();
    musicStatus.textContent = "Musik: ON";
  } else {
    music.pause();
    musicStatus.textContent = "Musik: OFF";
  }
}

// 🛎️ Notifikasi (opsional)
function showNotification() {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification("⏰ Waktu Habis!", {
        body: "Waktunya istirahat atau lanjut kerja 💪",
        icon: "https://cdn-icons-png.flaticon.com/512/5956/5956551.png",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") showNotification();
      });
    }
  }
}

// 🔄 GSAP Animasi
gsap.to("#title", { opacity: 1, y: 0, duration: 1, delay: 0.3 });
gsap.to("#modeButtons", { opacity: 1, y: 0, duration: 1, delay: 0.5 });
gsap.to("#timerDisplay", { opacity: 1, y: 0, duration: 1, delay: 0.7 });
gsap.to("#controlButtons", { opacity: 1, y: 0, duration: 1, delay: 0.9 });

updateDisplay();
