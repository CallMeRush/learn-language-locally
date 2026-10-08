/* A structured repair queue for mistakes from every practice desk. */
var issueQueue = "active";
var issueCurrent = null;
var issueChoice = "";
var issueArticle = "";
var issueKinds = ["vocabulary", "article", "phrase", "application"];

function issueEntry(type, id, mode, category, progress) {
  return { key: [type, id, mode, category].join(":"), type, id, mode, category, progress };
}

function addIssueEntries(entries, type, ids, mode, progress, categoryFor) {
  ids.forEach((id) => {
    var records = type === "vocabulary" ? vocab : type === "phrase" ? phrases : grammarApplications;
    if (records.some((item) => item.id === id)) entries.push(issueEntry(type, id, mode, categoryFor(id), progress));
  });
}

function activeIssueEntries() {
  var entries = [];
  var matching = (ids, records) => ids.filter((id) => records.some((item) => item.id === id));
  var vocabularyCategory = (id, progress) => progress.articleOnlyMistakes.includes(id) ? "article" : "vocabulary";
  addIssueEntries(entries, "vocabulary", matching(state.issues, vocab), "write", state, (id) => vocabularyCategory(id, state));
  addIssueEntries(entries, "vocabulary", matching(state.choiceProgress.issues, vocab), "choice", state.choiceProgress, (id) => vocabularyCategory(id, state.choiceProgress));
  addIssueEntries(entries, "phrase", matching(state.issues, phrases), "write", state, () => "phrase");
  addIssueEntries(entries, "phrase", matching(state.choiceProgress.issues, phrases), "choice", state.choiceProgress, () => "phrase");
  addIssueEntries(entries, "application", state.grammarApplicationMistakes.filter((id) => !state.grammarApplied.includes(id)), "write", state, () => "application");
  addIssueEntries(entries, "application", state.grammarApplicationChoiceProgress.mistakes.filter((id) => !state.grammarApplicationChoiceProgress.applied.includes(id)), "choice", state.grammarApplicationChoiceProgress, () => "application");
  return entries;
}

function issueItem(entry) {
  var records = entry.type === "application" ? grammarApplications : entry.type === "phrase" ? phrases : vocab;
  return records.find((item) => item.id === entry.id);
}

function issueProgress(entry) {
  if (entry.progress) return entry.progress;
  if (entry.mode !== "choice") return state;
  return entry.type === "application"
    ? state.grammarApplicationChoiceProgress
    : state.choiceProgress;
}

function issueEntries() {
  var entries = issueQueue === "active" ? activeIssueEntries() : state.issueQuarantine.map((entry) => ({
    ...entry,
          progress: issueProgress(entry),
  }));
  return entries.filter((entry) => issueKinds.includes(entry.category) && issueItem(entry));
}

function issueLabel(entry) {
  return { vocabulary: "Translation", article: "Article", phrase: "Phrases", application: "Grammar" }[entry.category];
}

function issueModesFor(entry) {
  if (entry.type === "application" || entry.type === "vocabulary") {
    return issueReviewModes.filter((mode) => mode !== "cloze");
  }
  return issueReviewModes;
}

function issueExpected(entry, mode) {
  var item = issueItem(entry);
  if (entry.type === "application") return item.exercise.answer;
  if (entry.type === "vocabulary") return studyDirection === "toGerman" ? targetText(item).replace(/^(der|die|das) /, "") : sourceText(item);
  var language = studyDirection === "toGerman" ? "de" : "en";
  return mode === "cloze" ? clozeFor(item, language).word : translationText(item, language);
}

function issuePrompt(entry, mode) {
  var item = issueItem(entry);
  if (entry.type === "application") return item.exercise.blanked;
  if (entry.type === "vocabulary") return studyDirection === "toGerman" ? sourceText(item) : targetText(item).replace(/^(der|die|das) /, "");
  var language = studyDirection === "toGerman" ? "de" : "en";
  return mode === "cloze" ? clozeFor(item, language).sentence : translationText(item, language === "de" ? "en" : "de");
}

function issueResolve(entry) {
  entry.progress = issueProgress(entry);
  if (entry.type === "application") {
    entry.progress.mistakes = entry.progress.mistakes.filter((id) => id !== entry.id);
    if (!entry.progress.applied.includes(entry.id)) entry.progress.applied.push(entry.id);
  } else {
    entry.progress.issues = entry.progress.issues.filter((id) => id !== entry.id);
  }
  if (issueQueue === "active" && !state.issueQuarantine.some((item) => item.key === entry.key)) {
    state.issueQuarantine.push({ key: entry.key, type: entry.type, id: entry.id, mode: entry.mode, category: entry.category });
  }
}

function issueReopen(entry) {
  entry.progress = issueProgress(entry);
  removeIssueQuarantine(entry.type, entry.id);
  if (entry.type === "application") {
    entry.progress.applied = entry.progress.applied.filter((id) => id !== entry.id);
    if (!entry.progress.mistakes.includes(entry.id)) entry.progress.mistakes.push(entry.id);
    return;
  }
  if (!entry.progress.issues.includes(entry.id)) entry.progress.issues.push(entry.id);
  if (entry.type === "vocabulary") recordMistake(entry.id, entry.category === "article", entry.progress);
  else recordPhraseMistake(entry.id, entry.progress);
}

function issueChoiceOptions(entry, mode, entries, expected) {
  return [expected, ...entries.filter((candidate) => candidate.key !== entry.key).map((candidate) => issueExpected(candidate, mode))]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);
}

function renderIssues() {
  var active = activeIssueEntries();
  var quarantine = state.issueQuarantine.filter(issueItem);
  var entries = issueEntries();
  var builder = $("#issues-builder");
  var list = $("#issues-list");
  var practice = $("#issue-practice");
  $("#issue-big").textContent = active.length;
  builder.innerHTML = `<header><div><p class="eyebrow">REVISE YOUR MISTAKES</p><h2>Choose how to repair them.</h2></div><span>${active.length} active</span></header><section class="mixed-builder-section"><p>QUEUE</p><div class="mixed-builder-chips">${[["active", "Active", active.length], ["quarantine", "Quarantine", quarantine.length]].map(([queue, label, count]) => `<button class="mixed-builder-chip ${issueQueue === queue ? "selected" : ""}" data-issue-queue="${queue}"><i>✓</i>${label} <small>${count}</small></button>`).join("")}</div></section><section class="mixed-builder-section"><p>ANSWER STYLE</p><div class="mixed-builder-chips">${[["write", "Type answer"], ["choice", "Multiple choice"], ["cloze", "Fill the blank"]].map(([mode, label]) => `<button class="mixed-builder-chip ${issueReviewModes.includes(mode) ? "selected" : ""}" data-issue-mode="${mode}"><i>✓</i>${label}</button>`).join("")}</div></section><section class="mixed-builder-section"><p>ISSUE TYPE</p><div class="mixed-builder-chips">${issueKinds.map((kind) => `<button class="mixed-builder-chip selected" data-issue-kind="${kind}"><i>✓</i>${issueLabel({ category: kind })}</button>`).join("")}</div></section>`;
  builder.querySelectorAll("[data-issue-queue]").forEach((button) => button.onclick = () => { issueQueue = button.dataset.issueQueue; issueCurrent = null; renderIssues(); });
  builder.querySelectorAll("[data-issue-mode]").forEach((button) => button.onclick = () => {
    var mode = button.dataset.issueMode;
    issueReviewModes = issueReviewModes.includes(mode) ? issueReviewModes.filter((value) => value !== mode) : [...issueReviewModes, mode];
    if (!issueReviewModes.length) issueReviewModes = [mode];
    issueCurrent = null;
    savePreferences();
    renderIssues();
  });
  builder.querySelectorAll("[data-issue-kind]").forEach((button) => button.onclick = () => {
    var kind = button.dataset.issueKind;
    issueKinds = issueKinds.includes(kind) ? issueKinds.filter((value) => value !== kind) : [...issueKinds, kind];
    issueCurrent = null;
    renderIssues();
  });
  if (!issueCurrent || !entries.some((entry) => entry.key === issueCurrent.key) || !issueModesFor(issueCurrent).length) issueCurrent = entries.find((entry) => issueModesFor(entry).length) || null;
  issueChoice = "";
  issueArticle = "";
  list.className = "word-list vocabulary-study-panel issue-study-panel";
  list.innerHTML = `<div class="study-switch">${[["active", "Active", active.length], ["quarantine", "Quarantine", quarantine.length]].map(([queue, label, count]) => `<button class="${issueQueue === queue ? "active" : ""}" data-issue-queue="${queue}">${label} <small>${count}</small></button>`).join("")}</div><div class="study-list-rows">${entries.map((entry) => `<button class="word-row ${issueCurrent?.key === entry.key ? "current" : ""}" data-issue-entry="${entry.key}"><div><strong>${issueLabel(entry)} · ${entry.type === "application" ? issueItem(entry).translations.en.text : sourceText(issueItem(entry))}</strong><small>${entry.mode === "choice" ? "multiple-choice error" : entry.category === "article" ? "article error" : "typed-answer error"}</small></div></button>`).join("") || '<div class="empty-state">Nothing here. Choose another queue, type, or answer style.</div>'}</div>`;
  list.querySelectorAll("[data-issue-queue]").forEach((button) => button.onclick = () => { issueQueue = button.dataset.issueQueue; issueCurrent = null; renderIssues(); });
  list.querySelectorAll("[data-issue-entry]").forEach((button) => button.onclick = () => { issueCurrent = entries.find((entry) => entry.key === button.dataset.issueEntry); renderIssues(); });
  if (!issueCurrent) {
    practice.innerHTML = '<article class="practice-panel application-card application-empty"><p class="eyebrow">NOTHING HERE</p><div class="practice-word">No revision item</div><p class="practice-prompt">Your selected queue is clear.</p></article>';
    return;
  }
  var modes = issueModesFor(issueCurrent);
  var mode = modes[0];
  var expected = issueExpected(issueCurrent, mode);
  var prompt = issuePrompt(issueCurrent, mode);
  var article = issueCurrent.type === "vocabulary" && studyDirection === "toGerman" ? targetArticle(issueItem(issueCurrent)) : "";
  var choices = issueChoiceOptions(issueCurrent, mode, entries, expected);
  var response = mode === "choice" ? `<div class="choice-options">${choices.map((value, index) => `<button class="choice-option issue-choice" data-choice-shortcut="${choiceShortcutKey(index)}">${value}</button>`).join("")}</div>` : '<input id="issue-answer" autocomplete="off" placeholder="Type the answer…">';
  var articleHint = article ? '<button class="subtle-btn" id="issue-article-hint" aria-keyshortcuts="4">Article hint · 4</button>' : "";
  practice.innerHTML = `<article class="practice-panel issue-card"><div class="practice-meta"><span>${issueLabel(issueCurrent).toUpperCase()} · ${issueQueue.toUpperCase()}</span><span>${entries.findIndex((entry) => entry.key === issueCurrent.key) + 1} / ${entries.length}</span></div><div class="practice-word issue-prompt">${prompt}</div>${article ? '<div class="article-choices"><span>Article</span><button data-issue-article="der"><small>1</small>der</button><button data-issue-article="die"><small>2</small>die</button><button data-issue-article="das"><small>3</small>das</button></div>' : ""}${response}<div class="practice-actions"><button class="primary-btn" id="check-issue">Check answer <span>↵</span></button>${articleHint}<button class="subtle-btn" id="issue-hint" aria-keyshortcuts="5">Hint · 5</button></div><div id="issue-feedback" class="feedback"></div></article>`;
  $$(".issue-choice").forEach((button) => button.onclick = () => { $$(".issue-choice").forEach((choice) => choice.classList.remove("selected")); button.classList.add("selected"); issueChoice = button.textContent; });
  $$("[data-issue-article]").forEach((button) => button.onclick = () => { issueArticle = button.dataset.issueArticle; $$("[data-issue-article]").forEach((choice) => choice.classList.toggle("selected", choice === button)); });
  $("#issue-hint").onclick = () => toggleHintFeedback($("#issue-feedback"), "issue", "Hint · Answer: " + expected);
  $("#issue-article-hint")?.addEventListener("click", () => toggleHintFeedback($("#issue-feedback"), "issue-article", "Hint · Article: " + article));
  $("#check-issue").onclick = () => {
    var answer = mode === "choice" ? issueChoice : $("#issue-answer")?.value || "";
    var correct = answerMatches(answer, expected, (value) => normalizeAnswer(value, { punctuation: true })) && (!article || issueArticle === article);
    state.attempts += 1;
    if (correct) {
      state.correct += 1;
      issueResolve(issueCurrent);
      $("#issue-feedback").textContent = "Correct — moved to quarantine.";
      $("#issue-feedback").className = "feedback good";
    } else {
      issueReopen(issueCurrent);
      $("#issue-feedback").textContent = "Not yet — returned to the active issue queue.";
      $("#issue-feedback").className = "feedback bad";
    }
    save();
    updateStats();
    setTimeout(renderIssues, 350);
  };
  $("#issue-answer")?.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); $("#check-issue").click(); } });
}
