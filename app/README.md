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

Lessons run inside the Lessons section, using their configured topics and levels.
The same exercise panel is moved between Lessons and Mixed practice to reuse answer
controls without duplicate IDs. Returning to the lesson list preserves the current
round in memory; opening free Mixed practice ends it. Completed lessons are saved.
Skipped and incorrect questions return for repair. The final full-review lesson
uses all content types and levels, independently of free-practice filters.
