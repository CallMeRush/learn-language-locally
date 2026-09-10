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
// A new corpus must not interpret old IDs as learned words or completed lessons.
// Previous progress remains stored under its own key, but is not loaded here.
var progressKey = () => "en-de-deck-efd235e6-v1";
function loadProgress() {
  var all = JSON.parse(localStorage.getItem("wortwerk-progress") || "{}"),
    value = all[progressKey()] || emptyProgress();
  value.lessons = value.lessons || [];
  return value;
}
var state = loadProgress();
var translationText = (item, language) =>
  item?.translations?.[language]?.text || "";
var targetText = (item) => translationText(item, "de");
var sourceText = (item) => translationText(item, "en");
var targetMeta = (item) => item?.translations?.["de"] || {};
var targetArticle = (item) => targetMeta(item).article || "";
function updateDirectionLabels() {
  $$('.vocab-mode').forEach(button => {
    button.textContent = {meaning: 'German → English', translate: 'English → German', choice: 'Multiple choice'}[button.dataset.vocabMode];
  });
  $$('[data-practice="translate"]').forEach(b => b.textContent = 'English → German');
  $$('[data-practice="reverse"]').forEach(b => b.textContent = 'German → English');
}
document.querySelector('.crumb')?.remove();
var selectedCategory = "all",
  activeVocabWord = null,
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
