<template>
  <div class="projects">
    <section class="projects-header">
      <h1 class="projects-title">{{ $t('projects.title') }}</h1>
      <p class="projects-subtitle">{{ $t('projects.subtitle') }}</p>
    </section>

    <section class="projects-grid">
      <router-link
        v-for="project in projects"
        :key="project.slug"
        :to="`/projects/${project.slug}`"
        class="project-card"
      >
        <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>
        <div class="project-content">
          <h3 class="project-title">{{ $t(`projects.${project.slug}.title`) }}</h3>
          <p class="project-description">{{ $t(`projects.${project.slug}.description`) }}</p>
          <div class="project-tech">
            <span v-for="(tech, index) in getTech(project.slug)" :key="index" class="tech-tag">{{ tech }}</span>
          </div>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Project {
  slug: string
  image: string
  githubUrl?: string
  liveUrl?: string
  content: string
}

const { t, tm } = useI18n()

function getTech(slug: string): string[] {
  return tm(`projects.${slug}.tech`) as string[]
}

// Keep t for template usage
void t

const projects = ref<Project[]>([
  {
    slug: 'ecommerce-platform',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://demo.example.com',
    content: ''
  },
  {
    slug: 'task-manager-app',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://tasks.example.com',
    content: ''
  },
  {
    slug: 'weather-dashboard',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather.example.com',
    content: ''
  },
  {
    slug: 'blog-platform',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/blog-platform',
    content: ''
  },
  {
    slug: 'portfolio-builder',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/portfolio-builder',
    liveUrl: 'https://portfolios.example.com',
    content: ''
  },
  {
    slug: 'api-documentation-tool',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/api-docs',
    liveUrl: 'https://apidocs.example.com',
    content: ''
  }
])
</script>

<style scoped lang="scss">
.projects {
  min-height: calc(100vh - 120px);
  padding: 2rem;
}

.projects-header {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  margin-bottom: 3rem;
}

.projects-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.projects-subtitle {
  font-size: 1.2rem;
  color: var(--text-primary);
}

.projects-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.project-card {
  background-color: var(--bg-secondary);
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
  background-color: var(--bg-primary);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.project-description {
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background-color: var(--accent);
  color: var(--bg-primary);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .projects-title {
    font-size: 2rem;
  }

  .projects-subtitle {
    font-size: 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
