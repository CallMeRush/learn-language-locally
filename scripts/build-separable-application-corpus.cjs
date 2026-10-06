/* Build every high-confidence, phrase-linked separable-verb application.

   Run:
     node scripts/build-separable-application-corpus.cjs --write
     node scripts/build-separable-application-corpus.cjs --check
*/
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const applicationPath = path.join(root, "data/application.js");
const markerStart = "  /* BEGIN GENERATED SEPARABLE APPLICATIONS */";
const markerEnd = "  /* END GENERATED SEPARABLE APPLICATIONS */";
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

function applicationSourceWithoutGeneratedSeparables() {
  const source = fs.readFileSync(applicationPath, "utf8");
  const start = source.indexOf(markerStart);
  const end = source.indexOf(markerEnd);
  if (start < 0 || end < start)
    throw Error(
      "Missing generated-separable-corpus markers in data/application.js",
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
    applicationSourceWithoutGeneratedSeparables() +
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
    left.prefix.localeCompare(right.prefix, "de") ||
    level[left.level] - level[right.level] ||
    left.tokens.length - right.tokens.length ||
    Number(left.phrase.id) - Number(right.phrase.id)
  );
}
function build() {
  const { phrases, vocabulary, applications } = loadData();
  const separableWords = new Map(
    vocabulary
      .filter((word) => word.translations.de.separable)
      .map((word) => [word.id, word]),
  );
  const existingSources = new Set(
    applications
      .filter((record) => record.set === "separable")
      .map((record) => record.sourcePhraseId),
  );
  const candidates = [];
  for (const phrase of phrases) {
    if (existingSources.has(phrase.id)) continue;
    const tokens = tokenise(phrase.translations.de.text);
    const terminal = tokens.at(-1);
    if (!terminal) continue;
    const linked = phrase.wordIds
      .map((id) => separableWords.get(id))
      .filter(Boolean)
      .filter(
        (word) =>
          word.translations.de.prefix?.toLocaleLowerCase("de") ===
          terminal.lower,
      );
    if (!linked.length) continue;
    candidates.push({
      phrase,
      tokens,
      prefix: terminal.lower,
      infinitive: linked[0].translations.de.text,
      sourceWordId: linked[0].id,
      level: levelForPhrase(phrase.level),
    });
  }
  const highestId = Math.max(
    0,
    ...applications
      .filter((record) => record.set === "separable")
      .map((record) => Number(record.id.slice("separable-".length))),
  );
  return Array.from(
    new Map(
      candidates.map((candidate) => [candidate.phrase.id, candidate]),
    ).values(),
  )
    .sort(compareCandidates)
    .map((candidate, index) => {
      const sentence = candidate.phrase.translations.de.text;
      const terminal = candidate.tokens.at(-1);
      return {
        id: `separable-${highestId + index + 1}`,
        type: "grammar-application",
        set: "separable",
        grammarId: "grammar-de-6",
        level: candidate.level,
        sourcePhraseId: candidate.phrase.id,
        sourceWordId: candidate.sourceWordId,
        translations: candidate.phrase.translations,
        exercise: {
          blanked:
            sentence.slice(0, terminal.start) +
            "___" +
            sentence.slice(terminal.end),
          answer: candidate.prefix,
          prefix: candidate.prefix,
          cue: candidate.infinitive,
          explanation: `${candidate.infinitive} is separable: ${candidate.prefix} moves to the end in this clause.`,
        },
      };
    });
}
function replaceGeneratedCorpus(source, records) {
  const start = source.indexOf(markerStart);
  const end = source.indexOf(markerEnd);
  if (start < 0 || end < start)
    throw Error(
      "Missing generated-separable-corpus markers in data/application.js",
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
    throw Error(
      "Generated separable corpus is out of date; rerun with --write.",
    );
} else if (process.argv.includes("--write"))
  fs.writeFileSync(applicationPath, expected);
else throw Error("Use --write to update the corpus or --check to validate it.");
console.log(`PASS: ${records.length} generated separable-verb exercises`);
console.log(
  JSON.stringify(
    Object.fromEntries(
      Object.entries(
        Object.groupBy(records, (record) => record.exercise.prefix),
      )
        .map(([prefix, grouped]) => [prefix, grouped.length])
        .sort(([left], [right]) => left.localeCompare(right, "de")),
    ),
    null,
    2,
  ),
);
