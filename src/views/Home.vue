<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Guilherme Rebello</h1>
      <p class="hero-subtitle">&lt;Software Engineer /&gt;</p>
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

    <section class="projects-preview">
      <div class="section-header">
        <h2>Featured Projects</h2>
        <p>Check out some of my recent work</p>
      </div>
      <div class="projects-grid">
        <router-link
          v-for="project in featuredProjects"
          :key="project.slug"
          :to="`/projects/${project.slug}`"
          class="project-card"
        >
          <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </div>
        </router-link>
      </div>
      <div class="section-action">
        <router-link to="/projects" class="btn btn-primary">View All Projects</router-link>
      </div>
    </section>

    <section class="contact-cta">
      <div class="cta-content">
        <h2>Let's Work Together</h2>
        <p>Have a project in mind? Let's discuss how I can help bring your ideas to life.</p>
        <router-link to="/contact" class="btn btn-primary">Contact Me</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  slug: string
  title: string
  description: string
  image: string
}

const featuredProjects = ref<Project[]>([
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop'
  },
  {
    slug: 'task-manager-app',
    title: 'Task Manager App',
    description: 'Collaborative task management tool with real-time updates and team features',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop'
  },
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Interactive weather dashboard with forecasts, maps, and historical data',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop'
  }
])
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
  font-size: 3.0rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
  font-size: 1.2rem;
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
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
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

.projects-preview {
  padding: 4rem 2rem;
  background-color: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
  }

  p {
    font-size: 1.1rem;
    color: var(--text-primary);
  }
}

.projects-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  overflow: hidden;
  transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
}

.project-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
}

.project-content {
  padding: 1.5rem;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
  }

  p {
    color: var(--text-primary);
    line-height: 1.6;
  }
}

.section-action {
  text-align: center;
}

.contact-cta {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }

  p {
    font-size: 1.2rem;
    color: var(--text-primary);
    margin-bottom: 2rem;
    line-height: 1.6;
  }
}

@media (max-width: 968px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
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

  .section-header h2,
  .cta-content h2 {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
