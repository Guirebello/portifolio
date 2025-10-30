<template>
  <div class="project-detail">
    <div v-if="project" class="project-container">
      <router-link to="/projects" class="back-link">
        ← Back to Projects
      </router-link>

      <div class="project-header">
        <h1 class="project-title">{{ project.title }}</h1>
        <p class="project-description">{{ project.description }}</p>

        <div class="project-links">
          <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            View on GitHub
          </a>
          <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            Live Demo
          </a>
        </div>
      </div>

      <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>

      <div class="project-tech-list">
        <h3>Technologies Used</h3>
        <div class="tech-tags">
          <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>

      <div class="project-content" v-html="renderedContent"></div>
    </div>

    <div v-else class="not-found">
      <h1>Project Not Found</h1>
      <p>The project you're looking for doesn't exist.</p>
      <router-link to="/projects" class="btn btn-primary">Back to Projects</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

interface Project {
  slug: string
  title: string
  description: string
  image: string
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  content: string
}

const route = useRoute()

const projectsData: Record<string, Project> = {
  'ecommerce-platform': {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=600&fit=crop',
    tech: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://demo.example.com',
    content: `# E-Commerce Platform

A modern, full-stack e-commerce platform built with Vue.js and Node.js.

## Features

- User authentication and authorization
- Product catalog with search and filters
- Shopping cart and checkout flow
- Stripe payment integration
- Admin dashboard for managing products and orders
- Order tracking and history

## Tech Stack

- **Frontend**: Vue.js 3, TypeScript, Pinia
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment**: Stripe API
- **Deployment**: Docker, AWS

## Challenges

Building a secure payment flow and managing complex state across the application.`
  },
  'task-manager-app': {
    slug: 'task-manager-app',
    title: 'Task Manager App',
    description: 'Collaborative task management tool with real-time updates and team features',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://tasks.example.com',
    content: `# Task Manager App

A collaborative task management application with real-time synchronization.

## Features

- Create, edit, and delete tasks
- Organize tasks into projects
- Assign tasks to team members
- Real-time updates across devices
- Drag-and-drop interface
- Notifications and reminders

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Cloud Functions)
- **State Management**: Zustand
- **UI**: Radix UI components

## Highlights

Implemented real-time collaboration using Firebase Firestore and optimistic updates for smooth UX.`
  },
  'weather-dashboard': {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Interactive weather dashboard with forecasts, maps, and historical data',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&h=600&fit=crop',
    tech: ['Vue.js', 'D3.js', 'OpenWeather API'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather.example.com',
    content: `# Weather Dashboard

An interactive weather dashboard with data visualizations and forecasts.

## Features

- Current weather conditions
- 7-day forecast
- Interactive weather maps
- Historical weather data charts
- Location search and favorites
- Responsive design

## Tech Stack

- **Frontend**: Vue.js 3, TypeScript
- **Charts**: D3.js, Chart.js
- **API**: OpenWeather API
- **Maps**: Mapbox GL
- **Styling**: SCSS

## Technical Highlights

Complex data visualization with D3.js and efficient API caching to minimize requests.`
  },
  'blog-platform': {
    slug: 'blog-platform',
    title: 'Blog Platform',
    description: 'Markdown-based blog platform with CMS and SEO optimization',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop',
    tech: ['Next.js', 'Markdown', 'PostgreSQL'],
    githubUrl: 'https://github.com/yourusername/blog-platform',
    content: `# Blog Platform

A modern blog platform with markdown support and built-in CMS.

## Features

- Markdown editor with live preview
- SEO optimization
- Image optimization
- Tag and category system
- Comments and reactions
- RSS feed generation
- Dark mode support

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Database**: PostgreSQL
- **CMS**: Custom markdown-based CMS
- **Styling**: CSS Modules
- **Deployment**: Vercel

## Architecture

Server-side rendering for optimal SEO and performance, with incremental static regeneration for dynamic content.`
  },
  'portfolio-builder': {
    slug: 'portfolio-builder',
    title: 'Portfolio Builder',
    description: 'No-code portfolio builder with drag-and-drop interface and templates',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop',
    tech: ['Vue.js', 'Nuxt', 'Supabase'],
    githubUrl: 'https://github.com/yourusername/portfolio-builder',
    liveUrl: 'https://portfolios.example.com',
    content: `# Portfolio Builder

A no-code tool for creating professional portfolios with ease.

## Features

- Drag-and-drop page builder
- Pre-built templates
- Custom domain support
- Image and file uploads
- Analytics integration
- Export to static HTML
- Responsive previews

## Tech Stack

- **Frontend**: Vue.js, Nuxt 3
- **Backend**: Supabase (Auth, Database, Storage)
- **Builder**: Custom drag-and-drop engine
- **Styling**: Tailwind CSS

## Innovation

Built a custom page builder engine with component-based architecture for maximum flexibility.`
  },
  'api-documentation-tool': {
    slug: 'api-documentation-tool',
    title: 'API Documentation Tool',
    description: 'Auto-generate interactive API documentation from OpenAPI specs',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
    tech: ['TypeScript', 'OpenAPI', 'React'],
    githubUrl: 'https://github.com/yourusername/api-docs',
    liveUrl: 'https://apidocs.example.com',
    content: `# API Documentation Tool

Generate beautiful, interactive API documentation from OpenAPI specifications.

## Features

- Parse OpenAPI/Swagger specs
- Interactive API explorer
- Code examples in multiple languages
- Try-it-out functionality
- Authentication testing
- Markdown descriptions
- Dark/light themes

## Tech Stack

- **Frontend**: React, TypeScript
- **Parser**: OpenAPI Parser
- **Code Gen**: Prism.js for syntax highlighting
- **HTTP Client**: Axios

## Technical Approach

Built a custom OpenAPI parser with support for extensions and validation of specifications.`
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
