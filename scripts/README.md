# Utility scripts

These scripts are optional development utilities; the website does not need
them to run.

- `download-dictionaries.js` downloads compressed Kaikki/Wiktionary reference
  dictionaries into the ignored `dictionaries/` directory.
- `download-vocabulary-sources.cjs` downloads pinned German reference datasets
  and license notices into `dictionaries/sources/` (Node 18+).
- `smoke-test.cjs` exercises the static app in an isolated Chromium profile
  (Node 22+). Set `CHROMIUM=google-chrome` to use Chrome.
- `import-deck.cjs` rebuilds vocabulary, verbs, sentences and categories from
  the pinned deck and checked-in assignments; `--check` verifies reproducibility.
- `deck-topics.cjs` contains the initial topic rules and editorial overrides.
- `refine-everyday-topics.cjs` applies the reproducible headword refinements
  for broad everyday vocabulary groups.
- `adjective-groups.cjs` assigns adjective meaning groups; assignments can
  override this heuristic.
- `audit-deck.cjs` compares noun genders against the downloaded noun reference;
  it reports disagreements, which need sense-specific review.
- `validate-data.cjs` checks IDs, translations, articles, sentence links,
  cloze targets, every lesson activity, and the minimum 30-per-gender-and-case
  grammar-application coverage against the complete loaded dataset.
- `build-case-application-corpus.cjs` creates the checked-in static case
  exercise section in `data/application.js`. Run with `--write` to rebuild it
  from phrases plus the local noun-declension reference, or `--check` to verify
  reproducibility. It selects 30 unique phrase-backed exercises for every
  masculine/feminine/neuter × nominative/accusative/dative/genitive cell.
- `build-modal-application-corpus.cjs` creates the checked-in static modal-verb
  expansion in `data/application.js`. Run with `--write` to rebuild its 35
  phrase-backed additions or `--check` to verify reproducibility. Together with
  the reviewed seed records, the modal set contains 50 unique exercises.
- `build-separable-application-corpus.cjs` creates the checked-in static
  separable-verb expansion in `data/application.js`. It admits every candidate
  whose phrase links directly to a vocabulary record explicitly marked
  separable, preserving that record's terminal prefix as a filterable category.
  Run with `--write` to rebuild it or `--check` to verify reproducibility. The
  current corpus contains 114 unique exercises.
- `find-grammar-phrase-candidates.cjs` writes a ranked review queue for future
  case, modal, and separable-verb applications to
  `data/import/grammar-phrase-candidates.json`. It is intentionally advisory:
  no candidate reaches app data without an explicit editorial decision.
- `audit-phrases.cjs` verifies source-backed sentence pairs and that every
  explicit cloze target occurs in its displayed German and English sentence.
- `audit-translations.cjs` compares queued A1/A2 deck glosses with the
  downloaded German Wiktionary extract; it produces review candidates rather
  than automatic corrections.
- `refine-phrase-topics.cjs` assigns sentence topics reproducibly from sentence
  context, reviewed vocabulary context, and explicit overrides.
- `sync-project.sh` creates a progress-reporting archive/sync copy of the
  project while excluding the large dictionaries.

The dictionaries and downloaded source snapshots are reference material only;
they are ignored by Git and are never loaded by the browser application. The
static app only needs the checked-in files under `data/`, `app/`, and `styles/`.
