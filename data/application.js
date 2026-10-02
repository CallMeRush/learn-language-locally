/* Reviewed, sentence-backed grammar application exercises.
   sourcePhraseId links each record to the matching phrase corpus record. */
const grammarApplications = [
  {
    id: "case-1", type: "grammar-application", set: "cases", level: "A1", sourcePhraseId: "100151",
    translations: { en: { text: "I place the book on the table." }, de: { text: "Ich stelle das Buch auf den Tisch." } },
    exercise: { blanked: "Ich stelle das Buch auf ___ Tisch.", answer: "den", noun: "Tisch", gender: "der", case: "accusative", article: "definite", explanation: "Tisch is masculine. auf expresses movement here, so it takes accusative: der becomes den." },
  },
  {
    id: "case-2", type: "grammar-application", set: "cases", level: "A1", sourcePhraseId: "100911",
    translations: { en: { text: "We are going to the park." }, de: { text: "Wir gehen in den Park." } },
    exercise: { blanked: "Wir gehen in ___ Park.", answer: "den", noun: "Park", gender: "der", case: "accusative", article: "definite", explanation: "Park is masculine. in describes movement towards a destination, so masculine accusative is den." },
  },
  {
    id: "case-3", type: "grammar-application", set: "cases", level: "A1", sourcePhraseId: "101071",
    translations: { en: { text: "The dog is playing with the ball." }, de: { text: "Der Hund spielt mit dem Ball." } },
    exercise: { blanked: "Der Hund spielt mit ___ Ball.", answer: "dem", noun: "Ball", gender: "der", case: "dative", article: "definite", explanation: "Ball is masculine. mit always takes dative, so der becomes dem." },
  },
  {
    id: "case-4", type: "grammar-application", set: "cases", level: "A1", sourcePhraseId: "101522",
    translations: { en: { text: "I ride my bicycle to work." }, de: { text: "Ich fahre mit dem Fahrrad zur Arbeit." } },
    exercise: { blanked: "Ich fahre mit ___ Fahrrad zur Arbeit.", answer: "dem", noun: "Fahrrad", gender: "das", case: "dative", article: "definite", explanation: "Fahrrad is neuter. mit always takes dative, so das becomes dem." },
  },
  {
    id: "case-5", type: "grammar-application", set: "cases", level: "A1", sourcePhraseId: "100037",
    translations: { en: { text: "We live in a big city." }, de: { text: "Wir leben in einer großen Stadt." } },
    exercise: { blanked: "Wir leben in ___ großen Stadt.", answer: "einer", noun: "Stadt", gender: "die", case: "dative", article: "indefinite", explanation: "Stadt is feminine. Living in a place is a location, so in takes dative: eine becomes einer." },
  },
  {
    id: "case-6", type: "grammar-application", set: "cases", level: "A1", sourcePhraseId: "100342",
    translations: { en: { text: "The word starts with an F." }, de: { text: "Das Wort beginnt mit einem F." } },
    exercise: { blanked: "Das Wort beginnt mit ___ F.", answer: "einem", noun: "F", gender: "das", case: "dative", article: "indefinite", explanation: "The letter F is neuter (das F). mit requires dative, so ein becomes einem." },
  },
  {
    id: "case-7", type: "grammar-application", set: "cases", level: "A1", sourcePhraseId: "100121",
    translations: { en: { text: "Do you have a free seat/space?" }, de: { text: "Haben Sie einen freien Platz?" } },
    exercise: { blanked: "Haben Sie ___ freien Platz?", answer: "einen", noun: "Platz", gender: "der", case: "accusative", article: "indefinite", explanation: "Platz is masculine and the direct object of haben. Masculine accusative changes ein to einen." },
  },
  {
    id: "case-8", type: "grammar-application", set: "cases", level: "A2", sourcePhraseId: "100070",
    translations: { en: { text: "The world is big." }, de: { text: "Die Welt ist groß." } },
    exercise: { blanked: "___ Welt ist groß.", answer: "Die", noun: "Welt", gender: "die", case: "nominative", article: "definite", explanation: "Welt is feminine and the subject. Feminine nominative is die." },
  },
  {
    id: "case-9", type: "grammar-application", set: "cases", level: "A2", sourcePhraseId: "101120",
    translations: { en: { text: "We celebrate Christmas with the family." }, de: { text: "Wir feiern Weihnachten mit der Familie." } },
    exercise: { blanked: "Wir feiern Weihnachten mit ___ Familie.", answer: "der", noun: "Familie", gender: "die", case: "dative", article: "definite", explanation: "Familie is feminine. mit requires dative, and feminine dative is der." },
  },
  {
    id: "case-10", type: "grammar-application", set: "cases", level: "A2", sourcePhraseId: "100155",
    translations: { en: { text: "There is a good reason for that." }, de: { text: "Es gibt einen guten Grund dafür." } },
    exercise: { blanked: "Es gibt ___ guten Grund dafür.", answer: "einen", noun: "Grund", gender: "der", case: "accusative", article: "indefinite", explanation: "Grund is masculine and the direct object of es gibt. Masculine accusative is einen." },
  },
  {
    id: "case-11", type: "grammar-application", set: "cases", level: "A2", sourcePhraseId: "104791",
    translations: { en: { text: "The children are playing on the playground." }, de: { text: "Die Kinder spielen auf dem Spielplatz." } },
    exercise: { blanked: "Die Kinder spielen auf ___ Spielplatz.", answer: "dem", noun: "Spielplatz", gender: "der", case: "dative", article: "definite", explanation: "Spielplatz is masculine. Playing in a place is a location, so auf takes dative: dem." },
  },
  {
    id: "case-12", type: "grammar-application", set: "cases", level: "A2", sourcePhraseId: "104429",
    translations: { en: { text: "The car's tank is empty." }, de: { text: "Der Tank des Autos ist leer." } },
    exercise: { blanked: "Der Tank ___ Autos ist leer.", answer: "des", noun: "Auto", gender: "das", case: "genitive", article: "definite", explanation: "Auto is neuter. The tank belongs to the car, so the genitive article is des." },
  },
  {
    id: "case-13", type: "grammar-application", set: "cases", level: "A2", sourcePhraseId: "103748",
    translations: { en: { text: "The city lies east of the river." }, de: { text: "Die Stadt liegt östlich des Flusses." } },
    exercise: { blanked: "Die Stadt liegt östlich ___ Flusses.", answer: "des", noun: "Fluss", gender: "der", case: "genitive", article: "definite", explanation: "Fluss is masculine. östlich is followed by the genitive, so der becomes des." },
  },
  {
    id: "case-14", type: "grammar-application", set: "cases", level: "B1", sourcePhraseId: "102400",
    translations: { en: { text: "A good upbringing is important for a child's development." }, de: { text: "Eine gute Erziehung ist wichtig für die Entwicklung eines Kindes." } },
    exercise: { blanked: "Eine gute Erziehung ist wichtig für die Entwicklung ___ Kindes.", answer: "eines", noun: "Kind", gender: "das", case: "genitive", article: "indefinite", explanation: "Kind is neuter. The development belongs to a child, so neuter genitive is eines Kindes." },
  },
  {
    id: "case-15", type: "grammar-application", set: "cases", level: "B1", sourcePhraseId: "101270",
    translations: { en: { text: "The police are pursuing the thief." }, de: { text: "Die Polizei verfolgt den Dieb." } },
    exercise: { blanked: "Die Polizei verfolgt ___ Dieb.", answer: "den", noun: "Dieb", gender: "der", case: "accusative", article: "definite", explanation: "Dieb is masculine and the direct object of verfolgt, so masculine accusative is den." },
  },
  {
    id: "modal-1", type: "grammar-application", set: "modals", level: "A1", sourcePhraseId: "100118",
    translations: { en: { text: "I want to ask you something." }, de: { text: "Ich möchte dich etwas fragen." } },
    exercise: { blanked: "Ich möchte dich etwas ___.", answer: "fragen", cue: "möchten + infinitive", explanation: "möchte is the conjugated modal in position two; the other verb remains an infinitive at the end." },
  },
  {
    id: "modal-2", type: "grammar-application", set: "modals", level: "A1", sourcePhraseId: "100320",
    translations: { en: { text: "Can you speak German?" }, de: { text: "Kannst du Deutsch sprechen?" } },
    exercise: { blanked: "___ du Deutsch sprechen?", answer: "Kannst", cue: "können for du", explanation: "With du, können is conjugated as kannst and stays in position two." },
  },
  {
    id: "modal-3", type: "grammar-application", set: "modals", level: "A1", sourcePhraseId: "102475",
    translations: { en: { text: "I have to get up early." }, de: { text: "Ich muss früh aufstehen." } },
    exercise: { blanked: "Ich muss früh ___.", answer: "aufstehen", cue: "müssen + separable infinitive", explanation: "muss is conjugated in position two. The separable verb stays together as the infinitive aufstehen at the end." },
  },
  {
    id: "modal-4", type: "grammar-application", set: "modals", level: "A2", sourcePhraseId: "102321",
    translations: { en: { text: "We have to go there." }, de: { text: "Wir müssen dorthin gehen." } },
    exercise: { blanked: "Wir müssen dorthin ___.", answer: "gehen", cue: "müssen + infinitive", explanation: "müssen is conjugated; gehen stays as an infinitive at the end." },
  },
  {
    id: "modal-5", type: "grammar-application", set: "modals", level: "A2", sourcePhraseId: "102818",
    translations: { en: { text: "I need to put on my jacket." }, de: { text: "Ich muss meine Jacke anziehen." } },
    exercise: { blanked: "Ich muss meine Jacke ___.", answer: "anziehen", cue: "müssen + separable infinitive", explanation: "After a modal, anziehen remains a complete infinitive at the end of the clause." },
  },
  {
    id: "separable-1", type: "grammar-application", set: "separable", level: "A1", sourcePhraseId: "100248",
    translations: { en: { text: "I get up early every morning." }, de: { text: "Ich stehe jeden Morgen früh auf." } },
    exercise: { blanked: "Ich stehe jeden Morgen früh ___.", answer: "auf", cue: "aufstehen", explanation: "In a main clause, aufstehen splits: stehe is conjugated in position two and auf moves to the end." },
  },
  {
    id: "separable-2", type: "grammar-application", set: "separable", level: "A1", sourcePhraseId: "101294",
    translations: { en: { text: "I will call you later." }, de: { text: "Ich rufe dich später an." } },
    exercise: { blanked: "Ich rufe dich später ___.", answer: "an", cue: "anrufen", explanation: "anrufen splits in a main clause: rufe ... an." },
  },
  {
    id: "separable-3", type: "grammar-application", set: "separable", level: "A1", sourcePhraseId: "100389",
    translations: { en: { text: "The train departs on time." }, de: { text: "Die Bahn fährt pünktlich ab." } },
    exercise: { blanked: "Die Bahn fährt pünktlich ___.", answer: "ab", cue: "abfahren", explanation: "abfahren splits in a main clause: fährt ... ab." },
  },
  {
    id: "separable-4", type: "grammar-application", set: "separable", level: "A2", sourcePhraseId: "103004",
    translations: { en: { text: "The delivery arrives tomorrow." }, de: { text: "Die Lieferung kommt morgen an." } },
    exercise: { blanked: "Die Lieferung kommt morgen ___.", answer: "an", cue: "ankommen", explanation: "ankommen splits in a main clause: kommt ... an." },
  },
  {
    id: "separable-5", type: "grammar-application", set: "separable", level: "A2", sourcePhraseId: "117043",
    translations: { en: { text: "We often shop at the department store." }, de: { text: "Wir kaufen oft im Warenhaus ein." } },
    exercise: { blanked: "Wir kaufen oft im Warenhaus ___.", answer: "ein", cue: "einkaufen", explanation: "einkaufen splits in a main clause: kaufen ... ein." },
  },
  {
    id: "separable-6", type: "grammar-application", set: "separable", level: "A2", sourcePhraseId: "104245",
    translations: { en: { text: "We're lighting a grill tonight." }, de: { text: "Wir machen heute Abend einen Grill an." } },
    exercise: { blanked: "Wir machen heute Abend einen Grill ___.", answer: "an", cue: "anmachen", explanation: "anmachen splits in a main clause: machen ... an." },
  },
];
