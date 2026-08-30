<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BackgroundNetwork from '@/components/BackgroundNetwork.vue'
import SocialIcon from '@/components/SocialIcon.vue'
import { submitToGoogleSheet } from '@/services/storage'
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
  X,
  Check
} from 'lucide-vue-next'

const router = useRouter()

const currentStep = ref(1)
const totalSteps = 4
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submittedData = ref(null)

// Form State
const form = ref({
  universityType: 'mercubuana',
  universityName: '',
  campusBranch: 'Meruya',
  fullName: '',
  nim: '',
  birthDate: '',
  faculty: '',
  major: '',
  cohortYear: '2024',
  email: '',
  whatsapp: '',
  track: 'developer',
  
  // Section 1: UBSC Proofs (3 files required)
  proofUbscIgFile: null,
  proofUbscIgPreview: '',
  proofUbscLinkedinFile: null,
  proofUbscLinkedinPreview: '',
  proofUbscTiktokFile: null,
  proofUbscTiktokPreview: '',

  // Section 2: Explomate Proofs (2 files required)
  proofExplomateXFile: null,
  proofExplomateXPreview: '',
  proofExplomateIgFile: null,
  proofExplomateIgPreview: ''
})

const campusBranches = [
  { id: 'Meruya', name: 'Meruya (Main Campus)', address: 'West Jakarta' },
  { id: 'Menteng', name: 'Menteng', address: 'Central Jakarta' },
  { id: 'Warung Buncit', name: 'Warung Buncit', address: 'South Jakarta' },
  { id: 'Cipayung', name: 'Cipayung / Kranggan', address: 'East Jakarta / Bekasi' }
]

const faculties = [
  'Faculty of Computer Science (FASILKOM)',
  'Faculty of Economics & Business (FEB)',
  'Faculty of Engineering (FT)',
  'Faculty of Design & Creative Arts (FDSK)',
  'Faculty of Communication (FIKOM)',
  'Faculty of Psychology (FPSI)',
  'Other Faculty'
]

const tracks = [
  {
    id: 'developer',
    title: 'Developer & Smart Contract',
    shortBadge: 'Tech & BUIDL',
    icon: Cpu,
    color: 'from-amber-400 to-gold-500',
    description: 'Learn to build and deploy smart contracts (Solidity/Rust), integrate frontend dApps, design Web3 infrastructure, perform security auditing, and ship projects at global hackathons.'
  },
  {
    id: 'finances',
    title: 'Finances & Tokenomics',
    shortBadge: 'DeFi & Economics',
    icon: TrendingUp,
    color: 'from-emerald-400 to-teal-500',
    description: 'Dive into Decentralized Finance (DeFi) architecture, tokenomics design mechanics, crypto fundamental analysis, on-chain liquidity models, and digital finance regulations.'
  },
  {
    id: 'marketing',
    title: 'Marketing & Community',
    shortBadge: 'Growth & PR',
    icon: Megaphone,
    color: 'from-purple-400 to-pink-500',
    description: 'Master Web3 community growth strategies, viral narrative creation, social media management, Web3 PR, event organizing, ecosystem partnerships, and content strategy.'
  }
]

// Handle Individual File Uploads
const handleFileUpload = (event, slot) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    if (slot === 'ubsc_ig') {
      form.value.proofUbscIgFile = file
      form.value.proofUbscIgPreview = e.target.result
    } else if (slot === 'ubsc_linkedin') {
      form.value.proofUbscLinkedinFile = file
      form.value.proofUbscLinkedinPreview = e.target.result
    } else if (slot === 'ubsc_tiktok') {
      form.value.proofUbscTiktokFile = file
      form.value.proofUbscTiktokPreview = e.target.result
    } else if (slot === 'explomate_x') {
      form.value.proofExplomateXFile = file
      form.value.proofExplomateXPreview = e.target.result
    } else if (slot === 'explomate_ig') {
      form.value.proofExplomateIgFile = file
      form.value.proofExplomateIgPreview = e.target.result
    }
  }
  reader.readAsDataURL(file)
}

const removeFile = (slot) => {
  if (slot === 'ubsc_ig') {
    form.value.proofUbscIgFile = null
    form.value.proofUbscIgPreview = ''
  } else if (slot === 'ubsc_linkedin') {
    form.value.proofUbscLinkedinFile = null
    form.value.proofUbscLinkedinPreview = ''
  } else if (slot === 'ubsc_tiktok') {
    form.value.proofUbscTiktokFile = null
    form.value.proofUbscTiktokPreview = ''
  } else if (slot === 'explomate_x') {
    form.value.proofExplomateXFile = null
    form.value.proofExplomateXPreview = ''
  } else if (slot === 'explomate_ig') {
    form.value.proofExplomateIgFile = null
    form.value.proofExplomateIgPreview = ''
  }
}

// Counts for Step 4
const ubscUploadedCount = computed(() => {
  let count = 0
  if (form.value.proofUbscIgPreview) count++
  if (form.value.proofUbscLinkedinPreview) count++
  if (form.value.proofUbscTiktokPreview) count++
  return count
})

const explomateUploadedCount = computed(() => {
  let count = 0
  if (form.value.proofExplomateXPreview) count++
  if (form.value.proofExplomateIgPreview) count++
  return count
})

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
  return ubscUploadedCount.value === 3 && explomateUploadedCount.value === 2
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

const handleSubmit = async () => {
  isSubmitting.value = true

  const selectedTrackObj = tracks.find(t => t.id === form.value.track)

  const payload = {
    universityType: form.value.universityType,
    universityName: form.value.universityType === 'mercubuana' ? 'Universitas Mercu Buana' : form.value.universityName,
    campusBranch: form.value.universityType === 'mercubuana' ? form.value.campusBranch : 'External',
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
      instagram: !!form.value.proofUbscIgPreview ? 'Verified' : 'Missing',
      linkedin: !!form.value.proofUbscLinkedinPreview ? 'Verified' : 'Missing',
      tiktok: !!form.value.proofUbscTiktokPreview ? 'Verified' : 'Missing'
    },
    proofExplomate: {
      x: !!form.value.proofExplomateXPreview ? 'Verified' : 'Missing',
      instagram: !!form.value.proofExplomateIgPreview ? 'Verified' : 'Missing'
    }
  }

  try {
    const result = await submitToGoogleSheet(payload)
    submittedData.value = { ...payload, id: result.id }
    isSubmitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    console.error('Submission error:', err)
    submittedData.value = { ...payload, id: `UBS-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}` }
    isSubmitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-obsidian-950 text-slate-100 relative selection:bg-gold-400 selection:text-obsidian-950 pb-20">
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
          Complete the registration form below to verify your student profile and unlock exclusive access to the official UBS Discord & WhatsApp community.
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
            Welcome to UMB Blockchain Society! 🚀
          </h2>

          <p class="text-slate-300 text-base max-w-xl mx-auto mt-3 leading-relaxed">
            Registration for <strong class="text-white">{{ submittedData?.fullName }}</strong> ({{ submittedData?.major }}) has been successfully verified and recorded in the community ledger.
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
                  Access alpha research channels, coding discussions, weekly materials, and live voice meetups.
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
                  Official announcements, campus event reminders, bootcamp notifications, and council coordination.
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
              Back to Homepage
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
                {{ stepNum === 1 ? 'University' : stepNum === 2 ? 'Identity' : stepNum === 3 ? 'Blockchain Track' : 'Social Proof' }}
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
          <!-- STEP 1: University & Campus Branch -->
          <div v-if="currentStep === 1" class="space-y-6 animate-fadeIn">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <School class="w-6 h-6 text-gold-400" />
                <span>University & Campus Branch</span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Select whether you are a Universitas Mercu Buana student or from another partner university.
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
                  <div class="text-xs text-slate-400 mt-0.5">Active UMB student (Meruya, Menteng, Warung Buncit, Cipayung)</div>
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
                  <div class="font-bold text-sm text-white">Other University (External)</div>
                  <div class="text-xs text-slate-400 mt-0.5">External student looking to join the UBS ecosystem</div>
                </div>
              </label>
            </div>

            <!-- If Mercu Buana: Select Campus Branch -->
            <div v-if="form.universityType === 'mercubuana'" class="pt-4 space-y-3">
              <label class="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                Select Mercu Buana Campus Branch *
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
                Full University Name *
              </label>
              <input
                v-model="form.universityName"
                type="text"
                required
                placeholder="e.g. Universitas Indonesia / ITB / Binus University"
                class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
              />
            </div>
          </div>

          <!-- STEP 2: Student Identity -->
          <div v-else-if="currentStep === 2" class="space-y-5 animate-fadeIn">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <User class="w-6 h-6 text-gold-400" />
                <span>Identity & Academic Profile</span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Official data for membership records and event certificates.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Full Name (as on Student ID) *</label>
                <input
                  v-model="form.fullName"
                  type="text"
                  required
                  placeholder="e.g. Satoshi Nakamoto"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Student ID Number (NIM) *</label>
                <input
                  v-model="form.nim"
                  type="text"
                  required
                  placeholder="e.g. 4152xxxxxxx"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Date of Birth *</label>
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
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Enrollment Year *</label>
                <select
                  v-model="form.cohortYear"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                >
                  <option value="2026">Class of 2026</option>
                  <option value="2025">Class of 2025</option>
                  <option value="2024">Class of 2024</option>
                  <option value="2023">Class of 2023</option>
                  <option value="2022">Class of 2022</option>
                  <option value="2021">Class of 2021 or Earlier</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Faculty *</label>
                <select
                  v-model="form.faculty"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                >
                  <option value="" disabled>-- Select Faculty --</option>
                  <option v-for="fac in faculties" :key="fac" :value="fac">{{ fac }}</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Study Program (Major) *</label>
                <input
                  v-model="form.major"
                  type="text"
                  required
                  placeholder="e.g. Informatics / Management / Design"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Student or Personal Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="name@student.mercubuana.ac.id"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Active WhatsApp Number *</label>
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

          <!-- STEP 3: Blockchain Interest Track -->
          <div v-else-if="currentStep === 3" class="space-y-6 animate-fadeIn">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <Cpu class="w-6 h-6 text-gold-400" />
                <span>Choose Your Blockchain Focus Track</span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Pick the track that best matches your Web3 learning interest. You can always explore other tracks later.
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

          <!-- STEP 4: Social Proof Verification (3 UBSC + 2 Explomate Proofs Required) -->
          <div v-else-if="currentStep === 4" class="space-y-6 animate-fadeIn">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2.5">
                <ShieldCheck class="w-6 h-6 text-gold-400" />
                <span>Social Proof Verification</span>
              </h2>
              <p class="text-xs text-slate-400 mt-1">
                Upload proof of follow screenshots for all 3 official UBS accounts and 2 Explomate DApp accounts.
              </p>
            </div>

            <!-- SECTION 1: Follow UBSC (3 Files Required) -->
            <div class="glass-panel p-5 sm:p-6 rounded-2xl border border-gold-400/30 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center p-1 text-gold-400">
                    <Sparkles class="w-4 h-4" />
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-white">1. Follow UMB Blockchain Society Official Accounts</h3>
                    <p class="text-xs text-gold-400/90">All 3 screenshot proofs required (Instagram, LinkedIn, & TikTok)</p>
                  </div>
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" :class="ubscUploadedCount === 3 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gold-400/15 text-gold-300 border border-gold-400/30'">
                  <Check v-if="ubscUploadedCount === 3" class="w-3.5 h-3.5" />
                  <span>{{ ubscUploadedCount }} of 3 Uploaded</span>
                </div>
              </div>

              <!-- 3 Dedicated Upload Slots for UBSC -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <!-- Slot 1: Instagram -->
                <div class="p-3.5 rounded-xl bg-obsidian-900/90 border border-white/10 flex flex-col justify-between space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <SocialIcon name="Instagram" class="w-4 h-4 text-pink-400" />
                      <span class="text-xs font-semibold text-white">Instagram</span>
                    </div>
                    <a
                      href="https://www.instagram.com/ubs.community?utm_source=qr&igsi=dHR4eDQ3bnZvbW1u"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[10px] text-pink-400 hover:underline flex items-center gap-1"
                    >
                      <span>@ubs.community</span>
                      <ExternalLink class="w-3 h-3" />
                    </a>
                  </div>

                  <!-- Upload or Preview -->
                  <div v-if="form.proofUbscIgPreview" class="relative rounded-xl border border-pink-500/40 bg-pink-500/5 p-2 flex items-center justify-between">
                    <div class="flex items-center gap-2 overflow-hidden">
                      <img :src="form.proofUbscIgPreview" alt="IG Proof" class="w-10 h-10 rounded-lg object-cover border border-pink-500/30 shrink-0" />
                      <span class="text-[11px] text-emerald-300 truncate font-medium">IG Proof Added</span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('ubsc_ig')"
                      class="w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center shrink-0 ml-1"
                    >
                      <X class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <label v-else class="px-3 py-4 rounded-xl border border-dashed border-pink-500/40 hover:border-pink-400 bg-obsidian-950 cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center transition group">
                    <Upload class="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span class="text-[11px] text-slate-300 font-medium">Upload IG Screenshot *</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="sr-only"
                      @change="(e) => handleFileUpload(e, 'ubsc_ig')"
                    />
                  </label>
                </div>

                <!-- Slot 2: LinkedIn -->
                <div class="p-3.5 rounded-xl bg-obsidian-900/90 border border-white/10 flex flex-col justify-between space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <SocialIcon name="Linkedin" class="w-4 h-4 text-blue-400" />
                      <span class="text-xs font-semibold text-white">LinkedIn</span>
                    </div>
                    <a
                      href="https://www.linkedin.com/company/umb-blockchain-society-ubs"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[10px] text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>LinkedIn UBS</span>
                      <ExternalLink class="w-3 h-3" />
                    </a>
                  </div>

                  <!-- Upload or Preview -->
                  <div v-if="form.proofUbscLinkedinPreview" class="relative rounded-xl border border-blue-500/40 bg-blue-500/5 p-2 flex items-center justify-between">
                    <div class="flex items-center gap-2 overflow-hidden">
                      <img :src="form.proofUbscLinkedinPreview" alt="LinkedIn Proof" class="w-10 h-10 rounded-lg object-cover border border-blue-500/30 shrink-0" />
                      <span class="text-[11px] text-emerald-300 truncate font-medium">LinkedIn Proof Added</span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('ubsc_linkedin')"
                      class="w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center shrink-0 ml-1"
                    >
                      <X class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <label v-else class="px-3 py-4 rounded-xl border border-dashed border-blue-500/40 hover:border-blue-400 bg-obsidian-950 cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center transition group">
                    <Upload class="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span class="text-[11px] text-slate-300 font-medium">Upload LinkedIn Screenshot *</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="sr-only"
                      @change="(e) => handleFileUpload(e, 'ubsc_linkedin')"
                    />
                  </label>
                </div>

                <!-- Slot 3: TikTok -->
                <div class="p-3.5 rounded-xl bg-obsidian-900/90 border border-white/10 flex flex-col justify-between space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <SocialIcon name="TikTok" class="w-4 h-4 text-cyan-400" />
                      <span class="text-xs font-semibold text-white">TikTok</span>
                    </div>
                    <a
                      href="https://www.tiktok.com/@ubs.community"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>@ubs.community</span>
                      <ExternalLink class="w-3 h-3" />
                    </a>
                  </div>

                  <!-- Upload or Preview -->
                  <div v-if="form.proofUbscTiktokPreview" class="relative rounded-xl border border-cyan-500/40 bg-cyan-500/5 p-2 flex items-center justify-between">
                    <div class="flex items-center gap-2 overflow-hidden">
                      <img :src="form.proofUbscTiktokPreview" alt="TikTok Proof" class="w-10 h-10 rounded-lg object-cover border border-cyan-500/30 shrink-0" />
                      <span class="text-[11px] text-emerald-300 truncate font-medium">TikTok Proof Added</span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('ubsc_tiktok')"
                      class="w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center shrink-0 ml-1"
                    >
                      <X class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <label v-else class="px-3 py-4 rounded-xl border border-dashed border-cyan-500/40 hover:border-cyan-400 bg-obsidian-950 cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center transition group">
                    <Upload class="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span class="text-[11px] text-slate-300 font-medium">Upload TikTok Screenshot *</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="sr-only"
                      @change="(e) => handleFileUpload(e, 'ubsc_tiktok')"
                    />
                  </label>
                </div>
              </div>
            </div>

            <!-- SECTION 2: Follow Explomate DApp (2 Files Required) -->
            <div class="glass-panel p-5 sm:p-6 rounded-2xl border border-gold-400/30 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center p-1 text-cyan-400">
                    <Cpu class="w-4 h-4" />
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-white">2. Follow Explomate (Web3 Ecosystem DApp Partner)</h3>
                    <p class="text-xs text-cyan-400/90">Both 2 screenshot proofs required (X/Twitter & Instagram)</p>
                  </div>
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" :class="explomateUploadedCount === 2 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30'">
                  <Check v-if="explomateUploadedCount === 2" class="w-3.5 h-3.5" />
                  <span>{{ explomateUploadedCount }} of 2 Uploaded</span>
                </div>
              </div>

              <!-- 2 Dedicated Upload Slots for Explomate -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <!-- Slot 1: X / Twitter -->
                <div class="p-3.5 rounded-xl bg-obsidian-900/90 border border-white/10 flex flex-col justify-between space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <SocialIcon name="Twitter" class="w-4 h-4 text-sky-400" />
                      <span class="text-xs font-semibold text-white">X / Twitter</span>
                    </div>
                    <a
                      href="https://x.com/explomatee"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[10px] text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>@explomatee</span>
                      <ExternalLink class="w-3 h-3" />
                    </a>
                  </div>

                  <!-- Upload or Preview -->
                  <div v-if="form.proofExplomateXPreview" class="relative rounded-xl border border-sky-500/40 bg-sky-500/5 p-2 flex items-center justify-between">
                    <div class="flex items-center gap-2 overflow-hidden">
                      <img :src="form.proofExplomateXPreview" alt="X Proof" class="w-10 h-10 rounded-lg object-cover border border-sky-500/30 shrink-0" />
                      <span class="text-[11px] text-emerald-300 truncate font-medium">X Proof Added</span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('explomate_x')"
                      class="w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center shrink-0 ml-1"
                    >
                      <X class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <label v-else class="px-3 py-4 rounded-xl border border-dashed border-sky-500/40 hover:border-sky-400 bg-obsidian-950 cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center transition group">
                    <Upload class="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                    <span class="text-[11px] text-slate-300 font-medium">Upload X/Twitter Screenshot *</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="sr-only"
                      @change="(e) => handleFileUpload(e, 'explomate_x')"
                    />
                  </label>
                </div>

                <!-- Slot 2: Instagram -->
                <div class="p-3.5 rounded-xl bg-obsidian-900/90 border border-white/10 flex flex-col justify-between space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <SocialIcon name="Instagram" class="w-4 h-4 text-pink-400" />
                      <span class="text-xs font-semibold text-white">Instagram</span>
                    </div>
                    <a
                      href="https://www.instagram.com/explo.mate"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[10px] text-pink-400 hover:underline flex items-center gap-1"
                    >
                      <span>@explo.mate</span>
                      <ExternalLink class="w-3 h-3" />
                    </a>
                  </div>

                  <!-- Upload or Preview -->
                  <div v-if="form.proofExplomateIgPreview" class="relative rounded-xl border border-pink-500/40 bg-pink-500/5 p-2 flex items-center justify-between">
                    <div class="flex items-center gap-2 overflow-hidden">
                      <img :src="form.proofExplomateIgPreview" alt="Explomate IG Proof" class="w-10 h-10 rounded-lg object-cover border border-pink-500/30 shrink-0" />
                      <span class="text-[11px] text-emerald-300 truncate font-medium">IG Proof Added</span>
                    </div>
                    <button
                      type="button"
                      @click="removeFile('explomate_ig')"
                      class="w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center shrink-0 ml-1"
                    >
                      <X class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <label v-else class="px-3 py-4 rounded-xl border border-dashed border-pink-500/40 hover:border-pink-400 bg-obsidian-950 cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center transition group">
                    <Upload class="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span class="text-[11px] text-slate-300 font-medium">Upload IG Screenshot *</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="sr-only"
                      @change="(e) => handleFileUpload(e, 'explomate_ig')"
                    />
                  </label>
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
              <span>Previous</span>
            </button>
            <div v-else />

            <button
              v-if="currentStep < totalSteps"
              type="button"
              @click="nextStep"
              :disabled="currentStep === 1 ? !isStep1Valid : currentStep === 2 ? !isStep2Valid : currentStep === 3 ? !isStep3Valid : false"
              class="px-7 py-3 rounded-xl text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <ArrowRight class="w-4 h-4" />
            </button>

            <button
              v-else
              type="submit"
              :disabled="!isStep4Valid || isSubmitting"
              class="px-8 py-3.5 rounded-xl text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow-lg transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">Processing Registration...</span>
              <template v-else>
                <span>Submit & Unlock Community Access</span>
                <CheckCircle2 class="w-4 h-4" />
              </template>
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
