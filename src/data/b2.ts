import type { Unit } from '../types';

export const B2: Unit[] = [
  {
    id: 'b2-1', level: 'B2', icon: '⚙️', title: 'Passiv für Profis', sub: 'Passive with modals, Zustandspassiv, alternatives',
    can: 'Use all passive forms and their alternatives in formal texts.',
    grammar: {
      title: 'Vorgangspassiv, Zustandspassiv & Passiversatz',
      html: `<table class="tbl"><tr><th>form</th><th>example</th></tr>
<tr><td>Passiv + Modal (Präsens)</td><td>Der Antrag <b>muss</b> bis Freitag <b>eingereicht werden</b>.</td></tr>
<tr><td>Passiv + Modal (Präteritum)</td><td>Das Problem <b>konnte</b> nicht <b>gelöst werden</b>.</td></tr>
<tr><td>Passiv + Modal (Perfekt)</td><td>Die Straße <b>hat</b> gesperrt <b>werden müssen</b>.</td></tr>
<tr><td>Passiv in Nebensatz</td><td>…, weil die Brücke <b>repariert werden muss</b>.</td></tr>
<tr><td><b>Zustandspassiv</b> (result)</td><td>Das Geschäft <b>ist</b> geschlossen. (sein + PII)</td></tr></table>
<p><b>Vorgang</b> (process): <i>Die Tür <b>wird</b> geschlossen.</i> vs. <b>Zustand</b> (state): <i>Die Tür <b>ist</b> geschlossen.</i></p>
<p><b>Passive alternatives</b> (very common at B2/C1):</p>
<table class="tbl"><tr><th>alternative</th><th>= passive</th></tr>
<tr><td>Das Problem <b>lässt sich</b> lösen.</td><td>… kann gelöst werden.</td></tr>
<tr><td>Das Problem <b>ist</b> leicht <b>zu lösen</b>.</td><td>… kann leicht gelöst werden.</td></tr>
<tr><td>Die Aufgabe <b>ist</b> bis morgen <b>zu erledigen</b>.</td><td>… muss erledigt werden.</td></tr>
<tr><td>Das Problem ist <b>lösbar</b>.</td><td>… kann gelöst werden.</td></tr>
<tr><td><b>Man</b> löst das Problem.</td><td>Das Problem wird gelöst.</td></tr></table>
<div class="tip"><b>sein + zu + Infinitiv</b> means either <i>können</i> or <i>müssen</i> — context decides. It's typical of official letters (<i>Die Gebühr ist sofort zu bezahlen</i>).</div>`,
    },
    vocab: [
      { de: 'Antrag', en: 'application (form)', g: 'der', pl: 'Anträge' },
      { de: 'einreichen', en: 'to submit' },
      { de: 'genehmigen', en: 'to approve' },
      { de: 'Behörde', en: 'authority (public office)', g: 'die', pl: 'Behörden' },
      { de: 'Gebühr', en: 'fee', g: 'die', pl: 'Gebühren' },
      { de: 'Frist', en: 'deadline', g: 'die', pl: 'Fristen' },
      { de: 'erledigen', en: 'to deal with, get done' },
      { de: 'Unterlagen', en: 'documents', pl: 'Unterlagen' },
      { de: 'Verfahren', en: 'procedure, process', g: 'das', pl: 'Verfahren' },
      { de: 'Genehmigung', en: 'permit, approval', g: 'die', pl: 'Genehmigungen' },
      { de: 'machbar', en: 'feasible' },
      { de: 'vermeiden', en: 'to avoid (vermieden)' },
    ],
    ex: [
      { t: 'fill', q: 'Die Unterlagen müssen bis Montag eingereicht ___.', a: ['werden'] },
      { t: 'fill', q: 'Der Fehler konnte nicht gefunden ___.', a: ['werden'] },
      { t: 'mc', q: 'Das Fenster ___ schon geöffnet. (state)', options: ['wird', 'ist', 'wurde', 'werden'], a: 1 },
      { t: 'mc', q: '"Das kann man nicht vermeiden." =', options: ['Das lässt sich nicht vermeiden.', 'Das lässt nicht vermeiden.', 'Das ist nicht vermieden.', 'Das wird nicht vermeiden.'], a: 0 },
      { t: 'mc', q: '"Die Gebühr ist sofort zu bezahlen." means…', options: ['The fee can be paid immediately.', 'The fee must be paid immediately.', 'The fee was paid immediately.', 'The fee is being paid.'], a: 1 },
      { t: 'fill', q: 'Das Projekt ist bis Ende des Jahres ___ ___. (realisieren, sein + zu)', a: ['zu realisieren'] },
      { t: 'fill', q: 'Dieser Text ist kaum ___. (lesen → -bar)', a: ['lesbar'] },
      { t: 'order', en: 'I know that the application must be approved.', de: 'Ich weiß dass der Antrag genehmigt werden muss' },
      { t: 'translate', en: 'The problem can easily be solved. (use: sich lassen)', a: ['Das Problem lässt sich leicht lösen.'] },
      { t: 'listen', text: 'Die Genehmigung hätte schon letzte Woche erteilt werden sollen.', en: 'The permit should have been granted last week.' },
      { t: 'speak', text: 'Diese Aufgabe ist bis morgen zu erledigen, sonst wird das Verfahren gestoppt.' },
    ],
  },
  {
    id: 'b2-2', level: 'B2', icon: '📰', title: 'Er sagte, …', sub: 'Konjunktiv I — reported speech',
    can: 'Report what others said, like in the news.',
    grammar: {
      title: 'Indirekte Rede mit Konjunktiv I',
      html: `<p>News and formal reports use <b>Konjunktiv I</b> to show "this is what someone said" (neutral distance).</p>
<p>Formation: <b>stem + -e, -est, -e, -en, -et, -en</b>. In practice the <b>er/sie/es</b> form is the most important:</p>
<table class="tbl"><tr><th>infinitive</th><th>er/sie/es</th></tr>
<tr><td>haben</td><td>er <b>habe</b></td></tr><tr><td>kommen</td><td>er <b>komme</b></td></tr><tr><td>können</td><td>er <b>könne</b></td></tr><tr><td>wollen</td><td>er <b>wolle</b></td></tr><tr><td>werden</td><td>er <b>werde</b></td></tr>
<tr><td><b>sein</b></td><td>ich sei, du sei(e)st, er <b>sei</b>, wir seien, ihr seiet, sie seien</td></tr></table>
<p class="ex">Direkt: Der Minister sagt: „Die Lage <b>ist</b> stabil."<br/>Indirekt: Der Minister sagt, die Lage <b>sei</b> stabil.</p>
<p><b>Past:</b> sei/habe + Partizip II: <i>Er sagte, er <b>habe</b> nichts <b>gewusst</b>. Sie behauptet, sie <b>sei</b> nie dort <b>gewesen</b>.</i><br/><b>Future:</b> werde + Infinitiv: <i>Er sagte, er <b>werde</b> morgen kommen.</i></p>
<div class="tip"><b>Rule of replacement:</b> if Konjunktiv I = indicative (e.g. <i>sie haben</i>), use Konjunktiv II: <i>Sie sagten, sie <b>hätten</b> keine Zeit.</i> Questions: <i>Er fragt, <b>ob</b> … / <b>wann</b> …</i> Commands: <i>Sie sagt, ich <b>solle</b> warten.</i></div>`,
    },
    vocab: [
      { de: 'behaupten', en: 'to claim' },
      { de: 'berichten', en: 'to report' },
      { de: 'mitteilen', en: 'to inform, announce' },
      { de: 'betonen', en: 'to emphasise' },
      { de: 'Aussage', en: 'statement', g: 'die', pl: 'Aussagen' },
      { de: 'Sprecher', en: 'spokesperson', g: 'der', pl: 'Sprecher' },
      { de: 'Nachricht', en: 'news item, message', g: 'die', pl: 'Nachrichten' },
      { de: 'Zeuge', en: 'witness', g: 'der', pl: 'Zeugen' },
      { de: 'Lage', en: 'situation', g: 'die', pl: 'Lagen' },
      { de: 'laut', en: 'according to (+Dat/Gen)', ex: 'Laut Polizei war niemand verletzt.' },
      { de: 'zufolge', en: 'according to (Dat, after noun)', ex: 'Dem Bericht zufolge …' },
      { de: 'verletzt', en: 'injured' },
    ],
    ex: [
      { t: 'fill', q: 'Der Sprecher sagte, die Lage ___ unter Kontrolle. (sein)', a: ['sei'] },
      { t: 'fill', q: 'Sie behauptet, sie ___ keine Zeit. (haben, sie = she)', a: ['habe'] },
      { t: 'fill', q: 'Er teilte mit, er ___ morgen zurückkommen. (werden)', a: ['werde'] },
      { t: 'fill', q: 'Die Zeugen sagten, sie ___ nichts gesehen. (haben → K II!)', a: ['hätten'], explain: '"sie haben" (K I) = indicative → replace with K II "hätten".' },
      { t: 'mc', q: 'Er sagte: „Ich war nie in Paris." → Er sagte, er ___ nie in Paris gewesen.', options: ['war', 'sei', 'wäre gewesen', 'ist'], a: 1 },
      { t: 'mc', q: 'Sie fragte: „Kommst du mit?" → Sie fragte, ___ ich mitkomme.', options: ['dass', 'ob', 'wenn', 'was'], a: 1 },
      { t: 'mc', q: 'Der Arzt sagt: „Bleiben Sie im Bett!" → Der Arzt sagt, ich ___ im Bett bleiben.', options: ['solle', 'müsste', 'werde', 'sei'], a: 0 },
      { t: 'order', en: 'The minister emphasised that the plan was realistic.', de: 'Der Minister betonte der Plan sei realistisch' },
      { t: 'translate', en: 'According to the police, nobody was injured.', a: ['Laut Polizei wurde niemand verletzt.', 'Laut Polizei war niemand verletzt.', 'Der Polizei zufolge wurde niemand verletzt.'] },
      { t: 'listen', text: 'Der Bürgermeister erklärte, man werde die Schule noch in diesem Jahr renovieren.', en: 'The mayor explained that the school would be renovated this year.' },
      { t: 'speak', text: 'Dem Bericht zufolge habe das Unternehmen im letzten Jahr Gewinne gemacht.' },
    ],
  },
  {
    id: 'b2-3', level: 'B2', icon: '🔮', title: 'Hätte, wäre, wenn', sub: 'Konjunktiv II past & als ob',
    can: 'Talk about regrets, missed chances and unreal comparisons.',
    grammar: {
      title: 'Konjunktiv II der Vergangenheit & irreale Vergleiche',
      html: `<p>Past unreal = <b>hätte / wäre + Partizip II</b>.</p>
<p class="ex">Wenn ich früher aufgestanden <b>wäre</b>, <b>hätte</b> ich den Zug nicht <b>verpasst</b>.<br/>Ich <b>hätte</b> dich <b>angerufen</b>, aber ich hatte keinen Akku.<br/>Fast <b>wäre</b> ich <b>gestürzt</b>! (I almost fell.)</p>
<p><b>With modal verbs</b> — double infinitive: <i>Du <b>hättest</b> mich fragen <b>sollen</b>.</i> (You should have asked me.) <i>Wir <b>hätten</b> das Problem lösen <b>können</b>.</i> In a subordinate clause: <i>…, obwohl er hätte helfen können.</i> (hätte comes before the double infinitive!)</p>
<p><b>Unreal comparison</b>: <b>als ob / als wenn</b> + verb at end, or <b>als</b> + verb straight after:</p>
<p class="ex">Er tut so, <b>als ob</b> er alles <b>wüsste</b>. = Er tut so, <b>als wüsste</b> er alles.<br/>Sie sieht aus, <b>als hätte</b> sie nicht geschlafen.</p>
<div class="tip">Wishes about the past: <i>Wenn ich doch mehr gelernt <b>hätte</b>!</i> / <i>Hätte ich bloß …!</i></div>`,
    },
    vocab: [
      { de: 'verpassen', en: 'to miss (train, chance)' },
      { de: 'bereuen', en: 'to regret' },
      { de: 'Gelegenheit', en: 'opportunity', g: 'die', pl: 'Gelegenheiten' },
      { de: 'Entscheidung', en: 'decision', g: 'die', pl: 'Entscheidungen' },
      { de: 'treffen (eine Entscheidung)', en: 'to make (a decision)' },
      { de: 'anders', en: 'differently' },
      { de: 'Zufall', en: 'coincidence, chance', g: 'der', pl: 'Zufälle' },
      { de: 'vorsichtig', en: 'careful' },
      { de: 'stürzen', en: 'to fall (ist gestürzt)' },
      { de: 'Unfall', en: 'accident', g: 'der', pl: 'Unfälle' },
      { de: 'Lebenslauf', en: 'CV, curriculum vitae', g: 'der', pl: 'Lebensläufe' },
    ],
    ex: [
      { t: 'fill', q: 'Wenn du mich gefragt ___, hätte ich dir geholfen.', a: ['hättest'] },
      { t: 'fill', q: 'Wenn wir früher losgefahren ___, wären wir pünktlich gewesen.', a: ['wären'] },
      { t: 'mc', q: 'You should have told me that.', options: ['Du hättest mir das sagen sollen.', 'Du solltest mir das gesagt.', 'Du hättest mir das gesagt sollen.', 'Du wärst mir das sagen sollen.'], a: 0 },
      { t: 'mc', q: 'Er tut so, als ___ er krank.', options: ['ist', 'wäre', 'sei', 'war'], a: 1 },
      { t: 'mc', q: 'Er tut so, als ob er alles ___.', options: ['weiß', 'wüsste', 'wisse', 'gewusst'], a: 1 },
      { t: 'mc', q: '…, obwohl sie das Problem ___.', options: ['lösen hätte können', 'hätte lösen können', 'hätte können lösen', 'lösen können hätte'], a: 1 },
      { t: 'fill', q: 'Ohne deine Hilfe ___ ich die Prüfung nicht bestanden.', a: ['hätte'] },
      { t: 'order', en: 'If I had known that, I would have come.', de: 'Wenn ich das gewusst hätte wäre ich gekommen' },
      { t: 'translate', en: 'I almost missed the train.', a: ['Fast hätte ich den Zug verpasst.', 'Ich hätte fast den Zug verpasst.', 'Ich hätte den Zug fast verpasst.'] },
      { t: 'listen', text: 'Hätte ich die Gelegenheit genutzt, wäre mein Leben heute ganz anders.', en: 'Had I used the opportunity, my life would be completely different today.' },
      { t: 'speak', text: 'Im Nachhinein hätte ich diese Entscheidung anders treffen sollen.' },
    ],
  },
  {
    id: 'b2-4', level: 'B2', icon: '🧱', title: 'Nominalstil', sub: 'Nominalisation & Nomen-Verb-Verbindungen',
    can: 'Write in the formal noun-heavy style of reports and exams.',
    grammar: {
      title: 'Verbal ↔ nominal style',
      html: `<p>Formal German turns verbs and clauses into <b>nouns</b>. You'll meet this in every B2/C1 reading text — and using it raises your writing score.</p>
<table class="tbl"><tr><th>verbal style</th><th>nominal style</th></tr>
<tr><td><b>Wenn</b> man das Gerät <b>benutzt</b>, …</td><td><b>Bei der Benutzung</b> des Geräts …</td></tr>
<tr><td><b>Weil</b> die Preise <b>steigen</b>, …</td><td><b>Wegen des Anstiegs</b> der Preise …</td></tr>
<tr><td><b>Nachdem</b> er <b>angekommen</b> war, …</td><td><b>Nach seiner Ankunft</b> …</td></tr>
<tr><td><b>Obwohl</b> es <b>regnete</b>, …</td><td><b>Trotz des Regens</b> …</td></tr>
<tr><td><b>Um</b> Energie <b>zu sparen</b>, …</td><td><b>Zur Einsparung</b> von Energie …</td></tr>
<tr><td><b>Während</b> wir <b>essen</b>, …</td><td><b>Während des Essens</b> …</td></tr></table>
<p><b>Nomen-Verb-Verbindungen</b> — fixed noun + verb pairs (learn them as chunks!):</p>
<table class="tbl"><tr><th>NVV</th><th>meaning</th></tr>
<tr><td>eine Entscheidung treffen</td><td>entscheiden</td></tr><tr><td>Kritik üben an</td><td>kritisieren</td></tr>
<tr><td>in Frage kommen</td><td>möglich sein</td></tr><tr><td>zur Verfügung stehen</td><td>verfügbar sein</td></tr>
<tr><td>Rücksicht nehmen auf</td><td>berücksichtigen</td></tr><tr><td>in Kraft treten</td><td>gültig werden</td></tr>
<tr><td>einen Beitrag leisten zu</td><td>beitragen</td></tr><tr><td>zum Ausdruck bringen</td><td>ausdrücken</td></tr></table>`,
    },
    vocab: [
      { de: 'Anstieg', en: 'rise, increase', g: 'der', pl: 'Anstiege' },
      { de: 'Rückgang', en: 'decline, decrease', g: 'der', pl: 'Rückgänge' },
      { de: 'Ankunft', en: 'arrival', g: 'die', pl: 'Ankünfte' },
      { de: 'Benutzung', en: 'use', g: 'die', pl: '-' },
      { de: 'Einführung', en: 'introduction', g: 'die', pl: 'Einführungen' },
      { de: 'Verfügung', en: 'disposal (zur Verfügung stehen)', g: 'die', pl: 'Verfügungen' },
      { de: 'Rücksicht nehmen auf', en: 'to show consideration for' },
      { de: 'in Kraft treten', en: 'to come into force' },
      { de: 'einen Beitrag leisten', en: 'to make a contribution' },
      { de: 'Kritik üben an', en: 'to criticise' },
      { de: 'Maßnahme', en: 'measure (action)', g: 'die', pl: 'Maßnahmen' },
      { de: 'Verbesserung', en: 'improvement', g: 'die', pl: 'Verbesserungen' },
    ],
    ex: [
      { t: 'mc', q: '"Nachdem er angekommen war" → ___', options: ['Nach seiner Ankunft', 'Bei seiner Ankunft', 'Vor seiner Ankunft', 'Seit seinem Ankommen'], a: 0 },
      { t: 'mc', q: '"Obwohl es regnete" → ___', options: ['Wegen des Regens', 'Trotz des Regens', 'Bei Regen', 'Während des Regens'], a: 1 },
      { t: 'fill', q: 'Das neue Gesetz tritt im Januar in ___.', a: ['Kraft'] },
      { t: 'fill', q: 'Bitte nehmen Sie ___ auf die anderen Gäste.', a: ['Rücksicht'] },
      { t: 'fill', q: 'Der Raum steht allen Mitarbeitern zur ___.', a: ['Verfügung'] },
      { t: 'mc', q: 'Wir müssen bald eine Entscheidung ___.', options: ['machen', 'treffen', 'nehmen', 'stellen'], a: 1 },
      { t: 'mc', q: 'Jeder kann einen Beitrag zum Umweltschutz ___.', options: ['machen', 'geben', 'leisten', 'tun'], a: 2 },
      { t: 'fill', q: '"Weil die Preise steigen" → Wegen des ___ der Preise', a: ['Anstiegs'] },
      { t: 'translate', en: 'When using the device, please read the instructions. (Bei …)', a: ['Bei der Benutzung des Geräts lesen Sie bitte die Anleitung.', 'Bei der Benutzung des Gerätes lesen Sie bitte die Anleitung.', 'Bitte lesen Sie bei der Benutzung des Geräts die Anleitung.'] },
      { t: 'listen', text: 'Nach der Einführung der neuen Maßnahmen kam es zu einer deutlichen Verbesserung.', en: 'After the introduction of the new measures there was a clear improvement.' },
      { t: 'speak', text: 'Zur Einsparung von Energie sollten öffentliche Gebäude nachts nicht beleuchtet werden.' },
    ],
  },
  {
    id: 'b2-5', level: 'B2', icon: '🏃', title: 'Partizipien', sub: 'Participles as adjectives',
    can: 'Understand and build compact participle phrases.',
    grammar: {
      title: 'Partizip I & II als Adjektiv',
      html: `<table class="tbl"><tr><th></th><th>form</th><th>meaning</th><th>example</th></tr>
<tr><td><b>Partizip I</b></td><td>Infinitiv + <b>d</b></td><td>active, happening now</td><td>das <b>weinende</b> Kind (the crying child)</td></tr>
<tr><td><b>Partizip II</b></td><td>ge…t / ge…en</td><td>passive or completed</td><td>das <b>reparierte</b> Auto (the repaired car)</td></tr></table>
<p>They take normal adjective endings: <i>mit <b>kochendem</b> Wasser, die <b>gestohlenen</b> Fahrräder</i>.</p>
<p><b>Extended participle phrases</b> replace relative clauses — everything between article and noun belongs to the noun:</p>
<p class="ex">der Zug, <i>der aus Berlin kommt</i> → der <b>aus Berlin kommende</b> Zug<br/>die Briefe, <i>die gestern geschrieben wurden</i> → die <b>gestern geschriebenen</b> Briefe<br/>die Kosten, <i>die ständig steigen</i> → die <b>ständig steigenden</b> Kosten</p>
<div class="tip"><b>Reading trick:</b> when an article is followed by something that isn't an adjective (<i>die von der Regierung …</i>), jump forward to the noun, then read the phrase in between backwards.</div>
<p><b>Gerundive</b> (zu + Partizip I): <i>die <b>zu lösende</b> Aufgabe</i> = die Aufgabe, die gelöst werden muss.</p>`,
    },
    vocab: [
      { de: 'steigend', en: 'rising' },
      { de: 'zunehmend', en: 'increasing(ly)' },
      { de: 'entscheidend', en: 'decisive, crucial' },
      { de: 'überzeugend', en: 'convincing' },
      { de: 'ausgebildet', en: 'trained, qualified' },
      { de: 'veröffentlicht', en: 'published' },
      { de: 'Studie', en: 'study (research)', g: 'die', pl: 'Studien' },
      { de: 'Ergebnis', en: 'result', g: 'das', pl: 'Ergebnisse' },
      { de: 'Kosten', en: 'costs', pl: 'Kosten' },
      { de: 'Fachkraft', en: 'skilled worker', g: 'die', pl: 'Fachkräfte' },
      { de: 'Mangel', en: 'shortage, lack', g: 'der', pl: 'Mängel' },
    ],
    ex: [
      { t: 'mc', q: 'das Kind, das lacht → das ___ Kind', options: ['gelachte', 'lachende', 'lachte', 'lachend'], a: 1 },
      { t: 'mc', q: 'der Brief, der geschrieben wurde → der ___ Brief', options: ['schreibende', 'geschriebene', 'geschrieben', 'schriebene'], a: 1 },
      { t: 'fill', q: 'Vorsicht, ___ Wasser! (kochen, Partizip I, no article)', a: ['kochendes'] },
      { t: 'fill', q: 'Die ___ Kosten sind ein Problem. (steigen, Partizip I)', a: ['steigenden'] },
      { t: 'mc', q: '"die im letzten Jahr veröffentlichte Studie" =', options: ['the study that will be published next year', 'the study published last year', 'the study that publishes last year', 'the last study of the year'], a: 1 },
      { t: 'mc', q: '"die zu erledigenden Aufgaben" =', options: ['the tasks that have been done', 'the tasks that must be done', 'the tasks that are doing', 'the completed tasks'], a: 1 },
      { t: 'fill', q: 'Wir suchen gut ___ Fachkräfte. (ausbilden, Partizip II)', a: ['ausgebildete'] },
      { t: 'order', en: 'the train arriving from Munich', de: 'der aus München ankommende Zug' },
      { t: 'translate', en: 'the stolen bicycles', a: ['die gestohlenen Fahrräder', 'die gestohlenen Räder'] },
      { t: 'listen', text: 'Der zunehmende Mangel an Fachkräften stellt viele Unternehmen vor große Probleme.', en: 'The increasing shortage of skilled workers poses big problems for many companies.' },
      { t: 'speak', text: 'Die Ergebnisse der kürzlich veröffentlichten Studie sind überzeugend.' },
    ],
  },
  {
    id: 'b2-6', level: 'B2', icon: '🧠', title: 'Argumentieren', sub: 'Advanced connectors',
    can: 'Build clear, connected arguments for essays and discussions.',
    grammar: {
      title: 'Konnektoren für Argumente',
      html: `<table class="tbl"><tr><th>function</th><th>subordinating (verb end)</th><th>adverb (verb next, pos. 1)</th><th>preposition</th></tr>
<tr><td>concession</td><td><b>obwohl</b>, obgleich</td><td><b>trotzdem</b>, dennoch</td><td>trotz (+G)</td></tr>
<tr><td>cause</td><td><b>weil</b>, da</td><td>nämlich (pos. 3+)</td><td>wegen, aufgrund (+G)</td></tr>
<tr><td>consequence</td><td><b>sodass</b>, so … dass</td><td><b>deshalb</b>, daher, folglich</td><td>infolge (+G)</td></tr>
<tr><td>condition</td><td><b>falls</b>, sofern, wenn</td><td>sonst, andernfalls</td><td>bei (+D)</td></tr>
<tr><td>contrast</td><td><b>während</b>, wohingegen</td><td>dagegen, jedoch</td><td>im Gegensatz zu</td></tr>
<tr><td>means</td><td><b>indem</b>, dadurch dass</td><td>dadurch, so</td><td>durch (+A)</td></tr>
<tr><td>proportion</td><td><b>je</b> + comparative + verb end, <b>desto/umso</b> + comparative + verb</td><td></td><td></td></tr></table>
<p class="ex"><b>Je</b> mehr man <b>übt</b>, <b>desto</b> besser <b>spricht</b> man.<br/>Man lernt am schnellsten, <b>indem</b> man jeden Tag <b>spricht</b>.<br/>Er war krank. <b>Trotzdem</b> <b>ging</b> er zur Arbeit.</p>
<div class="tip"><b>Essay skeleton:</b> Einerseits … andererseits … · Ein wichtiges Argument dafür ist, dass … · Dagegen spricht, dass … · Abschließend lässt sich sagen, dass …</div>`,
    },
    vocab: [
      { de: 'obwohl', en: 'although' },
      { de: 'trotzdem', en: 'nevertheless' },
      { de: 'deshalb', en: 'therefore' },
      { de: 'falls', en: 'in case, if' },
      { de: 'indem', en: 'by (doing)' },
      { de: 'sodass', en: 'so that (result)' },
      { de: 'je … desto', en: 'the … the' },
      { de: 'einerseits … andererseits', en: 'on the one hand … on the other' },
      { de: 'Argument', en: 'argument', g: 'das', pl: 'Argumente' },
      { de: 'Standpunkt', en: 'point of view', g: 'der', pl: 'Standpunkte' },
      { de: 'überzeugen', en: 'to convince' },
      { de: 'Schlussfolgerung', en: 'conclusion', g: 'die', pl: 'Schlussfolgerungen' },
    ],
    ex: [
      { t: 'mc', q: 'Es regnete stark. ___ fand das Spiel statt.', options: ['Obwohl', 'Trotzdem', 'Trotz', 'Weil'], a: 1 },
      { t: 'mc', q: '___ es regnete, fand das Spiel statt.', options: ['Obwohl', 'Trotzdem', 'Deshalb', 'Trotz'], a: 0 },
      { t: 'fill', q: 'Je länger ich in Berlin wohne, ___ besser gefällt es mir.', a: ['desto', 'umso'] },
      { t: 'fill', q: 'Man kann Geld sparen, ___ man öfter mit dem Fahrrad fährt.', a: ['indem'] },
      { t: 'mc', q: 'Er hat verschlafen, ___ er den Bus verpasst hat.', options: ['sodass', 'deshalb', 'damit', 'indem'], a: 0 },
      { t: 'mc', q: '___ Sie Fragen haben, rufen Sie mich an.', options: ['Falls', 'Sonst', 'Trotzdem', 'Indem'], a: 0 },
      { t: 'mc', q: 'Mein Bruder liebt Sport, ___ ich lieber lese.', options: ['während', 'trotzdem', 'deshalb', 'sodass'], a: 0 },
      { t: 'order', en: 'The more you read, the bigger your vocabulary becomes.', de: 'Je mehr man liest desto größer wird der Wortschatz' },
      { t: 'translate', en: 'Although he was tired, he kept working.', a: ['Obwohl er müde war, arbeitete er weiter.', 'Obwohl er müde war, hat er weitergearbeitet.'] },
      { t: 'listen', text: 'Einerseits ist Homeoffice bequem, andererseits fehlt vielen der Kontakt zu Kollegen.', en: 'On the one hand home office is comfortable, on the other many miss contact with colleagues.' },
      { t: 'speak', text: 'Ein wichtiges Argument dafür ist, dass man durch Homeoffice viel Zeit spart.' },
    ],
  },
  {
    id: 'b2-7', level: 'B2', icon: '🧷', title: 'Worauf? Darauf!', sub: 'Verbs with prepositions & da-/wo-words',
    can: 'Use the most important verbs with fixed prepositions.',
    grammar: {
      title: 'Verben mit Präpositionen',
      html: `<p>Many verbs need a fixed preposition with a fixed case. Learn them as one unit: <b>warten auf + A</b>.</p>
<table class="tbl"><tr><th>+ Akkusativ</th><th>+ Dativ</th></tr>
<tr><td>warten <b>auf</b>, sich freuen <b>auf</b> (future), sich freuen <b>über</b> (now/past), denken <b>an</b>, sich erinnern <b>an</b>, sich gewöhnen <b>an</b>, sich interessieren <b>für</b>, sich ärgern <b>über</b>, sprechen <b>über</b>, sich kümmern <b>um</b>, sich bewerben <b>um</b>, sich verlassen <b>auf</b></td>
<td>teilnehmen <b>an</b>, träumen <b>von</b>, abhängen <b>von</b>, sich beschäftigen <b>mit</b>, anfangen <b>mit</b>, sich verabreden <b>mit</b>, Angst haben <b>vor</b>, sich fürchten <b>vor</b>, fragen <b>nach</b>, sich erkundigen <b>nach</b>, gehören <b>zu</b>, leiden <b>an/unter</b></td></tr></table>
<p><b>Questions & pronouns:</b></p>
<table class="tbl"><tr><th></th><th>question</th><th>answer</th></tr>
<tr><td>thing</td><td><b>Wo(r)</b> + Präp: <b>Worauf</b> wartest du?</td><td><b>Da(r)</b> + Präp: Ich warte <b>darauf</b>.</td></tr>
<tr><td>person</td><td>Präp + wen/wem: <b>Auf wen</b> wartest du?</td><td>Präp + pronoun: Ich warte <b>auf ihn</b>.</td></tr></table>
<div class="tip">Add <b>-r-</b> before a vowel: wo<b>r</b>an, da<b>r</b>über. Da-words can also announce a clause: <i>Ich freue mich <b>darauf</b>, dich zu sehen. Es hängt <b>davon</b> ab, ob …</i></div>`,
    },
    vocab: [
      { de: 'warten auf', en: 'to wait for (+A)' },
      { de: 'sich gewöhnen an', en: 'to get used to (+A)' },
      { de: 'sich kümmern um', en: 'to take care of (+A)' },
      { de: 'teilnehmen an', en: 'to take part in (+D)' },
      { de: 'abhängen von', en: 'to depend on (+D)' },
      { de: 'sich beschäftigen mit', en: 'to deal with (+D)' },
      { de: 'Angst haben vor', en: 'to be afraid of (+D)' },
      { de: 'sich beschweren über', en: 'to complain about (+A)' },
      { de: 'sich erinnern an', en: 'to remember (+A)' },
      { de: 'überzeugt sein von', en: 'to be convinced of (+D)' },
      { de: 'Voraussetzung', en: 'prerequisite', g: 'die', pl: 'Voraussetzungen' },
    ],
    ex: [
      { t: 'fill', q: 'Ich warte schon seit einer Stunde ___ den Bus.', a: ['auf'] },
      { t: 'fill', q: 'Hast du Angst ___ Hunden?', a: ['vor'] },
      { t: 'fill', q: 'Wer kümmert sich ___ die Kinder?', a: ['um'] },
      { t: 'fill', q: 'Das hängt ___ dem Wetter ab.', a: ['von'] },
      { t: 'fill', q: 'Sie nimmt ___ einem Deutschkurs teil.', a: ['an'] },
      { t: 'mc', q: '___ interessierst du dich? — Für Politik.', options: ['Wofür', 'Für was', 'Wovon', 'Für wen'], a: 0 },
      { t: 'mc', q: 'Erinnerst du dich an den Urlaub? — Ja, ich erinnere mich gern ___.', options: ['an ihn', 'daran', 'woran', 'dafür'], a: 1 },
      { t: 'mc', q: 'Denkst du an deine Mutter? — Ja, ich denke oft ___.', options: ['daran', 'an sie', 'an ihr', 'woran'], a: 1, explain: 'Person → preposition + pronoun.' },
      { t: 'order', en: 'I am looking forward to seeing you.', de: 'Ich freue mich darauf dich zu sehen' },
      { t: 'translate', en: 'I have got used to the weather.', a: ['Ich habe mich an das Wetter gewöhnt.', 'Ich habe mich ans Wetter gewöhnt.'] },
      { t: 'listen', text: 'Ob wir das Projekt fortsetzen, hängt davon ab, wie viel Geld zur Verfügung steht.', en: 'Whether we continue the project depends on how much money is available.' },
      { t: 'speak', text: 'Ich beschäftige mich seit Jahren mit dem Thema Nachhaltigkeit.' },
    ],
  },
  {
    id: 'b2-8', level: 'B2', icon: '🎤', title: 'Diskutieren', sub: 'Redemittel for exams & meetings',
    can: 'Present, agree, disagree, compromise — like in Goethe B2 Sprechen.',
    grammar: {
      title: 'Redemittel: Meinung, Zustimmung, Widerspruch',
      html: `<table class="tbl"><tr><th>function</th><th>phrases</th></tr>
<tr><td>opinion</td><td>Meiner Meinung nach … (verb next!) · Ich bin der Ansicht, dass … · Aus meiner Sicht … · Ich vertrete den Standpunkt, dass …</td></tr>
<tr><td>agree</td><td>Da stimme ich dir zu. · Das sehe ich genauso. · Da hast du völlig recht. · Ein guter Punkt!</td></tr>
<tr><td>partly agree</td><td>Da hast du zwar recht, aber … · Das stimmt teilweise, allerdings … · Im Prinzip ja, aber …</td></tr>
<tr><td>disagree</td><td>Da bin ich anderer Meinung. · Das sehe ich ganz anders. · Da muss ich widersprechen. · Ich bezweifle, dass …</td></tr>
<tr><td>interrupt / react</td><td>Darf ich kurz etwas dazu sagen? · Entschuldige, wenn ich dich unterbreche … · Wie meinst du das genau?</td></tr>
<tr><td>compromise</td><td>Wie wäre es, wenn wir … · Könnten wir uns darauf einigen, dass …? · Ein Kompromiss wäre …</td></tr>
<tr><td>presentation</td><td>Ich möchte heute über … sprechen. · Zunächst … dann … abschließend · Zum Schluss möchte ich … · Vielen Dank für Ihre Aufmerksamkeit.</td></tr></table>
<div class="tip"><b>Goethe B2 Sprechen</b>: Teil 1 — a ~4 min presentation on a topic (with your experience, pros/cons, opinion) + answering a question; Teil 2 — a discussion with a partner where you defend a position. Practise both in the <b>Speak</b> tab.</div>`,
    },
    vocab: [
      { de: 'Ansicht', en: 'view, opinion', g: 'die', pl: 'Ansichten' },
      { de: 'zustimmen', en: 'to agree (+D)' },
      { de: 'widersprechen', en: 'to contradict (+D)' },
      { de: 'bezweifeln', en: 'to doubt' },
      { de: 'sich einigen auf', en: 'to agree on' },
      { de: 'Kompromiss', en: 'compromise', g: 'der', pl: 'Kompromisse' },
      { de: 'Aufmerksamkeit', en: 'attention', g: 'die', pl: '-' },
      { de: 'unterbrechen', en: 'to interrupt' },
      { de: 'zusammenfassen', en: 'to summarise' },
      { de: 'Erfahrung', en: 'experience', g: 'die', pl: 'Erfahrungen' },
      { de: 'überzeugend', en: 'convincing' },
    ],
    ex: [
      { t: 'mc', q: 'Meiner Meinung nach ___ Homeoffice sehr praktisch.', options: ['ist', 'es ist', 'sei ist', 'ist es'], a: 0, explain: '"Meiner Meinung nach" is position 1 → verb next.' },
      { t: 'fill', q: 'Da stimme ich dir völlig ___.', a: ['zu'] },
      { t: 'fill', q: 'Ich bin ___ Ansicht, dass Bildung kostenlos sein sollte.', a: ['der'] },
      { t: 'mc', q: 'Polite way to disagree:', options: ['Das ist falsch.', 'Da bin ich anderer Meinung.', 'Nein!', 'Du hast keine Ahnung.'], a: 1 },
      { t: 'mc', q: 'To suggest a compromise:', options: ['Wie wäre es, wenn wir beides machen?', 'Ich habe recht.', 'Das sehe ich genauso.', 'Vielen Dank für Ihre Aufmerksamkeit.'], a: 0 },
      { t: 'fill', q: 'Könnten wir uns ___ einigen, dass wir morgen weitermachen?', a: ['darauf'] },
      { t: 'match', pairs: [['Das sehe ich genauso.', 'agree'], ['Ich bezweifle, dass …', 'doubt'], ['Wie meinst du das?', 'clarify'], ['Zum Schluss …', 'conclude']] },
      { t: 'translate', en: 'In my opinion, public transport should be free.', a: ['Meiner Meinung nach sollten öffentliche Verkehrsmittel kostenlos sein.', 'Meiner Meinung nach sollte der öffentliche Nahverkehr kostenlos sein.'] },
      { t: 'listen', text: 'Da hast du zwar recht, aber man muss auch an die Kosten denken.', en: 'You are right there, but one also has to think of the costs.' },
      { t: 'speak', text: 'Ich möchte heute über das Thema Social Media sprechen. Zunächst erzähle ich von meinen Erfahrungen.' },
    ],
  },
];
