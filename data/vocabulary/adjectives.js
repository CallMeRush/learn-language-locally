const vocabularyAdjectives = [
  {
    "id": "w78",
    "category": "adjectives",
    "de": "gut",
    "en": "good"
  },
  {
    "id": "w79",
    "category": "adjectives",
    "de": "schlecht",
    "en": "bad"
  },
  {
    "id": "w80",
    "category": "adjectives",
    "de": "groß",
    "en": "big / tall"
  },
  {
    "id": "w81",
    "category": "adjectives",
    "de": "klein",
    "en": "small / short"
  },
  {
    "id": "w82",
    "category": "adjectives",
    "de": "neu",
    "en": "new"
  },
  {
    "id": "w83",
    "category": "adjectives",
    "de": "alt",
    "en": "old"
  },
  {
    "id": "w84",
    "category": "adjectives",
    "de": "schnell",
    "en": "fast"
  },
  {
    "id": "w85",
    "category": "adjectives",
    "de": "langsam",
    "en": "slow"
  },
  {
    "id": "w86",
    "category": "adjectives",
    "de": "wichtig",
    "en": "important"
  },
  {
    "id": "w87",
    "category": "adjectives",
    "de": "leicht",
    "en": "easy / light"
  },
  {
    "id": "w88",
    "category": "adjectives",
    "de": "schwer",
    "en": "difficult / heavy"
  },
  {
    "id": "w89",
    "category": "adjectives",
    "de": "müde",
    "en": "tired"
  },
  {"id":"w743","category":"adjectives","adjectiveCategory":"description","de":"lang","en":"long"},{"id":"w744","category":"adjectives","adjectiveCategory":"description","de":"kurz","en":"short"},{"id":"w745","category":"adjectives","adjectiveCategory":"description","de":"breit","en":"wide"},{"id":"w746","category":"adjectives","adjectiveCategory":"description","de":"schmal","en":"narrow"},{"id":"w747","category":"adjectives","adjectiveCategory":"description","de":"tief","en":"deep"},{"id":"w748","category":"adjectives","adjectiveCategory":"description","de":"flach","en":"shallow / flat"},{"id":"w749","category":"adjectives","adjectiveCategory":"condition","de":"kaputt","en":"broken"},{"id":"w750","category":"adjectives","adjectiveCategory":"condition","de":"geöffnet","en":"open"},{"id":"w751","category":"adjectives","adjectiveCategory":"condition","de":"geschlossen","en":"closed"},{"id":"w752","category":"adjectives","adjectiveCategory":"personality","de":"freundlich","en":"friendly"},{"id":"w753","category":"adjectives","adjectiveCategory":"personality","de":"höflich","en":"polite"},{"id":"w754","category":"adjectives","adjectiveCategory":"personality","de":"geduldig","en":"patient"},{"id":"w755","category":"adjectives","adjectiveCategory":"evaluation","de":"wichtig","en":"important"},{"id":"w756","category":"adjectives","adjectiveCategory":"evaluation","de":"möglich","en":"possible"},{"id":"w757","category":"adjectives","adjectiveCategory":"evaluation","de":"verfügbar","en":"available"},{"id":"w758","category":"adjectives","adjectiveCategory":"taste","de":"scharf","en":"spicy / hot"},{"id":"w759","category":"adjectives","adjectiveCategory":"taste","de":"süß","en":"sweet"},{"id":"w760","category":"adjectives","adjectiveCategory":"temperature","de":"kühl","en":"cool"},{"id":"w761","category":"adjectives","adjectiveCategory":"temperature","de":"trocken","en":"dry"},{"id":"w762","category":"adjectives","adjectiveCategory":"amount","de":"voll","en":"full"}
];
vocabularyAdjectives.push(
  {id:'w488',category:'adjectives',adjectiveCategory:'description',de:'schön',en:'beautiful / nice'},
  {id:'w489',category:'adjectives',adjectiveCategory:'description',de:'hässlich',en:'ugly'},
  {id:'w490',category:'adjectives',adjectiveCategory:'description',de:'jung',en:'young'},
  {id:'w491',category:'adjectives',adjectiveCategory:'description',de:'freundlich',en:'friendly'},
  {id:'w492',category:'adjectives',adjectiveCategory:'description',de:'höflich',en:'polite'},
  {id:'w493',category:'adjectives',adjectiveCategory:'description',de:'stark',en:'strong'},
  {id:'w494',category:'adjectives',adjectiveCategory:'description',de:'schwach',en:'weak'},
  {id:'w495',category:'adjectives',adjectiveCategory:'description',de:'rund',en:'round'},
  {id:'w496',category:'adjectives',adjectiveCategory:'color',de:'rot',en:'red'},
  {id:'w497',category:'adjectives',adjectiveCategory:'color',de:'blau',en:'blue'},
  {id:'w498',category:'adjectives',adjectiveCategory:'color',de:'grün',en:'green'},
  {id:'w499',category:'adjectives',adjectiveCategory:'color',de:'gelb',en:'yellow'},
  {id:'w500',category:'adjectives',adjectiveCategory:'color',de:'schwarz',en:'black'},
  {id:'w501',category:'adjectives',adjectiveCategory:'color',de:'weiß',en:'white'},
  {id:'w502',category:'adjectives',adjectiveCategory:'color',de:'braun',en:'brown'},
  {id:'w503',category:'adjectives',adjectiveCategory:'color',de:'grau',en:'grey'},
  {id:'w504',category:'adjectives',adjectiveCategory:'temperature',de:'heiß',en:'hot'},
  {id:'w505',category:'adjectives',adjectiveCategory:'temperature',de:'kühl',en:'cool'},
  {id:'w506',category:'adjectives',adjectiveCategory:'temperature',de:'sonnig',en:'sunny'},
  {id:'w507',category:'adjectives',adjectiveCategory:'temperature',de:'windig',en:'windy'},
  {id:'w508',category:'adjectives',adjectiveCategory:'condition',de:'offen',en:'open'},
  {id:'w509',category:'adjectives',adjectiveCategory:'condition',de:'geschlossen',en:'closed'},
  {id:'w510',category:'adjectives',adjectiveCategory:'condition',de:'kaputt',en:'broken'},
  {id:'w511',category:'adjectives',adjectiveCategory:'condition',de:'fertig',en:'finished / ready'},
  {id:'w512',category:'adjectives',adjectiveCategory:'condition',de:'frei',en:'free / available'},
  {id:'w513',category:'adjectives',adjectiveCategory:'condition',de:'besetzt',en:'occupied / busy'},
  {id:'w514',category:'adjectives',adjectiveCategory:'personality',de:'lustig',en:'funny'},
  {id:'w515',category:'adjectives',adjectiveCategory:'personality',de:'ernst',en:'serious'},
  {id:'w516',category:'adjectives',adjectiveCategory:'personality',de:'clever',en:'clever'},
  {id:'w517',category:'adjectives',adjectiveCategory:'personality',de:'fleißig',en:'hard-working'},
  {id:'w518',category:'adjectives',adjectiveCategory:'personality',de:'faul',en:'lazy'},
  {id:'w519',category:'adjectives',adjectiveCategory:'personality',de:'mutig',en:'brave'},
  {id:'w520',category:'adjectives',adjectiveCategory:'personality',de:'ängstlich',en:'afraid / anxious'},
  {id:'w521',category:'adjectives',adjectiveCategory:'personality',de:'neugierig',en:'curious'},
  {id:'w522',category:'adjectives',adjectiveCategory:'amount',de:'viel',en:'much / many'},
  {id:'w523',category:'adjectives',adjectiveCategory:'amount',de:'wenig',en:'little / few'},
  {id:'w524',category:'adjectives',adjectiveCategory:'amount',de:'genug',en:'enough'},
  {id:'w525',category:'adjectives',adjectiveCategory:'amount',de:'voll',en:'full'},
  {id:'w526',category:'adjectives',adjectiveCategory:'amount',de:'leer',en:'empty'},
  {id:'w527',category:'adjectives',adjectiveCategory:'evaluation',de:'richtig',en:'correct / right'},
  {id:'w528',category:'adjectives',adjectiveCategory:'evaluation',de:'falsch',en:'wrong / false'},
  {id:'w529',category:'adjectives',adjectiveCategory:'evaluation',de:'interessant',en:'interesting'},
  {id:'w530',category:'adjectives',adjectiveCategory:'evaluation',de:'langweilig',en:'boring'},
  {id:'w531',category:'adjectives',adjectiveCategory:'evaluation',de:'möglich',en:'possible'},
  {id:'w532',category:'adjectives',adjectiveCategory:'evaluation',de:'unmöglich',en:'impossible'},
  {id:'w533',category:'adjectives',adjectiveCategory:'evaluation',de:'notwendig',en:'necessary'},
  {id:'w534',category:'adjectives',adjectiveCategory:'evaluation',de:'bekannt',en:'known / famous'},
  {id:'w535',category:'adjectives',adjectiveCategory:'taste',de:'sauer',en:'sour'},
  {id:'w536',category:'adjectives',adjectiveCategory:'taste',de:'bitter',en:'bitter'},
  {id:'w537',category:'adjectives',adjectiveCategory:'taste',de:'frisch',en:'fresh'},
  {id:'w538',category:'adjectives',adjectiveCategory:'taste',de:'lecker',en:'tasty'}
);
vocabularyAdjectives.push(
  {id:'w539',category:'adjectives',adjectiveCategory:'comparison',de:'besser',en:'better'},
  {id:'w540',category:'adjectives',adjectiveCategory:'comparison',de:'am besten',en:'the best / best'},
  {id:'w541',category:'adjectives',adjectiveCategory:'comparison',de:'schlechter',en:'worse'},
  {id:'w542',category:'adjectives',adjectiveCategory:'comparison',de:'am schlechtesten',en:'the worst / worst'},
  {id:'w543',category:'adjectives',adjectiveCategory:'comparison',de:'größer',en:'bigger / taller'},
  {id:'w544',category:'adjectives',adjectiveCategory:'comparison',de:'am größten',en:'the biggest / tallest'},
  {id:'w545',category:'adjectives',adjectiveCategory:'comparison',de:'kleiner',en:'smaller / shorter'},
  {id:'w546',category:'adjectives',adjectiveCategory:'comparison',de:'am kleinsten',en:'the smallest / shortest'},
  {id:'w547',category:'adjectives',adjectiveCategory:'comparison',de:'schneller',en:'faster'},
  {id:'w548',category:'adjectives',adjectiveCategory:'comparison',de:'am schnellsten',en:'the fastest'},
  {id:'w549',category:'adjectives',adjectiveCategory:'comparison',de:'älter',en:'older'},
  {id:'w550',category:'adjectives',adjectiveCategory:'comparison',de:'am ältesten',en:'the oldest'},
  {id:'w551',category:'adjectives',adjectiveCategory:'comparison',de:'jünger',en:'younger'},
  {id:'w552',category:'adjectives',adjectiveCategory:'comparison',de:'am jüngsten',en:'the youngest'},
  {id:'w553',category:'adjectives',adjectiveCategory:'comparison',de:'mehr',en:'more'},
  {id:'w554',category:'adjectives',adjectiveCategory:'comparison',de:'am meisten',en:'the most'},
  {id:'w555',category:'adjectives',adjectiveCategory:'comparison',de:'weniger',en:'less'},
  {id:'w556',category:'adjectives',adjectiveCategory:'comparison',de:'am wenigsten',en:'the least'},
  {id:'w557',category:'adjectives',adjectiveCategory:'comparison',de:'lieber',en:'rather / preferably'},
  {id:'w558',category:'adjectives',adjectiveCategory:'comparison',de:'am liebsten',en:'most preferably'},
  {id:'w559',category:'adjectives',adjectiveCategory:'comparison',de:'höher',en:'higher'},
  {id:'w560',category:'adjectives',adjectiveCategory:'comparison',de:'am höchsten',en:'the highest'},
  {id:'w561',category:'adjectives',adjectiveCategory:'comparison',de:'näher',en:'closer'},
  {id:'w562',category:'adjectives',adjectiveCategory:'comparison',de:'am nächsten',en:'the closest / next'}
);
