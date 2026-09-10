// Explicit German-headword decisions, applied only to the broad daily topic.
// Run once after reviewing changes; importing remains reproducible from assignments.
const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '../data/import/assignments.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const groups = {
  communication: 'erklären bestätigen schicken mitteilen berichten antworten fragen erzählen diskutieren behaupten erwähnen beschreiben versprechen bitten danken begrüßen verabschieden Kommentar Aussage Mail Hinweis Tipp Adresse Forum Blog Medium Media Kritik Thema Titel',
  education: 'wissen erkennen entdecken entscheiden wählen lösen verstehen lernen lehren üben prüfen vergleichen zählen Buch Beispiel Idee Vergleich Entscheidung Ahnung Erfahrung Wahrheit Liste Fakt Kategorie Übersicht Abschnitt',
  travel: 'gehen kommen bringen holen verlassen erreichen folgen fallen ziehen treten bewegen laufen reisen fahren fliegen Richtung Meter Kilometer Km Osten Westen West Nord Ost Abstand Brücke Fahrzeug Schritt Bewegung',
  house: 'legen stellen hängen stecken öffnen schließen aufräumen putzen reinigen waschen Fenster Ordnung Glas Ecke Material',
  feelings: 'gefallen interessieren erwarten hoffen fürchten lieben hassen fühlen träumen Interesse Eindruck Vorstellung Reaktion Schuld Streit',
  health: 'verletzen leiden heilen atmen sterben leben Operation Praxis Temperatur Kraft',
  work: 'gründen leisten unterstützen fördern durchführen eröffnen leiten verwalten organisieren planen einstellen kündigen Wirtschaft Leiter Führung Bedarf Antrag Förderung Experte Besitzer Fischer',
  shopping: 'besitzen kaufen verkaufen bezahlen bestellen kosten liefern Preis Ausgabe Angebot Rechnung Zahlung',
  culture: 'feiern spielen gewinnen verlieren trainieren Mannschaft Meister Party Publikum Training Geschichte Serie Runde',
  people: 'helfen gehören treffen heiraten Dame Oma Amerikaner Unterstützung Hilfe',
  city: 'Gemeinde Park Zugang Gesellschaft Frieden Gewalt Strafe',
  nature: 'Feuer Schatten Schwanz Gas',
  technology: 'funktionieren aufnehmen Strom Sendung Anzeige',
  time: 'beginnen anfangen starten enden aufhören warten Ende Anfang Beginn Schluss Start Pause Phase Prozent Menge Hälfte Cm Kg Länge Höhe Gewicht Einheit',
};
const mapping = new Map(Object.entries(groups).flatMap(([topic, words]) => words.split(' ').map(word => [word, topic])));
let count = 0;
for (const entry of data.entries) {
  if (entry.topic !== 'daily' || !['noun','verb'].includes(entry.pos) || !mapping.has(entry.word)) continue;
  entry.topic = mapping.get(entry.word);
  entry.topicMethod = 'editorial';
  count++;
}
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log(`Refined ${count} everyday noun/verb assignments; IDs and sentence topics unchanged.`);
