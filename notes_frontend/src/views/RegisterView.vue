<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function submit() {
  error.value = null
  loading.value = true
  try {
    await auth.register(name.value, email.value, password.value)
    router.replace('/')
  } catch (e: unknown) {
    const msg = (e as { message?: string })?.message ?? 'Registration failed'
    error.value = msg
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth container">
    <div class="auth-card card">
      <h2 class="title">Create account</h2>
      <p class="subtitle">Get started with your personal notes.</p>

      <form @submit.prevent="submit" class="form">
        <div class="row">
          <label>Name</label>
          <input class="input" v-model="name" placeholder="Your name" required />
        </div>
        <div class="row">
          <label>Email</label>
          <input class="input" type="email" v-model="email" placeholder="you@example.com" required />
        </div>
        <div class="row">
          <label>Password</label>
          <input class="input" type="password" v-model="password" placeholder="••••••••" required />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button class="btn btn-primary w-full" :disabled="loading" type="submit">
          Create Account
        </button>
      </form>

      <p class="meta">
        Already have an account?
        <RouterLink to="/login">Sign in</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth {
  display: grid;
  place-items: start;
}
.auth-card {
  width: 100%;
  max-width: 480px;
  margin: 24px auto;
  padding: 20px;
}
.title {
  margin: 0;
  color: var(--color-secondary);
}
.subtitle {
  color: var(--color-text-muted);
  margin-bottom: 12px;
}
.form .row + .row { margin-top: 12px; }
.error {
  color: #b91c1c;
  background: #fee2e2;
  border: 1px solid #fecaca;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13px;
}
.meta {
  margin-top: 10px;
  color: var(--color-text-muted);
}
</style>
