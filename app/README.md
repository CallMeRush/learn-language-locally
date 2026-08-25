# Application code

The app is intentionally made from classic browser scripts so it can run from
`file://` without a server or module bundler. [`../app.js`](../app.js) loads
these files in order and they share the browser application state.

- `state.js` — language selection, progress, persistence, and shared helpers.
- `vocabulary.js` — vocabulary lists, cards, answer checking, and articles.
- `phrases.js` — phrase practice and phrase progress.
- `mixed.js` — mixed-practice question generation and checking.
- `lessons.js` — lesson presentation and lesson flow.
- `ui.js` — grammar and general view rendering.
- `integration.js` — wiring between views, controls, and practice modes.

The source language controls the interface language. The selected target
language controls the learning content. Translation records themselves remain
in [`../data/`](../data/) and are not modified at runtime.
