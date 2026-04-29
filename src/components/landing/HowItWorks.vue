<template>
  <section id="how-it-works" class="py-20 lg:py-28 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);">
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <!-- Header -->
      <div class="text-center mb-16 reveal-up active">
        <div class="badge-premium mb-5">
          <i class="pi pi-bolt text-[10px]"></i>
          Boshlash oson
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4">
          3 qadamda <span class="text-gradient">boshlang</span>
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-base leading-relaxed">
          Murakkab o'rnatishlar yo'q. Bir necha daqiqada savdo tizimingiz tayyor.
        </p>
      </div>

      <!-- Steps -->
      <div class="relative">
        <!-- Connector line (desktop) -->
        <div class="hidden lg:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px"
          style="background: linear-gradient(90deg, rgba(124,58,237,0.4), rgba(6,182,212,0.4), rgba(245,158,11,0.4));">
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="reveal-up active flex flex-col items-center lg:items-start text-center lg:text-left group"
            :style="{ transitionDelay: `${i * 0.15}s` }"
          >
            <!-- Step Number Circle -->
            <div class="relative mb-6">
              <div class="absolute inset-0 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity"
                :style="`background: ${step.glow}`">
              </div>
              <div
                class="relative w-16 h-16 rounded-2xl flex items-center justify-center border text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                :style="`background: ${step.bg}; border-color: ${step.borderColor}`"
              >
                {{ step.num }}
              </div>
            </div>

            <!-- Content -->
            <div class="glass-card rounded-2xl p-6 w-full hover-lift border border-zinc-200/60 dark:border-white/[0.06]">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="`background: rgba(${step.rgb},0.1); border: 1px solid rgba(${step.rgb},0.2)`">
                  <i :class="step.icon" class="text-[13px]" :style="`color: rgba(${step.rgb},1)`"></i>
                </div>
                <h3 class="text-[16px] font-extrabold text-zinc-900 dark:text-white">{{ step.title }}</h3>
              </div>
              <p class="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed">{{ step.desc }}</p>
              <div class="mt-4 flex items-center gap-1.5 text-[11px] font-bold" :style="`color: rgba(${step.rgb},0.9)`">
                <i class="pi pi-clock text-[10px]"></i>
                {{ step.time }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-14 text-center reveal-up active" style="transition-delay:0.4s">
        <p class="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
          Hoziroq boshlang — hech qanday kredit karta talab etilmaydi
        </p>
        <button
          @click="scrollToContact"
          class="btn-primary btn-shimmer relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-[15px] font-bold overflow-hidden"
        >
          <i class="pi pi-bolt text-sm"></i>
          Bepul 14 Kun Sinab Ko'ring
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

const steps = [
  {
    num:         '01',
    title:       "Ro'yxatdan o'ting",
    desc:        "30 soniyada telefon raqamingiz bilan ro'yxatdan o'ting. Hech qanday qo'shimcha hujjat kerak emas.",
    icon:        'pi pi-user-plus',
    time:        '30 soniya',
    bg:          'linear-gradient(135deg, #7C3AED, #6D28D9)',
    glow:        '#7C3AED',
    borderColor: 'rgba(124,58,237,0.4)',
    rgb:         '124,58,237',
  },
  {
    num:         '02',
    title:       "Do'koningizni sozlang",
    desc:        "Mahsulotlar, omborxona va xodimlarni kiriting. Biz sizga shablon va ko'rsatmalar beramiz.",
    icon:        'pi pi-cog',
    time:        '5-10 daqiqa',
    bg:          'linear-gradient(135deg, #06b6d4, #0891b2)',
    glow:        '#06b6d4',
    borderColor: 'rgba(6,182,212,0.4)',
    rgb:         '6,182,212',
  },
  {
    num:         '03',
    title:       "Savdoni boshlang",
    desc:        "POS kassa orqali savdo qiling, hisobotlarni kuzating va biznesingizni o'sishi bilan birga kengaytiring.",
    icon:        'pi pi-chart-line',
    time:        'Darhol tayyor',
    bg:          'linear-gradient(135deg, #f59e0b, #d97706)',
    glow:        '#f59e0b',
    borderColor: 'rgba(245,158,11,0.4)',
    rgb:         '245,158,11',
  },
]
</script>
