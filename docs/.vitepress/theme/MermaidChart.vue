<script setup lang="ts">
import { onMounted, ref, watch, useId } from 'vue'
import { useData } from 'vitepress'
const props = defineProps<{ code: string; title: string }>()
const { isDark } = useData()
const svg = ref('')
const error = ref(false)
const id = `diagram-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
let revision = 0
async function render() {
  const current = ++revision
  try {
    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: isDark.value ? 'dark' : 'default', flowchart: { htmlLabels: false } })
    const result = await mermaid.render(`${id}-${current}`, props.code)
    if (current === revision) { svg.value = result.svg; error.value = false }
  } catch { if (current === revision) error.value = true }
}
onMounted(() => { render(); watch([() => props.code, isDark], render) })
</script>

<template>
  <figure class="research-diagram">
    <figcaption>{{ title }}</figcaption>
    <div v-if="svg && !error" role="img" :aria-label="title" v-html="svg" />
    <pre v-else>{{ code }}</pre>
  </figure>
</template>
