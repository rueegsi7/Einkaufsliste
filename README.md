# Projektdokumentation - LiveSync Einkaufsliste (Prototyp)

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

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

---

## 1. Ausgangslage
- **Problem:** In Mehrpersonenhaushalten (wie WGs oder Familien) existieren oft Informations-Silos rund um den Einkauf. Listen werden analog oder unstrukturiert (z.B. WhatsApp) geführt, was zu Doppelkäufen oder fehlenden Artikeln führt. Zudem fehlt die Transparenz in Echtzeit: Wenn jemand im Laden steht, weiss die andere Person nicht, dass sie jetzt noch spontan Dinge ergänzen könnte. Das Problem betrifft nicht nur Lebensmittel, sondern erstreckt sich über verschiedene Geschäftstypen (Drogerie, Baumarkt etc.).
- **Ziele:** Schaffung einer "Single Source of Truth" für Einkäufe. Das System soll Status-Transparenz in Echtzeit bieten und Wocheneinkäufe ohne zusätzliche Kommunikationsschleifen ermöglichen.
- **Primäre Zielgruppe:** Berufstätige in WGs, Familien und Paare, die ihren Haushalt effizient und mit geringem Abstimmungsaufwand führen wollen.
- **Weitere Stakeholder:** (Keine spezifischen externen Stakeholder; Fokus liegt voll auf den Haushaltsmitgliedern).

## 2. Lösungsidee
- **Kernfunktionalität:** Eine geteilte Einkaufslisten-App mit Live-Synchronisation. Zu den Hauptfunktionen zählen das Erstellen gemeinsamer Listen, das Zuweisen von Artikeln zu spezifischen Läden und ein "Einkaufsmodus". Sobald jemand einkauft, wird dies den anderen signalisiert. Abgehakte Artikel wandern in einen virtuellen Einkaufswagen, und spontane Hinzufügungen während des Einkaufs werden live markiert (z.B. mit einem Stern).
- **Annahmen:** Wir gehen davon aus, dass die Eingabehürde extrem gering sein muss, damit die App im Alltag (z.B. kurz vor dem Kühlschrank oder gestresst im Supermarkt) genutzt wird. Niemand möchte manuelle Status-Updates ("Ich bin jetzt einkaufen") tippen.
- **Abgrenzung:** Die App fokussiert sich rein auf den kollaborativen Einkaufsprozess. Features wie Rezeptverwaltung, Budget-Tracking oder Bezahlfunktionen gehören explizit nicht zum Umfang.

## 3. Vorgehen & Artefakte

### 3.1 Understand & Define
- **Zielgruppenverständnis:** Nutzer haben wenig Zeit und oft eine geringe Aufmerksamkeitsspanne beim Einkaufen. Konkurrenzprodukte (wie Bring! oder Apple Notes) haben Schwächen bei der nahtlosen Integration von Non-Food-Artikeln und bieten keinen aktiven "Live-Shopping-Status".
- **Wesentliche Erkenntnisse:** - Die Zuweisung von Artikeln zu bestimmten Läden ist essenziell.
  - Es braucht einen "Wagen-Prinzip"-Status, um zu zeigen, was bereits physisch gesichert ist, um Doppelkäufe zu vermeiden.
  - Änderungen müssen ohne Neuladen der App (Echtzeit-Koordination) sichtbar werden.

### 3.2 Sketch
- **Variantenüberblick:** Mobile-First Applikation vs. Desktop-Dashboard.
- **Skizzen:** Fokus lag auf der Ausarbeitung einer mobilen Ansicht mit extrem minimalistischem UI im Vergleich zu detailreichen, grafiklastigen Listen. 

### 3.3 Decide
- **Gewählte Variante & Begründung:** Entscheidung für das minimalistische Mobile-Design. Farbige Akzente und Animationen werden nur als direktes Feedback eingesetzt (z.B. Grünfärbung bei Artikeln im Einkaufswagen). Dies hält die kognitive Belastung gering und fördert die Funktionalität.
- **End-to-End-Ablauf:** Registrierung/Login -> Übersicht der geteilten Listen -> Auswahl einer Liste -> Artikel hinzufügen und Geschäft (via Auto-Completion) zuweisen -> "Einkaufsmodus" starten -> Artikel per Wischgeste abhaken -> Einkauf abschliessen.
- **Mockup:** Erstellt in Figma. URL: [Hier klicken für den Figma-Prototyp](https://www.figma.com/proto/mgERLZFsczjxcvl9ILYW1d/Untitled?node-id=1-12&t=tyHOn0BkDuBRyG8X-1)

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
- **Informationsarchitektur:** - Globale Navigationsleiste (User-Status / Login)
  - Listenübersicht (Startseite nach Login)
  - Detailansicht der Liste (Zentrum der App) mit Eingabebereich und Shopping-Modus.
- **User Interface Design:** Mobile Ansicht. Klare, textbasierte Darstellung von Artikeln. Graue/Deaktivierte Buttons signalisieren, wenn eine andere Person den Einkaufsmodus blockiert. Ein Stern-Icon hebt live hinzugefügte Artikel hervor.
- **Designentscheidungen:** Wischgesten (Rechts = Abhaken, Links = Löschen) für intuitive Einhandbedienung im Laden. Autovervollständigung für Ladennamen verhindert Tippfehler und Wildwuchs an Kategorien.

#### 3.4.2. Umsetzung (Technik)
- **Technologie-Stack:** SvelteKit (Frontend/Framework).
- **Tooling:** Visual Studio Code, GitHub Copilot.
- **Struktur & Komponenten:** _[Wird während der Entwicklung ergänzt, z.B. Listen-Komponente, Formular-Komponente, Header]_
- **Daten & Schnittstellen:** MongoDB zur Speicherung von Usern, Listen und Artikeln. _[Ggf. Ergänzung zu WebSockets oder Polling für die Live-Synchronisierung]_
- **Deployment:** _https://context.reverso.net/translation/german-english/folgt_  
- **Besondere Entscheidungen:** _[Wird während der Entwicklung ergänzt]_

### 3.5 Validate
> **Hinweis:** Dieser Abschnitt wird nach dem Usability-Test ausgefüllt.
- **URL der getesteten Version:** _https://context.reverso.net/translation/german-english/folgt_
- **Ziele der Prüfung:** _[z.B. Verstehen Nutzer den Einkaufsmodus? Ist das Hinzufügen von Artikeln intuitiv?]_
- **Vorgehen:** _[z.B. unmoderiert, remote]_
- **Stichprobe:** _[z.B. 3 Personen aus WG-Haushalten]_
- **Aufgaben/Szenarien:** _[z.B. "Füge 3 Artikel für den Coop hinzu", "Simuliere den Einkauf der Artikel"]_
- **Kennzahlen & Beobachtungen:** _[Wird ergänzt]_
- **Zusammenfassung der Resultate:** _[Wird ergänzt]_
- **Abgeleitete Verbesserungen:** _[Wird ergänzt]_

## 4. Erweiterungen [Optional]
> **Hinweis:** Da die App über den Basisumfang (einfache CRUD-Liste) hinausgeht, sind hier die geplanten Spezial-Features dokumentiert.

### 4.1 Echtzeit-Synchronisation & "Einkaufsmodus"
- **Beschreibung & Nutzen:** Sobald ein User einkauft, wird die Liste für andere gesperrt/als aktiv markiert. Fügt jemand zuhause etwas hinzu, taucht es beim Einkäufer sofort auf (mit Stern markiert). Verhindert Kommunikationslücken.
- **Wo umgesetzt:** _[Wird im Verlauf des Codings ergänzt, z.B. Frontend-Store, Backend-WebSockets]_
- **Referenz:** Mockup, Konzept (Ideenfindung HMW 1).
- **Aus Evaluation abgeleitet?:** Nein, basierend auf initialer Problemraumanalyse.

### 4.2 Auto-Completion für Geschäftszuweisung
- **Beschreibung & Nutzen:** Beim Hinzufügen von Artikeln schlägt das System gespeicherte Läden vor. Dies verhindert Duplikate (z.B. "Coop" vs. "koop") und beschleunigt die Eingabe.
- **Wo umgesetzt:** Frontend-Input-Feld und Backend-Query.
- **Referenz:** Mockup (Abschnitt Listen bearbeiten).
- **Aus Evaluation abgeleitet?:** Nein.

## 5. Projektorganisation [Optional]
- **Repository & Struktur:** _[GitHub Repo URL einfügen]_  
- **Issue-Management:** Nachverfolgung der Tasks via GitHub Issues / Kanban-Board.
- **Commit-Praxis:** Regelmässige Commits mit deskriptiven Titeln (z.B. `feat: einkaufsmodus ui hinzugefügt`).

## 6. KI-Deklaration

### 6.1 KI-Tools
- **Eingesetzte Tools**: GitHub Copilot, _[andere Tools wie ChatGPT/Claude ergänzen, falls genutzt]_
- **Zweck & Umfang**: Copilot wurde genutzt für Code-Generierung, Refactoring, und als Chat-Agent zur Architekturplanung in SvelteKit. KI diente zur Überarbeitung der Dokumentationstexte.
- **Eigene Leistung (Abgrenzung):** Die Grundidee, das Design (Mockup in Figma), die Anforderungsdefinition sowie die Logik des Workflows wurden vollständig eigenständig erarbeitet. KI agierte lediglich als ausführender "Co-Pilot" bei der Programmierung und Textformatierung.

### 6.2 Prompt-Vorgehen
Der KI-Agent in VS Code wurde primär iterativ und mit dem "Plan"-Modus eingesetzt. Komplexe Aufgaben (wie z.B. die Datenbankanbindung) wurden in kleine Teilschritte zerlegt, einzeln angefragt und manuell überprüft, bevor der nächste Schritt gestartet wurde.

### 6.3 Reflexion
KI half massiv bei der Überwindung der Einstiegshürden (Boilerplate-Code) in SvelteKit. Herausfordernd war teils der Erhalt des Überblicks bei komplexen Datenströmen (Live-Synchronisation); hier war manuelles Debugging unerlässlich.

## 7. Anhang [Optional]
- **Figma Mockup:** [Link zum Design](https://www.figma.com/proto/mgERLZFsczjxcvl9ILYW1d/Untitled?node-id=1-12&t=tyHOn0BkDuBRyG8X-1)