/* Shared answer handling and the compact status panel used by practice desks. */
var choiceShortcutKeys = ["A", "B", "C", "D"];
function choiceShortcutKey(index) {
  return choiceShortcutKeys[index] || "";
}
function normalizeAnswer(
  value,
  { punctuation = false, caseSensitive = false } = {},
) {
  var text = String(value ?? "").trim();
  if (!caseSensitive) text = text.toLocaleLowerCase("de");
  text = text
    .replace(/ẞ/g, "SS")
    .replace(/ß/g, "ss")
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue");
  if (punctuation) text = text.replace(/[.,!?;:]/g, "");
  return text.replace(/\s+/g, " ");
}
function splitAnswerAlternatives(value) {
  var depth = 0;
  var part = "";
  var alternatives = [];
  for (var character of String(value ?? "")) {
    if (character === "(") depth++;
    if (character === ")") depth--;
    if ((character === "/" || character === ";") && depth === 0) {
      alternatives.push(part.trim());
      part = "";
    } else part += character;
  }
  alternatives.push(part.trim());
  return alternatives.filter(Boolean);
}
function answerMatches(answer, expected, normalizer = normalizeAnswer) {
  var actual = normalizer(answer);
  if (!actual) return false;
  if (actual === normalizer(expected)) return true;
  return splitAnswerAlternatives(expected).some(
    (alternative) => actual === normalizer(alternative),
  );
}
function answerIncludes(answer, expected, normalizer = normalizeAnswer) {
  return answerMatches(answer, expected, normalizer);
}
function grammarNormalize(value) {
  return normalizeAnswer(value, { punctuation: true });
}
function updateCheckButton(
  button,
  complete,
  checkLabel,
  nextLabel,
  check,
  next,
) {
  if (!button) return;
  button.innerHTML = complete
    ? `${nextLabel} <span>→</span>`
    : `${checkLabel} <span>↵</span>`;
  button.onclick = complete ? next : check;
}
function toggleHintFeedback(element, key, text, className = "feedback hint") {
  if (!element) return false;
  if (element.classList.contains("hint") && element.dataset.hintKey === key) {
    element.textContent = element.dataset.hintPreviousText || "";
    element.className = element.dataset.hintPreviousClass || "feedback";
    delete element.dataset.hintKey;
    delete element.dataset.hintPreviousText;
    delete element.dataset.hintPreviousClass;
    return false;
  }
  if (!element.classList.contains("hint")) {
    element.dataset.hintPreviousText = element.textContent;
    element.dataset.hintPreviousClass = element.className;
  }
  element.textContent = text;
  element.className = className;
  element.dataset.hintKey = key;
  return true;
}
function studyProgressGroups(
  records,
  {
    completed = [],
    wrong = [],
    mistakes = [],
    hinted = [],
    articleOnly = [],
    includeArticle = false,
  },
) {
  var completedIds = new Set(completed),
    wrongIds = new Set(wrong),
    mistakeIds = new Set(mistakes),
    hintedIds = new Set(hinted),
    articleOnlyIds = new Set(articleOnly),
    groups = {
      pending: [],
      "first-shot": [],
      corrected: [],
      hinted: [],
      ...(includeArticle ? { article: [] } : {}),
      wrong: [],
    };
  records.forEach((record) => {
    var group = wrongIds.has(record.id)
      ? "wrong"
      : !completedIds.has(record.id)
        ? "pending"
        : mistakeIds.has(record.id)
          ? "corrected"
          : hintedIds.has(record.id)
            ? "hinted"
            : includeArticle && articleOnlyIds.has(record.id)
              ? "article"
              : "first-shot";
    groups[group].push(record);
  });
  return groups;
}
function renderStudyPanel({
  container,
  groups,
  status,
  labels,
  active,
  className,
  rowHTML,
  select,
  onStatusChange,
}) {
  var items = groups[status] || [],
    compactWindow = window.matchMedia("(max-width: 1020px)").matches,
    pageSize = compactWindow ? 8 : 50,
    activeIndex = items.indexOf(active),
    start =
      activeIndex < 0
        ? 0
        : Math.max(0, activeIndex - (compactWindow ? 2 : Math.floor(pageSize / 2))),
    end = Math.min(items.length, start + pageSize);
  if (!compactWindow && end - start < pageSize)
    start = Math.max(0, end - pageSize);
  container.className = className;
  container.innerHTML = `
    <div class="study-switch" role="tablist">
      ${Object.keys(groups)
        .map(
          (key) => `
        <button class="${key === status ? "active" : ""}" data-study-status="${key}" role="tab" aria-selected="${key === status}">
          ${labels[key]} <small>${groups[key].length}</small>
        </button>`,
        )
        .join("")}
    </div>
    <button class="secondary-btn study-more study-more-above">Show more above</button>
    <div class="study-list-rows"></div>
    <button class="secondary-btn study-more study-more-below">Show more below</button>`;
  container.querySelectorAll("[data-study-status]").forEach((button) => {
    button.onclick = () => onStatusChange(button.dataset.studyStatus);
  });
  var rows = container.querySelector(".study-list-rows");
  var moreAbove = container.querySelector(".study-more-above"),
    moreBelow = container.querySelector(".study-more-below");
  function renderWindow() {
    var windowItems = items.slice(start, end);
    rows.innerHTML = windowItems.map((item) => rowHTML(item)).join("");
    rows.querySelectorAll(".word-row").forEach((row, index) => {
      row.onclick = () => select(windowItems[index]);
    });
    moreAbove.hidden = start === 0;
    moreBelow.hidden = end >= items.length;
  }
  moreAbove.onclick = () => {
    start = Math.max(0, start - pageSize);
    renderWindow();
  };
  moreBelow.onclick = () => {
    end = Math.min(items.length, end + pageSize);
    renderWindow();
  };
  renderWindow();
}
