# Wortwerk

Wortwerk is a small, local-first German-learning desk. It brings together
vocabulary, dictionary lookup, phrases, grammar, grammar application, lessons,
and configurable mixed practice without requiring an account or server.

The app teaches German to English speakers. All instructions are in English.
Vocabulary, verbs and phrases support English → German and German → English
practice. Grammar teaches German with English explanations.

## Run locally

No server or build step is required. Open [`index.html`](index.html) in a
browser. The app loads its JavaScript files directly and stores progress in
the browser's `localStorage`.

Use **Export progress** to download a private JSON backup, then **Import
progress** on another browser or device to replace that device's progress for
this learning deck. No account, server, or network sync is involved. Appearance
preferences travel with the export too: choose one of eight accent palettes and
a light or neutral-charcoal dark theme in **Settings**.

The current A1–B1 dataset includes 6,248 general vocabulary entries, 1,320
adjectives, 1,585 verbs and 9,124 example sentences. German grammar remains separate. See
[`data/ATTRIBUTION.md`](data/ATTRIBUTION.md) for source credits and data terms.

Vocabulary has Nouns (the general word collection), Verbs, and Adjectives tabs.
Click a list entry to practise it. List rows show only the prompt, while ✓ and ✕
mark correct and incorrect answers.
Typed German answers accept `ss` for `ß` and `ae`/`oe`/`ue` for umlauts.
The Dictionary searches the complete local word collection in either English or
German, accepts those same German spelling variants, and offers quick close
matches for small typing errors. Linked phrases appear as German/English
examples when the phrase corpus provides one.
The study-status buttons filter both the list and the practice card: an empty
selection clearly says so instead of repeating a completed item. Vocabulary also
distinguishes first-try answers, answers corrected after an error, and article-only
errors. Phrase practice remains a separate desk with the same multi-topic and
error-review behavior. Cloze targets are the linked vocabulary word as it appears
in the sentence. Adjectives retain meaning groups without tone filters. Topics are
ordered using CEFR and source frequency rank. The page initially loads a small
starter topic; wider topic selections load their records only when needed.
Practice layouts adapt from stacked mobile lists to desktop columns.

Mixed practice is a saved session builder: choose any combination of nouns,
verbs, adjectives, phrases, and grammar; then narrow it by levels, topics,
direction, and answer style. Phrase fill-in-the-blank questions can be written
or multiple choice.

**Apply grammar** turns reviewed phrase-corpus sentences into numbered,
tile-linked practice. Each exercise moves from a grammar pattern to a complete
German sentence recall, with a direct route back to its source grammar tile.

Lessons are organised as 16 thematic units with three concise, demanding rounds
each: a word base, sentence practice, and a pattern workshop. Opening a unit
shows only its three rounds; progress is tracked per round.

## Project layout

- [`index.html`](index.html) — application shell and view markup.
- [`styles/`](styles/) — formatted core and desk-specific visual design, loaded directly by the static page.
- [`app.js`](app.js) — static loader for feature files and on-demand content.
- [`app/`](app/) — state, shared practice primitives, feature logic, rendering,
  and page integration.
- [`data/`](data/) — German/English content and English explanations.
- [`scripts/`](scripts/) — dictionary and project utility scripts.

See [`data/README.md`](data/README.md) for the content format.

## Future extensions

- Improve German vocabulary, noun plurals and examples using reviewed sources
  (see [`data/VOCABULARY-SOURCES.md`](data/VOCABULARY-SOURCES.md)).
- Expand German grammar, phrase-backed applications, and lessons.
- Continue reviewing vocabulary, sentence targets, and translations with the
  existing data-quality tools.
