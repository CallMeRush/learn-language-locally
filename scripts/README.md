# Utility scripts

These scripts are optional development utilities; the website does not need
them to run.

- `download-dictionaries.js` downloads compressed reference dictionaries into
  the ignored `dictionaries/` directory.
- `download-vocabulary-sources.cjs` downloads pinned German reference datasets
  and license notices into `dictionaries/sources/` (Node 18+).
- `smoke-test.cjs` exercises the static app in an isolated Chromium profile
  (Node 22+). Set `CHROMIUM=google-chrome` to use Chrome.
- `import-deck.cjs` rebuilds vocabulary, verbs, sentences and categories from
  the pinned deck and checked-in assignments; `--check` verifies reproducibility.
- `deck-topics.cjs` contains the initial topic rules and editorial overrides.
- `audit-deck.cjs` compares noun genders against the downloaded noun reference;
  it reports disagreements, which need sense-specific review.
- `validate-data.cjs` checks IDs, translations, articles, sentence links and
  every lesson activity against the complete loaded dataset.
- `sync-project.sh` creates a progress-reporting archive/sync copy of the
  project while excluding the large dictionaries.

The dictionaries are reference material only and are not loaded by the
browser application.
