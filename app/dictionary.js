/* Local English/German lookup. The index is built only after this desk opens. */
var dictionaryIndex = null;
var dictionaryPhraseIndex = null;
var dictionarySearchTimer = null;
var dictionaryRenderedQuery = "";
var dictionaryExamplesRequested = false;
var dictionaryExpandedEntries = new Set();

function dictionaryKey(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dictionaryTokens(value) {
  return dictionaryKey(value).split(" ").filter(Boolean);
}

function dictionaryTerms(word) {
  var german = targetText(word);
  var english = sourceText(word);
  return [...new Set([
    dictionaryKey(german),
    dictionaryKey(english),
    ...dictionaryTokens(german),
    ...dictionaryTokens(english),
  ].filter(Boolean))];
}

function dictionaryRecords() {
  if (dictionaryIndex?.size === vocab.length) return dictionaryIndex.records;
  dictionaryIndex = {
    size: vocab.length,
    records: vocab.map((word) => ({
      word,
      german: targetText(word),
      english: sourceText(word),
      terms: dictionaryTerms(word),
    })),
  };
  return dictionaryIndex.records;
}

function dictionaryExamples() {
  if (dictionaryPhraseIndex?.size === phrases.length) return dictionaryPhraseIndex.byWordId;
  var byWordId = new Map();
  phrases.forEach((phrase) => {
    (phrase.wordIds || []).forEach((wordId) => {
      if (!byWordId.has(String(wordId))) byWordId.set(String(wordId), phrase);
    });
  });
  dictionaryPhraseIndex = { size: phrases.length, byWordId };
  return byWordId;
}

function loadDictionaryExamples() {
  if (contentAvailable("phrases") || dictionaryExamplesRequested) return;
  dictionaryExamplesRequested = true;
  ensureContent("phrases")
    .then(() => {
      dictionaryPhraseIndex = null;
      if ($("#dictionary-view").classList.contains("active-view")) {
        renderDictionaryResults($("#dictionary-query").value);
      }
    })
    .catch(() => {
      dictionaryExamplesRequested = false;
    });
}

function limitedDistance(first, second, limit) {
  if (Math.abs(first.length - second.length) > limit) return limit + 1;
  var previous = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (var row = 1; row <= first.length; row++) {
    var current = [row], smallest = current[0];
    for (var column = 1; column <= second.length; column++) {
      var value = Math.min(
        previous[column] + 1,
        current[column - 1] + 1,
        previous[column - 1] + (first[row - 1] === second[column - 1] ? 0 : 1),
      );
      current[column] = value;
      smallest = Math.min(smallest, value);
    }
    if (smallest > limit) return limit + 1;
    previous = current;
  }
  return previous[second.length];
}

function dictionaryScore(record, query) {
  var queryTokens = dictionaryTokens(query);
  if (!queryTokens.length) return null;
  var best = Infinity;
  for (var term of record.terms) {
    if (term === query) best = Math.min(best, 0);
    else if (term.startsWith(query)) best = Math.min(best, 1);
    else if (term.includes(query)) best = Math.min(best, 2);
    // A phrase query must remain a phrase. Scoring “to know” as “to” or
    // “know” alone makes common English function words overwhelm the result.
    if (queryTokens.length > 1) continue;
    for (var queryToken of queryTokens) {
      if (term === queryToken) best = Math.min(best, 0);
      else if (term.startsWith(queryToken)) best = Math.min(best, 1);
      else if (term.includes(queryToken)) best = Math.min(best, 2);
      else if (queryToken.length >= 3 && term[0] === queryToken[0]) {
        var limit = queryToken.length <= 4 ? 1 : 2;
        var distance = limitedDistance(term, queryToken, limit);
        if (distance <= limit) best = Math.min(best, 3 + distance);
      }
    }
  }
  return Number.isFinite(best) ? best : null;
}

function dictionaryMatches(query) {
  var key = dictionaryKey(query);
  if (!key) return [];
  var levelOrder = { A1: 0, A2: 1, B1: 2 };
  return dictionaryRecords()
    .map((record) => ({ record, score: dictionaryScore(record, key) }))
    .filter((item) => item.score !== null)
    .sort((left, right) =>
      Number(left.score >= 3) - Number(right.score >= 3) ||
      dictionaryPartOfSpeechOrder(left.record.word) - dictionaryPartOfSpeechOrder(right.record.word) ||
      left.score - right.score ||
      (levelOrder[left.record.word.level] ?? 99) - (levelOrder[right.record.word.level] ?? 99) ||
      left.record.german.localeCompare(right.record.german, "de"),
    )
    .slice(0, 50);
}

function dictionaryPartOfSpeech(word) {
  var labels = { noun: "noun", verb: "verb", adjective: "adjective", adverb: "adverb", pronoun: "pronoun", preposition: "preposition", conjunction: "conjunction", particle: "particle" };
  return labels[word.pos] || word.pos || "word";
}

function dictionaryPartOfSpeechOrder(word) {
  return { noun: 0, adjective: 1, verb: 2 }[word.pos] ?? 3;
}

function dictionaryResultGroup(word) {
  return { noun: "nouns", adjective: "adjectives", verb: "verbs" }[word.pos] || "other";
}

function dictionaryResultMarkup(match, examples) {
  var record = match.record;
  var word = record.word;
  var topic = word.pos === "verb" ? word.verbCategory : word.pos === "adjective" ? word.adjectiveCategory : word.category;
  var phrase = examples.get(String(word.id));
  var expanded = phrase && dictionaryExpandedEntries.has(String(word.id));
  var heading = `<div><strong lang="de">${record.german}</strong><span>${record.english}</span></div>
    <small>${word.level} · ${dictionaryPartOfSpeech(word)}${topic ? " · " + categoryLabel(topic) : ""}${match.score >= 3 ? " · close match" : ""}</small>`;
  return `<article class="dictionary-result">
    ${phrase ? `<button class="dictionary-result-head dictionary-result-toggle" data-dictionary-entry="${word.id}" aria-expanded="${expanded}">${heading}<i>${expanded ? "Hide phrase" : "Show phrase"}</i></button>` : `<div class="dictionary-result-head">${heading}</div>`}
    ${expanded ? `<div class="dictionary-example"><b>In context</b><span lang="de">${translationText(phrase, "de")}</span><small>${translationText(phrase, "en")}</small></div>` : ""}
  </article>`;
}

function renderDictionaryResults(query) {
  var results = $("#dictionary-results");
  var summary = $("#dictionary-summary");
  var clear = $("#dictionary-clear");
  var key = dictionaryKey(query);
  dictionaryRenderedQuery = query;
  clear.hidden = !query;
  if (!contentAvailable("vocabulary") || !contentAvailable("verbs")) {
    summary.textContent = "Loading the complete local word collection…";
    results.innerHTML = '<div class="dictionary-empty">Preparing your offline dictionary…</div>';
    return;
  }
  if (!key) {
    summary.textContent = "Search " + dictionaryRecords().length.toLocaleString() + " local words in English or German.";
    results.innerHTML = '<div class="dictionary-empty">Type a word to look it up. “schön” and “schoen”, or “Straße” and “Strasse”, find the same entries.</div>';
    return;
  }
  var matches = dictionaryMatches(query);
  var examples = dictionaryExamples();
  var groups = [
    ["nouns", "Nouns"],
    ["adjectives", "Adjectives"],
    ["verbs", "Verbs"],
    ["other", "Other words"],
  ];
  var directMatches = matches.filter((match) => match.score < 3);
  var closeMatches = matches.filter((match) => match.score >= 3);
  summary.textContent = matches.length
    ? matches.length + (matches.length === 50 ? "+" : "") + " match" + (matches.length === 1 ? "" : "es") + " for “" + query.trim() + "”."
    : "No local word matches “" + query.trim() + "”.";
  results.innerHTML = matches.length
    ? groups.map(([id, label]) => {
        var entries = directMatches.filter((match) => dictionaryResultGroup(match.record.word) === id);
        return entries.length
          ? `<section class="dictionary-result-group"><h2>${label} <small>${entries.length}</small></h2>${entries.map((match) => dictionaryResultMarkup(match, examples)).join("")}</section>`
          : "";
      }).join("") + (closeMatches.length
        ? `<section class="dictionary-result-group dictionary-close-group"><h2>Close matches <small>${closeMatches.length} · similar spelling</small></h2>${closeMatches.map((match) => dictionaryResultMarkup(match, examples)).join("")}</section>`
        : "")
    : '<div class="dictionary-empty">Try a shorter word, an alternate spelling, or a nearby English or German term.</div>';
  results.querySelectorAll("[data-dictionary-entry]").forEach((button) => {
    button.onclick = () => {
      var id = button.dataset.dictionaryEntry;
      if (dictionaryExpandedEntries.has(id)) dictionaryExpandedEntries.delete(id);
      else dictionaryExpandedEntries.add(id);
      renderDictionaryResults(query);
    };
  });
}

function renderDictionary() {
  var input = $("#dictionary-query");
  if (!input.dataset.dictionaryBound) {
    input.dataset.dictionaryBound = "true";
    input.oninput = () => {
      clearTimeout(dictionarySearchTimer);
      dictionarySearchTimer = setTimeout(() => renderDictionaryResults(input.value), 70);
    };
    input.onkeydown = (event) => {
      if (event.key === "Escape") {
        input.value = "";
        renderDictionaryResults("");
      }
    };
    $("#dictionary-clear").onclick = () => {
      input.value = "";
      input.focus();
      renderDictionaryResults("");
    };
  }
  renderDictionaryResults(input.value || dictionaryRenderedQuery);
  loadDictionaryExamples();
}
