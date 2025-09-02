<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNotesStore } from '@/stores/notes'

const route = useRoute()
const auth = useAuthStore()
const notesStore = useNotesStore()

const search = ref(notesStore.searchQuery)
const onSearch = () => {
  notesStore.setSearch(search.value)
}

const isActive = (path: string) => computed(() => route.path === path)
</script>

<template>
  <div class="layout">
    <aside class="sidebar card">
      <div class="brand">
        <div class="logo-circle">N</div>
        <div class="brand-text">
          <div class="title">Notes</div>
          <div class="subtitle">Personal</div>
        </div>
      </div>

      <div class="sidebar-actions">
        <RouterLink class="nav-link" :class="{ active: isActive('/').value }" to="/">
          <span>All Notes</span>
          <span class="badge">{{ notesStore.filteredNotes.length }}</span>
        </RouterLink>
        <RouterLink class="nav-link" :class="{ active: isActive('/new').value }" to="/new">
          <span>Create Note</span>
        </RouterLink>
        <RouterLink class="nav-link" :class="{ active: isActive('/about').value }" to="/about">
          <span>About</span>
        </RouterLink>
      </div>

      <div class="spacer"></div>

      <div class="user card">
        <template v-if="auth.isAuthenticated">
          <div class="user-row">
            <div class="avatar">{{ auth.user?.name?.charAt(0) || 'U' }}</div>
            <div class="u-info">
              <div class="name">{{ auth.user?.name }}</div>
              <div class="email">{{ auth.user?.email }}</div>
            </div>
          </div>
          <button class="btn btn-outline w-full" @click="auth.logout()">Logout</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn-primary w-full" style="justify-content:center">Sign In</RouterLink>
          <RouterLink to="/register" class="btn btn-outline w-full" style="justify-content:center; margin-top:8px;">Create Account</RouterLink>
        </template>
      </div>
    </aside>

    <section class="main">
      <header class="topbar card">
        <div class="search-wrap">
          <input
            class="input"
            v-model="search"
            type="search"
            placeholder="Search notes by title or content..."
            @input="onSearch"
          />
        </div>
        <div class="actions">
          <RouterLink to="/new" class="btn btn-accent">New Note</RouterLink>
        </div>
      </header>

      <main class="content">
        <RouterView />
      </main>
    </section>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(240px, var(--sidebar-width)) 1fr;
  gap: 20px;
  padding: 20px;
}

.sidebar {
  position: sticky;
  top: 20px;
  height: calc(100vh - 40px);
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.logo-circle {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-primary), #4fd399);
  color: #fff;
  font-weight: 800;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-md);
}
.brand-text .title {
  font-weight: 800;
  color: var(--color-secondary);
  letter-spacing: .3px;
}
.brand-text .subtitle {
  font-size: 12px;
  color: var(--color-text-muted);
}

.sidebar-actions {
  display: grid;
  gap: 6px;
  margin-top: 12px;
}
.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  color: var(--color-text);
  border: 1px solid transparent;
}
.nav-link:hover {
  background: var(--color-muted);
}
.nav-link.active {
  background: #e8f8f1;
  border-color: #c7f0e0;
  color: #0f5132;
}

.spacer {
  flex: 1;
}

.user {
  padding: 12px;
}
.user-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--color-secondary);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
}
.u-info .name {
  font-weight: 700;
}
.u-info .email {
  font-size: 12px;
  color: var(--color-text-muted);
}

.w-full { width: 100%; }

.main {
  min-width: 0;
}
.topbar {
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}
.search-wrap {
  flex: 1;
}
.content {
  min-height: calc(100vh - 160px);
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: relative;
    height: auto;
  }
}
</style>
