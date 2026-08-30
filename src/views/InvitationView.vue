<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BackgroundNetwork from '@/components/BackgroundNetwork.vue'
import SocialIcon from '@/components/SocialIcon.vue'
import { saveApplicant } from '@/services/storage'
import {
  Sparkles,
  School,
  User,
  Cpu,
  TrendingUp,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Building2,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  X
} from 'lucide-vue-next'

const router = useRouter()

const currentStep = ref(1)
const totalSteps = 4
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submittedData = ref(null)

// Form State
const form = ref({
  universityType: 'mercubuana', // 'mercubuana' | 'other'
  universityName: '',
  campusBranch: 'Meruya', // Meruya | Menteng | Warung Buncit | Cipayung
  fullName: '',
  nim: '',
  birthDate: '',
  faculty: '',
  major: '',
  cohortYear: '2024',
  email: '',
  whatsapp: '',
  track: 'developer', // 'marketing' | 'finances' | 'developer'
  proofUbscIg: '',
  proofUbscLinkedin: '',
  proofUbscTiktok: '',
  proofUbscFile: null,
  proofUbscFilePreview: '',
  proofExplomateX: '',
  proofExplomateIg: '',
  proofExplomateFile: null,
  proofExplomateFilePreview: ''
})

const campusBranches = [
  { id: 'Meruya', name: 'Meruya (Kampus Utama)', address: 'Jakarta Barat' },
  { id: 'Menteng', name: 'Menteng', address: 'Jakarta Pusat' },
  { id: 'Warung Buncit', name: 'Warung Buncit', address: 'Jakarta Selatan' },
  { id: 'Cipayung', name: 'Cipayung / Kranggan', address: 'Jakarta Timur / Bekasi' }
]

const faculties = [
  'Fakultas Ilmu Komputer (FASILKOM)',
  'Fakultas Ekonomi dan Bisnis (FEB)',
  'Fakultas Teknik (FT)',
  'Fakultas Desain dan Seni Kreatif (FDSK)',
  'Fakultas Ilmu Komunikasi (FIKOM)',
  'Fakultas Psikologi (FPSI)',
  'Fakultas Lainnya'
]

const tracks = [
  {
    id: 'developer',
    title: 'Developer & Smart Contract',
    shortBadge: 'Tech & BUIDL',
    icon: Cpu,
    color: 'from-amber-400 to-gold-500',
    description: 'Belajar dan membangun smart contract (Solidity/Rust), integrasi frontend dApps, Web3 infrastructure, security auditing, dan siap berpartisipasi dalam hackathons global.'
  },
  {
    id: 'finances',
    title: 'Finances & Tokenomics',
    shortBadge: 'DeFi & Economics',
    icon: TrendingUp,
    color: 'from-emerald-400 to-teal-500',
    description: 'Mempelajari arsitektur Decentralized Finance (DeFi), mekanisme desain tokenomics, analisis fundamental aset kripto, model likuiditas on-chain, dan regulasi keuangan digital.'
  },
  {
    id: 'marketing',
    title: 'Marketing & Community',
    shortBadge: 'Growth & PR',
    icon: Megaphone,
    color: 'from-purple-400 to-pink-500',
    description: 'Mendalami strategi pertumbuhan komunitas Web3, viral narrative creation, manajemen media sosial, Web3 PR, event organizing, kemitraan ekosistem, dan content strategy.'
  }
]

// Handle File Uploads
const handleFileUpload = (event, type) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    if (type === 'ubsc') {
      form.value.proofUbscFile = file
      form.value.proofUbscFilePreview = e.target.result
    } else if (type === 'explomate') {
      form.value.proofExplomateFile = file
      form.value.proofExplomateFilePreview = e.target.result
    }
  }
  reader.readAsDataURL(file)
}

const removeFile = (type) => {
  if (type === 'ubsc') {
    form.value.proofUbscFile = null
    form.value.proofUbscFilePreview = ''
  } else if (type === 'explomate') {
    form.value.proofExplomateFile = null
    form.value.proofExplomateFilePreview = ''
  }
}

// Validations for each step
const isStep1Valid = computed(() => {
  if (form.value.universityType === 'mercubuana') {
    return !!form.value.campusBranch
  }
  return !!form.value.universityName.trim()
})

const isStep2Valid = computed(() => {
  return (
    form.value.fullName.trim().length >= 3 &&
    form.value.nim.trim().length >= 4 &&
    form.value.birthDate &&
    form.value.faculty &&
    form.value.major.trim() &&
    form.value.cohortYear &&
    form.value.email.includes('@') &&
    form.value.whatsapp.trim().length >= 8
  )
})

const isStep3Valid = computed(() => {
  return !!form.value.track
})

const isStep4Valid = computed(() => {
  // Must have uploaded screenshot or filled handle for UBSC & Explomate
  const hasUbscProof = form.value.proofUbscFile || form.value.proofUbscIg || form.value.proofUbscLinkedin || form.value.proofUbscTiktok
  const hasExplomateProof = form.value.proofExplomateFile || form.value.proofExplomateX || form.value.proofExplomateIg
  return hasUbscProof && hasExplomateProof
})

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleSubmit = () => {
  isSubmitting.value = true

  const selectedTrackObj = tracks.find(t => t.id === form.value.track)

  const payload = {
    universityType: form.value.universityType,
    universityName: form.value.universityType === 'mercubuana' ? 'Universitas Mercu Buana' : form.value.universityName,
    campusBranch: form.value.universityType === 'mercubuana' ? form.value.campusBranch : 'Luar UMB',
    fullName: form.value.fullName,
    nim: form.value.nim,
    birthDate: form.value.birthDate,
    faculty: form.value.faculty,
    major: form.value.major,
    cohortYear: form.value.cohortYear,
    email: form.value.email,
    whatsapp: form.value.whatsapp,
    track: form.value.track,
    trackLabel: selectedTrackObj ? selectedTrackObj.title : form.value.track,
    proofUbsc: {
      ig: form.value.proofUbscIg,
      linkedin: form.value.proofUbscLinkedin,
      tiktok: form.value.proofUbscTiktok,
      hasScreenshot: !!form.value.proofUbscFile
    },
    proofExplomate: {
      x: form.value.proofExplomateX,
      ig: form.value.proofExplomateIg,
      hasScreenshot: !!form.value.proofExplomateFile
    }
  }

  setTimeout(() => {
    const saved = saveApplicant(payload)
    submittedData.value = saved
    isSubmitting.value = false
    isSubmitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 900)
}
</script>

<template>
  <div class="min-h-screen bg-obsidian-950 text-slate-100 relative selection:bg-gold-400 selection:text-obsidian-950 pb-20">
    <!-- Global Interactive Gold Canvas Background -->
    <BackgroundNetwork />

    <!-- Top Header Bar -->
    <header class="relative z-20 border-b border-gold-400/20 bg-obsidian-950/80 backdrop-blur-md sticky top-0">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center p-1.5 shadow-gold-glow">
            <img src="@/assets/logo/ubs-logo.png" alt="UBS Logo" class="w-full h-full object-contain" />
          </div>
          <div>
            <span class="font-display font-bold text-white text-base sm:text-lg block group-hover:text-gold-300 transition-colors">
              UMB Blockchain Society
            </span>
            <span class="text-[10px] text-gold-400 font-medium uppercase tracking-wider block">
              Official Guild Invitation & Onboarding
            </span>
          </div>
        </router-link>

        <div class="flex items-center gap-3">
          <router-link
            to="/admin"
            class="text-xs text-slate-400 hover:text-gold-300 px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold-400/30 transition"
          >
            Council Admin
          </router-link>
          <router-link
            to="/"
            class="text-xs font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            Back to Home
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <!-- Title & Intro -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-mono mb-4 shadow-gold-glow">
          <Sparkles class="w-3.5 h-3.5" />
          <span>ONBOARDING // COHORT 2026</span>
        </div>
        <h1 class="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Join the <span class="gold-gradient-text">UMB Blockchain Guild</span>
        </h1>
        <p class="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Lengkapi formulir pendaftaran di bawah ini untuk memverifikasi profil mahasiswa dan membuka akses eksklusif ke Discord & WhatsApp grup resmi UBS.
        </p>
      </div>

      <!-- SUCCESS STATE (Unlocked Community Access) -->
      <div v-if="isSubmitted" class="space-y-8 animate-fadeIn">
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-400/40 shadow-gold-glow-lg text-center relative overflow-hidden">
          <div class="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 class="w-10 h-10" />
          </div>

          <span class="text-xs font-mono text-gold-400 font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30">
            REGISTRATION ID: {{ submittedData?.id }}
          </span>

          <h2 class="font-display font-extrabold text-2xl sm:text-4xl text-white mt-4">
            Selamat Datang di UMB Blockchain Society! 🚀
          </h2>

          <p class="text-slate-300 text-base max-w-xl mx-auto mt-3 leading-relaxed">
            Data pendaftaran atas nama <strong class="text-white">{{ submittedData?.fullName }}</strong> ({{ submittedData?.major }}) telah berhasil diverifikasi dan tersimpan dalam ledger komunitas.
          </p>

          <!-- Gated Community Links Card -->
          <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <!-- Discord Invite -->
            <a
              href="https://discord.gg/YraYw9DRN"
              target="_blank"
              rel="noopener noreferrer"
              class="group p-6 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 hover:border-indigo-400 hover:bg-indigo-900/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
                    <MessageSquare class="w-6 h-6" />
                  </div>
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Discord Guild
                  </span>
                </div>
                <h3 class="font-display font-bold text-lg text-white group-hover:text-indigo-200">
                  Join Discord Server
                </h3>
                <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                  Akses channel riset alpha, diskusi coding, materi mingguan, dan live voice meetup.
                </p>
              </div>

              <div class="mt-6 pt-4 border-t border-indigo-500/20 flex items-center justify-between text-xs font-semibold text-indigo-300">
                <span>discord.gg/YraYw9DRN</span>
                <ExternalLink class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            <!-- WhatsApp Invite -->
            <a
              href="https://chat.whatsapp.com/FMT3wj7dTAHBW5AatcT4tv"
              target="_blank"
              rel="noopener noreferrer"
              class="group p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-900/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                    <SocialIcon name="WhatsApp" class="w-6 h-6" />
                  </div>
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    WhatsApp Group
                  </span>
                </div>
                <h3 class="font-display font-bold text-lg text-white group-hover:text-emerald-200">
                  Join WhatsApp Guild
                </h3>
                <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                  Grup pengumuman resmi acara kampus, reminder bootcamp, dan koordinasi pengurus.
                </p>
              </div>

              <div class="mt-6 pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-semibold text-emerald-300">
                <span>chat.whatsapp.com/UBS</span>
                <ExternalLink class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>

          <div class="mt-10 pt-6 border-t border-white/10 flex items-center justify-center gap-4">
            <router-link
              to="/"
              class="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition"
            >
              Kembali ke Beranda
            </router-link>
          </div>
        </div>
      </div>

      <!-- ONBOARDING FORM WIZARD -->
      <div v-else class="glass-panel p-6 sm:p-10 rounded-3xl border border-gold-400/30 shadow-2xl relative">
        <!-- Progress Steps Bar -->
        <div class="mb-10">
          <div class="flex items-center justify-between max-w-xl mx-auto mb-3">
            <div
              v-for="stepNum in totalSteps"
              :key="stepNum"
              class="flex flex-col items-center gap-1.5 relative z-10"
            >
              <div
                :class="[
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300',
                  currentStep === stepNum
                    ? 'bg-gold-400 text-obsidian-950 ring-4 ring-gold-400/20 shadow-gold-glow'
                    : currentStep > stepNum
                    ? 'bg-emerald-500 text-white'
                    : 'bg-obsidian-800 text-slate-400 border border-white/10'
                ]"
              >
                <CheckCircle2 v-if="currentStep > stepNum" class="w-5 h-5" />
                <span v-else>{{ stepNum }}</span>
              </div>
              <span class="text-[11px] font-medium text-slate-400 hidden sm:block">
                {{ stepNum === 1 ? 'Universitas' : stepNum === 2 ? 'Identitas' : stepNum === 3 ? 'Track Minat' : 'Bukti Follow' }}
              </span>
            </div>
          </div>

          <!-- Progress Track Line -->
          <div class="h-1 bg-obsidian-800 rounded-full max-w-lg mx-auto relative overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-gold-400 to-amber-500 transition-all duration-500"
              :style="{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }"
            />
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- STEP 1: Universitas & Cabang Kampus -->
          <div v-if="currentStep === 1" class="space-y-6 animate-fadeIn">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <School class="w-6 h-6 text-gold-400" />
                <span>Asal Universitas & Kampus</span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Pilih apakah Anda mahasiswa Universitas Mercu Buana atau dari universitas mitra lain.
              </p>
            </div>

            <!-- University Choice Radio -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                :class="[
                  'p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4',
                  form.universityType === 'mercubuana'
                    ? 'bg-gold-400/10 border-gold-400 text-white shadow-gold-glow'
                    : 'bg-obsidian-900 border-white/10 text-slate-300 hover:border-gold-400/40'
                ]"
              >
                <input
                  type="radio"
                  name="univType"
                  value="mercubuana"
                  v-model="form.universityType"
                  class="sr-only"
                />
                <div class="w-10 h-10 rounded-xl bg-gold-400/20 text-gold-400 flex items-center justify-center shrink-0">
                  <Building2 class="w-5 h-5" />
                </div>
                <div>
                  <div class="font-bold text-sm text-white">Universitas Mercu Buana</div>
                  <div class="text-xs text-slate-400 mt-0.5">Mahasiswa aktif UMB (Meruya, Menteng, Warung Buncit, Cipayung)</div>
                </div>
              </label>

              <label
                :class="[
                  'p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4',
                  form.universityType === 'other'
                    ? 'bg-gold-400/10 border-gold-400 text-white shadow-gold-glow'
                    : 'bg-obsidian-900 border-white/10 text-slate-300 hover:border-gold-400/40'
                ]"
              >
                <input
                  type="radio"
                  name="univType"
                  value="other"
                  v-model="form.universityType"
                  class="sr-only"
                />
                <div class="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                  <School class="w-5 h-5" />
                </div>
                <div>
                  <div class="font-bold text-sm text-white">Universitas Lain (External)</div>
                  <div class="text-xs text-slate-400 mt-0.5">Mahasiswa luar UMB yang ingin bergabung dalam ekosistem UBS</div>
                </div>
              </label>
            </div>

            <!-- If Mercu Buana: Select Campus Branch -->
            <div v-if="form.universityType === 'mercubuana'" class="pt-4 space-y-3">
              <label class="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                Pilih Cabang Kampus Mercu Buana *
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  v-for="branch in campusBranches"
                  :key="branch.id"
                  :class="[
                    'p-4 rounded-xl border cursor-pointer transition flex items-center justify-between',
                    form.campusBranch === branch.id
                      ? 'bg-gold-400/15 border-gold-400 text-white'
                      : 'bg-obsidian-900/90 border-white/10 text-slate-300 hover:border-gold-400/40'
                  ]"
                >
                  <input
                    type="radio"
                    name="campusBranch"
                    :value="branch.id"
                    v-model="form.campusBranch"
                    class="sr-only"
                  />
                  <div>
                    <div class="text-sm font-semibold text-white">{{ branch.name }}</div>
                    <div class="text-xs text-slate-400">{{ branch.address }}</div>
                  </div>
                  <div
                    :class="[
                      'w-4 h-4 rounded-full border flex items-center justify-center',
                      form.campusBranch === branch.id ? 'border-gold-400 bg-gold-400' : 'border-slate-500'
                    ]"
                  >
                    <div v-if="form.campusBranch === branch.id" class="w-1.5 h-1.5 bg-obsidian-950 rounded-full" />
                  </div>
                </label>
              </div>
            </div>

            <!-- If Other University: Input Name -->
            <div v-else class="pt-4">
              <label class="block text-xs font-medium text-slate-300 mb-2">
                Nama Lengkap Universitas Asal *
              </label>
              <input
                v-model="form.universityName"
                type="text"
                required
                placeholder="Contoh: Universitas Indonesia / ITB / Binus University"
                class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
              />
            </div>
          </div>

          <!-- STEP 2: Identitas Mahasiswa -->
          <div v-else-if="currentStep === 2" class="space-y-5 animate-fadeIn">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <User class="w-6 h-6 text-gold-400" />
                <span>Identitas & Profil Akademik</span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Data resmi untuk pencatatan keanggotaan dan sertifikat kegiatan.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Nama Lengkap (Sesuai KTM) *</label>
                <input
                  v-model="form.fullName"
                  type="text"
                  required
                  placeholder="Contoh: Rayhan Aziel Abbrar"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">NIM (Nomor Induk Mahasiswa) *</label>
                <input
                  v-model="form.nim"
                  type="text"
                  required
                  placeholder="Contoh: 41522010099"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Tanggal Lahir *</label>
                <div class="relative">
                  <input
                    v-model="form.birthDate"
                    type="date"
                    required
                    class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition scheme-dark"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Angkatan Kuliah *</label>
                <select
                  v-model="form.cohortYear"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                >
                  <option value="2026">Angkatan 2026</option>
                  <option value="2025">Angkatan 2025</option>
                  <option value="2024">Angkatan 2024</option>
                  <option value="2023">Angkatan 2023</option>
                  <option value="2022">Angkatan 2022</option>
                  <option value="2021">Angkatan 2021 / Sebelumnya</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Fakultas *</label>
                <select
                  v-model="form.faculty"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                >
                  <option value="" disabled>-- Pilih Fakultas --</option>
                  <option v-for="fac in faculties" :key="fac" :value="fac">{{ fac }}</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Program Studi (Prodi) *</label>
                <input
                  v-model="form.major"
                  type="text"
                  required
                  placeholder="Contoh: Teknik Informatika / Manajemen"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Email Mahasiswa / Personal *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="nama@student.mercubuana.ac.id"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Nomor WhatsApp Aktif *</label>
                <input
                  v-model="form.whatsapp"
                  type="tel"
                  required
                  placeholder="0812xxxxxxxx"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>
            </div>
          </div>

          <!-- STEP 3: Ketertarikan di Blockchain (Track Explanation) -->
          <div v-else-if="currentStep === 3" class="space-y-6 animate-fadeIn">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <Cpu class="w-6 h-6 text-gold-400" />
                <span>Pilih Fokus Minat Blockchain</span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Pilih salah satu track yang paling sesuai dengan minat belajar Anda di ekosistem Web3.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <label
                v-for="trackItem in tracks"
                :key="trackItem.id"
                :class="[
                  'p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col sm:flex-row items-start gap-5 group',
                  form.track === trackItem.id
                    ? 'bg-obsidian-900 border-gold-400 shadow-gold-glow ring-1 ring-gold-400/50'
                    : 'bg-obsidian-900/70 border-white/10 hover:border-gold-400/40 hover:bg-obsidian-900'
                ]"
              >
                <input
                  type="radio"
                  name="blockchainTrack"
                  :value="trackItem.id"
                  v-model="form.track"
                  class="sr-only"
                />
                <div
                  :class="[
                    'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105',
                    form.track === trackItem.id
                      ? 'bg-gradient-to-tr ' + trackItem.color + ' text-obsidian-950 shadow-lg'
                      : 'bg-white/5 text-gold-400 border border-white/10'
                  ]"
                >
                  <component :is="trackItem.icon" class="w-6 h-6" />
                </div>

                <div class="flex-1">
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <h3 class="font-display font-bold text-base sm:text-lg text-white">
                      {{ trackItem.title }}
                    </h3>
                    <span class="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-400/10 text-gold-300 border border-gold-400/20">
                      {{ trackItem.shortBadge }}
                    </span>
                  </div>

                  <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {{ trackItem.description }}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <!-- STEP 4: Bukti Follow UBSC & Explomate DApp -->
          <div v-else-if="currentStep === 4" class="space-y-6 animate-fadeIn">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <ShieldCheck class="w-6 h-6 text-gold-400" />
                <span>Verifikasi Social Proof</span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Follow akun resmi UMB Blockchain Society & ekosistem DApp partner Explomate.
              </p>
            </div>

            <!-- Card 1: Follow UBSC -->
            <div class="glass-panel p-5 sm:p-6 rounded-2xl border border-gold-400/30 space-y-4">
              <div class="flex items-center justify-between border-b border-white/10 pb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center p-1 text-gold-400">
                    <Sparkles class="w-4 h-4" />
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-white">1. Follow Akun Resmi UMB Blockchain Society</h3>
                    <p class="text-xs text-gold-400/90">Wajib follow IG, LinkedIn, & TikTok</p>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  href="https://www.instagram.com/ubs.community?utm_source=qr&igsi=dHR4eDQ3bnZvbW1u"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-xl bg-obsidian-900 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition flex items-center justify-between text-xs text-slate-200 group"
                >
                  <div class="flex items-center gap-2">
                    <SocialIcon name="Instagram" class="w-4 h-4 text-pink-400" />
                    <span>@ubs.community</span>
                  </div>
                  <ExternalLink class="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400" />
                </a>

                <a
                  href="https://www.linkedin.com/company/umb-blockchain-society-ubs"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-xl bg-obsidian-900 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition flex items-center justify-between text-xs text-slate-200 group"
                >
                  <div class="flex items-center gap-2">
                    <SocialIcon name="Linkedin" class="w-4 h-4 text-blue-400" />
                    <span>LinkedIn UBS</span>
                  </div>
                  <ExternalLink class="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                </a>

                <a
                  href="https://www.tiktok.com/@ubs.community"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-xl bg-obsidian-900 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition flex items-center justify-between text-xs text-slate-200 group"
                >
                  <div class="flex items-center gap-2">
                    <SocialIcon name="TikTok" class="w-4 h-4 text-cyan-400" />
                    <span>TikTok @ubs.community</span>
                  </div>
                  <ExternalLink class="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>
              </div>

              <!-- Upload Screenshot or Username -->
              <div class="pt-2">
                <label class="block text-xs font-medium text-slate-300 mb-2">
                  Upload Screenshot Bukti Follow UBSC (atau isi username IG/TikTok) *
                </label>
                
                <div v-if="form.proofUbscFilePreview" class="relative inline-block mb-3">
                  <img :src="form.proofUbscFilePreview" alt="Preview UBSC" class="h-24 rounded-xl border border-gold-400/40 object-cover" />
                  <button
                    type="button"
                    @click="removeFile('ubsc')"
                    class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 shadow"
                  >
                    <X class="w-3.5 h-3.5" />
                  </button>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                  <label class="flex-1 px-4 py-3 rounded-xl border border-dashed border-gold-400/40 hover:border-gold-400 bg-obsidian-900/80 cursor-pointer flex items-center justify-center gap-2 text-xs text-slate-300 transition">
                    <Upload class="w-4 h-4 text-gold-400" />
                    <span>{{ form.proofUbscFile ? form.proofUbscFile.name : 'Upload Screenshot Bukti' }}</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="sr-only"
                      @change="(e) => handleFileUpload(e, 'ubsc')"
                    />
                  </label>
                  <input
                    v-model="form.proofUbscIg"
                    type="text"
                    placeholder="Username IG / TikTok kamu"
                    class="sm:w-64 px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-xs outline-none transition"
                  />
                </div>
              </div>
            </div>

            <!-- Card 2: Follow Explomate DApp -->
            <div class="glass-panel p-5 sm:p-6 rounded-2xl border border-gold-400/30 space-y-4">
              <div class="flex items-center justify-between border-b border-white/10 pb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center p-1 text-cyan-400">
                    <Cpu class="w-4 h-4" />
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-white">2. Follow Explomate (Web3 Ecosystem DApp Partner)</h3>
                    <p class="text-xs text-cyan-400/90">Dukung ekosistem dApp partner UBS di X & Instagram</p>
                  </div>
                </div>
              </div>

              <!-- Explomate Links -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="https://x.com/explomatee"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-xl bg-obsidian-900 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition flex items-center justify-between text-xs text-slate-200 group"
                >
                  <div class="flex items-center gap-2">
                    <SocialIcon name="Twitter" class="w-4 h-4 text-sky-400" />
                    <span>X/Twitter @explomatee</span>
                  </div>
                  <ExternalLink class="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400" />
                </a>

                <a
                  href="https://www.instagram.com/explo.mate"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-xl bg-obsidian-900 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition flex items-center justify-between text-xs text-slate-200 group"
                >
                  <div class="flex items-center gap-2">
                    <SocialIcon name="Instagram" class="w-4 h-4 text-pink-400" />
                    <span>Instagram @explo.mate</span>
                  </div>
                  <ExternalLink class="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400" />
                </a>
              </div>

              <!-- Upload Screenshot or Username -->
              <div class="pt-2">
                <label class="block text-xs font-medium text-slate-300 mb-2">
                  Upload Screenshot Bukti Follow Explomate (atau isi username X / IG) *
                </label>

                <div v-if="form.proofExplomateFilePreview" class="relative inline-block mb-3">
                  <img :src="form.proofExplomateFilePreview" alt="Preview Explomate" class="h-24 rounded-xl border border-cyan-400/40 object-cover" />
                  <button
                    type="button"
                    @click="removeFile('explomate')"
                    class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 shadow"
                  >
                    <X class="w-3.5 h-3.5" />
                  </button>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                  <label class="flex-1 px-4 py-3 rounded-xl border border-dashed border-cyan-400/40 hover:border-cyan-400 bg-obsidian-900/80 cursor-pointer flex items-center justify-center gap-2 text-xs text-slate-300 transition">
                    <Upload class="w-4 h-4 text-cyan-400" />
                    <span>{{ form.proofExplomateFile ? form.proofExplomateFile.name : 'Upload Screenshot Bukti' }}</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="sr-only"
                      @change="(e) => handleFileUpload(e, 'explomate')"
                    />
                  </label>
                  <input
                    v-model="form.proofExplomateX"
                    type="text"
                    placeholder="Username X / IG kamu"
                    class="sm:w-64 px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-cyan-400 text-white text-xs outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Navigation Controls -->
          <div class="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="prevStep"
              class="px-5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition flex items-center gap-2"
            >
              <ArrowLeft class="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
            <div v-else />

            <button
              v-if="currentStep < totalSteps"
              type="button"
              @click="nextStep"
              :disabled="currentStep === 1 ? !isStep1Valid : currentStep === 2 ? !isStep2Valid : currentStep === 3 ? !isStep3Valid : false"
              class="px-7 py-3 rounded-xl text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Lanjut</span>
              <ArrowRight class="w-4 h-4" />
            </button>

            <button
              v-else
              type="submit"
              :disabled="!isStep4Valid || isSubmitting"
              class="px-8 py-3.5 rounded-xl text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow-lg transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">Memproses Pendaftaran...</span>
              <template v-else>
                <span>Kirim & Buka Akses Komunitas</span>
                <CheckCircle2 class="w-4 h-4" />
              </template>
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
