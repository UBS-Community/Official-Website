<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { navLinks } from '@/data/navigation'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-vue-next'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose
} from 'radix-vue'

const emit = defineEmits(['open-join'])
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleJoinClick = () => {
  closeMobileMenu()
  emit('open-join')
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-obsidian-950/85 backdrop-blur-md border-b border-gold-400/20 py-3 shadow-lg shadow-black/40'
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Brand Logo -->
        <a href="#home" class="flex items-center gap-3 group">
          <div class="relative w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105 group-hover:border-gold-400/70 group-hover:shadow-gold-glow">
            <img
              src="@/assets/logo/ubs-logo.png"
              alt="UMB Blockchain Society Logo"
              class="w-full h-full object-contain"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
            />
            <span class="hidden text-gold-400 font-bold font-display text-sm">UBS</span>
          </div>
          <div class="flex flex-col">
            <span class="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-gold-300 transition-colors">
              UMB Blockchain Society
            </span>
            <span class="text-[10px] tracking-wider uppercase text-gold-400/80 font-medium">
              Universitas Mercu Buana
            </span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1 lg:gap-2">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-gold-300 hover:bg-gold-400/10 rounded-lg transition-all duration-200"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Action CTA (Desktop) -->
        <div class="hidden md:flex items-center gap-3">
          <button
            @click="emit('open-join')"
            class="relative group overflow-hidden px-4 py-2 rounded-xl text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 shadow-gold-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            <Sparkles class="w-4 h-4 text-obsidian-950/80" />
            <span>Join Guild</span>
          </button>
        </div>

        <!-- Mobile Menu (Radix Dialog) -->
        <div class="md:hidden">
          <DialogRoot v-model:open="isMobileMenuOpen">
            <DialogTrigger
              class="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-gold-400/10 border border-transparent hover:border-gold-400/30 transition"
              aria-label="Open menu"
            >
              <Menu class="w-6 h-6 text-gold-400" />
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity" />
              <DialogContent class="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-obsidian-900 border-l border-gold-400/20 p-6 flex flex-col justify-between shadow-2xl">
                <div>
                  <div class="flex items-center justify-between pb-6 border-b border-white/10">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center p-1">
                        <img src="@/assets/logo/ubs-logo.png" alt="UBS" class="w-full h-full object-contain" />
                      </div>
                      <span class="font-display font-bold text-white text-base">UBS Guild</span>
                    </div>
                    <DialogClose class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition">
                      <X class="w-5 h-5" />
                    </DialogClose>
                  </div>

                  <div class="flex flex-col gap-2 mt-6">
                    <a
                      v-for="link in navLinks"
                      :key="link.name"
                      :href="link.href"
                      @click="closeMobileMenu"
                      class="px-4 py-2.5 text-base font-medium text-slate-200 hover:text-gold-400 hover:bg-gold-400/10 rounded-xl transition"
                    >
                      {{ link.name }}
                    </a>
                  </div>
                </div>

                <div class="pt-6 border-t border-white/10 flex flex-col gap-3">
                  <button
                    @click="handleJoinClick"
                    class="w-full py-3 rounded-xl text-sm font-semibold text-obsidian-950 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <span>Join Guild Now</span>
                    <ArrowRight class="w-4 h-4" />
                  </button>
                  <p class="text-xs text-center text-slate-400">
                    Open to all Universitas Mercu Buana students
                  </p>
                </div>
              </DialogContent>
            </DialogPortal>
          </DialogRoot>
        </div>
      </div>
    </div>
  </header>
</template>
