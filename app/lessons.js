function showLessonSession() {
  var session = document.getElementById("lesson-session");
  if (!session) {
    session = document.createElement("div");
    session.id = "lesson-session";
    session.innerHTML = '<div class="lesson-session-heading"><button class="secondary-btn" id="lesson-back">← Lesson list</button><h2 id="lesson-title"></h2><p id="lesson-description"></p></div>';
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
  document.getElementById("lesson-title").textContent = locale.title;
  document.getElementById("lesson-description").textContent = locale.description + " Errors return at the end for a repair round.";
}
function restoreMixedDesk() {
  activeLesson = null;
  lessonComplete = false;
  mixedQuestion = null;
  document.getElementById("mixed-view").append(document.querySelector(".mixed-layout"));
  var session = document.getElementById("lesson-session");
  if (session) session.hidden = true;
  document.getElementById("lesson-list").hidden = false;
  $("#check-mixed").style.display = "";
  $("#next-mixed").textContent = "New random question ↻";
}
function renderLessons() {
  var el = $("#lesson-list");
  if (!el) return;
  el.innerHTML = lessons
    .map((lesson, index) => {
      var locale = lessonLocale(lesson);
      return `<article class="lesson-path-card ${lesson.id === activeLesson?.id ? "current" : ""}" data-lesson-id="${lesson.id}"><div class="lesson-path-number">${String(index + 1).padStart(2, "0")}</div><div class="lesson-path-copy"><span class="grammar-level">${lesson.level}</span><span class="lesson-path-focus">${locale.focus || ""}</span><h2>${locale.title || ""}</h2><p>${locale.description || ""}</p></div><button class="primary-btn lesson-start">${lesson.id === activeLesson?.id ? "Continue" : "Start lesson"} <span>→</span></button></article>`;
    })
    .join("");
  $$("[data-lesson-id]").forEach(
    (card) =>
      (card.querySelector(".lesson-start").onclick = () =>
        startLesson(
          lessons.find((lesson) => lesson.id === card.dataset.lessonId),
        )),
  );
}
function startLesson(lesson) {
  if (activeLesson === lesson) {
    setView("lessons");
    showLessonSession();
    return;
  }
  activeLesson = lesson;
  lessonPhase = "practice";
  lessonErrors = [];
  lessonReviewErrors = [];
  lessonComplete = false;

  mixedQuestion = null;
  var pool = lessonPool(lesson);
  lessonRemaining = pool
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(16, pool.length));
  setView("lessons");
  showLessonSession();
  $("#check-mixed").style.display = "";
  $("#next-mixed").textContent = "Next question →";
  nextMixed();
}
function finishLesson() {
  lessonComplete = true;
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
