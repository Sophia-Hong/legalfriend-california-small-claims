#!/usr/bin/env python3
"""Build the downloadable zip for each kit (what buyers receive from the gated download).

    python3 scripts/build_kit.py [--kit NAME ...]            # release: requires attorney approval
    python3 scripts/build_kit.py [--kit NAME ...] --draft    # review copy, clearly marked DRAFT

Release builds run check_content.py --release, so every chapter and practice note must be
`status: approved` and every fact they use `verified: true`.
Output: dist-kit/<name>-v<version>[-DRAFT].zip (deterministic: fixed timestamps, sorted).
"""
import hashlib
import re
import subprocess
import sys
import zipfile

import yaml

from kits import ROOT, selected_kits

FIXED_TIME = (2026, 1, 1, 0, 0, 0)


def run(*args):
    subprocess.run([sys.executable, *args], cwd=ROOT, check=True)


def strip_front_matter(text):
    if text.startswith("---\n"):
        return text[text.index("\n---", 4) + 4:].lstrip("\n")
    return text


def all_in_one(kit, meta, draft):
    chapters = sorted((kit / "ebook/chapters").glob("*.md"))
    notes = sorted((kit / "practice-notes").glob("*.md"))
    parts = [f"# {meta['title']} (all-in-one)\n"]
    if draft:
        parts.append("> DRAFT REVIEW COPY — not for sale or distribution.\n")
    parts.append("This file combines the ebook, LegalFriend practice notes, and the facts sheet so it can be uploaded to an AI project as one knowledge file. Tags like [F:some-id] refer to entries in the FACTS section at the end; [S:...] tags refer to official sources listed in sources/manifest.yaml.\n")
    parts.append("\n---\n\n# PART 1 — EBOOK (explains OFFICIAL SOURCE material)\n")
    parts += [strip_front_matter(p.read_text()) for p in chapters]
    parts.append("\n---\n\n# PART 2 — LEGALFRIEND PRACTICE NOTES (general commentary, not official sources)\n")
    parts += [strip_front_matter(p.read_text()) for p in notes]
    facts = yaml.safe_load((kit / "sources/facts.yaml").read_text())["facts"]
    sources = {s["id"]: s for s in yaml.safe_load((kit / "sources/manifest.yaml").read_text())["sources"]}
    parts.append("\n---\n\n# PART 3 — FACTS (each with its official citation)\n")
    for f in facts:
        links = "; ".join(f"{sources[s]['source_title']} <{sources[s]['source_url']}>" for s in f["sources"])
        parts.append(f"- **[F:{f['id']}]** {f['statement']} — *{f['cite']}*. Sources: {links}")
    text = "\n\n".join(parts) + "\n"
    if not draft:
        text = re.sub(r"^> DRAFT —.*\n", "", text, flags=re.M)
    return text


def build(kit, draft):
    meta = yaml.safe_load((kit / "kit.yaml").read_text())
    name = f"{meta['name']}-v{meta['version']}{'-DRAFT' if draft else ''}"
    files = {
        "README.md": (kit / "README-KIT.md").read_text(),
        "LICENSE.md": (ROOT / "kits/LICENSE-KIT.md").read_text(),
        "DISCLAIMER.md": (ROOT / "DISCLAIMER.md").read_text(),
        "knowledge/all-in-one.md": all_in_one(kit, meta, draft),
    }
    for folder in ["ebook", "practice-notes", "prompts", "workflows"]:
        for p in sorted((kit / folder).rglob("*")):
            if p.is_file():
                files[str(p.relative_to(kit))] = p.read_text()
    for p in ["sources/facts.yaml", "sources/manifest.yaml"]:
        files[p] = (kit / p).read_text()

    out = ROOT / "dist-kit" / f"{name}.zip"
    out.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for path in sorted(files):
            info = zipfile.ZipInfo(f"{name}/{path}", FIXED_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            z.writestr(info, files[path])
    digest = hashlib.sha256(out.read_bytes()).hexdigest()
    print(f"Built {out.relative_to(ROOT)} ({out.stat().st_size:,} bytes, {len(files)} files)\nsha256 {digest}")


def main():
    draft = "--draft" in sys.argv
    kit_args = [a for i, a in enumerate(sys.argv[1:], 1) if a == "--kit" or (i > 1 and sys.argv[i - 1] == "--kit")]
    run("scripts/validate_manifest.py", *kit_args)
    run("scripts/check_content.py", *kit_args, *([] if draft else ["--release"]))
    for kit in selected_kits():
        build(kit, draft)


if __name__ == "__main__":
    main()
