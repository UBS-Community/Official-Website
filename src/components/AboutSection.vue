<script setup>
import { CheckCircle2, TrendingUp, Cpu, Lightbulb, Users2 } from 'lucide-vue-next'

const pillars = [
  {
    icon: Lightbulb,
    title: 'Fundamental Mastery',
    desc: 'Deconstructing decentralization, consensus engines, cryptographic primitives, and smart contracts from zero to production.'
  },
  {
    icon: TrendingUp,
    title: 'DeFi & Economic Models',
    desc: 'Analyzing tokenomics, algorithmic market makers, on-chain liquidity, digital ownership, and next-gen financial primitives.'
  },
  {
    icon: Users2,
    title: 'Cross-Disciplinary Synergy',
    desc: 'Connecting developers, business strategists, accountants, UI/UX designers, communication specialists, and legal scholars in one guild.'
  },
  {
    icon: Cpu,
    title: 'Venture & Hackathon Ready',
    desc: 'Equipping students with real-world skills to compete in global hackathons, secure ecosystem grants, and launch venture-backed dApps.'
  }
]
</script>

<template>
  <section id="about" class="py-24 relative overflow-hidden">
    <!-- Subtle Background Glow -->
    <div class="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-gold-400/5 blur-[120px] rounded-full" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20">
          About The Society
        </span>
        <h2 class="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
          The On-Chain Gateway to <span class="gold-gradient-text">Web3 Innovation</span>
        </h2>
        <p class="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
          UMB Blockchain Society (UBS) is the premier student-led hub bridging fundamental blockchain science with exponential business opportunities, decentralized finance, and cutting-edge digital engineering at Universitas Mercu Buana.
        </p>
      </div>

      <!-- Main Narrative & Pillars Grid -->
      <div class="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Left Side: Narrative Card -->
        <div class="lg:col-span-5 glass-panel p-8 rounded-2xl relative overflow-hidden border border-gold-400/25">
          <div class="absolute -right-12 -top-12 w-40 h-40 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <h3 class="font-display font-bold text-2xl text-white mb-4">
            Why BUIDL with UBS?
          </h3>
          <p class="text-slate-300 leading-relaxed mb-6">
            Web3 extends far beyond lines of code. It represents an interdisciplinary ecosystem uniting token incentives, game theory, decentralized governance, and regulatory engineering.
          </p>
          <div class="space-y-3.5">
            <div class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <span class="text-sm text-slate-200">Zero-gas, beginner-friendly learning with supportive community mentors</span>
            </div>
            <div class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <span class="text-sm text-slate-200">High-signal curriculum tailored for both tech & non-tech backgrounds</span>
            </div>
            <div class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <span class="text-sm text-slate-200">Direct networking with tier-1 Web3 founders, protocols, and VC funds</span>
            </div>
            <div class="flex items-start gap-3">
              <CheckCircle2 class="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <span class="text-sm text-slate-200">Collaborative hacker house sprints and global hackathon sponsorships</span>
            </div>
          </div>
        </div>

        <!-- Right Side: 4 Value Cards -->
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="(pillar, index) in pillars"
            :key="index"
            class="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-4">
                <component :is="pillar.icon" class="w-6 h-6" />
              </div>
              <h4 class="font-display font-bold text-lg text-white mb-2">
                {{ pillar.title }}
              </h4>
              <p class="text-sm text-slate-300 leading-relaxed">
                {{ pillar.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
