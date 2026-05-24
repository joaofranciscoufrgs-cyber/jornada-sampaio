"""Decode a base64 file into an image. Usage: python decode-image.py <b64_file> <output_file>"""
import base64
import sys
from pathlib import Path

src = Path(sys.argv[1])
dst = Path(sys.argv[2])
data = base64.b64decode(src.read_text().strip())
dst.parent.mkdir(parents=True, exist_ok=True)
dst.write_bytes(data)
print(f"OK: {dst} ({len(data)} bytes)")
src.unlink()
