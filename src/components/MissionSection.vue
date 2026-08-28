<script setup>
import { missions } from '@/data/missions'
import {
  Layers,
  Users,
  Network,
  Briefcase,
  Compass,
  Sparkles
} from 'lucide-vue-next'

const iconMap = {
  Layers,
  Users,
  Network,
  Briefcase,
  Compass,
  Sparkles
}
</script>

<template>
  <section id="vision-mission" class="py-20 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20">
          6 Strategic Pillars
        </span>
        <h2 class="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
          Our Core <span class="gold-gradient-text">Guild Missions</span>
        </h2>
        <p class="mt-4 text-slate-300 text-base sm:text-lg">
          The tactical roadmap for building an open, high-velocity, and impactful Web3 ecosystem across Universitas Mercu Buana.
        </p>
      </div>

      <!-- Missions Grid (6 Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="mission in missions"
          :key="mission.id"
          class="glass-panel glass-panel-hover p-7 rounded-2xl border border-white/10 flex flex-col justify-between group relative overflow-hidden"
        >
          <!-- Top Card Glow -->
          <div class="absolute -top-10 -right-10 w-24 h-24 bg-gold-400/10 rounded-full blur-xl group-hover:bg-gold-400/20 transition-all duration-300 pointer-events-none" />

          <div>
            <div class="flex items-center justify-between mb-5">
              <div class="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-400/20 transition-all duration-300">
                <component :is="iconMap[mission.icon] || Sparkles" class="w-6 h-6" />
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-gold-400/10 text-gold-300 border border-gold-400/20">
                Pillar #0{{ mission.id }}
              </span>
            </div>

            <h3 class="font-display font-bold text-lg text-white group-hover:text-gold-200 transition-colors mb-3 leading-snug">
              {{ mission.title }}
            </h3>

            <p class="text-sm text-slate-300 leading-relaxed">
              {{ mission.description }}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span class="text-gold-400/90 font-medium">{{ mission.tag }}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-gold-400/50 group-hover:bg-gold-400 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
