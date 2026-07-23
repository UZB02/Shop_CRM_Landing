<template>
  <section id="pricing" class="py-20 lg:py-28 relative overflow-hidden">
    <!-- Glow -->
    <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%);">
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
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <div v-for="i in 3" :key="i" class="h-[420px] glass-card rounded-2xl animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto items-stretch">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          class="reveal-up active relative flex flex-col rounded-2xl transition-all duration-300 hover-lift group"
          :style="{ transitionDelay: `${index * 0.1}s` }"
          :class="plan.popular
            ? 'border border-primary/40 shadow-[0_0_0_1px_rgba(16,185,129,0.1),0_0_40px_rgba(16,185,129,0.15)] bg-gradient-to-b from-primary/[0.06] to-transparent'
            : 'glass-card border border-zinc-200/60 dark:border-white/[0.06]'"
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary text-white text-[9px] font-black uppercase tracking-wider shadow-lg">
              <i class="pi pi-star-fill text-[8px]"></i>
              Ommabop
            </span>
          </div>

          <div class="p-5 flex flex-col flex-1 mt-2">
            <!-- Plan Header -->
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-1.5">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  :class="plan.popular ? 'bg-primary/15 border border-primary/30' : 'bg-zinc-100 dark:bg-white/[0.07] border border-zinc-200 dark:border-white/[0.06]'">
                  <i :class="['pi', plan.popular ? 'pi-star text-primary' : 'pi-shop text-zinc-400']" class="text-[12px]"></i>
                </div>
                <h3 class="text-[15px] font-extrabold text-zinc-900 dark:text-white">{{ plan.name }}</h3>
              </div>
              <p class="text-zinc-500 dark:text-zinc-400 text-[11px] leading-snug line-clamp-2">{{ plan.desc }}</p>
            </div>

            <!-- Price -->
            <div class="mb-4 pb-4 border-b border-zinc-100 dark:border-white/[0.06]">
              <div class="flex items-baseline gap-1.5">
                <span class="text-[26px] font-black tracking-tight" :class="plan.popular ? 'text-primary' : 'text-zinc-900 dark:text-white'" style="font-family:'Outfit',sans-serif">
                  {{ isYearly ? plan.price_yearly : plan.price_monthly }}
                </span>
                <span class="text-[10px] font-bold text-zinc-400 uppercase">so'm / {{ isYearly ? 'yil' : 'oy' }}</span>
              </div>
              <p v-if="isYearly" class="text-[10px] text-emerald-500 font-bold mt-1">
                Yillik to'lovda 20% tejaysiz
              </p>
            </div>

            <!-- Limits (compact chips) -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span v-for="(val, key) in {
                branches:   plan.max_branches,
                warehouses: plan.max_warehouses,
                workers:    plan.max_workers,
                products:   plan.max_products,
              }" :key="key"
                class="inline-flex items-center rounded-lg px-2 py-1 text-[10.5px] font-bold"
                :class="plan.popular ? 'bg-primary/[0.08] text-primary' : 'bg-zinc-50 dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300'"
              >
                <template v-if="val === 0">Cheksiz&nbsp;<span class="font-medium opacity-70 ml-0.5">{{ unlimitedNouns[key] }}</span></template>
                <template v-else>{{ val }}&nbsp;<span class="font-medium opacity-70 ml-0.5">{{ $t(`landing.pricing.limits.${key}`) }}</span></template>
              </span>
            </div>

            <!-- Features (2-col compact) -->
            <div class="flex-grow grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5 content-start">
              <div v-for="feat in plan.features" :key="feat" class="flex items-start gap-1.5">
                <i class="pi pi-check text-[9px] mt-0.5 shrink-0" :class="plan.popular ? 'text-primary' : 'text-zinc-400'"></i>
                <span class="text-[11.5px] leading-snug text-zinc-600 dark:text-zinc-300 font-medium">{{ feat }}</span>
              </div>
            </div>

            <!-- CTA -->
            <button
              @click="$emit('buy', plan)"
              class="w-full py-2.5 rounded-xl font-bold text-[13px] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 mt-auto"
              :class="plan.popular
                ? 'btn-primary btn-shimmer relative overflow-hidden'
                : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'"
            >
              Tanlash <i class="pi pi-arrow-right text-[11px]"></i>
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

const unlimitedNouns = {
  branches:   'filial',
  warehouses: 'ombor',
  workers:    'xodim',
  products:   'mahsulot',
}
</script>
