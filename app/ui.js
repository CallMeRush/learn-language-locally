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
  bindGrammarInteractions();
}
function grammarTableHtml(table) {
  return '<div class="grammar-table-wrap"><h3>' + (table.caption || '') +
    '</h3><table><thead><tr>' + table.headers.map(cell => '<th>' + cell + '</th>').join('') +
    '</tr></thead><tbody>' + table.rows.map(row => '<tr>' + row.map(cell => '<td>' + cell + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>';
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
      grammarAnswered[index] = true;
      grammarCorrect[index] = ok;
      feedback.textContent = ok
        ? "Correct! Press Enter again for the next question."
        : "The grammar answer is wrong. Use Hint if needed.";
      feedback.className = "grammar-test-feedback " + (ok ? "good" : "bad");
      if (mark) {
        mark.textContent = ok ? "✓" : "✕";
        mark.className = ok ? "correct" : "wrong";
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
      feedback.textContent = "Hint · Answer: " + test.answers.join(" / ");
      feedback.className = "grammar-test-feedback hint";
    };
  });
  $$('[data-grammar-next]').forEach((button) => {
    button.onclick = () => {
      var card = button.closest("[data-grammar-index]"),
        index = Number(card.dataset.grammarIndex),
        tests = grammarLessons[index].tests;
      grammarTestState[index] =
        (grammarTestState[index] + 1) % tests.length;
      renderGrammarTest(index);
      card
        .querySelectorAll("[data-grammar-question]")
        .forEach((link) =>
          link.classList.toggle(
            "active",
            Number(link.dataset.grammarQuestion) === grammarTestState[index],
          ),
        );
      bindGrammarInteractions();
    };
  });
}

renderGrammar();
