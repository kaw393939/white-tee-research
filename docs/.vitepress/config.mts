import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'White Tee Research',
  base: '/white-tee-research/',
  description: 'An evidence-led research hub for a future plain white T-shirt brand.',
  lang: 'en-US',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Overview', link: '/' },
      { text: 'Competitors', link: '/competitors/' },
      { text: 'Our brand', link: '/our-brand' }
    ],
    sidebar: [
      { text: 'Overview', link: '/' },
      { text: 'Competitors', link: '/competitors/' },
      { text: 'Profile template', link: '/competitors/template' },
      { text: 'Our brand · later', link: '/our-brand' }
    ],
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/kaw393939/white-tee-research' }],
    editLink: { pattern: 'https://github.com/kaw393939/white-tee-research/edit/main/docs/:path' },
    footer: { message: 'Research first. Brand development later.' }
  }
})
