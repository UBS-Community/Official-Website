<script setup>
import { navLinks } from '@/data/navigation'
import { socialLinks } from '@/data/socials'
import SocialIcon from '@/components/SocialIcon.vue'
import { ArrowUp } from 'lucide-vue-next'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative bg-obsidian-950 pt-16 pb-12 overflow-hidden">
    <!-- Top Gold Gradient Divider Line -->
    <div class="gold-divider mb-16" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
        <!-- Brand Info (2 cols) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center p-1.5 shadow-gold-glow">
              <img
                src="@/assets/logo/ubs-logo.png"
                alt="UBS Logo"
                class="w-full h-full object-contain"
                onerror="this.style.display='none'"
              />
            </div>
            <div>
              <span class="font-display font-bold text-lg text-white block">UMB Blockchain Society</span>
              <span class="text-[11px] text-gold-400 font-medium uppercase tracking-wider">Universitas Mercu Buana</span>
            </div>
          </div>
          <p class="text-sm text-slate-400 max-w-sm leading-relaxed">
            The cross-faculty student guild at Universitas Mercu Buana dedicated to blockchain education, smart contract research, and Web3 builder incubation.
          </p>
          <div class="flex items-center flex-wrap gap-2 pt-2">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold-400/20 text-slate-400 hover:text-gold-300 flex items-center justify-center transition"
              :title="social.name"
            >
              <SocialIcon :name="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider text-gold-400">
            Quick Navigation
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.href"
                class="text-slate-400 hover:text-gold-300 transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Focus Areas -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider text-gold-400">
            Guild Pillars
          </h4>
          <ul class="space-y-2.5 text-sm text-slate-400">
            <li>Blockchain Fundamentals</li>
            <li>Smart Contracts & DApps</li>
            <li>DeFi & Tokenomics</li>
            <li>Cross-Discipline Research</li>
            <li>Venture & Hacker House</li>
          </ul>
        </div>

        <!-- Location & Campus -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider text-gold-400">
            Guild HQ
          </h4>
          <p class="text-sm text-slate-400 leading-relaxed mb-3">
            Universitas Mercu Buana<br />
            Jl. Meruya Selatan No. 1, Kembangan, West Jakarta 11650
          </p>
          <div class="text-xs text-gold-400/80">
            Indonesia • Global Web3 Network
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © 2026 UMB Blockchain Society. All rights reserved. Powered by the student community.
        </div>

        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            BUIDL with conviction • WAGMI
          </span>
          <button
            @click="scrollToTop"
            class="p-2 rounded-lg bg-white/5 hover:bg-gold-400/20 text-slate-400 hover:text-gold-300 transition border border-white/5"
            title="Back to top"
            aria-label="Scroll to top"
          >
            <ArrowUp class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
