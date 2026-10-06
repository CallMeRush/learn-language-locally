/* Exercise the static app in Chromium with an isolated browser profile. */
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const profile = fs.mkdtempSync(path.join(os.homedir(), "wortwerk-test-"));
const browser = spawn(process.env.CHROMIUM || "chromium", [
  "--headless",
  "--no-sandbox",
  "--disable-gpu",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  pathToFileURL(path.resolve(__dirname, "../index.html")).href,
]);
let socket;
(async () => {
  let port;
  for (let i = 0; i < 100; i++) {
    try {
      port = fs
        .readFileSync(path.join(profile, "DevToolsActivePort"), "utf8")
        .split("\n")[0];
      break;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  if (!port) throw Error("Chromium failed to start");
  const pages = await (await fetch(`http://localhost:${port}/json`)).json();
  const page = pages.find((p) => p.url.startsWith("file:"));
  if (!page) throw Error(JSON.stringify(pages));
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => socket.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map(),
    errors = [];
  socket.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.method === "Runtime.exceptionThrown")
      errors.push(m.params.exceptionDetails);
    if (m.id) {
      pending.get(m.id)?.(m);
      pending.delete(m.id);
    }
  });
  const call = (method, params = {}) =>
    new Promise((resolve) => {
      const n = ++id;
      pending.set(n, resolve);
      socket.send(JSON.stringify({ id: n, method, params }));
    });
  await call("Runtime.enable");
  await call("Page.enable");
  for (let i = 0; i < 100; i++) {
    const ready = await call("Runtime.evaluate", {
      expression: "typeof bindGrammarInteractions",
    });
    if (ready.result?.result?.value === "function") break;
    await new Promise((r) => setTimeout(r, 100));
  }
  const initial = await call("Runtime.evaluate", {
    awaitPromise: true,
    returnByValue: true,
    expression: `(() => {
    if(vocab.length !== contentManifest.vocabulary.greetings.count || phrases.length !== 0 || !activeVocabWord) throw Error('only the initial vocabulary topic loads at startup');
    return setView('dictionary').then(() => {
      if(!contentAvailable('vocabulary') || !contentAvailable('verbs')) throw Error('dictionary loads the local word collection');
      $('#dictionary-query').value='schoen'; renderDictionaryResults('schoen');
      if(!$('#dictionary-results').textContent.toLowerCase().includes('schön')) throw Error('dictionary accepts ae/oe/ue spellings');
      if(dictionaryKey('Straße')!==dictionaryKey('Strasse')) throw Error('dictionary normalizes sharp s and double s equally');
      $('#dictionary-query').value='strassenseite'; renderDictionaryResults('strassenseite');
      if(!$('#dictionary-results').textContent.toLowerCase().includes('strassenseite')) throw Error('dictionary finds double-s German entries');
      $('#dictionary-query').value='tble'; renderDictionaryResults('tble');
      if(!$('#dictionary-results').textContent.toLowerCase().includes('table')) throw Error('dictionary finds close English spellings');
      if(![...document.querySelectorAll('#dictionary-results .dictionary-result-group h2')].some(heading=>heading.textContent.includes('Close matches'))) throw Error('dictionary collects fuzzy results in a final close-match section');
      const knowMatches=dictionaryMatches('to know');
      if(!knowMatches.length || !knowMatches.every(match=>match.record.terms.some(term=>term.includes('to know')))) throw Error('dictionary keeps multi-word queries together');
      if(dictionaryPartOfSpeechOrder({pos:'noun'})>=dictionaryPartOfSpeechOrder({pos:'adjective'}) || dictionaryPartOfSpeechOrder({pos:'adjective'})>=dictionaryPartOfSpeechOrder({pos:'verb'})) throw Error('dictionary word-type order is nouns, adjectives, then verbs');
      return setView('verbs');
    }).then(() => {
      if(!contentAvailable('verbs')) throw Error('the All verbs default loads every verb family');
      return setView('phrases').then(() => {
        if(!contentAvailable('phrases')) throw Error('the All phrases default loads every phrase topic');
        const pending=Number(document.querySelector('#phrase-study-lists [data-study-status="pending"] small').textContent);
        if(pending!==phraseRecords().length || document.querySelector('#phrase-question').textContent==='Nothing here.') throw Error('phrase desk refreshes after lazy loading');
        const linkedPhrase=phrases.find(phrase=>phrase.wordIds?.some(id=>vocab.some(word=>word.id===id)));
        const linkedWord=vocab.find(word=>linkedPhrase.wordIds.includes(word.id));
        renderDictionaryResults(targetText(linkedWord));
        const linkedEntry=document.querySelector('#dictionary-results [data-dictionary-entry]');
        if(!linkedEntry || document.querySelector('#dictionary-results .dictionary-example')) throw Error('dictionary keeps linked phrases collapsed by default');
        linkedEntry.click();
        if(!document.querySelector('#dictionary-results .dictionary-example')) throw Error('dictionary reveals a linked phrase on click');
        return setView('dashboard');
      });
    });
  })()`,
  });
  if (initial.result?.exceptionDetails)
    throw Error(JSON.stringify(initial.result.exceptionDetails));
  const lazy = await call("Runtime.evaluate", {
    awaitPromise: true,
    returnByValue: true,
    expression:
      "Promise.all([ensureContent('vocabulary'), ensureContent('verbs'), ensureContent('phrases')])",
  });
  if (lazy.result?.exceptionDetails)
    throw Error(JSON.stringify(lazy.result.exceptionDetails));
  const result = await call("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
    const assert=(condition,message)=>{if(!condition)throw Error(message)};
    assert(document.querySelector('link[rel="icon"][href="assets/favicon.ico"]') && document.querySelector('link[rel="icon"][sizes="32x32"]') && document.querySelector('link[rel="apple-touch-icon"][sizes="180x180"]'),'favicon markup provides Safari and standard browser variants');
    assert(!document.querySelector('#source-language'), 'language selector removed');
    assert([...document.querySelectorAll('.sidebar .nav-item')].map(button=>button.dataset.view).join(',')==='dashboard,dictionary,vocabulary,grammar,application,phrases,mixed,lessons,issues,settings','desk navigation follows the learning flow');
    assert([...document.querySelectorAll('.topbar [data-global-vocab-level]')].map(button=>button.textContent.trim()).join(',')==='A1,A2,B1' && !document.querySelector('.topbar [data-global-vocab-level="all"]'),'the centered top bar has only A1, A2, and B1 level controls');
    assert(document.querySelector('[data-study-direction]') && !document.querySelector('.global-vocab-level').textContent.includes('✓'),'the top bar uses one direction control and uncluttered level buttons');
    assert(getComputedStyle(document.querySelector('.topbar')).position==='sticky' && getComputedStyle(document.querySelector('.topbar')).top==='0px','study controls remain in a fixed title bar while a desk scrolls');
    assert(document.querySelector('#settings-view #export-progress') && document.querySelector('#settings-view #import-progress') && document.querySelector('#settings-random-mode'),'Settings contains progress transfer and random-order controls');
    $('#reset-progress').click();
    assert(!$('#progress-modal').hidden && $('#progress-modal-content').textContent.includes('Reset this session?'),'reset uses an in-page confirmation');
    $('[data-modal-close]').click();
    $('#import-progress').click();
    assert(!$('#progress-modal').hidden && $('#import-drop-zone') && $('#browse-progress-file'),'import uses a browseable drop zone');
    $('#progress-modal-close').click();
    assert(grammarLessons.length===29 && document.querySelectorAll('.grammar-card').length===29,'German grammar rendered');
    assert(lessonUnits.length===16 && lessons.length===48 && lessonUnits.every(unit=>lessonUnitSteps(unit).length===3),'lesson units expand into concise sub-lessons');
    const oldProgress=emptyProgress();oldProgress.learned=['1'];
    localStorage.setItem('wortwerk-progress',JSON.stringify({'en-de':oldProgress}));
    assert(loadProgress().learned.length===0,'old corpus progress is not applied');
    for(const view of ['dashboard','dictionary','vocabulary','phrases','application','grammar','mixed','lessons','issues','settings']) setView(view);
    document.querySelector('#vocabulary-view [data-vocabulary-kind="adjectives"]').click();
    assert(currentWords().length>0 && currentWords().every(w=>w.pos==='adjective'),'adjective desk contains only adjectives');
    const adjectiveTotal=currentWords().length;
    assert(!document.querySelector('[data-adjective-tag]'),'adjective tones removed');
    for(const tab of [...$('#category-tabs').querySelectorAll('[data-cat]')]) {
      assert(tab.querySelector('small').textContent===String(categoryCount(tab.dataset.cat)),'every adjective tab has count');
    }
    const group=document.querySelector('#category-tabs [data-cat="adjective-appearance"]');group.click();
    assert(!currentWords().some(w=>w.adjectiveCategory==='appearance'),'category tabs can be turned off from the all-selected default');
    group.click();
    selectedCategories=['adjective-appearance'];renderVocabulary();
    assert(currentWords().every(w=>w.adjectiveCategory==='appearance'),'adjective group filter');
    selectedCategories=['adjectives'];renderVocabulary();
    for(const [mode,choice] of [['translate',false],['meaning',false],['translate',true],['meaning',true]]) {
      vocabMode=mode;vocabMultipleChoice=choice;showVocabCard();
      const word=activeVocabWord;
      $('#vocab-answer').value=mode==='translate'?targetText(word):sourceText(word);
      if(choice) [...$('#vocab-choice-options').children].find(b=>b.textContent===(mode==='translate'?targetText(word).replace(/^(der|die|das) /,''):sourceText(word))).click();
      document.querySelector('#check-vocab').click();
      assert(vocabCorrect && vocabularyProgress().learned.includes(word.id),'adjective answer '+mode+(choice?' choice':'')+' · '+targetText(word)+' / '+sourceText(word)+' · '+$('#vocab-feedback').textContent);
      document.querySelector('#check-vocab').click();
    }
    setStudyDirection('toGerman');vocabMultipleChoice=false;showVocabCard();
    document.querySelector('[data-study-direction]').click();
    assert(studyDirection==='toEnglish' && vocabMode==='meaning' && phraseDirection==='reverse' && mixedDirections.join(',')==='toEnglish' && document.querySelector('[data-study-direction]').textContent==='German → English','one top-bar direction control updates every applicable desk');
    document.querySelector('[data-vocab-choice]').click();
    assert(vocabMultipleChoice && $('#vocab-choice-options').style.display==='grid','Vocabulary multiple choice follows the selected direction');
    assert($('#practice-prompt').hidden,'Vocabulary omits the redundant translation instruction');
    document.querySelector('[data-study-direction]').click();document.querySelector('[data-vocab-choice]').click();
    setView('phrases');phraseCloze=false;phraseMultipleChoice=false;showPhrase();
    document.querySelector('[data-study-direction]').click();
    assert(phraseDirection==='reverse' && document.querySelector('[data-study-direction]').textContent==='German → English','Phrases follow the shared direction control');
    document.querySelector('[data-phrase-choice]').click();
    assert(phraseMultipleChoice && $('#phrase-choice-options').style.display==='grid','Phrase multiple choice follows the selected direction');
    assert($('#phrase-hint').hidden,'Phrases omit the redundant translation instruction');
    document.querySelector('[data-phrase-choice]').click();setStudyDirection('toGerman');
    setView('vocabulary');assert(currentWords().every(w=>!['adjective','verb'].includes(w.pos)),'ordinary vocabulary excludes adjectives and verbs');
    selectedCategories=['all'];selectedCategories=toggleDeskCategorySelection(selectedCategories,'all',['all','house'],'all');renderVocabulary();
    assert(!selectedCategories.length && !currentWords().length && !activeVocabWord && $('#practice-word').textContent==='Nothing here' && !$('#category-tabs [data-cat="all"]').classList.contains('selected'),'deselecting All words leaves an empty, clearly updated study card');
    selectedCategories=['all'];selectedCategories=toggleDeskCategorySelection(selectedCategories,'all',['all','house','food'],'house');selectedCategories=toggleDeskCategorySelection(selectedCategories,'all',['all','house','food'],'house');
    assert(selectedCategories.join(',')==='all','restoring the last excluded vocabulary category reselects All words');
    selectedCategories=['all'];renderVocabulary();
    setView('phrases');phraseCategories=['all'];phraseCategories=toggleDeskCategorySelection(phraseCategories,'all',['all','daily'],'all');renderPhrases();
    assert(!phraseCategories.length && !phraseRecords().length && !activePhrase && $('#phrase-question').textContent==='Nothing here.' && !$('#phrase-categories [data-phrase-category="all"]').classList.contains('selected'),'deselecting All phrases leaves an empty, clearly updated study card');
    phraseCategories=['all'];phraseCategories=toggleDeskCategorySelection(phraseCategories,'all',['all','daily','travel'],'daily');phraseCategories=toggleDeskCategorySelection(phraseCategories,'all',['all','daily','travel'],'daily');
    assert(phraseCategories.join(',')==='all','restoring the last excluded phrase category reselects All phrases');
    phraseCategories=['all'];renderPhrases();setView('vocabulary');
    assert(adjectiveTotal===vocab.filter(w=>w.pos==='adjective').length,'all adjectives accessible');
    randomMode=true;
    selectedCategory='all';selectedCategories=['all'];setView('vocabulary');
    assert(selectedCategory==='all','vocabulary defaults to All words');
    selectedCategory='all';selectedCategories=['all'];vocabStudyStatus='pending';renderVocabulary();
    assert($('#word-list').querySelectorAll('[data-word]').length<=120,'large lists render bounded pages');
    assert($('#word-list').classList.contains('vocabulary-study-panel'),'vocabulary uses one status panel');
    $('#word-list [data-study-status="first-shot"]').click();
    assert($('#word-list [data-study-status="first-shot"]').classList.contains('active'),'status tabs remain selectable');
    $('#word-list [data-study-status="pending"]').click();
    const moreWords=$('#word-list').querySelector('.study-more');
    const rowsBefore=$('#word-list').querySelectorAll('[data-word]').length;
    moreWords.click();
    assert($('#word-list').querySelectorAll('[data-word]').length>rowsBefore,'Show more reveals additional words');
    for(const desk of ['vocabulary','verbs','adjectives']) {
      setView(desk);
      vocabStudyStatus='pending'; renderVocabularyList();
      assert(document.querySelector('.nav-item[data-view="vocabulary"]').classList.contains('active'),'shared Vocabulary navigation');
      for(const [mode,choice] of [['translate',false],['meaning',false],['translate',true],['meaning',true]]) {
        vocabMode=mode;vocabMultipleChoice=choice;showVocabCard();
        const row=$('#word-list').querySelector('[data-word]');
        const id=row.dataset.word;
        row.click();
        assert(activeVocabWord.id===id,'list click selects exact word with random enabled');
        const selected=$('#word-list').querySelector('[data-word="'+id+'"]');
        assert(selected.classList.contains('current'),'selected row highlighted');
        assert(selected.querySelector('strong').textContent===(mode==='translate'?sourceText(activeVocabWord):targetText(activeVocabWord).replace(/^(der|die|das) /,'')),'list uses prompt language');
        assert(!selected.querySelector('small') && !document.querySelector('[data-hide-vocabulary-answer]'),'vocabulary rows only show prompts and no longer expose a hide-answer setting');
      }
      const word=activeVocabWord;
      vocabMode='translate';vocabMultipleChoice=false;showVocabCard();
      $('#vocab-answer').value='WRONG';checkVocab();
      $('#word-list [data-study-status="wrong"]').click();
      assert($('#word-list').querySelector('[data-word="'+word.id+'"] .word-check').textContent==='✕','wrong marker updates immediately');
      selectedArticle=targetArticle(word);$('#vocab-answer').value=targetText(word).replace(/^(der|die|das) /,'');checkVocab();
      $('#word-list [data-study-status="corrected"]').click();
      assert($('#word-list').querySelector('[data-word="'+word.id+'"] .word-check').textContent==='✓','correct marker updates immediately');
      assert(!state.issues.includes(word.id),'correct word clears its issue');
    }
    state=emptyProgress(); randomMode=false; selectedCategory='all'; selectedCategories=['house']; vocabMode='translate'; vocabMultipleChoice=false; setView('vocabulary');
    $('#word-list [data-study-status="wrong"]').click();
    assert($('#word-list [data-study-status="wrong"]').classList.contains('active') && !$('#word-list').querySelector('[data-word]'),'zero-count status tabs can show an empty list');
    assert($('#practice-word').textContent==='Nothing here' && $('#check-vocab').disabled,'empty vocabulary status disables the practice card');
    $('#word-list [data-study-status="pending"]').click();
    const word=activeVocabWord;
    if(targetArticle(word)) { document.querySelector('#article-choices [data-article="'+targetArticle(word)+'"]').click(); assert(selectedArticle===targetArticle(word),'article button selects vocabulary article'); }
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'4',bubbles:true})); assert($('#vocab-feedback').textContent.includes(targetArticle(word)?'Article:':'no article'),'4 opens the vocabulary article hint');
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'5',bubbles:true})); assert($('#vocab-feedback').textContent.includes('Answer:'),'5 opens the vocabulary word hint');
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'5',bubbles:true})); assert(!$('#vocab-feedback').textContent.includes('Answer:'),'repeating a vocabulary hint hides it');
    $('#vocab-answer').value='WRONG'; checkVocab();
    assert(!vocabCorrect && activeVocabWord===word,'wrong answer keeps card');
    $('#vocab-answer').value=targetText(word).replace(/^(der|die|das) /,''); checkVocab();
    assert(vocabCorrect && state.learned.includes(word.id),'retry checks displayed word');
    assert(state.mistakes.includes(word.id) && !state.articleOnlyMistakes.includes(word.id),'translation errors remain in history after a correct retry');
    document.querySelector('[data-vocab-choice]').click();
    assert(activeVocabWord===word && !vocabularyProgress().learned.includes(word.id) && document.querySelector('[data-vocab-choice]').textContent==='Use typed answer','vocabulary choice mode keeps the card but starts an independent record');
    document.querySelector('[data-vocab-choice]').click();
    const articleWord=currentWords(true).find(item=>item.id!==word.id&&targetArticle(item));
    activeVocabWord=articleWord;vocabIndex=currentWords().indexOf(articleWord);showVocabCard();
    const wrongArticle=[...document.querySelectorAll('#article-choices [data-article]')].find(button=>button.dataset.article!==targetArticle(articleWord));wrongArticle.click();
    $('#vocab-answer').value=targetText(articleWord).replace(/^(der|die|das) /,'');checkVocab();
    document.querySelector('#article-choices [data-article="'+targetArticle(articleWord)+'"]').click();checkVocab();
    assert(state.articleOnlyMistakes.includes(articleWord.id) && !state.mistakes.includes(articleWord.id),'article-only errors remain separate after a correct retry');
    $('#word-list [data-study-status="article"]').click();
    assert($('#word-list').querySelector('[data-word="'+articleWord.id+'"]'),'article-only corrections have their own study tab');
    assert(!answerIncludes('', 'table') && !answerIncludes('tab','table'),'reject empty and partial answers');
    assert(answerMatches('  tall  ','big / tall'),'slash alternatives');
    assert(answerMatches('to get','to become / to get'),'imported alternatives');
    assert(answerMatches('to become / to get','to become / to get'),'multiple-choice combined alternatives');
    assert(splitAnswerAlternatives('shirt (male/female) / blouse').length===2,'parenthetical delimiters');
    assert(answerMatches('strasse','Straße') && answerMatches('straße','Strasse'),'ß and ss are interchangeable in typed answers');
    assert(answerMatches('schoen','schön') && answerMatches('fuer','für') && answerMatches('ueber','über'),'umlauts accept their letter-e spellings in typed answers');
    assert(answerMatches('Muenchen','München',value=>normalizeAnswer(value,{caseSensitive:true})),'case-sensitive answers retain case while accepting umlaut replacements');
    setView('phrases');setStudyDirection('toGerman');setPhraseCloze(false);setPhraseMultipleChoice(false);
    const sentenceRow=document.querySelector('#phrase-study-lists [data-phrase-id]'), sentenceId=sentenceRow.dataset.phraseId;
    sentenceRow.click();
    assert(filteredPhrases()[phraseIndex].id===sentenceId,'sentence list selects exact card in random mode');
    assert(activePhrase?.id===sentenceId && $('#phrase-question').textContent===sourceText(activePhrase),'phrase card and selected list stay aligned');
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'5',bubbles:true}));
    assert($('#phrase-feedback').textContent.includes('Hint · Answer:'),'5 opens the phrase hint');
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'5',bubbles:true}));
    assert(!$('#phrase-feedback').textContent.includes('Hint · Answer:'),'repeating a phrase hint hides it');
    $('#phrase-answer').value='WRONG';checkPhrase();
    assert(!document.querySelector('#phrase-study-lists .word-row.current'),'phrase list never highlights a different phrase after an answer changes status');
    $('#phrase-study-lists [data-study-status="wrong"]').click();
    assert(document.querySelector('#phrase-study-lists [data-phrase-id="'+sentenceId+'"]'),'sentence moves into incorrect list');
    $('#phrase-answer').value=targetText(filteredPhrases()[phraseIndex]);checkPhrase();
    $('#phrase-study-lists [data-study-status="corrected"]').click();
    assert(document.querySelector('#phrase-study-lists [data-phrase-id="'+sentenceId+'"]'),'sentence moves into the corrected-after-error list');
    assert(!state.issues.includes(sentenceId),'correct sentence clears its issue');
    assert(state.phraseMistakes.includes(sentenceId),'phrase errors remain in history after a correct retry');
    const phraseBeforeChoice=activePhrase;
    document.querySelector('[data-phrase-choice]').click();
    assert(activePhrase===phraseBeforeChoice && !phraseProgress().phrases.includes(sentenceId) && document.querySelector('[data-phrase-choice]').textContent==='Use typed answer','phrase choice mode keeps the card but starts an independent record');
    document.querySelector('[data-phrase-choice]').click();
    $('#phrase-study-lists [data-study-status="wrong"]').click();
    assert($('#phrase-question').textContent==='Nothing here.' && $('#check-phrase').disabled,'empty phrase status disables the practice card');
    $('#phrase-study-lists [data-study-status="corrected"]').click();
    const sentenceCounts=[...document.querySelectorAll('#phrase-study-lists [data-study-status] small')].reduce((n,x)=>n+Number(x.textContent),0);
    assert(sentenceCounts===phraseRecords().length,'sentence counts cover all statuses');
    for(const settings of [
      {direction:'translate',cloze:false,choice:false},
      {direction:'reverse',cloze:false,choice:false},
      {direction:'translate',cloze:true,choice:false},
      {direction:'reverse',cloze:true,choice:false},
      {direction:'translate',cloze:false,choice:true},
      {direction:'reverse',cloze:true,choice:true},
    ]) {
      setStudyDirection(settings.direction==='reverse'?'toEnglish':'toGerman');setPhraseCloze(settings.cloze);setPhraseMultipleChoice(settings.choice);
      const p=activePhrase,language=settings.direction==='reverse'?'en':'de',answer=settings.cloze?clozeFor(p,language).word:translationText(p,language);
      if(settings.cloze) assert(answer===p.cloze[language],'phrase cloze uses its linked vocabulary focus');
      if(settings.choice) {assert([...document.querySelectorAll('.phrase-choice')].some(button=>button.textContent===answer),'phrase choices include the expected answer');selectedPhraseChoice=answer;}
      else $('#phrase-answer').value=answer;
      checkPhrase();assert(phraseCorrect,'phrase '+JSON.stringify(settings));
      assert($('#check-phrase').textContent.includes('Next phrase'),'phrase check becomes Next phrase after a correct answer');
    }
    setView('grammar');
    $('#grammar-layout-toggle').click();
    assert(grammarGrid && $('#grammar-list').classList.contains('grammar-grid'),'grammar can opt into a multi-tile layout');
    $('#grammar-layout-toggle').click();
    assert(!grammarGrid && !$('#grammar-list').classList.contains('grammar-grid'),'grammar defaults back to one tile');
    let card=document.querySelector('[data-grammar-card="grammar-de-1"]');
    assert(card.classList.contains('is-collapsed') && !card.querySelector('[data-grammar-examples]'),'grammar tiles start collapsed');
    card.querySelector('[data-grammar-toggle-button]').click();
    card=document.querySelector('[data-grammar-card="grammar-de-1"]');
    assert(card.classList.contains('is-open') && card.querySelector('[data-grammar-examples]'),'grammar tiles expand on request');
    document.querySelector('[data-grammar-examples="0"] [data-grammar-example="1"]').click();
    assert(document.querySelector('[data-grammar-examples="0"] .grammar-example-de').textContent===grammarLessons[0].localized.en.examples[1].de,'grammar examples can be stepped through');
    document.querySelector('[data-grammar-examples="0"] [data-grammar-example-translation]').click();
    assert(document.querySelector('[data-grammar-examples="0"] .grammar-example-translation').textContent.includes('Translation covered'),'grammar examples can cover English');
    assert(!card.querySelector('[data-grammar-check]'),'grammar checks remain hidden until requested');
    assert(card.querySelector('.grammar-card-actions [data-grammar-open]') && !card.querySelector('.grammar-practice-launch'),'grammar opens checks from a compact card-header control');
    card.querySelector('[data-grammar-open]').click();
    const practiceCard=document.querySelector('[data-grammar-card="grammar-de-1"]');
    practiceCard.querySelector('[data-grammar-hint]').click();
    assert(practiceCard.querySelector('[data-grammar-feedback]').textContent.includes('Hint · Answer:'),'grammar hint opens');
    practiceCard.querySelector('[data-grammar-hint]').click();
    assert(!practiceCard.querySelector('[data-grammar-feedback]').textContent.includes('Hint · Answer:'),'repeating a grammar hint hides it');
    practiceCard.querySelector('[data-grammar-answer]').value=grammarLessons[0].tests[0].answers[0];practiceCard.querySelector('[data-grammar-check]').click();
    assert(grammarCorrect[0] && practiceCard.querySelector('[data-grammar-feedback]').textContent.includes(grammarLessons[0].tests[0].explain),'grammar check explains its result');
    practiceCard.querySelector('[data-grammar-next]').click();assert(grammarTestState[0]===1 && grammarTestMarks[0][0]===true,'grammar next preserves check progress');
    document.querySelector('[data-grammar-card="grammar-de-3"] [data-grammar-toggle-button]').click();
    document.querySelector('[data-grammar-card="grammar-de-3"] [data-grammar-apply]').click();
    assert(document.querySelector('#application-view.active-view') && applicationGrammarId==='grammar-de-3','grammar tile opens its matching application set');
    document.querySelector('[data-application-back="grammar-de-3"]').click();
    assert(document.querySelector('#grammar-view.active-view') && document.querySelector('[data-grammar-card="grammar-de-3"] [data-grammar-check]'),'application can open its source grammar tile checks');
    setView('application');
    applicationSelectFocus('grammar-de-3');applicationQueue='all';applicationAskGender=true;applicationCurrent=grammarApplications.find(record=>record.id==='case-1');applicationStage='gender';applicationFeedback='';renderGrammarApplication();
    assert(document.querySelector('#application-content [data-application-focus="grammar-de-3"].active') && applicationCurrent.sourcePhraseId==='100151','Apply grammar renders reviewed phrase-backed case exercises');
    document.querySelector('[data-application-gender="der"]').click();
    assert(applicationStage==='answer' && document.querySelector('#application-answer'),'case practice asks gender before the article when enabled');
    $('#application-hint').click();
    assert($('#application-feedback').textContent.includes('Hint ·'),'Apply grammar hint opens');
    $('#application-hint').click();
    assert(!$('#application-feedback').textContent.includes('Hint ·'),'repeating an Apply grammar hint hides it');
    $('#application-answer').value=applicationCurrent.exercise.answer;$('#check-application').click();
    assert(applicationStage==='sentence' && $('#application-feedback').textContent.includes('Now use'),'application advances from pattern to sentence recall');
    $('#application-answer').value=applicationCurrent.translations.de.text;$('#check-application').click();
    assert(state.grammarApplied.includes('case-1') && $('#application-feedback').textContent.includes('Complete.'),'case sentence recall completes the phrase-backed exercise');
    assert($('#check-application').textContent.includes('Next exercise'),'application check becomes Next exercise after completion');
    applicationCurrent=grammarApplications.find(record=>record.id==='case-2');applicationFeedback='';renderGrammarApplication();
    $('#application-ask-gender').click();
    assert(!applicationAskGender && applicationStage==='answer' && document.querySelector('#application-answer'),'gender-first practice can be disabled for direct recall');
    applicationSelectFocus('grammar-de-5');applicationQueue='all';applicationCurrent=grammarApplications.find(record=>record.id==='modal-1');applicationStage='answer';applicationFeedback='';renderGrammarApplication();
    $('#application-answer').value=applicationCurrent.exercise.answer;$('#check-application').click();
    $('#application-answer').value=applicationCurrent.translations.de.text;$('#check-application').click();
    assert(state.grammarApplied.includes('modal-1') && $('#application-feedback').textContent.includes('Complete.'),'modal application accepts its phrase recall');
    applicationSelectFocus('grammar-de-6');applicationCurrent=grammarApplications.find(record=>record.id==='separable-1');applicationStage='answer';applicationFeedback='';renderGrammarApplication();
    $('#application-answer').value=applicationCurrent.exercise.answer;$('#check-application').click();
    $('#application-answer').value=applicationCurrent.translations.de.text;$('#check-application').click();
    assert(state.grammarApplied.includes('separable-1') && $('#application-feedback').textContent.includes('Complete.'),'separable-verb application accepts phrase recall');
    assert(mixedPool().some(q=>q.kind===(studyDirection==='toGerman'?'phrase-translate':'phrase-reverse')),'mixed starts in the selected direction');
    activeLesson=null;lessonComplete=false;
    const pool=mixedPool(),originalPool=mixedPool;
    mixedPool=()=>[pool[0]];nextMixed();showMixedHint();
    assert($('#mixed-feedback').textContent.includes('Hint ·'),'mixed practice hint opens');
    showMixedHint();assert(!$('#mixed-feedback').textContent.includes('Hint ·'),'repeating a mixed practice hint hides it');
    mixedPool=originalPool;
    for(const kind of new Set(pool.map(q=>q.kind))) {
      const q=pool.find(q=>q.kind===kind);mixedPool=()=>[q];nextMixed();
      const item=q.item;
      let answer=mixedExpectedAnswer(q);
      if(targetArticle(item)&&['vocab-translate','vocab-choice-translate'].includes(kind)){document.querySelector('#mixed-article [data-mixed-article="'+targetArticle(item)+'"]').click();assert(mixedArticle===targetArticle(item),'mixed article');}
      $('#mixed-answer').value=answer;mixedChoice=answer;checkMixed();assert(mixedCorrect,'mixed '+kind);
    }
    mixedPool=originalPool;
    for(const lesson of lessons) assert(lessonPool(lesson).length>0,'lesson pool '+lesson.id);
    setView('lessons');
    document.querySelector('[data-lesson-unit="4"] .lesson-unit-open').click();
    assert(document.querySelectorAll('.lesson-unit-card').length===lessonUnits.length && document.querySelector('[data-lesson-unit-detail="4"]') && document.querySelectorAll('[data-lesson-unit-detail="4"] [data-lesson-id]').length===3,'opening a lesson unit expands its three sub-lessons inline');
    startLesson(lessons.find(l=>l.id==='4-1'));
    assert(document.querySelector('#lessons-view.active-view .mixed-layout'),'lesson exercises stay in Lessons');
    assert(document.querySelector('.nav-item[data-view="lessons"]').classList.contains('active'),'Lessons navigation remains selected');
    assert(lessonChoiceItems('vocab',vocab).every(item=>item.category==='food' && item.level==='A1'),'lesson distractors stay on topic');
    const pausedQuestion=mixedQuestion,pausedRemaining=lessonRemaining.length;
    assert(state.lessonSession?.lessonId==='4-1','active sub-lesson is persisted');
    document.getElementById('lesson-back').click();
    document.querySelector('[data-lesson-id="4-1"] .lesson-start').click();
    assert(mixedQuestion===pausedQuestion && lessonRemaining.length===pausedRemaining,'continue lesson preserves question');
    const savedQuestion=mixedQuestion;
    activeLesson=null;mixedQuestion=null;lessonRemaining=[];lessonErrors=[];lessonReviewErrors=[];
    startLesson(lessons.find(l=>l.id==='4-1'));
    assert(mixedQuestion.kind===savedQuestion.kind && mixedQuestion.item===savedQuestion.item,'saved lesson resumes its question');
    const savedLevel=mixedLevel,savedParts=mixedParts;
    mixedLevel='A1';mixedParts={vocabulary:true,verbs:false,phrases:false,grammar:false};
    const reviewPool=lessonPool(lessons.find(l=>l.id==='12-3'));
    assert(reviewPool.length && reviewPool.every(q=>q.level==='B1') && reviewPool.some(q=>q.kind==='grammar') && reviewPool.some(q=>q.kind.startsWith('phrase')),'final review round is level-focused and independent of mixed filters');
    mixedLevel=savedLevel;mixedParts=savedParts;
    nextLessonQuestion();
    assert(lessonErrors.some(q=>q.kind===pausedQuestion.kind && q.item===pausedQuestion.item),'skipped lesson question returns for repair');
    for(let i=0;i<50&&!lessonComplete;i++) {
      const q=mixedQuestion,item=q.item,kind=q.kind;
      assert(item.category==='food' && q.level==='A1','food lesson stays on topic and level');
      const answer=mixedExpectedAnswer(q);
      mixedArticle=targetArticle(item);mixedChoice=answer;$('#mixed-answer').value=answer;
      checkMixed();assert(mixedCorrect,'lesson question '+kind);nextLessonQuestion();
    }
    assert(lessonComplete && loadProgress().lessons.includes('4-1') && loadProgress().lessonHistory['4-1']?.completedAt,'sub-lesson completion and history persist');
    document.getElementById('next-mixed').click();
    assert(!activeLesson && !document.getElementById('lesson-list').hidden && document.querySelector('#lessons-view.active-view'),'completion returns to lesson list');
    assert(document.querySelector('.lesson-progress-summary strong').textContent.includes('of 48 short rounds completed') && document.querySelector('[data-lesson-id="4-1"]').classList.contains('completed'),'sub-lesson progression renders completion ticks');
    document.querySelector('[data-lesson-unit="3"] .lesson-unit-open').click();
    assert(document.querySelector('[data-lesson-unit-detail="3"]') && [...document.querySelectorAll('[data-lesson-unit-detail="3"] .lesson-path-details')].some(detail=>detail.textContent.includes('Grammar ·')),'grammar-focused sub-lessons show their pattern focus');
    setView('mixed');
    assert(document.querySelector('#mixed-view .mixed-layout') && !lessonComplete && document.getElementById('check-mixed').style.display!=='none','free practice restored after lesson');
    const savedMixed={parts:mixedParts,directions:mixedDirections,styles:mixedStyles,vocabulary:mixedVocabularyCategories,verbs:mixedVerbCategories,adjectives:mixedAdjectiveCategories,phrases:mixedPhraseCategories,levels:[...selectedLevels]};
    mixedParts={vocabulary:true,verbs:false,adjectives:false,phrases:false,grammar:false};setStudyDirection('toGerman');mixedStyles=['write'];mixedVocabularyCategories=['food'];mixedVerbCategories=['verbs'];mixedAdjectiveCategories=['adjectives'];mixedPhraseCategories=['all'];setSelectedLevels(['A1']);renderMixedBuilder();nextMixed();
    assert(document.querySelector('#mixed-builder') && document.querySelector('[data-mixed-category="vocabulary:food"]'),'mixed session builder exposes topic controls');
    assert(mixedPool().length && mixedPool().every(q=>q.kind==='vocab-translate'&&q.item.category==='food'&&q.level==='A1'),'mixed builder filters content, direction, style, and level together');
    document.querySelector('[data-study-direction]').click();
    assert(mixedDirections.join(',')==='toEnglish' && document.querySelector('[data-study-direction]').textContent.includes('German → English'),'Mixed practice follows the shared direction control');
    document.querySelector('[data-study-direction]').click();
    mixedParts={vocabulary:false,verbs:false,adjectives:false,phrases:true,grammar:false};setStudyDirection('toEnglish');mixedStyles=['cloze'];mixedPhraseCategories=['daily'];renderMixedBuilder();nextMixed();
    assert(mixedPool().length && mixedPool().every(q=>q.kind==='phrase-cloze-reverse'),'cloze alone creates written phrase blanks in the selected direction');
    mixedParts={vocabulary:false,verbs:false,adjectives:false,phrases:false,grammar:false};renderMixedBuilder();nextMixed();
    assert(!mixedQuestion && $('#mixed-prompt').textContent==='Nothing in this session.' && $('#check-mixed').disabled,'an empty session has an explicit disabled state');
    mixedParts=savedMixed.parts;setStudyDirection(savedMixed.directions[0]);mixedStyles=savedMixed.styles;mixedVocabularyCategories=savedMixed.vocabulary;mixedVerbCategories=savedMixed.verbs;mixedAdjectiveCategories=savedMixed.adjectives;mixedPhraseCategories=savedMixed.phrases;setSelectedLevels(savedMixed.levels);renderMixedBuilder();nextMixed();
    assert(JSON.parse(localStorage.getItem('wortwerk-progress'))['en-de'].learned[0]==='1','old profile retained');
    setSelectedLevels(allStudyLevels); $('[data-global-vocab-level="A2"]').click(); assert(selectedLevels.join(',')==='A1,B1','clicking a selected level removes only that level');
    setSelectedLevels(['A1']); $('[data-global-vocab-level="A2"]').click(); assert(selectedLevels.join(',')==='A1,A2','levels can be combined');
    phraseCategory='all'; phraseCategories=['daily']; setStudyDirection('toEnglish'); vocabMultipleChoice=true; phraseCloze=true; phraseMultipleChoice=true; mixedParts={vocabulary:true,verbs:false,adjectives:false,phrases:true,grammar:false};mixedStyles=['write','cloze'];mixedVocabularyCategories=['food'];mixedVerbCategories=['verbs'];mixedAdjectiveCategories=['adjectives'];mixedPhraseCategories=['daily'];applicationGrammarId='grammar-de-6';applicationQueue='review';applicationAskGender=false;randomMode=false; grammarGrid=true; savePreferences();
    setView('settings');
    $('[data-accent-choice="blue"]').click(); $('[data-background-choice="dark"]').click();
    assert(document.documentElement.dataset.accent==='blue' && document.documentElement.dataset.background==='dark','settings apply accent and dark background');
    assert(getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()==='#181a1e' && getComputedStyle(document.querySelector('.sidebar')).backgroundColor==='rgb(32, 35, 41)','dark mode uses neutral charcoal surfaces');
    $('[data-background-choice="light"]').click(); $('[data-accent-choice="terracotta"]').click();
    assert(getComputedStyle(document.documentElement).getPropertyValue('--green').trim()==='#c66a2e' && getComputedStyle(document.querySelector('.primary-btn')).backgroundColor==='rgb(198, 106, 46)','orange accent recolors primary controls');
    for(const [accent,colour] of Object.entries({green:'#315f4b',blue:'#315f7d',teal:'#16766f',indigo:'#4e61aa',plum:'#684e7e',rose:'#b65370',terracotta:'#c66a2e',gold:'#9a6a13'})) {
      $('[data-accent-choice="'+accent+'"]').click();
      assert(getComputedStyle(document.documentElement).getPropertyValue('--green').trim()===colour,'accent palette applies '+accent);
    }
    $('[data-accent-choice="blue"]').click(); $('[data-background-choice="dark"]').click();
    const exported=progressExportPayload(), imported=progressFromExport(JSON.stringify(exported));
    assert(exported.format==='wortwerk-progress' && exported.profile===progressKey() && imported.lessonHistory['4-1']?.completedAt,'progress export round-trip');
    assert(imported.preferences.vocabLevels.join(',')==='A1,A2' && imported.preferences.studyDirection==='toEnglish' && imported.preferences.vocabMultipleChoice && imported.preferences.phraseCategories[0]==='daily' && imported.preferences.phraseCloze && imported.preferences.phraseMultipleChoice && imported.preferences.mixedVocabularyCategories[0]==='food' && imported.preferences.applicationGrammarId==='grammar-de-6' && imported.preferences.applicationQueue==='review' && !imported.preferences.applicationAskGender && imported.preferences.grammarGrid && !imported.preferences.randomMode && imported.preferences.colorAccent==='blue' && imported.preferences.colorBackground==='dark','progress export remembers study settings');
    setSelectedLevels(allStudyLevels); phraseCategory='all'; phraseCategories=['all']; setStudyDirection('toGerman'); vocabMultipleChoice=false; phraseCloze=false; phraseMultipleChoice=false; mixedParts={vocabulary:true,verbs:true,adjectives:true,phrases:true,grammar:true};mixedStyles=['write','choice','cloze'];mixedVocabularyCategories=['all'];mixedVerbCategories=['verbs'];mixedAdjectiveCategories=['adjectives'];mixedPhraseCategories=['all'];applicationGrammarId='grammar-de-3';applicationQueue='new';applicationAskGender=true;randomMode=true; grammarGrid=false;colorAccent='green';colorBackground='light';applyAppearance();savePreferences();
    let rejected=false;try{progressFromExport(JSON.stringify({...exported,profile:'other-deck'}));}catch{rejected=true;}
    assert(rejected,'different deck progress is rejected');
    localStorage.setItem('wortwerk-progress','not valid JSON');
    assert(loadProgress().learned.length===0,'corrupt progress safely resets');
    return 'PASS: views, German grammar, directions, answer retries, alternatives, lesson pools';
  })()`,
  });
  if (result.result?.exceptionDetails)
    errors.push(result.result.exceptionDetails);
  if (errors.length) throw Error(JSON.stringify(errors, null, 2));
  console.log(result.result.result.value);
  const darkAudit = await call("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      document.documentElement.dataset.background='dark';
      setSelectedLevels(['A1']);renderVocabularyLevels();
      const levelBackground=getComputedStyle(document.querySelector('[data-global-vocab-level="A2"]')).backgroundColor;
      const rgb=value => value.slice(value.indexOf('(')+1,value.indexOf(')')).split(',').slice(0,3).map(Number);
      const luminance=([red,green,blue]) => [red,green,blue].map(channel => { const value=channel/255; return value<=.03928?value/12.92:((value+.055)/1.055)**2.4; }).reduce((total,value,index) => total + value*[.2126,.7152,.0722][index],0);
      const leaks=[],lowContrast=[];
      for(const accent of ['green','blue','teal','indigo','plum','rose','terracotta','gold']) {
        document.documentElement.dataset.accent=accent;
        for(const view of ['dashboard','dictionary','vocabulary','phrases','application','grammar','mixed','lessons','issues','settings']) {
          setView(view);
          for(const element of document.querySelectorAll('button, input, .active-view [class*="card"], .active-view [class*="panel"], .active-view [class*="builder"], .active-view [class*="example"], .active-view [class*="note"], .active-view [class*="empty"], .active-view [class*="row"], .active-view [class*="prompt"], .active-view .hero-art *')) {
            const style=getComputedStyle(element),background=rgb(style.backgroundColor),box=element.getBoundingClientRect();
            if(box.width<2||box.height<2||style.display==='none'||style.visibility==='hidden'||background.length<3) continue;
            if(background.every(channel=>channel>230)) leaks.push({accent,view,tag:element.tagName,className:element.className,background:style.backgroundColor});
            if(element.tagName==='BUTTON' && !element.disabled && style.backgroundColor!=='rgba(0, 0, 0, 0)') {
              const foreground=rgb(style.color),ratio=(Math.max(luminance(background),luminance(foreground))+.05)/(Math.min(luminance(background),luminance(foreground))+.05);
              if(ratio<3) lowContrast.push({accent,view,className:element.className,background:style.backgroundColor,color:style.color,ratio:Number(ratio.toFixed(2))});
            }
          }
        }
        setView('vocabulary');
        for(const element of document.querySelectorAll('#vocabulary-view .vocab-mode, #vocabulary-view .vocabulary-kinds, #vocabulary-view .vocabulary-kinds button')) {
          const style=getComputedStyle(element),background=rgb(style.backgroundColor);
          if(background.length===3 && background.every(channel=>channel>230)) leaks.push({accent,view:'vocabulary controls',tag:element.tagName,className:element.className,background:style.backgroundColor});
        }
        showResetProgressModal();
        for(const element of document.querySelectorAll('.progress-modal-card, .progress-modal-card button')) {
          const style=getComputedStyle(element),background=rgb(style.backgroundColor),foreground=rgb(style.color);
          if(background.length===3 && background.every(channel=>channel>230)) leaks.push({accent,view:'progress modal',tag:element.tagName,className:element.className,background:style.backgroundColor});
          if(element.tagName==='BUTTON' && !element.disabled && style.backgroundColor!=='rgba(0, 0, 0, 0)') {
            const ratio=(Math.max(luminance(background),luminance(foreground))+.05)/(Math.min(luminance(background),luminance(foreground))+.05);
            if(ratio<3) lowContrast.push({accent,view:'progress modal',className:element.className,background:style.backgroundColor,color:style.color,ratio:Number(ratio.toFixed(2))});
          }
        }
        closeProgressModal();
      }
      setView('grammar');
      let grammarCard=document.querySelector('[data-grammar-card="grammar-de-1"]');
      if(grammarCard.classList.contains('is-collapsed')) grammarCard.querySelector('[data-grammar-toggle-button]').click();
      grammarCard=document.querySelector('[data-grammar-card="grammar-de-1"]');
      const rule=getComputedStyle(grammarCard.querySelector('.grammar-rules li'));
      const cardStyle=getComputedStyle(grammarCard);
      const ruleContrast=(Math.max(luminance(rgb(rule.color)),luminance(rgb(cardStyle.backgroundColor)))+.05)/(Math.min(luminance(rgb(rule.color)),luminance(rgb(cardStyle.backgroundColor)))+.05);
      const tableLesson=grammarLessons.find(lesson=>lesson.localized.en.tables?.length);
      let tableCard=document.querySelector('[data-grammar-card="'+tableLesson.id+'"]');
      if(tableCard.classList.contains('is-collapsed')) tableCard.querySelector('[data-grammar-toggle-button]').click();
      tableCard=document.querySelector('[data-grammar-card="'+tableLesson.id+'"]');
      const tableHeader=getComputedStyle(tableCard.querySelector('.grammar-table-wrap th'));
      const tableHeaderBackground=tableHeader.backgroundColor;
      const tableHeaderBackgroundRgb=rgb(tableHeaderBackground);
      const tableHeaderContrast=tableHeaderBackgroundRgb.length===3?(Math.max(luminance(rgb(tableHeader.color)),luminance(tableHeaderBackgroundRgb))+.05)/(Math.min(luminance(rgb(tableHeader.color)),luminance(tableHeaderBackgroundRgb))+.05):null;
      return {levelBackground,leaks,lowContrast,ruleContrast,tableHeaderBackground,tableHeaderContrast};
    })()`,
  });
  const darkReport = darkAudit.result?.result?.value || { leaks: [] };
  if (darkReport.levelBackground === "rgb(255, 255, 255)")
    throw Error("Top level controls stay white in dark mode");
  if (darkReport.leaks.length)
    throw Error("Light surfaces in dark mode: " + JSON.stringify(darkReport));
  if (darkReport.lowContrast.length)
    throw Error(
      "Low-contrast dark-mode controls: " + JSON.stringify(darkReport),
    );
  if (darkReport.ruleContrast < 4.5)
    throw Error("Dark-mode grammar rules have insufficient contrast");
  if (
    (darkReport.tableHeaderBackground.startsWith("rgb") &&
      darkReport.tableHeaderBackground
        .match(/\d+/g)
        .slice(0, 3)
        .every((channel) => Number(channel) > 120)) ||
    (darkReport.tableHeaderContrast !== null &&
      darkReport.tableHeaderContrast < 4.5)
  )
    throw Error("Dark-mode grammar tables have an unsuitable header surface");
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const layout = await call("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
      const failures=[];
      const topbar=document.querySelector('.topbar').getBoundingClientRect(), controls=document.querySelector('.study-controls').getBoundingClientRect();
      if(Math.abs((topbar.left+topbar.width/2)-(controls.left+controls.width/2))>1) failures.push({view:'top bar',width:innerWidth,reason:'study controls are not centered'});
      for(const view of ['dashboard','dictionary','vocabulary','phrases','application','grammar','mixed','lessons','issues','settings']) {
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
    })()`,
    });
    if (layout.result?.exceptionDetails)
      throw Error(JSON.stringify(layout.result.exceptionDetails));
    if (layout.result.result.value.length)
      throw Error(
        "Layout overflow: " + JSON.stringify(layout.result.result.value),
      );
    if (process.env.SCREENSHOT_DIR && [390, 1440].includes(width)) {
      await call("Runtime.evaluate", {
        expression: "setView('adjectives');window.scrollTo(0,0)",
      });
      const capture = await call("Page.captureScreenshot", { format: "png" });
      fs.mkdirSync(process.env.SCREENSHOT_DIR, { recursive: true });
      fs.writeFileSync(
        path.join(process.env.SCREENSHOT_DIR, `adjectives-${width}.png`),
        Buffer.from(capture.result.data, "base64"),
      );
    }
  }
  console.log("PASS: all ten desks fit 320, 390, 768, 1024, 1440 and 1920px");
})()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => {
    socket?.close();
    browser.once("exit", () =>
      fs.rmSync(profile, { recursive: true, force: true }),
    );
    browser.kill();
  });
