<script setup>
import { ref } from 'vue'
import { programs } from '@/data/programs'
import {
  GraduationCap,
  Calendar,
  CheckCircle,
  Users,
  ArrowRight,
  Sparkles,
  Info,
  X
} from 'lucide-vue-next'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose
} from 'radix-vue'

const emit = defineEmits(['open-join'])
const selectedProgram = ref(null)
const isModalOpen = ref(false)

const openProgramDetail = (prog) => {
  selectedProgram.value = prog
  isModalOpen.value = true
}

const handleJoinProgram = (prog) => {
  isModalOpen.value = false
  emit('open-join', prog.title)
}
</script>

<template>
  <section id="programs" class="py-24 relative">
    <!-- Glow element -->
    <div class="pointer-events-none absolute top-1/2 right-0 w-96 h-96 bg-gold-400/5 blur-[120px] rounded-full" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20">
          Initiatives & Incubation
        </span>
        <h2 class="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
          Guild Programs & <span class="gold-gradient-text">Web3 Roadmaps</span>
        </h2>
        <p class="mt-4 text-slate-300 text-base sm:text-lg">
          From zero-to-one blockchain literacy to shipping testnet dApps and securing ecosystem grants.
        </p>
      </div>

      <!-- Flagship Program Feature Box (UBS Blockchain Fundamentals) -->
      <div class="relative mb-12 rounded-3xl p-1 bg-gradient-to-r from-gold-400/30 via-gold-500/50 to-gold-400/30 shadow-gold-glow">
        <div class="bg-obsidian-900 rounded-[22px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div class="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <!-- Left Info -->
            <div class="lg:col-span-7">
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <span class="px-3 py-1 rounded-full bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-wider">
                  Genesis Cohort
                </span>
                <span class="px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-medium">
                  Cohort 2026 • Free Access
                </span>
              </div>

              <h3 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
                UBS Blockchain Fundamentals
              </h3>

              <p class="text-slate-300 text-base leading-relaxed mb-6">
                The premier introductory bootcamp engineered for all incoming members of UMB Blockchain Society. Structured from the ground up to ensure students across engineering, business, design, and humanities grasp Web3 with total conviction.
              </p>

              <!-- Quick Highlights -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div class="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle class="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Blockchain Architecture & Smart Contracts</span>
                </div>
                <div class="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle class="w-4 h-4 text-gold-400 shrink-0" />
                  <span>DeFi, NFTs & Digital Asset Tokenomics</span>
                </div>
                <div class="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle class="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Zero Coding / Technical Prerequisites</span>
                </div>
                <div class="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle class="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Interactive Guild Mentorship & POAP Badge</span>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="flex flex-wrap items-center gap-4">
                <button
                  @click="emit('open-join', 'UBS Blockchain Fundamentals')"
                  class="px-6 py-3 rounded-xl font-semibold text-sm text-obsidian-950 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-glow hover:from-gold-200 hover:to-gold-400 transition-all duration-300 flex items-center gap-2"
                >
                  <span>Apply for Cohort</span>
                  <ArrowRight class="w-4 h-4" />
                </button>
                <button
                  @click="openProgramDetail(programs[0])"
                  class="px-6 py-3 rounded-xl font-medium text-sm text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-gold-400/25 transition flex items-center gap-2"
                >
                  <Info class="w-4 h-4 text-gold-400" />
                  <span>View Full Syllabus</span>
                </button>
              </div>
            </div>

            <!-- Right Visual / Summary Box -->
            <div class="lg:col-span-5">
              <div class="glass-panel p-6 sm:p-8 rounded-2xl border border-gold-400/20 flex flex-col gap-5">
                <h4 class="font-display font-semibold text-white text-base border-b border-white/10 pb-3 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-gold-400" />
                  <span>Execution Blueprint</span>
                </h4>
                
                <div class="space-y-4 text-sm">
                  <div class="flex items-start gap-3">
                    <Calendar class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <div class="text-xs text-slate-400">Duration & Format</div>
                      <div class="text-white font-medium">6 Weeks (Hybrid: IRL Campus Meetups & Discord)</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <Users class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <div class="text-xs text-slate-400">Target Cohort</div>
                      <div class="text-white font-medium">All Active Universitas Mercu Buana Students</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <GraduationCap class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <div class="text-xs text-slate-400">Graduate Deliverables</div>
                      <div class="text-white font-medium">SBT Graduation Badge & Direct Access to Builder Lab</div>
                    </div>
                  </div>
                </div>

                <div class="bg-gold-400/10 rounded-xl p-3.5 border border-gold-400/20 text-xs text-gold-300">
                  💡 Graduation from Fundamentals serves as the prerequisite to join UBS Hacker House & Venture Demo Days.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Scalable Programs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="prog in programs.slice(1)"
          :key="prog.id"
          class="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-semibold px-3 py-1 rounded-full bg-gold-400/10 text-gold-300 border border-gold-400/20">
                {{ prog.category }}
              </span>
              <span class="text-xs text-slate-400 font-medium">
                {{ prog.status }}
              </span>
            </div>

            <h3 class="font-display font-bold text-xl text-white mb-3">
              {{ prog.title }}
            </h3>

            <p class="text-sm text-slate-300 leading-relaxed mb-6">
              {{ prog.shortDescription }}
            </p>

            <ul class="space-y-2 mb-6">
              <li
                v-for="(feat, idx) in prog.features.slice(0, 3)"
                :key="idx"
                class="text-xs text-slate-300 flex items-center gap-2"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>

          <div class="pt-4 border-t border-white/10 flex items-center justify-between">
            <span class="text-xs text-slate-400">{{ prog.duration }}</span>
            <button
              @click="openProgramDetail(prog)"
              class="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 group"
            >
              <span>Program Details</span>
              <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Radix UI Dialog for Program Syllabus Detail -->
    <DialogRoot v-model:open="isModalOpen">
      <DialogPortal>
        <DialogOverlay class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity" />
        <DialogContent class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-obsidian-900 border border-gold-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div v-if="selectedProgram" class="space-y-6">
            <div class="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gold-400/10 text-gold-300 border border-gold-400/20">
                  {{ selectedProgram.badge }}
                </span>
                <h3 class="font-display font-bold text-2xl text-white mt-2">
                  {{ selectedProgram.title }}
                </h3>
              </div>
              <DialogClose class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">
                <X class="w-5 h-5" />
              </DialogClose>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
              {{ selectedProgram.fullDescription }}
            </p>

            <div>
              <h4 class="font-display font-semibold text-sm text-gold-300 mb-3 uppercase tracking-wider">
                Curriculum Modules & Deliverables
              </h4>
              <div class="space-y-2.5">
                <div
                  v-for="(item, idx) in selectedProgram.features"
                  :key="idx"
                  class="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5"
                >
                  <CheckCircle class="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span class="text-sm text-slate-200">{{ item }}</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div class="bg-obsidian-800/80 p-3 rounded-xl border border-white/5">
                <div class="text-slate-400">Target Cohort</div>
                <div class="font-medium text-white mt-0.5">{{ selectedProgram.target }}</div>
              </div>
              <div class="bg-obsidian-800/80 p-3 rounded-xl border border-white/5">
                <div class="text-slate-400">Prerequisites</div>
                <div class="font-medium text-white mt-0.5">{{ selectedProgram.prerequisite }}</div>
              </div>
            </div>

            <div class="pt-4 border-t border-white/10 flex justify-end gap-3">
              <DialogClose class="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition">
                Close
              </DialogClose>
              <button
                @click="handleJoinProgram(selectedProgram)"
                class="px-5 py-2.5 rounded-xl text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-glow hover:from-gold-200 hover:to-gold-400 transition"
              >
                Apply for Program
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </section>
</template>
