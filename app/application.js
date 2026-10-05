/* Sentence-level grammar practice using reviewed exercises linked to phrases. */
var applicationCurrent = null,
  applicationStage = "answer",
  applicationFeedback = "",
  applicationFeedbackKind = "";

function applicationSetDetails(set) {
  return {
    cases: {
      label: "Cases & articles",
      eyebrow: "APPLY THE FOUR CASES",
      description: "Identify the noun’s gender, then choose the article that fits its role in a real sentence.",
    },
    modals: {
      label: "Modal verbs",
      eyebrow: "APPLY VERB POSITION",
      description: "Complete the modal construction and keep the infinitive where German needs it.",
    },
    separable: {
      label: "Separable verbs",
      eyebrow: "APPLY SEPARABLE VERBS",
      description: "Find the prefix that moves to the end of a German main clause.",
    },
  }[set];
}
function applicationRecords() {
  var records = grammarApplications.filter(
    (record) => record.set === applicationSet && levelSelected(record.level),
  );
  if (applicationQueue === "new")
    return records.filter((record) => !state.grammarApplied.includes(record.id));
  if (applicationQueue === "review")
    return records.filter((record) => state.grammarApplicationMistakes.includes(record.id));
  return records;
}
function applicationCounts() {
  var records = grammarApplications.filter(
    (record) => record.set === applicationSet && levelSelected(record.level),
  );
  return {
    all: records.length,
    new: records.filter((record) => !state.grammarApplied.includes(record.id)).length,
    review: records.filter((record) => state.grammarApplicationMistakes.includes(record.id)).length,
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
  var alternatives = pool.filter((record) => record.id !== applicationCurrent?.id);
  applicationCurrent = (alternatives.length ? alternatives : pool)[Math.floor(Math.random() * (alternatives.length ? alternatives : pool).length)];
  applicationStage = applicationCurrent.set === "cases" && applicationAskGender ? "gender" : "answer";
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
  return '<button type="button" class="application-choice" data-application-gender="' + value + '">' + label + "</button>";
}
function applicationCardHtml() {
  if (!applicationCurrent)
    return '<article class="application-card application-empty"><p class="eyebrow">NO EXERCISES HERE</p><h2>Nothing matches this selection.</h2><p>Choose another level, set, or queue to keep practising.</p></article>';
  var record = applicationCurrent,
    exercise = record.exercise,
    isCase = record.set === "cases",
    genderStep = isCase && applicationStage === "gender",
    prompt = genderStep
      ? "What is the gender of “" + exercise.noun + "”?"
      : isCase
        ? "Type only the missing article."
        : record.set === "modals"
          ? "Complete the modal construction."
          : "Complete the separated prefix.",
    input = '<input id="application-answer" autocomplete="off" placeholder="' + (isCase ? "Type the article…" : "Type the missing form…") + '" />',
    genderChoices = '<div class="application-choices" role="group" aria-label="Noun gender">' +
      applicationChoiceHtml("der", "der · masculine") +
      applicationChoiceHtml("die", "die · feminine") +
      applicationChoiceHtml("das", "das · neuter") +
      "</div>",
    feedback = applicationFeedback
      ? '<div class="feedback ' + applicationFeedbackKind + '" id="application-feedback">' + applicationFeedback + "</div>"
      : '<div class="feedback" id="application-feedback"></div>';
  return '<article class="application-card"><div class="phrase-meta"><span>' + record.level + " · " + applicationSetDetails(record.set).label.toUpperCase() + '</span><span>' +
    (state.grammarApplied.includes(record.id) ? "MASTERED" : "NEW") +
    '</span></div><p class="application-kicker">' + (genderStep ? "STEP 1 · IDENTIFY THE NOUN" : "USE THE PATTERN") + "</p><h2>" + exercise.blanked + '</h2><p class="application-translation">' + record.translations.en.text + '</p><div class="application-prompt"><strong>' + prompt + '</strong>' +
    (genderStep ? "<span>Start from the dictionary form, not the sentence article.</span>" : "<span>" + (exercise.cue || "") + "</span>") +
    "</div>" + (genderStep ? genderChoices : input) + '<div class="phrase-actions">' +
    (genderStep ? "" : '<button class="primary-btn" id="check-application">Check answer <span>↵</span></button>') + '<button class="subtle-btn" id="application-hint">Hint</button></div>' + feedback +
    '<button class="next-link" id="next-application">Next exercise <span>→</span></button></article>';
}
function renderGrammarApplication() {
  var root = document.getElementById("application-content"),
    details = applicationSetDetails(applicationSet),
    counts = applicationCounts();
  if (!root) return;
  if (!applicationCurrent || (!applicationFeedback && !applicationRecords().some((record) => record.id === applicationCurrent.id)))
    applicationPickNext();
  root.innerHTML = '<section class="application-builder"><header><div><p class="eyebrow">' + details.eyebrow + '</p><h2>' + details.label + '</h2><p>' + details.description + '</p></div><span>' + counts.all + ' exercises</span></header><div class="application-controls"><div><p>EXERCISE SET</p><div class="application-tabs">' +
    ["cases", "modals", "separable"].map((set) => '<button type="button" class="' + (set === applicationSet ? "active" : "") + '" data-application-set="' + set + '">' + applicationSetDetails(set).label + "</button>").join("") +
    '</div></div><div><p>QUEUE</p><div class="application-tabs">' +
    ["new", "all", "review"].map((queue) => '<button type="button" class="' + (queue === applicationQueue ? "active" : "") + '" data-application-queue="' + queue + '">' + ({ new: "New", all: "All", review: "Review misses" })[queue] + " <small>" + counts[queue] + "</small></button>").join("") +
    "</div></div>" + (applicationSet === "cases" ? '<label class="toggle-label application-gender-toggle"><input type="checkbox" id="application-ask-gender" ' + (applicationAskGender ? "checked" : "") + ' /><span class="toggle-switch"></span> Ask gender first</label>' : "") +
    '</div></section><div class="application-layout">' + applicationCardHtml() + "</div>";
  root.querySelectorAll("[data-application-set]").forEach((button) => {
    button.onclick = () => {
      applicationSet = button.dataset.applicationSet;
      applicationCurrent = null;
      renderGrammarApplication();
      savePreferences();
    };
  });
  root.querySelectorAll("[data-application-queue]").forEach((button) => {
    button.onclick = () => {
      applicationQueue = button.dataset.applicationQueue;
      applicationCurrent = null;
      renderGrammarApplication();
      savePreferences();
    };
  });
  root.querySelector("#application-ask-gender")?.addEventListener("change", (event) => {
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
  renderGrammarApplication();
}
function bindGrammarApplicationCard() {
  if (!applicationCurrent) return;
  var record = applicationCurrent,
    exercise = record.exercise,
    answer = document.getElementById("application-answer");
  document.querySelectorAll("[data-application-gender]").forEach((button) => {
    button.onclick = () => {
      var correct = button.dataset.applicationGender === exercise.gender;
      applicationRecordAttempt(correct);
      if (correct) {
        applicationStage = "answer";
        setApplicationFeedback("Correct — “" + exercise.noun + "” is " + exercise.gender + ". Now apply the case.", "good");
      } else {
        setApplicationFeedback("Not quite. Think of the dictionary form of “" + exercise.noun + "”.", "bad");
      }
    };
  });
  var check = document.getElementById("check-application"),
    completed = applicationStage === "answer" && applicationFeedbackKind === "good" && state.grammarApplied.includes(record.id);
  updateCheckButton(check, completed, "Check answer", "Next exercise", () => {
    var correct = answerMatches(answer.value, exercise.answer);
    applicationRecordAttempt(correct, correct);
    if (correct)
      setApplicationFeedback("Correct. " + exercise.explanation, "good");
    else
      setApplicationFeedback("Not yet. " + exercise.explanation, "bad");
  }, () => {
    applicationPickNext();
    renderGrammarApplication();
  });
  answer?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    check?.click();
  });
  document.getElementById("application-hint")?.addEventListener("click", () => {
    setApplicationFeedback("Hint · " + (exercise.cue || "Look at the sentence pattern and its word order.") + ".", "hint");
  });
  document.getElementById("next-application")?.addEventListener("click", () => {
    applicationPickNext();
    renderGrammarApplication();
  });
}
