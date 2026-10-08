var defaultPreferences = () => ({
  vocabLevels: ["A1", "A2", "B1"],
  selectedCategory: "all",
  selectedCategories: ["all"],
  phraseCategory: "all",
  phraseCategories: ["all"],
  studyDirection: "toGerman",
  vocabMultipleChoice: false,
  phraseCloze: false,
  phraseMultipleChoice: false,
  mixedParts: {
    vocabulary: true,
    verbs: true,
    adjectives: true,
    phrases: true,
    grammar: true,
  },
  mixedStyles: ["write", "choice", "cloze"],
  mixedVocabularyCategories: ["all"],
  mixedVerbCategories: ["verbs"],
  mixedAdjectiveCategories: ["adjectives"],
  mixedPhraseCategories: ["all"],
  applicationGrammarId: "grammar-de-3",
  applicationCases: ["nominative", "accusative", "dative", "genitive"],
  applicationArticleTypes: ["definite", "indefinite"],
  applicationSeparablePrefixes: ["all"],
  applicationPrepositionCases: ["accusative", "dative"],
  applicationPrepositions: ["all"],
  applicationMultipleChoice: false,
  randomMode: true,
  grammarGrid: false,
  issueReviewModes: ["write", "choice", "cloze"],
  colorAccent: "green",
  colorBackground: "light",
});
var emptyProgress = () => ({
  learned: [],
  issues: [],
  mistakes: [],
  hinted: [],
  articleOnlyMistakes: [],
  phrases: [],
  phraseMistakes: [],
  hintedPhrases: [],
  choiceProgress: {
    learned: [],
    issues: [],
    mistakes: [],
    hinted: [],
    articleOnlyMistakes: [],
    phrases: [],
    phraseMistakes: [],
    hintedPhrases: [],
  },
  grammarApplied: [],
  grammarApplicationMistakes: [],
  grammarApplicationHints: [],
  grammarApplicationChoiceProgress: {
    applied: [],
    mistakes: [],
    hints: [],
  },
  issueQuarantine: [],
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
    "hinted",
    "articleOnlyMistakes",
    "phrases",
    "phraseMistakes",
    "hintedPhrases",
    "lessons",
    "grammarApplied",
    "grammarApplicationMistakes",
    "grammarApplicationHints",
  ].forEach((key) => {
    value[key] = Array.isArray(value[key])
      ? [...new Set(value[key].filter((id) => typeof id === "string"))]
      : [];
  });
  value.issueQuarantine = Array.isArray(value.issueQuarantine)
    ? value.issueQuarantine.filter(
        (entry) =>
          entry &&
          typeof entry === "object" &&
          typeof entry.key === "string" &&
          typeof entry.type === "string" &&
          typeof entry.id === "string",
      )
    : [];
  var choiceProgress =
    value.choiceProgress &&
    typeof value.choiceProgress === "object" &&
    !Array.isArray(value.choiceProgress)
      ? value.choiceProgress
      : {};
  [
    "learned",
    "issues",
    "mistakes",
    "hinted",
    "articleOnlyMistakes",
    "phrases",
    "phraseMistakes",
    "hintedPhrases",
  ].forEach((key) => {
    choiceProgress[key] = Array.isArray(choiceProgress[key])
      ? [...new Set(choiceProgress[key].filter((id) => typeof id === "string"))]
      : [];
  });
  value.choiceProgress = choiceProgress;
  var applicationChoiceProgress =
    value.grammarApplicationChoiceProgress &&
    typeof value.grammarApplicationChoiceProgress === "object" &&
    !Array.isArray(value.grammarApplicationChoiceProgress)
      ? value.grammarApplicationChoiceProgress
      : {};
  ["applied", "mistakes", "hints"].forEach((key) => {
    applicationChoiceProgress[key] = Array.isArray(
      applicationChoiceProgress[key],
    )
      ? [
          ...new Set(
            applicationChoiceProgress[key].filter(
              (id) => typeof id === "string",
            ),
          ),
        ]
      : [];
  });
  value.grammarApplicationChoiceProgress = applicationChoiceProgress;
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
  var savedPreferences =
      value.preferences && typeof value.preferences === "object"
        ? value.preferences
        : {},
    preferences = {
      ...defaultPreferences(),
      ...savedPreferences,
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
  if (!Object.hasOwn(savedPreferences, "studyDirection"))
    preferences.studyDirection =
      savedPreferences.vocabMode === "meaning" ||
      savedPreferences.phraseDirection === "reverse" ||
      savedPreferences.mixedDirections?.includes("toEnglish")
        ? "toEnglish"
        : "toGerman";
  if (!["toGerman", "toEnglish"].includes(preferences.studyDirection))
    preferences.studyDirection = "toGerman";
  if (savedPreferences.vocabMode === "choice")
    preferences.vocabMultipleChoice = true;
  delete preferences.vocabMode;
  delete preferences.phraseDirection;
  delete preferences.mixedDirections;
  preferences.vocabMultipleChoice = Boolean(preferences.vocabMultipleChoice);
  preferences.phraseCloze = Boolean(preferences.phraseCloze);
  preferences.phraseMultipleChoice = Boolean(preferences.phraseMultipleChoice);
  preferences.issueReviewModes = Array.isArray(preferences.issueReviewModes)
    ? [
        ...new Set(
          preferences.issueReviewModes.filter((mode) =>
            ["write", "choice", "cloze"].includes(mode),
          ),
        ),
      ]
    : [...defaultPreferences().issueReviewModes];
  if (
    !grammarLessons.some(
      (lesson) => lesson.id === preferences.applicationGrammarId,
    )
  )
    preferences.applicationGrammarId = "grammar-de-3";
  delete preferences.applicationQueue;
  delete preferences.applicationAskGender;
  preferences.applicationCases = Array.isArray(preferences.applicationCases)
    ? [
        ...new Set(
          preferences.applicationCases.filter((value) =>
            ["nominative", "accusative", "dative", "genitive"].includes(value),
          ),
        ),
      ]
    : [...defaultPreferences().applicationCases];
  preferences.applicationArticleTypes = Array.isArray(
    preferences.applicationArticleTypes,
  )
    ? [
        ...new Set(
          preferences.applicationArticleTypes.filter((value) =>
            ["definite", "indefinite"].includes(value),
          ),
        ),
      ]
    : [...defaultPreferences().applicationArticleTypes];
  var separablePrefixes = [
    ...new Set(
      grammarApplications
        .filter((record) => record.set === "separable")
        .map((record) => record.exercise.answer),
    ),
  ];
  preferences.applicationSeparablePrefixes = Array.isArray(
    preferences.applicationSeparablePrefixes,
  )
    ? [
        ...new Set(
          preferences.applicationSeparablePrefixes.filter(
            (prefix) => prefix === "all" || separablePrefixes.includes(prefix),
          ),
        ),
      ]
    : [...defaultPreferences().applicationSeparablePrefixes];
  var applicationPrepositions = [
    ...new Set(
      grammarApplications
        .filter((record) => record.set === "prepositions")
        .map((record) => record.exercise.preposition),
    ),
  ];
  preferences.applicationPrepositionCases = Array.isArray(
    preferences.applicationPrepositionCases,
  )
    ? preferences.applicationPrepositionCases.filter((value) =>
        ["accusative", "dative"].includes(value),
      )
    : [...defaultPreferences().applicationPrepositionCases];
  preferences.applicationPrepositions = Array.isArray(
    preferences.applicationPrepositions,
  )
    ? [
        ...new Set(
          preferences.applicationPrepositions.filter(
            (value) =>
              value === "all" || applicationPrepositions.includes(value),
          ),
        ),
      ]
    : [...defaultPreferences().applicationPrepositions];
  preferences.applicationMultipleChoice = Boolean(
    preferences.applicationMultipleChoice,
  );
  preferences.mixedParts = Object.fromEntries(
    ["vocabulary", "verbs", "adjectives", "phrases", "grammar"].map((key) => [
      key,
      Boolean(preferences.mixedParts?.[key]),
    ]),
  );
  var mixedKeys = {
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
  delete preferences.hideVocabularyAnswers;
  ["randomMode", "grammarGrid"].forEach(
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
function vocabularyProgress() {
  return vocabMultipleChoice ? state.choiceProgress : state;
}
function phraseProgress() {
  return phraseMultipleChoice ? state.choiceProgress : state;
}
function allIssueIds() {
  return [...new Set([...state.issues, ...state.choiceProgress.issues, ...state.grammarApplicationMistakes.filter((id) => !state.grammarApplied.includes(id)), ...state.grammarApplicationChoiceProgress.mistakes.filter((id) => !state.grammarApplicationChoiceProgress.applied.includes(id))])];
}
function removeIssueQuarantine(type, id) {
  state.issueQuarantine = (state.issueQuarantine || []).filter(
    (entry) => entry.type !== type || entry.id !== id,
  );
}
function resolveIssue(id, progress = state) {
  progress.issues = progress.issues.filter((issue) => issue !== id);
}
function clearIssue(id) {
  resolveIssue(id, state);
  resolveIssue(id, state.choiceProgress);
}
function recordMistake(id, articleOnly = false, progress = state) {
  if (articleOnly && !progress.mistakes.includes(id)) {
    if (!progress.articleOnlyMistakes.includes(id))
      progress.articleOnlyMistakes.push(id);
    return;
  }
  if (!progress.mistakes.includes(id)) progress.mistakes.push(id);
  progress.articleOnlyMistakes = progress.articleOnlyMistakes.filter(
    (item) => item !== id,
  );
}
function recordPhraseMistake(id, progress = state) {
  if (!progress.phraseMistakes.includes(id)) progress.phraseMistakes.push(id);
}
function recordHint(id, progress = state) {
  if (!progress.hinted.includes(id)) progress.hinted.push(id);
}
function recordPhraseHint(id, progress = state) {
  if (!progress.hintedPhrases.includes(id)) progress.hintedPhrases.push(id);
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
  var next = selection.includes(key)
    ? selection.filter((id) => id !== key)
    : [...selection, key];
  return keys.filter((id) => id !== allKey).every((id) => next.includes(id))
    ? [allKey]
    : next;
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
      studyDirection,
      vocabMultipleChoice,
      phraseCloze,
      phraseMultipleChoice,
      mixedParts,
      mixedStyles,
      mixedVocabularyCategories,
      mixedVerbCategories,
      mixedAdjectiveCategories,
      mixedPhraseCategories,
      applicationGrammarId,
      applicationCases,
      applicationArticleTypes,
      applicationSeparablePrefixes,
      applicationPrepositionCases,
      applicationPrepositions,
      applicationMultipleChoice,
      randomMode,
      grammarGrid,
      issueReviewModes,
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
  $$("[data-study-direction]").forEach((button) => {
    button.textContent =
      studyDirection === "toGerman" ? "English → German" : "German → English";
    button.setAttribute("aria-pressed", String(studyDirection === "toGerman"));
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
  studyDirection = state.preferences.studyDirection,
  phraseDirection = studyDirection === "toEnglish" ? "reverse" : "translate",
  phraseCloze = state.preferences.phraseCloze,
  phraseMultipleChoice = state.preferences.phraseMultipleChoice,
  vocabMode = studyDirection === "toEnglish" ? "meaning" : "translate",
  vocabMultipleChoice = state.preferences.vocabMultipleChoice,
  selectedArticle = "",
  selectedVocabChoice = "",
  selectedPhraseChoice = "",
  mixedLevel = state.preferences.vocabLevels,
  mixedParts = state.preferences.mixedParts,
  mixedDirections = [studyDirection],
  mixedStyles = state.preferences.mixedStyles,
  mixedVocabularyCategories = state.preferences.mixedVocabularyCategories,
  mixedVerbCategories = state.preferences.mixedVerbCategories,
  mixedAdjectiveCategories = state.preferences.mixedAdjectiveCategories,
  mixedPhraseCategories = state.preferences.mixedPhraseCategories,
  applicationGrammarId = state.preferences.applicationGrammarId,
  applicationCases = state.preferences.applicationCases,
  applicationArticleTypes = state.preferences.applicationArticleTypes,
  applicationSeparablePrefixes = state.preferences.applicationSeparablePrefixes,
  applicationPrepositionCases = state.preferences.applicationPrepositionCases,
  applicationPrepositions = state.preferences.applicationPrepositions,
  applicationMultipleChoice = state.preferences.applicationMultipleChoice,
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
  issueReviewModes = state.preferences.issueReviewModes,
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
function setStudyDirection(direction) {
  studyDirection = direction === "toEnglish" ? "toEnglish" : "toGerman";
  vocabMode = studyDirection === "toEnglish" ? "meaning" : "translate";
  phraseDirection = studyDirection === "toEnglish" ? "reverse" : "translate";
  mixedDirections = [studyDirection];
  updateDirectionLabels();
  if (document.querySelector("#vocabulary-view.active-view"))
    showVocabCard(true);
  else if (document.querySelector("#phrases-view.active-view"))
    showPhrase(true);
  else if (document.querySelector("#mixed-view.active-view"))
    refreshMixedSession();
  savePreferences();
}
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
var grammarGrid = state.preferences.grammarGrid,
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
    .querySelector(".article-choices")
    .insertAdjacentHTML(
      "beforeend",
      '<button type="button" class="subtle-btn article-hint-btn" data-vocab-article-hint aria-keyshortcuts="4">Article hint · 4</button>',
    );
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
  grammarTestHints = {},
  grammarExampleState = {},
  grammarExampleEnglishVisible = {};
