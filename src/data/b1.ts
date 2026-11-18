import type { Unit } from '../types';

export const B1: Unit[] = [
  {
    id: 'b1-1', level: 'B1', icon: '🎨', title: 'Adjektivendungen', sub: 'Adjective endings',
    can: 'Describe people and things precisely with correct endings.',
    grammar: {
      title: 'Adjective declension — the 3 tables',
      html: `<p>Adjectives <b>before a noun</b> take an ending. Which ending depends on the article in front.</p>
<p><b>1. After der/die/das (weak):</b> only <b>-e</b> or <b>-en</b>.</p>
<table class="tbl"><tr><th></th><th>m</th><th>f</th><th>n</th><th>pl</th></tr>
<tr><td>Nom</td><td>der alt<b>e</b></td><td>die alt<b>e</b></td><td>das alt<b>e</b></td><td>die alt<b>en</b></td></tr>
<tr><td>Akk</td><td>den alt<b>en</b></td><td>die alt<b>e</b></td><td>das alt<b>e</b></td><td>die alt<b>en</b></td></tr>
<tr><td>Dat</td><td>dem alt<b>en</b></td><td>der alt<b>en</b></td><td>dem alt<b>en</b></td><td>den alt<b>en</b></td></tr>
<tr><td>Gen</td><td>des alt<b>en</b></td><td>der alt<b>en</b></td><td>des alt<b>en</b></td><td>der alt<b>en</b></td></tr></table>
<p><b>2. After ein/kein/mein (mixed):</b> like table 1, except where <i>ein</i> has no ending — then the adjective shows the gender: ein alt<b>er</b> Mann, ein alt<b>es</b> Haus.</p>
<table class="tbl"><tr><th></th><th>m</th><th>f</th><th>n</th><th>pl</th></tr>
<tr><td>Nom</td><td>ein alt<b>er</b></td><td>eine alt<b>e</b></td><td>ein alt<b>es</b></td><td>keine alt<b>en</b></td></tr>
<tr><td>Akk</td><td>einen alt<b>en</b></td><td>eine alt<b>e</b></td><td>ein alt<b>es</b></td><td>keine alt<b>en</b></td></tr>
<tr><td>Dat</td><td>einem alt<b>en</b></td><td>einer alt<b>en</b></td><td>einem alt<b>en</b></td><td>keinen alt<b>en</b></td></tr></table>
<p><b>3. No article (strong):</b> the adjective takes the article's ending: kalt<b>er</b> Kaffee, mit kalt<b>em</b> Wasser, frisch<b>e</b> Milch (Gen m/n: -en: trotz schlecht<b>en</b> Wetters).</p>
<div class="tip">Infinite practice: <b>Drills → Adjective endings</b> generates new phrases every time.</div>`,
    },
    vocab: [
      { de: 'freundlich', en: 'friendly' },
      { de: 'ehrlich', en: 'honest' },
      { de: 'zuverlässig', en: 'reliable' },
      { de: 'neugierig', en: 'curious' },
      { de: 'gemütlich', en: 'cosy' },
      { de: 'hell', en: 'bright, light' },
      { de: 'dunkel', en: 'dark (dunkle Farben)' },
      { de: 'bequem', en: 'comfortable' },
      { de: 'Eigenschaft', en: 'characteristic, quality', g: 'die', pl: 'Eigenschaften' },
      { de: 'Aussehen', en: 'appearance', g: 'das', pl: '-' },
      { de: 'Farbe', en: 'colour', g: 'die', pl: 'Farben' },
      { de: 'Mantel', en: 'coat', g: 'der', pl: 'Mäntel' },
    ],
    ex: [
      { t: 'fill', q: 'Der freundlich___ Mann hilft mir.', a: ['e'], hint: 'ending only' },
      { t: 'fill', q: 'Ich kaufe einen warm___ Mantel.', a: ['en'], hint: 'ending only' },
      { t: 'fill', q: 'Das ist ein gemütlich___ Café.', a: ['es'], hint: 'ending only' },
      { t: 'fill', q: 'Wir wohnen in einer hell___ Wohnung.', a: ['en'], hint: 'ending only' },
      { t: 'fill', q: 'Ich trinke gern kalt___ Wasser.', a: ['es'], hint: 'ending only' },
      { t: 'fill', q: 'Mit groß___ Freude habe ich deinen Brief gelesen.', a: ['er'], hint: 'ending only', explain: 'No article, dative feminine → -er.' },
      { t: 'mc', q: 'Er hat ___ Augen.', options: ['blaue', 'blauen', 'blaues', 'blauer'], a: 0, explain: 'No article, accusative plural → -e.' },
      { t: 'mc', q: 'Ich spreche mit dem ___ Kollegen.', options: ['neue', 'neuen', 'neuem', 'neuer'], a: 1 },
      { t: 'translate', en: 'She is wearing a red dress.', a: ['Sie trägt ein rotes Kleid.'] },
      { t: 'listen', text: 'Ich suche einen zuverlässigen Mitarbeiter mit guten Deutschkenntnissen.', en: 'I am looking for a reliable employee with good German skills.' },
      { t: 'speak', text: 'Mein bester Freund ist ein ehrlicher und sehr hilfsbereiter Mensch.' },
    ],
  },
  {
    id: 'b1-2', level: 'B1', icon: '🧩', title: 'Relativsätze', sub: 'Relative clauses',
    can: 'Define and describe things with "who/which/that".',
    grammar: {
      title: 'Relative clauses (der, die, das …)',
      html: `<p>A relative clause describes a noun. The <b>relative pronoun</b> takes its <b>gender/number from the noun</b> and its <b>case from its role in the relative clause</b>. Verb at the end!</p>
<table class="tbl"><tr><th></th><th>m</th><th>f</th><th>n</th><th>pl</th></tr>
<tr><td>Nom</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Akk</td><td><b>den</b></td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Dat</td><td><b>dem</b></td><td><b>der</b></td><td><b>dem</b></td><td><b>denen</b></td></tr>
<tr><td>Gen</td><td><b>dessen</b></td><td><b>deren</b></td><td><b>dessen</b></td><td><b>deren</b></td></tr></table>
<p class="ex">Das ist der Mann, <b>der</b> neben mir wohnt. (Nom)<br/>Das ist der Mann, <b>den</b> ich gestern gesehen habe. (Akk)<br/>Das ist der Mann, <b>dem</b> ich geholfen habe. (Dat)<br/>Das ist der Mann, <b>mit dem</b> ich arbeite. (Präp + Dat)<br/>Das ist der Mann, <b>dessen</b> Auto kaputt ist. (Gen)</p>
<div class="tip">After <b>alles, etwas, nichts, das</b> use <b>was</b>: <i>Das ist alles, <b>was</b> ich weiß.</i> After places use <b>wo</b>: <i>die Stadt, <b>wo</b> ich wohne</i>.</div>`,
    },
    vocab: [
      { de: 'Kollege', en: 'colleague (m)', g: 'der', pl: 'Kollegen' },
      { de: 'Nachbar', en: 'neighbour (m)', g: 'der', pl: 'Nachbarn' },
      { de: 'Mensch', en: 'human being, person', g: 'der', pl: 'Menschen' },
      { de: 'Gegenstand', en: 'object, item', g: 'der', pl: 'Gegenstände' },
      { de: 'Gerät', en: 'device, appliance', g: 'das', pl: 'Geräte' },
      { de: 'benutzen', en: 'to use' },
      { de: 'erklären', en: 'to explain' },
      { de: 'kennenlernen', en: 'to get to know, meet' },
      { de: 'sich verlassen auf', en: 'to rely on' },
      { de: 'ausleihen', en: 'to borrow / lend' },
      { de: 'Werkzeug', en: 'tool', g: 'das', pl: 'Werkzeuge' },
    ],
    ex: [
      { t: 'mc', q: 'Das ist die Frau, ___ in Berlin wohnt.', options: ['der', 'die', 'den', 'deren'], a: 1 },
      { t: 'mc', q: 'Der Film, ___ wir gesehen haben, war super.', options: ['der', 'den', 'dem', 'dessen'], a: 1 },
      { t: 'mc', q: 'Die Kinder, mit ___ ich spiele, sind nett.', options: ['die', 'denen', 'den', 'deren'], a: 1 },
      { t: 'fill', q: 'Das ist der Kollege, ___ ich oft helfe.', a: ['dem'], explain: 'helfen + Dativ, masculine → dem.' },
      { t: 'fill', q: 'Wie heißt das Buch, ___ du gerade liest?', a: ['das'] },
      { t: 'fill', q: 'Meine Nachbarin, ___ Hund immer bellt, ist sehr nett.', a: ['deren'] },
      { t: 'fill', q: 'Das ist alles, ___ ich brauche.', a: ['was'] },
      { t: 'order', en: 'That is the man whom I met yesterday.', de: 'Das ist der Mann den ich gestern kennengelernt habe' },
      { t: 'translate', en: 'A friend is a person you can rely on.', a: ['Ein Freund ist ein Mensch, auf den man sich verlassen kann.'] },
      { t: 'listen', text: 'Die Stadt, in der ich aufgewachsen bin, liegt am Rhein.', en: 'The town I grew up in lies on the Rhine.' },
      { t: 'speak', text: 'Ein Handy ist ein Gerät, das man jeden Tag benutzt.' },
    ],
  },
  {
    id: 'b1-3', level: 'B1', icon: '💭', title: 'Wünsche & Träume', sub: 'Konjunktiv II (present)',
    can: 'Express wishes, hypotheses and polite requests.',
    grammar: {
      title: 'Konjunktiv II — würde, hätte, wäre, könnte',
      html: `<p>Use Konjunktiv II for <b>unreal situations, wishes, advice and politeness</b>.</p>
<table class="tbl"><tr><th></th><th>sein</th><th>haben</th><th>können</th><th>würde + Inf.</th></tr>
<tr><td>ich</td><td>wäre</td><td>hätte</td><td>könnte</td><td>würde gehen</td></tr>
<tr><td>du</td><td>wärst</td><td>hättest</td><td>könntest</td><td>würdest gehen</td></tr>
<tr><td>er/sie/es</td><td>wäre</td><td>hätte</td><td>könnte</td><td>würde gehen</td></tr>
<tr><td>wir</td><td>wären</td><td>hätten</td><td>könnten</td><td>würden gehen</td></tr>
<tr><td>ihr</td><td>wärt</td><td>hättet</td><td>könntet</td><td>würdet gehen</td></tr>
<tr><td>sie/Sie</td><td>wären</td><td>hätten</td><td>könnten</td><td>würden gehen</td></tr></table>
<p class="ex">Wish: <i>Wenn ich mehr Zeit <b>hätte</b>, <b>würde</b> ich mehr reisen.</i> / <i>Ich wünschte, ich <b>wäre</b> am Meer.</i><br/>Advice: <i>Du <b>solltest</b> mehr schlafen. An deiner Stelle <b>würde</b> ich …</i><br/>Polite: <i><b>Könnten</b> Sie mir bitte helfen? Ich <b>hätte</b> gern ein Glas Wasser.</i></p>
<div class="tip">Also common: müsste, dürfte, sollte, wüsste (wissen), käme (kommen), ginge (gehen), gäbe (es gibt → es gäbe).</div>`,
    },
    vocab: [
      { de: 'Wunsch', en: 'wish', g: 'der', pl: 'Wünsche' },
      { de: 'Traum', en: 'dream', g: 'der', pl: 'Träume' },
      { de: 'träumen von', en: 'to dream of' },
      { de: 'reich', en: 'rich' },
      { de: 'Lotto', en: 'lottery', g: 'das', pl: '-' },
      { de: 'gewinnen', en: 'to win (gewonnen)' },
      { de: 'Weltreise', en: 'trip around the world', g: 'die', pl: 'Weltreisen' },
      { de: 'Rat', en: 'advice', g: 'der', pl: 'Ratschläge' },
      { de: 'an deiner Stelle', en: 'if I were you' },
      { de: 'Möglichkeit', en: 'possibility', g: 'die', pl: 'Möglichkeiten' },
      { de: 'sich vorstellen', en: 'to imagine (Dat)', ex: 'Stell dir vor!' },
    ],
    ex: [
      { t: 'fill', q: 'Wenn ich reich ___, würde ich ein Haus kaufen. (sein)', a: ['wäre'] },
      { t: 'fill', q: 'Wenn wir Zeit ___, kämen wir mit. (haben)', a: ['hätten'] },
      { t: 'fill', q: '___ Sie mir bitte das Salz geben? (können)', a: ['Könnten'] },
      { t: 'fill', q: 'An deiner Stelle ___ ich zum Arzt gehen.', a: ['würde'] },
      { t: 'fill', q: 'Du ___ weniger arbeiten. (sollen, advice)', a: ['solltest'] },
      { t: 'mc', q: 'Ich wünschte, es ___ schon Freitag.', options: ['ist', 'war', 'wäre', 'würde'], a: 2 },
      { t: 'mc', q: 'Wenn es keine Autos ___, wäre die Luft sauberer.', options: ['gibt', 'gäbe', 'geben', 'gab'], a: 1 },
      { t: 'order', en: 'If I won the lottery, I would travel around the world.', de: 'Wenn ich im Lotto gewinnen würde würde ich eine Weltreise machen' },
      { t: 'translate', en: 'I would like a coffee. (polite)', a: ['Ich hätte gern einen Kaffee.', 'Ich möchte einen Kaffee.', 'Ich hätte gerne einen Kaffee.'] },
      { t: 'listen', text: 'Wenn ich du wäre, würde ich das Angebot annehmen.', en: 'If I were you, I would accept the offer.' },
      { t: 'speak', text: 'Wenn ich mehr Zeit hätte, würde ich ein Instrument lernen.' },
    ],
  },
  {
    id: 'b1-4', level: 'B1', icon: '🏭', title: 'Wie wird das gemacht?', sub: 'Passive voice',
    can: 'Describe processes and what is done.',
    grammar: {
      title: 'Das Passiv (werden + Partizip II)',
      html: `<p>The passive focuses on the <b>action</b>, not who does it.</p>
<table class="tbl"><tr><th>tense</th><th>passive</th></tr>
<tr><td>Präsens</td><td>Das Auto <b>wird</b> repariert.</td></tr>
<tr><td>Präteritum</td><td>Das Auto <b>wurde</b> repariert.</td></tr>
<tr><td>Perfekt</td><td>Das Auto <b>ist</b> repariert <b>worden</b>.</td></tr>
<tr><td>with modal</td><td>Das Auto <b>muss</b> repariert <b>werden</b>.</td></tr></table>
<p><b>werden</b>: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden · Prät.: wurde, wurdest, wurde, wurden, wurdet, wurden.</p>
<div class="tip">Agent with <b>von + Dativ</b> (person): <i>Das Haus wurde <b>von meinem Großvater</b> gebaut.</i> Cause/means with <b>durch</b>: <i>Die Stadt wurde <b>durch</b> ein Erdbeben zerstört.</i><br/>In the Perfekt it's <b>worden</b>, not <i>geworden</i>!</div>`,
    },
    vocab: [
      { de: 'herstellen', en: 'to produce, manufacture' },
      { de: 'bauen', en: 'to build' },
      { de: 'erfinden', en: 'to invent (erfunden)' },
      { de: 'reparieren', en: 'to repair' },
      { de: 'liefern', en: 'to deliver' },
      { de: 'Fabrik', en: 'factory', g: 'die', pl: 'Fabriken' },
      { de: 'Produkt', en: 'product', g: 'das', pl: 'Produkte' },
      { de: 'Rohstoff', en: 'raw material', g: 'der', pl: 'Rohstoffe' },
      { de: 'Umwelt', en: 'environment', g: 'die', pl: '-' },
      { de: 'Müll', en: 'rubbish, waste', g: 'der', pl: '-' },
      { de: 'trennen', en: 'to separate' },
      { de: 'Verpackung', en: 'packaging', g: 'die', pl: 'Verpackungen' },
    ],
    ex: [
      { t: 'fill', q: 'In Deutschland ___ der Müll getrennt. (Präsens)', a: ['wird'] },
      { t: 'fill', q: 'Das Buch ___ 1950 geschrieben. (Präteritum)', a: ['wurde'] },
      { t: 'fill', q: 'Die Pakete werden morgen ___. (liefern)', a: ['geliefert'] },
      { t: 'fill', q: 'Der Computer ist schon repariert ___.', a: ['worden'] },
      { t: 'fill', q: 'Die Fenster müssen geputzt ___.', a: ['werden'] },
      { t: 'mc', q: 'Das Telefon wurde ___ Alexander Graham Bell erfunden.', options: ['von', 'durch', 'mit', 'bei'], a: 0 },
      { t: 'mc', q: 'Active → passive: "Man baut hier ein Hotel."', options: ['Ein Hotel ist hier gebaut.', 'Hier wird ein Hotel gebaut.', 'Hier wurde ein Hotel bauen.', 'Hier wird ein Hotel bauen.'], a: 1 },
      { t: 'order', en: 'The car is produced in Wolfsburg.', de: 'Das Auto wird in Wolfsburg hergestellt' },
      { t: 'translate', en: 'The house was built in 1900.', a: ['Das Haus wurde 1900 gebaut.', 'Das Haus wurde im Jahr 1900 gebaut.'] },
      { t: 'listen', text: 'Zuerst wird der Kaffee geröstet, dann wird er gemahlen und verpackt.', en: 'First the coffee is roasted, then it is ground and packed.' },
      { t: 'speak', text: 'In unserer Firma werden jedes Jahr tausende Produkte hergestellt.' },
    ],
  },
  {
    id: 'b1-5', level: 'B1', icon: '📖', title: 'Es war einmal', sub: 'Präteritum, Plusquamperfekt, als/wenn',
    can: 'Tell stories and biographies in written style.',
    grammar: {
      title: 'Präteritum, Plusquamperfekt & temporal clauses',
      html: `<p>Written narratives (books, news, biographies) use the <b>Präteritum</b>.</p>
<table class="tbl"><tr><th></th><th>regular (machen)</th><th>irregular (gehen)</th></tr>
<tr><td>ich</td><td>mach<b>te</b></td><td>ging</td></tr><tr><td>du</td><td>mach<b>test</b></td><td>ging<b>st</b></td></tr>
<tr><td>er/sie/es</td><td>mach<b>te</b></td><td>ging</td></tr><tr><td>wir</td><td>mach<b>ten</b></td><td>ging<b>en</b></td></tr>
<tr><td>ihr</td><td>mach<b>tet</b></td><td>ging<b>t</b></td></tr><tr><td>sie/Sie</td><td>mach<b>ten</b></td><td>ging<b>en</b></td></tr></table>
<p><b>Plusquamperfekt</b> (past before the past) = hatte/war + Partizip II: <i>Als ich ankam, <b>war</b> der Zug schon <b>abgefahren</b>.</i></p>
<div class="tip"><b>als</b> = one single event in the past (<i>Als ich 10 war, …</i>).<br/><b>wenn</b> = repeated events (<i>Immer wenn …</i>) or present/future.<br/><b>nachdem</b> + Plusquamperfekt → main clause Präteritum: <i>Nachdem er gegessen <b>hatte</b>, ging er spazieren.</i><br/><b>bevor</b> (before), <b>während</b> (while), <b>seitdem</b> (since), <b>bis</b> (until).</div>`,
    },
    vocab: [
      { de: 'damals', en: 'back then' },
      { de: 'plötzlich', en: 'suddenly' },
      { de: 'nachdem', en: 'after (conjunction)' },
      { de: 'bevor', en: 'before (conjunction)' },
      { de: 'während', en: 'while / during' },
      { de: 'aufwachsen', en: 'to grow up (wuchs auf, ist aufgewachsen)' },
      { de: 'geboren', en: 'born (ich bin … geboren)' },
      { de: 'sterben', en: 'to die (starb, ist gestorben)' },
      { de: 'Kindheit', en: 'childhood', g: 'die', pl: '-' },
      { de: 'Erinnerung', en: 'memory', g: 'die', pl: 'Erinnerungen' },
      { de: 'Märchen', en: 'fairy tale', g: 'das', pl: 'Märchen' },
      { de: 'Ereignis', en: 'event', g: 'das', pl: 'Ereignisse' },
    ],
    ex: [
      { t: 'fill', q: 'Es ___ einmal ein König. (sein)', a: ['war'] },
      { t: 'fill', q: 'Er ___ jeden Tag in den Wald. (gehen)', a: ['ging'] },
      { t: 'fill', q: 'Wir ___ damals in Hamburg. (wohnen)', a: ['wohnten'] },
      { t: 'fill', q: 'Sie ___ einen langen Brief. (schreiben)', a: ['schrieb'] },
      { t: 'fill', q: 'Plötzlich ___ das Telefon. (klingeln)', a: ['klingelte'] },
      { t: 'mc', q: '___ ich ein Kind war, wohnten wir auf dem Land.', options: ['Wenn', 'Als', 'Wann', 'Ob'], a: 1 },
      { t: 'mc', q: 'Immer ___ es regnete, spielten wir Karten.', options: ['als', 'wenn', 'wann', 'dass'], a: 1 },
      { t: 'mc', q: 'Nachdem sie gegessen ___, ging sie schlafen.', options: ['hat', 'hatte', 'hätte', 'ist'], a: 1 },
      { t: 'order', en: 'When I arrived, the film had already started.', de: 'Als ich ankam hatte der Film schon angefangen' },
      { t: 'translate', en: 'He grew up in a small village.', a: ['Er wuchs in einem kleinen Dorf auf.', 'Er ist in einem kleinen Dorf aufgewachsen.'] },
      { t: 'listen', text: 'Bevor er nach Deutschland kam, hatte er nie Schnee gesehen.', en: 'Before he came to Germany, he had never seen snow.' },
      { t: 'speak', text: 'Als ich klein war, verbrachte ich jeden Sommer bei meinen Großeltern.' },
    ],
  },
  {
    id: 'b1-6', level: 'B1', icon: '🎯', title: 'Ziele', sub: 'zu + infinitive, um … zu, damit',
    can: 'Talk about goals, intentions and plans.',
    grammar: {
      title: 'Infinitive with zu, purpose clauses',
      html: `<p>After many verbs, nouns and adjectives you use <b>zu + infinitive</b> (at the end):</p>
<p class="ex">Ich habe keine Lust, heute <b>zu kochen</b>. Es ist wichtig, regelmäßig <b>zu üben</b>. Ich versuche, früher <b>aufzustehen</b>.</p>
<p>With separable verbs, <b>zu</b> goes between prefix and verb: auf<b>zu</b>stehen, an<b>zu</b>rufen.</p>
<p>Common triggers: anfangen, aufhören, vergessen, versuchen, vorhaben, sich freuen, Lust/Zeit/Angst haben, es ist wichtig/schwer/leicht.</p>
<table class="tbl"><tr><th>purpose</th><th>when</th><th>example</th></tr>
<tr><td><b>um … zu</b></td><td>same subject</td><td>Ich lerne Deutsch, <b>um</b> in Wien <b>zu</b> studieren.</td></tr>
<tr><td><b>damit</b></td><td>different subject</td><td>Ich spreche langsam, <b>damit</b> du mich verstehst.</td></tr></table>
<div class="tip">Also: <b>ohne … zu</b> (without doing) and <b>(an)statt … zu</b> (instead of doing): <i>Er ging, <b>ohne</b> sich <b>zu</b> verabschieden.</i><br/>No <i>zu</i> after modal verbs, nor after <i>lassen, sehen, hören, gehen, bleiben, lernen</i>.</div>`,
    },
    vocab: [
      { de: 'Ziel', en: 'goal, aim', g: 'das', pl: 'Ziele' },
      { de: 'vorhaben', en: 'to plan, intend' },
      { de: 'versuchen', en: 'to try' },
      { de: 'aufhören', en: 'to stop' },
      { de: 'vergessen', en: 'to forget' },
      { de: 'Lust haben', en: 'to feel like (doing)' },
      { de: 'Prüfung', en: 'exam', g: 'die', pl: 'Prüfungen' },
      { de: 'bestehen', en: 'to pass (an exam)' },
      { de: 'Erfolg', en: 'success', g: 'der', pl: 'Erfolge' },
      { de: 'Ausbildung', en: 'vocational training', g: 'die', pl: 'Ausbildungen' },
      { de: 'sich bewerben', en: 'to apply (um eine Stelle)' },
      { de: 'Stelle', en: 'position, job', g: 'die', pl: 'Stellen' },
    ],
    ex: [
      { t: 'fill', q: 'Ich habe vergessen, dich ___. (anrufen)', a: ['anzurufen'] },
      { t: 'fill', q: 'Es ist wichtig, jeden Tag ___ ___. (üben)', a: ['zu üben'] },
      { t: 'fill', q: 'Er hat aufgehört ___ ___. (rauchen)', a: ['zu rauchen'] },
      { t: 'mc', q: 'Ich spare Geld, ___ ein Auto zu kaufen.', options: ['damit', 'um', 'dass', 'für'], a: 1 },
      { t: 'mc', q: 'Ich erkläre es noch einmal, ___ alle es verstehen.', options: ['um', 'damit', 'zu', 'weil'], a: 1, explain: 'Different subjects (ich / alle) → damit.' },
      { t: 'mc', q: 'Which is correct?', options: ['Ich kann zu schwimmen.', 'Ich kann schwimmen.', 'Ich will zu gehen.', 'Ich muss zu arbeiten.'], a: 1 },
      { t: 'mc', q: 'Er ging aus dem Haus, ___ die Tür abzuschließen.', options: ['ohne', 'um', 'damit', 'statt dass'], a: 0 },
      { t: 'order', en: 'I learn German in order to work in Germany.', de: 'Ich lerne Deutsch um in Deutschland zu arbeiten' },
      { t: 'translate', en: 'I don\'t feel like going out today.', a: ['Ich habe heute keine Lust auszugehen.', 'Ich habe heute keine Lust, auszugehen.', 'Ich habe keine Lust, heute auszugehen.'] },
      { t: 'listen', text: 'Ich habe vor, mich nächsten Monat um eine neue Stelle zu bewerben.', en: 'I plan to apply for a new job next month.' },
      { t: 'speak', text: 'Mein Ziel ist es, die B2-Prüfung zu bestehen, um an der Universität zu studieren.' },
    ],
  },
  {
    id: 'b1-7', level: 'B1', icon: '🏛️', title: 'Gesellschaft', sub: 'Genitive & two-part connectors',
    can: 'Write about society with genitive and two-part conjunctions.',
    grammar: {
      title: 'Genitive & zweiteilige Konnektoren',
      html: `<p><b>Genitive</b> shows possession: <i>das Auto <b>des</b> Vater<b>s</b>, die Tasche <b>der</b> Frau, die Meinung <b>der</b> Leute</i>.</p>
<table class="tbl"><tr><th></th><th>m</th><th>f</th><th>n</th><th>pl</th></tr>
<tr><td>Gen</td><td><b>des</b> / eines …(e)s</td><td><b>der</b> / einer</td><td><b>des</b> / eines …(e)s</td><td><b>der</b></td></tr></table>
<p>Genitive prepositions: <b>wegen</b> (because of), <b>trotz</b> (despite), <b>während</b> (during), <b>statt</b> (instead of), <b>innerhalb/außerhalb</b>.</p>
<p class="ex"><b>Wegen des</b> schlechten Wetters bleiben wir zu Hause. <b>Trotz der</b> Kälte gehen wir spazieren.</p>
<table class="tbl"><tr><th>connector</th><th>meaning</th></tr>
<tr><td>sowohl … als auch</td><td>both … and</td></tr><tr><td>weder … noch</td><td>neither … nor</td></tr>
<tr><td>entweder … oder</td><td>either … or</td></tr><tr><td>nicht nur … sondern auch</td><td>not only … but also</td></tr>
<tr><td>zwar … aber</td><td>admittedly … but</td></tr><tr><td>je … desto</td><td>the more … the more (B2)</td></tr></table>`,
    },
    vocab: [
      { de: 'Gesellschaft', en: 'society', g: 'die', pl: 'Gesellschaften' },
      { de: 'Bevölkerung', en: 'population', g: 'die', pl: '-' },
      { de: 'Regierung', en: 'government', g: 'die', pl: 'Regierungen' },
      { de: 'Bürger', en: 'citizen', g: 'der', pl: 'Bürger' },
      { de: 'Entwicklung', en: 'development', g: 'die', pl: 'Entwicklungen' },
      { de: 'Vorteil', en: 'advantage', g: 'der', pl: 'Vorteile' },
      { de: 'Nachteil', en: 'disadvantage', g: 'der', pl: 'Nachteile' },
      { de: 'wegen', en: 'because of (+Gen)' },
      { de: 'trotz', en: 'despite (+Gen)' },
      { de: 'Arbeitslosigkeit', en: 'unemployment', g: 'die', pl: '-' },
      { de: 'Zukunft', en: 'future', g: 'die', pl: '-' },
      { de: 'Verantwortung', en: 'responsibility', g: 'die', pl: '-' },
    ],
    ex: [
      { t: 'fill', q: 'Das ist das Haus ___ Bürgermeisters.', a: ['des'] },
      { t: 'fill', q: 'Die Meinung ___ Bevölkerung ist wichtig.', a: ['der'] },
      { t: 'mc', q: '___ des Regens fand das Konzert statt.', options: ['Wegen', 'Trotz', 'Während', 'Statt'], a: 1 },
      { t: 'mc', q: '___ der Ferien ist die Uni geschlossen.', options: ['Trotz', 'Während', 'Statt', 'Ohne'], a: 1 },
      { t: 'mc', q: 'Er spricht ___ Deutsch ___ Englisch. (both)', options: ['weder … noch', 'sowohl … als auch', 'entweder … oder', 'zwar … aber'], a: 1 },
      { t: 'mc', q: 'Ich habe ___ Zeit ___ Geld. (neither … nor)', options: ['weder … noch', 'sowohl … als auch', 'nicht nur … sondern auch', 'entweder … oder'], a: 0 },
      { t: 'fill', q: 'Wir fahren ___ mit dem Zug oder mit dem Auto.', a: ['entweder'] },
      { t: 'order', en: 'Because of the strike, the trains are not running.', de: 'Wegen des Streiks fahren die Züge nicht' },
      { t: 'translate', en: 'The city is not only beautiful but also cheap.', a: ['Die Stadt ist nicht nur schön, sondern auch billig.', 'Die Stadt ist nicht nur schön, sondern auch günstig.'] },
      { t: 'listen', text: 'Die Arbeitslosigkeit ist zwar gesunken, aber viele Menschen haben trotzdem Angst vor der Zukunft.', en: 'Unemployment has fallen, but many people are still afraid of the future.' },
      { t: 'speak', text: 'Das Internet hat sowohl Vorteile als auch Nachteile für unsere Gesellschaft.' },
    ],
  },
];
