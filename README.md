# White Tee Research

**[Review the live research hub](https://kaw393939.github.io/white-tee-research/)**

A public project library for a future plain white T-shirt brand, built with VitePress.

## Library

- **Research** (`docs/index.md`): competitor profiles and key findings.
- **Our brand** (`docs/our-brand.md`): future persona, brand direction, and website plan.

Copy `docs/competitors/template.md` to start a profile, cite sources beside claims, and link the finished profile from the research homepage. Keep unknowns and hypotheses explicit. The first three profiles were researched in Safari on November 9, 2026; each records its sources and limitations.

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

## Designer references and brand analysis

Designer pages live in `docs/designers/` and link from Our Brand. Portraits are linked at their original sources because reusable portraits were not verified; misleading image candidates were excluded. The short framework guide is `docs/research/brand-strategy.md`. Competitor labels are interpretations, with evidence and limitations beside each claim. Regenerate competitor audio whenever these profiles change.

## Local audio

The homepage has a welcome player; each competitor profile has an audio brief. Native controls provide playback and seeking, with an MP3 download and a transcript collapsed by default. No autoplay.

On macOS, with `say` and `ffmpeg` installed:

```sh
npm run audio:generate
```

This regenerates four MP3s in `docs/public/audio/` and their matching transcript manifest. Welcome narration lives in `audio/welcome.txt`; competitor narration comes from the Markdown profiles with markup and URLs removed. Edit text first, regenerate audio, build, and publish together so the transcripts stay aligned. The MP3s are committed, so publishing and playback do not require macOS. No external speech API is used.

Optional voice and rate settings:

```sh
TTS_VOICE=Daniel TTS_RATE=155 npm run audio:generate
```

Run `say -v '?'` to list available voices. Default: Samantha, 165 words per minute.

## Mermaid diagrams

Use the global `MermaidChart` component with `title` and `code` props in Markdown. The homepage shows the research-to-brand roadmap. Diagrams render locally in the browser with strict security settings, support light/dark themes, and retain a text fallback if rendering fails. `AudioBrief` accepts a `name` from `audio.generated.json`.
