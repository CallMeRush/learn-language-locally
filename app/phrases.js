var phraseStudyStatus = "pending";
var phraseStudyStatusLabels = {
  pending: "pending",
  "first-shot": "first-try",
  corrected: "corrected after an error",
  hinted: "correct after a hint",
  wrong: "incorrect",
};
function phraseRecords() {
  return phrases.filter(
    (p) =>
      levelSelected({ easy: "A1", medium: "A2", hard: "B1" }[p.level]) &&
      (phraseCategories.includes("all") ||
        phraseCategories.includes(p.category)),
  );
}
function phraseStudyGroups(records) {
  var progress = phraseProgress();
  return studyProgressGroups(records, {
    completed: progress.phrases,
    wrong: progress.issues,
    mistakes: progress.phraseMistakes,
    hinted: progress.hintedPhrases,
  });
}
function filteredPhrases() {
  return phraseStudyGroups(phraseRecords())[phraseStudyStatus];
}
function renderPhrases() {
  renderPhraseCategories();
  showPhrase(true);
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
        : (indexes[Math.floor(Math.random() * indexes.length)] ??
          Math.min(
            tokens.length - 1,
            Math.max(1, Math.floor(tokens.length / 2)),
          )),
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
        phrase.translations?.[language]?.text?.split(" ")[cloze.index]
          ? [phrase.translations[language].text.split(" ")[cloze.index]]
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
    options = [
      expected,
      ...candidates
        .map((phrase) => translationText(phrase, language))
        .filter((text) => text && clean(text) !== clean(expected))
        .sort(() => Math.random() - 0.5),
    ];
  return [...new Map(options.map((text) => [clean(text), text])).values()]
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);
}
function renderPhraseCategories() {
  var el = $("#phrase-categories");
  if (!el) return;
  var categories = sortedCategoryIds(
    ["all", ...Object.keys(contentManifest.phrases)],
    "all",
  );
  el.innerHTML = categories
    .map((category) => {
      var label = category === "all" ? "All phrases" : categoryLabel(category);
      var entries =
          category === "all"
            ? Object.values(contentManifest.phrases)
            : [contentManifest.phrases[category]],
        loaded =
          category === "all"
            ? contentAvailable("phrases")
            : contentLoaded("phrases", category),
        count = loaded
          ? phrases.filter(
              (p) =>
                levelSelected(
                  { easy: "A1", medium: "A2", hard: "B1" }[p.level],
                ) &&
                (category === "all" || p.category === category),
            ).length
          : entries.reduce(
              (total, entry) =>
                total +
                selectedLevels.reduce(
                  (sum, level) => sum + entry.levels[level],
                  0,
                ),
              0,
            );
      var selected =
        phraseCategories.includes("all") || phraseCategories.includes(category);
      return `<button class="${selected ? "selected" : ""}" data-phrase-category="${category}" aria-pressed="${selected}"><i>✓</i>${label} <small>${count}</small></button>`;
    })
    .join("");
  $$("[data-phrase-category]").forEach(
    (button) =>
      (button.onclick = async () => {
        var category = button.dataset.phraseCategory;
        phraseCategories = toggleDeskCategorySelection(
          phraseCategories,
          "all",
          categories,
          category,
        );
        phraseCategory = "all";
        await ensureContent("phrases");
        renderPhrases();
        savePreferences();
      }),
  );
}
function updatePhraseControls() {
  [
    ["phraseCloze", phraseCloze],
    ["phraseChoice", phraseMultipleChoice],
  ].forEach(([name, active]) => {
    var button = document.querySelector(
      `[data-${name.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())}]`,
    );
    if (!button) return;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.textContent =
      name === "phraseCloze"
        ? active
          ? "Full sentence"
          : "Fill the blank"
        : active
          ? "Use typed answer"
          : "Multiple choice";
  });
}
function setPhraseCloze(enabled = !phraseCloze) {
  phraseCloze = Boolean(enabled);
  updatePhraseControls();
  showPhrase(true);
  savePreferences();
}
function setPhraseMultipleChoice(enabled = !phraseMultipleChoice) {
  phraseMultipleChoice = Boolean(enabled);
  updatePhraseControls();
  showPhrase(true);
  savePreferences();
}
function phraseAnswerLanguage() {
  return phraseDirection === "reverse" ? "en" : "de";
}
function phraseExpectedAnswer(p) {
  return translationText(p, phraseAnswerLanguage());
}
function updatePhraseCheckButton() {
  updateCheckButton(
    $("#check-phrase"),
    phraseCorrect,
    "Check translation",
    "Next phrase",
    () => checkPhrase(),
    nextPhrase,
  );
}
function showPhrase(retainActive = false) {
  updatePhraseControls();
  var list = filteredPhrases(),
    eligible = phraseRecords(),
    retained =
      retainActive &&
      activePhrase &&
      eligible.some((phrase) => phrase.id === activePhrase.id),
    p = retained ? activePhrase : list[phraseIndex % list.length] || null;
  phraseAnswered = false;
  phraseCorrect = false;
  activePhrase = p;
  updatePhraseCheckButton();
  if (!p) {
    renderPhraseLists();
    $("#phrase-level").textContent = "NO MATCHING PHRASES";
    $("#phrase-number").textContent = "—";
    $("#phrase-question").textContent = "Nothing here.";
    $("#phrase-hint").textContent =
      `No ${phraseStudyStatusLabels[phraseStudyStatus]} phrases match these levels and categories.`;
    $("#phrase-hint").hidden = false;
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
  if (list.includes(p)) phraseIndex = list.indexOf(p);
  var answerLanguage = phraseAnswerLanguage(),
    cloze = phraseCloze ? clozeFor(p, answerLanguage) : null;
  activePhrase = p;
  $("#phrase-level").textContent =
    { easy: "A1", medium: "A2", hard: "B1" }[p.level] +
    " · " +
    categoryLabel(p.category);
  $("#phrase-number").textContent = list.includes(p)
    ? String((phraseIndex % list.length) + 1).padStart(2, "0") +
      " / " +
      list.length
    : "Selected · " + list.length;
  $("#phrase-question").textContent =
    phraseDirection === "reverse" ? targetText(p) : sourceText(p);
  $("#phrase-hint").textContent = "";
  $("#phrase-hint").hidden = true;
  $("#cloze-sentence").innerHTML = cloze?.sentence || "";
  $(".phrase-card").classList.toggle("cloze-active", phraseCloze);
  $("#phrase-answer").placeholder = phraseCloze
    ? "Type the missing word…"
    : phraseDirection === "reverse"
      ? "Type the English translation…"
      : translatePrompt();
  $("#phrase-answer").value = "";
  $("#phrase-answer").style.display = phraseMultipleChoice ? "none" : "";
  var options = $("#phrase-choice-options");
  options.innerHTML = "";
  options.style.display = phraseMultipleChoice ? "grid" : "none";
  if (phraseMultipleChoice) {
    selectedPhraseChoice = "";
    $("#cloze-sentence").style.display = phraseCloze ? "block" : "none";
    var phraseOptions = phraseCloze
      ? phraseChoiceOptions(p, cloze, phraseRecords(), answerLanguage)
      : phraseTranslationChoiceOptions(p, phraseRecords(), answerLanguage);
    phraseOptions.forEach((option, index) => {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "choice-option phrase-choice";
      button.dataset.choiceShortcut = choiceShortcutKey(index);
      button.setAttribute("aria-keyshortcuts", choiceShortcutKey(index));
      button.textContent = option;
      button.onclick = () => {
        $$(".phrase-choice").forEach((item) =>
          item.classList.remove("selected"),
        );
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
  var records = phraseRecords();
  renderStudyPanel({
    container,
    groups: phraseStudyGroups(records),
    status: phraseStudyStatus,
    labels: {
      pending: "Pending",
      "first-shot": "First try",
      corrected: "After error",
      hinted: "After hint",
      wrong: "Incorrect",
    },
    active: activePhrase,
    className: "word-list vocabulary-study-panel phrase-study-panel",
    rowHTML: (p) => {
      var text = phraseDirection === "reverse" ? targetText(p) : sourceText(p);
      var progress = phraseProgress(),
        mark = progress.phrases.includes(p.id)
          ? "✓"
          : progress.issues.includes(p.id)
            ? "✕"
            : "○";
      return `<button type="button" class="word-row ${p === activePhrase ? "current" : ""}" data-phrase-id="${p.id}"><span>${text}</span><span class="word-check ${mark === "✓" ? "correct" : mark === "✕" ? "wrong" : ""}">${mark}</span></button>`;
    },
    select: (p) => {
      phraseIndex = filteredPhrases().indexOf(p);
      showPhrase();
    },
    onStatusChange: (status) => {
      phraseStudyStatus = status;
      phraseIndex = 0;
      showPhrase();
    },
  });
  renderPhraseCategories();
}
function nextPhrase() {
  var list = filteredPhrases();
  if (!list.length) {
    phraseIndex = 0;
    showPhrase();
    return;
  }
  phraseIndex = randomMode
    ? Math.floor(Math.random() * list.length)
    : (phraseIndex + 1) % list.length;
  var next = list[phraseIndex % list.length];
  if (next) next._activeCloze = null;
  showPhrase();
}
function checkPhrase(reveal = false) {
  var list = filteredPhrases();
  var p =
    activePhrase &&
    phraseRecords().some((phrase) => phrase.id === activePhrase.id)
      ? activePhrase
      : list[phraseIndex % list.length];
  if (!p) return;
  var ans = normalizeAnswer(
      (phraseMultipleChoice
        ? selectedPhraseChoice
        : $("#phrase-answer").value
      ).trim(),
    ),
    cloze = phraseCloze ? clozeFor(p, phraseAnswerLanguage()) : null,
    expected = phraseCloze ? cloze.word : phraseExpectedAnswer(p);
  if (reveal) {
    var shown = toggleHintFeedback(
      $("#phrase-feedback"),
      "phrase",
      phraseCloze
        ? "Hint · Missing word: " + cloze.word
        : "Hint · Answer: " + expected,
    );
    if (shown) {
      recordPhraseHint(p.id, phraseProgress());
      save();
    }
    return;
  }
  var clean = (s) => normalizeAnswer(s).replace(/[.,!?;:]/g, ""),
    ok = answerMatches(ans, expected, clean);
  phraseAnswered = true;
  phraseCorrect = !!ok;
  state.attempts++;
  var progress = phraseProgress();
  if (ok) {
    var assisted = progress.hintedPhrases.includes(p.id);
    state.correct++;
    if (!progress.phrases.includes(p.id)) progress.phrases.push(p.id);
    resolveIssue(p.id, progress);
    $("#phrase-feedback").textContent =
      (assisted ? "Correct after hint." : "Very good!") +
      " Press Enter again for the next phrase.";
    $("#phrase-feedback").className = "feedback good";
  } else {
    removeIssueQuarantine("phrase", p.id);
    progress.phrases = progress.phrases.filter((id) => id !== p.id);
    if (!progress.issues.includes(p.id)) progress.issues.push(p.id);
    recordPhraseMistake(p.id, progress);
    $("#phrase-feedback").textContent = phraseCloze
      ? "The missing word is wrong. Use Hint if needed."
      : "The translation is wrong. Use Hint if needed.";
    $("#phrase-feedback").className = "feedback bad";
  }
  save();
  renderPhraseLists();
  updatePhraseCheckButton();
}
function renderIssues() {
  var el = $("#issues-list"),
    issueIds = allIssueIds();
  if (!issueIds.length) {
    el.innerHTML =
      '<div class="empty-state">No issues yet. That is a good sign — go practice a few words or phrases.</div>';
    return;
  }
  el.innerHTML = issueIds
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
        clearIssue(b.dataset.clear);
        save();
        renderIssues();
      }),
  );
}
updatePhraseCheckButton();
$("#show-answer").textContent = "Hint · 5";
$("#show-answer").setAttribute("aria-keyshortcuts", "5");
$("#show-answer").onclick = () => checkPhrase(true);
document.querySelector("[data-phrase-cloze]").onclick = () => setPhraseCloze();
document.querySelector("[data-phrase-choice]").onclick = () =>
  setPhraseMultipleChoice();
$("#phrase-answer").onkeydown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (phraseAnswered && phraseCorrect) nextPhrase();
    else checkPhrase();
  }
};
showPhrase();
$(".phrase-layout").insertAdjacentHTML(
  "beforebegin",
  '<div id="phrase-categories" class="phrase-category-tabs"></div>',
);
renderPhraseCategories();
