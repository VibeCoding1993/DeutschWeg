import type { Unit } from '../types';

export const A2: Unit[] = [
  {
    id: 'a2-1', level: 'A2', icon: '📅', title: 'Gestern', sub: 'Perfekt with haben',
    can: 'Talk about what you did yesterday or last weekend.',
    grammar: {
      title: 'Das Perfekt (I) — haben + Partizip II',
      html: `<p>Spoken German uses the <b>Perfekt</b> for the past: <b>haben/sein</b> in position 2 + <b>Partizip II</b> at the end.</p>
<p class="ex">Ich <b>habe</b> gestern Pizza <b>gegessen</b>.</p>
<table class="tbl"><tr><th>type</th><th>rule</th><th>examples</th></tr>
<tr><td>regular</td><td><b>ge</b>- stem -<b>t</b></td><td>machen → <b>ge</b>mach<b>t</b>, kaufen → gekauft, arbeiten → gearbeit<b>et</b></td></tr>
<tr><td>irregular</td><td><b>ge</b>- (changed) stem -<b>en</b></td><td>essen → gegessen, trinken → getrunken, schreiben → geschrieben, sehen → gesehen</td></tr>
<tr><td>separable</td><td>prefix + <b>ge</b> + …</td><td>einkaufen → ein<b>ge</b>kauft, anrufen → an<b>ge</b>rufen</td></tr>
<tr><td>no ge-</td><td>be-/ver-/er-… and -ieren</td><td>bezahlen → bezahlt, verstehen → verstanden, studieren → studiert</td></tr></table>
<div class="tip">Irregular participles must be learned. Practise them in <b>Drills → Verbs</b>.</div>`,
    },
    vocab: [
      { de: 'gestern', en: 'yesterday' },
      { de: 'letzte Woche', en: 'last week' },
      { de: 'vorgestern', en: 'the day before yesterday' },
      { de: 'schon', en: 'already' },
      { de: 'noch nicht', en: 'not yet' },
      { de: 'schreiben', en: 'to write (geschrieben)' },
      { de: 'lesen', en: 'to read (gelesen)' },
      { de: 'sehen', en: 'to see (gesehen)' },
      { de: 'treffen', en: 'to meet (getroffen)' },
      { de: 'besuchen', en: 'to visit (besucht)' },
      { de: 'Geburtstag', en: 'birthday', g: 'der', pl: 'Geburtstage' },
      { de: 'Party', en: 'party', g: 'die', pl: 'Partys' },
      { de: 'Film', en: 'film', g: 'der', pl: 'Filme' },
    ],
    ex: [
      { t: 'fill', q: 'Ich habe gestern Fußball ___. (spielen)', a: ['gespielt'] },
      { t: 'fill', q: 'Hast du schon ___? (essen)', a: ['gegessen'] },
      { t: 'fill', q: 'Wir haben einen Film ___. (sehen)', a: ['gesehen'] },
      { t: 'fill', q: 'Sie hat im Supermarkt ___. (einkaufen)', a: ['eingekauft'] },
      { t: 'fill', q: 'Er hat die Rechnung ___. (bezahlen)', a: ['bezahlt'] },
      { t: 'fill', q: 'Ich habe Medizin ___. (studieren)', a: ['studiert'] },
      { t: 'mc', q: 'Participle of "anrufen":', options: ['geanruft', 'angerufen', 'angeruft', 'anrufen'], a: 1 },
      { t: 'mc', q: 'Participle of "verstehen":', options: ['geverstanden', 'verstanden', 'verstehen', 'versteht'], a: 1 },
      { t: 'order', en: 'I wrote an email yesterday.', de: 'Ich habe gestern eine E-Mail geschrieben' },
      { t: 'translate', en: 'Have you already read the book? (du)', a: ['Hast du das Buch schon gelesen?'] },
      { t: 'listen', text: 'Letztes Wochenende habe ich meine Freunde getroffen.', en: 'Last weekend I met my friends.' },
      { t: 'speak', text: 'Gestern habe ich lange gearbeitet und dann habe ich gekocht.' },
    ],
  },
  {
    id: 'a2-2', level: 'A2', icon: '✈️', title: 'Reisen', sub: 'Perfekt with sein',
    can: 'Tell a story about a trip.',
    grammar: {
      title: 'Das Perfekt (II) — sein + Partizip II',
      html: `<p>Use <b>sein</b> with verbs of <b>movement from A to B</b> or <b>change of state</b> (and with sein, bleiben, passieren).</p>
<table class="tbl"><tr><th>verb</th><th>Perfekt</th></tr>
<tr><td>fahren</td><td>ich <b>bin</b> nach Berlin gefahren</td></tr>
<tr><td>fliegen</td><td>wir <b>sind</b> nach Rom geflogen</td></tr>
<tr><td>gehen / kommen</td><td>er <b>ist</b> gegangen / gekommen</td></tr>
<tr><td>aufstehen</td><td>ich <b>bin</b> früh aufgestanden</td></tr>
<tr><td>einschlafen / aufwachen</td><td>sie <b>ist</b> eingeschlafen / aufgewacht</td></tr>
<tr><td>sein / bleiben</td><td>ich <b>bin</b> dort gewesen / geblieben</td></tr>
<tr><td>passieren</td><td>was <b>ist</b> passiert?</td></tr></table>
<div class="tip">In everyday speech, <b>sein</b> and <b>haben</b> themselves are usually put in the Präteritum: <i>Ich <b>war</b> in Wien. Ich <b>hatte</b> keine Zeit.</i></div>`,
    },
    vocab: [
      { de: 'Reise', en: 'trip, journey', g: 'die', pl: 'Reisen' },
      { de: 'Urlaub', en: 'holiday, vacation', g: 'der', pl: 'Urlaube' },
      { de: 'Flughafen', en: 'airport', g: 'der', pl: 'Flughäfen' },
      { de: 'Hotel', en: 'hotel', g: 'das', pl: 'Hotels' },
      { de: 'Koffer', en: 'suitcase', g: 'der', pl: 'Koffer' },
      { de: 'Meer', en: 'sea', g: 'das', pl: 'Meere' },
      { de: 'Strand', en: 'beach', g: 'der', pl: 'Strände' },
      { de: 'fliegen', en: 'to fly (ist geflogen)' },
      { de: 'bleiben', en: 'to stay (ist geblieben)' },
      { de: 'ankommen', en: 'to arrive (ist angekommen)' },
      { de: 'passieren', en: 'to happen (ist passiert)' },
      { de: 'Wetter', en: 'weather', g: 'das', pl: '-' },
    ],
    ex: [
      { t: 'mc', q: 'Wir ___ nach Spanien geflogen.', options: ['haben', 'sind', 'hat', 'ist'], a: 1 },
      { t: 'mc', q: 'Ich ___ zwei Wochen am Meer geblieben.', options: ['habe', 'bin'], a: 1 },
      { t: 'mc', q: 'Er ___ viele Fotos gemacht.', options: ['hat', 'ist'], a: 0 },
      { t: 'fill', q: 'Der Zug ist pünktlich ___. (ankommen)', a: ['angekommen'] },
      { t: 'fill', q: 'Was ist ___? (passieren)', a: ['passiert'] },
      { t: 'fill', q: 'Seid ihr mit dem Auto ___? (fahren)', a: ['gefahren'] },
      { t: 'fill', q: 'Ich ___ gestern zu Hause. (sein, Präteritum)', a: ['war'] },
      { t: 'order', en: 'We arrived at the hotel late.', de: 'Wir sind spät im Hotel angekommen' },
      { t: 'translate', en: 'Where were you on holiday? (du)', a: ['Wo warst du im Urlaub?', 'Wo bist du im Urlaub gewesen?'] },
      { t: 'listen', text: 'Im Sommer sind wir an die Nordsee gefahren.', en: 'In summer we went to the North Sea.' },
      { t: 'speak', text: 'Letztes Jahr bin ich nach Österreich gefahren und habe viel gesehen.' },
    ],
  },
  {
    id: 'a2-3', level: 'A2', icon: '🏠', title: 'Wohnen', sub: 'Two-way prepositions',
    can: 'Describe your flat and where things are.',
    grammar: {
      title: 'Wechselpräpositionen: Wo? (Dativ) vs. Wohin? (Akkusativ)',
      html: `<p>Nine prepositions take <b>dative</b> for location (<i>Wo?</i>) and <b>accusative</b> for direction (<i>Wohin?</i>):<br/><b>an, auf, hinter, in, neben, über, unter, vor, zwischen</b>.</p>
<table class="tbl"><tr><th>Wohin? → Akkusativ (movement)</th><th>Wo? → Dativ (position)</th></tr>
<tr><td>Ich <b>stelle</b> die Lampe auf <b>den</b> Tisch.</td><td>Die Lampe <b>steht</b> auf <b>dem</b> Tisch.</td></tr>
<tr><td>Ich <b>lege</b> das Buch in <b>die</b> Tasche.</td><td>Das Buch <b>liegt</b> in <b>der</b> Tasche.</td></tr>
<tr><td>Ich <b>hänge</b> das Bild an <b>die</b> Wand.</td><td>Das Bild <b>hängt</b> an <b>der</b> Wand.</td></tr>
<tr><td>Er <b>setzt</b> sich auf <b>das</b> Sofa.</td><td>Er <b>sitzt</b> auf <b>dem</b> Sofa.</td></tr></table>
<div class="tip">Pairs to remember: <b>stellen/stehen</b> (upright), <b>legen/liegen</b> (flat), <b>hängen/hängen</b>, <b>setzen/sitzen</b>. Contractions: in dem = <b>im</b>, in das = <b>ins</b>, an dem = <b>am</b>, an das = <b>ans</b>.</div>`,
    },
    vocab: [
      { de: 'Wohnung', en: 'flat, apartment', g: 'die', pl: 'Wohnungen' },
      { de: 'Zimmer', en: 'room', g: 'das', pl: 'Zimmer' },
      { de: 'Küche', en: 'kitchen', g: 'die', pl: 'Küchen' },
      { de: 'Bad', en: 'bathroom', g: 'das', pl: 'Bäder' },
      { de: 'Tisch', en: 'table', g: 'der', pl: 'Tische' },
      { de: 'Stuhl', en: 'chair', g: 'der', pl: 'Stühle' },
      { de: 'Schrank', en: 'cupboard, wardrobe', g: 'der', pl: 'Schränke' },
      { de: 'Wand', en: 'wall', g: 'die', pl: 'Wände' },
      { de: 'Bett', en: 'bed', g: 'das', pl: 'Betten' },
      { de: 'Miete', en: 'rent', g: 'die', pl: 'Mieten' },
      { de: 'stellen', en: 'to put (upright)' },
      { de: 'legen', en: 'to lay, put (flat)' },
      { de: 'umziehen', en: 'to move house (ist umgezogen)' },
    ],
    ex: [
      { t: 'mc', q: 'Das Buch liegt auf ___ Tisch.', options: ['den', 'dem', 'der'], a: 1, explain: 'liegen = position → dative.' },
      { t: 'mc', q: 'Ich lege das Buch auf ___ Tisch.', options: ['den', 'dem', 'der'], a: 0, explain: 'legen = movement → accusative.' },
      { t: 'mc', q: 'Die Katze schläft unter ___ Bett.', options: ['das', 'dem', 'den'], a: 1 },
      { t: 'fill', q: 'Wir gehen heute ___ Kino. (in + das)', a: ['ins'] },
      { t: 'fill', q: 'Das Bild hängt an ___ Wand.', a: ['der'] },
      { t: 'fill', q: 'Ich stelle die Blumen auf ___ Balkon. (der Balkon)', a: ['den'] },
      { t: 'mc', q: 'Die Flasche ___ im Kühlschrank.', options: ['stellt', 'steht', 'legt', 'setzt'], a: 1 },
      { t: 'order', en: 'The keys are lying on the chair.', de: 'Die Schlüssel liegen auf dem Stuhl' },
      { t: 'translate', en: 'I am putting the cup on the table. (die Tasse)', a: ['Ich stelle die Tasse auf den Tisch.'] },
      { t: 'listen', text: 'Unsere Wohnung hat drei Zimmer, eine Küche und einen Balkon.', en: 'Our flat has three rooms, a kitchen and a balcony.' },
      { t: 'speak', text: 'Neben dem Fenster steht ein großer Schrank.' },
    ],
  },
  {
    id: 'a2-4', level: 'A2', icon: '🎁', title: 'Geschenke', sub: 'Dative case & dative verbs',
    can: 'Say who you give things to, talk about likes with gefallen.',
    grammar: {
      title: 'The dative: indirect object & dative verbs',
      html: `<p>The <b>dative</b> marks the receiver: <i>Ich schenke <b>meiner Mutter</b> (Dat) <b>einen Schal</b> (Akk).</i></p>
<table class="tbl"><tr><th></th><th>Nom</th><th>Akk</th><th>Dat</th></tr>
<tr><td>ich</td><td>ich</td><td>mich</td><td><b>mir</b></td></tr><tr><td>du</td><td>du</td><td>dich</td><td><b>dir</b></td></tr>
<tr><td>er</td><td>er</td><td>ihn</td><td><b>ihm</b></td></tr><tr><td>sie</td><td>sie</td><td>sie</td><td><b>ihr</b></td></tr>
<tr><td>es</td><td>es</td><td>es</td><td><b>ihm</b></td></tr><tr><td>wir</td><td>wir</td><td>uns</td><td><b>uns</b></td></tr>
<tr><td>ihr</td><td>ihr</td><td>euch</td><td><b>euch</b></td></tr><tr><td>sie/Sie</td><td>sie/Sie</td><td>sie/Sie</td><td><b>ihnen/Ihnen</b></td></tr></table>
<p><b>Verbs with dative</b>: helfen, danken, gefallen, gehören, schmecken, passen, gratulieren, antworten. <br/><i>Das Kleid <b>gefällt mir</b>. Kann ich <b>dir</b> helfen? Das Buch <b>gehört ihm</b>.</i></p>
<div class="tip">Word order: dative noun before accusative noun — but an accusative <b>pronoun</b> comes first: <i>Ich gebe <b>es</b> <b>meinem Bruder</b>.</i></div>`,
    },
    vocab: [
      { de: 'Geschenk', en: 'present, gift', g: 'das', pl: 'Geschenke' },
      { de: 'schenken', en: 'to give (as a gift)' },
      { de: 'geben', en: 'to give (du gibst)' },
      { de: 'gefallen', en: 'to please (es gefällt mir = I like it)' },
      { de: 'gehören', en: 'to belong to' },
      { de: 'schmecken', en: 'to taste (good)' },
      { de: 'passen', en: 'to fit / suit' },
      { de: 'gratulieren', en: 'to congratulate' },
      { de: 'Kleid', en: 'dress', g: 'das', pl: 'Kleider' },
      { de: 'Hose', en: 'trousers', g: 'die', pl: 'Hosen' },
      { de: 'Blume', en: 'flower', g: 'die', pl: 'Blumen' },
      { de: 'Freundin', en: 'friend (f) / girlfriend', g: 'die', pl: 'Freundinnen' },
    ],
    ex: [
      { t: 'mc', q: 'Kannst du ___ helfen? (me)', options: ['mich', 'mir', 'mein'], a: 1 },
      { t: 'mc', q: 'Das Kleid gefällt ___. (her)', options: ['sie', 'ihr', 'ihn'], a: 1 },
      { t: 'fill', q: 'Ich schenke ___ Vater ein Buch. (my)', a: ['meinem'] },
      { t: 'fill', q: 'Wir danken ___ Lehrerin. (the)', a: ['der'] },
      { t: 'fill', q: 'Gehört das Auto ___? (you, informal)', a: ['dir'] },
      { t: 'fill', q: 'Ich gratuliere ___ zum Geburtstag! (you, formal)', a: ['Ihnen'] },
      { t: 'mc', q: 'Wie schmeckt ___ die Suppe? (to you pl.)', options: ['euch', 'ihr', 'eure'], a: 0 },
      { t: 'order', en: 'I give my sister flowers.', de: 'Ich gebe meiner Schwester Blumen' },
      { t: 'translate', en: 'The trousers don\'t fit me.', a: ['Die Hose passt mir nicht.'] },
      { t: 'listen', text: 'Was schenkst du deinem Bruder zum Geburtstag?', en: 'What are you giving your brother for his birthday?' },
      { t: 'speak', text: 'Die Jacke gefällt mir sehr gut, aber sie ist zu teuer.' },
    ],
  },
  {
    id: 'a2-5', level: 'A2', icon: '⚖️', title: 'Vergleiche', sub: 'Comparative & superlative',
    can: 'Compare cities, people and things.',
    grammar: {
      title: 'Komparativ & Superlativ',
      html: `<table class="tbl"><tr><th>positive</th><th>comparative (+er)</th><th>superlative (am …sten)</th></tr>
<tr><td>schnell</td><td>schnell<b>er</b></td><td>am schnell<b>sten</b></td></tr>
<tr><td>alt</td><td><b>ä</b>lter</td><td>am <b>ä</b>ltesten</td></tr>
<tr><td>groß</td><td>gr<b>ö</b>ßer</td><td>am gr<b>ö</b>ßten</td></tr>
<tr><td>gut</td><td><b>besser</b></td><td>am <b>besten</b></td></tr>
<tr><td>viel</td><td><b>mehr</b></td><td>am <b>meisten</b></td></tr>
<tr><td>gern</td><td><b>lieber</b></td><td>am <b>liebsten</b></td></tr>
<tr><td>hoch</td><td><b>höher</b></td><td>am <b>höchsten</b></td></tr></table>
<p class="ex">Berlin ist größer <b>als</b> München. Mein Bruder ist <b>so</b> groß <b>wie</b> ich.</p>
<div class="tip">Comparison: <b>als</b> (than) for difference, <b>so … wie</b> (as … as) for equality. Before a noun the comparative takes adjective endings: <i>ein schnell<b>eres</b> Auto, das schnell<b>ste</b> Auto</i>.</div>`,
    },
    vocab: [
      { de: 'schnell', en: 'fast' },
      { de: 'langsam', en: 'slow' },
      { de: 'teuer', en: 'expensive (teurer)' },
      { de: 'billig', en: 'cheap' },
      { de: 'laut', en: 'loud' },
      { de: 'ruhig', en: 'quiet, calm' },
      { de: 'warm', en: 'warm (wärmer)' },
      { de: 'kalt', en: 'cold (kälter)' },
      { de: 'Stadt', en: 'city, town', g: 'die', pl: 'Städte' },
      { de: 'Dorf', en: 'village', g: 'das', pl: 'Dörfer' },
      { de: 'Land', en: 'countryside (auf dem Land)', g: 'das', pl: 'Länder' },
      { de: 'Leben', en: 'life', g: 'das', pl: '-' },
    ],
    ex: [
      { t: 'fill', q: 'Ein Flugzeug ist ___ als ein Zug. (schnell)', a: ['schneller'] },
      { t: 'fill', q: 'Im Sommer ist es ___ als im Winter. (warm)', a: ['wärmer'] },
      { t: 'fill', q: 'Ich trinke ___ Tee als Kaffee. (gern)', a: ['lieber'] },
      { t: 'fill', q: 'Wer spielt am ___? (gut)', a: ['besten'] },
      { t: 'mc', q: 'Anna ist so alt ___ Tom.', options: ['als', 'wie', 'wenn', 'dann'], a: 1 },
      { t: 'mc', q: 'Die Zugspitze ist der ___ Berg in Deutschland.', options: ['höchste', 'hochste', 'höhere', 'hochere'], a: 0 },
      { t: 'mc', q: 'Das Leben in der Stadt ist teurer ___ auf dem Land.', options: ['wie', 'als', 'so', 'denn'], a: 1 },
      { t: 'order', en: 'My flat is bigger than your flat.', de: 'Meine Wohnung ist größer als deine Wohnung' },
      { t: 'translate', en: 'I like summer best.', a: ['Ich mag den Sommer am liebsten.', 'Am liebsten mag ich den Sommer.', 'Der Sommer gefällt mir am besten.'] },
      { t: 'listen', text: 'Auf dem Land ist es ruhiger, aber in der Stadt gibt es mehr Arbeit.', en: 'In the countryside it is quieter, but in the city there is more work.' },
      { t: 'speak', text: 'Ich finde, das Leben auf dem Land ist gesünder als in der Stadt.' },
    ],
  },
  {
    id: 'a2-6', level: 'A2', icon: '🔗', title: 'Weil & dass', sub: 'Subordinate clauses',
    can: 'Give reasons and opinions with weil, dass, wenn.',
    grammar: {
      title: 'Nebensätze — the verb goes to the END',
      html: `<p>After <b>weil</b> (because), <b>dass</b> (that), <b>wenn</b> (if/when), <b>ob</b> (whether), the conjugated verb goes to the <b>end</b>:</p>
<p class="ex">Ich lerne Deutsch, <b>weil</b> ich in Deutschland <b>studieren möchte</b>.<br/>Ich glaube, <b>dass</b> das Wetter morgen schön <b>wird</b>.<br/><b>Wenn</b> ich Zeit <b>habe</b>, <b>komme</b> ich.</p>
<div class="tip"><b>Subordinate clause first?</b> Then the main clause starts with the verb: <i>Wenn es regnet, <b>bleibe</b> ich zu Hause.</i> (verb – comma – verb)<br/>Separable verbs join up again: <i>…, weil ich früh <b>aufstehe</b>.</i></div>
<p>Compare with <b>main-clause connectors</b> (position 0, no change): <b>und, aber, oder, denn, sondern</b>: <i>Ich bleibe zu Hause, <b>denn</b> ich <b>bin</b> krank.</i></p>`,
    },
    vocab: [
      { de: 'weil', en: 'because (verb at end)' },
      { de: 'denn', en: 'because (normal word order)' },
      { de: 'dass', en: 'that' },
      { de: 'wenn', en: 'if, when(ever)' },
      { de: 'ob', en: 'whether, if' },
      { de: 'glauben', en: 'to believe' },
      { de: 'finden', en: 'to find / think (opinion)' },
      { de: 'Meinung', en: 'opinion', g: 'die', pl: 'Meinungen' },
      { de: 'krank', en: 'ill, sick' },
      { de: 'müde', en: 'tired' },
      { de: 'Grund', en: 'reason', g: 'der', pl: 'Gründe' },
      { de: 'wichtig', en: 'important' },
    ],
    ex: [
      { t: 'order', en: 'I\'m staying at home because I am ill.', de: 'Ich bleibe zu Hause weil ich krank bin' },
      { t: 'order', en: 'I think that German is important.', de: 'Ich finde dass Deutsch wichtig ist' },
      { t: 'order', en: 'If I have time, I\'ll call you.', de: 'Wenn ich Zeit habe rufe ich dich an' },
      { t: 'mc', q: 'Ich komme nicht, ___ ich muss arbeiten.', options: ['weil', 'denn', 'dass', 'wenn'], a: 1, explain: '"ich muss" = normal order → denn.' },
      { t: 'mc', q: 'Ich komme nicht, ___ ich arbeiten muss.', options: ['weil', 'denn', 'aber', 'und'], a: 0 },
      { t: 'mc', q: 'Weißt du, ___ der Supermarkt heute offen ist?', options: ['dass', 'ob', 'wenn', 'weil'], a: 1, explain: 'Yes/no question in a clause → ob.' },
      { t: 'mc', q: 'Wenn es regnet, ___', options: ['ich bleibe zu Hause.', 'bleibe ich zu Hause.', 'ich zu Hause bleibe.'], a: 1 },
      { t: 'fill', q: 'Er sagt, dass er morgen früh ___. (aufstehen)', a: ['aufsteht'] },
      { t: 'translate', en: 'I am tired because I worked a lot.', a: ['Ich bin müde, weil ich viel gearbeitet habe.'] },
      { t: 'listen', text: 'Ich glaube, dass wir den Zug noch bekommen.', en: 'I think we will still catch the train.' },
      { t: 'speak', text: 'Ich lerne jeden Tag, weil ich die Prüfung bestehen möchte.' },
    ],
  },
  {
    id: 'a2-7', level: 'A2', icon: '🪞', title: 'Gesundheit', sub: 'Reflexive verbs & Präteritum of modals',
    can: 'Talk about health, feelings and what you had to do.',
    grammar: {
      title: 'Reflexive verbs & modal verbs in the past',
      html: `<p><b>Reflexive verbs</b> use a pronoun that refers back to the subject:</p>
<table class="tbl"><tr><th></th><th>sich freuen (Akk)</th><th>sich etwas wünschen (Dat)</th></tr>
<tr><td>ich</td><td>freue <b>mich</b></td><td>wünsche <b>mir</b></td></tr><tr><td>du</td><td>freust <b>dich</b></td><td>wünschst <b>dir</b></td></tr>
<tr><td>er/sie/es</td><td>freut <b>sich</b></td><td>wünscht <b>sich</b></td></tr><tr><td>wir</td><td>freuen <b>uns</b></td><td>wünschen <b>uns</b></td></tr>
<tr><td>ihr</td><td>freut <b>euch</b></td><td>wünscht <b>euch</b></td></tr><tr><td>sie/Sie</td><td>freuen <b>sich</b></td><td>wünschen <b>sich</b></td></tr></table>
<p>Common: sich fühlen, sich ausruhen, sich erkälten, sich beeilen, sich interessieren für, sich freuen auf/über, sich ärgern über.</p>
<p><b>Modals in the past</b> are almost always Präteritum (no umlaut!): ich <b>konnte</b>, musste, wollte, durfte, sollte · du konnte<b>st</b> · wir konnte<b>n</b>.</p>
<div class="tip"><i>Ich <b>musste</b> gestern zum Arzt gehen.</i> — much more natural than the Perfekt.</div>`,
    },
    vocab: [
      { de: 'sich fühlen', en: 'to feel' },
      { de: 'sich erkälten', en: 'to catch a cold' },
      { de: 'sich ausruhen', en: 'to rest' },
      { de: 'sich beeilen', en: 'to hurry' },
      { de: 'sich freuen auf', en: 'to look forward to' },
      { de: 'Kopf', en: 'head', g: 'der', pl: 'Köpfe' },
      { de: 'Bauch', en: 'stomach, belly', g: 'der', pl: 'Bäuche' },
      { de: 'Schmerzen', en: 'pain (usually plural)', pl: 'Schmerzen', ex: 'Ich habe Kopfschmerzen.' },
      { de: 'Fieber', en: 'fever', g: 'das', pl: '-' },
      { de: 'Termin', en: 'appointment', g: 'der', pl: 'Termine' },
      { de: 'Medikament', en: 'medicine', g: 'das', pl: 'Medikamente' },
      { de: 'gesund', en: 'healthy' },
    ],
    ex: [
      { t: 'fill', q: 'Ich fühle ___ nicht gut.', a: ['mich'] },
      { t: 'fill', q: 'Wir freuen ___ auf den Urlaub.', a: ['uns'] },
      { t: 'fill', q: 'Beeil ___! Der Bus kommt. (du)', a: ['dich'] },
      { t: 'fill', q: 'Was wünschst du ___ zum Geburtstag?', a: ['dir'] },
      { t: 'fill', q: 'Gestern ___ ich nicht kommen. (können)', a: ['konnte'] },
      { t: 'fill', q: 'Wir ___ lange warten. (müssen, Präteritum)', a: ['mussten'] },
      { t: 'mc', q: 'Er hat ___ erkältet.', options: ['sich', 'ihn', 'ihm', 'er'], a: 0 },
      { t: 'order', en: 'I have to make an appointment with the doctor.', de: 'Ich muss einen Termin beim Arzt machen' },
      { t: 'translate', en: 'I have a headache and a fever.', a: ['Ich habe Kopfschmerzen und Fieber.'] },
      { t: 'listen', text: 'Sie sollten sich ein paar Tage ausruhen.', en: 'You should rest for a few days.' },
      { t: 'speak', text: 'Ich habe mich erkältet und konnte nicht zur Arbeit gehen.' },
    ],
  },
];
