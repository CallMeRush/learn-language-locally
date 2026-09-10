/* Generate browser data from the pinned German deck. No network or runtime dependency.
   Run --plan to create assignments, then edit data/import/assignments.json before import.
   Run --check to assert generated files match the checked-in sources. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const {classify,overrides}=require('./deck-topics.cjs');
const {groups:adjectiveGroups,adjectiveGroup}=require('./adjective-groups.cjs');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const raw=read('dictionaries/sources/german-deck.json'),deck=JSON.parse(raw);
const revision='efd235e692efd47eda026d0a1cbd703ce23d7692';
const sha256=crypto.createHash('sha256').update(raw).digest('hex');
const levels=new Set(['A1','A2','B1']);
const posAliases={adjektiv:'adjective',adj:'adjective',adv:'adverb',num:'numeral',number:'numeral'};
const validPos=new Set(['noun','verb','adjective','adverb','pronoun','conjunction','numeral','interjection']);
const clean=s=>String(s??'').normalize('NFC').trim().replace(/\s+/g,' ');
function alt(s){let depth=0,part='',parts=[];for(const c of clean(s)){if(c==='(')depth++;if(c===')')depth--;if((c===';'||c==='/')&&depth===0){parts.push(part.trim());part='';}else part+=c;}parts.push(part.trim());return [...new Set(parts.filter(Boolean))].join(' / ');}
const candidates=deck.map((row,index)=>({row,index})).filter(({row})=>levels.has(row.cefr_level));
const folder='data/import';
function write(p,text){const full=path.join(root,p);if(process.argv.includes('--check')){if(!fs.existsSync(full)||fs.readFileSync(full,'utf8')!==text)throw Error('Generated data differs: '+p);}else {fs.mkdirSync(path.dirname(full),{recursive:true});fs.writeFileSync(full,text);}}
function readRecords(p){const s=read(p),name=s.match(/^const (\w+)/)[1],c={};vm.createContext(c);vm.runInContext(s+`;this.records=${name}`,c);return {name,records:c.records};}
function plan(){
  return candidates.map(({row,index})=>{
    const o=overrides[row.word]||{},pos=o.pos||posAliases[row.pos]||row.pos;
    const decision=classify(row.english_translation);
    const topic=o.topic||decision.topic;
    const sentence=classify(row.example_sentence_english);
    const reasons=[];
    if(!validPos.has(pos))reasons.push('Unrecognized part of speech');
    if(row.useful_for_flashcard!==true)reasons.push('Source marks entry unsuitable');
    if(!row.word||!row.english_translation||!row.example_sentence_native||!row.example_sentence_english)reasons.push('Missing text');
    if(pos==='noun'&&!o.article&&!['masculine','feminine','neuter'].includes(row.gender))reasons.push('Unresolved noun gender or number');
    if(/[<>\u0000-\u001f]/.test(row.word+row.english_translation+row.example_sentence_native+row.example_sentence_english))reasons.push('Markup or control characters');
    return {sourceIndex:index,id:String(10000+index),word:o.word||row.word,pos,topic,
      sentenceTopic:sentence.topic,topicMethod:o.topic?'editorial':decision.method,
      sentenceTopicMethod:sentence.method,status:reasons.length?'hold':'include',
      ...(reasons.length?{reasons}:{}),...(o.article?{article:o.article,number:o.number}:{}),
      ...(o.word?{correctedSpelling:true}:{})};
  });
}
if(process.argv.includes('--plan')){
  if(fs.existsSync(path.join(root,folder,'assignments.json')))throw Error('Assignments already exist; edit them explicitly to preserve review decisions.');
  write(folder+'/assignments.json',JSON.stringify({revision,sha256,entries:plan()},null,2)+'\n');
  console.log('Created explicit assignments for',candidates.length,'candidates');process.exit(0);
}
const assignments=JSON.parse(read(folder+'/assignments.json'));
if(assignments.revision!==revision||assignments.sha256!==sha256)throw Error('Source snapshot does not match the reviewed assignments');
if(assignments.entries.length!==candidates.length)throw Error('Every A1–B1 candidate needs an assignment');
const files={};for(const dir of ['vocabulary','verbs'])for(const f of fs.readdirSync(path.join(root,'data',dir))){if(f.endsWith('.js')){const p=`data/${dir}/${f}`;files[p]={name:readRecords(p).name,records:[]};}}
const topics=new Set(Object.keys(files).filter(p=>p.startsWith('data/vocabulary')).map(p=>path.basename(p,'.js')));
const phrases=[],seen=new Set(),sentenceKeys=new Map(),sentenceTranslations=new Map(),duplicates=[],held=[],topicCounts={},ids=new Set();
const verbFileTopic=topic=>files[`data/verbs/${topic}.js`]?topic:({food:'daily',house:'daily',people:'communication',city:'travel',time:'daily',greetings:'communication'}[topic]||'daily');
for(const a of assignments.entries){
  const row=deck[a.sourceIndex];
  if(!row||!levels.has(row.cefr_level)||ids.has(a.id))throw Error('Invalid assignment '+a.id);ids.add(a.id);
  if(a.status==='hold'){held.push({id:a.id,word:a.word,reasons:a.reasons});continue;}
  if(a.status!=='include'||!validPos.has(a.pos))throw Error('Invalid review status/POS '+a.id);
  const article=a.article||({masculine:'der',feminine:'die',neuter:'das'}[row.gender]);
  if(a.pos==='noun'&&!article)throw Error('Noun lacks article: '+a.word);
  const word=clean(a.word),en=alt(a.english||row.english_translation);
  const key=[word,a.pos,article||'',en].join('|');
  if(seen.has(key)){duplicates.push(a.id);continue;}seen.add(key);
  const topic=a.topic;
  if(!topics.has(topic)&&!['core','modal'].includes(topic))throw Error('Unknown topic '+topic);
  const de={text:a.pos==='noun'?article+' '+word:word};
  if(a.pos==='noun'){de.article=article;if(a.number)de.number=a.number;else de.gender=row.gender;}
  if(row.capitalization_sensitive)de.caseSensitive=true;
  if(a.pos==='verb'){de.separable=Boolean(row.is_separable_verb);if(de.separable){de.prefix=clean(row.separable_prefix);de.baseVerb=clean(row.base_verb);}}
  const record={id:a.id,level:row.cefr_level,pos:a.pos,topic,translations:{en:{text:en},de},sourceIndex:a.sourceIndex};
  if(a.pos==='adjective') {
    record.adjectiveCategory=a.adjectiveGroup||adjectiveGroup(en,topic);
  }
  const file=a.pos==='verb'?`data/verbs/${verbFileTopic(topic)}.js`:`data/vocabulary/${a.pos==='adjective'?'adjectives':topic}.js`;
  if(!files[file])throw Error('Missing category file '+file);
  files[file].records.push(record);topicCounts[topic]=(topicCounts[topic]||0)+1;
  const native=clean(a.sentenceGerman||row.example_sentence_native),english=clean(a.sentenceEnglish||row.example_sentence_english),sentenceKey=native+'|'+english;
  if(sentenceKeys.has(sentenceKey)){sentenceKeys.get(sentenceKey).wordIds.push(a.id);continue;}
  if(sentenceTranslations.has(native)&&sentenceTranslations.get(native)!==english){held.push({id:a.id,word,scope:'sentence',reasons:['Conflicting English translations of identical German sentence']});continue;}
  if(!topics.has(a.sentenceTopic))throw Error('Invalid sentence topic '+a.sentenceTopic);
  const phrase={id:String(100000+a.sourceIndex),category:a.sentenceTopic,level:{A1:'easy',A2:'medium',B1:'hard'}[row.cefr_level],translations:{en:{text:english},de:{text:native}},wordIds:[a.id],sourceIndex:a.sourceIndex};
  phrases.push(phrase);sentenceKeys.set(sentenceKey,phrase);sentenceTranslations.set(native,english);
}
const supplements=JSON.parse(read(folder+'/supplements.json'));
for(const s of supplements){
  if(ids.has(s.id))throw Error('Duplicate supplement ID');ids.add(s.id);
  files['data/verbs/modal.js'].records.push({id:s.id,level:s.level,pos:'verb',topic:s.topic,translations:{en:{text:s.english},de:{text:s.word,separable:false}},source:'editorial'});
  phrases.push({id:String(100000+Number(s.id)),category:'daily',level:'easy',translations:{en:{text:s.sentenceEnglish},de:{text:s.sentenceGerman}},wordIds:[s.id],source:'editorial'});
}
for(const [p,{name,records}] of Object.entries(files))write(p,`const ${name} = ${JSON.stringify(records,null,2)};\n`);
write('data/phrases.js',`const phrases = ${JSON.stringify(phrases,null,2)};\n`);
const labels={all:'All words',verbs:'All verbs',adjectives:'Adjectives',house:'Home & household',greetings:'Greetings',people:'People & relationships',food:'Food & drink',city:'Places & public life',time:'Time & numbers',travel:'Travel & transport',health:'Health & body',shopping:'Shopping & money',nature:'Nature & weather',work:'Work & business',feelings:'Feelings & thoughts',clothing:'Clothes & fashion',education:'Learning & knowledge',technology:'Technology & media',communication:'Communication',daily:'General & everyday life',environment:'Environment',culture:'Culture & leisure',core:'Core',modal:'Modal'};
const categories=['all','verbs',...topics,...Object.entries(files).filter(([p,x])=>p.startsWith('data/verbs')&&x.records.length).map(([p])=>'verb-'+path.basename(p,'.js'))].map(id=>({id,type:'category',localized:{en:{label:id.startsWith('verb-')?labels[id.slice(5)]:labels[id]}}}));
// Lower CEFR mean first, then median source frequency rank; aggregate tabs last.
for (const category of categories) {
  const file = category.id.startsWith('verb-') ? 'data/verbs/'+category.id.slice(5)+'.js' : 'data/vocabulary/'+category.id+'.js';
  const rows = files[file]?.records || [];
  if (!rows.length) { category.studyOrder = 9999999; continue; }
  const difficulty = rows.reduce((sum,row)=>sum+({A1:1,A2:2,B1:3}[row.level]),0)/rows.length;
  const ranks = rows.map(row=>Number(deck[row.sourceIndex]?.word_frequency)||100000).sort((a,b)=>a-b);
  category.studyOrder = Math.round(difficulty * 1000000 + ranks[Math.floor(ranks.length/2)]);
}
for(const [group,label] of Object.entries(adjectiveGroups))categories.push({id:'adjective-'+group,type:'category',localized:{en:{label}}});
write('data/categories.js',`const categoryRecords = ${JSON.stringify(categories,null,2)};\n`);
const totals={vocabulary:Object.entries(files).filter(([p])=>p.startsWith('data/vocabulary')).reduce((n,[,x])=>n+x.records.length,0),verbs:Object.entries(files).filter(([p])=>p.startsWith('data/verbs')).reduce((n,[,x])=>n+x.records.length,0),phrases:phrases.length};
write(folder+'/report.json',JSON.stringify({revision,sha256,candidates:candidates.length,totals,topicCounts,duplicates,held,topicReview:assignments.entries.filter(a=>a.status==='include'&&(a.topicMethod==='general'||a.topicMethod==='ambiguous')).map(a=>a.id)},null,2)+'\n');
console.log(JSON.stringify({totals,held:held.length,duplicates:duplicates.length,topicCounts},null,2));
