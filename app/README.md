# Application code

The app is intentionally made from classic browser scripts so it can run from
`file://` without a server or module bundler. [`../app.js`](../app.js) loads
these files in order and they share the browser application state.

- `state.js` — German-learning progress, preferences, persistence, and shared helpers.
- `vocabulary.js` — vocabulary lists, cards, answer checking, and articles.
- `phrases.js` — phrase practice and phrase progress.
- `mixed.js` — mixed-practice question generation and checking.
- `lessons.js` — lesson presentation and lesson flow.
- `ui.js` — grammar and general view rendering.
- `integration.js` — wiring between views, controls, and practice modes.

English is the interface language; German is the language being learned.
Vocabulary and phrase directions choose the translation direction. The phrase
desk independently enables cloze and multiple-choice answering, so a cloze can
be typed or answered from choices in either direction. Content is in
[`../data/`](../data/).

Study-status controls are functional filters, not just list views: a selected
status determines the active practice pool. An empty pool disables the card and
shows an explicit empty state.

Lessons run inside the Lessons section, using their configured topics and levels.
The same exercise panel is moved between Lessons and Mixed practice to reuse answer
controls without duplicate IDs. Returning to the lesson list preserves the current
round in memory; opening free Mixed practice ends it. Completed lessons are saved.
Skipped and incorrect questions return for repair. The final full-review lesson
uses all content types and levels, independently of free-practice filters.
