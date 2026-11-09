import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'White Tee Research',
  base: '/white-tee-research/',
  description: 'An evidence-led research hub for a future plain white T-shirt brand.',
  lang: 'en-US',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Research', link: '/' },
      { text: 'Our brand', link: '/our-brand' },
      { text: 'Feedback', link: 'https://github.com/kaw393939/white-tee-research/issues' }
    ],
    sidebar: false,
    aside: false,
    docFooter: { prev: false, next: false },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/kaw393939/white-tee-research' }],
    footer: { message: 'Research first. Brand development later.' }
  }
})
