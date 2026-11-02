"""Generate static English pages and synchronize the standalone tool catalog.
Run from any directory: python3 scripts/build-translations.py
Portuguese HTML and translations/*.json are the editable sources.
"""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CATALOG = json.loads((ROOT / 'translations/site.en.json').read_text())
CATALOG['Idioma'] = 'Language'
PAGES = {'index.html': 'index-en.html', 'declaracao-acessibilidade.html': 'accessibility-statement.html'}

def translate_text(match):
    raw = match.group(1)
    value = html.unescape(raw.strip())
    if value not in CATALOG:
        return match.group(0)
    leading = raw[:len(raw) - len(raw.lstrip())]
    trailing = raw[len(raw.rstrip()):]
    return '>' + leading + html.escape(CATALOG[value], quote=False) + trailing + '<'

def translate_attribute(match):
    value = html.unescape(match.group(2))
    return match.group(1) + '="' + html.escape(CATALOG.get(value, value), quote=True) + '"'

for source, destination in PAGES.items():
    content = (ROOT / source).read_text()
    content = re.sub(r'>([^<>]+)<', translate_text, content)
    content = re.sub(r'(alt|aria-label|title|placeholder|content)="([^"]*)"', translate_attribute, content)
    content = content.replace('<html lang="pt-BR">', '<html lang="en-US">')
    # The Latin sample stays Latin; its Portuguese accessible hint becomes English.
    content = content.replace('class="sr-only" lang="pt-BR"', 'class="sr-only" lang="en-US"')
    for pt, en in PAGES.items():
        content = content.replace('href="' + pt + '"', 'href="' + en + '"')
    content = content.replace('hreflang="pt-BR" aria-current="true"', 'hreflang="pt-BR"')
    content = content.replace('data-language="en-US" lang="en-US" hreflang="en-US"', 'data-language="en-US" lang="en-US" hreflang="en-US" aria-current="true"')
    # Show the English name below the original brand artwork only in English.
    subtitle = '<span class="brand-translation">A11Y Preferences</span>'
    if source == 'index.html':
        content, count = re.subn(r'(<div class="brand">.*?</svg>)', lambda match: match.group(1) + '\n        ' + subtitle, content, count=1, flags=re.S)
    else:
        content, count = re.subn(r'(<a class="brand"[^>]*>)(<img[^>]* />)</a>', lambda match: match.group(1) + '\n        ' + match.group(2) + '\n        ' + subtitle + '\n      </a>', content, count=1)
    assert count == 1, 'Brand not found in ' + source
    url = 'https://preferenciasdeacessibilidade.com/' + destination
    content = re.sub(r'<link rel="canonical" href="[^"]*" />', '<link rel="canonical" href="' + url + '" />', content)
    content = re.sub(r'<meta property="og:url" content="[^"]*" />', '<meta property="og:url" content="' + url + '" />', content)
    content = content.replace('https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br', 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en')
    content = content.replace('downloads/preferencias-a11y.zip', 'downloads/a11y-preferences-en.zip')
    content = content.replace('<code>ferramentas</code>', '<code>a11y-preferences</code>')
    content = content.replace('/ferramentas/js/preferencias.js', '/a11y-preferences/js/preferences.js')
    (ROOT / destination).write_text(content)

catalog = json.loads((ROOT / 'translations/tool.en.json').read_text())
script = ROOT / 'js/preferencias.js'
content = script.read_text()
block = '  // BEGIN ENGLISH TRANSLATIONS\n  const english = ' + json.dumps(catalog, ensure_ascii=False, indent=2).replace('\n', '\n  ') + ';\n  // END ENGLISH TRANSLATIONS'
content, count = re.subn(r'  // BEGIN ENGLISH TRANSLATIONS.*?  // END ENGLISH TRANSLATIONS', lambda _: block, content, flags=re.S)
assert count == 1, 'Translation catalog markers not found'
script.write_text(content)
print('Generated English pages and synchronized tool translations.')
