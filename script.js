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

// ─────────────────────────────────────────────
// 🎧 FOCUS MUSIC PLAYLIST
// ─────────────────────────────────────────────

// Ambil referensi elemen Focus Music dari DOM
const musicLinkInput = document.getElementById("musicLinkInput");
const musicErrorEl = document.getElementById("musicError");
const musicPlayerWrap = document.getElementById("musicPlayerContainer");
const musicPlaceholder = document.getElementById("musicPlaceholder");

// ── Deteksi platform dari URL ──
function detectPlatform(url) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("spotify.com")) return "spotify";
  return null;
}

// ── Konversi link YouTube biasa → URL embed ──
function parseYouTubeUrl(parsed) {
  // Format playlist murni: youtube.com/playlist?list=XXX
  if (parsed.pathname === "/playlist") {
    const listId = parsed.searchParams.get("list");
    if (listId)
      return `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }

  // Format video biasa atau video dengan playlist
  let videoId = null;
  if (parsed.hostname === "youtu.be") {
    videoId = parsed.pathname.slice(1).split("?")[0];
  } else if (parsed.pathname === "/watch") {
    videoId = parsed.searchParams.get("v");
  }

  if (videoId) {
    const listId = parsed.searchParams.get("list");
    // Jika ada list, embed dengan playlist agar bisa lanjut ke lagu berikutnya
    return listId
      ? `https://www.youtube.com/embed/${videoId}?list=${listId}`
      : `https://www.youtube.com/embed/${videoId}`;
  }

  return null;
}

// ── Konversi link Spotify biasa → URL embed ──
function parseSpotifyUrl(parsed) {
  // Ambil segmen path: ['track'|'playlist'|'album', 'ID']
  const parts = parsed.pathname.split("/").filter(Boolean);
  if (parts.length >= 2) {
    const type = parts[0];
    const id = parts[1].split("?")[0]; // bersihkan query string
    if (["track", "playlist", "album", "episode"].includes(type)) {
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
    }
  }
  return null;
}

// ── Gabungkan deteksi + parse jadi satu fungsi utama ──
function parseToEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    const platform = detectPlatform(url);
    if (platform === "youtube") return parseYouTubeUrl(parsed);
    if (platform === "spotify") return parseSpotifyUrl(parsed);
    return null;
  } catch {
    return null; // URL tidak valid sama sekali
  }
}

// ── Buat elemen <iframe> sesuai platform ──
function createIframe(embedUrl, platform) {
  const iframe = document.createElement("iframe");
  iframe.src = embedUrl;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute(
    "allow",
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
  );
  iframe.setAttribute("allowfullscreen", "");
  iframe.style.width = "100%";
  iframe.style.borderRadius = "12px";
  iframe.style.display = "block";
  // Spotify compact = 152px; YouTube lebih tinggi
  iframe.style.height = platform === "spotify" ? "152px" : "220px";
  return iframe;
}

// ── Tampilkan pesan error dengan jelas ──
function showMusicError(msg) {
  musicErrorEl.textContent = msg;
  musicErrorEl.style.display = "block";
}

function clearMusicError() {
  musicErrorEl.textContent = "";
  musicErrorEl.style.display = "none";
}

// ── LOAD MUSIC: baca input → parse → tampilkan iframe ──
function loadMusic(silent = false) {
  clearMusicError();

  const link = musicLinkInput ? musicLinkInput.value.trim() : "";

  // Validasi: link kosong
  if (!link) {
    if (!silent)
      showMusicError(
        "⚠️ Link tidak boleh kosong! Paste link YouTube atau Spotify dulu ya 😊",
      );
    return;
  }

  // Validasi: bukan URL yang dikenali
  const embedUrl = parseToEmbedUrl(link);
  if (!embedUrl) {
    showMusicError(
      "❌ Link tidak dikenali. Pastikan kamu paste link YouTube (video/playlist) atau Spotify (track/playlist) yang valid 🎵",
    );
    return;
  }

  // Simpan link ke localStorage agar muncul lagi saat refresh
  localStorage.setItem("focusMusicLink", link);

  // Buat dan tampilkan iframe player
  const platform = detectPlatform(link);
  const iframe = createIframe(embedUrl, platform);

  musicPlayerWrap.innerHTML = "";
  musicPlayerWrap.appendChild(iframe);
  musicPlayerWrap.style.display = "block";

  // Sembunyikan placeholder, animasikan player masuk
  if (musicPlaceholder) musicPlaceholder.style.display = "none";
  gsap.fromTo(
    musicPlayerWrap,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.45 },
  );
}

// ── CLEAR MUSIC: hapus iframe + data localStorage ──
function clearMusic() {
  localStorage.removeItem("focusMusicLink");
  if (musicLinkInput) musicLinkInput.value = "";
  musicPlayerWrap.innerHTML = "";
  musicPlayerWrap.style.display = "none";
  if (musicPlaceholder) musicPlaceholder.style.display = "flex";
  clearMusicError();
}

// ── Auto-load link terakhir dari localStorage saat halaman dibuka ──
(function autoLoadSavedMusic() {
  const saved = localStorage.getItem("focusMusicLink");
  if (saved && musicLinkInput) {
    musicLinkInput.value = saved;
    loadMusic(true); // silent=true: jangan tampilkan error jika gagal
  }
})();

// ── Izinkan tekan Enter di input untuk langsung load ──
if (musicLinkInput) {
  musicLinkInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loadMusic();
  });
}

// ── Tampilkan/Sembunyikan Menu Focus Music ──
function toggleFocusMusicSection() {
  const fmSection = document.querySelector(".focus-music-section");
  if (!fmSection) return;

  const isCollapsed = fmSection.classList.toggle("collapsed");
  localStorage.setItem("fmSectionCollapsed", isCollapsed ? "true" : "false");
}

// ── Muat status Tampilkan/Sembunyikan terakhir dari localStorage ──
(function loadFmSectionState() {
  const fmSection = document.querySelector(".focus-music-section");
  const isCollapsed = localStorage.getItem("fmSectionCollapsed") === "true";
  if (isCollapsed && fmSection) {
    fmSection.classList.add("collapsed");
  }
})();
