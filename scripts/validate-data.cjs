const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),context={};vm.createContext(context);
for(const file of ['data/manifest.js','data/categories.js','data/grammar.js','data/lessons.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
vm.runInContext('this.contentManifest=contentManifest',context);
const collectedVocab=[],collectedPhrases=[];
context.WortwerkData={register(kind,group,records){
  if(kind==='phrases')collectedPhrases.push(...records);
  else collectedVocab.push(...records.map(item=>({...item,category:kind==='verbs'?'verbs':group,...(kind==='verbs'?{verbCategory:group}:{})})));
}};
for(const kind of ['vocabulary','verbs','phrases'])for(const entry of Object.values(context.contentManifest[kind]))vm.runInContext(fs.readFileSync(path.join(root,entry.src),'utf8'),context,{filename:entry.src});
context.vocab=collectedVocab;context.phrases=collectedPhrases;
vm.runInContext('this.content={vocab,phrases,lessons,grammarLessons,categoryRecords}',context);
const {vocab,phrases,lessons,grammarLessons,categoryRecords}=context.content;
const categories=new Set(categoryRecords.map(c=>c.id)),wordIds=new Set(vocab.map(w=>w.id)),ids=new Set();
const levels=new Set(['A1','A2','B1']),phraseLevel=p=>({easy:'A1',medium:'A2',hard:'B1'}[p.level]);
for(const item of [...vocab,...phrases]){
  assert.match(item.id,/^[1-9]\d*$/);assert(!ids.has(item.id),'Duplicate ID '+item.id);ids.add(item.id);
  assert.deepEqual(Object.keys(item.translations).sort(),['de','en']);
  for(const lang of ['en','de']){const text=item.translations[lang].text;assert.equal(typeof text,'string');assert(text.trim());assert.equal(text,text.trim());assert(!/[<>\u0000-\u001f]/.test(text));}
  assert(categories.has(item.category),'Unknown category '+item.category);
}
for(const w of vocab){
  assert(levels.has(w.level));assert(w.pos==='verb'||w.category!=='verbs');
  if(w.pos==='verb')assert.equal(w.category,'verbs');
  if(w.pos==='adjective'){
    assert.equal(w.category,'adjectives');
    assert(categories.has('adjective-'+w.adjectiveCategory),'Unknown adjective group');
  }
  if(w.pos==='noun'){const de=w.translations.de;assert(['der','die','das'].includes(de.article));assert(de.text.startsWith(de.article+' '));}
}
const assignments=JSON.parse(fs.readFileSync(path.join(root,'data/import/assignments.json'),'utf8'));
const reviewFile=JSON.parse(fs.readFileSync(path.join(root,'data/import/translation-reviews.json'),'utf8'));
const assignmentIds=new Set(assignments.entries.map(entry=>entry.id)),reviewedIds=new Set();
for(const decision of reviewFile.decisions){
  assert.equal(decision.status,'confirmed');assert.match(decision.reference,/\S/);assert.match(decision.note,/\S/);
  for(const id of decision.ids){assert(assignmentIds.has(id),'Unknown translation review '+id);assert(!reviewedIds.has(id),'Duplicate translation review '+id);reviewedIds.add(id);}
}
for(const p of phrases){assert(phraseLevel(p));assert(p.wordIds.length);for(const id of p.wordIds)assert(wordIds.has(id),'Broken sentence→word reference '+id);}
for(const g of grammarLessons){assert.equal(g.targetLanguage,'de');assert(g.localized.en.title);for(const t of g.tests){assert.equal(typeof t.prompt,'string');assert(t.answers.length);}}
for(const l of lessons)for(const a of l.activities){
  if(a.type==='mixed')continue;
  if(a.type==='grammar'){for(const topic of a.topics)assert(grammarLessons.some(g=>g.localized.en.title===topic),'Missing grammar topic '+topic);continue;}
  for(const category of a.categories){
    const pool=a.type==='phrases'?phrases.filter(p=>p.category===category&&phraseLevel(p)===l.level):vocab.filter(w=>(a.type==='verbs'?w.verbCategory:w.category)===category&&w.level===l.level);
    assert(pool.length,`Empty ${l.level} lesson ${l.id} activity ${a.type}/${category}`);
  }
}
const report=JSON.parse(fs.readFileSync(path.join(root,'data/import/report.json'),'utf8'));
assert.equal(vocab.length,report.totals.vocabulary+report.totals.verbs);assert.equal(phrases.length,report.totals.phrases);
console.log(`PASS: ${vocab.length} words/verbs, ${phrases.length} sentences, ${grammarLessons.length} grammar topics, ${lessons.length} lesson graphs`);
