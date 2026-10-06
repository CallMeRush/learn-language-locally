/*
  Build the static, balanced case-and-article exercise corpus.

  It selects phrase-backed exercises from the bundled sentence collection using
  the bundled noun declension table. The output is committed into
  data/application.js; the app never generates exercises at runtime.

  Run:
    node scripts/build-case-application-corpus.cjs --write
    node scripts/build-case-application-corpus.cjs --check
*/
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const applicationPath = path.join(root, "data/application.js");
const generatedStart = "  /* BEGIN GENERATED CASE APPLICATIONS */";
const generatedEnd = "  /* END GENERATED CASE APPLICATIONS */";
const genders = ["masculine", "feminine", "neuter"];
const cases = ["nominative", "accusative", "dative", "genitive"];
const perCell = 30;
const strictDativePrepositions = new Set([
  "aus",
  "außer",
  "ausser",
  "bei",
  "mit",
  "nach",
  "seit",
  "von",
  "zu",
  "gegenüber",
]);
const accusativePrepositions = new Set([
  "durch",
  "für",
  "fuer",
  "gegen",
  "ohne",
  "um",
  "wider",
]);
const genitivePrepositions = new Set([
  "trotz",
  "während",
  "waehrend",
  "wegen",
  "innerhalb",
  "außerhalb",
  "ausserhalb",
  "oberhalb",
  "unterhalb",
  "diesseits",
  "jenseits",
  "anstatt",
  "statt",
]);
const otherPrepositions = new Set([
  ...strictDativePrepositions,
  ...accusativePrepositions,
  ...genitivePrepositions,
  "an",
  "auf",
  "hinter",
  "in",
  "neben",
  "über",
  "ueber",
  "unter",
  "vor",
  "zwischen",
  "bis",
  "dank",
]);
const levelForPhrase = (level) =>
  ({ easy: "A1", medium: "A2", hard: "B1" })[level];
const wordTokens = (text) => {
  const expression = /[\p{L}]+(?:['’-][\p{L}]+)?/gdu;
  return [...text.matchAll(expression)].map((match) => ({
    text: match[0],
    lower: match[0].toLocaleLowerCase("de"),
    start: match.index,
    end: match.index + match[0].length,
  }));
};
const isCapitalized = (text) => /^[A-ZÄÖÜ]/u.test(text || "");
const articleKind = (article) =>
  ["der", "die", "das", "den", "dem", "des"].includes(article)
    ? "definite"
    : "indefinite";
const baseArticle = (gender) =>
  ({ masculine: "der", feminine: "die", neuter: "das" })[gender];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}
function applicationSourceWithoutGeneratedCorpus() {
  const source = fs.readFileSync(applicationPath, "utf8");
  const start = source.indexOf(generatedStart);
  const end = source.indexOf(generatedEnd);
  if (start < 0 || end < start)
    throw Error("Missing generated-case-corpus markers in data/application.js");
  return source.slice(0, start + generatedStart.length) + source.slice(end);
}
function loadData() {
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    read("data/manifest.js") + ";this.manifest=contentManifest",
    context,
  );
  vm.runInContext(
    applicationSourceWithoutGeneratedCorpus() +
      ";this.applications=grammarApplications",
    context,
  );
  const phrases = [];
  context.WortwerkData = {
    register(kind, _group, records) {
      if (kind === "phrases") phrases.push(...records);
    },
  };
  for (const entry of Object.values(context.manifest.phrases))
    vm.runInContext(read(entry.src), context, { filename: entry.src });
  return { phrases, applications: context.applications };
}
function nounForms() {
  const lines = read("dictionaries/sources/nouns.csv")
    .trim()
    .split(/\r?\n/u);
  const headers = lines.shift().split(",");
  const forms = new Map();
  for (const line of lines) {
    const columns = line.split(",");
    const gender = { m: "masculine", f: "feminine", n: "neuter" }[
      columns[2]
    ];
    if (!gender) continue;
    const lemma = columns[0];
    columns.forEach((value, index) => {
      const form = value.trim().toLocaleLowerCase("de");
      if (!form || form.includes("/")) return;
      const entry = forms.get(form) || {
        genders: new Set(),
        singular: false,
        plural: false,
        lemmas: new Set(),
      };
      entry.genders.add(gender);
      entry.lemmas.add(lemma);
      entry.singular ||= headers[index].includes("singular") || index === 0;
      entry.plural ||= headers[index].includes("plural");
      forms.set(form, entry);
    });
  }
  return forms;
}
function nounAfter(tokens, articleIndex, forms) {
  for (let offset = 1; offset <= 4; offset++) {
    const token = tokens[articleIndex + offset];
    if (!isCapitalized(token?.text)) continue;
    const form = forms.get(token?.lower);
    if (!form || form.genders.size !== 1 || !form.singular) continue;
    return {
      token,
      gender: [...form.genders][0],
      lemma: [...form.lemmas].sort((left, right) => left.length - right.length)[0],
      singularOnly: !form.plural,
    };
  }
  return null;
}
function classify(article, noun, tokens, index) {
  const previous = tokens[index - 1]?.lower;
  const startsSentence = index === 0;
  const key = (caseName) => `${noun.gender}:${caseName}`;
  if (
    noun.gender === "masculine" &&
    ["der", "ein"].includes(article) &&
    startsSentence
  )
    return { key: key("nominative"), reason: "subject" };
  if (
    noun.gender === "masculine" &&
    ["den", "einen"].includes(article) &&
    noun.singularOnly
  )
    return { key: key("accusative"), reason: "article-form" };
  if (
    noun.gender === "masculine" &&
    ["dem", "einem"].includes(article) &&
    noun.singularOnly
  )
    return { key: key("dative"), reason: "article-form" };
  if (
    noun.gender === "masculine" &&
    ["des", "eines"].includes(article) &&
    noun.singularOnly
  )
    return { key: key("genitive"), reason: "article-form" };
  if (
    noun.gender === "feminine" &&
    ["die", "eine"].includes(article) &&
    startsSentence
  )
    return { key: key("nominative"), reason: "subject" };
  if (
    noun.gender === "feminine" &&
    ["die", "eine"].includes(article) &&
    accusativePrepositions.has(previous)
  )
    return { key: key("accusative"), reason: "accusative-preposition", previous };
  if (
    noun.gender === "feminine" &&
    ["der", "einer"].includes(article) &&
    strictDativePrepositions.has(previous)
  )
    return { key: key("dative"), reason: "dative-preposition", previous };
  if (
    noun.gender === "feminine" &&
    ["der", "einer"].includes(article) &&
    (genitivePrepositions.has(previous) ||
      (isCapitalized(tokens[index - 1]?.text) &&
        !otherPrepositions.has(previous)))
  )
    return {
      key: key("genitive"),
      reason: genitivePrepositions.has(previous)
        ? "genitive-preposition"
        : "possessive",
      previous,
    };
  if (
    noun.gender === "neuter" &&
    ["das", "ein"].includes(article) &&
    startsSentence
  )
    return { key: key("nominative"), reason: "subject" };
  if (
    noun.gender === "neuter" &&
    ["das", "ein"].includes(article) &&
    accusativePrepositions.has(previous)
  )
    return { key: key("accusative"), reason: "accusative-preposition", previous };
  if (
    noun.gender === "neuter" &&
    ["dem", "einem"].includes(article) &&
    noun.singularOnly
  )
    return { key: key("dative"), reason: "article-form" };
  if (
    noun.gender === "neuter" &&
    ["des", "eines"].includes(article) &&
    noun.singularOnly
  )
    return { key: key("genitive"), reason: "article-form" };
  return null;
}
function explanation(candidate) {
  const { noun, article, caseName, reason } = candidate;
  const gender = noun.gender;
  const label = `${gender[0].toUpperCase() + gender.slice(1)} ${caseName}`;
  if (reason === "subject")
    return `${noun.lemma} is the subject here. ${label} uses ${article}.`;
  if (reason === "accusative-preposition")
    return `${candidate.previous} takes accusative here. ${noun.lemma} is ${gender}, so the article is ${article}.`;
  if (reason === "dative-preposition")
    return `${candidate.previous} takes dative. ${noun.lemma} is ${gender}, so the article is ${article}.`;
  if (reason === "genitive-preposition")
    return `${candidate.previous} takes genitive here. ${noun.lemma} is ${gender}, so the article is ${article}.`;
  if (reason === "possessive")
    return `The phrase marks a possessive relationship. ${noun.lemma} is feminine, so feminine genitive uses ${article}.`;
  return `${noun.lemma} is ${gender}; this article form marks ${caseName}.`;
}
function compareCandidates(left, right) {
  const level = { A1: 0, A2: 1, B1: 2 };
  return (
    level[left.level] - level[right.level] ||
    left.tokens.length - right.tokens.length ||
    Number(left.phrase.id) - Number(right.phrase.id) ||
    left.articleStart - right.articleStart
  );
}
function build() {
  const { phrases, applications } = loadData();
  const forms = nounForms();
  const occupiedSources = new Set(
    applications
      .filter((record) => record.set === "cases")
      .map((record) => record.sourcePhraseId),
  );
  const buckets = Object.fromEntries(
    genders.flatMap((gender) =>
      cases.map((caseName) => [`${gender}:${caseName}`, []]),
    ),
  );
  for (const phrase of phrases) {
    const tokens = wordTokens(phrase.translations.de.text);
    tokens.forEach((token, index) => {
      if (![
        "der", "die", "das", "den", "dem", "des",
        "ein", "eine", "einen", "einem", "einer", "eines",
      ].includes(token.lower))
        return;
      const noun = nounAfter(tokens, index, forms);
      if (!noun) return;
      const classification = classify(token.lower, noun, tokens, index);
      if (!classification) return;
      const [gender, caseName] = classification.key.split(":");
      buckets[classification.key].push({
        phrase,
        tokens,
        article: token.text,
        articleLower: token.lower,
        articleStart: token.start,
        articleEnd: token.end,
        noun,
        gender,
        caseName,
        ...classification,
        level: levelForPhrase(phrase.level),
      });
    });
  }
  const selected = [];
  for (const [key, candidates] of Object.entries(buckets)) {
    const uniqueBySource = new Map();
    candidates.sort(compareCandidates).forEach((candidate) => {
      if (!uniqueBySource.has(candidate.phrase.id))
        uniqueBySource.set(candidate.phrase.id, candidate);
    });
    const choices = [...uniqueBySource.values()].filter(
      (candidate) => !occupiedSources.has(candidate.phrase.id),
    );
    if (choices.length < perCell)
      throw Error(`${key} has only ${choices.length} safe candidates; need ${perCell}`);
    let added = 0;
    for (const candidate of choices) {
      if (occupiedSources.has(candidate.phrase.id)) continue;
      selected.push(candidate);
      occupiedSources.add(candidate.phrase.id);
      added++;
      if (added === perCell) break;
    }
    if (added < perCell)
      throw Error(`${key} has only ${added} unique source phrases after balancing`);
  }
  const highestExistingId = Math.max(
    0,
    ...applications
      .filter((record) => record.set === "cases")
      .map((record) => Number(record.id.slice("case-".length))),
  );
  const records = selected.map((candidate, index) => {
    const sentence = candidate.phrase.translations.de.text;
    return {
      id: `case-${highestExistingId + index + 1}`,
      type: "grammar-application",
      set: "cases",
      grammarId: "grammar-de-3",
      level: candidate.level,
      sourcePhraseId: candidate.phrase.id,
      translations: candidate.phrase.translations,
      exercise: {
        blanked:
          sentence.slice(0, candidate.articleStart) +
          "___" +
          sentence.slice(candidate.articleEnd),
        answer: candidate.article,
        noun: candidate.noun.lemma,
        gender: baseArticle(candidate.gender),
        case: candidate.caseName,
        article: articleKind(candidate.articleLower),
        explanation: explanation(candidate),
      },
    };
  });
  const coverage = Object.fromEntries(
    Object.entries(buckets).map(([key]) => [
      key,
      records.filter(
        (record) =>
          key ===
          `${
            { der: "masculine", die: "feminine", das: "neuter" }[
              record.exercise.gender
            ]
          }:${record.exercise.case}`,
      ).length,
    ]),
  );
  return { records, coverage, phraseCount: phrases.length };
}
function replaceGeneratedCorpus(source, records) {
  const start = source.indexOf(generatedStart);
  const end = source.indexOf(generatedEnd);
  if (start < 0 || end < start)
    throw Error("Missing generated-case-corpus markers in data/application.js");
  const generated = records
    .map((record) => "  " + JSON.stringify(record, null, 2).replace(/\n/g, "\n  ") + ",")
    .join("\n");
  return (
    source.slice(0, start + generatedStart.length) +
    "\n" +
    generated +
    "\n" +
    source.slice(end)
  );
}

const result = build();
const original = fs.readFileSync(applicationPath, "utf8");
const expected = replaceGeneratedCorpus(original, result.records);
if (process.argv.includes("--check")) {
  if (original !== expected)
    throw Error("Generated case corpus is out of date; rerun with --write.");
} else if (process.argv.includes("--write")) {
  fs.writeFileSync(applicationPath, expected);
} else {
  throw Error("Use --write to update the static corpus or --check to validate it.");
}
console.log(
  `PASS: ${result.records.length} generated case exercises across ${result.phraseCount} phrases`,
);
console.log(JSON.stringify(result.coverage, null, 2));
