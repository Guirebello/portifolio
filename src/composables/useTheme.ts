import { ref, watch, onMounted } from 'vue'

export function useTheme() {
  const theme = ref<'dark' | 'light'>('dark')

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const setTheme = (newTheme: 'dark' | 'light') => {
    theme.value = newTheme
  }

  // Apply theme to document
  const applyTheme = (themeValue: 'dark' | 'light') => {
    if (themeValue === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  // Save to localStorage
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  })

  // Load from localStorage on mount
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      theme.value = savedTheme
    }
    applyTheme(theme.value)
  })

  return {
    theme,
    toggleTheme,
    setTheme
  }
}
