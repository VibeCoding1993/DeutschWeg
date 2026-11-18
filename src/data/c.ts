import type { Unit } from '../types';

export const C1: Unit[] = [
  {
    id: 'c1-1', level: 'C1', icon: '🎓', title: 'Wissenschaftssprache', sub: 'Academic style & Funktionsverbgefüge',
    can: 'Read and write academic and professional texts.',
    grammar: {
      title: 'Features of academic German',
      html: `<ul><li><b>Impersonal constructions:</b> <i>Es lässt sich feststellen, dass … · Es ist davon auszugehen, dass … · Hierbei handelt es sich um …</i></li>
<li><b>Heavy noun phrases with genitive chains:</b> <i>die Analyse der Ursachen des Klimawandels</i></li>
<li><b>Extended participial attributes:</b> <i>die in den letzten Jahren stark gestiegene Zahl der Studierenden</i></li>
<li><b>Funktionsverbgefüge</b> (more formal than the simple verb): <i>zur Anwendung kommen</i> (angewendet werden), <i>in Betracht ziehen</i> (erwägen), <i>Bezug nehmen auf</i> (sich beziehen), <i>zur Sprache bringen</i> (ansprechen), <i>in Anspruch nehmen</i> (nutzen), <i>Stellung nehmen zu</i> (sich äußern)</li>
<li><b>Prepositions of formal style:</b> hinsichtlich, bezüglich, angesichts, mithilfe, anhand, zwecks, infolge (+G)</li></ul>
<div class="tip"><b>C1 writing tip:</b> vary sentence openings (<i>Angesichts …, Hinzu kommt, dass …, Nicht zuletzt …</i>) and avoid repeating <i>und, aber, ich denke</i>.</div>`,
    },
    vocab: [
      { de: 'hinsichtlich', en: 'with regard to (+G)' },
      { de: 'angesichts', en: 'in view of (+G)' },
      { de: 'anhand', en: 'on the basis of, using (+G)' },
      { de: 'in Betracht ziehen', en: 'to take into consideration' },
      { de: 'Bezug nehmen auf', en: 'to refer to' },
      { de: 'Stellung nehmen zu', en: 'to comment on, take a position' },
      { de: 'in Anspruch nehmen', en: 'to make use of, take up (time)' },
      { de: 'Ursache', en: 'cause', g: 'die', pl: 'Ursachen' },
      { de: 'Auswirkung', en: 'effect, impact', g: 'die', pl: 'Auswirkungen' },
      { de: 'Untersuchung', en: 'investigation, study', g: 'die', pl: 'Untersuchungen' },
      { de: 'Befund', en: 'finding', g: 'der', pl: 'Befunde' },
      { de: 'erheblich', en: 'considerable, significant' },
    ],
    ex: [
      { t: 'mc', q: '___ der hohen Kosten wurde das Projekt gestoppt.', options: ['Angesichts', 'Anhand', 'Mithilfe', 'Zwecks'], a: 0 },
      { t: 'fill', q: 'Wir sollten auch andere Lösungen in ___ ziehen.', a: ['Betracht'] },
      { t: 'fill', q: 'Ich nehme ___ auf Ihr Schreiben vom 3. Mai.', a: ['Bezug'] },
      { t: 'fill', q: 'Der Minister wollte zu den Vorwürfen keine ___ nehmen.', a: ['Stellung'] },
      { t: 'mc', q: '"Die Methode wird angewendet." (formal)', options: ['Die Methode kommt zur Anwendung.', 'Die Methode nimmt Anwendung.', 'Die Methode macht Anwendung.', 'Die Methode steht zur Anwendung.'], a: 0 },
      { t: 'mc', q: '"Es ist davon auszugehen, dass …" means', options: ['It must be avoided that …', 'It can be assumed that …', 'It starts from …', 'It is out of the question that …'], a: 1 },
      { t: 'fill', q: 'Die Studie hat ___ der Daten aus 20 Ländern gezeigt, dass … (on the basis of)', a: ['anhand'] },
      { t: 'translate', en: 'The causes of the problem must be examined.', a: ['Die Ursachen des Problems müssen untersucht werden.'] },
      { t: 'listen', text: 'Hinsichtlich der Auswirkungen auf die Umwelt liegen bislang kaum belastbare Befunde vor.', en: 'Regarding the impact on the environment, there are hardly any reliable findings yet.' },
      { t: 'speak', text: 'Angesichts der aktuellen Entwicklungen ist davon auszugehen, dass sich die Lage erheblich verändern wird.' },
    ],
  },
  {
    id: 'c1-2', level: 'C1', icon: '🧂', title: 'Modalpartikeln', sub: 'doch, ja, mal, eben, halt, wohl',
    can: 'Sound natural and understand nuance in spoken German.',
    grammar: {
      title: 'The little words that make German sound native',
      html: `<table class="tbl"><tr><th>particle</th><th>effect</th><th>example</th></tr>
<tr><td><b>doch</b></td><td>"come on" (imperative), reminder of shared knowledge, contradiction</td><td>Komm <b>doch</b> mit! · Das weißt du <b>doch</b>! · Nicht? — <b>Doch</b>!</td></tr>
<tr><td><b>ja</b></td><td>"as we know" / surprise</td><td>Das ist <b>ja</b> toll! · Sie wohnt <b>ja</b> in Berlin.</td></tr>
<tr><td><b>mal</b></td><td>softens requests</td><td>Kannst du <b>mal</b> kommen? · Schau <b>mal</b>!</td></tr>
<tr><td><b>eben / halt</b></td><td>"that's just how it is" (resignation)</td><td>Das ist <b>eben</b> so. · Dann nehmen wir <b>halt</b> den Bus.</td></tr>
<tr><td><b>denn</b></td><td>interest in questions</td><td>Was machst du <b>denn</b> hier?</td></tr>
<tr><td><b>wohl</b></td><td>assumption</td><td>Er ist <b>wohl</b> krank. (He's probably ill.)</td></tr>
<tr><td><b>schon</b></td><td>reassurance / concession</td><td>Das klappt <b>schon</b>. · Das ist <b>schon</b> gut, aber …</td></tr>
<tr><td><b>bloß / nur</b></td><td>warning, desperate questions</td><td>Mach das <b>bloß</b> nicht! · Wo ist <b>nur</b> mein Schlüssel?</td></tr></table>
<div class="tip">Particles are unstressed and sit early in the middle field. They don't translate well — learn them from situations and listen for them in podcasts and films.</div>`,
    },
    vocab: [
      { de: 'doch', en: 'yes (contradicting) / do… (emphasis)' },
      { de: 'halt', en: 'just (resignation, southern/spoken)' },
      { de: 'eben', en: 'just (that\'s how it is)' },
      { de: 'wohl', en: 'probably (assumption)' },
      { de: 'ruhig', en: 'go ahead (Du kannst ruhig fragen.)' },
      { de: 'eigentlich', en: 'actually, by the way' },
      { de: 'überhaupt', en: 'at all / anyway' },
      { de: 'ohnehin', en: 'anyway, in any case' },
      { de: 'Andeutung', en: 'hint, allusion', g: 'die', pl: 'Andeutungen' },
      { de: 'Nuance', en: 'nuance', g: 'die', pl: 'Nuancen' },
    ],
    ex: [
      { t: 'mc', q: '„Du kommst nicht mit, oder?" — „___, ich komme mit!"', options: ['Ja', 'Doch', 'Nein', 'Halt'], a: 1 },
      { t: 'mc', q: 'Softest request:', options: ['Gib mir das Salz!', 'Gib mir mal das Salz!', 'Gib mir halt das Salz!', 'Gib mir wohl das Salz!'], a: 1 },
      { t: 'mc', q: 'Der Bus ist weg. Dann gehen wir ___ zu Fuß.', options: ['denn', 'halt', 'mal', 'ja'], a: 1 },
      { t: 'mc', q: 'Er antwortet nicht. Er schläft ___ noch.', options: ['wohl', 'doch', 'denn', 'mal'], a: 0 },
      { t: 'mc', q: 'Wo bist du ___ gewesen? Ich habe mir Sorgen gemacht!', options: ['denn', 'halt', 'eben', 'mal'], a: 0 },
      { t: 'mc', q: '„Das ist ___ eine tolle Überraschung!" (surprise)', options: ['ja', 'halt', 'mal', 'wohl'], a: 0 },
      { t: 'mc', q: 'Du kannst mich ___ anrufen, wenn du Fragen hast. (go ahead)', options: ['ruhig', 'halt', 'denn', 'bloß'], a: 0 },
      { t: 'listen', text: 'Komm doch einfach mal vorbei, wir haben ja genug Platz.', en: 'Just come by sometime, we have enough room after all.' },
      { t: 'speak', text: 'Das ist halt so, da kann man eben nichts machen.' },
      { t: 'speak', text: 'Was machst du denn hier? Du wolltest doch zu Hause bleiben!' },
    ],
  },
  {
    id: 'c1-3', level: 'C1', icon: '🕵️', title: 'Vermutungen', sub: 'Subjective modal verbs',
    can: 'Express degrees of certainty and report claims.',
    grammar: {
      title: 'Subjektiver Gebrauch der Modalverben',
      html: `<p>Modal verbs can express the <b>speaker's assessment</b> rather than ability/obligation.</p>
<table class="tbl"><tr><th>certainty</th><th>modal</th><th>example</th><th>meaning</th></tr>
<tr><td>~100%</td><td><b>muss</b></td><td>Er <b>muss</b> zu Hause sein, das Licht brennt.</td><td>He must be home.</td></tr>
<tr><td>~90%</td><td><b>dürfte</b></td><td>Das <b>dürfte</b> etwa 50 Euro kosten.</td><td>It's likely to …</td></tr>
<tr><td>~50%</td><td><b>kann / könnte</b></td><td>Sie <b>könnte</b> im Stau stehen.</td><td>She could …</td></tr>
<tr><td>~0%</td><td><b>kann nicht</b></td><td>Das <b>kann nicht</b> stimmen.</td><td>That can't be true.</td></tr>
<tr><td>claim by others</td><td><b>soll</b></td><td>Der Film <b>soll</b> sehr gut sein.</td><td>The film is said to be …</td></tr>
<tr><td>own claim (doubted)</td><td><b>will</b></td><td>Er <b>will</b> das allein geschafft haben.</td><td>He claims to …</td></tr></table>
<p><b>Past:</b> modal + Partizip II + haben/sein: <i>Er <b>muss</b> den Termin <b>vergessen haben</b>. Sie <b>soll</b> früher Model <b>gewesen sein</b>.</i></p>
<div class="tip">Alternatives: <i>wahrscheinlich, vermutlich, angeblich (= soll), offenbar, zweifellos</i>. Also <b>werden</b> + wohl for assumption: <i>Er <b>wird wohl</b> krank sein.</i></div>`,
    },
    vocab: [
      { de: 'angeblich', en: 'allegedly' },
      { de: 'vermutlich', en: 'presumably' },
      { de: 'offenbar', en: 'apparently' },
      { de: 'zweifellos', en: 'undoubtedly' },
      { de: 'Vermutung', en: 'assumption, guess', g: 'die', pl: 'Vermutungen' },
      { de: 'Gerücht', en: 'rumour', g: 'das', pl: 'Gerüchte' },
      { de: 'Täter', en: 'perpetrator, culprit', g: 'der', pl: 'Täter' },
      { de: 'Beweis', en: 'proof, evidence', g: 'der', pl: 'Beweise' },
      { de: 'verschwinden', en: 'to disappear (ist verschwunden)' },
      { de: 'Alibi', en: 'alibi', g: 'das', pl: 'Alibis' },
    ],
    ex: [
      { t: 'mc', q: '"Der Täter soll ins Ausland geflohen sein." means', options: ['The culprit should flee abroad.', 'The culprit is said to have fled abroad.', 'The culprit wants to flee abroad.', 'The culprit must have fled abroad.'], a: 1 },
      { t: 'mc', q: '"Er will nichts gewusst haben." means', options: ['He wants to know nothing.', 'He claims to have known nothing.', 'He is said to know nothing.', 'He didn\'t want to know.'], a: 1 },
      { t: 'mc', q: 'Most certain:', options: ['Er könnte krank sein.', 'Er dürfte krank sein.', 'Er muss krank sein.', 'Er kann krank sein.'], a: 2 },
      { t: 'fill', q: 'Sie hat nicht geantwortet. Sie ___ meine Nachricht nicht gelesen haben. (must)', a: ['muss'] },
      { t: 'fill', q: 'Das ___ nicht stimmen! Ich war doch dabei. (can\'t)', a: ['kann'] },
      { t: 'fill', q: 'Die Reparatur ___ etwa zwei Stunden dauern. (likely → dürfen)', a: ['dürfte'] },
      { t: 'translate', en: 'He must have forgotten the appointment.', a: ['Er muss den Termin vergessen haben.'] },
      { t: 'listen', text: 'Das Restaurant soll das beste der Stadt sein, aber es dürfte ziemlich teuer sein.', en: 'The restaurant is said to be the best in town, but it is probably quite expensive.' },
      { t: 'speak', text: 'Der Schlüssel kann nicht verschwunden sein, er muss hier irgendwo liegen.' },
    ],
  },
  {
    id: 'c1-4', level: 'C1', icon: '🖋️', title: 'Erörterung', sub: 'Text structure & cohesion',
    can: 'Write a well-structured argumentative essay (Erörterung).',
    grammar: {
      title: 'Building a C1 argumentative text',
      html: `<table class="tbl"><tr><th>part</th><th>phrases</th></tr>
<tr><td><b>Einleitung</b></td><td>Die Frage, ob …, wird derzeit kontrovers diskutiert. · In den letzten Jahren hat … zunehmend an Bedeutung gewonnen. · Im Folgenden sollen die Vor- und Nachteile … erörtert werden.</td></tr>
<tr><td><b>Pro</b></td><td>Für … spricht vor allem, dass … · Ein gewichtiges Argument ist … · Hinzu kommt, dass … · Nicht zu unterschätzen ist …</td></tr>
<tr><td><b>Contra</b></td><td>Dem steht entgegen, dass … · Kritiker wenden ein, dass … · Allerdings darf man nicht außer Acht lassen, dass …</td></tr>
<tr><td><b>Beispiel</b></td><td>Dies lässt sich am Beispiel … veranschaulichen. · So zeigt etwa …</td></tr>
<tr><td><b>Schluss</b></td><td>Wägt man die Argumente gegeneinander ab, so … · Zusammenfassend lässt sich festhalten, dass … · Meines Erachtens überwiegen …</td></tr></table>
<p><b>Cohesion devices:</b> pronominal adverbs (<i>dadurch, hierbei, demgegenüber</i>), synonyms instead of repetition, demonstratives (<i>diese Entwicklung, solche Maßnahmen</i>).</p>
<div class="tip">Inversion with conditional clause without <i>wenn</i> is very C1: <i>Betrachtet man die Zahlen genauer, so wird deutlich, dass …</i></div>`,
    },
    vocab: [
      { de: 'erörtern', en: 'to discuss (in writing)' },
      { de: 'abwägen', en: 'to weigh up' },
      { de: 'überwiegen', en: 'to outweigh, predominate' },
      { de: 'einwenden', en: 'to object' },
      { de: 'veranschaulichen', en: 'to illustrate' },
      { de: 'außer Acht lassen', en: 'to disregard' },
      { de: 'gewichtig', en: 'weighty, important' },
      { de: 'kontrovers', en: 'controversial(ly)' },
      { de: 'meines Erachtens', en: 'in my opinion (formal)' },
      { de: 'Bedeutung', en: 'significance, meaning', g: 'die', pl: 'Bedeutungen' },
    ],
    ex: [
      { t: 'mc', q: 'Best opening for an Erörterung:', options: ['Ich schreibe über Handys.', 'Die Frage, ob Handys an Schulen verboten werden sollten, wird derzeit kontrovers diskutiert.', 'Handys sind gut und schlecht.', 'Hallo, heute geht es um Handys.'], a: 1 },
      { t: 'fill', q: 'Kritiker wenden ___, dass die Kosten zu hoch seien.', a: ['ein'] },
      { t: 'fill', q: 'Man darf jedoch nicht außer ___ lassen, dass …', a: ['Acht'] },
      { t: 'fill', q: 'Wägt man die Argumente gegeneinander ___, so überwiegen die Vorteile.', a: ['ab'] },
      { t: 'mc', q: '"Betrachtet man die Zahlen, so …" =', options: ['If one looks at the figures, …', 'One looks at the figures, so …', 'The figures look at one …', 'Look at the figures!'], a: 0 },
      { t: 'fill', q: 'Meines ___ überwiegen die Nachteile.', a: ['Erachtens'] },
      { t: 'order', en: 'In addition, it is cheaper.', de: 'Hinzu kommt dass es günstiger ist' },
      { t: 'listen', text: 'Zusammenfassend lässt sich festhalten, dass die Digitalisierung sowohl Chancen als auch Risiken birgt.', en: 'In summary, digitalisation brings both opportunities and risks.' },
      { t: 'speak', text: 'Für ein Verbot spricht vor allem, dass sich die Schüler besser konzentrieren können.' },
    ],
  },
];

export const C2: Unit[] = [
  {
    id: 'c2-1', level: 'C2', icon: '🦉', title: 'Redewendungen', sub: 'Idioms & fixed expressions',
    can: 'Understand and use idiomatic German naturally.',
    grammar: {
      title: 'Idiomatik — the essentials',
      html: `<table class="tbl"><tr><th>idiom</th><th>literal</th><th>meaning</th></tr>
<tr><td>Ich verstehe nur Bahnhof.</td><td>I only understand "station"</td><td>It's all Greek to me.</td></tr>
<tr><td>Das ist nicht mein Bier.</td><td>That's not my beer</td><td>Not my problem.</td></tr>
<tr><td>Tomaten auf den Augen haben</td><td>tomatoes on the eyes</td><td>to be oblivious</td></tr>
<tr><td>die Daumen drücken</td><td>to press thumbs</td><td>to keep fingers crossed</td></tr>
<tr><td>auf dem Holzweg sein</td><td>to be on the timber track</td><td>to be on the wrong track</td></tr>
<tr><td>jemandem auf den Keks gehen</td><td>to go on someone's biscuit</td><td>to get on someone's nerves</td></tr>
<tr><td>den Nagel auf den Kopf treffen</td><td>hit the nail on the head</td><td>to be exactly right</td></tr>
<tr><td>etwas auf die lange Bank schieben</td><td>push onto the long bench</td><td>to procrastinate</td></tr>
<tr><td>um den heißen Brei herumreden</td><td>talk around the hot porridge</td><td>to beat around the bush</td></tr>
<tr><td>Schwein haben</td><td>to have pig</td><td>to be lucky</td></tr>
<tr><td>ins Fettnäpfchen treten</td><td>step into the little fat bowl</td><td>to put one's foot in it</td></tr>
<tr><td>die Katze im Sack kaufen</td><td>buy the cat in the sack</td><td>to buy a pig in a poke</td></tr></table>
<div class="tip">C2 isn't only idioms: it's choosing the <b>right register</b> instantly — knowing when an idiom fits (chat) and when it doesn't (formal letter).</div>`,
    },
    vocab: [
      { de: 'Holzweg', en: 'wrong track (auf dem Holzweg sein)', g: 'der', pl: 'Holzwege' },
      { de: 'Fettnäpfchen', en: 'faux pas (ins Fettnäpfchen treten)', g: 'das', pl: 'Fettnäpfchen' },
      { de: 'Daumen', en: 'thumb (die Daumen drücken)', g: 'der', pl: 'Daumen' },
      { de: 'Schwein haben', en: 'to be lucky' },
      { de: 'Bahnhof verstehen', en: 'to not understand anything' },
      { de: 'auf den Keks gehen', en: 'to annoy' },
      { de: 'auf die lange Bank schieben', en: 'to put off' },
      { de: 'um den heißen Brei reden', en: 'to beat around the bush' },
      { de: 'Hals- und Beinbruch!', en: 'Break a leg!' },
      { de: 'ins Gras beißen', en: 'to bite the dust (die)' },
    ],
    ex: [
      { t: 'mc', q: 'Your friend explains quantum physics. You: „Ich verstehe nur ___."', options: ['Bahnhof', 'Zug', 'Flughafen', 'Haltestelle'], a: 0 },
      { t: 'mc', q: '„Ich drücke dir die ___!" (good luck)', options: ['Finger', 'Daumen', 'Hände', 'Zehen'], a: 1 },
      { t: 'mc', q: '„Da hast du aber ___ gehabt!" (lucky)', options: ['Schwein', 'Hund', 'Katze', 'Kuh'], a: 0 },
      { t: 'mc', q: 'Mit dieser Theorie bist du auf dem ___.', options: ['Holzweg', 'Waldweg', 'Feldweg', 'Umweg'], a: 0 },
      { t: 'mc', q: 'Red nicht um den heißen ___ herum!', options: ['Brei', 'Kaffee', 'Tee', 'Topf'], a: 0 },
      { t: 'fill', q: 'Du hast den Nagel auf den ___ getroffen.', a: ['Kopf'] },
      { t: 'fill', q: 'Er schiebt die Steuererklärung immer auf die lange ___.', a: ['Bank'] },
      { t: 'match', pairs: [['Das ist nicht mein Bier.', 'not my problem'], ['Tomaten auf den Augen haben', 'be oblivious'], ['ins Fettnäpfchen treten', 'make a faux pas'], ['auf den Keks gehen', 'annoy']] },
      { t: 'listen', text: 'Mit seiner Bemerkung über ihr Alter ist er ganz schön ins Fettnäpfchen getreten.', en: 'With his remark about her age he really put his foot in it.' },
      { t: 'speak', text: 'Hör auf, um den heißen Brei herumzureden, und sag mir endlich die Wahrheit.' },
    ],
  },
  {
    id: 'c2-2', level: 'C2', icon: '🎭', title: 'Register & Stil', sub: 'Formal, neutral, colloquial',
    can: 'Switch effortlessly between registers and choose precise synonyms.',
    grammar: {
      title: 'One meaning — three registers',
      html: `<table class="tbl"><tr><th>colloquial</th><th>neutral</th><th>formal / written</th></tr>
<tr><td>kriegen</td><td>bekommen</td><td>erhalten</td></tr>
<tr><td>kapieren</td><td>verstehen</td><td>nachvollziehen</td></tr>
<tr><td>abhauen</td><td>weggehen</td><td>sich entfernen</td></tr>
<tr><td>quatschen</td><td>reden</td><td>sich unterhalten / erörtern</td></tr>
<tr><td>klauen</td><td>stehlen</td><td>entwenden</td></tr>
<tr><td>pennen</td><td>schlafen</td><td>nächtigen</td></tr>
<tr><td>kaputt</td><td>defekt</td><td>funktionsuntüchtig</td></tr>
<tr><td>Kohle</td><td>Geld</td><td>finanzielle Mittel</td></tr>
<tr><td>checken</td><td>prüfen</td><td>überprüfen / einer Prüfung unterziehen</td></tr></table>
<p><b>Precise synonyms</b> — C2 means choosing exactly: <i>ändern</i> (change sth) vs. <i>sich verändern</i> (change, evolve) vs. <i>wechseln</i> (swap) vs. <i>umwandeln</i> (convert). <i>scheinbar</i> (seemingly, but not really) vs. <i>anscheinend</i> (apparently, probably true).</p>
<div class="tip">Officialese (Amtsdeutsch) loves passive, nouns and genitive: <i>Die Inanspruchnahme der Leistung setzt die fristgerechte Einreichung des Antrags voraus.</i> = You need to apply on time to get it.</div>`,
    },
    vocab: [
      { de: 'erhalten', en: 'to receive (formal)' },
      { de: 'kriegen', en: 'to get (colloquial)' },
      { de: 'nachvollziehen', en: 'to comprehend, follow (reasoning)' },
      { de: 'entwenden', en: 'to steal (formal)' },
      { de: 'scheinbar', en: 'seemingly (but not really)' },
      { de: 'anscheinend', en: 'apparently' },
      { de: 'umwandeln', en: 'to convert' },
      { de: 'Inanspruchnahme', en: 'use, utilisation (officialese)', g: 'die', pl: '-' },
      { de: 'fristgerecht', en: 'on time, within the deadline' },
      { de: 'voraussetzen', en: 'to presuppose, require' },
    ],
    ex: [
      { t: 'mc', q: 'Formal equivalent of "Ich hab den Brief gekriegt."', options: ['Ich habe den Brief erhalten.', 'Ich habe den Brief geklaut.', 'Ich habe den Brief kapiert.', 'Ich habe den Brief gecheckt.'], a: 0 },
      { t: 'mc', q: '"Er ist scheinbar reich" implies…', options: ['he is probably rich', 'he looks rich but isn\'t', 'he is very rich', 'he became rich'], a: 1 },
      { t: 'mc', q: 'Die Polizei meldet, dass ein Fahrrad ___ wurde.', options: ['geklaut', 'entwendet', 'gekriegt', 'abgehauen'], a: 1 },
      { t: 'mc', q: 'Ich kann deine Argumentation gut ___.', options: ['kapieren', 'nachvollziehen', 'checken', 'kriegen'], a: 1 },
      { t: 'mc', q: '"Die Inanspruchnahme der Leistung setzt die fristgerechte Einreichung des Antrags voraus." =', options: ['You must apply on time to get the service.', 'The service is free.', 'The application was late.', 'The deadline was extended.'], a: 0 },
      { t: 'mc', q: 'Die Stadt hat sich in den letzten Jahren stark ___.', options: ['geändert', 'verändert', 'gewechselt', 'umgewandelt'], a: 1 },
      { t: 'translate', en: 'The machine is defective. (neutral)', a: ['Die Maschine ist defekt.', 'Das Gerät ist defekt.'] },
      { t: 'listen', text: 'Anscheinend hat niemand die neuen Vorschriften wirklich nachvollziehen können.', en: 'Apparently nobody could really understand the new rules.' },
      { t: 'speak', text: 'Ihre Unterlagen sind fristgerecht bei uns eingegangen und werden zeitnah bearbeitet.' },
    ],
  },
  {
    id: 'c2-3', level: 'C2', icon: '📜', title: 'Literatur & Syntax', sub: 'Complex syntax & literary forms',
    can: 'Read literature and complex sentences with ease.',
    grammar: {
      title: 'Advanced syntax',
      html: `<ul><li><b>Konditionalsatz ohne wenn</b> (verb first): <i><b>Hätte</b> ich das gewusst, wäre ich geblieben. <b>Sollten</b> Sie Fragen haben, melden Sie sich.</i></li>
<li><b>Konzessivsatz</b> with so/wie: <i><b>So</b> sehr er sich auch bemühte, er schaffte es nicht. <b>Wie</b> dem auch sei, …</i></li>
<li><b>Konjunktiv I for wishes/instructions</b>: <i>Es <b>lebe</b> die Freiheit! Man <b>nehme</b> 200 g Mehl.</i> <i>Gott <b>sei</b> Dank.</i></li>
<li><b>Satzklammer & Nachfeld</b>: elements can be moved after the verb bracket for emphasis: <i>Ich habe ihn gesehen <b>gestern im Park</b>.</i></li>
<li><b>Satzwertige Infinitive & Partizipialkonstruktionen</b>: <i><b>In Berlin angekommen</b>, suchte sie sich ein Hotel. <b>Genau genommen</b> …</i></li>
<li><b>Literary Präteritum</b> of rare strong verbs: <i>schwor, gebar, focht, mied, pries, wob, glomm</i>.</li></ul>
<div class="tip">At C2, read authentic texts daily: Die Zeit, FAZ feuilleton, Kafka, Zweig, Juli Zeh. Note every construction that surprises you.</div>`,
    },
    vocab: [
      { de: 'bemühen (sich)', en: 'to make an effort' },
      { de: 'meiden', en: 'to avoid (mied, gemieden)' },
      { de: 'preisen', en: 'to praise (pries, gepriesen)' },
      { de: 'schwören', en: 'to swear (schwor, geschworen)' },
      { de: 'gebären', en: 'to give birth (gebar, geboren)' },
      { de: 'Erzähler', en: 'narrator', g: 'der', pl: 'Erzähler' },
      { de: 'Feuilleton', en: 'arts/culture section', g: 'das', pl: 'Feuilletons' },
      { de: 'wie dem auch sei', en: 'be that as it may' },
      { de: 'genau genommen', en: 'strictly speaking' },
      { de: 'Andacht', en: 'devotion, reverence', g: 'die', pl: 'Andachten' },
    ],
    ex: [
      { t: 'mc', q: '"Sollten Sie Fragen haben, …" =', options: ['You should have questions …', 'Should you have any questions, …', 'You had questions …', 'If you have had questions …'], a: 1 },
      { t: 'fill', q: '___ sehr er sich auch bemühte, er fand keine Lösung.', a: ['So'] },
      { t: 'fill', q: 'Man ___ drei Eier und verrühre sie mit Zucker. (nehmen, K I)', a: ['nehme'] },
      { t: 'mc', q: 'Präteritum of "meiden":', options: ['meidete', 'mied', 'miedte', 'gemieden'], a: 1 },
      { t: 'mc', q: 'Präteritum of "schwören":', options: ['schwörte', 'schwor', 'schwur', 'schwand'], a: 1, explain: '"schwur" is archaic; standard is "schwor".' },
      { t: 'mc', q: '"In Berlin angekommen, suchte sie ein Hotel." =', options: ['Arriving in Berlin she will look for a hotel.', 'Having arrived in Berlin, she looked for a hotel.', 'She arrived in a Berlin hotel.', 'She searched Berlin for an arrival.'], a: 1 },
      { t: 'order', en: 'Had I known that, I would have stayed.', de: 'Hätte ich das gewusst wäre ich geblieben' },
      { t: 'listen', text: 'Wie dem auch sei, genau genommen hat er sein Versprechen nie gebrochen.', en: 'Be that as it may, strictly speaking he never broke his promise.' },
      { t: 'speak', text: 'So sehr sie sich auch bemühte, sie konnte die Erinnerung nicht verdrängen.' },
    ],
  },
];
