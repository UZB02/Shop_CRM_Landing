<template>
  <div class="min-h-screen bg-cosmic bg-dot-grid theme-transition relative">
    <!-- Scroll Progress Bar -->
    <div v-if="!isReferral && !isAgentLink" class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

    <!-- Noise Overlay -->
    <div class="fixed inset-0 pointer-events-none z-50 opacity-[0.025] dark:opacity-[0.04]"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E'); background-size: 128px;">
    </div>

    <!-- REFERRAL LANDING SUBPAGE -->
    <div v-if="isReferral" class="w-full">
      <ReferralLanding :code="referralCode" />
    </div>

    <!-- AGENT LINK LANDING SUBPAGE -->
    <div v-else-if="isAgentLink" class="w-full">
      <AgentLanding :code="agentCode" />
    </div>

    <!-- STANDARD SYSTEM LANDING PAGES -->
    <div v-else>
      <Navbar
        :nav-links="navLinks"
        :is-dark="isDark"
        :is-menu-open="isMenuOpen"
        @toggle-theme="toggleTheme"
        @toggle-menu="isMenuOpen = !isMenuOpen"
        @scroll-to-top="scrollToTop"
      />

      <main>
        <Hero     :stats="stats"   @start="scrollToContact" />
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
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
import ReferralLanding from '@/components/landing/ReferralLanding.vue'
import AgentLanding from '@/components/landing/AgentLanding.vue'

// Composables
import { useTheme }       from '@/composables/useTheme'
import { useLandingData } from '@/composables/useLandingData'

const { locale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const { navLinks, features, plans, stats, testimonials, faqs, loading, fetchData } = useLandingData()

const isMenuOpen    = ref(false)
const scrollProgress = ref(0)

const path = ref(window.location.pathname)
const isReferral = computed(() => path.value.startsWith('/referral/'))
const referralCode = computed(() => {
  if (!isReferral.value) return ''
  const parts = path.value.split('/').filter(Boolean)
  return parts[1] || ''
})

const isAgentLink = computed(() => path.value.startsWith('/agent/'))
const agentCode = computed(() => {
  if (!isAgentLink.value) return ''
  const parts = path.value.split('/').filter(Boolean)
  return parts[1] || ''
})

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

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

const handleBuy = () => scrollToContact()

const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }
</script>
