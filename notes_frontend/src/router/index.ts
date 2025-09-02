import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import NotesListView from '@/views/NotesListView.vue'
import NoteEditorView from '@/views/NoteEditorView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AboutView from '@/views/AboutView.vue'
import { useAuthStore } from '@/stores/auth'

const requireAuth = (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const auth = useAuthStore()
  if (auth.isAuthenticated) return next()
  next({ name: 'login', query: { redirect: to.fullPath } })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: NotesListView, beforeEnter: requireAuth },
    { path: '/new', name: 'new', component: NoteEditorView, beforeEnter: requireAuth },
    { path: '/note/:id', name: 'note', component: NoteEditorView, props: true, beforeEnter: requireAuth },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
