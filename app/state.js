var defaultPreferences = () => ({
  vocabLevels: ["A1", "A2", "B1"],
  selectedCategory: "all",
  selectedCategories: ["all"],
  phraseCategory: "all",
  phraseCategories: ["all"],
  vocabMode: "translate",
  phraseDirection: "translate",
  phraseCloze: false,
  phraseMultipleChoice: false,
  randomMode: true,
  phraseRandom: true,
  hideVocabularyAnswers: true,
  grammarGrid: false,
});
var emptyProgress = () => ({
  learned: [],
  issues: [],
  mistakes: [],
  articleOnlyMistakes: [],
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
  ["learned", "issues", "mistakes", "articleOnlyMistakes", "phrases", "lessons"].forEach((key) => {
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
  var preferences = {
    ...defaultPreferences(),
    ...(value.preferences && typeof value.preferences === "object" ? value.preferences : {}),
  };
  var legacyLevel = preferences.vocabLevel;
  preferences.vocabLevels = Array.isArray(preferences.vocabLevels)
    ? preferences.vocabLevels.filter(level => ["A1", "A2", "B1"].includes(level))
    : ["A1", "A2", "B1"].includes(legacyLevel) ? [legacyLevel] : ["A1", "A2", "B1"];
  preferences.vocabLevels = [...new Set(preferences.vocabLevels)];
  if (!preferences.vocabLevels.length) preferences.vocabLevels = ["A1", "A2", "B1"];
  delete preferences.vocabLevel;
  if (!["meaning", "translate", "choice"].includes(preferences.vocabMode)) preferences.vocabMode = "translate";
  if (!["translate", "reverse"].includes(preferences.phraseDirection)) preferences.phraseDirection = "translate";
  preferences.phraseCloze = Boolean(preferences.phraseCloze);
  preferences.phraseMultipleChoice = Boolean(preferences.phraseMultipleChoice);
  ["randomMode", "phraseRandom", "hideVocabularyAnswers", "grammarGrid"].forEach(key => preferences[key] = Boolean(preferences[key]));
  ["selectedCategory", "phraseCategory"].forEach(key => preferences[key] = typeof preferences[key] === "string" ? preferences[key] : defaultPreferences()[key]);
  if (!categoryRecords.some(record => record.id === preferences.selectedCategory)) preferences.selectedCategory = "all";
  if (preferences.phraseCategory !== "all" && !contentManifest.phrases[preferences.phraseCategory]) preferences.phraseCategory = "all";
  preferences.selectedCategories = Array.isArray(preferences.selectedCategories)
    ? preferences.selectedCategories.filter(key => categoryRecords.some(record => record.id === key))
    : [preferences.selectedCategory];
  preferences.phraseCategories = Array.isArray(preferences.phraseCategories)
    ? preferences.phraseCategories.filter(key => key === "all" || contentManifest.phrases[key])
    : [preferences.phraseCategory];
  if (!preferences.selectedCategories.length) preferences.selectedCategories = ["all"];
  if (!preferences.phraseCategories.length) preferences.phraseCategories = ["all"];
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
function recordMistake(id, articleOnly = false) {
  if (articleOnly && !state.mistakes.includes(id)) {
    if (!state.articleOnlyMistakes.includes(id)) state.articleOnlyMistakes.push(id);
    return;
  }
  if (!state.mistakes.includes(id)) state.mistakes.push(id);
  state.articleOnlyMistakes = state.articleOnlyMistakes.filter(item => item !== id);
}
function toggleCategorySelection(selection, allKey, keys, key) {
  if (key === allKey) return [allKey];
  if (selection.includes(allKey)) return keys.filter((id) => id !== allKey && id !== key);
  return selection.includes(key)
    ? selection.filter((id) => id !== key)
    : [...selection, key];
}
var state = loadProgress();
function savePreferences() {
  state.preferences = normalizeProgress({ preferences: {
    vocabLevels: selectedLevels,
    selectedCategory,
    selectedCategories,
    phraseCategory,
    phraseCategories,
    vocabMode,
    phraseDirection,
    phraseCloze,
    phraseMultipleChoice,
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
  selectedCategories = state.preferences.selectedCategories,
  activeVocabWord = null,
  vocabIndex = 0,
  selectedLevels = state.preferences.vocabLevels,
  vocabLevel = "all",
  phraseIndex = 0,
  phraseLevel = "all",
  phraseCategory = state.preferences.phraseCategory,
  phraseCategories = state.preferences.phraseCategories,
  phraseDirection = state.preferences.phraseDirection,
  phraseCloze = state.preferences.phraseCloze,
  phraseMultipleChoice = state.preferences.phraseMultipleChoice,
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
