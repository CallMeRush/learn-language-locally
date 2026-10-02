/* Verify every generated non-editorial sentence against its reviewed source. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const context = {};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'data/manifest.js'), 'utf8'), context);
vm.runInContext('this.manifest = contentManifest', context);
const phrases = [];
context.WortwerkData = { register(kind, _group, records) { if (kind === 'phrases') phrases.push(...records); } };
for (const entry of Object.values(context.manifest.phrases)) {
  vm.runInContext(fs.readFileSync(path.join(root, entry.src), 'utf8'), context, { filename: entry.src });
}

const deck = JSON.parse(fs.readFileSync(path.join(root, 'dictionaries/sources/german-deck.json'), 'utf8'));
const assignments = JSON.parse(fs.readFileSync(path.join(root, 'data/import/assignments.json'), 'utf8')).entries;
const byId = new Map(assignments.filter(entry => entry.status === 'include').map(entry => [entry.id, entry]));
const pairs = new Set();
let sourceBacked = 0;
const phraseTokens = (text) => (text.match(/[\p{L}]+(?:['’-][\p{L}]+)?/gu) || []).map(token => token.toLocaleLowerCase('de'));
for (const phrase of phrases) {
  assert.deepEqual(Object.keys(phrase.translations).sort(), ['de', 'en']);
  const de = phrase.translations.de.text, en = phrase.translations.en.text;
  assert.equal(de, de.trim());
  assert.equal(en, en.trim());
  assert(de && en && !/[<>\u0000-\u001f]/.test(de + en));
  assert(phrase.cloze && typeof phrase.cloze === 'object', `Missing cloze focus for phrase ${phrase.id}`);
  for (const language of ['de', 'en']) {
    assert.equal(typeof phrase.cloze[language], 'string', `Invalid cloze focus for phrase ${phrase.id}/${language}`);
    assert(phraseTokens(phrase.translations[language].text).includes(phrase.cloze[language].toLocaleLowerCase('de')), `Cloze focus is not in phrase ${phrase.id}/${language}`);
  }
  const key = `${de}\u0000${en}`;
  assert(!pairs.has(key), `Duplicate phrase pair: ${key}`);
  pairs.add(key);
  if (phrase.source === 'editorial') continue;
  sourceBacked++;
  const linked = phrase.wordIds.map(id => byId.get(id));
  assert(linked.every(Boolean), `Unknown source word in phrase ${phrase.id}`);
  for (const entry of linked) {
    const row = deck[entry.sourceIndex];
    assert.equal(de, row.example_sentence_native, `German source mismatch for phrase ${phrase.id}`);
    assert.equal(en, row.example_sentence_english, `English source mismatch for phrase ${phrase.id}`);
    assert.equal(phrase.category, entry.sentenceTopic, `Topic mismatch for phrase ${phrase.id}`);
  }
}
console.log(`PASS: ${phrases.length} unique sentence pairs; ${sourceBacked} source-backed and ${phrases.length - sourceBacked} editorial.`);
