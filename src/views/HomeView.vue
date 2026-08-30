<script setup>
import BackgroundNetwork from '@/components/BackgroundNetwork.vue'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import VisionSection from '@/components/VisionSection.vue'
import MissionSection from '@/components/MissionSection.vue'
import ProgramSection from '@/components/ProgramSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen bg-obsidian-950 text-slate-100 relative selection:bg-gold-400 selection:text-obsidian-950">
    <!-- Global Interactive Gold Canvas Network Background (Spans Entire Page) -->
    <BackgroundNetwork />

    <!-- Navbar -->
    <NavBar />

    <main class="relative z-10">
      <!-- Hero Section -->
      <HeroSection />

      <!-- About Section -->
      <AboutSection />

      <!-- Vision Statement -->
      <VisionSection />

      <!-- 6 Core Missions -->
      <MissionSection />

      <!-- Programs & Incubation -->
      <ProgramSection />

      <!-- Core Team / Governance -->
      <TeamSection />

      <!-- Contact / Join Guild -->
      <ContactSection />
    </main>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>
