# Contributing to the hub

## Run locally

Use Node.js 22 or newer, then run from the repository root:

```sh
npm ci
npm run docs:dev
```

Build and preview the generated site:

```sh
npm run docs:build
npm run docs:preview
```

## Add research

1. Copy `docs/competitors/template.md` to `docs/competitors/brand-slug.md`.
2. Replace placeholders only when you have evidence.
3. Log dated sources and cite them next to findings.
4. Add the profile link to the directory and a row to the comparison matrix.
5. Add hypotheses to the insights page; keep them separate from facts.
6. Run `npm run docs:build` to check rendering and internal links.
7. Commit and push, or open a pull request for review.

The navigation lives in `docs/.vitepress/config.mts`. Pages are Markdown. Local search indexes the documentation at build time.
