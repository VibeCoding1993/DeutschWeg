/** Original B2 practice material in the format of Goethe/telc B2 modules. */

export interface MCQ { q: string; options: string[]; a: number }

export interface ReadingPart { id: string; title: string; instructions: string; text: string; questions: MCQ[] }
export interface ListeningPart { id: string; title: string; instructions: string; script: string; questions: MCQ[] }
export interface ClozePart { id: string; title: string; instructions: string; text: string; gaps: { options: string[]; a: number }[] }

export const READING: ReadingPart[] = [
  {
    id: 'r1', title: 'Lesen · Digitale Entgiftung',
    instructions: 'Lesen Sie den Text und wählen Sie die richtige Antwort.',
    text: `Immer mehr Menschen in Deutschland gönnen sich bewusst eine Auszeit vom Smartphone. „Digital Detox" nennt sich der Trend, der längst nicht mehr nur von Hotels in den Alpen vermarktet wird. Laut einer aktuellen Umfrage eines Branchenverbands hat fast jeder Dritte schon einmal freiwillig für mindestens einen Tag auf sein Handy verzichtet.

Die Gründe dafür sind vielfältig. Viele Befragte gaben an, sich durch die ständige Erreichbarkeit gestresst zu fühlen. Besonders Berufstätige klagen darüber, dass die Grenze zwischen Arbeit und Freizeit verschwimmt, seit dienstliche E-Mails auch abends auf dem privaten Gerät landen. Andere wollen schlicht wieder mehr Zeit mit Familie und Freunden verbringen, ohne dass das Display ständig aufleuchtet.

Experten sehen den Trend jedoch differenziert. Die Psychologin Dr. Anja Brehm betont, ein kompletter Verzicht sei für die meisten Menschen weder realistisch noch notwendig. „Entscheidend ist nicht, wie viele Stunden man online verbringt, sondern wie bewusst man das tut", erklärt sie. Wer sein Handy etwa nur noch zu festen Zeiten nutze und Benachrichtigungen abschalte, profitiere oft mehr als jemand, der eine Woche lang abstinent lebe und danach in alte Muster zurückfalle.

Auch Unternehmen haben das Thema entdeckt. Einige Konzerne leiten E-Mails, die während des Urlaubs eingehen, automatisch um oder löschen sie sogar. Kritiker bemängeln allerdings, dass solche Maßnahmen das eigentliche Problem nicht lösen: eine Arbeitskultur, in der ständige Verfügbarkeit als Zeichen von Engagement gilt.`,
    questions: [
      { q: 'Was sagt die Umfrage?', options: ['Die Mehrheit verzichtet regelmäßig auf das Handy.', 'Etwa ein Drittel hat schon einmal einen Tag ohne Handy verbracht.', 'Nur Hotelgäste machen Digital Detox.', 'Jeder Dritte besitzt kein Smartphone.'], a: 1 },
      { q: 'Warum fühlen sich viele Berufstätige gestresst?', options: ['Weil sie zu wenig verdienen.', 'Weil sie im Urlaub arbeiten müssen.', 'Weil Arbeit und Privatleben nicht mehr klar getrennt sind.', 'Weil ihre Geräte zu teuer sind.'], a: 2 },
      { q: 'Was empfiehlt Dr. Brehm?', options: ['Ganz auf das Smartphone zu verzichten.', 'Das Handy bewusst und zu festen Zeiten zu nutzen.', 'Eine Woche pro Jahr offline zu sein.', 'Mehr Zeit online zu verbringen.'], a: 1 },
      { q: 'Wie reagieren einige Unternehmen?', options: ['Sie verbieten Smartphones im Büro.', 'Sie bezahlen ihren Mitarbeitern Detox-Urlaube.', 'Sie leiten Urlaubs-E-Mails um oder löschen sie.', 'Sie verlangen ständige Erreichbarkeit.'], a: 2 },
      { q: 'Was kritisieren Kritiker?', options: ['Die Maßnahmen sind zu teuer.', 'Das Grundproblem – die Arbeitskultur – bleibt bestehen.', 'Mitarbeiter verlieren wichtige E-Mails.', 'Der Trend ist nur eine Mode.'], a: 1 },
    ],
  },
  {
    id: 'r2', title: 'Lesen · Wohnen in der Großstadt',
    instructions: 'Lesen Sie den Text. Sind die Aussagen richtig oder falsch?',
    text: `Wer in München, Hamburg oder Berlin eine bezahlbare Wohnung sucht, braucht vor allem eines: Geduld. Bei Besichtigungen drängen sich nicht selten fünfzig Interessenten in einer Zweizimmerwohnung. Die Mieten sind in den vergangenen zehn Jahren in vielen Großstädten um mehr als 40 Prozent gestiegen, während die Einkommen deutlich langsamer wuchsen.

Immer mehr junge Menschen entscheiden sich deshalb für alternative Wohnformen. Neben klassischen Wohngemeinschaften gewinnen sogenannte Mehrgenerationenhäuser an Beliebtheit, in denen Studierende günstig bei älteren Menschen wohnen und im Gegenzug im Haushalt helfen. Das Modell „Wohnen für Hilfe" wird inzwischen in über dreißig deutschen Städten angeboten.

Die Politik versucht mit der Mietpreisbremse gegenzusteuern, die Mieterhöhungen bei Neuvermietungen begrenzen soll. Ihre Wirkung ist allerdings umstritten: Vermieterverbände halten sie für einen Eingriff, der Investitionen verhindere, Mieterverbände kritisieren, dass sie zu viele Ausnahmen enthalte. Einig sind sich beide Seiten nur darin, dass langfristig nur eines hilft: mehr bauen.`,
    questions: [
      { q: 'Die Einkommen sind genauso stark gestiegen wie die Mieten.', options: ['richtig', 'falsch'], a: 1 },
      { q: 'Bei „Wohnen für Hilfe" zahlen Studierende weniger Miete und helfen dafür im Haushalt.', options: ['richtig', 'falsch'], a: 0 },
      { q: 'Das Modell gibt es nur in Berlin.', options: ['richtig', 'falsch'], a: 1 },
      { q: 'Mieterverbände finden die Mietpreisbremse perfekt.', options: ['richtig', 'falsch'], a: 1 },
      { q: 'Vermieter- und Mieterverbände sind sich einig, dass mehr gebaut werden muss.', options: ['richtig', 'falsch'], a: 0 },
    ],
  },
];

export const LISTENING: ListeningPart[] = [
  {
    id: 'l1', title: 'Hören · Radiointerview: Ehrenamt',
    instructions: 'Hören Sie das Interview (zweimal möglich) und beantworten Sie die Fragen.',
    script: `Moderatorin: Herzlich willkommen zu „Stadtgespräch". Heute ist Markus Feldmann bei uns. Er leitet seit sechs Jahren die Tafel in unserer Stadt. Herr Feldmann, was genau macht die Tafel?
Feldmann: Wir sammeln Lebensmittel, die Supermärkte und Bäckereien nicht mehr verkaufen können, die aber noch völlig in Ordnung sind. Diese verteilen wir zweimal pro Woche an Menschen mit wenig Geld.
Moderatorin: Und das alles ehrenamtlich?
Feldmann: Ja, bei uns arbeiten etwa achtzig Freiwillige, keiner bekommt Geld dafür. Die meisten sind Rentner, aber in den letzten Jahren kommen erfreulicherweise auch immer mehr Studierende.
Moderatorin: Was ist im Moment Ihre größte Herausforderung?
Feldmann: Ehrlich gesagt der Platz. Die Zahl der Kunden hat sich seit letztem Jahr fast verdoppelt, aber unsere Räume sind dieselben geblieben. Wir suchen dringend eine größere Halle, möglichst mit Kühlraum.
Moderatorin: Wie können die Hörerinnen und Hörer helfen?
Feldmann: Am meisten helfen uns Leute, die ein paar Stunden pro Monat Zeit haben – vor allem samstags fehlen Fahrer. Geld spenden ist natürlich auch willkommen, aber Zeit ist für uns noch wertvoller.`,
    questions: [
      { q: 'Wie lange leitet Herr Feldmann die Tafel?', options: ['seit zwei Jahren', 'seit sechs Jahren', 'seit acht Jahren', 'seit einem Jahr'], a: 1 },
      { q: 'Woher kommen die Lebensmittel?', options: ['Von Bauern aus der Region.', 'Aus Spenden von Privatpersonen.', 'Von Supermärkten und Bäckereien.', 'Die Tafel kauft sie günstig ein.'], a: 2 },
      { q: 'Wer arbeitet bei der Tafel?', options: ['Bezahlte Angestellte.', 'Etwa 80 Freiwillige, vor allem Rentner.', 'Nur Studierende.', 'Mitarbeiter der Stadt.'], a: 1 },
      { q: 'Was ist das größte Problem?', options: ['Es gibt zu wenig Lebensmittel.', 'Es gibt zu wenig Kunden.', 'Die Räume sind zu klein.', 'Es fehlt Geld für Benzin.'], a: 2 },
      { q: 'Was wünscht sich Herr Feldmann am meisten?', options: ['Geldspenden.', 'Freiwillige, die Zeit haben – besonders samstags als Fahrer.', 'Mehr Supermärkte als Partner.', 'Einen neuen Kühlschrank.'], a: 1 },
    ],
  },
  {
    id: 'l2', title: 'Hören · Durchsage & Nachricht',
    instructions: 'Hören Sie die Nachricht auf dem Anrufbeantworter und beantworten Sie die Fragen.',
    script: `Guten Tag, hier spricht Sabine Lorenz von der Personalabteilung der Firma Kessler. Ich rufe wegen Ihrer Bewerbung als Projektassistent an. Wir würden Sie gern zu einem Vorstellungsgespräch einladen. Leider muss ich den ursprünglich genannten Termin am Dienstag absagen, da unser Abteilungsleiter an diesem Tag auf einer Messe ist. Könnten Sie stattdessen am Donnerstag um halb zehn kommen? Bitte bringen Sie Ihre Zeugnisse im Original mit. Das Gespräch findet nicht in unserem Hauptgebäude statt, sondern im neuen Bürogebäude gegenüber vom Bahnhof, dritter Stock. Bitte bestätigen Sie den Termin bis Mittwochmittag per E-Mail. Vielen Dank und auf Wiederhören.`,
    questions: [
      { q: 'Warum wird der Termin am Dienstag abgesagt?', options: ['Frau Lorenz ist krank.', 'Der Abteilungsleiter ist auf einer Messe.', 'Das Büro wird renoviert.', 'Es gibt zu viele Bewerber.'], a: 1 },
      { q: 'Wann ist der neue Termin?', options: ['Donnerstag, 9:30 Uhr', 'Donnerstag, 10:30 Uhr', 'Mittwoch, 9:30 Uhr', 'Dienstag, 9:30 Uhr'], a: 0 },
      { q: 'Was soll man mitbringen?', options: ['Ein Foto', 'Die Zeugnisse im Original', 'Den Personalausweis', 'Nichts'], a: 1 },
      { q: 'Wo findet das Gespräch statt?', options: ['Im Hauptgebäude', 'Im Bahnhof', 'Im Bürogebäude gegenüber vom Bahnhof', 'Auf der Messe'], a: 2 },
      { q: 'Wie soll man den Termin bestätigen?', options: ['Telefonisch bis Mittwoch', 'Per E-Mail bis Mittwochmittag', 'Per Brief', 'Gar nicht'], a: 1 },
    ],
  },
];

export const CLOZE: ClozePart[] = [
  {
    id: 'c1', title: 'Sprachbausteine · Formeller Brief',
    instructions: 'Wählen Sie für jede Lücke das passende Wort.',
    text: `Sehr geehrte Damen und Herren,

ich beziehe mich [1] Ihre Anzeige in der „Süddeutschen Zeitung" vom 12. März und bewerbe mich [2] die Stelle als Marketingassistentin. [3] meines Studiums der Betriebswirtschaft habe ich bereits mehrere Praktika absolviert, [4] ich wertvolle Erfahrungen im Bereich Social Media sammeln konnte. Besonders interessiert mich an Ihrem Unternehmen, [5] Sie großen Wert auf Nachhaltigkeit legen. Ich bin überzeugt, [6] ich mit meiner Kreativität einen Beitrag zu Ihrem Erfolg [7] kann. Über eine Einladung zu einem persönlichen Gespräch [8] ich mich sehr freuen.

Mit freundlichen Grüßen`,
    gaps: [
      { options: ['an', 'auf', 'über', 'für'], a: 1 },
      { options: ['um', 'für', 'auf', 'an'], a: 0 },
      { options: ['Während', 'Wegen', 'Seit', 'Trotz'], a: 0 },
      { options: ['bei denen', 'die', 'deren', 'wo'], a: 0 },
      { options: ['ob', 'weil', 'dass', 'wenn'], a: 2 },
      { options: ['davon, dass', 'darauf, dass', 'dass davon', 'damit'], a: 0 },
      { options: ['machen', 'leisten', 'geben', 'tun'], a: 1 },
      { options: ['werde', 'würde', 'wäre', 'hätte'], a: 1 },
    ],
  },
  {
    id: 'c2', title: 'Sprachbausteine · Zeitungsartikel',
    instructions: 'Wählen Sie für jede Lücke das passende Wort.',
    text: `Die Stadt Freiburg gilt als eine der grünsten Städte Deutschlands. Schon in den 1970er-Jahren protestierten die Bürger [1] den Bau eines Atomkraftwerks in der Nähe. [2] entstand ein starkes Umweltbewusstsein, das die Stadt bis heute prägt. Im Stadtteil Vauban zum Beispiel gibt es kaum Autos, [3] die meisten Bewohner fahren mit dem Fahrrad oder der Straßenbahn. Die Häuser [4] so gebaut, dass sie mehr Energie produzieren, als sie verbrauchen. [5] dieser Erfolge gibt es auch Kritik: Die Mieten sind stark gestiegen, [6] sich viele Familien das Leben in Vauban nicht mehr leisten können. [7] mehr die Stadt an Attraktivität gewinnt, [8] schwieriger wird es für Menschen mit kleinem Einkommen.`,
    gaps: [
      { options: ['gegen', 'für', 'über', 'auf'], a: 0 },
      { options: ['Daraus', 'Darauf', 'Damit', 'Dabei'], a: 0 },
      { options: ['weil', 'denn', 'obwohl', 'sodass'], a: 1 },
      { options: ['werden', 'wurden', 'worden', 'wird'], a: 1 },
      { options: ['Wegen', 'Trotz', 'Statt', 'Durch'], a: 1 },
      { options: ['sodass', 'damit', 'obwohl', 'falls'], a: 0 },
      { options: ['Je', 'Desto', 'Umso', 'Wie'], a: 0 },
      { options: ['je', 'desto', 'als', 'so'], a: 1 },
    ],
  },
];
