function save() {
  var all = progressStore();
  all[progressKey()] = state;
  localStorage.setItem("wortwerk-progress", JSON.stringify(all));
  updateStats();
}
function updateStats() {
  $("#issue-count").textContent = state.issues.length;
  $("#issue-big").textContent = state.issues.length;
}
function setView(view) {
  if (["vocabulary", "verbs", "adjectives"].includes(view)) {
    vocabularyKind = view;
    view = "vocabulary";
  }
  normalizeVocabularySelectionForKind();
  var requests = [];
  if (view === "vocabulary") {
    var kind = vocabularyKind === "verbs" ? "verbs" : "vocabulary",
      group = vocabularyManifestGroup(vocabularyKind, selectedCategory);
    if (!contentAvailable(kind, group))
      requests.push(ensureVocabularyFor(vocabularyKind, selectedCategory));
  } else if (view === "phrases") {
    if (!contentAvailable("phrases", phraseCategory))
      requests.push(ensureContent("phrases", phraseCategory));
  } else if (view === "mixed") {
    if (!contentAvailable("vocabulary"))
      requests.push(ensureContent("vocabulary"));
    if (!contentAvailable("verbs")) requests.push(ensureContent("verbs"));
    if (!contentAvailable("phrases")) requests.push(ensureContent("phrases"));
  } else if (view === "dictionary") {
    if (!contentAvailable("vocabulary"))
      requests.push(ensureContent("vocabulary"));
    if (!contentAvailable("verbs")) requests.push(ensureContent("verbs"));
  }
  if (requests.length)
    return Promise.all(requests).then(() => renderView(view));
  return renderView(view);
}
function renderView(view) {
  if (view === "mixed") restoreMixedDesk();
  normalizeVocabularySelectionForKind();
  $$(".view").forEach((x) => x.classList.remove("active-view"));
  $("#" + view + "-view").classList.add("active-view");
  $$(".nav-item").forEach((x) =>
    x.classList.toggle("active", x.dataset.view === view),
  );
  $$("[data-vocabulary-kind]").forEach((button) => {
    var selected = button.dataset.vocabularyKind === vocabularyKind;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  if (view === "issues") renderIssues();
  if (view === "settings") renderSettings();
  if (view === "dictionary") renderDictionary();
  if (view === "vocabulary") renderVocabulary();
  if (view === "phrases") renderPhrases();
  if (view === "application") renderGrammarApplication();
  if (view === "grammar") renderGrammar();
  if (view === "mixed") {
    renderMixedBuilder();
    nextMixed();
  }
  if (view === "lessons") renderLessons();
  savePreferences();
}
function vocabularyManifestGroup(view, category) {
  if (view === "adjectives") return "adjectives";
  if (view === "verbs")
    return category === "verbs" || category === "all"
      ? "all"
      : category.replace(/^verb-/, "");
  return category === "all" ? "all" : category;
}
function ensureVocabularyFor(view, category) {
  var kind = view === "verbs" ? "verbs" : "vocabulary";
  return ensureContent(kind, vocabularyManifestGroup(view, category));
}
function normalizeVocabularySelectionForKind() {
  if (!selectedCategories.length) {
    selectedCategory = activeAllCategory();
    return;
  }
  if (vocabularyKind === "adjectives") {
    if (
      !selectedCategories.some(
        (key) => key === "adjectives" || key.startsWith("adjective-"),
      )
    )
      selectedCategories = ["adjectives"];
    selectedCategory = "adjectives";
  } else if (vocabularyKind === "verbs") {
    if (
      !selectedCategories.some(
        (key) => key === "verbs" || key.startsWith("verb-"),
      )
    )
      selectedCategories = ["verbs"];
    selectedCategory = "verbs";
  } else {
    if (
      !selectedCategories.some(
        (key) =>
          !["verbs", "adjectives"].includes(key) &&
          !key.startsWith("verb-") &&
          !key.startsWith("adjective-"),
      )
    )
      selectedCategories = ["all"];
    selectedCategory = "all";
  }
}
function toast(msg) {
  var t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}
function categoryMatches(word, key) {
  if (vocabularyKind === "adjectives")
    return (
      word.pos === "adjective" &&
      (key === "adjectives" ||
        key === "all" ||
        key === "adjective-" + word.adjectiveCategory)
    );
  if (
    vocabularyKind === "vocabulary" &&
    (word.pos === "verb" || word.pos === "adjective")
  )
    return false;
  return key === "all"
    ? vocabularyKind === "verbs"
      ? word.category === "verbs"
      : word.category !== "verbs"
    : (key === "verbs" && word.category === "verbs") ||
        (key.startsWith("verb-") && word.verbCategory === key.slice(5)) ||
        (key.startsWith("adjective-") &&
          word.adjectiveCategory === key.slice(10)) ||
        word.category === key;
}
function activeAllCategory() {
  return vocabularyKind === "adjectives"
    ? "adjectives"
    : vocabularyKind === "verbs"
      ? "verbs"
      : "all";
}
function vocabularyCategorySelected(key) {
  return (
    selectedCategories.includes(activeAllCategory()) ||
    selectedCategories.includes(key)
  );
}
function selectedVocabularyCategoryMatches(word) {
  return (
    !selectedCategories.length ||
    selectedCategories.some((key) => categoryMatches(word, key))
  );
}
function toggleVocabularyCategory(key, entries) {
  var allKey = activeAllCategory();
  selectedCategories = toggleDeskCategorySelection(
    selectedCategories,
    allKey,
    entries.map((entry) => entry.id),
    key,
  );
  selectedCategory = allKey;
}
function categoryCount(key) {
  var view = vocabularyKind,
    kind = view === "verbs" ? "verbs" : "vocabulary",
    group = vocabularyManifestGroup(view, key),
    manifestEntries =
      group === "all"
        ? Object.values(contentManifest[kind])
        : [contentManifest[kind][group]],
    levels = selectedLevels,
    allGroupsLoaded =
      group === "all"
        ? Object.keys(contentManifest[kind]).every((entry) =>
            contentLoaded(kind, entry),
          )
        : contentLoaded(kind, group);
  if (manifestEntries.every(Boolean) && !allGroupsLoaded) {
    return manifestEntries.reduce(
      (total, entry) =>
        total + levels.reduce((sum, level) => sum + entry.levels[level], 0),
      0,
    );
  }
  return vocab.filter(
    (word) => levelSelected(word.level) && categoryMatches(word, key),
  ).length;
}
function categoryLabel(key) {
  var record = categoryRecords.find((item) => item.id === key),
    localized = record?.localized?.en;
  return localized?.label || key;
}
function renderCategories() {
  var el = $("#category-tabs");
  var entries = categoryRecords.filter((record) =>
    vocabularyKind === "adjectives"
      ? record.id === "adjectives" || record.id.startsWith("adjective-")
      : vocabularyKind === "verbs"
        ? record.id === "verbs" || record.id.startsWith("verb-")
        : !(
            record.id === "verbs" ||
            record.id.startsWith("verb-") ||
            record.id === "adjectives" ||
            record.id.startsWith("adjective-")
          ),
  );
  var allCategory = activeAllCategory();
  el.innerHTML = entries
    .sort((a, b) =>
      a.id === allCategory
        ? -1
        : b.id === allCategory
          ? 1
          : (a.studyOrder ?? 999) - (b.studyOrder ?? 999),
    )
    .map((record) => {
      var key = record.id,
        displayLabel = categoryLabel(key);
      return `<button class="${vocabularyCategorySelected(key) ? "selected" : ""}" data-cat="${key}" aria-pressed="${vocabularyCategorySelected(key)}"><i>✓</i>${displayLabel} <small>${categoryCount(key)}</small></button>`;
    })
    .join("");
  $$("[data-cat]").forEach(
    (b) =>
      (b.onclick = async () => {
        toggleVocabularyCategory(b.dataset.cat, entries);
        vocabIndex = 0;
        await ensureVocabularyFor(vocabularyKind, activeAllCategory());
        renderVocabulary();
        savePreferences();
      }),
  );
  renderVocabularyLevels();
}
function renderVocabularyLevels() {
  $$("[data-global-vocab-level]").forEach((button) => {
    var level = button.dataset.globalVocabLevel,
      active = levelSelected(level);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.onclick = () => {
      toggleStudyLevel(level);
      vocabIndex = 0;
      phraseIndex = 0;
      renderVocabularyLevels();
      if (document.querySelector("#phrases-view.active-view")) showPhrase();
      else if (document.querySelector("#application-view.active-view"))
        renderGrammarApplication();
      else if (document.querySelector("#mixed-view.active-view")) {
        renderMixedBuilder();
        nextMixed();
      } else renderVocabulary();
      savePreferences();
    };
  });
}
var vocabStudyStatus = "pending";
var vocabStudyStatusLabels = {
  pending: "pending",
  "first-shot": "first-try",
  corrected: "corrected",
  article: "article review",
  wrong: "incorrect",
};
function vocabularyRecords() {
  return vocab.filter((w) => {
    var levelOk = levelSelected(w.level),
      categoryOk = selectedVocabularyCategoryMatches(w);
    return levelOk && categoryOk;
  });
}
function vocabularyStudyGroups(records) {
  var correct = new Set(state.learned),
    wrong = new Set(state.issues),
    mistakes = new Set(state.mistakes),
    articleOnly = new Set(state.articleOnlyMistakes),
    groups = {
      pending: [],
      "first-shot": [],
      corrected: [],
      article: [],
      wrong: [],
    };
  records.forEach((record) => {
    var group = wrong.has(record.id)
      ? "wrong"
      : !correct.has(record.id)
        ? "pending"
        : mistakes.has(record.id)
          ? "corrected"
          : articleOnly.has(record.id)
            ? "article"
            : "first-shot";
    groups[group].push(record);
  });
  return groups;
}
function currentWords() {
  return vocabularyStudyGroups(vocabularyRecords())[vocabStudyStatus];
}
function renderVocabulary() {
  renderCategories();
  var words = vocabularyRecords();
  if (randomMode && words.length)
    vocabIndex = Math.floor(Math.random() * words.length);
  showVocabCard();
}
function renderVocabularyList() {
  var words = vocabularyRecords();
  $$("[data-hide-vocabulary-answer]").forEach(
    (input) => (input.checked = hideVocabularyAnswers),
  );
  renderStudyPanel({
    container: $("#word-list"),
    groups: vocabularyStudyGroups(words),
    status: vocabStudyStatus,
    labels: {
      pending: "Pending",
      "first-shot": "First try",
      corrected: "After error",
      article: "Article",
      wrong: "Incorrect",
    },
    active: activeVocabWord,
    className: "word-list vocabulary-study-panel",
    rowHTML: (w) => {
      var article = targetArticle(w),
        word = article
          ? targetText(w).replace(/^(der|die|das) /, "")
          : targetText(w),
        mark = state.learned.includes(w.id)
          ? "✓"
          : state.issues.includes(w.id)
            ? "✕"
            : "○";
      var prompt = vocabMode === "translate" ? sourceText(w) : word;
      var answer = vocabMode === "translate" ? targetText(w) : sourceText(w);
      return `<button type="button" class="word-row ${w === activeVocabWord ? "current" : ""}" data-word="${w.id}" aria-pressed="${w === activeVocabWord}"><div><strong>${prompt}</strong><small>${hideVocabularyAnswers ? "Answer hidden" : answer}</small></div><span class="word-check ${mark === "✓" ? "correct" : mark === "✕" ? "wrong" : ""}" aria-label="${mark === "✓" ? "Correct" : mark === "✕" ? "Incorrect" : "Not tested"}">${mark}</span></button>`;
    },
    select: (w) => {
      vocabIndex = currentWords().indexOf(w);
      showVocabCard();
    },
    onStatusChange: (status) => {
      vocabStudyStatus = status;
      vocabIndex = 0;
      showVocabCard();
    },
  });
}
function showVocabCard() {
  updateDirectionLabels();
  $$("[data-vocab-choice]").forEach((button) => {
    button.classList.toggle("active", vocabMultipleChoice);
    button.setAttribute("aria-pressed", String(vocabMultipleChoice));
  });
  refreshArticleChoices();
  var words = currentWords();
  activeVocabWord = words[vocabIndex % words.length] || null;
  renderVocabularyList();
  if (!words.length) {
    $("#vocab-level").textContent = "NO MATCHING WORDS";
    $("#vocab-number").textContent = "—";
    $("#practice-word").textContent = "Nothing here";
    $("#practice-prompt").textContent =
      `No ${vocabStudyStatusLabels[vocabStudyStatus]} words match these levels and categories.`;
    $("#article-choices").style.display = "none";
    $("#vocab-answer").value = "";
    $("#vocab-answer").disabled = true;
    $("#check-vocab").disabled = true;
    $("#vocab-feedback").textContent = "";
    return;
  }
  $("#vocab-answer").disabled = false;
  $("#check-vocab").disabled = false;
  var w = words[vocabIndex % words.length],
    article = targetArticle(w),
    word = article
      ? targetText(w).replace(/^(der|die|das) /, "")
      : targetText(w);
  var category =
    w.pos === "verb"
      ? categoryLabel("verb-" + w.verbCategory)
      : w.pos === "adjective"
        ? categoryLabel("adjective-" + w.adjectiveCategory)
        : categoryLabel(w.category);
  $("#vocab-level").textContent = w.level + " · " + category;
  $("#vocab-number").textContent =
    String(words.indexOf(w) + 1).padStart(2, "0") + " / " + words.length;
  vocabAnswered = false;
  vocabCorrect = false;
  selectedVocabChoice = "";
  $("#practice-word").textContent =
    vocabMode === "translate" ? sourceText(w) : word;
  $("#practice-prompt").textContent =
    vocabMode === "translate"
      ? translatePrompt()
      : vocabMultipleChoice
        ? meaningPrompt()
        : article
          ? "Choose the article, then type the meaning."
          : "What does this mean?";
  $("#article-choices").style.display = article ? "flex" : "none";
  $("#article-choices span").textContent = "Article";
  selectedArticle = "";
  $$("[data-article]").forEach((b) => b.classList.remove("selected"));
  $("#vocab-answer").style.display = vocabMultipleChoice ? "none" : "";
  var choices = $("#vocab-choice-options");
  choices.innerHTML = "";
  choices.style.display = vocabMultipleChoice ? "grid" : "none";
  if (vocabMultipleChoice) {
    var distractors = words
      .filter((item) => item.id !== w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    [w, ...distractors]
      .sort(() => Math.random() - 0.5)
      .forEach((item) => {
        var button = document.createElement("button");
        button.type = "button";
        var choice =
          vocabMode === "translate"
            ? targetText(item).replace(/^(der|die|das) /, "")
            : sourceText(item);
        button.textContent = choice;
        button.onclick = () => {
          $$(".vocab-choice").forEach((x) => x.classList.remove("selected"));
          button.classList.add("selected");
          selectedVocabChoice = choice;
        };
        button.className = "choice-option vocab-choice";
        choices.append(button);
      });
  } else choices.innerHTML = "";
  $("#vocab-answer").placeholder =
    vocabMode === "translate" ? "Type the answer…" : "Type the meaning…";
  $("#vocab-answer").value = "";
  $("#vocab-feedback").textContent = "";
  $("#vocab-feedback").className = "feedback";
  updateVocabCheckButton();
}
var targetLanguageName = () => "German";
var sourceLanguageName = () => "English";
var translatePrompt = () =>
  "Translate this into" + " " + targetLanguageName() + ".";
var meaningPrompt = () => "What does this mean?";
var genericClozeStopwords = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "because",
  "that",
  "if",
  "when",
  "although",
  "I",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "ich",
  "du",
  "er",
  "sie",
  "es",
  "wir",
  "ihr",
  "Sie",
]);
function refreshArticleChoices() {
  var articles = [
    ...new Set(vocab.map((item) => targetArticle(item)).filter(Boolean)),
  ].sort(
    (a, b) =>
      ["der", "die", "das"].indexOf(a) - ["der", "die", "das"].indexOf(b),
  );
  [
    ["#article-choices", "[data-article]"],
    ["#mixed-article", "[data-mixed-article]"],
  ].forEach(([root, selector]) => {
    var container = $(root);
    if (!container) return;
    container.style.display = articles.length ? "flex" : "none";
    container.querySelector("span").textContent = articles.length
      ? "Article"
      : " ";
    container.querySelectorAll(selector).forEach((button, index) => {
      var article = articles[index];
      button.style.display = article ? "" : "none";
      if (article) {
        if (selector === "[data-article]") button.dataset.article = article;
        else button.dataset.mixedArticle = article;
        button.innerHTML = `<small>${index + 1}</small>${article}`;
      }
    });
  });
}
function checkVocab() {
  if (!activeVocabWord || vocabCorrect) return;
  var w = activeVocabWord,
    raw = vocabMultipleChoice ? selectedVocabChoice : $("#vocab-answer").value,
    article = targetArticle(w),
    german = article
      ? targetText(w).replace(/^(der|die|das) /, "")
      : targetText(w),
    target = sourceText(w),
    articleCorrect = !article || selectedArticle === article,
    wordCorrect =
      vocabMode === "translate"
        ? answerMatches(
            raw,
            german,
            targetMeta(w).caseSensitive
              ? (value) => normalizeAnswer(value, { caseSensitive: true })
              : normalizeAnswer,
          )
        : answerIncludes(raw, target),
    ok = articleCorrect && wordCorrect;
  // A wrong answer is a retry, not completion of this card. This keeps the
  // current word active until the learner actually answers it correctly.
  vocabAnswered = !!ok;
  vocabCorrect = !!ok;
  state.attempts++;
  if (ok) {
    state.correct++;
    if (!state.learned.includes(w.id)) state.learned.push(w.id);
    resolveIssue(w.id);
    $("#vocab-feedback").textContent =
      "Correct! Press Enter again for the next word.";
    $("#vocab-feedback").className = "feedback good";
    save();
  } else {
    state.learned = state.learned.filter((id) => id !== w.id);
    if (!state.issues.includes(w.id)) state.issues.push(w.id);
    recordMistake(w.id, !articleCorrect && wordCorrect);
    var message;
    if (article && !articleCorrect && !selectedArticle)
      message = "The article is missing.";
    else if (article && !articleCorrect && !wordCorrect)
      message = "Both the article and translation are wrong.";
    else if (article && !articleCorrect) message = "The article is wrong.";
    else message = "The translation is wrong.";
    $("#vocab-feedback").textContent =
      message + " Use Hint if you need the answer.";
    $("#vocab-feedback").className = "feedback bad";
    save();
  }
  renderVocabularyList();
  updateVocabCheckButton();
}
function nextVocab() {
  var words = currentWords();
  if (!words.length) {
    vocabIndex = 0;
    showVocabCard();
    return;
  }
  var currentIndex = words.indexOf(activeVocabWord);
  vocabIndex = randomMode
    ? Math.floor(Math.random() * words.length)
    : currentIndex >= 0
      ? (currentIndex + 1) % words.length
      : vocabIndex % words.length;
  showVocabCard();
}
