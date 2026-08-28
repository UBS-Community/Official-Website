<script setup>
import { teamMembers } from '@/data/team'
import { Linkedin, Twitter, Github, Instagram, Shield } from 'lucide-vue-next'

const getTeamImage = (filename) => {
  try {
    return new URL(`../assets/team/${filename}`, import.meta.url).href
  } catch (e) {
    return null
  }
}

const onImageError = (event) => {
  event.target.style.display = 'none'
  if (event.target.nextElementSibling) {
    event.target.nextElementSibling.style.display = 'flex'
  }
}
</script>

<template>
  <section id="team" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20">
          Core Guild Leadership
        </span>
        <h2 class="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
          The Core <span class="gold-gradient-text">Guild Council</span>
        </h2>
        <p class="mt-4 text-slate-300 text-base sm:text-lg">
          Driving curriculum architecture, protocol research, narrative engineering, and community operations at UMB Blockchain Society.
        </p>
      </div>

      <!-- Team Grid (4 Leaders) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="member in teamMembers"
          :key="member.id"
          class="glass-panel glass-panel-hover p-6 rounded-2xl border border-gold-400/20 flex flex-col items-center text-center group relative overflow-hidden"
        >
          <!-- Top Accent Light -->
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl group-hover:bg-gold-400/25 transition-all duration-300 pointer-events-none" />

          <!-- Avatar with Gold Ring -->
          <div class="relative w-28 h-28 mb-5 rounded-full p-1 bg-gradient-to-tr from-gold-500 via-gold-300 to-gold-600 shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
            <div class="w-full h-full rounded-full overflow-hidden bg-obsidian-900 flex items-center justify-center relative">
              <img
                :src="getTeamImage(member.imageFile)"
                :alt="member.fullName"
                class="w-full h-full object-cover"
                @error="onImageError"
              />
              <!-- Initial Fallback Avatar -->
              <div class="hidden absolute inset-0 bg-gradient-to-b from-obsidian-800 to-obsidian-900 flex-col items-center justify-center text-gold-400 font-display font-bold text-2xl tracking-wider">
                {{ member.initials }}
              </div>
            </div>
          </div>

          <!-- Position Badge -->
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold mb-3">
            <Shield class="w-3 h-3 text-gold-400" />
            <span>{{ member.roleShort }}</span>
          </div>

          <!-- Name & Alias -->
          <h3 class="font-display font-bold text-lg text-white group-hover:text-gold-200 transition-colors">
            {{ member.alias }}
          </h3>
          <p class="text-xs text-slate-400 font-medium mb-3">
            {{ member.fullName && member.fullName !== member.alias ? `(${member.fullName})` : member.role }}
          </p>

          <!-- Bio -->
          <p class="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-6">
            {{ member.bio }}
          </p>

          <!-- Social Links -->
          <div class="mt-auto pt-4 border-t border-white/5 w-full flex items-center justify-center gap-3">
            <a
              v-if="member.socials.linkedin"
              :href="member.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold-400/20 text-slate-400 hover:text-gold-300 flex items-center justify-center transition"
              :aria-label="`${member.alias} LinkedIn`"
            >
              <Linkedin class="w-4 h-4" />
            </a>
            <a
              v-if="member.socials.twitter"
              :href="member.socials.twitter"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold-400/20 text-slate-400 hover:text-gold-300 flex items-center justify-center transition"
              :aria-label="`${member.alias} Twitter`"
            >
              <Twitter class="w-4 h-4" />
            </a>
            <a
              v-if="member.socials.github"
              :href="member.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold-400/20 text-slate-400 hover:text-gold-300 flex items-center justify-center transition"
              :aria-label="`${member.alias} GitHub`"
            >
              <Github class="w-4 h-4" />
            </a>
            <a
              v-if="member.socials.instagram"
              :href="member.socials.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold-400/20 text-slate-400 hover:text-gold-300 flex items-center justify-center transition"
              :aria-label="`${member.alias} Instagram`"
            >
              <Instagram class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
