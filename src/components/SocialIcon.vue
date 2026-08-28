<script setup>
import {
  Instagram,
  Linkedin,
  Twitter,
  MessageSquare,
  Github,
  Send,
  Globe
} from 'lucide-vue-next'

defineProps({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    default: 'w-4 h-4'
  }
})
</script>

<template>
  <!-- WhatsApp Custom SVG Icon -->
  <svg
    v-if="name === 'WhatsApp' || name === 'WhatsApp Community'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="$props.class"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>

  <!-- TikTok Custom SVG Icon -->
  <svg
    v-else-if="name === 'TikTok'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="$props.class"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>

  <!-- Lucide Icon Mappings -->
  <Instagram v-else-if="name === 'Instagram'" :class="$props.class" />
  <Linkedin v-else-if="name === 'Linkedin'" :class="$props.class" />
  <Twitter v-else-if="name === 'Twitter' || name === 'X / Twitter'" :class="$props.class" />
  <MessageSquare v-else-if="name === 'Discord'" :class="$props.class" />
  <Github v-else-if="name === 'Github'" :class="$props.class" />
  <Send v-else-if="name === 'Telegram'" :class="$props.class" />
  <Globe v-else :class="$props.class" />
</template>
