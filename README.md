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

Both translation directions contribute to the new deck's study profile
(`en-de-deck-efd235e6-v1`). It starts fresh because the content IDs changed.
Earlier progress stays stored in the browser but is not applied to this corpus.

The current A1–B1 dataset includes 7,568 vocabulary entries, 1,585 verbs and
9,124 example sentences. German grammar remains separate. See
[`data/ATTRIBUTION.md`](data/ATTRIBUTION.md) for source credits and data terms.

## Project layout

- [`index.html`](index.html) — application shell and view markup.
- [`styles.css`](styles.css) — visual design and responsive layout.
- [`app.js`](app.js) — static loader for the application files.
- [`app/`](app/) — state, practice logic, rendering, and
  lesson integration.
- [`data/`](data/) — German/English content and English explanations.
- [`scripts/`](scripts/) — dictionary and project utility scripts.

See [`data/README.md`](data/README.md) for the content format.

## Future extensions

- Improve German vocabulary, noun plurals and examples using reviewed sources
  (see [`data/VOCABULARY-SOURCES.md`](data/VOCABULARY-SOURCES.md)).
- Add import/export of progress for moving between browsers or devices.
- Expand German grammar and lessons.
- Add automated linguistic validation and review tools.
