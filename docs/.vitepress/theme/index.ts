import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Feedback from './Feedback.vue'
import AudioBrief from './AudioBrief.vue'
import MermaidChart from './MermaidChart.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AudioBrief', AudioBrief)
    app.component('MermaidChart', MermaidChart)
  },
  Layout: () => h(DefaultTheme.Layout, null, {
    'doc-after': () => h(Feedback)
  })
}
