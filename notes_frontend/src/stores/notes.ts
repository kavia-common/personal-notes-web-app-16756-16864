import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

/**
 * PUBLIC_INTERFACE
 * useNotesStore
 * Manages notes CRUD and search. Currently uses in-memory list.
 * Replace fetch/create/update/delete with real API calls.
 */
export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([
    {
      id: 'n1',
      title: 'Welcome to Notes',
      content:
        'This is your personal notes app. Use the sidebar to create and manage notes. Try editing me!',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ])

  const searchQuery = ref('')

  const filteredNotes = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return notes.value.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    return notes.value
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  })

  // PUBLIC_INTERFACE
  function setSearch(q: string) {
    searchQuery.value = q
  }

  // PUBLIC_INTERFACE
  function getById(id: string) {
    return notes.value.find((n) => n.id === id) || null
  }

  // PUBLIC_INTERFACE
  async function create(note: Pick<Note, 'title' | 'content'>) {
    const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now())
    const now = new Date().toISOString()
    const newNote: Note = { id, title: note.title, content: note.content, createdAt: now, updatedAt: now }
    notes.value.unshift(newNote)
    return newNote
  }

  // PUBLIC_INTERFACE
  async function update(id: string, patch: Partial<Pick<Note, 'title' | 'content'>>) {
    const n = notes.value.find((x) => x.id === id)
    if (!n) throw new Error('Note not found')
    n.title = patch.title ?? n.title
    n.content = patch.content ?? n.content
    n.updatedAt = new Date().toISOString()
    return n
  }

  // PUBLIC_INTERFACE
  async function remove(id: string) {
    const idx = notes.value.findIndex((x) => x.id === id)
    if (idx >= 0) notes.value.splice(idx, 1)
  }

  return {
    notes,
    searchQuery,
    filteredNotes,
    setSearch,
    getById,
    create,
    update,
    remove,
  }
})
