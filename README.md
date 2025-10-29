# ⏰ Pomodoro Timer: STUDY WITH AS

[](https://opensource.org/licenses/MIT)
[]()

Pomodoro Timer adalah aplikasi web timer sederhana dan estetis yang dirancang untuk membantu Anda meningkatkan fokus dan produktivitas menggunakan teknik Pomodoro. Dilengkapi dengan musik latar yang menenangkan dan animasi yang halus.

-----

![Bg-Photos](https://github.com/Devjack404/Pomodoro-Timer/blob/main/photos/Pomodoro.png)


## ✨ Fitur Utama

  * **Tiga Mode Waktu**:
      * **Pomodoro**: 25 Menit (Sesi Kerja).
      * **Short Break**: 5 Menit (Istirahat Pendek).
      * **Long Break**: 15 Menit (Istirahat Panjang).
  * **Kontrol Timer**: Tombol **Start**, **Pause**, dan **Reset** yang intuitif.
  * **Alarm Audio**: Memutar suara alarm (`ding.mp3`) ketika waktu habis.
  * **Musik Latar**: Pemutar musik `lofi.mp3` yang dapat dinyalakan/dimatikan untuk meningkatkan suasana belajar.
  * **Notifikasi Browser**: Notifikasi opsional (jika diizinkan) muncul ketika timer selesai.
  * **Desain Estetik**: Antarmuka modern dengan gambar latar belakang, efek blur, dan animasi pembukaan yang halus (menggunakan GSAP).

-----

## 🛠️ Teknologi yang Digunakan

  * **HTML5**
  * **CSS3**
  * **JavaScript (Vanilla JS)**
  * **GSAP (Greensock Animation Platform)**: Digunakan untuk animasi antarmuka.

-----

## 🚀 Prasyarat dan Instalasi

Aplikasi ini adalah **frontend murni** dan tidak memerlukan *server* atau *package manager* (seperti npm).

### Prasyarat

  * Web Browser modern (Chrome, Firefox, Edge, Safari, dll.).

### Instalasi

1.  **Clone** repositori ini ke komputer Anda:
    ```bash
    git clone https://github.com/Devjack404/Pomodoro-Timer/
    ```
2.  **Buka** folder project:
    ```bash
    cd pomodoro-timer
    ```
3.  **Jalankan** aplikasi dengan membuka file `index.html` di browser Anda.

-----

## 📂 Susunan Project

```
pomodoro-timer/
├── photos/
│   └── bg.jpg         # Gambar latar belakang antarmuka.
├── ding.mp3           # Audio alarm saat timer selesai.
├── lofi.mp3           # Audio musik latar yang bisa di-toggle.
├── index.html         # Markup utama aplikasi dan struktur.
├── script.js          # Logika Pomodoro Timer (timer, mode, kontrol).
├── style.css          # Styling (termasuk layout responsif dan background).
└── README.md          # Dokumentasi project (file ini).
```

-----

## 💡 Contoh Penggunaan

1.  Buka file `index.html` di browser Anda.
2.  Pilih mode waktu yang diinginkan (**Pomodoro**, **Short Break**, atau **Long Break**).
3.  Klik tombol **"🎵 Play Musik"** untuk memulai musik latar.
4.  Klik tombol **"Start"** untuk memulai timer.
5.  Klik **"Pause"** untuk menjeda, atau tombol **"🔁"** untuk mengatur ulang waktu.
6.  Ketika waktu habis, alarm akan berbunyi.

-----

## 🤝 Kontribusi

Kontribusi Anda sangat kami hargai\! Jika Anda memiliki ide, perbaikan *bug*, atau fitur baru, silakan lakukan langkah-langkah berikut:

1.  *Fork* repositori ini.
2.  Buat *branch* baru untuk fitur Anda (`git checkout -b feature/AmazingFeature`).
3.  *Commit* perubahan Anda (`git commit -m 'Add some AmazingFeature'`).
4.  *Push* ke *branch* (`git push origin feature/AmazingFeature`).
5.  Buka *Pull Request*.

-----

## 📜 Lisensi

Didistribusikan di bawah Lisensi **MIT**. Lihat `LICENSE` (atau salinan di bawah) untuk informasi lebih lanjut.

```
MIT License

Copyright (c) 2023 devjack404

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


## 📜 Catatan
Masih perlu banyak perbaikan pada fitur-fitur yang ada, ini hanya sebuah projek sampingan untuk belajar web jadi masih banyak kekurangannya.
