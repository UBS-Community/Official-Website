<script setup>
import { ref } from 'vue'
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
import JoinModal from '@/components/JoinModal.vue'

const isJoinModalOpen = ref(false)
const selectedProgramToJoin = ref('')

const openJoinModal = (programName = '') => {
  selectedProgramToJoin.value = typeof programName === 'string' ? programName : ''
  isJoinModalOpen.value = true
}
</script>

<template>
  <div class="min-h-screen bg-obsidian-950 text-slate-100 relative selection:bg-gold-400 selection:text-obsidian-950">
    <!-- Global Interactive Gold Canvas Network Background (Spans Entire Page) -->
    <BackgroundNetwork />

    <!-- Navbar -->
    <NavBar @open-join="openJoinModal" />

    <main class="relative z-10">
      <!-- Hero Section -->
      <HeroSection @open-join="openJoinModal" />

      <!-- About Section -->
      <AboutSection />

      <!-- Vision Statement -->
      <VisionSection />

      <!-- 6 Core Missions -->
      <MissionSection />

      <!-- Programs & Incubation -->
      <ProgramSection @open-join="openJoinModal" />

      <!-- Core Team / Governance -->
      <TeamSection />

      <!-- Contact / Join Guild -->
      <ContactSection />
    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Radix UI Join Modal -->
    <JoinModal
      v-model:open="isJoinModalOpen"
      :default-program="selectedProgramToJoin"
    />
  </div>
</template>
