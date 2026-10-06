# Wortwerk content

## Canonical format

Records contain English and German translations. German articles belong
inside the German translation object. No other learning languages are included.

```js
{
  id: '10780',
  level: 'A1',
  pos: 'noun',
  topic: 'house',
  translations: {
    en: { text: 'table' },
    de: { text: 'der Tisch', article: 'der', gender: 'masculine' }
  }
}
```

Translation values are objects. German metadata includes article/gender or
plural number, case sensitivity, and separable-verb details where supplied.
The example illustrates the shape; record provenance uses `sourceIndex` for the
pinned deck, or `source: 'editorial'` for supplements. `topic` is the source
content group; the browser adds its runtime `category` when that group is
loaded, so generated records do not repeat it.

The learning content is intentionally kept separate from the interface logic.

- `vocabulary/<category>.js` contains one concise canonical list for that category. The category is provided by the file loader, not duplicated in each record.
- `verbs/<family>.js` contains one concise list for that verb family. The static loader adds its `verbs` category and `verbCategory` when the file is requested.
- `manifest.js` is generated alongside the content. It records the static file path and totals for each content group, so the browser can request only the topic it needs.
- Vocabulary and verb records use stable numeric string IDs without zero padding. Existing IDs must not be renumbered after publication.
- `phrases/<category>.js` contains one concise canonical list for that category. Phrase records retain their category because lessons use it as a stable content key. Each phrase also stores `wordIds` and a `cloze` object containing the exact German and English sentence tokens to blank.
- Every vocabulary, verb, and phrase record stores language content under `translations`. Language-specific metadata, such as an article, belongs inside that language's translation object.
- `grammar.js` contains German grammar only, with English presentation under
  `localized.en`. Each topic has an intro, optional rules and tables, at least
  two worked `examples` (`de`, `en`, and `note`), and checks with accepted
  `answers` plus an `explain` string shown after checking.
- `application.js` contains reviewed sentence-level grammar applications. Each
  record names its `grammarId`, links to an exact phrase source, and stores the
  blank, expected answer, and explanation explicitly; case records also store
  base gender and case metadata. The marked generated section contains a static
  balanced case corpus: at least 30 exercises for each base gender × case cell.
- `lessons.js` contains 16 canonical lesson units, each expanded into three
  rounds of up to eight questions. Unit presentation text is under `localized`;
  each short round declares its vocabulary, verb, phrase, grammar, or mixed
  practice sources.
- `categories.js` contains one record per category with English labels under
  `localized.en`; category IDs remain stable keys used by content records.

Vocabulary, verb, phrase, category, and manifest files are generated. Edit the
explicit `import/assignments.json` decisions and rerun
`node scripts/import-deck.cjs`; do not patch generated records directly. The
source revision and hash are checked before import. IDs are stored in the
assignments and remain stable for that pinned snapshot. Sentence IDs are
separate from word IDs, and `wordIds` links each example to the vocabulary
entries it came from. The importer derives the `cloze.de` and `cloze.en`
sentence forms from that linked source word; the app never chooses a random word
when an explicit cloze target is present.

`import/supplements.json` supplies five essential modal verbs missing from the
deck. `import/report.json` records exclusions, duplicates and topic-review IDs.
Adjectives remain in `vocabulary/adjectives.js` but appear in their own app
section. The importer adds `adjectiveCategory` using `scripts/adjective-groups.cjs`;
an explicit `adjectiveGroup` in an assignment overrides that grouping.
Meaning groups cover personality, skills, emotions, health, objects, appearance,
origin, time, movement, certainty, society, sensory descriptions, evaluation and
quantity, with an “Other descriptions” fallback. These are import-time heuristics,
not a fully reviewed semantic classification.

Topic grouping does not change IDs or reset existing progress. Topic study order
combines mean CEFR difficulty with median source `word_frequency` rank (lower
rank first). The All words/All verbs aggregates come last. Explicit German
headword refinements are recorded in `assignments.json`; the reproducible
editorial pass is `scripts/refine-everyday-topics.cjs`.
Topics are primarily rule-assigned from English meanings, with example context
used to resolve ties and explicit editorial overrides for reviewed cases.
General/ambiguous meanings use the general category; this is not a claim that
every topic or translation has been manually reviewed. Sentence CEFR labels
are inherited from their source word, not independently assessed.

Rebuild and check with:

```sh
node scripts/download-vocabulary-sources.cjs
node scripts/import-deck.cjs
node scripts/import-deck.cjs --check
node scripts/build-case-application-corpus.cjs --check
node scripts/build-modal-application-corpus.cjs --check
node scripts/build-separable-application-corpus.cjs --check
node scripts/find-grammar-phrase-candidates.cjs --check
node scripts/validate-data.cjs
node scripts/audit-phrases.cjs
node scripts/audit-translations.cjs --check
CHROMIUM=google-chrome node scripts/smoke-test.cjs
```

The download step only populates ignored reference material under
`dictionaries/`; it is not needed to open or use the static app.

## Grammar application corpus

`application.js` is checked-in application data, not runtime-generated content.
The generated case section is rebuilt deliberately with:

```sh
node scripts/build-case-application-corpus.cjs --write
```

The builder draws only from phrase records and the ignored
`dictionaries/sources/nouns.csv` declension reference. It uses conservative
article and preposition patterns, keeps every case source phrase unique, and
writes 30 fresh exercises for each masculine/feminine/neuter × nominative/
accusative/dative/genitive cell. `validate-data.cjs` enforces that minimum and
verifies every blank against its exact linked phrase.

`scripts/find-grammar-phrase-candidates.cjs` is a separate review-queue tool
for possible future case, modal, and separable-verb exercises. Its report at
`import/grammar-phrase-candidates.json` is a review aid only; it never changes
application content by itself.

The modal-verb application set follows the same static approach. Its marked
generated section is reproduced by
`node scripts/build-modal-application-corpus.cjs --write`; it expands the
reviewed seed data to 50 unique phrase-backed exercises across `können`,
`müssen`, `möchten`, `wollen`, `dürfen`, and `sollen`.

The separable-verb set is also static and reproduced by
`node scripts/build-separable-application-corpus.cjs --write`. It includes
every phrase whose linked vocabulary record explicitly marks the terminal word
as a separable prefix. The app groups these exercises by their exact prefix,
such as `auf-`, `aus-`, and `zurück-`. The current corpus has 114 unique
phrase-backed exercises; lower-confidence candidate matches remain only in the
review report.

## Translation review

`scripts/audit-translations.cjs` compares A1/A2 deck glosses with senses in the
downloaded German Wiktionary extract. It writes the first 250 high-frequency
non-overlapping cases to `import/translation-audit.json`, sorted by source
frequency rank. A queued record is a review candidate, not an asserted error:
idioms, multi-word glosses, and different senses need human judgment. Rebuild or
verify it with `node scripts/audit-translations.cjs [--check]`.

After reviewing queued items, record their grouped decisions in
`import/translation-reviews.json`:

```json
{
  "status": "confirmed",
  "reference": "German Wiktionary, relevant listed sense",
  "note": "The source gloss is the intended everyday sense.",
  "ids": ["12345"]
}
```

Confirmed entries remain in the canonical data but leave the audit queue. If a
translation needs changing, update its explicit `english` assignment before
confirming it.
