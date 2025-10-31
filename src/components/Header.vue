<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="logo">
        <div>Guilherme</div>
      </router-link>
      <div class="nav-links">
        <router-link to="/">{{ $t('nav.home') }}</router-link>
        <router-link to="/about">{{ $t('nav.about') }}</router-link>
        <router-link to="/projects">{{ $t('nav.projects') }}</router-link>
        <router-link to="/blog">{{ $t('nav.blog') }}</router-link>
        <router-link to="/contact">{{ $t('nav.contact') }}</router-link>
        <button
          @click="toggleLanguage"
          class="language-toggle"
          :aria-label="currentLocale === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'"
        >
          {{ currentLocale === 'en' ? 'EN' : 'PT' }}
        </button>
        <button
          @click="toggleTheme"
          class="theme-toggle"
          :aria-label="$t('nav.toggleTheme')"
        >
          <Sun v-if="theme === 'dark'" :size="20" />
          <Moon v-else :size="20" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Sun, Moon } from "lucide-vue-next";
import { useTheme } from "../composables/useTheme";
import { useI18n } from 'vue-i18n'

const { theme, toggleTheme } = useTheme();
const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'pt-BR' : 'en'
  localStorage.setItem('locale', locale.value)
}
</script>

<style scoped lang="scss">
.header {
  padding: 1.5rem 2rem;
  background-color: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color var(--transition-speed) ease;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--white);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    color: var(--text-primary);
    font-weight: 500;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--accent);
      transition: width var(--transition-speed) ease;
    }

    &:hover::after,
    &.router-link-active::after {
      width: 100%;
    }
  }
}

.language-toggle {
  background: none;
  border: 2px solid var(--accent);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition:
    transform var(--transition-speed) ease,
    background-color var(--transition-speed) ease;
  color: var(--text-primary);

  &:hover {
    background-color: var(--accent);
    color: var(--bg-primary);
  }
}

.theme-toggle {
  background: none;
  border: 2px solid var(--accent);
  cursor: pointer;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform var(--transition-speed) ease,
    background-color var(--transition-speed) ease;
  color: var(--text-primary);

  &:hover {
    transform: rotate(20deg);
    background-color: var(--accent);
    color: var(--bg-primary);
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0.5rem;
  }

  .nav-links {
    gap: 1rem;

    a {
      font-size: 0.9rem;
    }
  }

  .logo {
    font-size: 1.2rem;
  }
}
</style>
