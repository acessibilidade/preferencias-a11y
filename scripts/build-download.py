"""Build the standalone installation ZIP from current source files."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
ROOT = Path(__file__).resolve().parents[1]
files = [ROOT / name for name in ['js/preferencias.js', 'css/preferencias.css', 'README.md']]
files += sorted(p for p in (ROOT / 'fonts').iterdir() if p.is_file() and not p.name.startswith('.'))
with ZipFile(ROOT / 'downloads/preferencias-a11y.zip', 'w', compression=ZIP_DEFLATED) as archive:
    for path in files:
        archive.write(path, 'ferramentas/' + path.relative_to(ROOT).as_posix())
print('Updated downloads/preferencias-a11y.zip')

# English package: English installation paths, documentation and default UI.
script = (ROOT / 'js/preferencias.js').read_text()
locale_source = 'script.dataset.lang || document.documentElement.lang'
assert script.count(locale_source) == 1, 'Language initialization changed'
script = script.replace(locale_source, "script.dataset.lang || 'en-US'")
script = script.replace('../css/preferencias.css?', '../css/preferences.css?')
script = script.replace('/* Preferências 1.10.0 — implementação independente, sem dependências. */', '/* A11Y Preferences 1.10.0 — independent implementation, no dependencies. */')
with ZipFile(ROOT / 'downloads/a11y-preferences-en.zip', 'w', compression=ZIP_DEFLATED) as archive:
    archive.writestr('a11y-preferences/js/preferences.js', script)
    archive.write(ROOT / 'css/preferencias.css', 'a11y-preferences/css/preferences.css')
    archive.write(ROOT / 'translations/README.en.md', 'a11y-preferences/README.md')
    for path in files:
        if path.parent.name == 'fonts':
            archive.write(path, 'a11y-preferences/fonts/' + path.name)
print('Updated downloads/a11y-preferences-en.zip')
