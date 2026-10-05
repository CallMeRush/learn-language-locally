/* Shared answer handling and the compact status panel used by practice desks. */
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
  var items = groups[status] || [];
  var ordered = items.includes(active)
    ? [active, ...items.filter((item) => item !== active)]
    : items;
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
    <div class="study-list-rows"></div>
    <button class="secondary-btn study-more">Show more</button>`;
  container.querySelectorAll("[data-study-status]").forEach((button) => {
    button.onclick = () => onStatusChange(button.dataset.studyStatus);
  });
  var rows = container.querySelector(".study-list-rows");
  var more = container.querySelector(".study-more");
  var shown = 0;
  function appendPage() {
    ordered.slice(shown, shown + 40).forEach((item) => {
      rows.insertAdjacentHTML("beforeend", rowHTML(item));
      rows.lastElementChild.onclick = () => select(item);
    });
    shown += 40;
    more.hidden = shown >= ordered.length;
  }
  more.onclick = appendPage;
  appendPage();
}
