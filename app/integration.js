/* Cross-view controls. Practice behavior stays in its owning feature file. */
function showVocabHint() {
  if (!activeVocabWord) return;
  var article = targetArticle(activeVocabWord),
    answer = vocabMode === "translate" ? targetText(activeVocabWord) : sourceText(activeVocabWord);
  $("#vocab-feedback").textContent = "Hint · Answer: " + answer + (article ? " · Article: " + article : "");
  $("#vocab-feedback").className = "feedback hint";
}
function showMixedHint() {
  if (!mixedQuestion) return;
  var q = mixedQuestion,
    item = q.item,
    answer = q.kind === "grammar" ? item.test.answers.join(" / ")
      : q.kind === "phrase-cloze" || q.kind === "phrase-choice" ? clozeFor(item).word
      : q.kind === "phrase-reverse" ? sourceText(item)
      : q.kind.startsWith("phrase") || q.kind === "vocab-translate" ? targetText(item)
      : sourceText(item);
  $("#mixed-feedback").textContent = "Hint · " + answer;
  $("#mixed-feedback").className = "feedback hint";
}
function resetCurrentProgress() {
  if (!confirm("Reset all saved progress for this study deck on this device?")) return;
  var all = progressStore();
  delete all[progressKey()];
  localStorage.setItem("wortwerk-progress", JSON.stringify(all));
  location.reload();
}
function exportCurrentProgress() {
  var payload = JSON.stringify(progressExportPayload(), null, 2),
    blob = new Blob([payload], { type: "application/json" }),
    link = document.createElement("a"),
    stamp = new Date().toISOString().slice(0, 10);
  link.href = URL.createObjectURL(blob);
  link.download = "wortwerk-progress-" + stamp + ".json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 0);
  toast("Progress exported. Keep this file private.");
}
async function importCurrentProgress(file) {
  if (!file) return;
  if (file.size > 1024 * 1024) return toast("That progress file is unexpectedly large.");
  try {
    var imported = progressFromExport(await file.text());
    if (!confirm("Replace this device’s saved progress with the imported progress?")) return;
    var all = progressStore();
    all[progressKey()] = imported;
    localStorage.setItem("wortwerk-progress", JSON.stringify(all));
    location.reload();
  } catch (error) {
    toast(error.message || "Could not import that progress file.");
  }
}
function bindGlobalVocabularyControls() {
  $$('[id$="vocab-status-filter"]').forEach((select) => {
    select.value = vocabStatus;
    select.onchange = (event) => {
      vocabStatus = event.target.value;
      vocabIndex = 0;
      renderVocabulary();
    };
  });
  $$('[id$="random-vocab"]').forEach((button) => (button.onclick = nextVocab));
  $$('[id$="vocab-hint"]').forEach((button) => (button.onclick = showVocabHint));
  ["#check-vocab", "#verbs-check-vocab", "#adjectives-check-vocab"].forEach((selector) => {
    var button = document.querySelector(selector);
    if (button) button.onclick = checkVocab;
  });
  ["#vocab-answer", "#verbs-vocab-answer", "#adjectives-vocab-answer"].forEach((selector) => {
    var input = document.querySelector(selector);
    if (!input) return;
    input.onkeydown = (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      vocabCorrect ? nextVocab() : checkVocab();
    };
  });
}
function bindArticleKeys() {
  document.addEventListener("keydown", (event) => {
    var article = ({ 1: "der", 2: "die", 3: "das" })[event.key];
    if (!article) return;
    var root = document.querySelector(".active-view .mixed-layout")
      ? "#mixed-article"
      : "#" + vocabularyViewPrefix() + "article-choices";
    var attribute = root === "#mixed-article" ? "mixed-article" : "article";
    var button = document.querySelector(root + " [data-" + attribute + '=\"' + article + '\"]');
    if (!button || button.offsetParent === null) return;
    event.preventDefault();
    button.click();
  });
}
document.querySelector('.nav-item[data-view="mixed"]').onclick = () => {
  restoreMixedDesk();
  $("#mixed-view .page-heading h1").textContent = "Mixed practice";
  $("#mixed-view .page-heading p:last-child").textContent = "One randomized stream of vocabulary, verbs, phrases, cloze questions, multiple choice, and grammar.";
  setView("mixed");
};
$("#reset-progress").onclick = resetCurrentProgress;
$("#export-progress").onclick = exportCurrentProgress;
$("#import-progress").onclick = () => $("#import-progress-file").click();
$("#import-progress-file").onchange = event => {
  importCurrentProgress(event.target.files[0]);
  event.target.value = "";
};
$("#mixed-hint-button").onclick = showMixedHint;
var globalRandomMode = document.querySelector("#global-random-mode");
globalRandomMode.onchange = (event) => {
  randomMode = event.target.checked;
  if (document.querySelector("#vocabulary-view.active-view") || document.querySelector("#verbs-view.active-view") || isAdjectiveView()) renderVocabulary();
};
bindGlobalVocabularyControls();
bindArticleKeys();
updateDirectionLabels();
updateVocabCheckButton();
