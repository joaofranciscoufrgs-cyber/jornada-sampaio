"""Decode all image base64 strings from tool-results dir into public/images/."""
import json, base64, pathlib, re, unicodedata

SRC = pathlib.Path(r'C:/Users/User/.claude/projects/C--Users-User-Desktop-PROJETOS/00c52a8e-68ed-4927-89a4-0ead571cec1e/tool-results')
DST = pathlib.Path('public/images')
DST.mkdir(parents=True, exist_ok=True)

def slug(s: str) -> str:
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    s = re.sub(r'[^\w\s.-]', '', s).strip().lower()
    s = re.sub(r'[\s_]+', '-', s)
    return s

count = 0
for f in sorted(SRC.glob('mcp-fd3d8898*download_file_content*.txt')):
    try:
        data = json.loads(f.read_text())
    except Exception:
        continue
    if 'content' not in data or 'title' not in data:
        continue
    if not data.get('mimeType', '').startswith('image/'):
        continue
    name = slug(data['title'])
    out = DST / name
    try:
        out.write_bytes(base64.b64decode(data['content']))
        print(f'OK: {out} ({out.stat().st_size} bytes)')
        count += 1
    except Exception as e:
        print(f'FAIL: {f.name} - {e}')

print(f'\nTotal: {count} images decoded.')
