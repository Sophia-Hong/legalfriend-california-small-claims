#!/usr/bin/env python3
"""Citation integrity + guardrail check for each kit's content (PRD §18.6, §6.4).

Usage: check_content.py [--kit NAME ...] [--release]

- Every [F:id] must exist in sources/facts.yaml; every [S:id] in sources/manifest.yaml.
- Front matter facts_used / sources_used must match what the body cites.
- No forbidden marketing/adversarial words.
- Prints each file's review status. With --release, fails unless every file is
  status: approved and every fact it uses is verified: true.
"""
import re
import sys
from pathlib import Path

import yaml

from kits import ROOT, selected_kits

FORBIDDEN = re.compile(r"\b(trap|trick|scam|fight|battle|win your case|beat|crush|AI lawyer|guaranteed? (?:to )?win)\b", re.I)
F_TAG = re.compile(r"\[F:([a-z0-9-]+)\]")
S_TAG = re.compile(r"\[S:([a-z0-9-]+)\]")


def front_matter(text):
    if text.startswith("---\n"):
        end = text.index("\n---", 4)
        return yaml.safe_load(text[4:end]) or {}, text[end + 4:]
    return {}, text


def check(kit, release):
    FILES = sorted((kit / "ebook" / "chapters").glob("*.md")) + sorted((kit / "practice-notes").glob("*.md"))
    PROMPTS = sorted((kit / "prompts").glob("*.md"))
    facts = {f["id"]: f for f in yaml.safe_load((kit / "sources/facts.yaml").read_text())["facts"]}
    sources = {s["id"] for s in yaml.safe_load((kit / "sources/manifest.yaml").read_text())["sources"]}
    errors, rows = [], []

    for path in FILES + PROMPTS:
        rel = path.relative_to(ROOT)
        fm, body = front_matter(path.read_text())
        fids, sids = set(F_TAG.findall(body)), set(S_TAG.findall(body))
        for f in fids - facts.keys():
            errors.append(f"{rel}: unknown fact [F:{f}]")
        for s in sids - sources:
            errors.append(f"{rel}: unknown source [S:{s}]")
        for m in FORBIDDEN.finditer(body):
            errors.append(f"{rel}: forbidden wording '{m.group(0)}'")
        if path in PROMPTS:
            continue
        declared = set(fm.get("facts_used") or [])
        if declared != fids:
            errors.append(f"{rel}: facts_used {sorted(declared ^ fids)} out of sync with body tags")
        status = fm.get("status", "missing")
        unverified = sorted(f for f in fids if f in facts and not facts[f].get("verified"))
        rows.append((str(rel), status, len(fids), len(unverified)))
        if release:
            if status != "approved":
                errors.append(f"{rel}: status is '{status}', not 'approved'")
            for f in unverified:
                errors.append(f"{rel}: uses unverified fact {f}")

    print(f"{'file':70} {'status':36} facts unverified")
    for r in rows:
        print(f"{r[0]:70} {r[1]:36} {r[2]:5} {r[3]:10}")
    if errors:
        print("\n".join(f"ERROR [{kit.name}] {e}" for e in errors))
        return False
    print(f"OK [{kit.name}]: {len(FILES)} content files, {len(PROMPTS)} prompts" + (" — release gate passed" if release else ""))
    return True


def main():
    release = "--release" in sys.argv
    if not all([check(k, release) for k in selected_kits()]):
        sys.exit(1)


if __name__ == "__main__":
    main()
