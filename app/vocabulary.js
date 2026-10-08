function save() {
  var all = progressStore();
  all[progressKey()] = state;
  localStorage.setItem("wortwerk-progress", JSON.stringify(all));
  updateStats();
}
function updateStats() {
  $("#issue-count").textContent = allIssueIds().length;
  $("#issue-big").textContent = allIssueIds().length;
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
function vocabularyKindLabel() {
  return {
    vocabulary: "nouns",
    verbs: "verbs",
    adjectives: "adjectives",
  }[vocabularyKind];
}
function vocabularyCategorySelected(key) {
  return (
    selectedCategories.includes(activeAllCategory()) ||
    selectedCategories.includes(key)
  );
}
function selectedVocabularyCategoryMatches(word) {
  return selectedCategories.some((key) => categoryMatches(word, key));
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
function compareCategoryIds(left, right, allKey) {
  if (left === allKey) return -1;
  if (right === allKey) return 1;
  return categoryLabel(left).localeCompare(categoryLabel(right), "en", {
    sensitivity: "base",
  });
}
function sortedCategoryRecords(records, allKey) {
  return [...records].sort((left, right) =>
    compareCategoryIds(left.id, right.id, allKey),
  );
}
function sortedCategoryIds(ids, allKey) {
  return [...ids].sort((left, right) =>
    compareCategoryIds(left, right, allKey),
  );
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
  el.innerHTML = sortedCategoryRecords(entries, allCategory)
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
      renderVocabularyLevels();
      if (document.querySelector("#phrases-view.active-view")) showPhrase(true);
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
  hinted: "correct after a hint",
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
  var progress = vocabularyProgress();
  return studyProgressGroups(records, {
    completed: progress.learned,
    wrong: progress.issues,
    mistakes: progress.mistakes,
    hinted: progress.hinted,
    articleOnly: progress.articleOnlyMistakes,
    includeArticle: true,
  });
}
function currentWords() {
  return vocabularyStudyGroups(vocabularyRecords())[vocabStudyStatus];
}
function renderVocabulary() {
  renderCategories();
  showVocabCard(true);
}
function renderVocabularyList() {
  var words = vocabularyRecords();
  renderStudyPanel({
    container: $("#word-list"),
    groups: vocabularyStudyGroups(words),
    status: vocabStudyStatus,
    labels: {
      pending: "Pending",
      "first-shot": "First try",
      corrected: "After error",
      hinted: "After hint",
      article: "Article",
      wrong: "Incorrect",
    },
    active: activeVocabWord,
    className: "word-list vocabulary-study-panel",
    rowHTML: (w) => {
      var progress = vocabularyProgress(),
        article = targetArticle(w),
        word = article
          ? targetText(w).replace(/^(der|die|das) /, "")
          : targetText(w),
        mark = progress.learned.includes(w.id)
          ? "✓"
          : progress.issues.includes(w.id)
            ? "✕"
            : "○";
      var prompt = vocabMode === "translate" ? sourceText(w) : word;
      return `<button type="button" class="word-row ${w === activeVocabWord ? "current" : ""}" data-word="${w.id}" aria-pressed="${w === activeVocabWord}"><div><strong>${prompt}</strong></div><span class="word-check ${mark === "✓" ? "correct" : mark === "✕" ? "wrong" : ""}" aria-label="${mark === "✓" ? "Correct" : mark === "✕" ? "Incorrect" : "Not tested"}">${mark}</span></button>`;
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
function showVocabCard(retainActive = false) {
  updateDirectionLabels();
  $$("[data-vocab-choice]").forEach((button) => {
    button.classList.toggle("active", vocabMultipleChoice);
    button.setAttribute("aria-pressed", String(vocabMultipleChoice));
    button.textContent = vocabMultipleChoice
      ? "Use typed answer"
      : "Multiple choice";
  });
  refreshArticleChoices();
  var words = currentWords(),
    eligible = vocabularyRecords(),
    retained =
      retainActive &&
      activeVocabWord &&
      eligible.some((word) => word.id === activeVocabWord.id),
    w = retained ? activeVocabWord : words[vocabIndex % words.length] || null;
  activeVocabWord = w;
  if (w && words.includes(w)) vocabIndex = words.indexOf(w);
  renderVocabularyList();
  if (!w) {
    var kindLabel = vocabularyKindLabel();
    $("#vocab-level").textContent = "NO MATCHING " + kindLabel.toUpperCase();
    $("#vocab-number").textContent = "—";
    $("#practice-word").textContent = "Nothing here";
    $("#practice-prompt").textContent =
      `No ${vocabStudyStatusLabels[vocabStudyStatus]} ${kindLabel} match these levels and categories.`;
    $("#practice-prompt").hidden = false;
    $("#article-choices").style.display = "none";
    $("#vocab-answer").value = "";
    $("#vocab-answer").disabled = true;
    $("#check-vocab").disabled = true;
    $("#vocab-feedback").textContent = "";
    return;
  }
  $("#vocab-answer").disabled = false;
  $("#check-vocab").disabled = false;
  var article = targetArticle(w),
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
  $("#vocab-number").textContent = words.includes(w)
    ? String(words.indexOf(w) + 1).padStart(2, "0") + " / " + words.length
    : "Selected · " + words.length;
  vocabAnswered = false;
  vocabCorrect = false;
  selectedVocabChoice = "";
  $("#practice-word").textContent =
    vocabMode === "translate" ? sourceText(w) : word;
  $("#practice-prompt").textContent = "";
  $("#practice-prompt").hidden = true;
  $("#article-choices").style.display = article ? "flex" : "none";
  $("#article-choices span").textContent = "Article";
  selectedArticle = "";
  $$("[data-article]").forEach((b) => b.classList.remove("selected"));
  $("#vocab-answer").style.display = vocabMultipleChoice ? "none" : "";
  var choices = $("#vocab-choice-options");
  choices.innerHTML = "";
  choices.style.display = vocabMultipleChoice ? "grid" : "none";
  if (vocabMultipleChoice) {
    var distractors = eligible
      .filter((item) => item.id !== w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    [w, ...distractors]
      .sort(() => Math.random() - 0.5)
      .forEach((item, index) => {
        var button = document.createElement("button");
        button.type = "button";
        button.dataset.choiceShortcut = choiceShortcutKey(index);
        button.setAttribute("aria-keyshortcuts", choiceShortcutKey(index));
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
        button.setAttribute("aria-keyshortcuts", String(index + 1));
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
  var progress = vocabularyProgress();
  if (ok) {
    var assisted = progress.hinted.includes(w.id);
    state.correct++;
    if (!progress.learned.includes(w.id)) progress.learned.push(w.id);
    resolveIssue(w.id, progress);
    $("#vocab-feedback").textContent =
      (assisted ? "Correct after hint." : "Correct!") +
      " Press Enter again for the next word.";
    $("#vocab-feedback").className = "feedback good";
    save();
  } else {
    removeIssueQuarantine("vocabulary", w.id);
    progress.learned = progress.learned.filter((id) => id !== w.id);
    if (!progress.issues.includes(w.id)) progress.issues.push(w.id);
    recordMistake(w.id, !articleCorrect && wordCorrect, progress);
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
