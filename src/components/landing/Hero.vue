<template>
  <section class="relative min-h-[80vh] flex items-center overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 bg-mesh">
    <!-- Animated background shapes - Scaled for mobile -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <div class="absolute -top-[10%] -left-[10%] w-[60%] lg:w-[45%] h-[60%] bg-primary/20 rounded-full blur-[80px] lg:blur-[130px] animate-pulse"></div>
      <div class="absolute -bottom-[10%] -right-[10%] w-[60%] lg:w-[45%] h-[60%] bg-accent/15 rounded-full blur-[80px] lg:blur-[130px] animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <!-- Text Content - Centered on mobile, Left on Desktop -->
        <div class="text-center lg:text-left reveal active z-10 order-2 lg:order-1">
          <div class="inline-flex items-center px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-8">
            <span class="relative flex h-2 w-2 mr-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Sotuvda V2.0 — Yangilangan
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
            Sirius <span class="bg-gradient-to-r from-primary via-indigo-400 to-accent bg-clip-text text-transparent pb-1">POS</span>
            <span class="block text-3xl sm:text-4xl lg:text-5xl mt-2 opacity-90">{{ $t('landing.hero.title_suffix') }}</span>
          </h1>
          
          <p class="text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {{ $t('landing.hero.subtitle') }}
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <button 
              @click="$emit('start')"
              class="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              <i class="pi pi-rocket"></i>
              {{ $t('landing.hero.start_free') }}
            </button>
            <button 
              @click="scrollToPricing"
              class="w-full sm:w-auto px-10 py-5 bg-white/5 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white rounded-2xl font-black text-lg border border-slate-200/50 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/10 transition-all hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3"
            >
              <i class="pi pi-th-large"></i>
              {{ $t('landing.hero.pricing') }}
            </button>
          </div>

          <!-- Refined Mini Stats - 100% API Integrated -->
          <div v-if="stats && stats.total_stores" class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-slate-200/30 dark:border-white/5 pt-10 will-change-transform">
            <div 
              v-for="(val, key) in { 
                stores: stats.total_stores, 
                workers: stats.total_workers, 
                sales: stats.total_sales_count > 1000 ? Math.floor(stats.total_sales_count/1000) + 'K' : stats.total_sales_count,
                cities: stats.cities_count 
              }" 
              :key="key" 
              class="text-center md:text-left"
            >
              <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">{{ val }}+</div>
              <div class="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ $t(`landing.stats.${key}`) }}</div>
            </div>
          </div>
        </div>

        <!-- 3D Visualization - Visible on Tablet and Desktop -->
        <div class="relative perspective-1000 hidden md:block reveal active order-1 lg:order-2" style="transition-delay: 0.3s">
          <div class="relative preserve-3d animate-float max-w-2xl mx-auto lg:max-w-none">
            <!-- Glow background -->
            <div class="absolute -inset-4 bg-primary/20 blur-[60px] rounded-full opacity-50"></div>
            
            <!-- Main Mockup -->
            <div class="glass-card p-2 sm:p-3 rounded-[2rem] sm:rounded-[2.5rem] hover-3d overflow-hidden ring-1 ring-white/20 dark:ring-white/10 will-change-transform">
              <img 
                src="/dashboard_3d_mockup.png" 
                alt="Sirius POS - Professional Avtomatlashtirish"
                fetchpriority="high"
                class="rounded-[1.8rem] sm:rounded-[2rem] w-full shadow-2xl"
              />
            </div>
            
            <!-- Floating Elements - Scaled for Tablet -->
            <div class="absolute -top-12 -right-2 sm:-right-6 glass-card p-4 sm:p-6 rounded-2xl animate-float-delayed shadow-2xl border-white/20 z-20">
              <div class="flex items-center gap-3 sm:gap-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                  <i class="pi pi-chart-line text-lg sm:text-xl font-bold"></i>
                </div>
                <div>
                  <div class="text-lg sm:text-xl font-black text-slate-900 dark:text-white">+24%</div>
                  <div class="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-tighter sm:tracking-widest">Oylik o'sish</div>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-8 -left-2 sm:-left-12 glass-card p-4 sm:p-5 rounded-2xl shadow-2xl animate-float border-white/20 z-20" style="animation-delay: 1s">
              <div class="flex items-center gap-3 sm:gap-4">
                 <div class="flex -space-x-3 sm:-space-x-4">
                   <div v-for="i in 3" :key="i" class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-300 border-[3px] sm:border-4 border-white dark:border-slate-900 shadow-sm overflow-hidden flex items-center justify-center font-bold text-[10px] text-white" :style="{ backgroundColor: i === 1 ? '#6366f1' : i === 2 ? '#10b981' : '#f59e0b' }">
                     {{ i }}
                   </div>
                 </div>
                 <div class="text-[10px] sm:text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">820+ Xodimlar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['start'])

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
