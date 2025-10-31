<template>
  <div class="blog">
    <section class="blog-header">
      <h1>{{ $t('blog.title') }}</h1>
      <p>{{ $t('blog.subtitle') }}</p>
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
            <span class="read-more">{{ $t('blog.readMore') }}</span>
          </router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Post {
  slug: string
  title: string
  date: string
  description: string
}

const { locale } = useI18n()
const posts = ref<Post[]>([])

function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)

  if (!match) return null

  const frontmatterText = match[1]
  const metadata: Record<string, string> = {}
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      metadata[key.trim()] = valueParts.join(':').trim()
    }
  })

  return metadata
}

async function loadPosts() {
  const modules = import.meta.glob('../content/blog/**/*.md', { eager: true, as: 'raw' })
  const loadedPosts: Post[] = []

  for (const path in modules) {
    if (path.includes(`/${locale.value}/`)) {
      const content = modules[path] as string
      const metadata = parseFrontmatter(content)

      if (metadata) {
        const slug = path.split('/').pop()?.replace('.md', '') || ''
        loadedPosts.push({
          slug,
          title: metadata.title,
          date: metadata.date,
          description: metadata.description
        })
      }
    }
  }

  // Sort by date descending
  posts.value = loadedPosts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

onMounted(() => {
  loadPosts()
})
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
