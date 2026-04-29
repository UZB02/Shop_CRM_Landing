<template>
  <section id="pricing" class="py-20 lg:py-28 relative overflow-hidden">
    <!-- Glow -->
    <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%);">
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
      <!-- Header -->
      <div class="text-center mb-12 reveal-up active">
        <div class="badge-premium mb-5">
          <i class="pi pi-tag text-[10px]"></i>
          Narxlar
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4">
          Biznesingiz uchun <span class="text-gradient">to'g'ri reja</span>
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-base leading-relaxed mb-8">
          Kichik do'konlardan tortib yirik tarmoqlargacha — hamyonbop narxlar.
        </p>

        <!-- Billing Toggle -->
        <div class="inline-flex items-center gap-3 p-1.5 rounded-xl bg-zinc-100 dark:bg-white/[0.07] border border-zinc-200 dark:border-white/[0.06]">
          <button
            @click="isYearly = false"
            class="px-4 py-2 rounded-lg text-[12px] font-bold transition-all"
            :class="!isYearly ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400'"
          >
            Oylik
          </button>
          <button
            @click="isYearly = true"
            class="px-4 py-2 rounded-lg text-[12px] font-bold transition-all flex items-center gap-2"
            :class="isYearly ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400'"
          >
            Yillik
            <span class="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-500 text-[9px] font-black">-20%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        <div v-for="i in 3" :key="i" class="h-[480px] glass-card rounded-2xl animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          class="reveal-up active relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover-lift group"
          :style="{ transitionDelay: `${index * 0.1}s` }"
          :class="plan.popular
            ? 'border border-primary/40 shadow-[0_0_0_1px_rgba(124,58,237,0.1),0_0_40px_rgba(124,58,237,0.15)] bg-gradient-to-b from-primary/[0.06] to-transparent'
            : 'glass-card border border-zinc-200/60 dark:border-white/[0.06]'"
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div v-if="plan.popular" class="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span class="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary text-white text-[9px] font-black uppercase tracking-wider shadow-lg">
              <i class="pi pi-star-fill text-[8px]"></i>
              Eng Ko'p Tanlangan
            </span>
          </div>

          <div class="p-7 flex flex-col flex-1 mt-2">
            <!-- Plan Header -->
            <div class="mb-6">
              <div class="flex items-center gap-2.5 mb-3">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center"
                  :class="plan.popular ? 'bg-primary/15 border border-primary/30' : 'bg-zinc-100 dark:bg-white/[0.07] border border-zinc-200 dark:border-white/[0.06]'">
                  <i :class="['pi', plan.popular ? 'pi-star text-primary' : 'pi-shop text-zinc-400']" class="text-[14px]"></i>
                </div>
                <h3 class="text-lg font-extrabold text-zinc-900 dark:text-white">{{ plan.name }}</h3>
              </div>
              <p class="text-zinc-500 dark:text-zinc-400 text-[12px] leading-relaxed">{{ plan.desc }}</p>
            </div>

            <!-- Price -->
            <div class="mb-6 pb-6 border-b border-zinc-100 dark:border-white/[0.06]">
              <div class="flex items-baseline gap-1.5">
                <span class="text-[38px] font-black tracking-tight" :class="plan.popular ? 'text-primary' : 'text-zinc-900 dark:text-white'" style="font-family:'Plus Jakarta Sans',sans-serif">
                  {{ isYearly ? plan.price_yearly : plan.price_monthly }}
                </span>
                <div class="flex flex-col">
                  <span class="text-[11px] font-bold text-zinc-400 uppercase">so'm</span>
                  <span class="text-[10px] font-bold text-zinc-400">/ {{ isYearly ? 'yil' : 'oy' }}</span>
                </div>
              </div>
              <p v-if="isYearly" class="text-[10px] text-emerald-500 font-bold mt-1">
                Yillik to'lovda {{ Math.round(20) }}% tejaysiz
              </p>
            </div>

            <!-- Limits -->
            <div class="grid grid-cols-2 gap-2.5 mb-6">
              <div v-for="(val, key) in {
                branches:   plan.max_branches,
                warehouses: plan.max_warehouses,
                workers:    plan.max_workers,
                products:   plan.max_products,
              }" :key="key"
                class="rounded-xl p-3 text-center"
                :class="plan.popular ? 'bg-primary/[0.07] border border-primary/15' : 'bg-zinc-50 dark:bg-white/[0.04] border border-zinc-100 dark:border-white/[0.05]'"
              >
                <div class="text-base font-extrabold" :class="plan.popular ? 'text-primary' : 'text-zinc-900 dark:text-white'">{{ val }}</div>
                <div class="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{{ $t(`landing.pricing.limits.${key}`) }}</div>
              </div>
            </div>

            <!-- Features -->
            <div class="flex-grow space-y-2.5 mb-8">
              <div v-for="feat in plan.features" :key="feat" class="flex items-start gap-2.5">
                <div class="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                  :class="plan.popular ? 'bg-primary text-white' : 'bg-zinc-100 dark:bg-white/[0.08] text-zinc-500'">
                  <i class="pi pi-check text-[8px] font-black"></i>
                </div>
                <span class="text-[13px] text-zinc-600 dark:text-zinc-300 font-medium">{{ feat }}</span>
              </div>
            </div>

            <!-- CTA -->
            <button
              @click="$emit('buy', plan)"
              class="w-full py-3.5 rounded-xl font-bold text-[14px] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 mt-auto"
              :class="plan.popular
                ? 'btn-primary btn-shimmer relative overflow-hidden'
                : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'"
            >
              Tanlash <i class="pi pi-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Enterprise note -->
      <div class="mt-10 text-center reveal-up active" style="transition-delay:0.35s">
        <p class="text-zinc-500 dark:text-zinc-400 text-sm">
          Katta loyihalar uchun maxsus taklif kerakmi?
          <a href="#contact" class="text-primary hover:text-primary-dark font-bold underline-offset-2 hover:underline ml-1">
            Biz bilan bog'laning →
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ plans: Array, loading: Boolean })
defineEmits(['buy'])

const isYearly = ref(false)
</script>
