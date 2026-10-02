function grammarLocaleFor(lesson) {
  return lesson.localized.en;
}
function grammarLocalizedValue(value) {
  return typeof value === "string" ? value : "";
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
        grammarExamplesHtml(lesson, index) +
        grammarTestHtmlCanonical(lesson, index) +
        "</article>"
      );
    })
    .join("");
  bindGrammarQuestionList();
  bindGrammarExampleInteractions();
  bindGrammarInteractions();
  updateGrammarLayout();
}
function updateGrammarLayout() {
  var list = document.querySelector("#grammar-list"),
    button = document.querySelector("#grammar-layout-toggle");
  if (list) list.classList.toggle("grammar-grid", grammarGrid);
  if (button) {
    button.textContent = grammarGrid ? "Show one column" : "Show multiple columns";
    button.setAttribute("aria-pressed", String(grammarGrid));
  }
}
document.querySelector("#grammar-layout-toggle").onclick = () => {
  grammarGrid = !grammarGrid;
  updateGrammarLayout();
  savePreferences();
};
function grammarTableHtml(table) {
  return '<div class="grammar-table-wrap"><h3>' + (table.caption || '') +
    '</h3><table><thead><tr>' + table.headers.map(cell => '<th>' + cell + '</th>').join('') +
    '</tr></thead><tbody>' + table.rows.map(row => '<tr>' + row.map(cell => '<td>' + cell + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>';
}
function grammarExamplesHtml(lesson, index) {
  var examples = lesson.localized.en.examples || [];
  if (!examples.length) return "";
  var selected = Math.min(grammarExampleState[index] || 0, examples.length - 1),
    example = examples[selected],
    englishVisible = grammarExampleEnglishVisible[index] !== false;
  return `<section class="grammar-examples" data-grammar-examples="${index}"><header class="grammar-examples-head"><div><p class="grammar-section-kicker">LEARN FROM EXAMPLES</p><h3>See the pattern in context</h3></div><span>${String(selected + 1).padStart(2, "0")} / ${examples.length}</span></header><div class="grammar-example-tabs" role="tablist" aria-label="Grammar examples">${examples.map((_, exampleIndex) => `<button type="button" class="${exampleIndex === selected ? "active" : ""}" data-grammar-example="${exampleIndex}" role="tab" aria-selected="${exampleIndex === selected}">${String(exampleIndex + 1).padStart(2, "0")}</button>`).join("")}</div><article class="grammar-example-study"><p class="grammar-example-de">${grammarLocalizedValue(example.de)}</p><div class="grammar-example-translation ${englishVisible ? "" : "covered"}"><span>${englishVisible ? grammarLocalizedValue(example.en) : "Translation covered"}</span><button type="button" class="subtle-btn" data-grammar-example-translation>${englishVisible ? "Hide English" : "Reveal English"}</button></div><p class="grammar-example-note"><b>Notice</b> ${grammarLocalizedValue(example.note)}</p></article></section>`;
}
function renderGrammarExamples(index) {
  var section = document.querySelector(`[data-grammar-examples="${index}"]`),
    lesson = grammarLessons[index];
  if (!section || !lesson) return;
  section.outerHTML = grammarExamplesHtml(lesson, index);
  bindGrammarExampleInteractions();
}
function bindGrammarExampleInteractions() {
  $$('[data-grammar-examples]').forEach((section) => {
    var index = Number(section.dataset.grammarExamples);
    section.querySelectorAll('[data-grammar-example]').forEach((button) =>
      (button.onclick = () => {
        grammarExampleState[index] = Number(button.dataset.grammarExample);
        renderGrammarExamples(index);
      }),
    );
    section.querySelector('[data-grammar-example-translation]').onclick = () => {
      grammarExampleEnglishVisible[index] = !(grammarExampleEnglishVisible[index] !== false);
      renderGrammarExamples(index);
    };
  });
}
function renderGrammarTest(index) {
  var lesson = grammarLessons[index],
    card = document.querySelector(`[data-grammar-index="${index}"]`);
  if (!card || !lesson.tests?.length) return;
  grammarAnswered[index] = false;
  grammarCorrect[index] = false;
  card.outerHTML = grammarTestHtmlCanonical(lesson, index);
  bindGrammarQuestionList();
  bindGrammarInteractions();
}
function grammarTestHtmlCanonical(lesson, index) {
  var tests = lesson.tests || [];
  if (!tests.length) return "";
  if (!Number.isInteger(grammarTestState[index])) grammarTestState[index] = 0;
  var prompt = (test) => grammarLocalizedValue(test.prompt),
    test = tests[grammarTestState[index]],
    marks = grammarTestMarks[index] || {},
    answered = Object.keys(marks).length,
    correct = Object.values(marks).filter(Boolean).length,
    questions = tests
      .map(
        (item, i) =>
          `<button type="button" class="grammar-question-link ${i === grammarTestState[index] ? "active" : ""}" data-grammar-question="${i}"><span>${String(i + 1).padStart(2, "0")}</span><em>${prompt(item)}</em><b class="${marks[i] === true ? "correct" : marks[i] === false ? "wrong" : ""}" data-grammar-mark="${i}">${marks[i] === true ? "✓" : marks[i] === false ? "✕" : ""}</b></button>`,
      )
      .join("");
  return `<div class="grammar-test" data-grammar-index="${index}"><header class="grammar-test-head"><div><p class="grammar-test-kicker">CHECK YOUR UNDERSTANDING</p><strong>Question ${grammarTestState[index] + 1} of ${tests.length}</strong></div><span data-grammar-progress>${correct} correct · ${answered}/${tests.length} tried</span></header><p class="grammar-test-prompt" data-grammar-prompt>${prompt(test)}</p><input data-grammar-answer placeholder="Type your answer…" autocomplete="off" /><button class="secondary-btn" data-grammar-check>Check answer <span>↵</span></button><button class="subtle-btn" data-grammar-hint>Hint</button><button class="subtle-btn" data-grammar-next>New question ↻</button><div class="grammar-test-feedback" data-grammar-feedback></div><aside class="grammar-question-list"><p class="grammar-question-list-title">ALL CHECKS</p>${questions}</aside></div>`;
}

function bindGrammarInteractions() {
  $$("[data-grammar-check]").forEach((button) => {
    button.onclick = () => {
      var card = button.closest("[data-grammar-index]"),
        index = Number(card.dataset.grammarIndex),
        test = grammarLessons[index].tests[grammarTestState[index]],
        answer = card.querySelector("[data-grammar-answer]").value,
        ok = test.answers.some(
          (expected) => grammarNormalize(answer) === grammarNormalize(expected),
        ),
        feedback = card.querySelector("[data-grammar-feedback]"),
        mark = card.querySelector(
          `[data-grammar-mark="${grammarTestState[index]}"]`,
        );
      if (!answer.trim()) {
        feedback.textContent = "Type an answer first, then check it.";
        feedback.className = "grammar-test-feedback hint";
        return;
      }
      grammarAnswered[index] = true;
      grammarCorrect[index] = ok;
      grammarTestMarks[index] ||= {};
      grammarTestMarks[index][grammarTestState[index]] = ok;
      var marks = grammarTestMarks[index],
        progress = card.querySelector("[data-grammar-progress]");
      if (progress)
        progress.textContent = Object.values(marks).filter(Boolean).length +
          " correct · " + Object.keys(marks).length + "/" + grammarLessons[index].tests.length + " tried";
      feedback.textContent = ok
        ? "Correct. Why: " + test.explain + " Press Enter again for the next check."
        : "Not yet. Why: " + test.explain;
      feedback.className = "grammar-test-feedback " + (ok ? "good" : "bad");
      if (mark) {
        mark.textContent = ok ? "✓" : "✕";
        mark.className = ok ? "correct" : "wrong";
      }
      if (ok) {
        button.innerHTML = "Next check <span>→</span>";
        button.onclick = () => nextGrammarTest(index);
      }
    };
  });
  $$('[data-grammar-answer]').forEach((input) => {
    input.onkeydown = (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      var card = input.closest("[data-grammar-index]"),
        index = Number(card.dataset.grammarIndex);
      if (grammarAnswered[index] && grammarCorrect[index])
        card.querySelector("[data-grammar-next]").click();
      else card.querySelector("[data-grammar-check]").click();
    };
  });
  $$('[data-grammar-hint]').forEach((button) => {
    button.onclick = () => {
      var card = button.closest("[data-grammar-index]"),
        index = Number(card.dataset.grammarIndex),
        test = grammarLessons[index].tests[grammarTestState[index]],
        feedback = card.querySelector("[data-grammar-feedback]");
      feedback.textContent = "Hint · Answer: " + test.answers.join(" / ") + " Why: " + test.explain;
      feedback.className = "grammar-test-feedback hint";
    };
  });
  $$('[data-grammar-next]').forEach((button) => {
    button.onclick = () => nextGrammarTest(Number(button.closest("[data-grammar-index]").dataset.grammarIndex));
  });
}
function nextGrammarTest(index) {
  grammarTestState[index] = (grammarTestState[index] + 1) % grammarLessons[index].tests.length;
  renderGrammarTest(index);
}

renderGrammar();
