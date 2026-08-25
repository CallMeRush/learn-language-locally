const grammarRecords = [
  {
    "id": "grammar-en-1",
    "type": "grammar",
    "targetLanguage": "en",
    "level": "A1",
    "tag": "FOUNDATION",
    "localized": {
      "en": {
        "title": "The English sentence",
        "intro": "English usually follows subject + verb + object order. The subject is normally required, unlike in Italian.",
        "rules": [
          "Use a subject before the verb in ordinary statements.",
          "The verb usually follows the subject.",
          "Adjectives normally come before the noun."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I study English.",
            "en": "I study English.",
            "note": "subject · verb · object"
          }
        ]
      },
      "de": {
        "title": "The English sentence",
        "intro": "English usually follows subject + verb + object order. The subject is normally required, unlike in Italian.",
        "rules": [
          "Use a subject before the verb in ordinary statements.",
          "The verb usually follows the subject.",
          "Adjectives normally come before the noun."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I study English.",
            "en": "I study English.",
            "note": "subject · verb · object"
          }
        ]
      },
      "it": {
        "title": "The English sentence",
        "intro": "English usually follows subject + verb + object order. The subject is normally required, unlike in Italian.",
        "rules": [
          "Use a subject before the verb in ordinary statements.",
          "The verb usually follows the subject.",
          "Adjectives normally come before the noun."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I study English.",
            "en": "I study English.",
            "note": "subject · verb · object"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": {
          "en": "Complete: She ___ English.",
          "de": "Complete: She ___ English.",
          "it": "Complete: She ___ English."
        },
        "answers": [
          "speaks"
        ],
        "explain": {
          "en": "Use speaks with he, she, and it.",
          "de": "Use speaks with he, she, and it.",
          "it": "Use speaks with he, she, and it."
        }
      }
    ]
  },
  {
    "id": "grammar-en-2",
    "type": "grammar",
    "targetLanguage": "en",
    "level": "A1",
    "tag": "ARTICLES",
    "localized": {
      "en": {
        "title": "English articles",
        "intro": "English uses a, an, and the. The choice depends on whether a noun is general, specific, and sometimes on its sound.",
        "rules": [
          "Use a before a consonant sound: a book.",
          "Use an before a vowel sound: an apple.",
          "Use the when the listener knows which thing you mean."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I have a book.",
            "en": "I have a book.",
            "note": "general singular noun"
          },
          {
            "de": "The book is on the table.",
            "en": "The book is on the table.",
            "note": "specific noun"
          }
        ]
      },
      "de": {
        "title": "English articles",
        "intro": "English uses a, an, and the. The choice depends on whether a noun is general, specific, and sometimes on its sound.",
        "rules": [
          "Use a before a consonant sound: a book.",
          "Use an before a vowel sound: an apple.",
          "Use the when the listener knows which thing you mean."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I have a book.",
            "en": "I have a book.",
            "note": "general singular noun"
          },
          {
            "de": "The book is on the table.",
            "en": "The book is on the table.",
            "note": "specific noun"
          }
        ]
      },
      "it": {
        "title": "English articles",
        "intro": "English uses a, an, and the. The choice depends on whether a noun is general, specific, and sometimes on its sound.",
        "rules": [
          "Use a before a consonant sound: a book.",
          "Use an before a vowel sound: an apple.",
          "Use the when the listener knows which thing you mean."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I have a book.",
            "en": "I have a book.",
            "note": "general singular noun"
          },
          {
            "de": "The book is on the table.",
            "en": "The book is on the table.",
            "note": "specific noun"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": {
          "en": "Complete: She has ___ apple.",
          "de": "Complete: She has ___ apple.",
          "it": "Complete: She has ___ apple."
        },
        "answers": [
          "an"
        ],
        "explain": {
          "en": "Apple begins with a vowel sound.",
          "de": "Apple begins with a vowel sound.",
          "it": "Apple begins with a vowel sound."
        }
      }
    ]
  },
  {
    "id": "grammar-en-3",
    "type": "grammar",
    "targetLanguage": "en",
    "level": "A1",
    "tag": "TENSES",
    "localized": {
      "en": {
        "title": "The present simple",
        "intro": "The present simple describes habits, facts, and repeated actions.",
        "rules": [
          "Use the base verb with I, you, we, and they.",
          "Add -s or -es with he, she, and it.",
          "Use do or does to form many questions and negatives."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I work every day.",
            "en": "I work every day.",
            "note": "habit"
          },
          {
            "de": "She works in London.",
            "en": "She works in London.",
            "note": "third-person -s"
          }
        ]
      },
      "de": {
        "title": "The present simple",
        "intro": "The present simple describes habits, facts, and repeated actions.",
        "rules": [
          "Use the base verb with I, you, we, and they.",
          "Add -s or -es with he, she, and it.",
          "Use do or does to form many questions and negatives."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I work every day.",
            "en": "I work every day.",
            "note": "habit"
          },
          {
            "de": "She works in London.",
            "en": "She works in London.",
            "note": "third-person -s"
          }
        ]
      },
      "it": {
        "title": "The present simple",
        "intro": "The present simple describes habits, facts, and repeated actions.",
        "rules": [
          "Use the base verb with I, you, we, and they.",
          "Add -s or -es with he, she, and it.",
          "Use do or does to form many questions and negatives."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I work every day.",
            "en": "I work every day.",
            "note": "habit"
          },
          {
            "de": "She works in London.",
            "en": "She works in London.",
            "note": "third-person -s"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": {
          "en": "Complete: He ___ coffee every morning.",
          "de": "Complete: He ___ coffee every morning.",
          "it": "Complete: He ___ coffee every morning."
        },
        "answers": [
          "drinks"
        ],
        "explain": {
          "en": "Use the third-person singular form drinks.",
          "de": "Use the third-person singular form drinks.",
          "it": "Use the third-person singular form drinks."
        }
      }
    ]
  },
  {
    "id": "grammar-en-4",
    "type": "grammar",
    "targetLanguage": "en",
    "level": "A2",
    "tag": "PAST",
    "localized": {
      "en": {
        "title": "The past simple",
        "intro": "The past simple describes completed actions in the past.",
        "rules": [
          "Regular verbs usually take -ed.",
          "Many common verbs are irregular and must be learned individually.",
          "Use did for questions and negatives."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I visited Rome yesterday.",
            "en": "I visited Rome yesterday.",
            "note": "regular past"
          },
          {
            "de": "She went home early.",
            "en": "She went home early.",
            "note": "irregular past"
          }
        ]
      },
      "de": {
        "title": "The past simple",
        "intro": "The past simple describes completed actions in the past.",
        "rules": [
          "Regular verbs usually take -ed.",
          "Many common verbs are irregular and must be learned individually.",
          "Use did for questions and negatives."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I visited Rome yesterday.",
            "en": "I visited Rome yesterday.",
            "note": "regular past"
          },
          {
            "de": "She went home early.",
            "en": "She went home early.",
            "note": "irregular past"
          }
        ]
      },
      "it": {
        "title": "The past simple",
        "intro": "The past simple describes completed actions in the past.",
        "rules": [
          "Regular verbs usually take -ed.",
          "Many common verbs are irregular and must be learned individually.",
          "Use did for questions and negatives."
        ],
        "tables": [],
        "examples": [
          {
            "de": "I visited Rome yesterday.",
            "en": "I visited Rome yesterday.",
            "note": "regular past"
          },
          {
            "de": "She went home early.",
            "en": "She went home early.",
            "note": "irregular past"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": {
          "en": "Complete: They ___ the train yesterday.",
          "de": "Complete: They ___ the train yesterday.",
          "it": "Complete: They ___ the train yesterday."
        },
        "answers": [
          "missed"
        ],
        "explain": {
          "en": "Miss is regular: missed.",
          "de": "Miss is regular: missed.",
          "it": "Miss is regular: missed."
        }
      }
    ]
  },
  {
    "id": "grammar-de-1",
    "type": "grammar",
    "targetLanguage": "de",
    "level": "A1",
    "tag": "FOUNDATION",
    "localized": {
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Put this into German: “Today I am learning German.”"
        },
        "answers": [
          "Heute lerne ich Deutsch."
        ],
        "explain": {
          "de": "A time phrase can come first, but the conjugated verb stays second."
        }
      },
      {
        "prompt": {
          "de": "Which word is the conjugated verb? “Morgen fährt der Zug nach Berlin.”"
        },
        "answers": [
          "fährt"
        ],
        "explain": {
          "de": "The verb is in position two, after Morgen."
        }
      },
      {
        "prompt": {
          "de": "Put these pieces in order: ich / heute / arbeite / im Büro"
        },
        "answers": [
          "Heute arbeite ich im Büro.",
          "Ich arbeite heute im Büro."
        ],
        "explain": {
          "de": "Both are possible; the verb stays in position two."
        }
      },
      {
        "prompt": {
          "de": "Translate: “In the evening my sister reads a book.”"
        },
        "answers": [
          "Am Abend liest meine Schwester ein Buch."
        ],
        "explain": {
          "de": "The conjugated verb remains in position two."
        }
      },
      {
        "prompt": {
          "de": "Complete: Im Sommer ___ wir ans Meer. (fahren)"
        },
        "answers": [
          "fahren"
        ],
        "explain": {
          "de": "The subject follows the verb when a time phrase is first."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Translate: “Do you speak German?”"
        },
        "answers": [
          "Sprichst du Deutsch?"
        ],
        "explain": {
          "de": "Yes/no questions begin with the conjugated verb."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich habe ___ Auto. (no car)"
        },
        "answers": [
          "kein"
        ],
        "explain": {
          "de": "Use kein before an indefinite noun."
        }
      },
      {
        "prompt": {
          "de": "Translate: “I do not understand that.”"
        },
        "answers": [
          "Ich verstehe das nicht."
        ],
        "explain": {
          "de": "Nicht negates the verb or the rest of the statement."
        }
      },
      {
        "prompt": {
          "de": "Translate: “Why are you learning German?”"
        },
        "answers": [
          "Warum lernst du Deutsch?"
        ],
        "explain": {
          "de": "The question word comes first, then the verb and subject."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich habe heute ___ Zeit. (no)"
        },
        "answers": [
          "keine"
        ],
        "explain": {
          "de": "kein takes the feminine ending before Zeit."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Choose the article: Ich sehe ___ Mann. (the man, accusative)"
        },
        "answers": [
          "den"
        ],
        "explain": {
          "de": "Masculine accusative changes der to den."
        }
      },
      {
        "prompt": {
          "de": "Choose the article: Ich helfe ___ Frau. (the woman, dative)"
        },
        "answers": [
          "der"
        ],
        "explain": {
          "de": "Feminine dative is der."
        }
      },
      {
        "prompt": {
          "de": "Choose the article: ___ Kind spielt. (the child, nominative)"
        },
        "answers": [
          "das"
        ],
        "explain": {
          "de": "Neuter nominative is das."
        }
      },
      {
        "prompt": {
          "de": "Complete: Er gibt ___ Lehrer die Antwort. (the, dative)"
        },
        "answers": [
          "dem"
        ],
        "explain": {
          "de": "The recipient is masculine dative: dem Lehrer."
        }
      },
      {
        "prompt": {
          "de": "Complete: Wir besuchen ___ Museum. (the, neuter accusative)"
        },
        "answers": [
          "das"
        ],
        "explain": {
          "de": "Neuter accusative stays das."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Kannst du ___ helfen? (I / me, dative)"
        },
        "answers": [
          "mir"
        ],
        "explain": {
          "de": "helfen takes a dative object: mir."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich sehe ___. (he / him, accusative)"
        },
        "answers": [
          "ihn"
        ],
        "explain": {
          "de": "sehen takes a direct accusative object: ihn."
        }
      },
      {
        "prompt": {
          "de": "Complete: Sie gibt ___ das Buch. (we / us, dative)"
        },
        "answers": [
          "uns"
        ],
        "explain": {
          "de": "The receiver is dative: uns."
        }
      },
      {
        "prompt": {
          "de": "Complete: Sie schreibt ___. (he / him, dative)"
        },
        "answers": [
          "ihm"
        ],
        "explain": {
          "de": "The recipient of schreiben is dative here."
        }
      },
      {
        "prompt": {
          "de": "Complete: Er besucht ___. (we / us)"
        },
        "answers": [
          "uns"
        ],
        "explain": {
          "de": "uns is both nominative and accusative for wir."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich kann heute ___. (come)"
        },
        "answers": [
          "kommen"
        ],
        "explain": {
          "de": "The modal is conjugated and the infinitive moves to the end."
        }
      },
      {
        "prompt": {
          "de": "Translate: “I must practice more.”"
        },
        "answers": [
          "Ich muss mehr üben."
        ],
        "explain": {
          "de": "müssen is conjugated; üben stays infinitive at the end."
        }
      },
      {
        "prompt": {
          "de": "Complete: Weil ich müde ___, gehe ich nach Hause. (am)"
        },
        "answers": [
          "bin"
        ],
        "explain": {
          "de": "A subordinate clause sends the conjugated verb to the end."
        }
      },
      {
        "prompt": {
          "de": "Translate: “I have to get up early.”"
        },
        "answers": [
          "Ich muss früh aufstehen.",
          "Ich muss früh aufstehen"
        ],
        "explain": {
          "de": "The modal is conjugated; the infinitive remains at the end."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich glaube, dass er arbeiten ___ . (must)"
        },
        "answers": [
          "muss"
        ],
        "explain": {
          "de": "In a dass clause the conjugated verb goes to the end."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich ___ um sieben Uhr ___. (aufstehen)"
        },
        "answers": [
          "stehe auf"
        ],
        "explain": {
          "de": "The stem is conjugated in position two and auf separates to the end."
        }
      },
      {
        "prompt": {
          "de": "Translate: “I will call you later.”"
        },
        "answers": [
          "Ich rufe dich später an."
        ],
        "explain": {
          "de": "anrufen becomes rufe ... an in a main clause."
        }
      },
      {
        "prompt": {
          "de": "Complete: Der Zug kommt um acht Uhr ___. (ankommen)"
        },
        "answers": [
          "an"
        ],
        "explain": {
          "de": "The prefix an goes to the end."
        }
      },
      {
        "prompt": {
          "de": "Complete: Wir ___ am Samstag ___. (einkaufen)"
        },
        "answers": [
          "kaufen ein"
        ],
        "explain": {
          "de": "The stem is conjugated and ein separates."
        }
      },
      {
        "prompt": {
          "de": "What is the participle of aufmachen?"
        },
        "answers": [
          "aufgemacht"
        ],
        "explain": {
          "de": "The prefix remains attached in the participle."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich ___ gestern Deutsch ___. (lernen)"
        },
        "answers": [
          "habe gelernt"
        ],
        "explain": {
          "de": "Most verbs use haben plus the past participle."
        }
      },
      {
        "prompt": {
          "de": "Complete: Wir ___ spät ___. (ankommen)"
        },
        "answers": [
          "sind angekommen"
        ],
        "explain": {
          "de": "Movement/change of state often uses sein."
        }
      },
      {
        "prompt": {
          "de": "Translate: “She has worked today.”"
        },
        "answers": [
          "Sie hat heute gearbeitet."
        ],
        "explain": {
          "de": "haben is conjugated and gearbeitet goes to the end."
        }
      },
      {
        "prompt": {
          "de": "Complete: Er ___ den ganzen Tag ___. (arbeiten)"
        },
        "answers": [
          "hat gearbeitet"
        ],
        "explain": {
          "de": "Regular arbeiten uses haben + gearbeitet."
        }
      },
      {
        "prompt": {
          "de": "Translate: “She went home.”"
        },
        "answers": [
          "Sie ist nach Hause gegangen."
        ],
        "explain": {
          "de": "gehen uses sein in the perfect."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich kaufe einen ___ Mantel. (new)"
        },
        "answers": [
          "neuen"
        ],
        "explain": {
          "de": "Accusative masculine after einen takes -en."
        }
      },
      {
        "prompt": {
          "de": "Complete: eine ___ Idee (good)"
        },
        "answers": [
          "gute"
        ],
        "explain": {
          "de": "Feminine nominative after eine takes -e."
        }
      },
      {
        "prompt": {
          "de": "Complete: mit einem ___ Freund (good)"
        },
        "answers": [
          "guten"
        ],
        "explain": {
          "de": "Dative after einem takes -en."
        }
      },
      {
        "prompt": {
          "de": "Complete: ein interessant___ Buch"
        },
        "answers": [
          "es"
        ],
        "explain": {
          "de": "Neuter nominative after ein uses -es."
        }
      },
      {
        "prompt": {
          "de": "Complete: die klein___ Kinder"
        },
        "answers": [
          "en"
        ],
        "explain": {
          "de": "Plural adjective endings after definite die use -en."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich fahre ___ dem Zug. (with)"
        },
        "answers": [
          "mit"
        ],
        "explain": {
          "de": "mit always takes the dative."
        }
      },
      {
        "prompt": {
          "de": "Complete: Das Geschenk ist ___ dich. (for)"
        },
        "answers": [
          "für"
        ],
        "explain": {
          "de": "für always takes the accusative."
        }
      },
      {
        "prompt": {
          "de": "Which case follows durch?"
        },
        "answers": [
          "accusative"
        ],
        "explain": {
          "de": "durch, für, gegen, ohne, and um take the accusative."
        }
      },
      {
        "prompt": {
          "de": "Complete: Wir gehen ___ einem neuen Arzt. (to)"
        },
        "answers": [
          "zu"
        ],
        "explain": {
          "de": "zu always takes the dative."
        }
      },
      {
        "prompt": {
          "de": "Which case follows für?"
        },
        "answers": [
          "accusative"
        ],
        "explain": {
          "de": "für always takes the accusative."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Translate: “I work today.”"
        },
        "answers": [
          "Ich arbeite heute."
        ],
        "explain": {
          "de": "Present tense can describe an action happening now."
        }
      },
      {
        "prompt": {
          "de": "Translate: “Next week I am visiting my family.”"
        },
        "answers": [
          "Nächste Woche besuche ich meine Familie."
        ],
        "explain": {
          "de": "A future time phrase lets the present tense express a plan."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich ___ Deutsch. (lernen)"
        },
        "answers": [
          "lerne"
        ],
        "explain": {
          "de": "The ich ending for a regular verb is -e."
        }
      },
      {
        "prompt": {
          "de": "Complete: Jeden Montag ___ ich einen Kurs. (besuchen)"
        },
        "answers": [
          "besuche"
        ],
        "explain": {
          "de": "The present tense describes repeated actions."
        }
      },
      {
        "prompt": {
          "de": "What tense is “Der Bus kommt gleich”?"
        },
        "answers": [
          "present",
          "present tense",
          "präsens"
        ],
        "explain": {
          "de": "German commonly uses present tense for an imminent future."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Früher ___ ich in London. (wohnen)"
        },
        "answers": [
          "wohnte"
        ],
        "explain": {
          "de": "Präteritum is common for written stories and past habits."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich ___ gestern müde. (sein)"
        },
        "answers": [
          "war"
        ],
        "explain": {
          "de": "sein commonly uses the Präteritum form war."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich ___ mehr üben. (müssen, past)"
        },
        "answers": [
          "musste"
        ],
        "explain": {
          "de": "Modal verbs frequently use Präteritum in conversation."
        }
      },
      {
        "prompt": {
          "de": "Complete: Er ___ nach Hause. (gehen, past)"
        },
        "answers": [
          "ging"
        ],
        "explain": {
          "de": "gehen has the irregular Präteritum form ging."
        }
      },
      {
        "prompt": {
          "de": "Complete: Wir ___ keine Zeit. (haben, past)"
        },
        "answers": [
          "hatten"
        ],
        "explain": {
          "de": "haben becomes hatten in the Präteritum."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Nachdem ich gegessen ___, ging ich spazieren."
        },
        "answers": [
          "hatte"
        ],
        "explain": {
          "de": "The earlier event uses hatte plus the participle."
        }
      },
      {
        "prompt": {
          "de": "Complete: Der Zug ___ schon abgefahren, als wir ankamen."
        },
        "answers": [
          "war"
        ],
        "explain": {
          "de": "Movement uses war plus the participle in Plusquamperfekt."
        }
      },
      {
        "prompt": {
          "de": "Translate: “She had finished the work.”"
        },
        "answers": [
          "Sie hatte die Arbeit beendet."
        ],
        "explain": {
          "de": "hatte + beendet marks the earlier past event."
        }
      },
      {
        "prompt": {
          "de": "Complete: Nachdem sie angekommen ___, rief sie mich an."
        },
        "answers": [
          "war"
        ],
        "explain": {
          "de": "ankommen uses sein: war angekommen."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich ___ den Film schon gesehen. (have, past)"
        },
        "answers": [
          "hatte"
        ],
        "explain": {
          "de": "The earlier event uses hatte + participle."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich ___ dir morgen helfen. (werden)"
        },
        "answers": [
          "werde"
        ],
        "explain": {
          "de": "werden is conjugated and helfen goes to the end."
        }
      },
      {
        "prompt": {
          "de": "Translate: “It will rain tomorrow.”"
        },
        "answers": [
          "Es wird morgen regnen."
        ],
        "explain": {
          "de": "Futur I is useful for predictions."
        }
      },
      {
        "prompt": {
          "de": "Which tense is natural here? “Am Samstag kaufe ich ein.”"
        },
        "answers": [
          "present",
          "present tense",
          "präsens"
        ],
        "explain": {
          "de": "German often uses present tense for a clear future plan."
        }
      },
      {
        "prompt": {
          "de": "Complete: Du ___ diese Prüfung schaffen. (will)"
        },
        "answers": [
          "wirst"
        ],
        "explain": {
          "de": "The du form of werden is wirst."
        }
      },
      {
        "prompt": {
          "de": "Translate: “We will find a solution soon.”"
        },
        "answers": [
          "Wir werden bald eine Lösung finden."
        ],
        "explain": {
          "de": "The infinitive goes to the end."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Bis Freitag werde ich den Bericht fertig geschrieben ___."
        },
        "answers": [
          "haben"
        ],
        "explain": {
          "de": "The future perfect ends with haben or sein in the infinitive."
        }
      },
      {
        "prompt": {
          "de": "Complete: Er wird schon angekommen ___."
        },
        "answers": [
          "sein"
        ],
        "explain": {
          "de": "Movement uses sein in the future perfect."
        }
      },
      {
        "prompt": {
          "de": "Translate: “By Friday I will have finished.”"
        },
        "answers": [
          "Bis Freitag werde ich fertig sein.",
          "Bis Freitag werde ich fertig geworden sein."
        ],
        "explain": {
          "de": "Futur II describes completion by a future time; the auxiliary depends on the verb."
        }
      },
      {
        "prompt": {
          "de": "Complete: Bis morgen wird er den Bericht geschrieben ___."
        },
        "answers": [
          "haben"
        ],
        "explain": {
          "de": "Writing uses haben in Futur II."
        }
      },
      {
        "prompt": {
          "de": "Complete: Sie wird schon angekommen ___."
        },
        "answers": [
          "sein"
        ],
        "explain": {
          "de": "Movement uses sein."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Deutsch ist ___ als Englisch. (difficult)"
        },
        "answers": [
          "schwieriger"
        ],
        "explain": {
          "de": "The comparative normally uses -er and als."
        }
      },
      {
        "prompt": {
          "de": "Complete: Das ist ___ beste Option. (the)"
        },
        "answers": [
          "die"
        ],
        "explain": {
          "de": "Before a noun, the superlative takes an article and adjective ending."
        }
      },
      {
        "prompt": {
          "de": "Translate: “Today I am the happiest.”"
        },
        "answers": [
          "Heute bin ich am glücklichsten."
        ],
        "explain": {
          "de": "A predicate superlative uses am + -sten."
        }
      },
      {
        "prompt": {
          "de": "Complete: Dieser Weg ist ___ als der andere. (shorter)"
        },
        "answers": [
          "kürzer"
        ],
        "explain": {
          "de": "kurz changes its vowel: kürzer."
        }
      },
      {
        "prompt": {
          "de": "Complete: Das ist der ___ Termin der Woche. (most important)"
        },
        "answers": [
          "wichtigste"
        ],
        "explain": {
          "de": "The superlative before a noun takes an adjective ending."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Give the plural: der Tisch → die ___."
        },
        "answers": [
          "Tische"
        ],
        "explain": {
          "de": "Tisch takes the -e plural."
        }
      },
      {
        "prompt": {
          "de": "What gender are nouns ending in -ung usually?"
        },
        "answers": [
          "feminine",
          "feminine / die",
          "die"
        ],
        "explain": {
          "de": "Nouns ending in -ung are usually feminine."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Das ist ___ Tasche. (my)"
        },
        "answers": [
          "meine"
        ],
        "explain": {
          "de": "Tasche is feminine nominative: meine Tasche."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich nehme ___ Zug. (this, masculine accusative)"
        },
        "answers": [
          "diesen"
        ],
        "explain": {
          "de": "Masculine accusative dieser becomes diesen."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich freue ___. (myself)"
        },
        "answers": [
          "mich"
        ],
        "explain": {
          "de": "sich freuen uses the accusative reflexive pronoun mich."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich wasche ___ die Hände. (myself, dative)"
        },
        "answers": [
          "mir"
        ],
        "explain": {
          "de": "With a body part, the reflexive pronoun is often dative: mir."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Give the informal singular command: ___ langsam! (sprechen)"
        },
        "answers": [
          "Sprich"
        ],
        "explain": {
          "de": "The du imperative of sprechen is Sprich!."
        }
      },
      {
        "prompt": {
          "de": "Make this formal: ___ Sie das Fenster! (öffnen)"
        },
        "answers": [
          "Öffnen"
        ],
        "explain": {
          "de": "The formal imperative uses infinitive + Sie: Öffnen Sie!"
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Das Buch liegt auf ___ Tisch. (the, location)"
        },
        "answers": [
          "dem"
        ],
        "explain": {
          "de": "Wo? asks for a location, so use dative: auf dem Tisch."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich lege das Buch auf ___ Tisch. (the, movement)"
        },
        "answers": [
          "den"
        ],
        "explain": {
          "de": "Wohin? asks for movement, so use accusative: auf den Tisch."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Kannst du ___ helfen? (I / me)"
        },
        "answers": [
          "mir"
        ],
        "explain": {
          "de": "helfen takes a dative object."
        }
      },
      {
        "prompt": {
          "de": "Complete: Der Film gefällt ___. (she / her)"
        },
        "answers": [
          "ihr"
        ],
        "explain": {
          "de": "The person who likes something is dative."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich warte ___ den Bus. (for)"
        },
        "answers": [
          "auf"
        ],
        "explain": {
          "de": "warten auf is a fixed combination."
        }
      },
      {
        "prompt": {
          "de": "Complete: Das hängt ___ dem Wetter ab. (on/from)"
        },
        "answers": [
          "von"
        ],
        "explain": {
          "de": "abhängen von takes von + dative."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich bleibe zu Hause, weil es ___. (rain)"
        },
        "answers": [
          "regnet"
        ],
        "explain": {
          "de": "The conjugated verb goes to the end of the weil clause."
        }
      },
      {
        "prompt": {
          "de": "Translate: “Although he is tired, he continues working.”"
        },
        "answers": [
          "Obwohl er müde ist, arbeitet er weiter."
        ],
        "explain": {
          "de": "The subordinate clause ends with ist."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Das ist das Buch, ___ ich lese. (that)"
        },
        "answers": [
          "das"
        ],
        "explain": {
          "de": "das refers to das Buch and is the accusative object of lese."
        }
      },
      {
        "prompt": {
          "de": "Where does the verb go? “Die Frau, die neben mir ___, ist Ärztin.”"
        },
        "answers": [
          "sitzt"
        ],
        "explain": {
          "de": "The conjugated verb goes to the end of the relative clause."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich versuche, Deutsch ___ ___. (to learn)"
        },
        "answers": [
          "zu lernen"
        ],
        "explain": {
          "de": "Use zu before the infinitive."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich hoffe, dich bald ___. (to call, anrufen)"
        },
        "answers": [
          "anzurufen"
        ],
        "explain": {
          "de": "With a separable verb, zu goes between prefix and stem."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Wenn ich mehr Zeit ___, würde ich reisen. (had)"
        },
        "answers": [
          "hätte"
        ],
        "explain": {
          "de": "haben uses hätte in an unreal condition."
        }
      },
      {
        "prompt": {
          "de": "Make this polite: ___ Sie mir bitte helfen? (could)"
        },
        "answers": [
          "Könnten"
        ],
        "explain": {
          "de": "Könnten Sie ...? is a polite request."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Die Straße ___ repariert. (is being)"
        },
        "answers": [
          "wird"
        ],
        "explain": {
          "de": "Present passive uses werden + past participle."
        }
      },
      {
        "prompt": {
          "de": "Complete: Der Brief wurde ___ ihr geschrieben. (by)"
        },
        "answers": [
          "von"
        ],
        "explain": {
          "de": "The agent in a passive sentence uses von + dative."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Ich weiß nicht, wo der Bahnhof ___. (is)"
        },
        "answers": [
          "ist"
        ],
        "explain": {
          "de": "The verb goes to the end of the indirect question."
        }
      },
      {
        "prompt": {
          "de": "Complete: Ich frage mich, ___ er kommt. (whether)"
        },
        "answers": [
          "ob"
        ],
        "explain": {
          "de": "Use ob for an indirect yes/no question."
        }
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
      "de": {
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
      },
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
      },
      "it": {
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
        "prompt": {
          "de": "Complete: Es regnet. ___ bleibe ich zu Hause. (therefore)"
        },
        "answers": [
          "Deshalb"
        ],
        "explain": {
          "de": "deshalb takes position one and the verb follows it."
        }
      },
      {
        "prompt": {
          "de": "Complete: Zuerst koche ich, ___ esse ich. (then/afterwards)"
        },
        "answers": [
          "danach"
        ],
        "explain": {
          "de": "danach organizes the next step."
        }
      }
    ]
  },
  {
    "id": "grammar-it-1",
    "type": "grammar",
    "targetLanguage": "it",
    "level": "A1",
    "tag": "FONDAMENTA",
    "localized": {
      "it": {
        "title": "La frase italiana",
        "intro": "In una frase affermativa, il verbo segue normalmente il soggetto. Il soggetto può essere omesso perché la desinenza del verbo spesso lo rende chiaro.",
        "rules": [
          "La struttura più semplice è soggetto + verbo + resto della frase.",
          "Gli aggettivi seguono spesso il nome.",
          "I nomi hanno un genere: maschile o femminile."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Io studio italiano.",
            "en": "Studio italiano.",
            "note": "soggetto · verbo · oggetto"
          },
          {
            "de": "Oggi lavoro a casa.",
            "en": "Oggi lavoro a casa.",
            "note": "espressione di tempo · verbo"
          }
        ]
      },
      "en": {
        "title": "La frase italiana",
        "intro": "In una frase affermativa, il verbo segue normalmente il soggetto. Il soggetto può essere omesso perché la desinenza del verbo spesso lo rende chiaro.",
        "rules": [
          "La struttura più semplice è soggetto + verbo + resto della frase.",
          "Gli aggettivi seguono spesso il nome.",
          "I nomi hanno un genere: maschile o femminile."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Io studio italiano.",
            "en": "Studio italiano.",
            "note": "soggetto · verbo · oggetto"
          },
          {
            "de": "Oggi lavoro a casa.",
            "en": "Oggi lavoro a casa.",
            "note": "espressione di tempo · verbo"
          }
        ]
      },
      "de": {
        "title": "La frase italiana",
        "intro": "In una frase affermativa, il verbo segue normalmente il soggetto. Il soggetto può essere omesso perché la desinenza del verbo spesso lo rende chiaro.",
        "rules": [
          "La struttura più semplice è soggetto + verbo + resto della frase.",
          "Gli aggettivi seguono spesso il nome.",
          "I nomi hanno un genere: maschile o femminile."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Io studio italiano.",
            "en": "Studio italiano.",
            "note": "soggetto · verbo · oggetto"
          },
          {
            "de": "Oggi lavoro a casa.",
            "en": "Oggi lavoro a casa.",
            "note": "espressione di tempo · verbo"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": {
          "it": "Completa: Io ___ italiano."
        },
        "answers": [
          "studio"
        ],
        "explain": {
          "it": "La forma corretta è studio."
        }
      }
    ]
  },
  {
    "id": "grammar-it-2",
    "type": "grammar",
    "targetLanguage": "it",
    "level": "A1",
    "tag": "ARTICOLI",
    "localized": {
      "it": {
        "title": "Articoli e genere",
        "intro": "Gli articoli italiani cambiano in base al genere e al numero del nome.",
        "rules": [],
        "tables": [
          {
            "caption": "Articoli determinativi",
            "headers": [
              "",
              "Maschile",
              "Femminile"
            ],
            "rows": [
              [
                "Singolare",
                "il / lo / l’",
                "la / l’"
              ],
              [
                "Plurale",
                "i / gli",
                "le"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Il libro è sul tavolo.",
            "en": "Il libro è sul tavolo.",
            "note": "nome maschile"
          },
          {
            "de": "La casa è grande.",
            "en": "La casa è grande.",
            "note": "nome femminile"
          }
        ]
      },
      "en": {
        "title": "Articoli e genere",
        "intro": "Gli articoli italiani cambiano in base al genere e al numero del nome.",
        "rules": [],
        "tables": [
          {
            "caption": "Articoli determinativi",
            "headers": [
              "",
              "Maschile",
              "Femminile"
            ],
            "rows": [
              [
                "Singolare",
                "il / lo / l’",
                "la / l’"
              ],
              [
                "Plurale",
                "i / gli",
                "le"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Il libro è sul tavolo.",
            "en": "Il libro è sul tavolo.",
            "note": "nome maschile"
          },
          {
            "de": "La casa è grande.",
            "en": "La casa è grande.",
            "note": "nome femminile"
          }
        ]
      },
      "de": {
        "title": "Articoli e genere",
        "intro": "Gli articoli italiani cambiano in base al genere e al numero del nome.",
        "rules": [],
        "tables": [
          {
            "caption": "Articoli determinativi",
            "headers": [
              "",
              "Maschile",
              "Femminile"
            ],
            "rows": [
              [
                "Singolare",
                "il / lo / l’",
                "la / l’"
              ],
              [
                "Plurale",
                "i / gli",
                "le"
              ]
            ]
          }
        ],
        "examples": [
          {
            "de": "Il libro è sul tavolo.",
            "en": "Il libro è sul tavolo.",
            "note": "nome maschile"
          },
          {
            "de": "La casa è grande.",
            "en": "La casa è grande.",
            "note": "nome femminile"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": {
          "it": "Completa: ___ casa è grande."
        },
        "answers": [
          "la"
        ],
        "explain": {
          "it": "Casa è un nome femminile."
        }
      }
    ]
  },
  {
    "id": "grammar-it-3",
    "type": "grammar",
    "targetLanguage": "it",
    "level": "A1",
    "tag": "VERBI",
    "localized": {
      "it": {
        "title": "Il presente",
        "intro": "Il presente italiano descrive azioni attuali, abituali e talvolta future quando il momento è chiaro.",
        "rules": [
          "I verbi regolari in -are usano: -o, -i, -a, -iamo, -ate, -ano.",
          "Essere e avere sono verbi molto frequenti e irregolari.",
          "Il soggetto può essere omesso: Parlo italiano."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Parlo italiano.",
            "en": "Parlo italiano.",
            "note": "prima persona singolare"
          },
          {
            "de": "Domani vado a Roma.",
            "en": "Domani vado a Roma.",
            "note": "presente con significato futuro"
          }
        ]
      },
      "en": {
        "title": "Il presente",
        "intro": "Il presente italiano descrive azioni attuali, abituali e talvolta future quando il momento è chiaro.",
        "rules": [
          "I verbi regolari in -are usano: -o, -i, -a, -iamo, -ate, -ano.",
          "Essere e avere sono verbi molto frequenti e irregolari.",
          "Il soggetto può essere omesso: Parlo italiano."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Parlo italiano.",
            "en": "Parlo italiano.",
            "note": "prima persona singolare"
          },
          {
            "de": "Domani vado a Roma.",
            "en": "Domani vado a Roma.",
            "note": "presente con significato futuro"
          }
        ]
      },
      "de": {
        "title": "Il presente",
        "intro": "Il presente italiano descrive azioni attuali, abituali e talvolta future quando il momento è chiaro.",
        "rules": [
          "I verbi regolari in -are usano: -o, -i, -a, -iamo, -ate, -ano.",
          "Essere e avere sono verbi molto frequenti e irregolari.",
          "Il soggetto può essere omesso: Parlo italiano."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Parlo italiano.",
            "en": "Parlo italiano.",
            "note": "prima persona singolare"
          },
          {
            "de": "Domani vado a Roma.",
            "en": "Domani vado a Roma.",
            "note": "presente con significato futuro"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": {
          "it": "Completa: Noi ___ italiano."
        },
        "answers": [
          "parliamo"
        ],
        "explain": {
          "it": "La forma di noi è parliamo."
        }
      }
    ]
  },
  {
    "id": "grammar-it-4",
    "type": "grammar",
    "targetLanguage": "it",
    "level": "A2",
    "tag": "PASSATO",
    "localized": {
      "it": {
        "title": "Il passato prossimo",
        "intro": "Il passato prossimo usa avere o essere e il participio passato per parlare di azioni concluse.",
        "rules": [
          "La maggior parte dei verbi usa avere.",
          "I verbi di movimento spesso usano essere.",
          "Con essere, il participio concorda con il soggetto."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ho studiato italiano.",
            "en": "Ho studiato italiano.",
            "note": "avere + participio"
          },
          {
            "de": "Sono arrivata ieri.",
            "en": "Sono arrivata ieri.",
            "note": "essere + participio"
          }
        ]
      },
      "en": {
        "title": "Il passato prossimo",
        "intro": "Il passato prossimo usa avere o essere e il participio passato per parlare di azioni concluse.",
        "rules": [
          "La maggior parte dei verbi usa avere.",
          "I verbi di movimento spesso usano essere.",
          "Con essere, il participio concorda con il soggetto."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ho studiato italiano.",
            "en": "Ho studiato italiano.",
            "note": "avere + participio"
          },
          {
            "de": "Sono arrivata ieri.",
            "en": "Sono arrivata ieri.",
            "note": "essere + participio"
          }
        ]
      },
      "de": {
        "title": "Il passato prossimo",
        "intro": "Il passato prossimo usa avere o essere e il participio passato per parlare di azioni concluse.",
        "rules": [
          "La maggior parte dei verbi usa avere.",
          "I verbi di movimento spesso usano essere.",
          "Con essere, il participio concorda con il soggetto."
        ],
        "tables": [],
        "examples": [
          {
            "de": "Ho studiato italiano.",
            "en": "Ho studiato italiano.",
            "note": "avere + participio"
          },
          {
            "de": "Sono arrivata ieri.",
            "en": "Sono arrivata ieri.",
            "note": "essere + participio"
          }
        ]
      }
    },
    "tests": [
      {
        "prompt": {
          "it": "Completa: Io ___ mangiato."
        },
        "answers": [
          "ho"
        ],
        "explain": {
          "it": "Mangiare usa avere."
        }
      }
    ]
  }
];
const grammarByTarget = {en:grammarRecords.filter(record=>record.targetLanguage==='en'),de:grammarRecords.filter(record=>record.targetLanguage==='de'),it:grammarRecords.filter(record=>record.targetLanguage==='it')};
let grammarLessons = grammarByTarget.en;
