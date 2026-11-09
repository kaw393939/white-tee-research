import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'White Tee Research',
  base: '/white-tee-research/',
  description: 'An evidence-led research hub for a future plain white T-shirt brand.',
  lang: 'en-US',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Research', link: '/research/brief' },
      { text: 'Competitors', link: '/competitors/' },
      { text: 'Project', link: '/project/roadmap' }
    ],
    sidebar: [
      { text: 'Start here', items: [
        { text: 'Project overview', link: '/' },
        { text: 'Research brief', link: '/research/brief' },
        { text: 'Research method', link: '/research/method' }
      ] },
      { text: 'Competitive landscape', items: [
        { text: 'Competitor directory', link: '/competitors/' },
        { text: 'Profile template', link: '/competitors/template' },
        { text: 'Comparison matrix', link: '/research/comparison' },
        { text: 'Source log', link: '/research/sources' },
        { text: 'Insights & hypotheses', link: '/research/insights' }
      ] },
      { text: 'Project workspace', items: [
        { text: 'Roadmap', link: '/project/roadmap' },
        { text: 'Decisions & open questions', link: '/project/decisions' },
        { text: 'Contributing', link: '/project/contributing' }
      ] }
    ],
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/kaw393939/white-tee-research' }],
    editLink: { pattern: 'https://github.com/kaw393939/white-tee-research/edit/main/docs/:path' },
    footer: { message: 'Research first. Brand development later.' }
  }
})
