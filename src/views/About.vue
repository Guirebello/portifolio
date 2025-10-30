<template>
  <div class="about">
    <section class="about-header">
      <h1>About Me</h1>
      <p>Developer | Problem Solver | Tech Enthusiast</p>
    </section>

    <div class="about-content">
      <section class="section skills">
        <h2>Skills</h2>
        <div class="skills-grid">
          <div class="skill-card" v-for="skill in skills" :key="skill">
            <span>{{ skill }}</span>
          </div>
        </div>
      </section>

      <section class="section trajectory">
        <h2>Work Trajectory</h2>
        <div class="timeline">
          <div class="timeline-item" v-for="(item, index) in workHistory" :key="index">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p class="company">{{ item.company }}</p>
              <p class="period">{{ item.period }}</p>
              <p class="description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section contact">
        <h2>Contact</h2>
        <div class="contact-grid">
          <a v-for="contact in contacts" :key="contact.label" :href="contact.link" target="_blank" class="contact-card">
            <span class="icon">
              <component :is="contact.icon" :size="32" />
            </span>
            <span class="label">{{ contact.label }}</span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Linkedin, Github, Twitter } from 'lucide-vue-next'
import type { Component } from 'vue'

const skills = ref([
  'JavaScript', 'TypeScript', 'Vue.js', 'React',
  'Node.js', 'Python', 'Git', 'Docker',
  'HTML/CSS', 'REST APIs', 'SQL', 'CI/CD'
])

const workHistory = ref([
  {
    title: 'Senior Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading frontend development and mentoring junior developers.'
  },
  {
    title: 'Full Stack Developer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Built scalable web applications using modern frameworks.'
  },
  {
    title: 'Junior Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: 'Developed client websites and internal tools.'
  }
])

const contacts = ref<Array<{ icon: Component; label: string; link: string }>>([
  { icon: Mail, label: 'Email', link: 'mailto:your.email@example.com' },
  { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/yourprofile' },
  { icon: Github, label: 'GitHub', link: 'https://github.com/yourusername' },
  { icon: Twitter, label: 'Twitter', link: 'https://twitter.com/yourhandle' }
])
</script>

<style scoped lang="scss">
.about {
  flex: 1;
}

.about-header {
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
    color: var(--accent);
  }
}

.about-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.section {
  margin-bottom: 4rem;
  animation: fadeInUp 0.6s ease;

  h2 {
    font-size: 2rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--accent);
    }
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.skill-card {
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  text-align: center;
  transition: all var(--transition-speed) ease;
  border: 2px solid transparent;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
  }

  span {
    font-weight: 600;
    color: var(--text-primary);
  }
}

.timeline {
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--accent);
  }
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;

  &:last-child {
    padding-bottom: 0;
  }
}

.timeline-dot {
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--accent);
  border: 3px solid var(--bg-primary);
}

.timeline-content {
  h3 {
    font-size: 1.5rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .company {
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .period {
    color: var(--text-primary);
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
    opacity: 0.8;
  }

  .description {
    color: var(--text-primary);
    line-height: 1.6;
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  transition: all var(--transition-speed) ease;
  border: 2px solid transparent;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
  }

  .icon {
    font-size: 2rem;
  }

  .label {
    font-weight: 600;
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
  .about-header h1 {
    font-size: 2rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-dot {
    left: -2rem;
  }
}
</style>
