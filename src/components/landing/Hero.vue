<template>
  <section class="relative min-h-[92vh] flex flex-col items-center justify-center pt-16 pb-24 overflow-hidden">

    <!-- Ambient Orbs -->
    <div class="absolute inset-0 pointer-events-none -z-10">
      <div class="absolute top-[-20%] left-[10%] w-[700px] h-[700px] rounded-full"
        style="background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%); filter: blur(1px);">
      </div>
      <div class="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full"
        style="background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%); filter: blur(1px);">
      </div>
      <div class="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full"
        style="background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%); filter: blur(1px);">
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
      <div class="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

        <!-- LEFT: Content -->
        <div class="text-center lg:text-left reveal-up active z-10">

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 mb-8">
            <span class="badge-premium">
              <span class="relative flex h-1.5 w-1.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              O'zbekiston №1 Savdo Tizimi
            </span>
          </div>

          <!-- H1 -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
            <span class="text-zinc-900 dark:text-white">Savdoni</span><br>
            <span class="text-gradient">Nazorat Qiling</span><br>
            <span class="text-zinc-500 dark:text-zinc-400 text-4xl sm:text-5xl lg:text-6xl font-bold">bir tizimda.</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
            Ombordan savdogacha, xodimlardan filiallar nazoratigacha — hamma jarayon yagona platformada, real vaqtda.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-14">
            <button
              @click="$emit('start')"
              class="btn-primary btn-shimmer relative w-full sm:w-auto px-8 py-3.5 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2.5 overflow-hidden"
            >
              <i class="pi pi-bolt text-sm"></i>
              Bepul Boshlash
              <span class="text-white/60 text-sm">→</span>
            </button>
            <button
              @click="scrollToPricing"
              class="btn-ghost w-full sm:w-auto px-8 py-3.5 rounded-xl text-[15px] text-zinc-700 dark:text-zinc-300 flex items-center justify-center gap-2.5"
            >
              <i class="pi pi-compass text-sm"></i>
              Narxlarni Ko'rish
            </button>
          </div>

          <!-- Trust Bar -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2">
            <div v-for="trust in trustItems" :key="trust.label" class="flex items-center gap-1.5">
              <i :class="trust.icon" class="text-primary text-[11px]"></i>
              <span class="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">{{ trust.label }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Dashboard Mockup -->
        <div class="relative hidden md:block reveal-up active" style="transition-delay:0.25s">

          <!-- Outer glow ring -->
          <div class="absolute inset-0 -m-6 rounded-3xl opacity-30"
            style="background: conic-gradient(from 180deg, rgba(124,58,237,0.4), rgba(6,182,212,0.3), rgba(245,158,11,0.2), rgba(124,58,237,0.4)); filter: blur(40px);">
          </div>

          <!-- Browser Frame -->
          <div class="relative animate-float">
            <!-- Frame Top -->
            <div class="glass-card rounded-t-2xl border-b-0 px-4 py-2.5 flex items-center gap-2"
              style="background: rgba(9,9,11,0.95); border-color: rgba(255,255,255,0.1);">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500/80 ring-1 ring-red-500/40"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 ring-1 ring-amber-500/40"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 ring-1 ring-emerald-500/40"></span>
              <div class="flex-1 mx-3 h-5 bg-white/[0.06] rounded-md flex items-center px-3">
                <span class="text-[9px] text-zinc-500 font-mono">app.siriuspos.uz/dashboard</span>
              </div>
            </div>

            <!-- Dashboard Content -->
            <div class="glass-card rounded-b-2xl overflow-hidden border-t-0 p-5 space-y-4"
              style="background: rgba(9,9,11,0.92); border-color: rgba(255,255,255,0.08);">

              <!-- Stat Cards Row -->
              <div class="grid grid-cols-3 gap-3">
                <div v-for="stat in mockStats" :key="stat.label"
                  class="rounded-xl p-3 border"
                  :style="`background: rgba(${stat.rgb},0.08); border-color: rgba(${stat.rgb},0.2)`">
                  <div class="text-[18px] font-black text-white mb-0.5">{{ stat.value }}</div>
                  <div class="text-[9px] font-bold uppercase tracking-wider" :style="`color: rgba(${stat.rgb},0.9)`">{{ stat.label }}</div>
                </div>
              </div>

              <!-- Chart Area -->
              <div class="rounded-xl p-4 border border-white/[0.06] bg-white/[0.02]">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Haftalik Savdo</span>
                  <span class="text-[10px] font-bold text-emerald-400">↑ +24%</span>
                </div>
                <div class="flex items-end gap-1.5 h-[70px]">
                  <div v-for="(h, i) in chartBars" :key="i"
                    class="flex-1 rounded-t-md transition-all duration-1000"
                    :style="`height:${h}%; background: ${i === 6 ? 'linear-gradient(to top, #7C3AED, #8B5CF6)' : 'rgba(124,58,237,0.25)'}`">
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <span v-for="d in ['Du','Se','Ch','Pa','Ju','Sh','Ya']" :key="d"
                    class="flex-1 text-center text-[8px] text-zinc-600 font-bold">{{ d }}</span>
                </div>
              </div>

              <!-- Recent Sales -->
              <div class="space-y-2">
                <div v-for="sale in mockSales" :key="sale.name"
                  class="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black shrink-0"
                    :style="`background: linear-gradient(135deg, ${sale.color1}, ${sale.color2})`">
                    {{ sale.name.charAt(0) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[11px] font-bold text-white truncate">{{ sale.name }}</div>
                    <div class="text-[9px] text-zinc-500">{{ sale.time }}</div>
                  </div>
                  <span class="text-[12px] font-extrabold" :class="sale.type === 'in' ? 'text-emerald-400' : 'text-zinc-400'">
                    {{ sale.type === 'in' ? '+' : '' }}{{ sale.amount }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Cards -->
          <!-- Card 1: Notification -->
          <div class="absolute -top-6 -right-8 z-20 animate-float-delayed">
            <div class="glass-card rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl"
              style="border-color: rgba(16,185,129,0.2)">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.25)">
                <i class="pi pi-arrow-up text-[12px]" style="color:#10b981"></i>
              </div>
              <div>
                <div class="text-[13px] font-extrabold text-zinc-900 dark:text-white">+2.4M so'm</div>
                <div class="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Bugungi savdo</div>
              </div>
            </div>
          </div>

          <!-- Card 2: Users -->
          <div class="absolute -bottom-6 -left-8 z-20 animate-float" style="animation-delay:-3s">
            <div class="glass-card rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl"
              style="border-color: rgba(124,58,237,0.2)">
              <div class="flex -space-x-2 shrink-0">
                <div v-for="(c, i) in avatarColors" :key="i"
                  class="w-7 h-7 rounded-lg border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-black text-white"
                  :style="`background: ${c}`">
                  {{ i + 1 }}
                </div>
              </div>
              <div>
                <div class="text-[11px] font-extrabold text-zinc-900 dark:text-white">128 faol xodim</div>
                <div class="w-full h-1 rounded-full mt-1.5" style="background:rgba(0,0,0,0.08)">
                  <div class="h-full w-3/4 rounded-full" style="background:linear-gradient(to right,#7C3AED,#06b6d4)"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
      <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Pastga</span>
      <div class="w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent"></div>
    </div>
  </section>
</template>

<script setup>
defineProps({ stats: { type: Object, default: () => ({}) } })
defineEmits(['start'])

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}

const trustItems = [
  { icon: 'pi pi-check-circle', label: '500+ Do\'kon' },
  { icon: 'pi pi-star-fill',    label: '4.9 / 5.0 Baho' },
  { icon: 'pi pi-shield',       label: '99.9% Uptime' },
  { icon: 'pi pi-clock',        label: '14 kun bepul' },
]

const mockStats = [
  { label: "Bugungi savdo", value: "284",   rgb: "124,58,237" },
  { label: "Daromad",       value: "4.2M",  rgb: "6,182,212" },
  { label: "Mijozlar",      value: "1.2K",  rgb: "245,158,11" },
]

const chartBars = [45, 62, 38, 75, 55, 88, 95]

const mockSales = [
  { name: 'Akmal Saidov',    time: '2 daq oldin', amount: '245,000',  type: 'in',  color1: '#7C3AED', color2: '#8B5CF6' },
  { name: 'Barno Karimova',  time: '5 daq oldin', amount: '89,500',   type: 'in',  color1: '#06b6d4', color2: '#0891b2' },
  { name: 'Jasur Toshmatov', time: '8 daq oldin', amount: '412,000',  type: 'in',  color1: '#f59e0b', color2: '#d97706' },
]

const avatarColors = ['#7C3AED', '#06b6d4', '#f59e0b']
</script>
