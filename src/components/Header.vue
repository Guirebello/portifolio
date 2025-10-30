<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="logo">Portfolio</router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/blog">Blog</router-link>
        <button @click="toggleTheme" class="theme-toggle" aria-label="Toggle theme">
          <span v-if="theme === 'dark'">☀️</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped lang="scss">
.header {
  padding: 1.5rem 2rem;
  background-color: var(--bg-secondary);
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
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    color: var(--text-primary);
    font-weight: 500;
    position: relative;

    &::after {
      content: '';
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
  transition: transform var(--transition-speed) ease, background-color var(--transition-speed) ease;

  &:hover {
    transform: rotate(20deg);
    background-color: var(--accent);
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
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
