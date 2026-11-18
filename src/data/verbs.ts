import type { Level } from '../types';

/**
 * Verb table. `p` = present (ich du er wir ihr sie) — omitted for fully regular verbs.
 * `pt` = Präteritum ich/er form, `p2` = Partizip II, `aux` = 's' when Perfekt uses sein.
 */
export interface Verb { inf: string; en: string; lv: Level; p?: string; pt: string; p2: string; aux?: 's' }

export const VERBS: Verb[] = [
  { inf: 'sein', en: 'to be', lv: 'A1', p: 'bin bist ist sind seid sind', pt: 'war', p2: 'gewesen', aux: 's' },
  { inf: 'haben', en: 'to have', lv: 'A1', p: 'habe hast hat haben habt haben', pt: 'hatte', p2: 'gehabt' },
  { inf: 'werden', en: 'to become', lv: 'A1', p: 'werde wirst wird werden werdet werden', pt: 'wurde', p2: 'geworden', aux: 's' },
  { inf: 'machen', en: 'to do / make', lv: 'A1', pt: 'machte', p2: 'gemacht' },
  { inf: 'wohnen', en: 'to live', lv: 'A1', pt: 'wohnte', p2: 'gewohnt' },
  { inf: 'lernen', en: 'to learn', lv: 'A1', pt: 'lernte', p2: 'gelernt' },
  { inf: 'arbeiten', en: 'to work', lv: 'A1', pt: 'arbeitete', p2: 'gearbeitet' },
  { inf: 'spielen', en: 'to play', lv: 'A1', pt: 'spielte', p2: 'gespielt' },
  { inf: 'kaufen', en: 'to buy', lv: 'A1', pt: 'kaufte', p2: 'gekauft' },
  { inf: 'kochen', en: 'to cook', lv: 'A1', pt: 'kochte', p2: 'gekocht' },
  { inf: 'hören', en: 'to hear', lv: 'A1', pt: 'hörte', p2: 'gehört' },
  { inf: 'fragen', en: 'to ask', lv: 'A1', pt: 'fragte', p2: 'gefragt' },
  { inf: 'sagen', en: 'to say', lv: 'A1', pt: 'sagte', p2: 'gesagt' },
  { inf: 'kosten', en: 'to cost', lv: 'A1', pt: 'kostete', p2: 'gekostet' },
  { inf: 'tanzen', en: 'to dance', lv: 'A1', p: 'tanze tanzt tanzt tanzen tanzt tanzen', pt: 'tanzte', p2: 'getanzt' },
  { inf: 'heißen', en: 'to be called', lv: 'A1', p: 'heiße heißt heißt heißen heißt heißen', pt: 'hieß', p2: 'geheißen' },
  { inf: 'gehen', en: 'to go', lv: 'A1', pt: 'ging', p2: 'gegangen', aux: 's' },
  { inf: 'kommen', en: 'to come', lv: 'A1', pt: 'kam', p2: 'gekommen', aux: 's' },
  { inf: 'trinken', en: 'to drink', lv: 'A1', pt: 'trank', p2: 'getrunken' },
  { inf: 'schreiben', en: 'to write', lv: 'A1', pt: 'schrieb', p2: 'geschrieben' },
  { inf: 'finden', en: 'to find', lv: 'A1', p: 'finde findest findet finden findet finden', pt: 'fand', p2: 'gefunden' },
  { inf: 'essen', en: 'to eat', lv: 'A1', p: 'esse isst isst essen esst essen', pt: 'aß', p2: 'gegessen' },
  { inf: 'sprechen', en: 'to speak', lv: 'A1', p: 'spreche sprichst spricht sprechen sprecht sprechen', pt: 'sprach', p2: 'gesprochen' },
  { inf: 'sehen', en: 'to see', lv: 'A1', p: 'sehe siehst sieht sehen seht sehen', pt: 'sah', p2: 'gesehen' },
  { inf: 'lesen', en: 'to read', lv: 'A1', p: 'lese liest liest lesen lest lesen', pt: 'las', p2: 'gelesen' },
  { inf: 'nehmen', en: 'to take', lv: 'A1', p: 'nehme nimmst nimmt nehmen nehmt nehmen', pt: 'nahm', p2: 'genommen' },
  { inf: 'geben', en: 'to give', lv: 'A1', p: 'gebe gibst gibt geben gebt geben', pt: 'gab', p2: 'gegeben' },
  { inf: 'fahren', en: 'to drive / go', lv: 'A1', p: 'fahre fährst fährt fahren fahrt fahren', pt: 'fuhr', p2: 'gefahren', aux: 's' },
  { inf: 'schlafen', en: 'to sleep', lv: 'A1', p: 'schlafe schläfst schläft schlafen schlaft schlafen', pt: 'schlief', p2: 'geschlafen' },
  { inf: 'laufen', en: 'to run / walk', lv: 'A1', p: 'laufe läufst läuft laufen lauft laufen', pt: 'lief', p2: 'gelaufen', aux: 's' },
  { inf: 'wissen', en: 'to know (fact)', lv: 'A1', p: 'weiß weißt weiß wissen wisst wissen', pt: 'wusste', p2: 'gewusst' },
  { inf: 'können', en: 'can', lv: 'A1', p: 'kann kannst kann können könnt können', pt: 'konnte', p2: 'gekonnt' },
  { inf: 'müssen', en: 'must', lv: 'A1', p: 'muss musst muss müssen müsst müssen', pt: 'musste', p2: 'gemusst' },
  { inf: 'wollen', en: 'to want', lv: 'A1', p: 'will willst will wollen wollt wollen', pt: 'wollte', p2: 'gewollt' },
  { inf: 'dürfen', en: 'may', lv: 'A1', p: 'darf darfst darf dürfen dürft dürfen', pt: 'durfte', p2: 'gedurft' },
  { inf: 'mögen', en: 'to like', lv: 'A1', p: 'mag magst mag mögen mögt mögen', pt: 'mochte', p2: 'gemocht' },
  { inf: 'einkaufen', en: 'to shop', lv: 'A1', p: 'kaufe ein|kaufst ein|kauft ein|kaufen ein|kauft ein|kaufen ein', pt: 'kaufte ein', p2: 'eingekauft' },
  { inf: 'aufstehen', en: 'to get up', lv: 'A1', p: 'stehe auf|stehst auf|steht auf|stehen auf|steht auf|stehen auf', pt: 'stand auf', p2: 'aufgestanden', aux: 's' },
  { inf: 'anrufen', en: 'to call', lv: 'A1', p: 'rufe an|rufst an|ruft an|rufen an|ruft an|rufen an', pt: 'rief an', p2: 'angerufen' },
  { inf: 'helfen', en: 'to help', lv: 'A2', p: 'helfe hilfst hilft helfen helft helfen', pt: 'half', p2: 'geholfen' },
  { inf: 'treffen', en: 'to meet', lv: 'A2', p: 'treffe triffst trifft treffen trefft treffen', pt: 'traf', p2: 'getroffen' },
  { inf: 'vergessen', en: 'to forget', lv: 'A2', p: 'vergesse vergisst vergisst vergessen vergesst vergessen', pt: 'vergaß', p2: 'vergessen' },
  { inf: 'bleiben', en: 'to stay', lv: 'A2', pt: 'blieb', p2: 'geblieben', aux: 's' },
  { inf: 'fliegen', en: 'to fly', lv: 'A2', pt: 'flog', p2: 'geflogen', aux: 's' },
  { inf: 'verstehen', en: 'to understand', lv: 'A2', pt: 'verstand', p2: 'verstanden' },
  { inf: 'bekommen', en: 'to receive', lv: 'A2', pt: 'bekam', p2: 'bekommen' },
  { inf: 'beginnen', en: 'to begin', lv: 'A2', pt: 'begann', p2: 'begonnen' },
  { inf: 'bringen', en: 'to bring', lv: 'A2', pt: 'brachte', p2: 'gebracht' },
  { inf: 'denken', en: 'to think', lv: 'A2', pt: 'dachte', p2: 'gedacht' },
  { inf: 'kennen', en: 'to know (person)', lv: 'A2', pt: 'kannte', p2: 'gekannt' },
  { inf: 'bezahlen', en: 'to pay', lv: 'A2', pt: 'bezahlte', p2: 'bezahlt' },
  { inf: 'studieren', en: 'to study', lv: 'A2', pt: 'studierte', p2: 'studiert' },
  { inf: 'passieren', en: 'to happen', lv: 'A2', pt: 'passierte', p2: 'passiert', aux: 's' },
  { inf: 'sitzen', en: 'to sit', lv: 'A2', p: 'sitze sitzt sitzt sitzen sitzt sitzen', pt: 'saß', p2: 'gesessen' },
  { inf: 'liegen', en: 'to lie', lv: 'A2', pt: 'lag', p2: 'gelegen' },
  { inf: 'stehen', en: 'to stand', lv: 'A2', pt: 'stand', p2: 'gestanden' },
  { inf: 'tragen', en: 'to carry / wear', lv: 'A2', p: 'trage trägst trägt tragen tragt tragen', pt: 'trug', p2: 'getragen' },
  { inf: 'waschen', en: 'to wash', lv: 'A2', p: 'wasche wäschst wäscht waschen wascht waschen', pt: 'wusch', p2: 'gewaschen' },
  { inf: 'einladen', en: 'to invite', lv: 'A2', p: 'lade ein|lädst ein|lädt ein|laden ein|ladet ein|laden ein', pt: 'lud ein', p2: 'eingeladen' },
  { inf: 'umziehen', en: 'to move house', lv: 'A2', p: 'ziehe um|ziehst um|zieht um|ziehen um|zieht um|ziehen um', pt: 'zog um', p2: 'umgezogen', aux: 's' },
  { inf: 'ankommen', en: 'to arrive', lv: 'A2', p: 'komme an|kommst an|kommt an|kommen an|kommt an|kommen an', pt: 'kam an', p2: 'angekommen', aux: 's' },
  { inf: 'gewinnen', en: 'to win', lv: 'B1', pt: 'gewann', p2: 'gewonnen' },
  { inf: 'verlieren', en: 'to lose', lv: 'B1', pt: 'verlor', p2: 'verloren' },
  { inf: 'sterben', en: 'to die', lv: 'B1', p: 'sterbe stirbst stirbt sterben sterbt sterben', pt: 'starb', p2: 'gestorben', aux: 's' },
  { inf: 'wachsen', en: 'to grow', lv: 'B1', p: 'wachse wächst wächst wachsen wachst wachsen', pt: 'wuchs', p2: 'gewachsen', aux: 's' },
  { inf: 'ziehen', en: 'to pull / move', lv: 'B1', pt: 'zog', p2: 'gezogen' },
  { inf: 'bieten', en: 'to offer', lv: 'B1', p: 'biete bietest bietet bieten bietet bieten', pt: 'bot', p2: 'geboten' },
  { inf: 'entscheiden', en: 'to decide', lv: 'B1', p: 'entscheide entscheidest entscheidet entscheiden entscheidet entscheiden', pt: 'entschied', p2: 'entschieden' },
  { inf: 'erfinden', en: 'to invent', lv: 'B1', p: 'erfinde erfindest erfindet erfinden erfindet erfinden', pt: 'erfand', p2: 'erfunden' },
  { inf: 'fallen', en: 'to fall', lv: 'B1', p: 'falle fällst fällt fallen fallt fallen', pt: 'fiel', p2: 'gefallen', aux: 's' },
  { inf: 'halten', en: 'to hold / stop', lv: 'B1', p: 'halte hältst hält halten haltet halten', pt: 'hielt', p2: 'gehalten' },
  { inf: 'lassen', en: 'to let', lv: 'B1', p: 'lasse lässt lässt lassen lasst lassen', pt: 'ließ', p2: 'gelassen' },
  { inf: 'rennen', en: 'to run', lv: 'B1', pt: 'rannte', p2: 'gerannt', aux: 's' },
  { inf: 'schließen', en: 'to close', lv: 'B1', p: 'schließe schließt schließt schließen schließt schließen', pt: 'schloss', p2: 'geschlossen' },
  { inf: 'steigen', en: 'to climb / rise', lv: 'B1', pt: 'stieg', p2: 'gestiegen', aux: 's' },
  { inf: 'vermeiden', en: 'to avoid', lv: 'B2', p: 'vermeide vermeidest vermeidet vermeiden vermeidet vermeiden', pt: 'vermied', p2: 'vermieden' },
  { inf: 'betreffen', en: 'to concern', lv: 'B2', p: 'betreffe betriffst betrifft betreffen betrefft betreffen', pt: 'betraf', p2: 'betroffen' },
  { inf: 'beweisen', en: 'to prove', lv: 'B2', p: 'beweise beweist beweist beweisen beweist beweisen', pt: 'bewies', p2: 'bewiesen' },
  { inf: 'empfehlen', en: 'to recommend', lv: 'B2', p: 'empfehle empfiehlst empfiehlt empfehlen empfehlt empfehlen', pt: 'empfahl', p2: 'empfohlen' },
  { inf: 'verschwinden', en: 'to disappear', lv: 'B2', p: 'verschwinde verschwindest verschwindet verschwinden verschwindet verschwinden', pt: 'verschwand', p2: 'verschwunden', aux: 's' },
  { inf: 'widersprechen', en: 'to contradict', lv: 'B2', p: 'widerspreche widersprichst widerspricht widersprechen widersprecht widersprechen', pt: 'widersprach', p2: 'widersprochen' },
  { inf: 'zwingen', en: 'to force', lv: 'B2', pt: 'zwang', p2: 'gezwungen' },
  { inf: 'leiden', en: 'to suffer', lv: 'B2', p: 'leide leidest leidet leiden leidet leiden', pt: 'litt', p2: 'gelitten' },
  { inf: 'schweigen', en: 'to be silent', lv: 'B2', pt: 'schwieg', p2: 'geschwiegen' },
  { inf: 'meiden', en: 'to avoid', lv: 'C1', p: 'meide meidest meidet meiden meidet meiden', pt: 'mied', p2: 'gemieden' },
  { inf: 'schwören', en: 'to swear', lv: 'C1', pt: 'schwor', p2: 'geschworen' },
  { inf: 'preisen', en: 'to praise', lv: 'C1', p: 'preise preist preist preisen preist preisen', pt: 'pries', p2: 'gepriesen' },
  { inf: 'fechten', en: 'to fence', lv: 'C2', p: 'fechte fichtst ficht fechten fechtet fechten', pt: 'focht', p2: 'gefochten' },
];

export const PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];

function regularPresent(inf: string): string[] {
  const stem = inf.endsWith('en') ? inf.slice(0, -2) : inf.slice(0, -1);
  const e = /[td]$/.test(stem) || /[^aeiouhlrmn][mn]$/.test(stem) ? 'e' : '';
  const sz = /[sßzx]$/.test(stem);
  return [stem + 'e', stem + e + (sz ? 't' : 'st'), stem + e + 't', inf, stem + e + 't', inf];
}

export function present(v: Verb): string[] {
  if (!v.p) return regularPresent(v.inf);
  return v.p.includes('|') ? v.p.split('|') : v.p.split(' ');
}

/** Präteritum forms for all persons, derived from the ich-form. */
export function praeteritum(v: Verb): string[] {
  const [base, prefix] = v.pt.split(' ');
  const weak = base.endsWith('e');
  let forms: string[];
  if (weak) forms = [base, base + 'st', base, base + 'n', base + 't', base + 'n'];
  else {
    const needsE = /[td]$/.test(base);
    const sz = /(sch|[sßzx])$/.test(base);
    forms = [base, base + (needsE || sz ? 'est' : 'st'), base, base + 'en', base + (needsE ? 'et' : 't'), base + 'en'];
  }
  if (base === 'war') forms = ['war', 'warst', 'war', 'waren', 'wart', 'waren'];
  return prefix ? forms.map((f) => `${f} ${prefix}`) : forms;
}

export function perfekt(v: Verb): string[] {
  const aux = v.aux === 's' ? ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'] : ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
  return aux.map((a) => `${a} ${v.p2}`);
}
