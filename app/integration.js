/* Cross-view controls. Practice behavior stays in its owning feature file. */
function showVocabHint(kind = "word") {
  if (!activeVocabWord) return;
  var article = targetArticle(activeVocabWord),
    answer = vocabMode === "translate" ? targetText(activeVocabWord) : sourceText(activeVocabWord);
  $("#vocab-feedback").textContent = kind === "article"
    ? article ? "Hint · Article: " + article : "This word has no article."
    : "Hint · Answer: " + answer;
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
function closeProgressModal() {
  $("#progress-modal").hidden = true;
}
function showProgressModal(content) {
  $("#progress-modal-content").innerHTML = content;
  $("#progress-modal").hidden = false;
  $("#progress-modal-content [data-modal-autofocus]")?.focus();
}
function showResetProgressModal() {
  showProgressModal('<p class="eyebrow">START FRESH</p><h2 id="progress-modal-title">Reset this session?</h2><p>This removes this deck’s saved answers, lesson history, and preferences from this device. Export a backup first if you may want it later.</p><div class="modal-actions"><button class="secondary-btn" data-modal-close>Keep my progress</button><button class="primary-btn danger-btn" id="confirm-reset-progress" data-modal-autofocus>Reset session <span>→</span></button></div>');
  $("#confirm-reset-progress").onclick = resetCurrentProgress;
  $("[data-modal-close]").onclick = closeProgressModal;
}
function resetCurrentProgress() {
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
function showImportProgressModal() {
  showProgressModal('<p class="eyebrow">MOVE YOUR PROGRESS</p><h2 id="progress-modal-title">Import a backup</h2><p>Drop a Wortwerk progress JSON file here, or browse for it. It will replace this deck’s current progress on this device.</p><div class="import-drop-zone" id="import-drop-zone"><strong>Drop your progress file here</strong><span>or</span><button class="secondary-btn" id="browse-progress-file" data-modal-autofocus>Browse files</button></div><div class="modal-actions"><button class="subtle-btn" data-modal-close>Cancel</button></div>');
  $("#browse-progress-file").onclick = () => $("#import-progress-file").click();
  $("[data-modal-close]").onclick = closeProgressModal;
  var zone = $("#import-drop-zone");
  ["dragenter", "dragover"].forEach(type => zone.addEventListener(type, event => {
    event.preventDefault();
    zone.classList.add("dragging");
  }));
  ["dragleave", "drop"].forEach(type => zone.addEventListener(type, event => {
    event.preventDefault();
    zone.classList.remove("dragging");
  }));
  zone.addEventListener("drop", event => stageImportedProgress(event.dataTransfer.files[0]));
}
async function stageImportedProgress(file) {
  if (!file) return;
  if (file.size > 1024 * 1024) return toast("That progress file is unexpectedly large.");
  try {
    var imported = progressFromExport(await file.text());
    showProgressModal('<p class="eyebrow">READY TO RESTORE</p><h2 id="progress-modal-title">Use this backup?</h2><p><strong>' + file.name.replace(/[<>&]/g, "") + '</strong> contains ' + imported.learned.length + ' learned words, ' + imported.phrases.length + ' completed phrases, and ' + imported.lessons.length + ' completed lessons.</p><p>This replaces the progress currently saved on this device for this deck.</p><div class="modal-actions"><button class="secondary-btn" data-modal-close>Cancel</button><button class="primary-btn" id="confirm-import-progress" data-modal-autofocus>Import progress <span>→</span></button></div>');
    $("[data-modal-close]").onclick = closeProgressModal;
    $("#confirm-import-progress").onclick = () => importCurrentProgress(imported);
  } catch (error) {
    toast(error.message || "Could not import that progress file.");
  }
}
function importCurrentProgress(imported) {
  try {
    var all = progressStore();
    all[progressKey()] = imported;
    localStorage.setItem("wortwerk-progress", JSON.stringify(all));
    location.reload();
  } catch { toast("Could not save the imported progress."); }
}
function bindGlobalVocabularyControls() {
  $$('[id$="vocab-hint"]').forEach((button) => {
    button.textContent = "Word hint";
    button.onclick = () => showVocabHint("word");
  });
  $$('[data-vocab-article-hint]').forEach((button) =>
    (button.onclick = () => showVocabHint("article")),
  );
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
$("#reset-progress").onclick = showResetProgressModal;
$("#export-progress").onclick = exportCurrentProgress;
$("#import-progress").onclick = showImportProgressModal;
$("#import-progress-file").onchange = event => {
  stageImportedProgress(event.target.files[0]);
  event.target.value = "";
};
$("#progress-modal-close").onclick = closeProgressModal;
$("#progress-modal").onclick = event => { if (event.target === $("#progress-modal")) closeProgressModal(); };
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !$("#progress-modal").hidden) closeProgressModal();
});
$("#mixed-hint-button").onclick = showMixedHint;
var globalRandomMode = document.querySelector("#global-random-mode");
globalRandomMode.checked = randomMode;
globalRandomMode.onchange = (event) => {
  randomMode = event.target.checked;
  if (document.querySelector("#vocabulary-view.active-view") || document.querySelector("#verbs-view.active-view") || isAdjectiveView()) renderVocabulary();
  savePreferences();
};
bindGlobalVocabularyControls();
bindArticleKeys();
updateDirectionLabels();
updateVocabCheckButton();
