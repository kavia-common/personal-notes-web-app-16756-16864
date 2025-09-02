<script setup lang="ts">
import NoteList from '@/components/NoteList.vue'
</script>

<template>
  <div class="container">
    <h2 class="page-title">All Notes</h2>
    <NoteList />
  </div>
</template>

<style scoped>
.page-title {
  margin: 10px 0 12px;
  color: var(--color-secondary);
}
</style>
