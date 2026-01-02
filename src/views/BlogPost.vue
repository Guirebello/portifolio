<template>
  <div class="blog-post">
    <article v-if="post" class="post-content">
      <header class="post-header">
        <router-link to="/blog" class="back-link">← Back to Blog</router-link>
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <time>{{ post.date }}</time>
        </div>
      </header>
      <div class="markdown-content" v-html="post.content"></div>
    </article>
    <div v-else class="not-found">
      <h2>Post not found</h2>
      <router-link to="/blog">Return to blog</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { parseFrontmatter, type ParsedPost} from '../utils/frontmatterParser'
import welcomeContent from '../posts/welcome.md?raw'
import buildingWithVueContent from '../posts/building-with-vue.md?raw'

interface Post extends ParsedPost {
  title: string
  date: string
  description: string
  content: string
}

const route = useRoute()
const post = ref<Post | null>(null)

const slug = computed(() => route.params.slug as string)

const postsData: Record<string, string> = {
  'welcome': welcomeContent,
  'building-with-vue': buildingWithVueContent,
}

onMounted(() => {
  const postContent = postsData[slug.value]
  if (postContent) {
    const parsed = parseFrontmatter(postContent)
    if (parsed) {
      post.value = parsed
    }
  }
})
</script>

<style scoped lang="scss">
.blog-post {
  flex: 1;
  padding: 2rem;
}

.post-content {
  max-width: 800px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease;
}

.post-header {
  margin-bottom: 3rem;

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--accent);
    font-weight: 600;
    transition: transform var(--transition-speed) ease;

    &:hover {
      transform: translateX(-4px);
    }
  }

  h1 {
    font-size: 2.5rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  color: var(--text-primary);
  font-size: 0.95rem;

  time {
    color: var(--accent);
  }
}

.markdown-content {
  color: var(--text-primary);
  line-height: 1.8;

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    color: var(--text-secondary);
    margin: 2rem 0 1rem;
  }

  :deep(h1) {
    font-size: 2rem;
  }

  :deep(h2) {
    font-size: 1.75rem;
  }

  :deep(h3) {
    font-size: 1.5rem;
  }

  :deep(p) {
    margin-bottom: 1.5rem;
  }

  :deep(ul),
  :deep(ol) {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }

  :deep(li) {
    margin-bottom: 0.5rem;
  }

  :deep(code) {
    background-color: var(--bg-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }

  :deep(pre) {
    background-color: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;

    code {
      background: none;
      padding: 0;
    }
  }

  :deep(blockquote) {
    border-left: 4px solid var(--accent);
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    opacity: 0.9;
  }

  :deep(a) {
    color: var(--accent);
    text-decoration: underline;
  }

  :deep(strong) {
    color: var(--text-secondary);
    font-weight: 700;
  }

  :deep(hr) {
    border: none;
    border-top: 2px solid var(--bg-secondary);
    margin: 3rem 0;
  }
}

.not-found {
  max-width: 600px;
  margin: 4rem auto;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  a {
    color: var(--accent);
    font-weight: 600;
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
  .post-header h1 {
    font-size: 2rem;
  }

  .markdown-content {
    :deep(h1) {
      font-size: 1.75rem;
    }

    :deep(h2) {
      font-size: 1.5rem;
    }
  }
}
</style>
