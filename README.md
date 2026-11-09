# White Tee Research

**[Review the live research hub](https://kaw393939.github.io/white-tee-research/)**

A public project library for a future plain white T-shirt brand, built with VitePress.

## Library

- **Research** (`docs/index.md`): competitor profiles and key findings.
- **Our brand** (`docs/our-brand.md`): future persona, brand direction, and website plan.

Copy `docs/competitors/template.md` to start a profile, cite sources beside claims, and link the finished profile from the research homepage. Keep unknowns and hypotheses explicit.

## Feedback

Use **Suggest a change** beneath any page to open a GitHub issue with that page’s link included. Review and submit it on GitHub. A GitHub account is required, and submitted issues are public.

[View feedback and track changes](https://github.com/kaw393939/white-tee-research/issues). The site feedback template is also available from GitHub’s New issue button. Issues are the change queue; fixes are implemented and published separately.

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
