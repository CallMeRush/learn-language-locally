function mixedLevelOfPhrase(phrase) {
  return phrase.level === "easy"
    ? "A1"
    : phrase.level === "medium"
      ? "A2"
      : "B1";
}
function mixedPool() {
  var levelOk = (level) => mixedLevel === "all" || level === mixedLevel,
    pool = [];
  vocab
    .filter(
      (word) =>
        levelOk(word.level) &&
        mixedParts[word.category === "verbs" ? "verbs" : "vocabulary"],
    )
    .forEach((word) => {
      pool.push({ kind: "vocab-meaning", level: word.level, item: word });
      pool.push({ kind: "vocab-translate", level: word.level, item: word });
      pool.push({ kind: "vocab-choice", level: word.level, item: word });
    });
  if (mixedParts.phrases)
    phrases
      .filter((phrase) => levelOk(mixedLevelOfPhrase(phrase)))
      .forEach((phrase) => {
        pool.push({
          kind: "phrase-translate",
          level: mixedLevelOfPhrase(phrase),
          item: phrase,
        });
        pool.push({ kind: "phrase-reverse", level: mixedLevelOfPhrase(phrase), item: phrase });
        pool.push({
          kind: "phrase-cloze",
          level: mixedLevelOfPhrase(phrase),
          item: phrase,
        });
        pool.push({
          kind: "phrase-choice",
          level: mixedLevelOfPhrase(phrase),
          item: phrase,
        });
      });

  if (mixedParts.grammar)
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
function nextMixed() {
  refreshArticleChoices();
  var pool = mixedPool();
  if (!pool.length) return;
  mixedQuestion = pool[Math.floor(Math.random() * pool.length)];
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
      "phrase-translate": "PHRASE · TRANSLATE",
      "phrase-reverse": "PHRASE · GERMAN → ENGLISH",
      "phrase-cloze": "PHRASE · FILL THE BLANK",
      "phrase-choice": "PHRASE · MULTIPLE CHOICE",
      grammar: "GRAMMAR",
    };
  $("#mixed-type").textContent = typeLabels[q.kind];
  $("#mixed-level-label").textContent = q.level;
  $("#mixed-feedback").textContent = "";
  $("#mixed-feedback").className = "feedback";
  $("#mixed-cloze").innerHTML = "";
  $("#mixed-options").innerHTML = "";
  $("#mixed-options").style.display = "none";
  $("#mixed-answer").style.display = "";
  $("#mixed-answer").value = "";
  $("#mixed-article").style.display = "none";
  $$("[data-mixed-article]").forEach((button) =>
    button.classList.remove("selected"),
  );
  if (q.kind.startsWith("vocab")) {
    var article = targetArticle(item),
      word = article
        ? targetText(item).replace(
            new RegExp("^" + targetArticle(item) + " "),
            "",
          )
        : targetText(item);
    $("#mixed-prompt").textContent =
      q.kind === "vocab-translate" ? sourceText(item) : word;
    $("#mixed-hint").textContent =
      q.kind === "vocab-translate"
        ? translatePrompt()
        : q.kind === "vocab-choice"
          ? meaningPrompt()
          : article
            ? "Choose the article and type the meaning."
            : "Type the meaning.";
    if (article) {
      $("#mixed-article").style.display = "flex";
      $("#mixed-article span").textContent =
        "Choose article · 1 der · 2 die · 3 das";
    }
    if (q.kind === "vocab-meaning")
      $("#mixed-answer").placeholder = "Type the meaning…";
    if (q.kind === "vocab-translate")
      $("#mixed-answer").placeholder = "Type the answer…";
    if (q.kind === "vocab-choice") {
      $("#mixed-answer").style.display = "none";
      $("#mixed-options").style.display = "grid";
      mixedSetOptions(
        vocab.filter((word) => word.level === q.level),
        item,
        sourceText,
      ).forEach((option) => {
        var button = document.createElement("button");
        button.className = "choice-option";
        button.type = "button";
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
    $("#mixed-prompt").textContent = q.kind === "phrase-reverse" ? targetText(item) : sourceText(item);
    $("#mixed-hint").textContent =
      q.kind === "phrase-cloze"
        ? "Complete the missing word."
        : q.kind === "phrase-reverse"
          ? "Translate this into English."
        : q.kind === "phrase-choice"
          ? translatePrompt()
          : translatePrompt();
    if (q.kind === "phrase-cloze") {
      $("#mixed-cloze").innerHTML = clozeFor(item).sentence;
      $("#mixed-answer").placeholder = "Type the missing word…";
    } else if (q.kind === "phrase-choice") {
      $("#mixed-answer").style.display = "none";
      $("#mixed-options").style.display = "grid";
      mixedSetOptions(
        phrases.filter((phrase) => mixedLevelOfPhrase(phrase) === q.level),
        item,
        targetText,
      ).forEach((option) => {
        var button = document.createElement("button");
        button.className = "choice-option";
        button.type = "button";
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
    } else $("#mixed-answer").placeholder = translatePrompt();
  } else {
    $("#mixed-prompt").textContent = item.test.prompt;
    $("#mixed-hint").textContent =
      item.lesson.title + " · answer the grammar question.";
    $("#mixed-answer").placeholder = "Type your answer…";
  }
}
function checkMixed() {
  if (!mixedQuestion) return;
  var q = mixedQuestion,
    item = q.item,
    raw = q.kind.endsWith("choice")
      ? mixedChoice
      : $("#mixed-answer").value.trim(),
    article = targetArticle(item),
    word = targetText(item)
      ? article
        ? targetText(item).replace(/^(der|die|das) /, "")
        : targetText(item)
      : "",
    articleCorrect = !article || mixedArticle === article;
  var wordCorrect = false;
  if (q.kind === "vocab-translate") wordCorrect = answerMatches(raw, word,
    targetMeta(item).caseSensitive ? value => String(value).trim().replace(/\s+/g, " ") : normalizeAnswer);
  else if (q.kind === "vocab-meaning" || q.kind === "vocab-choice")
    wordCorrect = answerIncludes(raw, sourceText(item));
  else if (q.kind === "phrase-reverse")
    wordCorrect = answerMatches(raw, sourceText(item), grammarNormalize);
  else if (q.kind === "phrase-cloze")
    wordCorrect = answerMatches(raw, clozeFor(item).word);
  else if (q.kind === "phrase-translate" || q.kind === "phrase-choice")
    wordCorrect = answerMatches(raw, targetText(item), (s) =>
      normalizeAnswer(s).replace(/[.,!?;:]/g, ""),
    );
  else
    wordCorrect = item.test.answers.some((answer) =>
      answerMatches(raw, answer, grammarNormalize),
    );
  var ok = articleCorrect && wordCorrect;
  mixedAnswered = true;
  mixedCorrect = ok;
  state.attempts++;
  if (ok) {
    state.correct++;
    if (q.kind.startsWith("vocab") && !state.learned.includes(item.id))
      state.learned.push(item.id);
    if (q.kind.startsWith("phrase") && !state.phrases.includes(item.id))
      state.phrases.push(item.id);
    $("#mixed-feedback").textContent =
      "Correct! Press Enter again for the next question.";
    $("#mixed-feedback").className = "feedback good";
    registerStudy();
    save();
  } else {
    if (q.kind.startsWith("vocab") || q.kind.startsWith("phrase")) {
      if (!state.issues.includes(item.id)) state.issues.push(item.id);
    }
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
                ? "The grammar answer is wrong."
                : "The answer is wrong. Use Hint if needed.";
    $("#mixed-feedback").className = "feedback bad";
    registerStudy();
    save();
  }
}
$$("[data-mixed-level]").forEach(
  (button) =>
    (button.onclick = () => {
      $$("[data-mixed-level]").forEach((x) => x.classList.remove("active"));
      button.classList.add("active");
      mixedLevel = button.dataset.mixedLevel;
      nextMixed();
    }),
);
$$("[data-mixed-article]").forEach(
  (button) =>
    (button.onclick = () => {
      $$("[data-mixed-article]").forEach((x) => x.classList.remove("selected"));
      button.classList.add("selected");
      mixedArticle = button.dataset.mixedArticle;
    }),
);
$("#check-mixed").onclick = checkMixed;
$("#next-mixed").onclick = nextMixed;
$("#mixed-answer").onkeydown = (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  if (mixedAnswered && mixedCorrect) nextMixed();
  else checkMixed();
};
nextMixed();
$$(".heading-actions").forEach((el) =>
  el
    .querySelector(".vocab-direction")
    .insertAdjacentHTML(
      "beforeend",
      '<button class="vocab-mode" data-vocab-mode="choice">Multiple choice</button>',
    ),
);
$$(".vocab-mode").forEach(
  (b) =>
    (b.onclick = () => {
      $$(".vocab-mode").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      vocabMode = b.dataset.vocabMode;
      showVocabCard();
    }),
);
function lessonLocale(lesson) {
  return lesson.localized.en;
}
function lessonPool(lesson) {
  var activities = lesson.activities || [],
    pool = [];
  if (activities.some((a) => a.type === "mixed")) return mixedPool();
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
    word.level === lesson.level && (vocabCategories.includes(word.category) ||
    verbCategories.includes(word.verbCategory));
  vocab.filter(categoryMatch).forEach((word) => {
    pool.push({ kind: "vocab-meaning", level: word.level, item: word });
    pool.push({ kind: "vocab-translate", level: word.level, item: word });
    pool.push({ kind: "vocab-choice", level: word.level, item: word });
  });
  phrases

    .filter((phrase) => mixedLevelOfPhrase(phrase) === lesson.level && phraseCategories.includes(phrase.category))
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
