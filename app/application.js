/* Phrase-backed grammar application, organised by the numbered grammar tiles. */
var applicationCurrent = null,
  applicationStage = "answer",
  applicationFeedback = "",
  applicationFeedbackKind = "",
  applicationHintRestore = null;

function applicationSetDetails(set) {
  return {
    cases: {
      label: "Cases & articles",
      description:
        "Identify the noun’s gender, choose the form, then recall the full phrase.",
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
function applicationRecords() {
  var records = applicationFocusRecords().filter((record) =>
    levelSelected(record.level),
  );
  if (applicationQueue === "new")
    return records.filter(
      (record) => !state.grammarApplied.includes(record.id),
    );
  if (applicationQueue === "review")
    return records.filter((record) =>
      state.grammarApplicationMistakes.includes(record.id),
    );
  return records;
}
function applicationCounts() {
  var records = applicationFocusRecords().filter((record) =>
    levelSelected(record.level),
  );
  return {
    all: records.length,
    new: records.filter((record) => !state.grammarApplied.includes(record.id))
      .length,
    review: records.filter((record) =>
      state.grammarApplicationMistakes.includes(record.id),
    ).length,
  };
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
  applicationStage =
    applicationCurrent.set === "cases" && applicationAskGender
      ? "gender"
      : "answer";
  applicationFeedback = "";
  applicationFeedbackKind = "";
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
function applicationChoiceHtml(value, label) {
  return `<button type="button" class="application-choice" data-application-gender="${value}">${label}</button>`;
}
function applicationCardHtml() {
  if (!applicationCurrent)
    return '<article class="application-card application-empty"><p class="eyebrow">NO EXERCISES HERE</p><h2>Nothing matches this selection.</h2><p>Choose another grammar tile, level, or queue to keep practising.</p></article>';
  var record = applicationCurrent,
    exercise = record.exercise,
    focus = applicationFocus(),
    number = String(grammarLessons.indexOf(focus) + 1).padStart(2, "0"),
    genderStep = applicationStage === "gender",
    sentenceStep = applicationStage === "sentence",
    completed =
      sentenceStep &&
      applicationFeedbackKind === "good" &&
      state.grammarApplied.includes(record.id),
    prompt = genderStep
      ? `What is the dictionary gender of “${exercise.noun}”?`
      : sentenceStep
        ? "Translate the full phrase into German."
        : record.set === "cases"
          ? "Type only the missing article."
          : record.set === "modals"
            ? "Complete the modal construction."
            : "Complete the separated prefix.",
    input = `<input id="application-answer" autocomplete="off" placeholder="${sentenceStep ? "Type the full German phrase…" : record.set === "cases" ? "Type the article…" : "Type the missing form…"}" />`,
    feedback = applicationFeedback
      ? `<div class="feedback ${applicationFeedbackKind}" id="application-feedback">${applicationFeedback}</div>`
      : '<div class="feedback" id="application-feedback"></div>',
    heading = sentenceStep ? record.translations.en.text : exercise.blanked,
    support = sentenceStep
      ? `Phrase source · ${record.sourcePhraseId}`
      : record.translations.en.text;
  return `<article class="application-card"><div class="phrase-meta"><span>${record.level} · TILE ${number} · ${applicationSetDetails(record.set).label.toUpperCase()}</span><span>${state.grammarApplied.includes(record.id) ? "MASTERED" : "NEW"}</span></div><p class="application-kicker">${genderStep ? "STEP 1 · IDENTIFY THE NOUN" : sentenceStep ? "STEP 3 · RECALL THE PHRASE" : "STEP 2 · APPLY THE PATTERN"}</p><h2>${heading}</h2><p class="application-translation">${support}</p><div class="application-prompt"><strong>${prompt}</strong><span>${genderStep ? "Start from the dictionary form, not the sentence article." : sentenceStep ? "Use the English meaning above; punctuation is optional." : exercise.cue || "Use the pattern from the grammar tile."}</span></div>${genderStep ? `<div class="application-choices" role="group" aria-label="Noun gender">${applicationChoiceHtml("der", "der · masculine")}${applicationChoiceHtml("die", "die · feminine")}${applicationChoiceHtml("das", "das · neuter")}</div>` : input}<div class="phrase-actions">${genderStep ? "" : `<button class="primary-btn" id="check-application">${completed ? "Next exercise" : sentenceStep ? "Check sentence" : "Check answer"} <span>${completed ? "→" : "↵"}</span></button>`}<button class="subtle-btn" id="application-hint">Hint</button></div>${feedback}<div class="application-card-links"><button class="subtle-btn" id="next-application">Skip to another exercise →</button><button class="subtle-btn" data-application-back="${focus.id}">Open tile ${number} checks →</button></div></article>`;
}
function renderGrammarApplication() {
  var root = document.getElementById("application-content"),
    focus = applicationFocus(),
    counts = applicationCounts(),
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
  root.innerHTML = `<section class="application-builder"><header><div><p class="eyebrow">APPLY GRAMMAR · TILE ${number}</p><h2>${focus.localized.en.title}</h2><p>${details.description} Every exercise comes from a reviewed phrase in the sentence collection.</p></div><span>${counts.all} phrase exercises</span></header><div class="application-controls"><div><p>GRAMMAR TILE</p><div class="application-tabs application-focus-tabs">${applicationFocuses()
    .map((lesson) => {
      var tile = String(grammarLessons.indexOf(lesson) + 1).padStart(2, "0"),
        count = grammarApplications.filter(
          (record) => applicationGrammarIdFor(record) === lesson.id,
        ).length;
      return `<button type="button" class="${lesson.id === focus.id ? "active" : ""}" data-application-focus="${lesson.id}"><b>${tile}</b> ${lesson.localized.en.title} <small>${count}</small></button>`;
    })
    .join(
      "",
    )}</div></div><div><p>QUEUE</p><div class="application-tabs">${["new", "all", "review"].map((queue) => `<button type="button" class="${queue === applicationQueue ? "active" : ""}" data-application-queue="${queue}">${{ new: "New", all: "All", review: "Review misses" }[queue]} <small>${counts[queue]}</small></button>`).join("")}</div></div>${applicationCurrent?.set === "cases" ? `<label class="toggle-label application-gender-toggle"><input type="checkbox" id="application-ask-gender" ${applicationAskGender ? "checked" : ""} /><span class="toggle-switch"></span> Ask gender first</label>` : ""}</div></section><div class="application-layout">${applicationCardHtml()}</div>`;
  root.querySelectorAll("[data-application-focus]").forEach(
    (button) =>
      (button.onclick = () => {
        applicationSelectFocus(button.dataset.applicationFocus);
        renderGrammarApplication();
        savePreferences();
      }),
  );
  root.querySelectorAll("[data-application-queue]").forEach(
    (button) =>
      (button.onclick = () => {
        applicationQueue = button.dataset.applicationQueue;
        applicationCurrent = null;
        renderGrammarApplication();
        savePreferences();
      }),
  );
  root
    .querySelector("#application-ask-gender")
    ?.addEventListener("change", (event) => {
      applicationAskGender = event.target.checked;
      applicationCurrent = null;
      renderGrammarApplication();
      savePreferences();
    });
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
  document.querySelectorAll("[data-application-gender]").forEach(
    (button) =>
      (button.onclick = () => {
        var correct = button.dataset.applicationGender === exercise.gender;
        applicationRecordAttempt(correct);
        if (correct) {
          applicationStage = "answer";
          setApplicationFeedback(
            `Correct — “${exercise.noun}” is ${exercise.gender}. Now apply the case.`,
            "good",
          );
        } else
          setApplicationFeedback(
            `Not quite. Think of the dictionary form of “${exercise.noun}”.`,
            "bad",
          );
      }),
  );
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
          "Complete. You applied the pattern and recalled the full phrase.",
          "good",
        );
        return;
      }
      applicationRecordAttempt(true);
      applicationStage = "sentence";
      setApplicationFeedback(
        "Correct. Now use that pattern in the complete phrase.",
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
