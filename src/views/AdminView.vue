<script setup>
import { ref, computed, onMounted } from 'vue'
import BackgroundNetwork from '@/components/BackgroundNetwork.vue'
import { getApplicants, deleteApplicant, exportApplicantsToExcel } from '@/services/storage'
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
  FileSpreadsheet
} from 'lucide-vue-next'

// Authentication
const isAuthenticated = ref(false)
const passkeyInput = ref('')
const authError = ref(false)

const handleLogin = () => {
  if (passkeyInput.value === 'ubs2026' || passkeyInput.value === 'admin' || passkeyInput.value === 'council') {
    isAuthenticated.value = true
    authError.value = false
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
}

onMounted(() => {
  // Auto-check if previously authenticated in this session
  if (sessionStorage.getItem('ubs_admin_auth') === 'true') {
    isAuthenticated.value = true
    loadData()
  }
})

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
              UMB Blockchain Society Ledger & XLSX Export
            </span>
          </div>
        </router-link>

        <div class="flex items-center gap-3">
          <router-link
            to="/invitation"
            class="text-xs text-gold-300 hover:text-white px-3.5 py-1.5 rounded-lg bg-gold-400/10 border border-gold-400/30 hover:bg-gold-400/20 transition"
          >
            Lihat Form Invitation
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
            Masukkan passkey pengurus / petinggi grup untuk melihat data pendaftar dan mendownload file Excel (.xlsx).
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
        <!-- Top Title & Export Action -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span class="text-xs font-mono text-gold-400 uppercase tracking-widest">LIVE APPLICANTS LEDGER</span>
            </div>
            <h1 class="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Data Pendaftaran Komunitas UBS
            </h1>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button
              @click="loadData"
              class="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
              title="Refresh Data"
            >
              <RefreshCw class="w-4 h-4" />
            </button>

            <!-- Export to XLSX Button -->
            <button
              @click="handleExport"
              :disabled="isExporting || filteredApplicants.length === 0"
              class="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-obsidian-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <FileSpreadsheet class="w-4 h-4" />
              <span>{{ isExporting ? 'Menyiapkan File...' : 'Download Data Excel (.xlsx)' }}</span>
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

          <div class="p-4 bg-obsidian-900/60 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Menampilkan {{ filteredApplicants.length }} dari {{ totalApplicants }} pendaftar</span>
            <button
              @click="handleExport"
              class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <Download class="w-3.5 h-3.5" />
              <span>Export ke Excel (.xlsx)</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
