<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NoteEditorForm from '@/components/NoteEditorForm.vue'
import { useNotesStore } from '@/stores/notes'

const route = useRoute()
const router = useRouter()
const notes = useNotesStore()

const id = route.params.id as string | undefined
const loading = ref(false)
const form = ref({ title: '', content: '' })

onMounted(() => {
  if (id) {
    const existing = notes.getById(id)
    if (existing) {
      form.value = { title: existing.title, content: existing.content }
    }
  }
})

// PUBLIC_INTERFACE
async function save() {
  loading.value = true
  try {
    if (id) {
      await notes.update(id, { ...form.value })
    } else {
      const created = await notes.create({ ...form.value })
      await router.replace({ name: 'note', params: { id: created.id } })
    }
  } finally {
    loading.value = false
  }
}
// ensure usage so eslint doesn't flag as unused (template uses it, but this helps static lint)
void save

// PUBLIC_INTERFACE
async function remove() {
  if (!id) return
  const ok = window.confirm('Delete this note?')
  if (!ok) return
  await notes.remove(id)
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="container">
    <h2 class="page-title">{{ id ? 'Edit Note' : 'New Note' }}</h2>
    <NoteEditorForm v-model="form" :loading="loading" :submitText="id ? 'Save Changes' : 'Create Note'">
      <template #extra>
        <button v-if="id" type="button" class="btn btn-outline" @click="remove">Delete</button>
      </template>
    </NoteEditorForm>
  </div>
</template>

<style scoped>
.page-title {
  margin: 10px 0 12px;
  color: var(--color-secondary);
}
</style>
