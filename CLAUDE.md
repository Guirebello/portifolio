# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

Vue 3 + TypeScript + Vite portfolio site deployed to GitHub Pages (guirebello.me).

- **Vue 3**: Composition API with `<script setup>` syntax
- **TypeScript**: Strict typing throughout
- **Vite**: Build tool and dev server
- **Vue Router**: Client-side routing
- **SCSS**: Styling with CSS variables for theming
- **marked**: Markdown parser for blog posts

## Development Commands

```bash
npm run dev      # Start dev server (default: http://localhost:5173)
npm run build    # TypeScript check + production build
npm run preview  # Preview production build locally
```

## Architecture

### Routing

All routes defined in `src/router/index.ts`. Main routes:
- `/` - Home with featured projects
- `/about` - About page
- `/projects` - Projects list
- `/projects/:slug` - Project detail pages
- `/blog` - Blog list
- `/blog/:slug` - Blog post pages (markdown with frontmatter)
- `/contact` - Contact form

### Theme System

Dark/light theme managed via `src/composables/useTheme.ts`:
- Theme state persisted to localStorage
- Applied via `data-theme` attribute on document root
- CSS variables in `src/assets/styles/variables.scss` define colors
- Import `useTheme()` composable to access theme controls

### Content Management

**Blog posts**: Stored as markdown strings with frontmatter in `src/views/BlogPost.vue` (postsData object). Parsed via custom `parseFrontmatter()` function and rendered with `marked`.

**Projects**: Hardcoded in component data (Home.vue, Projects.vue, ProjectDetail.vue). Each project has: slug, title, description, image, technologies, githubUrl, liveUrl.

### Styling

- Global styles: `src/assets/styles/global.scss`
- CSS variables: `src/assets/styles/variables.scss`
- Component styles: Scoped SCSS in each `.vue` file
- Theme switching: CSS variables change based on `data-theme` attribute

### Layout

App.vue provides Header/Footer layout with router-view for page content. Fade transition between routes.

## Deployment

Static site deployed to GitHub Pages. Domain: guirebello.me (configured in `public/CNAME`).
