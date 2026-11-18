/** Original A1 test bank: 100 questions in 4 sections (25 each). */

export type Section = 'Hören' | 'Lesen' | 'Wortschatz' | 'Grammatik';
export interface TQ {
  id: string;
  section: Section;
  q: string;
  options: string[];
  a: number;
  audio?: [('F' | 'M'), string][];   // listening: speaker + line
  text?: string;                       // reading: short text shown above the question
  explain?: string;
}

const F = 'F' as const, M = 'M' as const;
let n = 0;
const H = (audio: [('F' | 'M'), string][], q: string, options: string[], a: number, explain?: string): TQ => ({ id: `h${++n}`, section: 'Hören', audio, q, options, a, explain });
const L = (text: string, q: string, options: string[], a: number, explain?: string): TQ => ({ id: `l${++n}`, section: 'Lesen', text, q, options, a, explain });
const W = (q: string, options: string[], a: number, explain?: string): TQ => ({ id: `w${++n}`, section: 'Wortschatz', q, options, a, explain });
const G = (q: string, options: string[], a: number, explain?: string): TQ => ({ id: `g${++n}`, section: 'Grammatik', q, options, a, explain });
const RF = ['richtig', 'falsch'];

export const A1_TEST: TQ[] = [
  // ---------------- HÖREN (25) ----------------
  H([[F, 'Entschuldigung, wie viel kostet das Brot?'], [M, 'Das kostet zwei Euro vierzig.']], 'Wie viel kostet das Brot?', ['2,14 €', '2,40 €', '4,20 €'], 1),
  H([[M, 'Wann beginnt der Kurs morgen?'], [F, 'Um halb neun. Bitte sei pünktlich!']], 'Wann beginnt der Kurs?', ['8:30 Uhr', '9:30 Uhr', '9:00 Uhr'], 0, '„halb neun" = 8:30.'),
  H([[F, 'Hallo Tim, hier ist Sandra. Ich bin krank und kann heute nicht ins Kino kommen. Vielleicht am Samstag?']], 'Was möchte Sandra?', ['Heute ins Kino gehen.', 'Am Samstag ins Kino gehen.', 'Zum Arzt gehen.'], 1),
  H([[M, 'Achtung am Gleis drei: Der Zug nach Hamburg hat zehn Minuten Verspätung.']], 'Was ist mit dem Zug nach Hamburg?', ['Er fährt von Gleis zehn.', 'Er kommt zehn Minuten später.', 'Er fällt aus.'], 1),
  H([[F, 'Meine Telefonnummer ist null eins fünf zwei, acht drei, sieben null, vier eins.']], 'Wie ist die Telefonnummer?', ['0152 83 70 41', '0125 38 70 41', '0152 83 17 41'], 0),
  H([[M, 'Was möchtest du trinken?'], [F, 'Einen Apfelsaft, bitte. Keinen Kaffee, ich trinke nie Kaffee.']], 'Was trinkt die Frau?', ['Kaffee', 'Tee', 'Apfelsaft'], 2),
  H([[F, 'Wo wohnst du?'], [M, 'Ich wohne in der Goethestraße, Nummer achtzehn.']], 'Welche Hausnummer hat der Mann?', ['8', '18', '80'], 1),
  H([[M, 'Liebe Kunden, heute haben wir alle Äpfel im Angebot: ein Kilo nur ein Euro neunundneunzig.']], 'Was ist heute billig?', ['Bananen', 'Äpfel', 'Tomaten'], 1),
  H([[F, 'Praxis Dr. Klein. Wir haben am Montag und am Mittwoch geschlossen.']], 'Wann ist die Praxis zu?', ['Montag und Mittwoch', 'Dienstag und Donnerstag', 'Am Wochenende'], 0),
  H([[M, 'Wie komme ich zum Bahnhof?'], [F, 'Gehen Sie geradeaus und dann die zweite Straße rechts.']], 'Wie kommt der Mann zum Bahnhof?', ['Geradeaus, dann die zweite Straße links.', 'Geradeaus, dann die zweite Straße rechts.', 'Die erste Straße rechts.'], 1),
  H([[F, 'Ich komme aus Polen, aber ich wohne seit drei Jahren in Köln.']], 'Seit wann wohnt die Frau in Köln?', ['Seit drei Monaten.', 'Seit drei Jahren.', 'Seit dreißig Jahren.'], 1),
  H([[M, 'Hallo Anna, das Fußballspiel ist nicht am Freitag, sondern am Sonntag um vier Uhr.']], 'Wann ist das Fußballspiel?', ['Freitag um 4 Uhr', 'Sonntag um 4 Uhr', 'Sonntag um 14 Uhr'], 1),
  H([[F, 'Ich hätte gern drei Brötchen und ein Stück Kuchen.'], [M, 'Gern. Das macht vier Euro fünfzig.']], 'Wie viel muss die Frau bezahlen?', ['4,15 €', '4,50 €', '5,40 €'], 1),
  H([[M, 'Was ist dein Beruf?'], [F, 'Ich bin Krankenschwester. Ich arbeite im Krankenhaus.']], 'Wo arbeitet die Frau?', ['Im Büro', 'Im Krankenhaus', 'In der Schule'], 1),
  H([[F, 'Das Wetter morgen: Im Norden regnet es, im Süden scheint die Sonne. Es wird zwanzig Grad warm.']], 'Wie ist das Wetter morgen im Süden?', ['Es regnet.', 'Es ist sonnig.', 'Es schneit.'], 1),
  H([[M, 'Der Supermarkt ist von Montag bis Samstag von acht bis zwanzig Uhr geöffnet.']], 'Wann schließt der Supermarkt?', ['Um 18 Uhr', 'Um 20 Uhr', 'Um 22 Uhr'], 1),
  H([[F, 'Hast du Geschwister?'], [M, 'Ja, ich habe einen Bruder und zwei Schwestern.']], 'Wie viele Geschwister hat der Mann?', ['Zwei', 'Drei', 'Vier'], 1),
  H([[M, 'Entschuldigung, wo ist die Toilette?'], [F, 'Im ersten Stock, neben dem Aufzug.']], 'Wo ist die Toilette?', ['Im Erdgeschoss', 'Im ersten Stock', 'Im zweiten Stock'], 1),
  H([[F, 'Frau Berger, Ihr Termin ist nicht am Dienstag. Er ist am Donnerstag um zehn Uhr fünfzehn.']], 'Wann ist der Termin?', ['Dienstag, 10:15', 'Donnerstag, 10:15', 'Donnerstag, 10:50'], 1),
  H([[M, 'Ich fahre jeden Tag mit dem Fahrrad zur Arbeit. Nur wenn es regnet, nehme ich den Bus.']], 'Wie fährt der Mann normalerweise zur Arbeit?', ['Mit dem Bus', 'Mit dem Fahrrad', 'Mit dem Auto'], 1),
  H([[F, 'Die Hose ist zu klein. Haben Sie sie auch in Größe vierzig?'], [M, 'Ja, hier, bitte.']], 'Welche Größe möchte die Frau?', ['14', '40', '44'], 1),
  H([[M, 'Am Wochenende spiele ich gern Tennis, und abends lese ich.']], 'Was macht der Mann am Wochenende?', ['Er spielt Tennis.', 'Er spielt Fußball.', 'Er schwimmt.'], 0),
  H([[F, 'Achtung, liebe Fahrgäste: Die nächste Haltestelle ist Rathausplatz. Bitte hier umsteigen in die Linie sieben.']], 'In welche Linie soll man umsteigen?', ['Linie 1', 'Linie 7', 'Linie 17'], 1),
  H([[M, 'Mama, ich bin um sechs Uhr zu Hause. Kochst du heute Nudeln?']], 'Wann kommt der Junge nach Hause?', ['Um 6 Uhr', 'Um 7 Uhr', 'Um 16 Uhr'], 0),
  H([[F, 'Ich buchstabiere meinen Namen: S – C – H – M – I – D – T.']], 'Wie heißt die Frau?', ['Schmitt', 'Schmidt', 'Schmid'], 1),

  // ---------------- LESEN (25) ----------------
  L('Hallo Julia,\nich habe am Samstag Geburtstag und mache eine kleine Party. Sie beginnt um 19 Uhr bei mir zu Hause. Kannst du kommen? Bitte bring etwas zu trinken mit.\nViele Grüße\nMarco', 'Marco macht am Samstag eine Party.', RF, 0),
  L('Hallo Julia,\nich habe am Samstag Geburtstag und mache eine kleine Party. Sie beginnt um 19 Uhr bei mir zu Hause. Kannst du kommen? Bitte bring etwas zu trinken mit.\nViele Grüße\nMarco', 'Julia soll Essen mitbringen.', RF, 1, 'Sie soll etwas zu TRINKEN mitbringen.'),
  L('Hallo Julia,\nich habe am Samstag Geburtstag und mache eine kleine Party. Sie beginnt um 19 Uhr bei mir zu Hause. Kannst du kommen? Bitte bring etwas zu trinken mit.\nViele Grüße\nMarco', 'Die Party ist in einem Restaurant.', RF, 1),
  L('🛑 Bibliothek\nÖffnungszeiten: Mo–Fr 9–18 Uhr, Sa 10–14 Uhr. Sonntag geschlossen.', 'Man kann am Samstagnachmittag um 15 Uhr Bücher leihen.', RF, 1),
  L('🛑 Bibliothek\nÖffnungszeiten: Mo–Fr 9–18 Uhr, Sa 10–14 Uhr. Sonntag geschlossen.', 'Am Sonntag ist die Bibliothek zu.', RF, 0),
  L('Schild an der Tür: „Bitte nicht rauchen!"', 'Was bedeutet das Schild?', ['Hier darf man rauchen.', 'Hier darf man nicht rauchen.', 'Hier kann man Zigaretten kaufen.'], 1),
  L('Schild im Kaufhaus: „Kinderkleidung → 3. Stock"', 'Sie suchen eine Jacke für Ihren Sohn. Wohin gehen Sie?', ['In den 1. Stock', 'In den 3. Stock', 'Ins Erdgeschoss'], 1),
  L('Liebe Frau Schulz,\nleider bin ich krank. Ich kann heute nicht zur Arbeit kommen. Ich gehe heute Vormittag zum Arzt und rufe Sie dann an.\nMit freundlichen Grüßen\nPeter Lang', 'Herr Lang geht heute arbeiten.', RF, 1),
  L('Liebe Frau Schulz,\nleider bin ich krank. Ich kann heute nicht zur Arbeit kommen. Ich gehe heute Vormittag zum Arzt und rufe Sie dann an.\nMit freundlichen Grüßen\nPeter Lang', 'Herr Lang telefoniert nach dem Arztbesuch mit Frau Schulz.', RF, 0),
  L('Anzeige: Zimmer frei! 20 m², möbliert, Küche und Bad zusammen mit zwei Studenten. 380 € warm. Tel. 0176 445566', 'Das Zimmer hat ein eigenes Bad.', RF, 1, 'Küche und Bad teilt man mit zwei Studenten.'),
  L('Anzeige: Zimmer frei! 20 m², möbliert, Küche und Bad zusammen mit zwei Studenten. 380 € warm. Tel. 0176 445566', 'Im Zimmer sind schon Möbel.', RF, 0, 'möbliert = mit Möbeln.'),
  L('Speisekarte Café Sonne: Kaffee 2,50 € · Tee 1,80 € · Apfelkuchen 3,20 € · Käsebrot 4,50 €', 'Sie haben genau 5 Euro. Was können Sie bestellen?', ['Kaffee und Käsebrot', 'Tee und Apfelkuchen', 'Kaffee und Apfelkuchen'], 1, '1,80 + 3,20 = 5,00 €. Die anderen kosten mehr als 5 €.'),
  L('Am Bahnhof: „Fahrkarten bitte vor der Fahrt am Automaten kaufen. Im Bus kein Verkauf."', 'Wo kaufen Sie die Fahrkarte?', ['Im Bus beim Fahrer', 'Am Automaten', 'Im Internet'], 1),
  L('Hi Leo, ich bin im Supermarkt. Brauchen wir Milch? Eier haben wir noch, oder? Schreib mir schnell! Mia', 'Mia ist …', ['zu Hause.', 'im Supermarkt.', 'bei der Arbeit.'], 1),
  L('Hi Leo, ich bin im Supermarkt. Brauchen wir Milch? Eier haben wir noch, oder? Schreib mir schnell! Mia', 'Mia möchte wissen, ob …', ['Leo Hunger hat.', 'sie Milch kaufen soll.', 'Leo im Supermarkt ist.'], 1),
  L('Volkshochschule: Deutschkurs A1 — Mo und Mi, 18:00–19:30 Uhr. Beginn: 4. März. Anmeldung bis 25. Februar im Büro, Raum 12.', 'Der Kurs ist zweimal pro Woche.', RF, 0),
  L('Volkshochschule: Deutschkurs A1 — Mo und Mi, 18:00–19:30 Uhr. Beginn: 4. März. Anmeldung bis 25. Februar im Büro, Raum 12.', 'Man kann sich noch am 1. März anmelden.', RF, 1),
  L('Volkshochschule: Deutschkurs A1 — Mo und Mi, 18:00–19:30 Uhr. Beginn: 4. März. Anmeldung bis 25. Februar im Büro, Raum 12.', 'Wo meldet man sich an?', ['Im Internet', 'Im Büro, Raum 12', 'Im Kursraum'], 1),
  L('Zettel im Treppenhaus: „Liebe Nachbarn, am Freitag feiern wir den Geburtstag von unserem Sohn. Es wird vielleicht etwas laut. Entschuldigung! Familie Özdemir, 2. Stock"', 'Die Familie Özdemir …', ['sucht eine neue Wohnung.', 'macht am Freitag eine Feier.', 'hat Probleme mit den Nachbarn.'], 1),
  L('Arztpraxis: „Sprechstunde nur mit Termin. Termine telefonisch: 030 2233 44."', 'Sie möchten zum Arzt. Was machen Sie?', ['Sie gehen sofort hin.', 'Sie rufen an und machen einen Termin.', 'Sie schreiben eine E-Mail.'], 1),
  L('Liebe Oma,\nviele Grüße aus Italien! Das Wetter ist super, wir gehen jeden Tag ans Meer. Das Hotel ist klein, aber sehr schön. Am Sonntag fliegen wir zurück.\nDeine Lisa', 'Lisa ist im Urlaub in Italien.', RF, 0),
  L('Liebe Oma,\nviele Grüße aus Italien! Das Wetter ist super, wir gehen jeden Tag ans Meer. Das Hotel ist klein, aber sehr schön. Am Sonntag fliegen wir zurück.\nDeine Lisa', 'Das Wetter ist schlecht.', RF, 1),
  L('Liebe Oma,\nviele Grüße aus Italien! Das Wetter ist super, wir gehen jeden Tag ans Meer. Das Hotel ist klein, aber sehr schön. Am Sonntag fliegen wir zurück.\nDeine Lisa', 'Lisa fährt mit dem Zug nach Hause.', RF, 1, 'Sie FLIEGEN zurück.'),
  L('Schwimmbad Nord: Eintritt Erwachsene 4 €, Kinder bis 14 Jahre 2 €. Dienstag: Frauenschwimmen 18–20 Uhr.', 'Ein Kind (10 Jahre) bezahlt …', ['2 €', '4 €', 'nichts'], 0),
  L('Schwimmbad Nord: Eintritt Erwachsene 4 €, Kinder bis 14 Jahre 2 €. Dienstag: Frauenschwimmen 18–20 Uhr.', 'Am Dienstagabend können nur Frauen schwimmen.', RF, 0),

  // ---------------- WORTSCHATZ (25) ----------------
  W('Morgens sage ich: „Guten ___!"', ['Abend', 'Morgen', 'Nacht'], 1),
  W('Das Gegenteil von „groß" ist …', ['klein', 'lang', 'alt'], 0),
  W('Was passt nicht?', ['Montag', 'Freitag', 'Januar', 'Sonntag'], 2, 'Januar ist ein Monat, die anderen sind Tage.'),
  W('Was isst man?', ['Saft', 'Brötchen', 'Kaffee'], 1),
  W('Die Mutter von meiner Mutter ist meine …', ['Tante', 'Schwester', 'Großmutter'], 2),
  W('Ich schlafe im …', ['Badezimmer', 'Schlafzimmer', 'Küche'], 1),
  W('Wie viel ist „dreiundsechzig"?', ['36', '63', '603'], 1),
  W('Im Winter ist es oft …', ['heiß', 'kalt', 'sonnig und warm'], 1),
  W('Der Arzt arbeitet in der …', ['Praxis', 'Bäckerei', 'Bank'], 0),
  W('Brot kauft man in der …', ['Apotheke', 'Bäckerei', 'Post'], 1),
  W('Medikamente kauft man in der …', ['Apotheke', 'Bäckerei', 'Bibliothek'], 0),
  W('Das Gegenteil von „teuer" ist …', ['billig', 'schön', 'neu'], 0),
  W('Welche Farbe hat eine Banane?', ['blau', 'gelb', 'rot'], 1),
  W('Am Ende von einem Brief schreibt man: „Viele …"', ['Grüße', 'Danke', 'Tage'], 0),
  W('Ich habe Hunger. Ich möchte etwas …', ['trinken', 'essen', 'schlafen'], 1),
  W('Wie spät ist es? — Es ist Viertel nach drei. =', ['3:15', '2:45', '3:45'], 0),
  W('Was passt? „Ich ___ im Supermarkt ein."', ['kaufe', 'gehe', 'mache'], 0),
  W('Der Monat nach April ist …', ['März', 'Mai', 'Juni'], 1),
  W('Was zieht man an die Füße?', ['Hut', 'Schuhe', 'Handschuhe'], 1),
  W('Ich bin müde. Ich gehe ins …', ['Bett', 'Kino', 'Büro'], 0),
  W('Das Gegenteil von „links" ist …', ['geradeaus', 'rechts', 'oben'], 1),
  W('Ein Jahr hat … Monate.', ['zehn', 'zwölf', 'zwanzig'], 1),
  W('Wo wartet man auf den Bus?', ['an der Haltestelle', 'am Flughafen', 'im Hotel'], 0),
  W('„Tschüss!" sagt man, wenn man …', ['kommt', 'geht', 'isst'], 1),
  W('Der Kopf, die Hand, der Bauch sind …', ['Kleidung', 'Körperteile', 'Möbel'], 1),

  // ---------------- GRAMMATIK (25) ----------------
  G('Wie ___ du?', ['heiße', 'heißt', 'heißen'], 1),
  G('Wir ___ aus der Türkei.', ['kommt', 'kommen', 'komme'], 1),
  G('Er ___ Lehrer.', ['bin', 'ist', 'sind'], 1),
  G('Ich habe ___ Bruder.', ['ein', 'einen', 'eine'], 1, 'Akkusativ maskulin: einen.'),
  G('Das ist ___ Tasche.', ['ein', 'eine', 'einen'], 1),
  G('___ Kind spielt im Garten.', ['Der', 'Die', 'Das'], 2),
  G('Ich trinke ___ Kaffee. Ich mag keinen Kaffee.', ['kein', 'keinen', 'nicht'], 1),
  G('Das Essen ist ___ gut.', ['kein', 'nicht', 'keine'], 1),
  G('___ du Englisch? (sprechen)', ['Sprechst', 'Sprichst', 'Spricht'], 1),
  G('Ich ___ heute nicht kommen. Ich bin krank.', ['kann', 'kannst', 'können'], 0),
  G('Der Film fängt um acht Uhr ___.', ['auf', 'an', 'ein'], 1),
  G('Wo ___ du? — In Berlin.', ['wohnst', 'wohnt', 'wohnen'], 0),
  G('Ich fahre ___ dem Bus.', ['mit', 'für', 'ohne'], 0),
  G('___ Montag habe ich frei.', ['Um', 'Am', 'Im'], 1),
  G('Der Kurs beginnt ___ 9 Uhr.', ['am', 'um', 'im'], 1),
  G('Das ist Maria und das ist ___ Mann.', ['ihr', 'sein', 'ihre'], 0, 'Marias Mann → ihr Mann.'),
  G('___ bitte langsam! (sprechen, Sie)', ['Sprechen Sie', 'Sprich Sie', 'Sprecht'], 0),
  G('Gestern ___ ich im Kino.', ['bin', 'war', 'habe'], 1),
  G('Plural: das Buch → die …', ['Buchs', 'Bücher', 'Buchen'], 1),
  G('Ich ___ gern Pizza.', ['esse', 'isst', 'essen'], 0),
  G('Er ___ sehr gut Fußball.', ['spielt', 'spielst', 'spielen'], 0),
  G('Wann ___ du morgen ___? (aufstehen)', ['stehst … auf', 'aufstehst … –', 'stehst … an'], 0),
  G('___ heißt du? — Paula.', ['Wo', 'Wie', 'Was'], 1),
  G('Ich möchte ___ Glas Wasser.', ['ein', 'einen', 'eine'], 0),
  G('Wir ___ am Wochenende ins Kino gehen. (wollen)', ['wollen', 'will', 'wollt'], 0),
];

export const SECTIONS: { name: Section; icon: string; desc: string; minutes: number }[] = [
  { name: 'Hören', icon: '🎧', desc: 'Short announcements, phone messages and conversations', minutes: 20 },
  { name: 'Lesen', icon: '📖', desc: 'Messages, signs, ads and short letters', minutes: 25 },
  { name: 'Wortschatz', icon: '📚', desc: 'Everyday words: food, family, time, city', minutes: 15 },
  { name: 'Grammatik', icon: '🧩', desc: 'Verbs, articles, cases, word order', minutes: 15 },
];
