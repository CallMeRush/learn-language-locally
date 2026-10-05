var defaultPreferences = () => ({
  vocabLevels: ["A1", "A2", "B1"],
  selectedCategory: "all",
  selectedCategories: ["all"],
  phraseCategory: "all",
  phraseCategories: ["all"],
  vocabMode: "translate",
  vocabMultipleChoice: false,
  phraseDirection: "translate",
  phraseCloze: false,
  phraseMultipleChoice: false,
  mixedParts: {
    vocabulary: true,
    verbs: true,
    adjectives: true,
    phrases: true,
    grammar: true,
  },
  mixedDirections: ["toGerman"],
  mixedStyles: ["write", "choice", "cloze"],
  mixedVocabularyCategories: ["all"],
  mixedVerbCategories: ["verbs"],
  mixedAdjectiveCategories: ["adjectives"],
  mixedPhraseCategories: ["all"],
  applicationGrammarId: "grammar-de-3",
  applicationQueue: "new",
  applicationAskGender: true,
  randomMode: true,
  hideVocabularyAnswers: true,
  grammarGrid: false,
  colorAccent: "green",
  colorBackground: "light",
});
var emptyProgress = () => ({
  learned: [],
  issues: [],
  mistakes: [],
  articleOnlyMistakes: [],
  phrases: [],
  grammarApplied: [],
  grammarApplicationMistakes: [],
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
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  } catch {
    return {};
  }
}
function normalizeProgress(progress) {
  var value =
    progress && typeof progress === "object" && !Array.isArray(progress)
      ? { ...progress }
      : emptyProgress();
  [
    "learned",
    "issues",
    "mistakes",
    "articleOnlyMistakes",
    "phrases",
    "lessons",
    "grammarApplied",
    "grammarApplicationMistakes",
  ].forEach((key) => {
    value[key] = Array.isArray(value[key])
      ? [...new Set(value[key].filter((id) => typeof id === "string"))]
      : [];
  });
  value.lessons = value.lessons.filter((id) =>
    lessons.some((lesson) => lesson.id === id),
  );
  ["correct", "attempts"].forEach((key) => {
    value[key] =
      Number.isFinite(value[key]) && value[key] >= 0 ? value[key] : 0;
  });
  value.lessonHistory =
    value.lessonHistory &&
    typeof value.lessonHistory === "object" &&
    !Array.isArray(value.lessonHistory)
      ? Object.fromEntries(
          Object.entries(value.lessonHistory).filter(
            ([id, record]) =>
              lessons.some((lesson) => lesson.id === id) &&
              record &&
              typeof record === "object" &&
              typeof record.completedAt === "string",
          ),
        )
      : {};
  value.lessonSession =
    value.lessonSession &&
    typeof value.lessonSession === "object" &&
    lessons.some((lesson) => lesson.id === value.lessonSession.lessonId)
      ? value.lessonSession
      : null;
  var preferences = {
    ...defaultPreferences(),
    ...(value.preferences && typeof value.preferences === "object"
      ? value.preferences
      : {}),
  };
  delete preferences.phraseRandom;
  preferences.vocabLevels = Array.isArray(preferences.vocabLevels)
    ? preferences.vocabLevels.filter((level) =>
        ["A1", "A2", "B1"].includes(level),
      )
    : ["A1", "A2", "B1"];
  preferences.vocabLevels = [...new Set(preferences.vocabLevels)];
  if (!preferences.vocabLevels.length)
    preferences.vocabLevels = ["A1", "A2", "B1"];
  if (preferences.vocabMode === "choice") {
    preferences.vocabMode = "meaning";
    preferences.vocabMultipleChoice = true;
  }
  if (!["meaning", "translate"].includes(preferences.vocabMode))
    preferences.vocabMode = "translate";
  preferences.vocabMultipleChoice = Boolean(preferences.vocabMultipleChoice);
  if (!["translate", "reverse"].includes(preferences.phraseDirection))
    preferences.phraseDirection = "translate";
  preferences.phraseCloze = Boolean(preferences.phraseCloze);
  preferences.phraseMultipleChoice = Boolean(preferences.phraseMultipleChoice);
  if (
    !grammarLessons.some(
      (lesson) => lesson.id === preferences.applicationGrammarId,
    )
  )
    preferences.applicationGrammarId = "grammar-de-3";
  if (!["all", "new", "review"].includes(preferences.applicationQueue))
    preferences.applicationQueue = "new";
  preferences.applicationAskGender = Boolean(preferences.applicationAskGender);
  preferences.mixedParts = Object.fromEntries(
    ["vocabulary", "verbs", "adjectives", "phrases", "grammar"].map((key) => [
      key,
      Boolean(preferences.mixedParts?.[key]),
    ]),
  );
  var mixedKeys = {
    mixedDirections: ["toGerman", "toEnglish"],
    mixedStyles: ["write", "choice", "cloze"],
    mixedVocabularyCategories: categoryRecords
      .filter(
        (record) =>
          record.id === "all" ||
          (!record.id.startsWith("verb-") &&
            !record.id.startsWith("adjective-") &&
            !["verbs", "adjectives"].includes(record.id)),
      )
      .map((record) => record.id),
    mixedVerbCategories: categoryRecords
      .filter(
        (record) => record.id === "verbs" || record.id.startsWith("verb-"),
      )
      .map((record) => record.id),
    mixedAdjectiveCategories: categoryRecords
      .filter(
        (record) =>
          record.id === "adjectives" || record.id.startsWith("adjective-"),
      )
      .map((record) => record.id),
    mixedPhraseCategories: ["all", ...Object.keys(contentManifest.phrases)],
  };
  Object.entries(mixedKeys).forEach(([key, allowed]) => {
    preferences[key] = Array.isArray(preferences[key])
      ? [
          ...new Set(
            preferences[key].filter((value) => allowed.includes(value)),
          ),
        ]
      : [...defaultPreferences()[key]];
    if (!preferences[key].length)
      preferences[key] = [...defaultPreferences()[key]];
  });
  preferences.mixedDirections = preferences.mixedDirections.includes("toGerman")
    ? ["toGerman"]
    : ["toEnglish"];
  ["randomMode", "hideVocabularyAnswers", "grammarGrid"].forEach(
    (key) => (preferences[key] = Boolean(preferences[key])),
  );
  if (
    ![
      "green",
      "blue",
      "plum",
      "terracotta",
      "teal",
      "indigo",
      "rose",
      "gold",
    ].includes(preferences.colorAccent)
  )
    preferences.colorAccent = "green";
  if (!["light", "dark"].includes(preferences.colorBackground))
    preferences.colorBackground = "light";
  ["selectedCategory", "phraseCategory"].forEach(
    (key) =>
      (preferences[key] =
        typeof preferences[key] === "string"
          ? preferences[key]
          : defaultPreferences()[key]),
  );
  if (
    !categoryRecords.some(
      (record) => record.id === preferences.selectedCategory,
    )
  )
    preferences.selectedCategory = "all";
  if (
    preferences.phraseCategory !== "all" &&
    !contentManifest.phrases[preferences.phraseCategory]
  )
    preferences.phraseCategory = "all";
  preferences.selectedCategories = Array.isArray(preferences.selectedCategories)
    ? preferences.selectedCategories.filter((key) =>
        categoryRecords.some((record) => record.id === key),
      )
    : [preferences.selectedCategory];
  preferences.phraseCategories = Array.isArray(preferences.phraseCategories)
    ? preferences.phraseCategories.filter(
        (key) => key === "all" || contentManifest.phrases[key],
      )
    : [preferences.phraseCategory];
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
  try {
    payload = JSON.parse(text);
  } catch {
    throw Error("The selected file is not valid JSON.");
  }
  if (payload?.format !== "wortwerk-progress" || payload.version !== 1)
    throw Error("This is not a Wortwerk progress export.");
  if (payload.profile !== progressKey())
    throw Error("This export belongs to a different learning deck.");
  return normalizeProgress(payload.progress);
}
function resolveIssue(id) {
  state.issues = state.issues.filter((issue) => issue !== id);
}
function recordMistake(id, articleOnly = false) {
  if (articleOnly && !state.mistakes.includes(id)) {
    if (!state.articleOnlyMistakes.includes(id))
      state.articleOnlyMistakes.push(id);
    return;
  }
  if (!state.mistakes.includes(id)) state.mistakes.push(id);
  state.articleOnlyMistakes = state.articleOnlyMistakes.filter(
    (item) => item !== id,
  );
}
function toggleCategorySelection(selection, allKey, keys, key) {
  if (key === allKey) return [allKey];
  if (selection.includes(allKey))
    return keys.filter((id) => id !== allKey && id !== key);
  return selection.includes(key)
    ? selection.filter((id) => id !== key)
    : [...selection, key];
}
function toggleDeskCategorySelection(selection, allKey, keys, key) {
  if (key === allKey) return selection.includes(allKey) ? [] : [allKey];
  if (selection.includes(allKey))
    return keys.filter((id) => id !== allKey && id !== key);
  return selection.includes(key)
    ? selection.filter((id) => id !== key)
    : [...selection, key];
}
var state = loadProgress();
function savePreferences() {
  state.preferences = normalizeProgress({
    preferences: {
      vocabLevels: selectedLevels,
      selectedCategory,
      selectedCategories,
      phraseCategory,
      phraseCategories,
      vocabMode,
      vocabMultipleChoice,
      phraseDirection,
      phraseCloze,
      phraseMultipleChoice,
      mixedParts,
      mixedDirections,
      mixedStyles,
      mixedVocabularyCategories,
      mixedVerbCategories,
      mixedAdjectiveCategories,
      mixedPhraseCategories,
      applicationGrammarId,
      applicationQueue,
      applicationAskGender,
      randomMode,
      hideVocabularyAnswers,
      grammarGrid,
      colorAccent,
      colorBackground,
    },
  }).preferences;
  save();
}
var translationText = (item, language) =>
  item?.translations?.[language]?.text || "";
var targetText = (item) => translationText(item, "de");
var sourceText = (item) => translationText(item, "en");
var targetMeta = (item) => item?.translations?.["de"] || {};
var targetArticle = (item) => targetMeta(item).article || "";
function updateDirectionLabels() {
  $$("[data-vocab-direction]").forEach((button) => {
    button.textContent =
      vocabMode === "translate" ? "English → German" : "German → English";
    button.classList.add("active");
  });
}
document.querySelector(".crumb")?.remove();
var selectedCategory = state.preferences.selectedCategory,
  selectedCategories = state.preferences.selectedCategories,
  activeVocabWord = null,
  vocabIndex = 0,
  selectedLevels = state.preferences.vocabLevels,
  phraseIndex = 0,
  activePhrase = null,
  phraseCategory = state.preferences.phraseCategory,
  phraseCategories = state.preferences.phraseCategories,
  phraseDirection = state.preferences.phraseDirection,
  phraseCloze = state.preferences.phraseCloze,
  phraseMultipleChoice = state.preferences.phraseMultipleChoice,
  vocabMode = state.preferences.vocabMode,
  vocabMultipleChoice = state.preferences.vocabMultipleChoice,
  selectedArticle = "",
  selectedVocabChoice = "",
  selectedPhraseChoice = "",
  mixedLevel = state.preferences.vocabLevels,
  mixedParts = state.preferences.mixedParts,
  mixedDirections = state.preferences.mixedDirections,
  mixedStyles = state.preferences.mixedStyles,
  mixedVocabularyCategories = state.preferences.mixedVocabularyCategories,
  mixedVerbCategories = state.preferences.mixedVerbCategories,
  mixedAdjectiveCategories = state.preferences.mixedAdjectiveCategories,
  mixedPhraseCategories = state.preferences.mixedPhraseCategories,
  applicationGrammarId = state.preferences.applicationGrammarId,
  applicationQueue = state.preferences.applicationQueue,
  applicationAskGender = state.preferences.applicationAskGender,
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
  vocabAnswered = false,
  vocabCorrect = false,
  phraseAnswered = false,
  phraseCorrect = false,
  vocabularyKind = "vocabulary";
var allStudyLevels = ["A1", "A2", "B1"];
function levelSelected(level) {
  return selectedLevels.includes(level);
}
function setSelectedLevels(levels) {
  var next = Array.isArray(levels) ? levels : [levels];
  selectedLevels = allStudyLevels.filter((level) => next.includes(level));
  if (!selectedLevels.length) selectedLevels = [...allStudyLevels];
  mixedLevel = [...selectedLevels];
}
function toggleStudyLevel(level) {
  if (!allStudyLevels.includes(level)) return;
  if (selectedLevels.includes(level) && selectedLevels.length > 1)
    return setSelectedLevels(selectedLevels.filter((item) => item !== level));
  if (!selectedLevels.includes(level))
    return setSelectedLevels([...selectedLevels, level]);
}
setSelectedLevels(selectedLevels);
var $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
function updateVocabCheckButton() {
  updateCheckButton(
    $("#check-vocab"),
    vocabCorrect,
    "Check answer",
    "Next word",
    checkVocab,
    nextVocab,
  );
}
var mainVocabularyView = document.querySelector("#vocabulary-view");
mainVocabularyView.querySelector(".page-heading p:last-child")?.remove();
var hideVocabularyAnswers = state.preferences.hideVocabularyAnswers,
  grammarGrid = state.preferences.grammarGrid,
  colorAccent = state.preferences.colorAccent,
  colorBackground = state.preferences.colorBackground;
function applyAppearance() {
  document.documentElement.dataset.accent = colorAccent;
  document.documentElement.dataset.background = colorBackground;
}
applyAppearance();
[mainVocabularyView].forEach((panel) => {
  panel.querySelector(".page-heading h1").textContent = "Vocabulary";
  panel
    .querySelector(".page-heading")
    .insertAdjacentHTML(
      "afterend",
      '<div class="mode-switch vocabulary-kinds" role="group" aria-label="Vocabulary type">' +
        '<button data-vocabulary-kind="vocabulary">Nouns</button>' +
        '<button data-vocabulary-kind="verbs">Verbs</button>' +
        '<button data-vocabulary-kind="adjectives">Adjectives</button></div>',
    );
  panel.querySelectorAll("[data-vocabulary-kind]").forEach((button) => {
    button.onclick = () => setView(button.dataset.vocabularyKind);
  });
  panel
    .querySelector(".heading-actions")
    .insertAdjacentHTML(
      "beforeend",
      '<label class="toggle-label hide-answer-toggle"><input type="checkbox" data-hide-vocabulary-answer><span class="toggle-switch"></span> Hide answer</label>',
    );
  panel
    .querySelector(".article-choices")
    .insertAdjacentHTML(
      "beforeend",
      '<button type="button" class="subtle-btn article-hint-btn" data-vocab-article-hint>Article hint</button>',
    );
  panel.querySelector("[data-hide-vocabulary-answer]").onchange = (event) => {
    hideVocabularyAnswers = event.target.checked;
    renderVocabularyList();
    savePreferences();
  };
});
$$(".practice-panel").forEach((panel) => {
  var input = panel.querySelector("#vocab-answer");
  input.insertAdjacentHTML(
    "beforebegin",
    '<div class="choice-options" id="vocab-choice-options"></div>',
  );
});
var grammarTestState = {},
  grammarAnswered = {},
  grammarCorrect = {},
  grammarTestMarks = {},
  grammarExampleState = {},
  grammarExampleEnglishVisible = {};
