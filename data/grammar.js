const grammarRecords = [
  {
    "id": "grammar-de-1",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A1",
    "tag": "FOUNDATION",
    "localized": {
      "en": {
        "title": "The German sentence",
        "intro": "In a normal statement, the conjugated verb is the engine of the sentence. The subject and other information can move, but the verb stays in position two.",
        "rules": [
          "Subject + verb + the rest is the simplest pattern.",
          "A time phrase can come first; the verb still stays second, followed by the subject.",
          "German nouns are capitalized."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ich lerne Deutsch.",
            "en": "I am learning German.",
            "note": "subject · verb · object"
          },
          {
            "de": "Heute lerne ich Deutsch.",
            "en": "Today I am learning German.",
            "note": "time · verb · subject · object"
          },
          {
            "de": "Am Abend liest meine Schwester ein Buch.",
            "en": "In the evening my sister reads a book.",
            "note": "time · verb · subject · object"
          },
          {
            "de": "Im Sommer fahren wir ans Meer.",
            "en": "In summer we go to the seaside.",
            "note": "the verb stays in position two"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Put this into German: “Today I am learning German.”",
        "answers": [
          "Heute lerne ich Deutsch."
        ],
        "explain": "A time phrase can come first, but the conjugated verb stays second."
      },
      {
        "prompt": "Which word is the conjugated verb? “Morgen fährt der Zug nach Berlin.”",
        "answers": [
          "fährt"
        ],
        "explain": "The verb is in position two, after Morgen."
      },
      {
        "prompt": "Put these pieces in order: ich / heute / arbeite / im Büro",
        "answers": [
          "Heute arbeite ich im Büro.",
          "Ich arbeite heute im Büro."
        ],
        "explain": "Both are possible; the verb stays in position two."
      },
      {
        "prompt": "Translate: “In the evening my sister reads a book.”",
        "answers": [
          "Am Abend liest meine Schwester ein Buch."
        ],
        "explain": "The conjugated verb remains in position two."
      },
      {
        "prompt": "Complete: Im Sommer ___ wir ans Meer. (fahren)",
        "answers": [
          "fahren"
        ],
        "explain": "The subject follows the verb when a time phrase is first."
      },
      {
        "prompt": "Translate into German: I am learning German.",
        "answers": [
          "Ich lerne Deutsch."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich lerne Deutsch.",
        "answers": [
          "I am learning German."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-2",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A1",
    "tag": "ESSENTIALS",
    "localized": {
      "en": {
        "title": "Questions and negation",
        "intro": "Yes/no questions put the conjugated verb first. Question words come first, followed by the verb and then the subject.",
        "rules": [
          "Statement: Du wohnst in Berlin.",
          "Yes/no question: Wohnst du in Berlin?",
          "Question word: Wo wohnst du?",
          "Use nicht to negate verbs, adjectives, and definite information; use kein before an indefinite noun."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Sprichst du Englisch?",
            "en": "Do you speak English?",
            "note": "verb · subject · rest"
          },
          {
            "de": "Ich habe kein Auto.",
            "en": "I do not have a car.",
            "note": "kein + noun"
          },
          {
            "de": "Ich verstehe das nicht.",
            "en": "I do not understand that.",
            "note": "nicht at the end"
          },
          {
            "de": "Warum lernst du Deutsch?",
            "en": "Why are you learning German?",
            "note": "question word · verb · subject"
          },
          {
            "de": "Ich habe heute keine Zeit.",
            "en": "I do not have time today.",
            "note": "kein changes to keine before feminine Zeit"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Translate: “Do you speak German?”",
        "answers": [
          "Sprichst du Deutsch?"
        ],
        "explain": "Yes/no questions begin with the conjugated verb."
      },
      {
        "prompt": "Complete: Ich habe ___ Auto. (no car)",
        "answers": [
          "kein"
        ],
        "explain": "Use kein before an indefinite noun."
      },
      {
        "prompt": "Translate: “I do not understand that.”",
        "answers": [
          "Ich verstehe das nicht."
        ],
        "explain": "Nicht negates the verb or the rest of the statement."
      },
      {
        "prompt": "Translate: “Why are you learning German?”",
        "answers": [
          "Warum lernst du Deutsch?"
        ],
        "explain": "The question word comes first, then the verb and subject."
      },
      {
        "prompt": "Complete: Ich habe heute ___ Zeit. (no)",
        "answers": [
          "keine"
        ],
        "explain": "kein takes the feminine ending before Zeit."
      },
      {
        "prompt": "Translate into German: Do you speak English?",
        "answers": [
          "Sprichst du Englisch?"
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Sprichst du Englisch?",
        "answers": [
          "Do you speak English?"
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-3",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A1",
    "tag": "NOUNS",
    "localized": {
      "en": {
        "title": "Articles and the four cases",
        "intro": "The article changes depending on the noun’s job in the sentence. Learn the article and the case together.",
        "rules": [],
        "tables": [
          {
            "caption": "Definite articles",
            "headers": [
              "Case",
              "masculine",
              "feminine",
              "neuter",
              "plural"
            ],
            "rows": [
              [
                "Nominative · subject",
                "der",
                "die",
                "das",
                "die"
              ],
              [
                "Accusative · direct object",
                "den",
                "die",
                "das",
                "die"
              ],
              [
                "Dative · indirect object",
                "dem",
                "der",
                "dem",
                "den + -n"
              ],
              [
                "Genitive · belonging",
                "des + -s/-es",
                "der",
                "des + -s/-es",
                "der"
              ]
            ]
          },
          {
            "caption": "Indefinite articles",
            "headers": [
              "Case",
              "masculine",
              "feminine",
              "neuter"
            ],
            "rows": [
              [
                "Nominative",
                "ein",
                "eine",
                "ein"
              ],
              [
                "Accusative",
                "einen",
                "eine",
                "ein"
              ],
              [
                "Dative",
                "einem",
                "einer",
                "einem"
              ],
              [
                "Genitive",
                "eines",
                "einer",
                "eines"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Der Mann sieht den Hund.",
            "en": "The man sees the dog.",
            "note": "der = subject, den = direct object"
          },
          {
            "de": "Ich gebe der Frau das Buch.",
            "en": "I give the woman the book.",
            "note": "der Frau = recipient / dative"
          },
          {
            "de": "Der Schüler gibt dem Lehrer die Antwort.",
            "en": "The student gives the teacher the answer.",
            "note": "dem Lehrer = dative · die Antwort = accusative"
          },
          {
            "de": "Wir besuchen das Museum.",
            "en": "We are visiting the museum.",
            "note": "neuter accusative stays das"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Choose the article: Ich sehe ___ Mann. (the man, accusative)",
        "answers": [
          "den"
        ],
        "explain": "Masculine accusative changes der to den."
      },
      {
        "prompt": "Choose the article: Ich helfe ___ Frau. (the woman, dative)",
        "answers": [
          "der"
        ],
        "explain": "Feminine dative is der."
      },
      {
        "prompt": "Choose the article: ___ Kind spielt. (the child, nominative)",
        "answers": [
          "das"
        ],
        "explain": "Neuter nominative is das."
      },
      {
        "prompt": "Complete: Er gibt ___ Lehrer die Antwort. (the, dative)",
        "answers": [
          "dem"
        ],
        "explain": "The recipient is masculine dative: dem Lehrer."
      },
      {
        "prompt": "Complete: Wir besuchen ___ Museum. (the, neuter accusative)",
        "answers": [
          "das"
        ],
        "explain": "Neuter accusative stays das."
      },
      {
        "prompt": "Translate into German: The man sees the dog.",
        "answers": [
          "Der Mann sieht den Hund."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Der Mann sieht den Hund.",
        "answers": [
          "The man sees the dog."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-4",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A1",
    "tag": "CASES",
    "localized": {
      "en": {
        "title": "Personal pronouns by case",
        "intro": "Pronouns also change. The accusative is often the person or thing directly affected; the dative is often the receiver or beneficiary.",
        "rules": [],
        "tables": [
          {
            "caption": "Personal pronouns",
            "headers": [
              "Nominative",
              "Accusative",
              "Dative",
              "English"
            ],
            "rows": [
              [
                "ich",
                "mich",
                "mir",
                "I / me"
              ],
              [
                "du",
                "dich",
                "dir",
                "you (singular)"
              ],
              [
                "er",
                "ihn",
                "ihm",
                "he / him"
              ],
              [
                "sie",
                "sie",
                "ihr",
                "she / her"
              ],
              [
                "es",
                "es",
                "ihm",
                "it"
              ],
              [
                "wir",
                "uns",
                "uns",
                "we / us"
              ],
              [
                "ihr",
                "euch",
                "euch",
                "you (plural)"
              ],
              [
                "sie/Sie",
                "sie/Sie",
                "ihnen/Ihnen",
                "they / you formal"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Kannst du mir helfen?",
            "en": "Can you help me?",
            "note": "helfen takes dative"
          },
          {
            "de": "Ich sehe ihn.",
            "en": "I see him.",
            "note": "sehen takes accusative"
          },
          {
            "de": "Sie schreibt ihm eine Nachricht.",
            "en": "She writes him a message.",
            "note": "ihm = dative recipient"
          },
          {
            "de": "Er besucht uns am Wochenende.",
            "en": "He visits us at the weekend.",
            "note": "uns = accusative object"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Kannst du ___ helfen? (I / me, dative)",
        "answers": [
          "mir"
        ],
        "explain": "helfen takes a dative object: mir."
      },
      {
        "prompt": "Complete: Ich sehe ___. (he / him, accusative)",
        "answers": [
          "ihn"
        ],
        "explain": "sehen takes a direct accusative object: ihn."
      },
      {
        "prompt": "Complete: Sie gibt ___ das Buch. (we / us, dative)",
        "answers": [
          "uns"
        ],
        "explain": "The receiver is dative: uns."
      },
      {
        "prompt": "Complete: Sie schreibt ___. (he / him, dative)",
        "answers": [
          "ihm"
        ],
        "explain": "The recipient of schreiben is dative here."
      },
      {
        "prompt": "Complete: Er besucht ___. (we / us)",
        "answers": [
          "uns"
        ],
        "explain": "uns is both nominative and accusative for wir."
      },
      {
        "prompt": "Translate into German: Can you help me?",
        "answers": [
          "Kannst du mir helfen?"
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Kannst du mir helfen?",
        "answers": [
          "Can you help me?"
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-5",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "VERBS",
    "localized": {
      "en": {
        "title": "Verb position and modal verbs",
        "intro": "In a main clause, the conjugated verb remains in position two. With a modal verb, the modal is conjugated and the other verb moves to the end as an infinitive.",
        "rules": [
          "Ich kann heute kommen.",
          "Du musst mehr üben.",
          "In a subordinate clause with weil/dass, the conjugated verb moves to the end."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ich möchte einen Kaffee trinken.",
            "en": "I would like to drink a coffee.",
            "note": "modal möchten · infinitive at the end"
          },
          {
            "de": "Weil ich müde bin, gehe ich nach Hause.",
            "en": "Because I am tired, I am going home.",
            "note": "bin goes to the end of the weil clause"
          },
          {
            "de": "Ich muss morgen früh aufstehen.",
            "en": "I have to get up early tomorrow.",
            "note": "modal + separable infinitive at the end"
          },
          {
            "de": "Ich glaube, dass er heute arbeiten muss.",
            "en": "I think that he has to work today.",
            "note": "modal verb at the end of the subordinate clause"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich kann heute ___. (come)",
        "answers": [
          "kommen"
        ],
        "explain": "The modal is conjugated and the infinitive moves to the end."
      },
      {
        "prompt": "Translate: “I must practice more.”",
        "answers": [
          "Ich muss mehr üben."
        ],
        "explain": "müssen is conjugated; üben stays infinitive at the end."
      },
      {
        "prompt": "Complete: Weil ich müde ___, gehe ich nach Hause. (am)",
        "answers": [
          "bin"
        ],
        "explain": "A subordinate clause sends the conjugated verb to the end."
      },
      {
        "prompt": "Translate: “I have to get up early.”",
        "answers": [
          "Ich muss früh aufstehen.",
          "Ich muss früh aufstehen"
        ],
        "explain": "The modal is conjugated; the infinitive remains at the end."
      },
      {
        "prompt": "Complete: Ich glaube, dass er arbeiten ___ . (must)",
        "answers": [
          "muss"
        ],
        "explain": "In a dass clause the conjugated verb goes to the end."
      },
      {
        "prompt": "Translate into German: I would like to drink a coffee.",
        "answers": [
          "Ich möchte einen Kaffee trinken."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich möchte einen Kaffee trinken.",
        "answers": [
          "I would like to drink a coffee."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-6",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "VERBS",
    "localized": {
      "en": {
        "title": "Separable verbs",
        "intro": "Some verbs have a prefix that separates in a main clause. The prefix travels to the end, while the stem is conjugated in position two.",
        "rules": [],
        "tables": [
          {
            "caption": "Useful separable verbs",
            "headers": [
              "Infinitive",
              "Meaning",
              "Main clause"
            ],
            "rows": [
              [
                "aufstehen",
                "to get up",
                "Ich stehe um sieben Uhr auf."
              ],
              [
                "ankommen",
                "to arrive",
                "Der Zug kommt um acht Uhr an."
              ],
              [
                "anrufen",
                "to call",
                "Ich rufe dich später an."
              ],
              [
                "einkaufen",
                "to shop",
                "Wir kaufen am Samstag ein."
              ],
              [
                "mitkommen",
                "to come along",
                "Kommst du mit?"
              ],
              [
                "vorbereiten",
                "to prepare",
                "Sie bereitet die Prüfung vor."
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Ich stehe früh auf.",
            "en": "I get up early.",
            "note": "stehe = conjugated stem · auf = prefix"
          },
          {
            "de": "Morgen rufe ich dich an.",
            "en": "Tomorrow I will call you.",
            "note": "the time phrase takes position one"
          },
          {
            "de": "Wir kaufen am Samstag im Supermarkt ein.",
            "en": "We shop at the supermarket on Saturday.",
            "note": "einkaufen → kaufen ... ein"
          },
          {
            "de": "Sie hat das Fenster aufgemacht.",
            "en": "She opened the window.",
            "note": "the prefix stays attached in the participle"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich ___ um sieben Uhr ___. (aufstehen)",
        "answers": [
          "stehe auf"
        ],
        "explain": "The stem is conjugated in position two and auf separates to the end."
      },
      {
        "prompt": "Translate: “I will call you later.”",
        "answers": [
          "Ich rufe dich später an."
        ],
        "explain": "anrufen becomes rufe ... an in a main clause."
      },
      {
        "prompt": "Complete: Der Zug kommt um acht Uhr ___. (ankommen)",
        "answers": [
          "an"
        ],
        "explain": "The prefix an goes to the end."
      },
      {
        "prompt": "Complete: Wir ___ am Samstag ___. (einkaufen)",
        "answers": [
          "kaufen ein"
        ],
        "explain": "The stem is conjugated and ein separates."
      },
      {
        "prompt": "What is the participle of aufmachen?",
        "answers": [
          "aufgemacht"
        ],
        "explain": "The prefix remains attached in the participle."
      },
      {
        "prompt": "Translate into German: I get up early.",
        "answers": [
          "Ich stehe früh auf."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich stehe früh auf.",
        "answers": [
          "I get up early."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-7",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "PAST",
    "localized": {
      "en": {
        "title": "The perfect past",
        "intro": "In everyday spoken German, the perfect tense uses haben or sein plus a past participle. The auxiliary is conjugated; the participle goes to the end.",
        "rules": [
          "Most verbs use haben: Ich habe gearbeitet.",
          "Movement and change-of-state verbs often use sein: Ich bin angekommen.",
          "Regular participles often use ge-…-t; many irregular participles must be learned individually."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ich habe gestern Deutsch gelernt.",
            "en": "I learned German yesterday.",
            "note": "haben + gelernt"
          },
          {
            "de": "Wir sind spät angekommen.",
            "en": "We arrived late.",
            "note": "sein + angekommen"
          },
          {
            "de": "Er hat den ganzen Tag gearbeitet.",
            "en": "He worked all day.",
            "note": "haben + gearbeitet"
          },
          {
            "de": "Sie ist nach Hause gegangen.",
            "en": "She went home.",
            "note": "movement verb with sein"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich ___ gestern Deutsch ___. (lernen)",
        "answers": [
          "habe gelernt"
        ],
        "explain": "Most verbs use haben plus the past participle."
      },
      {
        "prompt": "Complete: Wir ___ spät ___. (ankommen)",
        "answers": [
          "sind angekommen"
        ],
        "explain": "Movement/change of state often uses sein."
      },
      {
        "prompt": "Translate: “She has worked today.”",
        "answers": [
          "Sie hat heute gearbeitet."
        ],
        "explain": "haben is conjugated and gearbeitet goes to the end."
      },
      {
        "prompt": "Complete: Er ___ den ganzen Tag ___. (arbeiten)",
        "answers": [
          "hat gearbeitet"
        ],
        "explain": "Regular arbeiten uses haben + gearbeitet."
      },
      {
        "prompt": "Translate: “She went home.”",
        "answers": [
          "Sie ist nach Hause gegangen."
        ],
        "explain": "gehen uses sein in the perfect."
      },
      {
        "prompt": "Translate into German: I learned German yesterday.",
        "answers": [
          "Ich habe gestern Deutsch gelernt."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich habe gestern Deutsch gelernt.",
        "answers": [
          "I learned German yesterday."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-8",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "ADJECTIVES",
    "localized": {
      "en": {
        "title": "Adjective endings",
        "intro": "An adjective before a noun shows information that the article does not already show. Start by noticing the strong endings after an indefinite article.",
        "rules": [],
        "tables": [
          {
            "caption": "Common patterns",
            "headers": [
              "Phrase",
              "Why"
            ],
            "rows": [
              [
                "ein guter Kaffee",
                "masculine nominative · -er"
              ],
              [
                "einen guten Kaffee",
                "masculine accusative · -en"
              ],
              [
                "eine gute Idee",
                "feminine nominative/accusative · -e"
              ],
              [
                "mit einem guten Freund",
                "masculine dative · -en"
              ],
              [
                "gutes Wetter",
                "neuter without an article · -es"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Ich kaufe einen neuen Mantel.",
            "en": "I am buying a new coat.",
            "note": "accusative masculine: einen neuen"
          },
          {
            "de": "Wir sprechen mit einer netten Kollegin.",
            "en": "We are speaking with a nice colleague.",
            "note": "dative feminine: einer netten"
          },
          {
            "de": "Das ist ein interessantes Buch.",
            "en": "That is an interesting book.",
            "note": "neuter nominative after ein: -es"
          },
          {
            "de": "Ich sehe die kleinen Kinder.",
            "en": "I see the small children.",
            "note": "plural accusative after die: -en"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich kaufe einen ___ Mantel. (new)",
        "answers": [
          "neuen"
        ],
        "explain": "Accusative masculine after einen takes -en."
      },
      {
        "prompt": "Complete: eine ___ Idee (good)",
        "answers": [
          "gute"
        ],
        "explain": "Feminine nominative after eine takes -e."
      },
      {
        "prompt": "Complete: mit einem ___ Freund (good)",
        "answers": [
          "guten"
        ],
        "explain": "Dative after einem takes -en."
      },
      {
        "prompt": "Complete: ein interessant___ Buch",
        "answers": [
          "es"
        ],
        "explain": "Neuter nominative after ein uses -es."
      },
      {
        "prompt": "Complete: die klein___ Kinder",
        "answers": [
          "en"
        ],
        "explain": "Plural adjective endings after definite die use -en."
      },
      {
        "prompt": "Translate into German: I am buying a new coat.",
        "answers": [
          "Ich kaufe einen neuen Mantel."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich kaufe einen neuen Mantel.",
        "answers": [
          "I am buying a new coat."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-9",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "B1 TOOLKIT",
    "localized": {
      "en": {
        "title": "Prepositions and cases",
        "intro": "Some prepositions always require a particular case. Two-way prepositions use accusative for movement toward a place and dative for a location.",
        "rules": [],
        "tables": [
          {
            "caption": "Always accusative",
            "headers": [
              "Preposition",
              "Meaning"
            ],
            "rows": [
              [
                "durch",
                "through"
              ],
              [
                "für",
                "for"
              ],
              [
                "gegen",
                "against / around"
              ],
              [
                "ohne",
                "without"
              ],
              [
                "um",
                "around / at"
              ]
            ]
          },
          {
            "caption": "Always dative",
            "headers": [
              "Preposition",
              "Meaning"
            ],
            "rows": [
              [
                "aus",
                "from / out of"
              ],
              [
                "bei",
                "at / near"
              ],
              [
                "mit",
                "with"
              ],
              [
                "nach",
                "to / after"
              ],
              [
                "seit",
                "since / for"
              ],
              [
                "von",
                "from / of"
              ],
              [
                "zu",
                "to"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Ich fahre mit dem Zug durch die Stadt.",
            "en": "I travel through the city by train.",
            "note": "mit + dative · durch + accusative"
          },
          {
            "de": "Das Buch liegt auf dem Tisch.",
            "en": "The book is lying on the table.",
            "note": "location · dative"
          },
          {
            "de": "Wir gehen zu einem neuen Arzt.",
            "en": "We are going to a new doctor.",
            "note": "zu + dative"
          },
          {
            "de": "Sie kauft ein Geschenk für ihren Bruder.",
            "en": "She buys a present for her brother.",
            "note": "für + accusative"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich fahre ___ dem Zug. (with)",
        "answers": [
          "mit"
        ],
        "explain": "mit always takes the dative."
      },
      {
        "prompt": "Complete: Das Geschenk ist ___ dich. (for)",
        "answers": [
          "für"
        ],
        "explain": "für always takes the accusative."
      },
      {
        "prompt": "Which case follows durch?",
        "answers": [
          "accusative"
        ],
        "explain": "durch, für, gegen, ohne, and um take the accusative."
      },
      {
        "prompt": "Complete: Wir gehen ___ einem neuen Arzt. (to)",
        "answers": [
          "zu"
        ],
        "explain": "zu always takes the dative."
      },
      {
        "prompt": "Which case follows für?",
        "answers": [
          "accusative"
        ],
        "explain": "für always takes the accusative."
      },
      {
        "prompt": "Translate into German: I travel through the city by train.",
        "answers": [
          "Ich fahre mit dem Zug durch die Stadt."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich fahre mit dem Zug durch die Stadt.",
        "answers": [
          "I travel through the city by train."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-10",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A1",
    "tag": "TENSES",
    "localized": {
      "en": {
        "title": "The present tense",
        "intro": "German uses the present tense for what is happening now, repeated actions, and often for planned future events when a time is clear.",
        "rules": [
          "Regular verbs use their stem plus endings: ich lerne, du lernst, er lernt.",
          "The verb sein is irregular: ich bin, du bist, er ist.",
          "A time phrase makes a future meaning clear: Morgen fahre ich nach Berlin."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ich arbeite heute im Büro.",
            "en": "I am working in the office today.",
            "note": "present happening now"
          },
          {
            "de": "Nächste Woche besuche ich meine Familie.",
            "en": "Next week I am visiting my family.",
            "note": "present used for a planned future"
          },
          {
            "de": "Jeden Montag besuche ich einen Deutschkurs.",
            "en": "Every Monday I attend a German course.",
            "note": "repeated action in the present"
          },
          {
            "de": "Der Bus kommt gleich.",
            "en": "The bus is arriving soon.",
            "note": "present with a future meaning"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Translate: “I work today.”",
        "answers": [
          "Ich arbeite heute."
        ],
        "explain": "Present tense can describe an action happening now."
      },
      {
        "prompt": "Translate: “Next week I am visiting my family.”",
        "answers": [
          "Nächste Woche besuche ich meine Familie."
        ],
        "explain": "A future time phrase lets the present tense express a plan."
      },
      {
        "prompt": "Complete: Ich ___ Deutsch. (lernen)",
        "answers": [
          "lerne"
        ],
        "explain": "The ich ending for a regular verb is -e."
      },
      {
        "prompt": "Complete: Jeden Montag ___ ich einen Kurs. (besuchen)",
        "answers": [
          "besuche"
        ],
        "explain": "The present tense describes repeated actions."
      },
      {
        "prompt": "What tense is “Der Bus kommt gleich”?",
        "answers": [
          "present",
          "present tense",
          "präsens"
        ],
        "explain": "German commonly uses present tense for an imminent future."
      },
      {
        "prompt": "Translate into German: I am working in the office today.",
        "answers": [
          "Ich arbeite heute im Büro."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich arbeite heute im Büro.",
        "answers": [
          "I am working in the office today."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-11",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "PAST",
    "localized": {
      "en": {
        "title": "The simple past (Präteritum)",
        "intro": "Präteritum is especially common in writing, storytelling, news, and with sein, haben, and modal verbs. In conversation, many people prefer the perfect tense.",
        "rules": [],
        "tables": [
          {
            "caption": "High-frequency forms",
            "headers": [
              "Infinitive",
              "ich",
              "English"
            ],
            "rows": [
              [
                "sein",
                "war",
                "was"
              ],
              [
                "haben",
                "hatte",
                "had"
              ],
              [
                "können",
                "konnte",
                "could"
              ],
              [
                "müssen",
                "musste",
                "had to"
              ],
              [
                "wollen",
                "wollte",
                "wanted to"
              ],
              [
                "gehen",
                "ging",
                "went"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Früher wohnte ich in London.",
            "en": "I used to live in London.",
            "note": "regular Präteritum in a story"
          },
          {
            "de": "Ich war gestern sehr müde.",
            "en": "I was very tired yesterday.",
            "note": "sein commonly uses Präteritum"
          },
          {
            "de": "Er ging nach Hause und machte das Fenster zu.",
            "en": "He went home and closed the window.",
            "note": "narrative past"
          },
          {
            "de": "Wir hatten keine Zeit.",
            "en": "We had no time.",
            "note": "haben → hatte"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Früher ___ ich in London. (wohnen)",
        "answers": [
          "wohnte"
        ],
        "explain": "Präteritum is common for written stories and past habits."
      },
      {
        "prompt": "Complete: Ich ___ gestern müde. (sein)",
        "answers": [
          "war"
        ],
        "explain": "sein commonly uses the Präteritum form war."
      },
      {
        "prompt": "Complete: Ich ___ mehr üben. (müssen, past)",
        "answers": [
          "musste"
        ],
        "explain": "Modal verbs frequently use Präteritum in conversation."
      },
      {
        "prompt": "Complete: Er ___ nach Hause. (gehen, past)",
        "answers": [
          "ging"
        ],
        "explain": "gehen has the irregular Präteritum form ging."
      },
      {
        "prompt": "Complete: Wir ___ keine Zeit. (haben, past)",
        "answers": [
          "hatten"
        ],
        "explain": "haben becomes hatten in the Präteritum."
      },
      {
        "prompt": "Translate into German: I used to live in London.",
        "answers": [
          "Früher wohnte ich in London."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Früher wohnte ich in London.",
        "answers": [
          "I used to live in London."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-12",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "PAST",
    "localized": {
      "en": {
        "title": "The past perfect (Plusquamperfekt)",
        "intro": "Use the past perfect for an event that happened before another past event. It is built with the Präteritum of haben or sein plus the past participle.",
        "rules": [
          "haben → hatte + participle: Ich hatte gegessen.",
          "sein → war + participle: Sie war gegangen.",
          "The later past event usually appears in Präteritum or perfect."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Nachdem ich gegessen hatte, ging ich spazieren.",
            "en": "After I had eaten, I went for a walk.",
            "note": "earlier event: hatte gegessen"
          },
          {
            "de": "Der Zug war schon abgefahren, als wir ankamen.",
            "en": "The train had already left when we arrived.",
            "note": "earlier movement: war abgefahren"
          },
          {
            "de": "Nachdem sie angekommen war, rief sie mich an.",
            "en": "After she had arrived, she called me.",
            "note": "war angekommen happened first"
          },
          {
            "de": "Ich hatte den Film schon gesehen.",
            "en": "I had already seen the film.",
            "note": "hatte + gesehen"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Nachdem ich gegessen ___, ging ich spazieren.",
        "answers": [
          "hatte"
        ],
        "explain": "The earlier event uses hatte plus the participle."
      },
      {
        "prompt": "Complete: Der Zug ___ schon abgefahren, als wir ankamen.",
        "answers": [
          "war"
        ],
        "explain": "Movement uses war plus the participle in Plusquamperfekt."
      },
      {
        "prompt": "Translate: “She had finished the work.”",
        "answers": [
          "Sie hatte die Arbeit beendet."
        ],
        "explain": "hatte + beendet marks the earlier past event."
      },
      {
        "prompt": "Complete: Nachdem sie angekommen ___, rief sie mich an.",
        "answers": [
          "war"
        ],
        "explain": "ankommen uses sein: war angekommen."
      },
      {
        "prompt": "Complete: Ich ___ den Film schon gesehen. (have, past)",
        "answers": [
          "hatte"
        ],
        "explain": "The earlier event uses hatte + participle."
      },
      {
        "prompt": "Translate into German: After I had eaten, I went for a walk.",
        "answers": [
          "Nachdem ich gegessen hatte, ging ich spazieren."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Nachdem ich gegessen hatte, ging ich spazieren.",
        "answers": [
          "After I had eaten, I went for a walk."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-13",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "FUTURE",
    "localized": {
      "en": {
        "title": "The future (Futur I)",
        "intro": "Futur I uses the conjugated verb werden plus an infinitive at the end. German also frequently uses the present tense with a future time phrase.",
        "rules": [
          "werden is conjugated: ich werde, du wirst, er wird.",
          "The infinitive goes to the end: Ich werde morgen arbeiten.",
          "Use Futur I for predictions, promises, plans, or emphasis; use present tense for ordinary scheduled plans."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ich werde dir morgen helfen.",
            "en": "I will help you tomorrow.",
            "note": "werden + helfen"
          },
          {
            "de": "Es wird morgen regnen.",
            "en": "It will rain tomorrow.",
            "note": "prediction"
          },
          {
            "de": "Am Samstag kaufe ich ein.",
            "en": "On Saturday I am going shopping.",
            "note": "present tense with a clear future time"
          },
          {
            "de": "Du wirst diese Prüfung schaffen.",
            "en": "You will pass this exam.",
            "note": "werden + infinitive"
          },
          {
            "de": "Wir werden bald eine Lösung finden.",
            "en": "We will find a solution soon.",
            "note": "infinitive at the end"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich ___ dir morgen helfen. (werden)",
        "answers": [
          "werde"
        ],
        "explain": "werden is conjugated and helfen goes to the end."
      },
      {
        "prompt": "Translate: “It will rain tomorrow.”",
        "answers": [
          "Es wird morgen regnen."
        ],
        "explain": "Futur I is useful for predictions."
      },
      {
        "prompt": "Which tense is natural here? “Am Samstag kaufe ich ein.”",
        "answers": [
          "present",
          "present tense",
          "präsens"
        ],
        "explain": "German often uses present tense for a clear future plan."
      },
      {
        "prompt": "Complete: Du ___ diese Prüfung schaffen. (will)",
        "answers": [
          "wirst"
        ],
        "explain": "The du form of werden is wirst."
      },
      {
        "prompt": "Translate: “We will find a solution soon.”",
        "answers": [
          "Wir werden bald eine Lösung finden."
        ],
        "explain": "The infinitive goes to the end."
      },
      {
        "prompt": "Translate into German: I will help you tomorrow.",
        "answers": [
          "Ich werde dir morgen helfen."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich werde dir morgen helfen.",
        "answers": [
          "I will help you tomorrow."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-14",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "FUTURE",
    "localized": {
      "en": {
        "title": "The future perfect (Futur II)",
        "intro": "Futur II describes something that will have been completed by a future point. It uses werden plus a past participle and haben or sein in the infinitive.",
        "rules": [
          "werden + participle + haben/sein: Ich werde gearbeitet haben.",
          "Use it for a completed future action or a guess about something that has already happened."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Bis Freitag werde ich den Bericht fertig geschrieben haben.",
            "en": "By Friday I will have finished writing the report.",
            "note": "completed by a future deadline"
          },
          {
            "de": "Er wird schon angekommen sein.",
            "en": "He will probably have arrived already.",
            "note": "a confident assumption"
          },
          {
            "de": "Bis morgen wird er den Bericht geschrieben haben.",
            "en": "By tomorrow he will have written the report.",
            "note": "completed future action"
          },
          {
            "de": "Sie wird schon zu Hause angekommen sein.",
            "en": "She will probably have arrived home already.",
            "note": "movement uses sein"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Bis Freitag werde ich den Bericht fertig geschrieben ___.",
        "answers": [
          "haben"
        ],
        "explain": "The future perfect ends with haben or sein in the infinitive."
      },
      {
        "prompt": "Complete: Er wird schon angekommen ___.",
        "answers": [
          "sein"
        ],
        "explain": "Movement uses sein in the future perfect."
      },
      {
        "prompt": "Translate: “By Friday I will have finished.”",
        "answers": [
          "Bis Freitag werde ich fertig sein.",
          "Bis Freitag werde ich fertig geworden sein."
        ],
        "explain": "Futur II describes completion by a future time; the auxiliary depends on the verb."
      },
      {
        "prompt": "Complete: Bis morgen wird er den Bericht geschrieben ___.",
        "answers": [
          "haben"
        ],
        "explain": "Writing uses haben in Futur II."
      },
      {
        "prompt": "Complete: Sie wird schon angekommen ___.",
        "answers": [
          "sein"
        ],
        "explain": "Movement uses sein."
      },
      {
        "prompt": "Translate into German: By Friday I will have finished writing the report.",
        "answers": [
          "Bis Freitag werde ich den Bericht fertig geschrieben haben."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Bis Freitag werde ich den Bericht fertig geschrieben haben.",
        "answers": [
          "By Friday I will have finished writing the report."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-15",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "ADJECTIVES",
    "localized": {
      "en": {
        "title": "Comparatives and superlatives",
        "intro": "Use the comparative to compare two things and the superlative to say that something is the most or least. The superlative in a predicate usually uses am ...-sten.",
        "rules": [
          "Comparative: adjective + -er, usually with als: Der Zug ist schneller als der Bus.",
          "Many short adjectives with a, o, or u take an umlaut: alt → älter, groß → größer.",
          "Superlative as a predicate: am + adjective + -sten: Das ist am besten.",
          "Before a noun, use the article and an adjective ending: der schnellste Zug."
        ],
        "tables": [
          {
            "caption": "Common forms",
            "headers": [
              "Base",
              "Comparative",
              "Superlative",
              "English"
            ],
            "rows": [
              [
                "gut",
                "besser",
                "am besten",
                "good · better · best"
              ],
              [
                "schlecht",
                "schlechter",
                "am schlechtesten",
                "bad · worse · worst"
              ],
              [
                "groß",
                "größer",
                "am größten",
                "big · bigger · biggest"
              ],
              [
                "klein",
                "kleiner",
                "am kleinsten",
                "small · smaller · smallest"
              ],
              [
                "schnell",
                "schneller",
                "am schnellsten",
                "fast · faster · fastest"
              ],
              [
                "viel",
                "mehr",
                "am meisten",
                "much/many · more · most"
              ],
              [
                "gern",
                "lieber",
                "am liebsten",
                "gladly · rather · most gladly"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Deutsch ist schwieriger als Englisch.",
            "en": "German is more difficult than English.",
            "note": "comparison with als"
          },
          {
            "de": "Das ist der schönste Park der Stadt.",
            "en": "That is the most beautiful park in the city.",
            "note": "superlative before a noun"
          },
          {
            "de": "Heute bin ich am glücklichsten.",
            "en": "Today I am the happiest.",
            "note": "am + superlative"
          },
          {
            "de": "Dieser Weg ist kürzer als der andere.",
            "en": "This path is shorter than the other one.",
            "note": "kurz → kürzer"
          },
          {
            "de": "Das ist der wichtigste Termin der Woche.",
            "en": "That is the most important appointment of the week.",
            "note": "superlative before a noun"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Deutsch ist ___ als Englisch. (difficult)",
        "answers": [
          "schwieriger"
        ],
        "explain": "The comparative normally uses -er and als."
      },
      {
        "prompt": "Complete: Das ist ___ beste Option. (the)",
        "answers": [
          "die"
        ],
        "explain": "Before a noun, the superlative takes an article and adjective ending."
      },
      {
        "prompt": "Translate: “Today I am the happiest.”",
        "answers": [
          "Heute bin ich am glücklichsten."
        ],
        "explain": "A predicate superlative uses am + -sten."
      },
      {
        "prompt": "Complete: Dieser Weg ist ___ als der andere. (shorter)",
        "answers": [
          "kürzer"
        ],
        "explain": "kurz changes its vowel: kürzer."
      },
      {
        "prompt": "Complete: Das ist der ___ Termin der Woche. (most important)",
        "answers": [
          "wichtigste"
        ],
        "explain": "The superlative before a noun takes an adjective ending."
      },
      {
        "prompt": "Translate into German: German is more difficult than English.",
        "answers": [
          "Deutsch ist schwieriger als Englisch."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Deutsch ist schwieriger als Englisch.",
        "answers": [
          "German is more difficult than English."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-16",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A1",
    "tag": "NOUNS",
    "localized": {
      "en": {
        "title": "Plural nouns and gender clues",
        "intro": "German plurals have several patterns, so learn each noun with its plural. Gender clues help, but the article should still be memorized.",
        "rules": [
          "Common plural endings include -e, -er, -en/-n, -s, and no ending.",
          "Many feminine nouns ending in -ung, -heit, -keit, or -schaft are die nouns.",
          "Diminutives ending in -chen or -lein are always das."
        ],
        "tables": [],
        "examples": [
          {
            "de": "der Tisch → die Tische",
            "en": "the table → the tables",
            "note": "-e plural"
          },
          {
            "de": "die Zeitung → die Zeitungen",
            "en": "the newspaper → the newspapers",
            "note": "-ung is feminine · -en plural"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Give the plural: der Tisch → die ___.",
        "answers": [
          "Tische"
        ],
        "explain": "Tisch takes the -e plural."
      },
      {
        "prompt": "What gender are nouns ending in -ung usually?",
        "answers": [
          "feminine",
          "feminine / die",
          "die"
        ],
        "explain": "Nouns ending in -ung are usually feminine."
      },
      {
        "prompt": "Translate into German: the table → the tables",
        "answers": [
          "der Tisch → die Tische"
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: der Tisch → die Tische",
        "answers": [
          "the table → the tables"
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-17",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "DETERMINERS",
    "localized": {
      "en": {
        "title": "Possessive and demonstrative words",
        "intro": "Possessive words show who something belongs to. Demonstratives point to a specific person or thing and take endings like an article.",
        "rules": [
          "mein, dein, sein, ihr, unser, euer, ihr, Ihr work like ein.",
          "The ending changes with gender and case: mein Bruder, meine Schwester, meinen Bruder.",
          "dieser means this and jener means that; they take definite-article endings."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Das ist meine Tasche.",
            "en": "That is my bag.",
            "note": "feminine nominative: meine"
          },
          {
            "de": "Ich nehme diesen Zug.",
            "en": "I am taking this train.",
            "note": "masculine accusative: diesen"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Das ist ___ Tasche. (my)",
        "answers": [
          "meine"
        ],
        "explain": "Tasche is feminine nominative: meine Tasche."
      },
      {
        "prompt": "Complete: Ich nehme ___ Zug. (this, masculine accusative)",
        "answers": [
          "diesen"
        ],
        "explain": "Masculine accusative dieser becomes diesen."
      },
      {
        "prompt": "Translate into German: That is my bag.",
        "answers": [
          "Das ist meine Tasche."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Das ist meine Tasche.",
        "answers": [
          "That is my bag."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-18",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "VERBS",
    "localized": {
      "en": {
        "title": "Reflexive verbs",
        "intro": "Reflexive verbs use a pronoun that refers back to the subject. The pronoun changes with the person and can be accusative or dative.",
        "rules": [],
        "tables": [
          {
            "caption": "Reflexive pronouns",
            "headers": [
              "Subject",
              "Accusative",
              "Dative"
            ],
            "rows": [
              [
                "ich",
                "mich",
                "mir"
              ],
              [
                "du",
                "dich",
                "dir"
              ],
              [
                "er/sie/es",
                "sich",
                "sich"
              ],
              [
                "wir",
                "uns",
                "uns"
              ],
              [
                "ihr",
                "euch",
                "euch"
              ],
              [
                "sie/Sie",
                "sich",
                "sich"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Ich freue mich auf den Urlaub.",
            "en": "I am looking forward to the holiday.",
            "note": "sich freuen auf"
          },
          {
            "de": "Ich wasche mir die Hände.",
            "en": "I wash my hands.",
            "note": "dative reflexive + body part"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich freue ___. (myself)",
        "answers": [
          "mich"
        ],
        "explain": "sich freuen uses the accusative reflexive pronoun mich."
      },
      {
        "prompt": "Complete: Ich wasche ___ die Hände. (myself, dative)",
        "answers": [
          "mir"
        ],
        "explain": "With a body part, the reflexive pronoun is often dative: mir."
      },
      {
        "prompt": "Translate into German: I am looking forward to the holiday.",
        "answers": [
          "Ich freue mich auf den Urlaub."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich freue mich auf den Urlaub.",
        "answers": [
          "I am looking forward to the holiday."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-19",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "VERBS",
    "localized": {
      "en": {
        "title": "The imperative",
        "intro": "Use the imperative for instructions, requests, and commands. German has informal singular, informal plural, and formal forms.",
        "rules": [
          "du: Komm! / Sprich langsam!",
          "ihr: Kommt! / Sprecht langsam!",
          "Sie: Kommen Sie! / Sprechen Sie langsam!",
          "Separable prefixes still move to the end: Steh auf!"
        ],
        "tables": [],
        "examples": [
          {
            "de": "Bitte öffnen Sie das Fenster.",
            "en": "Please open the window.",
            "note": "formal imperative"
          },
          {
            "de": "Warte einen Moment!",
            "en": "Wait a moment!",
            "note": "informal singular"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Give the informal singular command: ___ langsam! (sprechen)",
        "answers": [
          "Sprich"
        ],
        "explain": "The du imperative of sprechen is Sprich!."
      },
      {
        "prompt": "Make this formal: ___ Sie das Fenster! (öffnen)",
        "answers": [
          "Öffnen"
        ],
        "explain": "The formal imperative uses infinitive + Sie: Öffnen Sie!"
      },
      {
        "prompt": "Translate into German: Please open the window.",
        "answers": [
          "Bitte öffnen Sie das Fenster."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Bitte öffnen Sie das Fenster.",
        "answers": [
          "Please open the window."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-20",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "CASES",
    "localized": {
      "en": {
        "title": "Two-way prepositions",
        "intro": "Prepositions such as an, auf, in, hinter, neben, über, unter, vor, and zwischen take accusative for movement toward a destination and dative for a fixed location.",
        "rules": [
          "Wo? location → dative: Das Buch liegt auf dem Tisch.",
          "Wohin? destination → accusative: Ich lege das Buch auf den Tisch.",
          "The question Wo? versus Wohin? is a useful decision test."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Wir sind in der Küche.",
            "en": "We are in the kitchen.",
            "note": "location · dative"
          },
          {
            "de": "Wir gehen in die Küche.",
            "en": "We are going into the kitchen.",
            "note": "movement · accusative"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Das Buch liegt auf ___ Tisch. (the, location)",
        "answers": [
          "dem"
        ],
        "explain": "Wo? asks for a location, so use dative: auf dem Tisch."
      },
      {
        "prompt": "Complete: Ich lege das Buch auf ___ Tisch. (the, movement)",
        "answers": [
          "den"
        ],
        "explain": "Wohin? asks for movement, so use accusative: auf den Tisch."
      },
      {
        "prompt": "Translate into German: We are in the kitchen.",
        "answers": [
          "Wir sind in der Küche."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Wir sind in der Küche.",
        "answers": [
          "We are in the kitchen."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-21",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "CASES",
    "localized": {
      "en": {
        "title": "Dative verbs",
        "intro": "Some common verbs naturally take a dative person. These verbs must be learned with the case, not translated word for word.",
        "rules": [
          "helfen, danken, gefallen, gehören, fehlen, schmecken, vertrauen, folgen commonly take dative.",
          "The thing that is liked is the subject with gefallen: Der Film gefällt mir."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Kannst du mir helfen?",
            "en": "Can you help me?",
            "note": "helfen + dative"
          },
          {
            "de": "Das Buch gehört meiner Schwester.",
            "en": "The book belongs to my sister.",
            "note": "meiner Schwester = dative"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Kannst du ___ helfen? (I / me)",
        "answers": [
          "mir"
        ],
        "explain": "helfen takes a dative object."
      },
      {
        "prompt": "Complete: Der Film gefällt ___. (she / her)",
        "answers": [
          "ihr"
        ],
        "explain": "The person who likes something is dative."
      },
      {
        "prompt": "Translate into German: Can you help me?",
        "answers": [
          "Kannst du mir helfen?"
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Kannst du mir helfen?",
        "answers": [
          "Can you help me?"
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-22",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "B1 TOOLKIT",
    "localized": {
      "en": {
        "title": "Verb–preposition combinations",
        "intro": "Many verbs are used with a fixed preposition. Learn the whole combination and the question word that goes with it.",
        "rules": [],
        "tables": [
          {
            "caption": "Useful combinations",
            "headers": [
              "Combination",
              "Meaning",
              "Example"
            ],
            "rows": [
              [
                "warten auf + accusative",
                "to wait for",
                "Ich warte auf den Bus."
              ],
              [
                "sprechen über + accusative",
                "to talk about",
                "Wir sprechen über das Problem."
              ],
              [
                "sich interessieren für + accusative",
                "to be interested in",
                "Ich interessiere mich für Musik."
              ],
              [
                "abhängen von + dative",
                "to depend on",
                "Das hängt vom Wetter ab."
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Ich freue mich auf das Wochenende.",
            "en": "I am looking forward to the weekend.",
            "note": "sich freuen auf"
          },
          {
            "de": "Worüber sprichst du?",
            "en": "What are you talking about?",
            "note": "wo(r)- question for things"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich warte ___ den Bus. (for)",
        "answers": [
          "auf"
        ],
        "explain": "warten auf is a fixed combination."
      },
      {
        "prompt": "Complete: Das hängt ___ dem Wetter ab. (on/from)",
        "answers": [
          "von"
        ],
        "explain": "abhängen von takes von + dative."
      },
      {
        "prompt": "Translate into German: I am looking forward to the weekend.",
        "answers": [
          "Ich freue mich auf das Wochenende."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich freue mich auf das Wochenende.",
        "answers": [
          "I am looking forward to the weekend."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-23",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "WORD ORDER",
    "localized": {
      "en": {
        "title": "Subordinate clauses and conjunctions",
        "intro": "Subordinating conjunctions send the conjugated verb to the end of their clause. This rule applies to weil, dass, obwohl, wenn, ob, and many others.",
        "rules": [
          "weil = because, dass = that, obwohl = although, wenn = if/when, ob = whether.",
          "The subordinate clause can come first: Weil ich müde bin, gehe ich nach Hause.",
          "A comma separates the clauses."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ich bleibe zu Hause, weil es regnet.",
            "en": "I am staying home because it is raining.",
            "note": "verb at the end: regnet"
          },
          {
            "de": "Obwohl er müde ist, arbeitet er weiter.",
            "en": "Although he is tired, he continues working.",
            "note": "subordinate clause first"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich bleibe zu Hause, weil es ___. (rain)",
        "answers": [
          "regnet"
        ],
        "explain": "The conjugated verb goes to the end of the weil clause."
      },
      {
        "prompt": "Translate: “Although he is tired, he continues working.”",
        "answers": [
          "Obwohl er müde ist, arbeitet er weiter."
        ],
        "explain": "The subordinate clause ends with ist."
      },
      {
        "prompt": "Translate into German: I am staying home because it is raining.",
        "answers": [
          "Ich bleibe zu Hause, weil es regnet."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich bleibe zu Hause, weil es regnet.",
        "answers": [
          "I am staying home because it is raining."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-24",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "CLAUSES",
    "localized": {
      "en": {
        "title": "Relative clauses",
        "intro": "Relative clauses give more information about a noun. The relative pronoun agrees in gender and number with the noun, while its case comes from its role inside the relative clause.",
        "rules": [
          "The relative clause is separated by commas.",
          "The conjugated verb goes to the end.",
          "der/die/das can be nominative or accusative; dessen/deren show possession."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Das ist das Buch, das ich lese.",
            "en": "That is the book that I am reading.",
            "note": "das = accusative object"
          },
          {
            "de": "Die Frau, die neben mir sitzt, ist Ärztin.",
            "en": "The woman who is sitting next to me is a doctor.",
            "note": "die = subject"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Das ist das Buch, ___ ich lese. (that)",
        "answers": [
          "das"
        ],
        "explain": "das refers to das Buch and is the accusative object of lese."
      },
      {
        "prompt": "Where does the verb go? “Die Frau, die neben mir ___, ist Ärztin.”",
        "answers": [
          "sitzt"
        ],
        "explain": "The conjugated verb goes to the end of the relative clause."
      },
      {
        "prompt": "Translate into German: That is the book that I am reading.",
        "answers": [
          "Das ist das Buch, das ich lese."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Das ist das Buch, das ich lese.",
        "answers": [
          "That is the book that I am reading."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-25",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "VERBS",
    "localized": {
      "en": {
        "title": "Infinitive clauses with zu",
        "intro": "Use zu plus an infinitive to connect an action to verbs, adjectives, or nouns. Separable verbs place zu between the prefix and the stem.",
        "rules": [
          "Ich versuche, Deutsch zu lernen.",
          "Es ist wichtig, regelmäßig zu üben.",
          "Separable: Ich hoffe, dich bald anzurufen."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ich habe vergessen, die Tür abzuschließen.",
            "en": "I forgot to lock the door.",
            "note": "zu inside separable abschließen"
          },
          {
            "de": "Es macht Spaß, neue Wörter zu lernen.",
            "en": "It is fun to learn new words.",
            "note": "zu + infinitive"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich versuche, Deutsch ___ ___. (to learn)",
        "answers": [
          "zu lernen"
        ],
        "explain": "Use zu before the infinitive."
      },
      {
        "prompt": "Complete: Ich hoffe, dich bald ___. (to call, anrufen)",
        "answers": [
          "anzurufen"
        ],
        "explain": "With a separable verb, zu goes between prefix and stem."
      },
      {
        "prompt": "Translate into German: I forgot to lock the door.",
        "answers": [
          "Ich habe vergessen, die Tür abzuschließen."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Ich habe vergessen, die Tür abzuschließen.",
        "answers": [
          "I forgot to lock the door."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-26",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "MOOD",
    "localized": {
      "en": {
        "title": "Konjunktiv II for wishes and politeness",
        "intro": "Konjunktiv II expresses unreal situations, wishes, advice, and polite requests. würde plus infinitive is a common and useful form.",
        "rules": [
          "würde + infinitive: Ich würde gern reisen.",
          "High-frequency forms: wäre, hätte, könnte, müsste, sollte, wollte.",
          "Use könnte and würde gern to make requests softer."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Wenn ich mehr Zeit hätte, würde ich öfter reisen.",
            "en": "If I had more time, I would travel more often.",
            "note": "unreal condition"
          },
          {
            "de": "Könnten Sie mir bitte helfen?",
            "en": "Could you please help me?",
            "note": "polite request"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Wenn ich mehr Zeit ___, würde ich reisen. (had)",
        "answers": [
          "hätte"
        ],
        "explain": "haben uses hätte in an unreal condition."
      },
      {
        "prompt": "Make this polite: ___ Sie mir bitte helfen? (could)",
        "answers": [
          "Könnten"
        ],
        "explain": "Könnten Sie ...? is a polite request."
      },
      {
        "prompt": "Translate into German: If I had more time, I would travel more often.",
        "answers": [
          "Wenn ich mehr Zeit hätte, würde ich öfter reisen."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Wenn ich mehr Zeit hätte, würde ich öfter reisen.",
        "answers": [
          "If I had more time, I would travel more often."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-27",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "B1 TOOLKIT",
    "localized": {
      "en": {
        "title": "Passive voice basics",
        "intro": "The passive focuses on what happens rather than who does it. The present passive uses werden plus the past participle.",
        "rules": [
          "Present passive: werden + Partizip II: Das Fenster wird geöffnet.",
          "The person doing the action can be introduced with von + dative.",
          "Past passive uses wurde + participle: Das Fenster wurde geöffnet."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Die Straße wird repariert.",
            "en": "The road is being repaired.",
            "note": "werden + repariert"
          },
          {
            "de": "Der Brief wurde von ihr geschrieben.",
            "en": "The letter was written by her.",
            "note": "von + dative"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Die Straße ___ repariert. (is being)",
        "answers": [
          "wird"
        ],
        "explain": "Present passive uses werden + past participle."
      },
      {
        "prompt": "Complete: Der Brief wurde ___ ihr geschrieben. (by)",
        "answers": [
          "von"
        ],
        "explain": "The agent in a passive sentence uses von + dative."
      },
      {
        "prompt": "Translate into German: The road is being repaired.",
        "answers": [
          "Die Straße wird repariert."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Die Straße wird repariert.",
        "answers": [
          "The road is being repaired."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-28",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "B1",
    "tag": "CLAUSES",
    "localized": {
      "en": {
        "title": "Indirect questions",
        "intro": "Indirect questions are subordinate clauses. They are introduced by ob or a question word, and the conjugated verb goes to the end.",
        "rules": [
          "Direct: Wo ist der Bahnhof? → Indirect: Ich weiß nicht, wo der Bahnhof ist.",
          "Yes/no questions use ob: Ich frage mich, ob er kommt.",
          "Use a comma before the indirect question."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Können Sie mir sagen, wann der Zug fährt?",
            "en": "Can you tell me when the train leaves?",
            "note": "question word + verb at the end"
          },
          {
            "de": "Ich weiß nicht, ob sie heute arbeitet.",
            "en": "I do not know whether she is working today.",
            "note": "ob for yes/no questions"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Ich weiß nicht, wo der Bahnhof ___. (is)",
        "answers": [
          "ist"
        ],
        "explain": "The verb goes to the end of the indirect question."
      },
      {
        "prompt": "Complete: Ich frage mich, ___ er kommt. (whether)",
        "answers": [
          "ob"
        ],
        "explain": "Use ob for an indirect yes/no question."
      },
      {
        "prompt": "Translate into German: Can you tell me when the train leaves?",
        "answers": [
          "Können Sie mir sagen, wann der Zug fährt?"
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Können Sie mir sagen, wann der Zug fährt?",
        "answers": [
          "Can you tell me when the train leaves?"
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  },
  {
    "id": "grammar-de-29",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A2",
    "tag": "CONNECTIONS",
    "localized": {
      "en": {
        "title": "Adverbs and connectors",
        "intro": "Connectors make speech more natural and show cause, contrast, sequence, or addition. Some connectors affect word order.",
        "rules": [
          "deshalb and trotzdem take position one, so the verb comes next: Deshalb bleibe ich hier.",
          "außerdem, danach, zuerst, dann, schließlich organize ideas and events.",
          "weil sends the verb to the end, while deshalb does not."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Es regnet. Deshalb bleibe ich zu Hause.",
            "en": "It is raining. Therefore I am staying home.",
            "note": "deshalb · verb in position two"
          },
          {
            "de": "Zuerst koche ich, danach esse ich.",
            "en": "First I cook, then I eat.",
            "note": "sequence connectors"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": "Complete: Es regnet. ___ bleibe ich zu Hause. (therefore)",
        "answers": [
          "Deshalb"
        ],
        "explain": "deshalb takes position one and the verb follows it."
      },
      {
        "prompt": "Complete: Zuerst koche ich, ___ esse ich. (then/afterwards)",
        "answers": [
          "danach"
        ],
        "explain": "danach organizes the next step."
      },
      {
        "prompt": "Translate into German: It is raining. Therefore I am staying home.",
        "answers": [
          "Es regnet. Deshalb bleibe ich zu Hause."
        ],
        "explain": "Compare the translation with the example above."
      },
      {
        "prompt": "Translate into English: Es regnet. Deshalb bleibe ich zu Hause.",
        "answers": [
          "It is raining. Therefore I am staying home."
        ],
        "explain": "Compare the translation with the example above."
      }
    ]
  }
];
const grammarLessons = grammarRecords;
