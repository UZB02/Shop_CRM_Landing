<template>
  <footer class="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div class="flex items-center gap-2">
            <span class="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Shop Searem
            </span>
        </div>
        
        <div class="flex flex-wrap justify-center gap-8">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" class="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-medium">
            {{ link.text }}
          </a>
        </div>

        <div class="flex gap-4">
          <Button icon="pi pi-telegram" rounded outlined severity="secondary" size="small" />
          <Button icon="pi pi-instagram" rounded outlined severity="secondary" size="small" />
          <Button icon="pi pi-facebook" rounded outlined severity="secondary" size="small" />
        </div>
      </div>

      <div class="text-center pt-8 border-t border-slate-50 dark:border-slate-800/50">
        <p class="text-slate-400 dark:text-slate-500 text-sm font-medium">
          &copy; {{ new Date().getFullYear() }} Shop Searem. {{ $t('landing.footer.rights') }}
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
