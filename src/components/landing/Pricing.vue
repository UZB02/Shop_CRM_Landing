<template>
  <section id="pricing" class="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
          {{ $t('landing.pricing.title') }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 text-lg">
          {{ $t('landing.pricing.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 items-stretch pt-4">
        <div 
          v-for="(plan, index) in plans" 
          :key="index" 
          class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 flex flex-col relative transition-all duration-500 hover:shadow-2xl"
          :class="{'ring-4 ring-emerald-500/20 shadow-xl lg:scale-105 z-10 !border-emerald-500/50': plan.popular}"
        >
          <div v-if="plan.popular" class="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-5 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/30">
            {{ $t('landing.pricing.popular') }}
          </div>

          <div class="mb-8">
            <h3 class="text-2xl font-bold mb-2 text-slate-900 dark:text-white text-center">{{ plan.name }}</h3>
            <p class="text-slate-500 dark:text-slate-400 text-center text-sm h-10">{{ plan.desc }}</p>
          </div>
          
          <div class="flex items-baseline justify-center gap-1 mb-10 border-b border-slate-100 dark:border-slate-800 pb-8">
            <span class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{{ plan.price }}</span>
            <span class="text-slate-500 dark:text-slate-400 font-medium">so'm/{{ plan.unit === 'oy' ? $t('landing.pricing.unit_month') : $t('landing.pricing.unit_year') }}</span>
          </div>

          <ul class="space-y-5 mb-10 flex-grow">
            <li v-for="feat in plan.features" :key="feat" class="flex items-start gap-3">
              <div class="w-5 h-5 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <i class="pi pi-check text-[10px] text-emerald-500 font-bold"></i>
              </div>
              <span class="text-slate-600 dark:text-slate-300 text-sm leading-tight">{{ feat }}</span>
            </li>
          </ul>

          <Button 
            :label="$t('landing.pricing.buy')" 
            :severity="plan.popular ? 'success' : 'secondary'" 
            :outlined="!plan.popular" 
            class="w-full p-button-lg p-button-rounded transition-all duration-300 hover:scale-[1.02] active:scale-95" 
            @click="$emit('buy', plan)" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from 'primevue/button'

defineProps({
  plans: Array
})

defineEmits(['buy'])
</script>
