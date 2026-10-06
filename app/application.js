/* Phrase-backed grammar application, organised by the numbered grammar tiles. */
var applicationCurrent = null,
  applicationFeedback = "",
  applicationFeedbackKind = "",
  applicationHintRestore = null,
  applicationHintUsed = false,
  selectedApplicationChoice = "",
  applicationStudyStatus = "pending";

function applicationSetDetails(set) {
  return {
    cases: {
      label: "Cases & articles",
      description:
        "Use the given gender to identify the case or recall its article form.",
    },
    modals: {
      label: "Modal verbs",
      description: "Complete the modal-verb pattern in a phrase.",
    },
    separable: {
      label: "Separable verbs",
      description: "Place the moving prefix correctly in a phrase.",
    },
  }[set];
}
function applicationUsesMultipleChoice(record = applicationCurrent) {
  return record?.set === "cases" && applicationMultipleChoice;
}
function applicationProgress(record = applicationCurrent) {
  return applicationUsesMultipleChoice(record)
    ? state.grammarApplicationChoiceProgress
    : {
        applied: state.grammarApplied,
        mistakes: state.grammarApplicationMistakes,
        hints: state.grammarApplicationHints,
      };
}
function applicationCaseArticle(exercise, caseName) {
  var forms = {
    definite: {
      der: {
        nominative: "der",
        accusative: "den",
        dative: "dem",
        genitive: "des",
      },
      die: {
        nominative: "die",
        accusative: "die",
        dative: "der",
        genitive: "der",
      },
      das: {
        nominative: "das",
        accusative: "das",
        dative: "dem",
        genitive: "des",
      },
    },
    indefinite: {
      der: {
        nominative: "ein",
        accusative: "einen",
        dative: "einem",
        genitive: "eines",
      },
      die: {
        nominative: "eine",
        accusative: "eine",
        dative: "einer",
        genitive: "einer",
      },
      das: {
        nominative: "ein",
        accusative: "ein",
        dative: "einem",
        genitive: "eines",
      },
    },
  };
  return forms[exercise.article]?.[exercise.gender]?.[caseName] || caseName;
}
function applicationGrammarIdFor(record) {
  return record.grammarId;
}
function applicationFocus() {
  return (
    grammarLessons.find((lesson) => lesson.id === applicationGrammarId) ||
    grammarLessons.find((lesson) => lesson.id === "grammar-de-3")
  );
}
function applicationAllFocusRecords() {
  return grammarApplications.filter(
    (record) => applicationGrammarIdFor(record) === applicationGrammarId,
  );
}
function applicationFocusRecords() {
  var records = applicationAllFocusRecords();
  return records[0]?.set === "cases"
    ? records.filter(
        (record) =>
          applicationCases.includes(record.exercise.case) &&
          applicationArticleTypes.includes(record.exercise.article),
      )
    : records[0]?.set === "separable"
      ? records.filter(
          (record) =>
            applicationSeparablePrefixes.includes("all") ||
            applicationSeparablePrefixes.includes(record.exercise.answer),
        )
      : records;
}
function applicationFocuses() {
  return grammarLessons.filter((lesson) =>
    grammarApplications.some(
      (record) => applicationGrammarIdFor(record) === lesson.id,
    ),
  );
}
function applicationSelectFocus(grammarId) {
  var first = grammarApplications.find(
    (record) => applicationGrammarIdFor(record) === grammarId,
  );
  if (!first) return;
  applicationGrammarId = grammarId;
  applicationCurrent = null;
  applicationFeedback = "";
  applicationFeedbackKind = "";
  applicationHintRestore = null;
  applicationHintUsed = false;
  selectedApplicationChoice = "";
  applicationStudyStatus = "pending";
}
function toggleApplicationCase(caseName) {
  applicationCases = applicationCases.includes(caseName)
    ? applicationCases.filter((value) => value !== caseName)
    : [...applicationCases, caseName];
  applicationCurrent = null;
  applicationFeedback = "";
  applicationFeedbackKind = "";
  selectedApplicationChoice = "";
  applicationStudyStatus = "pending";
}
function toggleApplicationArticleType(articleType) {
  applicationArticleTypes = applicationArticleTypes.includes(articleType)
    ? applicationArticleTypes.filter((value) => value !== articleType)
    : [...applicationArticleTypes, articleType];
  applicationCurrent = null;
  applicationFeedback = "";
  applicationFeedbackKind = "";
  selectedApplicationChoice = "";
  applicationStudyStatus = "pending";
}
function applicationSeparablePrefixList() {
  return [
    ...new Set(
      applicationAllFocusRecords().map((record) => record.exercise.answer),
    ),
  ].sort((left, right) => left.localeCompare(right, "de"));
}
function toggleApplicationSeparablePrefix(prefix) {
  applicationSeparablePrefixes = toggleDeskCategorySelection(
    applicationSeparablePrefixes,
    "all",
    ["all", ...applicationSeparablePrefixList()],
    prefix,
  );
  applicationCurrent = null;
  applicationFeedback = "";
  applicationFeedbackKind = "";
  selectedApplicationChoice = "";
  applicationStudyStatus = "pending";
}
function toggleApplicationMultipleChoice() {
  applicationMultipleChoice = !applicationMultipleChoice;
  applicationFeedback = "";
  applicationFeedbackKind = "";
  applicationHintRestore = null;
  applicationHintUsed = false;
  selectedApplicationChoice = "";
  applicationStudyStatus = "pending";
}
function openApplicationForGrammar(grammarId) {
  applicationSelectFocus(grammarId);
  setView("application");
}
function returnToGrammarTile(grammarId) {
  var index = grammarLessons.findIndex((lesson) => lesson.id === grammarId);
  if (index < 0) return;
  grammarCardOpen[index] = true;
  grammarPracticeOpen[index] = true;
  setView("grammar");
  document
    .querySelector(`[data-grammar-card="${grammarId}"]`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function applicationStudyGroups(records = applicationFocusRecords()) {
  var progress = applicationProgress(),
    completed = new Set(progress.applied),
    mistakes = new Set(progress.mistakes),
    hints = new Set(progress.hints),
    groups = {
      pending: [],
      "first-shot": [],
      corrected: [],
      hinted: [],
      wrong: [],
    };
  records.forEach((record) => {
    var group = !completed.has(record.id)
      ? mistakes.has(record.id)
        ? "wrong"
        : "pending"
      : mistakes.has(record.id)
        ? "corrected"
        : hints.has(record.id)
          ? "hinted"
          : "first-shot";
    groups[group].push(record);
  });
  return groups;
}
function applicationRecords() {
  return applicationStudyGroups()[applicationStudyStatus] || [];
}
function applicationPickNext() {
  var pool = applicationRecords();
  if (!pool.length) {
    applicationCurrent = null;
    applicationFeedback = "";
    applicationFeedbackKind = "";
    return;
  }
  var alternatives = pool.filter(
    (record) => record.id !== applicationCurrent?.id,
  );
  applicationCurrent = (alternatives.length ? alternatives : pool)[
    Math.floor(
      Math.random() * (alternatives.length ? alternatives : pool).length,
    )
  ];
  applicationFeedback = "";
  applicationFeedbackKind = "";
  applicationHintUsed = false;
  selectedApplicationChoice = "";
}
function applicationRecordAttempt(correct, complete = false) {
  var progress = applicationProgress();
  state.attempts++;
  if (correct) state.correct++;
  else if (!progress.mistakes.includes(applicationCurrent.id))
    progress.mistakes.push(applicationCurrent.id);
  if (complete && !progress.applied.includes(applicationCurrent.id))
    progress.applied.push(applicationCurrent.id);
  save();
}
function applicationCardHtml() {
  if (!applicationCurrent) {
    var noCasesSelected =
      applicationAllFocusRecords()[0]?.set === "cases" &&
      !applicationCases.length;
    var noArticleTypesSelected =
      applicationAllFocusRecords()[0]?.set === "cases" &&
      !applicationArticleTypes.length;
    var noPrefixesSelected =
      applicationAllFocusRecords()[0]?.set === "separable" &&
      !applicationSeparablePrefixes.length;
    return `<article class="practice-panel application-card application-empty"><p class="eyebrow">NOTHING HERE</p><div class="practice-word">No exercises</div><p class="practice-prompt">${noCasesSelected ? "Turn on at least one case to practise these grammar patterns." : noArticleTypesSelected ? "Turn on at least one article type to practise these grammar patterns." : noPrefixesSelected ? "Turn on at least one separable-verb prefix to practise these grammar patterns." : "Choose another status to practise these grammar patterns."}</p></article>`;
  }
  var record = applicationCurrent,
    exercise = record.exercise,
    focus = applicationFocus(),
    number = String(grammarLessons.indexOf(focus) + 1).padStart(2, "0"),
    records = applicationRecords(),
    position = records.findIndex((item) => item.id === record.id) + 1,
    choiceMode = applicationUsesMultipleChoice(record),
    progress = applicationProgress(record),
    completed =
      applicationFeedbackKind === "good" &&
      progress.applied.includes(record.id),
    input = `<input id="application-answer" autocomplete="off" placeholder="${record.set === "cases" ? "Type the article…" : "Type the missing form…"}" />`,
    feedback = applicationFeedback
      ? `<div class="feedback ${applicationFeedbackKind}" id="application-feedback">${applicationFeedback}</div>`
      : '<div class="feedback" id="application-feedback"></div>',
    modeToggle =
      record.set === "cases"
        ? `<button type="button" class="subtle-btn practice-mode application-mode-toggle" data-application-choice aria-pressed="${choiceMode}">${choiceMode ? "Use typed article" : "Multiple choice"}</button>`
        : "",
    choiceOptions = choiceMode
      ? `<div class="choice-options application-choice-options">${[
          "nominative",
          "accusative",
          "dative",
          "genitive",
        ]
          .map(
            (caseName, index) =>
              `<button type="button" class="choice-option application-choice ${selectedApplicationChoice === caseName ? "selected" : ""}" data-application-choice-value="${caseName}" data-choice-shortcut="${choiceShortcutKey(index)}" aria-keyshortcuts="${choiceShortcutKey(index)}" aria-label="Option ${choiceShortcutKey(index)}: ${applicationCaseArticle(exercise, caseName)}">${applicationCaseArticle(exercise, caseName)}</button>`,
          )
          .join("")}</div>`
      : input,
    grammarLabel =
      record.set === "cases"
        ? choiceMode
          ? "CASE PRACTICE"
          : exercise.case.toUpperCase()
        : applicationSetDetails(record.set).label.toUpperCase(),
    gender =
      record.set === "cases"
        ? `<p class="application-gender">Gender · <strong>${exercise.gender}</strong></p>`
        : "",
    instruction = exercise.cue || "";
  return `<article class="practice-panel application-card"><div class="practice-meta"><span>${record.level} · TILE ${number} · ${grammarLabel}</span><span>${position > 0 ? `${String(position).padStart(2, "0")} / ${records.length}` : "SELECTED"}</span></div>${modeToggle}${gender}<div class="practice-word application-phrase">${exercise.blanked}</div><p class="practice-prompt">${record.translations.en.text}</p>${instruction ? `<p class="application-instruction">${instruction}</p>` : ""}${choiceOptions}<div class="practice-actions"><button class="primary-btn" id="check-application">${completed ? "Next exercise" : "Check answer"} <span>${completed ? "→" : "↵"}</span></button><button class="subtle-btn" id="application-hint" aria-keyshortcuts="5">Hint · 5</button></div>${feedback}<div class="application-card-links"><button class="subtle-btn" data-application-back="${focus.id}">Open tile ${number} checks →</button></div></article>`;
}
function applicationCaseSelectorHtml() {
  if (applicationAllFocusRecords()[0]?.set !== "cases") return "";
  var records = applicationAllFocusRecords(),
    cases = ["nominative", "accusative", "dative", "genitive"],
    articleTypes = ["definite", "indefinite"];
  return `<section class="application-case-selector" aria-label="Choose grammar cases and article types"><div class="application-case-controls"><div><p class="eyebrow">CASES TO PRACTISE</p><div class="category-tabs application-case-tabs">${cases
    .map((caseName) => {
      var selected = applicationCases.includes(caseName),
        label = caseName[0].toUpperCase() + caseName.slice(1),
        count = records.filter(
          (record) => record.exercise.case === caseName,
        ).length;
      return `<button type="button" class="${selected ? "selected" : ""}" data-application-case="${caseName}" aria-pressed="${selected}"><i aria-hidden="true">✓</i>${label} <small>${count}</small></button>`;
    })
    .join(
      "",
    )}</div><div><p class="eyebrow">ARTICLE TYPES</p><div class="category-tabs application-article-type-tabs">${articleTypes
    .map((articleType) => {
      var selected = applicationArticleTypes.includes(articleType),
        label = articleType[0].toUpperCase() + articleType.slice(1),
        count = records.filter(
          (record) => record.exercise.article === articleType,
        ).length;
      return `<button type="button" class="${selected ? "selected" : ""}" data-application-article-type="${articleType}" aria-pressed="${selected}"><i aria-hidden="true">✓</i>${label} <small>${count}</small></button>`;
    })
    .join("")}</div></div></div></section>`;
}
function applicationSeparableSelectorHtml() {
  if (applicationAllFocusRecords()[0]?.set !== "separable") return "";
  var records = applicationAllFocusRecords(),
    prefixes = applicationSeparablePrefixList(),
    keys = ["all", ...prefixes];
  return `<section class="application-case-selector" aria-label="Choose separable-verb prefixes"><div class="application-case-controls"><div><p class="eyebrow">SEPARABLE-VERB PREFIXES</p><div class="category-tabs application-prefix-tabs">${keys
    .map((prefix) => {
      var selected =
          applicationSeparablePrefixes.includes("all") ||
          applicationSeparablePrefixes.includes(prefix),
        label = prefix === "all" ? "All prefixes" : `${prefix}-`,
        count =
          prefix === "all"
            ? records.length
            : records.filter((record) => record.exercise.answer === prefix)
                .length;
      return `<button type="button" class="${selected ? "selected" : ""}" data-application-prefix="${prefix}" aria-pressed="${selected}"><i aria-hidden="true">✓</i>${label} <small>${count}</small></button>`;
    })
    .join("")}</div></div></div></section>`;
}
function renderApplicationStudyPanel(container) {
  var records = applicationFocusRecords(),
    groups = applicationStudyGroups(records);
  renderStudyPanel({
    container,
    groups,
    status: applicationStudyStatus,
    labels: {
      pending: "Pending",
      "first-shot": "First try",
      corrected: "After error",
      hinted: "After hint",
      wrong: "Incorrect",
    },
    active: applicationCurrent,
    className: "word-list vocabulary-study-panel application-study-panel",
    rowHTML: (record) => {
      var progress = applicationProgress(record),
        mark = progress.applied.includes(record.id)
          ? "✓"
          : progress.mistakes.includes(record.id)
            ? "✕"
            : "○";
      return `<button type="button" class="word-row ${record === applicationCurrent ? "current" : ""}"><div><strong>${record.translations.en.text}</strong></div><span class="word-check ${mark === "✓" ? "correct" : mark === "✕" ? "wrong" : ""}" aria-label="${mark === "✓" ? "Correct" : mark === "✕" ? "Incorrect" : "Not tested"}">${mark}</span></button>`;
    },
    select: (record) => {
      applicationCurrent = record;
      applicationFeedback = "";
      applicationFeedbackKind = "";
      applicationHintRestore = null;
      applicationHintUsed = false;
      selectedApplicationChoice = "";
      renderGrammarApplication();
    },
    onStatusChange: (status) => {
      applicationStudyStatus = status;
      applicationCurrent = null;
      applicationFeedback = "";
      applicationFeedbackKind = "";
      renderGrammarApplication();
    },
  });
}
function renderGrammarApplication() {
  var root = document.getElementById("application-content"),
    focus = applicationFocus(),
    number = String(grammarLessons.indexOf(focus) + 1).padStart(2, "0"),
    details = applicationSetDetails(
      applicationAllFocusRecords()[0]?.set || "cases",
    );
  if (!root) return;
  if (
    !applicationCurrent ||
    (!applicationFeedback &&
      !applicationRecords().some(
        (record) => record.id === applicationCurrent.id,
      ))
  )
    applicationPickNext();
  root.innerHTML = `<section class="application-builder"><header><div><p class="eyebrow">APPLY GRAMMAR · TILE ${number}</p><h2>${focus.localized.en.title}</h2><p>${details.description} Every exercise comes from a reviewed phrase in the sentence collection.</p></div></header><div class="application-controls"><div><p>GRAMMAR TILE</p><div class="application-tabs application-focus-tabs">${applicationFocuses()
    .map((lesson) => {
      var tile = String(grammarLessons.indexOf(lesson) + 1).padStart(2, "0"),
        count = grammarApplications.filter(
          (record) => applicationGrammarIdFor(record) === lesson.id,
        ).length;
      return `<button type="button" class="${lesson.id === focus.id ? "active" : ""}" data-application-focus="${lesson.id}"><b>${tile}</b> ${lesson.localized.en.title} <small>${count}</small></button>`;
    })
    .join(
      "",
    )}</div></div></div></section>${applicationCaseSelectorHtml()}${applicationSeparableSelectorHtml()}<div class="vocab-layout application-layout">${applicationCardHtml()}<div id="application-study-panel"></div></div>`;
  root.querySelectorAll("[data-application-focus]").forEach(
    (button) =>
      (button.onclick = () => {
        applicationSelectFocus(button.dataset.applicationFocus);
        renderGrammarApplication();
        savePreferences();
      }),
  );
  root.querySelectorAll("[data-application-case]").forEach(
    (button) =>
      (button.onclick = () => {
        toggleApplicationCase(button.dataset.applicationCase);
        renderGrammarApplication();
        savePreferences();
      }),
  );
  root.querySelectorAll("[data-application-article-type]").forEach(
    (button) =>
      (button.onclick = () => {
        toggleApplicationArticleType(button.dataset.applicationArticleType);
        renderGrammarApplication();
        savePreferences();
      }),
  );
  root.querySelectorAll("[data-application-prefix]").forEach(
    (button) =>
      (button.onclick = () => {
        toggleApplicationSeparablePrefix(button.dataset.applicationPrefix);
        renderGrammarApplication();
        savePreferences();
      }),
  );
  root
    .querySelector("[data-application-choice]")
    ?.addEventListener("click", () => {
      toggleApplicationMultipleChoice();
      renderGrammarApplication();
      savePreferences();
    });
  root.querySelectorAll("[data-application-choice-value]").forEach(
    (button) =>
      (button.onclick = () => {
        selectedApplicationChoice = button.dataset.applicationChoiceValue;
        root
          .querySelectorAll("[data-application-choice-value]")
          .forEach((item) =>
            item.classList.toggle("selected", item === button),
          );
      }),
  );
  renderApplicationStudyPanel(root.querySelector("#application-study-panel"));
  bindGrammarApplicationCard();
  if (applicationFeedback) {
    (applicationUsesMultipleChoice()
      ? root.querySelector("#check-application")
      : root.querySelector("#application-answer")
    )?.focus();
  }
}
function setApplicationFeedback(message, kind) {
  applicationFeedback = message;
  applicationFeedbackKind = kind;
  if (kind !== "hint") applicationHintRestore = null;
  renderGrammarApplication();
}
function toggleApplicationHint() {
  if (applicationFeedbackKind === "hint") {
    applicationFeedback = applicationHintRestore?.message || "";
    applicationFeedbackKind = applicationHintRestore?.kind || "";
    applicationHintRestore = null;
    renderGrammarApplication();
    return;
  }
  var text =
      "Hint · " +
      (applicationCurrent.exercise.cue ||
        applicationCurrent.exercise.explanation),
    applicationHintRestore = {
      message: applicationFeedback,
      kind: applicationFeedbackKind,
    };
  applicationFeedback = text;
  applicationFeedbackKind = "hint";
  applicationHintUsed = true;
  var progress = applicationProgress();
  if (!progress.hints.includes(applicationCurrent.id))
    progress.hints.push(applicationCurrent.id);
  save();
  renderGrammarApplication();
}
function bindGrammarApplicationCard() {
  if (!applicationCurrent) return;
  var record = applicationCurrent,
    exercise = record.exercise,
    answer = document.getElementById("application-answer"),
    check = document.getElementById("check-application"),
    choiceMode = applicationUsesMultipleChoice(record),
    completed =
      applicationFeedbackKind === "good" &&
      applicationProgress(record).applied.includes(record.id);
  updateCheckButton(
    check,
    completed,
    "Check answer",
    "Next exercise",
    () => {
      var expected = choiceMode ? exercise.case : exercise.answer,
        value = choiceMode ? selectedApplicationChoice : answer?.value,
        correct = answerMatches(value, expected, normalizeAnswer);
      if (!correct) {
        applicationRecordAttempt(false);
        setApplicationFeedback("Not yet. " + exercise.explanation, "bad");
        return;
      }
      applicationRecordAttempt(true, true);
      setApplicationFeedback(
        applicationHintUsed ? "Correct after hint." : "Correct!",
        "good",
      );
    },
    () => {
      applicationPickNext();
      renderGrammarApplication();
    },
  );
  document.getElementById("application-content").onkeydown = (event) => {
    if (event.key === "Enter") {
      if (event.target.closest("button") && event.target !== check) return;
      event.preventDefault();
      check?.click();
    }
  };
  document
    .getElementById("application-hint")
    ?.addEventListener("click", toggleApplicationHint);
  document
    .querySelector("[data-application-back]")
    ?.addEventListener("click", (event) =>
      returnToGrammarTile(event.currentTarget.dataset.applicationBack),
    );
}
