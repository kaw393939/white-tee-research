# White Tee Research

**[Review the live research hub](https://kaw393939.github.io/white-tee-research/)**

A public project library for a future plain white T-shirt brand, built with VitePress.

## Library

- **Overview** (`docs/index.md`): goal, next steps, findings, and decisions.
- **Competitors** (`docs/competitors/`): comparison table and individual profiles, with sources inside each profile.
- **Our brand** (`docs/our-brand.md`): future persona, positioning, brand direction, and website plan.

To add a competitor, copy `docs/competitors/template.md` to `docs/competitors/brand-slug.md`, fill it with sourced findings, and link it in the competitor table. Unknowns and hypotheses should be explicit. No competitor research is populated yet.

## Run locally

Requires Node.js 22+.

```sh
npm ci
npm run docs:dev
```

Use `npm run docs:build` to verify the production build and internal links; `npm run docs:preview` previews it.

## Publish

Push source changes to `main`, then run:

```sh
npm run docs:deploy
```

GitHub Pages serves the generated `gh-pages` branch at **https://kaw393939.github.io/white-tee-research/**. Publishing requires an authenticated GitHub CLI with repository write access. Source pushes alone do not update the site.

VitePress 1.6.4 uses a Vite 6.4.6 override to avoid older dependency advisories. The optional CI example in `.github/workflow-examples/docs.yml` requires workflow permission before moving into `.github/workflows/`.
