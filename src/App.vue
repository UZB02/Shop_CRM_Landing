<template>
  <div class="min-h-screen theme-transition bg-mesh">
    <Navbar 
      :nav-links="navLinks" 
      :is-dark="isDark" 
      :is-menu-open="isMenuOpen"
      @toggle-theme="toggleTheme" 
      @toggle-lang="toggleLang" 
      @toggle-menu="isMenuOpen = !isMenuOpen"
      @scroll-to-top="scrollToTop"
      @go-to-crm="goToCRM"
    />

    <main>
      <Hero :stats="stats" @start="goToCRM" />
      <Features :features="features" />
      <Pricing :plans="plans" :loading="loading" @buy="handleBuy" />
      <Testimonials :testimonials="testimonials" :loading="loading" />
      <FAQ :faqs="faqs" :loading="loading" />
      <Contact />
    </main>

    <Footer :nav-links="navLinks" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

// Components
import Navbar from '@/components/layout/Navbar.vue'
import Hero from '@/components/landing/Hero.vue'
import Features from '@/components/landing/Features.vue'
import Pricing from '@/components/landing/Pricing.vue'
import Testimonials from '@/components/landing/Testimonials.vue'
import FAQ from '@/components/landing/FAQ.vue'
import Contact from '@/components/landing/Contact.vue'
import Footer from '@/components/layout/Footer.vue'

// Composables
import { useTheme } from '@/composables/useTheme'
import { useLandingData } from '@/composables/useLandingData'

const { locale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const { navLinks, features, plans, stats, testimonials, faqs, loading, fetchData } = useLandingData()

// CRM Config
const CRM_LOGIN_URL = 'https://app.shop-searem.uz/login'

// State
const isMenuOpen = ref(false)

onMounted(() => {
  fetchData()

  // Scroll Reveal Logic
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        observer.unobserve(entry.target) // Optimize: Stop observing once revealed
      }
    })
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters view
  })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

const toggleLang = () => {
  locale.value = locale.value === 'uz' ? 'uz_cy' : 'uz'
  localStorage.setItem('lang', locale.value)
}

const handleBuy = (plan) => {
  localStorage.setItem('selectedPlan', JSON.stringify(plan))
  window.location.href = CRM_LOGIN_URL
}

const goToCRM = () => {
  window.location.href = CRM_LOGIN_URL
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>
/* Global animatsiyalar va scrollbarlar */
@keyframes theme-icon-rotate {
  from { transform: rotate(-90deg) scale(0); opacity: 0; }
  to { transform: rotate(0) scale(1); opacity: 1; }
}

.theme-icon-rotate-enter-active {
  animation: theme-icon-rotate 0.3s ease;
}

.theme-icon-rotate-leave-active {
  animation: theme-icon-rotate 0.3s ease reverse;
}
</style>
