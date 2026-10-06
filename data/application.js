/* Reviewed, sentence-backed grammar application exercises.
   sourcePhraseId links each record to the matching phrase corpus record. */
const grammarApplications = [
  {
    id: "case-1",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "100151",
    translations: {
      en: { text: "I place the book on the table." },
      de: { text: "Ich stelle das Buch auf den Tisch." },
    },
    exercise: {
      blanked: "Ich stelle das Buch auf ___ Tisch.",
      answer: "den",
      noun: "Tisch",
      gender: "der",
      case: "accusative",
      article: "definite",
      explanation:
        "Tisch is masculine. auf expresses movement here, so it takes accusative: der becomes den.",
    },
  },
  {
    id: "case-2",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "100911",
    translations: {
      en: { text: "We are going to the park." },
      de: { text: "Wir gehen in den Park." },
    },
    exercise: {
      blanked: "Wir gehen in ___ Park.",
      answer: "den",
      noun: "Park",
      gender: "der",
      case: "accusative",
      article: "definite",
      explanation:
        "Park is masculine. in describes movement towards a destination, so masculine accusative is den.",
    },
  },
  {
    id: "case-3",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "101071",
    translations: {
      en: { text: "The dog is playing with the ball." },
      de: { text: "Der Hund spielt mit dem Ball." },
    },
    exercise: {
      blanked: "Der Hund spielt mit ___ Ball.",
      answer: "dem",
      noun: "Ball",
      gender: "der",
      case: "dative",
      article: "definite",
      explanation:
        "Ball is masculine. mit always takes dative, so der becomes dem.",
    },
  },
  {
    id: "case-4",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "101522",
    translations: {
      en: { text: "I ride my bicycle to work." },
      de: { text: "Ich fahre mit dem Fahrrad zur Arbeit." },
    },
    exercise: {
      blanked: "Ich fahre mit ___ Fahrrad zur Arbeit.",
      answer: "dem",
      noun: "Fahrrad",
      gender: "das",
      case: "dative",
      article: "definite",
      explanation:
        "Fahrrad is neuter. mit always takes dative, so das becomes dem.",
    },
  },
  {
    id: "case-5",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "100037",
    translations: {
      en: { text: "We live in a big city." },
      de: { text: "Wir leben in einer großen Stadt." },
    },
    exercise: {
      blanked: "Wir leben in ___ großen Stadt.",
      answer: "einer",
      noun: "Stadt",
      gender: "die",
      case: "dative",
      article: "indefinite",
      explanation:
        "Stadt is feminine. Living in a place is a location, so in takes dative: eine becomes einer.",
    },
  },
  {
    id: "case-6",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "100342",
    translations: {
      en: { text: "The word starts with an F." },
      de: { text: "Das Wort beginnt mit einem F." },
    },
    exercise: {
      blanked: "Das Wort beginnt mit ___ F.",
      answer: "einem",
      noun: "F",
      gender: "das",
      case: "dative",
      article: "indefinite",
      explanation:
        "The letter F is neuter (das F). mit requires dative, so ein becomes einem.",
    },
  },
  {
    id: "case-7",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "100121",
    translations: {
      en: { text: "Do you have a free seat/space?" },
      de: { text: "Haben Sie einen freien Platz?" },
    },
    exercise: {
      blanked: "Haben Sie ___ freien Platz?",
      answer: "einen",
      noun: "Platz",
      gender: "der",
      case: "accusative",
      article: "indefinite",
      explanation:
        "Platz is masculine and the direct object of haben. Masculine accusative changes ein to einen.",
    },
  },
  {
    id: "case-8",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "100070",
    translations: {
      en: { text: "The world is big." },
      de: { text: "Die Welt ist groß." },
    },
    exercise: {
      blanked: "___ Welt ist groß.",
      answer: "Die",
      noun: "Welt",
      gender: "die",
      case: "nominative",
      article: "definite",
      explanation:
        "Welt is feminine and the subject. Feminine nominative is die.",
    },
  },
  {
    id: "case-9",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "101120",
    translations: {
      en: { text: "We celebrate Christmas with the family." },
      de: { text: "Wir feiern Weihnachten mit der Familie." },
    },
    exercise: {
      blanked: "Wir feiern Weihnachten mit ___ Familie.",
      answer: "der",
      noun: "Familie",
      gender: "die",
      case: "dative",
      article: "definite",
      explanation:
        "Familie is feminine. mit requires dative, and feminine dative is der.",
    },
  },
  {
    id: "case-10",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "100155",
    translations: {
      en: { text: "There is a good reason for that." },
      de: { text: "Es gibt einen guten Grund dafür." },
    },
    exercise: {
      blanked: "Es gibt ___ guten Grund dafür.",
      answer: "einen",
      noun: "Grund",
      gender: "der",
      case: "accusative",
      article: "indefinite",
      explanation:
        "Grund is masculine and the direct object of es gibt. Masculine accusative is einen.",
    },
  },
  {
    id: "case-11",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "104791",
    translations: {
      en: { text: "The children are playing on the playground." },
      de: { text: "Die Kinder spielen auf dem Spielplatz." },
    },
    exercise: {
      blanked: "Die Kinder spielen auf ___ Spielplatz.",
      answer: "dem",
      noun: "Spielplatz",
      gender: "der",
      case: "dative",
      article: "definite",
      explanation:
        "Spielplatz is masculine. Playing in a place is a location, so auf takes dative: dem.",
    },
  },
  {
    id: "case-12",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "104429",
    translations: {
      en: { text: "The car's tank is empty." },
      de: { text: "Der Tank des Autos ist leer." },
    },
    exercise: {
      blanked: "Der Tank ___ Autos ist leer.",
      answer: "des",
      noun: "Auto",
      gender: "das",
      case: "genitive",
      article: "definite",
      explanation:
        "Auto is neuter. The tank belongs to the car, so the genitive article is des.",
    },
  },
  {
    id: "case-13",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "103748",
    translations: {
      en: { text: "The city lies east of the river." },
      de: { text: "Die Stadt liegt östlich des Flusses." },
    },
    exercise: {
      blanked: "Die Stadt liegt östlich ___ Flusses.",
      answer: "des",
      noun: "Fluss",
      gender: "der",
      case: "genitive",
      article: "definite",
      explanation:
        "Fluss is masculine. östlich is followed by the genitive, so der becomes des.",
    },
  },
  {
    id: "case-14",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "B1",
    sourcePhraseId: "102400",
    translations: {
      en: { text: "A good upbringing is important for a child's development." },
      de: {
        text: "Eine gute Erziehung ist wichtig für die Entwicklung eines Kindes.",
      },
    },
    exercise: {
      blanked:
        "Eine gute Erziehung ist wichtig für die Entwicklung ___ Kindes.",
      answer: "eines",
      noun: "Kind",
      gender: "das",
      case: "genitive",
      article: "indefinite",
      explanation:
        "Kind is neuter. The development belongs to a child, so neuter genitive is eines Kindes.",
    },
  },
  {
    id: "case-15",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "B1",
    sourcePhraseId: "101270",
    translations: {
      en: { text: "The police are pursuing the thief." },
      de: { text: "Die Polizei verfolgt den Dieb." },
    },
    exercise: {
      blanked: "Die Polizei verfolgt ___ Dieb.",
      answer: "den",
      noun: "Dieb",
      gender: "der",
      case: "accusative",
      article: "definite",
      explanation:
        "Dieb is masculine and the direct object of verfolgt, so masculine accusative is den.",
    },
  },
  {
    id: "modal-1",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A1",
    sourcePhraseId: "100118",
    translations: {
      en: { text: "I want to ask you something." },
      de: { text: "Ich möchte dich etwas fragen." },
    },
    exercise: {
      blanked: "Ich möchte dich etwas ___.",
      answer: "fragen",
      cue: "möchten + infinitive",
      explanation:
        "möchte is the conjugated modal in position two; the other verb remains an infinitive at the end.",
    },
  },
  {
    id: "modal-2",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A1",
    sourcePhraseId: "100320",
    translations: {
      en: { text: "Can you speak German?" },
      de: { text: "Kannst du Deutsch sprechen?" },
    },
    exercise: {
      blanked: "___ du Deutsch sprechen?",
      answer: "Kannst",
      cue: "können for du",
      explanation:
        "With du, können is conjugated as kannst and stays in position two.",
    },
  },
  {
    id: "modal-3",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A1",
    sourcePhraseId: "102475",
    translations: {
      en: { text: "I have to get up early." },
      de: { text: "Ich muss früh aufstehen." },
    },
    exercise: {
      blanked: "Ich muss früh ___.",
      answer: "aufstehen",
      cue: "müssen + separable infinitive",
      explanation:
        "muss is conjugated in position two. The separable verb stays together as the infinitive aufstehen at the end.",
    },
  },
  {
    id: "modal-4",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A2",
    sourcePhraseId: "102321",
    translations: {
      en: { text: "We have to go there." },
      de: { text: "Wir müssen dorthin gehen." },
    },
    exercise: {
      blanked: "Wir müssen dorthin ___.",
      answer: "gehen",
      cue: "müssen + infinitive",
      explanation:
        "müssen is conjugated; gehen stays as an infinitive at the end.",
    },
  },
  {
    id: "modal-5",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A2",
    sourcePhraseId: "102818",
    translations: {
      en: { text: "I need to put on my jacket." },
      de: { text: "Ich muss meine Jacke anziehen." },
    },
    exercise: {
      blanked: "Ich muss meine Jacke ___.",
      answer: "anziehen",
      cue: "müssen + separable infinitive",
      explanation:
        "After a modal, anziehen remains a complete infinitive at the end of the clause.",
    },
  },
  {
    id: "separable-1",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A1",
    sourcePhraseId: "100248",
    translations: {
      en: { text: "I get up early every morning." },
      de: { text: "Ich stehe jeden Morgen früh auf." },
    },
    exercise: {
      blanked: "Ich stehe jeden Morgen früh ___.",
      answer: "auf",
      cue: "aufstehen",
      explanation:
        "In a main clause, aufstehen splits: stehe is conjugated in position two and auf moves to the end.",
    },
  },
  {
    id: "separable-2",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A1",
    sourcePhraseId: "101294",
    translations: {
      en: { text: "I will call you later." },
      de: { text: "Ich rufe dich später an." },
    },
    exercise: {
      blanked: "Ich rufe dich später ___.",
      answer: "an",
      cue: "anrufen",
      explanation: "anrufen splits in a main clause: rufe ... an.",
    },
  },
  {
    id: "separable-3",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A1",
    sourcePhraseId: "100389",
    translations: {
      en: { text: "The train departs on time." },
      de: { text: "Die Bahn fährt pünktlich ab." },
    },
    exercise: {
      blanked: "Die Bahn fährt pünktlich ___.",
      answer: "ab",
      cue: "abfahren",
      explanation: "abfahren splits in a main clause: fährt ... ab.",
    },
  },
  {
    id: "separable-4",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "103004",
    translations: {
      en: { text: "The delivery arrives tomorrow." },
      de: { text: "Die Lieferung kommt morgen an." },
    },
    exercise: {
      blanked: "Die Lieferung kommt morgen ___.",
      answer: "an",
      cue: "ankommen",
      explanation: "ankommen splits in a main clause: kommt ... an.",
    },
  },
  {
    id: "separable-5",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "117043",
    translations: {
      en: { text: "We often shop at the department store." },
      de: { text: "Wir kaufen oft im Warenhaus ein." },
    },
    exercise: {
      blanked: "Wir kaufen oft im Warenhaus ___.",
      answer: "ein",
      cue: "einkaufen",
      explanation: "einkaufen splits in a main clause: kaufen ... ein.",
    },
  },
  {
    id: "separable-6",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "104245",
    translations: {
      en: { text: "We're lighting a grill tonight." },
      de: { text: "Wir machen heute Abend einen Grill an." },
    },
    exercise: {
      blanked: "Wir machen heute Abend einen Grill ___.",
      answer: "an",
      cue: "anmachen",
      explanation: "anmachen splits in a main clause: machen ... an.",
    },
  },
  {
    id: "case-16",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "100097",
    translations: {
      en: { text: "The book is lying on the table." },
      de: { text: "Das Buch liegt auf dem Tisch." },
    },
    exercise: {
      blanked: "Das Buch liegt auf ___ Tisch.",
      answer: "dem",
      noun: "Tisch",
      gender: "der",
      case: "dative",
      article: "definite",
      explanation:
        "Tisch is masculine. auf describes a location here, so it takes dative: der becomes dem.",
    },
  },
  {
    id: "case-17",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "100003",
    translations: {
      en: { text: "I have a book." },
      de: { text: "Ich habe ein Buch." },
    },
    exercise: {
      blanked: "Ich habe ___ Buch.",
      answer: "ein",
      noun: "Buch",
      gender: "das",
      case: "accusative",
      article: "indefinite",
      explanation:
        "Buch is neuter and the direct object of haben. Neuter ein stays ein in the accusative.",
    },
  },
  {
    id: "case-18",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "100704",
    translations: {
      en: { text: "The patient is waiting for the doctor." },
      de: { text: "Der Patient wartet auf den Arzt." },
    },
    exercise: {
      blanked: "Der Patient wartet auf ___ Arzt.",
      answer: "den",
      noun: "Arzt",
      gender: "der",
      case: "accusative",
      article: "definite",
      explanation:
        "Arzt is masculine. warten auf takes the accusative when waiting for someone or something, so der becomes den.",
    },
  },
  {
    id: "case-19",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "102316",
    translations: {
      en: { text: "I received a call from my mother." },
      de: { text: "Ich habe einen Anruf von meiner Mutter bekommen." },
    },
    exercise: {
      blanked: "Ich habe ___ Anruf von meiner Mutter bekommen.",
      answer: "einen",
      noun: "Anruf",
      gender: "der",
      case: "accusative",
      article: "indefinite",
      explanation:
        "Anruf is masculine and the direct object of bekommen. Masculine accusative changes ein to einen.",
    },
  },
  {
    id: "case-20",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "114395",
    translations: {
      en: { text: "You will receive an email with the details." },
      de: { text: "Du erhältst eine E-Mail mit den Details." },
    },
    exercise: {
      blanked: "Du erhältst eine E-Mail mit ___ Details.",
      answer: "den",
      noun: "Details",
      gender: "die",
      case: "dative",
      article: "definite",
      explanation:
        "mit always takes dative. For plural nouns, the definite dative article is den.",
    },
  },
  {
    id: "case-21",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "105473",
    translations: {
      en: { text: "We are going by subway." },
      de: { text: "Wir fahren mit der Metro." },
    },
    exercise: {
      blanked: "Wir fahren mit ___ Metro.",
      answer: "der",
      noun: "Metro",
      gender: "die",
      case: "dative",
      article: "definite",
      explanation:
        "Metro is feminine. mit requires dative, and feminine dative is der.",
    },
  },
  {
    id: "case-22",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "106079",
    translations: {
      en: { text: "We played with a die." },
      de: { text: "Wir spielten mit einem Würfel." },
    },
    exercise: {
      blanked: "Wir spielten mit ___ Würfel.",
      answer: "einem",
      noun: "Würfel",
      gender: "der",
      case: "dative",
      article: "indefinite",
      explanation:
        "Würfel is masculine. mit takes dative, so ein becomes einem.",
    },
  },
  {
    id: "case-23",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A1",
    sourcePhraseId: "101673",
    translations: {
      en: { text: "The first chapter of the book is very interesting." },
      de: { text: "Das erste Kapitel des Buches ist sehr interessant." },
    },
    exercise: {
      blanked: "Das erste Kapitel ___ Buches ist sehr interessant.",
      answer: "des",
      noun: "Buch",
      gender: "das",
      case: "genitive",
      article: "definite",
      explanation:
        "The chapter belongs to the book. Buch is neuter, so its definite genitive article is des.",
    },
  },
  {
    id: "case-24",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "103948",
    translations: {
      en: { text: "The train's delay was ten minutes." },
      de: { text: "Die Verspätung des Zuges betrug zehn Minuten." },
    },
    exercise: {
      blanked: "Die Verspätung ___ Zuges betrug zehn Minuten.",
      answer: "des",
      noun: "Zug",
      gender: "der",
      case: "genitive",
      article: "definite",
      explanation:
        "The delay belongs to the train. Zug is masculine, so the definite genitive article is des.",
    },
  },
  {
    id: "case-25",
    type: "grammar-application",
    set: "cases",
    grammarId: "grammar-de-3",
    level: "A2",
    sourcePhraseId: "102620",
    translations: {
      en: { text: "Where is the exit?" },
      de: { text: "Wo ist der Ausgang?" },
    },
    exercise: {
      blanked: "Wo ist ___ Ausgang?",
      answer: "der",
      noun: "Ausgang",
      gender: "der",
      case: "nominative",
      article: "definite",
      explanation:
        "Ausgang is masculine and the subject after ist. Masculine nominative is der.",
    },
  },
  {
    id: "modal-6",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A1",
    sourcePhraseId: "100006",
    translations: {
      en: { text: "I can speak German." },
      de: { text: "Ich kann Deutsch sprechen." },
    },
    exercise: {
      blanked: "Ich kann Deutsch ___.",
      answer: "sprechen",
      cue: "können + infinitive",
      explanation:
        "kann is the conjugated modal in position two; sprechen stays as an infinitive at the end.",
    },
  },
  {
    id: "modal-7",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A1",
    sourcePhraseId: "100016",
    translations: {
      en: { text: "I have to go now." },
      de: { text: "Ich muss jetzt gehen." },
    },
    exercise: {
      blanked: "Ich muss jetzt ___.",
      answer: "gehen",
      cue: "müssen + infinitive",
      explanation:
        "muss is conjugated in position two, while gehen remains an infinitive at the end.",
    },
  },
  {
    id: "modal-8",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A1",
    sourcePhraseId: "100078",
    translations: {
      en: { text: "I cannot find my keys." },
      de: { text: "Ich kann meine Schlüssel nicht finden." },
    },
    exercise: {
      blanked: "Ich kann meine Schlüssel nicht ___.",
      answer: "finden",
      cue: "können + infinitive",
      explanation:
        "With kann in position two, finden remains at the end as the infinitive.",
    },
  },
  {
    id: "modal-9",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A1",
    sourcePhraseId: "100140",
    translations: {
      en: { text: "I want to stay at home today." },
      de: { text: "Ich möchte heute zu Hause bleiben." },
    },
    exercise: {
      blanked: "Ich möchte heute zu Hause ___.",
      answer: "bleiben",
      cue: "möchten + infinitive",
      explanation:
        "möchte is the conjugated modal-like form; bleiben stays as an infinitive at the end.",
    },
  },
  {
    id: "modal-10",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A2",
    sourcePhraseId: "100149",
    translations: {
      en: { text: "Unfortunately, I cannot come." },
      de: { text: "Leider kann ich nicht kommen." },
    },
    exercise: {
      blanked: "Leider kann ich nicht ___.",
      answer: "kommen",
      cue: "können + infinitive",
      explanation:
        "kann is conjugated; even with nicht, the infinitive kommen stays at the end.",
    },
  },
  {
    id: "modal-11",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A2",
    sourcePhraseId: "101230",
    translations: {
      en: { text: "We have to finish the work today." },
      de: { text: "Wir müssen die Arbeit heute beenden." },
    },
    exercise: {
      blanked: "Wir müssen die Arbeit heute ___.",
      answer: "beenden",
      cue: "müssen + infinitive",
      explanation:
        "müssen is conjugated in position two; beenden remains the final infinitive.",
    },
  },
  {
    id: "modal-12",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A2",
    sourcePhraseId: "101848",
    translations: {
      en: { text: "We want to go out tonight." },
      de: { text: "Wir wollen heute Abend ausgehen." },
    },
    exercise: {
      blanked: "Wir wollen heute Abend ___.",
      answer: "ausgehen",
      cue: "wollen + separable infinitive",
      explanation:
        "After wollen, the separable verb stays together as the infinitive ausgehen at the end.",
    },
  },
  {
    id: "modal-13",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A2",
    sourcePhraseId: "102134",
    translations: {
      en: { text: "Would you like to try the cake?" },
      de: { text: "Möchtest du den Kuchen probieren?" },
    },
    exercise: {
      blanked: "___ du den Kuchen probieren?",
      answer: "Möchtest",
      cue: "möchten for du",
      explanation:
        "In a yes/no question, the conjugated form möchtest comes first; probieren stays as the final infinitive.",
    },
  },
  {
    id: "modal-14",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "A2",
    sourcePhraseId: "105096",
    translations: {
      en: { text: "She wants to dye her hair." },
      de: { text: "Sie möchte ihre Haare färben." },
    },
    exercise: {
      blanked: "Sie möchte ihre Haare ___.",
      answer: "färben",
      cue: "möchten + infinitive",
      explanation:
        "möchte is conjugated in position two; färben remains an infinitive at the end.",
    },
  },
  {
    id: "modal-15",
    type: "grammar-application",
    set: "modals",
    grammarId: "grammar-de-5",
    level: "B1",
    sourcePhraseId: "102076",
    translations: {
      en: { text: "Can you justify your decision?" },
      de: { text: "Können Sie Ihre Entscheidung begründen?" },
    },
    exercise: {
      blanked: "Können Sie Ihre Entscheidung ___?",
      answer: "begründen",
      cue: "können + infinitive",
      explanation:
        "In a yes/no question, Können comes first and begründen remains the final infinitive.",
    },
  },
  {
    id: "separable-7",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A1",
    sourcePhraseId: "100092",
    translations: {
      en: { text: "He is coming back." },
      de: { text: "Er kommt zurück." },
    },
    exercise: {
      blanked: "Er kommt ___.",
      answer: "zurück",
      cue: "zurückkommen",
      explanation:
        "zurückkommen splits in a main clause: kommt is conjugated and zurück moves to the end.",
    },
  },
  {
    id: "separable-8",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A1",
    sourcePhraseId: "100347",
    translations: {
      en: { text: "Turn right here." },
      de: { text: "Gehen Sie hier rechts ab." },
    },
    exercise: {
      blanked: "Gehen Sie hier rechts ___.",
      answer: "ab",
      cue: "abbiegen",
      explanation:
        "In this imperative, abbiegen splits: gehen is conjugated and ab moves to the end.",
    },
  },
  {
    id: "separable-9",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "103574",
    translations: {
      en: { text: "He breathes deeply." },
      de: { text: "Er atmet tief ein." },
    },
    exercise: {
      blanked: "Er atmet tief ___.",
      answer: "ein",
      cue: "einatmen",
      explanation: "einatmen splits in a main clause: atmet ... ein.",
    },
  },
  {
    id: "separable-10",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "106082",
    translations: {
      en: { text: "Please give me the book back." },
      de: { text: "Bitte gib mir das Buch zurück." },
    },
    exercise: {
      blanked: "Bitte gib mir das Buch ___.",
      answer: "zurück",
      cue: "zurückgeben",
      explanation: "zurückgeben splits in the imperative: gib ... zurück.",
    },
  },
  {
    id: "separable-11",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "107795",
    translations: {
      en: { text: "Please do not throw away the trash." },
      de: { text: "Bitte werfen Sie den Müll nicht weg." },
    },
    exercise: {
      blanked: "Bitte werfen Sie den Müll nicht ___.",
      answer: "weg",
      cue: "wegwerfen",
      explanation:
        "wegwerfen splits in a main clause: werfen ... weg. nicht stays before the separated prefix.",
    },
  },
  {
    id: "separable-12",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "108209",
    translations: {
      en: { text: "I warm up my food in the microwave." },
      de: { text: "Ich wärme mein Essen in der Mikrowelle auf." },
    },
    exercise: {
      blanked: "Ich wärme mein Essen in der Mikrowelle ___.",
      answer: "auf",
      cue: "aufwärmen",
      explanation: "aufwärmen splits in a main clause: wärme ... auf.",
    },
  },
  {
    id: "separable-13",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A1",
    sourcePhraseId: "110133",
    translations: {
      en: { text: "Please close the door." },
      de: { text: "Bitte mach die Tür zu." },
    },
    exercise: {
      blanked: "Bitte mach die Tür ___.",
      answer: "zu",
      cue: "zumachen",
      explanation: "zumachen splits in the imperative: mach ... zu.",
    },
  },
  {
    id: "separable-14",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "112614",
    translations: {
      en: { text: "After showering, he put on his bathrobe." },
      de: { text: "Nach dem Duschen zog er seinen Bademantel an." },
    },
    exercise: {
      blanked: "Nach dem Duschen zog er seinen Bademantel ___.",
      answer: "an",
      cue: "anziehen",
      explanation:
        "With a time phrase first, zog still stays in position two and an moves to the end.",
    },
  },
  {
    id: "separable-15",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "101804",
    translations: {
      en: { text: "Please look at the table on page five." },
      de: { text: "Bitte schauen Sie sich die Tabelle auf Seite fünf an." },
    },
    exercise: {
      blanked: "Bitte schauen Sie sich die Tabelle auf Seite fünf ___.",
      answer: "an",
      cue: "sich ansehen",
      explanation:
        "ansehen splits in a main clause: schauen ... an; sich belongs with the verb.",
    },
  },
  {
    id: "separable-16",
    type: "grammar-application",
    set: "separable",
    grammarId: "grammar-de-6",
    level: "A2",
    sourcePhraseId: "108952",
    translations: {
      en: { text: "Please provide your full address." },
      de: { text: "Bitte geben Sie Ihre vollständige Anschrift an." },
    },
    exercise: {
      blanked: "Bitte geben Sie Ihre vollständige Anschrift ___.",
      answer: "an",
      cue: "angeben",
      explanation: "angeben splits in a main clause: geben ... an.",
    },
  },
  /* BEGIN GENERATED SEPARABLE APPLICATIONS */
  {
    "id": "separable-17",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "100954",
    "sourceWordId": "10954",
    "translations": {
      "en": {
        "text": "Please lock the door."
      },
      "de": {
        "text": "Bitte schließ die Tür ab."
      }
    },
    "exercise": {
      "blanked": "Bitte schließ die Tür ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "abschliessen",
      "explanation": "abschliessen is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-18",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "101877",
    "sourceWordId": "11877",
    "translations": {
      "en": {
        "text": "He rejected the offer."
      },
      "de": {
        "text": "Er lehnte das Angebot ab."
      }
    },
    "exercise": {
      "blanked": "Er lehnte das Angebot ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "ablehnen",
      "explanation": "ablehnen is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-19",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "113965",
    "sourceWordId": "23965",
    "translations": {
      "en": {
        "text": "Please wipe off the table."
      },
      "de": {
        "text": "Bitte wisch den Tisch ab."
      }
    },
    "exercise": {
      "blanked": "Bitte wisch den Tisch ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "abwischen",
      "explanation": "abwischen is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-20",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "105779",
    "sourceWordId": "15779",
    "translations": {
      "en": {
        "text": "Please cover the food."
      },
      "de": {
        "text": "Bitte decken Sie das Essen ab."
      }
    },
    "exercise": {
      "blanked": "Bitte decken Sie das Essen ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "abdecken",
      "explanation": "abdecken is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-21",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "106084",
    "sourceWordId": "16084",
    "translations": {
      "en": {
        "text": "The loud noise distracted me."
      },
      "de": {
        "text": "Das laute Geräusch lenkte mich ab."
      }
    },
    "exercise": {
      "blanked": "Das laute Geräusch lenkte mich ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "ablenken",
      "explanation": "ablenken is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-22",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "118622",
    "sourceWordId": "28622",
    "translations": {
      "en": {
        "text": "The tires wear out quickly."
      },
      "de": {
        "text": "Die Reifen nutzen sich schnell ab."
      }
    },
    "exercise": {
      "blanked": "Die Reifen nutzen sich schnell ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "abnutzen",
      "explanation": "abnutzen is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-23",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "109845",
    "sourceWordId": "19845",
    "translations": {
      "en": {
        "text": "The high prices deter many customers."
      },
      "de": {
        "text": "Die hohen Preise schrecken viele Kunden ab."
      }
    },
    "exercise": {
      "blanked": "Die hohen Preise schrecken viele Kunden ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "abschrecken",
      "explanation": "abschrecken is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-24",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "101986",
    "sourceWordId": "11986",
    "translations": {
      "en": {
        "text": "Please hand in your homework by Friday."
      },
      "de": {
        "text": "Bitte geben Sie Ihre Hausaufgaben bis Freitag ab."
      }
    },
    "exercise": {
      "blanked": "Bitte geben Sie Ihre Hausaufgaben bis Freitag ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "abgeben",
      "explanation": "abgeben is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-25",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "104581",
    "sourceWordId": "14581",
    "translations": {
      "en": {
        "text": "The book depicts the history very accurately."
      },
      "de": {
        "text": "Das Buch bildet die Geschichte sehr genau ab."
      }
    },
    "exercise": {
      "blanked": "Das Buch bildet die Geschichte sehr genau ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "abbilden",
      "explanation": "abbilden is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-26",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "116307",
    "sourceWordId": "26307",
    "translations": {
      "en": {
        "text": "The leaves fall off the trees in autumn."
      },
      "de": {
        "text": "Die Blätter fallen im Herbst von den Bäumen ab."
      }
    },
    "exercise": {
      "blanked": "Die Blätter fallen im Herbst von den Bäumen ___.",
      "answer": "ab",
      "prefix": "ab",
      "cue": "abfallen",
      "explanation": "abfallen is separable: ab moves to the end in this clause."
    }
  },
  {
    "id": "separable-27",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A1",
    "sourcePhraseId": "119188",
    "sourceWordId": "29188",
    "translations": {
      "en": {
        "text": "Please turn on the light."
      },
      "de": {
        "text": "Bitte schalte das Licht an."
      }
    },
    "exercise": {
      "blanked": "Bitte schalte das Licht ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anschalten",
      "explanation": "anschalten is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-28",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A1",
    "sourcePhraseId": "101029",
    "sourceWordId": "11029",
    "translations": {
      "en": {
        "text": "The movie starts at 8 PM."
      },
      "de": {
        "text": "Der Film fängt um 20 Uhr an."
      }
    },
    "exercise": {
      "blanked": "Der Film fängt um 20 Uhr ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anfangen",
      "explanation": "anfangen is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-29",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "105607",
    "sourceWordId": "15607",
    "translations": {
      "en": {
        "text": "Look at me!"
      },
      "de": {
        "text": "Guck mich mal an!"
      }
    },
    "exercise": {
      "blanked": "Guck mich mal ___!",
      "answer": "an",
      "prefix": "an",
      "cue": "angucken",
      "explanation": "angucken is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-30",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "103325",
    "sourceWordId": "13325",
    "translations": {
      "en": {
        "text": "I like to listen to music."
      },
      "de": {
        "text": "Ich höre mir gerne Musik an."
      }
    },
    "exercise": {
      "blanked": "Ich höre mir gerne Musik ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anhören",
      "explanation": "anhören is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-31",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "111675",
    "sourceWordId": "21675",
    "translations": {
      "en": {
        "text": "She is wearing a red dress."
      },
      "de": {
        "text": "Sie hat ein rotes Kleid an."
      }
    },
    "exercise": {
      "blanked": "Sie hat ein rotes Kleid ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anhaben",
      "explanation": "anhaben is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-32",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "101914",
    "sourceWordId": "11914",
    "translations": {
      "en": {
        "text": "The light doesn't turn on."
      },
      "de": {
        "text": "Das Licht geht nicht an."
      }
    },
    "exercise": {
      "blanked": "Das Licht geht nicht ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "angehen",
      "explanation": "angehen is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-33",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "113099",
    "sourceWordId": "29773",
    "translations": {
      "en": {
        "text": "Please buckle up."
      },
      "de": {
        "text": "Bitte schnallen Sie sich an."
      }
    },
    "exercise": {
      "blanked": "Bitte schnallen Sie sich ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anschnallen",
      "explanation": "anschnallen is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-34",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "101702",
    "sourceWordId": "11702",
    "translations": {
      "en": {
        "text": "Please state your date of birth."
      },
      "de": {
        "text": "Bitte geben Sie Ihr Geburtsdatum an."
      }
    },
    "exercise": {
      "blanked": "Bitte geben Sie Ihr Geburtsdatum ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "angeben",
      "explanation": "angeben is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-35",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "102817",
    "sourceWordId": "12817",
    "translations": {
      "en": {
        "text": "Please queue up here."
      },
      "de": {
        "text": "Bitte stellen Sie sich hier an."
      }
    },
    "exercise": {
      "blanked": "Bitte stellen Sie sich hier ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anstellen",
      "explanation": "anstellen is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-36",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "106172",
    "sourceWordId": "16172",
    "translations": {
      "en": {
        "text": "How does the fabric feel?"
      },
      "de": {
        "text": "Wie fühlt sich der Stoff an?"
      }
    },
    "exercise": {
      "blanked": "Wie fühlt sich der Stoff ___?",
      "answer": "an",
      "prefix": "an",
      "cue": "anfühlen",
      "explanation": "anfühlen is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-37",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "115201",
    "sourceWordId": "25201",
    "translations": {
      "en": {
        "text": "The scent attracts the bees."
      },
      "de": {
        "text": "Der Duft lockt die Bienen an."
      }
    },
    "exercise": {
      "blanked": "Der Duft lockt die Bienen ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anlocken",
      "explanation": "anlocken is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-38",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "116815",
    "sourceWordId": "26815",
    "translations": {
      "en": {
        "text": "The fans cheered on their team."
      },
      "de": {
        "text": "Die Fans feuerten ihre Mannschaft an."
      }
    },
    "exercise": {
      "blanked": "Die Fans feuerten ihre Mannschaft ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anfeuern",
      "explanation": "anfeuern is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-39",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "118633",
    "sourceWordId": "28633",
    "translations": {
      "en": {
        "text": "The ship is heading for the port."
      },
      "de": {
        "text": "Das Schiff steuert den Hafen an."
      }
    },
    "exercise": {
      "blanked": "Das Schiff steuert den Hafen ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "ansteuern",
      "explanation": "ansteuern is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-40",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "106282",
    "sourceWordId": "16282",
    "translations": {
      "en": {
        "text": "The bus drove up to the stop."
      },
      "de": {
        "text": "Der Bus fuhr an die Haltestelle an."
      }
    },
    "exercise": {
      "blanked": "Der Bus fuhr an die Haltestelle ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "anfahren",
      "explanation": "anfahren is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-41",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "116571",
    "sourceWordId": "26571",
    "translations": {
      "en": {
        "text": "Please tick the correct answer."
      },
      "de": {
        "text": "Bitte kreuzen Sie die richtige Antwort an."
      }
    },
    "exercise": {
      "blanked": "Bitte kreuzen Sie die richtige Antwort ___.",
      "answer": "an",
      "prefix": "an",
      "cue": "ankreuzen",
      "explanation": "ankreuzen is separable: an moves to the end in this clause."
    }
  },
  {
    "id": "separable-42",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "102273",
    "sourceWordId": "12273",
    "translations": {
      "en": {
        "text": "Never give up your dreams."
      },
      "de": {
        "text": "Gib niemals deine Träume auf."
      }
    },
    "exercise": {
      "blanked": "Gib niemals deine Träume ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "aufgeben",
      "explanation": "aufgeben is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-43",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "105689",
    "sourceWordId": "15689",
    "translations": {
      "en": {
        "text": "Please clean up your room."
      },
      "de": {
        "text": "Bitte räum dein Zimmer auf."
      }
    },
    "exercise": {
      "blanked": "Bitte räum dein Zimmer ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "aufräumen",
      "explanation": "aufräumen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-44",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "100836",
    "sourceWordId": "17557",
    "translations": {
      "en": {
        "text": "The sun rises in the east."
      },
      "de": {
        "text": "Die Sonne geht im Osten auf."
      }
    },
    "exercise": {
      "blanked": "Die Sonne geht im Osten ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "aufgehen",
      "explanation": "aufgehen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-45",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "108403",
    "sourceWordId": "18403",
    "translations": {
      "en": {
        "text": "Please write that down."
      },
      "de": {
        "text": "Bitte schreiben Sie sich das auf."
      }
    },
    "exercise": {
      "blanked": "Bitte schreiben Sie sich das ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "aufschreiben",
      "explanation": "aufschreiben is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-46",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "102570",
    "sourceWordId": "12570",
    "translations": {
      "en": {
        "text": "Don't get so upset!"
      },
      "de": {
        "text": "Reg dich nicht so auf!"
      }
    },
    "exercise": {
      "blanked": "Reg dich nicht so ___!",
      "answer": "auf",
      "prefix": "auf",
      "cue": "aufregen",
      "explanation": "aufregen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-47",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103632",
    "sourceWordId": "13632",
    "translations": {
      "en": {
        "text": "Suddenly a problem emerged."
      },
      "de": {
        "text": "Plötzlich tauchte ein Problem auf."
      }
    },
    "exercise": {
      "blanked": "Plötzlich tauchte ein Problem ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "auftauchen",
      "explanation": "auftauchen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-48",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "105066",
    "sourceWordId": "15066",
    "translations": {
      "en": {
        "text": "Please don't hang up."
      },
      "de": {
        "text": "Bitte legen Sie nicht auf."
      }
    },
    "exercise": {
      "blanked": "Bitte legen Sie nicht ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "auflegen",
      "explanation": "auflegen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-49",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "106177",
    "sourceWordId": "16177",
    "translations": {
      "en": {
        "text": "The smoke rises quickly."
      },
      "de": {
        "text": "Der Rauch steigt schnell auf."
      }
    },
    "exercise": {
      "blanked": "Der Rauch steigt schnell ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "aufsteigen",
      "explanation": "aufsteigen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-50",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "110779",
    "sourceWordId": "20779",
    "translations": {
      "en": {
        "text": "He opened the book."
      },
      "de": {
        "text": "Er schlug das Buch auf."
      }
    },
    "exercise": {
      "blanked": "Er schlug das Buch ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "aufschlagen",
      "explanation": "aufschlagen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-51",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103756",
    "sourceWordId": "13756",
    "translations": {
      "en": {
        "text": "She asked him to dance."
      },
      "de": {
        "text": "Sie forderte ihn zum Tanz auf."
      }
    },
    "exercise": {
      "blanked": "Sie forderte ihn zum Tanz ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "auffordern",
      "explanation": "auffordern is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-52",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "104820",
    "sourceWordId": "14820",
    "translations": {
      "en": {
        "text": "Please keep the receipt."
      },
      "de": {
        "text": "Bitte bewahren Sie die Quittung auf."
      }
    },
    "exercise": {
      "blanked": "Bitte bewahren Sie die Quittung ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "aufbewahren",
      "explanation": "aufbewahren is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-53",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "106384",
    "sourceWordId": "16384",
    "translations": {
      "en": {
        "text": "Please list all points."
      },
      "de": {
        "text": "Bitte listen Sie alle Punkte auf."
      }
    },
    "exercise": {
      "blanked": "Bitte listen Sie alle Punkte ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "auflisten",
      "explanation": "auflisten is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-54",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "110958",
    "sourceWordId": "20958",
    "translations": {
      "en": {
        "text": "Please refill the glass."
      },
      "de": {
        "text": "Bitte füllen Sie das Glas auf."
      }
    },
    "exercise": {
      "blanked": "Bitte füllen Sie das Glas ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "auffüllen",
      "explanation": "auffüllen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-55",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "106889",
    "sourceWordId": "16889",
    "translations": {
      "en": {
        "text": "Please apply the cream thinly."
      },
      "de": {
        "text": "Bitte tragen Sie die Creme dünn auf."
      }
    },
    "exercise": {
      "blanked": "Bitte tragen Sie die Creme dünn ___.",
      "answer": "auf",
      "prefix": "auf",
      "cue": "auftragen",
      "explanation": "auftragen is separable: auf moves to the end in this clause."
    }
  },
  {
    "id": "separable-56",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "100766",
    "sourceWordId": "10766",
    "translations": {
      "en": {
        "text": "You look very good today."
      },
      "de": {
        "text": "Du siehst heute sehr gut aus."
      }
    },
    "exercise": {
      "blanked": "Du siehst heute sehr gut ___.",
      "answer": "aus",
      "prefix": "aus",
      "cue": "aussehen",
      "explanation": "aussehen is separable: aus moves to the end in this clause."
    }
  },
  {
    "id": "separable-57",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "105521",
    "sourceWordId": "15521",
    "translations": {
      "en": {
        "text": "Please fill out this form."
      },
      "de": {
        "text": "Bitte füllen Sie dieses Formular aus."
      }
    },
    "exercise": {
      "blanked": "Bitte füllen Sie dieses Formular ___.",
      "answer": "aus",
      "prefix": "aus",
      "cue": "ausfüllen",
      "explanation": "ausfüllen is separable: aus moves to the end in this clause."
    }
  },
  {
    "id": "separable-58",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "102571",
    "sourceWordId": "12571",
    "translations": {
      "en": {
        "text": "She trains new teachers."
      },
      "de": {
        "text": "Sie bildet neue Lehrer aus."
      }
    },
    "exercise": {
      "blanked": "Sie bildet neue Lehrer ___.",
      "answer": "aus",
      "prefix": "aus",
      "cue": "ausbilden",
      "explanation": "ausbilden is separable: aus moves to the end in this clause."
    }
  },
  {
    "id": "separable-59",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "114997",
    "sourceWordId": "24997",
    "translations": {
      "en": {
        "text": "Please exhale slowly."
      },
      "de": {
        "text": "Bitte atmen Sie langsam aus."
      }
    },
    "exercise": {
      "blanked": "Bitte atmen Sie langsam ___.",
      "answer": "aus",
      "prefix": "aus",
      "cue": "ausatmen",
      "explanation": "ausatmen is separable: aus moves to the end in this clause."
    }
  },
  {
    "id": "separable-60",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "112413",
    "sourceWordId": "22413",
    "translations": {
      "en": {
        "text": "The children color in the pictures."
      },
      "de": {
        "text": "Die Kinder malen die Bilder aus."
      }
    },
    "exercise": {
      "blanked": "Die Kinder malen die Bilder ___.",
      "answer": "aus",
      "prefix": "aus",
      "cue": "ausmalen",
      "explanation": "ausmalen is separable: aus moves to the end in this clause."
    }
  },
  {
    "id": "separable-61",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "108404",
    "sourceWordId": "18404",
    "translations": {
      "en": {
        "text": "The water is leaking from the tap."
      },
      "de": {
        "text": "Das Wasser läuft aus dem Hahn aus."
      }
    },
    "exercise": {
      "blanked": "Das Wasser läuft aus dem Hahn ___.",
      "answer": "aus",
      "prefix": "aus",
      "cue": "auslaufen",
      "explanation": "auslaufen is separable: aus moves to the end in this clause."
    }
  },
  {
    "id": "separable-62",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "109556",
    "sourceWordId": "19556",
    "translations": {
      "en": {
        "text": "He knows his way around the city well."
      },
      "de": {
        "text": "Er kennt sich gut in der Stadt aus."
      }
    },
    "exercise": {
      "blanked": "Er kennt sich gut in der Stadt ___.",
      "answer": "aus",
      "prefix": "aus",
      "cue": "auskennen",
      "explanation": "auskennen is separable: aus moves to the end in this clause."
    }
  },
  {
    "id": "separable-63",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "116598",
    "sourceWordId": "26598",
    "translations": {
      "en": {
        "text": "That's just part of it."
      },
      "de": {
        "text": "Das gehört einfach dazu."
      }
    },
    "exercise": {
      "blanked": "Das gehört einfach ___.",
      "answer": "dazu",
      "prefix": "dazu",
      "cue": "dazugehören",
      "explanation": "dazugehören is separable: dazu moves to the end in this clause."
    }
  },
  {
    "id": "separable-64",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "113011",
    "sourceWordId": "23011",
    "translations": {
      "en": {
        "text": "The train just passes through."
      },
      "de": {
        "text": "Der Zug fährt einfach durch."
      }
    },
    "exercise": {
      "blanked": "Der Zug fährt einfach ___.",
      "answer": "durch",
      "prefix": "durch",
      "cue": "durchfahren",
      "explanation": "durchfahren is separable: durch moves to the end in this clause."
    }
  },
  {
    "id": "separable-65",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103968",
    "sourceWordId": "13968",
    "translations": {
      "en": {
        "text": "Please come in."
      },
      "de": {
        "text": "Bitte treten Sie ein."
      }
    },
    "exercise": {
      "blanked": "Bitte treten Sie ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "eintreten",
      "explanation": "eintreten is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-66",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103402",
    "sourceWordId": "13402",
    "translations": {
      "en": {
        "text": "The name doesn't come to my mind."
      },
      "de": {
        "text": "Mir fällt der Name nicht ein."
      }
    },
    "exercise": {
      "blanked": "Mir fällt der Name nicht ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "einfallen",
      "explanation": "einfallen is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-67",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103677",
    "sourceWordId": "14596",
    "translations": {
      "en": {
        "text": "Please turn on the light."
      },
      "de": {
        "text": "Bitte schalten Sie das Licht ein."
      }
    },
    "exercise": {
      "blanked": "Bitte schalten Sie das Licht ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "einschalten",
      "explanation": "einschalten is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-68",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "104375",
    "sourceWordId": "14375",
    "translations": {
      "en": {
        "text": "The price includes the drinks."
      },
      "de": {
        "text": "Der Preis schließt die Getränke ein."
      }
    },
    "exercise": {
      "blanked": "Der Preis schließt die Getränke ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "einschließen",
      "explanation": "einschließen is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-69",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "117122",
    "sourceWordId": "27122",
    "translations": {
      "en": {
        "text": "Many people immigrate to Germany."
      },
      "de": {
        "text": "Viele Menschen wandern nach Deutschland ein."
      }
    },
    "exercise": {
      "blanked": "Viele Menschen wandern nach Deutschland ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "einwandern",
      "explanation": "einwandern is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-70",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103228",
    "sourceWordId": "13228",
    "translations": {
      "en": {
        "text": "Please enter your name here."
      },
      "de": {
        "text": "Bitte tragen Sie Ihren Namen hier ein."
      }
    },
    "exercise": {
      "blanked": "Bitte tragen Sie Ihren Namen hier ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "eintragen",
      "explanation": "eintragen is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-71",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103708",
    "sourceWordId": "13708",
    "translations": {
      "en": {
        "text": "Please take your medication regularly."
      },
      "de": {
        "text": "Bitte nehmen Sie Ihre Medikamente regelmäßig ein."
      }
    },
    "exercise": {
      "blanked": "Bitte nehmen Sie Ihre Medikamente regelmäßig ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "einnehmen",
      "explanation": "einnehmen is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-72",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "110810",
    "sourceWordId": "20810",
    "translations": {
      "en": {
        "text": "He immersed himself in the cold water."
      },
      "de": {
        "text": "Er tauchte in das kalte Wasser ein."
      }
    },
    "exercise": {
      "blanked": "Er tauchte in das kalte Wasser ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "eintauchen",
      "explanation": "eintauchen is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-73",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "119233",
    "sourceWordId": "29233",
    "translations": {
      "en": {
        "text": "Please set the table for dinner."
      },
      "de": {
        "text": "Bitte deck den Tisch für das Abendessen ein."
      }
    },
    "exercise": {
      "blanked": "Bitte deck den Tisch für das Abendessen ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "eindecken",
      "explanation": "eindecken is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-74",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "105915",
    "sourceWordId": "15915",
    "translations": {
      "en": {
        "text": "Please insert the CD into the player."
      },
      "de": {
        "text": "Bitte legen Sie die CD in den Player ein."
      }
    },
    "exercise": {
      "blanked": "Bitte legen Sie die CD in den Player ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "einlegen",
      "explanation": "einlegen is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-75",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "113621",
    "sourceWordId": "23621",
    "translations": {
      "en": {
        "text": "Please mark the route on the map."
      },
      "de": {
        "text": "Bitte zeichnen Sie die Route auf der Karte ein."
      }
    },
    "exercise": {
      "blanked": "Bitte zeichnen Sie die Route auf der Karte ___.",
      "answer": "ein",
      "prefix": "ein",
      "cue": "einzeichnen",
      "explanation": "einzeichnen is separable: ein moves to the end in this clause."
    }
  },
  {
    "id": "separable-76",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "111550",
    "sourceWordId": "21550",
    "translations": {
      "en": {
        "text": "Please keep away."
      },
      "de": {
        "text": "Bitte halten Sie sich fern."
      }
    },
    "exercise": {
      "blanked": "Bitte halten Sie sich ___.",
      "answer": "fern",
      "prefix": "fern",
      "cue": "fernhalten",
      "explanation": "fernhalten is separable: fern moves to the end in this clause."
    }
  },
  {
    "id": "separable-77",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "105723",
    "sourceWordId": "15723",
    "translations": {
      "en": {
        "text": "Where do you come from?"
      },
      "de": {
        "text": "Wo kommst du her?"
      }
    },
    "exercise": {
      "blanked": "Wo kommst du ___?",
      "answer": "her",
      "prefix": "her",
      "cue": "herkommen",
      "explanation": "herkommen is separable: her moves to the end in this clause."
    }
  },
  {
    "id": "separable-78",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "101395",
    "sourceWordId": "11395",
    "translations": {
      "en": {
        "text": "This company manufactures cars."
      },
      "de": {
        "text": "Diese Firma stellt Autos her."
      }
    },
    "exercise": {
      "blanked": "Diese Firma stellt Autos ___.",
      "answer": "her",
      "prefix": "her",
      "cue": "herstellen",
      "explanation": "herstellen is separable: her moves to the end in this clause."
    }
  },
  {
    "id": "separable-79",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "115067",
    "sourceWordId": "25067",
    "translations": {
      "en": {
        "text": "Please take the book out of the shelf."
      },
      "de": {
        "text": "Bitte nehmen Sie das Buch aus dem Regal heraus."
      }
    },
    "exercise": {
      "blanked": "Bitte nehmen Sie das Buch aus dem Regal ___.",
      "answer": "heraus",
      "prefix": "heraus",
      "cue": "herausnehmen",
      "explanation": "herausnehmen is separable: heraus moves to the end in this clause."
    }
  },
  {
    "id": "separable-80",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "111907",
    "sourceWordId": "21907",
    "translations": {
      "en": {
        "text": "The children run around in the garden."
      },
      "de": {
        "text": "Die Kinder laufen im Garten herum."
      }
    },
    "exercise": {
      "blanked": "Die Kinder laufen im Garten ___.",
      "answer": "herum",
      "prefix": "herum",
      "cue": "herumlaufen",
      "explanation": "herumlaufen is separable: herum moves to the end in this clause."
    }
  },
  {
    "id": "separable-81",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "109451",
    "sourceWordId": "19451",
    "translations": {
      "en": {
        "text": "Please sit down."
      },
      "de": {
        "text": "Bitte setzen Sie sich hin."
      }
    },
    "exercise": {
      "blanked": "Bitte setzen Sie sich ___.",
      "answer": "hin",
      "prefix": "hin",
      "cue": "hinsetzen",
      "explanation": "hinsetzen is separable: hin moves to the end in this clause."
    }
  },
  {
    "id": "separable-82",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103477",
    "sourceWordId": "13477",
    "translations": {
      "en": {
        "text": "Please add the new information."
      },
      "de": {
        "text": "Bitte fügen Sie die neue Information hinzu."
      }
    },
    "exercise": {
      "blanked": "Bitte fügen Sie die neue Information ___.",
      "answer": "hinzu",
      "prefix": "hinzu",
      "cue": "hinzufügen",
      "explanation": "hinzufügen is separable: hinzu moves to the end in this clause."
    }
  },
  {
    "id": "separable-83",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "110517",
    "sourceWordId": "20517",
    "translations": {
      "en": {
        "text": "I'm coping well with the new software."
      },
      "de": {
        "text": "Ich komme gut mit der neuen Software klar."
      }
    },
    "exercise": {
      "blanked": "Ich komme gut mit der neuen Software ___.",
      "answer": "klar",
      "prefix": "klar",
      "cue": "klarkommen",
      "explanation": "klarkommen is separable: klar moves to the end in this clause."
    }
  },
  {
    "id": "separable-84",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "116443",
    "sourceWordId": "26443",
    "translations": {
      "en": {
        "text": "Please count me in for the order."
      },
      "de": {
        "text": "Bitte zähle mich bei der Bestellung mit."
      }
    },
    "exercise": {
      "blanked": "Bitte zähle mich bei der Bestellung ___.",
      "answer": "mit",
      "prefix": "mit",
      "cue": "mitzählen",
      "explanation": "mitzählen is separable: mit moves to the end in this clause."
    }
  },
  {
    "id": "separable-85",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "120209",
    "sourceWordId": "30209",
    "translations": {
      "en": {
        "text": "Children often imitate their parents."
      },
      "de": {
        "text": "Kinder ahmen oft ihre Eltern nach."
      }
    },
    "exercise": {
      "blanked": "Kinder ahmen oft ihre Eltern ___.",
      "answer": "nach",
      "prefix": "nach",
      "cue": "nachahmen",
      "explanation": "nachahmen is separable: nach moves to the end in this clause."
    }
  },
  {
    "id": "separable-86",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "116971",
    "sourceWordId": "26971",
    "translations": {
      "en": {
        "text": "He doesn't answer the phone."
      },
      "de": {
        "text": "Er geht nicht ans Telefon ran."
      }
    },
    "exercise": {
      "blanked": "Er geht nicht ans Telefon ___.",
      "answer": "ran",
      "prefix": "ran",
      "cue": "rangehen",
      "explanation": "rangehen is separable: ran moves to the end in this clause."
    }
  },
  {
    "id": "separable-87",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "111082",
    "sourceWordId": "21082",
    "translations": {
      "en": {
        "text": "Please come in!"
      },
      "de": {
        "text": "Komm bitte rein!"
      }
    },
    "exercise": {
      "blanked": "Komm bitte ___!",
      "answer": "rein",
      "prefix": "rein",
      "cue": "reinkommen",
      "explanation": "reinkommen is separable: rein moves to the end in this clause."
    }
  },
  {
    "id": "separable-88",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "107872",
    "sourceWordId": "17872",
    "translations": {
      "en": {
        "text": "The children are running around in the garden."
      },
      "de": {
        "text": "Die Kinder laufen im Garten rum."
      }
    },
    "exercise": {
      "blanked": "Die Kinder laufen im Garten ___.",
      "answer": "rum",
      "prefix": "rum",
      "cue": "rumlaufen",
      "explanation": "rumlaufen is separable: rum moves to the end in this clause."
    }
  },
  {
    "id": "separable-89",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "117552",
    "sourceWordId": "27552",
    "translations": {
      "en": {
        "text": "The car suddenly stopped."
      },
      "de": {
        "text": "Das Auto blieb plötzlich stehen."
      }
    },
    "exercise": {
      "blanked": "Das Auto blieb plötzlich ___.",
      "answer": "stehen",
      "prefix": "stehen",
      "cue": "stehenbleiben",
      "explanation": "stehenbleiben is separable: stehen moves to the end in this clause."
    }
  },
  {
    "id": "separable-90",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "107075",
    "sourceWordId": "17075",
    "translations": {
      "en": {
        "text": "Please turn around."
      },
      "de": {
        "text": "Bitte dreh dich um."
      }
    },
    "exercise": {
      "blanked": "Bitte dreh dich ___.",
      "answer": "um",
      "prefix": "um",
      "cue": "umdrehen",
      "explanation": "umdrehen is separable: um moves to the end in this clause."
    }
  },
  {
    "id": "separable-91",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "114326",
    "sourceWordId": "24326",
    "translations": {
      "en": {
        "text": "He looked around the room."
      },
      "de": {
        "text": "Er schaute sich im Raum um."
      }
    },
    "exercise": {
      "blanked": "Er schaute sich im Raum ___.",
      "answer": "um",
      "prefix": "um",
      "cue": "umschauen",
      "explanation": "umschauen is separable: um moves to the end in this clause."
    }
  },
  {
    "id": "separable-92",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "117813",
    "sourceWordId": "27813",
    "translations": {
      "en": {
        "text": "Please stir the coffee."
      },
      "de": {
        "text": "Bitte rühren Sie den Kaffee um."
      }
    },
    "exercise": {
      "blanked": "Bitte rühren Sie den Kaffee ___.",
      "answer": "um",
      "prefix": "um",
      "cue": "umrühren",
      "explanation": "umrühren is separable: um moves to the end in this clause."
    }
  },
  {
    "id": "separable-93",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "102519",
    "sourceWordId": "12519",
    "translations": {
      "en": {
        "text": "What do you have planned for tonight?"
      },
      "de": {
        "text": "Was hast du heute Abend vor?"
      }
    },
    "exercise": {
      "blanked": "Was hast du heute Abend ___?",
      "answer": "vor",
      "prefix": "vor",
      "cue": "vorhaben",
      "explanation": "vorhaben is separable: vor moves to the end in this clause."
    }
  },
  {
    "id": "separable-94",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "115613",
    "sourceWordId": "25613",
    "translations": {
      "en": {
        "text": "Please show your ID."
      },
      "de": {
        "text": "Bitte zeigen Sie Ihren Ausweis vor."
      }
    },
    "exercise": {
      "blanked": "Bitte zeigen Sie Ihren Ausweis ___.",
      "answer": "vor",
      "prefix": "vor",
      "cue": "vorzeigen",
      "explanation": "vorzeigen is separable: vor moves to the end in this clause."
    }
  },
  {
    "id": "separable-95",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "118322",
    "sourceWordId": "28322",
    "translations": {
      "en": {
        "text": "We are making good progress."
      },
      "de": {
        "text": "Wir kommen gut voran."
      }
    },
    "exercise": {
      "blanked": "Wir kommen gut ___.",
      "answer": "voran",
      "prefix": "voran",
      "cue": "vorankommen",
      "explanation": "vorankommen is separable: voran moves to the end in this clause."
    }
  },
  {
    "id": "separable-96",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "101379",
    "sourceWordId": "23141",
    "translations": {
      "en": {
        "text": "My head hurts."
      },
      "de": {
        "text": "Mein Kopf tut weh."
      }
    },
    "exercise": {
      "blanked": "Mein Kopf tut ___.",
      "answer": "weh",
      "prefix": "weh",
      "cue": "wehtun",
      "explanation": "wehtun is separable: weh moves to the end in this clause."
    }
  },
  {
    "id": "separable-97",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "103625",
    "sourceWordId": "13625",
    "translations": {
      "en": {
        "text": "The path continues here."
      },
      "de": {
        "text": "Der Weg geht hier weiter."
      }
    },
    "exercise": {
      "blanked": "Der Weg geht hier ___.",
      "answer": "weiter",
      "prefix": "weiter",
      "cue": "weitergehen",
      "explanation": "weitergehen is separable: weiter moves to the end in this clause."
    }
  },
  {
    "id": "separable-98",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "108647",
    "sourceWordId": "18647",
    "translations": {
      "en": {
        "text": "I feel very comfortable here."
      },
      "de": {
        "text": "Ich fühle mich hier sehr wohl."
      }
    },
    "exercise": {
      "blanked": "Ich fühle mich hier sehr ___.",
      "answer": "wohl",
      "prefix": "wohl",
      "cue": "wohlfühlen",
      "explanation": "wohlfühlen is separable: wohl moves to the end in this clause."
    }
  },
  {
    "id": "separable-99",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "103688",
    "sourceWordId": "13688",
    "translations": {
      "en": {
        "text": "Please listen carefully to me."
      },
      "de": {
        "text": "Bitte hör mir genau zu."
      }
    },
    "exercise": {
      "blanked": "Bitte hör mir genau ___.",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zuhören",
      "explanation": "zuhören is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-100",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "A2",
    "sourcePhraseId": "115392",
    "sourceWordId": "25392",
    "translations": {
      "en": {
        "text": "I like to watch you cook."
      },
      "de": {
        "text": "Ich gucke dir gerne beim Kochen zu."
      }
    },
    "exercise": {
      "blanked": "Ich gucke dir gerne beim Kochen ___.",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zugucken",
      "explanation": "zugucken is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-101",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "103211",
    "sourceWordId": "13211",
    "translations": {
      "en": {
        "text": "I agree with you."
      },
      "de": {
        "text": "Ich stimme dir zu."
      }
    },
    "exercise": {
      "blanked": "Ich stimme dir ___.",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zustimmen",
      "explanation": "zustimmen is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-102",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "106472",
    "sourceWordId": "16472",
    "translations": {
      "en": {
        "text": "Please help yourself!"
      },
      "de": {
        "text": "Bitte greifen Sie zu!"
      }
    },
    "exercise": {
      "blanked": "Bitte greifen Sie ___!",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zugreifen",
      "explanation": "zugreifen is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-103",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "108021",
    "sourceWordId": "18021",
    "translations": {
      "en": {
        "text": "The door is slowly closing."
      },
      "de": {
        "text": "Die Tür geht langsam zu."
      }
    },
    "exercise": {
      "blanked": "Die Tür geht langsam ___.",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zugehen",
      "explanation": "zugehen is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-104",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "108508",
    "sourceWordId": "18508",
    "translations": {
      "en": {
        "text": "Please close the door."
      },
      "de": {
        "text": "Bitte ziehen Sie die Tür zu."
      }
    },
    "exercise": {
      "blanked": "Bitte ziehen Sie die Tür ___.",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zuziehen",
      "explanation": "zuziehen is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-105",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "114165",
    "sourceWordId": "24165",
    "translations": {
      "en": {
        "text": "She turned to her book."
      },
      "de": {
        "text": "Sie wandte sich ihrem Buch zu."
      }
    },
    "exercise": {
      "blanked": "Sie wandte sich ihrem Buch ___.",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zuwenden",
      "explanation": "zuwenden is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-106",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "118342",
    "sourceWordId": "28342",
    "translations": {
      "en": {
        "text": "Please cover the baby well."
      },
      "de": {
        "text": "Bitte deck das Baby gut zu."
      }
    },
    "exercise": {
      "blanked": "Bitte deck das Baby gut ___.",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zudecken",
      "explanation": "zudecken is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-107",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "105144",
    "sourceWordId": "15144",
    "translations": {
      "en": {
        "text": "The number of tourists is steadily increasing."
      },
      "de": {
        "text": "Die Zahl der Touristen nimmt stetig zu."
      }
    },
    "exercise": {
      "blanked": "Die Zahl der Touristen nimmt stetig ___.",
      "answer": "zu",
      "prefix": "zu",
      "cue": "zunehmen",
      "explanation": "zunehmen is separable: zu moves to the end in this clause."
    }
  },
  {
    "id": "separable-108",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "115835",
    "sourceWordId": "25835",
    "translations": {
      "en": {
        "text": "I cope well with the new software."
      },
      "de": {
        "text": "Ich komme gut mit der neuen Software zurecht."
      }
    },
    "exercise": {
      "blanked": "Ich komme gut mit der neuen Software ___.",
      "answer": "zurecht",
      "prefix": "zurecht",
      "cue": "zurechtkommen",
      "explanation": "zurechtkommen is separable: zurecht moves to the end in this clause."
    }
  },
  {
    "id": "separable-109",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "114555",
    "sourceWordId": "24555",
    "translations": {
      "en": {
        "text": "He leaned back relaxed."
      },
      "de": {
        "text": "Er lehnte sich entspannt zurück."
      }
    },
    "exercise": {
      "blanked": "Er lehnte sich entspannt ___.",
      "answer": "zurück",
      "prefix": "zurück",
      "cue": "zurücklehnen",
      "explanation": "zurücklehnen is separable: zurück moves to the end in this clause."
    }
  },
  {
    "id": "separable-110",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "111127",
    "sourceWordId": "21127",
    "translations": {
      "en": {
        "text": "He looked back on his childhood."
      },
      "de": {
        "text": "Er blickte auf seine Kindheit zurück."
      }
    },
    "exercise": {
      "blanked": "Er blickte auf seine Kindheit ___.",
      "answer": "zurück",
      "prefix": "zurück",
      "cue": "zurückblicken",
      "explanation": "zurückblicken is separable: zurück moves to the end in this clause."
    }
  },
  {
    "id": "separable-111",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "115836",
    "sourceWordId": "25836",
    "translations": {
      "en": {
        "text": "When will I get my money back?"
      },
      "de": {
        "text": "Wann bekomme ich mein Geld zurück?"
      }
    },
    "exercise": {
      "blanked": "Wann bekomme ich mein Geld ___?",
      "answer": "zurück",
      "prefix": "zurück",
      "cue": "zurückbekommen",
      "explanation": "zurückbekommen is separable: zurück moves to the end in this clause."
    }
  },
  {
    "id": "separable-112",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "116303",
    "sourceWordId": "26303",
    "translations": {
      "en": {
        "text": "Please set the clock back one hour."
      },
      "de": {
        "text": "Bitte stellen Sie die Uhr eine Stunde zurück."
      }
    },
    "exercise": {
      "blanked": "Bitte stellen Sie die Uhr eine Stunde ___.",
      "answer": "zurück",
      "prefix": "zurück",
      "cue": "zurückstellen",
      "explanation": "zurückstellen is separable: zurück moves to the end in this clause."
    }
  },
  {
    "id": "separable-113",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "106795",
    "sourceWordId": "16795",
    "translations": {
      "en": {
        "text": "These two problems are closely connected."
      },
      "de": {
        "text": "Diese beiden Probleme hängen eng zusammen."
      }
    },
    "exercise": {
      "blanked": "Diese beiden Probleme hängen eng ___.",
      "answer": "zusammen",
      "prefix": "zusammen",
      "cue": "zusammenhängen",
      "explanation": "zusammenhängen is separable: zusammen moves to the end in this clause."
    }
  },
  {
    "id": "separable-114",
    "type": "grammar-application",
    "set": "separable",
    "grammarId": "grammar-de-6",
    "level": "B1",
    "sourcePhraseId": "117056",
    "sourceWordId": "27056",
    "translations": {
      "en": {
        "text": "The colors of the clothes fit well together."
      },
      "de": {
        "text": "Die Farben der Kleidung passen gut zusammen."
      }
    },
    "exercise": {
      "blanked": "Die Farben der Kleidung passen gut ___.",
      "answer": "zusammen",
      "prefix": "zusammen",
      "cue": "zusammenpassen",
      "explanation": "zusammenpassen is separable: zusammen moves to the end in this clause."
    }
  },
  /* END GENERATED SEPARABLE APPLICATIONS */
  /* BEGIN GENERATED MODAL APPLICATIONS */
  {
    "id": "modal-16",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100615",
    "translations": {
      "en": {
        "text": "May I introduce myself?"
      },
      "de": {
        "text": "Darf ich mich vorstellen?"
      }
    },
    "exercise": {
      "blanked": "Darf ich mich ___?",
      "answer": "vorstellen",
      "cue": "dürfen + infinitive",
      "explanation": "Darf is the conjugated form of dürfen; vorstellen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-17",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "140002",
    "translations": {
      "en": {
        "text": "May I open the window?"
      },
      "de": {
        "text": "Darf ich das Fenster öffnen?"
      }
    },
    "exercise": {
      "blanked": "Darf ich das Fenster ___?",
      "answer": "öffnen",
      "cue": "dürfen + infinitive",
      "explanation": "Darf is the conjugated form of dürfen; öffnen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-18",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A2",
    "sourcePhraseId": "115704",
    "translations": {
      "en": {
        "text": "May I take my hand luggage into the cabin?"
      },
      "de": {
        "text": "Darf ich mein Handgepäck mit in die Kabine nehmen?"
      }
    },
    "exercise": {
      "blanked": "Darf ich mein Handgepäck mit in die Kabine ___?",
      "answer": "nehmen",
      "cue": "dürfen + infinitive",
      "explanation": "Darf is the conjugated form of dürfen; nehmen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-19",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "B1",
    "sourcePhraseId": "103207",
    "translations": {
      "en": {
        "text": "He must not fail."
      },
      "de": {
        "text": "Er darf nicht versagen."
      }
    },
    "exercise": {
      "blanked": "Er darf nicht ___.",
      "answer": "versagen",
      "cue": "dürfen + infinitive",
      "explanation": "darf is the conjugated form of dürfen; versagen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-20",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "B1",
    "sourcePhraseId": "110175",
    "translations": {
      "en": {
        "text": "Tourists are allowed to enter without a visa."
      },
      "de": {
        "text": "Touristen dürfen ohne Visum einreisen."
      }
    },
    "exercise": {
      "blanked": "Touristen dürfen ohne Visum ___.",
      "answer": "einreisen",
      "cue": "dürfen + infinitive",
      "explanation": "dürfen is the conjugated form of dürfen; einreisen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-21",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100089",
    "translations": {
      "en": {
        "text": "What should I do?"
      },
      "de": {
        "text": "Was soll ich tun?"
      }
    },
    "exercise": {
      "blanked": "Was soll ich ___?",
      "answer": "tun",
      "cue": "sollen + infinitive",
      "explanation": "soll is the conjugated form of sollen; tun remains an infinitive at the end."
    }
  },
  {
    "id": "modal-22",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "140003",
    "translations": {
      "en": {
        "text": "You should drink more water."
      },
      "de": {
        "text": "Du sollst mehr Wasser trinken."
      }
    },
    "exercise": {
      "blanked": "Du sollst mehr Wasser ___.",
      "answer": "trinken",
      "cue": "sollen + infinitive",
      "explanation": "sollst is the conjugated form of sollen; trinken remains an infinitive at the end."
    }
  },
  {
    "id": "modal-23",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "B1",
    "sourcePhraseId": "114241",
    "translations": {
      "en": {
        "text": "A horseshoe is supposed to bring good luck."
      },
      "de": {
        "text": "Ein Hufeisen soll Glück bringen."
      }
    },
    "exercise": {
      "blanked": "Ein Hufeisen soll Glück ___.",
      "answer": "bringen",
      "cue": "sollen + infinitive",
      "explanation": "soll is the conjugated form of sollen; bringen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-24",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "B1",
    "sourcePhraseId": "119485",
    "translations": {
      "en": {
        "text": "How should I address him?"
      },
      "de": {
        "text": "Wie soll ich ihn anreden?"
      }
    },
    "exercise": {
      "blanked": "Wie soll ich ihn ___?",
      "answer": "anreden",
      "cue": "sollen + infinitive",
      "explanation": "soll is the conjugated form of sollen; anreden remains an infinitive at the end."
    }
  },
  {
    "id": "modal-25",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "B1",
    "sourcePhraseId": "101251",
    "translations": {
      "en": {
        "text": "This picture is supposed to represent freedom."
      },
      "de": {
        "text": "Dieses Bild soll die Freiheit darstellen."
      }
    },
    "exercise": {
      "blanked": "Dieses Bild soll die Freiheit ___.",
      "answer": "darstellen",
      "cue": "sollen + infinitive",
      "explanation": "soll is the conjugated form of sollen; darstellen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-26",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "B1",
    "sourcePhraseId": "103704",
    "translations": {
      "en": {
        "text": "How should I interpret this dream?"
      },
      "de": {
        "text": "Wie soll ich diesen Traum deuten?"
      }
    },
    "exercise": {
      "blanked": "Wie soll ich diesen Traum ___?",
      "answer": "deuten",
      "cue": "sollen + infinitive",
      "explanation": "soll is the conjugated form of sollen; deuten remains an infinitive at the end."
    }
  },
  {
    "id": "modal-27",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "B1",
    "sourcePhraseId": "109887",
    "translations": {
      "en": {
        "text": "There are often said to be ghosts in old castles."
      },
      "de": {
        "text": "In alten Schlössern soll es oft Gespenster geben."
      }
    },
    "exercise": {
      "blanked": "In alten Schlössern soll es oft Gespenster ___.",
      "answer": "geben",
      "cue": "sollen + infinitive",
      "explanation": "soll is the conjugated form of sollen; geben remains an infinitive at the end."
    }
  },
  {
    "id": "modal-28",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100000",
    "translations": {
      "en": {
        "text": "He wants to be a doctor."
      },
      "de": {
        "text": "Er will Arzt sein."
      }
    },
    "exercise": {
      "blanked": "Er will Arzt ___.",
      "answer": "sein",
      "cue": "wollen + infinitive",
      "explanation": "will is the conjugated form of wollen; sein remains an infinitive at the end."
    }
  },
  {
    "id": "modal-29",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100059",
    "translations": {
      "en": {
        "text": "What do you want to say?"
      },
      "de": {
        "text": "Was willst du sagen?"
      }
    },
    "exercise": {
      "blanked": "Was willst du ___?",
      "answer": "sagen",
      "cue": "wollen + infinitive",
      "explanation": "willst is the conjugated form of wollen; sagen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-30",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "140004",
    "translations": {
      "en": {
        "text": "We want to learn German."
      },
      "de": {
        "text": "Wir wollen Deutsch lernen."
      }
    },
    "exercise": {
      "blanked": "Wir wollen Deutsch ___.",
      "answer": "lernen",
      "cue": "wollen + infinitive",
      "explanation": "wollen is the conjugated form of wollen; lernen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-31",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100805",
    "translations": {
      "en": {
        "text": "We want to celebrate tonight."
      },
      "de": {
        "text": "Wir wollen heute Abend feiern."
      }
    },
    "exercise": {
      "blanked": "Wir wollen heute Abend ___.",
      "answer": "feiern",
      "cue": "wollen + infinitive",
      "explanation": "wollen is the conjugated form of wollen; feiern remains an infinitive at the end."
    }
  },
  {
    "id": "modal-32",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "118559",
    "translations": {
      "en": {
        "text": "We want to go for a walk this afternoon."
      },
      "de": {
        "text": "Wir wollen heute Nachmittag spazierengehen."
      }
    },
    "exercise": {
      "blanked": "Wir wollen heute Nachmittag ___.",
      "answer": "spazierengehen",
      "cue": "wollen + infinitive",
      "explanation": "wollen is the conjugated form of wollen; spazierengehen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-33",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A2",
    "sourcePhraseId": "105111",
    "translations": {
      "en": {
        "text": "When do we want to set off?"
      },
      "de": {
        "text": "Wann wollen wir losgehen?"
      }
    },
    "exercise": {
      "blanked": "Wann wollen wir ___?",
      "answer": "losgehen",
      "cue": "wollen + infinitive",
      "explanation": "wollen is the conjugated form of wollen; losgehen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-34",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100175",
    "translations": {
      "en": {
        "text": "What would you like to eat?"
      },
      "de": {
        "text": "Was möchtest du essen?"
      }
    },
    "exercise": {
      "blanked": "Was möchtest du ___?",
      "answer": "essen",
      "cue": "möchten + infinitive",
      "explanation": "möchtest is the conjugated form of möchten; essen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-35",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100817",
    "translations": {
      "en": {
        "text": "I would like to drink water."
      },
      "de": {
        "text": "Ich möchte Wasser trinken."
      }
    },
    "exercise": {
      "blanked": "Ich möchte Wasser ___.",
      "answer": "trinken",
      "cue": "möchten + infinitive",
      "explanation": "möchte is the conjugated form of möchten; trinken remains an infinitive at the end."
    }
  },
  {
    "id": "modal-36",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "102878",
    "translations": {
      "en": {
        "text": "I would like to apologize."
      },
      "de": {
        "text": "Ich möchte mich entschuldigen."
      }
    },
    "exercise": {
      "blanked": "Ich möchte mich ___.",
      "answer": "entschuldigen",
      "cue": "möchten + infinitive",
      "explanation": "möchte is the conjugated form of möchten; entschuldigen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-37",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "101008",
    "translations": {
      "en": {
        "text": "I want to visit my friends."
      },
      "de": {
        "text": "Ich möchte meine Freunde besuchen."
      }
    },
    "exercise": {
      "blanked": "Ich möchte meine Freunde ___.",
      "answer": "besuchen",
      "cue": "möchten + infinitive",
      "explanation": "möchte is the conjugated form of möchten; besuchen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-38",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "101204",
    "translations": {
      "en": {
        "text": "I want to eat an ice cream."
      },
      "de": {
        "text": "Ich möchte ein Eis essen."
      }
    },
    "exercise": {
      "blanked": "Ich möchte ein Eis ___.",
      "answer": "essen",
      "cue": "möchten + infinitive",
      "explanation": "möchte is the conjugated form of möchten; essen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-39",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "101036",
    "translations": {
      "en": {
        "text": "Birds can fly."
      },
      "de": {
        "text": "Vögel können fliegen."
      }
    },
    "exercise": {
      "blanked": "Vögel können ___.",
      "answer": "fliegen",
      "cue": "können + infinitive",
      "explanation": "können is the conjugated form of können; fliegen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-40",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "101845",
    "translations": {
      "en": {
        "text": "Can I pay, please?"
      },
      "de": {
        "text": "Kann ich bitte zahlen?"
      }
    },
    "exercise": {
      "blanked": "Kann ich bitte ___?",
      "answer": "zahlen",
      "cue": "können + infinitive",
      "explanation": "Kann is the conjugated form of können; zahlen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-41",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "101902",
    "translations": {
      "en": {
        "text": "I can swim well."
      },
      "de": {
        "text": "Ich kann gut schwimmen."
      }
    },
    "exercise": {
      "blanked": "Ich kann gut ___.",
      "answer": "schwimmen",
      "cue": "können + infinitive",
      "explanation": "kann is the conjugated form of können; schwimmen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-42",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "103991",
    "translations": {
      "en": {
        "text": "You can park here."
      },
      "de": {
        "text": "Du kannst hier parken."
      }
    },
    "exercise": {
      "blanked": "Du kannst hier ___.",
      "answer": "parken",
      "cue": "können + infinitive",
      "explanation": "kannst is the conjugated form of können; parken remains an infinitive at the end."
    }
  },
  {
    "id": "modal-43",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100055",
    "translations": {
      "en": {
        "text": "Can you please help me?"
      },
      "de": {
        "text": "Kannst du mir bitte helfen?"
      }
    },
    "exercise": {
      "blanked": "Kannst du mir bitte ___?",
      "answer": "helfen",
      "cue": "können + infinitive",
      "explanation": "Kannst is the conjugated form of können; helfen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-44",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100679",
    "translations": {
      "en": {
        "text": "Can I use your phone?"
      },
      "de": {
        "text": "Kann ich dein Handy benutzen?"
      }
    },
    "exercise": {
      "blanked": "Kann ich dein Handy ___?",
      "answer": "benutzen",
      "cue": "können + infinitive",
      "explanation": "Kann is the conjugated form of können; benutzen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-45",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100501",
    "translations": {
      "en": {
        "text": "First, we have to eat."
      },
      "de": {
        "text": "Zuerst müssen wir essen."
      }
    },
    "exercise": {
      "blanked": "Zuerst müssen wir ___.",
      "answer": "essen",
      "cue": "müssen + infinitive",
      "explanation": "müssen is the conjugated form of müssen; essen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-46",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "104290",
    "translations": {
      "en": {
        "text": "I have to wake up early."
      },
      "de": {
        "text": "Ich muss früh aufwachen."
      }
    },
    "exercise": {
      "blanked": "Ich muss früh ___.",
      "answer": "aufwachen",
      "cue": "müssen + infinitive",
      "explanation": "muss is the conjugated form of müssen; aufwachen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-47",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "140001",
    "translations": {
      "en": {
        "text": "I have to work today."
      },
      "de": {
        "text": "Ich muss heute arbeiten."
      }
    },
    "exercise": {
      "blanked": "Ich muss heute ___.",
      "answer": "arbeiten",
      "cue": "müssen + infinitive",
      "explanation": "muss is the conjugated form of müssen; arbeiten remains an infinitive at the end."
    }
  },
  {
    "id": "modal-48",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100386",
    "translations": {
      "en": {
        "text": "He has to pull the cart."
      },
      "de": {
        "text": "Er muss den Wagen ziehen."
      }
    },
    "exercise": {
      "blanked": "Er muss den Wagen ___.",
      "answer": "ziehen",
      "cue": "müssen + infinitive",
      "explanation": "muss is the conjugated form of müssen; ziehen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-49",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100635",
    "translations": {
      "en": {
        "text": "I have to go to the doctor."
      },
      "de": {
        "text": "Ich muss zum Arzt gehen."
      }
    },
    "exercise": {
      "blanked": "Ich muss zum Arzt ___.",
      "answer": "gehen",
      "cue": "müssen + infinitive",
      "explanation": "muss is the conjugated form of müssen; gehen remains an infinitive at the end."
    }
  },
  {
    "id": "modal-50",
    "type": "grammar-application",
    "set": "modals",
    "grammarId": "grammar-de-5",
    "level": "A1",
    "sourcePhraseId": "100706",
    "translations": {
      "en": {
        "text": "I have to go to sleep now."
      },
      "de": {
        "text": "Ich muss jetzt schlafen gehen."
      }
    },
    "exercise": {
      "blanked": "Ich muss jetzt schlafen ___.",
      "answer": "gehen",
      "cue": "müssen + infinitive",
      "explanation": "muss is the conjugated form of müssen; gehen remains an infinitive at the end."
    }
  },
  /* END GENERATED MODAL APPLICATIONS */
  /* BEGIN GENERATED CASE APPLICATIONS */
  {
    "id": "case-26",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100478",
    "translations": {
      "en": {
        "text": "The student studies diligently."
      },
      "de": {
        "text": "Der Schüler lernt fleißig."
      }
    },
    "exercise": {
      "blanked": "___ Schüler lernt fleißig.",
      "answer": "Der",
      "noun": "Schüler",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Schüler is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-27",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100819",
    "translations": {
      "en": {
        "text": "The snow is white."
      },
      "de": {
        "text": "Der Schnee ist weiß."
      }
    },
    "exercise": {
      "blanked": "___ Schnee ist weiß.",
      "answer": "Der",
      "noun": "Schnee",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Schnee is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-28",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100904",
    "translations": {
      "en": {
        "text": "The bus is coming soon."
      },
      "de": {
        "text": "Der Bus kommt gleich."
      }
    },
    "exercise": {
      "blanked": "___ Bus kommt gleich.",
      "answer": "Der",
      "noun": "Bus",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Bus is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-29",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101049",
    "translations": {
      "en": {
        "text": "The sky is blue."
      },
      "de": {
        "text": "Der Himmel ist blau."
      }
    },
    "exercise": {
      "blanked": "___ Himmel ist blau.",
      "answer": "Der",
      "noun": "Himmel",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Himmel is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-30",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101637",
    "translations": {
      "en": {
        "text": "The snow falls quietly."
      },
      "de": {
        "text": "Der Schnee fällt leise."
      }
    },
    "exercise": {
      "blanked": "___ Schnee fällt leise.",
      "answer": "Der",
      "noun": "Schnee",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Schnee is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-31",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100050",
    "translations": {
      "en": {
        "text": "The man is reading a book."
      },
      "de": {
        "text": "Der Mann liest ein Buch."
      }
    },
    "exercise": {
      "blanked": "___ Mann liest ein Buch.",
      "answer": "Der",
      "noun": "Mann",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Mann is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-32",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100082",
    "translations": {
      "en": {
        "text": "The way is very long."
      },
      "de": {
        "text": "Der Weg ist sehr lang."
      }
    },
    "exercise": {
      "blanked": "___ Weg ist sehr lang.",
      "answer": "Der",
      "noun": "Weg",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Weg is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-33",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100205",
    "translations": {
      "en": {
        "text": "The mountain is very high."
      },
      "de": {
        "text": "Der Berg ist sehr hoch."
      }
    },
    "exercise": {
      "blanked": "___ Berg ist sehr hoch.",
      "answer": "Der",
      "noun": "Berg",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Berg is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-34",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100316",
    "translations": {
      "en": {
        "text": "The boy is playing in the garden."
      },
      "de": {
        "text": "Der Junge spielt im Garten."
      }
    },
    "exercise": {
      "blanked": "___ Junge spielt im Garten.",
      "answer": "Der",
      "noun": "Junge",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Junge is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-35",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100324",
    "translations": {
      "en": {
        "text": "April is a spring month."
      },
      "de": {
        "text": "Der April ist ein Frühlingsmonat."
      }
    },
    "exercise": {
      "blanked": "___ April ist ein Frühlingsmonat.",
      "answer": "Der",
      "noun": "April",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "April is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-36",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100349",
    "translations": {
      "en": {
        "text": "The apple falls from the tree."
      },
      "de": {
        "text": "Der Apfel fällt vom Baum."
      }
    },
    "exercise": {
      "blanked": "___ Apfel fällt vom Baum.",
      "answer": "Der",
      "noun": "Apfel",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Apfel is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-37",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100354",
    "translations": {
      "en": {
        "text": "Summer is my favorite season."
      },
      "de": {
        "text": "Der Sommer ist meine Lieblingsjahreszeit."
      }
    },
    "exercise": {
      "blanked": "___ Sommer ist meine Lieblingsjahreszeit.",
      "answer": "Der",
      "noun": "Sommer",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Sommer is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-38",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100556",
    "translations": {
      "en": {
        "text": "The teacher explains the grammar."
      },
      "de": {
        "text": "Der Lehrer erklärt die Grammatik."
      }
    },
    "exercise": {
      "blanked": "___ Lehrer erklärt die Grammatik.",
      "answer": "Der",
      "noun": "Lehrer",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Lehrer is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-39",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100574",
    "translations": {
      "en": {
        "text": "The train departs on time."
      },
      "de": {
        "text": "Der Zug fährt pünktlich ab."
      }
    },
    "exercise": {
      "blanked": "___ Zug fährt pünktlich ab.",
      "answer": "Der",
      "noun": "Zug",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Zug is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-40",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100667",
    "translations": {
      "en": {
        "text": "The movie was very funny."
      },
      "de": {
        "text": "Der Film war sehr lustig."
      }
    },
    "exercise": {
      "blanked": "___ Film war sehr lustig.",
      "answer": "Der",
      "noun": "Film",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Film is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-41",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100676",
    "translations": {
      "en": {
        "text": "Winter is my favorite season."
      },
      "de": {
        "text": "Der Winter ist meine Lieblingsjahreszeit."
      }
    },
    "exercise": {
      "blanked": "___ Winter ist meine Lieblingsjahreszeit.",
      "answer": "Der",
      "noun": "Winter",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Winter is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-42",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100686",
    "translations": {
      "en": {
        "text": "The table is made of wood."
      },
      "de": {
        "text": "Der Tisch ist aus Holz."
      }
    },
    "exercise": {
      "blanked": "___ Tisch ist aus Holz.",
      "answer": "Der",
      "noun": "Tisch",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Tisch is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-43",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100864",
    "translations": {
      "en": {
        "text": "The train station is very close."
      },
      "de": {
        "text": "Der Bahnhof ist ganz nah."
      }
    },
    "exercise": {
      "blanked": "___ Bahnhof ist ganz nah.",
      "answer": "Der",
      "noun": "Bahnhof",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Bahnhof is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-44",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101005",
    "translations": {
      "en": {
        "text": "The train station is very big."
      },
      "de": {
        "text": "Der Bahnhof ist sehr groß."
      }
    },
    "exercise": {
      "blanked": "___ Bahnhof ist sehr groß.",
      "answer": "Der",
      "noun": "Bahnhof",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Bahnhof is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-45",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101129",
    "translations": {
      "en": {
        "text": "The tree is very old."
      },
      "de": {
        "text": "Der Baum ist sehr alt."
      }
    },
    "exercise": {
      "blanked": "___ Baum ist sehr alt.",
      "answer": "Der",
      "noun": "Baum",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Baum is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-46",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101269",
    "translations": {
      "en": {
        "text": "The lesson starts at 8 o'clock."
      },
      "de": {
        "text": "Der Unterricht beginnt um 8 Uhr."
      }
    },
    "exercise": {
      "blanked": "___ Unterricht beginnt um 8 Uhr.",
      "answer": "Der",
      "noun": "Unterricht",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Unterricht is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-47",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102039",
    "translations": {
      "en": {
        "text": "The television is in the living room."
      },
      "de": {
        "text": "Der Fernseher steht im Wohnzimmer."
      }
    },
    "exercise": {
      "blanked": "___ Fernseher steht im Wohnzimmer.",
      "answer": "Der",
      "noun": "Fernseher",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Fernseher is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-48",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102401",
    "translations": {
      "en": {
        "text": "Spring is my favorite season."
      },
      "de": {
        "text": "Der Frühling ist meine Lieblingsjahreszeit."
      }
    },
    "exercise": {
      "blanked": "___ Frühling ist meine Lieblingsjahreszeit.",
      "answer": "Der",
      "noun": "Frühling",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Frühling is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-49",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103401",
    "translations": {
      "en": {
        "text": "The bird is very colorful."
      },
      "de": {
        "text": "Der Vogel ist sehr bunt."
      }
    },
    "exercise": {
      "blanked": "___ Vogel ist sehr bunt.",
      "answer": "Der",
      "noun": "Vogel",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Vogel is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-50",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "104272",
    "translations": {
      "en": {
        "text": "The cake is very sweet."
      },
      "de": {
        "text": "Der Kuchen ist sehr süß."
      }
    },
    "exercise": {
      "blanked": "___ Kuchen ist sehr süß.",
      "answer": "Der",
      "noun": "Kuchen",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Kuchen is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-51",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "104301",
    "translations": {
      "en": {
        "text": "The baker bakes fresh bread."
      },
      "de": {
        "text": "Der Bäcker backt frisches Brot."
      }
    },
    "exercise": {
      "blanked": "___ Bäcker backt frisches Brot.",
      "answer": "Der",
      "noun": "Bäcker",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Bäcker is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-52",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "113656",
    "translations": {
      "en": {
        "text": "The sky is light blue today."
      },
      "de": {
        "text": "Der Himmel ist heute hellblau."
      }
    },
    "exercise": {
      "blanked": "___ Himmel ist heute hellblau.",
      "answer": "Der",
      "noun": "Himmel",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Himmel is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-53",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100332",
    "translations": {
      "en": {
        "text": "June is a beautiful month."
      },
      "de": {
        "text": "Der Juni ist ein schöner Monat."
      }
    },
    "exercise": {
      "blanked": "___ Juni ist ein schöner Monat.",
      "answer": "Der",
      "noun": "Juni",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Juni is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-54",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100374",
    "translations": {
      "en": {
        "text": "The table is two meters long."
      },
      "de": {
        "text": "Der Tisch ist zwei Meter lang."
      }
    },
    "exercise": {
      "blanked": "___ Tisch ist zwei Meter lang.",
      "answer": "Der",
      "noun": "Tisch",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Tisch is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-55",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100423",
    "translations": {
      "en": {
        "text": "February is a short month."
      },
      "de": {
        "text": "Der Februar ist ein kurzer Monat."
      }
    },
    "exercise": {
      "blanked": "___ Februar ist ein kurzer Monat.",
      "answer": "Der",
      "noun": "Februar",
      "gender": "der",
      "case": "nominative",
      "article": "definite",
      "explanation": "Februar is the subject here. Masculine nominative uses Der."
    }
  },
  {
    "id": "case-56",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100056",
    "translations": {
      "en": {
        "text": "I see a bird."
      },
      "de": {
        "text": "Ich sehe einen Vogel."
      }
    },
    "exercise": {
      "blanked": "Ich sehe ___ Vogel.",
      "answer": "einen",
      "noun": "Vogel",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Vogel is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-57",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100132",
    "translations": {
      "en": {
        "text": "I receive a letter."
      },
      "de": {
        "text": "Ich bekomme einen Brief."
      }
    },
    "exercise": {
      "blanked": "Ich bekomme ___ Brief.",
      "answer": "einen",
      "noun": "Brief",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Brief is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-58",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100223",
    "translations": {
      "en": {
        "text": "I am writing a letter."
      },
      "de": {
        "text": "Ich schreibe einen Brief."
      }
    },
    "exercise": {
      "blanked": "Ich schreibe ___ Brief.",
      "answer": "einen",
      "noun": "Brief",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Brief is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-59",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100396",
    "translations": {
      "en": {
        "text": "I am carrying a backpack."
      },
      "de": {
        "text": "Ich trage einen Rucksack."
      }
    },
    "exercise": {
      "blanked": "Ich trage ___ Rucksack.",
      "answer": "einen",
      "noun": "Rucksack",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Rucksack is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-60",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100508",
    "translations": {
      "en": {
        "text": "We are watching a movie."
      },
      "de": {
        "text": "Wir schauen einen Film."
      }
    },
    "exercise": {
      "blanked": "Wir schauen ___ Film.",
      "answer": "einen",
      "noun": "Film",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Film is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-61",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103573",
    "translations": {
      "en": {
        "text": "I am eating an apple."
      },
      "de": {
        "text": "Ich esse einen Apfel."
      }
    },
    "exercise": {
      "blanked": "Ich esse ___ Apfel.",
      "answer": "einen",
      "noun": "Apfel",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Apfel is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-62",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "108159",
    "translations": {
      "en": {
        "text": "I need a pencil."
      },
      "de": {
        "text": "Ich brauche einen Bleistift."
      }
    },
    "exercise": {
      "blanked": "Ich brauche ___ Bleistift.",
      "answer": "einen",
      "noun": "Bleistift",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Bleistift is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-63",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100238",
    "translations": {
      "en": {
        "text": "I like to watch a movie."
      },
      "de": {
        "text": "Ich sehe gern einen Film."
      }
    },
    "exercise": {
      "blanked": "Ich sehe gern ___ Film.",
      "answer": "einen",
      "noun": "Film",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Film is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-64",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100481",
    "translations": {
      "en": {
        "text": "Please read the text."
      },
      "de": {
        "text": "Bitte lesen Sie den Text."
      }
    },
    "exercise": {
      "blanked": "Bitte lesen Sie ___ Text.",
      "answer": "den",
      "noun": "Text",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Text is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-65",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101131",
    "translations": {
      "en": {
        "text": "We are hiking up the mountain."
      },
      "de": {
        "text": "Wir wandern auf den Berg."
      }
    },
    "exercise": {
      "blanked": "Wir wandern auf ___ Berg.",
      "answer": "den",
      "noun": "Berg",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Berg is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-66",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101242",
    "translations": {
      "en": {
        "text": "She is wearing a beautiful skirt."
      },
      "de": {
        "text": "Sie trägt einen schönen Rock."
      }
    },
    "exercise": {
      "blanked": "Sie trägt ___ schönen Rock.",
      "answer": "einen",
      "noun": "Rock",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Rock is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-67",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "115780",
    "translations": {
      "en": {
        "text": "The children built a snowman."
      },
      "de": {
        "text": "Die Kinder bauten einen Schneemann."
      }
    },
    "exercise": {
      "blanked": "Die Kinder bauten ___ Schneemann.",
      "answer": "einen",
      "noun": "Schneemann",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Schneemann is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-68",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100137",
    "translations": {
      "en": {
        "text": "The house has a big garden."
      },
      "de": {
        "text": "Das Haus hat einen großen Garten."
      }
    },
    "exercise": {
      "blanked": "Das Haus hat ___ großen Garten.",
      "answer": "einen",
      "noun": "Garten",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Garten is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-69",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100172",
    "translations": {
      "en": {
        "text": "Can you show me the way?"
      },
      "de": {
        "text": "Kannst du mir den Weg zeigen?"
      }
    },
    "exercise": {
      "blanked": "Kannst du mir ___ Weg zeigen?",
      "answer": "den",
      "noun": "Weg",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Weg is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-70",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100337",
    "translations": {
      "en": {
        "text": "He sits down on the chair."
      },
      "de": {
        "text": "Er setzt sich auf den Stuhl."
      }
    },
    "exercise": {
      "blanked": "Er setzt sich auf ___ Stuhl.",
      "answer": "den",
      "noun": "Stuhl",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Stuhl is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-71",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100438",
    "translations": {
      "en": {
        "text": "I have to wait for the bus."
      },
      "de": {
        "text": "Ich muss auf den Bus warten."
      }
    },
    "exercise": {
      "blanked": "Ich muss auf ___ Bus warten.",
      "answer": "den",
      "noun": "Bus",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Bus is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-72",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100628",
    "translations": {
      "en": {
        "text": "On Monday, I have an appointment."
      },
      "de": {
        "text": "Am Montag habe ich einen Termin."
      }
    },
    "exercise": {
      "blanked": "Am Montag habe ich ___ Termin.",
      "answer": "einen",
      "noun": "Termin",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Termin is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-73",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100846",
    "translations": {
      "en": {
        "text": "He broke his arm."
      },
      "de": {
        "text": "Er hat sich den Arm gebrochen."
      }
    },
    "exercise": {
      "blanked": "Er hat sich ___ Arm gebrochen.",
      "answer": "den",
      "noun": "Arm",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Arm is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-74",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100967",
    "translations": {
      "en": {
        "text": "On Wednesday I have an appointment."
      },
      "de": {
        "text": "Am Mittwoch habe ich einen Termin."
      }
    },
    "exercise": {
      "blanked": "Am Mittwoch habe ich ___ Termin.",
      "answer": "einen",
      "noun": "Termin",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Termin is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-75",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102236",
    "translations": {
      "en": {
        "text": "Every letter has its own sound."
      },
      "de": {
        "text": "Jeder Buchstabe hat einen eigenen Klang."
      }
    },
    "exercise": {
      "blanked": "Jeder Buchstabe hat ___ eigenen Klang.",
      "answer": "einen",
      "noun": "Klang",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Klang is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-76",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102286",
    "translations": {
      "en": {
        "text": "My child goes to kindergarten."
      },
      "de": {
        "text": "Mein Kind geht in den Kindergarten."
      }
    },
    "exercise": {
      "blanked": "Mein Kind geht in ___ Kindergarten.",
      "answer": "den",
      "noun": "Kindergarten",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Kindergarten is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-77",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100331",
    "translations": {
      "en": {
        "text": "In July we go on vacation."
      },
      "de": {
        "text": "Im Juli fahren wir in den Urlaub."
      }
    },
    "exercise": {
      "blanked": "Im Juli fahren wir in ___ Urlaub.",
      "answer": "den",
      "noun": "Urlaub",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Urlaub is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-78",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100681",
    "translations": {
      "en": {
        "text": "He lays the book on the table."
      },
      "de": {
        "text": "Er legt das Buch auf den Tisch."
      }
    },
    "exercise": {
      "blanked": "Er legt das Buch auf ___ Tisch.",
      "answer": "den",
      "noun": "Tisch",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Tisch is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-79",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102304",
    "translations": {
      "en": {
        "text": "Please sit on the chair."
      },
      "de": {
        "text": "Bitte setzen Sie sich auf den Stuhl."
      }
    },
    "exercise": {
      "blanked": "Bitte setzen Sie sich auf ___ Stuhl.",
      "answer": "den",
      "noun": "Stuhl",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Stuhl is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-80",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102524",
    "translations": {
      "en": {
        "text": "The exercise is important for progress."
      },
      "de": {
        "text": "Die Übung ist wichtig für den Fortschritt."
      }
    },
    "exercise": {
      "blanked": "Die Übung ist wichtig für ___ Fortschritt.",
      "answer": "den",
      "noun": "Fortschritt",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Fortschritt is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-81",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102915",
    "translations": {
      "en": {
        "text": "We are going to the zoo on the weekend."
      },
      "de": {
        "text": "Wir gehen am Wochenende in den Zoo."
      }
    },
    "exercise": {
      "blanked": "Wir gehen am Wochenende in ___ Zoo.",
      "answer": "den",
      "noun": "Zoo",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Zoo is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-82",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103774",
    "translations": {
      "en": {
        "text": "We have to get on the train quickly."
      },
      "de": {
        "text": "Wir müssen schnell in den Zug einsteigen."
      }
    },
    "exercise": {
      "blanked": "Wir müssen schnell in ___ Zug einsteigen.",
      "answer": "den",
      "noun": "Zug",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Zug is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-83",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "104142",
    "translations": {
      "en": {
        "text": "I need a tomato for the salad."
      },
      "de": {
        "text": "Ich brauche eine Tomate für den Salat."
      }
    },
    "exercise": {
      "blanked": "Ich brauche eine Tomate für ___ Salat.",
      "answer": "den",
      "noun": "Salat",
      "gender": "der",
      "case": "accusative",
      "article": "definite",
      "explanation": "Salat is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-84",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100884",
    "translations": {
      "en": {
        "text": "We have a beautiful garden behind the house."
      },
      "de": {
        "text": "Wir haben einen schönen Garten hinter dem Haus."
      }
    },
    "exercise": {
      "blanked": "Wir haben ___ schönen Garten hinter dem Haus.",
      "answer": "einen",
      "noun": "Garten",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Garten is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-85",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100920",
    "translations": {
      "en": {
        "text": "I received a letter from my family."
      },
      "de": {
        "text": "Ich habe einen Brief von meiner Familie bekommen."
      }
    },
    "exercise": {
      "blanked": "Ich habe ___ Brief von meiner Familie bekommen.",
      "answer": "einen",
      "noun": "Brief",
      "gender": "der",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "Brief is masculine; this article form marks accusative."
    }
  },
  {
    "id": "case-86",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100588",
    "translations": {
      "en": {
        "text": "I am sitting on the chair."
      },
      "de": {
        "text": "Ich sitze auf dem Stuhl."
      }
    },
    "exercise": {
      "blanked": "Ich sitze auf ___ Stuhl.",
      "answer": "dem",
      "noun": "Stuhl",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Stuhl is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-87",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102549",
    "translations": {
      "en": {
        "text": "The mouse hid under the table."
      },
      "de": {
        "text": "Die Maus versteckte sich unter dem Tisch."
      }
    },
    "exercise": {
      "blanked": "Die Maus versteckte sich unter ___ Tisch.",
      "answer": "dem",
      "noun": "Tisch",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Tisch is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-88",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "109046",
    "translations": {
      "en": {
        "text": "I'll send you a postcard from vacation."
      },
      "de": {
        "text": "Ich schicke dir eine Postkarte aus dem Urlaub."
      }
    },
    "exercise": {
      "blanked": "Ich schicke dir eine Postkarte aus ___ Urlaub.",
      "answer": "dem",
      "noun": "Urlaub",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Urlaub is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-89",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102794",
    "translations": {
      "en": {
        "text": "Smoke came out of the chimney."
      },
      "de": {
        "text": "Aus dem Schornstein kam Rauch."
      }
    },
    "exercise": {
      "blanked": "Aus ___ Schornstein kam Rauch.",
      "answer": "dem",
      "noun": "Schornstein",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Schornstein is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-90",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "104452",
    "translations": {
      "en": {
        "text": "The assistant helps the professor."
      },
      "de": {
        "text": "Der Assistent hilft dem Professor."
      }
    },
    "exercise": {
      "blanked": "Der Assistent hilft ___ Professor.",
      "answer": "dem",
      "noun": "Professor",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Professor is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-91",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102606",
    "translations": {
      "en": {
        "text": "The tourist asked for directions."
      },
      "de": {
        "text": "Der Tourist fragte nach dem Weg."
      }
    },
    "exercise": {
      "blanked": "Der Tourist fragte nach ___ Weg.",
      "answer": "dem",
      "noun": "Weg",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Weg is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-92",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102710",
    "translations": {
      "en": {
        "text": "I live in a quiet district."
      },
      "de": {
        "text": "Ich wohne in einem ruhigen Stadtteil."
      }
    },
    "exercise": {
      "blanked": "Ich wohne in ___ ruhigen Stadtteil.",
      "answer": "einem",
      "noun": "Stadtteil",
      "gender": "der",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Stadtteil is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-93",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103444",
    "translations": {
      "en": {
        "text": "The pot is on the stove."
      },
      "de": {
        "text": "Der Topf steht auf dem Herd."
      }
    },
    "exercise": {
      "blanked": "Der Topf steht auf ___ Herd.",
      "answer": "dem",
      "noun": "Herd",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Herd is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-94",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "105447",
    "translations": {
      "en": {
        "text": "The duck swam on the pond."
      },
      "de": {
        "text": "Die Ente schwamm auf dem Teich."
      }
    },
    "exercise": {
      "blanked": "Die Ente schwamm auf ___ Teich.",
      "answer": "dem",
      "noun": "Teich",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Teich is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-95",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "105895",
    "translations": {
      "en": {
        "text": "A bird sat on the branch."
      },
      "de": {
        "text": "Ein Vogel saß auf dem Ast."
      }
    },
    "exercise": {
      "blanked": "Ein Vogel saß auf ___ Ast.",
      "answer": "dem",
      "noun": "Ast",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Ast is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-96",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107574",
    "translations": {
      "en": {
        "text": "After the lightning came the thunder."
      },
      "de": {
        "text": "Nach dem Blitz kam der Donner."
      }
    },
    "exercise": {
      "blanked": "Nach ___ Blitz kam der Donner.",
      "answer": "dem",
      "noun": "Blitz",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Blitz is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-97",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107595",
    "translations": {
      "en": {
        "text": "The globe is on the desk."
      },
      "de": {
        "text": "Der Globus steht auf dem Schreibtisch."
      }
    },
    "exercise": {
      "blanked": "Der Globus steht auf ___ Schreibtisch.",
      "answer": "dem",
      "noun": "Schreibtisch",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Schreibtisch is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-98",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107897",
    "translations": {
      "en": {
        "text": "They live in a quiet suburb."
      },
      "de": {
        "text": "Sie wohnen in einem ruhigen Vorort."
      }
    },
    "exercise": {
      "blanked": "Sie wohnen in ___ ruhigen Vorort.",
      "answer": "einem",
      "noun": "Vorort",
      "gender": "der",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Vorort is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-99",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "108308",
    "translations": {
      "en": {
        "text": "Please stay on the sidewalk."
      },
      "de": {
        "text": "Bitte bleiben Sie auf dem Gehweg."
      }
    },
    "exercise": {
      "blanked": "Bitte bleiben Sie auf ___ Gehweg.",
      "answer": "dem",
      "noun": "Gehweg",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Gehweg is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-100",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "108371",
    "translations": {
      "en": {
        "text": "We play football on the sports field."
      },
      "de": {
        "text": "Wir spielen Fußball auf dem Sportplatz."
      }
    },
    "exercise": {
      "blanked": "Wir spielen Fußball auf ___ Sportplatz.",
      "answer": "dem",
      "noun": "Sportplatz",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Sportplatz is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-101",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "108422",
    "translations": {
      "en": {
        "text": "The owl is sitting on the tree."
      },
      "de": {
        "text": "Die Eule sitzt auf dem Baum."
      }
    },
    "exercise": {
      "blanked": "Die Eule sitzt auf ___ Baum.",
      "answer": "dem",
      "noun": "Baum",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Baum is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-102",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "109056",
    "translations": {
      "en": {
        "text": "The children are playing in the schoolyard."
      },
      "de": {
        "text": "Die Kinder spielen auf dem Schulhof."
      }
    },
    "exercise": {
      "blanked": "Die Kinder spielen auf ___ Schulhof.",
      "answer": "dem",
      "noun": "Schulhof",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Schulhof is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-103",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "111158",
    "translations": {
      "en": {
        "text": "Please walk on the sidewalk."
      },
      "de": {
        "text": "Bitte gehen Sie auf dem Bürgersteig."
      }
    },
    "exercise": {
      "blanked": "Bitte gehen Sie auf ___ Bürgersteig.",
      "answer": "dem",
      "noun": "Bürgersteig",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Bürgersteig is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-104",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "117222",
    "translations": {
      "en": {
        "text": "There was a lamp on the nightstand."
      },
      "de": {
        "text": "Auf dem Nachttisch stand eine Lampe."
      }
    },
    "exercise": {
      "blanked": "Auf ___ Nachttisch stand eine Lampe.",
      "answer": "dem",
      "noun": "Nachttisch",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Nachttisch is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-105",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "118729",
    "translations": {
      "en": {
        "text": "We meet at the church square."
      },
      "de": {
        "text": "Wir treffen uns auf dem Kirchplatz."
      }
    },
    "exercise": {
      "blanked": "Wir treffen uns auf ___ Kirchplatz.",
      "answer": "dem",
      "noun": "Kirchplatz",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Kirchplatz is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-106",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "119087",
    "translations": {
      "en": {
        "text": "The children are sitting in the back seat."
      },
      "de": {
        "text": "Die Kinder sitzen auf dem Rücksitz."
      }
    },
    "exercise": {
      "blanked": "Die Kinder sitzen auf ___ Rücksitz.",
      "answer": "dem",
      "noun": "Rücksitz",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Rücksitz is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-107",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "119184",
    "translations": {
      "en": {
        "text": "A blackbird sang on the tree."
      },
      "de": {
        "text": "Eine Amsel sang auf dem Baum."
      }
    },
    "exercise": {
      "blanked": "Eine Amsel sang auf ___ Baum.",
      "answer": "dem",
      "noun": "Baum",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Baum is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-108",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101649",
    "translations": {
      "en": {
        "text": "A small bird is sitting on the branch."
      },
      "de": {
        "text": "Ein kleiner Vogel sitzt auf dem Ast."
      }
    },
    "exercise": {
      "blanked": "Ein kleiner Vogel sitzt auf ___ Ast.",
      "answer": "dem",
      "noun": "Ast",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Ast is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-109",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102223",
    "translations": {
      "en": {
        "text": "The child hides behind the tree."
      },
      "de": {
        "text": "Das Kind versteckt sich hinter dem Baum."
      }
    },
    "exercise": {
      "blanked": "Das Kind versteckt sich hinter ___ Baum.",
      "answer": "dem",
      "noun": "Baum",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Baum is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-110",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103024",
    "translations": {
      "en": {
        "text": "He ignored the warning about the storm."
      },
      "de": {
        "text": "Er ignorierte die Warnung vor dem Sturm."
      }
    },
    "exercise": {
      "blanked": "Er ignorierte die Warnung vor ___ Sturm.",
      "answer": "dem",
      "noun": "Sturm",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Sturm is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-111",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103158",
    "translations": {
      "en": {
        "text": "Save the file on the desktop."
      },
      "de": {
        "text": "Speichern Sie die Datei auf dem Desktop."
      }
    },
    "exercise": {
      "blanked": "Speichern Sie die Datei auf ___ Desktop.",
      "answer": "dem",
      "noun": "Desktop",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Desktop is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-112",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103473",
    "translations": {
      "en": {
        "text": "There is a big stain on the carpet."
      },
      "de": {
        "text": "Auf dem Teppich ist ein großer Fleck."
      }
    },
    "exercise": {
      "blanked": "Auf ___ Teppich ist ein großer Fleck.",
      "answer": "dem",
      "noun": "Teppich",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Teppich is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-113",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "104381",
    "translations": {
      "en": {
        "text": "After work, I go home."
      },
      "de": {
        "text": "Nach dem Feierabend gehe ich nach Hause."
      }
    },
    "exercise": {
      "blanked": "Nach ___ Feierabend gehe ich nach Hause.",
      "answer": "dem",
      "noun": "Feierabend",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Feierabend is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-114",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "106835",
    "translations": {
      "en": {
        "text": "There were one hundred thousand people in the square."
      },
      "de": {
        "text": "Es waren Hunderttausend Menschen auf dem Platz."
      }
    },
    "exercise": {
      "blanked": "Es waren Hunderttausend Menschen auf ___ Platz.",
      "answer": "dem",
      "noun": "Platz",
      "gender": "der",
      "case": "dative",
      "article": "definite",
      "explanation": "Platz is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-115",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107388",
    "translations": {
      "en": {
        "text": "I am a member of a local sports club."
      },
      "de": {
        "text": "Ich bin Mitglied in einem lokalen Sportverein."
      }
    },
    "exercise": {
      "blanked": "Ich bin Mitglied in ___ lokalen Sportverein.",
      "answer": "einem",
      "noun": "Sportverein",
      "gender": "der",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Sportverein is masculine; this article form marks dative."
    }
  },
  {
    "id": "case-116",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100448",
    "translations": {
      "en": {
        "text": "Please put a period at the end of the sentence."
      },
      "de": {
        "text": "Bitte setzen Sie einen Punkt am Ende des Satzes."
      }
    },
    "exercise": {
      "blanked": "Bitte setzen Sie einen Punkt am Ende ___ Satzes.",
      "answer": "des",
      "noun": "Satz",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Satz is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-117",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100604",
    "translations": {
      "en": {
        "text": "Eat the rest of the cake."
      },
      "de": {
        "text": "Iss den Rest des Kuchens."
      }
    },
    "exercise": {
      "blanked": "Iss den Rest ___ Kuchens.",
      "answer": "des",
      "noun": "Kuchen",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Kuchen is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-118",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100263",
    "translations": {
      "en": {
        "text": "The form of the table is round."
      },
      "de": {
        "text": "Die Form des Tisches ist rund."
      }
    },
    "exercise": {
      "blanked": "Die Form ___ Tisches ist rund.",
      "answer": "des",
      "noun": "Tisch",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Tisch is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-119",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100322",
    "translations": {
      "en": {
        "text": "The middle of the room is empty."
      },
      "de": {
        "text": "Die Mitte des Raumes ist leer."
      }
    },
    "exercise": {
      "blanked": "Die Mitte ___ Raumes ist leer.",
      "answer": "des",
      "noun": "Raum",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Raum is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-120",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102472",
    "translations": {
      "en": {
        "text": "The arrival of the train was delayed."
      },
      "de": {
        "text": "Die Ankunft des Zuges wurde verspätet."
      }
    },
    "exercise": {
      "blanked": "Die Ankunft ___ Zuges wurde verspätet.",
      "answer": "des",
      "noun": "Zug",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Zug is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-121",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103638",
    "translations": {
      "en": {
        "text": "The blossom of the tree is beautiful."
      },
      "de": {
        "text": "Die Blüte des Baumes ist wunderschön."
      }
    },
    "exercise": {
      "blanked": "Die Blüte ___ Baumes ist wunderschön.",
      "answer": "des",
      "noun": "Baum",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Baum is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-122",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107800",
    "translations": {
      "en": {
        "text": "The sender of the letter is unknown."
      },
      "de": {
        "text": "Der Absender des Briefes ist unbekannt."
      }
    },
    "exercise": {
      "blanked": "Der Absender ___ Briefes ist unbekannt.",
      "answer": "des",
      "noun": "Brief",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Brief is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-123",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100361",
    "translations": {
      "en": {
        "text": "Art is a form of expression."
      },
      "de": {
        "text": "Die Kunst ist eine Form des Ausdrucks."
      }
    },
    "exercise": {
      "blanked": "Die Kunst ist eine Form ___ Ausdrucks.",
      "answer": "des",
      "noun": "Ausdruck",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Ausdruck is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-124",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100475",
    "translations": {
      "en": {
        "text": "Half of the cake is still there."
      },
      "de": {
        "text": "Die Hälfte des Kuchens ist noch da."
      }
    },
    "exercise": {
      "blanked": "Die Hälfte ___ Kuchens ist noch da.",
      "answer": "des",
      "noun": "Kuchen",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Kuchen is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-125",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101079",
    "translations": {
      "en": {
        "text": "The length of the table is two meters."
      },
      "de": {
        "text": "Die Länge des Tisches beträgt zwei Meter."
      }
    },
    "exercise": {
      "blanked": "Die Länge ___ Tisches beträgt zwei Meter.",
      "answer": "des",
      "noun": "Tisch",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Tisch is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-126",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103320",
    "translations": {
      "en": {
        "text": "The train's departure is at 10 AM."
      },
      "de": {
        "text": "Die Abfahrt des Zuges ist um 10 Uhr."
      }
    },
    "exercise": {
      "blanked": "Die Abfahrt ___ Zuges ist um 10 Uhr.",
      "answer": "des",
      "noun": "Zug",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Zug is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-127",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "104533",
    "translations": {
      "en": {
        "text": "The dog's fur is very soft."
      },
      "de": {
        "text": "Das Fell des Hundes ist sehr weich."
      }
    },
    "exercise": {
      "blanked": "Das Fell ___ Hundes ist sehr weich.",
      "answer": "des",
      "noun": "Hund",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Hund is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-128",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107719",
    "translations": {
      "en": {
        "text": "There is a question mark at the end of the sentence."
      },
      "de": {
        "text": "Am Ende des Satzes steht ein Fragezeichen."
      }
    },
    "exercise": {
      "blanked": "Am Ende ___ Satzes steht ein Fragezeichen.",
      "answer": "des",
      "noun": "Satz",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Satz is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-129",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "112210",
    "translations": {
      "en": {
        "text": "We waited a long time in the doctor's waiting room."
      },
      "de": {
        "text": "Wir warteten lange im Wartezimmer des Arztes."
      }
    },
    "exercise": {
      "blanked": "Wir warteten lange im Wartezimmer ___ Arztes.",
      "answer": "des",
      "noun": "Arzt",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Arzt is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-130",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "112321",
    "translations": {
      "en": {
        "text": "Lunchtime is my favorite time of the day."
      },
      "de": {
        "text": "Die Mittagszeit ist meine Lieblingszeit des Tages."
      }
    },
    "exercise": {
      "blanked": "Die Mittagszeit ist meine Lieblingszeit ___ Tages.",
      "answer": "des",
      "noun": "Tag",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Tag is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-131",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "113211",
    "translations": {
      "en": {
        "text": "The driver of the bus was very friendly."
      },
      "de": {
        "text": "Die Fahrerin des Busses war sehr freundlich."
      }
    },
    "exercise": {
      "blanked": "Die Fahrerin ___ Busses war sehr freundlich.",
      "answer": "des",
      "noun": "Bus",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Bus is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-132",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100755",
    "translations": {
      "en": {
        "text": "The skin is the largest organ of the body."
      },
      "de": {
        "text": "Die Haut ist das größte Organ des Körpers."
      }
    },
    "exercise": {
      "blanked": "Die Haut ist das größte Organ ___ Körpers.",
      "answer": "des",
      "noun": "Körper",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Körper is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-133",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "109068",
    "translations": {
      "en": {
        "text": "Please note the asterisk at the end of the sentence."
      },
      "de": {
        "text": "Bitte beachten Sie das Sternchen am Ende des Satzes."
      }
    },
    "exercise": {
      "blanked": "Bitte beachten Sie das Sternchen am Ende ___ Satzes.",
      "answer": "des",
      "noun": "Satz",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Satz is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-134",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "110157",
    "translations": {
      "en": {
        "text": "The owner of the dog came."
      },
      "de": {
        "text": "Die Besitzerin des Hundes kam."
      }
    },
    "exercise": {
      "blanked": "Die Besitzerin ___ Hundes kam.",
      "answer": "des",
      "noun": "Hund",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Hund is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-135",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "100351",
    "translations": {
      "en": {
        "text": "The height of the mountain is impressive."
      },
      "de": {
        "text": "Die Höhe des Berges ist beeindruckend."
      }
    },
    "exercise": {
      "blanked": "Die Höhe ___ Berges ist beeindruckend.",
      "answer": "des",
      "noun": "Berg",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Berg is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-136",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "100869",
    "translations": {
      "en": {
        "text": "He reached the peak of the mountain."
      },
      "de": {
        "text": "Er erreichte die Spitze des Berges."
      }
    },
    "exercise": {
      "blanked": "Er erreichte die Spitze ___ Berges.",
      "answer": "des",
      "noun": "Berg",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Berg is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-137",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101261",
    "translations": {
      "en": {
        "text": "The level of the course is high."
      },
      "de": {
        "text": "Das Niveau des Kurses ist hoch."
      }
    },
    "exercise": {
      "blanked": "Das Niveau ___ Kurses ist hoch.",
      "answer": "des",
      "noun": "Kurs",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Kurs is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-138",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101282",
    "translations": {
      "en": {
        "text": "The surface of the table is smooth."
      },
      "de": {
        "text": "Die Fläche des Tisches ist glatt."
      }
    },
    "exercise": {
      "blanked": "Die Fläche ___ Tisches ist glatt.",
      "answer": "des",
      "noun": "Tisch",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Tisch is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-139",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101563",
    "translations": {
      "en": {
        "text": "The edge of the table is sharp."
      },
      "de": {
        "text": "Der Rand des Tisches ist scharf."
      }
    },
    "exercise": {
      "blanked": "Der Rand ___ Tisches ist scharf.",
      "answer": "des",
      "noun": "Tisch",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Tisch is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-140",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101720",
    "translations": {
      "en": {
        "text": "The plot of the film was exciting."
      },
      "de": {
        "text": "Die Handlung des Films war spannend."
      }
    },
    "exercise": {
      "blanked": "Die Handlung ___ Films war spannend.",
      "answer": "des",
      "noun": "Film",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Film is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-141",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101938",
    "translations": {
      "en": {
        "text": "The surface of the table is smooth."
      },
      "de": {
        "text": "Die Oberfläche des Tisches ist glatt."
      }
    },
    "exercise": {
      "blanked": "Die Oberfläche ___ Tisches ist glatt.",
      "answer": "des",
      "noun": "Tisch",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Tisch is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-142",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102123",
    "translations": {
      "en": {
        "text": "We reached the summit of the mountain."
      },
      "de": {
        "text": "Wir erreichten den Gipfel des Berges."
      }
    },
    "exercise": {
      "blanked": "Wir erreichten den Gipfel ___ Berges.",
      "answer": "des",
      "noun": "Berg",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Berg is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-143",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102378",
    "translations": {
      "en": {
        "text": "She enjoyed the silence of the forest."
      },
      "de": {
        "text": "Sie genoss die Stille des Waldes."
      }
    },
    "exercise": {
      "blanked": "Sie genoss die Stille ___ Waldes.",
      "answer": "des",
      "noun": "Wald",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Wald is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-144",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103063",
    "translations": {
      "en": {
        "text": "The city is located north of the river."
      },
      "de": {
        "text": "Die Stadt liegt nördlich des Flusses."
      }
    },
    "exercise": {
      "blanked": "Die Stadt liegt nördlich ___ Flusses.",
      "answer": "des",
      "noun": "Fluss",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Fluss is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-145",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103085",
    "translations": {
      "en": {
        "text": "The sight of the mountain was breathtaking."
      },
      "de": {
        "text": "Der Anblick des Berges war atemberaubend."
      }
    },
    "exercise": {
      "blanked": "Der Anblick ___ Berges war atemberaubend.",
      "answer": "des",
      "noun": "Berg",
      "gender": "der",
      "case": "genitive",
      "article": "definite",
      "explanation": "Berg is masculine; this article form marks genitive."
    }
  },
  {
    "id": "case-146",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100147",
    "translations": {
      "en": {
        "text": "The police are here."
      },
      "de": {
        "text": "Die Polizei ist hier."
      }
    },
    "exercise": {
      "blanked": "___ Polizei ist hier.",
      "answer": "Die",
      "noun": "Polizei",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Polizei is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-147",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100160",
    "translations": {
      "en": {
        "text": "The night is dark."
      },
      "de": {
        "text": "Die Nacht ist dunkel."
      }
    },
    "exercise": {
      "blanked": "___ Nacht ist dunkel.",
      "answer": "Die",
      "noun": "Nacht",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Nacht is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-148",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100381",
    "translations": {
      "en": {
        "text": "The distance is 100 kilometers."
      },
      "de": {
        "text": "Die Strecke beträgt 100 Km."
      }
    },
    "exercise": {
      "blanked": "___ Strecke beträgt 100 Km.",
      "answer": "Die",
      "noun": "Strecke",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Strecke is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-149",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101189",
    "translations": {
      "en": {
        "text": "The cup is empty."
      },
      "de": {
        "text": "Die Tasse ist leer."
      }
    },
    "exercise": {
      "blanked": "___ Tasse ist leer.",
      "answer": "Die",
      "noun": "Tasse",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Tasse is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-150",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101790",
    "translations": {
      "en": {
        "text": "The bottle is empty."
      },
      "de": {
        "text": "Die Flasche ist leer."
      }
    },
    "exercise": {
      "blanked": "___ Flasche ist leer.",
      "answer": "Die",
      "noun": "Flasche",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Flasche is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-151",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102022",
    "translations": {
      "en": {
        "text": "The rose smells wonderful."
      },
      "de": {
        "text": "Die Rose duftet wunderbar."
      }
    },
    "exercise": {
      "blanked": "___ Rose duftet wunderbar.",
      "answer": "Die",
      "noun": "Rose",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Rose is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-152",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102488",
    "translations": {
      "en": {
        "text": "The cat is grey."
      },
      "de": {
        "text": "Die Katze ist grau."
      }
    },
    "exercise": {
      "blanked": "___ Katze ist grau.",
      "answer": "Die",
      "noun": "Katze",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Katze is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-153",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103846",
    "translations": {
      "en": {
        "text": "The lamp is broken."
      },
      "de": {
        "text": "Die Lampe ist kaputt."
      }
    },
    "exercise": {
      "blanked": "___ Lampe ist kaputt.",
      "answer": "Die",
      "noun": "Lampe",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Lampe is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-154",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103959",
    "translations": {
      "en": {
        "text": "The traffic light is red."
      },
      "de": {
        "text": "Die Ampel ist rot."
      }
    },
    "exercise": {
      "blanked": "___ Ampel ist rot.",
      "answer": "Die",
      "noun": "Ampel",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Ampel is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-155",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100068",
    "translations": {
      "en": {
        "text": "The woman is reading a book."
      },
      "de": {
        "text": "Die Frau liest ein Buch."
      }
    },
    "exercise": {
      "blanked": "___ Frau liest ein Buch.",
      "answer": "Die",
      "noun": "Frau",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Frau is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-156",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100153",
    "translations": {
      "en": {
        "text": "A week has seven days."
      },
      "de": {
        "text": "Eine Woche hat sieben Tage."
      }
    },
    "exercise": {
      "blanked": "___ Woche hat sieben Tage.",
      "answer": "Eine",
      "noun": "Woche",
      "gender": "die",
      "case": "nominative",
      "article": "indefinite",
      "explanation": "Woche is the subject here. Feminine nominative uses Eine."
    }
  },
  {
    "id": "case-157",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100162",
    "translations": {
      "en": {
        "text": "An hour has sixty minutes."
      },
      "de": {
        "text": "Eine Stunde hat sechzig Minuten."
      }
    },
    "exercise": {
      "blanked": "___ Stunde hat sechzig Minuten.",
      "answer": "Eine",
      "noun": "Stunde",
      "gender": "die",
      "case": "nominative",
      "article": "indefinite",
      "explanation": "Stunde is the subject here. Feminine nominative uses Eine."
    }
  },
  {
    "id": "case-158",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100201",
    "translations": {
      "en": {
        "text": "The task is very difficult."
      },
      "de": {
        "text": "Die Aufgabe ist sehr schwer."
      }
    },
    "exercise": {
      "blanked": "___ Aufgabe ist sehr schwer.",
      "answer": "Die",
      "noun": "Aufgabe",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Aufgabe is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-159",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100232",
    "translations": {
      "en": {
        "text": "The task is very easy."
      },
      "de": {
        "text": "Die Aufgabe ist sehr leicht."
      }
    },
    "exercise": {
      "blanked": "___ Aufgabe ist sehr leicht.",
      "answer": "Die",
      "noun": "Aufgabe",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Aufgabe is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-160",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100240",
    "translations": {
      "en": {
        "text": "The music is too loud."
      },
      "de": {
        "text": "Die Musik ist zu laut."
      }
    },
    "exercise": {
      "blanked": "___ Musik ist zu laut.",
      "answer": "Die",
      "noun": "Musik",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Musik is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-161",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100389",
    "translations": {
      "en": {
        "text": "The train departs on time."
      },
      "de": {
        "text": "Die Bahn fährt pünktlich ab."
      }
    },
    "exercise": {
      "blanked": "___ Bahn fährt pünktlich ab.",
      "answer": "Die",
      "noun": "Bahn",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Bahn is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-162",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100845",
    "translations": {
      "en": {
        "text": "The family is very poor."
      },
      "de": {
        "text": "Die Familie ist sehr arm."
      }
    },
    "exercise": {
      "blanked": "___ Familie ist sehr arm.",
      "answer": "Die",
      "noun": "Familie",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Familie is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-163",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101707",
    "translations": {
      "en": {
        "text": "The flower is very beautiful."
      },
      "de": {
        "text": "Die Blume ist sehr schön."
      }
    },
    "exercise": {
      "blanked": "___ Blume ist sehr schön.",
      "answer": "Die",
      "noun": "Blume",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Blume is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-164",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103835",
    "translations": {
      "en": {
        "text": "German grammar is complex."
      },
      "de": {
        "text": "Die deutsche Grammatik ist komplex."
      }
    },
    "exercise": {
      "blanked": "___ deutsche Grammatik ist komplex.",
      "answer": "Die",
      "noun": "Grammatik",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Grammatik is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-165",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100170",
    "translations": {
      "en": {
        "text": "School starts at eight o'clock."
      },
      "de": {
        "text": "Die Schule beginnt um acht Uhr."
      }
    },
    "exercise": {
      "blanked": "___ Schule beginnt um acht Uhr.",
      "answer": "Die",
      "noun": "Schule",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Schule is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-166",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101493",
    "translations": {
      "en": {
        "text": "The cat is sleeping on the sofa."
      },
      "de": {
        "text": "Die Katze schläft auf dem Sofa."
      }
    },
    "exercise": {
      "blanked": "___ Katze schläft auf dem Sofa.",
      "answer": "Die",
      "noun": "Katze",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Katze is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-167",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101966",
    "translations": {
      "en": {
        "text": "The cat is sleeping on the blanket."
      },
      "de": {
        "text": "Die Katze schläft auf der Decke."
      }
    },
    "exercise": {
      "blanked": "___ Katze schläft auf der Decke.",
      "answer": "Die",
      "noun": "Katze",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Katze is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-168",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103836",
    "translations": {
      "en": {
        "text": "The next stop is at the market square."
      },
      "de": {
        "text": "Die nächste Haltestelle ist am Marktplatz."
      }
    },
    "exercise": {
      "blanked": "___ nächste Haltestelle ist am Marktplatz.",
      "answer": "Die",
      "noun": "Haltestelle",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Haltestelle is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-169",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "113252",
    "translations": {
      "en": {
        "text": "The waitress brought us the menu."
      },
      "de": {
        "text": "Die Kellnerin brachte uns die Speisekarte."
      }
    },
    "exercise": {
      "blanked": "___ Kellnerin brachte uns die Speisekarte.",
      "answer": "Die",
      "noun": "Kellnerin",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Kellnerin is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-170",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101014",
    "translations": {
      "en": {
        "text": "The kitchen is the heart of the house."
      },
      "de": {
        "text": "Die Küche ist das Herz des Hauses."
      }
    },
    "exercise": {
      "blanked": "___ Küche ist das Herz des Hauses.",
      "answer": "Die",
      "noun": "Küche",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Küche is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-171",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "107228",
    "translations": {
      "en": {
        "text": "The bus stop is just around the corner."
      },
      "de": {
        "text": "Die Bushaltestelle ist gleich um die Ecke."
      }
    },
    "exercise": {
      "blanked": "___ Bushaltestelle ist gleich um die Ecke.",
      "answer": "Die",
      "noun": "Bushaltestelle",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Bushaltestelle is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-172",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "108786",
    "translations": {
      "en": {
        "text": "The saleswoman helped me with the selection."
      },
      "de": {
        "text": "Die Verkäuferin half mir bei der Auswahl."
      }
    },
    "exercise": {
      "blanked": "___ Verkäuferin half mir bei der Auswahl.",
      "answer": "Die",
      "noun": "Verkäuferin",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Verkäuferin is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-173",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "110059",
    "translations": {
      "en": {
        "text": "The bell rings."
      },
      "de": {
        "text": "Die Klingel läutet."
      }
    },
    "exercise": {
      "blanked": "___ Klingel läutet.",
      "answer": "Die",
      "noun": "Klingel",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Klingel is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-174",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100042",
    "translations": {
      "en": {
        "text": "The line is straight."
      },
      "de": {
        "text": "Die Linie ist gerade."
      }
    },
    "exercise": {
      "blanked": "___ Linie ist gerade.",
      "answer": "Die",
      "noun": "Linie",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Linie is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-175",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100435",
    "translations": {
      "en": {
        "text": "The situation is complicated."
      },
      "de": {
        "text": "Die Situation ist kompliziert."
      }
    },
    "exercise": {
      "blanked": "___ Situation ist kompliziert.",
      "answer": "Die",
      "noun": "Situation",
      "gender": "die",
      "case": "nominative",
      "article": "definite",
      "explanation": "Situation is the subject here. Feminine nominative uses Die."
    }
  },
  {
    "id": "case-176",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100652",
    "translations": {
      "en": {
        "text": "I need a map for the city."
      },
      "de": {
        "text": "Ich brauche eine Karte für die Stadt."
      }
    },
    "exercise": {
      "blanked": "Ich brauche eine Karte für ___ Stadt.",
      "answer": "die",
      "noun": "Stadt",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Stadt is feminine, so the article is die."
    }
  },
  {
    "id": "case-177",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "105293",
    "translations": {
      "en": {
        "text": "Please give me a spoon for the soup."
      },
      "de": {
        "text": "Bitte gib mir einen Löffel für die Suppe."
      }
    },
    "exercise": {
      "blanked": "Bitte gib mir einen Löffel für ___ Suppe.",
      "answer": "die",
      "noun": "Suppe",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Suppe is feminine, so the article is die."
    }
  },
  {
    "id": "case-178",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100408",
    "translations": {
      "en": {
        "text": "Are you ready for the exam?"
      },
      "de": {
        "text": "Bist du bereit für die Prüfung?"
      }
    },
    "exercise": {
      "blanked": "Bist du bereit für ___ Prüfung?",
      "answer": "die",
      "noun": "Prüfung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Prüfung is feminine, so the article is die."
    }
  },
  {
    "id": "case-179",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "111047",
    "translations": {
      "en": {
        "text": "I need leek for the soup."
      },
      "de": {
        "text": "Ich brauche Lauch für die Suppe."
      }
    },
    "exercise": {
      "blanked": "Ich brauche Lauch für ___ Suppe.",
      "answer": "die",
      "noun": "Suppe",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Suppe is feminine, so the article is die."
    }
  },
  {
    "id": "case-180",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100872",
    "translations": {
      "en": {
        "text": "We are taking a tour through the city."
      },
      "de": {
        "text": "Wir machen eine Tour durch die Stadt."
      }
    },
    "exercise": {
      "blanked": "Wir machen eine Tour durch ___ Stadt.",
      "answer": "die",
      "noun": "Stadt",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Stadt is feminine, so the article is die."
    }
  },
  {
    "id": "case-181",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102015",
    "translations": {
      "en": {
        "text": "The rent for the apartment is high."
      },
      "de": {
        "text": "Die Miete für die Wohnung ist hoch."
      }
    },
    "exercise": {
      "blanked": "Die Miete für ___ Wohnung ist hoch.",
      "answer": "die",
      "noun": "Wohnung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Wohnung is feminine, so the article is die."
    }
  },
  {
    "id": "case-182",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103614",
    "translations": {
      "en": {
        "text": "I'm packing my backpack for the hike."
      },
      "de": {
        "text": "Ich packe meinen Rucksack für die Wanderung."
      }
    },
    "exercise": {
      "blanked": "Ich packe meinen Rucksack für ___ Wanderung.",
      "answer": "die",
      "noun": "Wanderung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Wanderung is feminine, so the article is die."
    }
  },
  {
    "id": "case-183",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "105146",
    "translations": {
      "en": {
        "text": "I need an onion for the soup."
      },
      "de": {
        "text": "Ich brauche eine Zwiebel für die Suppe."
      }
    },
    "exercise": {
      "blanked": "Ich brauche eine Zwiebel für ___ Suppe.",
      "answer": "die",
      "noun": "Suppe",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Suppe is feminine, so the article is die."
    }
  },
  {
    "id": "case-184",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "114756",
    "translations": {
      "en": {
        "text": "I need new detergent for the laundry."
      },
      "de": {
        "text": "Ich brauche neues Waschmittel für die Wäsche."
      }
    },
    "exercise": {
      "blanked": "Ich brauche neues Waschmittel für ___ Wäsche.",
      "answer": "die",
      "noun": "Wäsche",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Wäsche is feminine, so the article is die."
    }
  },
  {
    "id": "case-185",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "115571",
    "translations": {
      "en": {
        "text": "I packed my sleeping bag for the hike."
      },
      "de": {
        "text": "Ich packte meinen Schlafsack für die Wanderung ein."
      }
    },
    "exercise": {
      "blanked": "Ich packte meinen Schlafsack für ___ Wanderung ein.",
      "answer": "die",
      "noun": "Wanderung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Wanderung is feminine, so the article is die."
    }
  },
  {
    "id": "case-186",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "117790",
    "translations": {
      "en": {
        "text": "For the soup, we need celery and carrots."
      },
      "de": {
        "text": "Für die Suppe brauchen wir Sellerie und Karotten."
      }
    },
    "exercise": {
      "blanked": "Für ___ Suppe brauchen wir Sellerie und Karotten.",
      "answer": "die",
      "noun": "Suppe",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Suppe is feminine, so the article is die."
    }
  },
  {
    "id": "case-187",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "106733",
    "translations": {
      "en": {
        "text": "I still have to write my term paper for the university."
      },
      "de": {
        "text": "Ich muss noch meine Hausarbeit für die Universität schreiben."
      }
    },
    "exercise": {
      "blanked": "Ich muss noch meine Hausarbeit für ___ Universität schreiben.",
      "answer": "die",
      "noun": "Universität",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Universität is feminine, so the article is die."
    }
  },
  {
    "id": "case-188",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107116",
    "translations": {
      "en": {
        "text": "Please check the timetable for the next train."
      },
      "de": {
        "text": "Bitte überprüfen Sie den Fahrplan für die nächste Bahn."
      }
    },
    "exercise": {
      "blanked": "Bitte überprüfen Sie den Fahrplan für ___ nächste Bahn.",
      "answer": "die",
      "noun": "Bahn",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Bahn is feminine, so the article is die."
    }
  },
  {
    "id": "case-189",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "109431",
    "translations": {
      "en": {
        "text": "We need an electrician to fix the lamp."
      },
      "de": {
        "text": "Wir brauchen einen Elektriker, um die Lampe zu reparieren."
      }
    },
    "exercise": {
      "blanked": "Wir brauchen einen Elektriker, um ___ Lampe zu reparieren.",
      "answer": "die",
      "noun": "Lampe",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "um takes accusative here. Lampe is feminine, so the article is die."
    }
  },
  {
    "id": "case-190",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "117738",
    "translations": {
      "en": {
        "text": "I need a ruler to draw a straight line."
      },
      "de": {
        "text": "Ich brauche ein Lineal, um eine gerade Linie zu ziehen."
      }
    },
    "exercise": {
      "blanked": "Ich brauche ein Lineal, um ___ gerade Linie zu ziehen.",
      "answer": "eine",
      "noun": "Linie",
      "gender": "die",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "um takes accusative here. Linie is feminine, so the article is eine."
    }
  },
  {
    "id": "case-191",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "100576",
    "translations": {
      "en": {
        "text": "Sport is good for movement."
      },
      "de": {
        "text": "Sport ist gut für die Bewegung."
      }
    },
    "exercise": {
      "blanked": "Sport ist gut für ___ Bewegung.",
      "answer": "die",
      "noun": "Bewegung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Bewegung is feminine, so the article is die."
    }
  },
  {
    "id": "case-192",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102791",
    "translations": {
      "en": {
        "text": "The moderator led through the show."
      },
      "de": {
        "text": "Der Moderator führte durch die Sendung."
      }
    },
    "exercise": {
      "blanked": "Der Moderator führte durch ___ Sendung.",
      "answer": "die",
      "noun": "Sendung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Sendung is feminine, so the article is die."
    }
  },
  {
    "id": "case-193",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "104841",
    "translations": {
      "en": {
        "text": "We are distributing flyers for the event."
      },
      "de": {
        "text": "Wir verteilen Flyer für die Veranstaltung."
      }
    },
    "exercise": {
      "blanked": "Wir verteilen Flyer für ___ Veranstaltung.",
      "answer": "die",
      "noun": "Veranstaltung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Veranstaltung is feminine, so the article is die."
    }
  },
  {
    "id": "case-194",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "105484",
    "translations": {
      "en": {
        "text": "The people are protesting against the government."
      },
      "de": {
        "text": "Die Leute protestieren gegen die Regierung."
      }
    },
    "exercise": {
      "blanked": "Die Leute protestieren gegen ___ Regierung.",
      "answer": "die",
      "noun": "Regierung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "gegen takes accusative here. Regierung is feminine, so the article is die."
    }
  },
  {
    "id": "case-195",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "106108",
    "translations": {
      "en": {
        "text": "They walked through a narrow alley."
      },
      "de": {
        "text": "Sie gingen durch eine enge Gasse."
      }
    },
    "exercise": {
      "blanked": "Sie gingen durch ___ enge Gasse.",
      "answer": "eine",
      "noun": "Gasse",
      "gender": "die",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "durch takes accusative here. Gasse is feminine, so the article is eine."
    }
  },
  {
    "id": "case-196",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "106137",
    "translations": {
      "en": {
        "text": "Smoking is harmful to health."
      },
      "de": {
        "text": "Rauchen ist schädlich für die Gesundheit."
      }
    },
    "exercise": {
      "blanked": "Rauchen ist schädlich für ___ Gesundheit.",
      "answer": "die",
      "noun": "Gesundheit",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Gesundheit is feminine, so the article is die."
    }
  },
  {
    "id": "case-197",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "106959",
    "translations": {
      "en": {
        "text": "The water flows through the tube."
      },
      "de": {
        "text": "Das Wasser fließt durch die Röhre."
      }
    },
    "exercise": {
      "blanked": "Das Wasser fließt durch ___ Röhre.",
      "answer": "die",
      "noun": "Röhre",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Röhre is feminine, so the article is die."
    }
  },
  {
    "id": "case-198",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "107639",
    "translations": {
      "en": {
        "text": "Running is good for your health."
      },
      "de": {
        "text": "Running ist gut für die Gesundheit."
      }
    },
    "exercise": {
      "blanked": "Running ist gut für ___ Gesundheit.",
      "answer": "die",
      "noun": "Gesundheit",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Gesundheit is feminine, so the article is die."
    }
  },
  {
    "id": "case-199",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "108352",
    "translations": {
      "en": {
        "text": "Recycling is important for the environment."
      },
      "de": {
        "text": "Recycling ist wichtig für die Umwelt."
      }
    },
    "exercise": {
      "blanked": "Recycling ist wichtig für ___ Umwelt.",
      "answer": "die",
      "noun": "Umwelt",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Umwelt is feminine, so the article is die."
    }
  },
  {
    "id": "case-200",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "112518",
    "translations": {
      "en": {
        "text": "Nicotine is harmful to health."
      },
      "de": {
        "text": "Nikotin ist schädlich für die Gesundheit."
      }
    },
    "exercise": {
      "blanked": "Nikotin ist schädlich für ___ Gesundheit.",
      "answer": "die",
      "noun": "Gesundheit",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Gesundheit is feminine, so the article is die."
    }
  },
  {
    "id": "case-201",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "114891",
    "translations": {
      "en": {
        "text": "The bus drives through the city."
      },
      "de": {
        "text": "Der Omnibus fährt durch die Stadt."
      }
    },
    "exercise": {
      "blanked": "Der Omnibus fährt durch ___ Stadt.",
      "answer": "die",
      "noun": "Stadt",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Stadt is feminine, so the article is die."
    }
  },
  {
    "id": "case-202",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "116672",
    "translations": {
      "en": {
        "text": "A caravan moved through the desert."
      },
      "de": {
        "text": "Eine Karawane zog durch die Wüste."
      }
    },
    "exercise": {
      "blanked": "Eine Karawane zog durch ___ Wüste.",
      "answer": "die",
      "noun": "Wüste",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Wüste is feminine, so the article is die."
    }
  },
  {
    "id": "case-203",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "116778",
    "translations": {
      "en": {
        "text": "The environmentalists protested against the deforestation."
      },
      "de": {
        "text": "Die Umweltschützer protestierten gegen die Abholzung."
      }
    },
    "exercise": {
      "blanked": "Die Umweltschützer protestierten gegen ___ Abholzung.",
      "answer": "die",
      "noun": "Abholzung",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "gegen takes accusative here. Abholzung is feminine, so the article is die."
    }
  },
  {
    "id": "case-204",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "116962",
    "translations": {
      "en": {
        "text": "He wandered aimlessly through the city."
      },
      "de": {
        "text": "Er wanderte planlos durch die Stadt."
      }
    },
    "exercise": {
      "blanked": "Er wanderte planlos durch ___ Stadt.",
      "answer": "die",
      "noun": "Stadt",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Stadt is feminine, so the article is die."
    }
  },
  {
    "id": "case-205",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "118480",
    "translations": {
      "en": {
        "text": "The car crashed into the guardrail."
      },
      "de": {
        "text": "Das Auto prallte gegen die Leitplanke."
      }
    },
    "exercise": {
      "blanked": "Das Auto prallte gegen ___ Leitplanke.",
      "answer": "die",
      "noun": "Leitplanke",
      "gender": "die",
      "case": "accusative",
      "article": "definite",
      "explanation": "gegen takes accusative here. Leitplanke is feminine, so the article is die."
    }
  },
  {
    "id": "case-206",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103443",
    "translations": {
      "en": {
        "text": "I drink coffee from a cup."
      },
      "de": {
        "text": "Ich trinke Kaffee aus einer Tasse."
      }
    },
    "exercise": {
      "blanked": "Ich trinke Kaffee aus ___ Tasse.",
      "answer": "einer",
      "noun": "Tasse",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "aus takes dative. Tasse is feminine, so the article is einer."
    }
  },
  {
    "id": "case-207",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "105995",
    "translations": {
      "en": {
        "text": "He chopped wood with an axe."
      },
      "de": {
        "text": "Er hackte Holz mit einer Axt."
      }
    },
    "exercise": {
      "blanked": "Er hackte Holz mit ___ Axt.",
      "answer": "einer",
      "noun": "Axt",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "mit takes dative. Axt is feminine, so the article is einer."
    }
  },
  {
    "id": "case-208",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "110053",
    "translations": {
      "en": {
        "text": "We celebrate Christmas Eve with the family."
      },
      "de": {
        "text": "Wir feiern Heiligabend mit der Familie."
      }
    },
    "exercise": {
      "blanked": "Wir feiern Heiligabend mit ___ Familie.",
      "answer": "der",
      "noun": "Familie",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "mit takes dative. Familie is feminine, so the article is der."
    }
  },
  {
    "id": "case-209",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100680",
    "translations": {
      "en": {
        "text": "My colleague helps me with the work."
      },
      "de": {
        "text": "Mein Kollege hilft mir bei der Arbeit."
      }
    },
    "exercise": {
      "blanked": "Mein Kollege hilft mir bei ___ Arbeit.",
      "answer": "der",
      "noun": "Arbeit",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "bei takes dative. Arbeit is feminine, so the article is der."
    }
  },
  {
    "id": "case-210",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101507",
    "translations": {
      "en": {
        "text": "He has a lot of stress at work."
      },
      "de": {
        "text": "Er hat viel Stress bei der Arbeit."
      }
    },
    "exercise": {
      "blanked": "Er hat viel Stress bei ___ Arbeit.",
      "answer": "der",
      "noun": "Arbeit",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "bei takes dative. Arbeit is feminine, so the article is der."
    }
  },
  {
    "id": "case-211",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103466",
    "translations": {
      "en": {
        "text": "I want to relax after work."
      },
      "de": {
        "text": "Ich möchte mich nach der Arbeit entspannen."
      }
    },
    "exercise": {
      "blanked": "Ich möchte mich nach ___ Arbeit entspannen.",
      "answer": "der",
      "noun": "Arbeit",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "nach takes dative. Arbeit is feminine, so the article is der."
    }
  },
  {
    "id": "case-212",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "111895",
    "translations": {
      "en": {
        "text": "We are going to a birthday party tonight."
      },
      "de": {
        "text": "Wir gehen heute Abend zu einer Geburtstagsfeier."
      }
    },
    "exercise": {
      "blanked": "Wir gehen heute Abend zu ___ Geburtstagsfeier.",
      "answer": "einer",
      "noun": "Geburtstagsfeier",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "zu takes dative. Geburtstagsfeier is feminine, so the article is einer."
    }
  },
  {
    "id": "case-213",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "112166",
    "translations": {
      "en": {
        "text": "He dug a hole with the shovel."
      },
      "de": {
        "text": "Er grub ein Loch mit der Schaufel."
      }
    },
    "exercise": {
      "blanked": "Er grub ein Loch mit ___ Schaufel.",
      "answer": "der",
      "noun": "Schaufel",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "mit takes dative. Schaufel is feminine, so the article is der."
    }
  },
  {
    "id": "case-214",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "114873",
    "translations": {
      "en": {
        "text": "I like water with a slice of lemon."
      },
      "de": {
        "text": "Ich mag Wasser mit einer Scheibe Lemon."
      }
    },
    "exercise": {
      "blanked": "Ich mag Wasser mit ___ Scheibe Lemon.",
      "answer": "einer",
      "noun": "Scheibe",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "mit takes dative. Scheibe is feminine, so the article is einer."
    }
  },
  {
    "id": "case-215",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "117941",
    "translations": {
      "en": {
        "text": "The female helper assisted us with the work."
      },
      "de": {
        "text": "Die Helferin unterstützte uns bei der Arbeit."
      }
    },
    "exercise": {
      "blanked": "Die Helferin unterstützte uns bei ___ Arbeit.",
      "answer": "der",
      "noun": "Arbeit",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "bei takes dative. Arbeit is feminine, so the article is der."
    }
  },
  {
    "id": "case-216",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101734",
    "translations": {
      "en": {
        "text": "After the illness, he felt very weak."
      },
      "de": {
        "text": "Nach der Krankheit fühlte er sich sehr schwach."
      }
    },
    "exercise": {
      "blanked": "Nach ___ Krankheit fühlte er sich sehr schwach.",
      "answer": "der",
      "noun": "Krankheit",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "nach takes dative. Krankheit is feminine, so the article is der."
    }
  },
  {
    "id": "case-217",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103146",
    "translations": {
      "en": {
        "text": "I have to pick up my children from school."
      },
      "de": {
        "text": "Ich muss meine Kinder von der Schule abholen."
      }
    },
    "exercise": {
      "blanked": "Ich muss meine Kinder von ___ Schule abholen.",
      "answer": "der",
      "noun": "Schule",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "von takes dative. Schule is feminine, so the article is der."
    }
  },
  {
    "id": "case-218",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103440",
    "translations": {
      "en": {
        "text": "She wiped the sweat from her forehead."
      },
      "de": {
        "text": "Sie wischte sich den Schweiß von der Stirn."
      }
    },
    "exercise": {
      "blanked": "Sie wischte sich den Schweiß von ___ Stirn.",
      "answer": "der",
      "noun": "Stirn",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "von takes dative. Stirn is feminine, so the article is der."
    }
  },
  {
    "id": "case-219",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "114985",
    "translations": {
      "en": {
        "text": "Don't forget to log out after the session."
      },
      "de": {
        "text": "Vergessen Sie nicht, sich nach der Sitzung abzumelden."
      }
    },
    "exercise": {
      "blanked": "Vergessen Sie nicht, sich nach ___ Sitzung abzumelden.",
      "answer": "der",
      "noun": "Sitzung",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "nach takes dative. Sitzung is feminine, so the article is der."
    }
  },
  {
    "id": "case-220",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102345",
    "translations": {
      "en": {
        "text": "He works at an advertising agency."
      },
      "de": {
        "text": "Er arbeitet bei einer Werbeagentur."
      }
    },
    "exercise": {
      "blanked": "Er arbeitet bei ___ Werbeagentur.",
      "answer": "einer",
      "noun": "Werbeagentur",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "bei takes dative. Werbeagentur is feminine, so the article is einer."
    }
  },
  {
    "id": "case-221",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "109109",
    "translations": {
      "en": {
        "text": "People age over time."
      },
      "de": {
        "text": "Menschen altern mit der Zeit."
      }
    },
    "exercise": {
      "blanked": "Menschen altern mit ___ Zeit.",
      "answer": "der",
      "noun": "Zeit",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "mit takes dative. Zeit is feminine, so the article is der."
    }
  },
  {
    "id": "case-222",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "111123",
    "translations": {
      "en": {
        "text": "She works at an advertising agency."
      },
      "de": {
        "text": "Sie arbeitet bei einer Werbeagentur."
      }
    },
    "exercise": {
      "blanked": "Sie arbeitet bei ___ Werbeagentur.",
      "answer": "einer",
      "noun": "Werbeagentur",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "bei takes dative. Werbeagentur is feminine, so the article is einer."
    }
  },
  {
    "id": "case-223",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "111837",
    "translations": {
      "en": {
        "text": "She dreams of a world trip."
      },
      "de": {
        "text": "Sie träumt von einer Weltreise."
      }
    },
    "exercise": {
      "blanked": "Sie träumt von ___ Weltreise.",
      "answer": "einer",
      "noun": "Weltreise",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "von takes dative. Weltreise is feminine, so the article is einer."
    }
  },
  {
    "id": "case-224",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101992",
    "translations": {
      "en": {
        "text": "After the party, there was total chaos."
      },
      "de": {
        "text": "Nach der Party herrschte totales Chaos."
      }
    },
    "exercise": {
      "blanked": "Nach ___ Party herrschte totales Chaos.",
      "answer": "der",
      "noun": "Party",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "nach takes dative. Party is feminine, so the article is der."
    }
  },
  {
    "id": "case-225",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102596",
    "translations": {
      "en": {
        "text": "The children are playing with a ball."
      },
      "de": {
        "text": "Die Kinder spielen mit einer Kugel."
      }
    },
    "exercise": {
      "blanked": "Die Kinder spielen mit ___ Kugel.",
      "answer": "einer",
      "noun": "Kugel",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "mit takes dative. Kugel is feminine, so the article is einer."
    }
  },
  {
    "id": "case-226",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103153",
    "translations": {
      "en": {
        "text": "He was drunk after the party."
      },
      "de": {
        "text": "Er war nach der Party betrunken."
      }
    },
    "exercise": {
      "blanked": "Er war nach ___ Party betrunken.",
      "answer": "der",
      "noun": "Party",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "nach takes dative. Party is feminine, so the article is der."
    }
  },
  {
    "id": "case-227",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "105496",
    "translations": {
      "en": {
        "text": "He comes from a Southern German city."
      },
      "de": {
        "text": "Er kommt aus einer süddeutschen Stadt."
      }
    },
    "exercise": {
      "blanked": "Er kommt aus ___ süddeutschen Stadt.",
      "answer": "einer",
      "noun": "Stadt",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "aus takes dative. Stadt is feminine, so the article is einer."
    }
  },
  {
    "id": "case-228",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "106677",
    "translations": {
      "en": {
        "text": "He comes from a West German city."
      },
      "de": {
        "text": "Er kommt aus einer westdeutschen Stadt."
      }
    },
    "exercise": {
      "blanked": "Er kommt aus ___ westdeutschen Stadt.",
      "answer": "einer",
      "noun": "Stadt",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "aus takes dative. Stadt is feminine, so the article is einer."
    }
  },
  {
    "id": "case-229",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "107259",
    "translations": {
      "en": {
        "text": "He comes from an East German city."
      },
      "de": {
        "text": "Er kommt aus einer ostdeutschen Stadt."
      }
    },
    "exercise": {
      "blanked": "Er kommt aus ___ ostdeutschen Stadt.",
      "answer": "einer",
      "noun": "Stadt",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "aus takes dative. Stadt is feminine, so the article is einer."
    }
  },
  {
    "id": "case-230",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "108800",
    "translations": {
      "en": {
        "text": "After the ride, she felt nausea."
      },
      "de": {
        "text": "Nach der Fahrt verspürte sie Übelkeit."
      }
    },
    "exercise": {
      "blanked": "Nach ___ Fahrt verspürte sie Übelkeit.",
      "answer": "der",
      "noun": "Fahrt",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "nach takes dative. Fahrt is feminine, so the article is der."
    }
  },
  {
    "id": "case-231",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "110786",
    "translations": {
      "en": {
        "text": "She was enthusiastic about the idea."
      },
      "de": {
        "text": "Sie war begeistert von der Idee."
      }
    },
    "exercise": {
      "blanked": "Sie war begeistert von ___ Idee.",
      "answer": "der",
      "noun": "Idee",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "von takes dative. Idee is feminine, so the article is der."
    }
  },
  {
    "id": "case-232",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "111335",
    "translations": {
      "en": {
        "text": "She sought help at a counseling center."
      },
      "de": {
        "text": "Sie suchte Hilfe bei einer Beratungsstelle."
      }
    },
    "exercise": {
      "blanked": "Sie suchte Hilfe bei ___ Beratungsstelle.",
      "answer": "einer",
      "noun": "Beratungsstelle",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "bei takes dative. Beratungsstelle is feminine, so the article is einer."
    }
  },
  {
    "id": "case-233",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "111588",
    "translations": {
      "en": {
        "text": "He sang with a powerful voice."
      },
      "de": {
        "text": "Er sang mit einer kraftvollen Stimme."
      }
    },
    "exercise": {
      "blanked": "Er sang mit ___ kraftvollen Stimme.",
      "answer": "einer",
      "noun": "Stimme",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "mit takes dative. Stimme is feminine, so the article is einer."
    }
  },
  {
    "id": "case-234",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "113426",
    "translations": {
      "en": {
        "text": "We must continue with the work."
      },
      "de": {
        "text": "Wir müssen mit der Arbeit fortfahren."
      }
    },
    "exercise": {
      "blanked": "Wir müssen mit ___ Arbeit fortfahren.",
      "answer": "der",
      "noun": "Arbeit",
      "gender": "die",
      "case": "dative",
      "article": "definite",
      "explanation": "mit takes dative. Arbeit is feminine, so the article is der."
    }
  },
  {
    "id": "case-235",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "116566",
    "translations": {
      "en": {
        "text": "He comes from a noble family."
      },
      "de": {
        "text": "Er stammt aus einer adligen Familie."
      }
    },
    "exercise": {
      "blanked": "Er stammt aus ___ adligen Familie.",
      "answer": "einer",
      "noun": "Familie",
      "gender": "die",
      "case": "dative",
      "article": "indefinite",
      "explanation": "aus takes dative. Familie is feminine, so the article is einer."
    }
  },
  {
    "id": "case-236",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100064",
    "translations": {
      "en": {
        "text": "That is the end of the story."
      },
      "de": {
        "text": "Das ist das Ende der Geschichte."
      }
    },
    "exercise": {
      "blanked": "Das ist das Ende ___ Geschichte.",
      "answer": "der",
      "noun": "Geschichte",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Geschichte is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-237",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102440",
    "translations": {
      "en": {
        "text": "This is the fifth day of the week."
      },
      "de": {
        "text": "Das ist der fünfte Tag der Woche."
      }
    },
    "exercise": {
      "blanked": "Das ist der fünfte Tag ___ Woche.",
      "answer": "der",
      "noun": "Woche",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Woche is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-238",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "105312",
    "translations": {
      "en": {
        "text": "This is the sixth day of the week."
      },
      "de": {
        "text": "Das ist der sechste Tag der Woche."
      }
    },
    "exercise": {
      "blanked": "Das ist der sechste Tag ___ Woche.",
      "answer": "der",
      "noun": "Woche",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Woche is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-239",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100163",
    "translations": {
      "en": {
        "text": "The topic of the discussion was interesting."
      },
      "de": {
        "text": "Das Thema der Diskussion war interessant."
      }
    },
    "exercise": {
      "blanked": "Das Thema ___ Diskussion war interessant.",
      "answer": "der",
      "noun": "Diskussion",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Diskussion is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-240",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100249",
    "translations": {
      "en": {
        "text": "Ten percent of the population are students."
      },
      "de": {
        "text": "Zehn Prozent der Bevölkerung sind Studenten."
      }
    },
    "exercise": {
      "blanked": "Zehn Prozent ___ Bevölkerung sind Studenten.",
      "answer": "der",
      "noun": "Bevölkerung",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Bevölkerung is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-241",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "104420",
    "translations": {
      "en": {
        "text": "The peel of the banana is yellow."
      },
      "de": {
        "text": "Die Schale der Banane ist gelb."
      }
    },
    "exercise": {
      "blanked": "Die Schale ___ Banane ist gelb.",
      "answer": "der",
      "noun": "Banane",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Banane is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-242",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "110438",
    "translations": {
      "en": {
        "text": "We are going to the company's Christmas party."
      },
      "de": {
        "text": "Wir gehen zur Weihnachtsfeier der Firma."
      }
    },
    "exercise": {
      "blanked": "Wir gehen zur Weihnachtsfeier ___ Firma.",
      "answer": "der",
      "noun": "Firma",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Firma is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-243",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100974",
    "translations": {
      "en": {
        "text": "The city center is very lively."
      },
      "de": {
        "text": "Das Zentrum der Stadt ist sehr belebt."
      }
    },
    "exercise": {
      "blanked": "Das Zentrum ___ Stadt ist sehr belebt.",
      "answer": "der",
      "noun": "Stadt",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Stadt is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-244",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101221",
    "translations": {
      "en": {
        "text": "The sound of the music is very clear."
      },
      "de": {
        "text": "Der Ton der Musik ist sehr klar."
      }
    },
    "exercise": {
      "blanked": "Der Ton ___ Musik ist sehr klar.",
      "answer": "der",
      "noun": "Musik",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Musik is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-245",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101611",
    "translations": {
      "en": {
        "text": "I live in the old quarter of the city."
      },
      "de": {
        "text": "Ich wohne im alten Viertel der Stadt."
      }
    },
    "exercise": {
      "blanked": "Ich wohne im alten Viertel ___ Stadt.",
      "answer": "der",
      "noun": "Stadt",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Stadt is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-246",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "104788",
    "translations": {
      "en": {
        "text": "That is the seventh day of the week."
      },
      "de": {
        "text": "Das ist der siebte Tag der Woche."
      }
    },
    "exercise": {
      "blanked": "Das ist der siebte Tag ___ Woche.",
      "answer": "der",
      "noun": "Woche",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Woche is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-247",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107626",
    "translations": {
      "en": {
        "text": "The house is located in the northwest of the city."
      },
      "de": {
        "text": "Das Haus liegt im Nordwesten der Stadt."
      }
    },
    "exercise": {
      "blanked": "Das Haus liegt im Nordwesten ___ Stadt.",
      "answer": "der",
      "noun": "Stadt",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Stadt is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-248",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "110934",
    "translations": {
      "en": {
        "text": "Christmas is a time of joy."
      },
      "de": {
        "text": "Das Weihnachtsfest ist eine Zeit der Freude."
      }
    },
    "exercise": {
      "blanked": "Das Weihnachtsfest ist eine Zeit ___ Freude.",
      "answer": "der",
      "noun": "Freude",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Freude is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-249",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "111850",
    "translations": {
      "en": {
        "text": "The collection of the goods is possible tomorrow."
      },
      "de": {
        "text": "Die Abholung der Ware ist morgen möglich."
      }
    },
    "exercise": {
      "blanked": "Die Abholung ___ Ware ist morgen möglich.",
      "answer": "der",
      "noun": "Ware",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Ware is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-250",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102631",
    "translations": {
      "en": {
        "text": "He raised his thumb as a sign of approval."
      },
      "de": {
        "text": "Er hob den Daumen als Zeichen der Zustimmung."
      }
    },
    "exercise": {
      "blanked": "Er hob den Daumen als Zeichen ___ Zustimmung.",
      "answer": "der",
      "noun": "Zustimmung",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Zustimmung is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-251",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102714",
    "translations": {
      "en": {
        "text": "The old tower is a landmark of the city."
      },
      "de": {
        "text": "Der alte Turm ist ein Wahrzeichen der Stadt."
      }
    },
    "exercise": {
      "blanked": "Der alte Turm ist ein Wahrzeichen ___ Stadt.",
      "answer": "der",
      "noun": "Stadt",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Stadt is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-252",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "104412",
    "translations": {
      "en": {
        "text": "The Pacific Ocean is the largest ocean in the world."
      },
      "de": {
        "text": "Der Pazifische Ozean ist der größte Ozean der Welt."
      }
    },
    "exercise": {
      "blanked": "Der Pazifische Ozean ist der größte Ozean ___ Welt.",
      "answer": "der",
      "noun": "Welt",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Welt is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-253",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "111168",
    "translations": {
      "en": {
        "text": "The average age of the population is rising."
      },
      "de": {
        "text": "Das Durchschnittsalter der Bevölkerung steigt."
      }
    },
    "exercise": {
      "blanked": "Das Durchschnittsalter ___ Bevölkerung steigt.",
      "answer": "der",
      "noun": "Bevölkerung",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Bevölkerung is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-254",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "100314",
    "translations": {
      "en": {
        "text": "He is a member of a political party."
      },
      "de": {
        "text": "Er ist Mitglied einer politischen Partei."
      }
    },
    "exercise": {
      "blanked": "Er ist Mitglied ___ politischen Partei.",
      "answer": "einer",
      "noun": "Partei",
      "gender": "die",
      "case": "genitive",
      "article": "indefinite",
      "explanation": "The phrase marks a possessive relationship. Partei is feminine, so feminine genitive uses einer."
    }
  },
  {
    "id": "case-255",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "100661",
    "translations": {
      "en": {
        "text": "The shop is outside of the city."
      },
      "de": {
        "text": "Das Geschäft ist ausserhalb der Stadt."
      }
    },
    "exercise": {
      "blanked": "Das Geschäft ist ausserhalb ___ Stadt.",
      "answer": "der",
      "noun": "Stadt",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "ausserhalb takes genitive here. Stadt is feminine, so the article is der."
    }
  },
  {
    "id": "case-256",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "100792",
    "translations": {
      "en": {
        "text": "The manufacturing process is complex."
      },
      "de": {
        "text": "Der Prozess der Herstellung ist komplex."
      }
    },
    "exercise": {
      "blanked": "Der Prozess ___ Herstellung ist komplex.",
      "answer": "der",
      "noun": "Herstellung",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Herstellung is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-257",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101334",
    "translations": {
      "en": {
        "text": "The handle of the cup is broken."
      },
      "de": {
        "text": "Der Griff der Tasse ist zerbrochen."
      }
    },
    "exercise": {
      "blanked": "Der Griff ___ Tasse ist zerbrochen.",
      "answer": "der",
      "noun": "Tasse",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Tasse is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-258",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101661",
    "translations": {
      "en": {
        "text": "One third of the population is affected."
      },
      "de": {
        "text": "Ein Drittel der Bevölkerung ist betroffen."
      }
    },
    "exercise": {
      "blanked": "Ein Drittel ___ Bevölkerung ist betroffen.",
      "answer": "der",
      "noun": "Bevölkerung",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Bevölkerung is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-259",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101772",
    "translations": {
      "en": {
        "text": "The beauty of nature is breathtaking."
      },
      "de": {
        "text": "Die Schönheit der Natur ist atemberaubend."
      }
    },
    "exercise": {
      "blanked": "Die Schönheit ___ Natur ist atemberaubend.",
      "answer": "der",
      "noun": "Natur",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Natur is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-260",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101849",
    "translations": {
      "en": {
        "text": "He emphasized the importance of the task."
      },
      "de": {
        "text": "Er betonte die Wichtigkeit der Aufgabe."
      }
    },
    "exercise": {
      "blanked": "Er betonte die Wichtigkeit ___ Aufgabe.",
      "answer": "der",
      "noun": "Aufgabe",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Aufgabe is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-261",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101874",
    "translations": {
      "en": {
        "text": "Caution is the mother of the porcelain box."
      },
      "de": {
        "text": "Vorsicht ist die Mutter der Porzellankiste."
      }
    },
    "exercise": {
      "blanked": "Vorsicht ist die Mutter ___ Porzellankiste.",
      "answer": "der",
      "noun": "Porzellankiste",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Porzellankiste is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-262",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102126",
    "translations": {
      "en": {
        "text": "The sound of the guitar was beautiful."
      },
      "de": {
        "text": "Der Klang der Gitarre war wunderschön."
      }
    },
    "exercise": {
      "blanked": "Der Klang ___ Gitarre war wunderschön.",
      "answer": "der",
      "noun": "Gitarre",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Gitarre is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-263",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102679",
    "translations": {
      "en": {
        "text": "The arch of the bridge is impressive."
      },
      "de": {
        "text": "Der Bogen der Brücke ist beeindruckend."
      }
    },
    "exercise": {
      "blanked": "Der Bogen ___ Brücke ist beeindruckend.",
      "answer": "der",
      "noun": "Brücke",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Brücke is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-264",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102851",
    "translations": {
      "en": {
        "text": "The morale of the troops was high."
      },
      "de": {
        "text": "Die Moral der Truppe war hoch."
      }
    },
    "exercise": {
      "blanked": "Die Moral ___ Truppe war hoch.",
      "answer": "der",
      "noun": "Truppe",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Truppe is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-265",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103225",
    "translations": {
      "en": {
        "text": "The download of the file took a long time."
      },
      "de": {
        "text": "Der Download der Datei dauerte lange."
      }
    },
    "exercise": {
      "blanked": "Der Download ___ Datei dauerte lange.",
      "answer": "der",
      "noun": "Datei",
      "gender": "die",
      "case": "genitive",
      "article": "definite",
      "explanation": "The phrase marks a possessive relationship. Datei is feminine, so feminine genitive uses der."
    }
  },
  {
    "id": "case-266",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100656",
    "translations": {
      "en": {
        "text": "The animal is sleeping."
      },
      "de": {
        "text": "Das Tier schläft."
      }
    },
    "exercise": {
      "blanked": "___ Tier schläft.",
      "answer": "Das",
      "noun": "Tier",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Tier is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-267",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100158",
    "translations": {
      "en": {
        "text": "That is no problem."
      },
      "de": {
        "text": "Das ist kein Problem."
      }
    },
    "exercise": {
      "blanked": "___ ist kein Problem.",
      "answer": "Das",
      "noun": "Problem",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Problem is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-268",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100372",
    "translations": {
      "en": {
        "text": "The car drives slowly."
      },
      "de": {
        "text": "Das Auto fährt langsam."
      }
    },
    "exercise": {
      "blanked": "___ Auto fährt langsam.",
      "answer": "Das",
      "noun": "Auto",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Auto is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-269",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100459",
    "translations": {
      "en": {
        "text": "The car is green."
      },
      "de": {
        "text": "Das Auto ist grün."
      }
    },
    "exercise": {
      "blanked": "___ Auto ist grün.",
      "answer": "Das",
      "noun": "Auto",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Auto is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-270",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100500",
    "translations": {
      "en": {
        "text": "The room is big."
      },
      "de": {
        "text": "Das Zimmer ist groß."
      }
    },
    "exercise": {
      "blanked": "___ Zimmer ist groß.",
      "answer": "Das",
      "noun": "Zimmer",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Zimmer is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-271",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100544",
    "translations": {
      "en": {
        "text": "The car is red."
      },
      "de": {
        "text": "Das Auto ist rot."
      }
    },
    "exercise": {
      "blanked": "___ Auto ist rot.",
      "answer": "Das",
      "noun": "Auto",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Auto is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-272",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100611",
    "translations": {
      "en": {
        "text": "The window is open."
      },
      "de": {
        "text": "Das Fenster ist offen."
      }
    },
    "exercise": {
      "blanked": "___ Fenster ist offen.",
      "answer": "Das",
      "noun": "Fenster",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Fenster is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-273",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100918",
    "translations": {
      "en": {
        "text": "The baby is sleeping peacefully."
      },
      "de": {
        "text": "Das Baby schläft friedlich."
      }
    },
    "exercise": {
      "blanked": "___ Baby schläft friedlich.",
      "answer": "Das",
      "noun": "Baby",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Baby is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-274",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101158",
    "translations": {
      "en": {
        "text": "The glass is full."
      },
      "de": {
        "text": "Das Glas ist voll."
      }
    },
    "exercise": {
      "blanked": "___ Glas ist voll.",
      "answer": "Das",
      "noun": "Glas",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Glas is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-275",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101161",
    "translations": {
      "en": {
        "text": "The concert was fantastic."
      },
      "de": {
        "text": "Das Konzert war fantastisch."
      }
    },
    "exercise": {
      "blanked": "___ Konzert war fantastisch.",
      "answer": "Das",
      "noun": "Konzert",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Konzert is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-276",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101358",
    "translations": {
      "en": {
        "text": "The egg is cooked."
      },
      "de": {
        "text": "Das Ei ist gekocht."
      }
    },
    "exercise": {
      "blanked": "___ Ei ist gekocht.",
      "answer": "Das",
      "noun": "Ei",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Ei is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-277",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "101419",
    "translations": {
      "en": {
        "text": "The horse is brown."
      },
      "de": {
        "text": "Das Pferd ist braun."
      }
    },
    "exercise": {
      "blanked": "___ Pferd ist braun.",
      "answer": "Das",
      "noun": "Pferd",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Pferd is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-278",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102894",
    "translations": {
      "en": {
        "text": "The car is orange."
      },
      "de": {
        "text": "Das Auto ist orange."
      }
    },
    "exercise": {
      "blanked": "___ Auto ist orange.",
      "answer": "Das",
      "noun": "Auto",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Auto is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-279",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "103992",
    "translations": {
      "en": {
        "text": "The dress is pink."
      },
      "de": {
        "text": "Das Kleid ist pink."
      }
    },
    "exercise": {
      "blanked": "___ Kleid ist pink.",
      "answer": "Das",
      "noun": "Kleid",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Kleid is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-280",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "104486",
    "translations": {
      "en": {
        "text": "The dress is purple."
      },
      "de": {
        "text": "Das Kleid ist lila."
      }
    },
    "exercise": {
      "blanked": "___ Kleid ist lila.",
      "answer": "Das",
      "noun": "Kleid",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Kleid is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-281",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "105191",
    "translations": {
      "en": {
        "text": "The chicken lays eggs."
      },
      "de": {
        "text": "Das Huhn legt Eier."
      }
    },
    "exercise": {
      "blanked": "___ Huhn legt Eier.",
      "answer": "Das",
      "noun": "Huhn",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Huhn is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-282",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100021",
    "translations": {
      "en": {
        "text": "That is a good book."
      },
      "de": {
        "text": "Das ist ein gutes Buch."
      }
    },
    "exercise": {
      "blanked": "___ ist ein gutes Buch.",
      "answer": "Das",
      "noun": "Buch",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Buch is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-283",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100039",
    "translations": {
      "en": {
        "text": "A year has twelve months."
      },
      "de": {
        "text": "Ein Jahr hat zwölf Monate."
      }
    },
    "exercise": {
      "blanked": "___ Jahr hat zwölf Monate.",
      "answer": "Ein",
      "noun": "Jahr",
      "gender": "das",
      "case": "nominative",
      "article": "indefinite",
      "explanation": "Jahr is the subject here. Neuter nominative uses Ein."
    }
  },
  {
    "id": "case-284",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100043",
    "translations": {
      "en": {
        "text": "That is a new car."
      },
      "de": {
        "text": "Das ist ein neues Auto."
      }
    },
    "exercise": {
      "blanked": "___ ist ein neues Auto.",
      "answer": "Das",
      "noun": "Auto",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Auto is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-285",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100079",
    "translations": {
      "en": {
        "text": "The child is playing in the garden."
      },
      "de": {
        "text": "Das Kind spielt im Garten."
      }
    },
    "exercise": {
      "blanked": "___ Kind spielt im Garten.",
      "answer": "Das",
      "noun": "Kind",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Kind is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-286",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100104",
    "translations": {
      "en": {
        "text": "That is a beautiful picture."
      },
      "de": {
        "text": "Das ist ein schönes Bild."
      }
    },
    "exercise": {
      "blanked": "___ ist ein schönes Bild.",
      "answer": "Das",
      "noun": "Bild",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Bild is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-287",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100109",
    "translations": {
      "en": {
        "text": "The car is very fast."
      },
      "de": {
        "text": "Das Auto ist sehr schnell."
      }
    },
    "exercise": {
      "blanked": "___ Auto ist sehr schnell.",
      "answer": "Das",
      "noun": "Auto",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Auto is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-288",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100128",
    "translations": {
      "en": {
        "text": "That is a short book."
      },
      "de": {
        "text": "Das ist ein kurzes Buch."
      }
    },
    "exercise": {
      "blanked": "___ ist ein kurzes Buch.",
      "answer": "Das",
      "noun": "Buch",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Buch is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-289",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100188",
    "translations": {
      "en": {
        "text": "This is my second book."
      },
      "de": {
        "text": "Das ist mein zweites Buch."
      }
    },
    "exercise": {
      "blanked": "___ ist mein zweites Buch.",
      "answer": "Das",
      "noun": "Buch",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Buch is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-290",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100247",
    "translations": {
      "en": {
        "text": "That is a small thing."
      },
      "de": {
        "text": "Das ist ein kleines Ding."
      }
    },
    "exercise": {
      "blanked": "___ ist ein kleines Ding.",
      "answer": "Das",
      "noun": "Ding",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Ding is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-291",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100510",
    "translations": {
      "en": {
        "text": "The weekend was very relaxing."
      },
      "de": {
        "text": "Das Wochenende war sehr entspannend."
      }
    },
    "exercise": {
      "blanked": "___ Wochenende war sehr entspannend.",
      "answer": "Das",
      "noun": "Wochenende",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Wochenende is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-292",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100527",
    "translations": {
      "en": {
        "text": "The bed is very comfortable."
      },
      "de": {
        "text": "Das Bett ist sehr bequem."
      }
    },
    "exercise": {
      "blanked": "___ Bett ist sehr bequem.",
      "answer": "Das",
      "noun": "Bett",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Bett is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-293",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100565",
    "translations": {
      "en": {
        "text": "The ruler is 30 cm long."
      },
      "de": {
        "text": "Das Lineal ist 30 Cm lang."
      }
    },
    "exercise": {
      "blanked": "___ Lineal ist 30 Cm lang.",
      "answer": "Das",
      "noun": "Lineal",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Lineal is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-294",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100597",
    "translations": {
      "en": {
        "text": "That is an English book."
      },
      "de": {
        "text": "Das ist ein englisches Buch."
      }
    },
    "exercise": {
      "blanked": "___ ist ein englisches Buch.",
      "answer": "Das",
      "noun": "Buch",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Buch is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-295",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100624",
    "translations": {
      "en": {
        "text": "The topic interests me a lot."
      },
      "de": {
        "text": "Das Thema interessiert mich sehr."
      }
    },
    "exercise": {
      "blanked": "___ Thema interessiert mich sehr.",
      "answer": "Das",
      "noun": "Thema",
      "gender": "das",
      "case": "nominative",
      "article": "definite",
      "explanation": "Thema is the subject here. Neuter nominative uses Das."
    }
  },
  {
    "id": "case-296",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "102729",
    "translations": {
      "en": {
        "text": "I need butter for the bread."
      },
      "de": {
        "text": "Ich brauche Butter für das Brot."
      }
    },
    "exercise": {
      "blanked": "Ich brauche Butter für ___ Brot.",
      "answer": "das",
      "noun": "Brot",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Brot is neuter, so the article is das."
    }
  },
  {
    "id": "case-297",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100295",
    "translations": {
      "en": {
        "text": "The price for the book is high."
      },
      "de": {
        "text": "Der Preis für das Buch ist hoch."
      }
    },
    "exercise": {
      "blanked": "Der Preis für ___ Buch ist hoch.",
      "answer": "das",
      "noun": "Buch",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Buch is neuter, so the article is das."
    }
  },
  {
    "id": "case-298",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "109299",
    "translations": {
      "en": {
        "text": "You need yeast for the bread."
      },
      "de": {
        "text": "Für das Brot braucht man Hefe."
      }
    },
    "exercise": {
      "blanked": "Für ___ Brot braucht man Hefe.",
      "answer": "das",
      "noun": "Brot",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Brot is neuter, so the article is das."
    }
  },
  {
    "id": "case-299",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100944",
    "translations": {
      "en": {
        "text": "We need more material for the project."
      },
      "de": {
        "text": "Wir brauchen mehr Material für das Projekt."
      }
    },
    "exercise": {
      "blanked": "Wir brauchen mehr Material für ___ Projekt.",
      "answer": "das",
      "noun": "Projekt",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Projekt is neuter, so the article is das."
    }
  },
  {
    "id": "case-300",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101617",
    "translations": {
      "en": {
        "text": "We are planning many activities for the weekend."
      },
      "de": {
        "text": "Wir planen viele Aktivitäten für das Wochenende."
      }
    },
    "exercise": {
      "blanked": "Wir planen viele Aktivitäten für ___ Wochenende.",
      "answer": "das",
      "noun": "Wochenende",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Wochenende is neuter, so the article is das."
    }
  },
  {
    "id": "case-301",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "113862",
    "translations": {
      "en": {
        "text": "I need my charger for the phone."
      },
      "de": {
        "text": "Ich brauche mein Ladegerät für das Handy."
      }
    },
    "exercise": {
      "blanked": "Ich brauche mein Ladegerät für ___ Handy.",
      "answer": "das",
      "noun": "Handy",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Handy is neuter, so the article is das."
    }
  },
  {
    "id": "case-302",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "114461",
    "translations": {
      "en": {
        "text": "I need fresh parsley for the dish."
      },
      "de": {
        "text": "Ich brauche frische Petersilie für das Gericht."
      }
    },
    "exercise": {
      "blanked": "Ich brauche frische Petersilie für ___ Gericht.",
      "answer": "das",
      "noun": "Gericht",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Gericht is neuter, so the article is das."
    }
  },
  {
    "id": "case-303",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "116911",
    "translations": {
      "en": {
        "text": "I need my charging cable for the phone."
      },
      "de": {
        "text": "Ich brauche mein Ladekabel für das Handy."
      }
    },
    "exercise": {
      "blanked": "Ich brauche mein Ladekabel für ___ Handy.",
      "answer": "das",
      "noun": "Handy",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Handy is neuter, so the article is das."
    }
  },
  {
    "id": "case-304",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100629",
    "translations": {
      "en": {
        "text": "We need a good plan for the project."
      },
      "de": {
        "text": "Wir brauchen einen guten Plan für das Projekt."
      }
    },
    "exercise": {
      "blanked": "Wir brauchen einen guten Plan für ___ Projekt.",
      "answer": "das",
      "noun": "Projekt",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Projekt is neuter, so the article is das."
    }
  },
  {
    "id": "case-305",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103368",
    "translations": {
      "en": {
        "text": "We bought new furniture for the living room."
      },
      "de": {
        "text": "Wir haben neue Möbel für das Wohnzimmer gekauft."
      }
    },
    "exercise": {
      "blanked": "Wir haben neue Möbel für ___ Wohnzimmer gekauft.",
      "answer": "das",
      "noun": "Wohnzimmer",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Wohnzimmer is neuter, so the article is das."
    }
  },
  {
    "id": "case-306",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "104955",
    "translations": {
      "en": {
        "text": "Press the switch to turn on the light."
      },
      "de": {
        "text": "Drücken Sie den Schalter, um das Licht einzuschalten."
      }
    },
    "exercise": {
      "blanked": "Drücken Sie den Schalter, um ___ Licht einzuschalten.",
      "answer": "das",
      "noun": "Licht",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "um takes accusative here. Licht is neuter, so the article is das."
    }
  },
  {
    "id": "case-307",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107152",
    "translations": {
      "en": {
        "text": "I need a red bell pepper for the dish."
      },
      "de": {
        "text": "Ich brauche eine rote Paprika für das Gericht."
      }
    },
    "exercise": {
      "blanked": "Ich brauche eine rote Paprika für ___ Gericht.",
      "answer": "das",
      "noun": "Gericht",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Gericht is neuter, so the article is das."
    }
  },
  {
    "id": "case-308",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "115214",
    "translations": {
      "en": {
        "text": "I'm buying a fresh baguette for dinner."
      },
      "de": {
        "text": "Ich kaufe ein frisches Baguette für das Abendessen."
      }
    },
    "exercise": {
      "blanked": "Ich kaufe ein frisches Baguette für ___ Abendessen.",
      "answer": "das",
      "noun": "Abendessen",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Abendessen is neuter, so the article is das."
    }
  },
  {
    "id": "case-309",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "117966",
    "translations": {
      "en": {
        "text": "I need glue to attach the paper."
      },
      "de": {
        "text": "Ich brauche Klebstoff, um das Papier zu befestigen."
      }
    },
    "exercise": {
      "blanked": "Ich brauche Klebstoff, um ___ Papier zu befestigen.",
      "answer": "das",
      "noun": "Papier",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "um takes accusative here. Papier is neuter, so the article is das."
    }
  },
  {
    "id": "case-310",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "105491",
    "translations": {
      "en": {
        "text": "I need scissors to cut the paper."
      },
      "de": {
        "text": "Ich brauche eine Schere, um das Papier zu schneiden."
      }
    },
    "exercise": {
      "blanked": "Ich brauche eine Schere, um ___ Papier zu schneiden.",
      "answer": "das",
      "noun": "Papier",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "um takes accusative here. Papier is neuter, so the article is das."
    }
  },
  {
    "id": "case-311",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "110416",
    "translations": {
      "en": {
        "text": "He used a saw to cut the wood."
      },
      "de": {
        "text": "Er benutzte eine Säge, um das Holz zu schneiden."
      }
    },
    "exercise": {
      "blanked": "Er benutzte eine Säge, um ___ Holz zu schneiden.",
      "answer": "das",
      "noun": "Holz",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "um takes accusative here. Holz is neuter, so the article is das."
    }
  },
  {
    "id": "case-312",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "113734",
    "translations": {
      "en": {
        "text": "I need to check my timetable for next semester."
      },
      "de": {
        "text": "Ich muss meinen Stundenplan für das nächste Semester überprüfen."
      }
    },
    "exercise": {
      "blanked": "Ich muss meinen Stundenplan für ___ nächste Semester überprüfen.",
      "answer": "das",
      "noun": "Semester",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Semester is neuter, so the article is das."
    }
  },
  {
    "id": "case-313",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103859",
    "translations": {
      "en": {
        "text": "The water flows through the pipe."
      },
      "de": {
        "text": "Das Wasser fließt durch das Rohr."
      }
    },
    "exercise": {
      "blanked": "Das Wasser fließt durch ___ Rohr.",
      "answer": "das",
      "noun": "Rohr",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Rohr is neuter, so the article is das."
    }
  },
  {
    "id": "case-314",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "110100",
    "translations": {
      "en": {
        "text": "A sunbeam fell through the window."
      },
      "de": {
        "text": "Ein Sonnenstrahl fiel durch das Fenster."
      }
    },
    "exercise": {
      "blanked": "Ein Sonnenstrahl fiel durch ___ Fenster.",
      "answer": "das",
      "noun": "Fenster",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Fenster is neuter, so the article is das."
    }
  },
  {
    "id": "case-315",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "115913",
    "translations": {
      "en": {
        "text": "We need gelatin for the dessert."
      },
      "de": {
        "text": "Für das Dessert brauchen wir Gelatine."
      }
    },
    "exercise": {
      "blanked": "Für ___ Dessert brauchen wir Gelatine.",
      "answer": "das",
      "noun": "Dessert",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Dessert is neuter, so the article is das."
    }
  },
  {
    "id": "case-316",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "117586",
    "translations": {
      "en": {
        "text": "We hiked through a large forest area."
      },
      "de": {
        "text": "Wir wanderten durch ein großes Waldgebiet."
      }
    },
    "exercise": {
      "blanked": "Wir wanderten durch ___ großes Waldgebiet.",
      "answer": "ein",
      "noun": "Waldgebiet",
      "gender": "das",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "durch takes accusative here. Waldgebiet is neuter, so the article is ein."
    }
  },
  {
    "id": "case-317",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "119462",
    "translations": {
      "en": {
        "text": "A weasel scurried through the grass."
      },
      "de": {
        "text": "Ein Wiesel huschte durch das Gras."
      }
    },
    "exercise": {
      "blanked": "Ein Wiesel huschte durch ___ Gras.",
      "answer": "das",
      "noun": "Gras",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "durch takes accusative here. Gras is neuter, so the article is das."
    }
  },
  {
    "id": "case-318",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102131",
    "translations": {
      "en": {
        "text": "She has a lot of motivation for the project."
      },
      "de": {
        "text": "Sie hat viel Motivation für das Projekt."
      }
    },
    "exercise": {
      "blanked": "Sie hat viel Motivation für ___ Projekt.",
      "answer": "das",
      "noun": "Projekt",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Projekt is neuter, so the article is das."
    }
  },
  {
    "id": "case-319",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103034",
    "translations": {
      "en": {
        "text": "Her enthusiasm for the project was contagious."
      },
      "de": {
        "text": "Ihre Begeisterung für das Projekt war ansteckend."
      }
    },
    "exercise": {
      "blanked": "Ihre Begeisterung für ___ Projekt war ansteckend.",
      "answer": "das",
      "noun": "Projekt",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Projekt is neuter, so the article is das."
    }
  },
  {
    "id": "case-320",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103106",
    "translations": {
      "en": {
        "text": "I have a voucher for the restaurant."
      },
      "de": {
        "text": "Ich habe einen Gutschein für das Restaurant."
      }
    },
    "exercise": {
      "blanked": "Ich habe einen Gutschein für ___ Restaurant.",
      "answer": "das",
      "noun": "Restaurant",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Restaurant is neuter, so the article is das."
    }
  },
  {
    "id": "case-321",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103776",
    "translations": {
      "en": {
        "text": "He is the favorite for the race."
      },
      "de": {
        "text": "Er ist der Favorit für das Rennen."
      }
    },
    "exercise": {
      "blanked": "Er ist der Favorit für ___ Rennen.",
      "answer": "das",
      "noun": "Rennen",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Rennen is neuter, so the article is das."
    }
  },
  {
    "id": "case-322",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "105792",
    "translations": {
      "en": {
        "text": "The punishment for the crime was severe."
      },
      "de": {
        "text": "Die Bestrafung für das Verbrechen war hart."
      }
    },
    "exercise": {
      "blanked": "Die Bestrafung für ___ Verbrechen war hart.",
      "answer": "das",
      "noun": "Verbrechen",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Verbrechen is neuter, so the article is das."
    }
  },
  {
    "id": "case-323",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "108815",
    "translations": {
      "en": {
        "text": "The hotel is fully booked for the weekend."
      },
      "de": {
        "text": "Das Hotel ist für das Wochenende ausgebucht."
      }
    },
    "exercise": {
      "blanked": "Das Hotel ist für ___ Wochenende ausgebucht.",
      "answer": "das",
      "noun": "Wochenende",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Wochenende is neuter, so the article is das."
    }
  },
  {
    "id": "case-324",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "108903",
    "translations": {
      "en": {
        "text": "The rainforest is important for the climate."
      },
      "de": {
        "text": "Der Regenwald ist wichtig für das Klima."
      }
    },
    "exercise": {
      "blanked": "Der Regenwald ist wichtig für ___ Klima.",
      "answer": "das",
      "noun": "Klima",
      "gender": "das",
      "case": "accusative",
      "article": "definite",
      "explanation": "für takes accusative here. Klima is neuter, so the article is das."
    }
  },
  {
    "id": "case-325",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "110003",
    "translations": {
      "en": {
        "text": "She asked the actor for an autograph."
      },
      "de": {
        "text": "Sie bat den Schauspieler um ein Autogramm."
      }
    },
    "exercise": {
      "blanked": "Sie bat den Schauspieler um ___ Autogramm.",
      "answer": "ein",
      "noun": "Autogramm",
      "gender": "das",
      "case": "accusative",
      "article": "indefinite",
      "explanation": "um takes accusative here. Autogramm is neuter, so the article is ein."
    }
  },
  {
    "id": "case-326",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100571",
    "translations": {
      "en": {
        "text": "We are staying overnight in a hotel."
      },
      "de": {
        "text": "Wir übernachten in einem Hotel."
      }
    },
    "exercise": {
      "blanked": "Wir übernachten in ___ Hotel.",
      "answer": "einem",
      "noun": "Hotel",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Hotel is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-327",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100189",
    "translations": {
      "en": {
        "text": "I drive to work by car."
      },
      "de": {
        "text": "Ich fahre mit dem Auto zur Arbeit."
      }
    },
    "exercise": {
      "blanked": "Ich fahre mit ___ Auto zur Arbeit.",
      "answer": "dem",
      "noun": "Auto",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Auto is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-328",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "108093",
    "translations": {
      "en": {
        "text": "The policewoman helped the child."
      },
      "de": {
        "text": "Die Polizistin half dem Kind."
      }
    },
    "exercise": {
      "blanked": "Die Polizistin half ___ Kind.",
      "answer": "dem",
      "noun": "Kind",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Kind is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-329",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100330",
    "translations": {
      "en": {
        "text": "We are working together on the project."
      },
      "de": {
        "text": "Wir arbeiten gemeinsam an dem Projekt."
      }
    },
    "exercise": {
      "blanked": "Wir arbeiten gemeinsam an ___ Projekt.",
      "answer": "dem",
      "noun": "Projekt",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Projekt is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-330",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100497",
    "translations": {
      "en": {
        "text": "We are working on a new project."
      },
      "de": {
        "text": "Wir arbeiten an einem neuen Projekt."
      }
    },
    "exercise": {
      "blanked": "Wir arbeiten an ___ neuen Projekt.",
      "answer": "einem",
      "noun": "Projekt",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Projekt is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-331",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100783",
    "translations": {
      "en": {
        "text": "Are you satisfied with the result?"
      },
      "de": {
        "text": "Bist du mit dem Ergebnis zufrieden?"
      }
    },
    "exercise": {
      "blanked": "Bist du mit ___ Ergebnis zufrieden?",
      "answer": "dem",
      "noun": "Ergebnis",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Ergebnis is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-332",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101101",
    "translations": {
      "en": {
        "text": "The cows are grazing in the field."
      },
      "de": {
        "text": "Die Kühe grasen auf dem Feld."
      }
    },
    "exercise": {
      "blanked": "Die Kühe grasen auf ___ Feld.",
      "answer": "dem",
      "noun": "Feld",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Feld is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-333",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101705",
    "translations": {
      "en": {
        "text": "The farmer works in the field."
      },
      "de": {
        "text": "Der Bauer arbeitet auf dem Feld."
      }
    },
    "exercise": {
      "blanked": "Der Bauer arbeitet auf ___ Feld.",
      "answer": "dem",
      "noun": "Feld",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Feld is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-334",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102133",
    "translations": {
      "en": {
        "text": "The princess lived in a castle."
      },
      "de": {
        "text": "Die Prinzessin lebte in einem Schloss."
      }
    },
    "exercise": {
      "blanked": "Die Prinzessin lebte in ___ Schloss.",
      "answer": "einem",
      "noun": "Schloss",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Schloss is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-335",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102368",
    "translations": {
      "en": {
        "text": "Do you want to join in the game?"
      },
      "de": {
        "text": "Möchtest du bei dem Spiel mitmachen?"
      }
    },
    "exercise": {
      "blanked": "Möchtest du bei ___ Spiel mitmachen?",
      "answer": "dem",
      "noun": "Spiel",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Spiel is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-336",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107577",
    "translations": {
      "en": {
        "text": "They live in a beautiful detached house."
      },
      "de": {
        "text": "Sie wohnen in einem schönen Einfamilienhaus."
      }
    },
    "exercise": {
      "blanked": "Sie wohnen in ___ schönen Einfamilienhaus.",
      "answer": "einem",
      "noun": "Einfamilienhaus",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Einfamilienhaus is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-337",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "115958",
    "translations": {
      "en": {
        "text": "The children learn with a reading book."
      },
      "de": {
        "text": "Die Kinder lernen mit einem Lesebuch."
      }
    },
    "exercise": {
      "blanked": "Die Kinder lernen mit ___ Lesebuch.",
      "answer": "einem",
      "noun": "Lesebuch",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Lesebuch is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-338",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102513",
    "translations": {
      "en": {
        "text": "The village lies in a beautiful valley."
      },
      "de": {
        "text": "Das Dorf liegt in einem schönen Tal."
      }
    },
    "exercise": {
      "blanked": "Das Dorf liegt in ___ schönen Tal.",
      "answer": "einem",
      "noun": "Tal",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Tal is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-339",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "105524",
    "translations": {
      "en": {
        "text": "We visited a farm in the countryside."
      },
      "de": {
        "text": "Wir besuchten einen Bauernhof auf dem Land."
      }
    },
    "exercise": {
      "blanked": "Wir besuchten einen Bauernhof auf ___ Land.",
      "answer": "dem",
      "noun": "Land",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Land is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-340",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "106025",
    "translations": {
      "en": {
        "text": "We stayed overnight in a cozy inn."
      },
      "de": {
        "text": "Wir haben in einem gemütlichen Gasthaus übernachtet."
      }
    },
    "exercise": {
      "blanked": "Wir haben in ___ gemütlichen Gasthaus übernachtet.",
      "answer": "einem",
      "noun": "Gasthaus",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Gasthaus is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-341",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "108571",
    "translations": {
      "en": {
        "text": "They live in a high-rise building in the city center."
      },
      "de": {
        "text": "Sie wohnen in einem Hochhaus im Stadtzentrum."
      }
    },
    "exercise": {
      "blanked": "Sie wohnen in ___ Hochhaus im Stadtzentrum.",
      "answer": "einem",
      "noun": "Hochhaus",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Hochhaus is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-342",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "109239",
    "translations": {
      "en": {
        "text": "We need an overnight stay in a hotel."
      },
      "de": {
        "text": "Wir brauchen eine Übernachtung in einem Hotel."
      }
    },
    "exercise": {
      "blanked": "Wir brauchen eine Übernachtung in ___ Hotel.",
      "answer": "einem",
      "noun": "Hotel",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Hotel is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-343",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "112671",
    "translations": {
      "en": {
        "text": "We need to take the baby to the pediatrician."
      },
      "de": {
        "text": "Wir müssen mit dem Baby zum Kinderarzt."
      }
    },
    "exercise": {
      "blanked": "Wir müssen mit ___ Baby zum Kinderarzt.",
      "answer": "dem",
      "noun": "Baby",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Baby is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-344",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "116171",
    "translations": {
      "en": {
        "text": "The sheet on the bed is clean."
      },
      "de": {
        "text": "Das Laken auf dem Bett ist sauber."
      }
    },
    "exercise": {
      "blanked": "Das Laken auf ___ Bett ist sauber.",
      "answer": "dem",
      "noun": "Bett",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Bett is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-345",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "119653",
    "translations": {
      "en": {
        "text": "They live in a terraced house on the outskirts of the city."
      },
      "de": {
        "text": "Sie wohnen in einem Reihenhaus am Stadtrand."
      }
    },
    "exercise": {
      "blanked": "Sie wohnen in ___ Reihenhaus am Stadtrand.",
      "answer": "einem",
      "noun": "Reihenhaus",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Reihenhaus is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-346",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103127",
    "translations": {
      "en": {
        "text": "The queue in front of the cinema was very long."
      },
      "de": {
        "text": "Die Schlange vor dem Kino war sehr lang."
      }
    },
    "exercise": {
      "blanked": "Die Schlange vor ___ Kino war sehr lang.",
      "answer": "dem",
      "noun": "Kino",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Kino is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-347",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "112181",
    "translations": {
      "en": {
        "text": "The waiter brought the drinks on a tray."
      },
      "de": {
        "text": "Der Kellner brachte die Getränke auf einem Tablett."
      }
    },
    "exercise": {
      "blanked": "Der Kellner brachte die Getränke auf ___ Tablett.",
      "answer": "einem",
      "noun": "Tablett",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Tablett is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-348",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "114085",
    "translations": {
      "en": {
        "text": "We stayed overnight in a small motel on the outskirts of the city."
      },
      "de": {
        "text": "Wir übernachteten in einem kleinen Motel am Stadtrand."
      }
    },
    "exercise": {
      "blanked": "Wir übernachteten in ___ kleinen Motel am Stadtrand.",
      "answer": "einem",
      "noun": "Motel",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Motel is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-349",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "116261",
    "translations": {
      "en": {
        "text": "The changing room was very full after the game."
      },
      "de": {
        "text": "Die Umkleide war nach dem Spiel sehr voll."
      }
    },
    "exercise": {
      "blanked": "Die Umkleide war nach ___ Spiel sehr voll.",
      "answer": "dem",
      "noun": "Spiel",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Spiel is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-350",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "120206",
    "translations": {
      "en": {
        "text": "We drove across the lake in a motorboat."
      },
      "de": {
        "text": "Wir fuhren mit einem Motorboot über den See."
      }
    },
    "exercise": {
      "blanked": "Wir fuhren mit ___ Motorboot über den See.",
      "answer": "einem",
      "noun": "Motorboot",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Motorboot is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-351",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "113378",
    "translations": {
      "en": {
        "text": "They live in an old farmhouse in the countryside."
      },
      "de": {
        "text": "Sie wohnen in einem alten Bauernhaus auf dem Land."
      }
    },
    "exercise": {
      "blanked": "Sie wohnen in ___ alten Bauernhaus auf dem Land.",
      "answer": "einem",
      "noun": "Bauernhaus",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Bauernhaus is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-352",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "118278",
    "translations": {
      "en": {
        "text": "They live in an old stone house in the countryside."
      },
      "de": {
        "text": "Sie wohnen in einem alten Steinhaus auf dem Land."
      }
    },
    "exercise": {
      "blanked": "Sie wohnen in ___ alten Steinhaus auf dem Land.",
      "answer": "einem",
      "noun": "Steinhaus",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Steinhaus is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-353",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101059",
    "translations": {
      "en": {
        "text": "She works at a research institute."
      },
      "de": {
        "text": "Sie arbeitet in einem Forschungsinstitut."
      }
    },
    "exercise": {
      "blanked": "Sie arbeitet in ___ Forschungsinstitut.",
      "answer": "einem",
      "noun": "Forschungsinstitut",
      "gender": "das",
      "case": "dative",
      "article": "indefinite",
      "explanation": "Forschungsinstitut is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-354",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101629",
    "translations": {
      "en": {
        "text": "He reaches for the book."
      },
      "de": {
        "text": "Er greift nach dem Buch."
      }
    },
    "exercise": {
      "blanked": "Er greift nach ___ Buch.",
      "answer": "dem",
      "noun": "Buch",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Buch is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-355",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103415",
    "translations": {
      "en": {
        "text": "The soldier followed the command."
      },
      "de": {
        "text": "Der Soldat folgte dem Kommando."
      }
    },
    "exercise": {
      "blanked": "Der Soldat folgte ___ Kommando.",
      "answer": "dem",
      "noun": "Kommando",
      "gender": "das",
      "case": "dative",
      "article": "definite",
      "explanation": "Kommando is neuter; this article form marks dative."
    }
  },
  {
    "id": "case-356",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100083",
    "translations": {
      "en": {
        "text": "That is an important part of the project."
      },
      "de": {
        "text": "Das ist ein wichtiger Teil des Projekts."
      }
    },
    "exercise": {
      "blanked": "Das ist ein wichtiger Teil ___ Projekts.",
      "answer": "des",
      "noun": "Projekt",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Projekt is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-357",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A1",
    "sourcePhraseId": "100304",
    "translations": {
      "en": {
        "text": "March is the third month of the year."
      },
      "de": {
        "text": "Der März ist der dritte Monat des Jahres."
      }
    },
    "exercise": {
      "blanked": "Der März ist der dritte Monat ___ Jahres.",
      "answer": "des",
      "noun": "Jahr",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Jahr is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-358",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100589",
    "translations": {
      "en": {
        "text": "The start of the race was exciting."
      },
      "de": {
        "text": "Der Start des Rennens war aufregend."
      }
    },
    "exercise": {
      "blanked": "Der Start ___ Rennens war aufregend.",
      "answer": "des",
      "noun": "Rennen",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Rennen is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-359",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101250",
    "translations": {
      "en": {
        "text": "The roof of the house is red."
      },
      "de": {
        "text": "Das Dach des Hauses ist rot."
      }
    },
    "exercise": {
      "blanked": "Das Dach ___ Hauses ist rot.",
      "answer": "des",
      "noun": "Haus",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Haus is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-360",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "102261",
    "translations": {
      "en": {
        "text": "The author of the book is unknown."
      },
      "de": {
        "text": "Der Autor des Buches ist unbekannt."
      }
    },
    "exercise": {
      "blanked": "Der Autor ___ Buches ist unbekannt.",
      "answer": "des",
      "noun": "Buch",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Buch is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-361",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "105306",
    "translations": {
      "en": {
        "text": "The bicycle's saddle was uncomfortable."
      },
      "de": {
        "text": "Der Sattel des Fahrrads war unbequem."
      }
    },
    "exercise": {
      "blanked": "Der Sattel ___ Fahrrads war unbequem.",
      "answer": "des",
      "noun": "Fahrrad",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Fahrrad is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-362",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100454",
    "translations": {
      "en": {
        "text": "The beginning of the concert is at 8 PM."
      },
      "de": {
        "text": "Der Beginn des Konzerts ist um 20 Uhr."
      }
    },
    "exercise": {
      "blanked": "Der Beginn ___ Konzerts ist um 20 Uhr.",
      "answer": "des",
      "noun": "Konzert",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Konzert is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-363",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101893",
    "translations": {
      "en": {
        "text": "The winner of the race was very happy."
      },
      "de": {
        "text": "Der Gewinner des Rennens war sehr glücklich."
      }
    },
    "exercise": {
      "blanked": "Der Gewinner ___ Rennens war sehr glücklich.",
      "answer": "des",
      "noun": "Rennen",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Rennen is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-364",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "107899",
    "translations": {
      "en": {
        "text": "Christmas time is my favorite time of the year."
      },
      "de": {
        "text": "Die Weihnachtszeit ist meine Lieblingszeit des Jahres."
      }
    },
    "exercise": {
      "blanked": "Die Weihnachtszeit ist meine Lieblingszeit ___ Jahres.",
      "answer": "des",
      "noun": "Jahr",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Jahr is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-365",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "100924",
    "translations": {
      "en": {
        "text": "The purchase of the house was a big decision."
      },
      "de": {
        "text": "Der Kauf des Hauses war eine große Entscheidung."
      }
    },
    "exercise": {
      "blanked": "Der Kauf ___ Hauses war eine große Entscheidung.",
      "answer": "des",
      "noun": "Haus",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Haus is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-366",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "101009",
    "translations": {
      "en": {
        "text": "The book is in the corner of the room."
      },
      "de": {
        "text": "Das Buch liegt in der Ecke des Zimmers."
      }
    },
    "exercise": {
      "blanked": "Das Buch liegt in der Ecke ___ Zimmers.",
      "answer": "des",
      "noun": "Zimmer",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Zimmer is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-367",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "103595",
    "translations": {
      "en": {
        "text": "January is the first month of the year."
      },
      "de": {
        "text": "Der Jänner ist der erste Monat des Jahres."
      }
    },
    "exercise": {
      "blanked": "Der Jänner ist der erste Monat ___ Jahres.",
      "answer": "des",
      "noun": "Jahr",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Jahr is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-368",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "A2",
    "sourcePhraseId": "111032",
    "translations": {
      "en": {
        "text": "The main entrance is on the other side of the building."
      },
      "de": {
        "text": "Der Haupteingang ist auf der anderen Seite des Gebäudes."
      }
    },
    "exercise": {
      "blanked": "Der Haupteingang ist auf der anderen Seite ___ Gebäudes.",
      "answer": "des",
      "noun": "Gebäude",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Gebäude is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-369",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101037",
    "translations": {
      "en": {
        "text": "The spirit of Christmas."
      },
      "de": {
        "text": "Der Geist des Weihnachtsfestes."
      }
    },
    "exercise": {
      "blanked": "Der Geist ___ Weihnachtsfestes.",
      "answer": "des",
      "noun": "Weihnachtsfest",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Weihnachtsfest is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-370",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "107219",
    "translations": {
      "en": {
        "text": "The year of construction of the house is 1990."
      },
      "de": {
        "text": "Das Baujahr des Hauses ist 1990."
      }
    },
    "exercise": {
      "blanked": "Das Baujahr ___ Hauses ist 1990.",
      "answer": "des",
      "noun": "Haus",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Haus is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-371",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "107927",
    "translations": {
      "en": {
        "text": "The final score of the game was 3:1."
      },
      "de": {
        "text": "Der Endstand des Spiels war 3:1."
      }
    },
    "exercise": {
      "blanked": "Der Endstand ___ Spiels war 3:1.",
      "answer": "des",
      "noun": "Spiel",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Spiel is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-372",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101148",
    "translations": {
      "en": {
        "text": "The recording of the song is excellent."
      },
      "de": {
        "text": "Die Aufnahme des Liedes ist ausgezeichnet."
      }
    },
    "exercise": {
      "blanked": "Die Aufnahme ___ Liedes ist ausgezeichnet.",
      "answer": "des",
      "noun": "Lied",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Lied is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-373",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101457",
    "translations": {
      "en": {
        "text": "The core of the problem lies elsewhere."
      },
      "de": {
        "text": "Der Kern des Problems liegt woanders."
      }
    },
    "exercise": {
      "blanked": "Der Kern ___ Problems liegt woanders.",
      "answer": "des",
      "noun": "Problem",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Problem is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-374",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "101504",
    "translations": {
      "en": {
        "text": "The winner of the race was celebrated."
      },
      "de": {
        "text": "Der Sieger des Rennens wurde gefeiert."
      }
    },
    "exercise": {
      "blanked": "Der Sieger ___ Rennens wurde gefeiert.",
      "answer": "des",
      "noun": "Rennen",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Rennen is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-375",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102250",
    "translations": {
      "en": {
        "text": "The motive for the crime was revenge."
      },
      "de": {
        "text": "Das Motiv des Verbrechens war Rache."
      }
    },
    "exercise": {
      "blanked": "Das Motiv ___ Verbrechens war Rache.",
      "answer": "des",
      "noun": "Verbrechen",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Verbrechen is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-376",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "102764",
    "translations": {
      "en": {
        "text": "The angle of the triangle is 90 degrees."
      },
      "de": {
        "text": "Der Winkel des Dreiecks beträgt 90 Grad."
      }
    },
    "exercise": {
      "blanked": "Der Winkel ___ Dreiecks beträgt 90 Grad.",
      "answer": "des",
      "noun": "Dreieck",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Dreieck is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-377",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103460",
    "translations": {
      "en": {
        "text": "The breaking of the glass was loud."
      },
      "de": {
        "text": "Der Bruch des Glases war laut."
      }
    },
    "exercise": {
      "blanked": "Der Bruch ___ Glases war laut.",
      "answer": "des",
      "noun": "Glas",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Glas is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-378",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "103467",
    "translations": {
      "en": {
        "text": "The invention of the wheel was revolutionary."
      },
      "de": {
        "text": "Die Erfindung des Rades war revolutionär."
      }
    },
    "exercise": {
      "blanked": "Die Erfindung ___ Rades war revolutionär.",
      "answer": "des",
      "noun": "Rad",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Rad is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-379",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "104857",
    "translations": {
      "en": {
        "text": "The landing of the airplane was smooth."
      },
      "de": {
        "text": "Die Landung des Flugzeugs war sanft."
      }
    },
    "exercise": {
      "blanked": "Die Landung ___ Flugzeugs war sanft.",
      "answer": "des",
      "noun": "Flugzeug",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Flugzeug is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-380",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "105296",
    "translations": {
      "en": {
        "text": "She loves 19th-century poetry."
      },
      "de": {
        "text": "Sie liebt die Poesie des 19. Jahrhunderts."
      }
    },
    "exercise": {
      "blanked": "Sie liebt die Poesie ___ 19. Jahrhunderts.",
      "answer": "des",
      "noun": "Jahrhundert",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Jahrhundert is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-381",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "106668",
    "translations": {
      "en": {
        "text": "The availability of the product is limited."
      },
      "de": {
        "text": "Die Verfügbarkeit des Produkts ist begrenzt."
      }
    },
    "exercise": {
      "blanked": "Die Verfügbarkeit ___ Produkts ist begrenzt.",
      "answer": "des",
      "noun": "Produkt",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Produkt is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-382",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "107655",
    "translations": {
      "en": {
        "text": "The adoption of the law took a long time."
      },
      "de": {
        "text": "Die Verabschiedung des Gesetzes dauerte lange."
      }
    },
    "exercise": {
      "blanked": "Die Verabschiedung ___ Gesetzes dauerte lange.",
      "answer": "des",
      "noun": "Gesetz",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Gesetz is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-383",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "108001",
    "translations": {
      "en": {
        "text": "The stem of the glass is broken."
      },
      "de": {
        "text": "Der Stiel des Glases ist zerbrochen."
      }
    },
    "exercise": {
      "blanked": "Der Stiel ___ Glases ist zerbrochen.",
      "answer": "des",
      "noun": "Glas",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Glas is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-384",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "108078",
    "translations": {
      "en": {
        "text": "The bicycle's handlebars were bent."
      },
      "de": {
        "text": "Der Lenker des Fahrrads war verbogen."
      }
    },
    "exercise": {
      "blanked": "Der Lenker ___ Fahrrads war verbogen.",
      "answer": "des",
      "noun": "Fahrrad",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Fahrrad is neuter; this article form marks genitive."
    }
  },
  {
    "id": "case-385",
    "type": "grammar-application",
    "set": "cases",
    "grammarId": "grammar-de-3",
    "level": "B1",
    "sourcePhraseId": "108834",
    "translations": {
      "en": {
        "text": "The final result of the game was 3 to 1."
      },
      "de": {
        "text": "Das Endergebnis des Spiels war 3 zu 1."
      }
    },
    "exercise": {
      "blanked": "Das Endergebnis ___ Spiels war 3 zu 1.",
      "answer": "des",
      "noun": "Spiel",
      "gender": "das",
      "case": "genitive",
      "article": "definite",
      "explanation": "Spiel is neuter; this article form marks genitive."
    }
  },
  /* END GENERATED CASE APPLICATIONS */
];
