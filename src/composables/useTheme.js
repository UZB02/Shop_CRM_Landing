import { ref, onMounted, onUnmounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)
  const theme = ref(localStorage.getItem('theme') || 'system')

  const applyTheme = (themeValue) => {
    const root = document.documentElement
    let dark = false

    if (themeValue === 'dark') {
      dark = true
    } else if (themeValue === 'light') {
      dark = false
    } else {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    isDark.value = dark
  }

  const setTheme = (value) => {
    theme.value = value
    if (value === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', value)
    }
    applyTheme(value)
  }

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  const handleSystemThemeChange = (e) => {
    if (theme.value === 'system') {
      applyTheme('system')
    }
  }

  let mediaQuery

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemThemeChange)
    applyTheme(theme.value)
  })

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  })

  return {
    isDark,
    theme,
    setTheme,
    toggleTheme
  }
}
