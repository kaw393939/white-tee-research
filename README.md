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

Designer pages live in `docs/designers/` and link from Our Brand. Portraits are linked at their original sources because reusable portraits were not verified; misleading image candidates were excluded. The short framework guide is `docs/research/brand-strategy.md`. Competitor labels are interpretations, with evidence and limitations beside each claim. Review and regenerate the relevant audio whenever its research changes.

## Local audio

Each audio panel includes play/pause, seeking, a speed selector, MP3 download, and a transcript collapsed by default. No autoplay. Audio files are generated ahead of time and committed; GitHub Pages needs no speech service or API key.

### ASKET: 60-second Kokoro pilot

[Listen to the ASKET summary](https://kaw393939.github.io/white-tee-research/competitors/asket.html). The script is `audio/asket-summary.txt`; the default voice is Kokoro's American English `af_heart`. Edit that summary when the research changes, then regenerate and publish the audio and transcript together.

Local setup (Python 3.11, tested on Apple Silicon):

```sh
brew install python@3.11 espeak-ng ffmpeg
python3.11 -m venv .venv-kokoro
.venv-kokoro/bin/pip install -r scripts/requirements-kokoro.txt
npm run audio:asket
```

The first generation downloads the model, voice, and English language resources. Synthesis runs locally on CPU; model caches and the Python environment stay outside Git. `KOKORO_VOICE` can select another American English voice. The generator measures the recording, makes a modest tempo adjustment to reach 60 seconds without cutting speech, normalizes loudness, and updates the transcript and cache version. It rejects scripts requiring more than a 20% tempo adjustment.

Sources: [Kokoro library](https://github.com/hexgrad/kokoro) · [model and Apache 2.0 license](https://huggingface.co/hexgrad/Kokoro-82M).

### Existing Mac narration

`npm run audio:generate` refreshes the welcome, Son of a Tailor, and True Classic recordings using macOS `say` and FFmpeg. It preserves Kokoro entries, including ASKET. These other competitors still use full-page narration during the pilot.

Optional: `TTS_VOICE=Daniel TTS_RATE=155 npm run audio:generate`. Default: Samantha, 165 words per minute. Use `say -v '?'` to list installed voices.

## Mermaid diagrams

Use the global `MermaidChart` component with `title` and `code` props in Markdown. The homepage shows the research-to-brand roadmap. Diagrams render locally in the browser with strict security settings, support light/dark themes, and retain a text fallback if rendering fails. `AudioBrief` accepts a `name` from `audio.generated.json`.
