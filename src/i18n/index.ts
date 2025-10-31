import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ptBR from '../locales/pt-BR.json'

// Detect browser language
function getBrowserLocale(): string {
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('pt')) {
    return 'pt-BR'
  }
  return 'en'
}

// Get locale from localStorage or browser
function getInitialLocale(): string {
  const stored = localStorage.getItem('locale')
  if (stored) {
    return stored
  }
  return getBrowserLocale()
}

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'pt-BR': ptBR
  }
})

export default i18n
