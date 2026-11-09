# White Tee Research

A VitePress research hub for a future plain white T-shirt brand. Current scope: collect evidence, profile competitors, and map the competitive landscape before developing the brand.

## Local development

Requires Node.js 22+.

```sh
npm ci
npm run docs:dev
```

Production verification:

```sh
npm run docs:build
npm run docs:preview
```

## Workspace

- `docs/research/brief.md`: scope and competitor definitions
- `docs/competitors/`: directory and reusable profile template
- `docs/research/comparison.md`: comparison matrix
- `docs/research/sources.md`: dated evidence log
- `docs/research/insights.md`: hypotheses and findings
- `docs/project/`: roadmap, decisions, contribution guide

No competitor findings have been populated yet. Start by defining the initial market and audience, then qualify candidates and research three profiles.

## Infrastructure

VitePress 1.6.4 (stable), local full-text search, light/dark theme, and a GitHub Actions build workflow example. The lockfile pins dependency resolution. A Vite 6.4.6 override avoids advisories in the older Vite dependency bundled by stable VitePress; the production build is verified with this override. Build output is `docs/.vitepress/dist` and is not committed.

The build workflow is saved at `.github/workflow-examples/docs.yml`. Move it to `.github/workflows/docs.yml` using GitHub credentials with workflow permission to enable CI. The current token cannot publish active workflows.

The repository is private. Hosting is not configured; run locally for now. For future hosting, follow the [VitePress deployment guide](https://vitepress.dev/guide/deploy) and set the appropriate base path if deploying under a repository subpath.
