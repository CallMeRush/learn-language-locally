#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 DESTINATION"
  echo "Example: $0 /backup/learn-language-locally"
  echo "Example: $0 user@host:/srv/learn-language-locally"
  exit 2
fi

source_dir="$(cd "$(dirname "$0")/.." && pwd)/"
destination="$1"

if ! command -v rsync >/dev/null 2>&1; then
  echo "Error: rsync is required but was not found." >&2
  exit 1
fi

rsync \
  --archive \
  --compress \
  --human-readable \
  --info=progress2 \
  --exclude='/dictionaries/' \
  --exclude='data/.translation-cache.json' \
  --exclude='node_modules/' \
  --exclude='.git/' \
  "$source_dir" "$destination"
