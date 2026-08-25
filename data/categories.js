const categoryRecords = [
  {
    "id": "all",
    "type": "category",
    "localized": {
      "en": {
        "label": "All words"
      },
      "de": {
        "label": "Alle Wörter"
      },
      "it": {
        "label": "Tutte le parole"
      }
    }
  },
  {
    "id": "house",
    "type": "category",
    "localized": {
      "en": {
        "label": "House objects"
      },
      "de": {
        "label": "Hausgegenstände"
      },
      "it": {
        "label": "Oggetti di casa"
      }
    }
  },
  {
    "id": "verbs",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs"
      },
      "de": {
        "label": "Verben"
      },
      "it": {
        "label": "Verbi"
      }
    }
  },
  {
    "id": "verb-core",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · core"
      },
      "de": {
        "label": "Kernverben"
      },
      "it": {
        "label": "Verbi fondamentali"
      }
    }
  },
  {
    "id": "verb-daily",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · daily life"
      },
      "de": {
        "label": "Alltag"
      },
      "it": {
        "label": "Vita quotidiana"
      }
    }
  },
  {
    "id": "verb-separable",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · separable"
      },
      "de": {
        "label": "Trennbare Verben"
      },
      "it": {
        "label": "Verbi separabili"
      }
    }
  },
  {
    "id": "verb-travel",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · travel"
      },
      "de": {
        "label": "Reisen"
      },
      "it": {
        "label": "Viaggi"
      }
    }
  },
  {
    "id": "verb-health",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · health"
      },
      "de": {
        "label": "Gesundheit"
      },
      "it": {
        "label": "Salute"
      }
    }
  },
  {
    "id": "verb-shopping",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · shopping"
      },
      "de": {
        "label": "Einkaufen"
      },
      "it": {
        "label": "Shopping"
      }
    }
  },
  {
    "id": "verb-work",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · work"
      },
      "de": {
        "label": "Arbeit"
      },
      "it": {
        "label": "Lavoro"
      }
    }
  },
  {
    "id": "verb-communication",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · communication"
      },
      "de": {
        "label": "Kommunikation"
      },
      "it": {
        "label": "Comunicazione"
      }
    }
  },
  {
    "id": "verb-modal",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · modal"
      },
      "de": {
        "label": "Modalverben"
      },
      "it": {
        "label": "Verbi modali"
      }
    }
  },
  {
    "id": "verb-education",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · education"
      },
      "de": {
        "label": "Bildung"
      },
      "it": {
        "label": "Istruzione"
      }
    }
  },
  {
    "id": "verb-nature",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · nature"
      },
      "de": {
        "label": "Natur"
      },
      "it": {
        "label": "Natura"
      }
    }
  },
  {
    "id": "verb-feelings",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · feelings"
      },
      "de": {
        "label": "Gefühle"
      },
      "it": {
        "label": "Emozioni"
      }
    }
  },
  {
    "id": "verb-clothing",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · clothing"
      },
      "de": {
        "label": "Kleidung"
      },
      "it": {
        "label": "Abbigliamento"
      }
    }
  },
  {
    "id": "verb-technology",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · technology"
      },
      "de": {
        "label": "Technologie"
      },
      "it": {
        "label": "Tecnologia"
      }
    }
  },
  {
    "id": "verb-environment",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · environment"
      },
      "de": {
        "label": "Umwelt"
      },
      "it": {
        "label": "Ambiente"
      }
    }
  },
  {
    "id": "verb-culture",
    "type": "category",
    "localized": {
      "en": {
        "label": "Verbs · culture"
      },
      "de": {
        "label": "Kultur"
      },
      "it": {
        "label": "Cultura"
      }
    }
  },
  {
    "id": "greetings",
    "type": "category",
    "localized": {
      "en": {
        "label": "Greetings"
      },
      "de": {
        "label": "Begrüßungen"
      },
      "it": {
        "label": "Saluti"
      }
    }
  },
  {
    "id": "people",
    "type": "category",
    "localized": {
      "en": {
        "label": "People"
      },
      "de": {
        "label": "Menschen"
      },
      "it": {
        "label": "Persone"
      }
    }
  },
  {
    "id": "food",
    "type": "category",
    "localized": {
      "en": {
        "label": "Food & drink"
      },
      "de": {
        "label": "Essen und Trinken"
      },
      "it": {
        "label": "Cibo e bevande"
      }
    }
  },
  {
    "id": "city",
    "type": "category",
    "localized": {
      "en": {
        "label": "Around town"
      },
      "de": {
        "label": "Unterwegs in der Stadt"
      },
      "it": {
        "label": "In città"
      }
    }
  },
  {
    "id": "adjectives",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives"
      },
      "de": {
        "label": "Adjektive"
      },
      "it": {
        "label": "Aggettivi"
      }
    }
  },
  {
    "id": "adjective-description",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · description"
      },
      "de": {
        "label": "Beschreibung"
      },
      "it": {
        "label": "Descrizione"
      }
    }
  },
  {
    "id": "adjective-color",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · colors"
      },
      "de": {
        "label": "Farben"
      },
      "it": {
        "label": "Colori"
      }
    }
  },
  {
    "id": "adjective-temperature",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · weather"
      },
      "de": {
        "label": "Wetter"
      },
      "it": {
        "label": "Meteo"
      }
    }
  },
  {
    "id": "adjective-condition",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · condition"
      },
      "de": {
        "label": "Zustand"
      },
      "it": {
        "label": "Condizione"
      }
    }
  },
  {
    "id": "adjective-personality",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · personality"
      },
      "de": {
        "label": "Persönlichkeit"
      },
      "it": {
        "label": "Personalità"
      }
    }
  },
  {
    "id": "adjective-amount",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · amount"
      },
      "de": {
        "label": "Menge"
      },
      "it": {
        "label": "Quantità"
      }
    }
  },
  {
    "id": "adjective-evaluation",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · evaluation"
      },
      "de": {
        "label": "Bewertung"
      },
      "it": {
        "label": "Valutazione"
      }
    }
  },
  {
    "id": "adjective-taste",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · taste"
      },
      "de": {
        "label": "Geschmack"
      },
      "it": {
        "label": "Gusto"
      }
    }
  },
  {
    "id": "adjective-comparison",
    "type": "category",
    "localized": {
      "en": {
        "label": "Adjectives · comparison"
      },
      "de": {
        "label": "Vergleich"
      },
      "it": {
        "label": "Confronto"
      }
    }
  },
  {
    "id": "time",
    "type": "category",
    "localized": {
      "en": {
        "label": "Time"
      },
      "de": {
        "label": "Zeit"
      },
      "it": {
        "label": "Tempo"
      }
    }
  },
  {
    "id": "travel",
    "type": "category",
    "localized": {
      "en": {
        "label": "Travel"
      },
      "de": {
        "label": "Reisen"
      },
      "it": {
        "label": "Viaggi"
      }
    }
  },
  {
    "id": "health",
    "type": "category",
    "localized": {
      "en": {
        "label": "Health"
      },
      "de": {
        "label": "Gesundheit"
      },
      "it": {
        "label": "Salute"
      }
    }
  },
  {
    "id": "shopping",
    "type": "category",
    "localized": {
      "en": {
        "label": "Shopping"
      },
      "de": {
        "label": "Einkaufen"
      },
      "it": {
        "label": "Shopping"
      }
    }
  },
  {
    "id": "nature",
    "type": "category",
    "localized": {
      "en": {
        "label": "Nature & weather"
      },
      "de": {
        "label": "Natur und Wetter"
      },
      "it": {
        "label": "Natura e meteo"
      }
    }
  },
  {
    "id": "work",
    "type": "category",
    "localized": {
      "en": {
        "label": "Work"
      },
      "de": {
        "label": "Arbeit"
      },
      "it": {
        "label": "Lavoro"
      }
    }
  },
  {
    "id": "feelings",
    "type": "category",
    "localized": {
      "en": {
        "label": "Feelings"
      },
      "de": {
        "label": "Gefühle"
      },
      "it": {
        "label": "Emozioni"
      }
    }
  },
  {
    "id": "clothing",
    "type": "category",
    "localized": {
      "en": {
        "label": "Clothing"
      },
      "de": {
        "label": "Kleidung"
      },
      "it": {
        "label": "Abbigliamento"
      }
    }
  },
  {
    "id": "education",
    "type": "category",
    "localized": {
      "en": {
        "label": "Education"
      },
      "de": {
        "label": "Bildung"
      },
      "it": {
        "label": "Istruzione"
      }
    }
  },
  {
    "id": "technology",
    "type": "category",
    "localized": {
      "en": {
        "label": "Technology"
      },
      "de": {
        "label": "Technologie"
      },
      "it": {
        "label": "Tecnologia"
      }
    }
  },
  {
    "id": "communication",
    "type": "category",
    "localized": {
      "en": {
        "label": "Communication"
      },
      "de": {
        "label": "Kommunikation"
      },
      "it": {
        "label": "Comunicazione"
      }
    }
  },
  {
    "id": "daily",
    "type": "category",
    "localized": {
      "en": {
        "label": "Daily routines"
      },
      "de": {
        "label": "Tagesablauf"
      },
      "it": {
        "label": "Routine quotidiana"
      }
    }
  },
  {
    "id": "environment",
    "type": "category",
    "localized": {
      "en": {
        "label": "Environment"
      },
      "de": {
        "label": "Umwelt"
      },
      "it": {
        "label": "Ambiente"
      }
    }
  },
  {
    "id": "culture",
    "type": "category",
    "localized": {
      "en": {
        "label": "Culture"
      },
      "de": {
        "label": "Kultur"
      },
      "it": {
        "label": "Cultura"
      }
    }
  },
  {
    "id": "basics",
    "type": "category",
    "localized": {
      "en": {
        "label": "Basics"
      },
      "de": {
        "label": "Grundlagen"
      },
      "it": {
        "label": "Basi"
      }
    }
  },
  {
    "id": "vocabulary",
    "type": "category",
    "localized": {
      "en": {
        "label": "Vocabulary in context"
      },
      "de": {
        "label": "Wortschatz im Kontext"
      },
      "it": {
        "label": "Vocabolario nel contesto"
      }
    }
  },
  {
    "id": "nuanced",
    "type": "category",
    "localized": {
      "en": {
        "label": "More nuanced"
      },
      "de": {
        "label": "Feinere Bedeutungen"
      },
      "it": {
        "label": "Sfumature"
      }
    }
  }
];
