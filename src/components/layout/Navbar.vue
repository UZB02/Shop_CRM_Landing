<template>
  <nav
    class="sticky top-0 z-[60] transition-all duration-500"
    :class="isScrolled
      ? 'bg-white/80 dark:bg-zinc-950/85 backdrop-blur-2xl border-b border-zinc-200/60 dark:border-white/[0.06] shadow-sm'
      : 'bg-transparent border-b border-transparent'"
  >
    <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <div class="flex items-center justify-between h-16 lg:h-[70px]">

        <!-- Logo -->
        <div class="flex items-center gap-3 group cursor-pointer shrink-0" @click="$emit('scroll-to-top')">
          <!-- Logo Mark (real Sirius POS app icon) -->
          <div class="relative w-9 h-9 shrink-0">
            <div class="absolute inset-0 bg-emerald-500 rounded-xl rotate-3 opacity-40 group-hover:rotate-6 transition-transform duration-500"></div>
            <div class="relative w-full h-full bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden p-1 group-hover:scale-105 transition-transform duration-500">
              <img src="/pwa-192x192.png" alt="Sirius POS" class="w-full h-full object-contain" />
            </div>
          </div>
          <div class="leading-tight">
            <span class="block text-[15px] font-extrabold text-zinc-900 dark:text-white tracking-tight" style="font-family:'Outfit',sans-serif">
              Sirius <span class="text-gradient-subtle">POS</span>
            </span>
            <span class="hidden sm:block text-[9px] font-bold text-zinc-400 uppercase tracking-[0.15em]">Enterprise SaaS</span>
          </div>
        </div>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="relative px-4 py-2 text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-zinc-100/60 dark:hover:bg-white/[0.06] group"
          >
            {{ link.text }}
          </a>
        </div>

        <!-- Actions -->
        <div class="hidden lg:flex items-center gap-2">
          <!-- Theme Toggle -->
          <button
            @click="$emit('toggle-theme')"
            class="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.08] transition-all"
            title="Mavzu o'zgartirish"
          >
            <transition name="theme-icon-rotate" mode="out-in">
              <i :key="isDark" :class="isDark ? 'pi pi-sun text-amber-400' : 'pi pi-moon text-indigo-500'" class="text-[16px]" />
            </transition>
          </button>
        </div>

        <!-- Mobile Right -->
        <div class="lg:hidden flex items-center gap-2">
          <button
            @click="$emit('toggle-theme')"
            class="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10"
          >
            <i :class="isDark ? 'pi pi-sun text-amber-400' : 'pi pi-moon text-indigo-500'" class="text-[15px]" />
          </button>
          <button
            @click="$emit('toggle-menu')"
            class="w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-all"
          >
            <i :class="isMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-[14px]" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden absolute inset-x-3 top-[calc(100%+8px)] bg-white/95 dark:bg-zinc-900/98 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50"
      >
        <div class="p-4 space-y-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="$emit('toggle-menu', false)"
            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-white/[0.06] transition-colors"
          >
            <div class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/[0.08] flex items-center justify-center">
              <i :class="link.icon || 'pi pi-circle'" class="text-[13px] text-zinc-500 dark:text-zinc-400"></i>
            </div>
            <span class="text-[14px] font-semibold text-zinc-700 dark:text-zinc-200">{{ link.text }}</span>
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  navLinks:   Array,
  isDark:     Boolean,
  isMenuOpen: Boolean
})

defineEmits(['toggle-theme', 'toggle-menu', 'scroll-to-top'])

const isScrolled = ref(false)

const onScroll = () => { isScrolled.value = window.scrollY > 20 }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
