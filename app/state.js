var emptyProgress = () => ({
  learned: [],
  issues: [],
  phrases: [],
  correct: 0,
  attempts: 0,
  streak: 0,
  lastStudy: null,
  lessons: [],
});
var progressKey = () => selectedSourceLanguage + "-" + selectedTargetLanguage;
function loadProgress() {
  var all = JSON.parse(localStorage.getItem("wortwerk-progress") || "{}"),
    value = all[progressKey()] || emptyProgress();
  value.lessons = value.lessons || [];
  return value;
}
var state = loadProgress();
var translationText = (item, language) =>
  item?.translations?.[language]?.text || "";
var targetText = (item) => translationText(item, selectedTargetLanguage);
var sourceText = (item) => translationText(item, selectedSourceLanguage);
var targetMeta = (item) => item?.translations?.[selectedTargetLanguage] || {};
var targetArticle = (item) => targetMeta(item).article || "";
var languageControls = document.querySelector(".top-actions");
languageControls.insertAdjacentHTML(
  "afterbegin",
  '<div class="language-pair-controls"><label>From <select id="source-language"><option value="en">English</option><option value="de">German</option><option value="it">Italian</option></select></label><button type="button" id="swap-languages" title="Swap source and target">⇄</button><label>To <select id="target-language"><option value="de">German</option><option value="it">Italian</option><option value="en">English</option></select></label></div>',
);
document.querySelector("#source-language").value = selectedSourceLanguage;
document.querySelector("#target-language").value = selectedTargetLanguage;
function localizeInterface() {
  var t = interfaceText[selectedSourceLanguage];
  var nav = {
    dashboard: t.overview,
    grammar: t.grammar,
    vocabulary: t.vocabulary,
    verbs: t.verbs,
    phrases: t.phrases,
    mixed: t.mixed,
    lessons: t.lessons,
    issues: t.issues,
  };
  $$(".nav-item").forEach((button) => {
    var label = nav[button.dataset.view];
    if (label) {
      var badge = button.querySelector("b");
      button.textContent = "";
      button.append(document.createTextNode(label));
      if (badge) button.append(badge);
    }
  });
  $("#reset-progress").textContent = t.reset;
  $("#random-vocab").innerHTML = t.newWord + " <span>↻</span>";
  $$(".toggle-label").forEach((label) => {
    if (label.querySelector("#global-random-mode"))
      label.lastChild.textContent = " " + t.random;
  });
  var pair = document.querySelector(".language-pair-controls");
  if (pair) {
    pair.querySelector("label:first-child").firstChild.textContent =
      t.from + " ";
    pair.querySelector("label:last-child").firstChild.textContent = t.to + " ";
  }
  document.title = "Wortwerk — " + t.vocabulary;
  document.documentElement.lang = selectedSourceLanguage;
}
function updateDirectionLabels() {
  localizeInterface();
  var source = languagePairs[selectedSourceLanguage].name,
    target = languagePairs[selectedTargetLanguage].name;
  $$('.vocab-mode[data-vocab-mode="meaning"]').forEach(
    (b) => (b.textContent = target + " → " + source),
  );
  $$('.vocab-mode[data-vocab-mode="translate"]').forEach(
    (b) => (b.textContent = source + " → " + target),
  );
  $$('[data-practice="translate"]').forEach(
    (b) => (b.textContent = source + " → " + target),
  );
  $$('[data-practice="reverse"]').forEach(
    (b) => (b.textContent = target + " → " + source),
  );
  if (phraseMode === "reverse")
    $("#phrase-hint").textContent =
      interfaceText[selectedSourceLanguage].translate + " " + source + ".";
  else if (phraseMode === "translate")
    $("#phrase-hint").textContent =
      interfaceText[selectedSourceLanguage].translate + " " + target + ".";
  if (mixedQuestion) {
    var kind = mixedQuestion.kind;
    if (kind === "vocab-translate" || kind === "phrase-translate")
      $("#mixed-hint").textContent =
        interfaceText[selectedSourceLanguage].translate + " " + target + ".";
    else if (kind === "vocab-meaning" || kind === "vocab-choice")
      $("#mixed-hint").textContent =
        interfaceText[selectedSourceLanguage].meaning;
    else if (kind === "phrase-choice")
      $("#mixed-hint").textContent =
        interfaceText[selectedSourceLanguage].translate + " " + target + ".";
    if (kind.startsWith("vocab"))
      $("#mixed-answer").placeholder =
        interfaceText[selectedSourceLanguage].meaning;
    else if (kind.startsWith("phrase"))
      $("#mixed-answer").placeholder =
        interfaceText[selectedSourceLanguage].translate + " " + target + "…";
  }
}
function switchLanguagePair() {
  selectedSourceLanguage = document.querySelector("#source-language").value;
  selectedTargetLanguage = document.querySelector("#target-language").value;
  if (selectedSourceLanguage === selectedTargetLanguage) {
    toast("Choose two different languages.");
    document.querySelector("#target-language").value =
      selectedTargetLanguage === "en" ? "de" : "en";
    selectedTargetLanguage = document.querySelector("#target-language").value;
  }
  var content = applyLanguagePair();
  vocab = content.vocabulary;
  phrases = content.phrases;
  lessons = content.lessons;
  grammarLessons =
    grammarByTarget[selectedTargetLanguage] || grammarByTarget.en;
  state = loadProgress();
  localStorage.setItem("wortwerk-source-language", selectedSourceLanguage);
  localStorage.setItem("wortwerk-target-language", selectedTargetLanguage);
  selectedCategory = "all";
  vocabIndex = 0;
  phraseIndex = 0;
  activeLesson = null;
  updateDirectionLabels();
  updateStats();
  renderCategories();
  renderVocabulary();
  renderPhraseCategories();
  showPhrase();
  renderGrammar();
  renderLessons();
  nextMixed();
}
document.querySelector("#source-language").onchange = switchLanguagePair;
document.querySelector("#target-language").onchange = switchLanguagePair;
document.querySelector("#swap-languages").onclick = () => {
  var source = document.querySelector("#source-language"),
    target = document.querySelector("#target-language");
  [source.value, target.value] = [target.value, source.value];
  switchLanguagePair();
};
document.querySelector(".crumb")?.remove();
var selectedCategory = "all",
  vocabIndex = 0,
  vocabLevel = "all",
  vocabStatus = "unseen",
  phraseIndex = 0,
  phraseLevel = "all",
  phraseCategory = "all",
  phraseMode = "translate",
  vocabMode = "translate",
  selectedArticle = "",
  selectedVocabChoice = "",
  selectedPhraseChoice = "",
  mixedLevel = "all",
  mixedParts = {
    vocabulary: true,
    verbs: true,
    phrases: true,
    grammar: true,
  },
  mixedQuestion = null,
  mixedArticle = "",
  mixedChoice = "",
  mixedAnswered = false,
  mixedCorrect = false,
  activeLesson = null,
  lessonPhase = "practice",
  lessonRemaining = [],
  lessonErrors = [],
  lessonReviewErrors = [],
  lessonComplete = false,
  randomMode = true,
  phraseRandom = true,
  vocabAnswered = false,
  vocabCorrect = false,
  phraseAnswered = false,
  phraseCorrect = false;
var baseCheckPhrase;
var vocabScopedIds = new Set([
  "category-tabs",
  "word-list",
  "practice-word",
  "practice-prompt",
  "article-choices",
  "vocab-answer",
  "vocab-choice-options",
  "vocab-feedback",
  "check-vocab",
  "vocab-hint",
  "next-vocab",
  "random-vocab",
  "random-mode",
]);
var isVerbView = () => !!document.querySelector("#verbs-view.active-view");
var $ = (s) => {
    if (s.startsWith("#") && vocabScopedIds.has(s.slice(1))) {
      var prefix = isVerbView() ? "verbs-" : "";
      return document.querySelector("#" + prefix + s.slice(1));
    }
    return document.querySelector(s);
  },
  $$ = (s) => [...document.querySelectorAll(s)];
var mainVocabularyView = document.querySelector("#vocabulary-view"),
  verbsView = mainVocabularyView.cloneNode(true);
verbsView.id = "verbs-view";
verbsView.classList.remove("active-view");
verbsView.querySelectorAll("[id]").forEach((element) => {
  element.id = "verbs-" + element.id;
});
verbsView.querySelector(".page-heading h1").textContent = "Verb vocabulary";
verbsView.querySelector(".page-heading p:last-child").textContent =
  "A dedicated verb desk: practice core, modal, separable, and topic-based verb families.";
mainVocabularyView.after(verbsView);
$$(".practice-panel").forEach((panel) => {
  var input = panel.querySelector('input[id$="vocab-answer"]');
  input.insertAdjacentHTML(
    "beforebegin",
    '<div class="choice-options" id="' +
      input.id.replace("vocab-answer", "vocab-choice-options") +
      '"></div>',
  );
});
var grammarTestState = {},
  grammarAnswered = {},
  grammarCorrect = {};
