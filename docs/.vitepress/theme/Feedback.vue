<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const issuesUrl = 'https://github.com/kaw393939/white-tee-research/issues'
const feedbackUrl = computed(() => {
  const path = page.value.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')
  const pageUrl = new URL(path, 'https://kaw393939.github.io/white-tee-research/').href
  const params = new URLSearchParams({
    template: 'site-feedback.md',
    title: `Feedback: ${page.value.title || 'White Tee Research'}`,
    body: `## Page\n${pageUrl}\n\n## Suggested change\nDescribe what you would change and why. Screenshots or examples are welcome.\n`
  })
  return `${issuesUrl}/new?${params}`
})
</script>

<template>
  <section class="site-feedback" aria-label="Site feedback">
    <strong>Help improve this page</strong>
    <div class="feedback-links">
      <a :href="feedbackUrl" target="_blank" rel="noopener noreferrer">Suggest a change ↗</a>
      <a :href="issuesUrl" target="_blank" rel="noopener noreferrer">View feedback ↗</a>
    </div>
    <p>Opens GitHub with this page included. A GitHub account is required; submitted feedback is public.</p>
  </section>
</template>
