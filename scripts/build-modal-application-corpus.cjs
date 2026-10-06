/* Build the static modal-verb application expansion from phrase candidates.

   Run:
     node scripts/build-modal-application-corpus.cjs --write
     node scripts/build-modal-application-corpus.cjs --check
*/
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const applicationPath = path.join(root, "data/application.js");
const markerStart = "  /* BEGIN GENERATED MODAL APPLICATIONS */";
const markerEnd = "  /* END GENERATED MODAL APPLICATIONS */";
const additionsByLemma = {
  dürfen: 5,
  sollen: 7,
  wollen: 6,
  möchten: 5,
  können: 6,
  müssen: 6,
};
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
const levelForPhrase = (level) =>
  ({ easy: "A1", medium: "A2", hard: "B1" })[level];
const tokenise = (text) =>
  [...text.matchAll(/[\p{L}]+(?:['’-][\p{L}]+)?/dgu)].map((match) => ({
    text: match[0],
    lower: match[0].toLocaleLowerCase("de"),
    start: match.index,
    end: match.index + match[0].length,
  }));
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

function applicationSourceWithoutGeneratedModals() {
  const source = fs.readFileSync(applicationPath, "utf8");
  const start = source.indexOf(markerStart);
  const end = source.indexOf(markerEnd);
  if (start < 0 || end < start)
    throw Error(
      "Missing generated-modal-corpus markers in data/application.js",
    );
  return source.slice(0, start + markerStart.length) + source.slice(end);
}
function loadData() {
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    read("data/manifest.js") + ";this.manifest=contentManifest",
    context,
  );
  vm.runInContext(
    applicationSourceWithoutGeneratedModals() +
      ";this.applications=grammarApplications",
    context,
  );
  const phrases = [];
  const vocabulary = [];
  context.WortwerkData = {
    register(kind, _group, records) {
      if (kind === "phrases") phrases.push(...records);
      else vocabulary.push(...records);
    },
  };
  for (const kind of ["vocabulary", "verbs", "phrases"])
    for (const entry of Object.values(context.manifest[kind]))
      vm.runInContext(read(entry.src), context, { filename: entry.src });
  return { phrases, vocabulary, applications: context.applications };
}
function compareCandidates(left, right) {
  const level = { A1: 0, A2: 1, B1: 2 };
  return (
    level[left.level] - level[right.level] ||
    left.tokens.length - right.tokens.length ||
    Number(left.phrase.id) - Number(right.phrase.id)
  );
}
function build() {
  const { phrases, vocabulary, applications } = loadData();
  const verbForms = new Map(
    vocabulary
      .filter((word) => word.pos === "verb")
      .map((word) => [
        word.translations.de.text.toLocaleLowerCase("de"),
        word.translations.de.text,
      ]),
  );
  const existingSources = new Set(
    applications
      .filter((record) => record.set === "modals")
      .map((record) => record.sourcePhraseId),
  );
  const candidates = Object.fromEntries(
    Object.keys(additionsByLemma).map((lemma) => [lemma, []]),
  );
  for (const phrase of phrases) {
    if (existingSources.has(phrase.id)) continue;
    const tokens = tokenise(phrase.translations.de.text);
    const finalToken = tokens.at(-1);
    const infinitive = verbForms.get(finalToken?.lower);
    if (!infinitive) continue;
    tokens.slice(0, -1).forEach((token) => {
      const lemma = modalForms.get(token.lower);
      if (!lemma || !(lemma in candidates)) return;
      candidates[lemma].push({
        phrase,
        tokens,
        form: token,
        infinitive,
        level: levelForPhrase(phrase.level),
      });
    });
  }
  const usedSources = new Set(existingSources);
  const selected = [];
  for (const [lemma, count] of Object.entries(additionsByLemma)) {
    const unique = new Map();
    candidates[lemma].sort(compareCandidates).forEach((candidate) => {
      if (!unique.has(candidate.phrase.id))
        unique.set(candidate.phrase.id, candidate);
    });
    let added = 0;
    for (const candidate of unique.values()) {
      if (usedSources.has(candidate.phrase.id)) continue;
      selected.push({ ...candidate, lemma });
      usedSources.add(candidate.phrase.id);
      if (++added === count) break;
    }
    if (added !== count)
      throw Error(
        `Only found ${added} safe ${lemma} candidates; need ${count}`,
      );
  }
  const highestId = Math.max(
    0,
    ...applications
      .filter((record) => record.set === "modals")
      .map((record) => Number(record.id.slice("modal-".length))),
  );
  return selected.map((candidate, index) => {
    const sentence = candidate.phrase.translations.de.text;
    return {
      id: `modal-${highestId + index + 1}`,
      type: "grammar-application",
      set: "modals",
      grammarId: "grammar-de-5",
      level: candidate.level,
      sourcePhraseId: candidate.phrase.id,
      translations: candidate.phrase.translations,
      exercise: {
        blanked:
          sentence.slice(0, candidate.tokens.at(-1).start) +
          "___" +
          sentence.slice(candidate.tokens.at(-1).end),
        answer: candidate.infinitive,
        cue: `${candidate.lemma} + infinitive`,
        explanation: `${candidate.form.text} is the conjugated form of ${candidate.lemma}; ${candidate.infinitive} remains an infinitive at the end.`,
      },
    };
  });
}
function replaceGeneratedCorpus(source, records) {
  const start = source.indexOf(markerStart);
  const end = source.indexOf(markerEnd);
  if (start < 0 || end < start)
    throw Error(
      "Missing generated-modal-corpus markers in data/application.js",
    );
  const generated = records
    .map(
      (record) =>
        "  " + JSON.stringify(record, null, 2).replace(/\n/g, "\n  ") + ",",
    )
    .join("\n");
  return (
    source.slice(0, start + markerStart.length) +
    "\n" +
    generated +
    "\n" +
    source.slice(end)
  );
}

const records = build();
const source = fs.readFileSync(applicationPath, "utf8");
const expected = replaceGeneratedCorpus(source, records);
if (process.argv.includes("--check")) {
  if (source !== expected)
    throw Error("Generated modal corpus is out of date; rerun with --write.");
} else if (process.argv.includes("--write"))
  fs.writeFileSync(applicationPath, expected);
else throw Error("Use --write to update the corpus or --check to validate it.");
console.log(`PASS: ${records.length} generated modal exercises`);
console.log(
  JSON.stringify(
    Object.fromEntries(
      Object.entries(
        Object.groupBy(records, (record) => record.exercise.cue.split(" ")[0]),
      ).map(([lemma, grouped]) => [lemma, grouped.length]),
    ),
    null,
    2,
  ),
);
