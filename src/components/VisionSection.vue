<script setup>
import { Eye, Quote, Sparkles } from 'lucide-vue-next'
</script>

<template>
  <section id="vision" class="py-16 relative">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Glow Container -->
      <div class="relative rounded-3xl p-1 bg-gradient-to-r from-gold-500/40 via-gold-400/20 to-gold-600/40 shadow-gold-glow">
        <div class="bg-obsidian-900/95 backdrop-blur-xl rounded-[22px] p-8 sm:p-12 relative overflow-hidden">
          <!-- Ambient Watermark Icon -->
          <Eye class="absolute -right-6 -bottom-6 w-48 h-48 text-gold-400/5 pointer-events-none" />

          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
              <Sparkles class="w-5 h-5" />
            </div>
            <span class="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Official Vision Statement
            </span>
          </div>

          <div class="relative">
            <Quote class="w-10 h-10 text-gold-400/30 mb-2 rotate-180" />
            <blockquote class="font-display text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed sm:leading-snug tracking-tight">
              “To be the premier blockchain learning and collaboration guild at <span class="gold-gradient-text font-bold">Universitas Mercu Buana</span>, building foundational competence, fostering cross-disciplinary talent, and accelerating the creation of impactful decentralized technologies for society and global industry.”
            </blockquote>
          </div>

          <div class="mt-8 pt-6 border-t border-gold-400/15 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-gold-400" />
              <span>Long-Term Guild Commitment | UMB Blockchain Society</span>
            </div>
            <div class="text-gold-300 font-medium">
              Education • Multi-Disciplinary • Industry Impact • WAGMI
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
