<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationFrameId = null
let particles = []
let width = 0
let height = 0
let mouse = { x: null, y: null, radius: 160 }

class Particle {
  constructor(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.vx = (Math.random() - 0.5) * 0.6
    this.vy = (Math.random() - 0.5) * 0.6
    this.radius = Math.random() * 1.8 + 1.2
    this.baseAlpha = Math.random() * 0.45 + 0.25
  }

  update(w, h) {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0) this.x = w
    else if (this.x > w) this.x = 0

    if (this.y < 0) this.y = h
    else if (this.y > h) this.y = 0

    // Mouse interactive repulsion/force
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.hypot(dx, dy)
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius
        const directionX = (dx / distance) * force * 2.0
        const directionY = (dy / distance) * force * 2.0
        this.x -= directionX
        this.y -= directionY
      }
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(212, 175, 55, ${this.baseAlpha})`
    ctx.shadowBlur = 10
    ctx.shadowColor = 'rgba(212, 175, 55, 0.7)'
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

const handleResize = () => {
  if (!canvasRef.value) return
  width = canvasRef.value.width = window.innerWidth
  height = canvasRef.value.height = window.innerHeight

  const density = Math.floor((width * height) / 11000)
  const particleCount = Math.min(Math.max(density, 45), 130)

  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(width, height))
  }
}

const handleMouseMove = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const handleMouseLeave = () => {
  mouse.x = null
  mouse.y = null
}

const handleTouchMove = (e) => {
  if (e.touches && e.touches[0]) {
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
  }
}

const animate = () => {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  ctx.clearRect(0, 0, width, height)

  const maxDistance = 140

  // Connect particles with golden cyber web
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.hypot(dx, dy)

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.32
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`
        ctx.lineWidth = 0.9
        ctx.stroke()
      }
    }
  }

  // Connect particles to mouse cursor
  if (mouse.x !== null && mouse.y !== null) {
    for (let i = 0; i < particles.length; i++) {
      const dx = mouse.x - particles[i].x
      const dy = mouse.y - particles[i].y
      const distance = Math.hypot(dx, dy)
      if (distance < mouse.radius) {
        const opacity = (1 - distance / mouse.radius) * 0.45
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = `rgba(251, 248, 238, ${opacity})`
        ctx.lineWidth = 1.1
        ctx.stroke()
      }
    }
  }

  // Draw and update
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(width, height)
    particles[i].draw(ctx)
  }

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('touchmove', handleTouchMove, { passive: true })
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('touchmove', handleTouchMove)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65 transition-opacity duration-1000"
    aria-hidden="true"
  />
</template>
