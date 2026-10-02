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
The example illustrates the shape; record provenance uses `sourceIndex` for
the pinned deck, or `source: 'editorial'` for supplements.

The learning content is intentionally kept separate from the interface logic.

- `vocabulary/<category>.js` contains one concise canonical list for that category. The category is provided by the file loader, not duplicated in each record.
- `verbs/<family>.js` contains one concise list for that verb family. The static loader adds its `verbs` category and `verbCategory` when the file is requested.
- `manifest.js` is generated alongside the content. It records the static file path and totals for each content group, so the browser can request only the topic it needs.
- Vocabulary and verb records use stable numeric string IDs without zero padding. Existing IDs must not be renumbered after publication.
- `phrases.js` contains one concise canonical list. Phrases retain their category because they are not split into category files.
- Every vocabulary, verb, and phrase record stores language content under `translations`. Language-specific metadata, such as an article, belongs inside that language's translation object.
- `grammar.js` contains German grammar only, with English presentation under
  `localized.en` and English test prompts and explanations stored as strings.
- `lessons.js` contains canonical lesson records. Lesson presentation text is under `localized`; each lesson's `activities` list declares the vocabulary, verb, phrase, grammar, or mixed practice sources.
- `categories.js` contains one record per category with English labels under
  `localized.en`; category IDs remain stable keys used by content records.

Vocabulary, verb, phrase and category files are generated. Edit the explicit
`import/assignments.json` decisions and rerun `node scripts/import-deck.cjs`;
do not patch generated records directly. The source revision and hash are
checked before import. IDs are stored in the assignments and remain stable for
that pinned snapshot. Sentence IDs are separate from word IDs, and `wordIds`
links each example to the vocabulary entries it came from.

`import/supplements.json` supplies five essential modal verbs missing from the
deck. `import/report.json` records exclusions, duplicates and topic-review IDs.
Adjectives remain in `vocabulary/adjectives.js` but appear in their own app
section. The importer adds `adjectiveCategory` using `scripts/adjective-groups.cjs`;
an explicit `adjectiveGroup` in an assignment overrides that grouping.
Meaning groups cover personality, skills, emotions, health, objects, appearance,
origin, time, movement, certainty, society, sensory descriptions, evaluation and
quantity, with an “Other descriptions” fallback. These are import-time heuristics,
not a fully reviewed semantic classification.

Grouping does not change IDs or reset existing progress.
Topic study order combines mean CEFR difficulty with median source word_frequency
rank (lower rank first). The All words/All verbs aggregates come last. Explicit
German headword refinements are recorded in assignments.json; the reproducible
editorial pass is scripts/refine-everyday-topics.cjs.
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
node scripts/validate-data.cjs
CHROMIUM=google-chrome node scripts/smoke-test.cjs
```

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
