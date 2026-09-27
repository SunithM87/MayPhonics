/*
 * Phonics content, structured the way a volunteer reading platform handles
 * progression: a numeric ACTIVITY LEVEL the adult sets and moves (flashcards
 * and games unlock whole-level), and a separate colour-banded STORY LEVEL
 * for the book library (see stories.js).
 *
 * What's on the scale is Read Write Inc. Phonics (Ruth Miskin / Oxford
 * University Press). The ORDER is RWI's own: Set 1 Speed Sounds in the
 * published teaching order (m a s d t i n p g o c k u b f e l h sh r j v y
 * w th z ch qu x ng nk), then the 12 Set 2 sounds, then the Set 3 sounds,
 * in the order RWI's Speed Sounds charts list them. The GROUPING into levels
 * of three to six sounds is this app's, not RWI's — RWI teaches a sound a day
 * and regroups children every half term, so there is no official "week 3".
 * The group boundaries are placed where RWI's own assessment steps are:
 * Level 3 ends on the first 16 single-letter sounds (Set 1 Group A), Level 6
 * completes Set 1, Level 9 the first six Set 2 sounds (the Purple exit
 * check), Level 11 all of Set 2, Level 13 the first six Set 3 sounds (the
 * Yellow exit check), Level 17 all of Set 3.
 *
 * Every word the app shows him has an explicit grapheme breakdown in
 * words.js. tools/check-content.js validates ALL content here — sound
 * examples, sorts, wheels, game pools and every story word — against the
 * sounds taught by the level it appears at, and fails otherwise.
 *
 * Not affiliated with Ruth Miskin Literacy, Oxford University Press or
 * Chapter One. His school's own groupings always win over this file.
 */

const UNITS = [
  { n: 1,  set: "Set 1", term: "Reception · Autumn 1", label: "Speed Sounds 1", sounds: ["m", "a", "s", "d", "t"], tricky: [] },
  { n: 2,  set: "Set 1", term: "Reception · Autumn 1", label: "Speed Sounds 2", sounds: ["i", "n", "p", "g", "o"], tricky: [] },
  { n: 3,  set: "Set 1", term: "Reception · Autumn 1", label: "Speed Sounds 3", sounds: ["c", "k", "u", "b", "f", "e"], note: "The first 16 single-letter sounds", tricky: [] },
  { n: 4,  set: "Set 1", term: "Reception · Autumn 1", label: "Speed Sounds 4", sounds: ["l", "h", "sh", "r", "j"], note: "sh is the first Special Friend — two letters, one sound", tricky: [] },
  { n: 5,  set: "Set 1", term: "Reception · Autumn 2", label: "Speed Sounds 5", sounds: ["v", "y", "w", "th", "z"], tricky: [] },
  { n: 6,  set: "Set 1", term: "Reception · Autumn 2", label: "Speed Sounds 6", sounds: ["ch", "qu", "x", "ng", "nk"], note: "All of Set 1. Ditties start here, and with them the first Red Words", tricky: ["I", "the", "put", "no", "of", "my", "he"] },
  { n: 7,  set: "Set 1", term: "Reception · Autumn 2", label: "Special Friends & longer words", sounds: ["ck", "ff", "ll", "ss", "zz", "dd", "mm", "tt", "bb", "rr", "gg", "pp"], note: "Word Time 1.7: double letters, and 4- and 5-sound words — stop, jump, cats", tricky: [] },
  { n: 8,  set: "Set 2", term: "Reception · Spring", label: "Set 2 · part 1", sounds: ["ay", "ee", "igh"], tricky: ["your", "said", "you", "be"] },
  { n: 9,  set: "Set 2", term: "Reception · Spring", label: "Set 2 · part 2", sounds: ["ow(snow)", "oo", "oo(book)"], note: "The first six Set 2 sounds", tricky: ["to", "me", "go", "baby", "are", "paint"] },
  { n: 10, set: "Set 2", term: "Reception · Summer", label: "Set 2 · part 3", sounds: ["ar", "or", "air"], tricky: ["all", "like", "I've", "want", "we", "her", "she", "washing", "some", "so"] },
  { n: 11, set: "Set 2", term: "Reception · Summer", label: "Set 2 · part 4", sounds: ["ir", "ou", "oy"], note: "All 12 Set 2 sounds", tricky: [] },
  { n: 12, set: "Set 3", term: "Year 1 · Autumn", label: "Set 3 · part 1", sounds: ["ea", "oi", "a-e"], tricky: ["what", "they", "do", "old", "was", "call"] },
  { n: 13, set: "Set 3", term: "Year 1 · Autumn", label: "Set 3 · part 2", sounds: ["i-e", "o-e", "u-e"], note: "The first six Set 3 sounds", tricky: ["saw", "watch", "school", "small", "their", "who", "tall", "brother", "were", "I'm", "there", "fall", "any", "where", "wall"] },
  { n: 14, set: "Set 3", term: "Year 1 · Spring", label: "Set 3 · part 3", sounds: ["aw", "are", "ur", "er"], tricky: ["does", "one", "other", "two", "could", "ball", "would", "water", "wash", "anyone", "over", "wasn't", "through", "once", "son", "whole", "people"] },
  { n: 15, set: "Set 3", term: "Year 1 · Spring", label: "Set 3 · part 4", sounds: ["ow", "ai", "oa", "ew"], tricky: [] },
  { n: 16, set: "Set 3", term: "Year 1 · Summer", label: "Set 3 · part 5", sounds: ["e(he)", "ire", "ear"], tricky: [] },
  { n: 17, set: "Set 3", term: "Year 1 · Summer", label: "Set 3 · part 6", sounds: ["ure", "tion", "tious", "cious"], note: "All of Set 3", tricky: [] },
  { n: 18, set: "Complex Speed Sounds", term: "Year 2", label: "More ways to write the sounds", sounds: ["ie", "ue", "oe", "au", "ey", "wh", "ph", "e-e", "y(ee)", "y(igh)", "c(soft)", "g(soft)", "ea(bread)"], note: "The rest of the Complex Speed Sounds chart that the stories and games use", tricky: ["should", "come", "many", "mother", "father", "here", "buy", "bought", "great", "above", "someone", "another", "walk", "caught", "worse", "everyone", "love", "wear"] },
];

const MAX_LEVEL = UNITS.length;
/* Word Time 1.7 — once all of Set 1 is known, words get longer: two
 * consonant sounds side by side (stop, jump) and a plural or verb -s
 * (cats, sits). RWI does both at the same step. */
const ADJACENT_LEVEL = 7;
const SUFFIX_S_LEVEL = 7;

/* Friendly labels for graphemes whose id carries a disambiguator. */
const GPC_LABEL = {
  "oo(book)": "oo", "c(soft)": "c", "g(soft)": "g", "y(ee)": "y", "y(igh)": "y", "e(he)": "e",
  "ea(bread)": "ea", "ow(snow)": "ow", "a-e": "a-e", "e-e": "e-e", "i-e": "i-e", "o-e": "o-e", "u-e": "u-e",
};
/* The Set 2 and Set 3 cards each come with a short phrase ("may I play").
 * These are RWI's phrases, as schools send them home; they are the fastest
 * way to tell the two oo's and the two ow's apart. */
const GPC_NOTE = {
  ay: "may I play", ee: "what can you see", igh: "fly high", "ow(snow)": "blow the snow",
  oo: "poo at the zoo", "oo(book)": "look at a book", ar: "start the car", or: "shut the door",
  air: "that's not fair", ir: "whirl and twirl", ou: "shout it out", oy: "toy for a boy",
  ea: "cup of tea", oi: "spoil the boy", "a-e": "make a cake", "i-e": "nice smile", "o-e": "phone home",
  "u-e": "huge brute", aw: "yawn at dawn", are: "care and share", ur: "nurse with a purse",
  er: "a better letter", ow: "brown cow", ai: "snail in the rain", oa: "goat in a boat",
  ew: "chew the stew", "e(he)": "he, me, we", ire: "fire fire", ear: "hear with your ear", ure: "sure it's pure",
  tion: "as in action", tious: "as in ambitious", cious: "as in delicious",
  "c(soft)": "soft, as in city", "g(soft)": "soft, as in gem", "y(ee)": "as in happy", "y(igh)": "as in fly",
  "ea(bread)": "as in bread", ie: "as in pie", ue: "as in blue", oe: "as in toe", au: "as in author",
  ey: "as in key", wh: "as in when", ph: "as in dolphin", "e-e": "as in these",
};
function gpcLabel(g) { return GPC_LABEL[g] || g; }
function gpcNote(g) { return GPC_NOTE[g] || ""; }

/* Vowel graphemes — used to detect adjacent consonants (Word Time 1.7). */
const VOWEL_GPCS = new Set([
  "a", "e", "i", "o", "u", "ai", "ee", "igh", "oa", "oo", "oo(book)", "ar", "or", "ur", "ow", "oi", "ear", "air", "er",
  "ay", "ou", "ie", "ea", "oy", "ir", "ue", "aw", "ew", "oe", "au", "ey", "are", "ire", "ure", "e(he)",
  "a-e", "e-e", "i-e", "o-e", "u-e", "y(ee)", "y(igh)", "ea(bread)", "ow(snow)",
]);

/* ------------------------------------------------------------------ */
/* Red Words: which part is the tricky bit                             */
/* ------------------------------------------------------------------ */
/* RWI calls the words children can't sound out yet Red Words ("you can't
 * Fred a Red"). The lists by level are the words RWI's storybooks use at
 * each colour, first appearance only: Ditty words at Level 6, Green 8,
 * Purple 9, Pink 10, Orange 12, Yellow 13, Blue 14, Grey 18. Some are only
 * red for now: "paint" needs ai (Set 3), "saw" needs aw.
 *
 * Most of a Red Word is still regular, so each entry lists the word's parts
 * with a flag for the tricky one(s), plus a one-line note for the grown-up.
 * The internal key stays "tricky" so saved progress carries over. */
const TRICKY_PARTS = {
  I: { parts: [["I", 1]], note: "says its letter name" },
  the: { parts: [["th", 0], ["e", 1]], note: "the e says /uh/" },
  put: { parts: [["p", 0], ["u", 1], ["t", 0]], note: "the u says /oo/, as in look" },
  no: { parts: [["n", 0], ["o", 1]], note: "the o says /oa/" },
  of: { parts: [["o", 0], ["f", 1]], note: "the f says /v/" },
  my: { parts: [["m", 0], ["y", 1]], note: "the y says /igh/" },
  he: { parts: [["h", 0], ["e", 1]], note: "the e says /ee/ — Set 3 teaches it as “e: he”, and then it's green" },
  your: { parts: [["y", 0], ["our", 1]], note: "our says /or/" },
  said: { parts: [["s", 0], ["ai", 1], ["d", 0]], note: "ai says /e/" },
  you: { parts: [["y", 0], ["ou", 1]], note: "ou says /oo/ here, not /ow/" },
  be: { parts: [["b", 0], ["e", 1]], note: "the e says /ee/" },
  to: { parts: [["t", 0], ["o", 1]], note: "the o says /oo/" },
  me: { parts: [["m", 0], ["e", 1]], note: "the e says /ee/" },
  go: { parts: [["g", 0], ["o", 1]], note: "the o says /oa/" },
  baby: { parts: [["b", 0], ["a", 1], ["b", 0], ["y", 1]], note: "the a says /ay/, the y says /ee/" },
  are: { parts: [["are", 1]], note: "the whole word says /ar/" },
  paint: { parts: [["p", 0], ["ai", 1], ["n", 0], ["t", 0]], note: "ai isn't a Speed Sound yet (it's Set 3, “snail in the rain”) — it says /ay/" },
  all: { parts: [["a", 1], ["ll", 0]], note: "the a says /or/" },
  like: { parts: [["l", 0], ["i", 1], ["k", 0], ["e", 1]], note: "the i and e work together to say /igh/ (Set 3's i-e, “nice smile”)" },
  "I've": { parts: [["I", 1], ["'ve", 1]], note: "short for I have — says /ive/" },
  want: { parts: [["w", 0], ["a", 1], ["n", 0], ["t", 0]], note: "the a says /o/" },
  we: { parts: [["w", 0], ["e", 1]], note: "the e says /ee/" },
  her: { parts: [["h", 0], ["er", 1]], note: "er says /ur/" },
  she: { parts: [["sh", 0], ["e", 1]], note: "the e says /ee/" },
  washing: { parts: [["w", 0], ["a", 1], ["sh", 0], ["i", 0], ["ng", 0]], note: "the a says /o/" },
  some: { parts: [["s", 0], ["o", 1], ["m", 0], ["e", 1]], note: "the o says /u/, the e is silent" },
  so: { parts: [["s", 0], ["o", 1]], note: "the o says /oa/" },
  what: { parts: [["wh", 1], ["a", 1], ["t", 0]], note: "wh says /w/, the a says /o/" },
  they: { parts: [["th", 0], ["ey", 1]], note: "ey says /ay/" },
  do: { parts: [["d", 0], ["o", 1]], note: "the o says /oo/" },
  old: { parts: [["o", 1], ["l", 0], ["d", 0]], note: "the o says /oa/" },
  was: { parts: [["w", 0], ["a", 1], ["s", 1]], note: "the a says /o/ and the s says /z/" },
  call: { parts: [["c", 0], ["a", 1], ["ll", 0]], note: "the a says /or/" },
  saw: { parts: [["s", 0], ["aw", 1]], note: "aw isn't a Speed Sound yet (Set 3, “yawn at dawn”) — it says /or/" },
  watch: { parts: [["w", 0], ["a", 1], ["tch", 1]], note: "the a says /o/, tch says /ch/" },
  school: { parts: [["s", 0], ["ch", 1], ["oo", 0], ["l", 0]], note: "ch says /c/" },
  small: { parts: [["s", 0], ["m", 0], ["a", 1], ["ll", 0]], note: "the a says /or/" },
  their: { parts: [["th", 0], ["eir", 1]], note: "eir says /air/" },
  who: { parts: [["wh", 1], ["o", 1]], note: "wh says /h/, the o says /oo/" },
  tall: { parts: [["t", 0], ["a", 1], ["ll", 0]], note: "the a says /or/" },
  brother: { parts: [["b", 0], ["r", 0], ["o", 1], ["th", 0], ["er", 0]], note: "the o says /u/" },
  were: { parts: [["w", 0], ["ere", 1]], note: "ere says /ur/" },
  "I'm": { parts: [["I", 1], ["'m", 1]], note: "short for I am — says /ime/" },
  there: { parts: [["th", 0], ["ere", 1]], note: "ere says /air/" },
  fall: { parts: [["f", 0], ["a", 1], ["ll", 0]], note: "the a says /or/" },
  any: { parts: [["a", 1], ["n", 0], ["y", 1]], note: "the a says /e/, the y says /ee/" },
  where: { parts: [["wh", 1], ["ere", 1]], note: "wh says /w/, ere says /air/" },
  wall: { parts: [["w", 0], ["a", 1], ["ll", 0]], note: "the a says /or/" },
  does: { parts: [["d", 0], ["oe", 1], ["s", 1]], note: "oe says /u/, the s says /z/" },
  one: { parts: [["one", 1]], note: "the whole word says /wun/" },
  other: { parts: [["o", 1], ["th", 0], ["er", 0]], note: "the o says /u/" },
  two: { parts: [["t", 0], ["wo", 1]], note: "wo says /oo/" },
  could: { parts: [["c", 0], ["oul", 1], ["d", 0]], note: "oul says /oo/, as in look" },
  ball: { parts: [["b", 0], ["a", 1], ["ll", 0]], note: "the a says /or/" },
  would: { parts: [["w", 0], ["oul", 1], ["d", 0]], note: "oul says /oo/, as in look" },
  water: { parts: [["w", 0], ["a", 1], ["t", 0], ["er", 0]], note: "the a says /or/" },
  wash: { parts: [["w", 0], ["a", 1], ["sh", 0]], note: "the a says /o/" },
  anyone: { parts: [["a", 1], ["n", 0], ["y", 1], ["one", 1]], note: "any + one: the a says /e/, the y says /ee/, one says /wun/" },
  over: { parts: [["o", 1], ["v", 0], ["er", 0]], note: "the o says /oa/" },
  "wasn't": { parts: [["w", 0], ["a", 1], ["s", 1], ["n't", 0]], note: "was + not: the a says /o/, the s says /z/" },
  through: { parts: [["th", 0], ["r", 0], ["ough", 1]], note: "ough says /oo/" },
  once: { parts: [["o", 1], ["n", 0], ["ce", 1]], note: "the o says /wu/, ce says /s/" },
  son: { parts: [["s", 0], ["o", 1], ["n", 0]], note: "the o says /u/" },
  whole: { parts: [["wh", 1], ["o", 0], ["l", 0], ["e", 0]], note: "wh says /h/; o and e work together (o-e, “phone home”)" },
  people: { parts: [["p", 0], ["eo", 1], ["p", 0], ["le", 1]], note: "eo says /ee/, le says /l/" },
  should: { parts: [["sh", 0], ["oul", 1], ["d", 0]], note: "oul says /oo/, as in look" },
  come: { parts: [["c", 0], ["o", 1], ["m", 0], ["e", 1]], note: "the o says /u/, the e is silent" },
  many: { parts: [["m", 0], ["a", 1], ["n", 0], ["y", 1]], note: "the a says /e/, the y says /ee/" },
  mother: { parts: [["m", 0], ["o", 1], ["th", 0], ["er", 0]], note: "the o says /u/" },
  father: { parts: [["f", 0], ["a", 1], ["th", 0], ["er", 0]], note: "the a says /ar/" },
  here: { parts: [["h", 0], ["ere", 1]], note: "ere says /ear/" },
  buy: { parts: [["b", 0], ["uy", 1]], note: "uy says /igh/" },
  bought: { parts: [["b", 0], ["ough", 1], ["t", 0]], note: "ough says /or/" },
  great: { parts: [["g", 0], ["r", 0], ["ea", 1], ["t", 0]], note: "ea says /ay/ here, not /ee/" },
  above: { parts: [["a", 1], ["b", 0], ["o", 1], ["v", 0], ["e", 1]], note: "the a and the o both say /u/, the e is silent" },
  someone: { parts: [["s", 0], ["o", 1], ["m", 0], ["e", 1], ["one", 1]], note: "some + one: the o says /u/, one says /wun/" },
  another: { parts: [["a", 1], ["n", 0], ["o", 1], ["th", 0], ["er", 0]], note: "the a and the o both say /u/" },
  walk: { parts: [["w", 0], ["al", 1], ["k", 0]], note: "al says /or/" },
  caught: { parts: [["c", 0], ["augh", 1], ["t", 0]], note: "augh says /or/" },
  worse: { parts: [["w", 0], ["or", 1], ["se", 1]], note: "or says /ur/, se says /s/" },
  everyone: { parts: [["e", 0], ["v", 0], ["er", 0], ["y", 1], ["one", 1]], note: "every + one: the y says /ee/, one says /wun/" },
  love: { parts: [["l", 0], ["o", 1], ["v", 0], ["e", 1]], note: "the o says /u/, the e is silent" },
  wear: { parts: [["w", 0], ["ear", 1]], note: "ear says /air/ here, not /ear/" },
};

/* ------------------------------------------------------------------ */
/* Sound examples (grey box when a tile is clicked)                    */
/* ------------------------------------------------------------------ */
/* Each list must be readable at the level that sound is introduced —
 * the checker enforces it. That is why Level 1 lists are short: with
 * only m a s d t there aren't many words. */
const SOUND_WORDS = {
  m: ["mat", "mad", "am"], a: ["at", "mat", "sad"], s: ["sat", "sad", "as"], d: ["dad", "mad", "sad"],
  t: ["at", "mat", "sat"], i: ["it", "sit", "pin"], n: ["nap", "tin", "man"], p: ["pat", "tap", "sap"],
  g: ["gap", "dig", "got"], o: ["on", "dog", "pot"], c: ["cat", "cap", "cot"], k: ["kit", "kid", "kip"],
  u: ["up", "sun", "cup"], b: ["bat", "bin", "bus"], f: ["fan", "fit", "fun"], e: ["net", "pen", "ten"],
  l: ["leg", "lip", "log"], h: ["hat", "hen", "hop"], sh: ["ship", "shop", "fish"], r: ["rat", "run", "red"],
  j: ["jam", "jet", "jog"], v: ["van", "vet", "vat"], y: ["yes", "yet", "yap"], w: ["wag", "web", "win"],
  th: ["this", "that", "with"], z: ["zip", "zap"], ch: ["chin", "chop", "much"], qu: ["quiz", "quit"],
  x: ["box", "fox", "six"], ng: ["ring", "sing", "long"], nk: ["pink", "sink", "bank"], ck: ["sock", "duck", "kick"],
  ff: ["off", "huff", "puff"], ll: ["bell", "hill", "doll"], ss: ["hiss", "mess", "kiss"],
  zz: ["buzz", "fizz", "jazz"], dd: ["add", "odd"], mm: ["summit", "comma"], tt: ["mitt", "kitten", "bottom"],
  bb: ["rabbit", "ribbon"], rr: ["carrot", "parrot"], gg: ["egg", "eggs"], pp: ["puppet", "happen", "hopping"],
  ay: ["day", "play", "way"], ee: ["see", "feet", "week"], igh: ["high", "night", "light"],
  "ow(snow)": ["snow", "blow", "show"], oo: ["moon", "food", "zoo"], "oo(book)": ["book", "look", "foot"],
  ar: ["car", "farm", "park"], or: ["for", "fork", "corn"], air: ["air", "hair", "fair"],
  ir: ["bird", "girl", "first"], ou: ["out", "loud", "cloud"], oy: ["boy", "toy", "joy"], ea: ["eat", "sea", "team"],
  oi: ["coin", "boil", "join"], "a-e": ["cake", "game", "made"], "i-e": ["bike", "time", "smile"],
  "o-e": ["home", "bone", "nose"], "u-e": ["cube", "tune", "flute"], aw: ["paw", "claw", "yawn"],
  are: ["care", "share", "scare"], ur: ["fur", "hurt", "burn"], er: ["letter", "better", "hammer"],
  ow: ["cow", "down", "town"], ai: ["rain", "tail", "wait"], oa: ["boat", "coat", "road"], ew: ["chew", "new", "few"],
  "e(he)": ["he", "me", "we", "she"], ire: ["fire", "wire", "tired"], ear: ["ear", "hear", "near"],
  ure: ["pure", "cure", "picture"], tion: ["action", "fiction", "section"], tious: ["ambitious", "infectious"],
  cious: ["delicious", "precious", "vicious"], ie: ["pie", "tie", "lie"], ue: ["blue", "glue", "true"],
  oe: ["toe", "goes", "hoe"], au: ["author", "haunt", "August"], ey: ["key", "donkey", "turkey"],
  wh: ["when", "wheel", "whisk"], ph: ["dolphin", "graph", "alphabet"], "e-e": ["these", "theme", "eve"],
  "y(ee)": ["happy", "silly", "very"], "y(igh)": ["fly", "cry", "sky"], "c(soft)": ["city", "ice", "race"],
  "g(soft)": ["gem", "cage", "huge"], "ea(bread)": ["bread", "head", "ready"],
};

/* ------------------------------------------------------------------ */
/* Word Sort rounds                                                    */
/* ------------------------------------------------------------------ */
/* `level` is the minimum level a round may appear at; the checker verifies
 * every word in it is readable there. Rounds are offered from the highest
 * level at or below the current one, so a sort always matches recent
 * teaching rather than being a random level. */
const WORD_SORTS = [
  { level: 2, bins: ["a", "i"], words: [["mat", "a"], ["pin", "i"], ["sat", "a"], ["sit", "i"], ["map", "a"], ["dip", "i"]] },
  { level: 3, bins: ["c", "k", "g"], words: [["cat", "c"], ["kit", "k"], ["gap", "g"], ["cot", "c"], ["kid", "k"], ["got", "g"]] },
  { level: 4, bins: ["h", "b", "f"], words: [["hat", "h"], ["bin", "b"], ["fan", "f"], ["hen", "h"], ["bat", "b"], ["fun", "f"]] },
  { level: 6, bins: ["v", "w", "x"], words: [["van", "v"], ["web", "w"], ["box", "x"], ["vet", "v"], ["wig", "w"], ["fox", "x"]] },
  { level: 6, bins: ["z", "qu", "ch"], words: [["zip", "z"], ["quiz", "qu"], ["chin", "ch"], ["zap", "z"], ["quit", "qu"], ["chop", "ch"]] },
  { level: 6, bins: ["sh", "th", "ng"], words: [["ship", "sh"], ["this", "th"], ["ring", "ng"], ["fish", "sh"], ["bath", "th"], ["long", "ng"]] },
  { level: 6, bins: ["ng", "nk"], words: [["ring", "ng"], ["pink", "nk"], ["sing", "ng"], ["sink", "nk"], ["long", "ng"], ["bank", "nk"]] },
  { level: 7, bins: ["ck", "e", "u"], words: [["sock", "ck"], ["net", "e"], ["sun", "u"], ["duck", "ck"], ["pen", "e"], ["cup", "u"]] },
  { level: 7, bins: ["ff", "ll", "ss"], words: [["huff", "ff"], ["bell", "ll"], ["mess", "ss"], ["off", "ff"], ["hill", "ll"], ["kiss", "ss"]] },
  { level: 7, bins: ["st", "fl", "cr"], words: [["stop", "st"], ["flag", "fl"], ["crab", "cr"], ["stamp", "st"], ["flap", "fl"], ["crib", "cr"]] },
  { level: 7, bins: ["-mp", "-nd", "-st"], words: [["jump", "-mp"], ["hand", "-nd"], ["nest", "-st"], ["lamp", "-mp"], ["sand", "-nd"], ["best", "-st"]] },
  { level: 8, bins: ["ay", "ee", "igh"], words: [["day", "ay"], ["see", "ee"], ["night", "igh"], ["play", "ay"], ["feet", "ee"], ["high", "igh"]] },
  { level: 9, bins: ["ow(snow)", "oo", "oo(book)"], words: [["snow", "ow(snow)"], ["moon", "oo"], ["book", "oo(book)"], ["blow", "ow(snow)"], ["zoo", "oo"], ["look", "oo(book)"]] },
  { level: 10, bins: ["oo", "ar", "or"], words: [["moon", "oo"], ["car", "ar"], ["for", "or"], ["zoo", "oo"], ["farm", "ar"], ["corn", "or"]] },
  { level: 12, bins: ["ea", "oi", "a-e"], words: [["sea", "ea"], ["coin", "oi"], ["cake", "a-e"], ["team", "ea"], ["boil", "oi"], ["game", "a-e"]] },
  { level: 13, bins: ["a-e", "i-e", "o-e"], words: [["cake", "a-e"], ["bike", "i-e"], ["home", "o-e"], ["game", "a-e"], ["time", "i-e"], ["bone", "o-e"]] },
  { level: 14, bins: ["oy", "ir", "aw"], words: [["boy", "oy"], ["bird", "ir"], ["jaw", "aw"], ["toy", "oy"], ["girl", "ir"], ["paw", "aw"]] },
  { level: 14, bins: ["aw", "ur", "er"], words: [["paw", "aw"], ["fur", "ur"], ["letter", "er"], ["claw", "aw"], ["hurt", "ur"], ["better", "er"]] },
  { level: 15, bins: ["ai", "ee", "igh"], words: [["rain", "ai"], ["feet", "ee"], ["night", "igh"], ["tail", "ai"], ["see", "ee"], ["high", "igh"]] },
  { level: 15, bins: ["ow", "oi", "ur"], words: [["cow", "ow"], ["coin", "oi"], ["fur", "ur"], ["down", "ow"], ["boil", "oi"], ["hurt", "ur"]] },
  { level: 15, bins: ["ai", "ee", "oa"], words: [["train", "ai"], ["sleep", "ee"], ["float", "oa"], ["brain", "ai"], ["green", "ee"], ["toast", "oa"]] },
  { level: 15, bins: ["ow", "ai", "oa"], words: [["cow", "ow"], ["rain", "ai"], ["boat", "oa"], ["down", "ow"], ["tail", "ai"], ["coat", "oa"]] },
  { level: 15, bins: ["ow(snow)", "ow"], words: [["snow", "ow(snow)"], ["cow", "ow"], ["blow", "ow(snow)"], ["down", "ow"], ["show", "ow(snow)"], ["town", "ow"]] },
  { level: 16, bins: ["ear", "air", "er"], words: [["ear", "ear"], ["hair", "air"], ["hammer", "er"], ["near", "ear"], ["fair", "air"], ["letter", "er"]] },
  { level: 18, bins: ["ay", "ou", "ie"], words: [["day", "ay"], ["out", "ou"], ["pie", "ie"], ["play", "ay"], ["loud", "ou"], ["tie", "ie"]] },
  { level: 18, bins: ["wh", "ph", "ew"], words: [["when", "wh"], ["graph", "ph"], ["new", "ew"], ["wheel", "wh"], ["dolphin", "ph"], ["chew", "ew"]] },
  { level: 18, bins: ["c(soft)", "g(soft)"], words: [["city", "c(soft)"], ["gem", "g(soft)"], ["ice", "c(soft)"], ["cage", "g(soft)"], ["race", "c(soft)"], ["huge", "g(soft)"]] },
];

/* ------------------------------------------------------------------ */
/* Word Wheels                                                         */
/* ------------------------------------------------------------------ */
/* An ending in the middle, beginnings round the outside. Each part carries
 * its own GPCs so the composed word's breakdown is explicit (and so a rime
 * like "ow" in snow can't be mistaken for the ow in cow). */
const WORD_WHEELS = [
  { level: 2, rime: "at", rimeGpcs: ["a", "t"], onsets: [["s", ["s"]], ["p", ["p"]], ["m", ["m"]]] },
  { level: 2, rime: "ip", rimeGpcs: ["i", "p"], onsets: [["s", ["s"]], ["t", ["t"]], ["d", ["d"]], ["n", ["n"]]] },
  { level: 2, rime: "ap", rimeGpcs: ["a", "p"], onsets: [["t", ["t"]], ["m", ["m"]], ["n", ["n"]], ["s", ["s"]]] },
  { level: 3, rime: "ot", rimeGpcs: ["o", "t"], onsets: [["c", ["c"]], ["d", ["d"]], ["g", ["g"]], ["p", ["p"]]] },
  { level: 3, rime: "an", rimeGpcs: ["a", "n"], onsets: [["c", ["c"]], ["m", ["m"]], ["p", ["p"]], ["t", ["t"]]] },
  { level: 3, rime: "et", rimeGpcs: ["e", "t"], onsets: [["n", ["n"]], ["p", ["p"]], ["g", ["g"]], ["m", ["m"]], ["s", ["s"]]] },
  { level: 3, rime: "ig", rimeGpcs: ["i", "g"], onsets: [["b", ["b"]], ["d", ["d"]], ["f", ["f"]], ["p", ["p"]]] },
  { level: 4, rime: "ug", rimeGpcs: ["u", "g"], onsets: [["r", ["r"]], ["m", ["m"]], ["d", ["d"]], ["t", ["t"]], ["p", ["p"]]] },
  { level: 4, rime: "op", rimeGpcs: ["o", "p"], onsets: [["h", ["h"]], ["m", ["m"]], ["p", ["p"]], ["t", ["t"]], ["c", ["c"]]] },
  { level: 4, rime: "ut", rimeGpcs: ["u", "t"], onsets: [["b", ["b"]], ["c", ["c"]], ["h", ["h"]], ["n", ["n"]]] },
  { level: 4, rime: "ash", rimeGpcs: ["a", "sh"], onsets: [["c", ["c"]], ["m", ["m"]], ["d", ["d"]], ["r", ["r"]], ["b", ["b"]]] },
  { level: 5, rime: "et", rimeGpcs: ["e", "t"], onsets: [["v", ["v"]], ["w", ["w"]], ["y", ["y"]], ["j", ["j"]]] },
  { level: 5, rime: "ig", rimeGpcs: ["i", "g"], onsets: [["w", ["w"]], ["b", ["b"]], ["d", ["d"]], ["f", ["f"]], ["p", ["p"]]] },
  { level: 6, rime: "ip", rimeGpcs: ["i", "p"], onsets: [["z", ["z"]], ["ch", ["ch"]], ["d", ["d"]], ["h", ["h"]], ["l", ["l"]], ["n", ["n"]]] },
  { level: 6, rime: "op", rimeGpcs: ["o", "p"], onsets: [["ch", ["ch"]], ["h", ["h"]], ["m", ["m"]], ["p", ["p"]], ["t", ["t"]]] },
  { level: 6, rime: "ing", rimeGpcs: ["i", "ng"], onsets: [["k", ["k"]], ["r", ["r"]], ["s", ["s"]], ["w", ["w"]], ["th", ["th"]]] },
  { level: 6, rime: "ink", rimeGpcs: ["i", "nk"], onsets: [["p", ["p"]], ["s", ["s"]], ["w", ["w"]], ["th", ["th"]], ["l", ["l"]]] },
  { level: 7, rime: "ell", rimeGpcs: ["e", "ll"], onsets: [["b", ["b"]], ["f", ["f"]], ["s", ["s"]], ["t", ["t"]]] },
  { level: 7, rime: "iss", rimeGpcs: ["i", "ss"], onsets: [["h", ["h"]], ["k", ["k"]], ["m", ["m"]]] },
  { level: 7, rime: "uff", rimeGpcs: ["u", "ff"], onsets: [["h", ["h"]], ["p", ["p"]], ["c", ["c"]], ["m", ["m"]]] },
  { level: 7, rime: "amp", rimeGpcs: ["a", "m", "p"], onsets: [["c", ["c"]], ["d", ["d"]], ["l", ["l"]], ["r", ["r"]], ["st", ["s", "t"]], ["ch", ["ch"]]] },
  { level: 7, rime: "and", rimeGpcs: ["a", "n", "d"], onsets: [["b", ["b"]], ["h", ["h"]], ["l", ["l"]], ["s", ["s"]], ["st", ["s", "t"]], ["gr", ["g", "r"]]] },
  { level: 7, rime: "est", rimeGpcs: ["e", "s", "t"], onsets: [["b", ["b"]], ["n", ["n"]], ["r", ["r"]], ["t", ["t"]], ["ch", ["ch"]], ["v", ["v"]]] },
  { level: 8, rime: "eep", rimeGpcs: ["ee", "p"], onsets: [["b", ["b"]], ["d", ["d"]], ["k", ["k"]], ["p", ["p"]], ["j", ["j"]], ["sh", ["sh"]]] },
  { level: 8, rime: "ight", rimeGpcs: ["igh", "t"], onsets: [["f", ["f"]], ["l", ["l"]], ["m", ["m"]], ["n", ["n"]], ["r", ["r"]], ["s", ["s"]], ["t", ["t"]]] },
  { level: 8, rime: "eep", rimeGpcs: ["ee", "p"], onsets: [["sl", ["s", "l"]], ["st", ["s", "t"]], ["sw", ["s", "w"]], ["cr", ["c", "r"]], ["sh", ["sh"]]] },
  { level: 8, rime: "eet", rimeGpcs: ["ee", "t"], onsets: [["f", ["f"]], ["m", ["m"]], ["sw", ["s", "w"]], ["sh", ["sh"]], ["str", ["s", "t", "r"]]] },
  { level: 8, rime: "ay", rimeGpcs: ["ay"], onsets: [["d", ["d"]], ["m", ["m"]], ["p", ["p"]], ["s", ["s"]], ["w", ["w"]], ["pl", ["p", "l"]], ["st", ["s", "t"]], ["tr", ["t", "r"]]] },
  { level: 8, rime: "eel", rimeGpcs: ["ee", "l"], onsets: [["f", ["f"]], ["h", ["h"]], ["p", ["p"]], ["st", ["s", "t"]]] },
  { level: 9, rime: "oon", rimeGpcs: ["oo", "n"], onsets: [["m", ["m"]], ["n", ["n"]], ["s", ["s"]]] },
  { level: 9, rime: "ook", rimeGpcs: ["oo(book)", "k"], onsets: [["b", ["b"]], ["c", ["c"]], ["h", ["h"]], ["l", ["l"]], ["t", ["t"]]] },
  { level: 9, rime: "ow", rimeGpcs: ["ow(snow)"], onsets: [["sn", ["s", "n"]], ["bl", ["b", "l"]], ["gl", ["g", "l"]], ["sl", ["s", "l"]], ["gr", ["g", "r"]], ["sh", ["sh"]], ["thr", ["th", "r"]]] },
  { level: 10, rime: "ar", rimeGpcs: ["ar"], onsets: [["c", ["c"]], ["f", ["f"]], ["j", ["j"]], ["t", ["t"]]] },
  { level: 10, rime: "ork", rimeGpcs: ["or", "k"], onsets: [["c", ["c"]], ["f", ["f"]], ["p", ["p"]]] },
  { level: 10, rime: "air", rimeGpcs: ["air"], onsets: [["h", ["h"]], ["f", ["f"]], ["p", ["p"]], ["ch", ["ch"]]] },
  { level: 11, rime: "ound", rimeGpcs: ["ou", "n", "d"], onsets: [["f", ["f"]], ["s", ["s"]], ["r", ["r"]], ["p", ["p"]], ["gr", ["g", "r"]], ["h", ["h"]]] },
  { level: 11, rime: "oy", rimeGpcs: ["oy"], onsets: [["b", ["b"]], ["t", ["t"]], ["j", ["j"]]] },
  { level: 12, rime: "oil", rimeGpcs: ["oi", "l"], onsets: [["b", ["b"]], ["f", ["f"]], ["s", ["s"]]] },
  { level: 12, rime: "ake", rimeGpcs: ["a-e", "k"], onsets: [["b", ["b"]], ["c", ["c"]], ["l", ["l"]], ["m", ["m"]], ["r", ["r"]], ["t", ["t"]], ["w", ["w"]], ["sn", ["s", "n"]], ["sh", ["sh"]]] },
  { level: 13, rime: "ine", rimeGpcs: ["i-e", "n"], onsets: [["d", ["d"]], ["f", ["f"]], ["l", ["l"]], ["m", ["m"]], ["n", ["n"]], ["p", ["p"]], ["v", ["v"]], ["sh", ["sh"]], ["sp", ["s", "p"]]] },
  { level: 13, rime: "ope", rimeGpcs: ["o-e", "p"], onsets: [["h", ["h"]], ["r", ["r"]], ["sl", ["s", "l"]], ["sc", ["s", "c"]]] },
  { level: 14, rime: "aw", rimeGpcs: ["aw"], onsets: [["p", ["p"]], ["j", ["j"]], ["r", ["r"]], ["cl", ["c", "l"]], ["dr", ["d", "r"]], ["str", ["s", "t", "r"]]] },
  { level: 14, rime: "are", rimeGpcs: ["are"], onsets: [["c", ["c"]], ["d", ["d"]], ["sh", ["sh"]], ["st", ["s", "t"]], ["sc", ["s", "c"]]] },
  { level: 15, rime: "ain", rimeGpcs: ["ai", "n"], onsets: [["m", ["m"]], ["p", ["p"]], ["r", ["r"]], ["g", ["g"]], ["ch", ["ch"]]] },
  { level: 15, rime: "oat", rimeGpcs: ["oa", "t"], onsets: [["b", ["b"]], ["c", ["c"]], ["g", ["g"]]] },
  { level: 15, rime: "ow", rimeGpcs: ["ow"], onsets: [["c", ["c"]], ["h", ["h"]], ["n", ["n"]], ["w", ["w"]]] },
  { level: 15, rime: "ain", rimeGpcs: ["ai", "n"], onsets: [["tr", ["t", "r"]], ["br", ["b", "r"]], ["gr", ["g", "r"]], ["dr", ["d", "r"]], ["ch", ["ch"]], ["st", ["s", "t"]]] },
  { level: 15, rime: "ew", rimeGpcs: ["ew"], onsets: [["ch", ["ch"]], ["n", ["n"]], ["f", ["f"]], ["d", ["d"]], ["st", ["s", "t"]], ["bl", ["b", "l"]], ["gr", ["g", "r"]]] },
  { level: 16, rime: "ear", rimeGpcs: ["ear"], onsets: [["h", ["h"]], ["n", ["n"]], ["d", ["d"]], ["f", ["f"]], ["y", ["y"]]] },
  { level: 16, rime: "ire", rimeGpcs: ["ire"], onsets: [["f", ["f"]], ["h", ["h"]], ["w", ["w"]], ["sp", ["s", "p"]]] },
  { level: 18, rime: "ie", rimeGpcs: ["ie"], onsets: [["p", ["p"]], ["t", ["t"]], ["l", ["l"]], ["d", ["d"]]] },
  { level: 18, rime: "ice", rimeGpcs: ["i-e", "c(soft)"], onsets: [["d", ["d"]], ["m", ["m"]], ["n", ["n"]], ["r", ["r"]], ["sl", ["s", "l"]], ["pr", ["p", "r"]], ["tw", ["t", "w"]], ["sp", ["s", "p"]]] },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

function unitData(n) { return UNITS.find((u) => u.n === Number(n)) || UNITS[0]; }
function unitsUpTo(n) { return UNITS.filter((u) => u.n <= Number(n)); }
function soundsUpTo(n) { return unitsUpTo(n).flatMap((u) => u.sounds); }
function trickyUpTo(n) { return unitsUpTo(n).flatMap((u) => u.tricky); }

const _intro = {};
UNITS.forEach((u) => { u.sounds.forEach((s) => { if (!(s in _intro)) _intro[s] = u.n; }); u.tricky.forEach((t) => { _intro["tricky:" + t.toLowerCase()] = u.n; }); });
function introLevel(gpc) { return _intro[gpc] || null; }
function trickyIntroLevel(word) { return _intro["tricky:" + String(word).toLowerCase()] || null; }

/* The level a word first becomes readable, from its explicit GPC breakdown.
 * Rules beyond "every sound taught": a -s ending, or two consonant sounds in
 * a row, need Word Time 1.7 (Level 7). Returns null for a word with no
 * breakdown or with a sound that's never taught. */
function minLevelFor(gpcs) {
  if (!gpcs || !gpcs.length) return null;
  let lvl = 1;
  let prevConsonant = false;
  for (const g of gpcs) {
    if (g === "-s") { lvl = Math.max(lvl, SUFFIX_S_LEVEL); prevConsonant = false; continue; }
    const intro = introLevel(g);
    if (!intro) return null;
    lvl = Math.max(lvl, intro);
    const isVowel = VOWEL_GPCS.has(g);
    if (!isVowel && prevConsonant) lvl = Math.max(lvl, ADJACENT_LEVEL);
    prevConsonant = !isVowel;
  }
  return lvl;
}
function minLevel(word) {
  const g = typeof WORDS !== "undefined" ? WORDS[String(word).toLowerCase()] : null;
  return minLevelFor(g);
}
/* Some Red Words stop being red: "paint" is fully regular once ai is taught
 * (Level 15), "he" once Set 3's e is (Level 16). A word is red AT a level if
 * it is on the Red Word list and is not yet decodable from its GPCs. Stories
 * use this to decide whether to show a word in red. Words RWI keeps listing
 * as red after their sounds are taught (all, her, saw…) are left out of the
 * word bank on purpose, so they stay red. */
function isTrickyAt(word, level) {
  const w = String(word).toLowerCase();
  const tl = trickyIntroLevel(w);
  if (!tl) return false;
  const g = typeof WORDS !== "undefined" ? WORDS[w] : null;
  const ml = g ? minLevelFor(g) : null;
  return !(ml && ml <= Number(level));
}

function gpcsOf(word) {
  return typeof WORDS !== "undefined" ? WORDS[String(word).toLowerCase()] || null : null;
}

/* All words readable at or below a level, and the ones that first become
 * readable exactly at it. Computed from the word bank, so there's no
 * hand-kept per-level list to drift out of step. */
let _byLevel = null;
function _index() {
  if (_byLevel) return _byLevel;
  _byLevel = {};
  Object.keys(WORDS).forEach((w) => {
    const l = minLevelFor(WORDS[w]);
    if (!l) return;
    (_byLevel[l] = _byLevel[l] || []).push(w);
  });
  Object.values(_byLevel).forEach((a) => a.sort());
  return _byLevel;
}
function wordsAtLevel(n) { return (_index()[Number(n)] || []).slice(); }
function wordsUpTo(n) {
  const idx = _index();
  let out = [];
  for (let i = 1; i <= Number(n); i++) out = out.concat(idx[i] || []);
  return out;
}

/* Game boards: mostly the current level's words, topped up from earlier
 * ones. MUST be a pure function of its arguments — both screens build their
 * own board from the shared state (see tools/check-determinism.js). */
function gameWords(n, count, seed, minLen) {
  const sd = Number(seed) || 0;
  const recent = wordsAtLevel(n).concat(wordsAtLevel(Number(n) - 1));
  const earlier = wordsUpTo(Number(n) - 2);
  const pool = seededShuffle(recent, sd).concat(seededShuffle(earlier, sd + 977));
  const seen = new Set();
  const out = [];
  for (const w of pool) {
    if (seen.has(w)) continue;
    if (minLen && w.length < minLen) continue;
    seen.add(w);
    out.push(w);
    if (out.length >= (count || 12)) break;
  }
  return out;
}

function seededShuffle(list, seed) {
  const arr = list.slice();
  let x = ((Number(seed) || 0) + 1) * 9301 + 49297;
  for (let i = arr.length - 1; i > 0; i--) {
    x = (x * 9301 + 49297) % 233280;
    const j = x % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* Sorts and wheels available at a level: those with level <= n. The
 * activity offers them most-recent first so practice tracks teaching. */
function sortsUpTo(n) { return WORD_SORTS.filter((r) => r.level <= Number(n)).sort((a, b) => b.level - a.level); }
function wheelsUpTo(n) { return WORD_WHEELS.filter((r) => r.level <= Number(n)).sort((a, b) => b.level - a.level); }
function wheelWord(wheel, i) {
  const [onset, onsetGpcs] = wheel.onsets[i];
  return { word: onset + wheel.rime, gpcs: onsetGpcs.concat(wheel.rimeGpcs) };
}

/* Display chunks for sound buttons — letter order, with a split digraph's
 * two letters both tagged so they can be drawn as a pair. */
function displayChunks(word, gpcs) {
  if (!gpcs) return [{ text: word, gpc: null }];
  const out = [];
  let i = 0;
  let pendingSplit = null;
  const w = String(word);
  for (const g of gpcs) {
    if (g === "-s") { out.push({ text: w.slice(i), gpc: "s" }); i = w.length; break; }
    if (/-e$/.test(g)) {
      out.push({ text: w[i], gpc: g, split: true });
      pendingSplit = g;
      i += 1;
      continue;
    }
    const len = g.replace(/\(.*\)$/, "").length;
    out.push({ text: w.slice(i, i + len), gpc: g });
    i += len;
  }
  if (pendingSplit && i < w.length) out.push({ text: w.slice(i), gpc: pendingSplit, split: true });
  else if (i < w.length) out.push({ text: w.slice(i), gpc: null });
  return out;
}
