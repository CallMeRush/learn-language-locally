var phraseStudyStatus = "pending";
var phraseStudyStatusLabels = {
  pending: "pending",
  correct: "correct",
  wrong: "incorrect",
};
function phraseRecords() {
  return phrases.filter(
    (p) =>
      levelSelected({ easy: "A1", medium: "A2", hard: "B1" }[p.level]) &&
      (phraseCategories.includes("all") || phraseCategories.includes(p.category)),
  );
}
function phraseStudyGroups(records) {
  var correct = new Set(state.phrases),
    wrong = new Set(state.issues),
    groups = { pending: [], correct: [], wrong: [] };
  records.forEach((record) =>
    groups[correct.has(record.id) ? "correct" : wrong.has(record.id) ? "wrong" : "pending"].push(record),
  );
  return groups;
}
function filteredPhrases() {
  return phraseStudyGroups(phraseRecords())[phraseStudyStatus];
}
function clozeFor(p, language = "de") {
  p._activeCloze ||= {};
  if (p._activeCloze[language]) return p._activeCloze[language];
  var tokens = translationText(p, language).split(" "),
    clean = (s) => s.toLowerCase().replace(/[.,!?;:]/g, ""),
    focus = p.cloze?.[language] || p.blank,
    specified = focus
      ? tokens.findIndex((token) => clean(token) === clean(focus))
      : -1,
    usable = tokens
      .map((token, index) => ({ token, index, word: clean(token) }))
      .filter(
        (item) =>
          (item.word && !genericClozeStopwords.has(item.word)) ||
          item.index === specified,
      ),
    indexes = [
      ...new Set(
        [specified, ...usable.map((item) => item.index)].filter(
          (index) => index >= 0 && index < tokens.length,
        ),
      ),
    ],
    index =
      specified >= 0
        ? specified
        : indexes[Math.floor(Math.random() * indexes.length)] ??
          Math.min(tokens.length - 1, Math.max(1, Math.floor(tokens.length / 2))),
    word = tokens[index].replace(/[.,!?;:]/g, "");
  p._activeCloze[language] = {
    word,
    sentence: tokens
      .map((token, i) =>
        i === index ? '<span class="blank">_____</span>' : token,
      )
      .join(" "),
    index,
  };
  return p._activeCloze[language];
}
function phraseChoiceOptions(p, cloze, candidates = phrases, language = "de") {
  var clean = (s) =>
      normalizeAnswer(s)
        .replace(/[.,!?;:]/g, "")
        .trim(),
    target = clean(cloze.word),
    targetPool = candidates
      .flatMap((phrase) =>
        phrase.translations?.[language]?.text?.split(" ")[
          cloze.index
        ]
          ? [
              phrase.translations[language].text.split(" ")[
                cloze.index
              ],
            ]
          : [],
      )
      .concat(translationText(p, language).split(" "));
  var options = [
    cloze.word,
    ...targetPool
      .filter((word) => clean(word) !== target && clean(word).length > 0)
      .sort(() => Math.random() - 0.5),
  ];
  if (options.length < 4)
    options = options.concat(
      translationText(p, language)
        .split(" ")
        .filter((word) => clean(word) !== target),
    );
  return [...new Set(options.map((word) => word.replace(/[.,!?;:]/g, "")))]
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);
}
function phraseTranslationChoiceOptions(p, candidates, language) {
  var expected = translationText(p, language),
    clean = (text) => normalizeAnswer(text).trim(),
    options = [expected, ...candidates
      .map((phrase) => translationText(phrase, language))
      .filter((text) => text && clean(text) !== clean(expected))
      .sort(() => Math.random() - 0.5)];
  return [...new Map(options.map((text) => [clean(text), text])).values()]
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);
}
function renderPhraseCategories() {
  var el = $("#phrase-categories");
  if (!el) return;
  var categories = ["all", ...Object.keys(contentManifest.phrases)
    .sort((a, b) => (categoryRecords.find(record => record.id === a)?.studyOrder ?? 999) - (categoryRecords.find(record => record.id === b)?.studyOrder ?? 999))];
  el.innerHTML = categories
    .map((category) => {
      var label =
        category === "all" ? "All phrases" : categoryLabel(category);
      var entries = category === "all" ? Object.values(contentManifest.phrases) : [contentManifest.phrases[category]],
        loaded = category === "all" ? contentAvailable("phrases") : contentLoaded("phrases", category),
        count = loaded
          ? phrases.filter(p => levelSelected({ easy: "A1", medium: "A2", hard: "B1" }[p.level]) && (category === "all" || p.category === category)).length
          : entries.reduce((total, entry) => total + selectedLevels.reduce((sum, level) => sum + entry.levels[level], 0), 0);
      var selected = phraseCategories.includes("all") || phraseCategories.includes(category);
      return `<button class="${selected ? "selected" : ""}" data-phrase-category="${category}" aria-pressed="${selected}"><i>✓</i>${label} <small>${count}</small></button>`;
    })
    .join("");
  $$("[data-phrase-category]").forEach(
    (button) =>
      (button.onclick = async () => {
        var category = button.dataset.phraseCategory;
        phraseCategories = toggleCategorySelection(
          phraseCategories,
          "all",
          categories,
          category,
        );
        phraseCategory = "all";
        phraseIndex = 0;
        await ensureContent("phrases");
        renderPhraseCategories();
        showPhrase();
        savePreferences();
      }),
  );
}
function updatePhraseControls() {
  $$('[data-phrase-direction]').forEach((button) => {
    var active = button.dataset.phraseDirection === phraseDirection;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  [["phraseCloze", phraseCloze], ["phraseChoice", phraseMultipleChoice]].forEach(([name, active]) => {
    var button = document.querySelector(`[data-${name.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())}]`);
    if (!button) return;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
function setPhraseDirection(direction) {
  phraseDirection = direction === "reverse" ? "reverse" : "translate";
  updatePhraseControls();
  showPhrase();
  savePreferences();
}
function setPhraseCloze(enabled = !phraseCloze) {
  phraseCloze = Boolean(enabled);
  updatePhraseControls();
  showPhrase();
  savePreferences();
}
function setPhraseMultipleChoice(enabled = !phraseMultipleChoice) {
  phraseMultipleChoice = Boolean(enabled);
  updatePhraseControls();
  showPhrase();
  savePreferences();
}
function phraseAnswerLanguage() {
  return phraseDirection === "reverse" ? "en" : "de";
}
function phraseExpectedAnswer(p) {
  return translationText(p, phraseAnswerLanguage());
}
function showPhrase() {
  updatePhraseControls();
  var list = filteredPhrases();
  phraseAnswered = false;
  phraseCorrect = false;
  if (!list.length) {
    renderPhraseLists();
    $("#phrase-level").textContent = "NO MATCHING PHRASES";
    $("#phrase-number").textContent = "—";
    $("#phrase-question").textContent = "Nothing here.";
    $("#phrase-hint").textContent = `No ${phraseStudyStatusLabels[phraseStudyStatus]} phrases match these levels and categories.`;
    $("#cloze-sentence").innerHTML = "";
    $(".phrase-card").classList.toggle("cloze-active", phraseCloze);
    $("#phrase-answer").value = "";
    $("#phrase-answer").disabled = true;
    $("#check-phrase").disabled = true;
    $("#show-answer").disabled = true;
    $("#phrase-feedback").textContent = "";
    return;
  }
  $("#phrase-answer").disabled = false;
  $("#check-phrase").disabled = false;
  $("#show-answer").disabled = false;
  if (phraseRandom) phraseIndex = Math.floor(Math.random() * list.length);
  var p = list[phraseIndex % list.length],
    answerLanguage = phraseAnswerLanguage(),
    cloze = phraseCloze ? clozeFor(p, answerLanguage) : null;
  $("#phrase-level").textContent =
    { easy: "A1", medium: "A2", hard: "B1" }[p.level] +
    " · " +
    categoryLabel(p.category);
  $("#phrase-number").textContent =
    String((phraseIndex % list.length) + 1).padStart(2, "0") +
    " / " +
    list.length;
  $("#phrase-question").textContent = phraseDirection === "reverse" ? targetText(p) : sourceText(p);
  $("#phrase-hint").textContent = phraseCloze
    ? `Complete the missing ${answerLanguage === "de" ? "German" : "English"} word.`
    : phraseDirection === "reverse" ? "Translate this into English." : translatePrompt();
  $("#cloze-sentence").innerHTML = cloze?.sentence || "";
  $(".phrase-card").classList.toggle("cloze-active", phraseCloze);
  $("#phrase-answer").placeholder =
    phraseCloze
      ? "Type the missing word…"
      : phraseDirection === "reverse" ? "Type the English translation…" : translatePrompt();
  $("#phrase-answer").value = "";
  $("#phrase-answer").style.display = phraseMultipleChoice ? "none" : "";
  var options = $("#phrase-choice-options");
  options.innerHTML = "";
  options.style.display = phraseMultipleChoice ? "grid" : "none";
  if (phraseMultipleChoice) {
    selectedPhraseChoice = "";
    $("#cloze-sentence").style.display = phraseCloze ? "block" : "none";
    var phraseOptions = phraseCloze
      ? phraseChoiceOptions(p, cloze, filteredPhrases(), answerLanguage)
      : phraseTranslationChoiceOptions(p, filteredPhrases(), answerLanguage);
    phraseOptions.forEach((option) => {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "choice-option phrase-choice";
      button.textContent = option;
      button.onclick = () => {
        $$(".phrase-choice").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        selectedPhraseChoice = option;
      };
      options.append(button);
    });
  } else {
    $("#cloze-sentence").style.display = phraseCloze ? "block" : "none";
  }
  $("#phrase-feedback").textContent = "";
  $("#phrase-feedback").className = "feedback";
  renderPhraseLists();
}
function renderPhraseLists() {
  var container = document.getElementById("phrase-study-lists");
  if (!container) {
    container = document.createElement("div");
    container.id = "phrase-study-lists";
    document.querySelector("#phrases-view .phrase-layout").append(container);
  }
  var records = phraseRecords(), active = filteredPhrases()[phraseIndex % filteredPhrases().length];
  renderPhraseStudyPanel(container, records, state.phrases, active, p => {
    var text = phraseDirection === "reverse" ? targetText(p) : sourceText(p);
    var mark = state.phrases.includes(p.id) ? "✓" : state.issues.includes(p.id) ? "✕" : "○";
    return `<button type="button" class="word-row ${p === active ? "current" : ""}" data-phrase-id="${p.id}"><span>${text}</span><span class="word-check ${mark === "✓" ? "correct" : mark === "✕" ? "wrong" : ""}">${mark}</span></button>`;
  }, p => {
    phraseIndex = filteredPhrases().indexOf(p);
    var random = phraseRandom;
    phraseRandom = false;
    showPhrase();
    phraseRandom = random;
  });
  renderPhraseCategories();
}
function renderPhraseStudyPanel(container, records, correctIds, active, rowHTML, select) {
  var groups = phraseStudyGroups(records);
  var labels = { pending: "Pending", correct: "Correct", wrong: "Incorrect" },
    items = groups[phraseStudyStatus],
    activeItems = items.includes(active) ? [active, ...items.filter(item => item !== active)] : items;
  container.className = "word-list vocabulary-study-panel phrase-study-panel";
  container.innerHTML = `<div class="study-switch" role="tablist">${Object.keys(groups).map(status => `<button class="${status === phraseStudyStatus ? "active" : ""}" data-phrase-study-status="${status}" role="tab" aria-selected="${status === phraseStudyStatus}">${labels[status]} <small>${groups[status].length}</small></button>`).join("")}</div><div class="study-list-rows"></div><button class="secondary-btn study-more">Show more</button>`;
  container.querySelectorAll("[data-phrase-study-status]").forEach(button => button.onclick = () => {
    phraseStudyStatus = button.dataset.phraseStudyStatus;
    phraseIndex = 0;
    showPhrase();
  });
  var rows = container.querySelector(".study-list-rows"), shown = 0, more = container.querySelector(".study-more");
  function appendPage() {
    activeItems.slice(shown, shown + 40).forEach(item => {
      rows.insertAdjacentHTML("beforeend", rowHTML(item));
      rows.lastElementChild.onclick = () => select(item);
    });
    shown += 40;
    more.hidden = shown >= activeItems.length;
  }
  more.onclick = appendPage;
  appendPage();
}
function nextPhrase() {
  var list = filteredPhrases();
  if (!list.length) {
    phraseIndex = 0;
    showPhrase();
    return;
  }
  phraseIndex = phraseRandom
    ? Math.floor(Math.random() * list.length)
    : (phraseIndex + 1) % list.length;
  var next = list[phraseIndex % list.length];
  if (next) next._activeCloze = null;
  showPhrase();
}
function checkPhrase(reveal = false) {
  var list = filteredPhrases();
  if (!list.length) return;
  var p = list[phraseIndex % list.length],
    ans = normalizeAnswer((phraseMultipleChoice ? selectedPhraseChoice : $("#phrase-answer").value).trim()),
    cloze = phraseCloze ? clozeFor(p, phraseAnswerLanguage()) : null,
    expected = phraseCloze ? cloze.word : phraseExpectedAnswer(p);
  if (reveal) {
    phraseAnswered = true;
    phraseCorrect = false;
    $("#phrase-feedback").textContent =
      phraseCloze
        ? "Hint · Missing word: " + cloze.word
        : "Hint · Answer: " + expected;
    $("#phrase-feedback").className = "feedback hint";
    return;
  }
  var clean = (s) => normalizeAnswer(s).replace(/[.,!?;:]/g, ""),
    ok =
      answerMatches(ans, expected, clean);
  phraseAnswered = true;
  phraseCorrect = !!ok;
  state.attempts++;
  if (ok) {
    state.correct++;
    if (!state.phrases.includes(p.id)) state.phrases.push(p.id);
    resolveIssue(p.id);
    $("#phrase-feedback").textContent =
      "Very good! Press Enter again for the next phrase.";
    $("#phrase-feedback").className = "feedback good";
  } else {
    state.phrases = state.phrases.filter((id) => id !== p.id);
    if (!state.issues.includes(p.id)) state.issues.push(p.id);
    $("#phrase-feedback").textContent =
      phraseCloze
        ? "The missing word is wrong. Use Hint if needed."
        : "The translation is wrong. Use Hint if needed.";
    $("#phrase-feedback").className = "feedback bad";
  }
  save();
  renderPhraseLists();
}
function renderIssues() {
  var el = $("#issues-list");
  if (!state.issues.length) {
    el.innerHTML =
      '<div class="empty-state">No issues yet. That is a good sign — go practice a few words or phrases.</div>';
    return;
  }
  el.innerHTML = state.issues
    .map((id) => {
      var item =
        vocab.find((x) => x.id === id) || phrases.find((x) => x.id === id);
      var isV = !!vocab.find((x) => x.id === id);
      return `<div class="issue-item"><div><strong>${isV ? targetText(item) : sourceText(item)}</strong><small>${isV ? sourceText(item) : "→ " + targetText(item)}</small></div><button data-clear="${id}">Mark known ✓</button></div>`;
    })
    .join("");
  $$("[data-clear]").forEach(
    (b) =>
      (b.onclick = () => {
        state.issues = state.issues.filter((x) => x !== b.dataset.clear);
        save();
        renderIssues();
      }),
  );
}
$$(".nav-item").forEach((b) => (b.onclick = () => setView(b.dataset.view)));
$$('[data-action="start-session"]').forEach(
  (b) =>
    (b.onclick = () => {
      setView("vocabulary");
      toast("Let’s warm up with some words.");
    }),
);
$$('[data-action="start-vocab"]').forEach(
  (b) =>
    (b.onclick = () => {
      setView("vocabulary");
      showVocabCard();
    }),
);
$$('[data-action="open-vocab"]').forEach(
  (b) =>
    (b.onclick = () => {
      selectedCategory = b.dataset.category;
      setView("vocabulary");
    }),
);
$("#check-vocab").onclick = checkVocab;
$("#check-phrase").onclick = () => checkPhrase();
$("#show-answer").onclick = () => checkPhrase(true);
$("#next-phrase").onclick = nextPhrase;
var phraseControls = $(".phrase-controls");
phraseControls.innerHTML = `
  <div class="mode-switch phrase-directions" role="group" aria-label="Translation direction">
    <button class="practice-mode" type="button" data-phrase-direction="translate">English → German</button>
    <button class="practice-mode" type="button" data-phrase-direction="reverse">German → English</button>
  </div>
  <div class="mode-switch phrase-options" role="group" aria-label="Phrase practice options">
    <button class="practice-mode" type="button" data-phrase-cloze aria-pressed="false">Fill the blank</button>
    <button class="practice-mode" type="button" data-phrase-choice aria-pressed="false">Multiple choice</button>
  </div>`;
$$('[data-phrase-direction]').forEach((button) =>
  (button.onclick = () => setPhraseDirection(button.dataset.phraseDirection)),
);
document.querySelector('[data-phrase-cloze]').onclick = () => setPhraseCloze();
document.querySelector('[data-phrase-choice]').onclick = () => setPhraseMultipleChoice();
$$(".mode").forEach(
  (b) =>
    (b.onclick = () => {
      $$(".mode").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      var level = { all: [...allStudyLevels], easy: ["A1"], medium: ["A2"], hard: ["B1"] }[b.dataset.level];
      setSelectedLevels(level);
      phraseIndex = 0;
      renderVocabularyLevels();
      $$("[data-mixed-level]").forEach((x) =>
        x.classList.toggle("active", x.dataset.mixedLevel === "all" ? selectedLevels.length === allStudyLevels.length : levelSelected(x.dataset.mixedLevel)),
      );
      renderPhraseCategories();
      showPhrase();
      savePreferences();
    }),
);
$("#phrase-answer").onkeydown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (phraseAnswered && phraseCorrect) nextPhrase();
    else checkPhrase();
  }
};
updateStats();
renderCategories();
renderVocabulary();
showPhrase();
$$("[data-article]").forEach(
  (b) =>
    (b.onclick = () => {
      $$("[data-article]").forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selectedArticle = b.dataset.article;
    }),
);
document.addEventListener("keydown", (e) => {
  var keyArticles = { 1: "der", 2: "die", 3: "das" };
  var viewRoot = isVerbView() ? "#verbs-view" : "#vocabulary-view";
  if (
    !document.querySelector(viewRoot + ".active-view") ||
    !keyArticles[e.key] ||
    $("#article-choices").style.display === "none"
  )
    return;
  e.preventDefault();
  var button = document.querySelector(
    viewRoot + ` [data-article="${keyArticles[e.key]}"]`,
  );
  if (button) button.click();
});
document.addEventListener("keydown", (e) => {
  var keyArticles = { 1: "der", 2: "die", 3: "das" };
  if (
    !document.querySelector(".active-view .mixed-layout") ||
    document.getElementById("mixed-article").offsetParent === null ||
    !keyArticles[e.key] ||
    document.querySelector("#mixed-article").style.display === "none"
  )
    return;
  e.preventDefault();
  var button = document.querySelector(
    `#mixed-article [data-mixed-article="${keyArticles[e.key]}"]`,
  );
  if (button) button.click();
});
$$(".heading-actions").forEach((el) =>
  el.insertAdjacentHTML(
    "afterbegin",
    '<div class="mode-switch vocab-direction"><button class="vocab-mode" data-vocab-mode="meaning"></button><button class="vocab-mode active" data-vocab-mode="translate"></button></div>',
  ),
);
$$('[data-practice="translate"]').forEach(
  (el) => (el.textContent = translatePrompt()),
);
$$(".vocab-mode").forEach(
  (b) =>
    (b.onclick = () => {
      $$(".vocab-mode").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      vocabMode = b.dataset.vocabMode;
      showVocabCard();
      savePreferences();
    }),
);
$(".phrase-controls").insertAdjacentHTML(
  "beforeend",
  '<label class="toggle-label phrase-random-toggle"><input type="checkbox" id="phrase-random-mode" checked /><span class="toggle-switch"></span> Random order</label>',
);
$("#phrase-random-mode").onchange = (e) => {
  phraseRandom = e.target.checked;
  phraseIndex = 0;
  toast(
    phraseRandom
      ? "Random sentence order on."
      : "Sequential sentence order on.",
  );
  showPhrase();
  savePreferences();
};
$("#phrase-random-mode").checked = phraseRandom;
$(".phrase-layout").insertAdjacentHTML(
  "beforebegin",
  '<div id="phrase-categories" class="phrase-category-tabs"></div>',
);
renderPhraseCategories();
$$(".nav-item[data-category]").forEach(
  (button) =>
    (button.onclick = () => {
      selectedCategory = button.dataset.category;
      setView(button.dataset.view);
      renderVocabulary();
    }),
);
document.querySelector(
  '.nav-item[data-view="vocabulary"]:not([data-category])',
).onclick = () => {
  selectedCategory = "all";
  setView("vocabulary");
};
$$('[data-action="start-session"]').forEach(
  (button) =>
    (button.onclick = () => {
      selectedCategory = "all";
      setView("vocabulary");
      toast("Let’s warm up with some words.");
    }),
);
$$('[data-action="start-vocab"]').forEach(
  (button) =>
    (button.onclick = () => {
      var verbDesk = !!button.closest("#verbs-view");
      selectedCategory = verbDesk ? "verbs" : "all";
      setView(verbDesk ? "verbs" : "vocabulary");
      showVocabCard();
    }),
);
$$('[data-action="open-vocab"]').forEach(
  (button) =>
    (button.onclick = () => {
      selectedCategory = button.dataset.category;
      setView(button.dataset.category === "verbs" ? "verbs" : "vocabulary");
    }),
);
var verbAnswer = document.querySelector("#verbs-vocab-answer");
document.querySelector("#verbs-check-vocab").onclick = checkVocab;
verbAnswer.onkeydown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (vocabAnswered && vocabCorrect) nextVocab();
    else checkVocab();
  }
};
function grammarNormalize(value) {
  return normalizeAnswer(value)
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ");
}
var bindGrammarQuestionList = () => {
  $$("[data-grammar-question]").forEach(
    (button) =>
      (button.onclick = () => {
        var card = button.closest("[data-grammar-index]"),
          index = Number(card.dataset.grammarIndex),
          questionIndex = Number(button.dataset.grammarQuestion);
        grammarTestState[index] = questionIndex;
        renderGrammarTest(index);
        card
          .querySelectorAll("[data-grammar-question]")
          .forEach((link) => link.classList.toggle("active", link === button));
      }),
  );
  $$("[data-grammar-check]").forEach((button) =>
    button.addEventListener("click", () => {
      var card = button.closest("[data-grammar-index]"),
        index = Number(card.dataset.grammarIndex),
        mark = card.querySelector(
          `[data-grammar-mark="${grammarTestState[index]}"]`,
        );
      if (mark) {
        mark.textContent = grammarCorrect[index] ? "✓" : "✕";
        mark.className = grammarCorrect[index] ? "correct" : "wrong";
      }
    }),
  );
};
bindGrammarQuestionList();
