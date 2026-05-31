const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const modeButtons = document.querySelectorAll(".mode-btn");

// ⚙️ Load Settings dari LocalStorage atau Gunakan Default
const defaultModes = {
  pomodoro: 25,
  short: 5,
  long: 15,
};

const savedSettings = {
  pomodoro: localStorage.getItem("pomodoroTime")
    ? parseInt(localStorage.getItem("pomodoroTime"))
    : defaultModes.pomodoro,
  short: localStorage.getItem("shortTime")
    ? parseInt(localStorage.getItem("shortTime"))
    : defaultModes.short,
  long: localStorage.getItem("longTime")
    ? parseInt(localStorage.getItem("longTime"))
    : defaultModes.long,
};

const modes = {
  pomodoro: savedSettings.pomodoro * 60,
  short: savedSettings.short * 60,
  long: savedSettings.long * 60,
};

let currentMode = "pomodoro";
let secondsLeft = modes[currentMode];
let timer;
let running = false;

// 🖥️ Update Tampilan Waktu & Judul Tab Browser
function updateDisplay() {
  const min = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const sec = String(secondsLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${min}:${sec}`;

  // Judul tab dinamis agar pengguna tahu sisa waktu saat membuka tab lain
  if (running) {
    const modeLabel =
      currentMode === "pomodoro"
        ? "Focus 🍅"
        : currentMode === "short"
          ? "Break ☕"
          : "Long Break 🛋️";
    document.title = `(${min}:${sec}) ${modeLabel}`;
  } else {
    document.title = "Pomodoro Timer";
  }
}

// 🎯 Mengganti Mode Timer
function setMode(mode) {
  currentMode = mode;
  stopTimer();
  secondsLeft = modes[mode];
  updateDisplay();
  startBtn.textContent = "Start";

  modeButtons.forEach((btn) => btn.classList.remove("active"));
  const index = ["pomodoro", "short", "long"].indexOf(mode);
  if (index >= 0) modeButtons[index].classList.add("active");
}

// ⏳ Mengontrol Timer (Start / Pause)
function startTimer() {
  if (running) {
    stopTimer();
    updateDisplay();
    startBtn.textContent = "Start";
  } else {
    running = true;
    updateDisplay();
    timer = setInterval(() => {
      if (secondsLeft <= 0) {
        stopTimer();
        updateDisplay();
        playAlarm(); // 🔔 Play ding.mp3
        showNotification(); // 🔔 Notifikasi browser
        return;
      }
      secondsLeft--;
      updateDisplay();
    }, 1000);
    startBtn.textContent = "Pause";
  }
}

// 🛑 Menghentikan Sementara Timer
function stopTimer() {
  running = false;
  clearInterval(timer);
}

// 🔄 Reset Timer
function resetTimer() {
  stopTimer();
  secondsLeft = modes[currentMode];
  updateDisplay();
  startBtn.textContent = "Start";
}

// 🔊 Alarm Bunyi Selesai
function playAlarm() {
  const sound = document.getElementById("alarmSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {
      console.warn("Autoplay alarm dicegah oleh browser.");
    });
  }
}

// 🎵 Musik Lofi Latar Belakang & Volume Control
const music = document.getElementById("bgMusic");
const musicStatus = document.getElementById("musicStatus");
const volumeSlider = document.getElementById("volumeSlider");

// Inisialisasi volume musik dari localStorage atau default 0.5
const savedVolume = localStorage.getItem("bgVolume")
  ? parseFloat(localStorage.getItem("bgVolume"))
  : 0.5;
if (music) {
  music.volume = savedVolume;
}
if (volumeSlider) {
  volumeSlider.value = savedVolume;
}

function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play().catch(() => {
      console.warn(
        "Autoplay musik dicegah oleh browser. Klik area halaman terlebih dahulu.",
      );
    });
    musicStatus.textContent = "Musik: ON";
  } else {
    music.pause();
    musicStatus.textContent = "Musik: OFF";
  }
}

function changeVolume(val) {
  if (music) {
    music.volume = parseFloat(val);
  }
  localStorage.setItem("bgVolume", val);
}

// ⚙️ Fungsionalitas Modal Pengaturan (Settings)
const modal = document.getElementById("settingsModal");
const pomodoroInput = document.getElementById("pomodoroTime");
const shortInput = document.getElementById("shortTime");
const longInput = document.getElementById("longTime");

function openSettings() {
  // Masukkan nilai saat ini ke dalam form input
  pomodoroInput.value = savedSettings.pomodoro;
  shortInput.value = savedSettings.short;
  longInput.value = savedSettings.long;

  modal.classList.add("show");
}

function closeSettings() {
  modal.classList.remove("show");
}

function saveSettings() {
  // Validasi nilai input agar tidak bernilai negatif atau kosong (minimal 1 menit)
  const newPomo = Math.max(
    1,
    parseInt(pomodoroInput.value) || defaultModes.pomodoro,
  );
  const newShort = Math.max(
    1,
    parseInt(shortInput.value) || defaultModes.short,
  );
  const newLong = Math.max(1, parseInt(longInput.value) || defaultModes.long);

  savedSettings.pomodoro = newPomo;
  savedSettings.short = newShort;
  savedSettings.long = newLong;

  // Simpan ke localStorage
  localStorage.setItem("pomodoroTime", newPomo);
  localStorage.setItem("shortTime", newShort);
  localStorage.setItem("longTime", newLong);

  // Update nilai mode aktif
  modes.pomodoro = newPomo * 60;
  modes.short = newShort * 60;
  modes.long = newLong * 60;

  // Reset timer ke mode saat ini dengan durasi yang baru
  resetTimer();
  closeSettings();
}

// Tutup modal jika pengguna mengklik area luar modal
window.onclick = function (event) {
  if (event.target === modal) {
    closeSettings();
  }
};

// 🛎️ Notifikasi Sistem Browser
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

// 🔄 GSAP Animasi Masuk
gsap.to("#title", { opacity: 1, y: 0, duration: 1, delay: 0.3 });
gsap.to("#modeButtons", { opacity: 1, y: 0, duration: 1, delay: 0.5 });
gsap.to("#timerDisplay", { opacity: 1, y: 0, duration: 1, delay: 0.7 });
gsap.to("#controlButtons", { opacity: 1, y: 0, duration: 1, delay: 0.9 });

// Tampilkan durasi pertama saat halaman dimuat
updateDisplay();
