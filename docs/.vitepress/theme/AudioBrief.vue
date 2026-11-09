<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import audio from './audio.generated.json'
const props = defineProps<{ name: string }>()
const entry = computed(() => audio[props.name as keyof typeof audio])
</script>

<template>
  <section v-if="entry" class="audio-brief" :aria-label="entry.title">
    <h2>{{ entry.title }}</h2>
    <p class="audio-note">{{ Math.floor(entry.duration / 60) }}:{{ String(entry.duration % 60).padStart(2, '0') }} · Listen here or download the MP3. Computer-generated narration.</p>
    <audio :key="name" controls preload="metadata" :aria-label="entry.title" :src="withBase(entry.file)">
      Your browser does not support audio playback. Use the download link below.
    </audio>
    <a :href="withBase(entry.file)" download>Download MP3</a>
    <details>
      <summary>Show transcript</summary>
      <p class="audio-transcript">{{ entry.transcript }}</p>
    </details>
  </section>
</template>
