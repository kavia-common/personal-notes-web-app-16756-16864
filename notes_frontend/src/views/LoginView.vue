<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute, RouterLink } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function submit() {
  error.value = null
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    const redirect = (route.query.redirect as string) || '/'
    router.replace(redirect)
  } catch (e: unknown) {
    const msg = (e as { message?: string })?.message ?? 'Login failed'
    error.value = msg
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth container">
    <div class="auth-card card">
      <h2 class="title">Welcome back</h2>
      <p class="subtitle">Sign in to continue to your notes.</p>

      <form @submit.prevent="submit" class="form">
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
          Sign In
        </button>
      </form>

      <p class="meta">
        New here?
        <RouterLink to="/register">Create an account</RouterLink>
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
