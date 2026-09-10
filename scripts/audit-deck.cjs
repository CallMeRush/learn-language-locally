// Cross-check candidate noun genders; no dictionary text is copied to learning records.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function csv(text){const rows=[];let row=[],field='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(!quoted&&(c===','||c==='\n')){row.push(field.replace(/\r$/,''));field='';if(c==='\n'){rows.push(row);row=[];}}else field+=c;}if(field||row.length){row.push(field);rows.push(row);}return rows;}
const [headers,...rows]=csv(fs.readFileSync(path.join(root,'dictionaries/sources/nouns.csv'),'utf8'));
const genders=headers.map((h,i)=>/^genus(?: \d)?$/.test(h)?i:-1).filter(i=>i>=0),index=new Map();
for(const row of rows){const set=index.get(row[0])||new Set();for(const i of genders)if(['m','f','n'].includes(row[i]))set.add(row[i]);index.set(row[0],set);}
const assignments=JSON.parse(fs.readFileSync(path.join(root,'data/import/assignments.json'),'utf8'));
const deck=JSON.parse(fs.readFileSync(path.join(root,'dictionaries/sources/german-deck.json'),'utf8'));
const conflicts=[],missing=[];
for(const a of assignments.entries){if(a.pos!=='noun'||a.status!=='include'||a.number==='plural')continue;const expected=index.get(a.word),gender={masculine:'m',feminine:'f',neuter:'n'}[deck[a.sourceIndex].gender];if(!expected?.size)missing.push(a.id);else if(!expected.has(gender))conflicts.push({id:a.id,word:a.word,sourceGender:gender,dictionaryGenders:[...expected],english:deck[a.sourceIndex].english_translation});}
console.log(JSON.stringify({dictionaryRows:rows.length,conflicts,missing},null,2));
