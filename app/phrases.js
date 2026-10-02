function filteredPhrases() {
  return phrases.filter(
    (p) =>
      levelSelected({ easy: "A1", medium: "A2", hard: "B1" }[p.level]) &&
      (phraseCategory === "all" || p.category === phraseCategory),
  );
}
function clozeFor(p) {
  if (p._activeCloze) return p._activeCloze;
  var tokens = targetText(p).split(" "),
    clean = (s) => s.toLowerCase().replace(/[.,!?;:]/g, ""),
    specified = p.blank
      ? tokens.findIndex((token) => clean(token) === clean(p.blank))
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
      indexes[Math.floor(Math.random() * indexes.length)] ??
      Math.min(tokens.length - 1, Math.max(1, Math.floor(tokens.length / 2))),
    word = tokens[index].replace(/[.,!?;:]/g, "");
  p._activeCloze = {
    word,
    sentence: tokens
      .map((token, i) =>
        i === index ? '<span class="blank">_____</span>' : token,
      )
      .join(" "),
    index,
  };
  return p._activeCloze;
}
function phraseChoiceOptions(p, cloze, candidates = phrases) {
  var clean = (s) =>
      normalizeAnswer(s)
        .replace(/[.,!?;:]/g, "")
        .trim(),
    target = clean(cloze.word),
    targetPool = candidates
      .flatMap((phrase) =>
        phrase.translations?.["de"]?.text?.split(" ")[
          cloze.index
        ]
          ? [
              phrase.translations["de"].text.split(" ")[
                cloze.index
              ],
            ]
          : [],
      )
      .concat(targetText(p).split(" "));
  var options = [
    cloze.word,
    ...targetPool
      .filter((word) => clean(word) !== target && clean(word).length > 0)
      .sort(() => Math.random() - 0.5),
  ];
  if (options.length < 4)
    options = options.concat(
      targetText(p)
        .split(" ")
        .filter((word) => clean(word) !== target),
    );
  return [...new Set(options.map((word) => word.replace(/[.,!?;:]/g, "")))]
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
      return `<button class="${phraseCategory === category ? "active" : ""}" data-phrase-category="${category}">${label} <small>${count}</small></button>`;
    })
    .join("");
  $$("[data-phrase-category]").forEach(
    (button) =>
      (button.onclick = async () => {
        phraseCategory = button.dataset.phraseCategory;
        phraseIndex = 0;
        await ensureContent("phrases", phraseCategory);
        renderPhraseCategories();
        showPhrase();
        savePreferences();
      }),
  );
}
function setPhraseMode(mode) {
  phraseMode = mode;
  $$(".practice-mode").forEach((button) =>
    button.classList.toggle("active", button.dataset.practice === mode),
  );
  showPhrase();
  savePreferences();
}
function showPhrase() {
  var list = filteredPhrases();
  phraseAnswered = false;
  phraseCorrect = false;
  if (!list.length) {
    renderPhraseLists();
    $("#phrase-level").textContent = "NO MATCHING PHRASES";
    $("#phrase-number").textContent = "—";
    $("#phrase-question").textContent = "No phrases at this level yet.";
    $("#phrase-hint").textContent = "Choose another level or phrase category.";
    $("#cloze-sentence").innerHTML = "";
    $(".phrase-card").classList.toggle("cloze-active", phraseMode === "cloze");
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
    cloze = clozeFor(p);
  $("#phrase-level").textContent =
    { easy: "A1", medium: "A2", hard: "B1" }[p.level] +
    " · " +
    categoryLabel(p.category);
  $("#phrase-number").textContent =
    String((phraseIndex % list.length) + 1).padStart(2, "0") +
    " / " +
    list.length;
  $("#phrase-question").textContent = phraseMode === "reverse" ? targetText(p) : sourceText(p);
  $("#phrase-hint").textContent = phraseMode === "cloze" || phraseMode === "choice"
    ? "Complete the missing word."
    : phraseMode === "reverse" ? "Translate this into English." : translatePrompt();
  $("#cloze-sentence").innerHTML = cloze.sentence;
  $(".phrase-card").classList.toggle("cloze-active", phraseMode === "cloze" || phraseMode === "choice");
  $("#phrase-answer").placeholder =
    phraseMode === "cloze" ? "Type the missing word…" : translatePrompt();
  $("#phrase-answer").value = "";
  $("#phrase-answer").style.display = phraseMode === "choice" ? "none" : "";
  var options = $("#phrase-choice-options");
  options.innerHTML = "";
  options.style.display = phraseMode === "choice" ? "grid" : "none";
  if (phraseMode === "choice") {
    selectedPhraseChoice = "";
    $("#cloze-sentence").style.display = "block";
    phraseChoiceOptions(p, cloze).forEach((option) => {
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
    $("#cloze-sentence").style.display = phraseMode === "cloze" ? "block" : "none";
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
  var list = filteredPhrases(), active = list[phraseIndex % list.length];
  renderPhraseStudyPanel(container, list, state.phrases, active, p => {
    var text = phraseMode === "reverse" ? targetText(p) : sourceText(p);
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
var phraseStudyStatus = "pending";
function renderPhraseStudyPanel(container, records, correctIds, active, rowHTML, select) {
  var correct = new Set(correctIds), wrong = new Set(state.issues);
  var groups = { pending: [], correct: [], wrong: [] };
  records.forEach(record => groups[correct.has(record.id) ? "correct" : wrong.has(record.id) ? "wrong" : "pending"].push(record));
  var labels = { pending: "Pending", correct: "Correct", wrong: "Incorrect" },
    items = groups[phraseStudyStatus],
    activeItems = items.includes(active) ? [active, ...items.filter(item => item !== active)] : items;
  container.className = "word-list vocabulary-study-panel phrase-study-panel";
  container.innerHTML = `<div class="study-switch" role="tablist">${Object.keys(groups).map(status => `<button class="${status === phraseStudyStatus ? "active" : ""}" data-phrase-study-status="${status}" role="tab" aria-selected="${status === phraseStudyStatus}">${labels[status]} <small>${groups[status].length}</small></button>`).join("")}</div><div class="study-list-rows"></div><button class="secondary-btn study-more">Show more</button>`;
  container.querySelectorAll("[data-phrase-study-status]").forEach(button => button.onclick = () => {
    phraseStudyStatus = button.dataset.phraseStudyStatus;
    renderPhraseLists();
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
  if (!list.length) return;
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
    ans = normalizeAnswer((phraseMode === "choice" ? selectedPhraseChoice : $("#phrase-answer").value).trim()),
    cloze = clozeFor(p);
  if (reveal) {
    phraseAnswered = true;
    phraseCorrect = false;
    $("#phrase-feedback").textContent =
      phraseMode === "cloze" || phraseMode === "choice"
        ? "Hint · Missing word: " + cloze.word
        : "Hint · Answer: " + targetText(p);
    $("#phrase-feedback").className = "feedback hint";
    return;
  }
  var clean = (s) => normalizeAnswer(s).replace(/[.,!?;:]/g, ""),
    ok =
      phraseMode === "cloze" || phraseMode === "choice"
        ? answerMatches(ans, cloze.word, clean)
        : phraseMode === "reverse"
          ? answerMatches(ans, sourceText(p), clean)
          : answerMatches(ans, targetText(p), clean);
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
      phraseMode === "cloze" || phraseMode === "choice"
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
$("#random-vocab").onclick = () => {
  nextVocab();
};
$("#check-vocab").onclick = checkVocab;
$("#check-phrase").onclick = () => checkPhrase();
$("#show-answer").onclick = () => checkPhrase(true);
$("#next-phrase").onclick = nextPhrase;
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
$$(".practice-mode").forEach(
  (b) => (b.onclick = () => setPhraseMode(b.dataset.practice)),
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
var verbRandom = document.querySelector("#verbs-random-vocab"),
  verbAnswer = document.querySelector("#verbs-vocab-answer");
verbRandom.onclick = () => {
  nextVocab();
  toast(
    "New word from " + (categoryLabel(selectedCategory) || "all verbs") + ".",
  );
};
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
