#!/usr/bin/env python3
"""Validate sources/manifest.yaml against the provenance and versioning rules (PRD §10).

Exit code 1 on any error. Requires PyYAML.
"""
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "sources" / "manifest.yaml"

STAGES = {"prefiling", "pleading", "filing", "service", "hearing", "judgment"}
DOC_TYPES = {"self_help", "form", "instruction", "statute", "rule", "local_rule"}
STATUSES = {"pending_fetch", "verified", "superseded", "broken"}
REQUIRED = [
    "id", "source_title", "source_url", "publisher", "official", "priority",
    "document_type", "court_level", "county", "side", "stage", "form_number",
    "effective_date", "last_verified", "version_hash", "supersedes",
    "superseded_by", "status",
]
DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")


def check(src, ids, errors):
    sid = src.get("id", "<missing id>")

    def err(msg):
        errors.append(f"{sid}: {msg}")

    for key in REQUIRED:
        if key not in src:
            err(f"missing field '{key}'")
    if not src.get("source_url", "").startswith("https://"):
        err("source_url must be https")
    if src.get("official") is not True:
        err("manifest sources must be official; practice notes live in practice-notes/")
    if src.get("document_type") not in DOC_TYPES:
        err(f"document_type '{src.get('document_type')}' not in {sorted(DOC_TYPES)}")
    if src.get("court_level") not in {"statewide", "superior_court"}:
        err("court_level must be statewide or superior_court")
    if src.get("court_level") == "superior_court" and not src.get("county"):
        err("superior_court sources need a county")
    stages = src.get("stage") or []
    if not stages or not set(stages) <= STAGES:
        err(f"stage must be a non-empty subset of {sorted(STAGES)}")
    if src.get("status") not in STATUSES:
        err(f"status must be one of {sorted(STATUSES)}")

    for key in ("effective_date", "last_verified"):
        val = src.get(key)
        if val is not None and not DATE.match(str(val)):
            err(f"{key} must be YYYY-MM-DD")

    if src.get("status") == "verified":
        # A verified record must carry the full version key.
        if not src.get("last_verified"):
            err("verified source needs last_verified")
        if not HASH.match(str(src.get("version_hash") or "")):
            err("verified source needs version_hash 'sha256:<64 hex>'")
        if src.get("document_type") == "form" and src.get("form_number") and not src.get("effective_date"):
            err("verified form needs effective_date (form number alone is not a version key)")

    for key in ("supersedes", "superseded_by"):
        ref = src.get(key)
        if ref is not None and ref not in ids:
            err(f"{key} points to unknown id '{ref}'")
    if src.get("superseded_by") and src.get("status") != "superseded":
        err("record with superseded_by must have status 'superseded'")


def main():
    data = yaml.safe_load(MANIFEST.read_text())
    sources = data.get("sources") or []
    errors = []

    ids = [s.get("id") for s in sources]
    dupes = {i for i in ids if ids.count(i) > 1}
    for d in sorted(dupes):
        errors.append(f"duplicate id '{d}'")

    # Two current records for the same form number = ambiguous "current version".
    current_forms = {}
    for s in sources:
        fn = s.get("form_number")
        if fn and s.get("status") != "superseded":
            current_forms.setdefault(fn, []).append(s.get("id"))
    for fn, members in current_forms.items():
        if len(members) > 1:
            errors.append(f"form {fn} has more than one non-superseded record: {members}")

    for s in sources:
        check(s, set(ids), errors)

    # Every fact in sources/facts.yaml must cite at least one known manifest source.
    facts_path = ROOT / "sources" / "facts.yaml"
    fact_ids = set()
    if facts_path.exists():
        for f in yaml.safe_load(facts_path.read_text()).get("facts") or []:
            fid = f.get("id", "<missing id>")
            if fid in fact_ids:
                errors.append(f"fact {fid}: duplicate id")
            fact_ids.add(fid)
            if not f.get("sources"):
                errors.append(f"fact {fid}: no sources")
            for sid in f.get("sources") or []:
                if sid not in set(ids):
                    errors.append(f"fact {fid}: unknown source '{sid}'")
            if f.get("confidence") not in {"high", "medium"}:
                errors.append(f"fact {fid}: confidence must be high or medium")

    pending = sum(1 for s in sources if s.get("status") == "pending_fetch")
    if errors:
        print("\n".join(f"ERROR {e}" for e in errors))
        sys.exit(1)
    print(f"OK: {len(sources)} sources ({pending} pending fetch), {len(fact_ids)} facts")


if __name__ == "__main__":
    main()
