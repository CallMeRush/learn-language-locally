// Pinned reference snapshots; downloads are not loaded by the app.
const fs = require('node:fs/promises');
const path = require('node:path');
const output = path.resolve(__dirname, '../dictionaries/sources');
const sources = {
  'german-deck.json': ['vbvss199/Language-Learning-decks', 'efd235e692efd47eda026d0a1cbd703ce23d7692', 'german/german.json'],
  'deck-LICENSE': ['vbvss199/Language-Learning-decks', 'efd235e692efd47eda026d0a1cbd703ce23d7692', 'LICENSE'],
  'deck-attributions.md': ['vbvss199/Language-Learning-decks', 'efd235e692efd47eda026d0a1cbd703ce23d7692', 'attributions.md'],
  'nouns.csv': ['gambolputty/german-nouns', 'da71a2bc519b952b28c9b0b80971cff6efb508f6', 'german_nouns/nouns.csv'],
  'nouns-LICENSE': ['gambolputty/german-nouns', 'da71a2bc519b952b28c9b0b80971cff6efb508f6', 'LICENSE'],
};
(async () => {
  await fs.mkdir(output, {recursive:true});
  for(const [name, parts] of Object.entries(sources)) {
    const response = await fetch('https://raw.githubusercontent.com/' + parts.join('/'));
    if(!response.ok) throw Error(`${name}: HTTP ${response.status}`);
    await fs.writeFile(path.join(output,name), Buffer.from(await response.arrayBuffer()));
    console.log('Downloaded', name);
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
