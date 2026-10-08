# Interaction model

This document is the product contract for the study desks. Reuse these rules
when extending or refactoring a desk; do not introduce a near-duplicate control
with subtly different behavior.

## Shared study controls

- The fixed study bar owns levels and English ↔ German direction. Levels are
  independently selectable. Selecting every individual level is equivalent to
  “all”; clearing every level is valid and produces an explicit empty state.
- Category chips are multi-select. The aggregate chip (`All nouns`, `All
  verbs`, `All adjectives`, or `All phrases`) has this exact behavior:
  - when selected, it represents every concrete category;
  - clicking it clears every category;
  - clicking one concrete category while it is selected deselects only that
    category;
  - restoring the last missing concrete category reselects the aggregate chip.
- Selected category chips are white with a green tick; unselected chips keep the
  same footprint but are dimmed and have an empty tick slot. Category lists are
  alphabetical after their aggregate chip.
- No selection is a valid state. The list and practice card must say that there
  is nothing to study; they must never silently fall back to all content or
  repeat the last item.
- Changing a filter keeps the displayed exercise if that exact exercise remains
  in the newly filtered pool. It changes only when the filter removes it, when
  the learner presses Next, or when an answer flow intentionally advances it.

`toggleDeskCategorySelection` in `app/state.js` is the canonical helper for
the aggregate-chip behavior. Vocabulary, Phrases, Mixed Practice, and Apply
grammar selectors must use it. `toggleCategorySelection` is for controls where
an aggregate button intentionally means “select all”; it is not appropriate for
study-desk categories.

## Practice cards and lists

- The practice card comes before its contextual list on mobile. On wide screens,
  the card and compact list may sit side by side.
- A list is contextual, not an alternate order. Keep the current record in its
  true position and show a bounded window around it (small on phones, wider on
  desktop); never move it artificially to position one.
- Status controls (Pending, First try, After error, After hint, Article,
  Incorrect) filter both the list and the card. Empty status pools use the same
  explicit empty state.
- Correct answers change the main action to **Next**. Incorrect answers keep the
  item available for retry and record the appropriate error state. A hint means
  a later correct answer is “correct after hint,” not first try.
- Article-only errors are separate from translation errors. If both are wrong,
  record a normal translation error.

## Keyboard contract

- `Enter`: check a typed answer; check a selected multiple-choice answer; or
  advance after a correct answer when the card exposes Next.
- `A`–`D`: select visible multiple-choice options.
- `1`, `2`, `3`: choose `der`, `die`, `das`, in that order, whenever article
  buttons are visible.
- `4`: toggle the article hint when an article is being tested.
- `5`: toggle the ordinary answer/phrase hint.

Hints are toggles everywhere: using the same shortcut or button a second time
hides the hint. Keyboard handlers belong in `app/integration.js`; all choice
cards use `data-choice-shortcut` so the shared A–D and Enter handlers apply.

## Mixed Practice

Mixed Practice is a saved session builder, not a different answer system. It
uses the same levels, direction, category semantics, article controls, hints,
choice shortcuts, correctness tracking, and empty state as Vocabulary and
Phrases.

It has independent category selections for nouns, verbs, adjectives, and
phrases, plus source toggles and answer-style toggles. Grammar is included as a
source but retains each grammar check’s native answer form. If a source/style
combination yields no questions, the session card is explicitly disabled.

`refreshMixedSession` preserves the current question whenever it remains in
`mixedPool()`. This includes an unrelated category change. A category, level,
direction, source, or style change that excludes the current question chooses a
new one; an empty pool calls `showEmptyMixed()`.

## Apply grammar

Apply grammar uses the same card/layout, empty-state, category-chip, hint, and
multiple-choice keyboard rules, while each application set keeps the controls
its grammar requires:

- Cases/articles: case and definite/indefinite filters; the base gender is
  always shown. Typed article recall and A–D case-form choices have independent
  progress, and the case label is hidden in the choice form.
- Modal verbs and separable verbs: curated phrase-backed blanks; separable verbs
  additionally filter by prefix.
- Prepositions: independently filter accusative/dative and individual
  prepositions.
- Numbers/ordinals/dates: phrase-backed number-form recall.

Every application record links to its grammar tile and source phrase. The
grammar page keeps explanatory checks collapsed until requested; Apply grammar
is where the full practice card lives. New application sets should use static,
validated records and reuse these shared selectors before adding new control
patterns.

## Verification expectations

When changing a study interaction, add or update a browser smoke assertion in
`scripts/smoke-test.cjs`, then run:

```sh
node scripts/smoke-test.cjs
node scripts/validate-data.cjs
git diff --check
```

The smoke suite must cover an aggregate-chip clear, the all-selected restoration
rule, an explicit empty card, current-exercise preservation for an unrelated
filter change, and the relevant keyboard path.
