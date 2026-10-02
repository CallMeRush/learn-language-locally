var defaultPreferences = () => ({
  vocabLevels: ["A1", "A2", "B1"],
  selectedCategory: "all",
  phraseCategory: "all",
  vocabMode: "translate",
  phraseMode: "translate",
  randomMode: true,
  phraseRandom: true,
  hideVocabularyAnswers: true,
  grammarGrid: false,
});
var emptyProgress = () => ({
  learned: [],
  issues: [],
  phrases: [],
  correct: 0,
  attempts: 0,
  lessons: [],
  lessonHistory: {},
  lessonSession: null,
  preferences: defaultPreferences(),
});
// A new corpus must not interpret old IDs as learned words or completed lessons.
// Previous progress remains stored under its own key, but is not loaded here.
var progressKey = () => "en-de-deck-efd235e6-v1";
function progressStore() {
  try {
    var value = JSON.parse(localStorage.getItem("wortwerk-progress") || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}
function normalizeProgress(progress) {
  var value = progress && typeof progress === "object" && !Array.isArray(progress)
    ? { ...progress }
    : emptyProgress();
  ["learned", "issues", "phrases", "lessons"].forEach((key) => {
    value[key] = Array.isArray(value[key]) ? [...new Set(value[key].filter((id) => typeof id === "string"))] : [];
  });
  ["correct", "attempts"].forEach((key) => {
    value[key] = Number.isFinite(value[key]) && value[key] >= 0 ? value[key] : 0;
  });
  delete value.streak;
  delete value.lastStudy;
  value.lessonHistory = value.lessonHistory && typeof value.lessonHistory === "object" && !Array.isArray(value.lessonHistory)
    ? Object.fromEntries(Object.entries(value.lessonHistory).filter(([, record]) => record && typeof record === "object" && typeof record.completedAt === "string"))
    : {};
  value.lessonSession = value.lessonSession && typeof value.lessonSession === "object" ? value.lessonSession : null;
  var preferences = { ...defaultPreferences(), ...(value.preferences && typeof value.preferences === "object" ? value.preferences : {}) };
  var legacyLevel = preferences.vocabLevel;
  preferences.vocabLevels = Array.isArray(preferences.vocabLevels)
    ? preferences.vocabLevels.filter(level => ["A1", "A2", "B1"].includes(level))
    : ["A1", "A2", "B1"].includes(legacyLevel) ? [legacyLevel] : ["A1", "A2", "B1"];
  preferences.vocabLevels = [...new Set(preferences.vocabLevels)];
  if (!preferences.vocabLevels.length) preferences.vocabLevels = ["A1", "A2", "B1"];
  delete preferences.vocabLevel;
  if (!["meaning", "translate", "choice"].includes(preferences.vocabMode)) preferences.vocabMode = "translate";
  if (!["translate", "reverse", "cloze", "choice"].includes(preferences.phraseMode)) preferences.phraseMode = "translate";
  ["randomMode", "phraseRandom", "hideVocabularyAnswers", "grammarGrid"].forEach(key => preferences[key] = Boolean(preferences[key]));
  ["selectedCategory", "phraseCategory"].forEach(key => preferences[key] = typeof preferences[key] === "string" ? preferences[key] : defaultPreferences()[key]);
  if (!categoryRecords.some(record => record.id === preferences.selectedCategory)) preferences.selectedCategory = "all";
  if (preferences.phraseCategory !== "all" && !contentManifest.phrases[preferences.phraseCategory]) preferences.phraseCategory = "all";
  value.preferences = preferences;
  return value;
}
function loadProgress() {
  return normalizeProgress(progressStore()[progressKey()]);
}
function progressExportPayload() {
  return {
    format: "wortwerk-progress",
    version: 1,
    profile: progressKey(),
    exportedAt: new Date().toISOString(),
    progress: normalizeProgress(state),
  };
}
function progressFromExport(text) {
  var payload;
  try { payload = JSON.parse(text); } catch { throw Error("The selected file is not valid JSON."); }
  if (payload?.format !== "wortwerk-progress" || payload.version !== 1) throw Error("This is not a Wortwerk progress export.");
  if (payload.profile !== progressKey()) throw Error("This export belongs to a different learning deck.");
  return normalizeProgress(payload.progress);
}
function resolveIssue(id) {
  state.issues = state.issues.filter((issue) => issue !== id);
}
var state = loadProgress();
function savePreferences() {
  state.preferences = normalizeProgress({ preferences: {
    vocabLevels: selectedLevels,
    selectedCategory,
    phraseCategory,
    vocabMode,
    phraseMode,
    randomMode,
    phraseRandom,
    hideVocabularyAnswers,
    grammarGrid,
  } }).preferences;
  save();
}
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
var selectedCategory = state.preferences.selectedCategory,
  activeVocabWord = null,
  vocabIndex = 0,
  selectedLevels = state.preferences.vocabLevels,
  vocabLevel = "all",
  vocabStatus = "unseen",
  phraseIndex = 0,
  phraseLevel = "all",
  phraseCategory = state.preferences.phraseCategory,
  phraseMode = state.preferences.phraseMode,
  vocabMode = state.preferences.vocabMode,
  selectedArticle = "",
  selectedVocabChoice = "",
  selectedPhraseChoice = "",
  mixedLevel = state.preferences.vocabLevels,
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
  randomMode = state.preferences.randomMode,
  phraseRandom = state.preferences.phraseRandom,
  vocabAnswered = false,
  vocabCorrect = false,
  phraseAnswered = false,
  phraseCorrect = false;
var allStudyLevels = ["A1", "A2", "B1"];
function levelSelected(level) {
  return selectedLevels.includes(level);
}
function setSelectedLevels(levels) {
  var next = Array.isArray(levels) ? levels : [levels];
  selectedLevels = allStudyLevels.filter(level => next.includes(level));
  if (!selectedLevels.length) selectedLevels = [...allStudyLevels];
  vocabLevel = selectedLevels.length === allStudyLevels.length ? "all" : selectedLevels[0];
  mixedLevel = [...selectedLevels];
  phraseLevel = selectedLevels.length === allStudyLevels.length ? "all" : { A1: "easy", A2: "medium", B1: "hard" }[selectedLevels[0]];
}
function toggleStudyLevel(level) {
  if (level === "all") return setSelectedLevels(allStudyLevels);
  if (selectedLevels.length === allStudyLevels.length) return setSelectedLevels([level]);
  if (selectedLevels.includes(level) && selectedLevels.length > 1)
    return setSelectedLevels(selectedLevels.filter(item => item !== level));
  if (!selectedLevels.includes(level)) return setSelectedLevels([...selectedLevels, level]);
}
setSelectedLevels(selectedLevels);
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
function updateVocabCheckButton() {
  var button = document.querySelector("#" + vocabularyViewPrefix() + "check-vocab");
  if (!button) return;
  button.innerHTML = vocabCorrect ? "Next word <span>→</span>" : "Check answer <span>↵</span>";
  button.onclick = vocabCorrect ? nextVocab : checkVocab;
}
var mainVocabularyView = document.querySelector("#vocabulary-view");
mainVocabularyView.querySelector(".page-heading p:last-child")?.remove();
var
  verbsView = mainVocabularyView.cloneNode(true);
verbsView.id = "verbs-view";
verbsView.classList.remove("active-view");
verbsView.querySelectorAll("[id]").forEach((element) => {
  element.id = "verbs-" + element.id;
});
mainVocabularyView.after(verbsView);
var adjectivesView = mainVocabularyView.cloneNode(true);
adjectivesView.id = "adjectives-view";
adjectivesView.classList.remove("active-view");
adjectivesView.querySelectorAll("[id]").forEach(element => {
  element.id = "adjectives-" + element.id;
});
verbsView.after(adjectivesView);
var hideVocabularyAnswers = state.preferences.hideVocabularyAnswers,
  grammarGrid = state.preferences.grammarGrid;
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
    '<label class="toggle-label hide-answer-toggle"><input type="checkbox" data-hide-vocabulary-answer><span class="toggle-switch"></span> Hide answer</label>');
  panel.querySelector(".article-choices").insertAdjacentHTML("beforeend",
    '<button type="button" class="subtle-btn article-hint-btn" data-vocab-article-hint>Article hint</button>');
  panel.querySelector("[data-hide-vocabulary-answer]").onchange = event => {
    hideVocabularyAnswers = event.target.checked;
    renderVocabularyList();
    savePreferences();
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
