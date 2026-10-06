/*
  Produce a ranked review queue of phrase-backed grammar-application candidates.

  This intentionally finds possibilities, not answers. German article forms are
  frequently ambiguous, so each candidate retains its sentence, local context,
  and confidence signals for an editorial pass before it reaches data/application.js.

  Run:
    node scripts/find-grammar-phrase-candidates.cjs
    node scripts/find-grammar-phrase-candidates.cjs --limit=500
    node scripts/find-grammar-phrase-candidates.cjs --check
*/
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const outputPath = path.join(
  root,
  "data/import/grammar-phrase-candidates.json",
);
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");
const levelForPhrase = (level) =>
  ({ easy: "A1", medium: "A2", hard: "B1" })[level];
const wordTokens = (text) =>
  String(text).match(/[\p{L}]+(?:['’-][\p{L}]+)?/gu) || [];
const lower = (text) => text.toLocaleLowerCase("de");
const isCapitalized = (token) => /^[A-ZÄÖÜ]/u.test(token);

function loadData() {
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    read("data/manifest.js") + ";this.manifest=contentManifest",
    context,
  );
  vm.runInContext(
    read("data/application.js") + ";this.applications=grammarApplications",
    context,
  );
  const phrases = [];
  const vocabulary = [];
  context.WortwerkData = {
    register(kind, group, records) {
      if (kind === "phrases") phrases.push(...records);
      else
        vocabulary.push(
          ...records.map((record) => ({
            ...record,
            category: kind === "verbs" ? "verbs" : group,
          })),
        );
    },
  };
  for (const kind of ["vocabulary", "verbs", "phrases"])
    for (const entry of Object.values(context.manifest[kind]))
      vm.runInContext(read(entry.src), context, { filename: entry.src });
  return { phrases, vocabulary, applications: context.applications };
}

const articleForms = new Map([
  [
    "der",
    {
      caseSignals: ["nominative masculine", "dative/genitive feminine"],
      confidence: "review",
    },
  ],
  [
    "die",
    {
      caseSignals: ["nominative/accusative feminine or plural"],
      confidence: "review",
    },
  ],
  [
    "das",
    { caseSignals: ["nominative/accusative neuter"], confidence: "review" },
  ],
  [
    "ein",
    {
      caseSignals: ["nominative neuter/masculine or accusative neuter"],
      confidence: "review",
    },
  ],
  [
    "eine",
    { caseSignals: ["nominative/accusative feminine"], confidence: "review" },
  ],
  [
    "den",
    {
      caseSignals: ["accusative masculine or dative plural"],
      confidence: "high",
    },
  ],
  ["dem", { caseSignals: ["dative masculine or neuter"], confidence: "high" }],
  [
    "des",
    { caseSignals: ["genitive masculine or neuter"], confidence: "high" },
  ],
  ["einen", { caseSignals: ["accusative masculine"], confidence: "high" }],
  [
    "einem",
    { caseSignals: ["dative masculine or neuter"], confidence: "high" },
  ],
  ["einer", { caseSignals: ["dative/genitive feminine"], confidence: "high" }],
  [
    "eines",
    { caseSignals: ["genitive masculine or neuter"], confidence: "high" },
  ],
]);
const dativePrepositions = new Set([
  "aus",
  "außer",
  "ausser",
  "bei",
  "mit",
  "nach",
  "seit",
  "von",
  "zu",
]);
const modalForms = new Map([
  ["kann", "können"],
  ["kannst", "können"],
  ["können", "können"],
  ["könnt", "können"],
  ["könnte", "können"],
  ["könnten", "können"],
  ["muss", "müssen"],
  ["musst", "müssen"],
  ["müssen", "müssen"],
  ["müsst", "müssen"],
  ["möchte", "möchten"],
  ["möchtest", "möchten"],
  ["möchten", "möchten"],
  ["will", "wollen"],
  ["willst", "wollen"],
  ["wollen", "wollen"],
  ["wollt", "wollen"],
  ["darf", "dürfen"],
  ["darfst", "dürfen"],
  ["dürfen", "dürfen"],
  ["dürft", "dürfen"],
  ["soll", "sollen"],
  ["sollst", "sollen"],
  ["sollen", "sollen"],
  ["sollt", "sollen"],
]);

function articleMatches(tokens) {
  const matches = [];
  tokens.forEach((token, index) => {
    const article = lower(token);
    const details = articleForms.get(article);
    if (!details) return;
    const nounIndex = [1, 2, 3, 4]
      .map((offset) => index + offset)
      .find((next) => isCapitalized(tokens[next] || ""));
    if (nounIndex === undefined) return;
    const previous = lower(tokens[index - 1] || "");
    matches.push({
      article,
      noun: tokens[nounIndex],
      between: tokens.slice(index + 1, nounIndex),
      precedingPreposition: dativePrepositions.has(previous) ? previous : null,
      caseSignals: details.caseSignals,
      confidence:
        dativePrepositions.has(previous) || details.confidence === "high"
          ? "high"
          : "review",
    });
  });
  return matches;
}

function modalMatches(tokens, verbForms) {
  const matches = [];
  const infinitive = tokens.at(-1);
  if (!infinitive || !verbForms.has(lower(infinitive))) return matches;
  tokens.slice(0, -1).forEach((token) => {
    const lemma = modalForms.get(lower(token));
    if (!lemma) return;
    matches.push({
      form: token,
      lemma,
      infinitive,
      confidence: "high",
    });
  });
  return matches;
}

function separableMatches(phrase, tokens, separableWords, prefixes) {
  const finalPrefix = lower(tokens.at(-1) || "");
  const linked = phrase.wordIds
    .map((id) => separableWords.get(id))
    .filter(Boolean)
    .filter((word) => lower(word.translations.de.prefix || "") === finalPrefix);
  if (linked.length)
    return linked.map((word) => ({
      sourceWordId: word.id,
      infinitive: word.translations.de.text,
      prefix: finalPrefix,
      confidence: "high",
    }));
  if (!prefixes.has(finalPrefix)) return [];
  return [{ finalPrefix, confidence: "review" }];
}

function candidateRecord(phrase, matches, existingSourceIds) {
  return {
    id: phrase.id,
    level: levelForPhrase(phrase.level),
    category: phrase.category,
    translations: phrase.translations,
    wordIds: phrase.wordIds,
    alreadyUsed: existingSourceIds.has(phrase.id),
    matches,
  };
}

function priorityFor(record) {
  return [
    { A1: 0, A2: 1, B1: 2 }[record.level],
    wordTokens(record.translations.de.text).length,
    Number(record.id),
  ];
}
function comparePriority(left, right) {
  var leftPriority = priorityFor(left),
    rightPriority = priorityFor(right);
  for (var index = 0; index < leftPriority.length; index++) {
    var difference = leftPriority[index] - rightPriority[index];
    if (difference) return difference;
  }
  return 0;
}
function reviewKey(record, set) {
  var highMatch = record.matches.find((match) => match.confidence === "high");
  if (set === "cases") return highMatch.article;
  if (set === "modals") return highMatch.lemma;
  return highMatch.prefix || highMatch.finalPrefix || highMatch.infinitive;
}
function reviewQueue(records, set, limit) {
  var buckets = new Map(),
    selected = [],
    selectedIds = new Set();
  records
    .filter(
      (record) =>
        !record.alreadyUsed &&
        record.matches.some((match) => match.confidence === "high"),
    )
    .sort(comparePriority)
    .forEach((record) => {
      var key = reviewKey(record, set);
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(record);
    });
  var keys = [...buckets.keys()].sort();
  while (selected.length < limit) {
    var added = false;
    for (const key of keys) {
      var record = buckets.get(key).shift();
      while (record && selectedIds.has(record.id))
        record = buckets.get(key).shift();
      if (!record) continue;
      selected.push(record);
      selectedIds.add(record.id);
      added = true;
      if (selected.length === limit) break;
    }
    if (!added) break;
  }
  return selected;
}
function reviewCoverage(records, set) {
  return Object.fromEntries(
    Object.entries(
      Object.groupBy(records, (record) => reviewKey(record, set)),
    ).map(([key, grouped]) => [key, grouped.length]),
  );
}
function buildReport(limit) {
  const { phrases, vocabulary, applications } = loadData();
  const verbForms = new Set(
    vocabulary
      .filter((word) => word.pos === "verb")
      .map((word) => lower(word.translations.de.text)),
  );
  const existingSourceIds = Object.fromEntries(
    ["cases", "modals", "separable"].map((set) => [
      set,
      new Set(
        applications
          .filter((application) => application.set === set)
          .map((application) => application.sourcePhraseId),
      ),
    ]),
  );
  const separableWords = new Map(
    vocabulary
      .filter((word) => word.translations.de.separable)
      .map((word) => [word.id, word]),
  );
  // Do not infer arbitrary compounds from the deck's separable flag. A terminal
  // member of this deliberately conservative prefix list is required; metadata
  // then upgrades an exact phrase→verb link from review to high confidence.
  const prefixes = new Set([
    "ab",
    "an",
    "auf",
    "aus",
    "bei",
    "ein",
    "entgegen",
    "fest",
    "fort",
    "her",
    "heraus",
    "heran",
    "herum",
    "hin",
    "hinein",
    "hinaus",
    "hinzu",
    "los",
    "mit",
    "nach",
    "nieder",
    "ran",
    "raus",
    "rein",
    "runter",
    "rüber",
    "um",
    "unter",
    "vor",
    "voran",
    "vorbei",
    "weg",
    "weiter",
    "zu",
    "zurück",
    "zusammen",
  ]);
  const candidates = { cases: [], modals: [], separable: [] };
  for (const phrase of phrases) {
    const tokens = wordTokens(phrase.translations.de.text);
    const article = articleMatches(tokens);
    const modal = modalMatches(tokens, verbForms);
    const separable = separableMatches(
      phrase,
      tokens,
      separableWords,
      prefixes,
    );
    if (article.length)
      candidates.cases.push(
        candidateRecord(phrase, article, existingSourceIds.cases),
      );
    if (modal.length)
      candidates.modals.push(
        candidateRecord(phrase, modal, existingSourceIds.modals),
      );
    if (separable.length)
      candidates.separable.push(
        candidateRecord(phrase, separable, existingSourceIds.separable),
      );
  }
  for (const [set, sourceIds] of Object.entries(existingSourceIds)) {
    const flaggedIds = new Set(
      candidates[set].map((candidate) => candidate.id),
    );
    for (const sourceId of sourceIds)
      if (!flaggedIds.has(sourceId))
        throw Error(
          `Candidate finder missed existing ${set} application source ${sourceId}`,
        );
  }
  const count = (records) => ({
    flagged: records.length,
    existing: records.filter((record) => record.alreadyUsed).length,
    new: records.filter((record) => !record.alreadyUsed).length,
    highConfidence: records.filter((record) =>
      record.matches.some((match) => match.confidence === "high"),
    ).length,
  });
  var queues = Object.fromEntries(
    Object.entries(candidates).map(([set, records]) => [
      set,
      reviewQueue(records, set, limit),
    ]),
  );
  return {
    generatedBy: "scripts/find-grammar-phrase-candidates.cjs",
    description:
      "A review queue only. Confirm the exact blank, answer, case, and explanation before promoting a candidate to data/application.js.",
    phraseCount: phrases.length,
    summary: Object.fromEntries(
      Object.entries(candidates).map(([set, records]) => [set, count(records)]),
    ),
    reviewLimit: limit,
    reviewCoverage: Object.fromEntries(
      Object.entries(queues).map(([set, records]) => [
        set,
        reviewCoverage(records, set),
      ]),
    ),
    reviewQueue: queues,
  };
}

const limitArgument = process.argv.find((argument) =>
  argument.startsWith("--limit="),
);
const reviewLimit = limitArgument ? Number(limitArgument.slice(8)) : 250;
if (!Number.isInteger(reviewLimit) || reviewLimit < 1)
  throw Error("--limit must be a positive whole number");
const report = buildReport(reviewLimit);
const serialized = JSON.stringify(report, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (
    !fs.existsSync(outputPath) ||
    fs.readFileSync(outputPath, "utf8") !== serialized
  )
    throw Error(
      "Grammar phrase candidate report is out of date; rerun the script.",
    );
} else fs.writeFileSync(outputPath, serialized);
console.log(JSON.stringify(report.summary, null, 2));
