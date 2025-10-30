<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Hi, I'm a Developer</h1>
      <p class="hero-subtitle">Building modern web experiences with passion and precision</p>
      <div class="hero-actions">
        <router-link to="/about" class="btn btn-primary">About Me</router-link>
        <router-link to="/blog" class="btn btn-secondary">Read Blog</router-link>
      </div>
    </section>

    <section class="intro">
      <div class="intro-content">
        <h2>Welcome to my portfolio</h2>
        <p>
          I'm a developer focused on creating clean, efficient, and user-friendly applications.
          Explore my work, learn about my experience, and check out my latest thoughts on the blog.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.hero {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease 0.2s backwards;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  animation: fadeInUp 0.8s ease 0.4s backwards;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all var(--transition-speed) ease;
  display: inline-block;
}

.btn-primary {
  background-color: var(--accent);
  color: var(--bg-primary);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(252, 163, 17, 0.3);
  }
}

.btn-secondary {
  border: 2px solid var(--accent);
  color: var(--accent);

  &:hover {
    background-color: var(--accent);
    color: var(--bg-primary);
    transform: translateY(-2px);
  }
}

.intro {
  padding: 4rem 2rem;
  background-color: var(--bg-primary);
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
  }

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--text-primary);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .intro-content h2 {
    font-size: 1.5rem;
  }
}
</style>
