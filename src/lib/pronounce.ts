/**
 * Approximate German pronunciation written with English-style spelling, for beginners.
 * Rule-based (not a dictionary), so it is a guide, not perfect phonetics.
 */

const EXCEPT: Record<string, string> = {
  entschuldigung: 'ent-shool-dee-goong', entschuldigen: 'ent-shool-dee-gen', ich: 'ikh', ist: 'ist', der: 'dair', die: 'dee', das: 'dahs', und: 'oont', nicht: 'nikht', sie: 'zee', ein: 'ine', eine: 'eye-nuh',
  ja: 'yah', nein: 'nine', mit: 'mit', in: 'in', zu: 'tsoo', auf: 'owf', es: 'ess', er: 'air', wir: 'veer', ihr: 'eer',
  du: 'doo', bin: 'bin', bist: 'bist', sind: 'zint', hat: 'haht', habe: 'hah-buh', haben: 'hah-ben', von: 'fon', vor: 'for', viel: 'feel',
  vier: 'feer', danke: 'dahn-kuh', bitte: 'bit-tuh', hallo: 'hah-loh', tschüss: 'chüss', guten: 'goo-ten', tag: 'tahk', morgen: 'mor-gen',
  abend: 'ah-bent', nacht: 'nahkht', ok: 'oh-kay', okay: 'oh-kay', café: 'kah-fay', kaffee: 'kah-fay', tee: 'tay', team: 'teem', computer: 'kom-pyoo-ta',
  handy: 'hen-dee', job: 'job', party: 'par-tee', baby: 'bay-bee', e: 'ay', jetzt: 'yetst', wie: 'vee', was: 'vahs', wo: 'voh', wer: 'vair',
  wann: 'vahn', warum: 'vah-room', woher: 'voh-hair', heißt: 'hyst', heiße: 'hy-suh', heißen: 'hy-sen', euro: 'oy-roh', deutsch: 'doytch',
  deutschland: 'doytch-lahnt', herr: 'hair', frau: 'frow', mein: 'mine', dein: 'dine', sein: 'zine', kein: 'kine', zwei: 'tsvy', drei: 'dry',
  sechs: 'zeks', sieben: 'zee-ben', acht: 'ahkht', neun: 'noyn', zehn: 'tsayn', elf: 'elf', zwölf: 'tsvölf', eins: 'ines', uhr: 'oor',
};

const V = 'aeiouäöüy';
type Rule = [string, string, ('start' | 'end' | 'startVowel')?];
// longest first; matched once, left to right, never re-processed
const RULES: Rule[] = [
  ['tion', 'tsyohn'], ['tsch', 'ch'], ['sch', 'sh'], ['chs', 'ks'], ['sp', 'shp', 'start'], ['st', 'sht', 'start'],
  ['ch', 'kh'], ['ck', 'k'], ['qu', 'kv'], ['ph', 'f'], ['th', 't'], ['dt', 't', 'end'], ['ng', 'ng'], ['ig', 'ikh', 'end'],
  ['äu', 'oy'], ['eu', 'oy'], ['ei', 'eye'], ['ai', 'eye'], ['ie', 'ee'], ['au', 'ow'],
  ['äh', 'ay'], ['öh', 'ö'], ['üh', 'ü'], ['ah', 'ah'], ['eh', 'ay'], ['ih', 'ee'], ['oh', 'oh'], ['uh', 'oo'],
  ['aa', 'ah'], ['ee', 'ay'], ['oo', 'oh'], ['er', 'a', 'end'], ['tz', 'ts'], ['ss', 'ss'],
  ['ß', 'ss'], ['z', 'ts'], ['s', 'z', 'startVowel'], ['j', 'y'], ['w', 'v'], ['v', 'f'],
  ['e', 'uh', 'end'], ['b', 'p', 'end'], ['d', 't', 'end'], ['g', 'k', 'end'],
  ['ä', 'eh'], ['y', 'ü'], ['a', 'ah'], ['u', 'oo'],
];

function convert(w: string): string {
  let out = '';
  for (let i = 0; i < w.length;) {
    let hit = false;
    for (const [pat, rep, cond] of RULES) {
      if (!w.startsWith(pat, i)) continue;
      if (cond === 'start' && i !== 0) continue;
      if (cond === 'end' && i + pat.length !== w.length) continue;
      if (cond === 'startVowel' && !(i === 0 && V.includes(w[i + 1] || ''))) continue;
      // a double consonant is said once (komme → kom-uh)
      out += rep; i += pat.length; hit = true; break;
    }
    if (!hit) { const c = w[i]; if (!(c === w[i - 1] && !V.includes(c) && c !== 's')) out += c; i++; }
  }
  return out;
}

const PREFIX = /^(ver|be|ge|er|ent|zer|emp)/;
export function pronounceWord(raw: string): string {
  const w0 = raw.toLowerCase().replace(/[^a-zäöüß-]/g, '');
  if (!w0) return raw;
  if (EXCEPT[w0]) return EXCEPT[w0];
  if (w0.includes('-')) return w0.split('-').map(pronounceWord).join('-');
  void PREFIX;
  return convert(w0);
}

export function pronounce(sentence: string): string {
  return sentence
    .split(/(\s+|[.,!?;:„“"–—…()])/)
    .map((t) => (/^[A-Za-zÄÖÜäöüß-]+$/.test(t) ? pronounceWord(t) : t.replace(/[„“"]/g, '')))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface SoundTip { sound: string; tip: string }

const TIPS: [RegExp, SoundTip][] = [
  [/ü/i, { sound: 'ü', tip: 'Say "ee" but round your lips like for "oo".' }],
  [/ö/i, { sound: 'ö', tip: 'Say "eh" but round your lips (like French "eu").' }],
  [/ä/i, { sound: 'ä', tip: 'Like "e" in "bed".' }],
  [/[aou]ch/i, { sound: 'ch (after a/o/u)', tip: 'Rough sound in the throat, like Scottish "loch" or Arabic خ.' }],
  [/[eiäöüy]ch|ch[e]/i, { sound: 'ch (after e/i)', tip: 'Soft hiss: say "h" in "huge" with your tongue high — never "k" or "sh".' }],
  [/(^|\s)(sp|st)/i, { sound: 'sp / st', tip: 'At the start of a word they sound "shp" / "sht" (Straße = SHTRAH-suh).' }],
  [/r/i, { sound: 'r', tip: 'Gargled at the back of the throat (like French r). At the end of a word, "-er" sounds like "a".' }],
  [/z/i, { sound: 'z', tip: 'Always "ts" as in "cats" (Zeit = TSITE).' }],
  [/w/i, { sound: 'w', tip: 'Like English "v" (Wasser = VAH-sa).' }],
  [/v/i, { sound: 'v', tip: 'Usually like English "f" (Vater = FAH-ta).' }],
  [/ei/i, { sound: 'ei', tip: 'Like English "eye" (mein = MINE).' }],
  [/ie/i, { sound: 'ie', tip: 'Long "ee" (Liebe = LEE-buh). Rule: ei = "eye", ie = "ee".' }],
  [/eu|äu/i, { sound: 'eu / äu', tip: 'Like "oy" in "boy" (heute = HOY-tuh).' }],
  [/ß/i, { sound: 'ß', tip: 'A sharp "ss".' }],
  [/j/i, { sound: 'j', tip: 'Like English "y" (ja = YAH).' }],
  [/(^|\s)s[aeiouäöü]/i, { sound: 's + vowel', tip: 'Voiced like English "z" (Sonne = ZON-nuh).' }],
  [/[bdg](\s|[.,!?]|$)/i, { sound: 'final b/d/g', tip: 'At the end of a word they become p/t/k (Hund = HOONT).' }],
];

export function soundTips(sentence: string): SoundTip[] {
  return TIPS.filter(([re]) => re.test(sentence)).map(([, t]) => t).slice(0, 5);
}
