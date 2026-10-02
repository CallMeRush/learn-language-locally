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
  const initial=await call('Runtime.evaluate',{awaitPromise:true,returnByValue:true,expression:`(() => {
    if(vocab.length !== contentManifest.vocabulary.greetings.count || phrases.length !== 0 || !activeVocabWord) throw Error('only the initial vocabulary topic loads at startup');
    return setView('verbs').then(() => {
      if(!contentAvailable('verbs')) throw Error('the All verbs default loads every verb family');
      return setView('phrases').then(() => {
        if(!contentAvailable('phrases')) throw Error('the All phrases default loads every phrase topic');
        return setView('dashboard');
      });
    });
  })()`});
  if(initial.result?.exceptionDetails)throw Error(JSON.stringify(initial.result.exceptionDetails));
  const lazy=await call('Runtime.evaluate',{awaitPromise:true,returnByValue:true,expression:"Promise.all([ensureContent('vocabulary'), ensureContent('verbs'), ensureContent('phrases')])"});
  if(lazy.result?.exceptionDetails)throw Error(JSON.stringify(lazy.result.exceptionDetails));
  const result=await call('Runtime.evaluate',{returnByValue:true,expression:`(() => {
    const assert=(condition,message)=>{if(!condition)throw Error(message)};
    assert(!document.querySelector('#source-language'), 'language selector removed');
    assert(document.querySelector('#export-progress') && document.querySelector('#import-progress'),'local progress transfer controls render');
    $('#reset-progress').click();
    assert(!$('#progress-modal').hidden && $('#progress-modal-content').textContent.includes('Reset this session?'),'reset uses an in-page confirmation');
    $('[data-modal-close]').click();
    $('#import-progress').click();
    assert(!$('#progress-modal').hidden && $('#import-drop-zone') && $('#browse-progress-file'),'import uses a browseable drop zone');
    $('#progress-modal-close').click();
    assert(grammarLessons.length===29 && document.querySelectorAll('.grammar-card').length===29,'German grammar rendered');
    assert(lessons.length===16,'expanded lesson path');
    const oldProgress=emptyProgress();oldProgress.learned=['1'];
    localStorage.setItem('wortwerk-progress',JSON.stringify({'en-de':oldProgress}));
    assert(loadProgress().learned.length===0,'old corpus progress is not applied');
    for(const view of ['dashboard','vocabulary','verbs','adjectives','phrases','grammar','mixed','lessons','issues']) setView(view);
    document.querySelector('#vocabulary-view [data-vocabulary-kind="adjectives"]').click();
    assert(currentWords().length>0 && currentWords().every(w=>w.pos==='adjective'),'adjective desk contains only adjectives');
    const adjectiveTotal=currentWords().length;
    assert(!document.querySelector('[data-adjective-tag]'),'adjective tones removed');
    for(const tab of [...$('#category-tabs').querySelectorAll('[data-cat]')]) {
      assert(tab.querySelector('small').textContent===String(categoryCount(tab.dataset.cat)),'every adjective tab has count');
    }
    const group=document.querySelector('#adjectives-category-tabs [data-cat="adjective-appearance"]');group.click();
    assert(currentWords().every(w=>w.adjectiveCategory==='appearance'),'adjective group filter');
    for(const mode of ['translate','meaning','choice']) {
      document.querySelector('#adjectives-view [data-vocab-mode="'+mode+'"]').click();
      const word=activeVocabWord;
      $('#vocab-answer').value=mode==='translate'?targetText(word):sourceText(word);
      if(mode==='choice') [...$('#vocab-choice-options').children].find(b=>b.textContent===sourceText(word)).click();
      document.querySelector('#adjectives-check-vocab').click();
      assert(vocabCorrect && state.learned.includes(word.id),'adjective answer '+mode);
      document.querySelector('#adjectives-check-vocab').click();
    }
    setView('vocabulary');assert(currentWords().every(w=>!['adjective','verb'].includes(w.pos)),'ordinary vocabulary excludes adjectives and verbs');
    assert(adjectiveTotal===vocab.filter(w=>w.pos==='adjective').length,'all adjectives accessible');
    vocabStatus='all';randomMode=true;
    selectedCategory='all';setView('vocabulary');
    assert(selectedCategory==='all','vocabulary defaults to All words');
    selectedCategory='all';vocabStudyStatus='pending';renderVocabulary();
    assert($('#word-list').querySelectorAll('[data-word]').length<=120,'large lists render bounded pages');
    assert($('#word-list').classList.contains('vocabulary-study-panel'),'vocabulary uses one status panel');
    $('#word-list [data-vocab-study-status="correct"]').click();
    assert($('#word-list [data-vocab-study-status="correct"]').classList.contains('active'),'status tabs remain selectable');
    $('#word-list [data-vocab-study-status="pending"]').click();
    const moreWords=$('#word-list').querySelector('.study-more');
    const rowsBefore=$('#word-list').querySelectorAll('[data-word]').length;
    moreWords.click();
    assert($('#word-list').querySelectorAll('[data-word]').length>rowsBefore,'Show more reveals additional words');
    for(const desk of ['vocabulary','verbs','adjectives']) {
      setView(desk);
      vocabStudyStatus='pending'; renderVocabularyList();
      assert(document.querySelector('.nav-item[data-view="vocabulary"]').classList.contains('active'),'shared Vocabulary navigation');
      for(const mode of ['translate','meaning','choice']) {
        document.querySelector('.active-view [data-vocab-mode="'+mode+'"]').click();
        const row=$('#word-list').querySelector('[data-word]');
        const id=row.dataset.word;
        row.click();
        assert(activeVocabWord.id===id,'list click selects exact word with random enabled');
        const selected=$('#word-list').querySelector('[data-word="'+id+'"]');
        assert(selected.classList.contains('current'),'selected row highlighted');
        assert(selected.querySelector('small').textContent==='Answer hidden','answers hidden by default');
        assert(selected.querySelector('strong').textContent===(mode==='translate'?sourceText(activeVocabWord):targetText(activeVocabWord).replace(/^(der|die|das) /,'')),'list uses prompt language');
        const toggle=document.querySelector('.active-view [data-hide-vocabulary-answer]');
        toggle.click();
        assert(activeVocabWord.id===id && $('#word-list').querySelector('[data-word="'+id+'"] small').textContent!=='Answer hidden','revealing preserves current card');
        toggle.click();
      }
      const word=activeVocabWord;
      vocabMode='translate';showVocabCard();
      $('#vocab-answer').value='WRONG';checkVocab();
      $('#word-list [data-vocab-study-status="wrong"]').click();
      assert($('#word-list').querySelector('[data-word="'+word.id+'"] .word-check').textContent==='✕','wrong marker updates immediately');
      selectedArticle=targetArticle(word);$('#vocab-answer').value=targetText(word).replace(/^(der|die|das) /,'');checkVocab();
      $('#word-list [data-vocab-study-status="correct"]').click();
      assert($('#word-list').querySelector('[data-word="'+word.id+'"] .word-check').textContent==='✓','correct marker updates immediately');
      assert(!state.issues.includes(word.id),'correct word clears its issue');
    }
    state=emptyProgress(); randomMode=false; selectedCategory='house'; vocabStatus='unseen'; vocabMode='translate'; setView('vocabulary');
    $('#word-list [data-vocab-study-status="wrong"]').click();
    assert($('#word-list [data-vocab-study-status="wrong"]').classList.contains('active') && !$('#word-list').querySelector('[data-word]'),'zero-count status tabs can show an empty list');
    $('#word-list [data-vocab-study-status="pending"]').click();
    const word=activeVocabWord;
    if(targetArticle(word)) { document.querySelector('#article-choices [data-article="'+targetArticle(word)+'"]').click(); assert(selectedArticle===targetArticle(word),'article button selects vocabulary article'); }
    $('[data-vocab-article-hint]').click(); assert($('#vocab-feedback').textContent.includes('Article:'),'article hint is separate');
    $('#vocab-hint').click(); assert($('#vocab-feedback').textContent.includes('Answer:'),'word hint is separate');
    $('#vocab-answer').value='WRONG'; checkVocab();
    assert(!vocabCorrect && activeVocabWord===word,'wrong answer keeps card');
    $('#vocab-answer').value=targetText(word).replace(/^(der|die|das) /,''); checkVocab();
    assert(vocabCorrect && state.learned.includes(word.id),'retry checks displayed word');
    assert(!answerIncludes('', 'table') && !answerIncludes('tab','table'),'reject empty and partial answers');
    assert(answerMatches('  tall  ','big / tall'),'slash alternatives');
    assert(answerMatches('to get','to become / to get'),'imported alternatives');
    assert(answerMatches('to become / to get','to become / to get'),'multiple-choice combined alternatives');
    assert(splitAnswerAlternatives('shirt (male/female) / blouse').length===2,'parenthetical delimiters');
    setView('phrases');setPhraseMode('translate');
    const sentenceRow=document.querySelector('#phrase-study-lists [data-phrase-id]'), sentenceId=sentenceRow.dataset.phraseId;
    sentenceRow.click();
    assert(filteredPhrases()[phraseIndex].id===sentenceId,'sentence list selects exact card in random mode');
    $('#phrase-answer').value='WRONG';checkPhrase();
    $('#phrase-study-lists [data-phrase-study-status="wrong"]').click();
    assert(document.querySelector('#phrase-study-lists [data-phrase-id="'+sentenceId+'"]'),'sentence moves into incorrect list');
    $('#phrase-answer').value=targetText(filteredPhrases()[phraseIndex]);checkPhrase();
    $('#phrase-study-lists [data-phrase-study-status="correct"]').click();
    assert(document.querySelector('#phrase-study-lists [data-phrase-id="'+sentenceId+'"]'),'sentence moves into correct list');
    assert(!state.issues.includes(sentenceId),'correct sentence clears its issue');
    const sentenceCounts=[...document.querySelectorAll('#phrase-study-lists [data-phrase-study-status] small')].reduce((n,x)=>n+Number(x.textContent),0);
    assert(sentenceCounts===filteredPhrases().length,'sentence counts cover all statuses');
    for(const mode of ['translate','reverse','cloze','choice']) {setPhraseMode(mode);const p=filteredPhrases()[phraseIndex];const answer=mode==='reverse'?sourceText(p):mode==='translate'?targetText(p):clozeFor(p).word;$('#phrase-answer').value=answer;selectedPhraseChoice=answer;checkPhrase();assert(phraseCorrect,'phrase '+mode);}
    setView('grammar');
    $('#grammar-layout-toggle').click();
    assert(grammarGrid && $('#grammar-list').classList.contains('grammar-grid'),'grammar can opt into a multi-tile layout');
    $('#grammar-layout-toggle').click();
    assert(!grammarGrid && !$('#grammar-list').classList.contains('grammar-grid'),'grammar defaults back to one tile');
    const card=document.querySelector('[data-grammar-index="0"]');card.querySelector('[data-grammar-answer]').value=grammarLessons[0].tests[0].answers[0];card.querySelector('[data-grammar-check]').click();assert(grammarCorrect[0],'grammar check');card.querySelector('[data-grammar-next]').click();assert(grammarTestState[0]===1,'grammar next');
    assert(mixedPool().some(q=>q.kind==='phrase-reverse'),'mixed reverse phrases');
    activeLesson=null;lessonComplete=false;
    const pool=mixedPool(),originalPool=mixedPool;
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
    assert(document.querySelector('#lessons-view.active-view .mixed-layout'),'lesson exercises stay in Lessons');
    assert(document.querySelector('.nav-item[data-view="lessons"]').classList.contains('active'),'Lessons navigation remains selected');
    assert(lessonChoiceItems('vocab',vocab).every(item=>item.category==='food' && item.level==='A1'),'lesson distractors stay on topic');
    const pausedQuestion=mixedQuestion,pausedRemaining=lessonRemaining.length;
    assert(state.lessonSession?.lessonId==='4','active lesson is persisted');
    document.getElementById('lesson-back').click();
    document.querySelector('[data-lesson-id="4"] .lesson-start').click();
    assert(mixedQuestion===pausedQuestion && lessonRemaining.length===pausedRemaining,'continue lesson preserves question');
    const savedQuestion=mixedQuestion;
    activeLesson=null;mixedQuestion=null;lessonRemaining=[];lessonErrors=[];lessonReviewErrors=[];
    startLesson(lessons.find(l=>l.id==='4'));
    assert(mixedQuestion.kind===savedQuestion.kind && mixedQuestion.item===savedQuestion.item,'saved lesson resumes its question');
    const savedLevel=mixedLevel,savedParts=mixedParts;
    mixedLevel='A1';mixedParts={vocabulary:true,verbs:false,phrases:false,grammar:false};
    const reviewPool=lessonPool(lessons.find(l=>l.id==='12'));
    assert(reviewPool.some(q=>q.level==='B1') && reviewPool.some(q=>q.kind==='grammar') && reviewPool.some(q=>q.kind.startsWith('phrase')),'final lesson independent of mixed filters');
    mixedLevel=savedLevel;mixedParts=savedParts;
    nextLessonQuestion();
    assert(lessonErrors.some(q=>q.kind===pausedQuestion.kind && q.item===pausedQuestion.item),'skipped lesson question returns for repair');
    for(let i=0;i<50&&!lessonComplete;i++) {
      const q=mixedQuestion,item=q.item,kind=q.kind;
      assert(item.category==='food' && q.level==='A1','food lesson stays on topic and level');
      const answer=kind==='grammar'?item.test.answers[0]:kind==='phrase-cloze'||kind==='phrase-choice'?clozeFor(item).word:kind==='vocab-meaning'||kind==='vocab-choice'||kind==='phrase-reverse'?sourceText(item):targetText(item).replace(/^(der|die|das) /,'');
      mixedArticle=targetArticle(item);mixedChoice=answer;$('#mixed-answer').value=answer;
      checkMixed();assert(mixedCorrect,'lesson question '+kind);nextLessonQuestion();
    }
    assert(lessonComplete && loadProgress().lessons.includes('4') && loadProgress().lessonHistory['4']?.completedAt,'lesson completion and history persist');
    document.getElementById('next-mixed').click();
    assert(!activeLesson && !document.getElementById('lesson-list').hidden && document.querySelector('#lessons-view.active-view'),'completion returns to lesson list');
    assert(document.querySelector('.lesson-progress-summary strong').textContent.includes('of 16 completed') && [...document.querySelectorAll('.lesson-path-details')].some(detail=>detail.textContent.includes('Grammar ·')),'lesson progression and grammar links render');
    setView('mixed');
    assert(document.querySelector('#mixed-view .mixed-layout') && !lessonComplete && document.getElementById('check-mixed').style.display!=='none','free practice restored after lesson');
    assert(JSON.parse(localStorage.getItem('wortwerk-progress'))['en-de'].learned[0]==='1','old profile retained');
    setSelectedLevels(['A1']); $('[data-global-vocab-level="A2"]').click(); assert(selectedLevels.join(',')==='A1,A2','levels can be combined');
    phraseCategory='daily'; vocabMode='choice'; phraseMode='cloze'; randomMode=false; phraseRandom=false; hideVocabularyAnswers=false; grammarGrid=true; savePreferences();
    const exported=progressExportPayload(), imported=progressFromExport(JSON.stringify(exported));
    assert(exported.format==='wortwerk-progress' && exported.profile===progressKey() && imported.lessonHistory['4']?.completedAt,'progress export round-trip');
    assert(imported.preferences.vocabLevels.join(',')==='A1,A2' && imported.preferences.phraseCategory==='daily' && imported.preferences.grammarGrid && !imported.preferences.randomMode,'progress export remembers study settings');
    setSelectedLevels(allStudyLevels); phraseCategory='greetings'; vocabMode='translate'; phraseMode='translate'; randomMode=true; phraseRandom=true; hideVocabularyAnswers=true; grammarGrid=false; savePreferences();
    let rejected=false;try{progressFromExport(JSON.stringify({...exported,profile:'other-deck'}));}catch{rejected=true;}
    assert(rejected,'different deck progress is rejected');
    localStorage.setItem('wortwerk-progress','not valid JSON');
    assert(loadProgress().learned.length===0,'corrupt progress safely resets');
    return 'PASS: views, German grammar, directions, answer retries, alternatives, lesson pools';
  })()`});
  if(result.result?.exceptionDetails) errors.push(result.result.exceptionDetails);
  if(errors.length)throw Error(JSON.stringify(errors,null,2));
  console.log(result.result.result.value);
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
    const layout=await call('Runtime.evaluate',{returnByValue:true,expression:`(() => {
      const failures=[];
      for(const view of ['dashboard','vocabulary','verbs','adjectives','phrases','grammar','mixed','lessons','issues']) {
        setView(view);
        if(document.documentElement.scrollWidth>innerWidth+1) failures.push({view,width:innerWidth,scrollWidth:document.documentElement.scrollWidth});
        for(const button of document.querySelectorAll('.active-view .practice-actions .primary-btn, .active-view .phrase-actions .primary-btn, .active-view .grammar-test > button, .active-view .lesson-start')) {
          if(button.getBoundingClientRect().width>241) failures.push({view,button:button.id,reason:'button exceeds cap'});
        }
        for(const box of document.querySelectorAll('.active-view .phrase-layout, .active-view .mixed-layout, .active-view .lesson-path, .active-view .grammar-list')) {
          if(box.getBoundingClientRect().width>881) failures.push({view,reason:'practice exceeds cap'});
        }
        if(view==='grammar') {
          const cards=[...document.querySelectorAll('.grammar-card')].filter(c=>c.offsetWidth);
          if(cards.some(c=>Math.abs(c.getBoundingClientRect().left-cards[0].getBoundingClientRect().left)>1)) failures.push({view,reason:'grammar is not single column'});
          if(innerWidth>=1920) {
            $('#grammar-layout-toggle').click();
            const gridCards=[...document.querySelectorAll('.grammar-card')].filter(c=>c.offsetWidth);
            if(!gridCards.some(c=>Math.abs(c.getBoundingClientRect().left-gridCards[0].getBoundingClientRect().left)>1)) failures.push({view,reason:'grammar grid does not use available width'});
            $('#grammar-layout-toggle').click();
          }
        }
      }
      startLesson(lessons[0]);
      if(document.documentElement.scrollWidth>innerWidth+1 || document.getElementById('check-mixed').getBoundingClientRect().width>241) failures.push({view:'lesson session',reason:'lesson practice overflow or button width'});
      setView('mixed');
      return failures;
    })()`});
    if(layout.result?.exceptionDetails)throw Error(JSON.stringify(layout.result.exceptionDetails));
    if(layout.result.result.value.length)throw Error('Layout overflow: '+JSON.stringify(layout.result.result.value));
    if(process.env.SCREENSHOT_DIR && [390,1440].includes(width)) {
      await call('Runtime.evaluate',{expression:"setView('adjectives');window.scrollTo(0,0)"});
      const capture=await call('Page.captureScreenshot',{format:'png'});
      fs.mkdirSync(process.env.SCREENSHOT_DIR,{recursive:true});
      fs.writeFileSync(path.join(process.env.SCREENSHOT_DIR,`adjectives-${width}.png`),Buffer.from(capture.result.data,'base64'));
    }
  }
  console.log('PASS: all nine views fit 320, 390, 768, 1024, 1440 and 1920px');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{
  socket?.close();
  browser.once('exit',()=>fs.rmSync(profile,{recursive:true,force:true}));
  browser.kill();
});
