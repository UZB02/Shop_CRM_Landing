<template>
  <div class="min-h-screen flex items-center justify-center bg-cosmic bg-dot-grid p-4 relative overflow-hidden">
    
    <!-- Background premium gradients matching main landing design -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
    </div>

    <!-- Main Container -->
    <div class="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-10 border border-zinc-200/50 dark:border-white/[0.06] shadow-2xl z-10 transition duration-300 relative">
      
      <!-- LOADING CODE VALIDATION STATE -->
      <div v-if="isValidating" class="flex flex-col items-center justify-center py-16 text-center">
        <div class="relative w-16 h-16 mb-4">
          <div class="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <h3 class="text-base font-extrabold text-zinc-800 dark:text-zinc-200">Taklif havolasi tekshirilmoqda...</h3>
        <p class="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 font-semibold tracking-wider">Iltimos, kuting</p>
      </div>

      <!-- INVALID / 404 STATE -->
      <div v-else-if="codeError" class="flex flex-col items-center justify-center py-8 text-center">
        <div class="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6 border border-rose-500/25">
          <i class="pi pi-exclamation-triangle text-3xl"></i>
        </div>
        <h3 class="text-lg font-black text-zinc-950 dark:text-white tracking-tight">Noto'g'ri referral havola</h3>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm font-medium leading-relaxed">
          Kechirasiz, ushbu taklif havolasi noto'g'ri, muddati o'tgan yoki tizimda mavjud emas. Iltimos, havolani qaytadan tekshirib ko'ring.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
          <a :href="homeUrl" class="btn-primary flex items-center justify-center px-5 h-11 text-xs font-bold rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-primary/20">
            Bosh sahifaga o'tish
          </a>
        </div>
      </div>

      <!-- FORM SUBMISSION SUCCESS STATE -->
      <div v-else-if="isSubmitted" class="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
        <div class="relative w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
          <i class="pi pi-check-circle text-4xl"></i>
          <!-- Celebration pulse ring -->
          <div class="absolute -inset-2 rounded-full border border-emerald-500/30 animate-ping opacity-75"></div>
        </div>
        
        <h3 class="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Xabaringiz qabul qilindi!</h3>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-3 max-w-sm font-semibold leading-relaxed">
          Biz siz bilan qisqa vaqt ichida bog'lanamiz va Sirius POS tizimini o'rnatish bo'yicha batafsil ma'lumot beramiz.
        </p>

        <div class="mt-8 w-full border-t border-zinc-100 dark:border-white/[0.08] pt-6">
          <a :href="homeUrl" class="inline-flex items-center gap-2 text-xs font-black text-primary hover:underline">
            <span>Bosh sahifaga qaytish</span>
            <i class="pi pi-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>

      <!-- MAIN INPUT FORM STATE -->
      <div v-else class="space-y-6">
        
        <!-- Header -->
        <div class="text-center relative">
          <div class="inline-flex items-center justify-center gap-2.5 mb-5">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <i class="pi pi-star-fill text-white text-lg"></i>
            </div>
            <span class="text-2xl font-black text-zinc-950 dark:text-white tracking-tighter">
              Sirius <span class="text-primary italic">POS</span>
            </span>
          </div>

          <!-- Referral source banner -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-extrabold text-[10px] uppercase tracking-widest mb-3">
            <i class="pi pi-gift text-xs"></i>
            <span>{{ storeName }} tavsiyasi orqali</span>
          </div>

          <h2 class="text-lg font-black text-zinc-950 dark:text-white tracking-tight mt-1">Sirius POS tizimiga ulanish</h2>
          <p class="text-xs text-zinc-500 dark:text-zinc-450 font-semibold mt-1 max-w-sm mx-auto leading-relaxed">
            Sirius POS bilan do'koningiz savdolarini to'liq nazorat qiling. So'rov qoldiring, biz sizga yordam beramiz!
          </p>
        </div>

        <!-- System Alerts -->
        <div v-if="globalError" class="bg-rose-500/10 text-rose-500 p-4 rounded-xl text-xs font-semibold border border-rose-500/25">
          <i class="pi pi-exclamation-circle mr-2"></i> {{ globalError }}
        </div>

        <!-- Form fields -->
        <div class="space-y-4 pt-2">
          
          <!-- Name field -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">Ismingiz</label>
            <div class="relative">
              <i class="pi pi-user absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-[13px]"></i>
              <input 
                v-model="form.name" 
                type="text"
                placeholder="Masalan: Bobur Toshmatov" 
                class="w-full pl-10 pr-4 py-3 rounded-xl border text-[13px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white placeholder-zinc-450 focus:border-primary focus:ring-2 focus:ring-primary/20"
                :class="{ '!border-rose-500': fieldErrors.name }"
              />
            </div>
            <span v-if="fieldErrors.name" class="text-[10px] text-rose-500 font-bold pl-1 mt-0.5">{{ fieldErrors.name }}</span>
          </div>

          <!-- Phone field -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">Telefon raqamingiz</label>
            <div class="relative w-full">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold text-zinc-450">+998</span>
              <input 
                v-model="formattedPhone" 
                type="tel"
                placeholder=" (90) 123-45-67" 
                class="w-full pl-14 pr-4 py-3 rounded-xl border text-[13px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white placeholder-zinc-450 focus:border-primary focus:ring-2 focus:ring-primary/20"
                :class="{ '!border-rose-500': fieldErrors.phone }"
              />
            </div>
            <span v-if="fieldErrors.phone" class="text-[10px] text-rose-500 font-bold pl-1 mt-0.5">{{ fieldErrors.phone }}</span>
          </div>

          <!-- Message field -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">Qo'shimcha xabar (Ixtiyoriy)</label>
            <textarea 
              v-model="form.message" 
              rows="3"
              placeholder="Qanday do'kon ochmoqchisiz, qanday savollaringiz bor?" 
              class="w-full px-4 py-3 rounded-xl border text-[13px] font-medium outline-none transition-all resize-none bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white placeholder-zinc-450 focus:border-primary focus:ring-2 focus:ring-primary/20"
              :class="{ '!border-rose-500': fieldErrors.message }"
            ></textarea>
            <span v-if="fieldErrors.message" class="text-[10px] text-rose-500 font-bold pl-1 mt-0.5">{{ fieldErrors.message }}</span>
          </div>

          <!-- Submit Button -->
          <button 
            @click="handleSubmit" 
            :disabled="isSubmitting"
            class="btn-primary btn-shimmer relative w-full py-3.5 rounded-xl text-[14px] font-extrabold flex items-center justify-center gap-2 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed mt-4 shadow-lg shadow-primary/10 active:scale-[0.98] transition cursor-pointer"
          >
            <i v-if="isSubmitting" class="pi pi-spin pi-spinner text-xs"></i>
            <i v-else class="pi pi-send text-xs"></i>
            <span>{{ isSubmitting ? 'So\'rov yuborilmoqda...' : 'So\'rov yuborish' }}</span>
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const API_BASE = 'https://api.siriuspos.uz/api/v1'
const homeUrl = window.location.origin

// System statuses
const isValidating = ref(true)
const codeError = ref(false)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const globalError = ref('')

const storeName = ref('Do\'stimiz')

// Form states
const form = ref({
  name: '',
  phone: '',
  message: ''
})

const formattedPhone = ref('')
const fieldErrors = ref({})

// Native phone parser helper and auto-format input as (XX) XXX-XX-XX
watch(formattedPhone, (newVal) => {
  let digits = newVal.replace(/\D/g, '')
  if (digits.length > 9) {
    digits = digits.slice(0, 9)
  }

  let formatted = ''
  if (digits.length > 0) {
    formatted += '(' + digits.slice(0, 2)
  }
  if (digits.length > 2) {
    formatted += ') ' + digits.slice(2, 5)
  }
  if (digits.length > 5) {
    formatted += '-' + digits.slice(5, 7)
  }
  if (digits.length > 7) {
    formatted += '-' + digits.slice(7, 9)
  }

  if (formattedPhone.value !== formatted) {
    formattedPhone.value = formatted
  }

  if (digits) {
    form.value.phone = `+998${digits}`
  } else {
    form.value.phone = ''
  }
})

// Validate code on mount
const validateReferralCode = async () => {
  isValidating.value = true
  codeError.value = false
  try {
    const res = await fetch(`${API_BASE}/referral/${props.code}/`)
    const json = await res.json()
    if (res.ok && json.is_valid) {
      storeName.value = json.store_name
    } else {
      codeError.value = true
    }
  } catch (err) {
    console.error('Validation error:', err)
    codeError.value = true
  } finally {
    isValidating.value = false
  }
}

// Handle Form submit
const handleSubmit = async () => {
  fieldErrors.value = {}
  globalError.value = ''

  // Client-side validations
  if (!form.value.name.trim()) {
    fieldErrors.value.name = 'Ismingizni kiritishingiz shart.'
  }
  
  const rawDigits = formattedPhone.value.replace(/\D/g, '')
  if (!rawDigits || rawDigits.length !== 9) {
    fieldErrors.value.phone = "To'g'ri telefon raqam kiriting. Masalan: (90) 123-45-67"
  }

  if (Object.keys(fieldErrors.value).length > 0) {
    return
  }

  isSubmitting.value = true
  try {
    const res = await fetch(`${API_BASE}/referral/${props.code}/submit/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.value.name,
        phone: form.value.phone,
        message: form.value.message || ''
      })
    })

    const json = await res.json()

    if (res.status === 201) {
      isSubmitted.value = true
    } else if (res.status === 429) {
      globalError.value = "Juda ko'p urinish yuz berdi. Iltimos, birozdan keyin qayta urinib ko'ring."
    } else if (res.status === 400 && json) {
      if (json.name) fieldErrors.value.name = Array.isArray(json.name) ? json.name[0] : json.name
      if (json.phone) fieldErrors.value.phone = Array.isArray(json.phone) ? json.phone[0] : json.phone
      if (json.message) fieldErrors.value.message = Array.isArray(json.message) ? json.message[0] : json.message
    } else {
      globalError.value = json.detail || "Xatolik yuz berdi."
    }
  } catch (err) {
    globalError.value = "Server bilan bog'lanishda xatolik yuz berdi."
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  validateReferralCode()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
