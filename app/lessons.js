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
  activeLesson = lesson;
  lessonPhase = "practice";
  lessonErrors = [];
  lessonReviewErrors = [];
  lessonComplete = false;

  lessonRemaining = lessonPool(lesson)
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(16, lessonPool(lesson).length));
  setView("mixed");
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
