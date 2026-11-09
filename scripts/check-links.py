"""Check built HTML links, assets, anchors, and the supported legacy redirect."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import sys

ROOT = Path(__file__).resolve().parent.parent / 'docs/.vitepress/dist'
SITE = 'https://kaw393939.github.io'
BASE = '/white-tee-research/'


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.redirects = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('name'):
            self.ids.add(attrs['name'])
        for attr in ('href', 'src', 'poster'):
            if attrs.get(attr):
                self.links.append(attrs[attr])
        if tag == 'meta' and attrs.get('http-equiv', '').lower() == 'refresh':
            parts = attrs.get('content', '').split(';', 1)
            if len(parts) == 2 and parts[1].strip().lower().startswith('url='):
                target = parts[1].strip()[4:].strip().strip('\"\'')
                self.redirects.append(target)
                self.links.append(target)


def check(root=ROOT):
    pages = {p: Page(p.read_text()) for p in root.rglob('*.html')}
    errors = []
    count = 0
    if not pages:
        errors.append('No built HTML found; run the VitePress build first.')
    # Keep this explicitly checked even though navigation does not link to it.
    legacy = pages.get(root / 'research/brief.html')
    if not legacy or legacy.redirects != [BASE]:
        errors.append('research/brief.html must redirect to the research homepage.')
    for path, page in pages.items():
        source = SITE + BASE + path.relative_to(root).as_posix()
        for link in page.links:
            url = urlsplit(urljoin(source, link))
            if url.scheme not in ('http', 'https') or url.netloc != urlsplit(SITE).netloc:
                continue
            count += 1
            label = f'{path.relative_to(root)} -> {link}'
            if not url.path.startswith(BASE):
                errors.append(f'{label}: missing project base path')
                continue
            target = root / unquote(url.path[len(BASE):])
            if not target.resolve().is_relative_to(root.resolve()):
                errors.append(f'{label}: escapes site directory')
                continue
            if target.is_dir():
                target /= 'index.html'
            elif not target.suffix and target.with_suffix('.html').is_file():
                target = target.with_suffix('.html')
            if not target.is_file():
                errors.append(f'{label}: missing file')
                continue
            # Text fragments are browser instructions, not element IDs.
            fragment = unquote(url.fragment.split(':~:text=', 1)[0])
            if fragment and target.suffix == '.html':
                if fragment not in pages[target].ids:
                    errors.append(f'{label}: missing anchor #{fragment}')
    if errors:
        print('Link check failed:\n' + '\n'.join(errors), file=sys.stderr)
        return 1
    print(f'Link check passed: {len(pages)} HTML pages, {count} internal references, legacy redirect.')
    return 0


if __name__ == '__main__':
    sys.exit(check())
