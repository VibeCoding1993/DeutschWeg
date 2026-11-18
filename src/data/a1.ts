import type { Unit } from '../types';

export const A1: Unit[] = [
  {
    id: 'a1-1', level: 'A1', icon: '👋', title: 'Hallo!', sub: 'Greetings & the verb sein',
    can: 'Greet people, introduce yourself and say where you are from.',
    grammar: {
      title: 'Personal pronouns & sein (to be)',
      html: `<p>The verb <b>sein</b> is irregular — learn it by heart, you'll use it in every conversation.</p>
<table class="tbl"><tr><th>Pronoun</th><th>sein</th><th>English</th></tr>
<tr><td>ich</td><td><b>bin</b></td><td>I am</td></tr>
<tr><td>du</td><td><b>bist</b></td><td>you are (informal)</td></tr>
<tr><td>er / sie / es</td><td><b>ist</b></td><td>he / she / it is</td></tr>
<tr><td>wir</td><td><b>sind</b></td><td>we are</td></tr>
<tr><td>ihr</td><td><b>seid</b></td><td>you are (plural, informal)</td></tr>
<tr><td>sie / Sie</td><td><b>sind</b></td><td>they are / you are (formal)</td></tr></table>
<div class="tip"><b>du or Sie?</b> Use <b>du</b> with friends, family, children and other students. Use <b>Sie</b> (always capitalised) with strangers, at work and in shops.</div>
<p class="ex">Ich <b>bin</b> Lara. Ich komme aus Marokko. — Wie heißen <b>Sie</b>?</p>`,
    },
    vocab: [
      { de: 'Hallo', en: 'hello', ex: 'Hallo, ich bin Tom.' },
      { de: 'Guten Morgen', en: 'good morning' },
      { de: 'Guten Tag', en: 'good day / hello (formal)' },
      { de: 'Guten Abend', en: 'good evening' },
      { de: 'Tschüss', en: 'bye' },
      { de: 'Auf Wiedersehen', en: 'goodbye (formal)' },
      { de: 'Name', en: 'name', g: 'der', pl: 'Namen', ex: 'Mein Name ist Anna.' },
      { de: 'Land', en: 'country', g: 'das', pl: 'Länder' },
      { de: 'heißen', en: 'to be called', ex: 'Wie heißt du?' },
      { de: 'kommen aus', en: 'to come from', ex: 'Ich komme aus Spanien.' },
      { de: 'wohnen', en: 'to live (reside)', ex: 'Ich wohne in Berlin.' },
      { de: 'danke', en: 'thank you' },
      { de: 'bitte', en: 'please / you\'re welcome' },
      { de: 'Wie geht\'s?', en: 'How are you?' },
    ],
    ex: [
      { t: 'mc', q: 'Ich ___ Student.', options: ['bin', 'bist', 'ist', 'sind'], a: 0 },
      { t: 'mc', q: 'Wir ___ aus Italien.', options: ['seid', 'sind', 'ist', 'bin'], a: 1 },
      { t: 'fill', q: 'Du ___ sehr nett.', a: ['bist'], hint: 'sein, du-form' },
      { t: 'fill', q: 'Ihr ___ in Deutschland.', a: ['seid'], hint: 'sein, ihr-form' },
      { t: 'fill', q: 'Frau Müller, woher kommen ___?', a: ['Sie'], hint: 'formal you', explain: 'Formal "Sie" is always written with a capital S.' },
      { t: 'mc', q: 'You meet your new boss in the morning. You say…', options: ['Tschüss!', 'Guten Morgen!', 'Hallo, du!', 'Gute Nacht!'], a: 1 },
      { t: 'order', en: 'My name is Paul.', de: 'Mein Name ist Paul' },
      { t: 'order', en: 'Where do you come from?', de: 'Woher kommst du' },
      { t: 'translate', en: 'I live in Hamburg.', a: ['Ich wohne in Hamburg.'] },
      { t: 'listen', text: 'Guten Tag, ich heiße Maria.', en: 'Good day, my name is Maria.' },
      { t: 'speak', text: 'Hallo, ich bin Sara und ich komme aus Marokko.', en: 'Hello, I am Sara and I come from Morocco.' },
      { t: 'match', pairs: [['Hallo', 'hello'], ['Tschüss', 'bye'], ['danke', 'thank you'], ['bitte', 'please']] },
    ],
  },
  {
    id: 'a1-2', level: 'A1', icon: '🗣️', title: 'Ich und du', sub: 'Present tense & questions',
    can: 'Talk about what you do, ask simple questions.',
    grammar: {
      title: 'Regular verbs in the present & word order',
      html: `<p>Take the <b>stem</b> (infinitive minus <i>-en</i>) and add the ending:</p>
<table class="tbl"><tr><th></th><th>wohn-en</th><th>arbeit-en*</th><th>ending</th></tr>
<tr><td>ich</td><td>wohn<b>e</b></td><td>arbeit<b>e</b></td><td>-e</td></tr>
<tr><td>du</td><td>wohn<b>st</b></td><td>arbeit<b>est</b></td><td>-st</td></tr>
<tr><td>er/sie/es</td><td>wohn<b>t</b></td><td>arbeit<b>et</b></td><td>-t</td></tr>
<tr><td>wir</td><td>wohn<b>en</b></td><td>arbeit<b>en</b></td><td>-en</td></tr>
<tr><td>ihr</td><td>wohn<b>t</b></td><td>arbeit<b>et</b></td><td>-t</td></tr>
<tr><td>sie/Sie</td><td>wohn<b>en</b></td><td>arbeit<b>en</b></td><td>-en</td></tr></table>
<p>*Stems ending in <b>-t / -d</b> add an extra <b>e</b> (du arbeit<b>e</b>st, er find<b>e</b>t).</p>
<div class="tip"><b>The verb is always in position 2</b> in a statement: <i>Heute <b>lerne</b> ich Deutsch.</i><br/>W-questions: W-word + verb + subject: <i>Was <b>machst</b> du?</i><br/>Yes/no questions start with the verb: <i><b>Spielst</b> du Fußball?</i></div>
<p>W-words: <b>wer</b> (who), <b>was</b> (what), <b>wo</b> (where), <b>woher</b> (where from), <b>wohin</b> (where to), <b>wann</b> (when), <b>wie</b> (how), <b>warum</b> (why).</p>`,
    },
    vocab: [
      { de: 'machen', en: 'to do / make', ex: 'Was machst du?' },
      { de: 'lernen', en: 'to learn', ex: 'Ich lerne Deutsch.' },
      { de: 'arbeiten', en: 'to work', ex: 'Er arbeitet in München.' },
      { de: 'spielen', en: 'to play', ex: 'Wir spielen Fußball.' },
      { de: 'trinken', en: 'to drink' },
      { de: 'hören', en: 'to hear / listen', ex: 'Ich höre gern Musik.' },
      { de: 'gern', en: 'gladly (to like doing)', ex: 'Ich koche gern.' },
      { de: 'Sprache', en: 'language', g: 'die', pl: 'Sprachen' },
      { de: 'Hobby', en: 'hobby', g: 'das', pl: 'Hobbys' },
      { de: 'Beruf', en: 'job, profession', g: 'der', pl: 'Berufe' },
      { de: 'heute', en: 'today' },
      { de: 'sprechen', en: 'to speak (du sprichst)', ex: 'Sprichst du Englisch?' },
    ],
    ex: [
      { t: 'fill', q: 'Du ___ (lernen) Deutsch.', a: ['lernst'] },
      { t: 'fill', q: 'Er ___ (arbeiten) bei Siemens.', a: ['arbeitet'], explain: 'Stem ends in -t → er arbeit-e-t.' },
      { t: 'fill', q: 'Wir ___ (spielen) Tennis.', a: ['spielen'] },
      { t: 'fill', q: 'Ihr ___ (machen) Hausaufgaben.', a: ['macht'] },
      { t: 'mc', q: '___ wohnst du? — In Köln.', options: ['Wer', 'Was', 'Wo', 'Wann'], a: 2 },
      { t: 'mc', q: '___ heißt du? — Jonas.', options: ['Wie', 'Wo', 'Woher', 'Warum'], a: 0 },
      { t: 'mc', q: 'Which sentence is correct?', options: ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Heute lerne Deutsch ich.', 'Ich heute lerne Deutsch.'], a: 1, explain: 'Verb in position 2 — after "Heute" comes the verb, then the subject.' },
      { t: 'order', en: 'Do you speak English?', de: 'Sprichst du Englisch' },
      { t: 'order', en: 'I like listening to music.', de: 'Ich höre gern Musik' },
      { t: 'translate', en: 'What is your job? (informal)', a: ['Was ist dein Beruf?', 'Was bist du von Beruf?'] },
      { t: 'listen', text: 'Am Wochenende spiele ich gern Gitarre.', en: 'At the weekend I like playing guitar.' },
      { t: 'speak', text: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.' },
    ],
  },
  {
    id: 'a1-3', level: 'A1', icon: '👨‍👩‍👧', title: 'Meine Familie', sub: 'Articles & possessives',
    can: 'Describe your family and use der/die/das, ein/eine.',
    grammar: {
      title: 'Gender, articles & mein/dein',
      html: `<p>Every German noun has a gender. Always learn the noun <b>with its article</b>.</p>
<table class="tbl"><tr><th></th><th><span class="m">masculine</span></th><th><span class="f">feminine</span></th><th><span class="n">neuter</span></th><th>plural</th></tr>
<tr><td>definite (the)</td><td><span class="m">der</span> Vater</td><td><span class="f">die</span> Mutter</td><td><span class="n">das</span> Kind</td><td>die Kinder</td></tr>
<tr><td>indefinite (a)</td><td><span class="m">ein</span> Vater</td><td><span class="f">eine</span> Mutter</td><td><span class="n">ein</span> Kind</td><td>— Kinder</td></tr>
<tr><td>my</td><td>mein</td><td>mein<b>e</b></td><td>mein</td><td>mein<b>e</b></td></tr>
<tr><td>your (du)</td><td>dein</td><td>dein<b>e</b></td><td>dein</td><td>dein<b>e</b></td></tr></table>
<div class="tip"><b>Gender hints:</b> -ung, -heit, -keit, -schaft, -ion, most -e → <span class="f">die</span>. -chen, -lein, -um, -ment → <span class="n">das</span>. Days, months, seasons, -er (people), -ismus → <span class="m">der</span>. Plurals always take <b>die</b>.</div>
<p>Other possessives work the same: sein (his), ihr (her), unser (our), euer (your pl.), ihr/Ihr (their/your formal).</p>`,
    },
    vocab: [
      { de: 'Vater', en: 'father', g: 'der', pl: 'Väter' },
      { de: 'Mutter', en: 'mother', g: 'die', pl: 'Mütter' },
      { de: 'Kind', en: 'child', g: 'das', pl: 'Kinder' },
      { de: 'Bruder', en: 'brother', g: 'der', pl: 'Brüder' },
      { de: 'Schwester', en: 'sister', g: 'die', pl: 'Schwestern' },
      { de: 'Eltern', en: 'parents (plural only)', pl: 'Eltern' },
      { de: 'Sohn', en: 'son', g: 'der', pl: 'Söhne' },
      { de: 'Tochter', en: 'daughter', g: 'die', pl: 'Töchter' },
      { de: 'Großmutter', en: 'grandmother', g: 'die', pl: 'Großmütter' },
      { de: 'Mädchen', en: 'girl', g: 'das', pl: 'Mädchen' },
      { de: 'verheiratet', en: 'married' },
      { de: 'ledig', en: 'single' },
      { de: 'Hund', en: 'dog', g: 'der', pl: 'Hunde' },
    ],
    ex: [
      { t: 'mc', q: '___ Mädchen spielt im Garten.', options: ['Der', 'Die', 'Das'], a: 2, explain: 'Nouns ending in -chen are always neuter.' },
      { t: 'mc', q: '___ Zeitung ist neu.', options: ['Der', 'Die', 'Das'], a: 1, explain: '-ung → feminine.' },
      { t: 'mc', q: 'Das ist ___ Bruder.', options: ['mein', 'meine', 'meinen'], a: 0 },
      { t: 'fill', q: 'Das ist ___ Schwester. (my)', a: ['meine'] },
      { t: 'fill', q: 'Wie heißt ___ Vater? (your, informal)', a: ['dein'] },
      { t: 'fill', q: 'Das sind ___ Eltern. (our)', a: ['unsere'] },
      { t: 'mc', q: 'Plural of "das Kind":', options: ['die Kinds', 'die Kinder', 'die Kinden', 'die Kind'], a: 1 },
      { t: 'mc', q: 'Anna has a sister. Her sister = ___ Schwester', options: ['seine', 'ihre', 'ihr', 'sein'], a: 1, explain: '"ihr" = her; Schwester is feminine → ihre.' },
      { t: 'order', en: 'My brother has a dog.', de: 'Mein Bruder hat einen Hund' },
      { t: 'translate', en: 'Is that your mother? (informal)', a: ['Ist das deine Mutter?'] },
      { t: 'listen', text: 'Meine Großmutter wohnt in Wien.', en: 'My grandmother lives in Vienna.' },
      { t: 'speak', text: 'Ich habe einen Bruder und zwei Schwestern.' },
    ],
  },
  {
    id: 'a1-4', level: 'A1', icon: '🕒', title: 'Zahlen & Zeit', sub: 'Numbers, time, haben',
    can: 'Say numbers, prices, the time and days of the week.',
    grammar: {
      title: 'Numbers, the time & haben',
      html: `<p>21–99 are said "backwards": <b>einundzwanzig</b> (one-and-twenty), <b>siebenundvierzig</b> (47). 100 = hundert, 1000 = tausend.</p>
<table class="tbl"><tr><th>haben</th><th></th></tr>
<tr><td>ich habe</td><td>wir haben</td></tr><tr><td>du <b>hast</b></td><td>ihr habt</td></tr><tr><td>er/sie/es <b>hat</b></td><td>sie/Sie haben</td></tr></table>
<p><b>Telling the time</b> (informal): 8:15 Viertel nach acht · 8:30 <b>halb neun</b> (!) · 8:45 Viertel vor neun · 8:10 zehn nach acht.</p>
<div class="tip"><b>halb neun = 8:30</b>, not 9:30 — it's "half (way to) nine". Official time: <i>acht Uhr dreißig</i>.</div>
<p>Days: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag — all <b>der</b>. "On Monday" = <b>am</b> Montag. "At 8 o'clock" = <b>um</b> acht Uhr.</p>`,
    },
    vocab: [
      { de: 'Uhr', en: 'clock / o\'clock', g: 'die', pl: 'Uhren' },
      { de: 'Stunde', en: 'hour', g: 'die', pl: 'Stunden' },
      { de: 'Minute', en: 'minute', g: 'die', pl: 'Minuten' },
      { de: 'Tag', en: 'day', g: 'der', pl: 'Tage' },
      { de: 'Woche', en: 'week', g: 'die', pl: 'Wochen' },
      { de: 'Wochenende', en: 'weekend', g: 'das', pl: 'Wochenenden' },
      { de: 'Montag', en: 'Monday', g: 'der', pl: 'Montage' },
      { de: 'Euro', en: 'euro', g: 'der', pl: 'Euro' },
      { de: 'Zeit', en: 'time', g: 'die', pl: 'Zeiten', ex: 'Hast du Zeit?' },
      { de: 'Telefonnummer', en: 'phone number', g: 'die', pl: 'Telefonnummern' },
      { de: 'spät', en: 'late', ex: 'Wie spät ist es?' },
      { de: 'früh', en: 'early' },
    ],
    ex: [
      { t: 'mc', q: '47 =', options: ['vierundsiebzig', 'siebenundvierzig', 'vierzigsieben', 'siebzigvier'], a: 1 },
      { t: 'mc', q: '"halb drei" =', options: ['3:30', '2:30', '3:15', '2:45'], a: 1 },
      { t: 'mc', q: '"Viertel vor sechs" =', options: ['6:15', '5:45', '6:45', '5:15'], a: 1 },
      { t: 'fill', q: 'Du ___ einen Hund. (haben)', a: ['hast'] },
      { t: 'fill', q: 'Sie ___ zwei Kinder. (she, haben)', a: ['hat'] },
      { t: 'fill', q: 'Der Kurs beginnt ___ neun Uhr.', a: ['um'] },
      { t: 'fill', q: 'Ich arbeite ___ Montag.', a: ['am'] },
      { t: 'listen', text: 'Das kostet zweiundfünfzig Euro.', en: 'That costs 52 euros.' },
      { t: 'listen', text: 'Meine Telefonnummer ist null eins sieben drei, vier fünf sechs.', en: 'My phone number is 0173 456.' },
      { t: 'translate', en: 'What time is it?', a: ['Wie spät ist es?', 'Wie viel Uhr ist es?'] },
      { t: 'order', en: 'On Saturday I have time.', de: 'Am Samstag habe ich Zeit' },
      { t: 'speak', text: 'Es ist halb acht. Ich habe heute keine Zeit.' },
    ],
  },
  {
    id: 'a1-5', level: 'A1', icon: '🥨', title: 'Essen & Trinken', sub: 'Accusative, möchten, kein',
    can: 'Order food, go shopping, say what you like and don\'t like.',
    grammar: {
      title: 'The accusative case & kein / nicht',
      html: `<p>The <b>direct object</b> (what you eat, buy, have…) is in the accusative. <b>Only the masculine changes!</b></p>
<table class="tbl"><tr><th></th><th><span class="m">m</span></th><th><span class="f">f</span></th><th><span class="n">n</span></th><th>pl</th></tr>
<tr><td>Nominativ</td><td>der / ein / kein</td><td>die / eine / keine</td><td>das / ein / kein</td><td>die / – / keine</td></tr>
<tr><td>Akkusativ</td><td><b>den / einen / keinen</b></td><td>die / eine / keine</td><td>das / ein / kein</td><td>die / – / keine</td></tr></table>
<p class="ex">Ich möchte <b>einen</b> Kaffee und <b>ein</b> Brötchen. Ich habe <b>keinen</b> Hunger.</p>
<div class="tip"><b>kein</b> negates nouns with ein/no article (Ich habe <i>keine</i> Zeit). <b>nicht</b> negates everything else — verbs, adjectives, nouns with der/die/das (Ich trinke <i>nicht</i>. Das ist <i>nicht</i> der Bus.).</div>
<p><b>möchten</b> (would like): ich möchte, du möchtest, er möchte, wir möchten, ihr möchtet, sie möchten. <b>mögen</b> (to like): ich mag, du magst, er mag.</p>`,
    },
    vocab: [
      { de: 'Kaffee', en: 'coffee', g: 'der', pl: 'Kaffees' },
      { de: 'Tee', en: 'tea', g: 'der', pl: 'Tees' },
      { de: 'Wasser', en: 'water', g: 'das', pl: '-' },
      { de: 'Brot', en: 'bread', g: 'das', pl: 'Brote' },
      { de: 'Brötchen', en: 'bread roll', g: 'das', pl: 'Brötchen' },
      { de: 'Apfel', en: 'apple', g: 'der', pl: 'Äpfel' },
      { de: 'Milch', en: 'milk', g: 'die', pl: '-' },
      { de: 'Käse', en: 'cheese', g: 'der', pl: '-' },
      { de: 'Fleisch', en: 'meat', g: 'das', pl: '-' },
      { de: 'Hunger', en: 'hunger', g: 'der', pl: '-', ex: 'Ich habe Hunger.' },
      { de: 'kaufen', en: 'to buy' },
      { de: 'essen', en: 'to eat (du isst, er isst)' },
      { de: 'lecker', en: 'tasty' },
      { de: 'die Rechnung, bitte', en: 'the bill, please' },
    ],
    ex: [
      { t: 'mc', q: 'Ich möchte ___ Kaffee.', options: ['ein', 'einen', 'eine', 'einem'], a: 1 },
      { t: 'mc', q: 'Wir kaufen ___ Brot.', options: ['ein', 'einen', 'eine'], a: 0, explain: 'Neuter: ein stays ein in the accusative.' },
      { t: 'fill', q: 'Ich habe ___ Hunger. (no)', a: ['keinen'] },
      { t: 'fill', q: 'Er trinkt ___ Milch. (no)', a: ['keine'] },
      { t: 'mc', q: 'Das Essen ist ___ lecker.', options: ['kein', 'nicht', 'keine'], a: 1 },
      { t: 'fill', q: '___ du Käse? — Ja, ich mag Käse.', a: ['Magst'], hint: 'mögen' },
      { t: 'fill', q: 'Was ___ ihr trinken? (möchten)', a: ['möchtet'] },
      { t: 'fill', q: 'Du ___ (essen) kein Fleisch.', a: ['isst'] },
      { t: 'order', en: 'I would like a tea, please.', de: 'Ich möchte einen Tee bitte' },
      { t: 'translate', en: 'I don\'t have an apple.', a: ['Ich habe keinen Apfel.'] },
      { t: 'listen', text: 'Zwei Brötchen und ein Wasser, bitte.', en: 'Two rolls and a water, please.' },
      { t: 'speak', text: 'Ich hätte gern einen Kaffee mit Milch, bitte.' },
    ],
  },
  {
    id: 'a1-6', level: 'A1', icon: '⏰', title: 'Mein Alltag', sub: 'Separable verbs & routine',
    can: 'Describe your daily routine.',
    grammar: {
      title: 'Separable verbs (trennbare Verben)',
      html: `<p>Many verbs have a <b>prefix that jumps to the end</b> of the sentence: <i>aufstehen → Ich <b>stehe</b> um 7 Uhr <b>auf</b>.</i></p>
<table class="tbl"><tr><th>infinitive</th><th>sentence</th></tr>
<tr><td><b>auf</b>stehen</td><td>Ich stehe früh <b>auf</b>.</td></tr>
<tr><td><b>ein</b>kaufen</td><td>Wir kaufen im Supermarkt <b>ein</b>.</td></tr>
<tr><td><b>an</b>rufen</td><td>Rufst du mich <b>an</b>?</td></tr>
<tr><td><b>fern</b>sehen</td><td>Er sieht am Abend <b>fern</b>.</td></tr>
<tr><td><b>mit</b>kommen</td><td>Kommst du <b>mit</b>?</td></tr></table>
<div class="tip">Separable prefixes are <b>stressed</b>: AUFstehen, EINkaufen. Common ones: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-, zurück-, fern-. <br/>Inseparable (never split, unstressed): be-, ver-, er-, ent-, ge-, zer-, emp-, miss- (verstehen, bezahlen).</div>
<p>Time expressions: morgens, mittags, abends, zuerst (first), dann (then), danach (after that), später (later).</p>`,
    },
    vocab: [
      { de: 'aufstehen', en: 'to get up' },
      { de: 'einkaufen', en: 'to go shopping' },
      { de: 'anrufen', en: 'to call (phone)' },
      { de: 'fernsehen', en: 'to watch TV (er sieht fern)' },
      { de: 'aufräumen', en: 'to tidy up' },
      { de: 'anfangen', en: 'to begin (er fängt an)' },
      { de: 'frühstücken', en: 'to have breakfast' },
      { de: 'duschen', en: 'to shower' },
      { de: 'zuerst', en: 'first (of all)' },
      { de: 'dann', en: 'then' },
      { de: 'Abend', en: 'evening', g: 'der', pl: 'Abende' },
      { de: 'Morgen', en: 'morning', g: 'der', pl: 'Morgen' },
    ],
    ex: [
      { t: 'fill', q: 'Ich ___ um sechs Uhr ___. (aufstehen)', a: ['stehe auf'], hint: 'separable verb: stem … prefix' },
      { t: 'order', en: 'We go shopping on Saturday.', de: 'Wir kaufen am Samstag ein' },
      { t: 'order', en: 'Are you coming along?', de: 'Kommst du mit' },
      { t: 'mc', q: 'Der Film ___ um acht Uhr ___.', options: ['fängt … an', 'anfängt … –', 'fangt … an', 'fängt … ein'], a: 0 },
      { t: 'mc', q: 'Which verb is NOT separable?', options: ['einkaufen', 'verstehen', 'aufstehen', 'mitkommen'], a: 1, explain: 'ver- is an inseparable prefix.' },
      { t: 'fill', q: 'Er ___ abends ___. (fernsehen)', a: ['sieht fern'] },
      { t: 'fill', q: '___ du mich morgen ___? (anrufen)', a: ['Rufst an'], hint: 'question: verb first, prefix at the end' },
      { t: 'translate', en: 'First I shower, then I have breakfast.', a: ['Zuerst dusche ich, dann frühstücke ich.'] },
      { t: 'listen', text: 'Am Abend räume ich die Küche auf.', en: 'In the evening I tidy up the kitchen.' },
      { t: 'speak', text: 'Morgens stehe ich um sieben Uhr auf und trinke einen Kaffee.' },
    ],
  },
  {
    id: 'a1-7', level: 'A1', icon: '💪', title: 'Können & Müssen', sub: 'Modal verbs',
    can: 'Say what you can, must, want and are allowed to do.',
    grammar: {
      title: 'Modal verbs (Modalverben)',
      html: `<p>The modal verb is in <b>position 2</b>; the main verb goes to the <b>end in the infinitive</b>: <i>Ich <b>kann</b> gut <b>schwimmen</b>.</i></p>
<table class="tbl"><tr><th></th><th>können<br/><small>can</small></th><th>müssen<br/><small>must</small></th><th>wollen<br/><small>want</small></th><th>dürfen<br/><small>may</small></th><th>sollen<br/><small>should</small></th></tr>
<tr><td>ich</td><td>kann</td><td>muss</td><td>will</td><td>darf</td><td>soll</td></tr>
<tr><td>du</td><td>kannst</td><td>musst</td><td>willst</td><td>darfst</td><td>sollst</td></tr>
<tr><td>er/sie/es</td><td>kann</td><td>muss</td><td>will</td><td>darf</td><td>soll</td></tr>
<tr><td>wir</td><td>können</td><td>müssen</td><td>wollen</td><td>dürfen</td><td>sollen</td></tr>
<tr><td>ihr</td><td>könnt</td><td>müsst</td><td>wollt</td><td>dürft</td><td>sollt</td></tr>
<tr><td>sie/Sie</td><td>können</td><td>müssen</td><td>wollen</td><td>dürfen</td><td>sollen</td></tr></table>
<div class="tip"><b>ich</b> and <b>er/sie/es</b> forms are identical and have no ending. <br/>⚠️ <i>nicht müssen</i> = don't have to; <i>nicht dürfen</i> = must not. <i>Du musst nicht kommen</i> (optional) vs. <i>Du darfst hier nicht rauchen</i> (forbidden).</div>`,
    },
    vocab: [
      { de: 'können', en: 'can, to be able to' },
      { de: 'müssen', en: 'must, to have to' },
      { de: 'wollen', en: 'to want' },
      { de: 'dürfen', en: 'to be allowed to' },
      { de: 'sollen', en: 'should, to be supposed to' },
      { de: 'schwimmen', en: 'to swim' },
      { de: 'rauchen', en: 'to smoke' },
      { de: 'helfen', en: 'to help (du hilfst)' },
      { de: 'Arzt', en: 'doctor (m)', g: 'der', pl: 'Ärzte' },
      { de: 'Hausaufgabe', en: 'homework', g: 'die', pl: 'Hausaufgaben' },
      { de: 'leider', en: 'unfortunately' },
      { de: 'vielleicht', en: 'maybe' },
    ],
    ex: [
      { t: 'fill', q: 'Ich ___ gut kochen. (können)', a: ['kann'] },
      { t: 'fill', q: 'Du ___ heute arbeiten. (müssen)', a: ['musst'] },
      { t: 'fill', q: 'Wir ___ ins Kino gehen. (wollen)', a: ['wollen'] },
      { t: 'fill', q: 'Hier ___ man nicht rauchen. (dürfen)', a: ['darf'] },
      { t: 'mc', q: 'Morgen ist Sonntag. Ich ___ nicht arbeiten.', options: ['darf', 'muss', 'kann', 'will'], a: 1, explain: '"nicht müssen" = don\'t have to.' },
      { t: 'mc', q: 'Which word order is correct?', options: ['Ich kann schwimmen gut.', 'Ich kann gut schwimmen.', 'Ich gut kann schwimmen.', 'Kann ich gut schwimmen.'], a: 1 },
      { t: 'order', en: 'Can you help me?', de: 'Kannst du mir helfen' },
      { t: 'order', en: 'Unfortunately I have to go to the doctor.', de: 'Leider muss ich zum Arzt gehen' },
      { t: 'translate', en: 'You should drink more water. (du)', a: ['Du sollst mehr Wasser trinken.', 'Du solltest mehr Wasser trinken.'] },
      { t: 'listen', text: 'Darf ich das Fenster aufmachen?', en: 'May I open the window?' },
      { t: 'speak', text: 'Ich will dieses Jahr gut Deutsch sprechen können.' },
    ],
  },
  {
    id: 'a1-8', level: 'A1', icon: '🏙️', title: 'In der Stadt', sub: 'Directions, imperative, dative',
    can: 'Ask for and give directions, give simple instructions.',
    grammar: {
      title: 'Imperative & first dative prepositions',
      html: `<p><b>Imperative</b> (commands):</p>
<table class="tbl"><tr><th></th><th>gehen</th><th>nehmen</th><th>sein</th></tr>
<tr><td>du</td><td>Geh!</td><td>Nimm!</td><td>Sei!</td></tr>
<tr><td>ihr</td><td>Geht!</td><td>Nehmt!</td><td>Seid!</td></tr>
<tr><td>Sie</td><td>Gehen Sie!</td><td>Nehmen Sie!</td><td>Seien Sie!</td></tr></table>
<p><b>Dative prepositions</b> (always dative!): <b>mit, nach, bei, seit, von, zu, aus</b> (+ gegenüber).</p>
<table class="tbl"><tr><th></th><th><span class="m">m</span></th><th><span class="f">f</span></th><th><span class="n">n</span></th><th>pl</th></tr>
<tr><td>Dativ</td><td><b>dem</b> / einem</td><td><b>der</b> / einer</td><td><b>dem</b> / einem</td><td><b>den</b> … +n</td></tr></table>
<p class="ex">Ich fahre <b>mit dem</b> Bus <b>zum</b> (= zu dem) Bahnhof und dann <b>zur</b> (= zu der) Arbeit.</p>
<div class="tip">Directions: <b>geradeaus</b> (straight on), <b>links</b> (left), <b>rechts</b> (right), <b>die zweite Straße links</b>, <b>an der Ampel</b> (at the traffic light).</div>`,
    },
    vocab: [
      { de: 'Bahnhof', en: 'train station', g: 'der', pl: 'Bahnhöfe' },
      { de: 'Straße', en: 'street', g: 'die', pl: 'Straßen' },
      { de: 'Ampel', en: 'traffic light', g: 'die', pl: 'Ampeln' },
      { de: 'Bus', en: 'bus', g: 'der', pl: 'Busse' },
      { de: 'Apotheke', en: 'pharmacy', g: 'die', pl: 'Apotheken' },
      { de: 'Krankenhaus', en: 'hospital', g: 'das', pl: 'Krankenhäuser' },
      { de: 'Haltestelle', en: 'bus/tram stop', g: 'die', pl: 'Haltestellen' },
      { de: 'geradeaus', en: 'straight ahead' },
      { de: 'links', en: 'left' },
      { de: 'rechts', en: 'right' },
      { de: 'nehmen', en: 'to take (du nimmst)' },
      { de: 'fahren', en: 'to go (by vehicle), drive (du fährst)' },
      { de: 'Entschuldigung', en: 'excuse me / sorry', g: 'die', pl: 'Entschuldigungen' },
    ],
    ex: [
      { t: 'fill', q: '___ bitte langsam! (sprechen, du)', a: ['Sprich'] },
      { t: 'fill', q: '___ Sie die U-Bahn! (nehmen)', a: ['Nehmen'] },
      { t: 'mc', q: 'Ich fahre mit ___ Bus.', options: ['der', 'den', 'dem', 'das'], a: 2 },
      { t: 'mc', q: 'Wie komme ich ___ Bahnhof?', options: ['zum', 'zur', 'zu', 'nach dem'], a: 0, explain: 'zu + dem = zum (der Bahnhof is masculine).' },
      { t: 'mc', q: 'Ich gehe ___ Apotheke.', options: ['zum', 'zur', 'nach'], a: 1, explain: 'zu + der = zur (die Apotheke).' },
      { t: 'fill', q: 'Sie wohnt bei ___ Eltern. (her)', a: ['ihren'], explain: 'Dative plural: ihr + en.' },
      { t: 'fill', q: 'Ich komme ___ der Arbeit. (from)', a: ['von'] },
      { t: 'order', en: 'Excuse me, where is the pharmacy?', de: 'Entschuldigung wo ist die Apotheke' },
      { t: 'translate', en: 'Go straight ahead and then left. (du)', a: ['Geh geradeaus und dann links.', 'Gehe geradeaus und dann links.'] },
      { t: 'listen', text: 'Nehmen Sie die zweite Straße rechts.', en: 'Take the second street on the right.' },
      { t: 'speak', text: 'Entschuldigung, wie komme ich zum Krankenhaus?' },
    ],
  },
];
