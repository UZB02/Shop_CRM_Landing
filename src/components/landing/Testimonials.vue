<template>
  <section id="testimonials" class="py-32 bg-mesh relative overflow-hidden">
    <!-- Decor bg -->
    <div class="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[130px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="text-center mb-16 reveal active">
        <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">{{ $t('landing.testimonials.title') }}</h2>
        <p class="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-2xl mx-auto">{{ $t('landing.testimonials.subtitle') }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex gap-6 overflow-hidden">
        <div v-for="i in 4" :key="i" class="min-w-[320px] h-48 bg-white/50 dark:bg-white/5 rounded-3xl animate-pulse border border-white/5"></div>
      </div>

      <!-- Modern Marquee Carousel with CSS Masking -->
      <div v-else class="relative group">
        <div class="flex overflow-hidden py-10 px-4 mask-marquee">
          <div class="flex gap-8 animate-marquee group-hover:pause-animation">
            <!-- Double the items for seamless loop -->
            <div 
              v-for="(item, index) in [...localTestimonials, ...localTestimonials]" 
              :key="`${item.id}-${index}`"
              class="min-w-[320px] sm:min-w-[380px] bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl transition-transform duration-500 hover:scale-[1.02]"
            >
              <div class="flex items-center gap-4 mb-6">
                <!-- Avatar / Placeholder logic -->
                <div class="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary to-accent text-white font-black text-lg shadow-lg shrink-0">
                  <img v-if="item.avatar" :src="item.avatar" class="w-full h-full object-cover" :alt="item.owner_name || item.full_name">
                  <span v-else>{{ (item.owner_name || item.full_name || 'M').charAt(0) }}</span>
                </div>
                <div class="overflow-hidden">
                  <h4 class="font-black text-slate-900 dark:text-white text-base leading-none mb-1 truncate">
                    {{ item.owner_name || item.full_name }}
                  </h4>
                  <p class="text-[10px] font-bold text-primary uppercase tracking-widest truncate">
                    {{ item.owner_position || item.position }} @ {{ item.store_name || 'Shop CRM' }}
                  </p>
                </div>
                <div class="ml-auto flex gap-0.5 shrink-0">
                  <i v-for="s in 5" :key="s" class="pi pi-star-fill text-[10px]" :class="s <= (item.rating || item.stars) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'"></i>
                </div>
              </div>

              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium italic">
                "{{ item.text || item.comment }}"
              </p>
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
  testimonials: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Fallback static data - Aligned with API Naming
const defaultTestimonials = [
  {
    id: 1,
    owner_name: 'Akmal Saidov',
    store_name: 'Bahor Market',
    text: 'Tizim juda tez va qulay! Savdolarimizni avtomatlashtirishda bu CRM bizga juda katta yordam berdi.',
    rating: 5,
    owner_position: 'Tadbirkor',
    avatar: null
  },
  {
    id: 2,
    owner_name: 'Odilbek Rahimjonov',
    store_name: 'Grand Store',
    text: 'Xodimlar boshqaruvi va ombor qoldig\'ini kuzatish juda osonlashdi. Tavsiya qilaman!',
    rating: 5,
    owner_position: 'Do\'kon egasi',
    avatar: null
  },
  {
    id: 3,
    owner_name: 'Gulasal Karizova',
    store_name: 'Beauty Zone',
    text: 'Mijozlar bilan ishlash tizimi juda mukammal. Har bir mijoz tarixi saqlanib qolishi biz uchun muhim edi.',
    rating: 5,
    owner_position: 'Menejer',
    avatar: null
  },
  {
    id: 4,
    owner_name: 'Jasurbek Ismoilov',
    store_name: 'Tech World',
    text: 'Biznesimizni yangi bosqichga olib chiqdi. Analitika qismi ayniqsa zo\'r ishlangan.',
    rating: 5,
    owner_position: 'Biznes tahlilchi',
    avatar: null
  }
]

const localTestimonials = computed(() => {
  return props.testimonials && props.testimonials.length > 0 ? props.testimonials : defaultTestimonials
})
</script>

<style scoped>
.mask-marquee {
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 15%,
    rgba(0, 0, 0, 1) 85%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 15%,
    rgba(0, 0, 0, 1) 85%,
    rgba(0, 0, 0, 0) 100%
  );
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 50s linear infinite;
  will-change: transform;
}

@keyframes marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.pause-animation {
  animation-play-state: paused;
}
</style>
