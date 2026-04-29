<template>
  <section id="testimonials" class="py-20 lg:py-28 relative overflow-hidden">
    <!-- Subtle band background -->
    <div class="absolute inset-0 bg-zinc-50 dark:bg-zinc-950/50 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
      <!-- Header -->
      <div class="text-center mb-14 reveal-up active">
        <div class="badge-premium mb-5">
          <i class="pi pi-star-fill text-[10px] text-amber-400"></i>
          4.9 / 5.0 Baho
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4">
          Mijozlarimiz <span class="text-gradient">nima deydi?</span>
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-base leading-relaxed">
          O'zbekiston bo'ylab 500+ tadbirkor Sirius POS'ga ishonch bildirishgan.
        </p>
      </div>

      <!-- Stars social proof -->
      <div class="flex items-center justify-center gap-4 mb-12 reveal-up active" style="transition-delay:0.1s">
        <div class="flex gap-0.5">
          <i v-for="s in 5" :key="s" class="pi pi-star-fill text-amber-400 text-[16px]"></i>
        </div>
        <span class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
          <strong class="text-zinc-900 dark:text-white">1,000+</strong> tadbirkor,
          o'rtacha <strong class="text-zinc-900 dark:text-white">4.9</strong> yulduz
        </span>
      </div>

      <!-- Marquee Row 1 -->
      <div class="relative group mb-4 overflow-hidden mask-marquee">
        <div class="flex gap-4 py-1 animate-marquee group-hover:pause-animation">
          <div
            v-for="(item, i) in [...row1, ...row1]"
            :key="`r1-${i}`"
            class="shrink-0 w-[280px] sm:w-[320px] glass-card rounded-2xl p-5 border border-zinc-200/60 dark:border-white/[0.06] hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
          >
            <!-- Avatar + Info -->
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                :style="{ background: item._grad }"
              >
                {{ (item.owner_name || item.full_name || 'M').charAt(0) }}
              </div>
              <div class="overflow-hidden">
                <h4 class="font-extrabold text-zinc-900 dark:text-white text-[14px] leading-tight truncate">
                  {{ item.owner_name || item.full_name }}
                </h4>
                <p class="text-[10px] font-bold text-primary uppercase tracking-wider truncate opacity-80">
                  {{ item.owner_position || item.position }} · {{ item.store_name || 'Sirius POS' }}
                </p>
              </div>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400 text-[12px] leading-relaxed italic">
              "{{ item.text || item.comment }}"
            </p>
            <div class="mt-3 flex gap-0.5">
              <i
                v-for="s in 5"
                :key="s"
                class="pi pi-star-fill text-[10px]"
                :class="s <= (item.rating || item.stars || 5) ? 'text-amber-400' : 'text-zinc-200 dark:text-zinc-700'"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Marquee Row 2 (reverse) -->
      <div class="relative group overflow-hidden mask-marquee">
        <div class="flex gap-4 py-1 animate-marquee-reverse group-hover:pause-animation">
          <div
            v-for="(item, i) in [...row2, ...row2]"
            :key="`r2-${i}`"
            class="shrink-0 w-[280px] sm:w-[320px] glass-card rounded-2xl p-5 border border-zinc-200/60 dark:border-white/[0.06] hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                :style="{ background: item._grad }"
              >
                {{ (item.owner_name || item.full_name || 'M').charAt(0) }}
              </div>
              <div class="overflow-hidden">
                <h4 class="font-extrabold text-zinc-900 dark:text-white text-[14px] leading-tight truncate">
                  {{ item.owner_name || item.full_name }}
                </h4>
                <p class="text-[10px] font-bold text-primary uppercase tracking-wider truncate opacity-80">
                  {{ item.owner_position || item.position }} · {{ item.store_name || 'Sirius POS' }}
                </p>
              </div>
            </div>
            <p class="text-zinc-500 dark:text-zinc-400 text-[12px] leading-relaxed italic">
              "{{ item.text || item.comment }}"
            </p>
            <div class="mt-3 flex gap-0.5">
              <i
                v-for="s in 5"
                :key="s"
                class="pi pi-star-fill text-[10px]"
                :class="s <= (item.rating || item.stars || 5) ? 'text-amber-400' : 'text-zinc-200 dark:text-zinc-700'"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  testimonials: { type: Array, required: true },
  loading:      { type: Boolean, default: false }
})

const gradients = [
  'linear-gradient(135deg,#7C3AED,#8B5CF6)',
  'linear-gradient(135deg,#06b6d4,#0891b2)',
  'linear-gradient(135deg,#f59e0b,#d97706)',
  'linear-gradient(135deg,#10b981,#059669)',
  'linear-gradient(135deg,#ef4444,#dc2626)',
  'linear-gradient(135deg,#8B5CF6,#06b6d4)',
]

const defaults = [
  { id:1, owner_name:'Akmal Saidov',      store_name:'Bahor Market',   text:'Tizim juda tez va qulay! Savdolarimizni avtomatlashtirishda bu CRM katta yordam berdi.',           rating:5, owner_position:'Tadbirkor'      },
  { id:2, owner_name:'Odilbek Rahimjonov', store_name:'Grand Store',    text:"Xodimlar boshqaruvi va ombor qoldig'ini kuzatish juda osonlashdi. Tavsiya qilaman!",             rating:5, owner_position:"Do'kon egasi"  },
  { id:3, owner_name:'Gulasal Karimova',   store_name:'Beauty Zone',    text:'Mijozlar bilan ishlash tizimi juda mukammal. Har bir mijoz tarixi saqlanib qolishi muhim edi.',   rating:5, owner_position:'Menejer'        },
  { id:4, owner_name:'Jasurbek Ismoilov',  store_name:'Tech World',     text:"Biznesimizni yangi bosqichga olib chiqdi. Analitika qismi ayniqsa zo'r ishlangan.",              rating:5, owner_position:'Tahlilchi'       },
  { id:5, owner_name:'Shaxlo Yusupova',    store_name:'Flora Boutique', text:'Har kuni hisobotlar ko\'rish vaqtimni kamaytirdi. Endi 5 daqiqada kunlik natijani ko\'raman.',   rating:5, owner_position:'Direktor'       },
  { id:6, owner_name:'Baxtiyor Tursunov',  store_name:'Alpha Trade',    text:'3 filialni bir paneldan boshqarish imkoni — bu tizimning eng katta afzalligi.',                  rating:5, owner_position:'Egasi'           },
]

const enriched = computed(() => {
  const list = props.testimonials?.length > 0 ? props.testimonials : defaults
  return list.map((t, i) => ({ ...t, _grad: gradients[i % gradients.length] }))
})

const half = computed(() => Math.ceil(enriched.value.length / 2))
const row1 = computed(() => enriched.value.slice(0, half.value))
const row2 = computed(() => enriched.value.slice(half.value).length ? enriched.value.slice(half.value) : enriched.value)
</script>

<style scoped>
.mask-marquee {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 60s linear infinite;
  will-change: transform;
}

.animate-marquee-reverse {
  display: flex;
  width: max-content;
  animation: marquee-reverse 55s linear infinite;
  will-change: transform;
}

@keyframes marquee         { 0% { transform: translateX(0); }    100% { transform: translateX(-50%); } }
@keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); }    }

.pause-animation { animation-play-state: paused; }
</style>
