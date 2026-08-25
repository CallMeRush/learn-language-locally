# Wortwerk content

## Canonical format

New content uses language-neutral records. Translations are stored on the
record, and language-specific metadata belongs inside that translation.

```js
{
  id: '1',
  level: 'A1',
  translations: {
    en: { text: 'table' },
    de: { text: 'der Tisch', article: 'der' },
    it: { text: 'tavolo' }
  }
}
```

Translation values are objects, not plain strings. Languages with articles,
classifiers, gender, or other language-specific data can store those
properties without affecting languages that do not need them.

The learning content is intentionally kept separate from the interface logic.

- `vocabulary/<category>.js` contains one concise canonical list for that category. The category is provided by the file/aggregator, not duplicated in each record.
- `vocabulary.js` combines those category lists and derives their category metadata.
- `verbs/<family>.js` contains one concise list for that verb family. Verb metadata such as `verbCategory` remains on the record when it affects filtering.
- Vocabulary and verb records use stable numeric string IDs without zero padding. Existing IDs must not be renumbered after publication.
- `phrases.js` contains one concise canonical list. Phrases retain their category because they are not split into category files.
- Every vocabulary, verb, and phrase record stores language content under `translations`. Language-specific metadata, such as an article, belongs inside that language's translation object.
- `grammar.js`, `lessons.js`, and `categories.js` are separate structured registries used by their respective views. Grammar records are canonical objects with a target language and localized content; there is no runtime grammar translation overlay.
- `lessons.js` contains canonical lesson records. Lesson presentation text is under `localized`; each lesson's `activities` list declares the vocabulary, verb, phrase, grammar, or mixed practice sources.
- `categories.js` contains one canonical record per category. Labels are stored under `localized` and selected from the current source language; category IDs remain stable keys used by content records.

To add vocabulary, put it in the appropriate category file and assign the next unused numeric ID. Do not derive IDs from the current array position. The app automatically includes new records in practice and progress tracking.
