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
var selectedCategory = categoryRecords.filter(record => vocab.some(word => word.category === record.id && !['verb','adjective'].includes(word.pos)))
    .sort((a,b) => (a.studyOrder ?? 999) - (b.studyOrder ?? 999))[0]?.id || "greetings",
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
var isAdjectiveView = () => !!document.querySelector("#adjectives-view.active-view");
var vocabularyViewPrefix = () => isVerbView() ? "verbs-" : isAdjectiveView() ? "adjectives-" : "";
var $ = (s) => {
    if (s.startsWith("#") && vocabScopedIds.has(s.slice(1))) {
      var prefix = vocabularyViewPrefix();
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
var adjectivesView = mainVocabularyView.cloneNode(true);
adjectivesView.id = "adjectives-view";
adjectivesView.classList.remove("active-view");
adjectivesView.querySelectorAll("[id]").forEach(element => {
  element.id = "adjectives-" + element.id;
});
adjectivesView.querySelector(".page-heading h1").textContent = "Adjectives";
adjectivesView.querySelector(".page-heading p:last-child").textContent =
  "Describe people, feelings and the world around you. Practise adjectives grouped by meaning.";
verbsView.after(adjectivesView);
var hideVocabularyAnswers = true;
[mainVocabularyView, verbsView, adjectivesView].forEach(panel => {
  panel.querySelector(".page-heading h1").textContent = "Vocabulary";
  panel.querySelector(".page-heading").insertAdjacentHTML("afterend",
    '<div class="mode-switch vocabulary-kinds" role="group" aria-label="Vocabulary type">' +
    '<button data-vocabulary-kind="vocabulary">Nouns</button>' +
    '<button data-vocabulary-kind="verbs">Verbs</button>' +
    '<button data-vocabulary-kind="adjectives">Adjectives</button></div>');
  panel.querySelectorAll("[data-vocabulary-kind]").forEach(button => {
    button.onclick = () => setView(button.dataset.vocabularyKind);
  });
  panel.querySelector(".heading-actions").insertAdjacentHTML("beforeend",
    '<label class="toggle-label hide-answer-toggle"><input type="checkbox" data-hide-vocabulary-answer checked><span class="toggle-switch"></span> Hide answer</label>');
  panel.querySelector("[data-hide-vocabulary-answer]").onchange = event => {
    hideVocabularyAnswers = event.target.checked;
    renderVocabularyList();
  };
});
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
