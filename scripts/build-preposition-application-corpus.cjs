/* Build static fixed-case preposition exercises from exact phrase records. */
const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm");
const root = path.resolve(__dirname, ".."),
  applicationPath = path.join(root, "data/application.js");
const reportPath = path.join(
  root,
  "data/import/preposition-phrase-candidates.json",
);
const startMarker = "  /* BEGIN GENERATED PREPOSITION APPLICATIONS */",
  endMarker = "  /* END GENERATED PREPOSITION APPLICATIONS */";
const groups = {
  accusative: ["durch", "für", "gegen", "ohne", "um"],
  dative: ["aus", "bei", "mit", "nach", "seit", "von", "zu"],
};
const limit = 50;
const starterWords = new Set(
  "der die das den dem des ein eine einen einem einer eines mein meine meinen meinem meiner unser unsere unseren unserem unserer dein deine deinen deinem deiner sein seine seinen seinem seiner ihr ihre ihren ihrem ihrer kein keine keinen keinem keiner welcher welche welchen welchem welcher dieser diese diesen diesem dieser jeder jede jeden jedem jeder mancher manche manchen manchem solcher solche solchen solchem alle allen manchen vielen wenigen einigen mehreren anderen guten neuen alten kleinen großen grossen".split(
    " ",
  ),
);
const pronouns = new Set(
  "mich dich ihn sie es uns euch mir dir ihm ihr ihnen wem wen was".split(" "),
);
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const level = (value) => ({ easy: "A1", medium: "A2", hard: "B1" })[value];
const tokens = (text) =>
  [...text.matchAll(/[\p{L}]+(?:['’-][\p{L}]+)?/dgu)].map((match) => ({
    text: match[0],
    lower: match[0].toLocaleLowerCase("de"),
    start: match.index,
    end: match.index + match[0].length,
  }));
const capitalized = (text) => /^[A-ZÄÖÜ]/u.test(text || "");
function sourceWithoutGenerated() {
  const source = fs.readFileSync(applicationPath, "utf8"),
    start = source.indexOf(startMarker),
    end = source.indexOf(endMarker);
  if (start < 0 || end < start)
    throw Error("Missing generated-preposition-corpus markers");
  return source.slice(0, start + startMarker.length) + source.slice(end);
}
function load() {
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    read("data/manifest.js") + ";this.manifest=contentManifest",
    context,
  );
  vm.runInContext(
    sourceWithoutGenerated() + ";this.applications=grammarApplications",
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
function candidates() {
  const { phrases, applications } = load(),
    existing = new Set(
      applications
        .filter((record) => record.set === "prepositions")
        .map((record) => record.sourcePhraseId),
    );
  const prepCase = new Map(
    Object.entries(groups).flatMap(([caseName, preps]) =>
      preps.map((prep) => [prep, caseName]),
    ),
  );
  const found = [];
  for (const phrase of phrases) {
    if (existing.has(phrase.id)) continue;
    const words = tokens(phrase.translations.de.text);
    words.forEach((word, index) => {
      const caseName = prepCase.get(word.lower),
        next = words[index + 1];
      if (
        !caseName ||
        !next ||
        !(
          capitalized(next.text) ||
          starterWords.has(next.lower) ||
          pronouns.has(next.lower)
        )
      )
        return;
      found.push({
        phrase,
        word,
        preposition: word.lower,
        case: caseName,
        level: level(phrase.level),
      });
    });
  }
  return found;
}
function build() {
  const { applications } = load(),
    found = candidates(),
    used = new Set(),
    selected = [];
  const ordered = Object.values(groups)
    .flat()
    .sort(
      (a, b) =>
        found.filter((item) => item.preposition === a).length -
          found.filter((item) => item.preposition === b).length ||
        a.localeCompare(b, "de"),
    );
  for (const preposition of ordered) {
    let count = 0;
    for (const candidate of found
      .filter((item) => item.preposition === preposition)
      .sort(
        (a, b) =>
          ({ A1: 0, A2: 1, B1: 2 })[a.level] -
            { A1: 0, A2: 1, B1: 2 }[b.level] ||
          Number(a.phrase.id) - Number(b.phrase.id),
      )) {
      if (used.has(candidate.phrase.id) || count === limit) continue;
      used.add(candidate.phrase.id);
      selected.push(candidate);
      count++;
    }
  }
  const highest = Math.max(
    0,
    ...applications
      .filter((record) => record.set === "prepositions")
      .map((record) => Number(record.id.slice("preposition-".length))),
  );
  return selected.map((candidate, index) => ({
    id: `preposition-${highest + index + 1}`,
    type: "grammar-application",
    set: "prepositions",
    grammarId: "grammar-de-9",
    level: candidate.level,
    sourcePhraseId: candidate.phrase.id,
    translations: candidate.phrase.translations,
    exercise: {
      blanked:
        candidate.phrase.translations.de.text.slice(0, candidate.word.start) +
        "___" +
        candidate.phrase.translations.de.text.slice(candidate.word.end),
      answer: candidate.word.text,
      preposition: candidate.preposition,
      case: candidate.case,
      cue: `${candidate.case[0].toUpperCase() + candidate.case.slice(1)} preposition`,
      explanation: `${candidate.preposition} always takes the ${candidate.case}.`,
    },
  }));
}
function replace(source, records) {
  const start = source.indexOf(startMarker),
    end = source.indexOf(endMarker);
  const body = records
    .map(
      (record) =>
        "  " + JSON.stringify(record, null, 2).replace(/\n/g, "\n  ") + ",",
    )
    .join("\n");
  return (
    source.slice(0, start + startMarker.length) +
    "\n" +
    body +
    "\n" +
    source.slice(end)
  );
}
const found = candidates(),
  report = {
    generatedBy: "scripts/build-preposition-application-corpus.cjs",
    description:
      "Safe fixed-case preposition candidates: the phrase must use the exact preposition before a likely noun phrase or pronoun.",
    summary: Object.fromEntries(
      Object.entries(groups).flatMap(([caseName, preps]) =>
        preps.map((prep) => [
          prep,
          {
            case: caseName,
            candidates: found.filter((item) => item.preposition === prep)
              .length,
            selected: Math.min(
              limit,
              found.filter((item) => item.preposition === prep).length,
            ),
          },
        ]),
      ),
    ),
    candidates: found.map((item) => ({
      id: item.phrase.id,
      level: item.level,
      preposition: item.preposition,
      case: item.case,
      translations: item.phrase.translations,
    })),
  };
const records = build(),
  source = fs.readFileSync(applicationPath, "utf8"),
  expected = replace(source, records),
  serialized = JSON.stringify(report, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (source !== expected)
    throw Error(
      "Generated preposition corpus is out of date; rerun with --write.",
    );
  if (
    !fs.existsSync(reportPath) ||
    fs.readFileSync(reportPath, "utf8") !== serialized
  )
    throw Error(
      "Preposition candidate report is out of date; rerun with --write.",
    );
} else if (process.argv.includes("--write")) {
  fs.writeFileSync(applicationPath, expected);
  fs.writeFileSync(reportPath, serialized);
} else
  throw Error("Use --write to update the corpus or --check to validate it.");
console.log(
  JSON.stringify(
    {
      exercises: records.length,
      coverage: Object.fromEntries(
        Object.entries(
          Object.groupBy(records, (record) => record.exercise.preposition),
        ).map(([prep, items]) => [prep, items.length]),
      ),
    },
    null,
    2,
  ),
);
