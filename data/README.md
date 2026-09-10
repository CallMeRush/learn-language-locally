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

- `vocabulary/<category>.js` contains one concise canonical list for that category. The category is provided by the file/aggregator, not duplicated in each record.
- `vocabulary.js` combines those category lists and derives their category metadata.
- `verbs/<family>.js` contains one concise list for that verb family. Verb metadata such as `verbCategory` remains on the record when it affects filtering.
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
