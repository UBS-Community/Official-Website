<script setup>
import { ref, computed, onMounted } from 'vue'
import BackgroundNetwork from '@/components/BackgroundNetwork.vue'
import {
  getApplicants,
  deleteApplicant,
  exportApplicantsToExcel,
  getGoogleSheetConfig,
  saveGoogleSheetConfig
} from '@/services/storage'
import {
  ShieldCheck,
  Download,
  Search,
  Users,
  Building2,
  Cpu,
  TrendingUp,
  Megaphone,
  Trash2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Filter,
  RefreshCw,
  ExternalLink,
  FileSpreadsheet,
  Settings,
  X,
  Copy,
  Check,
  Table
} from 'lucide-vue-next'

// Authentication
const isAuthenticated = ref(false)
const passkeyInput = ref('')
const authError = ref(false)

// Config Modal
const isConfigModalOpen = ref(false)
const sheetConfig = ref({
  webhookUrl: '',
  liveSheetUrl: ''
})
const configSaveMessage = ref('')
const isCopiedScript = ref(false)

const handleLogin = () => {
  if (passkeyInput.value === 'ubs2026' || passkeyInput.value === 'admin' || passkeyInput.value === 'council') {
    isAuthenticated.value = true
    authError.value = false
    sessionStorage.setItem('ubs_admin_auth', 'true')
    loadData()
  } else {
    authError.value = true
  }
}

// Data State
const applicants = ref([])
const searchQuery = ref('')
const selectedFilterTrack = ref('all')
const selectedFilterBranch = ref('all')
const isExporting = ref(false)
const exportSuccessMessage = ref('')

const loadData = () => {
  applicants.value = getApplicants()
  sheetConfig.value = getGoogleSheetConfig()
}

onMounted(() => {
  if (sessionStorage.getItem('ubs_admin_auth') === 'true') {
    isAuthenticated.value = true
    loadData()
  }
})

const handleSaveConfig = () => {
  saveGoogleSheetConfig(sheetConfig.value)
  configSaveMessage.value = 'Pengaturan Google Sheets berhasil disimpan!'
  setTimeout(() => {
    configSaveMessage.value = ''
    isConfigModalOpen.value = false
  }, 1800)
}

const copyAppsScriptGuide = () => {
  const scriptCode = `function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp","Registration ID","Nama Lengkap","NIM","Tanggal Lahir","Universitas","Cabang Kampus","Fakultas","Program Studi","Angkatan","Email","No WhatsApp","Track Minat","Bukti UBSC","Bukti Explomate"]);
      sheet.getRange("1:1").setFontWeight("bold").setBackground("#D4AF37").setFontColor("#05070B");
      sheet.setFrozenRows(1);
    }
    var data = (e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : e.parameter;
    sheet.appendRow([
      new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      data.id || "",
      data.fullName || "",
      "'" + (data.nim || ""),
      data.birthDate || "",
      data.university || "",
      data.campusBranch || "",
      data.faculty || "",
      data.major || "",
      data.cohortYear || "",
      data.email || "",
      "'" + (data.whatsapp || ""),
      data.track || "",
      data.proofUbsc || "Verified",
      data.proofExplomate || "Verified"
    ]);
    return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`
  navigator.clipboard.writeText(scriptCode)
  isCopiedScript.value = true
  setTimeout(() => {
    isCopiedScript.value = false
  }, 3000)
}

// Metrics
const totalApplicants = computed(() => applicants.value.length)
const totalUmb = computed(() => applicants.value.filter(a => a.universityType === 'mercubuana').length)
const totalExternal = computed(() => applicants.value.filter(a => a.universityType !== 'mercubuana').length)

const totalDev = computed(() => applicants.value.filter(a => a.track === 'developer').length)
const totalFin = computed(() => applicants.value.filter(a => a.track === 'finances').length)
const totalMkt = computed(() => applicants.value.filter(a => a.track === 'marketing').length)

// Filtered data
const filteredApplicants = computed(() => {
  return applicants.value.filter(item => {
    const matchSearch =
      !searchQuery.value ||
      item.fullName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.nim?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.major?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchTrack =
      selectedFilterTrack.value === 'all' || item.track === selectedFilterTrack.value

    const matchBranch =
      selectedFilterBranch.value === 'all' ||
      (selectedFilterBranch.value === 'other'
        ? item.universityType !== 'mercubuana'
        : item.campusBranch === selectedFilterBranch.value)

    return matchSearch && matchTrack && matchBranch
  })
})

const handleExport = () => {
  isExporting.value = true
  try {
    const filename = exportApplicantsToExcel(filteredApplicants.value)
    exportSuccessMessage.value = `Berhasil diexport ke ${filename}`
    setTimeout(() => {
      exportSuccessMessage.value = ''
    }, 4000)
  } catch (err) {
    console.error('Export failed:', err)
  } finally {
    isExporting.value = false
  }
}

const handleDelete = (id, name) => {
  if (confirm(`Hapus data pendaftaran untuk ${name} (${id})?`)) {
    applicants.value = deleteApplicant(id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-obsidian-950 text-slate-100 relative selection:bg-gold-400 selection:text-obsidian-950 pb-20">
    <BackgroundNetwork />

    <!-- Top Bar -->
    <header class="relative z-20 border-b border-gold-400/20 bg-obsidian-950/80 backdrop-blur-md sticky top-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center p-1.5 shadow-gold-glow">
            <img src="@/assets/logo/ubs-logo.png" alt="UBS Logo" class="w-full h-full object-contain" />
          </div>
          <div>
            <span class="font-display font-bold text-white text-base sm:text-lg block">
              Council Admin Portal
            </span>
            <span class="text-[10px] text-gold-400 font-medium uppercase tracking-wider block">
              Google Sheets Realtime Sync & Ledger Management
            </span>
          </div>
        </router-link>

        <div class="flex items-center gap-3">
          <router-link
            to="/invitation"
            class="text-xs text-gold-300 hover:text-white px-3.5 py-1.5 rounded-lg bg-gold-400/10 border border-gold-400/30 hover:bg-gold-400/20 transition"
          >
            Buka Form Invitation
          </router-link>
          <router-link
            to="/"
            class="text-xs text-slate-300 hover:text-white px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            Home
          </router-link>
        </div>
      </div>
    </header>

    <main class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <!-- PASSKEY LOGIN GATE -->
      <div v-if="!isAuthenticated" class="max-w-md mx-auto pt-16 animate-fadeIn">
        <div class="glass-panel p-8 rounded-3xl border border-gold-400/30 shadow-2xl text-center">
          <div class="w-16 h-16 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 mx-auto mb-5 shadow-gold-glow">
            <Lock class="w-8 h-8" />
          </div>

          <h1 class="font-display font-bold text-2xl text-white">
            Council Passkey Access
          </h1>
          <p class="text-xs text-slate-400 mt-2 mb-6">
            Masukkan passkey pengurus / petinggi grup untuk melihat data pendaftar dan sinkronisasi Google Sheets.
          </p>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <input
                v-model="passkeyInput"
                type="password"
                required
                placeholder="Masukkan Passkey (contoh: ubs2026)"
                class="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-sm outline-none text-center tracking-widest font-mono"
              />
            </div>

            <div v-if="authError" class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
              Passkey salah. Silakan periksa kembali passkey petinggi UBS.
            </div>

            <button
              type="submit"
              class="w-full py-3 rounded-xl font-semibold text-sm text-obsidian-950 bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition flex items-center justify-center gap-2"
            >
              <span>Buka Dashboard Pendaftar</span>
              <ArrowRight class="w-4 h-4" />
            </button>
          </form>

          <div class="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-500">
            Default Council Passkey: <span class="font-mono text-gold-400">ubs2026</span>
          </div>
        </div>
      </div>

      <!-- AUTHENTICATED COUNCIL DASHBOARD -->
      <div v-else class="space-y-8 animate-fadeIn">
        <!-- Top Title & Google Sheet Actions -->
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span class="text-xs font-mono text-gold-400 uppercase tracking-widest">LIVE GOOGLE SHEETS & LEDGER</span>
            </div>
            <h1 class="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Data Pendaftaran Komunitas UBS
            </h1>
          </div>

          <!-- Action Buttons Group -->
          <div class="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <!-- Open Live Google Sheet Button -->
            <a
              v-if="sheetConfig.liveSheetUrl && !sheetConfig.liveSheetUrl.includes('SAMPLE_')"
              :href="sheetConfig.liveSheetUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition flex items-center gap-2 shadow-lg shadow-emerald-900/30"
            >
              <Table class="w-4 h-4 text-emerald-200" />
              <span>Buka Google Sheet Realtime</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>

            <!-- Settings Modal Button -->
            <button
              @click="isConfigModalOpen = true"
              class="px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-gold-400/30 text-gold-300 hover:text-white hover:bg-gold-400/10 text-xs font-medium transition flex items-center gap-1.5"
            >
              <Settings class="w-4 h-4" />
              <span>Pengaturan Google Sheets</span>
            </button>

            <!-- Export to XLSX Backup -->
            <button
              @click="handleExport"
              :disabled="isExporting || filteredApplicants.length === 0"
              class="px-4 py-2.5 rounded-xl font-semibold text-xs text-obsidian-950 bg-gradient-to-r from-gold-300 to-gold-400 hover:from-gold-200 hover:to-gold-300 shadow-gold-glow transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <FileSpreadsheet class="w-4 h-4" />
              <span>Export Excel (.xlsx)</span>
            </button>

            <button
              @click="loadData"
              class="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
              title="Refresh Data"
            >
              <RefreshCw class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Export Alert Success Notification -->
        <div
          v-if="exportSuccessMessage"
          class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3 shadow-lg animate-fadeIn"
        >
          <CheckCircle2 class="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{{ exportSuccessMessage }}</span>
        </div>

        <!-- Summary Metrics Cards Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div class="glass-panel p-4 rounded-2xl border border-gold-400/20">
            <div class="text-[11px] text-slate-400 font-medium">Total Pendaftar</div>
            <div class="text-2xl font-bold font-display text-white mt-1">{{ totalApplicants }}</div>
            <div class="text-[10px] text-gold-400 mt-0.5">Semua Mahasiswa</div>
          </div>

          <div class="glass-panel p-4 rounded-2xl border border-white/10">
            <div class="text-[11px] text-slate-400 font-medium">Mercu Buana</div>
            <div class="text-2xl font-bold font-display text-gold-300 mt-1">{{ totalUmb }}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Internal UMB</div>
          </div>

          <div class="glass-panel p-4 rounded-2xl border border-white/10">
            <div class="text-[11px] text-slate-400 font-medium">Luar UMB</div>
            <div class="text-2xl font-bold font-display text-slate-200 mt-1">{{ totalExternal }}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Univ Mitra</div>
          </div>

          <div class="glass-panel p-4 rounded-2xl border border-white/10">
            <div class="text-[11px] text-slate-400 font-medium">Developer Track</div>
            <div class="text-2xl font-bold font-display text-amber-400 mt-1">{{ totalDev }}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Smart Contract</div>
          </div>

          <div class="glass-panel p-4 rounded-2xl border border-white/10">
            <div class="text-[11px] text-slate-400 font-medium">Finances Track</div>
            <div class="text-2xl font-bold font-display text-emerald-400 mt-1">{{ totalFin }}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">DeFi & Tokenomics</div>
          </div>

          <div class="glass-panel p-4 rounded-2xl border border-white/10">
            <div class="text-[11px] text-slate-400 font-medium">Marketing Track</div>
            <div class="text-2xl font-bold font-display text-purple-400 mt-1">{{ totalMkt }}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">Community & PR</div>
          </div>
        </div>

        <!-- Search & Filter Controls -->
        <div class="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="relative w-full sm:w-80">
            <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari Nama, NIM, Email, atau Prodi..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 focus:border-gold-400 text-white text-xs outline-none transition"
            />
          </div>

          <div class="flex items-center gap-2.5 w-full sm:w-auto">
            <!-- Filter Track -->
            <select
              v-model="selectedFilterTrack"
              class="px-3 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-slate-200 text-xs outline-none focus:border-gold-400"
            >
              <option value="all">Semua Track</option>
              <option value="developer">Developer</option>
              <option value="finances">Finances</option>
              <option value="marketing">Marketing</option>
            </select>

            <!-- Filter Branch -->
            <select
              v-model="selectedFilterBranch"
              class="px-3 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-slate-200 text-xs outline-none focus:border-gold-400"
            >
              <option value="all">Semua Kampus</option>
              <option value="Meruya">Meruya</option>
              <option value="Menteng">Menteng</option>
              <option value="Warung Buncit">Warung Buncit</option>
              <option value="Cipayung">Cipayung</option>
              <option value="other">Luar UMB</option>
            </select>
          </div>
        </div>

        <!-- Main Applicants Data Table -->
        <div class="glass-panel rounded-2xl border border-gold-400/20 overflow-hidden shadow-2xl">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-obsidian-900/90 text-slate-300 uppercase font-mono tracking-wider border-b border-white/10">
                <tr>
                  <th class="px-4 py-3.5">ID / Waktu</th>
                  <th class="px-4 py-3.5">Nama & NIM</th>
                  <th class="px-4 py-3.5">Universitas & Cabang</th>
                  <th class="px-4 py-3.5">Fakultas & Prodi</th>
                  <th class="px-4 py-3.5">Kontak</th>
                  <th class="px-4 py-3.5">Track Minat</th>
                  <th class="px-4 py-3.5">Bukti Follow</th>
                  <th class="px-4 py-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5 text-slate-300">
                <tr
                  v-for="item in filteredApplicants"
                  :key="item.id"
                  class="hover:bg-white/5 transition-colors"
                >
                  <td class="px-4 py-3.5 font-mono">
                    <div class="text-gold-300 font-bold">{{ item.id }}</div>
                    <div class="text-[10px] text-slate-500">{{ new Date(item.createdAt).toLocaleDateString('id-ID') }}</div>
                  </td>

                  <td class="px-4 py-3.5">
                    <div class="font-semibold text-white text-sm">{{ item.fullName }}</div>
                    <div class="text-[11px] text-slate-400 font-mono">NIM: {{ item.nim }} • {{ item.birthDate }}</div>
                  </td>

                  <td class="px-4 py-3.5">
                    <div class="font-medium text-slate-200">
                      {{ item.universityType === 'mercubuana' ? 'UMB' : item.universityName }}
                    </div>
                    <div class="text-[11px] text-gold-400/90">
                      {{ item.universityType === 'mercubuana' ? item.campusBranch : 'Luar Kampus' }}
                    </div>
                  </td>

                  <td class="px-4 py-3.5">
                    <div class="text-slate-200">{{ item.major }}</div>
                    <div class="text-[11px] text-slate-400">{{ item.faculty }} ({{ item.cohortYear }})</div>
                  </td>

                  <td class="px-4 py-3.5">
                    <div class="text-slate-200">{{ item.email }}</div>
                    <div class="text-[11px] text-emerald-400 font-mono">{{ item.whatsapp }}</div>
                  </td>

                  <td class="px-4 py-3.5">
                    <span
                      :class="[
                        'px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider',
                        item.track === 'developer'
                          ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                          : item.track === 'finances'
                          ? 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30'
                          : 'bg-purple-400/15 text-purple-300 border border-purple-400/30'
                      ]"
                    >
                      {{ item.trackLabel || item.track }}
                    </span>
                  </td>

                  <td class="px-4 py-3.5">
                    <div class="space-y-0.5 text-[10px]">
                      <div class="text-slate-300 flex items-center gap-1">
                        <CheckCircle2 class="w-3 h-3 text-emerald-400" />
                        <span>UBSC: {{ item.proofUbsc?.ig || 'Verified' }}</span>
                      </div>
                      <div class="text-slate-300 flex items-center gap-1">
                        <CheckCircle2 class="w-3 h-3 text-cyan-400" />
                        <span>Explomate: {{ item.proofExplomate?.x || 'Verified' }}</span>
                      </div>
                    </div>
                  </td>

                  <td class="px-4 py-3.5 text-center">
                    <button
                      @click="handleDelete(item.id, item.fullName)"
                      class="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                      title="Hapus data"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                <tr v-if="filteredApplicants.length === 0">
                  <td colspan="8" class="text-center py-12 text-slate-400">
                    Tidak ada data pendaftar yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-4 bg-obsidian-900/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>Menampilkan {{ filteredApplicants.length }} dari {{ totalApplicants }} pendaftar</span>
            <div class="flex items-center gap-3">
              <button
                @click="isConfigModalOpen = true"
                class="text-xs text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1"
              >
                <Settings class="w-3.5 h-3.5" />
                <span>Pengaturan Google Sheets</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- GOOGLE SHEETS CONFIG MODAL -->
    <div
      v-if="isConfigModalOpen"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="bg-obsidian-900 border border-gold-400/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <Table class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-display font-bold text-xl text-white">
                Pengaturan Realtime Google Sheets
              </h3>
              <p class="text-xs text-slate-400">
                Sambungkan form invitation dengan Google Sheet resmi pengurus UBS
              </p>
            </div>
          </div>
          <button
            @click="isConfigModalOpen = false"
            class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleSaveConfig" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">
              Google Apps Script Webhook URL (POST Endpoint)
            </label>
            <input
              v-model="sheetConfig.webhookUrl"
              type="url"
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              class="w-full px-4 py-2.5 rounded-xl bg-obsidian-800 border border-white/10 focus:border-gold-400 text-white text-xs outline-none transition font-mono"
            />
            <p class="text-[11px] text-slate-400 mt-1">
              URL Web App dari Google Apps Script yang menerima data pendaftar otomatis.
            </p>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1.5">
              Tautan Live Google Sheets Komunitas (View / Edit Link)
            </label>
            <input
              v-model="sheetConfig.liveSheetUrl"
              type="url"
              placeholder="https://docs.google.com/spreadsheets/d/.../edit"
              class="w-full px-4 py-2.5 rounded-xl bg-obsidian-800 border border-white/10 focus:border-gold-400 text-white text-xs outline-none transition font-mono"
            />
            <p class="text-[11px] text-slate-400 mt-1">
              Link spreadsheet Google Sheets agar petinggi grup bisa langsung membukanya dalam 1 klik.
            </p>
          </div>

          <!-- Quick Script Snippet Copy Card -->
          <div class="p-4 rounded-xl bg-obsidian-950 border border-gold-400/20 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-gold-300 flex items-center gap-1.5">
                <FileSpreadsheet class="w-4 h-4" />
                <span>Script Google Sheets (Siap Copy)</span>
              </span>
              <button
                type="button"
                @click="copyAppsScriptGuide"
                class="px-3 py-1 rounded-lg text-xs font-medium text-obsidian-950 bg-gold-400 hover:bg-gold-300 transition flex items-center gap-1"
              >
                <Check v-if="isCopiedScript" class="w-3.5 h-3.5" />
                <Copy v-else class="w-3.5 h-3.5" />
                <span>{{ isCopiedScript ? 'Tersalin!' : 'Copy Script' }}</span>
              </button>
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed">
              1. Buka Google Sheets > Extensions > Apps Script > Paste script di atas.<br />
              2. Klik Deploy > New Deployment > Type: Web app (Who has access: Anyone).<br />
              3. Copy URL Web App-nya dan masukkan ke kolom input di atas!
            </p>
          </div>

          <div v-if="configSaveMessage" class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-400" />
            <span>{{ configSaveMessage }}</span>
          </div>

          <div class="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              @click="isConfigModalOpen = false"
              class="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5 transition"
            >
              Tutup
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl text-xs font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition"
            >
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
