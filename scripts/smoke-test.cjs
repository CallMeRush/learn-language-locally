/* Exercise the static app in Chromium with an isolated browser profile. */
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const profile = fs.mkdtempSync(path.join(os.homedir(), 'wortwerk-test-'));
const browser = spawn(process.env.CHROMIUM || 'chromium', ['--headless','--no-sandbox','--disable-gpu','--remote-debugging-port=0',`--user-data-dir=${profile}`,pathToFileURL(path.resolve(__dirname,'../index.html')).href]);
let socket;
(async () => {
  let port;
  for(let i=0;i<100;i++) {
    try {port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0]; break;} catch {}
    await new Promise(r=>setTimeout(r,100));
  }
  if(!port) throw Error('Chromium failed to start');
  const pages=await (await fetch(`http://localhost:${port}/json`)).json();
  const page=pages.find(p=>p.url.startsWith('file:'));
  if(!page) throw Error(JSON.stringify(pages));
  socket=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r=>socket.addEventListener('open',r,{once:true}));
  let id=0; const pending=new Map(),errors=[];
  socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}});
  const call=(method,params={})=>new Promise(resolve=>{const n=++id;pending.set(n,resolve);socket.send(JSON.stringify({id:n,method,params}));});
  await call('Runtime.enable');
  await call('Page.enable');
  for(let i=0;i<100;i++) {
    const ready=await call('Runtime.evaluate',{expression:'typeof bindGrammarInteractions'});
    if(ready.result?.result?.value==='function') break;
    await new Promise(r=>setTimeout(r,100));
  }
  const result=await call('Runtime.evaluate',{returnByValue:true,expression:`(() => {
    const assert=(condition,message)=>{if(!condition)throw Error(message)};
    assert(!document.querySelector('#source-language'), 'language selector removed');
    assert(grammarLessons.length===29 && document.querySelectorAll('.grammar-card').length===29,'German grammar rendered');
    const oldProgress=emptyProgress();oldProgress.learned=['1'];
    localStorage.setItem('wortwerk-progress',JSON.stringify({'en-de':oldProgress}));
    assert(loadProgress().learned.length===0,'old corpus progress is not applied');
    for(const view of ['dashboard','vocabulary','verbs','phrases','grammar','mixed','lessons','issues']) setView(view);
    state=emptyProgress(); randomMode=false; selectedCategory='house'; vocabStatus='unseen'; vocabMode='translate'; setView('vocabulary');
    const word=activeVocabWord;
    if(targetArticle(word)) { document.querySelector('#article-choices [data-article="'+targetArticle(word)+'"]').click(); assert(selectedArticle===targetArticle(word),'article button selects vocabulary article'); }
    $('#vocab-answer').value='WRONG'; checkVocab();
    assert(!vocabCorrect && activeVocabWord===word,'wrong answer keeps card');
    $('#vocab-answer').value=targetText(word).replace(/^(der|die|das) /,''); checkVocab();
    assert(vocabCorrect && state.learned.includes(word.id),'retry checks displayed word');
    assert(!answerIncludes('', 'table') && !answerIncludes('tab','table'),'reject empty and partial answers');
    assert(answerMatches('  tall  ','big / tall'),'slash alternatives');
    assert(answerMatches('to get','to become / to get'),'imported alternatives');
    assert(answerMatches('to become / to get','to become / to get'),'multiple-choice combined alternatives');
    assert(splitAnswerAlternatives('shirt (male/female) / blouse').length===2,'parenthetical delimiters');
    for(const mode of ['translate','reverse','cloze','choice']) {setPhraseMode(mode);const p=filteredPhrases()[phraseIndex];const answer=mode==='reverse'?sourceText(p):mode==='translate'?targetText(p):clozeFor(p).word;$('#phrase-answer').value=answer;selectedPhraseChoice=answer;checkPhrase();assert(phraseCorrect,'phrase '+mode);}
    setView('grammar'); const card=document.querySelector('[data-grammar-index="0"]');card.querySelector('[data-grammar-answer]').value=grammarLessons[0].tests[0].answers[0];card.querySelector('[data-grammar-check]').click();assert(grammarCorrect[0],'grammar check');card.querySelector('[data-grammar-next]').click();assert(grammarTestState[0]===1,'grammar next');
    assert(baseMixedPool().some(q=>q.kind==='phrase-reverse'),'mixed reverse phrases');
    activeLesson=null;lessonComplete=false;
    const pool=baseMixedPool(),originalPool=mixedPool;
    for(const kind of new Set(pool.map(q=>q.kind))) {
      const q=pool.find(q=>q.kind===kind);mixedPool=()=>[q];nextMixed();
      const item=q.item;
      let answer=kind==='grammar'?item.test.answers[0]:kind==='phrase-cloze'||kind==='phrase-choice'?clozeFor(item).word:kind==='vocab-meaning'||kind==='vocab-choice'||kind==='phrase-reverse'?sourceText(item):targetText(item).replace(/^(der|die|das) /,'');
      if(targetArticle(item)){document.querySelector('#mixed-article [data-mixed-article="'+targetArticle(item)+'"]').click();assert(mixedArticle===targetArticle(item),'mixed article');}
      $('#mixed-answer').value=answer;mixedChoice=answer;checkMixed();assert(mixedCorrect,'mixed '+kind);
    }
    mixedPool=originalPool;
    for(const lesson of lessons) assert(lessonPool(lesson).length>0,'lesson pool '+lesson.id);
    startLesson(lessons.find(l=>l.id==='4'));
    for(let i=0;i<50&&!lessonComplete;i++) {
      const q=mixedQuestion,item=q.item,kind=q.kind;
      const answer=kind==='grammar'?item.test.answers[0]:kind==='phrase-cloze'||kind==='phrase-choice'?clozeFor(item).word:kind==='vocab-meaning'||kind==='vocab-choice'||kind==='phrase-reverse'?sourceText(item):targetText(item).replace(/^(der|die|das) /,'');
      mixedArticle=targetArticle(item);mixedChoice=answer;$('#mixed-answer').value=answer;
      checkMixed();assert(mixedCorrect,'lesson question '+kind);nextMixed();
    }
    assert(lessonComplete && loadProgress().lessons.includes('4'),'lesson completion persists');
    assert(JSON.parse(localStorage.getItem('wortwerk-progress'))['en-de'].learned[0]==='1','old profile retained');
    return 'PASS: views, German grammar, directions, answer retries, alternatives, lesson pools';
  })()`});
  if(result.result?.exceptionDetails) errors.push(result.result.exceptionDetails);
  if(errors.length)throw Error(JSON.stringify(errors,null,2));
  console.log(result.result.result.value);
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{
  socket?.close();
  browser.once('exit',()=>fs.rmSync(profile,{recursive:true,force:true}));
  browser.kill();
});
