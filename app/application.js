/* Phrase-backed grammar application, organised by the numbered grammar tiles. */
var applicationCurrent = null,
  applicationStage = "answer",
  applicationFeedback = "",
  applicationFeedbackKind = "",
  applicationHintRestore = null,
  applicationHintUsed = false,
  applicationStudyStatus = "pending";

function applicationSetDetails(set) {
  return {
    cases: {
      label: "Cases & articles",
      description: "Choose the article form, then recall the full phrase.",
    },
    modals: {
      label: "Modal verbs",
      description:
        "Complete the verb pattern, then recall its sentence in full.",
    },
    separable: {
      label: "Separable verbs",
      description:
        "Place the moving prefix correctly, then recall the full phrase.",
    },
  }[set];
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
function applicationFocusRecords() {
  return grammarApplications.filter(
    (record) => applicationGrammarIdFor(record) === applicationGrammarId,
  );
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
  var completed = new Set(state.grammarApplied),
    mistakes = new Set(state.grammarApplicationMistakes),
    hints = new Set(state.grammarApplicationHints),
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
  applicationStage = "answer";
  applicationFeedback = "";
  applicationFeedbackKind = "";
  applicationHintUsed = false;
}
function applicationRecordAttempt(correct, complete = false) {
  state.attempts++;
  if (correct) state.correct++;
  else if (!state.grammarApplicationMistakes.includes(applicationCurrent.id))
    state.grammarApplicationMistakes.push(applicationCurrent.id);
  if (complete && !state.grammarApplied.includes(applicationCurrent.id))
    state.grammarApplied.push(applicationCurrent.id);
  save();
}
function applicationCardHtml() {
  if (!applicationCurrent)
    return '<article class="practice-panel application-card application-empty"><p class="eyebrow">NOTHING HERE</p><div class="practice-word">No exercises</div><p class="practice-prompt">Choose another status to practise these grammar patterns.</p></article>';
  var record = applicationCurrent,
    exercise = record.exercise,
    focus = applicationFocus(),
    number = String(grammarLessons.indexOf(focus) + 1).padStart(2, "0"),
    sentenceStep = applicationStage === "sentence",
    records = applicationRecords(),
    position = records.findIndex((item) => item.id === record.id) + 1,
    completed =
      sentenceStep &&
      applicationFeedbackKind === "good" &&
      state.grammarApplied.includes(record.id),
    instruction = sentenceStep
      ? "Punctuation is optional."
      : exercise.cue || "",
    input = `<input id="application-answer" autocomplete="off" placeholder="${sentenceStep ? "Type the full German phrase…" : record.set === "cases" ? "Type the article…" : "Type the missing form…"}" />`,
    feedback = applicationFeedback
      ? `<div class="feedback ${applicationFeedbackKind}" id="application-feedback">${applicationFeedback}</div>`
      : '<div class="feedback" id="application-feedback"></div>',
    heading = sentenceStep ? record.translations.en.text : exercise.blanked,
    support = sentenceStep
      ? "Use the English meaning to rebuild the full sentence."
      : record.translations.en.text;
  return `<article class="practice-panel application-card"><div class="practice-meta"><span>${record.level} · TILE ${number} · ${applicationSetDetails(record.set).label.toUpperCase()}</span><span>${position > 0 ? `${String(position).padStart(2, "0")} / ${records.length}` : "SELECTED"}</span></div><div class="practice-word application-phrase">${heading}</div><p class="practice-prompt">${support}</p>${instruction ? `<p class="application-instruction">${instruction}</p>` : ""}${input}<div class="practice-actions"><button class="primary-btn" id="check-application">${completed ? "Next exercise" : sentenceStep ? "Check sentence" : "Check answer"} <span>${completed ? "→" : "↵"}</span></button><button class="subtle-btn" id="application-hint">Hint</button></div>${feedback}<div class="application-card-links"><button class="subtle-btn" id="next-application">Skip to another exercise →</button><button class="subtle-btn" data-application-back="${focus.id}">Open tile ${number} checks →</button></div></article>`;
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
      var mark = state.grammarApplied.includes(record.id)
        ? "✓"
        : state.grammarApplicationMistakes.includes(record.id)
          ? "✕"
          : "○";
      return `<button type="button" class="word-row ${record === applicationCurrent ? "current" : ""}"><div><strong>${record.translations.en.text}</strong></div><span class="word-check ${mark === "✓" ? "correct" : mark === "✕" ? "wrong" : ""}" aria-label="${mark === "✓" ? "Correct" : mark === "✕" ? "Incorrect" : "Not tested"}">${mark}</span></button>`;
    },
    select: (record) => {
      applicationCurrent = record;
      applicationStage = "answer";
      applicationFeedback = "";
      applicationFeedbackKind = "";
      applicationHintRestore = null;
      applicationHintUsed = false;
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
      applicationFocusRecords()[0]?.set || "cases",
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
    )}</div></div></div></section><div class="vocab-layout application-layout">${applicationCardHtml()}<div id="application-study-panel"></div></div>`;
  root.querySelectorAll("[data-application-focus]").forEach(
    (button) =>
      (button.onclick = () => {
        applicationSelectFocus(button.dataset.applicationFocus);
        renderGrammarApplication();
        savePreferences();
      }),
  );
  renderApplicationStudyPanel(root.querySelector("#application-study-panel"));
  bindGrammarApplicationCard();
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
      applicationStage === "sentence"
        ? "Hint · Start from the English meaning and reconstruct the whole German sentence."
        : "Hint · " +
          (applicationCurrent.exercise.cue ||
            applicationCurrent.exercise.explanation),
    applicationHintRestore = {
      message: applicationFeedback,
      kind: applicationFeedbackKind,
    };
  applicationFeedback = text;
  applicationFeedbackKind = "hint";
  applicationHintUsed = true;
  if (!state.grammarApplicationHints.includes(applicationCurrent.id))
    state.grammarApplicationHints.push(applicationCurrent.id);
  save();
  renderGrammarApplication();
}
function bindGrammarApplicationCard() {
  if (!applicationCurrent) return;
  var record = applicationCurrent,
    exercise = record.exercise,
    answer = document.getElementById("application-answer"),
    check = document.getElementById("check-application"),
    completed =
      applicationStage === "sentence" &&
      applicationFeedbackKind === "good" &&
      state.grammarApplied.includes(record.id);
  updateCheckButton(
    check,
    completed,
    applicationStage === "sentence" ? "Check sentence" : "Check answer",
    "Next exercise",
    () => {
      var expected =
          applicationStage === "sentence"
            ? record.translations.de.text
            : exercise.answer,
        correct = answerMatches(
          answer.value,
          expected,
          applicationStage === "sentence" ? grammarNormalize : normalizeAnswer,
        );
      if (!correct) {
        applicationRecordAttempt(false);
        setApplicationFeedback(
          applicationStage === "sentence"
            ? "Not yet. Rebuild the whole German phrase from the English meaning."
            : "Not yet. " + exercise.explanation,
          "bad",
        );
        return;
      }
      if (applicationStage === "sentence") {
        applicationRecordAttempt(true, true);
        setApplicationFeedback(
          applicationHintUsed
            ? "Complete after hint. You applied the pattern and recalled the full phrase."
            : "Complete. You applied the pattern and recalled the full phrase.",
          "good",
        );
        return;
      }
      applicationRecordAttempt(true);
      applicationStage = "sentence";
      setApplicationFeedback(
        applicationHintUsed
          ? "Correct after hint. Now use that pattern in the complete phrase."
          : "Correct. Now use that pattern in the complete phrase.",
        "good",
      );
    },
    () => {
      applicationPickNext();
      renderGrammarApplication();
    },
  );
  answer?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      check?.click();
    }
  });
  document
    .getElementById("application-hint")
    ?.addEventListener("click", toggleApplicationHint);
  document.getElementById("next-application")?.addEventListener("click", () => {
    applicationPickNext();
    renderGrammarApplication();
  });
  document
    .querySelector("[data-application-back]")
    ?.addEventListener("click", (event) =>
      returnToGrammarTile(event.currentTarget.dataset.applicationBack),
    );
}
