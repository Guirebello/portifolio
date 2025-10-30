<template>
  <div class="projects">
    <section class="projects-header">
      <h1 class="projects-title">My Projects</h1>
      <p class="projects-subtitle">Explore my work and side projects</p>
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
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
        </div>
      </router-link>
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
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  content: string
}

const projects = ref<Project[]>([
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
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
  {
    slug: 'task-manager-app',
    title: 'Task Manager App',
    description: 'Collaborative task management tool with real-time updates and team features',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
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
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Interactive weather dashboard with forecasts, maps, and historical data',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
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
  {
    slug: 'blog-platform',
    title: 'Blog Platform',
    description: 'Markdown-based blog platform with CMS and SEO optimization',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
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
  {
    slug: 'portfolio-builder',
    title: 'Portfolio Builder',
    description: 'No-code portfolio builder with drag-and-drop interface and templates',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
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
  {
    slug: 'api-documentation-tool',
    title: 'API Documentation Tool',
    description: 'Auto-generate interactive API documentation from OpenAPI specs',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
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
