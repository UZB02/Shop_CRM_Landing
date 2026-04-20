<template>
  <section id="features" class="py-32 bg-mesh relative">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="text-center mb-24 reveal active">
        <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">{{ $t('landing.features.title') }}</h2>
        <p class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">{{ $t('landing.features.subtitle') }}</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="glass-card p-10 rounded-[2.5rem] hover-3d transition-all duration-500 reveal active group"
          :style="{ transitionDelay: `${index * 0.1}s` }"
        >
          <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-12 shadow-inner">
            <i :class="feature.icon + ' text-3xl'"></i>
          </div>
          <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">{{ feature.title }}</h3>
          <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  features: Array
})
</script>
