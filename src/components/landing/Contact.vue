<template>
  <section id="contact" class="py-32 bg-mesh relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="max-w-6xl mx-auto glass-card rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden flex flex-col md:flex-row reveal active">
        <!-- Info Side -->
        <div class="md:w-5/12 bg-gradient-to-br from-primary to-primary-dark p-8 sm:p-12 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div class="relative z-10 h-full flex flex-col">
            <h2 class="text-3xl sm:text-4xl font-black mb-6 sm:mb-8 tracking-tight">{{ $t('landing.contact.title') }}</h2>
            <p class="text-white/80 mb-10 sm:mb-12 text-base sm:text-lg leading-relaxed font-medium">
              {{ $t('landing.contact.subtitle') }}
            </p>

            <div class="space-y-6 sm:space-y-8">
              <div class="flex items-center group">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mr-4 sm:mr-5 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                  <i class="pi pi-phone text-lg sm:text-xl"></i>
                </div>
                <div>
                  <p class="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1">Telefon</p>
                  <p class="text-lg sm:text-xl font-bold">+998 90 123 45 67</p>
                </div>
              </div>

              <div class="flex items-center group">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mr-4 sm:mr-5 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                  <i class="pi pi-envelope text-lg sm:text-xl"></i>
                </div>
                <div>
                  <p class="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-1">Elektron pochta</p>
                  <p class="text-lg sm:text-xl font-bold">info@shop-crm.uz</p>
                </div>
              </div>
            </div>

            <div class="mt-12 sm:mt-auto pt-10 sm:pt-16 flex space-x-4">
              <a href="#" v-for="icon in ['telegram', 'instagram', 'facebook']" :key="icon" class="w-11 h-11 sm:w-12 sm:h-12 bg-white/15 rounded-xl flex items-center justify-center hover:bg-white/25 transition-all hover:-translate-y-1 shadow-lg">
                <i :class="[`pi pi-${icon}`, 'text-lg sm:text-xl']"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Form Side -->
        <div class="md:w-7/12 p-8 sm:p-12 lg:p-16 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
          <form @submit.prevent="handleSubmit" class="space-y-6 sm:space-y-8">
            <div v-if="successMsg" class="p-5 bg-accent/10 text-accent rounded-2xl border border-accent/20 flex items-center font-bold animate-fade-in text-sm sm:text-base">
              <i class="pi pi-check-circle mr-3 text-xl"></i>
              {{ successMsg }}
            </div>

            <div v-if="errorMsg" class="p-5 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20 flex items-center font-bold animate-fade-in text-sm sm:text-base">
              <i class="pi pi-exclamation-circle mr-3 text-xl"></i>
              {{ errorMsg }}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div class="space-y-3">
                <label class="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{{ $t('landing.contact.form.name') }}</label>
                <div class="relative group">
                  <i class="pi pi-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input 
                    v-model="form.full_name"
                    type="text" 
                    required
                    placeholder="Aziz Rahimov"
                    class="w-full pl-12 pr-4 py-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-slate-900 dark:text-white text-sm sm:text-base"
                  />
                </div>
              </div>

              <div class="space-y-3">
                <label class="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{{ $t('landing.contact.form.phone') }}</label>
                <div class="relative group">
                  <i class="pi pi-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    required
                    placeholder="+998 90 123 45 67"
                    class="w-full pl-12 pr-4 py-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-slate-900 dark:text-white text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{{ $t('landing.contact.form.message') }}</label>
              <textarea 
                v-model="form.message"
                rows="4"
                placeholder="Qanday yordam bera olamiz?"
                class="w-full px-5 py-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-slate-900 dark:text-white resize-none text-sm sm:text-base"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="loading"
              class="w-full h-14 sm:h-16 bg-primary hover:bg-primary-dark text-white font-black text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
            >
              <i v-if="loading" class="pi pi-spin pi-spinner"></i>
              <i v-else class="pi pi-send"></i>
              {{ loading ? $t('landing.contact.form.sending') : $t('landing.contact.form.submit') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { landingApi } from '@/api/landing'

const loading = ref(false)
const errorMsg = ref(null)
const successMsg = ref(null)

const form = reactive({
  full_name: '',
  phone: '',
  message: ''
})

const handleSubmit = async () => {
  loading.value = true
  errorMsg.value = null
  successMsg.value = null

  try {
    const res = await landingApi.sendContact(form)
    successMsg.value = res.message
    form.full_name = ''
    form.phone = ''
    form.message = ''
  } catch (err) {
    if (err.status === 429) {
      errorMsg.value = "Kunlik murojaat limitiga yetdingiz. Ertaga qayta urinib ko'ring."
    } else if (err.data) {
      const firstError = Object.values(err.data)[0]?.[0]
      errorMsg.value = firstError || "Xatolik yuz berdi."
    } else {
      errorMsg.value = "Server bilan bog'lanishda xatolik."
    }
  } finally {
    loading.value = false
  }
}
</script>
