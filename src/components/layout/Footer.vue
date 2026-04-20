<template>
  <footer class="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <i class="pi pi-star-fill text-white text-xl"></i>
          </div>
          <span class="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
            Sirius <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">POS</span>
          </span>
        </div>
        
        <div class="flex flex-wrap justify-center gap-8">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">
            {{ link.text }}
          </a>
        </div>

        <div class="flex gap-4">
          <a href="#" class="w-10 h-10 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
            <i class="pi pi-telegram"></i>
          </a>
          <a href="#" class="w-10 h-10 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
            <i class="pi pi-instagram"></i>
          </a>
        </div>
      </div>

      <div class="text-center pt-8 border-t border-slate-100 dark:border-slate-800/50">
        <p class="text-slate-400 dark:text-slate-500 text-sm font-medium">
          &copy; {{ new Date().getFullYear() }} Sirius POS. {{ $t('landing.footer.rights') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Button from 'primevue/button'

defineProps({
  navLinks: Array
})
</script>
