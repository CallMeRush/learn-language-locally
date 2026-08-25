function grammarLocaleFor(lesson) {
  return (
    lesson.localized?.[selectedSourceLanguage] ||
    lesson.localized?.en ||
    lesson.localized?.[lesson.targetLanguage] ||
    Object.values(lesson.localized || {})[0] ||
    {}
  );
}
function grammarLocalizedValue(value) {
  return typeof value === "string"
    ? value
    : value?.[selectedSourceLanguage] ||
        value?.en ||
        Object.values(value || {})[0] ||
        "";
}
function renderGrammar() {
  var el = $("#grammar-list");
  el.innerHTML = grammarLessons
    .map((lesson, index) => {
      var locale = grammarLocaleFor(lesson);
      return (
        '<article class="grammar-card"><div class="grammar-card-head"><div><span class="grammar-level">' +
        lesson.level +
        '</span><span class="grammar-tag">' +
        lesson.tag +
        "</span><h2>" +
        locale.title +
        '</h2></div><span class="grammar-number">' +
        String(index + 1).padStart(2, "0") +
        '</span></div><p class="grammar-intro">' +
        locale.intro +
        "</p>" +
        (locale.rules
          ? '<ul class="grammar-rules">' +
            locale.rules.map((rule) => "<li>" + rule + "</li>").join("") +
            "</ul>"
          : "") +
        (locale.tables ? locale.tables.map(grammarTableHtml).join("") : "") +
        (locale.examples
          ? '<div class="grammar-examples">' +
            locale.examples
              .map(
                (example) =>
                  '<div class="grammar-example"><strong>' +
                  grammarLocalizedValue(example.de) +
                  "</strong><span>" +
                  grammarLocalizedValue(example.en) +
                  "</span><small>" +
                  grammarLocalizedValue(example.note) +
                  "</small></div>",
              )
              .join("") +
            "</div>"
          : "") +
        grammarTestHtmlCanonical(lesson, index) +
        "</article>"
      );
    })
    .join("");
  bindGrammarQuestionList();
}
function renderGrammarTest(index) {
  var lesson = grammarLessons[index],
    tests = lesson.tests || [],
    card = document.querySelector(`[data-grammar-index="${index}"]`);
  if (!card || !tests.length) return;
  grammarAnswered[index] = false;
  grammarCorrect[index] = false;
  var test = tests[grammarTestState[index] || 0];
  card.querySelector("[data-grammar-prompt]").textContent =
    grammarLocalizedValue(test.prompt);
  card.querySelector("[data-grammar-answer]").value = "";
  card.querySelector("[data-grammar-feedback]").textContent = "";
  card.querySelector("[data-grammar-feedback]").className =
    "grammar-test-feedback";
  card.querySelector("[data-grammar-check]").innerHTML =
    "Check answer <span>↵</span>";
}
function grammarTestHtmlCanonical(lesson, index) {
  var tests = lesson.tests || [];
  if (!tests.length) return "";
  if (!Number.isInteger(grammarTestState[index])) grammarTestState[index] = 0;
  var prompt = (test) => grammarLocalizedValue(test.prompt),
    test = tests[grammarTestState[index]],
    questions = tests
      .map(
        (item, i) =>
          `<button type="button" class="grammar-question-link ${i === grammarTestState[index] ? "active" : ""}" data-grammar-question="${i}"><span>${String(i + 1).padStart(2, "0")}</span><em>${prompt(item)}</em><b data-grammar-mark="${i}"></b></button>`,
      )
      .join("");
  return `<div class="grammar-test" data-grammar-index="${index}"><p class="grammar-test-prompt" data-grammar-prompt>${prompt(test)}</p><input data-grammar-answer placeholder="Type your answer…" autocomplete="off" /><button class="secondary-btn" data-grammar-check>Check answer <span>↵</span></button><button class="subtle-btn" data-grammar-hint>Hint</button><button class="subtle-btn" data-grammar-next>New question ↻</button><div class="grammar-test-feedback" data-grammar-feedback></div><aside class="grammar-question-list">${questions}</aside></div>`;
}
renderGrammar();
