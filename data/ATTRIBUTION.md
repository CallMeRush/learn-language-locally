# Imported learning data

Vocabulary and example sentences are adapted from
[GENERAL NEURO / Language-Learning-decks](https://github.com/vbvss199/Language-Learning-decks),
German snapshot `efd235e692efd47eda026d0a1cbd703ce23d7692`.
The upstream [MIT notice](licenses/deck-MIT.txt) and
[wordfreq attribution](licenses/deck-attributions.md) are retained here.

The source attribution identifies wordfreq data as CC BY-SA 4.0, including:
Robyn Speer (2022), *rspeer/wordfreq: v3.0 (v3.0.2)*, Zenodo,
https://doi.org/10.5281/zenodo.7199437.

The imported and adapted learning data is distributed under
[CC BY-SA 4.0](licenses/CC-BY-SA-4.0.txt), with the upstream MIT notice also
retained. This notice concerns the imported data, not the application's code
or the separately maintained grammar content.

Wortwerk changes: A1–B1 filtering, POS normalization, explicit topic assignments,
selected spelling corrections, gender-conflict exclusions, answer-alternative
formatting, duplicate handling, stable IDs, and example-sentence extraction.
CEFR labels and translations remain source claims subject to further review.

The five modal-verb entries in `import/supplements.json` are editorial additions
for Wortwerk, distributed with the learning data under the same CC BY-SA terms.

Noun gender checks use [gambolputty/german-nouns](https://github.com/gambolputty/german-nouns),
snapshot `da71a2bc519b952b28c9b0b80971cff6efb508f6`, derived from German Wiktionary
under CC BY-SA 4.0. Its noun list is a reference download, not an app vocabulary
source. Disagreements are logged in `import/noun-audit.json` for review.
