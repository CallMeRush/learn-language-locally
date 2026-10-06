function lessonChoiceItems(kind, fallback) {
  if (!activeLesson) return fallback;
  return [
    ...new Set(
      lessonPool(activeLesson)
        .filter((question) => question.kind.startsWith(kind))
        .map((question) => question.item),
    ),
  ];
}
function mixedLevelOfPhrase(phrase) {
  return phrase.level === "easy"
    ? "A1"
    : phrase.level === "medium"
      ? "A2"
      : "B1";
}
function allMixedOptions() {
  return {
    directions: mixedDirections,
    styles: ["write", "choice", "cloze"],
    vocabularyCategories: ["all"],
    verbCategories: ["verbs"],
    adjectiveCategories: ["adjectives"],
    phraseCategories: ["all"],
  };
}
function mixedOptions() {
  return {
    directions: mixedDirections,
    styles: mixedStyles,
    vocabularyCategories: mixedVocabularyCategories,
    verbCategories: mixedVerbCategories,
    adjectiveCategories: mixedAdjectiveCategories,
    phraseCategories: mixedPhraseCategories,
  };
}
function mixedCategorySelected(selection, allKey, key) {
  return selection.includes(allKey) || selection.includes(key);
}
function mixedVocabularyRecords(levelOk, options) {
  return vocab.filter((word) => {
    if (!levelOk(word.level)) return false;
    if (word.category === "verbs")
      return mixedCategorySelected(
        options.verbCategories,
        "verbs",
        "verb-" + word.verbCategory,
      );
    if (word.pos === "adjective")
      return mixedCategorySelected(
        options.adjectiveCategories,
        "adjectives",
        "adjective-" + word.adjectiveCategory,
      );
    return mixedCategorySelected(
      options.vocabularyCategories,
      "all",
      word.category,
    );
  });
}
function mixedPhraseRecords(levelOk, options) {
  return phrases.filter(
    (phrase) =>
      levelOk(mixedLevelOfPhrase(phrase)) &&
      mixedCategorySelected(options.phraseCategories, "all", phrase.category),
  );
}
function mixedPool(
  level = mixedLevel,
  parts = mixedParts,
  options = mixedOptions(),
) {
  var levelOk = (value) =>
      Array.isArray(level)
        ? level.includes(value)
        : level === "all" || value === level,
    pool = [],
    writes = options.styles.includes("write"),
    choices = options.styles.includes("choice"),
    clozes = options.styles.includes("cloze"),
    toGerman = options.directions.includes("toGerman"),
    toEnglish = options.directions.includes("toEnglish");
  mixedVocabularyRecords(levelOk, options)
    .filter(
      (word) =>
        parts[
          word.category === "verbs"
            ? "verbs"
            : word.pos === "adjective"
              ? (parts.adjectives ?? parts.vocabulary)
              : "vocabulary"
        ],
    )
    .forEach((word) => {
      if (writes && toEnglish)
        pool.push({ kind: "vocab-meaning", level: word.level, item: word });
      if (writes && toGerman)
        pool.push({ kind: "vocab-translate", level: word.level, item: word });
      if (choices && toEnglish)
        pool.push({ kind: "vocab-choice", level: word.level, item: word });
      if (choices && toGerman)
        pool.push({
          kind: "vocab-choice-translate",
          level: word.level,
          item: word,
        });
    });
  if (parts.phrases)
    mixedPhraseRecords(levelOk, options).forEach((phrase) => {
      var phraseLevel = mixedLevelOfPhrase(phrase);
      if (writes && toGerman)
        pool.push({
          kind: "phrase-translate",
          level: phraseLevel,
          item: phrase,
        });
      if (writes && toEnglish)
        pool.push({ kind: "phrase-reverse", level: phraseLevel, item: phrase });
      if (choices && toGerman)
        pool.push({
          kind: "phrase-choice-translate",
          level: phraseLevel,
          item: phrase,
        });
      if (choices && toEnglish)
        pool.push({
          kind: "phrase-choice-reverse",
          level: phraseLevel,
          item: phrase,
        });
      if (clozes && (writes || !choices) && toGerman)
        pool.push({ kind: "phrase-cloze", level: phraseLevel, item: phrase });
      if (clozes && (writes || !choices) && toEnglish)
        pool.push({
          kind: "phrase-cloze-reverse",
          level: phraseLevel,
          item: phrase,
        });
      if (clozes && choices && toGerman)
        pool.push({ kind: "phrase-choice", level: phraseLevel, item: phrase });
      if (clozes && choices && toEnglish)
        pool.push({
          kind: "phrase-cloze-choice-reverse",
          level: phraseLevel,
          item: phrase,
        });
    });

  if (parts.grammar)
    grammarLessons
      .filter((lesson) => levelOk(lesson.level))
      .forEach((lesson) =>
        (lesson.tests || []).forEach((test) =>
          pool.push({
            kind: "grammar",
            level: lesson.level,
            item: { lesson, test },
          }),
        ),
      );
  return pool;
}
function mixedSetOptions(items, correct, property) {
  var distractors = items
    .filter((item) => item !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [correct, ...distractors]
    .sort(() => Math.random() - 0.5)
    .map((item) =>
      typeof property === "function"
        ? property(item)
        : property
          ? item[property]
          : item,
    );
}
function mixedWordForm(word) {
  var article = targetArticle(word);
  return article
    ? targetText(word).replace(new RegExp("^" + article + " "), "")
    : targetText(word);
}
function mixedPhraseAnswerLanguage(kind) {
  return [
    "phrase-reverse",
    "phrase-choice-reverse",
    "phrase-cloze-reverse",
    "phrase-cloze-choice-reverse",
  ].includes(kind)
    ? "en"
    : "de";
}
function mixedPhraseIsCloze(kind) {
  return [
    "phrase-cloze",
    "phrase-cloze-reverse",
    "phrase-choice",
    "phrase-cloze-choice-reverse",
  ].includes(kind);
}
function mixedPhraseIsChoice(kind) {
  return [
    "phrase-choice",
    "phrase-choice-translate",
    "phrase-choice-reverse",
    "phrase-cloze-choice-reverse",
  ].includes(kind);
}
function mixedExpectedAnswer(question) {
  var item = question.item;
  if (question.kind.startsWith("vocab"))
    return ["vocab-translate", "vocab-choice-translate"].includes(question.kind)
      ? mixedWordForm(item)
      : sourceText(item);
  if (question.kind.startsWith("phrase")) {
    var language = mixedPhraseAnswerLanguage(question.kind);
    return mixedPhraseIsCloze(question.kind)
      ? clozeFor(item, language).word
      : translationText(item, language);
  }
  return item.test.answers[0];
}
function nextMixed(question = null) {
  refreshArticleChoices();
  var pool = mixedPool();
  if (!question && !pool.length) return showEmptyMixed();
  mixedQuestion = question || pool[Math.floor(Math.random() * pool.length)];
  mixedAnswered = false;
  mixedCorrect = false;
  mixedArticle = "";
  mixedChoice = "";
  var q = mixedQuestion,
    item = q.item,
    typeLabels = {
      "vocab-meaning": "VOCABULARY · MEANING",
      "vocab-translate": "VOCABULARY · TRANSLATE",
      "vocab-choice": "VOCABULARY · MULTIPLE CHOICE",
      "vocab-choice-translate": "VOCABULARY · GERMAN CHOICE",
      "phrase-translate": "PHRASE · TRANSLATE",
      "phrase-reverse": "PHRASE · GERMAN → ENGLISH",
      "phrase-cloze": "PHRASE · GERMAN CLOZE",
      "phrase-cloze-reverse": "PHRASE · ENGLISH CLOZE",
      "phrase-choice": "PHRASE · GERMAN CLOZE CHOICE",
      "phrase-cloze-choice-reverse": "PHRASE · ENGLISH CLOZE CHOICE",
      "phrase-choice-translate": "PHRASE · GERMAN CHOICE",
      "phrase-choice-reverse": "PHRASE · ENGLISH CHOICE",
      grammar: "GRAMMAR",
    };
  $("#mixed-type").textContent = typeLabels[q.kind];
  $("#mixed-level-label").textContent = q.level;
  $("#mixed-feedback").textContent = "";
  $("#mixed-feedback").className = "feedback";
  $("#mixed-hint").hidden = false;
  $("#mixed-cloze").innerHTML = "";
  $("#mixed-cloze").style.display = "none";
  $("#mixed-options").innerHTML = "";
  $("#mixed-options").style.display = "none";
  $("#mixed-answer").style.display = "";
  $("#mixed-answer").disabled = false;
  $("#check-mixed").disabled = false;
  $("#mixed-answer").value = "";
  $("#mixed-article").style.display = "none";
  $$("[data-mixed-article]").forEach((button) =>
    button.classList.remove("selected"),
  );
  if (q.kind.startsWith("vocab")) {
    var article = targetArticle(item),
      word = mixedWordForm(item),
      germanAnswer = ["vocab-translate", "vocab-choice-translate"].includes(
        q.kind,
      ),
      choice = q.kind.startsWith("vocab-choice"),
      candidates = lessonChoiceItems(
        "vocab",
        mixedVocabularyRecords((value) => value === q.level, mixedOptions()),
      );
    $("#mixed-prompt").textContent = germanAnswer ? sourceText(item) : word;
    $("#mixed-hint").textContent = germanAnswer
      ? translatePrompt()
      : choice
        ? meaningPrompt()
        : article
          ? "Choose the article and type the meaning."
          : "Type the meaning.";
    if (article && germanAnswer) {
      $("#mixed-article").style.display = "flex";
      $("#mixed-article span").textContent = "Article";
    }
    if (!choice && !germanAnswer)
      $("#mixed-answer").placeholder = "Type the meaning…";
    if (!choice && germanAnswer)
      $("#mixed-answer").placeholder = "Type the answer…";
    if (choice) {
      $("#mixed-answer").style.display = "none";
      $("#mixed-options").style.display = "grid";
      mixedSetOptions(
        candidates,
        item,
        germanAnswer ? mixedWordForm : sourceText,
      ).forEach((option, index) => {
        var button = document.createElement("button");
        button.className = "choice-option";
        button.type = "button";
        button.dataset.choiceShortcut = choiceShortcutKey(index);
        button.setAttribute("aria-keyshortcuts", choiceShortcutKey(index));
        button.textContent = option;
        button.onclick = () => {
          $$("#mixed-options .choice-option").forEach((x) =>
            x.classList.remove("selected"),
          );
          button.classList.add("selected");
          mixedChoice = option;
        };
        $("#mixed-options").append(button);
      });
    }
  } else if (q.kind.startsWith("phrase")) {
    var answerLanguage = mixedPhraseAnswerLanguage(q.kind),
      clozeMode = mixedPhraseIsCloze(q.kind),
      choiceMode = mixedPhraseIsChoice(q.kind),
      phraseCandidates = lessonChoiceItems(
        "phrase",
        mixedPhraseRecords((value) => value === q.level, mixedOptions()),
      );
    $("#mixed-prompt").textContent =
      answerLanguage === "en" ? targetText(item) : sourceText(item);
    $("#mixed-hint").textContent = clozeMode
      ? ""
      : answerLanguage === "en"
        ? "Translate this into English."
        : translatePrompt();
    if (clozeMode) {
      $("#mixed-hint").hidden = true;
      var cloze = clozeFor(item, answerLanguage);
      $("#mixed-cloze").innerHTML = cloze.sentence;
      $("#mixed-cloze").style.display = "block";
      $("#mixed-answer").placeholder = "Type the missing word…";
    }
    if (choiceMode) {
      $("#mixed-answer").style.display = "none";
      $("#mixed-options").style.display = "grid";
      var options = clozeMode
        ? phraseChoiceOptions(item, cloze, phraseCandidates, answerLanguage)
        : phraseTranslationChoiceOptions(
            item,
            phraseCandidates,
            answerLanguage,
          );
      options.forEach((option, index) => {
        var button = document.createElement("button");
        button.className = "choice-option";
        button.type = "button";
        button.dataset.choiceShortcut = choiceShortcutKey(index);
        button.setAttribute("aria-keyshortcuts", choiceShortcutKey(index));
        button.textContent = option;
        button.onclick = () => {
          $$("#mixed-options .choice-option").forEach((x) =>
            x.classList.remove("selected"),
          );
          button.classList.add("selected");
          mixedChoice = option;
        };
        $("#mixed-options").append(button);
      });
    } else if (!clozeMode)
      $("#mixed-answer").placeholder =
        answerLanguage === "en"
          ? "Type the English translation…"
          : translatePrompt();
  } else {
    $("#mixed-prompt").textContent = item.test.prompt;
    $("#mixed-hint").textContent =
      item.lesson.localized.en.title + " · answer the grammar question.";
    $("#mixed-answer").placeholder = "Type your answer…";
  }
  updateMixedCheckButton();
}
function showEmptyMixed() {
  mixedQuestion = null;
  $("#mixed-type").textContent = "MIXED PRACTICE";
  $("#mixed-level-label").textContent = "—";
  $("#mixed-prompt").textContent = "Nothing in this session.";
  $("#mixed-hint").textContent =
    "Choose at least one content type, direction, and practice style with matching levels and topics.";
  $("#mixed-cloze").innerHTML = "";
  $("#mixed-options").innerHTML = "";
  $("#mixed-options").style.display = "none";
  $("#mixed-answer").value = "";
  $("#mixed-answer").style.display = "";
  $("#mixed-answer").disabled = true;
  $("#mixed-article").style.display = "none";
  $("#mixed-feedback").textContent = "";
  $("#check-mixed").disabled = true;
}
function checkMixed() {
  if (!mixedQuestion) return;
  var q = mixedQuestion,
    item = q.item,
    raw = q.kind.includes("choice")
      ? mixedChoice
      : $("#mixed-answer").value.trim(),
    article = targetArticle(item),
    articleRequired =
      q.kind.startsWith("vocab") &&
      ["vocab-translate", "vocab-choice-translate"].includes(q.kind),
    word = targetText(item)
      ? article
        ? targetText(item).replace(/^(der|die|das) /, "")
        : targetText(item)
      : "",
    articleCorrect = !articleRequired || mixedArticle === article;
  var expected = mixedExpectedAnswer(q),
    wordCorrect = q.kind.startsWith("vocab")
      ? ["vocab-translate", "vocab-choice-translate"].includes(q.kind)
        ? answerMatches(
            raw,
            expected,
            targetMeta(item).caseSensitive
              ? (value) => normalizeAnswer(value, { caseSensitive: true })
              : normalizeAnswer,
          )
        : answerIncludes(raw, expected)
      : q.kind.startsWith("phrase")
        ? answerMatches(raw, expected, (value) =>
            normalizeAnswer(value).replace(/[.,!?;:]/g, ""),
          )
        : item.test.answers.some((answer) =>
            answerMatches(raw, answer, grammarNormalize),
          );
  var ok = articleCorrect && wordCorrect;
  mixedAnswered = true;
  mixedCorrect = ok;
  state.attempts++;
  if (ok) {
    var assisted = q.kind.startsWith("vocab")
      ? state.hinted.includes(item.id)
      : q.kind.startsWith("phrase")
        ? state.hintedPhrases.includes(item.id)
        : false;
    state.correct++;
    if (q.kind.startsWith("vocab") && !state.learned.includes(item.id))
      state.learned.push(item.id);
    if (q.kind.startsWith("phrase") && !state.phrases.includes(item.id))
      state.phrases.push(item.id);
    if (q.kind.startsWith("vocab") || q.kind.startsWith("phrase"))
      resolveIssue(item.id);
    $("#mixed-feedback").textContent =
      (assisted ? "Correct after hint." : "Correct!") +
      " Press Enter again for the next question.";
    $("#mixed-feedback").className = "feedback good";
    save();
  } else {
    if (q.kind.startsWith("vocab") || q.kind.startsWith("phrase")) {
      if (!state.issues.includes(item.id)) state.issues.push(item.id);
    }
    if (q.kind.startsWith("vocab"))
      recordMistake(item.id, !articleCorrect && wordCorrect);
    if (q.kind.startsWith("phrase")) recordPhraseMistake(item.id);
    $("#mixed-feedback").textContent =
      article && !articleCorrect && !mixedArticle
        ? "The article is missing."
        : article && !articleCorrect && !wordCorrect
          ? "Both the article and answer are wrong."
          : article && !articleCorrect
            ? "The article is wrong."
            : wordCorrect
              ? "The answer is correct, but another part is wrong."
              : q.kind === "grammar"
                ? "The grammar answer is wrong. Why: " + item.test.explain
                : "The answer is wrong. Use Hint if needed.";
    $("#mixed-feedback").className = "feedback bad";
    save();
  }
  if (activeLesson && !ok) {
    var bucket = lessonPhase === "review" ? lessonReviewErrors : lessonErrors;
    if (
      !bucket.some(
        (question) => question.kind === q.kind && question.item === q.item,
      )
    )
      bucket.push(q);
  }
  if (activeLesson) saveLessonSession();
  updateMixedCheckButton();
}
function mixedBuilderCategoryRecords(kind) {
  var allKey = mixedBuilderAllKey(kind),
    records;
  if (kind === "vocabulary")
    records = categoryRecords.filter(
      (record) =>
        record.id === "all" ||
        (!record.id.startsWith("verb-") &&
          !record.id.startsWith("adjective-") &&
          !["verbs", "adjectives"].includes(record.id)),
    );
  else if (kind === "verbs")
    records = categoryRecords.filter(
      (record) => record.id === "verbs" || record.id.startsWith("verb-"),
    );
  else if (kind === "adjectives")
    records = categoryRecords.filter(
      (record) =>
        record.id === "adjectives" || record.id.startsWith("adjective-"),
    );
  else
    records = ["all", ...Object.keys(contentManifest.phrases)].map((id) => ({
      id,
    }));
  return sortedCategoryRecords(records, allKey);
}
function mixedBuilderCategoryCount(kind, key) {
  if (kind === "phrases")
    return phrases.filter(
      (phrase) =>
        levelSelected(mixedLevelOfPhrase(phrase)) &&
        (key === "all" || phrase.category === key),
    ).length;
  return vocab.filter((word) => {
    if (!levelSelected(word.level)) return false;
    if (kind === "verbs")
      return (
        word.category === "verbs" &&
        (key === "verbs" || "verb-" + word.verbCategory === key)
      );
    if (kind === "adjectives")
      return (
        word.pos === "adjective" &&
        (key === "adjectives" || "adjective-" + word.adjectiveCategory === key)
      );
    return (
      word.category !== "verbs" &&
      word.pos !== "adjective" &&
      (key === "all" || word.category === key)
    );
  }).length;
}
function mixedBuilderSelection(kind) {
  return {
    vocabulary: mixedVocabularyCategories,
    verbs: mixedVerbCategories,
    adjectives: mixedAdjectiveCategories,
    phrases: mixedPhraseCategories,
  }[kind];
}
function mixedBuilderAllKey(kind) {
  return {
    vocabulary: "all",
    verbs: "verbs",
    adjectives: "adjectives",
    phrases: "all",
  }[kind];
}
function mixedBuilderChip(group, value, label, selected, count = "") {
  return `<button type="button" class="mixed-builder-chip ${selected ? "selected" : ""}" data-mixed-${group}="${value}" aria-pressed="${selected}"><i>✓</i>${label}${count === "" ? "" : ` <small>${count}</small>`}</button>`;
}
function renderMixedBuilder() {
  var builder = document.getElementById("mixed-builder");
  if (!builder) return;
  var partLabels = {
      vocabulary: "Nouns",
      verbs: "Verbs",
      adjectives: "Adjectives",
      phrases: "Phrases",
      grammar: "Grammar",
    },
    poolCount = mixedPool().length,
    categorySections = ["vocabulary", "verbs", "adjectives", "phrases"]
      .filter((kind) => mixedParts[kind])
      .map((kind) => {
        var allKey = mixedBuilderAllKey(kind),
          selection = mixedBuilderSelection(kind);
        var categoryHeading = {
          vocabulary: "NOUN TOPICS",
          verbs: "VERB TOPICS",
          adjectives: "ADJECTIVE TOPICS",
          phrases: "PHRASE TOPICS",
        }[kind];
        return `<section class="mixed-builder-category"><p>${categoryHeading}</p><div class="mixed-builder-chips">${mixedBuilderCategoryRecords(
          kind,
        )
          .map((record) =>
            mixedBuilderChip(
              "category",
              kind + ":" + record.id,
              record.id === "all" && kind === "phrases"
                ? "All phrases"
                : categoryLabel(record.id),
              mixedCategorySelected(selection, allKey, record.id),
              mixedBuilderCategoryCount(kind, record.id),
            ),
          )
          .join("")}</div></section>`;
      })
      .join("");
  builder.innerHTML = `<header><div><p class="eyebrow">BUILD A SESSION</p><h2>Choose what you want to practise.</h2></div><span>${poolCount.toLocaleString()} question variations</span></header><section class="mixed-builder-section"><p>INCLUDE</p><div class="mixed-builder-chips">${Object.entries(
    partLabels,
  )
    .map(([key, label]) =>
      mixedBuilderChip("part", key, label, mixedParts[key]),
    )
    .join(
      "",
    )}</div></section><section class="mixed-builder-section"><p>PRACTICE STYLE</p><div class="mixed-builder-chips">${mixedBuilderChip("style", "write", "Write the answer", mixedStyles.includes("write"))}${mixedBuilderChip("style", "choice", "Multiple choice", mixedStyles.includes("choice"))}${mixedBuilderChip("style", "cloze", "Fill the blank", mixedStyles.includes("cloze"))}</div></section>${categorySections}${mixedParts.grammar ? '<p class="mixed-builder-note">Grammar follows the levels and direction selected in the top bar. Practice style shapes word and phrase questions. Fill the blank uses writing unless Multiple choice is selected; grammar uses its own checks.</p>' : mixedStyles.includes("cloze") ? '<p class="mixed-builder-note">Fill the blank uses writing unless Multiple choice is selected.</p>' : ""}`;
  builder.querySelectorAll("[data-mixed-part]").forEach(
    (button) =>
      (button.onclick = () => {
        mixedParts = {
          ...mixedParts,
          [button.dataset.mixedPart]: !mixedParts[button.dataset.mixedPart],
        };
        refreshMixedSession();
      }),
  );
  builder.querySelectorAll("[data-mixed-style]").forEach((button) => {
    button.onclick = () => {
      var value = button.dataset.mixedStyle;
      mixedStyles = mixedStyles.includes(value)
        ? mixedStyles.filter((item) => item !== value)
        : [...mixedStyles, value];
      refreshMixedSession();
    };
  });
  builder.querySelectorAll("[data-mixed-category]").forEach((button) => {
    button.onclick = () => {
      var [kind, key] = button.dataset.mixedCategory.split(":"),
        entries = mixedBuilderCategoryRecords(kind).map((record) => record.id),
        next = toggleCategorySelection(
          mixedBuilderSelection(kind),
          mixedBuilderAllKey(kind),
          entries,
          key,
        );
      if (kind === "vocabulary") mixedVocabularyCategories = next;
      else if (kind === "verbs") mixedVerbCategories = next;
      else if (kind === "adjectives") mixedAdjectiveCategories = next;
      else mixedPhraseCategories = next;
      refreshMixedSession();
    };
  });
}
function refreshMixedSession() {
  renderMixedBuilder();
  nextMixed();
  savePreferences();
}
$$("[data-mixed-article]").forEach(
  (button) =>
    (button.onclick = () => {
      $$("[data-mixed-article]").forEach((x) => x.classList.remove("selected"));
      button.classList.add("selected");
      mixedArticle = button.dataset.mixedArticle;
    }),
);
function updateMixedCheckButton() {
  var button = $("#check-mixed");
  if (!button || lessonComplete) return;
  if (!mixedQuestion) return;
  updateCheckButton(
    button,
    mixedCorrect,
    "Check answer",
    "Next question",
    checkMixed,
    advanceMixed,
  );
}
function advanceMixed() {
  if (activeLesson) nextLessonQuestion();
  else nextMixed();
}
$("#check-mixed").onclick = checkMixed;
$("#next-mixed").onclick = advanceMixed;
$("#mixed-answer").onkeydown = (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  if (mixedAnswered && mixedCorrect) advanceMixed();
  else checkMixed();
};
function lessonLocale(lesson) {
  return lesson.localized.en;
}
function lessonPool(lesson) {
  var activities = lesson.activities || [],
    pool = [];
  if (activities.some((a) => a.type === "mixed"))
    return mixedPool(
      lesson.level || "all",
      {
        vocabulary: true,
        verbs: true,
        adjectives: true,
        phrases: true,
        grammar: true,
      },
      allMixedOptions(),
    );
  var vocabCategories = activities
      .filter((a) => a.type === "vocabulary")
      .flatMap((a) => a.categories || []),
    verbCategories = activities
      .filter((a) => a.type === "verbs")
      .flatMap((a) => a.categories || []),
    phraseCategories = activities
      .filter((a) => a.type === "phrases")
      .flatMap((a) => a.categories || []),
    grammarTopics = activities
      .filter((a) => a.type === "grammar")
      .flatMap((a) => a.topics || []);
  var categoryMatch = (word) =>
    word.level === lesson.level &&
    (vocabCategories.includes(word.category) ||
      verbCategories.includes(word.verbCategory));
  vocab.filter(categoryMatch).forEach((word) => {
    pool.push({ kind: "vocab-meaning", level: word.level, item: word });
    pool.push({ kind: "vocab-translate", level: word.level, item: word });
    pool.push({ kind: "vocab-choice", level: word.level, item: word });
  });
  phrases

    .filter(
      (phrase) =>
        mixedLevelOfPhrase(phrase) === lesson.level &&
        phraseCategories.includes(phrase.category),
    )
    .forEach((phrase) => {
      var level = mixedLevelOfPhrase(phrase);
      pool.push({ kind: "phrase-translate", level, item: phrase });
      pool.push({ kind: "phrase-reverse", level, item: phrase });
      pool.push({ kind: "phrase-cloze", level, item: phrase });
      pool.push({ kind: "phrase-choice", level, item: phrase });
    });
  grammarTopics.forEach((title) => {
    var grammarLesson = grammarLessons.find((item) =>
      Object.values(item.localized || {}).some(
        (locale) => locale.title === title,
      ),
    );
    (grammarLesson?.tests || []).forEach((test) =>
      pool.push({
        kind: "grammar",
        level: grammarLesson.level,
        item: { lesson: grammarLesson, test },
      }),
    );
  });
  return pool;
}
