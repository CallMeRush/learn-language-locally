function save() {
  var all = JSON.parse(localStorage.getItem("wortwerk-progress") || "{}");
  all[progressKey()] = state;
  localStorage.setItem("wortwerk-progress", JSON.stringify(all));
  updateStats();
}
function updateStats() {
  $("#learned-stat").textContent = state.learned.length;
  $("#phrase-stat").textContent = state.phrases.length;
  $("#accuracy-stat").textContent = state.attempts
    ? Math.round((state.correct / state.attempts) * 100) + "%"
    : "—";
  $("#word-progress").style.width =
    Math.min(100, (state.learned.length / vocab.length) * 100) + "%";
  $("#phrase-progress").style.width =
    Math.min(100, (state.phrases.length / phrases.length) * 100) + "%";
  $("#issue-count").textContent = state.issues.length;
  $("#issue-big").textContent = state.issues.length;
  $("#streak-value").textContent =
    state.streak + " day" + (state.streak === 1 ? "" : "s");
  var dots = $("#accuracy-dots");
  dots.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    var el = document.createElement("i");
    if (state.attempts && i < Math.round((state.correct / state.attempts) * 5))
      el.style.background = "var(--green)";
    dots.append(el);
  }
}
function setView(view) {
  if (
    view === "verbs" &&
    selectedCategory !== "verbs" &&
    !selectedCategory.startsWith("verb-")
  )
    selectedCategory = "verbs";
  if (
    view === "vocabulary" &&
    (selectedCategory === "verbs" || selectedCategory.startsWith("verb-"))
  )
    selectedCategory = "all";
  $$(".view").forEach((x) => x.classList.remove("active-view"));
  $("#" + view + "-view").classList.add("active-view");
  $$(".nav-item").forEach((x) =>
    x.classList.toggle(
      "active",
      x.dataset.view === view &&
        (!x.dataset.category || x.dataset.category === selectedCategory),
    ),
  );
  if (view === "issues") renderIssues();
  if (view === "vocabulary" || view === "verbs") renderVocabulary();
  if (view === "grammar") renderGrammar();
  if (view === "mixed") nextMixed();
  if (view === "lessons") renderLessons();
}
function toast(msg) {
  var t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}
function registerStudy() {
  var today = new Date().toDateString();
  if (state.lastStudy !== today) {
    state.streak =
      state.lastStudy === new Date(Date.now() - 86400000).toDateString()
        ? state.streak + 1
        : 1;
    state.lastStudy = today;
  }
}
function categoryMatches(word, key) {
  return key === "all"
    ? isVerbView()
      ? word.category === "verbs"
      : word.category !== "verbs"
    : (key === "verbs" && word.category === "verbs") ||
        (key.startsWith("verb-") && word.verbCategory === key.slice(5)) ||
        (key.startsWith("adjective-") &&
          word.adjectiveCategory === key.slice(10)) ||
        word.category === key;
}
function categoryCount(key) {
  return vocab.filter(
    (word) =>
      (vocabLevel === "all" || word.level === vocabLevel) &&
      categoryMatches(word, key),
  ).length;
}
function categoryLabel(key) {
  var record = categoryRecords.find((item) => item.id === key),
    localized =
      record?.localized?.en;
  return localized?.label || key;
}
function renderCategories() {
  var el = $("#category-tabs");
  var entries = categoryRecords.filter((record) =>
    isVerbView()
      ? record.id === "verbs" || record.id.startsWith("verb-")
      : !(record.id === "verbs" || record.id.startsWith("verb-")),
  );
  el.innerHTML = entries
    .map((record) => {
      var key = record.id,
        displayLabel = categoryLabel(key);
      return `<button class="${selectedCategory === key ? "active" : ""}" data-cat="${key}">${displayLabel}${selectedCategory === key ? ` <small>${categoryCount(key)}</small>` : ""}</button>`;
    })
    .join("");
  $$("[data-cat]").forEach(
    (b) =>
      (b.onclick = () => {
        selectedCategory = b.dataset.cat;
        vocabIndex = 0;
        renderVocabulary();
      }),
  );
  renderVocabularyLevels();
}
function renderVocabularyLevels() {
  $$("[data-global-vocab-level]").forEach((button) => {
    var active = vocabLevel === button.dataset.globalVocabLevel;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.onclick = () => {
      var level = button.dataset.globalVocabLevel;
      vocabLevel = level;
      phraseLevel = { all: "all", A1: "easy", A2: "medium", B1: "hard" }[level];
      mixedLevel = level;
      vocabIndex = 0;
      phraseIndex = 0;
      renderVocabularyLevels();
      $$("[data-mixed-level]").forEach((x) =>
        x.classList.toggle("active", x.dataset.mixedLevel === level),
      );
      if (document.querySelector("#phrases-view.active-view")) showPhrase();
      else if (document.querySelector("#mixed-view.active-view")) nextMixed();
      else renderVocabulary();
    };
  });
}
function currentWords() {
  return vocab.filter((w) => {
    var levelOk = vocabLevel === "all" || w.level === vocabLevel,
      categoryOk = categoryMatches(w, selectedCategory),
      done = state.learned.includes(w.id),
      wrong = state.issues.includes(w.id),
      statusOk =
        vocabStatus === "all" ||
        (vocabStatus === "unseen" && !done && !wrong) ||
        (vocabStatus === "correct" && done) ||
        (vocabStatus === "wrong" && wrong && !done);
    return levelOk && categoryOk && statusOk;
  });
}
function renderVocabulary() {
  renderCategories();
  var words = currentWords();
  $("#word-list").innerHTML = words.length
    ? words
        .map((w) => {
          var article = targetArticle(w),
            word = article
              ? targetText(w).replace(/^(der|die|das) /, "")
              : targetText(w),
            mark = state.learned.includes(w.id)
              ? "✓"
              : state.issues.includes(w.id)
                ? "✕"
                : "○";
          return `<div class="word-row" data-word="${w.id}"><span class="word-article">${article}</span><div><strong>${word}</strong><small>${sourceText(w)}</small></div><span class="word-check ${mark === "✓" ? "correct" : mark === "✕" ? "wrong" : ""}">${mark}</span></div>`;
        })
        .join("")
    : '<div class="empty-state">No words match this filter.</div>';
  $$(".word-row").forEach(
    (row) =>
      (row.onclick = () => {
        var w = vocab.find((x) => x.id === row.dataset.word);
        vocabIndex = words.indexOf(w);
        showVocabCard();
      }),
  );
  if (randomMode && words.length)
    vocabIndex = Math.floor(Math.random() * words.length);
  showVocabCard();
}
function showVocabCard() {
  refreshArticleChoices();
  var words = currentWords();
  activeVocabWord = words[vocabIndex % words.length] || null;
  if (!words.length) {
    $("#practice-word").textContent = "—";
    $("#practice-prompt").textContent =
      vocabStatus === "unseen"
        ? "You have completed these words. Choose another filter."
        : "No words match this filter.";
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
  vocabAnswered = false;
  vocabCorrect = false;
  selectedVocabChoice = "";
  $("#practice-word").textContent =
    vocabMode === "translate" ? sourceText(w) : word;
  $("#practice-prompt").textContent =
    vocabMode === "translate"
      ? translatePrompt()
      : vocabMode === "choice"
        ? meaningPrompt()
        : article
          ? "Choose the article, then type the meaning."
          : "What does this mean?";
  $("#article-choices").style.display = article ? "flex" : "none";
  $("#article-choices span").textContent =
    "Choose article · 1 der · 2 die · 3 das";
  selectedArticle = "";
  $$("[data-article]").forEach((b) => b.classList.remove("selected"));
  $("#vocab-answer").style.display = vocabMode === "choice" ? "none" : "";
  var choices = $("#vocab-choice-options");
  choices.innerHTML = "";
  choices.style.display = vocabMode === "choice" ? "grid" : "none";
  if (vocabMode === "choice") {
    var distractors = words
      .filter((item) => item.id !== w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    [w, ...distractors]
      .sort(() => Math.random() - 0.5)
      .forEach((item) => {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = sourceText(item);
        button.onclick = () => {
          $$(".vocab-choice").forEach((x) => x.classList.remove("selected"));
          button.classList.add("selected");
          selectedVocabChoice = sourceText(item);
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
}
var targetLanguageName = () => "German";
var sourceLanguageName = () => "English";
var translatePrompt = () =>
  "Translate this into" +
  " " +
  targetLanguageName() +
  ".";
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
  ].sort((a, b) =>
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
      ? "Choose article"
      : " ";
    container.querySelectorAll(selector).forEach((button, index) => {
      var article = articles[index];
      button.style.display = article ? "" : "none";
      if (article) {
        if (selector === "[data-article]") button.dataset.article = article;
        else button.dataset.mixedArticle = article;
        button.textContent = article;
      }
    });
  });
}
function normalizeAnswer(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}
function answerMatches(answer, expected, normalizer = normalizeAnswer) {
  var actual = normalizer(answer);
  if (!actual) return false;
  if (actual === normalizer(expected)) return true;
  return splitAnswerAlternatives(expected)
    .some((option) => actual === normalizer(option));
}
function splitAnswerAlternatives(value) {
  var depth = 0, part = "", alternatives = [];
  for (var character of String(value ?? "")) {
    if (character === "(") depth++;
    if (character === ")") depth--;
    if ((character === "/" || character === ";") && depth === 0) {
      alternatives.push(part.trim());
      part = "";
    } else part += character;
  }
  alternatives.push(part.trim());
  return alternatives.filter(Boolean);
}
function answerIncludes(answer, expected, normalizer = normalizeAnswer) {
  return answerMatches(answer, expected, normalizer);
}
function checkVocab() {
  if (!activeVocabWord || vocabCorrect) return;
  var w = activeVocabWord,
    raw =
      vocabMode === "choice" ? selectedVocabChoice : $("#vocab-answer").value,
    article = targetArticle(w),
    german = article
      ? targetText(w).replace(/^(der|die|das) /, "")
      : targetText(w),
    target = sourceText(w),
    articleCorrect = !article || selectedArticle === article,
    wordCorrect =
      vocabMode === "translate"
        ? answerMatches(raw, german, targetMeta(w).caseSensitive ? value => String(value).trim().replace(/\s+/g, " ") : normalizeAnswer)
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
    $("#vocab-feedback").textContent =
      "Correct! Press Enter again for the next word.";
    $("#vocab-feedback").className = "feedback good";
    registerStudy();
    save();
  } else {
    if (!state.issues.includes(w.id)) state.issues.push(w.id);
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
    registerStudy();
    save();
  }
}
function nextVocab() {
  var words = currentWords();
  if (!words.length) { vocabIndex = 0; showVocabCard(); return; }
  var currentIndex = words.indexOf(activeVocabWord);
  vocabIndex = randomMode
    ? Math.floor(Math.random() * words.length)
    : currentIndex >= 0 ? (currentIndex + 1) % words.length : vocabIndex % words.length;
  showVocabCard();
}
