# German vocabulary sources

Inspected 2026-09-10. Reproduce downloads with
`node scripts/download-vocabulary-sources.cjs`. Files go in ignored
`dictionaries/sources/`. The A1–B1 deck is now imported into app content using
`scripts/import-deck.cjs`; see `ATTRIBUTION.md` and `import/report.json`.

| Source | Useful content | Fit |
| --- | --- | --- |
| [german-nouns](https://github.com/gambolputty/german-nouns) | About 100,000 nouns, gender and case/number inflections in CSV | Noun validation and plural enrichment; no English translations or learner levels |
| [Language-Learning-decks](https://github.com/vbvss199/Language-Learning-decks) | 20,280 German records with English meanings, bilingual examples, POS, gender, CEFR labels, frequency field and separable-verb metadata | Better starting point for bilingual expansion |

The downloaded deck labels 681 entries A1, 2,060 A2 and 6,449 B1.
These labels are not independently verified CEFR assessments.
Its README describes Gemini-assisted curation, including removal of prepositions.
Do not treat it as a complete curriculum or verified dictionary.
The sampled `Bank` record covers “bench” only; `Band` covers the neuter
ribbon/tape/bond sense. Importing by spelling alone would lose distinctions.
Semicolon-separated meanings need individual accepted answers.

Recommendation: use the deck as a candidate list and german-nouns to
cross-check noun metadata. Review senses, examples, article/gender conflicts,
duplicates and levels before publishing entries. Preserve categories and
existing IDs for unchanged concepts; record provenance for imported data.

The nouns repository declares CC BY-SA 4.0. The deck declares MIT, but its
[attribution file](https://github.com/vbvss199/Language-Learning-decks/blob/main/attributions.md)
also identifies underlying wordfreq data as CC BY-SA 4.0. Preserve both notices
with the adapted dataset. The imported learning files carry CC BY-SA 4.0 terms
alongside the upstream MIT notice; see `ATTRIBUTION.md`.
