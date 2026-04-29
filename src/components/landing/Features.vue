<template>
  <section id="features" class="py-20 lg:py-28 relative overflow-hidden">
    <!-- Ambient -->
    <div class="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%);">
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <!-- Header -->
      <div class="text-center mb-14 reveal-up active">
        <div class="badge-premium mb-5">
          <i class="pi pi-star text-[10px]"></i>
          50+ Imkoniyat
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4">
          Hamma narsani boshqaring <br class="hidden sm:block">
          <span class="text-gradient">bir joydan</span>
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
          Kichik do'kondan yirik tarmoqgacha — barcha jarayonlarni avtomatlashtirish uchun mo'ljallangan.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4">

        <!-- KATTA: Savdo Tahlili (col-span-4) -->
        <div class="md:col-span-4 reveal-up active group" style="transition-delay:0.1s">
          <div class="glass-card hover-lift rounded-2xl p-7 h-full border border-zinc-200/60 dark:border-white/[0.06] relative overflow-hidden">
            <div class="absolute -right-16 -bottom-16 w-48 h-48 rounded-full opacity-30 group-hover:opacity-50 transition-opacity"
              style="background: radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%);">
            </div>

            <div class="flex items-start justify-between mb-6">
              <div>
                <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style="background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.2)">
                  <i class="pi pi-chart-pie text-xl" style="color:#7C3AED"></i>
                </div>
                <h3 class="text-xl font-extrabold text-zinc-900 dark:text-white mb-2">
                  {{ features[0]?.title || 'Savdo Tahlili' }}
                </h3>
                <p class="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed max-w-sm">
                  {{ features[0]?.desc || "Har kunlik, haftalik va oylik savdo ko'rsatkichlarini real vaqtda kuzating." }}
                </p>
              </div>
              <span class="hidden md:flex items-center gap-1 text-[10px] font-bold rounded-full px-3 py-1 shrink-0 ml-4"
                style="color:#10b981; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2)">
                <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#10b981"></span>
                Jonli
              </span>
            </div>

            <!-- Mini Bar Chart -->
            <div class="flex items-end gap-1.5 h-[80px] px-2">
              <div
                v-for="(h, i) in chartHeights"
                :key="i"
                class="flex-1 rounded-t-sm transition-all duration-700"
                :style="`height:${h}%; background: ${i >= 9 ? 'linear-gradient(to top, #7C3AED, #8B5CF6)' : 'rgba(124,58,237,0.15)'}; transition-delay:${i*30}ms`"
              ></div>
            </div>
            <div class="flex justify-between mt-2 px-2">
              <span v-for="m in months" :key="m"
                class="flex-1 text-center text-[8px] text-zinc-400 font-bold">{{ m }}</span>
            </div>
          </div>
        </div>

        <!-- O'RTA: Omborxona (col-span-2) -->
        <div class="md:col-span-2 reveal-up active" style="transition-delay:0.2s">
          <div class="glass-card hover-lift rounded-2xl p-6 h-full border border-zinc-200/60 dark:border-white/[0.06] group relative overflow-hidden">
            <div class="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-20"
              style="background: radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%);">
            </div>
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
              style="background:rgba(6,182,212,0.1); border:1px solid rgba(6,182,212,0.2)">
              <i class="pi pi-box text-xl" style="color:#06b6d4"></i>
            </div>
            <h3 class="text-lg font-extrabold text-zinc-900 dark:text-white mb-2">
              {{ features[1]?.title || 'Omborxona' }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-[12px] leading-relaxed">
              {{ features[1]?.desc || "Mahsulot qoldig'ini va harakatini avtomatik kuzating." }}
            </p>
            <!-- Mini inventory -->
            <div class="mt-5 space-y-2.5">
              <div v-for="item in inventoryItems" :key="item.name" class="flex items-center gap-2">
                <span class="text-[9px] font-bold text-zinc-400 w-14 truncate">{{ item.name }}</span>
                <div class="flex-1 h-1.5 rounded-full overflow-hidden" style="background:rgba(6,182,212,0.12)">
                  <div class="h-full rounded-full" :style="`width:${item.pct}%; background:rgba(6,182,212,0.7)`"></div>
                </div>
                <span class="text-[9px] font-bold text-zinc-400">{{ item.pct }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- KICHIK: Xodimlar (col-span-2) -->
        <div class="md:col-span-2 reveal-up active" style="transition-delay:0.3s">
          <div class="glass-card hover-lift rounded-2xl p-6 h-full border border-zinc-200/60 dark:border-white/[0.06] group">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform"
              style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.2)">
              <i class="pi pi-users text-xl" style="color:#8B5CF6"></i>
            </div>
            <h3 class="text-lg font-extrabold text-zinc-900 dark:text-white mb-2">
              {{ features[2]?.title || 'Xodimlar' }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-[12px] leading-relaxed mb-4">
              {{ features[2]?.desc || 'Har bir xodim ishlashini nazorat qiling.' }}
            </p>
            <!-- Avatar stack -->
            <div class="flex -space-x-2">
              <div v-for="(c, i) in workerColors" :key="i"
                class="w-8 h-8 rounded-xl border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-black text-white"
                :style="`background:${c}`">{{ i + 1 }}</div>
              <div class="w-8 h-8 rounded-xl border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-bold text-zinc-500"
                style="background:rgba(0,0,0,0.06)">+8</div>
            </div>
          </div>
        </div>

        <!-- KICHIK: Filiallar (col-span-2) -->
        <div class="md:col-span-2 reveal-up active" style="transition-delay:0.4s">
          <div class="glass-card hover-lift rounded-2xl p-6 h-full border border-zinc-200/60 dark:border-white/[0.06] group">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform"
              style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2)">
              <i class="pi pi-map-marker text-xl" style="color:#f59e0b"></i>
            </div>
            <h3 class="text-lg font-extrabold text-zinc-900 dark:text-white mb-2">
              {{ features[3]?.title || 'Filiallar' }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-[12px] leading-relaxed mb-4">
              {{ features[3]?.desc || 'Bir nechta filialni yagona paneldan boshqaring.' }}
            </p>
            <div class="text-3xl font-black leading-none" style="color:#f59e0b; font-family:'Plus Jakarta Sans',sans-serif">
              30+ <span class="text-[11px] text-zinc-400 font-bold">shahar</span>
            </div>
          </div>
        </div>

        <!-- KICHIK: Xavfsizlik (col-span-2) -->
        <div class="md:col-span-2 reveal-up active" style="transition-delay:0.5s">
          <div class="glass-card hover-lift rounded-2xl p-6 h-full border border-zinc-200/60 dark:border-white/[0.06] group relative overflow-hidden">
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style="background:linear-gradient(135deg,rgba(16,185,129,0.04),transparent)">
            </div>
            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
              style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2)">
              <i class="pi pi-shield text-xl" style="color:#10b981"></i>
            </div>
            <h3 class="text-lg font-extrabold text-zinc-900 dark:text-white mb-2">
              {{ features[4]?.title || 'Xavfsizlik' }}
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 text-[12px] leading-relaxed mb-3">
              {{ features[4]?.desc || 'SSL, 2FA va bank darajasida shifrlash.' }}
            </p>
            <div class="flex items-center gap-1.5 text-[10px] font-bold" style="color:#10b981">
              <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#10b981"></span>
              99.9% Uptime
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ features: Array })

const chartHeights  = [30, 55, 40, 70, 60, 85, 75, 90, 65, 95, 80, 100]
const months        = ['Yan','Feb','Mar','Apr','May','Iyn','Iyl','Avg','Sen','Okt','Noy','Dek']
const inventoryItems = [
  { name: 'Kiyim',       pct: 78 },
  { name: 'Oziq-ovqat', pct: 45 },
  { name: 'Elektronika', pct: 62 },
]
const workerColors = ['#7C3AED', '#06b6d4', '#f59e0b', '#10b981']
</script>
