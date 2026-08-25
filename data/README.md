# Wortwerk content

The learning content is intentionally kept separate from the interface logic.

- `vocabulary/<category>.js` contains one category of vocabulary, such as `vocabulary/house.js` or `vocabulary/travel.js`. Each item is an object with `id`, `category`, `de`, and `en`. Nouns include their article in the German field, for example `{ "category": "house", "de": "der Tisch", "en": "table" }`.
- `vocabulary.js` is the small aggregator that combines all category files. Add a new category by creating its file, adding its variable to the aggregator, and adding its script tag in `index.html`.
- `verbs/<family>.js` contains the dedicated verb bank. Verb records stay in the main vocabulary through `verbs.js`, but also carry `verbCategory` so the UI can filter core, daily-life, separable, modal, travel, health, shopping, work, communication, and other verb families.
- Adjectives live in `vocabulary/adjectives.js` and carry `adjectiveCategory` for description, colors, weather, condition, personality, amount, evaluation, and taste.
- `grammar.js` contains the grammar lessons, examples, and tables rendered by the Grammar section.
- Phrases can carry a `category` and an optional `blank` field. `blank` tells fill-the-blank practice exactly which German word to test, so new examples can target a specific vocabulary item instead of relying on an automatic position.
- `phrases.js` contains the sentence records. Each item is `[level, English, German, label]`, where `level` is `easy`, `medium`, or `hard`.
- `categories.js` controls the category names shown in the vocabulary filters.

To add content, append records to the relevant array and keep IDs generated from the existing array length. The app automatically includes new records in random practice, sequential practice, article checks, progress totals, translation practice, and the issue queue.
