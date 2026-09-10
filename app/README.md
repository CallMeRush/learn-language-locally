# Application code

The app is intentionally made from classic browser scripts so it can run from
`file://` without a server or module bundler. [`../app.js`](../app.js) loads
these files in order and they share the browser application state.

- `state.js` — German-learning progress, persistence, and shared helpers.
- `vocabulary.js` — vocabulary lists, cards, answer checking, and articles.
- `phrases.js` — phrase practice and phrase progress.
- `mixed.js` — mixed-practice question generation and checking.
- `lessons.js` — lesson presentation and lesson flow.
- `ui.js` — grammar and general view rendering.
- `integration.js` — wiring between views, controls, and practice modes.

English is the interface language; German is the language being learned.
Practice modes choose the translation direction. Content is in [`../data/`](../data/).
