<script setup>
import { ref } from 'vue'
import { socialLinks } from '@/data/socials'
import SocialIcon from '@/components/SocialIcon.vue'
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  ExternalLink
} from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  major: '',
  message: ''
})

const isSubmitted = ref(false)
const isSubmitting = ref(false)

const handleSubmit = () => {
  if (!form.value.name || !form.value.email || !form.value.message) return
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    setTimeout(() => {
      form.value = { name: '', email: '', major: '', message: '' }
      isSubmitted.value = false
    }, 4000)
  }, 700)
}
</script>

<template>
  <section id="contact" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Left: Join Community Info & Socials -->
        <div class="lg:col-span-5 space-y-8">
          <div>
            <span class="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20">
              Connect & Transact
            </span>
            <h2 class="mt-4 font-display font-bold text-3xl sm:text-4xl text-white">
              Ready to BUIDL with <span class="gold-gradient-text">UBS</span>?
            </h2>
            <p class="mt-4 text-slate-300 text-base leading-relaxed">
              Join the vanguard of Web3 builders at Universitas Mercu Buana. Whether you are a first-year student or senior researcher, your journey starts on-chain with us.
            </p>
          </div>

          <!-- Prominent WhatsApp Join Card -->
          <div class="rounded-2xl p-0.5 bg-gradient-to-r from-emerald-500/40 via-gold-400/40 to-emerald-500/40 shadow-gold-glow">
            <div class="bg-obsidian-900 rounded-[15px] p-5">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <SocialIcon name="WhatsApp" class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="font-display font-bold text-white text-sm">Official WhatsApp Guild</h4>
                  <p class="text-xs text-emerald-400/90 font-medium">Instant Community Access</p>
                </div>
              </div>
              <p class="text-xs text-slate-300 mb-4 leading-relaxed">
                Connect directly with fellow students, get instant event announcements, and join discussion groups.
              </p>
              <a
                href="https://chat.whatsapp.com/FMT3wj7dTAHBW5AatcT4tv"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-obsidian-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
              >
                <span>Join WhatsApp Group</span>
                <ExternalLink class="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <!-- Contact Details -->
          <div class="space-y-4">
            <div class="glass-panel p-4 rounded-xl flex items-center gap-4">
              <div class="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <div class="text-xs text-slate-400">HQ Campus Location</div>
                <div class="text-sm font-medium text-white">Universitas Mercu Buana, West Jakarta</div>
              </div>
            </div>

            <div class="glass-panel p-4 rounded-xl flex items-center gap-4">
              <div class="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
                <Mail class="w-5 h-5" />
              </div>
              <div>
                <div class="text-xs text-slate-400">Official Protocol Inquiries</div>
                <div class="text-sm font-medium text-white">contact@umbblockchainsociety.org</div>
              </div>
            </div>
          </div>

          <!-- Social Media Grid -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-gold-300 mb-3">
              Official Media Channels & Socials
            </h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="glass-panel p-3 rounded-xl flex items-center justify-between text-slate-300 hover:text-white hover:border-gold-400/40 hover:bg-gold-400/5 transition group"
              >
                <div class="flex items-center gap-2">
                  <SocialIcon :name="social.icon" class="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
                  <span class="text-xs font-medium truncate max-w-[85px] sm:max-w-none">{{ social.name }}</span>
                </div>
                <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 group-hover:text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Interactive Contact Form -->
        <div class="lg:col-span-7">
          <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-gold-400/30 shadow-2xl relative overflow-hidden">
            <h3 class="font-display font-bold text-2xl text-white mb-2">
              Transmit a Message
            </h3>
            <p class="text-slate-300 text-sm mb-8">
              Pitch an event partnership, propose a hackathon collaboration, or inquire about guild onboarding below.
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-300 mb-1.5">Full Name *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="e.g. Satoshi Nakamoto"
                    class="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-white text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-300 mb-1.5">Email Address *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="name@student.mercubuana.ac.id"
                    class="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-white text-sm outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Faculty / Major / Entity (Optional)</label>
                <input
                  v-model="form.major"
                  type="text"
                  placeholder="e.g. Computer Science / Business Management"
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-white text-sm outline-none transition"
                />
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1.5">Message / Proposal *</label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  required
                  placeholder="Tell us what you're BUIDLing or what you'd like to collaborate on..."
                  class="w-full px-4 py-3 rounded-xl bg-obsidian-900/90 border border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-white text-sm outline-none transition resize-none"
                />
              </div>

              <div v-if="isSubmitted" class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                <CheckCircle class="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Transaction confirmed! Your message has been routed to the UBS council. We'll reach out shortly. GM!</span>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3.5 rounded-xl font-semibold text-sm text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span v-if="isSubmitting">Broadcasting to Node...</span>
                <template v-else>
                  <span>Broadcast Message</span>
                  <Send class="w-4 h-4" />
                </template>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
