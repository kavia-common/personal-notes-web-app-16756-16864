import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * PUBLIC_INTERFACE
 * useAuthStore
 * This store manages authentication state including user info and token.
 * Replace the mock login/register implementations with real API calls.
 */
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<{ id: string; name: string; email: string } | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  // PUBLIC_INTERFACE
  async function login(email: string, password: string) {
    /** Mock login. Replace with backend call. */
    if (!email || !password) throw new Error('Email and password are required')
    token.value = 'mock-token'
    user.value = { id: 'u1', name: email.split('@')[0], email }
  }

  // PUBLIC_INTERFACE
  async function register(name: string, email: string, password: string) {
    /** Mock register. Replace with backend call. */
    if (!name || !email || !password) throw new Error('All fields are required')
    token.value = 'mock-token'
    user.value = { id: 'u1', name, email }
  }

  // PUBLIC_INTERFACE
  function logout() {
    /** Clear auth state. */
    token.value = null
    user.value = null
  }

  return { token, user, isAuthenticated, login, register, logout }
})
