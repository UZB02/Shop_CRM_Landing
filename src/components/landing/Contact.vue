<template>
  <section id="contact" class="py-20 lg:py-28 relative overflow-hidden">
    <!-- Glow background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style="background: radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%);">
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
      <!-- Header -->
      <div class="text-center mb-12 reveal-up active">
        <div class="badge-premium mb-5">
          <i class="pi pi-send text-[10px]"></i>
          Murojaat
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-4">
          {{ $t('landing.contact.title') }}
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed max-w-md mx-auto">
          {{ $t('landing.contact.subtitle') }}
        </p>
      </div>

      <!-- Contact channels -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 reveal-up active" style="transition-delay:0.1s">
        <a
          v-for="ch in channels"
          :key="ch.label"
          :href="ch.href"
          class="glass-card rounded-2xl p-4 flex items-center gap-3 border border-zinc-200/60 dark:border-white/[0.06] hover:border-primary/30 hover:-translate-y-0.5 transition-all group"
        >
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            :style="`background: rgba(${ch.rgb},0.12); border: 1px solid rgba(${ch.rgb},0.25)`">
            <i :class="`pi ${ch.icon}`" class="text-[14px]" :style="`color: rgba(${ch.rgb},1)`"></i>
          </div>
          <div>
            <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{{ ch.label }}</div>
            <div class="text-[12px] font-semibold text-zinc-700 dark:text-zinc-200 group-hover:text-primary transition-colors">{{ ch.value }}</div>
          </div>
        </a>
      </div>

      <!-- Form -->
      <div class="glass-card rounded-2xl p-7 sm:p-8 border border-zinc-200/60 dark:border-white/[0.06] reveal-up active" style="transition-delay:0.15s">

        <!-- Success -->
        <transition name="fade-scale">
          <div v-if="successMsg" class="mb-6 p-4 rounded-xl flex items-center gap-3 text-[13px] font-semibold border"
            style="background:rgba(16,185,129,0.08); border-color:rgba(16,185,129,0.25); color:#10b981">
            <i class="pi pi-check-circle text-[16px]"></i>
            {{ successMsg }}
          </div>
        </transition>

        <!-- Error -->
        <transition name="fade-scale">
          <div v-if="errorMsg" class="mb-6 p-4 rounded-xl flex items-center gap-3 text-[13px] font-semibold border"
            style="background:rgba(239,68,68,0.08); border-color:rgba(239,68,68,0.25); color:#ef4444">
            <i class="pi pi-exclamation-circle text-[16px]"></i>
            {{ errorMsg }}
          </div>
        </transition>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Name -->
            <div class="space-y-2">
              <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{{ $t('landing.contact.form.name') }}</label>
              <div class="relative">
                <i class="pi pi-user absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-[13px]"></i>
                <input
                  v-model="form.full_name"
                  type="text"
                  required
                  placeholder="Aziz Rahimov"
                  class="w-full pl-10 pr-4 py-3 rounded-xl border text-[14px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{{ $t('landing.contact.form.phone') }}</label>
              <div class="relative">
                <i class="pi pi-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-[13px]"></i>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  class="w-full pl-10 pr-4 py-3 rounded-xl border text-[14px] font-medium outline-none transition-all bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <!-- Message -->
          <div class="space-y-2">
            <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{{ $t('landing.contact.form.message') }}</label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Qanday yordam bera olamiz?"
              class="w-full px-4 py-3 rounded-xl border text-[14px] font-medium outline-none transition-all resize-none bg-zinc-50 dark:bg-white/[0.05] border-zinc-200 dark:border-white/[0.08] text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
            ></textarea>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary btn-shimmer relative w-full py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2.5 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <i v-if="loading" class="pi pi-spin pi-spinner text-sm"></i>
            <i v-else class="pi pi-send text-sm"></i>
            {{ loading ? $t('landing.contact.form.sending') : $t('landing.contact.form.submit') }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { landingApi } from '@/api/landing'

const loading    = ref(false)
const errorMsg   = ref(null)
const successMsg = ref(null)

const form = reactive({ full_name: '', phone: '', message: '' })

const channels = [
  { label: 'Telefon',  icon: 'pi-phone',    href: 'tel:+998901234567',       value: '+998 90 123 45 67', rgb: '124,58,237' },
  { label: 'Email',    icon: 'pi-envelope', href: 'mailto:info@siriuspos.uz', value: 'info@siriuspos.uz', rgb: '6,182,212'  },
  { label: 'Telegram', icon: 'pi-telegram', href: 'https://t.me/siriuspos',   value: '@siriuspos',        rgb: '245,158,11' },
]

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
      errorMsg.value = Object.values(err.data)[0]?.[0] || "Xatolik yuz berdi."
    } else {
      errorMsg.value = "Server bilan bog'lanishda xatolik."
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.97) translateY(-6px);
}
</style>
