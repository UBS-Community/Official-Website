<script setup>
import { ArrowRight, BookOpen, ShieldCheck, Zap, Globe, Sparkles, Terminal } from 'lucide-vue-next'

const emit = defineEmits(['open-join'])
</script>

<template>
  <section id="home" class="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
    <!-- Ambient Glow Gradients -->
    <div class="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-gold-400/10 blur-[140px] rounded-full" />
    <div class="pointer-events-none absolute top-1/3 right-10 w-[380px] h-[380px] bg-amber-600/10 blur-[130px] rounded-full" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Modern Tech / Crypto Badge (No AI slop pill, no em dash) -->
      <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-obsidian-900/90 border border-gold-400/30 text-xs font-mono mb-8 backdrop-blur-xl shadow-gold-glow">
        <span class="flex items-center gap-1 text-gold-400 font-semibold uppercase tracking-wider text-[11px]">
          <Terminal class="w-3.5 h-3.5" />
          GENESIS // 2026
        </span>
        <span class="text-slate-500 font-sans">/</span>
        <span class="text-slate-200 tracking-tight font-sans">
          Universitas Mercu Buana Web3 Guild
        </span>
        <span class="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-gold-400/15 text-gold-300 border border-gold-400/25 uppercase font-mono">
          Mainnet Live
        </span>
      </div>

      <!-- Main Headline -->
      <h1 class="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
        BUIDLing the Decentralized Future with
        <span class="block mt-2 gold-gradient-text">
          UMB Blockchain Society
        </span>
      </h1>

      <!-- Paraphrased Sub-tagline (Clean, no em-dash, crypto native) -->
      <p class="mt-6 max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
        The premier cross-faculty Web3 student guild at Universitas Mercu Buana. Learn blockchain mechanics, tokenomics, and smart contracts from ground zero. <span class="text-gold-300 font-medium">Open to all majors with zero coding experience required.</span>
      </p>

      <!-- Action Buttons -->
      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          @click="emit('open-join')"
          class="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <Sparkles class="w-5 h-5 text-obsidian-950/80" />
          <span>Join the Guild</span>
          <ArrowRight class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <a
          href="#about"
          class="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-base text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-gold-400/25 hover:border-gold-400/50 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
        >
          <BookOpen class="w-5 h-5 text-gold-400" />
          <span>Explore Curriculum</span>
        </a>
      </div>

      <!-- Highlight Badges Grid -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-8 border-t border-gold-400/15">
        <div class="glass-panel p-3.5 rounded-xl text-left flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
            <Globe class="w-5 h-5" />
          </div>
          <div>
            <div class="text-xs text-slate-400">Membership</div>
            <div class="text-sm font-semibold text-white">All Faculties Welcome</div>
          </div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl text-left flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
            <ShieldCheck class="w-5 h-5" />
          </div>
          <div>
            <div class="text-xs text-slate-400">Prerequisites</div>
            <div class="text-sm font-semibold text-white">Zero Coding Required</div>
          </div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl text-left flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
            <Zap class="w-5 h-5" />
          </div>
          <div>
            <div class="text-xs text-slate-400">Curriculum</div>
            <div class="text-sm font-semibold text-white">Core Web3 Alpha</div>
          </div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl text-left flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
            <Sparkles class="w-5 h-5" />
          </div>
          <div>
            <div class="text-xs text-slate-400">Ecosystem</div>
            <div class="text-sm font-semibold text-white">BUIDL & Ship dApps</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
