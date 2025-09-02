<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  modelValue: { title: string; content: string }
  loading?: boolean
  submitText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: { title: string; content: string }): void
  (e: 'submit'): void
}>()

const local = ref({ ...props.modelValue })
watch(
  () => props.modelValue,
  (v) => (local.value = { ...v }),
)

watch(local, (v) => emit('update:modelValue', v), { deep: true })

const isDisabled = computed(() => props.loading || (!local.value.title && !local.value.content))
</script>

<template>
  <form class="editor card" @submit.prevent="emit('submit')">
    <div class="row">
      <label>Title</label>
      <input class="input" v-model="local.title" placeholder="Note title" />
    </div>
    <div class="row">
      <label>Content</label>
      <textarea class="textarea" v-model="local.content" rows="12" placeholder="Write your note..."></textarea>
    </div>
    <div class="actions">
      <button type="submit" class="btn btn-primary" :disabled="isDisabled">
        {{ submitText ?? 'Save' }}
      </button>
      <slot name="extra"></slot>
    </div>
  </form>
</template>

<style scoped>
.editor {
  padding: 16px;
}
.row + .row {
  margin-top: 12px;
}
label {
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
  color: var(--color-text-muted);
}
.actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
