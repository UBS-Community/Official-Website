<script setup>
import { ref } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose
} from 'radix-vue'
import { X, Sparkles, CheckCircle2, Send, ShieldAlert, ExternalLink, ArrowRight } from 'lucide-vue-next'
import SocialIcon from '@/components/SocialIcon.vue'

const props = defineProps({
  open: Boolean,
  defaultProgram: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:open'])

const fullName = ref('')
const email = ref('')
const nim = ref('')
const major = ref('')
const interest = ref('fundamental')
const isSuccess = ref(false)
const isLoading = ref(false)

const handleRegister = () => {
  if (!fullName.value || !email.value || !major.value) return
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isSuccess.value = true
    setTimeout(() => {
      fullName.value = ''
      email.value = ''
      nim.value = ''
      major.value = ''
      isSuccess.value = false
      emit('update:open', false)
    }, 2500)
  }, 700)
}
</script>

<template>
  <DialogRoot :open="open" @update:open="val => emit('update:open', val)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity" />
      <DialogContent class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-obsidian-900 border border-gold-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div class="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
              <Sparkles class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-display font-bold text-xl text-white">
                Join UMB Blockchain Society
              </h3>
              <p class="text-xs text-gold-400">
                Guild Membership Minting • 100% Free / Zero Gas
              </p>
            </div>
          </div>
          <DialogClose class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">
            <X class="w-5 h-5" />
          </DialogClose>
        </div>

        <!-- Direct WhatsApp Community Fast-Track Card -->
        <div class="mb-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-3 text-left w-full sm:w-auto">
            <div class="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <SocialIcon name="WhatsApp" class="w-5 h-5" />
            </div>
            <div>
              <div class="text-xs font-semibold text-white">Join Directly via WhatsApp</div>
              <div class="text-[11px] text-emerald-300">Instant access to student discussions</div>
            </div>
          </div>
          <a
            href="https://chat.whatsapp.com/FMT3wj7dTAHBW5AatcT4tv"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold text-obsidian-950 bg-emerald-400 hover:bg-emerald-300 transition flex items-center justify-center gap-1.5 shrink-0 shadow"
          >
            <span>Open WhatsApp</span>
            <ExternalLink class="w-3.5 h-3.5" />
          </a>
        </div>

        <div v-if="isSuccess" class="py-8 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 class="w-8 h-8" />
          </div>
          <h4 class="font-display font-bold text-xl text-white">
            Welcome to the Guild! 🚀
          </h4>
          <p class="text-sm text-slate-300 max-w-sm mx-auto">
            Your membership is minted on-chain. An invite link to the private Discord alpha channels & onboarding call has been sent to your email.
          </p>
          <div class="pt-2">
            <a
              href="https://chat.whatsapp.com/FMT3wj7dTAHBW5AatcT4tv"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-obsidian-950 bg-emerald-400 hover:bg-emerald-300 transition shadow"
            >
              <SocialIcon name="WhatsApp" class="w-4 h-4" />
              <span>Join WhatsApp Group Now</span>
            </a>
          </div>
        </div>

        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div v-if="defaultProgram" class="bg-gold-400/10 border border-gold-400/25 p-3 rounded-xl text-xs text-gold-300 flex items-center gap-2">
            <Sparkles class="w-4 h-4 shrink-0" />
            <span>Targeting Program: <strong>{{ defaultProgram }}</strong></span>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Full Student Name *</label>
            <input
              v-model="fullName"
              type="text"
              required
              placeholder="e.g. Rayhan Aziel"
              class="w-full px-4 py-2.5 rounded-xl bg-obsidian-800 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Student Email / Gmail *</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="name@student.mercubuana.ac.id"
                class="w-full px-4 py-2.5 rounded-xl bg-obsidian-800 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Student ID (NIM)</label>
              <input
                v-model="nim"
                type="text"
                placeholder="415xxxxxxx"
                class="w-full px-4 py-2.5 rounded-xl bg-obsidian-800 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Major & Faculty *</label>
            <input
              v-model="major"
              type="text"
              required
              placeholder="e.g. Informatics / Business / Visual Communication"
              class="w-full px-4 py-2.5 rounded-xl bg-obsidian-800 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Primary Track / Focus Area</label>
            <select
              v-model="interest"
              class="w-full px-4 py-2.5 rounded-xl bg-obsidian-800 border border-white/10 focus:border-gold-400 text-white text-sm outline-none transition"
            >
              <option value="fundamental">Blockchain Fundamentals & Web3 Literacy</option>
              <option value="development">Smart Contracts & Protocol Development</option>
              <option value="business">DeFi, Tokenomics & Crypto Economics</option>
              <option value="creative">UI/UX Design, Media & Community Growth</option>
            </select>
          </div>

          <div class="p-3 rounded-xl bg-obsidian-950/60 border border-white/5 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldAlert class="w-4 h-4 text-gold-400 shrink-0" />
            <span>100% Free & open to every student at Universitas Mercu Buana.</span>
          </div>

          <div class="pt-3 border-t border-white/10 flex justify-end gap-3">
            <DialogClose class="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white bg-white/5 transition">
              Cancel
            </DialogClose>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-5 py-2.5 rounded-xl text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition flex items-center gap-2 disabled:opacity-50"
            >
              <span v-if="isLoading">Minting...</span>
              <template v-else>
                <span>Confirm Onboarding</span>
                <Send class="w-4 h-4" />
              </template>
            </button>
          </div>
        </form>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
