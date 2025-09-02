<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import { RouterLink } from 'vue-router'

const notesStore = useNotesStore()
</script>

<template>
  <div class="list card">
    <div v-if="notesStore.filteredNotes.length === 0" class="empty">
      <p>No notes found.</p>
      <RouterLink to="/new" class="btn btn-primary">Create your first note</RouterLink>
    </div>
    <ul v-else class="items">
      <li v-for="n in notesStore.filteredNotes" :key="n.id" class="item">
        <RouterLink :to="`/note/${n.id}`" class="item-link">
          <div class="title-row">
            <h3 class="title">{{ n.title || 'Untitled' }}</h3>
            <span class="date" :title="n.updatedAt">Updated {{ new Date(n.updatedAt).toLocaleString() }}</span>
          </div>
          <p class="excerpt">{{ n.content.slice(0, 160) }}</p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list {
  padding: 0;
}
.empty {
  padding: 24px;
  text-align: center;
}
.items {
  list-style: none;
  margin: 0;
  padding: 0;
}
.item + .item {
  border-top: 1px solid var(--color-border);
}
.item-link {
  display: block;
  padding: 14px 16px;
  color: inherit;
}
.item-link:hover {
  background: var(--color-muted);
}
.title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.title {
  margin: 0;
  font-size: 16px;
  color: var(--color-secondary);
}
.date {
  font-size: 12px;
  color: var(--color-text-muted);
}
.excerpt {
  margin: 6px 0 0;
  color: var(--color-text-muted);
  line-height: 1.4;
}
</style>
