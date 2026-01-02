<template>
  <div class="blog">
    <section class="blog-header">
      <h1>Blog</h1>
      <p>Thoughts on development, technology, and more</p>
    </section>

    <div class="blog-content">
      <div class="posts-grid">
        <article v-for="post in posts" :key="post.slug" class="post-card">
          <router-link :to="`/blog/${post.slug}`" class="post-link">
            <div class="post-header">
              <h2>{{ post.title }}</h2>
              <time>{{ post.date }}</time>
            </div>
            <p class="post-description">{{ post.description }}</p>
            <span class="read-more">Read more →</span>
          </router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { parseFrontmatter } from '../utils/frontmatterParser'
import welcomeContent from '../posts/welcome.md?raw'
import buildingWithVueContent from '../posts/building-with-vue.md?raw'

interface Post {
  slug: string
  title: string
  date: string
  description: string
}

const posts = ref<Post[]>([
  {
    slug: 'welcome',
    ...(parseFrontmatter(welcomeContent) as Omit<Post, 'slug'>)
  },
  {
    slug: 'building-with-vue',
    ...(parseFrontmatter(buildingWithVueContent) as Omit<Post, 'slug'>)
  }
])
</script>

<style scoped lang="scss">
.blog {
  flex: 1;
}

.blog-header {
  padding: 4rem 2rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);

  h1 {
    font-size: 3rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color: var(--text-primary);
  }
}

.blog-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.posts-grid {
  display: grid;
  gap: 2rem;
}

.post-card {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  transition: all var(--transition-speed) ease;
  border: 2px solid transparent;
  animation: fadeInUp 0.6s ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
}

.post-link {
  display: block;
  padding: 2rem;
  color: inherit;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.75rem;
    color: var(--text-secondary);
    flex: 1;
  }

  time {
    color: var(--accent);
    font-size: 0.9rem;
    white-space: nowrap;
  }
}

.post-description {
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  color: var(--accent);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: transform var(--transition-speed) ease;

  .post-card:hover & {
    transform: translateX(4px);
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
  .blog-header h1 {
    font-size: 2rem;
  }

  .post-header {
    flex-direction: column;
    gap: 0.5rem;

    time {
      align-self: flex-start;
    }
  }
}
</style>
