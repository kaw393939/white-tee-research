<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import audio from './audio.generated.json'
const player = ref<HTMLAudioElement | null>(null)
const playbackSpeed = ref(1)
function changeSpeed() {
  if (player.value) player.value.playbackRate = Number(playbackSpeed.value)
}
const props = defineProps<{ name: string }>()
const entry = computed(() => audio[props.name as keyof typeof audio])
</script>

<template>
  <section v-if="entry" class="audio-brief" :aria-label="entry.title">
    <h2>{{ entry.title }}</h2>
    <p class="audio-note">{{ Math.floor(entry.duration / 60) }}:{{ String(entry.duration % 60).padStart(2, '0') }} · Listen here or download the MP3. Computer-generated narration.</p>
    <audio ref="player" :key="name" controls preload="metadata" :aria-label="entry.title" :src="withBase(entry.file)">
      Your browser does not support audio playback. Use the download link below.
    </audio>
    <label class="audio-speed">Playback speed
      <select v-model="playbackSpeed" @change="changeSpeed">
        <option :value="0.75">0.75×</option>
        <option :value="1">1×</option>
        <option :value="1.25">1.25×</option>
        <option :value="1.5">1.5×</option>
      </select>
    </label>
    <a :href="withBase(entry.file)" download>Download MP3</a>
    <details>
      <summary>Show transcript</summary>
      <p class="audio-transcript">{{ entry.transcript }}</p>
    </details>
  </section>
</template>

<style scoped>
.audio-speed { display: inline-flex; align-items: center; gap: .5rem; margin: .5rem 1rem .5rem 0; }
.audio-speed select { border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: .25rem .5rem; color: var(--vp-c-text-1); background: var(--vp-c-bg); }
</style>
