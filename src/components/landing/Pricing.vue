<template>
  <section id="pricing" class="py-32 relative overflow-hidden bg-mesh">
    <!-- Sophisticated Background Decor -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50">
      <div class="absolute top-24 left-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[150px] animate-pulse"></div>
      <div class="absolute bottom-24 right-[10%] w-96 h-96 bg-accent/20 rounded-full blur-[150px] animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-24 reveal active">
        <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          Biznesingiz uchun <br class="hidden md:block" />
          <span class="bg-gradient-to-r from-primary via-primary-dark to-accent bg-clip-text text-transparent">to'g'ri tanlov</span>
        </h2>
        <p class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
          Kichik do'konlardan tortib yirik tarmoqlargacha — bizda hamma uchun mos yechim bor.
        </p>

        <!-- World-class Billing Switch -->
        <div class="mt-12 flex items-center justify-center gap-6">
          <span :class="['text-sm font-bold transition-all', !isYearly ? 'text-primary' : 'text-slate-400']">Oylik to'lov</span>
          <button 
            @click="isYearly = !isYearly"
            class="relative w-16 h-8 bg-slate-200 dark:bg-slate-800 rounded-full p-1.5 transition-all focus:outline-none ring-offset-2 focus:ring-2 focus:ring-primary/50"
          >
            <div 
              :class="['w-5 h-5 bg-primary rounded-full transition-all duration-300 transform shadow-lg', isYearly ? 'translate-x-8' : 'translate-x-0']"
            ></div>
          </button>
          <div class="flex items-center gap-2">
            <span :class="['text-sm font-bold transition-all', isYearly ? 'text-primary' : 'text-slate-400']">Yillik reja</span>
            <span class="px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-accent/30 animate-bounce">
              Tejash 20%
            </span>
          </div>
        </div>
      </div>

      <!-- Pricing Cards Grid - Responsive Breakpoints -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div v-for="i in 3" :key="i" class="h-[600px] glass-card rounded-[3rem] animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch perspective-1000">
        <div 
          v-for="(plan, index) in plans" 
          :key="index" 
          class="group relative flex flex-col glass-card p-10 rounded-[3rem] transition-all duration-500 hover-3d reveal active"
          :style="{ transitionDelay: `${index * 0.1}s` }"
          :class="{
            'ring-2 ring-primary bg-primary/5 shadow-[0_30px_60px_-15px_rgba(99,102,241,0.3)] z-10 md:scale-105': plan.popular,
            'hover:bg-white dark:hover:bg-slate-900/50': !plan.popular
          }"
        >
          <!-- Popular Badge Glow -->
          <div v-if="plan.popular" class="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/40">
            Tavsiya etiladi
          </div>

          <div class="mb-10">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">{{ plan.name }}</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed min-h-[40px]">
              {{ plan.desc }}
            </p>
          </div>

          <div class="mb-12">
            <div class="flex items-baseline gap-1">
              <span class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                {{ isYearly ? plan.price_yearly : plan.price_monthly }}
              </span>
              <span class="text-slate-500 dark:text-slate-400 font-bold text-base">so'm</span>
            </div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
              bir {{ isYearly ? 'yil' : 'oy' }}lik to'lov
            </p>
          </div>

          <!-- Core Limits -->
          <div class="space-y-4 mb-8 pb-8 border-b border-slate-100 dark:border-white/5">
            <div v-for="(val, key) in { 
              branches: plan.max_branches, 
              warehouses: plan.max_warehouses, 
              workers: plan.max_workers, 
              products: plan.max_products 
            }" :key="key" class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-primary/40"></div>
              <span class="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                {{ val }} {{ $t(`landing.pricing.limits.${key}`) }}
              </span>
            </div>
          </div>

          <!-- Feature List -->
          <div class="flex-grow space-y-5 mb-12">
             <div v-for="feat in plan.features" :key="feat" class="flex items-start gap-4">
                <div 
                  :class="[
                    'w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm',
                    plan.popular ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  ]"
                >
                  <i class="pi pi-check text-[10px] font-bold"></i>
                </div>
                <span class="text-slate-700 dark:text-slate-300 text-sm font-semibold leading-tight">{{ feat }}</span>
             </div>
          </div>

          <!-- Action Button -->
          <button 
            @click="$emit('buy', plan)"
            :class="[
              'w-full py-5 rounded-[1.5rem] font-black text-lg transition-all duration-300 shadow-xl active:scale-95 flex items-center justify-center gap-3',
              plan.popular 
                ? 'bg-primary text-white hover:bg-primary-dark shadow-primary/30 hover:shadow-primary/50' 
                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
            ]"
          >
            <span>Tanlash</span>
            <i class="pi pi-arrow-right text-sm"></i>
          </button>

          <!-- Plan detail hint (Small project style) -->
          <p class="mt-6 text-center text-xs text-slate-400 font-bold group-hover:text-primary transition-colors cursor-default">
            Bepul sinov muddati mavjud
          </p>
        </div>
      </div>

      <!-- Comparison Section Trigger (Optional Visual Element) -->
      <div class="mt-20 text-center reveal active" style="transition-delay: 0.4s">
        <p class="text-slate-500 dark:text-slate-400 font-medium">
          Katta loyihalar uchun maxsus tarif kerakmi? 
          <a href="#contact" class="text-primary font-bold hover:underline ml-1">Biz bilan bog'laning</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  plans: Array,
  loading: Boolean
})

defineEmits(['buy'])

const isYearly = ref(false)
</script>
