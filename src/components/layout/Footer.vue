<template>
  <footer class="relative pt-20 pb-8 border-t border-zinc-200/60 dark:border-white/[0.06] overflow-hidden">
    <!-- Background glow -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
      <!-- Main Grid -->
      <div class="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-12 mb-16">

        <!-- Brand -->
        <div class="col-span-2">
          <div class="flex items-center gap-2.5 mb-5">
            <div class="w-8 h-8 bg-gradient-to-br from-primary to-violet rounded-lg flex items-center justify-center shadow-md">
              <span class="text-white font-black text-sm" style="font-family:'Plus Jakarta Sans',sans-serif">S</span>
            </div>
            <span class="text-[16px] font-extrabold text-zinc-900 dark:text-white" style="font-family:'Plus Jakarta Sans',sans-serif">
              Sirius <span class="text-gradient-subtle">POS</span>
            </span>
          </div>
          <p class="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed mb-6 max-w-[220px]">
            O'zbekistonning barcha tadbirkorlari uchun professional savdo tizimi.
          </p>
          <!-- Socials -->
          <div class="flex gap-2">
            <a
              v-for="s in socials" :key="s.icon"
              :href="s.href"
              :title="s.label"
              class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/[0.07] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all text-[13px]"
            >
              <i :class="`pi pi-${s.icon}`"></i>
            </a>
          </div>
        </div>

        <!-- Links columns -->
        <div v-for="col in footerCols" :key="col.title">
          <h5 class="text-[11px] font-extrabold text-zinc-900 dark:text-white uppercase tracking-[0.12em] mb-4 opacity-60">
            {{ col.title }}
          </h5>
          <ul class="space-y-3">
            <li v-for="item in col.links" :key="item.label">
              <a
                :href="item.href"
                class="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Divider -->
      <div class="section-divider mb-8"></div>

      <!-- Bottom -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-[12px] text-zinc-400 font-medium">
          © {{ new Date().getFullYear() }} Sirius POS. {{ $t('landing.footer.rights') }}
        </p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-[12px] text-zinc-400 hover:text-primary transition-colors">Maxfiylik siyosati</a>
          <a href="#" class="text-[12px] text-zinc-400 hover:text-primary transition-colors">Foydalanish shartlari</a>
          <span class="text-[12px] text-zinc-400 font-medium">🇺🇿 Made in Uzbekistan</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({ navLinks: Array })

const socials = [
  { icon: 'telegram', href: '#', label: 'Telegram' },
  { icon: 'instagram', href: '#', label: 'Instagram' },
  { icon: 'youtube',   href: '#', label: 'YouTube' },
]

const footerCols = [
  {
    title: "Bo'limlar",
    links: [
      { label: 'Xususiyatlar',  href: '#features' },
      { label: 'Narxlar',       href: '#pricing' },
      { label: 'Sharhlar',      href: '#testimonials' },
      { label: "Savollar",      href: '#faq' },
    ]
  },
  {
    title: 'Mahsulot',
    links: [
      { label: 'Savdo (POS)',      href: '#' },
      { label: 'Omborxona',        href: '#' },
      { label: 'Hisobotlar',       href: '#' },
      { label: 'API',              href: '#' },
    ]
  },
  {
    title: "Bog'lanish",
    links: [
      { label: '+998 90 123 45 67',  href: 'tel:+998901234567' },
      { label: 'info@siriuspos.uz',  href: 'mailto:info@siriuspos.uz' },
      { label: 'Toshkent, Yunusobod', href: '#' },
    ]
  }
]
</script>
