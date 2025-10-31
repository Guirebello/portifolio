<template>
  <div class="project-detail">
    <div v-if="project" class="project-container">
      <router-link to="/projects" class="back-link">
        {{ $t('projectDetail.backToProjects') }}
      </router-link>

      <div class="project-header">
        <h1 class="project-title">{{ $t(`projects.${project.slug}.title`) }}</h1>
        <p class="project-description">{{ $t(`projects.${project.slug}.description`) }}</p>

        <div class="project-links">
          <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            {{ $t('projectDetail.viewGithub') }}
          </a>
          <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            {{ $t('projectDetail.liveDemo') }}
          </a>
        </div>
      </div>

      <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>

      <div class="project-tech-list">
        <h3>{{ $t('projectDetail.technologiesUsed') }}</h3>
        <div class="tech-tags">
          <span v-for="(tech, index) in getTech(project.slug)" :key="index" class="tech-tag">{{ tech }}</span>
        </div>
      </div>

      <div class="project-content" v-html="renderedContent"></div>
    </div>

    <div v-else class="not-found">
      <h1>{{ $t('projectDetail.notFound.title') }}</h1>
      <p>{{ $t('projectDetail.notFound.description') }}</p>
      <router-link to="/projects" class="btn btn-primary">{{ $t('projectDetail.notFound.backBtn') }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'

interface Project {
  slug: string
  image: string
  githubUrl?: string
  liveUrl?: string
  content: string
}

const route = useRoute()
const { t, tm } = useI18n()

function getTech(slug: string): string[] {
  return tm(`projects.${slug}.tech`) as string[]
}

// Keep t for template usage
void t

const projectsData: Record<string, Project> = {
  'ecommerce-platform': {
    slug: 'ecommerce-platform',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://demo.example.com',
    content: ''
  },
  'task-manager-app': {
    slug: 'task-manager-app',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://tasks.example.com',
    content: ''
  },
  'weather-dashboard': {
    slug: 'weather-dashboard',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather.example.com',
    content: ''
  },
  'blog-platform': {
    slug: 'blog-platform',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/blog-platform',
    content: ''
  },
  'portfolio-builder': {
    slug: 'portfolio-builder',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/portfolio-builder',
    liveUrl: 'https://portfolios.example.com',
    content: ''
  },
  'api-documentation-tool': {
    slug: 'api-documentation-tool',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
    githubUrl: 'https://github.com/yourusername/api-docs',
    liveUrl: 'https://apidocs.example.com',
    content: ''
  }
}

const project = ref<Project | null>(null)

onMounted(() => {
  const slug = route.params.slug as string
  project.value = projectsData[slug] || null
})

const renderedContent = computed(() => {
  if (!project.value) return ''
  return marked(project.value.content)
})
</script>

<style scoped lang="scss">
.project-detail {
  min-height: calc(100vh - 120px);
  padding: 2rem;
}

.project-container {
  max-width: 900px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: var(--accent);
  font-weight: 500;
  transition: transform var(--transition-speed) ease;

  &:hover {
    transform: translateX(-4px);
  }
}

.project-header {
  margin-bottom: 2rem;
}

.project-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.project-description {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all var(--transition-speed) ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: var(--accent);
  color: var(--bg-primary);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
}

.btn-secondary {
  background-color: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);

  &:hover {
    background-color: var(--accent);
    color: var(--bg-primary);
  }
}

.project-image {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.project-tech-list {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.5rem 1rem;
  background-color: var(--accent);
  color: var(--bg-primary);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.project-content {
  color: var(--text-primary);
  line-height: 1.8;

  :deep(h1) {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }

  :deep(h2) {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
  }

  :deep(h3) {
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
  }

  :deep(p) {
    margin-bottom: 1rem;
  }

  :deep(ul), :deep(ol) {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  :deep(li) {
    margin-bottom: 0.5rem;
  }

  :deep(strong) {
    color: var(--accent);
  }

  :deep(code) {
    background-color: var(--bg-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }

  :deep(pre) {
    background-color: var(--bg-secondary);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1rem;
  }
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }

  p {
    color: var(--text-primary);
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .project-title {
    font-size: 2rem;
  }

  .project-description {
    font-size: 1rem;
  }

  .project-image {
    height: 250px;
  }
}
</style>
