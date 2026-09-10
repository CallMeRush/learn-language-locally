// Meaning groups for the adjective desk; first matching definition wins.
const groups = {
  appearance: 'Appearance: size, shape & colour',
  personality: 'Personality & behaviour',
  ability: 'People: ability & skills',
  emotions: 'Emotions & mental states',
  condition: 'Physical health & condition',
  objects: 'Objects: materials & condition',
  places: 'Places, origin & nationality',
  time: 'Time, age & frequency',
  movement: 'Movement & direction',
  certainty: 'Possibility & certainty',
  society: 'Society, work & technology',
  sensory: 'Taste & temperature',
  evaluation: 'Quality & evaluation',
  quantity: 'Quantity & degree',
  general: 'Other descriptions',
};
// Specific domains precede the broader descriptive rules below.
const domainRules = [
  ['ability', /\b(capable|qualified|competent|talented|gifted|skilled|trained|educated|inexperienced|practiced|intelligent|clever|creative|inventive|imaginative|fluent|bilingual|clumsy)\b/i],
  ['emotions', /\b(happy|sad|angry|afraid|anxious|worried|excited|calm|lonely|depressed|nervous|relaxed|bored|delighted|frightened|terrified|ashamed|embarrassed|jealous|envious|surprised|astonished|amazed|satisfied|dissatisfied|disappointed|frustrated|overwhelmed|confused|puzzled|relieved|furious|cheerful|overjoyed|speechless|convinced|motivated|indifferent)\b/i],
  ['time', /\b(new|old|young|early|late|later|current|daily|weekly|monthly|annual|yearly|hourly|nightly|seasonal|eternal|temporary|transient|instant|imminent|upcoming|past|bygone|modern|ancient|historical|vintage|frequent|rare|rarely|regularly|repeated|premature|delayed|penultimate|grown-up|summery|wintry|wintery|evening|today|yesterday|year|years|minutes)\b/i],
  ['certainty', /\b(possible|impossible|probable|improbable|likely|unlikely|certain|definite|definitive|sure|necessary|unnecessary|essential|optional|obligatory|imaginable|conceivable|expected|unexpected|assumed|undecided)\b/i],
  ['movement', /\b(fast|slow|quick|speedy|accelerated|mobile|movable|nimble|flying|driving|walking|swimming|jumping|dancing|rising|sinking|falling|standing|sitting|hanging|sideways|opposite|upward|downward)\b/i],
  ['objects', /\b(wooden|metallic|glass|glassy|stone|stony|sandy|liquid|solid|hard|stiff|rigid|elastic|sticky|fragile|durable|waterproof|broken|damaged|intact|clean|dirty|tidy|untidy|dry|wet|moist|damp|soaked|rotten|spoiled|spoilt|stale|manufactured|homemade|built-in|renovated|cooked|printed|wrapped|filtered|unused|unplugged|destroyed|repaired|loose|raw|pure|artificial)\b/i],
  ['places', /\b(local|regional|national|international|foreign|native|indigenous|urban|rural|geographical|domestic|central|near|nearby|distant|remote|surrounding|adjacent|outdoor|indoor|underwater|alpine|tropical|northern|southern|eastern|western|northeastern|northwestern|southeastern|southwestern|north-westerly|northerly|southerly|westerly|easterly)\b/i],
  ['society', /\b(political|public|social|personal|private|official|technical|technological|automatic|economic|economical|financial|democratic|conservative|military|cultural|religious|holy|sacred|royal|aristocratic|state-owned|professional|vocational|business|contractual|commercial|digital|online|offline|electronic|electrical|electric|magnetic|solar|biological|chemical|ecological|organic|theoretical|musical|artistic|photographic|legal|illegal|criminal|unemployed|employed|parental|paternal|familial|married|divorced|childless|student|police-related|scientific|alphabetical|geometric|multicultural)\b/i],
];
const rules = [
  ['quantity', /\b(more|less|all|no|most|only|sole|unique|full|empty|remaining|various|different|other|first|second|third|last|next|numerous|countless|infinite|finite|limited|unlimited|dense|sparse|extreme|absolute|relative|regular|irregular)\b/i],
  ['appearance', /\b(deep|shallow|upper|lower|inner|outer|visible|invisible|parallel|fat|slim|slender|massive|tiny|huge|gigantic|enormous|miniature|naked|bare|shiny|dull|oval|circular|triangular|rectangular|vertical|horizontal|broad|steep|bent|crooked|hairy|bald|blond|blonde|dark-haired|golden|silvery|striped|spotted|colourless|colorless|opaque|smooth|rough|pointed|sharp|blunt|angular)\b/i],
  ['sensory', /\b(loud|quiet|silent|soft|noisy|deafening|flavou?rful|savoury|savory|smelly|stinking|odou?rless|odou?rous|aromatic|scented|burning|scorching|chilly|frosty|refreshing|juicy|crispy|crunchy|creamy|greasy|oily|ripe|unripe)\b/i],
  ['personality', /\b(serious|earnest|responsible|irresponsible|attentive|observant|sensible|careful|careless|cordial|grateful|ungrateful|fair|just|unfair|strict|severe|humane|funny|witty|intelligent|clever|stupid|silly|attentive|tolerant|intolerant|ambitious|cautious|reckless|considerate|inconsiderate|respectful|disrespectful|respectable|sensitive|insensitive|discreet|indiscreet|tactful|tactless|tough|gentle|aggressive|passive|determined|indecisive|independent|dependent|creative|imaginative|inventive|talkative|outgoing|reserved|confident|timid)\b/i],
  ['condition', /\b(alone|conscious|unconscious|aware|unaware|active|inactive|fit|fresh|broken|clean|dirty|tidy|untidy|orderly|disorderly|ready|prepared|finished|open|closed|worn|damaged|intact|dry|wet|moist|damp|soaked|soaking|rotten|spoiled|spoilt|stale|wounded|deaf|blind|disabled|bored|delighted|frightened|terrified|ashamed|embarrassed|jealous|envious|surprised|astonished|amazed|satisfied|dissatisfied|disappointed|frustrated|overwhelmed|confused|puzzled|relieved)\b/i],
  ['evaluation', /\b(best|worst|better|worse|true|false|real|genuine|fake|clear|obvious|exact|precise|vague|unclear|sure|safe|unsafe|possible|impossible|probable|likely|unlikely|practical|convenient|inconvenient|urgent|pressing|dangerous|harmless|harmful|wonderful|marvelous|marvellous|favorable|favourable|unfavorable|unfavourable|cheap|expensive|affordable|ridiculous|critical|fine|delicate|normal|abnormal|essential|significant|insignificant|incredible|popular|unpopular|typical|unusual|usual|special|specific|concrete|abstract|original|authentic|relevant|irrelevant|appropriate|inappropriate|acceptable|unacceptable|legal|illegal|valid|invalid|plausible|implausible)\b/i],
  ['sensory', /\b(hot|cold|warm|cool|freezing|frozen|icy|sweet|sour|bitter|salty|spicy|tasty|delicious|bland|flavou?rless|fragrant|lukewarm)\b/i],
  ['appearance', /\b(big|small|large|little|tall|short|long|wide|narrow|thick|thin|round|square|flat|curved|straight|red|blue|green|yellow|black|white|brown|pink|purple|grey|gray|colourful|colorful|pale|bright|dark|transparent|beautiful|ugly|handsome|pretty)\b/i],
  ['personality', /\b(friendly|polite|rude|honest|dishonest|brave|cowardly|generous|selfish|kind|cruel|patient|impatient|loyal|reliable|lazy|diligent|shy|modest|arrogant|sincere|stubborn|curious|sociable|obedient)\b/i],
  ['condition', /\b(happy|sad|angry|afraid|anxious|worried|excited|calm|tired|sleepy|awake|hungry|thirsty|healthy|sick|ill|injured|weak|strong|exhausted|lonely|depressed|nervous|relaxed|pregnant|alive|dead|drunk|sober)\b/i],
  ['quantity', /\b(many|much|few|several|numerous|enough|sufficient|insufficient|abundant|scarce|frequent|rare|total|complete|entire|whole|partial|half|double|triple|single|multiple|maximum|minimum|excessive|equal|extra|additional)\b/i],
  ['evaluation', /\b(good|bad|great|excellent|poor|perfect|imperfect|useful|useless|important|unimportant|necessary|unnecessary|valuable|worthless|suitable|unsuitable|correct|incorrect|right|wrong|easy|difficult|simple|complicated|effective|efficient|successful|unsuccessful|positive|negative|advantageous|disadvantageous|reasonable|unreasonable)\b/i],
];
function adjectiveGroup(english, topic) {
  // Proper nationality/place glosses are capitalized in the source deck.
  if (/^(?:[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*)(?:$| \(adj\.\)| \(language| \(from| \(relating)|^from [A-Z]|^[A-Z][a-z]+-speaking/.test(english) && !/^Wintry/.test(english)) {
    if (/^(Catholic|Christian|Muslim|Islamic|Hebrew|Latin)$/.test(english)) return 'society';
    return 'places';
  }
  const domain = domainRules.find(([, pattern]) => pattern.test(english));
  if (domain) return domain[0];
  const match = rules.find(([, pattern]) => pattern.test(english));
  if (match) return match[0];
  if (['feelings', 'health'].includes(topic)) return 'condition';
  return 'general';
}

module.exports = { groups, adjectiveGroup };
