/* Conservatively split high-confidence entries from the broad daily category.
   The assignments remain the source of truth; use --check in CI. */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const assignmentPath = path.join(root, 'data/import/assignments.json');
const deck = JSON.parse(fs.readFileSync(path.join(root, 'dictionaries/sources/german-deck.json'), 'utf8'));
const assignments = JSON.parse(fs.readFileSync(assignmentPath, 'utf8'));
const words = (text) => new Set(String(text).toLowerCase().match(/[a-z]+/g) || []);
const has = (tokens, list) => list.some(word => tokens.has(word));
const functionParts = new Set(['pronoun', 'adverb', 'conjunction', 'interjection', 'numeral']);
const terms = {
  'public-services': ['authority', 'official', 'document', 'permit', 'license', 'licence', 'registration', 'register', 'insurance', 'tax', 'postal', 'parcel', 'package', 'repair', 'appointment'],
  'daily-routines': ['routine', 'wake', 'awake', 'asleep', 'shower', 'laundry', 'tidy', 'household', 'undress', 'breakfast'],
  'abstract-ideas': ['thing', 'fact', 'idea', 'reason', 'purpose', 'kind', 'type', 'example', 'case', 'point', 'whole', 'result', 'effect', 'cause', 'condition', 'situation', 'difference', 'possibility', 'chance', 'quality', 'meaning', 'truth'],
};
function topicFor(entry) {
  if (functionParts.has(entry.pos)) return 'function-words';
  const tokens = words(entry.english || deck[entry.sourceIndex].english_translation);
  for (const topic of ['public-services', 'daily-routines', 'abstract-ideas']) if (has(tokens, terms[topic])) return topic;
  return 'daily';
}
let changed = 0;
for (const entry of assignments.entries) {
  if (entry.status !== 'include' || !['daily', 'function-words', 'public-services', 'daily-routines', 'abstract-ideas'].includes(entry.topic)) continue;
  const topic = topicFor(entry);
  if (entry.topic !== topic || (topic !== 'daily' && entry.topicMethod !== 'everyday-refinement')) changed++;
  entry.topic = topic;
  if (topic !== 'daily') entry.topicMethod = 'everyday-refinement';
}
const text = JSON.stringify(assignments, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(assignmentPath, 'utf8') !== text) throw Error('Everyday topic assignments differ; rerun node scripts/refine-everyday-topics.cjs');
} else fs.writeFileSync(assignmentPath, text);
const counts = {};
for (const entry of assignments.entries) if (entry.status === 'include' && ['daily', 'function-words', 'public-services', 'daily-routines', 'abstract-ideas'].includes(entry.topic)) counts[entry.topic] = (counts[entry.topic] || 0) + 1;
console.log(JSON.stringify({ changed, counts }, null, 2));
