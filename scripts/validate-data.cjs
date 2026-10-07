const fs = require("node:fs"),
  vm = require("node:vm"),
  assert = require("node:assert/strict"),
  path = require("node:path");
const root = path.resolve(__dirname, ".."),
  context = {};
vm.createContext(context);
for (const file of [
  "data/manifest.js",
  "data/categories.js",
  "data/grammar.js",
  "data/application.js",
  "data/lessons.js",
])
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, {
    filename: file,
  });
vm.runInContext("this.contentManifest=contentManifest", context);
const collectedVocab = [],
  collectedPhrases = [];
context.WortwerkData = {
  register(kind, group, records) {
    if (kind === "phrases") collectedPhrases.push(...records);
    else
      collectedVocab.push(
        ...records.map((item) => ({
          ...item,
          category: kind === "verbs" ? "verbs" : group,
          ...(kind === "verbs" ? { verbCategory: group } : {}),
        })),
      );
  },
};
for (const kind of ["vocabulary", "verbs", "phrases"])
  for (const entry of Object.values(context.contentManifest[kind]))
    vm.runInContext(
      fs.readFileSync(path.join(root, entry.src), "utf8"),
      context,
      { filename: entry.src },
    );
context.vocab = collectedVocab;
context.phrases = collectedPhrases;
vm.runInContext(
  "this.content={vocab,phrases,lessons,lessonUnits,grammarLessons,grammarApplications,categoryRecords}",
  context,
);
const {
  vocab,
  phrases,
  lessons,
  lessonUnits,
  grammarLessons,
  grammarApplications,
  categoryRecords,
} = context.content;
const categories = new Set(categoryRecords.map((c) => c.id)),
  wordIds = new Set(vocab.map((w) => w.id)),
  ids = new Set();
const levels = new Set(["A1", "A2", "B1"]),
  phraseLevel = (p) => ({ easy: "A1", medium: "A2", hard: "B1" })[p.level];
const phraseTokens = (text) =>
  (text.match(/[\p{L}]+(?:['’-][\p{L}]+)?/gu) || []).map((token) =>
    token.toLocaleLowerCase("de"),
  );
for (const item of [...vocab, ...phrases]) {
  assert.match(item.id, /^[1-9]\d*$/);
  assert(!ids.has(item.id), "Duplicate ID " + item.id);
  ids.add(item.id);
  assert.deepEqual(Object.keys(item.translations).sort(), ["de", "en"]);
  for (const lang of ["en", "de"]) {
    const text = item.translations[lang].text;
    assert.equal(typeof text, "string");
    assert(text.trim());
    assert.equal(text, text.trim());
    assert(!/[<>\u0000-\u001f]/.test(text));
  }
  assert(categories.has(item.category), "Unknown category " + item.category);
}
for (const w of vocab) {
  assert(levels.has(w.level));
  assert(w.pos === "verb" || w.category !== "verbs");
  if (w.pos === "verb") assert.equal(w.category, "verbs");
  if (w.pos === "adjective") {
    assert.equal(w.category, "adjectives");
    assert(
      categories.has("adjective-" + w.adjectiveCategory),
      "Unknown adjective group",
    );
  }
  if (w.pos === "noun") {
    const de = w.translations.de;
    assert(["der", "die", "das"].includes(de.article));
    assert(de.text.startsWith(de.article + " "));
  }
}
const assignments = JSON.parse(
  fs.readFileSync(path.join(root, "data/import/assignments.json"), "utf8"),
);
const reviewFile = JSON.parse(
  fs.readFileSync(
    path.join(root, "data/import/translation-reviews.json"),
    "utf8",
  ),
);
const assignmentIds = new Set(assignments.entries.map((entry) => entry.id)),
  reviewedIds = new Set();
for (const decision of reviewFile.decisions) {
  assert.equal(decision.status, "confirmed");
  assert.match(decision.reference, /\S/);
  assert.match(decision.note, /\S/);
  for (const id of decision.ids) {
    assert(assignmentIds.has(id), "Unknown translation review " + id);
    assert(!reviewedIds.has(id), "Duplicate translation review " + id);
    reviewedIds.add(id);
  }
}
for (const p of phrases) {
  assert(phraseLevel(p));
  assert(p.wordIds.length);
  for (const id of p.wordIds)
    assert(wordIds.has(id), "Broken sentence→word reference " + id);
  assert(
    p.cloze && typeof p.cloze === "object",
    "Missing phrase cloze focus " + p.id,
  );
  for (const lang of ["de", "en"]) {
    assert.equal(
      typeof p.cloze[lang],
      "string",
      "Invalid phrase cloze focus " + p.id + "/" + lang,
    );
    assert(
      phraseTokens(p.translations[lang].text).includes(
        p.cloze[lang].toLocaleLowerCase("de"),
      ),
      "Phrase cloze focus is not in its sentence " + p.id + "/" + lang,
    );
  }
}
for (const g of grammarLessons) {
  assert.equal(g.targetLanguage, "de");
  assert(g.localized.en.title);
  assert(g.localized.en.intro);
  assert(
    g.localized.en.examples.length >= 2,
    "Grammar topic needs at least two study examples",
  );
  for (const example of g.localized.en.examples) {
    assert(
      example.de && example.en && example.note,
      "Incomplete grammar study example",
    );
  }
  for (const t of g.tests) {
    assert.equal(typeof t.prompt, "string");
    assert(t.answers.length);
    assert(t.explain?.trim(), "Grammar check needs an explanation");
  }
}
const applicationIds = new Set(),
  modalSources = new Set(),
  separableSources = new Set(),
  prepositionSources = new Set(),
  prepositionCoverage = new Map();
const grammarIds = new Set(grammarLessons.map((record) => record.id));
const caseSources = new Set(),
  caseCoverage = new Map();
for (const record of grammarApplications) {
  assert.match(record.id, /^(case|modal|separable|preposition)-[1-9]\d*$/);
  assert(
    !applicationIds.has(record.id),
    "Duplicate grammar application ID " + record.id,
  );
  applicationIds.add(record.id);
  assert(["cases", "modals", "separable", "prepositions"].includes(record.set));
  assert(
    grammarIds.has(record.grammarId),
    "Missing grammar application topic " + record.id,
  );
  assert(levels.has(record.level));
  assert(record.translations?.en?.text && record.translations?.de?.text);
  assert(
    record.exercise?.blanked?.includes("___"),
    "Grammar application needs one blank " + record.id,
  );
  assert.equal(
    record.exercise.blanked.replace("___", record.exercise.answer),
    record.translations.de.text,
    "Grammar application blank mismatch " + record.id,
  );
  assert(
    record.exercise.explanation?.trim(),
    "Grammar application explanation required " + record.id,
  );
  const source = phrases.find((phrase) => phrase.id === record.sourcePhraseId);
  assert(source, "Missing grammar application phrase source " + record.id);
  assert.equal(
    source.translations.de.text,
    record.translations.de.text,
    "German source drift " + record.id,
  );
  assert.equal(
    source.translations.en.text,
    record.translations.en.text,
    "English source drift " + record.id,
  );
  if (record.set === "cases") {
    assert(
      !caseSources.has(record.sourcePhraseId),
      "Duplicate case exercise source " + record.sourcePhraseId,
    );
    caseSources.add(record.sourcePhraseId);
    assert(
      ["der", "die", "das"].includes(record.exercise.gender),
      "Case exercise needs a base gender " + record.id,
    );
    assert(
      ["nominative", "accusative", "dative", "genitive"].includes(
        record.exercise.case,
      ),
      "Case exercise needs a grammatical case " + record.id,
    );
    assert(
      ["definite", "indefinite"].includes(record.exercise.article),
      "Case exercise needs an article kind " + record.id,
    );
    assert(
      record.exercise.noun?.trim(),
      "Case exercise needs a noun " + record.id,
    );
    const gender = { der: "masculine", die: "feminine", das: "neuter" }[
        record.exercise.gender
      ],
      key = gender + ":" + record.exercise.case;
    caseCoverage.set(key, (caseCoverage.get(key) || 0) + 1);
  }
  if (record.set === "modals") {
    assert(
      !modalSources.has(record.sourcePhraseId),
      "Duplicate modal exercise source " + record.sourcePhraseId,
    );
    modalSources.add(record.sourcePhraseId);
  }
  if (record.set === "separable") {
    assert(
      !separableSources.has(record.sourcePhraseId),
      "Duplicate separable-verb exercise source " + record.sourcePhraseId,
    );
    separableSources.add(record.sourcePhraseId);
    assert.match(
      record.exercise.answer.toLocaleLowerCase("de"),
      /^\p{L}+$/u,
      "Separable exercise needs a word prefix " + record.id,
    );
    assert.equal(
      phraseTokens(record.translations.de.text).at(-1)?.toLocaleLowerCase("de"),
      record.exercise.answer,
      "Separable prefix must be the final source token " + record.id,
    );
    if (record.sourceWordId) {
      const word = vocab.find((item) => item.id === record.sourceWordId);
      assert(word, "Missing separable source word " + record.id);
      assert(
        source.wordIds.includes(record.sourceWordId),
        "Separable source word is not linked to its phrase " + record.id,
      );
      assert(
        word.translations.de.separable,
        "Source word is not separable " + record.id,
      );
      assert.equal(
        word.translations.de.prefix,
        record.exercise.answer,
        "Separable prefix drift " + record.id,
      );
    }
  }
  if (record.set === "prepositions") {
    assert(
      !prepositionSources.has(record.sourcePhraseId),
      "Duplicate preposition exercise source " + record.sourcePhraseId,
    );
    prepositionSources.add(record.sourcePhraseId);
    assert(
      ["accusative", "dative"].includes(record.exercise.case),
      "Invalid preposition case " + record.id,
    );
    assert.match(
      record.exercise.preposition,
      /^\p{L}+$/u,
      "Invalid preposition " + record.id,
    );
    assert.equal(
      record.exercise.answer.toLocaleLowerCase("de"),
      record.exercise.preposition,
      "Preposition answer drift " + record.id,
    );
    prepositionCoverage.set(
      record.exercise.preposition,
      (prepositionCoverage.get(record.exercise.preposition) || 0) + 1,
    );
  }
}
for (const gender of ["masculine", "feminine", "neuter"])
  for (const grammaticalCase of [
    "nominative",
    "accusative",
    "dative",
    "genitive",
  ])
    assert(
      (caseCoverage.get(gender + ":" + grammaticalCase) || 0) >= 30,
      "Case corpus needs at least 30 " +
        gender +
        " " +
        grammaticalCase +
        " exercises",
    );
assert.equal(
  modalSources.size,
  50,
  "Expected fifty unique modal-verb exercises",
);
assert(
  separableSources.size >= 100,
  "Expected at least one hundred unique separable-verb exercises",
);
assert(
  prepositionSources.size >= 400,
  "Expected at least four hundred fixed-case preposition exercises",
);
for (const preposition of [
  "durch",
  "für",
  "gegen",
  "ohne",
  "um",
  "aus",
  "bei",
  "mit",
  "nach",
  "seit",
  "von",
  "zu",
])
  assert(
    (prepositionCoverage.get(preposition) || 0) > 0,
    "Missing preposition coverage " + preposition,
  );
assert.equal(lessonUnits.length, 16, "Expected sixteen lesson units");
assert.equal(lessons.length, 48, "Expected three short rounds per lesson unit");
for (const unit of lessonUnits) {
  const steps = lessons.filter((lesson) => lesson.unitId === unit.id);
  assert.equal(steps.length, 3, "Lesson unit needs three rounds " + unit.id);
}
for (const l of lessons) {
  assert.match(l.id, /^\d+-[1-3]$/);
  assert(
    l.questionCount > 0 && l.questionCount <= 8,
    "Lesson round must stay concise " + l.id,
  );
  assert(
    l.unit && lessonUnits.some((unit) => unit.id === l.unitId),
    "Missing lesson unit " + l.id,
  );
  for (const a of l.activities) {
    if (a.type === "mixed") continue;
    if (a.type === "grammar") {
      for (const topic of a.topics)
        assert(
          grammarLessons.some((g) => g.localized.en.title === topic),
          "Missing grammar topic " + topic,
        );
      continue;
    }
    for (const category of a.categories) {
      const pool =
        a.type === "phrases"
          ? phrases.filter(
              (p) => p.category === category && phraseLevel(p) === l.level,
            )
          : vocab.filter(
              (w) =>
                (a.type === "verbs" ? w.verbCategory : w.category) ===
                  category && w.level === l.level,
            );
      assert(
        pool.length,
        `Empty ${l.level} lesson ${l.id} activity ${a.type}/${category}`,
      );
    }
  }
}
const report = JSON.parse(
  fs.readFileSync(path.join(root, "data/import/report.json"), "utf8"),
);
assert.equal(vocab.length, report.totals.vocabulary + report.totals.verbs);
assert.equal(phrases.length, report.totals.phrases);
console.log(
  "PASS: " +
    vocab.length +
    " words/verbs, " +
    phrases.length +
    " sentences, " +
    grammarLessons.length +
    " grammar topics, " +
    grammarApplications.length +
    " grammar applications, " +
    lessonUnits.length +
    " lesson units / " +
    lessons.length +
    " short rounds",
);
