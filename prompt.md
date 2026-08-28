# PROMPT UNTUK AI AGENT — Website UMB Blockchain Society (UBS)

Salin seluruh isi di bawah ini dan berikan ke AI agent kamu (misalnya Claude Code, Cursor, dsb).

---

## PROMPT

Buatkan saya sebuah website komunitas menggunakan **Vue.js 3 (Composition API)** untuk organisasi bernama **UMB Blockchain Society (UBS)**, sebuah komunitas mahasiswa lintas program studi di Universitas Mercu Buana yang berfokus pada edukasi blockchain dan ekosistem Web3.

### 1. Tech Stack
- Vue.js 3 + Vite
- Vue Router untuk navigasi antar halaman (single page application)
- Styling bebas menggunakan CSS murni / SCSS / Tailwind CSS (pilih yang paling efisien untuk desain modern)
- Fully responsive (mobile, tablet, desktop)

### 2. Tema Visual & Branding
- Logo UBS berwarna **emas (gold)** sebagai warna utama identitas
- Palet warna: **emas/gold** (`#D4AF37` atau sejenisnya) dikombinasikan dengan latar **gelap (dark navy/black)** agar kesan mewah, modern, dan bernuansa teknologi/blockchain
- Gunakan aksen gradient emas pada tombol, judul, dan garis pembatas (divider) untuk kesan premium
- Tipografi: font modern dan clean (misalnya Poppins, Inter, atau Sora)
- Tambahkan efek subtle seperti glow emas, animasi hover, dan transisi halus (menggunakan Vue transition atau CSS transition)

**Background Effect — Network/Node Lines**
- Tambahkan background animasi berupa **garis-garis yang saling terhubung membentuk pola jaringan (network/node lines)** di belakang Hero Section (dan opsional di section lain), untuk merepresentasikan visual blockchain
- Implementasi disarankan menggunakan **HTML5 Canvas + JavaScript** (particle/node yang bergerak pelan lalu terhubung garis tipis jika jarak antar titik berdekatan), dibungkus dalam komponen Vue tersendiri (`BackgroundNetwork.vue`) agar reusable
- Warna garis dan titik: **emas transparan** (misalnya `rgba(212, 175, 55, 0.3)`) di atas background gelap, agar tetap elegan dan tidak mengganggu keterbacaan teks
- Animasi harus ringan (performant), tidak nge-lag, dan otomatis menyesuaikan ukuran layar (resize responsive)
- Efek ini bersifat dekoratif dan diposisikan di belakang konten (z-index rendah / posisi absolute-fixed), tidak boleh menghalangi interaksi tombol atau teks

### 3. Struktur Halaman

**a. Navbar (fixed di atas)**
- Logo UBS (emas) + nama "UMB Blockchain Society"
- Menu: Home, Tentang Kami, Visi & Misi, Program, Tim, Kontak
- Responsive hamburger menu untuk mobile

**b. Hero Section**
- Judul besar: "UMB Blockchain Society"
- Tagline singkat berdasarkan positioning berikut (parafrasekan dengan gaya bahasa yang menarik, jangan disalin persis):
  UBS adalah komunitas lintas program studi di Universitas Mercu Buana yang menjadi wadah bagi mahasiswa untuk mempelajari, mengeksplorasi, dan memahami teknologi blockchain serta ekosistem Web3 melalui edukasi, diskusi, dan kolaborasi. Terbuka untuk mahasiswa dari berbagai bidang studi, tanpa syarat kemampuan programming.
- Tombol CTA: "Gabung Sekarang" dan "Pelajari Lebih Lanjut"
- Background dark dengan elemen dekoratif blockchain (garis-garis node/network, partikel emas, atau ilustrasi abstrak blockchain)

**c. Section "Tentang Kami / Positioning"**
Jelaskan bahwa UBS adalah komunitas terbuka lintas jurusan di Universitas Mercu Buana yang menghubungkan pembelajaran fundamental blockchain dengan perkembangan teknologi, bisnis, keuangan, dan peluang inovasi di industri blockchain.

**d. Section Visi**
> Menjadi komunitas pembelajaran dan kolaborasi blockchain di Universitas Mercu Buana yang mampu membangun pemahaman fundamental, mengembangkan kompetensi mahasiswa lintas disiplin, serta mendorong lahirnya inovasi dan penerapan teknologi blockchain yang bermanfaat bagi masyarakat dan dunia industri.

**e. Section Misi (tampilkan sebagai grid/card, masing-masing dengan ikon)**
1. **Membangun pemahaman fundamental blockchain** — Menyediakan lingkungan pembelajaran terstruktur untuk mengenal konsep dasar blockchain, Web3, cryptocurrency, smart contract, dan ekosistem terkait.
2. **Membuka akses pembelajaran bagi seluruh mahasiswa** — Komunitas inklusif dan terbuka bagi mahasiswa dari berbagai program studi, tanpa syarat kemampuan programming.
3. **Mendorong pembelajaran lintas disiplin** — Menghubungkan perspektif teknologi, bisnis, finance, desain, komunikasi, hukum, dan bidang lainnya.
4. **Menghubungkan mahasiswa dengan industri** — Menghadirkan alumni, praktisi, founder, dan developer sebagai mentor dan sumber pembelajaran.
5. **Membangun budaya eksplorasi dan kolaborasi** — Mendorong anggota mengeksplorasi penerapan blockchain dan berkolaborasi dalam proyek nyata.
6. **Mendorong inovasi dan kewirausahaan** — Membantu mahasiswa mengembangkan ide berbasis blockchain hingga berpotensi menjadi proyek, produk, atau startup.

**f. Section Program Awal**
- Tampilkan program pertama: **"UBS Blockchain Fundamentals"** sebagai card/highlight (beri deskripsi singkat bahwa ini adalah program pengenalan dasar blockchain untuk anggota baru)
- Desain agar mudah menambahkan program lain di masa depan (gunakan komponen/array data yang reusable, bukan hardcode satuan)

**g. Section Tim / Kepengurusan**
Tampilkan struktur pengurus inti dalam bentuk card dengan foto placeholder (avatar bulat), nama, jabatan, dan warna aksen emas pada border card:

| Jabatan | Nama |
|---|---|
| CEO | SmartDinamite (Saepudin) |
| CTO | 0xAnakMommy (Rayhan Aziel Abbrar) |
| CMO | Viola ()|
| COO | StarmanMagician (Sakti)  |

**h. Section Kontak / Join Community**
- Ajakan bergabung
- Tombol/link ke media sosial (Instagram, Discord, LinkedIn, X/Twitter) — gunakan placeholder link (`#`) yang mudah diganti nanti
- Form kontak sederhana (nama, email, pesan) — cukup tampilan saja, tidak perlu backend

**i. Footer**
- Logo UBS kecil (emas)
- Deskripsi singkat 1 baris tentang UBS
- Kolom navigasi cepat (Home, Visi Misi, Program, Tim, Kontak)
- Ikon media sosial
- Copyright: "© 2026 UMB Blockchain Society. All rights reserved."
- Garis pembatas dengan aksen gradient emas di bagian paling atas footer

### 4. Struktur Folder yang Diharapkan
```
src/
  components/
    NavBar.vue
    HeroSection.vue
    AboutSection.vue
    VisionSection.vue
    MissionSection.vue
    ProgramSection.vue
    TeamSection.vue
    ContactSection.vue
    FooterSection.vue
  views/
    HomeView.vue
  router/
    index.js
  assets/
    logo/
      ubs-logo.png       (logo utama UBS, background transparan, format PNG/SVG)
      ubs-logo-icon.png  (versi ikon/kecil untuk favicon & navbar)
    team/
      saepudin.png       (foto/avatar CEO)
      zhaohan.png        (foto/avatar CTO)
      viola.png          (foto/avatar CMO)
      sakti.png          (foto/avatar COO)
    styles/
      (style global, variabel warna, dsb)
  App.vue
  main.js
```

**Ketentuan folder assets:**
- Sediakan folder `src/assets/logo/` dan `src/assets/team/` yang kosong (dengan file placeholder/dummy dulu) supaya saya tinggal drag-and-drop file logo dan foto pengurus asli ke situ tanpa perlu ubah kode
- Semua referensi logo dan foto tim di komponen (Navbar, Footer, TeamSection) di-import dari path folder tersebut, jangan di-hardcode base64 atau link eksternal
- Jika file logo/foto belum ada, gunakan placeholder (misalnya inisial nama dalam lingkaran emas) sebagai fallback agar tampilan tetap rapi sebelum aset asli dimasukkan

### 5. Ketentuan Tambahan
- Semua teks visi, misi, dan positioning wajib menggunakan Bahasa Indonesia
- Buat data tim dan misi dalam bentuk array/objek JavaScript agar mudah diedit tanpa mengubah struktur HTML
- Pastikan kontras warna emas terhadap background dark tetap nyaman dibaca (accessibility)
- Sertakan komentar pada kode agar mudah dipahami dan dikembangkan lebih lanjut
- Website harus siap dijalankan dengan `npm install && npm run dev`

---

*Catatan: Prompt ini disusun berdasarkan dokumen positioning, visi, dan misi resmi UMB Blockchain Society yang sudah kamu unggah, jadi tinggal disalin langsung ke AI agent yang akan membangun kodenya.*
