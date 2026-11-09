import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Feedback from './Feedback.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'doc-after': () => h(Feedback)
  })
}
