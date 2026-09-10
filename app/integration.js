var baseMixedPool = mixedPool,
  baseNextMixed = nextMixed,
  baseCheckMixed = checkMixed;
mixedPool = () =>
  activeLesson && lessonRemaining.length
    ? [lessonRemaining.shift()]
    : activeLesson
      ? []
      : baseMixedPool();
nextMixed = () => {
  if (!activeLesson) {
    baseNextMixed();
    return;
  }
  if (lessonComplete) {
    restoreMixedDesk();
    setView("lessons");
    return;
  }
  if (mixedQuestion && !mixedCorrect) {
    var skipped = lessonPhase === "review" ? lessonReviewErrors : lessonErrors;
    if (!skipped.includes(mixedQuestion)) skipped.push(mixedQuestion);
  }
  if (!lessonRemaining.length) {
    if (lessonPhase === "practice" && lessonErrors.length) {
      lessonPhase = "review";
      lessonRemaining = lessonErrors.sort(() => Math.random() - 0.5);
      lessonErrors = [];
      lessonReviewErrors = [];
    } else if (lessonPhase === "review" && lessonReviewErrors.length) {
      lessonRemaining = lessonReviewErrors.sort(() => Math.random() - 0.5);
      lessonReviewErrors = [];
    } else {
      finishLesson();
      return;
    }
  }
  baseNextMixed();
  if (activeLesson) {
    $("#mixed-type").textContent =
      (lessonPhase === "review" ? "FINAL REVIEW · " : "") +
      $("#mixed-type").textContent;
    $("#mixed-hint").textContent =
      lessonPhase === "review"
        ? "This was an error earlier. Fix it now."
        : $("#mixed-hint").textContent;
  }
};
checkMixed = () => {
  if (!mixedQuestion || lessonComplete) return;
  baseCheckMixed();
  if (activeLesson && !mixedCorrect) {
    var bucket = lessonPhase === "review" ? lessonReviewErrors : lessonErrors;
    if (!bucket.includes(mixedQuestion)) bucket.push(mixedQuestion);
  }
};
$("#check-mixed").onclick = checkMixed;
$("#next-mixed").onclick = nextMixed;
$("#mixed-answer").onkeydown = (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  if (mixedAnswered && mixedCorrect) nextMixed();
  else checkMixed();
};
$$("[data-mixed-level]").forEach(
  (button) =>
    (button.onclick = () => {
      $$("[data-mixed-level]").forEach((x) => x.classList.remove("active"));
      button.classList.add("active");
      mixedLevel = button.dataset.mixedLevel;
      activeLesson = null;
      nextMixed();
    }),
);
var baseShowPhrase = showPhrase;
baseCheckPhrase = checkPhrase;
function renderPhraseChoice() {
  var list = filteredPhrases(),
    p = list[phraseIndex % list.length],
    options = $("#phrase-choice-options");
  if (!p || !options) return;
  options.innerHTML = "";
  selectedPhraseChoice = "";
  phraseChoiceOptions(p, clozeFor(p)).forEach((option) => {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "choice-option phrase-choice";
    button.textContent = option;
    button.onclick = () => {
      $$(".phrase-choice").forEach((x) => x.classList.remove("selected"));
      button.classList.add("selected");
      selectedPhraseChoice = option;
    };
    options.append(button);
  });
  options.style.display = "grid";
  $("#phrase-answer").style.display = "none";
  $("#cloze-sentence").style.display = "block";
  $("#cloze-sentence").innerHTML = clozeFor(p).sentence;
}
showPhrase = () => {
  baseShowPhrase();
  if (phraseMode === "choice") renderPhraseChoice();
  if (phraseMode === "reverse") {
    var list = filteredPhrases(),
      p = list[phraseIndex % list.length];
    if (p) {
      $("#phrase-question").textContent = targetText(p);
      $("#phrase-hint").textContent =
        "Translate this into" +
        " " +
        sourceLanguageName() +
        ".";
      $("#cloze-sentence").style.display = "none";
      $("#phrase-choice-options").style.display = "none";
      $("#phrase-answer").style.display = "";
    }
  }
};
checkPhrase = (reveal = false) => {
  if (phraseMode === "choice" && !reveal)
    $("#phrase-answer").value = selectedPhraseChoice;
  if (phraseMode !== "reverse") {
    baseCheckPhrase(reveal);
    if (!reveal && !phraseCorrect) {
      var current = filteredPhrases()[phraseIndex % filteredPhrases().length];
      if (current) state.phrases = state.phrases.filter(id => id !== current.id);
      save();
    }
    renderPhraseLists();
    return;
  }
  var list = filteredPhrases(),
    p = list[phraseIndex % list.length],
    answer = $("#phrase-answer").value;
  phraseAnswered = true;
  if (reveal) {
    phraseCorrect = false;
    $("#phrase-feedback").textContent = "Hint: " + sourceText(p);
    $("#phrase-feedback").className = "feedback hint";
    return;
  }
  phraseCorrect = answerMatches(answer, sourceText(p), normalizeAnswer);
  state.attempts++;
  if (phraseCorrect) {
    state.correct++;
    if (!state.phrases.includes(p.id)) state.phrases.push(p.id);
  } else {
    state.phrases = state.phrases.filter(id => id !== p.id);
    if (!state.issues.includes(p.id)) state.issues.push(p.id);
  }
  registerStudy();
  save();
  renderPhraseLists();
  $("#phrase-feedback").textContent = phraseCorrect
    ? "Correct!"
    : "The translation is wrong.";
  $("#phrase-feedback").className =
    "feedback " + (phraseCorrect ? "good" : "bad");
};
var previousMixedNext = nextMixed;
nextMixed = () => {
  previousMixedNext();
  if (lessonComplete || !mixedQuestion || mixedQuestion.kind !== "phrase-choice") return;
  var item = mixedQuestion.item,
    cloze = clozeFor(item),
    options = $("#mixed-options");
  $("#mixed-cloze").innerHTML = cloze.sentence;
  $("#mixed-cloze").style.display = "block";
  $("#mixed-answer").style.display = "none";
  options.style.display = "grid";
  options.innerHTML = "";
  mixedChoice = "";
  phraseChoiceOptions(item, cloze, lessonChoiceItems("phrase", phrases)).forEach((option) => {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "choice-option mixed-phrase-choice";
    button.textContent = option;
    button.onclick = () => {
      $$(".mixed-phrase-choice").forEach((x) => x.classList.remove("selected"));
      button.classList.add("selected");
      mixedChoice = option;
    };
    options.append(button);
  });
};
var previousMixedCheck = checkMixed;
checkMixed = () => {
  if (mixedQuestion?.kind === "phrase-choice") {
    var originalKind = mixedQuestion.kind;
    mixedQuestion.kind = "phrase-cloze";
    $("#mixed-answer").value = mixedChoice;
    previousMixedCheck();
    mixedQuestion.kind = originalKind;
  } else previousMixedCheck();
};
$("#check-mixed").onclick = checkMixed;
var baseFinishLesson = finishLesson;
finishLesson = () => {
  if (activeLesson && !state.lessons.includes(activeLesson.id)) {
    state.lessons.push(activeLesson.id);
    save();
  }
  baseFinishLesson();
};
var baseRenderLessons = renderLessons;
renderLessons = () => {
  baseRenderLessons();
  $$("[data-lesson-id]").forEach((card) => {
    if (state.lessons.includes(card.dataset.lessonId)) {
      card.classList.add("completed");
      card.querySelector(".lesson-start").innerHTML =
        "Review again <span>↻</span>";
    }
  });
};
document.querySelector('.nav-item[data-view="mixed"]').onclick = () => {
  activeLesson = null;
  $("#mixed-view .page-heading h1").textContent = "Mixed practice";
  $("#mixed-view .page-heading p:last-child").textContent =
    "One randomized stream of vocabulary, verbs, phrases, cloze questions, multiple choice, and grammar.";
  setView("mixed");
};
var originalShowVocabCard = showVocabCard,
  originalCheckVocab = checkVocab;
showVocabCard = () => {
  originalShowVocabCard();
  ["#check-vocab", "#verbs-check-vocab", "#adjectives-check-vocab"].forEach((selector) => {
    var button = document.querySelector(selector);
    if (button) {
      button.innerHTML = "Check answer <span>↵</span>";
      button.onclick = checkVocab;
    }
  });
};
checkVocab = () => {
  originalCheckVocab();
  var button = document.querySelector(
    "#" + vocabularyViewPrefix() + "check-vocab",
  );
  if (button) {
    button.innerHTML = vocabCorrect
      ? "Next word <span>→</span>"
      : "Check answer <span>↵</span>";

    button.onclick = vocabCorrect ? nextVocab : checkVocab;
  }
};
showVocabCard();
var originalNextMixed = nextMixed,
  originalCheckMixed = checkMixed;
nextMixed = () => {
  originalNextMixed();
  var button = $("#check-mixed");
  if (button && !lessonComplete) {
    button.style.display = "";
    button.innerHTML = "Check answer <span>↵</span>";
    button.onclick = checkMixed;
  }
};
checkMixed = () => {
  originalCheckMixed();
  var button = $("#check-mixed");
  if (button && !lessonComplete) {
    button.innerHTML = mixedCorrect
      ? "Next question <span>→</span>"
      : "Check answer <span>↵</span>";
    button.onclick = mixedCorrect ? nextMixed : checkMixed;
  }
};
$("#check-mixed").onclick = checkMixed;
$("#next-mixed").onclick = nextMixed;
$$(".mixed-part").forEach(
  (input) =>
    (input.onchange = () => {
      mixedParts[input.dataset.mixedPart] = input.checked;
      if (!Object.values(mixedParts).some(Boolean)) {
        input.checked = true;
        mixedParts[input.dataset.mixedPart] = true;
        toast("Keep at least one practice type selected.");
        return;
      }
      activeLesson = null;
      nextMixed();
    }),
);
var globalRandomMode = document.querySelector("#global-random-mode");
globalRandomMode.onchange = (e) => {
  randomMode = e.target.checked;
  toast(randomMode ? "Random order on." : "Sequential order on.");
  if (
    document.querySelector("#vocabulary-view.active-view") ||
    document.querySelector("#verbs-view.active-view") || isAdjectiveView()
  )
    renderVocabulary();
};
renderVocabularyLevels();
$$('[id$="vocab-status-filter"]').forEach((select) => {
  select.value = vocabStatus;
  select.onchange = (e) => {
    vocabStatus = e.target.value;
    vocabIndex = 0;
    renderVocabulary();
  };
});
$$('[id$="random-vocab"]').forEach(
  (button) => (button.onclick = () => nextVocab()),
);
$$(".phrase-controls > .mode-switch:nth-child(2),.mixed-levels").forEach(
  (element) => element.remove(),
);
function showVocabHint() {
  if (!activeVocabWord) return;
  var w = activeVocabWord,
    article = targetArticle(w),
    german = targetText(w),
    english = sourceText(w);
  $("#vocab-feedback").textContent =
    vocabMode === "translate"
      ? "Hint · Answer: " + german + (article ? " · Article: " + article : "")
      : vocabMode === "choice"
        ? "Hint · Answer: " +
          english +
          (article ? " · Article: " + article : "")
        : "Hint · Answer: " +
          english +
          (article ? " · Article: " + article : "");
  $("#vocab-feedback").className = "feedback hint";
}
function showMixedHint() {
  if (!mixedQuestion) return;
  var q = mixedQuestion,
    item = q.item;
  var answer;
  if (q.kind === "grammar")
    answer = "Grammar answer: " + item.test.answers.join(" / ");
  else if (q.kind === "phrase-cloze")
    answer =
      "Missing word: " +
      clozeFor(item).word +
      " · Full sentence: " +
      targetText(item);
  else if (q.kind === "phrase-reverse") answer = "Answer: " + sourceText(item);
  else if (q.kind.startsWith("phrase")) answer = "Answer: " + targetText(item);
  else if (q.kind === "vocab-translate") answer = "Answer: " + targetText(item);
  else
    answer =
      "Answer: " +
      sourceText(item) +
      (targetText(item).match(/^(der|die|das) /)?.[1]
        ? " · Article: " + targetText(item).match(/^(der|die|das) /)[1]
        : "");
  $("#mixed-feedback").textContent = "Hint · " + answer;
  $("#mixed-feedback").className = "feedback hint";
}
$$('[id$="vocab-hint"]').forEach((button) => (button.onclick = showVocabHint));
document.querySelector("#mixed-hint-button").onclick = showMixedHint;
updateDirectionLabels();
var vocabularyCheckButtons = [
  document.querySelector("#check-vocab"),
  document.querySelector("#verbs-check-vocab"),
  document.querySelector("#adjectives-check-vocab"),
].filter(Boolean);
vocabularyCheckButtons.forEach((button) => (button.onclick = checkVocab));
var vocabularyInputs = [
  document.querySelector("#vocab-answer"),
  document.querySelector("#verbs-vocab-answer"),
  document.querySelector("#adjectives-vocab-answer"),
].filter(Boolean);
vocabularyInputs.forEach(
  (input) =>
    (input.onkeydown = (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (vocabAnswered && vocabCorrect) nextVocab();
      else checkVocab();
    }),
);
document.addEventListener("keydown", (e) => {
  var keyArticles = { 1: "der", 2: "die", 3: "das" },
    root =
      document.querySelector("#verbs-view.active-view") ||
      document.querySelector("#vocabulary-view.active-view");
  if (!root || !keyArticles[e.key]) return;
  var choices = root.querySelector('[id$="article-choices"]');
  if (!choices || choices.style.display === "none") return;
  e.preventDefault();
  var button = choices.querySelector(`[data-article="${keyArticles[e.key]}"]`);
  if (button) button.click();
});
document.querySelector("#reset-progress").onclick = () => {
  if (confirm("Reset progress for this language pair?")) {
    var all = JSON.parse(localStorage.getItem("wortwerk-progress") || "{}");
    delete all[progressKey()];
    localStorage.setItem("wortwerk-progress", JSON.stringify(all));
    state = emptyProgress();
    updateStats();
    renderVocabulary();
    renderIssues();
    toast("Progress reset.");
  }
};
