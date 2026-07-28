<template>
  <div class="min-h-screen flex items-center justify-center bg-cosmic bg-dot-grid p-4 relative overflow-hidden">

    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
    </div>

    <div class="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-10 border border-zinc-200/50 dark:border-white/[0.06] shadow-2xl z-10 transition duration-300 relative">

      <!-- LOADING CODE VALIDATION STATE -->
      <div v-if="isValidating" class="flex flex-col items-center justify-center py-16 text-center">
        <div class="relative w-16 h-16 mb-4">
          <div class="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <h3 class="text-base font-extrabold text-zinc-800 dark:text-zinc-200">Havola tekshirilmoqda...</h3>
        <p class="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 font-semibold tracking-wider">Iltimos, kuting</p>
      </div>

      <!-- INVALID / 404 STATE -->
      <div v-else-if="codeError" class="flex flex-col items-center justify-center py-8 text-center">
        <div class="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6 border border-rose-500/25">
          <i class="pi pi-exclamation-triangle text-3xl"></i>
        </div>
        <h3 class="text-lg font-black text-zinc-950 dark:text-white tracking-tight">Noto'g'ri havola</h3>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm font-medium leading-relaxed">
          Kechirasiz, ushbu havola noto'g'ri, muddati o'tgan yoki tizimda mavjud emas. Iltimos, havolani qaytadan tekshirib ko'ring.
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
          <div class="absolute -inset-2 rounded-full border border-emerald-500/30 animate-ping opacity-75"></div>
        </div>

        <h3 class="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Murojaatingiz qabul qilindi!</h3>
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

        <div class="text-center relative">
          <div class="inline-flex items-center justify-center gap-2.5 mb-5">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <i class="pi pi-star-fill text-white text-lg"></i>
            </div>
            <span class="text-2xl font-black text-zinc-950 dark:text-white tracking-tighter">
              Sirius <span class="text-primary italic">POS</span>
            </span>
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-extrabold text-[10px] uppercase tracking-widest mb-3">
            <i class="pi pi-user text-xs"></i>
            <span>{{ agentName }} tavsiyasi orqali</span>
          </div>

          <h2 class="text-lg font-black text-zinc-950 dark:text-white tracking-tight mt-1">Sirius POS tizimiga ulanish</h2>
          <p class="text-xs text-zinc-500 dark:text-zinc-450 font-semibold mt-1 max-w-sm mx-auto leading-relaxed">
            Sirius POS bilan do'koningiz savdolarini to'liq nazorat qiling. So'rov qoldiring, biz sizga yordam beramiz!
          </p>
        </div>

        <div v-if="globalError" class="bg-rose-500/10 text-rose-500 p-4 rounded-xl text-xs font-semibold border border-rose-500/25">
          <i class="pi pi-exclamation-circle mr-2"></i> {{ globalError }}
        </div>

        <div class="space-y-4 pt-2">

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

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">Telefon raqamingiz</label>
            <div class="relative w-full">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold text-zinc-450">+998</span>
              <input
                v-model="formattedPhone"
                type="tel"
                placeholder=" (90) 123-45-67"
                class="w-full pl-14 pr-4 py-3 rounded-xl border text-[13px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white placeholder-zinc-450 focus:border-primary focus:ring-2 focus:ring-primary/20"
                :class="{ '!border-rose-500': fieldErrors.phone1 }"
              />
            </div>
            <span v-if="fieldErrors.phone1" class="text-[10px] text-rose-500 font-bold pl-1 mt-0.5">{{ fieldErrors.phone1 }}</span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">Qo'shimcha telefon (ixtiyoriy)</label>
            <div class="relative w-full">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold text-zinc-450">+998</span>
              <input
                v-model="formattedPhone2"
                type="tel"
                placeholder=" (90) 123-45-67"
                class="w-full pl-14 pr-4 py-3 rounded-xl border text-[13px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white placeholder-zinc-450 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <template v-if="locationOptionsAvailable">
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">Viloyat</label>
                <select
                  v-model="form.region"
                  class="w-full px-3 py-3 rounded-xl border text-[13px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">—</option>
                  <option v-for="r in regionsList" :key="r.id" :value="r.id">{{ r.name }}</option>
                </select>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">Tuman</label>
                <select
                  v-model="form.district"
                  :disabled="!form.region"
                  class="w-full px-3 py-3 rounded-xl border text-[13px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-40"
                >
                  <option value="">—</option>
                  <option v-for="d in availableDistricts" :key="d.id" :value="d.id">{{ d.name }}</option>
                </select>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">Do'kon kategoriyasi</label>
              <select
                v-model="form.store_category"
                class="w-full px-3 py-3 rounded-xl border text-[13px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">—</option>
                <option v-for="c in categoriesList" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
          </template>

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
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const API_BASE = 'https://api.siriuspos.uz/api/v1'
const homeUrl = window.location.origin

const isValidating = ref(true)
const codeError = ref(false)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const globalError = ref('')

const agentName = ref('Hamkorimiz')

const form = ref({
  name: '',
  phone1: '',
  phone2: '',
  region: '',
  district: '',
  store_category: ''
})

const formattedPhone = ref('')
const formattedPhone2 = ref('')
const fieldErrors = ref({})

const regionsList = ref([])
const districtsList = ref([])
const categoriesList = ref([])
const locationOptionsAvailable = ref(false)

const availableDistricts = computed(() => {
  if (!form.value.region) return []
  const regionId = Number(form.value.region)
  const region = regionsList.value.find((r) => Number(r.id) === regionId)
  if (region && Array.isArray(region.districts) && region.districts.length) return region.districts
  return districtsList.value.filter((d) => Number(d.region) === regionId || Number(d.region_id) === regionId)
})

watch(() => form.value.region, () => { form.value.district = '' })

const formatDigitsInput = (raw) => {
  let digits = raw.replace(/\D/g, '')
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

  return { digits, formatted }
}

watch(formattedPhone, (newVal) => {
  const { digits, formatted } = formatDigitsInput(newVal)

  if (formattedPhone.value !== formatted) {
    formattedPhone.value = formatted
  }

  form.value.phone1 = digits ? `+998${digits}` : ''
})

watch(formattedPhone2, (newVal) => {
  const { digits, formatted } = formatDigitsInput(newVal)

  if (formattedPhone2.value !== formatted) {
    formattedPhone2.value = formatted
  }

  form.value.phone2 = digits ? `+998${digits}` : ''
})

const fetchLocationOptions = async () => {
  try {
    const [regionsRes, districtsRes, categoriesRes] = await Promise.all([
      fetch(`${API_BASE}/regions/`),
      fetch(`${API_BASE}/districts/`),
      fetch(`${API_BASE}/store-categories/`)
    ])
    const unwrap = async (res) => {
      if (!res.ok) throw new Error('lookup failed')
      const json = await res.json()
      return Array.isArray(json) ? json : (json.results || [])
    }
    regionsList.value = await unwrap(regionsRes)
    districtsList.value = await unwrap(districtsRes)
    categoriesList.value = await unwrap(categoriesRes)
    locationOptionsAvailable.value = true
  } catch (err) {
    console.warn('Location options unavailable, hiding optional fields', err)
    locationOptionsAvailable.value = false
  }
}

const validateAgentCode = async () => {
  isValidating.value = true
  codeError.value = false
  try {
    const res = await fetch(`${API_BASE}/agents/${props.code}/check/`)
    const json = await res.json()
    if (res.ok && json.valid) {
      agentName.value = json.agent_name
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

const handleSubmit = async () => {
  fieldErrors.value = {}
  globalError.value = ''

  if (!form.value.name.trim()) {
    fieldErrors.value.name = 'Ismingizni kiritishingiz shart.'
  }

  const rawDigits = formattedPhone.value.replace(/\D/g, '')
  if (!rawDigits || rawDigits.length !== 9) {
    fieldErrors.value.phone1 = "To'g'ri telefon raqam kiriting. Masalan: (90) 123-45-67"
  }

  if (Object.keys(fieldErrors.value).length > 0) {
    return
  }

  isSubmitting.value = true
  try {
    const res = await fetch(`${API_BASE}/agents/${props.code}/submit-lead/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.value.name,
        phone1: form.value.phone1,
        phone2: form.value.phone2 || null,
        region: form.value.region ? Number(form.value.region) : null,
        district: form.value.district ? Number(form.value.district) : null,
        store_category: form.value.store_category ? Number(form.value.store_category) : null
      })
    })

    const json = await res.json()

    if (res.status === 201) {
      isSubmitted.value = true
    } else if (res.status === 429) {
      globalError.value = "Juda ko'p urinish yuz berdi. Iltimos, birozdan keyin qayta urinib ko'ring."
    } else if (res.status === 400 && json) {
      if (json.name) fieldErrors.value.name = Array.isArray(json.name) ? json.name[0] : json.name
      if (json.phone1) fieldErrors.value.phone1 = Array.isArray(json.phone1) ? json.phone1[0] : json.phone1
      if (json.region) fieldErrors.value.region = Array.isArray(json.region) ? json.region[0] : json.region
      if (json.district) fieldErrors.value.district = Array.isArray(json.district) ? json.district[0] : json.district
      if (json.store_category) fieldErrors.value.store_category = Array.isArray(json.store_category) ? json.store_category[0] : json.store_category
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
  validateAgentCode()
  fetchLocationOptions()
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
