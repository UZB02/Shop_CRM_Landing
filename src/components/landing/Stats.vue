<template>
  <section class="py-12 relative overflow-hidden stats-band">
    <!-- Dot grid overlay -->
    <div class="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
        style="background: var(--stats-border)">
        <div
          v-for="(item, i) in statItems"
          :key="item.label"
          class="reveal-up active flex flex-col items-center justify-center py-10 px-6 stats-cell
                 hover:bg-primary/[0.04] dark:hover:bg-primary/[0.08] transition-colors duration-300 group"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <!-- Icon -->
          <div class="mb-3">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center"
              :style="`background: rgba(${item.rgb}, 0.12); border: 1px solid rgba(${item.rgb}, 0.25)`"
            >
              <i :class="item.icon" class="text-[14px]" :style="`color: rgba(${item.rgb}, 1)`"></i>
            </div>
          </div>

          <!-- Number -->
          <div
            class="text-3xl lg:text-[2.5rem] font-black text-zinc-900 dark:text-white mb-1.5 leading-none"
            style="font-family:'Plus Jakarta Sans',sans-serif"
          >
            {{ item.display }}
          </div>

          <!-- Label -->
          <div class="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.12em] text-center">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  stats: { type: Object, default: () => ({}) }
})

const statItems = computed(() => [
  {
    display: (props.stats?.total_stores  || 500) + '+',
    label:   "Faol Do'kon",
    icon:    'pi pi-shop',
    rgb:     '124,58,237',
  },
  {
    display: props.stats?.total_workers > 1000
      ? Math.floor(props.stats.total_workers / 1000) + 'K+'
      : (props.stats?.total_workers || '3K+'),
    label:   'Faol Xodim',
    icon:    'pi pi-users',
    rgb:     '6,182,212',
  },
  {
    display: props.stats?.total_sales_count > 1000
      ? Math.floor(props.stats.total_sales_count / 1000) + 'K+'
      : (props.stats?.total_sales_count || '10K+'),
    label:   'Kunlik Sotuv',
    icon:    'pi pi-chart-bar',
    rgb:     '245,158,11',
  },
  {
    display: (props.stats?.cities_count || 30) + '+',
    label:   'Shahar',
    icon:    'pi pi-map-marker',
    rgb:     '16,185,129',
  },
])
</script>
