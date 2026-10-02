"""Build the static site from content.json. Python standard library only."""
import argparse
import hashlib
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

class Elements(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.stack, self.nodes = [], []
        self.starts = [0] + [m.end() for m in re.finditer('\n', source)]
    def position_offset(self):
        line, col = self.getpos()
        return self.starts[line - 1] + col
    def handle_starttag(self, tag, attrs):
        if tag in ('meta', 'link', 'img', 'br', 'hr', 'input'): return
        self.stack.append((tag, dict(attrs), self.position_offset() + len(self.get_starttag_text())))
    def handle_startendtag(self, tag, attrs): pass
    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1][0] != tag: raise ValueError('Unbalanced HTML: ' + tag)
        _, attrs, start = self.stack.pop()
        self.nodes.append((attrs, start, self.position_offset()))

def build(check=False):
    data = json.loads((ROOT / 'content.json').read_text(encoding='utf-8'))
    mapping = json.loads((ROOT / 'tools/content-selectors.json').read_text(encoding='utf-8'))
    source = (ROOT / 'tools/index.template.html').read_text(encoding='utf-8')
    parser = Elements(source); parser.feed(source)
    languages = data['languages']
    copy = {}
    for lang in ('ru', 'kk', 'en'):
        item = languages[lang]
        values = {}
        for selector, key in mapping.items():
            entries = item['sections'][key]
            if not isinstance(entries, list): raise ValueError(lang + ': ' + key + ' must be an array')
            values[selector] = [''.join('<li>' + line + '</li>' for line in v) if key == 'experienceDetails' else v for v in entries]
        copy[lang] = {k: item[k] for k in ('title', 'description', 'aria')}
        copy[lang]['values'] = values
    changes = []
    for attrs, start, end in parser.nodes:
        if 'data-content' in attrs:
            key, index = attrs['data-content'].split(':'); index = int(index)
            selector = next(s for s, k in mapping.items() if k == key)
            for lang in copy:
                if len(copy[lang]['values'][selector]) != len(copy['ru']['values'][selector]):
                    raise ValueError('Translation length mismatch: ' + lang + '/' + key)
            changes.append((start, end, copy['ru']['values'][selector][index]))
    stack_nodes = sorted((n for n in parser.nodes if 'techstack__tags' in n[0].get('class', '').split()), key=lambda n:n[1])
    if len(data['stack']) != len(stack_nodes): raise ValueError('Stack group count mismatch')
    for tags, (_, start, end) in zip(data['stack'], stack_nodes):
        changes.append((start, end, ''.join('<span class="tag">' + html.escape(tag) + '</span>' for tag in tags)))
    year_nodes = sorted((n for n in parser.nodes if 'education__year' in n[0].get('class', '').split()), key=lambda n:n[1])
    if len(data['educationYears']) != len(year_nodes): raise ValueError('Education year count mismatch')
    for year, (_, start, end) in zip(data['educationYears'], year_nodes): changes.append((start,end,html.escape(year)))
    for start, end, value in sorted(changes, reverse=True): source = source[:start] + value + source[end:]
    contacts = data['contacts']
    replacements = {'tel:+77029072555':'tel:' + contacts['phone'], '+7 (702) 907-25-55':contacts['phoneLabel'], 'mailto:simagambetovn@gmail.com':'mailto:' + contacts['email'], 'simagambetovn@gmail.com':contacts['email'], 'https://t.me/NartayYy':contacts['telegram'], 'https://wa.me/77029072555':contacts['whatsapp'], 'assets/Nartay.jpg':data['photo']}
    # Replace simultaneously so a new value cannot be replaced a second time.
    source = re.sub('|'.join(re.escape(k) for k in sorted(replacements,key=len,reverse=True)), lambda m:html.escape(replacements[m.group()],quote=True), source)
    cv_path = ROOT / data['cv']['file']
    if not cv_path.resolve().is_relative_to(ROOT) or not cv_path.is_file(): raise ValueError('CV must be a file inside the project')
    if not cv_path.read_bytes().startswith(b'%PDF-'): raise ValueError('CV is not a PDF')
    version = hashlib.sha256(cv_path.read_bytes()).hexdigest()[:8]
    source = re.sub(r'href="assets/cv.pdf\?v=[^"]+" download="[^"]+"', 'href="' + html.escape(data['cv']['file'] + '?v=' + version,quote=True) + '" download="' + html.escape(data['cv']['downloadName'],quote=True) + '"',source)
    source = re.sub(r'<title>.*?</title>',lambda m:'<title>' + html.escape(languages['ru']['title']) + '</title>',source)
    for meta, value in [('name="description"',languages['ru']['description']),('property="og:title"',languages['ru']['title']),('property="og:description"',languages['ru']['description'])]:
        source = re.sub('(<meta ' + re.escape(meta) + ' content=")[^"]*(">)',lambda m:m[1]+html.escape(value,quote=True)+m[2],source)
    source = source.replace('  <script src="i18n.js?v=6"></script>', '  <script src="content.js"></script>\n  <script src="i18n.js?v=7"></script>')
    content_js = '// Generated by tools/build.py; edit content.json instead.\nwindow.siteContent = ' + json.dumps(copy,ensure_ascii=False,indent=2) + ';\n'
    content_version = hashlib.sha256(content_js.encode('utf-8')).hexdigest()[:8]
    source = source.replace('src="content.js"', 'src="content.js?v=' + content_version + '"')
    legacy_cv = ROOT / 'assets/Симагамбетов_Нартай_CV.pdf'
    if check:
        if legacy_cv.read_bytes() != cv_path.read_bytes(): raise ValueError('Legacy CV copy is stale')
    else: legacy_cv.write_bytes(cv_path.read_bytes())
    for name, output in [('index.html',source),('content.js',content_js)]:
        if check:
            if not (ROOT/name).exists() or (ROOT/name).read_text(encoding='utf-8') != output: raise ValueError(name + ' is stale; run tools/build.py')
        else: (ROOT/name).write_text(output,encoding='utf-8')
    print('Content, translations and CV verified.' if check else 'Built index.html and content.js.')

if __name__ == '__main__':
    args=argparse.ArgumentParser(); args.add_argument('--check',action='store_true')
    build(args.parse_args().check)
