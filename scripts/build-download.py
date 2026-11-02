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
