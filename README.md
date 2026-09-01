# ⚡ UMB Blockchain Society (UBS) — Official Website

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_Vue-1.9-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-D4AF37?style=for-the-badge)

<p align="center">
  <strong>The premier student-led Web3 and blockchain guild at Universitas Mercu Buana, Jakarta.</strong>
</p>

[🌐 Official WhatsApp Guild](https://chat.whatsapp.com/FMT3wj7dTAHBW5AatcT4tv) • [📸 Instagram](https://www.instagram.com/ubs.community?utm_source=qr&igsi=dHR4eDQ3bnZvbW1u) • [💼 LinkedIn](https://www.linkedin.com/company/umb-blockchain-society-ubs) • [🎵 TikTok](https://www.tiktok.com/@ubs.community)

</div>

---

## 📌 About UMB Blockchain Society

**UMB Blockchain Society (UBS)** is a cross-faculty student organization at **Universitas Mercu Buana** dedicated to onboarding students into the decentralized frontier. We bridge foundational blockchain science with exponential business opportunities, DeFi mechanics, smart contract engineering, and Web3 startup incubation.

- 🎓 **100% Inclusive**: Open to all students across every faculty with zero coding prerequisites required.
- ⚡ **BUIDL Culture**: Hands-on workshops, hacker house hackathon sprints, and direct mentor pipelines.
- 🌐 **Industry Network**: Direct connections to tier-1 Web3 protocols, venture funds, and alumni mentors.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/) (Smooth scrolling single-page architecture)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom Obsidian Gold (`#D4AF37`) palette and glassmorphism
- **UI Primitives**: [Radix Vue](https://www.radix-vue.com/) (Accessible Modals, Dialogs, Mobile Drawers)
- **Icons**: [Lucide Vue Next](https://lucide.dev/) + Custom Vector Brand Icons
- **Interactive FX**: HTML5 Canvas Particle-Node Network Background (`BackgroundNetwork.vue`)

---

## 📂 Project Structure

```
├── asset/                   # Source branding assets
├── public/                  # Public static files
├── src/
│   ├── assets/              # Logos, team photos, styles
│   │   ├── logo/            # UBS logos & icons
│   │   ├── team/            # Core council avatars
│   │   └── styles/          # Tailwind & custom CSS
│   ├── components/          # Reusable Vue components
│   │   ├── BackgroundNetwork.vue  # Full-page canvas interactive node web
│   │   ├── NavBar.vue             # Fixed blur header & Radix mobile drawer
│   │   ├── HeroSection.vue        # Headline, cyber badge & CTAs
│   │   ├── AboutSection.vue       # Cross-discipline value proposition
│   │   ├── VisionSection.vue      # Official guild vision quote
│   │   ├── MissionSection.vue     # 6 Strategic pillar cards
│   │   ├── ProgramSection.vue     # Genesis cohort & Radix syllabus modal
│   │   ├── TeamSection.vue        # Core leadership council
│   │   ├── ContactSection.vue     # WhatsApp guild card & message transmitter
│   │   ├── SocialIcon.vue         # Vector SVG icon renderer
│   │   └── FooterSection.vue      # Gold divider, quick links & copyright
│   ├── data/                # Modular content data
│   │   ├── missions.js
│   │   ├── navigation.js
│   │   ├── programs.js
│   │   ├── socials.js
│   │   └── team.js
│   ├── views/
│   │   ├── HomeView.vue           # Root aggregation view
│   │   └── InvitationView.vue     # Multi-step onboarding form
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   └── storage.js             # Real-time Google Sheets webhook submission
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** / **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UBS-Community/Official-Website.git
   cd Official-Website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 👥 Core Leadership Council

| Role | Alias | Full Name |
| :--- | :--- | :--- |
| **Chief Executive Officer (CEO)** | `SmartDinamite` | Saepudin |
| **Chief Technology Officer (CTO)** | `0xAnakMommy` | Rayhan Aziel Abbrar / Rayhan Young |
| **Chief Marketing Officer (CMO)** | `ReynaImo` | Viola Yosefani |
| **Chief Operating Officer (COO)** | `StarmanMagician` | Sakti Attila Aulia Bintang |

---

## 🔗 Community & Social Channels

- **WhatsApp Guild**: [Join Official Group](https://chat.whatsapp.com/FMT3wj7dTAHBW5AatcT4tv)
- **Instagram**: [@ubs.community](https://www.instagram.com/ubs.community?utm_source=qr&igsi=dHR4eDQ3bnZvbW1u)
- **LinkedIn**: [UMB Blockchain Society](https://www.linkedin.com/company/umb-blockchain-society-ubs)
- **TikTok**: [@ubs.community](https://www.tiktok.com/@ubs.community)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with conviction by the <strong>UMB Blockchain Society</strong> community. WAGMI. 🚀</sub>
</div>
