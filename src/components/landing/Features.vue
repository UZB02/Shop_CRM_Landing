<template>
  <section id="features" class="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
          {{ $t('landing.features.title') }}
        </h2>
        <div class="w-20 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
        <p class="text-slate-500 dark:text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
          {{ $t('landing.features.subtitle') }}
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="group p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300"
        >
          <div class="w-14 h-14 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
            <i :class="[feature.icon, 'text-2xl text-emerald-500 group-hover:text-white transition-colors']"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">{{ feature.title }}</h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ feature.desc }}
          </p>
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
