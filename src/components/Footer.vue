<template>
  <footer class="footer">
    <div class="footer-content">
      <p>
        &copy; {{ currentYear }} Guilherme Rebello Portfolio. Built with Vue 3 &
        Vite.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  padding: 2rem;
  background-color: var(--bg-secondary);
  text-align: center;
  transition: background-color var(--transition-speed) ease;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;

  p {
    color: var(--text-primary);
    font-size: 0.9rem;
  }
}
</style>
