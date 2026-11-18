import type { Unit } from '../types';
import { A1 } from './a1';

/**
 * Companion course: original dialogs, vocabulary and exercises that follow the
 * topic order of a typical A1 coursebook (start, café, course, cities, home,
 * appointments, orientation, jobs, city trip, holidays, food, clothes, health).
 * All texts and characters are original.
 */
const S = (u: Omit<Unit, 'level' | 'track'>): Unit => ({ ...u, level: 'A1', track: 'studio' });

export const STUDIO_1: Unit[] = [
  S({
    id: 'st-0', icon: '🎉', title: 'Start auf Deutsch', sub: 'Hello, names & origin',
    can: 'Greet people, introduce yourself, ask for names and origin, spell your name.',
    grammar: {
      title: 'W-Fragen, heißen/kommen & the alphabet',
      html: `<p>Your first questions start with a <b>W-word</b>, then the verb:</p>
<table class="tbl"><tr><th>question</th><th>answer</th></tr>
<tr><td><b>Wie</b> heißen Sie? / <b>Wie</b> heißt du?</td><td>Ich heiße Karim.</td></tr>
<tr><td><b>Woher</b> kommen Sie? / <b>Woher</b> kommst du?</td><td>Ich komme <b>aus</b> Marokko.</td></tr>
<tr><td><b>Wo</b> wohnen Sie? / <b>Wo</b> wohnst du?</td><td>Ich wohne <b>in</b> Berlin.</td></tr>
<tr><td><b>Wie</b> schreibt man das?</td><td>K – A – R – I – M.</td></tr></table>
<table class="tbl"><tr><th></th><th>heißen</th><th>kommen</th><th>wohnen</th></tr>
<tr><td>ich</td><td>heiße</td><td>komme</td><td>wohne</td></tr><tr><td>du</td><td>heißt</td><td>kommst</td><td>wohnst</td></tr>
<tr><td>Sie</td><td>heißen</td><td>kommen</td><td>wohnen</td></tr></table>
<div class="tip"><b>Alphabet tricks:</b> A [a:], E [e:], I [i:], J [jɔt], V [faʊ], W [ve:], Y [ʏpsilɔn], Z [tsɛt], ß [ɛs-tsɛt]. Umlauts: Ä, Ö, Ü — say "a/o/u Umlaut".</div>`,
    },
    dialogs: [
      { title: 'Der erste Kurstag', scene: 'classroom', lines: [
        { who: 'weber', de: 'Guten Morgen! Ich bin Frau Weber, Ihre Deutschlehrerin.', en: 'Good morning! I am Ms Weber, your German teacher.' },
        { who: 'weber', de: 'Und wie heißen Sie?', en: 'And what is your name?' },
        { who: 'karim', de: 'Guten Morgen. Ich heiße Karim Benali.', en: 'Good morning. My name is Karim Benali.' },
        { who: 'weber', de: 'Woher kommen Sie, Herr Benali?', en: 'Where do you come from, Mr Benali?' },
        { who: 'karim', de: 'Ich komme aus Marokko, aus Marrakesch.', en: 'I come from Morocco, from Marrakesh.' },
        { who: 'weber', de: 'Schön! Und Sie?', en: 'Nice! And you?' },
        { who: 'mia', de: 'Hallo, ich bin Mia. Ich komme aus Österreich.', en: 'Hello, I am Mia. I come from Austria.' },
        { who: 'weber', de: 'Herzlich willkommen im Kurs!', en: 'A warm welcome to the course!' },
      ] },
      { title: 'Wie schreibt man das?', scene: 'classroom', lines: [
        { who: 'mia', de: 'Hallo! Wie heißt du?', en: 'Hi! What\'s your name?' },
        { who: 'karim', de: 'Karim. Und du?', en: 'Karim. And you?' },
        { who: 'mia', de: 'Ich heiße Mia. Wie schreibt man Karim?', en: 'My name is Mia. How do you spell Karim?' },
        { who: 'karim', de: 'K – A – R – I – M.', en: 'K – A – R – I – M.' },
        { who: 'mia', de: 'Und wo wohnst du?', en: 'And where do you live?' },
        { who: 'karim', de: 'Ich wohne jetzt in Berlin, in Kreuzberg.', en: 'I live in Berlin now, in Kreuzberg.' },
      ] },
    ],
    vocab: [
      { de: 'Guten Morgen', en: 'good morning' }, { de: 'Hallo', en: 'hi, hello' },
      { de: 'heißen', en: 'to be called' }, { de: 'kommen aus', en: 'to come from' },
      { de: 'wohnen in', en: 'to live in' }, { de: 'Name', en: 'name', g: 'der', pl: 'Namen' },
      { de: 'Vorname', en: 'first name', g: 'der', pl: 'Vornamen' }, { de: 'Nachname', en: 'surname', g: 'der', pl: 'Nachnamen' },
      { de: 'Kurs', en: 'course', g: 'der', pl: 'Kurse' }, { de: 'Lehrerin', en: 'teacher (f)', g: 'die', pl: 'Lehrerinnen' },
      { de: 'buchstabieren', en: 'to spell' }, { de: 'Herzlich willkommen!', en: 'Welcome!' },
    ],
    ex: [
      { t: 'mc', q: '___ heißen Sie?', options: ['Wie', 'Wo', 'Woher', 'Was'], a: 0 },
      { t: 'mc', q: '___ kommst du? — Aus Spanien.', options: ['Wo', 'Woher', 'Wie', 'Wer'], a: 1 },
      { t: 'fill', q: 'Ich ___ Mia. (heißen)', a: ['heiße'] },
      { t: 'fill', q: 'Woher ___ du? (kommen)', a: ['kommst'] },
      { t: 'fill', q: 'Ich wohne ___ Berlin.', a: ['in'] },
      { t: 'fill', q: 'Ich komme ___ Marokko.', a: ['aus'] },
      { t: 'order', en: 'Where do you live? (formal)', de: 'Wo wohnen Sie' },
      { t: 'translate', en: 'My name is Karim.', a: ['Ich heiße Karim.', 'Mein Name ist Karim.', 'Ich bin Karim.'] },
    ],
  }),
  S({
    id: 'st-1', icon: '☕', title: 'Kaffee oder Tee?', sub: 'Meeting people, numbers, ordering',
    can: 'Get to know people, count to 1000, order and pay in a café, give phone numbers.',
    grammar: { title: A1[1].grammar.title, html: A1[1].grammar.html + `<p><b>Numbers</b>: 1 eins, 2 zwei, 3 drei, 4 vier, 5 fünf, 6 sechs, 7 sieben, 8 acht, 9 neun, 10 zehn, 11 elf, 12 zwölf, 13 dreizehn … 16 <b>sech</b>zehn, 17 <b>sieb</b>zehn, 20 zwanzig, 30 drei<b>ß</b>ig, 21 <b>ein</b>undzwanzig, 100 hundert, 999 neunhundertneunundneunzig.</p>
<div class="tip">Paying: <i>Zusammen oder getrennt?</i> (together or separately?) — <i>Das macht 5,20 €</i> = „fünf Euro zwanzig".</div>` },
    dialogs: [
      { title: 'Im Café Bauer', scene: 'cafe', lines: [
        { who: 'bauer', de: 'Guten Tag! Was möchten Sie trinken?', en: 'Good afternoon! What would you like to drink?' },
        { who: 'lena', de: 'Einen Kaffee, bitte.', en: 'A coffee, please.' },
        { who: 'bauer', de: 'Mit Milch und Zucker?', en: 'With milk and sugar?' },
        { who: 'lena', de: 'Nur mit Milch, bitte.', en: 'Only with milk, please.' },
        { who: 'karim', de: 'Und ich nehme einen Tee.', en: 'And I\'ll have a tea.' },
        { who: 'bauer', de: 'Gern. Möchten Sie auch Kuchen?', en: 'Sure. Would you like some cake too?' },
        { who: 'karim', de: 'Nein, danke.', en: 'No, thanks.' },
      ] },
      { title: 'Zahlen, bitte!', scene: 'cafe', lines: [
        { who: 'lena', de: 'Wir möchten zahlen, bitte.', en: 'We would like to pay, please.' },
        { who: 'bauer', de: 'Zusammen oder getrennt?', en: 'Together or separately?' },
        { who: 'karim', de: 'Zusammen, bitte. Ich lade dich ein, Lena.', en: 'Together, please. It\'s my treat, Lena.' },
        { who: 'lena', de: 'Oh, danke schön!', en: 'Oh, thank you!' },
        { who: 'bauer', de: 'Ein Kaffee und ein Tee, das macht fünf Euro zwanzig.', en: 'One coffee and one tea, that\'s five euros twenty.' },
        { who: 'karim', de: 'Sechs Euro. Stimmt so.', en: 'Six euros. Keep the change.' },
        { who: 'bauer', de: 'Vielen Dank! Schönen Tag noch!', en: 'Thank you very much! Have a nice day!' },
        { who: 'lena', de: 'Und wie ist deine Telefonnummer, Karim?', en: 'And what is your phone number, Karim?' },
        { who: 'karim', de: 'Null eins sieben sechs, drei acht, zwei fünf, neun null.', en: '0176 38 25 90.' },
      ] },
    ],
    vocab: [
      { de: 'Kaffee', en: 'coffee', g: 'der', pl: 'Kaffees' }, { de: 'Tee', en: 'tea', g: 'der', pl: 'Tees' },
      { de: 'Milch', en: 'milk', g: 'die', pl: '-' }, { de: 'Zucker', en: 'sugar', g: 'der', pl: '-' },
      { de: 'Kuchen', en: 'cake', g: 'der', pl: 'Kuchen' }, { de: 'Wasser', en: 'water', g: 'das', pl: '-' },
      { de: 'trinken', en: 'to drink' }, { de: 'zahlen', en: 'to pay' },
      { de: 'zusammen', en: 'together' }, { de: 'getrennt', en: 'separately' },
      { de: 'Telefonnummer', en: 'phone number', g: 'die', pl: 'Telefonnummern' }, { de: 'Stimmt so.', en: 'Keep the change.' },
    ],
    ex: [
      { t: 'mc', q: '37 =', options: ['dreiundsiebzig', 'siebenunddreißig', 'siebzigdrei', 'dreißigsieben'], a: 1 },
      { t: 'mc', q: '16 =', options: ['sechszehn', 'sechzehn', 'sechzig', 'sechsundzehn'], a: 1 },
      { t: 'fill', q: 'Was ___ du trinken? (möchten)', a: ['möchtest'] },
      { t: 'fill', q: 'Ich ___ einen Tee. (nehmen)', a: ['nehme'] },
      { t: 'mc', q: 'Der Kellner fragt: „Zusammen oder ___?"', options: ['getrennt', 'allein', 'bitte', 'danke'], a: 0 },
      { t: 'listen', text: 'Das macht acht Euro fünfzig.', en: 'That\'s 8.50 euros.' },
      { t: 'order', en: 'We would like to pay, please.', de: 'Wir möchten zahlen bitte' },
      { t: 'translate', en: 'A coffee with milk, please.', a: ['Einen Kaffee mit Milch, bitte.', 'Ein Kaffee mit Milch, bitte.'] },
    ],
  }),
  S({
    id: 'st-2', icon: '📖', title: 'Sprache im Kurs', sub: 'Classroom language, articles, plural',
    can: 'Ask questions in class, ask for repetition, use a dictionary and learn words with articles.',
    grammar: {
      title: 'der/die/das, ein/eine, kein & plural',
      html: `<table class="tbl"><tr><th></th><th><span class="m">m</span></th><th><span class="f">f</span></th><th><span class="n">n</span></th><th>plural</th></tr>
<tr><td>definite</td><td><span class="m">der</span> Stift</td><td><span class="f">die</span> Tasche</td><td><span class="n">das</span> Buch</td><td>die Bücher</td></tr>
<tr><td>indefinite</td><td>ein Stift</td><td>eine Tasche</td><td>ein Buch</td><td>– Bücher</td></tr>
<tr><td>negative</td><td>kein Stift</td><td>keine Tasche</td><td>kein Buch</td><td>keine Bücher</td></tr></table>
<p><b>Plural endings</b> (learn them with the word!): -e (der Tisch → die Tisch<b>e</b>), -(e)n (die Tasche → die Tasche<b>n</b>), -er + umlaut (das Buch → die B<b>ü</b>ch<b>er</b>), -s (das Handy → die Handy<b>s</b>), no ending (der Lehrer → die Lehrer).</p>
<div class="tip"><b>Compound nouns</b> take the gender of the <b>last</b> word: die Tür + <span class="m">der</span> Schlüssel → <span class="m">der</span> Türschlüssel.</div>
<p><b>Classroom phrases:</b> Wie bitte? · Noch einmal, bitte. · Langsam, bitte. · Was bedeutet …? · Wie heißt das auf Deutsch? · Kannst du das bitte buchstabieren?</p>`,
    },
    dialogs: [
      { title: 'Was bedeutet das?', scene: 'classroom', lines: [
        { who: 'weber', de: 'Bitte öffnen Sie das Buch auf Seite zwölf.', en: 'Please open the book at page twelve.' },
        { who: 'karim', de: 'Entschuldigung, wie bitte? Noch einmal, bitte.', en: 'Sorry, pardon? Once again, please.' },
        { who: 'weber', de: 'Seite zwölf. Zwölf.', en: 'Page twelve. Twelve.' },
        { who: 'karim', de: 'Danke. Frau Weber, was bedeutet „Wörterbuch"?', en: 'Thanks. Ms Weber, what does "Wörterbuch" mean?' },
        { who: 'weber', de: 'Ein Wörterbuch ist ein Buch mit Wörtern. Auf Englisch: dictionary.', en: 'A Wörterbuch is a book with words. In English: dictionary.' },
        { who: 'karim', de: 'Ah, verstehe. Ist das der, die oder das?', en: 'Ah, I see. Is it der, die or das?' },
        { who: 'weber', de: 'Das Wörterbuch. Das Buch ist neutral.', en: 'Das Wörterbuch. Buch is neuter.' },
      ] },
      { title: 'Hast du einen Stift?', scene: 'classroom', lines: [
        { who: 'mia', de: 'Karim, hast du einen Stift für mich?', en: 'Karim, do you have a pen for me?' },
        { who: 'karim', de: 'Ja, klar. Hier, bitte.', en: 'Yes, sure. Here you are.' },
        { who: 'mia', de: 'Danke! Und hast du auch ein Heft?', en: 'Thanks! And do you also have a notebook?' },
        { who: 'karim', de: 'Nein, leider habe ich kein Heft. Aber Papier.', en: 'No, unfortunately I have no notebook. But paper.' },
        { who: 'mia', de: 'Super, das ist genug. Wie heißt das auf Deutsch?', en: 'Great, that\'s enough. What\'s this called in German?' },
        { who: 'karim', de: 'Das ist ein Radiergummi.', en: 'That is an eraser.' },
      ] },
    ],
    vocab: [
      { de: 'Buch', en: 'book', g: 'das', pl: 'Bücher' }, { de: 'Wörterbuch', en: 'dictionary', g: 'das', pl: 'Wörterbücher' },
      { de: 'Stift', en: 'pen', g: 'der', pl: 'Stifte' }, { de: 'Heft', en: 'notebook', g: 'das', pl: 'Hefte' },
      { de: 'Tasche', en: 'bag', g: 'die', pl: 'Taschen' }, { de: 'Radiergummi', en: 'eraser', g: 'der', pl: 'Radiergummis' },
      { de: 'Seite', en: 'page', g: 'die', pl: 'Seiten' }, { de: 'Tafel', en: 'board', g: 'die', pl: 'Tafeln' },
      { de: 'Wort', en: 'word', g: 'das', pl: 'Wörter' }, { de: 'bedeuten', en: 'to mean' },
      { de: 'verstehen', en: 'to understand' }, { de: 'Wie bitte?', en: 'Pardon?' },
    ],
    ex: [
      { t: 'mc', q: '___ Wörterbuch ist neu.', options: ['Der', 'Die', 'Das'], a: 2 },
      { t: 'mc', q: 'Plural of „die Tasche":', options: ['die Taschen', 'die Tasches', 'die Täsche', 'die Tascher'], a: 0 },
      { t: 'fill', q: 'Ich habe ___ Heft. (no)', a: ['kein'] },
      { t: 'fill', q: 'Hast du ___ Stift? (a)', a: ['einen'] },
      { t: 'mc', q: 'die Tür + der Schlüssel =', options: ['die Türschlüssel', 'der Türschlüssel', 'das Türschlüssel'], a: 1 },
      { t: 'mc', q: 'You didn\'t understand. You say:', options: ['Wie bitte?', 'Tschüss!', 'Stimmt so.', 'Gern.'], a: 0 },
      { t: 'order', en: 'What does that mean?', de: 'Was bedeutet das' },
      { t: 'translate', en: 'Slowly, please.', a: ['Langsam, bitte.', 'Bitte langsam.'] },
    ],
  }),
  S({
    id: 'st-3', icon: '🎡', title: 'Städte – Länder – Sprachen', sub: 'Places, languages, war',
    can: 'Talk about cities, sights, countries and languages; say where you were; describe location.',
    grammar: {
      title: 'Präteritum of sein, yes/no questions & location',
      html: `<table class="tbl"><tr><th></th><th>sein (present)</th><th>sein (past)</th></tr>
<tr><td>ich</td><td>bin</td><td><b>war</b></td></tr><tr><td>du</td><td>bist</td><td><b>warst</b></td></tr>
<tr><td>er/sie/es</td><td>ist</td><td><b>war</b></td></tr><tr><td>wir</td><td>sind</td><td><b>waren</b></td></tr>
<tr><td>ihr</td><td>seid</td><td><b>wart</b></td></tr><tr><td>sie/Sie</td><td>sind</td><td><b>waren</b></td></tr></table>
<p><b>Yes/no questions</b> start with the verb: <i><b>Warst</b> du schon in Wien? — Ja. / Nein, noch nie.</i></p>
<p><b>Location:</b> Hamburg liegt <b>im Norden</b> von Deutschland. München liegt <b>im Süden</b>. Köln liegt <b>im Westen</b>, Dresden <b>im Osten</b>. Wien liegt <b>in</b> Österreich.</p>
<div class="tip">Countries are mostly without article (<i>in Deutschland</i>), but some take one: <b>die Schweiz</b> → in <b>der</b> Schweiz, <b>die Türkei</b>, <b>der Iran</b>, <b>die USA</b> → in <b>den</b> USA.</div>`,
    },
    dialogs: [
      { title: 'Warst du schon in Wien?', scene: 'city', lines: [
        { who: 'mia', de: 'Karim, warst du schon in Wien?', en: 'Karim, have you been to Vienna yet?' },
        { who: 'karim', de: 'Nein, noch nie. Wo liegt Wien genau?', en: 'No, never. Where exactly is Vienna?' },
        { who: 'mia', de: 'Wien liegt im Osten von Österreich, an der Donau.', en: 'Vienna is in the east of Austria, on the Danube.' },
        { who: 'karim', de: 'Und was kann man dort sehen?', en: 'And what can you see there?' },
        { who: 'mia', de: 'Das Riesenrad, viele Museen und schöne Cafés!', en: 'The big wheel, many museums and beautiful cafés!' },
        { who: 'karim', de: 'Toll! Ich war letztes Jahr in Zürich.', en: 'Great! I was in Zurich last year.' },
        { who: 'mia', de: 'In der Schweiz? Wie war es?', en: 'In Switzerland? How was it?' },
        { who: 'karim', de: 'Sehr schön, aber teuer!', en: 'Very nice, but expensive!' },
      ] },
      { title: 'Welche Sprachen sprichst du?', scene: 'cafe', lines: [
        { who: 'lena', de: 'Karim, welche Sprachen sprichst du?', en: 'Karim, which languages do you speak?' },
        { who: 'karim', de: 'Arabisch und Französisch. Und ein bisschen Englisch.', en: 'Arabic and French. And a bit of English.' },
        { who: 'lena', de: 'Und jetzt lernst du Deutsch!', en: 'And now you\'re learning German!' },
        { who: 'karim', de: 'Ja, Deutsch ist schwer, aber interessant.', en: 'Yes, German is difficult but interesting.' },
        { who: 'lena', de: 'Ich spreche Englisch und ein bisschen Spanisch.', en: 'I speak English and a bit of Spanish.' },
      ] },
    ],
    vocab: [
      { de: 'Stadt', en: 'city', g: 'die', pl: 'Städte' }, { de: 'Land', en: 'country', g: 'das', pl: 'Länder' },
      { de: 'Sprache', en: 'language', g: 'die', pl: 'Sprachen' }, { de: 'Sehenswürdigkeit', en: 'sight, attraction', g: 'die', pl: 'Sehenswürdigkeiten' },
      { de: 'Norden', en: 'north', g: 'der', pl: '-' }, { de: 'Süden', en: 'south', g: 'der', pl: '-' },
      { de: 'Osten', en: 'east', g: 'der', pl: '-' }, { de: 'Westen', en: 'west', g: 'der', pl: '-' },
      { de: 'liegen', en: 'to be located' }, { de: 'sprechen', en: 'to speak (du sprichst)' },
      { de: 'Museum', en: 'museum', g: 'das', pl: 'Museen' }, { de: 'noch nie', en: 'never (yet)' },
    ],
    ex: [
      { t: 'fill', q: 'Ich ___ letztes Jahr in Rom. (sein, past)', a: ['war'] },
      { t: 'fill', q: '___ du schon in Hamburg? (sein, past)', a: ['Warst'] },
      { t: 'fill', q: 'Wir ___ gestern im Museum. (sein, past)', a: ['waren'] },
      { t: 'mc', q: 'München liegt im ___ von Deutschland.', options: ['Norden', 'Süden', 'Osten'], a: 1 },
      { t: 'mc', q: 'Ich wohne in ___ Schweiz.', options: ['die', 'der', 'dem', '–'], a: 1 },
      { t: 'fill', q: 'Welche Sprachen ___ du? (sprechen)', a: ['sprichst'] },
      { t: 'order', en: 'Have you been to Vienna yet?', de: 'Warst du schon in Wien' },
      { t: 'translate', en: 'Hamburg is in the north.', a: ['Hamburg liegt im Norden.', 'Hamburg ist im Norden.'] },
    ],
  }),
  S({
    id: 'st-4', icon: '🏡', title: 'Menschen und Häuser', sub: 'Homes, furniture, addresses',
    can: 'Describe and comment on flats, write addresses, talk about living in other countries.',
    grammar: {
      title: 'Possessive articles & adjectives after sein',
      html: `<table class="tbl"><tr><th></th><th>m / n</th><th>f / plural</th></tr>
<tr><td>ich</td><td>mein</td><td>mein<b>e</b></td></tr><tr><td>du</td><td>dein</td><td>dein<b>e</b></td></tr>
<tr><td>er / es</td><td>sein</td><td>sein<b>e</b></td></tr><tr><td>sie</td><td>ihr</td><td>ihr<b>e</b></td></tr>
<tr><td>wir</td><td>unser</td><td>unser<b>e</b></td></tr><tr><td>ihr</td><td>euer</td><td>eur<b>e</b></td></tr>
<tr><td>sie / Sie</td><td>ihr / Ihr</td><td>ihr<b>e</b> / Ihr<b>e</b></td></tr></table>
<p><b>Adjectives after sein</b> have no ending: <i>Die Küche ist <b>groß</b>. Das Bad ist <b>klein</b>.</i></p>
<p>Comment with <b>sehr</b> (very), <b>zu</b> (too), <b>ziemlich</b> (quite), <b>nicht so</b>: <i>Die Miete ist <b>zu</b> hoch. Das Zimmer ist <b>ziemlich</b> dunkel.</i></p>
<div class="tip"><b>Addresses:</b> Straße + number, postcode + city: <i>Lindenstraße 14, 10969 Berlin</i>. Flats: <i>im Erdgeschoss</i> (ground floor), <i>im ersten Stock</i>.</div>`,
    },
    dialogs: [
      { title: 'Die neue Wohnung', scene: 'flat', lines: [
        { who: 'lena', de: 'Willkommen in meiner neuen Wohnung!', en: 'Welcome to my new flat!' },
        { who: 'jonas', de: 'Wow, die ist ja schön hell!', en: 'Wow, it\'s really nice and bright!' },
        { who: 'lena', de: 'Ja, das Wohnzimmer ist groß und hat zwei Fenster.', en: 'Yes, the living room is big and has two windows.' },
        { who: 'jonas', de: 'Und wie ist die Küche?', en: 'And what is the kitchen like?' },
        { who: 'lena', de: 'Die Küche ist leider ziemlich klein.', en: 'The kitchen is unfortunately quite small.' },
        { who: 'jonas', de: 'Und das Sofa? Ist das neu?', en: 'And the sofa? Is it new?' },
        { who: 'lena', de: 'Nein, das ist mein altes Sofa. Aber es ist sehr bequem!', en: 'No, that\'s my old sofa. But it\'s very comfortable!' },
        { who: 'jonas', de: 'Und die Miete?', en: 'And the rent?' },
        { who: 'lena', de: 'Achthundert Euro warm. Das ist okay für Hamburg.', en: '800 euros including heating. That\'s OK for Hamburg.' },
      ] },
      { title: 'Wie ist deine Adresse?', scene: 'phone', lines: [
        { who: 'karim', de: 'Lena, wie ist deine neue Adresse?', en: 'Lena, what\'s your new address?' },
        { who: 'lena', de: 'Lindenstraße vierzehn, zwei zwei sieben sechs fünf Hamburg.', en: 'Lindenstraße 14, 22765 Hamburg.' },
        { who: 'karim', de: 'Wie schreibt man Linden?', en: 'How do you spell Linden?' },
        { who: 'lena', de: 'L – I – N – D – E – N.', en: 'L – I – N – D – E – N.' },
        { who: 'karim', de: 'Und in welchem Stock wohnst du?', en: 'And which floor do you live on?' },
        { who: 'lena', de: 'Im dritten Stock. Es gibt leider keinen Aufzug!', en: 'On the third floor. Unfortunately there\'s no lift!' },
      ] },
    ],
    vocab: [
      { de: 'Wohnung', en: 'flat', g: 'die', pl: 'Wohnungen' }, { de: 'Haus', en: 'house', g: 'das', pl: 'Häuser' },
      { de: 'Wohnzimmer', en: 'living room', g: 'das', pl: 'Wohnzimmer' }, { de: 'Küche', en: 'kitchen', g: 'die', pl: 'Küchen' },
      { de: 'Schlafzimmer', en: 'bedroom', g: 'das', pl: 'Schlafzimmer' }, { de: 'Sofa', en: 'sofa', g: 'das', pl: 'Sofas' },
      { de: 'Fenster', en: 'window', g: 'das', pl: 'Fenster' }, { de: 'Miete', en: 'rent', g: 'die', pl: 'Mieten' },
      { de: 'Stock', en: 'floor, storey', g: 'der', pl: 'Stockwerke' }, { de: 'Aufzug', en: 'lift', g: 'der', pl: 'Aufzüge' },
      { de: 'hell', en: 'bright' }, { de: 'bequem', en: 'comfortable' },
    ],
    ex: [
      { t: 'fill', q: 'Das ist ___ Wohnung. (my)', a: ['meine'] },
      { t: 'fill', q: 'Wo ist ___ Sofa? (your, du)', a: ['dein'] },
      { t: 'fill', q: 'Lena und ___ Bruder Jonas. (her)', a: ['ihr'] },
      { t: 'mc', q: 'Die Miete ist ___ hoch. Ich kann das nicht bezahlen.', options: ['zu', 'sehr gut', 'nicht so', 'ziemlich gern'], a: 0 },
      { t: 'mc', q: 'The ground floor is…', options: ['der erste Stock', 'das Erdgeschoss', 'der Keller', 'das Dach'], a: 1 },
      { t: 'listen', text: 'Ich wohne in der Gartenstraße einundzwanzig.', en: 'I live at Gartenstraße 21.' },
      { t: 'order', en: 'The kitchen is quite small.', de: 'Die Küche ist ziemlich klein' },
      { t: 'translate', en: 'Our flat is bright.', a: ['Unsere Wohnung ist hell.'] },
    ],
  }),
  S({
    id: 'st-5', icon: '📅', title: 'Termine', sub: 'Times, appointments, routines',
    can: 'Tell the time, make appointments, apologise for being late, describe your day.',
    grammar: {
      title: 'Time, am/um/von…bis & separable verbs',
      html: `<table class="tbl"><tr><th>question</th><th>answer</th></tr>
<tr><td><b>Wie spät</b> ist es? / Wie viel Uhr ist es?</td><td>Es ist <b>halb drei</b> (2:30). Es ist Viertel nach acht (8:15).</td></tr>
<tr><td><b>Wann</b> …?</td><td><b>am</b> Montag · <b>um</b> 9 Uhr · <b>am</b> Vormittag · <b>in der</b> Nacht</td></tr>
<tr><td><b>Wie lange</b> …?</td><td><b>von</b> 9 <b>bis</b> 17 Uhr</td></tr></table>
<p><b>Separable verbs</b>: the prefix goes to the end. <i>Ich <b>stehe</b> um sieben Uhr <b>auf</b>. Der Kurs <b>fängt</b> um neun <b>an</b>. <b>Rufst</b> du mich <b>an</b>?</i></p>
<div class="tip"><b>Apologising:</b> Entschuldigung, ich bin zu spät. Der Bus hatte Verspätung. — Kein Problem! / Das macht nichts.</div>`,
    },
    dialogs: [
      { title: 'Einen Termin machen', scene: 'phone', lines: [
        { who: 'amira', de: 'Praxis Dr. Yılmaz, guten Tag. Was kann ich für Sie tun?', en: 'Dr Yılmaz\'s practice, good day. How can I help you?' },
        { who: 'karim', de: 'Guten Tag, Benali hier. Ich brauche einen Termin.', en: 'Hello, Benali speaking. I need an appointment.' },
        { who: 'amira', de: 'Geht es am Donnerstag um zehn Uhr?', en: 'Does Thursday at ten work?' },
        { who: 'karim', de: 'Am Donnerstag arbeite ich leider. Geht es auch am Freitag?', en: 'Unfortunately I work on Thursday. Is Friday possible too?' },
        { who: 'amira', de: 'Ja, am Freitag um Viertel nach vier.', en: 'Yes, on Friday at a quarter past four.' },
        { who: 'karim', de: 'Das passt gut. Vielen Dank!', en: 'That suits me well. Thank you very much!' },
        { who: 'amira', de: 'Gern. Bis Freitag, auf Wiederhören!', en: 'You\'re welcome. See you Friday, goodbye!' },
      ] },
      { title: 'Entschuldigung, ich bin zu spät!', scene: 'cafe', lines: [
        { who: 'jonas', de: 'Entschuldigung, Lena! Ich bin zu spät.', en: 'Sorry, Lena! I\'m late.' },
        { who: 'lena', de: 'Kein Problem. Was ist passiert?', en: 'No problem. What happened?' },
        { who: 'jonas', de: 'Die S-Bahn hatte zwanzig Minuten Verspätung.', en: 'The S-Bahn was twenty minutes late.' },
        { who: 'lena', de: 'Ach so. Wann stehst du eigentlich morgens auf?', en: 'I see. When do you actually get up in the morning?' },
        { who: 'jonas', de: 'Um halb sieben. Die Arbeit fängt um acht an.', en: 'At half past six. Work starts at eight.' },
        { who: 'lena', de: 'Oh, früh! Ich arbeite von zehn bis sechs.', en: 'Oh, early! I work from ten to six.' },
      ] },
    ],
    vocab: [
      { de: 'Termin', en: 'appointment', g: 'der', pl: 'Termine' }, { de: 'Uhr', en: 'o\'clock, clock', g: 'die', pl: 'Uhren' },
      { de: 'Viertel', en: 'quarter', g: 'das', pl: 'Viertel' }, { de: 'halb', en: 'half' },
      { de: 'Verspätung', en: 'delay', g: 'die', pl: 'Verspätungen' }, { de: 'aufstehen', en: 'to get up' },
      { de: 'anfangen', en: 'to start (fängt an)' }, { de: 'anrufen', en: 'to call' },
      { de: 'Vormittag', en: 'morning (before noon)', g: 'der', pl: 'Vormittage' }, { de: 'Donnerstag', en: 'Thursday', g: 'der', pl: 'Donnerstage' },
      { de: 'passen', en: 'to suit' }, { de: 'Das macht nichts.', en: 'It doesn\'t matter.' },
    ],
    ex: [
      { t: 'mc', q: '„halb sieben" =', options: ['7:30', '6:30', '6:15', '7:15'], a: 1 },
      { t: 'fill', q: 'Der Termin ist ___ Montag ___ 10 Uhr.', a: ['am um'] },
      { t: 'fill', q: 'Ich arbeite ___ 9 ___ 17 Uhr.', a: ['von bis'] },
      { t: 'fill', q: 'Ich ___ um 6 Uhr ___. (aufstehen)', a: ['stehe auf'] },
      { t: 'fill', q: 'Der Film ___ um acht ___. (anfangen)', a: ['fängt an'] },
      { t: 'listen', text: 'Geht es am Mittwoch um Viertel vor drei?', en: 'Does Wednesday at a quarter to three work?' },
      { t: 'order', en: 'Sorry, I am late.', de: 'Entschuldigung ich bin zu spät' },
      { t: 'translate', en: 'I need an appointment.', a: ['Ich brauche einen Termin.'] },
    ],
  }),
  S({
    id: 'st-6', icon: '🧭', title: 'Orientierung', sub: 'Work, commuting, finding your way in a building',
    can: 'Say where people live and work, how they commute, ask for rooms and people in a building.',
    grammar: {
      title: 'Dative after mit/in/an/bei & ordinal numbers',
      html: `<p>After <b>mit, bei, zu, von, aus, nach</b> (always) and after <b>in, an, auf, neben</b> for position (Wo?) → <b>dative</b>:</p>
<table class="tbl"><tr><th></th><th>Nominativ</th><th>Dativ</th></tr>
<tr><td><span class="m">m</span></td><td>der / ein Bus</td><td>mit <b>dem</b> / ein<b>em</b> Bus</td></tr>
<tr><td><span class="n">n</span></td><td>das / ein Auto</td><td>mit <b>dem</b> / ein<b>em</b> Auto</td></tr>
<tr><td><span class="f">f</span></td><td>die / eine U-Bahn</td><td>mit <b>der</b> / ein<b>er</b> U-Bahn</td></tr>
<tr><td>pl</td><td>die Räder</td><td>mit <b>den</b> Räder<b>n</b></td></tr></table>
<p class="ex">Ich fahre <b>mit dem</b> Fahrrad zur Arbeit. Das Büro ist <b>im</b> (= in dem) zweiten Stock. Ich arbeite <b>bei</b> Siemens.</p>
<p><b>Ordinal numbers</b>: der erste, zweite, <b>dritte</b>, vierte … <b>siebte</b>, achte … zwanzigste. <i>im ersten Stock, im dritten Stock</i>.</p>
<div class="tip">Exceptions: <b>zu Fuß</b> gehen (walk) — no "mit"!</div>`,
    },
    dialogs: [
      { title: 'Wie kommst du zur Arbeit?', scene: 'street', lines: [
        { who: 'lena', de: 'Karim, wo arbeitest du eigentlich?', en: 'Karim, where do you actually work?' },
        { who: 'karim', de: 'Bei einer Softwarefirma in Mitte.', en: 'At a software company in Mitte.' },
        { who: 'lena', de: 'Und wie kommst du zur Arbeit?', en: 'And how do you get to work?' },
        { who: 'karim', de: 'Meistens mit dem Fahrrad. Bei Regen nehme ich die U-Bahn.', en: 'Mostly by bike. When it rains I take the underground.' },
        { who: 'lena', de: 'Wie lange brauchst du?', en: 'How long does it take you?' },
        { who: 'karim', de: 'Mit dem Fahrrad zwanzig Minuten. Und du?', en: 'Twenty minutes by bike. And you?' },
        { who: 'lena', de: 'Ich gehe zu Fuß. Mein Büro ist nur fünf Minuten weg.', en: 'I walk. My office is only five minutes away.' },
      ] },
      { title: 'Wo ist Raum 304?', scene: 'office', lines: [
        { who: 'karim', de: 'Entschuldigung, ich suche Frau Haddad.', en: 'Excuse me, I\'m looking for Ms Haddad.' },
        { who: 'amira', de: 'Das bin ich! Sie sind sicher Herr Benali.', en: 'That\'s me! You must be Mr Benali.' },
        { who: 'karim', de: 'Ja, genau. Heute ist mein erster Tag.', en: 'Yes, exactly. Today is my first day.' },
        { who: 'amira', de: 'Willkommen! Ihr Büro ist im dritten Stock, Raum dreihundertvier.', en: 'Welcome! Your office is on the third floor, room 304.' },
        { who: 'karim', de: 'Und wo ist die Kantine?', en: 'And where is the canteen?' },
        { who: 'amira', de: 'Im Erdgeschoss, neben dem Eingang. Wir essen um zwölf. Kommen Sie mit?', en: 'On the ground floor, next to the entrance. We eat at twelve. Will you join?' },
        { who: 'karim', de: 'Sehr gern!', en: 'I\'d love to!' },
      ] },
    ],
    vocab: [
      { de: 'Büro', en: 'office', g: 'das', pl: 'Büros' }, { de: 'Firma', en: 'company', g: 'die', pl: 'Firmen' },
      { de: 'Fahrrad', en: 'bicycle', g: 'das', pl: 'Fahrräder' }, { de: 'U-Bahn', en: 'underground', g: 'die', pl: 'U-Bahnen' },
      { de: 'zu Fuß', en: 'on foot' }, { de: 'Raum', en: 'room (office)', g: 'der', pl: 'Räume' },
      { de: 'Erdgeschoss', en: 'ground floor', g: 'das', pl: 'Erdgeschosse' }, { de: 'Eingang', en: 'entrance', g: 'der', pl: 'Eingänge' },
      { de: 'Kantine', en: 'canteen', g: 'die', pl: 'Kantinen' }, { de: 'suchen', en: 'to look for' },
      { de: 'brauchen', en: 'to need / take (time)' }, { de: 'Kollegin', en: 'colleague (f)', g: 'die', pl: 'Kolleginnen' },
    ],
    ex: [
      { t: 'mc', q: 'Ich fahre mit ___ U-Bahn.', options: ['die', 'der', 'dem', 'den'], a: 1 },
      { t: 'mc', q: 'Er kommt mit ___ Auto.', options: ['das', 'dem', 'der'], a: 1 },
      { t: 'fill', q: 'Das Büro ist im ___ Stock. (3.)', a: ['dritten'] },
      { t: 'fill', q: 'Ich arbeite ___ einer Bank. (at)', a: ['bei'] },
      { t: 'mc', q: 'I walk. =', options: ['Ich gehe mit dem Fuß.', 'Ich gehe zu Fuß.', 'Ich fahre zu Fuß.', 'Ich laufe mit Fuß.'], a: 1 },
      { t: 'fill', q: 'Die Kantine ist neben ___ Eingang. (der Eingang)', a: ['dem'] },
      { t: 'order', en: 'How do you get to work?', de: 'Wie kommst du zur Arbeit' },
      { t: 'translate', en: 'I go to work by bike.', a: ['Ich fahre mit dem Fahrrad zur Arbeit.', 'Ich fahre mit dem Rad zur Arbeit.'] },
    ],
  }),
];
