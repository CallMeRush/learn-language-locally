# Application code

The app is intentionally made from classic browser scripts so it can run from
`file://` without a server or module bundler. [`../app.js`](../app.js) loads
these files in order and they share the browser application state.

- `state.js` — progress, preferences, persistence, and shared state helpers.
- `practice.js` — canonical answer normalisation, alternatives, check-button
  state, and the reusable study panel.
- `settings.js` — local light/dark and accent-palette controls.
- `vocabulary.js` — the single Nouns / Verbs / Adjectives desk: lists, cards,
  answer checking, article practice, and study status.
- `dictionary.js` — complete local German/English lookup and linked examples.
- `phrases.js` — phrase practice and phrase progress.
- `application.js` — reviewed, sentence-level grammar application practice.
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

Mixed practice is a separate, saved session builder. It combines any selected
content types and independently filters vocabulary, verb, adjective, and phrase
topics, CEFR levels, direction, and written/multiple-choice/cloze answering.
Grammar uses its own check format within the same session.

Grammar topics pair concise rules and reference tables with an interactive
example deck. Learners can step through each German example, cover or reveal
its English translation, and read the pattern note. Every grammar check returns
its record-level explanation and keeps an in-session correct/tried summary.

`application.js` provides a separate Apply grammar desk. Its reviewed exercises
link both to a grammar-tile ID and to a phrase ID, so sentence text, English
meaning, blanks, and explanations are fixed data rather than inferred at
runtime. Modal verbs have 50 exercises; separable verbs have 114 and can be
narrowed by their exact prefix (such as `auf-` or `aus-`). Case exercises always
show the base gender and offer two independent practice modes: typed article
recall and A–D case-form article selection. The case is hidden in A–D mode;
completion, errors, and hints are saved independently for each mode. A correct
focused answer immediately enables **Next exercise**—there is no
sentence-reconstruction follow-up. Case, article-type, and prefix selectors use
the same independently toggleable category-control behaviour as Vocabulary,
including an explicit empty state. Multiple-choice cards share A–D selection and
Enter-to-check/advance handling.

Lessons are organised as 16 expandable units, each with three focused rounds of
up to eight questions: a word base, sentence practice, and a pattern workshop.
Opening a unit hides the others and shows only its three rounds, with completion
ticks tracked per round.

Lessons run inside the Lessons section, using their configured topics and levels.
The same exercise panel is moved between Lessons and Mixed practice to reuse answer
controls without duplicate IDs. Returning to the lesson list preserves the current
round in memory; opening free Mixed practice ends it. Completed lessons are saved.
Skipped and incorrect questions return for repair. The final full-review lesson
uses all content types and levels, independently of free-practice filters.
