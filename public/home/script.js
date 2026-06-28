/* =============================================
   POMODORO TIMER - script.js
   Deep Focus Edition | GSAP Powered
   ============================================= */

// ─── State ───────────────────────────────────────
const MODES = {
    pomodoro: { label: 'Pomodoro', minutes: 25 },
    short: { label: 'Short Break', minutes: 5 },
    long: { label: 'Long Break', minutes: 15 },
};

let currentMode = 'pomodoro';
let totalSeconds = MODES.pomodoro.minutes * 60;
let remainingSeconds = totalSeconds;
let isRunning = false;
let timerInterval = null;
let sessionCount = 0;
const MAX_SESSIONS = 4;
let musicPlaying = false;

// ─── DOM Refs ────────────────────────────────────
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const musicBtn = document.getElementById('musicBtn');
const musicStatus = document.getElementById('musicStatus');
const alarmSound = document.getElementById('alarmSound');
const bgMusic = document.getElementById('bgMusic');
const progressBar = document.querySelector('.progress-bar');
const sessionDots = document.querySelectorAll('.session-dot');
const settingsOverlay = document.querySelector('.settings-overlay');
const pomodoroInput = document.getElementById('inputPomodoro');
const shortInput = document.getElementById('inputShort');
const longInput = document.getElementById('inputLong');
const volumeInput = document.getElementById('volumeSlider');

// ─── Init ─────────────────────────────────────────
bgMusic.volume = 0.4;
alarmSound.volume = 0.85;

// ─── GSAP Page Load Animation ────────────────────
gsap.to('.container', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power2.out',
    delay: 0.1,
});

// Stagger inner elements
gsap.from('#title, #modeButtons, #timerDisplay, .progress-wrap, .session-tracker, #controlButtons, .music-box', {
    opacity: 0,
    y: 16,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.08,
    delay: 0.4,
});

// Music icon floating animation
gsap.to('.music-icon', {
    y: -3,
    duration: 1.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
});

// ─── Helpers ─────────────────────────────────────
function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingSeconds);
    const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateTabTitle() {
    document.title = isRunning
        ? `${formatTime(remainingSeconds)} · ${MODES[currentMode].label}`
        : 'Pomodoro Timer';
}

function updateDots() {
    sessionDots.forEach((dot, i) => {
        if (i < sessionCount) {
            dot.classList.add('done');
        } else {
            dot.classList.remove('done');
        }
    });
}

// ─── Mode Switching ───────────────────────────────
function setMode(mode) {
    if (isRunning) stopTimer();

    currentMode = mode;
    totalSeconds = MODES[mode].minutes * 60;
    remainingSeconds = totalSeconds;

    // Update button active state
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.mode-btn[data-mode="${mode}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Reset UI
    timerDisplay.classList.remove('running');
    startBtn.textContent = 'Start';
    progressBar.style.width = '0%';
    updateDisplay();
    updateTabTitle();

    // Animate timer display switch
    gsap.fromTo('#timerDisplay',
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
}

// ─── Timer Controls ───────────────────────────────
function startTimer() {
    if (isRunning) {
        stopTimer();
        return;
    }

    isRunning = true;
    startBtn.textContent = 'Pause';

    // Glow on
    timerDisplay.classList.add('running');

    // Click animation
    gsap.fromTo('#startBtn',
        { scale: 0.93 },
        { scale: 1, duration: 0.25, ease: 'back.out(2)' }
    );

    timerInterval = setInterval(() => {
        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
            onTimerComplete();
            return;
        }
        remainingSeconds--;
        updateDisplay();
        updateTabTitle();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    startBtn.textContent = 'Start';
    timerDisplay.classList.remove('running');
    updateTabTitle();
}

function resetTimer() {
    stopTimer();
    remainingSeconds = totalSeconds;
    progressBar.style.width = '0%';
    updateDisplay();

    // Animate reset
    gsap.fromTo('#timerDisplay',
        { opacity: 0.4, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }
    );
}

// ─── Timer Complete ───────────────────────────────
function onTimerComplete() {
    // Play alarm
    alarmSound.currentTime = 0;
    alarmSound.play().catch(() => { });

    // Update session dots (only for pomodoro)
    if (currentMode === 'pomodoro') {
        sessionCount = Math.min(sessionCount + 1, MAX_SESSIONS);
        updateDots();
        if (sessionCount >= MAX_SESSIONS) sessionCount = 0;
    }

    // GSAP pulse animation
    gsap.timeline()
        .to('#timerDisplay', {
            scale: 1.06,
            duration: 0.4,
            ease: 'power1.out',
            textShadow: '0 0 60px rgba(93,173,226,0.7)',
        })
        .to('#timerDisplay', {
            scale: 1,
            duration: 0.4,
            ease: 'power1.inOut',
        })
        .to('#timerDisplay', {
            scale: 1.04,
            duration: 0.35,
            ease: 'power1.out',
        })
        .to('#timerDisplay', {
            scale: 1,
            textShadow: 'none',
            duration: 0.35,
            ease: 'power1.inOut',
            onComplete: () => {
                timerDisplay.classList.remove('running');
                startBtn.textContent = 'Start';
                updateTabTitle();
            }
        });

    remainingSeconds = 0;
    updateDisplay();
}

// ─── Music Toggle ─────────────────────────────────
function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = `<span class="music-icon">🎵</span> Play`;
        musicStatus.textContent = 'Lofi: OFF';
        musicStatus.classList.remove('on');
    } else {
        bgMusic.play()
            .then(() => {
                musicPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = `<span class="music-icon">🎶</span> Playing`;
                musicStatus.textContent = 'Lofi: ON';
                musicStatus.classList.add('on');

                // Fade in music nicely
                bgMusic.volume = 0;
                gsap.to(bgMusic, { volume: volumeInput ? parseFloat(volumeInput.value) : 0.4, duration: 1.5 });
            })
            .catch(() => {
                musicStatus.textContent = 'Add lofi.mp3 first';
            });
    }
}

// ─── Settings Panel ───────────────────────────────
function openSettings() {
    settingsOverlay.classList.add('visible');
}

function closeSettings() {
    settingsOverlay.classList.remove('visible');

    // Apply custom times
    const p = parseInt(pomodoroInput.value) || 25;
    const s = parseInt(shortInput.value) || 5;
    const l = parseInt(longInput.value) || 15;
    MODES.pomodoro.minutes = Math.max(1, Math.min(90, p));
    MODES.short.minutes = Math.max(1, Math.min(30, s));
    MODES.long.minutes = Math.max(1, Math.min(60, l));

    // Refresh current mode
    setMode(currentMode);

    // Volume
    if (volumeInput) bgMusic.volume = parseFloat(volumeInput.value);
}

// Close overlay on backdrop click
settingsOverlay.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) closeSettings();
});

// Handle volume slider live
if (volumeInput) {
    volumeInput.addEventListener('input', () => {
        if (musicPlaying) bgMusic.volume = parseFloat(volumeInput.value);
    });
}

// ─── Keyboard Shortcuts ───────────────────────────
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') {
        e.preventDefault();
        startTimer();
    }
    if (e.code === 'KeyR') resetTimer();
    if (e.code === 'KeyM') toggleMusic();
    if (e.code === 'Escape') {
        if (settingsOverlay.classList.contains('visible')) closeSettings();
    }
});

// ─── Initial render ───────────────────────────────
updateDisplay();
updateDots();
