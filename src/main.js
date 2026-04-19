import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { createI18n } from 'vue-i18n'
import './style.css'
import 'primeicons/primeicons.css'

import Tooltip from 'primevue/tooltip'

import uz from './locales/uz.json'
import uz_cy from './locales/uz_cy.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'uz',
  fallbackLocale: 'uz',
  messages: {
    uz: uz,
    uz_cy: uz_cy
  }
})

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark',
        }
    }
})
app.directive('tooltip', Tooltip)
app.use(i18n)

app.mount('#app')
