# Projektdokumentation - LiveSync Einkaufsliste

## Inhaltsverzeichnis
1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

---

## 1. Ausgangslage
* **Problem:** In Mehrpersonenhaushalten wie WGs oder Familien existieren oft Informations-Silos. Listen werden analog oder unstrukturiert (z.B. WhatsApp) geführt, was zu Doppelkäufen oder fehlenden Artikeln führt. Es fehlt an Echtzeit-Transparenz während des Einkaufs.
* **Ziele:** Schaffung einer „Single Source of Truth“ für Einkäufe. Das System soll Status-Transparenz in Echtzeit bieten und Wocheneinkäufe ohne zusätzliche Kommunikationsschleifen ermöglichen.
* **Primäre Zielgruppe:** Berufstätige in WGs, Familien und Paare, die ihren Haushalt effizient führen wollen.
* **Weitere Stakeholder:** Haushaltsmitglieder, die spontan Ergänzungen vornehmen möchten.

## 2. Lösungsidee
* **Kernfunktionalität:** Eine geteilte Einkaufslisten-App mit Live-Synchronisation. Artikel werden spezifischen Läden zugewiesen und ein „Einkaufsmodus“ signalisiert anderen Mitgliedern aktive Einkäufe.
* **Annahmen:** Die Eingabehürde muss extrem gering sein, damit die App im stressigen Alltag genutzt wird.
* **Abgrenzung:** Die App fokussiert sich rein auf den kollaborativen Einkaufsprozess; Rezeptverwaltung oder Budget-Tracking gehören nicht zum Umfang.

## 3. Vorgehen & Artefakte

### 3.1 Understand & Define
* **Zielgruppenverständnis:** Nutzer haben wenig Zeit und eine geringe Aufmerksamkeitsspanne beim Einkaufen.
* **Wesentliche Erkenntnisse:** Die Zuweisung zu Läden ist essenziell, ebenso wie ein „Wagen-Prinzip“-Status, um Doppelkäufe zu vermeiden. Änderungen müssen ohne Neuladen (Echtzeit) sichtbar werden.

### 3.2 Sketch
* **Variantenüberblick:** Vergleich zwischen Mobile-First Applikation und Desktop-Dashboard.
* **Skizzen:** Fokus auf mobile Ansicht mit minimalistischem UI im Vergleich zu detailreichen Listen.

### 3.3 Decide
* **Gewählte Variante & Begründung:** Entscheidung für das minimalistische Mobile-Design. Farbige Akzente werden nur als direktes Feedback eingesetzt (z.B. Grünfärbung im Wagen), um die kognitive Belastung gering zu halten.
* **End-to-End-Ablauf:** Registrierung -> Listenübersicht -> Artikelauswahl & Laden-Zuweisung -> Einkaufsmodus -> Artikel abhaken.
* **Mockup:** Erstellt in Figma. [Link zum Figma-Prototyp](https://www.figma.com/proto/mgERLZFsczjxcvl9ILYW1d/Untitled?node-id=1-12&t=tyHOn0BkDuBRyG8X-1).

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
* **Informationsarchitektur:** Globale Navigationsleiste (User-Status), Listenübersicht (Startseite) und Detailansicht mit Einkaufsmodus.
* **User Interface Design:** Mobile Ansicht mit klarer, textbasierter Darstellung. Graue Buttons signalisieren Blockierungen durch andere Nutzer, ein Stern-Icon markiert live hinzugefügte Artikel.
* **Designentscheidungen:** Wischgesten für Einhandbedienung und Autovervollständigung für Ladennamen.

#### 3.4.2. Umsetzung (Technik)
* **Technologie-Stack:** SvelteKit 5 (Frontend/Framework) mit Runes-Syntax.
* **Tooling:** Visual Studio Code, GitHub Copilot, Gemini Pro.
* **Struktur & Komponenten:** Modularer Aufbau mit Routen für Authentifizierung (`/auth`), Listenübersicht (`/listen`) und Detailseiten (`/listen/[id]`).
* **Daten & Schnittstellen:** MongoDB Atlas (NoSQL) zur persistenten Speicherung von Usern, Listen und Artikeln.
* **Besondere Entscheidungen:** Verwendung von `bcrypt` für Password-Hashing und HTTP-only Cookies für das Session-Management.

#### 3.4.3. Iterative Improvements (Post-Usability-Test)
Nach dem ersten Usability-Test wurden umfassende Änderungen vorgenommen, um die identifizierten Probleme zu beheben und die Nutzererfahrung zu verbessern:

* **Authentifizierung & UI:**
    * Die E-Mail-Bestätigung bei der Registrierung wurde entfernt, um den Prozess zu vereinfachen.
    * Login und Registrierung wurden auf separate Seiten aufgeteilt.
    * Die Navigation wurde überarbeitet: Sie zeigt nun den eingeloggten Nutzer mit Initialen und einem Avatar an.
    * Das "LiveSync"-Branding wurde entfernt.
* **Listenansicht & Kollaboration:**
    * **Listenverwaltung:** Nutzer können Listen nun umbenennen und löschen.
    * **Nutzer einladen:** Eine Funktion zum Einladen anderer Nutzer per E-Mail wurde hinzugefügt.
    * **Kollaborations-Anzeige:** Avatare (Initialen) der Mitglieder werden auf jeder Liste angezeigt.
    * **Einkaufs-Status:** Ein Live-Status zeigt an, wenn ein Nutzer gerade aktiv einkauft.
* **Detailansicht & Einkaufsmodus:**
    * Die Detailansicht zeigt nur noch Artikel an, die noch nicht gekauft wurden.
    * Das Dropdown für die Ladenauswahl füllt sich automatisch mit bereits verwendeten Läden.
    * Auf der Einkaufsseite werden Artikel im Warenkorb grün markiert, um die Übersichtlichkeit zu verbessern.
* **Technische Anpassungen:**
    * Umstellung auf Svelte 5 Runes (`$state`, `$derived`) für reaktive Variablen.
    * Behebung diverser Kompatibilitätsprobleme mit der neuen Svelte-Version.

### 3.5 Validate

#### 3.5.1 Meta-Informationen & Methodik
* **URL der getesteten Version:** Aktuell lokal gehostet (localhost:5173) sowie als Prototyp unter [Netlify Link](https://6a01d603edc8da221236cd7a--livesynceinkaufsliste.netlify.app/).
* **Ziele der Prüfung:** Verstehen Nutzer den Einkaufsmodus? Ist das Hinzufügen intuitiv? Evaluation der Kernfunktionen, Navigation und Alltagstauglichkeit.
* **Test-Setup:** Durchgeführt am 20.05.2026 (Moderator: Silvan Rüegg). Getestet auf PC/Notebook/Smartphone mittels digital präsentierten Touchgesten.
* **Aufgaben:**
1. Registrieren mit E-Mail-Adresse.
  2. Neue Einkaufsliste erstellen.
  3. Produkt erfassen und als "Eingekauft" markieren.

#### 3.5.2 Wichtigste Erkenntnisse & Next Steps
Der Mindestumfang (Datenpersistenz und Authentifizierung) ist stabil implementiert. Aus den Usability-Tests ergaben sich jedoch folgende primäre Usability-Probleme und Feature-Wünsche, die in der anschliessenden Iteration adressiert wurden:

1. **Top 3 Usability-Probleme:**
   * **Registrierungsprozess fehlerhaft/unklar:** Es fehlt eine Systemmeldung, dass eine E-Mail verschickt wird. Bestätigungs-E-Mails kommen teilweise nicht an, und fehlerhafte Eingaben erzeugen keine Warnung.
   * **Unklarheiten beim Abhaken/Einkaufswagen:** Das Konzept des Status (eingekauft oder nicht) ist verwirrend. Man sieht nicht klar, was bereits gekauft wurde.
   * **Auffindbarkeit der Registrierung:** Der Startpunkt für neue Nutzer ist nicht intuitiv platziert.
2. **Next Steps (erledigt):**
   * **Benachrichtigungen/Feedback-Meldungen:** Klare Statusmeldungen bei Login und Registrierung wurden implementiert.
   * **Einkaufsmodus:** Der "Einkaufswagen" wurde in eine separate Seite ausgelagert, um die Übersichtlichkeit zu erhöhen.
   * **Vereinfachte Registrierung:** Der Prozess wurde durch die Entfernung der E-Mail-Verifizierung vereinfacht.
   * **Kollaborative Funktionen:** Hinzufügen von Mitgliedern, Löschen und Umbenennen von Listen wurde umgesetzt.
   * **Fehlende Wunsch-Features:** Mengenangaben und ein Einkaufsverlauf sind noch offen.

| **ID** | **Bereich** | **Problembeschreibung** | **Schweregrad** | **Lösungsansatz / Next Step** |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Registrierung | **Technischer Fehler:** Es wird keine Bestätigungs-E-Mail verschickt. Anmeldung schlägt fehl. | Kritisch | Backend-Logik für den E-Mail-Versand prüfen und fixen. |
| **02** | Registrierung | **Fehlendes Feedback:** Es erscheint keine Systemmeldung, dass der Nutzer sein Postfach prüfen soll. | Hoch | Eindeutige Success-Message nach Klick auf "Registrieren" einbauen. |
| **03** | Registrierung | **Unklarer Einstieg:** Die Funktion, um sich neu zu registrieren, wird nicht sofort gefunden. | Mittel | Platzierung und visuelle Gewichtung des Links überarbeiten. |
| **04** | Registrierung | **Fehlende Validierung:** Eine falsch formatierte E-Mail-Adresse löst keine Warnung aus. | Mittel | Live-Validierung des Eingabefelds hinzufügen. |
| **05** | Einkaufsliste | **Konzeptionelle Unklarheit:** Das Konzept des "Abhakens" (Einkaufswagen-Icon) wird nicht verstanden. | Hoch | Visuelles Feedback anpassen (z.B. durchstreichen, ausgrauen oder separater Bereich). |
| **06** | Übersicht | **Fehlende Informationen:** In der allgemeinen Listenübersicht fehlt die Anzahl der offenen Artikel. | Mittel | Anzahl der noch nicht gekauften Artikel auf der Übersichtskarte anzeigen. |
| **07** | Feature | **Mengen & Links:** Es fehlen Möglichkeiten, genaue Mengen anzugeben oder Links für Onlinekäufe zu hinterlegen. | Niedrig | Datenmodell für Artikel erweitern. |
| **08** | Feature | **Läden vorgeben:** Nutzer wünschen sich eine Möglichkeit, Artikel bestimmten Läden zuzuordnen. | Niedrig | Kategorie- oder Tagging-System implementieren. |
| **09** | Feature | **Einkaufsverlauf:** Es gibt keine Historie über vergangene Einkäufe. | Niedrig | Eigenen Reiter "Verlauf" oder "Kürzlich gekauft" einführen. |

## 4. Erweiterungen [Optional]
* **Beschreibung & Nutzen:** * **Live-Synchronisation:** Implementierung von Client-Side Polling (alle 3-5 Sek.), um Änderungen anderer Nutzer ohne Seiten-Refresh anzuzeigen.
    * **UI-Feinschliff:** Integration von Nutzer-Initialen (Avatar) im Header und ein dedizierter Logout-Button zur Verbesserung der UX.
    * **Deployment:** Hosting auf Netlify zur öffentlichen Erreichbarkeit.
* **Referenz:** Entspricht den Zielen der Echtzeit-Transparenz aus der Ideenfindung.

## 5. Projektorganisation [Optional]
* **Repository & Struktur:** Verwaltung über Git; Trennung von Frontend-Logik (`+page.svelte`) und Server-Logik (`+page.server.js`).
* **Issue-Management:** Tasks wurden iterativ abgearbeitet.
* **Commit-Praxis:** Regelmässige Commits, mindestens nach jeder neu implementierten Funktion. Wenn etwas mit KI generiert wurde erhält die commit message "agent:" als präfix. Sonst wird unterschieden zwischen "doc:", "feat:" und "chore:".

## 6. KI-Deklaration

### 6.1 KI-Tools
* **Eingesetzte Tools:** Gemini Pro (Google), GitHub Copilot.
* **Zweck & Umfang:**
    * **Gemini Pro:** Wurde intensiv für die strategische Architekturplanung, die Konzeption der NoSQL-Datenstruktur in MongoDB sowie für das Debugging komplexer Svelte-5-Runes-Fehler genutzt. Zudem half Gemini Pro bei der Strukturierung und Ausformulierung der vorliegenden Dokumentation.
    * **GitHub Copilot:** Einsatz als Coding-Assistent für die schnelle Generierung von Boilerplate-Code, Svelte-Komponenten und Form Actions.
* **Eigene Leistung (Abgrenzung):** Die Projektidee, das visuelle Konzept (Figma), die Anforderungsdefinition sowie die finale Entscheidung über die Code-Struktur liegen vollständig in eigener Verantwortung.

### 6.2 Prompt-Vorgehen
* **Methode:** Iteratives Vorgehen im „Plan-Modus“. Aufgaben wurden in atomare Teilschritte zerlegt (z.B. „Erstelle erst die DB-Verbindung“, „Baue dann die Register-Action“). Prompts wurden präzise formuliert, um Versionskonflikte zwischen Svelte 4 und 5 zu vermeiden.

### 6.3 Reflexion
* **Erkenntnisse:** KI beschleunigte den Aufbau der Datenbank-Infrastruktur erheblich. Herausfordernd war die korrekte Umsetzung der Svelte-5-Syntax, da KI-Modelle hier oft veraltete Patterns vorschlugen, die manuell korrigiert werden mussten.

## 7. Anhang [Optional]
* **Figma Mockup:** [Link zum Design](https://www.figma.com/proto/mgERLZFsczjxcvl9ILYW1d/Untitled?node-id=1-12&t=tyHOn0BkDuBRyG8X-1)
* **Technischer Hinweis:** Erfordert eine `.env`-Datei mit `MONGODB_URI` für den lokalen Betrieb.

### 7.1 Usability-Testprotokolle im Detail

#### Testprotokoll 1

**Beobachtungs- & Protokollmatrix:**
| **Aufgabe / Szenario** | **Erfolgreich?** | **Beobachtete Probleme / Stolpersteine / Zitate** |
| :--- | :--- | :--- |
| **Aufgabe 1:** Registrierung | Nein (Nur mit Hilfe) | E-Mail falsch eingegeben (keine Warnung). Merkt selbst, dass er Mails kontrollieren muss, aber es gab keine Benachrichtigung in der App. Kein Mail erhalten. Versucht Login trotzdem. Anmeldung schlägt fehl. |
| **Aufgabe 2:** Liste erstellen | Ja | Funktioniert ohne Probleme. |
| **Aufgabe 3:** Produkt erfassen / abhaken | Ja | Funktioniert ohne Probleme. *Anmerkung der Testperson:* "Ich sehe, was im Warenkorb ist, aber nicht, was gekauft wurde." |

**Qualitative Nachbefragung:**
1. **Gesamteindruck:** Die Registrierung klappt noch nicht so gut (hat kein Mail erhalten). Die Idee, Läden vorzugeben, fände er gut.
2. **Verständnis:** Der "Einkaufswagen" ist verwirrend im Hinblick darauf, ob etwas eingekauft ist oder nicht.
3. **Erwartungskonformität:** Ja, das System verhält sich größtenteils wie erwartet (man kann eine Liste abhaken).
4. **Fehlende Funktionen:** Vorgegebene Läden. Artikel werden in der Übersicht nicht angezeigt.

**Quantitative Bewertung (Skala 1 - 5):**
*(1 = Trifft überhaupt nicht zu / 5 = Trifft vollkommen zu)*
* Das System war einfach zu bedienen: **[ 3 ]**
* Ich habe mich im Prototyp jederzeit gut zurechtgefunden (Orientierung): **[ 2 ]**
* Ich würde diese Anwendung im Alltag nutzen, wenn sie vollständig entwickelt ist: **[ 4 ]**

---

#### Testprotokoll 2

**Beobachtungs- & Protokollmatrix:**
| **Aufgabe / Szenario** | **Erfolgreich?** | **Beobachtete Probleme / Stolpersteine / Zitate** |
| :--- | :--- | :--- |
| **Aufgabe 1:** Registrierung | Nein (Nur mit Hilfe) | Registrierung zuerst nicht gefunden. Nur mit Hilfe herausgefunden, dass eine E-Mail zur Bestätigung kommen soll. Das Mail kommt letztendlich nicht an. |
| **Aufgabe 2:** Liste erstellen | Ja | Neue Liste ohne Probleme erstellt. |
| **Aufgabe 3:** Produkt erfassen / abhaken | Ja | Ohne Probleme gelöst. |

**Qualitative Nachbefragung:**
1. **Gesamteindruck:** Generell gut. Die Einkaufsliste und die Übersicht sind gut. Bei der Registrierung fehlt jedoch zwingend die Meldung, dass eine E-Mail verschickt wird.
2. **Verständnis:** Das Abhaken auf der Einkaufsliste ist unklar.
3. **Erwartungskonformität:** Die Erwartungen wurden bei der Registrierung nicht erfüllt, da diese nicht funktioniert hat.
4. **Fehlende Funktionen:** Mengenangaben (evtl. mit Link für Onlinekäufe) und ein Verlauf der Einkäufe (mit Funktion für erneut zur Liste hinzufügen).

**Quantitative Bewertung (Skala 1 - 5):**
*(1 = Trifft überhaupt nicht zu / 5 = Trifft vollkommen zu)*
* Das System war einfach zu bedienen: **[ 5 ]**
* Ich habe mich im Prototyp jederzeit gut zurechtgefunden (Orientierung): **[ 5 ]**
* Ich würde diese Anwendung im Alltag nutzen, wenn sie vollständig entwickelt ist: **[ 5 ]**