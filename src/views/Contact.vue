<template>
  <div class="contact">
    <section class="contact-header">
      <h1 class="contact-title">{{ $t('contact.title') }}</h1>
      <p class="contact-subtitle">
        {{ $t('contact.subtitle') }}
      </p>
    </section>

    <div class="contact-container">
      <section class="contact-form-section">
        <h2>{{ $t('contact.form.title') }}</h2>
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">{{ $t('contact.form.name') }}</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              :placeholder="$t('contact.form.namePlaceholder')"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">{{ $t('contact.form.email') }}</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              :placeholder="$t('contact.form.emailPlaceholder')"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">{{ $t('contact.form.message') }}</label>
            <textarea
              id="message"
              v-model="formData.message"
              :placeholder="$t('contact.form.messagePlaceholder')"
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.send') }}
          </button>

          <p v-if="submitStatus === 'success'" class="status-message success">
            {{ $t('contact.form.success') }}
          </p>
          <p v-if="submitStatus === 'error'" class="status-message error">
            {{ $t('contact.form.error') }}
          </p>
        </form>
      </section>

      <section class="contact-cards-section">
        <h2>{{ $t('contact.connect.title') }}</h2>
        <div class="contact-cards">
          <a
            v-for="contact in contacts"
            :key="contact.typeKey"
            :href="contact.link"
            class="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="contact-icon">
              <component :is="contact.icon" :size="40" />
            </div>
            <h3>{{ $t(`contact.connect.${contact.typeKey}`) }}</h3>
            <p>{{ contact.value }}</p>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Mail, Linkedin, Github } from "lucide-vue-next";
import type { Component } from "vue";

interface Contact {
  typeKey: string;
  value: string;
  link: string;
  icon: Component;
}

const contacts = ref<Contact[]>([
  {
    typeKey: "email",
    value: "gui.rebello1@gmail.com",
    link: "mailto:gui.rebello1@gmail.com",
    icon: Mail,
  },
  {
    typeKey: "linkedin",
    value: "linkedin.com/in/guirebello",
    link: "https://linkedin.com/in/guirebello",
    icon: Linkedin,
  },
  {
    typeKey: "github",
    value: "github.com/Guirebello",
    link: "https://github.com/Guirebello",
    icon: Github,
  },
]);

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);
const submitStatus = ref<"idle" | "success" | "error">("idle");

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = "idle";

  try {
    // Simulate API call - replace with actual submission logic
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, just show success message
    // In production, you would send this to your backend or email service
    console.log("Form submitted:", formData);

    submitStatus.value = "success";

    // Reset form
    formData.name = "";
    formData.email = "";
    formData.message = "";
  } catch (error) {
    console.error("Form submission error:", error);
    submitStatus.value = "error";
  } finally {
    isSubmitting.value = false;

    // Clear status message after 5 seconds
    setTimeout(() => {
      submitStatus.value = "idle";
    }, 5000);
  }
};
</script>

<style scoped lang="scss">
.contact {
  min-height: calc(100vh - 120px);
  padding: 2rem;
}

.contact-header {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 100%
  );
  margin-bottom: 3rem;
}

.contact-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.contact-subtitle {
  font-size: 1.2rem;
  color: var(--text-primary);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 0 1rem;
}

.contact-form-section,
.contact-cards-section {
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  input,
  textarea {
    padding: 0.75rem;
    border: 2px solid var(--bg-secondary);
    border-radius: 8px;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    font-family: inherit;
    font-size: 1rem;
    transition: border-color var(--transition-speed) ease;

    &:focus {
      outline: none;
      border-color: var(--accent);
    }

    &::placeholder {
      color: var(--text-primary);
      opacity: 0.5;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
}

.btn-submit {
  padding: 1rem 2rem;
  background-color: var(--accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed) ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.status-message {
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;

  &.success {
    background-color: rgba(76, 175, 80, 0.2);
    color: #4caf50;
    border: 1px solid #4caf50;
  }

  &.error {
    background-color: rgba(244, 67, 54, 0.2);
    color: #f44336;
    border: 1px solid #f44336;
  }
}

.contact-cards {
  display: grid;
  gap: 1rem;
}

.contact-card {
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  transition: all var(--transition-speed) ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  .contact-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
  }

  p {
    color: var(--text-primary);
    font-size: 0.9rem;
  }
}

@media (max-width: 968px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .contact-title {
    font-size: 2rem;
  }

  .contact-subtitle {
    font-size: 1rem;
  }

  .contact-form-section,
  .contact-cards-section {
    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
