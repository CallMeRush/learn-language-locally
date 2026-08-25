const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const files = [
  ...fs.readdirSync(path.join(root, "data", "vocabulary")).map((f) => path.join(root, "data", "vocabulary", f)),
  ...fs.readdirSync(path.join(root, "data", "verbs")).map((f) => path.join(root, "data", "verbs", f)),
].filter((f) => f.endsWith(".js"));

const fixes = {
  3: "porta", 10: "cucina", 13: "parete", 20: "doccia", 25: "cuscino", 35: "cassetto",
  217: "curioso", 380: "foresta", 392: "foresta", 445: "innamorato",
  43: "scusa/mi scusi", 45: "a presto", 48: "buonasera", 50: "a dopo", 67: "sorella",
  103: "torta", 117: "torta", 119: "conto", 135: "museo", 136: "cinema", 148: "municipio",
  173: "amichevole", 174: "educato", 185: "brutto", 187: "amichevole", 188: "educato",
  212: "intelligente", 237: "peggiore", 239: "più grande/più alto", 247: "più giovane",
  266: "settimana", 267: "giorno", 277: "aeroporto", 288: "dritto", 308: "testa",
  317: "medicina", 334: "tablet", 341: "conto", 348: "economico", 383: "mare",
  414: "compito", 422: "compito", 467: "cintura", 472: "guanto", 481: "elegante",
  482: "moderno", 487: "guanto", 488: "cintura", 494: "esame", 500: "frase",
  501: "grammatica", 504: "dizionario", 507: "esame", 510: "dizionario", 512: "grammatica",
  533: "documento", 547: "barzelletta", 608: "evento",
  550: "routine", 556: "conto", 574: "terra", 575: "elettricità", 586: "elettricità",
  613: "venire", 615: "imparare", 616: "parlare", 618: "scrivere", 629: "dormire",
  631: "cucinare", 632: "lavare", 633: "pulire", 635: "chiedere", 636: "rispondere",
  643: "rispondere", 659: "salvare", 660: "salvare", 662: "brillare", 670: "sperare",
  671: "credere", 672: "ridere", 673: "piangere", 684: "caricare", 685: "salvare",
  663: "iniziare", 667: "discutere", 696: "separare", 698: "ballare", 709: "accendere",
  710: "chiamare", 711: "venire con", 719: "continuare",
  720: "avere luogo", 724: "potere/essere autorizzato a",
};

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const context = {};
  vm.createContext(context);
  const nameMatch = source.match(/^const\s+([A-Za-z_$][\w$]*)\s*=/m);
  if (!nameMatch) throw new Error(`Expected one array declaration in ${file}`);
  const name = nameMatch[1];
  vm.runInContext(`${source}\nthis.__data = ${name};`, context, { filename: file });
  let changed = 0;
  const records = context.__data.map((record) => {
    const id = Number(record.id);
    const next = JSON.parse(JSON.stringify(record));
    if (fixes[id] && next.translations?.it) {
      next.translations.it.text = fixes[id];
      changed++;
    } else if (next.translations?.it?.text) {
      const trimmed = next.translations.it.text.trim().replace(/^[`"“”‘’]+|[`"“”‘’]+$/g, "");
      if (trimmed !== next.translations.it.text) {
        next.translations.it.text = trimmed;
        changed++;
      }
    }
    return next;
  });
  if (changed) {
    fs.writeFileSync(file, `const ${name} = ${JSON.stringify(records, null, 2)};\n`);
    console.log(`${path.relative(root, file)}: ${changed} Italian records rebuilt/normalized`);
  }
}
