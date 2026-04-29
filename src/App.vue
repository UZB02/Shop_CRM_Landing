<template>
  <div class="min-h-screen bg-cosmic bg-dot-grid theme-transition relative">
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

    <!-- Noise Overlay -->
    <div class="fixed inset-0 pointer-events-none z-50 opacity-[0.025] dark:opacity-[0.04]"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E'); background-size: 128px;">
    </div>

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
      <Hero     :stats="stats"   @start="goToCRM" />
      <Stats    :stats="stats" />
      <Features :features="features" />
      <HowItWorks />
      <Pricing  :plans="plans" :loading="loading" @buy="handleBuy" />
      <Testimonials :testimonials="testimonials" :loading="loading" />
      <FAQ      :faqs="faqs"   :loading="loading" />
      <Contact />
    </main>

    <Footer :nav-links="navLinks" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

// Components
import Navbar       from '@/components/layout/Navbar.vue'
import Hero         from '@/components/landing/Hero.vue'
import Stats        from '@/components/landing/Stats.vue'
import Features     from '@/components/landing/Features.vue'
import HowItWorks   from '@/components/landing/HowItWorks.vue'
import Pricing      from '@/components/landing/Pricing.vue'
import Testimonials from '@/components/landing/Testimonials.vue'
import FAQ          from '@/components/landing/FAQ.vue'
import Contact      from '@/components/landing/Contact.vue'
import Footer       from '@/components/layout/Footer.vue'

// Composables
import { useTheme }       from '@/composables/useTheme'
import { useLandingData } from '@/composables/useLandingData'

const { locale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const { navLinks, features, plans, stats, testimonials, faqs, loading, fetchData } = useLandingData()

const CRM_LOGIN_URL = 'https://app.siriuspos.uz/login'

const isMenuOpen    = ref(false)
const scrollProgress = ref(0)

// ── Scroll progress ──
const updateScrollProgress = () => {
  const scrollTop    = window.scrollY
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

// ── Scroll reveal ──
let revealObserver = null

onMounted(() => {
  fetchData()
  window.addEventListener('scroll', updateScrollProgress, { passive: true })

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el))
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  revealObserver?.disconnect()
})

const toggleLang = () => {
  locale.value = locale.value === 'uz' ? 'uz_cy' : 'uz'
  localStorage.setItem('lang', locale.value)
}

const handleBuy = (plan) => {
  localStorage.setItem('selectedPlan', JSON.stringify(plan))
  window.location.href = CRM_LOGIN_URL
}

const goToCRM = () => { window.location.href = CRM_LOGIN_URL }

const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }
</script>
