<template>
  <section class="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-32">
    <!-- Background Decor -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-20 dark:opacity-10">
      <div class="absolute top-0 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 right-10 w-72 h-72 bg-teal-600 rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
        {{ $t('landing.hero.title_part1') }} <br class="hidden sm:block"/>
        <span class="text-emerald-500">{{ $t('landing.hero.title_highlight') }}</span> {{ $t('landing.hero.title_part2') }}
      </h1>
      <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        {{ $t('landing.hero.description') }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 px-4 items-center">
        <Button 
          :label="$t('landing.hero.start_free')" 
          icon="pi pi-rocket" 
          severity="success" 
          size="large" 
          class="shadow-lg shadow-emerald-500/20 px-8 w-full sm:w-auto" 
          @click="$emit('start')" 
        />
        <Button 
          :label="$t('landing.hero.pricing')" 
          icon="pi pi-info-circle" 
          severity="secondary" 
          outlined 
          size="large" 
          class="px-8 w-full sm:w-auto border-slate-200 dark:border-slate-700" 
          @click="scrollToPricing"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from 'primevue/button'

defineEmits(['start'])

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
