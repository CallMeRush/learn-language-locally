var expandedLessonUnit = null;
function showLessonSession() {
  var session = document.getElementById("lesson-session");
  if (!session) {
    session = document.createElement("div");
    session.id = "lesson-session";
    session.innerHTML =
      '<div class="lesson-session-heading"><button class="secondary-btn" id="lesson-back">← Lesson list</button><h2 id="lesson-title"></h2><p id="lesson-description"></p></div>';
    document.getElementById("lessons-view").append(session);
    document.getElementById("lesson-back").onclick = () => {
      session.hidden = true;
      document.getElementById("lesson-list").hidden = false;
      renderLessons();
    };
  }
  session.hidden = false;
  document.getElementById("lesson-list").hidden = true;
  session.append(document.querySelector(".mixed-layout"));
  var locale = lessonLocale(activeLesson);
  document.getElementById("lesson-title").textContent = activeLesson.unit
    ? activeLesson.unit.title + " · " + locale.title
    : locale.title;
  document.getElementById("lesson-description").textContent =
    locale.description + " Errors return at the end for a repair round.";
  session.querySelector(".lesson-session-heading").dataset.grammar =
    lessonGrammarTopics(activeLesson).join(" · ");
}
function lessonQuestionReference(question) {
  if (!question) return null;
  if (question.kind === "grammar")
    return {
      kind: question.kind,
      grammarId: question.item.lesson.id,
      testIndex: question.item.lesson.tests.indexOf(question.item.test),
    };
  return { kind: question.kind, itemId: question.item.id };
}
function lessonQuestionFromReference(reference) {
  if (!reference || typeof reference.kind !== "string") return null;
  if (reference.kind === "grammar") {
    var grammar = grammarLessons.find(
        (item) => item.id === reference.grammarId,
      ),
      test = grammar?.tests[reference.testIndex];
    return grammar && test
      ? {
          kind: "grammar",
          level: grammar.level,
          item: { lesson: grammar, test },
        }
      : null;
  }
  var item = reference.kind.startsWith("vocab")
    ? vocab.find((word) => word.id === reference.itemId)
    : phrases.find((phrase) => phrase.id === reference.itemId);
  return item
    ? {
        kind: reference.kind,
        level: reference.kind.startsWith("phrase")
          ? mixedLevelOfPhrase(item)
          : item.level,
        item,
      }
    : null;
}
function saveLessonSession() {
  if (!activeLesson || lessonComplete) return;
  state.lessonSession = {
    lessonId: activeLesson.id,
    phase: lessonPhase,
    current: lessonQuestionReference(mixedQuestion),
    remaining: lessonRemaining.map(lessonQuestionReference).filter(Boolean),
    errors: lessonErrors.map(lessonQuestionReference).filter(Boolean),
    reviewErrors: lessonReviewErrors
      .map(lessonQuestionReference)
      .filter(Boolean),
  };
  save();
}
function loadLessonSession(lesson) {
  var saved = state.lessonSession;
  if (!saved || saved.lessonId !== lesson.id) return false;
  var decode = (references) =>
      (references || []).map(lessonQuestionFromReference).filter(Boolean),
    current = lessonQuestionFromReference(saved.current);
  activeLesson = lesson;
  lessonPhase = saved.phase === "review" ? "review" : "practice";
  lessonErrors = decode(saved.errors);
  lessonReviewErrors = decode(saved.reviewErrors);
  lessonRemaining = [...(current ? [current] : []), ...decode(saved.remaining)];
  lessonComplete = false;
  return lessonRemaining.length > 0;
}
function restoreMixedDesk() {
  var hadSession = !!state.lessonSession;
  state.lessonSession = null;
  activeLesson = null;
  lessonComplete = false;
  mixedQuestion = null;
  document
    .getElementById("mixed-view")
    .append(document.querySelector(".mixed-layout"));
  var session = document.getElementById("lesson-session");
  if (session) session.hidden = true;
  document.getElementById("lesson-list").hidden = false;
  $("#check-mixed").style.display = "";
  $("#next-mixed").textContent = "New random question ↻";
  if (hadSession) save();
}
function lessonUnitSteps(unit) {
  return lessons.filter((lesson) => lesson.unitId === unit.id);
}
function lessonUnitProgress(unit) {
  var steps = lessonUnitSteps(unit),
    completed = steps.filter((lesson) =>
      state.lessons.includes(lesson.id),
    ).length,
    resumed = steps.some(
      (lesson) =>
        lesson.id === activeLesson?.id ||
        lesson.id === state.lessonSession?.lessonId,
    );
  return { steps, completed, resumed };
}
function lessonStepCardHtml(lesson) {
  var locale = lessonLocale(lesson),
    resumable =
      lesson.id === activeLesson?.id ||
      state.lessonSession?.lessonId === lesson.id,
    complete = state.lessons.includes(lesson.id),
    grammar = lessonGrammarTopics(lesson),
    status = resumable ? "In progress" : complete ? "Completed" : "Not started",
    button = resumable ? "Continue" : complete ? "Review again" : "Start round";
  return (
    '<article class="lesson-step-card ' +
    (resumable ? "current " : "") +
    (complete ? "completed" : "") +
    '" data-lesson-id="' +
    lesson.id +
    '">' +
    '<span class="lesson-step-number">' +
    String(lesson.unit.step).padStart(2, "0") +
    "</span><div>" +
    '<span class="grammar-level">' +
    lesson.level +
    '</span><span class="lesson-path-focus">' +
    locale.focus +
    "</span>" +
    "<h3>" +
    locale.title +
    "</h3><p>" +
    locale.description +
    '</p><div class="lesson-path-details"><small>' +
    status +
    "</small>" +
    (grammar.length
      ? "<small>Grammar · " + grammar.join(" · ") + "</small>"
      : "") +
    "</div></div>" +
    '<button class="primary-btn lesson-start">' +
    button +
    " <span>→</span></button></article>"
  );
}
function lessonUnitDetailHtml(unit, index, progress) {
  var locale = unit.localized.en;
  return (
    '<section class="lesson-unit-detail" data-lesson-unit-detail="' +
    unit.id +
    '"><header><div><p class="eyebrow">' +
    unit.level +
    " · UNIT " +
    String(index + 1).padStart(2, "0") +
    "</p><h2>" +
    locale.title +
    "</h2><p>" +
    locale.description +
    "</p></div><span>" +
    progress.completed +
    " / " +
    progress.steps.length +
    ' complete</span></header><div class="lesson-step-list">' +
    progress.steps.map(lessonStepCardHtml).join("") +
    "</div></section>"
  );
}
function renderLessons() {
  var el = $("#lesson-list");
  if (!el) return;
  var completed = lessons.filter((lesson) =>
      state.lessons.includes(lesson.id),
    ).length,
    resumed = state.lessonSession?.lessonId,
    summary =
      '<div class="lesson-progress-summary"><div><p class="eyebrow">YOUR PATH</p><strong>' +
      completed +
      " of " +
      lessons.length +
      " short rounds completed</strong><small>" +
      (resumed
        ? "One round is ready to continue."
        : completed === lessons.length
          ? "Every round is complete — revisit any unit whenever you like."
          : "Choose a unit, then complete its focused rounds and repair every mistake.") +
      "</small></div><span>" +
      Math.round((completed / lessons.length) * 100) +
      "%</span></div>";
  if (
    expandedLessonUnit &&
    !lessonUnits.some((unit) => unit.id === expandedLessonUnit)
  )
    expandedLessonUnit = null;
  el.innerHTML =
    summary +
    '<div class="lesson-unit-list">' +
    lessonUnits
      .map((item, index) => {
        var progress = lessonUnitProgress(item),
          locale = item.localized.en,
          done = progress.completed === progress.steps.length,
          expanded = item.id === expandedLessonUnit;
        return (
          '<div class="lesson-unit-entry"><article class="lesson-unit-card ' +
          (done ? "completed " : "") +
          (progress.resumed ? "current" : "") +
          (expanded ? "expanded" : "") +
          '" data-lesson-unit="' +
          item.id +
          '"><div class="lesson-path-number">' +
          String(index + 1).padStart(2, "0") +
          '</div><div class="lesson-path-copy"><span class="grammar-level">' +
          item.level +
          '</span><span class="lesson-path-focus">' +
          locale.focus +
          "</span><h2>" +
          locale.title +
          "</h2><p>" +
          locale.description +
          '</p><div class="lesson-path-details"><small>' +
          progress.completed +
          " of " +
          progress.steps.length +
          " rounds complete</small>" +
          (progress.resumed ? "<small>In progress</small>" : "") +
          '</div></div><button class="primary-btn lesson-unit-open">' +
          (expanded ? "Hide rounds" : done ? "Review unit" : "Open unit") +
          " <span>" +
          (expanded ? "↑" : "→") +
          "</span></button></article>" +
          (expanded ? lessonUnitDetailHtml(item, index, progress) : "") +
          "</div>"
        );
      })
      .join("") +
    "</div>";
  el.querySelectorAll("[data-lesson-unit]").forEach((card) => {
    card.querySelector(".lesson-unit-open").onclick = () => {
      expandedLessonUnit =
        expandedLessonUnit === card.dataset.lessonUnit
          ? null
          : card.dataset.lessonUnit;
      renderLessons();
    };
  });
  el.querySelectorAll("[data-lesson-id]").forEach((card) => {
    card.querySelector(".lesson-start").onclick = () =>
      startLesson(
        lessons.find((lesson) => lesson.id === card.dataset.lessonId),
      );
  });
}
function lessonGrammarTopics(lesson) {
  return lesson.activities
    .filter((activity) => activity.type === "grammar")
    .flatMap((activity) => activity.topics);
}
async function loadLessonContent(lesson) {
  var requests = lesson.activities.flatMap((activity) => {
    if (activity.type === "vocabulary")
      return activity.categories.map((category) =>
        ensureContent("vocabulary", category),
      );
    if (activity.type === "verbs")
      return activity.categories.map((category) =>
        ensureContent("verbs", category),
      );
    if (activity.type === "phrases")
      return activity.categories.map((category) =>
        ensureContent("phrases", category),
      );
    if (activity.type === "mixed")
      return [
        ensureContent("vocabulary"),
        ensureContent("verbs"),
        ensureContent("phrases"),
      ];
    return [];
  });
  await Promise.all(requests);
}
function lessonContentAvailable(lesson) {
  return lesson.activities.every((activity) =>
    activity.type === "vocabulary"
      ? activity.categories.every((category) =>
          contentAvailable("vocabulary", category),
        )
      : activity.type === "verbs"
        ? activity.categories.every((category) =>
            contentAvailable("verbs", category),
          )
        : activity.type === "phrases"
          ? activity.categories.every((category) =>
              contentAvailable("phrases", category),
            )
          : activity.type === "mixed"
            ? contentAvailable("vocabulary") &&
              contentAvailable("verbs") &&
              contentAvailable("phrases")
            : true,
  );
}
function startLesson(lesson) {
  if (!lessonContentAvailable(lesson))
    return loadLessonContent(lesson).then(() => beginLesson(lesson));
  return beginLesson(lesson);
}
function beginLesson(lesson) {
  if (activeLesson === lesson) {
    setView("lessons");
    showLessonSession();
    return;
  }
  var resumed = loadLessonSession(lesson);
  if (!resumed) {
    activeLesson = lesson;
    lessonPhase = "practice";
    lessonErrors = [];
    lessonReviewErrors = [];
    lessonComplete = false;
    mixedQuestion = null;
    var pool = lessonPool(lesson);
    lessonRemaining = pool
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(lesson.questionCount || 8, pool.length));
  }
  expandedLessonUnit = lesson.unitId || expandedLessonUnit;
  setView("lessons");
  showLessonSession();
  $("#check-mixed").style.display = "";
  $("#next-mixed").textContent = "Next question →";
  nextLessonQuestion();
}
function nextLessonQuestion() {
  if (!activeLesson) return nextMixed();
  if (lessonComplete) {
    restoreMixedDesk();
    setView("lessons");
    return;
  }
  if (mixedQuestion && !mixedCorrect) {
    var bucket = lessonPhase === "review" ? lessonReviewErrors : lessonErrors;
    if (
      !bucket.some(
        (question) =>
          question.kind === mixedQuestion.kind &&
          question.item === mixedQuestion.item,
      )
    )
      bucket.push(mixedQuestion);
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
  nextMixed(lessonRemaining.shift());
  $("#mixed-type").textContent =
    (lessonPhase === "review" ? "FINAL REVIEW · " : "") +
    $("#mixed-type").textContent;
  if (lessonPhase === "review")
    $("#mixed-hint").textContent = "This was an error earlier. Fix it now.";
  saveLessonSession();
}
function finishLesson() {
  lessonComplete = true;
  state.lessonSession = null;
  if (activeLesson && !state.lessons.includes(activeLesson.id))
    state.lessons.push(activeLesson.id);
  state.lessonHistory[activeLesson.id] = {
    completedAt: new Date().toISOString(),
  };
  save();
  var locale = lessonLocale(activeLesson);
  $("#mixed-type").textContent = "LESSON COMPLETE";
  $("#mixed-level-label").textContent = activeLesson.level;
  $("#mixed-prompt").textContent = (locale.title || "Lesson") + " complete!";
  $("#mixed-hint").textContent = "You repaired every error in this lesson.";
  $("#mixed-cloze").innerHTML = "";
  $("#mixed-article").style.display = "none";
  $("#mixed-options").innerHTML = "";
  $("#mixed-options").style.display = "none";
  $("#mixed-answer").style.display = "none";
  $("#mixed-feedback").textContent =
    "Excellent work. Press the button to return to the lesson path.";
  $("#mixed-feedback").className = "feedback good";
  $("#check-mixed").style.display = "none";
  $("#next-mixed").textContent = "Back to lessons →";
}
