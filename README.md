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

### 3.5 Validate
* **URL der getesteten Version:** Aktuell lokal gehostet (localhost:5173).
* **Ziele der Prüfung:** Verstehen Nutzer den Einkaufsmodus? Ist das Hinzufügen intuitiv?
* **Vorgehen:** Funktionaler Test der Kern-Features (Registrierung, Login, CRUD-Operationen).
* **Resultate:** Der Mindestumfang (Datenpersistenz und Authentifizierung) ist stabil implementiert.

## 4. Erweiterungen [Optional]
* **Beschreibung & Nutzen:** * **Live-Synchronisation:** Implementierung von Client-Side Polling (alle 3-5 Sek.), um Änderungen anderer Nutzer ohne Seiten-Refresh anzuzeigen.
    * **UI-Feinschliff:** Integration von Nutzer-Initialen (Avatar) im Header und ein dedizierter Logout-Button zur Verbesserung der UX.
    * **Deployment:** Hosting auf Netlify zur öffentlichen Erreichbarkeit.
* **Referenz:** Entspricht den Zielen der Echtzeit-Transparenz aus der Ideenfindung.

## 5. Projektorganisation [Optional]
* **Repository & Struktur:** Verwaltung über Git; Trennung von Frontend-Logik (`+page.svelte`) und Server-Logik (`+page.server.js`).
* **Issue-Management:** Tasks wurden iterativ abgearbeitet.
* **Commit-Praxis:** Regelmässige Commits mit Titeln wie `feat: auth implementation` oder `feat: mongodb connection`.

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