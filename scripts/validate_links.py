#!/usr/bin/env python3
"""Check that every source_url in sources/manifest.yaml resolves (PRD §17 P1: link checker).

Uses GET with a small read since some court pages reject HEAD. Exit 1 if any URL fails.
"""
import sys
import urllib.request
from pathlib import Path

import yaml

from kits import selected_kits
UA = "LegalFriend-SourceCheck/0.1 (+https://legalfriend.ai)"


def main():
    entries, seen = [], set()
    for kit in selected_kits():
        data = yaml.safe_load((kit / "sources" / "manifest.yaml").read_text())
        for s in (data.get("sources") or []) + (data.get("design_references") or []):
            if s["source_url"] not in seen:
                seen.add(s["source_url"])
                entries.append(s)
    failed = 0
    for s in entries:
        url = s["source_url"]
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                resp.read(1024)
                print(f"{resp.status}  {s['id']}  {url}")
        except Exception as exc:  # noqa: BLE001 — report every failure, keep going
            failed += 1
            print(f"FAIL {s['id']}  {url}  ({exc})")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
