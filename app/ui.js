function grammarLocaleFor(lesson) {
  return lesson.localized.en;
}
function grammarLocalizedValue(value) {
  return typeof value === "string" ? value : "";
}
var grammarPracticeOpen = {};
var grammarCardOpen = {};
function renderGrammar() {
  var el = $("#grammar-list");
  el.innerHTML = grammarLessons
    .map((lesson, index) => {
      var locale = grammarLocaleFor(lesson),
        open = Boolean(grammarCardOpen[index]);
      return (
        '<article class="grammar-card ' +
        (open ? "is-open" : "is-collapsed") +
        '" data-grammar-card="' +
        lesson.id +
        '" data-grammar-toggle="' +
        index +
        '"><div class="grammar-card-head"><div data-grammar-title-toggle="' +
        index +
        '"><span class="grammar-level">' +
        lesson.level +
        '</span><span class="grammar-tag">' +
        lesson.tag +
        "</span><h2>" +
        locale.title +
        "</h2></div>" +
        grammarCardActionsHtml(lesson, index, open) +
        "</div>" +
        (open
          ? '<div class="grammar-card-content"><p class="grammar-intro">' +
            locale.intro +
            "</p>" +
            (locale.rules
              ? '<ul class="grammar-rules">' +
                locale.rules.map((rule) => "<li>" + rule + "</li>").join("") +
                "</ul>"
              : "") +
            (locale.tables
              ? locale.tables.map(grammarTableHtml).join("")
              : "") +
            grammarExamplesHtml(lesson, index) +
            grammarPracticeHtml(lesson, index) +
            "</div>"
          : "") +
        "</article>"
      );
    })
    .join("");
  bindGrammarExampleInteractions();
  bindGrammarInteractions();
  updateGrammarLayout();
}
function updateGrammarLayout() {
  var list = document.querySelector("#grammar-list"),
    button = document.querySelector("#grammar-layout-toggle");
  if (list) list.classList.toggle("grammar-grid", grammarGrid);
  if (button) {
    button.textContent = grammarGrid
      ? "Show one column"
      : "Show multiple columns";
    button.setAttribute("aria-pressed", String(grammarGrid));
  }
}
document.querySelector("#grammar-layout-toggle").onclick = () => {
  grammarGrid = !grammarGrid;
  updateGrammarLayout();
  savePreferences();
};
function grammarTableHtml(table) {
  return (
    '<div class="grammar-table-wrap"><h3>' +
    (table.caption || "") +
    "</h3><table><thead><tr>" +
    table.headers.map((cell) => "<th>" + cell + "</th>").join("") +
    "</tr></thead><tbody>" +
    table.rows
      .map(
        (row) =>
          "<tr>" +
          row.map((cell) => "<td>" + cell + "</td>").join("") +
          "</tr>",
      )
      .join("") +
    "</tbody></table></div>"
  );
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
  $$("[data-grammar-examples]").forEach((section) => {
    var index = Number(section.dataset.grammarExamples);
    section.querySelectorAll("[data-grammar-example]").forEach(
      (button) =>
        (button.onclick = () => {
          grammarExampleState[index] = Number(button.dataset.grammarExample);
          renderGrammarExamples(index);
        }),
    );
    section.querySelector("[data-grammar-example-translation]").onclick =
      () => {
        grammarExampleEnglishVisible[index] = !(
          grammarExampleEnglishVisible[index] !== false
        );
        renderGrammarExamples(index);
      };
  });
}
function renderGrammarTest(index) {
  var lesson = grammarLessons[index],
    area = document.querySelector(`[data-grammar-practice="${index}"]`);
  if (!area || !lesson.tests?.length) return;
  grammarAnswered[index] = false;
  grammarCorrect[index] = false;
  area.outerHTML = grammarPracticeHtml(lesson, index);
  bindGrammarInteractions();
}
function grammarApplicationCount(lessonId) {
  return grammarApplications.filter(
    (record) => applicationGrammarIdFor(record) === lessonId,
  ).length;
}
function grammarCardActionsHtml(lesson, index, open) {
  var number = String(index + 1).padStart(2, "0"),
    checks = lesson.tests?.length || 0,
    applicationCount = grammarApplicationCount(lesson.id),
    checkButton =
      open && checks
        ? `<button type="button" class="secondary-btn grammar-open-checks" data-grammar-open="${index}" title="${grammarPracticeOpen[index] ? "Close" : "Open"} ${checks} quick checks">${grammarPracticeOpen[index] ? "Close checks" : "Open checks"} <span>${grammarPracticeOpen[index] ? "↑" : "→"}</span></button>`
        : "",
    applyButton =
      open && applicationCount
        ? `<button type="button" class="subtle-btn grammar-apply-checks" data-grammar-apply="${lesson.id}">Apply in phrases <span>→</span></button>`
        : "";
  return `<div class="grammar-card-actions"><span class="grammar-number">${number}</span>${checkButton}${applyButton}<button type="button" class="grammar-card-disclosure" data-grammar-toggle-button="${index}" aria-expanded="${open}" aria-label="${open ? "Collapse" : "Expand"} grammar tile ${number}"><span aria-hidden="true">⌄</span></button></div>`;
}
function grammarPracticeHtml(lesson, index) {
  if (!grammarPracticeOpen[index]) {
    return `<section data-grammar-practice="${index}"></section>`;
  }
  return `<section data-grammar-practice="${index}">${grammarTestHtmlCanonical(lesson, index)}</section>`;
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
  $$("[data-grammar-toggle]").forEach((card) => {
    card.onclick = (event) => {
      if (event.target.closest("button, input, select, textarea, label, a"))
        return;
      if (
        event.target === card ||
        event.target.closest("[data-grammar-title-toggle]")
      )
        toggleGrammarCard(Number(card.dataset.grammarToggle));
    };
  });
  $$("[data-grammar-toggle-button]").forEach((button) => {
    button.onclick = () =>
      toggleGrammarCard(Number(button.dataset.grammarToggleButton));
  });
  $$("[data-grammar-question]").forEach((button) => {
    button.onclick = () => {
      var card = button.closest("[data-grammar-index]");
      var index = Number(card.dataset.grammarIndex);
      grammarTestState[index] = Number(button.dataset.grammarQuestion);
      renderGrammarTest(index);
    };
  });
  $$("[data-grammar-open]").forEach((button) => {
    button.onclick = () => {
      var index = Number(button.dataset.grammarOpen);
      grammarPracticeOpen[index] = !grammarPracticeOpen[index];
      renderGrammar();
    };
  });
  $$("[data-grammar-apply]").forEach((button) => {
    button.onclick = () =>
      openApplicationForGrammar(button.dataset.grammarApply);
  });
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
        progress.textContent =
          Object.values(marks).filter(Boolean).length +
          " correct · " +
          Object.keys(marks).length +
          "/" +
          grammarLessons[index].tests.length +
          " tried";
      var assisted = Boolean(
        grammarTestHints[index]?.[grammarTestState[index]],
      );
      feedback.textContent = ok
        ? (assisted ? "Correct after hint. Why: " : "Correct. Why: ") +
          test.explain +
          " Press Enter again for the next check."
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
  $$("[data-grammar-answer]").forEach((input) => {
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
  $$("[data-grammar-hint]").forEach((button) => {
    button.onclick = () => {
      var card = button.closest("[data-grammar-index]"),
        index = Number(card.dataset.grammarIndex),
        test = grammarLessons[index].tests[grammarTestState[index]],
        feedback = card.querySelector("[data-grammar-feedback]");
      var shown = toggleHintFeedback(
        feedback,
        "grammar-" + index,
        "Hint · Answer: " + test.answers.join(" / ") + " Why: " + test.explain,
        "grammar-test-feedback hint",
      );
      if (shown) {
        grammarTestHints[index] ||= {};
        grammarTestHints[index][grammarTestState[index]] = true;
      }
    };
  });
  $$("[data-grammar-next]").forEach((button) => {
    button.onclick = () =>
      nextGrammarTest(
        Number(button.closest("[data-grammar-index]").dataset.grammarIndex),
      );
  });
}
function toggleGrammarCard(index) {
  grammarCardOpen[index] = !grammarCardOpen[index];
  renderGrammar();
}
function nextGrammarTest(index) {
  grammarTestState[index] =
    (grammarTestState[index] + 1) % grammarLessons[index].tests.length;
  renderGrammarTest(index);
}

renderGrammar();
