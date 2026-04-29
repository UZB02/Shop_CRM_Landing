<template>
  <section id="faq" class="py-20 lg:py-28 relative overflow-hidden">
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
      style="background: radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%);">
    </div>

    <div class="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
      <!-- Header -->
      <div class="text-center mb-12 reveal-up active">
        <div class="badge-premium mb-5">
          <i class="pi pi-question-circle text-[10px]"></i>
          FAQ
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4">
          Savollaringizga <span class="text-gradient">javob</span>
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed max-w-md mx-auto">
          Sirius POS haqidagi eng ko'p beriladigan savollarga qisqa va aniq javoblar.
        </p>
      </div>

      <!-- Category tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-10 reveal-up active" style="transition-delay:0.1s">
        <button
          v-for="(label, key) in categories"
          :key="key"
          @click="activeCategory = key"
          class="px-4 py-2 rounded-xl text-[12px] font-bold transition-all border"
          :class="activeCategory === key
            ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
            : 'bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-white/[0.08] hover:border-primary/40'"
        >
          {{ label }}
        </button>
      </div>

      <!-- FAQ List -->
      <div class="space-y-2.5 reveal-up active" style="transition-delay:0.15s">
        <div v-if="loading" v-for="i in 6" :key="i"
          class="h-14 glass-card rounded-xl animate-pulse">
        </div>

        <template v-else>
          <div
            v-for="(faq, index) in filteredFaqs"
            :key="faq.id"
            class="overflow-hidden rounded-2xl border transition-all duration-300"
            :class="openFaqId === faq.id
              ? 'border-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.1)] bg-primary/[0.03] dark:bg-primary/[0.05]'
              : 'border-zinc-200/70 dark:border-white/[0.07] glass-card hover:border-primary/20'"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full flex items-center gap-5 px-6 py-4.5 text-left group"
              style="padding-top:18px; padding-bottom:18px"
            >
              <!-- Number -->
              <span class="text-[12px] font-black shrink-0 w-7 text-center"
                :class="openFaqId === faq.id ? 'text-primary' : 'text-zinc-300 dark:text-zinc-700'">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <span class="flex-1 text-[14px] font-semibold text-zinc-800 dark:text-zinc-100 pr-4 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {{ faq.question }}
              </span>

              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                :class="openFaqId === faq.id
                  ? 'bg-primary text-white rotate-45'
                  : 'bg-zinc-100 dark:bg-white/[0.07] text-zinc-400'"
              >
                <i class="pi pi-plus text-[10px] font-black"></i>
              </div>
            </button>

            <!-- Answer -->
            <div
              class="faq-answer"
              :class="{ 'faq-answer-open': openFaqId === faq.id }"
            >
              <div class="faq-inner">
                <div class="px-6 pb-5 ml-12">
                  <div class="h-px bg-zinc-100 dark:bg-white/[0.06] mb-4"></div>
                  <p class="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-12 text-center reveal-up active" style="transition-delay:0.25s">
        <div class="glass-card inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl border border-zinc-200/60 dark:border-white/[0.06]">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <i class="pi pi-comment text-primary text-[12px]"></i>
            </div>
            <span class="text-[13px] font-semibold text-zinc-600 dark:text-zinc-300">Boshqa savol bormi?</span>
          </div>
          <a href="#contact"
            class="btn-primary relative overflow-hidden btn-shimmer px-6 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap">
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
  faqs:    { type: Array, required: true },
  loading: { type: Boolean, default: false }
})

const activeCategory = ref('all')
const openFaqId      = ref(null)

const categories = {
  all:       'Barchasi',
  general:   'Umumiy',
  pricing:   'Narxlar',
  technical: 'Texnik',
  features:  'Imkoniyatlar',
}

const defaultFaqs = [
  { id:'d1', category:'general',   question:"Sirius POS qanday do'konlar uchun mos?",           answer:"Kiyim-kechak, oziq-ovqat, elektrotexnika, dorixona va boshqa barcha turdagi chakana savdo do'konlari uchun moslashgan." },
  { id:'d2', category:'pricing',   question:"Bepul sinov muddati bormi?",                        answer:"Ha, ro'yxatdan o'tganingizdan so'ng 14 kunlik to'liq imkoniyatli bepul sinov muddati beriladi." },
  { id:'d3', category:'technical', question:"Internet bo'lmasa tizim ishlaydimi?",               answer:"Sirius POS bulutli tizim bo'lgani uchun internet talab etiladi, biroq qisqa muddatli uzilishlarda ma'lumotlar keshlanadi." },
  { id:'d4', category:'features',  question:"Telegram orqali xabar yuborish imkoni bormi?",      answer:"Ha, har bir savdo yoki aksiyalar haqida mijozlarga va sizga Telegram orqali xabar yuboriladi." },
  { id:'d5', category:'general',   question:"Ma'lumotlar xavfsizligi qanday ta'minlanadi?",     answer:"Barcha ma'lumotlar AES-256 shifrlangan holda xalqaro standartlarga javob beradigan serverlarda saqlanadi." },
  { id:'d6', category:'pricing',   question:"To'lov qanday usullarda amalga oshiriladi?",       answer:"Click, Payme, Uzum Nasiya orqali yoki bank o'tkazmasi yo'li bilan shartnoma asosida to'lov qilish mumkin." },
]

const localFaqs    = computed(() => props.faqs?.length > 0 ? props.faqs : defaultFaqs)
const filteredFaqs = computed(() => activeCategory.value === 'all' ? localFaqs.value : localFaqs.value.filter(f => f.category === activeCategory.value))

const toggleFaq = (id) => { openFaqId.value = openFaqId.value === id ? null : id }
</script>

<style scoped>
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease;
}
.faq-answer-open {
  grid-template-rows: 1fr;
  opacity: 1;
}
.faq-inner { min-height: 0; }
</style>
