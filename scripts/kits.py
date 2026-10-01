"""Shared helpers: every kit lives in kits/<name>/ with the same layout
(kit.yaml, sources/, ebook/, practice-notes/, prompts/, workflows/)."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KITS_DIR = ROOT / "kits"


def all_kits():
    return sorted(p for p in KITS_DIR.iterdir() if (p / "kit.yaml").exists())


def selected_kits(argv=None):
    """`--kit NAME` (repeatable) selects kits; default is every kit."""
    argv = sys.argv[1:] if argv is None else argv
    names = [argv[i + 1] for i, a in enumerate(argv) if a == "--kit" and i + 1 < len(argv)]
    kits = all_kits()
    if not names:
        return kits
    by_name = {k.name: k for k in kits}
    missing = [n for n in names if n not in by_name]
    if missing:
        sys.exit(f"unknown kit(s): {', '.join(missing)}; available: {', '.join(by_name)}")
    return [by_name[n] for n in names]
