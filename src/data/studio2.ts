import type { Unit } from '../types';
import { A1, } from './a1';
import { A2 } from './a2';

const S = (u: Omit<Unit, 'level' | 'track'>): Unit => ({ ...u, level: 'A1', track: 'studio' });

export const STUDIO_2: Unit[] = [
  S({
    id: 'st-7', icon: '👷', title: 'Berufe', sub: 'Jobs, daily work, modal verbs',
    can: 'Talk about jobs and what people do at work, introduce someone, read simple statistics.',
    grammar: {
      title: 'Jobs (m/f), modal verbs & war/hatte',
      html: `<p>Most jobs add <b>-in</b> for women: der Lehrer → die Lehrer<b>in</b>, der Arzt → die <b>Ä</b>rzt<b>in</b>, der Koch → die K<b>ö</b>ch<b>in</b>. No article after <i>sein</i> for jobs: <i>Ich bin <b>Ingenieur</b>.</i></p>` + A1[6].grammar.html + `
<p><b>Past of sein & haben:</b> ich <b>war</b> / ich <b>hatte</b> — <i>Früher war ich Kellner. Ich hatte wenig Zeit.</i></p>`,
    },
    dialogs: [
      { title: 'Was machst du beruflich?', scene: 'cafe', lines: [
        { who: 'jonas', de: 'Und was machst du beruflich, Karim?', en: 'And what do you do for a living, Karim?' },
        { who: 'karim', de: 'Ich bin Programmierer. Ich entwickle Apps.', en: 'I\'m a programmer. I develop apps.' },
        { who: 'jonas', de: 'Spannend! Musst du viel arbeiten?', en: 'Exciting! Do you have to work a lot?' },
        { who: 'karim', de: 'Manchmal. Aber ich kann zwei Tage von zu Hause arbeiten.', en: 'Sometimes. But I can work from home two days a week.' },
        { who: 'karim', de: 'Und du? Lena sagt, du bist Ingenieur.', en: 'And you? Lena says you\'re an engineer.' },
        { who: 'jonas', de: 'Ja, ich plane Brücken. Ich muss oft auf Baustellen fahren.', en: 'Yes, I design bridges. I often have to go to building sites.' },
        { who: 'karim', de: 'In Marokko war ich Lehrer für Informatik.', en: 'In Morocco I was a computer science teacher.' },
        { who: 'jonas', de: 'Wirklich? Und hattest du viele Schüler?', en: 'Really? And did you have many pupils?' },
        { who: 'karim', de: 'Ja, dreißig pro Klasse!', en: 'Yes, thirty per class!' },
      ] },
      { title: 'Das ist meine Kollegin', scene: 'office', lines: [
        { who: 'karim', de: 'Lena, das ist meine Kollegin Amira.', en: 'Lena, this is my colleague Amira.' },
        { who: 'lena', de: 'Freut mich! Was machen Sie in der Firma?', en: 'Nice to meet you! What do you do at the company?' },
        { who: 'amira', de: 'Ich bin Teamleiterin. Ich organisiere Projekte und Termine.', en: 'I\'m a team leader. I organise projects and meetings.' },
        { who: 'lena', de: 'Und arbeiten Sie gern dort?', en: 'And do you like working there?' },
        { who: 'amira', de: 'Ja, sehr. Die Kollegen sind nett, nur die Meetings sind zu lang!', en: 'Yes, a lot. The colleagues are nice, only the meetings are too long!' },
      ] },
    ],
    vocab: [
      { de: 'Beruf', en: 'job, profession', g: 'der', pl: 'Berufe' }, { de: 'Ingenieur', en: 'engineer', g: 'der', pl: 'Ingenieure' },
      { de: 'Ärztin', en: 'doctor (f)', g: 'die', pl: 'Ärztinnen' }, { de: 'Programmierer', en: 'programmer', g: 'der', pl: 'Programmierer' },
      { de: 'Verkäuferin', en: 'shop assistant (f)', g: 'die', pl: 'Verkäuferinnen' }, { de: 'Koch', en: 'cook', g: 'der', pl: 'Köche' },
      { de: 'Kollege', en: 'colleague (m)', g: 'der', pl: 'Kollegen' }, { de: 'Projekt', en: 'project', g: 'das', pl: 'Projekte' },
      { de: 'organisieren', en: 'to organise' }, { de: 'entwickeln', en: 'to develop' },
      { de: 'Baustelle', en: 'building site', g: 'die', pl: 'Baustellen' }, { de: 'beruflich', en: 'professionally, for work' },
    ],
    ex: [
      { t: 'mc', q: 'der Arzt → die ___', options: ['Arztin', 'Ärztin', 'Ärzterin', 'Arzte'], a: 1 },
      { t: 'mc', q: 'Ich bin ___ .', options: ['ein Ingenieur von Beruf', 'Ingenieur', 'die Ingenieur', 'einen Ingenieur'], a: 1 },
      { t: 'fill', q: 'Ich ___ oft auf Baustellen fahren. (müssen)', a: ['muss'] },
      { t: 'fill', q: '___ du von zu Hause arbeiten? (können)', a: ['Kannst'] },
      { t: 'fill', q: 'Früher ___ ich Lehrer. (sein, past)', a: ['war'] },
      { t: 'fill', q: 'Wir ___ wenig Zeit. (haben, past)', a: ['hatten'] },
      { t: 'order', en: 'What do you do for a living?', de: 'Was machst du beruflich' },
      { t: 'translate', en: 'This is my colleague Amira.', a: ['Das ist meine Kollegin Amira.'] },
    ],
  }),
  S({
    id: 'st-8', icon: '🗼', title: 'Berlin sehen', sub: 'Sights, directions, telling about a trip',
    can: 'Know Berlin sights, ask for and give directions, tell about a trip, write a postcard.',
    grammar: {
      title: 'Directions & the Perfekt (first steps)',
      html: `<table class="tbl"><tr><th>direction</th><th>example</th></tr>
<tr><td>geradeaus</td><td>Gehen Sie geradeaus.</td></tr>
<tr><td>(nach) links / rechts</td><td>Biegen Sie an der Ampel links ab.</td></tr>
<tr><td><b>über</b> + Akk</td><td>Gehen Sie über die Brücke / über den Platz.</td></tr>
<tr><td><b>durch</b> + Akk</td><td>Gehen Sie durch den Park.</td></tr>
<tr><td><b>an</b> … <b>vorbei</b> + Dat</td><td>Gehen Sie am Rathaus vorbei.</td></tr>
<tr><td><b>bis zu</b> + Dat</td><td>Gehen Sie bis zur Kreuzung.</td></tr></table>
<p><b>Talking about a trip — Perfekt:</b> <b>haben/sein</b> (position 2) + <b>Partizip II</b> (end):</p>
<p class="ex">Wir <b>haben</b> den Fernsehturm <b>gesehen</b>. Ich <b>bin</b> mit dem Schiff <b>gefahren</b>. Wir <b>haben</b> viel <b>fotografiert</b>.</p>
<div class="tip">Postcard: <i>Liebe Mia, viele Grüße aus Berlin! … Bis bald, deine Lena</i></div>`,
    },
    dialogs: [
      { title: 'Wie komme ich zum Fernsehturm?', scene: 'berlin', lines: [
        { who: 'mia', de: 'Entschuldigung, wie komme ich zum Fernsehturm?', en: 'Excuse me, how do I get to the TV tower?' },
        { who: 'paul', de: 'Das ist nicht weit. Gehen Sie hier geradeaus bis zur Ampel.', en: 'It\'s not far. Go straight on to the traffic lights.' },
        { who: 'paul', de: 'Dann links und über die Brücke.', en: 'Then left and over the bridge.' },
        { who: 'mia', de: 'Über die Brücke … und dann?', en: 'Over the bridge … and then?' },
        { who: 'paul', de: 'Dann gehen Sie am Dom vorbei. Den Turm sehen Sie schon!', en: 'Then go past the cathedral. You can already see the tower!' },
        { who: 'mia', de: 'Wie lange brauche ich zu Fuß?', en: 'How long does it take on foot?' },
        { who: 'paul', de: 'Ungefähr zehn Minuten.', en: 'About ten minutes.' },
        { who: 'mia', de: 'Vielen Dank!', en: 'Thank you very much!' },
      ] },
      { title: 'Wie war Berlin?', scene: 'phone', lines: [
        { who: 'lena', de: 'Hallo Mia! Wie war dein Wochenende in Berlin?', en: 'Hi Mia! How was your weekend in Berlin?' },
        { who: 'mia', de: 'Super! Am Samstag habe ich den Fernsehturm besucht.', en: 'Great! On Saturday I visited the TV tower.' },
        { who: 'lena', de: 'Und am Sonntag?', en: 'And on Sunday?' },
        { who: 'mia', de: 'Da bin ich mit dem Schiff auf der Spree gefahren.', en: 'I took a boat on the Spree.' },
        { who: 'mia', de: 'Und abends habe ich mit Karim in Kreuzberg gegessen.', en: 'And in the evening I ate with Karim in Kreuzberg.' },
        { who: 'lena', de: 'Toll! Hast du viele Fotos gemacht?', en: 'Great! Did you take lots of photos?' },
        { who: 'mia', de: 'Über zweihundert!', en: 'Over two hundred!' },
      ] },
    ],
    vocab: [
      { de: 'Fernsehturm', en: 'TV tower', g: 'der', pl: 'Fernsehtürme' }, { de: 'Brücke', en: 'bridge', g: 'die', pl: 'Brücken' },
      { de: 'Ampel', en: 'traffic light', g: 'die', pl: 'Ampeln' }, { de: 'Kreuzung', en: 'crossroads', g: 'die', pl: 'Kreuzungen' },
      { de: 'Platz', en: 'square', g: 'der', pl: 'Plätze' }, { de: 'Dom', en: 'cathedral', g: 'der', pl: 'Dome' },
      { de: 'Schiff', en: 'ship, boat', g: 'das', pl: 'Schiffe' }, { de: 'geradeaus', en: 'straight on' },
      { de: 'abbiegen', en: 'to turn (biegt ab)' }, { de: 'vorbei', en: 'past' },
      { de: 'besuchen', en: 'to visit (besucht)' }, { de: 'Postkarte', en: 'postcard', g: 'die', pl: 'Postkarten' },
    ],
    ex: [
      { t: 'mc', q: 'Gehen Sie ___ den Park.', options: ['durch', 'mit', 'bei', 'von'], a: 0 },
      { t: 'mc', q: 'Gehen Sie ___ Rathaus vorbei.', options: ['am', 'an das', 'durch das', 'zum'], a: 0 },
      { t: 'fill', q: 'Gehen Sie bis ___ Ampel. (zu + der)', a: ['zur'] },
      { t: 'fill', q: 'Ich habe den Dom ___. (besuchen)', a: ['besucht'] },
      { t: 'fill', q: 'Wir ___ mit dem Schiff gefahren.', a: ['sind'] },
      { t: 'fill', q: 'Hast du Fotos ___? (machen)', a: ['gemacht'] },
      { t: 'order', en: 'How do I get to the station?', de: 'Wie komme ich zum Bahnhof' },
      { t: 'translate', en: 'Go straight on and then left.', a: ['Gehen Sie geradeaus und dann links.', 'Geh geradeaus und dann links.'] },
    ],
  }),
  S({
    id: 'st-9', icon: '🏖️', title: 'Ab in den Urlaub', sub: 'Holidays, experiences, accidents',
    can: 'Talk about holidays, describe holiday experiences and a small accident, take notes.',
    grammar: A2[1].grammar,
    dialogs: [
      { title: 'Wie war dein Urlaub?', scene: 'beach', lines: [
        { who: 'karim', de: 'Lena, du bist so braun! Wo warst du?', en: 'Lena, you\'re so tanned! Where were you?' },
        { who: 'lena', de: 'Ich war zwei Wochen in Portugal, an der Algarve.', en: 'I was in Portugal for two weeks, on the Algarve.' },
        { who: 'karim', de: 'Wie schön! Was hast du gemacht?', en: 'How lovely! What did you do?' },
        { who: 'lena', de: 'Ich habe viel gelesen und bin jeden Tag geschwommen.', en: 'I read a lot and swam every day.' },
        { who: 'karim', de: 'Und wie war das Wetter?', en: 'And how was the weather?' },
        { who: 'lena', de: 'Fantastisch, immer Sonne. Nur am letzten Tag hat es geregnet.', en: 'Fantastic, always sunny. It only rained on the last day.' },
        { who: 'karim', de: 'Ich fahre im August nach Marokko zu meiner Familie.', en: 'I\'m going to Morocco to my family in August.' },
      ] },
      { title: 'Ein kleiner Unfall', scene: 'mountains', lines: [
        { who: 'jonas', de: 'Ich war in den Alpen. Aber ich hatte einen kleinen Unfall.', en: 'I was in the Alps. But I had a small accident.' },
        { who: 'mia', de: 'Oh nein! Was ist passiert?', en: 'Oh no! What happened?' },
        { who: 'jonas', de: 'Ich bin gewandert und bin auf einem Stein ausgerutscht.', en: 'I was hiking and slipped on a stone.' },
        { who: 'mia', de: 'Hast du dich verletzt?', en: 'Did you hurt yourself?' },
        { who: 'jonas', de: 'Nur ein bisschen. Mein Fuß hat zwei Tage wehgetan.', en: 'Only a little. My foot hurt for two days.' },
        { who: 'mia', de: 'Zum Glück! Gute Besserung noch!', en: 'Luckily! Get well soon!' },
      ] },
    ],
    vocab: [
      { de: 'Urlaub', en: 'holiday', g: 'der', pl: 'Urlaube' }, { de: 'Ferien', en: 'holidays (school)', pl: 'Ferien' },
      { de: 'Strand', en: 'beach', g: 'der', pl: 'Strände' }, { de: 'Meer', en: 'sea', g: 'das', pl: 'Meere' },
      { de: 'Berg', en: 'mountain', g: 'der', pl: 'Berge' }, { de: 'Unfall', en: 'accident', g: 'der', pl: 'Unfälle' },
      { de: 'schwimmen', en: 'to swim (ist geschwommen)' }, { de: 'wandern', en: 'to hike (ist gewandert)' },
      { de: 'passieren', en: 'to happen (ist passiert)' }, { de: 'ausrutschen', en: 'to slip (ist ausgerutscht)' },
      { de: 'Wetter', en: 'weather', g: 'das', pl: '-' }, { de: 'Gute Besserung!', en: 'Get well soon!' },
    ],
    ex: [
      { t: 'mc', q: 'Ich ___ jeden Tag geschwommen.', options: ['habe', 'bin'], a: 1 },
      { t: 'mc', q: 'Wir ___ viel gelesen.', options: ['haben', 'sind'], a: 0 },
      { t: 'fill', q: 'Was ist ___? (passieren)', a: ['passiert'] },
      { t: 'fill', q: 'Er ist in den Alpen ___. (wandern)', a: ['gewandert'] },
      { t: 'fill', q: 'Am letzten Tag hat es ___. (regnen)', a: ['geregnet'] },
      { t: 'mc', q: 'Your friend is ill. You say:', options: ['Gute Reise!', 'Gute Besserung!', 'Guten Appetit!', 'Viel Glück!'], a: 1 },
      { t: 'order', en: 'Where were you on holiday?', de: 'Wo warst du im Urlaub' },
      { t: 'translate', en: 'I had a small accident.', a: ['Ich hatte einen kleinen Unfall.'] },
    ],
  }),
  S({
    id: 'st-10', icon: '🛒', title: 'Essen und trinken', sub: 'Shopping, prices, likes, recipes',
    can: 'Shop for food, ask for prices, say what you (don\'t) like, understand and explain a recipe.',
    grammar: {
      title: 'Quantities, accusative, mögen & the imperative in recipes',
      html: `<p><b>Quantities</b> (no "of"!): ein Kilo Äpfel, 200 Gramm Käse, ein Liter Milch, eine Flasche Wasser, eine Packung Reis, ein Stück Kuchen, eine Dose Tomaten.</p>
<p><b>Accusative</b> (only masculine changes): Ich kaufe <b>einen</b> Apfel / <b>den</b> Käse. Ich brauche <b>keinen</b> Zucker.</p>
<table class="tbl"><tr><th></th><th>mögen</th><th>essen</th></tr>
<tr><td>ich</td><td>mag</td><td>esse</td></tr><tr><td>du</td><td><b>magst</b></td><td><b>isst</b></td></tr><tr><td>er/sie</td><td>mag</td><td><b>isst</b></td></tr></table>
<p><b>Recipes use the imperative</b> (Sie-form or infinitive): <i><b>Schneiden Sie</b> die Zwiebeln. Die Kartoffeln <b>kochen</b>. <b>Gib</b> Salz dazu!</i> (du)</p>
<div class="tip">Asking prices: <i>Was kostet das? — Was kosten die Tomaten?</i> (plural!) · <i>Das ist (zu) teuer / günstig.</i></div>`,
    },
    dialogs: [
      { title: 'Auf dem Markt', scene: 'market', lines: [
        { who: 'paul', de: 'Guten Morgen! Was darf es sein?', en: 'Good morning! What can I get you?' },
        { who: 'lena', de: 'Ich hätte gern ein Kilo Tomaten.', en: 'I\'d like a kilo of tomatoes.' },
        { who: 'paul', de: 'Gern. Sonst noch etwas?', en: 'Sure. Anything else?' },
        { who: 'lena', de: 'Was kosten die Erdbeeren?', en: 'How much are the strawberries?' },
        { who: 'paul', de: 'Drei Euro fünfzig die Schale. Sie sind ganz frisch!', en: '3.50 euros a punnet. They\'re really fresh!' },
        { who: 'lena', de: 'Dann nehme ich zwei Schalen. Und zweihundert Gramm Käse, bitte.', en: 'Then I\'ll take two punnets. And 200 grams of cheese, please.' },
        { who: 'paul', de: 'Das macht zusammen zwölf Euro dreißig.', en: 'That\'s 12.30 euros altogether.' },
      ] },
      { title: 'Kochst du gern?', scene: 'flat', lines: [
        { who: 'karim', de: 'Heute koche ich Couscous für euch!', en: 'Today I\'m cooking couscous for you!' },
        { who: 'mia', de: 'Lecker! Was brauchst du?', en: 'Yummy! What do you need?' },
        { who: 'karim', de: 'Gemüse, Kichererbsen und Gewürze. Isst du Fleisch?', en: 'Vegetables, chickpeas and spices. Do you eat meat?' },
        { who: 'mia', de: 'Nein, ich esse kein Fleisch. Ich bin Vegetarierin.', en: 'No, I don\'t eat meat. I\'m a vegetarian.' },
        { who: 'karim', de: 'Kein Problem. Schneid bitte die Karotten!', en: 'No problem. Please cut the carrots!' },
        { who: 'mia', de: 'Klar. Und magst du Schokolade zum Nachtisch?', en: 'Sure. And do you like chocolate for dessert?' },
        { who: 'karim', de: 'Natürlich! Wer mag keine Schokolade?', en: 'Of course! Who doesn\'t like chocolate?' },
      ] },
    ],
    vocab: [
      { de: 'Tomate', en: 'tomato', g: 'die', pl: 'Tomaten' }, { de: 'Erdbeere', en: 'strawberry', g: 'die', pl: 'Erdbeeren' },
      { de: 'Käse', en: 'cheese', g: 'der', pl: '-' }, { de: 'Gemüse', en: 'vegetables', g: 'das', pl: '-' },
      { de: 'Fleisch', en: 'meat', g: 'das', pl: '-' }, { de: 'Kilo', en: 'kilo', g: 'das', pl: 'Kilo' },
      { de: 'Gramm', en: 'gram', g: 'das', pl: 'Gramm' }, { de: 'Flasche', en: 'bottle', g: 'die', pl: 'Flaschen' },
      { de: 'Nachtisch', en: 'dessert', g: 'der', pl: 'Nachtische' }, { de: 'frisch', en: 'fresh' },
      { de: 'schneiden', en: 'to cut' }, { de: 'Was darf es sein?', en: 'What can I get you?' },
    ],
    ex: [
      { t: 'mc', q: 'Was ___ die Äpfel?', options: ['kostet', 'kosten', 'kostest'], a: 1 },
      { t: 'fill', q: 'Ich kaufe ___ Liter Milch. (a)', a: ['einen'] },
      { t: 'fill', q: '___ du Fisch? (mögen)', a: ['Magst'] },
      { t: 'fill', q: 'Mia ___ kein Fleisch. (essen)', a: ['isst'] },
      { t: 'mc', q: 'Recipe: „___ Sie die Zwiebeln."', options: ['Schneiden', 'Schneidet', 'Schneide', 'Geschnitten'], a: 0 },
      { t: 'listen', text: 'Ich hätte gern zweihundert Gramm Käse und eine Flasche Wasser.', en: 'I\'d like 200 grams of cheese and a bottle of water.' },
      { t: 'order', en: 'What can I get you?', de: 'Was darf es sein' },
      { t: 'translate', en: 'I don\'t eat meat.', a: ['Ich esse kein Fleisch.'] },
    ],
  }),
  S({
    id: 'st-11', icon: '🧥', title: 'Kleidung und Wetter', sub: 'Clothes, colours, sizes, weather',
    can: 'Talk about clothes and colours, buy clothes, name sizes, talk about the weather.',
    grammar: {
      title: 'welch- / dies-, colours & weather',
      html: `<table class="tbl"><tr><th></th><th>m</th><th>f</th><th>n</th><th>pl</th></tr>
<tr><td>Nom</td><td>welch<b>er</b> / dies<b>er</b></td><td>welch<b>e</b> / dies<b>e</b></td><td>welch<b>es</b> / dies<b>es</b></td><td>welch<b>e</b> / dies<b>e</b></td></tr>
<tr><td>Akk</td><td>welch<b>en</b> / dies<b>en</b></td><td>welche / diese</td><td>welches / dieses</td><td>welche / diese</td></tr></table>
<p class="ex">Welche Jacke gefällt dir? — <b>Diese</b> hier. Wie findest du <b>diesen</b> Pullover? — Ich finde <b>ihn</b> schön.</p>
<p><b>Colours</b>: rot, blau, grün, gelb, schwarz, weiß, grau, braun, rosa, lila. After sein no ending: <i>Der Rock ist rot.</i></p>
<p><b>Weather</b>: Es <b>regnet</b>. Es <b>schneit</b>. Die Sonne <b>scheint</b>. Es ist kalt / warm / windig / bewölkt. Es sind 25 Grad.</p>
<div class="tip">Pronouns for things follow gender: der Mantel → <b>ihn</b>, die Hose → <b>sie</b>, das Hemd → <b>es</b>, die Schuhe → <b>sie</b>.</div>`,
    },
    dialogs: [
      { title: 'Im Kleidungsgeschäft', scene: 'shop', lines: [
        { who: 'paul', de: 'Kann ich Ihnen helfen?', en: 'Can I help you?' },
        { who: 'mia', de: 'Ja, ich suche eine Jacke für den Winter.', en: 'Yes, I\'m looking for a jacket for the winter.' },
        { who: 'paul', de: 'Welche Größe haben Sie?', en: 'What size are you?' },
        { who: 'mia', de: 'Achtunddreißig.', en: 'Thirty-eight.' },
        { who: 'paul', de: 'Wie finden Sie diese hier? Die gibt es in Blau und in Schwarz.', en: 'How do you like this one? It comes in blue and black.' },
        { who: 'mia', de: 'Die blaue gefällt mir. Kann ich sie anprobieren?', en: 'I like the blue one. Can I try it on?' },
        { who: 'paul', de: 'Natürlich. Die Kabine ist dort hinten.', en: 'Of course. The changing room is back there.' },
        { who: 'mia', de: 'Perfekt, sie passt! Was kostet sie?', en: 'Perfect, it fits! How much is it?' },
        { who: 'paul', de: 'Neunundachtzig Euro.', en: 'Eighty-nine euros.' },
      ] },
      { title: 'Was ziehst du an?', scene: 'street', lines: [
        { who: 'lena', de: 'Wie ist das Wetter heute?', en: 'What\'s the weather like today?' },
        { who: 'jonas', de: 'Es ist kalt und windig. Am Nachmittag regnet es.', en: 'It\'s cold and windy. It\'ll rain in the afternoon.' },
        { who: 'lena', de: 'Dann ziehe ich meinen Mantel an.', en: 'Then I\'ll put on my coat.' },
        { who: 'jonas', de: 'Und nimm einen Regenschirm mit!', en: 'And take an umbrella!' },
        { who: 'lena', de: 'Mache ich. Morgen soll die Sonne scheinen, zwanzig Grad!', en: 'I will. Tomorrow the sun is supposed to shine, twenty degrees!' },
      ] },
    ],
    vocab: [
      { de: 'Jacke', en: 'jacket', g: 'die', pl: 'Jacken' }, { de: 'Mantel', en: 'coat', g: 'der', pl: 'Mäntel' },
      { de: 'Hose', en: 'trousers', g: 'die', pl: 'Hosen' }, { de: 'Hemd', en: 'shirt', g: 'das', pl: 'Hemden' },
      { de: 'Schuh', en: 'shoe', g: 'der', pl: 'Schuhe' }, { de: 'Größe', en: 'size', g: 'die', pl: 'Größen' },
      { de: 'anprobieren', en: 'to try on' }, { de: 'anziehen', en: 'to put on (clothes)' },
      { de: 'Regenschirm', en: 'umbrella', g: 'der', pl: 'Regenschirme' }, { de: 'regnen', en: 'to rain' },
      { de: 'windig', en: 'windy' }, { de: 'Grad', en: 'degree', g: 'der', pl: 'Grad' },
    ],
    ex: [
      { t: 'mc', q: '___ Jacke gefällt dir?', options: ['Welcher', 'Welche', 'Welches', 'Welchen'], a: 1 },
      { t: 'mc', q: 'Wie findest du ___ Mantel?', options: ['dieser', 'diesen', 'diese', 'dieses'], a: 1 },
      { t: 'fill', q: 'Der Pullover ist schön. Ich nehme ___.', a: ['ihn'] },
      { t: 'fill', q: 'Das Hemd ist zu klein. Ich probiere ___ nicht an.', a: ['es'] },
      { t: 'mc', q: 'Snow is falling. =', options: ['Es regnet.', 'Es schneit.', 'Es ist windig.', 'Die Sonne scheint.'], a: 1 },
      { t: 'fill', q: 'Ich ___ meinen Mantel ___. (anziehen)', a: ['ziehe an'] },
      { t: 'order', en: 'Can I try it on? (die Jacke)', de: 'Kann ich sie anprobieren' },
      { t: 'translate', en: 'It is cold and it is raining.', a: ['Es ist kalt und es regnet.', 'Es ist kalt und regnet.'] },
    ],
  }),
  S({
    id: 'st-12', icon: '🩺', title: 'Körper und Gesundheit', sub: 'Body, at the doctor, advice, feelings',
    can: 'Name body parts, say what hurts, give advice and instructions, talk about feelings.',
    grammar: {
      title: 'Imperative, sollen & "… tut weh"',
      html: `<table class="tbl"><tr><th></th><th>trinken</th><th>nehmen</th><th>sich ausruhen</th></tr>
<tr><td>Sie</td><td>Trinken Sie viel!</td><td>Nehmen Sie die Tabletten!</td><td>Ruhen Sie sich aus!</td></tr>
<tr><td>du</td><td>Trink viel!</td><td>Nimm die Tabletten!</td><td>Ruh dich aus!</td></tr>
<tr><td>ihr</td><td>Trinkt viel!</td><td>Nehmt …!</td><td>Ruht euch aus!</td></tr></table>
<p><b>sollen</b> reports advice: <i>Die Ärztin sagt, ich <b>soll</b> im Bett bleiben.</i> (ich soll, du sollst, er soll, wir sollen)</p>
<p><b>What hurts:</b> <i>Mein Kopf <b>tut weh</b>. Meine Füße <b>tun weh</b>. Ich habe Kopfschmerzen / Bauchschmerzen / Fieber / Husten.</i></p>
<div class="tip">Feelings: Ich bin froh / traurig / müde / nervös / gestresst. — <i>Was ist los?</i> (What\'s wrong?)</div>`,
    },
    dialogs: [
      { title: 'Beim Arzt', scene: 'doctor', lines: [
        { who: 'yilmaz', de: 'Guten Tag, Herr Benali. Was fehlt Ihnen?', en: 'Good afternoon, Mr Benali. What\'s the matter?' },
        { who: 'karim', de: 'Mein Hals tut weh und ich habe Fieber.', en: 'My throat hurts and I have a fever.' },
        { who: 'yilmaz', de: 'Seit wann haben Sie das?', en: 'Since when have you had that?' },
        { who: 'karim', de: 'Seit gestern. Und ich bin sehr müde.', en: 'Since yesterday. And I\'m very tired.' },
        { who: 'yilmaz', de: 'Machen Sie bitte den Mund auf … Aha, eine Erkältung.', en: 'Please open your mouth … Aha, a cold.' },
        { who: 'yilmaz', de: 'Trinken Sie viel Tee und bleiben Sie drei Tage zu Hause.', en: 'Drink lots of tea and stay at home for three days.' },
        { who: 'karim', de: 'Muss ich Tabletten nehmen?', en: 'Do I have to take tablets?' },
        { who: 'yilmaz', de: 'Nehmen Sie diese Tabletten zweimal am Tag. Gute Besserung!', en: 'Take these tablets twice a day. Get well soon!' },
      ] },
      { title: 'Was hat die Ärztin gesagt?', scene: 'phone', lines: [
        { who: 'lena', de: 'Na, was hat die Ärztin gesagt?', en: 'So, what did the doctor say?' },
        { who: 'karim', de: 'Ich soll viel trinken und drei Tage im Bett bleiben.', en: 'I\'m supposed to drink a lot and stay in bed for three days.' },
        { who: 'lena', de: 'Du Armer! Brauchst du etwas?', en: 'You poor thing! Do you need anything?' },
        { who: 'karim', de: 'Vielleicht Orangen und Honig?', en: 'Maybe oranges and honey?' },
        { who: 'lena', de: 'Kein Problem, ich bringe dir heute Abend alles. Ruh dich aus!', en: 'No problem, I\'ll bring you everything tonight. Get some rest!' },
        { who: 'karim', de: 'Danke, Lena. Ich bin so froh, dass ich dich habe.', en: 'Thanks, Lena. I\'m so glad I have you.' },
      ] },
    ],
    vocab: [
      { de: 'Kopf', en: 'head', g: 'der', pl: 'Köpfe' }, { de: 'Hals', en: 'throat, neck', g: 'der', pl: 'Hälse' },
      { de: 'Bauch', en: 'stomach', g: 'der', pl: 'Bäuche' }, { de: 'Rücken', en: 'back', g: 'der', pl: 'Rücken' },
      { de: 'Fuß', en: 'foot', g: 'der', pl: 'Füße' }, { de: 'Hand', en: 'hand', g: 'die', pl: 'Hände' },
      { de: 'Fieber', en: 'fever', g: 'das', pl: '-' }, { de: 'Erkältung', en: 'cold (illness)', g: 'die', pl: 'Erkältungen' },
      { de: 'Tablette', en: 'tablet', g: 'die', pl: 'Tabletten' }, { de: 'wehtun', en: 'to hurt' },
      { de: 'sich ausruhen', en: 'to rest' }, { de: 'Was fehlt Ihnen?', en: 'What\'s the matter?' },
    ],
    ex: [
      { t: 'fill', q: 'Mein Kopf ___ weh.', a: ['tut'] },
      { t: 'fill', q: 'Meine Füße ___ weh.', a: ['tun'] },
      { t: 'fill', q: '___ Sie viel Wasser! (trinken)', a: ['Trinken'] },
      { t: 'fill', q: '___ die Tabletten! (nehmen, du)', a: ['Nimm'] },
      { t: 'fill', q: 'Die Ärztin sagt, ich ___ im Bett bleiben. (sollen)', a: ['soll'] },
      { t: 'mc', q: 'Ruh ___ aus! (du)', options: ['dich', 'dir', 'sich', 'euch'], a: 0 },
      { t: 'order', en: 'My throat hurts.', de: 'Mein Hals tut weh' },
      { t: 'translate', en: 'I have a fever and a headache.', a: ['Ich habe Fieber und Kopfschmerzen.'] },
    ],
  }),
];
