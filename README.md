# Wortwerk

Wortwerk is a small, local-first language-learning app for practicing
vocabulary, verbs, phrases, grammar, lessons, and mixed exercises.

The content is language-independent. English, German, and Italian can each be
used as the source or target language, so the same app supports pairs such as
English → German, German → Italian, or Italian → English.

## Run locally

No server or build step is required. Open [`index.html`](index.html) in a
browser. The app loads its JavaScript files directly and stores progress in
the browser's `localStorage`.

Progress is kept separately for each language direction. The browser/device
can therefore remember independent progress for English → German and other
pairs.

## Project layout

- [`index.html`](index.html) — application shell and view markup.
- [`styles.css`](styles.css) — visual design and responsive layout.
- [`app.js`](app.js) — static loader for the application files.
- [`app/`](app/) — state, language controls, practice logic, rendering, and
  lesson integration.
- [`data/`](data/) — canonical learning content and language registries.
- [`scripts/`](scripts/) — dictionary and project utility scripts.

See [`data/README.md`](data/README.md) for the content format.

## Future extensions

- Add more languages and localized interface text.
- Add import/export of progress for moving between browsers or devices.
- Expand grammar and lesson content for each language pair.
- Add automated linguistic validation and review tools.
