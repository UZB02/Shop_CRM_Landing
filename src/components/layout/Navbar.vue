<template>
  <nav class="sticky top-0 z-[60] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50 shadow-sm transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo Section -->
        <div class="flex items-center gap-3 group cursor-pointer" @click="$emit('scroll-to-top')">
          <div class="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
            <i class="pi pi-star-fill text-white text-xl"></i>
          </div>
          <span class="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
            Sirius <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">POS</span>
          </span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-10">
          <nav class="flex items-center gap-8">
            <a 
              v-for="link in navLinks" 
              :key="link.href" 
              :href="link.href" 
              class="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] hover:text-primary dark:hover:text-primary transition-all relative group"
            >
              {{ link.text }}
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </nav>

          <div class="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-8">
            <button 
              @click="$emit('toggle-theme')" 
              class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 transition-all hover:rotate-12 shadow-sm group"
            >
              <transition name="theme-icon-rotate" mode="out-in">
                <i :key="isDark" :class="isDark ? 'pi pi-sun text-yellow-400' : 'pi pi-moon text-indigo-600'" class="text-lg" />
              </transition>
            </button>
            <button 
              @click="$emit('toggle-lang')" 
              class="px-4 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-[10px] font-black hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
              :class="locale === 'uz' ? 'text-primary' : 'text-slate-500'"
            >
              {{ locale === 'uz' ? 'O\'Z' : 'ЎЗ' }}
            </button>
          </div>
        </div>

        <!-- Mobile Toggle -->
        <div class="md:hidden flex items-center gap-3">
          <button 
            @click="$emit('toggle-theme')" 
            class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
          >
            <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" />
          </button>
          <button 
            @click="$emit('toggle-menu')" 
            class="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center"
          >
            <i :class="isMenuOpen ? 'pi pi-times' : 'pi pi-bars'" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-10"
    >
      <div v-if="isMenuOpen" class="absolute inset-x-0 top-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 md:hidden z-50 shadow-2xl overflow-hidden rounded-b-3xl">
        <div class="px-6 py-10 space-y-4">
          <a 
            v-for="link in navLinks" 
            :key="link.href" 
            :href="link.href" 
            @click="$emit('toggle-menu', false)"
            class="flex items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/10 hover:text-primary transition-all font-bold"
          >
            <div class="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
              <i :class="link.icon"></i>
            </div>
            {{ link.text }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

defineProps({
  navLinks: Array,
  isDark: Boolean,
  isMenuOpen: Boolean
})

defineEmits(['toggle-theme', 'toggle-lang', 'toggle-menu', 'go-to-crm', 'scroll-to-top'])
</script>
