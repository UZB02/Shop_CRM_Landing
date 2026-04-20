<template>
  <section id="faq" class="py-32 relative overflow-hidden bg-[#030712]">
    <!-- Background Layer (Isolated for performance) -->
    <div class="absolute inset-0 bg-mesh opacity-50 pointer-events-none"></div>
    <div class="absolute top-[30%] right-[-5%] w-[35%] h-[35%] bg-primary/5 rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="text-center mb-16 reveal active">
        <h2 class="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
          Ko'p beriladigan <span class="text-primary italic">savollar</span>
        </h2>
        <p class="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-xl mx-auto">
          Shop CRM haqidagi asosiy savollarga qisqa va aniq javoblar
        </p>
      </div>

      <!-- Categories - Optimized -->
      <div class="flex flex-wrap justify-center gap-2 mb-16 reveal active">
        <button 
          v-for="(label, key) in categories" 
          :key="key"
          @click="activeCategory = key"
          class="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200"
          :class="activeCategory === key ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'"
        >
          {{ label }}
        </button>
      </div>

      <!-- FAQ Grid - High performance layout isolation -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start reveal active">
        <div v-if="loading" v-for="i in 6" :key="i" class="h-16 bg-white/5 dark:bg-white/5 rounded-2xl animate-pulse"></div>
        
        <template v-else>
          <div 
            v-for="faq in filteredFaqs" 
            :key="faq.id" 
            class="faq-item"
          >
            <div 
              class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-shadow duration-300"
              :class="{'ring-1 ring-primary/30 shadow-lg': openFaqId === faq.id}"
            >
              <button 
                @click="toggleFaq(faq.id)"
                class="w-full flex items-center justify-between p-5 text-left active:bg-slate-50 dark:active:bg-slate-800"
              >
                <span class="font-bold text-sm sm:text-base text-slate-900 dark:text-white pr-6">
                  {{ faq.question }}
                </span>
                <div 
                  :class="[
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 transform-gpu',
                    openFaqId === faq.id ? 'bg-primary text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  ]"
                >
                  <i class="pi pi-chevron-down text-[8px]"></i>
                </div>
              </button>
              
              <!-- Highly Optimized Animation -->
              <div 
                class="faq-answer-container"
                :class="{ 'faq-answer-open': openFaqId === faq.id }"
              >
                <div class="faq-answer-inner overflow-hidden">
                  <div class="px-5 pb-6 text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-xs sm:text-sm border-t border-slate-100 dark:border-slate-800 mt-1 pt-4">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Still Have Questions? -->
      <div class="mt-16 text-center reveal active">
        <div class="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p class="text-sm font-bold text-slate-600 dark:text-slate-300 px-4">Sizda hali ham savollar bormi?</p>
          <a href="#contact" class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs uppercase tracking-widest">
            Biz bilan bog'laning
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  faqs: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const activeCategory = ref('all')
const openFaqId = ref(null)

const categories = {
  all: 'Barchasi',
  general: 'Umumiy',
  pricing: 'Narxlar',
  technical: 'Texnik',
  features: 'Imkoniyatlar'
}

const defaultFaqs = [
  {
    id: 'd1',
    category: 'general',
    question: 'Shop CRM qanday do\'konlar uchun mos keladi?',
    answer: 'Tizimimiz kiyim-kechak, oziq-ovqat, elektrotexnika, dorixona va boshqa barcha turdagi chakana savdo do\'konlari uchun moslashgan.'
  },
  {
    id: 'd2',
    category: 'pricing',
    question: 'Bepul sinov muddati mavjudmi?',
    answer: 'Ha, ro\'yxatdan ochiqishingiz bilan sizga 14 kunlik bepul to\'liq imkoniyatli test muddati beriladi.'
  },
  {
    id: 'd3',
    category: 'technical',
    question: 'Tizim internet siz ham ishlaydimi?',
    answer: 'Shop CRM bulutli tizim bo\'lgani uchun internet talab etiladi, biroq qisqa muddatli uzilishlarda ma\'lumotlar keshlanadi.'
  },
  {
    id: 'd4',
    category: 'features',
    question: 'Telegram orqali xabar yuborish imkoniyati bormi?',
    answer: 'Ha, integratsiya orqali har bir savdo haqida xabarlarni yoki mijozlarga aksiyalar haqida xabar yuborishingiz mumkin.'
  },
  {
    id: 'd5',
    category: 'general',
    question: 'Ma\'lumotlar xavfsizligi qanday ta\'minlanadi?',
    answer: 'Barcha ma\'lumotlar shifrlangan holda xalqaro standartlarga javob beradigan xavfsiz serverlarda saqlanadi.'
  },
  {
    id: 'd6',
    category: 'pricing',
    question: 'To\'lovlarni qanday usullarda amalga oshirsa bo\'ladi?',
    answer: 'Click, Payme, Uzum orqali yoki pul o\'tkazish yo\'li bilan shartnoma asosida to\'lov qilish mumkin.'
  }
]

const localFaqs = computed(() => {
  return props.faqs && props.faqs.length > 0 ? props.faqs : defaultFaqs
})

const filteredFaqs = computed(() => {
  if (activeCategory.value === 'all') return localFaqs.value
  return localFaqs.value.filter(f => f.category === activeCategory.value)
})

const toggleFaq = (id) => {
  openFaqId.value = openFaqId.value === id ? null : id
}
</script>

<style scoped>
.faq-item {
  contain: layout; /* Layout Isolation for performance */
}

.faq-answer-container {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms;
  will-change: grid-template-rows, opacity;
}

.faq-answer-open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.faq-answer-inner {
  min-height: 0;
}

/* Specific background for FAQ to isolate radial gradient */
.bg-mesh {
  background: radial-gradient(circle at 0% 0%, #0f172a 0%, #1e1b4b 100%);
}
</style>
