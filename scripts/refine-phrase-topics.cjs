/* Assign every source sentence a reproducible topical home.
   A clear sentence topic wins; otherwise its reviewed vocabulary topic is the
   best available context because the deck sentence illustrates that word. */
const fs = require('node:fs');
const path = require('node:path');
const { classify } = require('./deck-topics.cjs');

const root = path.resolve(__dirname, '..');
const assignmentsPath = path.join(root, 'data/import/assignments.json');
const deck = JSON.parse(fs.readFileSync(path.join(root, 'dictionaries/sources/german-deck.json'), 'utf8'));
const assignments = JSON.parse(fs.readFileSync(assignmentsPath, 'utf8'));
const fallbackToDaily = new Set(['core', 'modal', 'function-words']);
const overrides = new Map([
  ['The sun is shining today.', 'nature'],
  ['The sun rises in the east.', 'nature'],
  ['Please state your date of birth.', 'public-services'],
  ['Please turn on the light.', 'technology'],
  ['Please keep the receipt.', 'shopping'],
]);

const fallbackTopic = (entry) => fallbackToDaily.has(entry.topic) ? 'daily' : entry.topic;
const included = assignments.entries.filter(entry => entry.status === 'include');
const bySentence = new Map();
for (const entry of included) {
  const row = deck[entry.sourceIndex];
  const key = `${row.example_sentence_native}\u0000${row.example_sentence_english}`;
  const group = bySentence.get(key) || [];
  group.push(entry);
  bySentence.set(key, group);
}

for (const entries of bySentence.values()) {
  const row = deck[entries[0].sourceIndex];
  const classified = classify(row.example_sentence_english || '');
  const topic = overrides.get(row.example_sentence_english)
    || (classified.method === 'keyword' ? classified.topic : fallbackTopic(entries[0]));
  const method = overrides.has(row.example_sentence_english)
    ? 'sentence-editorial'
    : classified.method === 'keyword' ? 'sentence-keyword' : 'word-context';
  for (const entry of entries) {
    entry.sentenceTopic = topic;
    entry.sentenceTopicMethod = method;
  }
}

const output = JSON.stringify(assignments, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(assignmentsPath, 'utf8') !== output) throw Error('Phrase topic assignments differ; run node scripts/refine-phrase-topics.cjs');
} else {
  fs.writeFileSync(assignmentsPath, output);
}

const counts = {};
for (const entry of included) counts[entry.sentenceTopic] = (counts[entry.sentenceTopic] || 0) + 1;
console.log(JSON.stringify({ sentences: bySentence.size, categories: counts }, null, 2));
