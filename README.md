# Wortwerk

Wortwerk is a small, local-first language-learning app for practicing
vocabulary, verbs, phrases, grammar, lessons, and mixed exercises.

The app teaches German to English speakers. All instructions are in English.
Vocabulary, verbs and phrases support English → German and German → English
practice. Grammar teaches German with English explanations.

## Run locally

No server or build step is required. Open [`index.html`](index.html) in a
browser. The app loads its JavaScript files directly and stores progress in
the browser's `localStorage`.

Use **Export progress** to download a private JSON backup, then **Import
progress** on another browser or device to replace that device's progress for
this exact learning deck. No account, server, or network sync is involved.

Both translation directions contribute to the new deck's study profile
(`en-de-deck-efd235e6-v1`). It starts fresh because the content IDs changed.
Earlier progress stays stored in the browser but is not applied to this corpus.

The current A1–B1 dataset includes 6,248 general vocabulary entries, 1,320
adjectives, 1,585 verbs and 9,124 example sentences. German grammar remains separate. See
[`data/ATTRIBUTION.md`](data/ATTRIBUTION.md) for source credits and data terms.

Vocabulary has Nouns (the general word collection), Verbs, and Adjectives tabs.
Click a list entry to practise it. A default-on Hide answer toggle conceals the
answer-side translation in the list; ✓ and ✕ mark correct and incorrect answers.
Typed German answers accept `ss` for `ß` and `ae`/`oe`/`ue` for umlauts.
The study-status buttons filter both the list and the practice card: an empty
selection clearly says so instead of repeating a completed item. Vocabulary also
distinguishes first-try answers, answers corrected after an error, and article-only
errors. Phrase practice remains a separate desk with the same multi-topic
selection behavior. Its direction, cloze, and multiple-choice settings are
independent; cloze targets are the linked vocabulary word as it appears in the
sentence. Adjectives retain meaning groups without tone filters. Topics are
ordered using CEFR and source frequency rank; Vocabulary opens a small topic
rather than All words. Practice layouts adapt from stacked mobile lists to
desktop columns.

Mixed practice is a saved session builder: choose any combination of words,
verbs, adjectives, phrases, and grammar; then narrow it by levels, topics,
direction, and answer style. Phrase fill-in-the-blank questions can be written
or multiple choice.

**Apply grammar** turns reviewed phrase-corpus sentences into focused cloze
work. It starts with articles and all four cases, with an optional gender-first
step, and also includes modal-verb and separable-verb patterns.

Lessons are organised as 16 thematic units with three concise, demanding rounds
each: a word base, sentence practice, and a pattern workshop. Opening a unit
shows only its three rounds; progress is tracked per round.

## Project layout

- [`index.html`](index.html) — application shell and view markup.
- [`styles.css`](styles.css) — visual design and responsive layout.
- [`app.js`](app.js) — static loader for feature files and on-demand content.
- [`app/`](app/) — state, practice logic, rendering, and
  lesson integration.
- [`data/`](data/) — German/English content and English explanations.
- [`scripts/`](scripts/) — dictionary and project utility scripts.

See [`data/README.md`](data/README.md) for the content format.

## Future extensions

- Improve German vocabulary, noun plurals and examples using reviewed sources
  (see [`data/VOCABULARY-SOURCES.md`](data/VOCABULARY-SOURCES.md)).
- Expand German grammar and lessons.
- Continue reviewing vocabulary, sentence targets, and translations with the
  existing data-quality tools.
