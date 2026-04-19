<template>
  <nav class="sticky top-0 z-[60] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center cursor-pointer" @click="$emit('scroll-to-top')">
          <span class="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Shop Searem
          </span>
        </div>

        <div class="hidden md:flex space-x-8 items-center font-medium text-slate-600 dark:text-slate-300">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" class="hover:text-emerald-500 transition-colors">
            {{ link.text }}
          </a>
          
          <div class="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4 ml-2">
            <Button 
              @click="$emit('toggle-theme')" 
              text 
              rounded 
              class="p-button-sm !w-10 !h-10 p-0 overflow-hidden"
              v-tooltip.bottom="isDark ? $t('landing.nav.theme_light') : $t('landing.nav.theme_dark')"
            >
              <template #icon>
                <transition name="theme-icon-rotate" mode="out-in">
                  <i :key="isDark" :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-lg" />
                </transition>
              </template>
            </Button>
            <Button 
              :label="locale === 'uz' ? 'O\'z' : 'Ўз'" 
              @click="$emit('toggle-lang')" 
              text 
              rounded 
              class="p-button-sm font-bold"
              :class="locale === 'uz' ? 'text-emerald-600' : 'text-slate-500'"
            />
          </div>

        </div>

        <div class="md:hidden flex items-center gap-2">
          <Button 
            @click="$emit('toggle-theme')" 
            text 
            rounded 
            class="p-button-sm !w-10 !h-10 p-0 overflow-hidden"
          >
            <template #icon>
              <transition name="theme-icon-rotate" mode="out-in">
                <i :key="isDark" :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-lg" />
              </transition>
            </template>
          </Button>
          <Button 
            :label="locale === 'uz' ? 'O\'z' : 'Ўз'" 
            @click="$emit('toggle-lang')" 
            text 
            rounded 
            class="p-button-sm"
          />
          <Button 
            :icon="isMenuOpen ? 'pi pi-times' : 'pi pi-bars'" 
            @click="$emit('toggle-menu')" 
            text 
            rounded 
            severity="secondary"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="absolute inset-x-0 top-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 md:hidden z-50 shadow-xl font-medium">
        <div class="px-4 pt-2 pb-6 space-y-1">
          <a 
            v-for="link in navLinks" 
            :key="link.href" 
            :href="link.href" 
            @click="$emit('toggle-menu', false)"
            class="flex items-center px-3 py-4 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
          >
            <i :class="[link.icon, 'mr-3 text-emerald-500']"></i>
            {{ link.text }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

defineProps({
  navLinks: Array,
  isDark: Boolean,
  isMenuOpen: Boolean
})

defineEmits(['toggle-theme', 'toggle-lang', 'toggle-menu', 'go-to-crm', 'scroll-to-top'])
</script>
