/* Compare deck glosses with independent German Wiktionary senses.
   This is a review queue, not an automatic translation rewriter. */
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const readline = require('node:readline');

const root = path.resolve(__dirname, '..');
const assignments = JSON.parse(fs.readFileSync(path.join(root, 'data/import/assignments.json'), 'utf8'));
const deck = JSON.parse(fs.readFileSync(path.join(root, 'dictionaries/sources/german-deck.json'), 'utf8'));
const reviews = JSON.parse(fs.readFileSync(path.join(root, 'data/import/translation-reviews.json'), 'utf8'));
const output = path.join(root, 'data/import/translation-audit.json');
const pos = { adjective: 'adj', noun: 'noun', verb: 'verb', adverb: 'adv', pronoun: 'pron', numeral: 'num', conjunction: 'conj', interjection: 'intj' };
const ignored = new Set(['a', 'an', 'and', 'at', 'for', 'from', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);
const clean = (value) => String(value || '').toLowerCase()
  .replace(/\([^)]*\)/g, ' ')
  .replace(/[^a-z0-9äöüß]+/g, ' ')
  .trim();
const terms = (value) => clean(value).split(' ').filter((word) => word.length > 1 && !ignored.has(word));
const candidates = assignments.entries.filter((entry) =>
  entry.status === 'include' && ['A1', 'A2'].includes(deck[entry.sourceIndex]?.cefr_level) && pos[entry.pos]);
const reviewed = new Map();
for (const decision of reviews.decisions) for (const id of decision.ids) {
  if (reviewed.has(id)) throw Error('Duplicate translation review: ' + id);
  reviewed.set(id, decision);
}
const byWord = new Map();
for (const entry of candidates) {
  const list = byWord.get(entry.word) || [];
  list.push(entry);
  byWord.set(entry.word, list);
}
const senses = new Map();
async function readDictionary() {
  const stream = fs.createReadStream(path.join(root, 'dictionaries/de.jsonl.gz')).pipe(zlib.createGunzip());
  for await (const line of readline.createInterface({ input: stream })) {
    const entry = JSON.parse(line);
    if (!byWord.has(entry.word) || !Array.isArray(entry.senses)) continue;
    const list = senses.get(entry.word) || [];
    list.push(entry);
    senses.set(entry.word, list);
  }
}
function glossesFor(entry) {
  return (senses.get(entry.word) || [])
    .filter((source) => source.pos === pos[entry.pos])
    .flatMap((source) => source.senses || [])
    .flatMap((sense) => sense.glosses || []);
}
function overlaps(translation, glosses) {
  const expected = terms(translation);
  const reference = new Set(glosses.flatMap(terms));
  return expected.some((word) => reference.has(word));
}
async function main() {
  await readDictionary();
  const counts = { candidates: candidates.length, reviewed: 0, referenceFound: 0, matched: 0, needsReview: 0, unavailable: 0 };
  const queue = [];
  for (const entry of candidates) {
    const source = deck[entry.sourceIndex];
    if (reviewed.get(entry.id)?.status === 'confirmed') {
      counts.reviewed++;
      continue;
    }
    const glosses = glossesFor(entry);
    if (!glosses.length) {
      counts.unavailable++;
      continue;
    }
    counts.referenceFound++;
    if (overlaps(entry.english || source.english_translation, glosses)) {
      counts.matched++;
      continue;
    }
    counts.needsReview++;
    queue.push({
      id: entry.id,
      level: source.cefr_level,
      frequencyRank: source.word_frequency,
      german: entry.word,
      deckEnglish: entry.english || source.english_translation,
      wiktionaryGlosses: [...new Set(glosses)],
    });
  }
  queue.sort((a, b) => a.frequencyRank - b.frequencyRank || a.id.localeCompare(b.id));
  const report = {
    source: 'dictionaries/de.jsonl.gz (German Wiktionary extract)',
    method: 'A1/A2 same-headword, same-part-of-speech token-overlap check',
    limitations: 'A match supports a shared sense; a queued item is not necessarily wrong. Review context, alternatives, and idioms manually.',
    counts,
    reviewQueue: queue.slice(0, 250),
  };
  const text = JSON.stringify(report, null, 2) + '\n';
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== text) throw Error('Translation audit differs; rerun node scripts/audit-translations.cjs');
  } else fs.writeFileSync(output, text);
  console.log(JSON.stringify({ ...counts, queued: report.reviewQueue.length }, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
