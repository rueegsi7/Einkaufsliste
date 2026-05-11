# Projektdokumentation - LiveSync Einkaufsliste (Prototyp)

## 1. Ausgangslage
* **Problem:** In Mehrpersonenhaushalten existieren oft Informations-Silos rund um den Einkauf. Transparenz in Echtzeit fehlt, was zu Doppelkäufen oder fehlenden Artikeln führt.
* **Ziele:** Schaffung einer "Single Source of Truth" für Einkäufe mit Status-Transparenz in Echtzeit.
* **Primäre Zielgruppe:** Berufstätige in WGs, Familien und Paare.

## 2. Lösungsidee
* **Kernfunktionalität:** Geteilte Einkaufsliste mit Cloud-Persistenz und Fokus auf mobile Nutzung.
* **Abgrenzung:** Kein Budget-Tracking, keine Rezeptverwaltung.

## 3. Vorgehen & Artefakte

### 3.1 Understand & Define
* **Zielgruppenverständnis:** Nutzer benötigen eine extrem geringe Eingabehürde für die Nutzung im Alltag.
* **Erkenntnisse:** Die Zuweisung von Artikeln zu Läden und eine Echtzeit-Synchronisation ohne Neuladen sind essenziell.

### 3.2 Sketch & 3.3 Decide
* **Design:** Entscheidung für ein minimalistisches Mobile-First Design, um die kognitive Belastung gering zu halten.
* **Mockup:** [Link zum Figma-Prototyp](https://www.figma.com/proto/mgERLZFsczjxcvl9ILYW1d/Untitled?node-id=1-12&t=tyHOn0BkDuBRyG8X-1)

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
* **Informationsarchitektur:** * `/` : Login & Registrierung
    * `/listen` : Übersicht der geteilten Listen
    * `/listen/[id]` : Detailansicht der spezifischen Liste

#### 3.4.2. Umsetzung (Technik)
Der Prototyp wurde als Fullstack-Applikation realisiert.

* **Technologie-Stack:** * **Framework:** SvelteKit (Version 5 mit Runes-Syntax)
    * **Datenbank:** MongoDB Atlas (Cloud-Instanz)
    * **Authentifizierung:** Custom-Lösung mit `bcrypt` zur Passwort-Verschlüsselung und HTTP-only Cookies
* **Implementierte Kern-Features (Mindestumfang):**
    * **User-Management:** Registrierung und Login-Validierung gegen die Cloud-Datenbank.
    * **Daten-Persistenz:** Vollständige CRUD-Funktionalität für Listen und Artikel (Anzeigen, Erstellen, Status-Toggle, Löschen).
    * **Sicherheit:** Server-seitiger Schutz der Routen via Session-Check in den Load-Funktionen.

## 4. Erweiterungen & Roadmap
Folgende Features sind für die finale Version nach dem Coaching geplant:

* **Echtzeit-Synchronisation (LiveSync):** Implementierung von Client-Side Polling zur automatischen Aktualisierung der Listen ohne Seiten-Refresh.
* **Erweitertes UI-Feedback:** Integration von Nutzer-Initialen (Avatar) im Header und ein Logout-Button.
* **Auto-Completion:** Vorschläge für Laden-Zuweisungen basierend auf der Historie.
* **Deployment:** Finales Hosting auf Netlify.

## 5. Projektorganisation
* **Commit-Praxis:** Iteratives Vorgehen nach dem Prinzip "Feature-Planung -> Implementierung -> Test -> Commit".
* **Vorgehensweise:** Kleinschrittige Entwicklung durch Aufteilen komplexer Aufgaben in testbare Teilschritte.

## 6. KI-Deklaration
* **Tools:** GitHub Copilot (Agent & Chat).
* **Einsatz:** Unterstützung bei Architekturplanung, Generierung von Boilerplate-Code für Datenbank-Abfragen und SvelteKit Form Actions.
* **Eigene Leistung:** Konzeption der Datenstruktur, Design-Entwürfe, manuelle Fehlerbehebung bei Versions-Konflikten und Konfiguration der Cloud-Infrastruktur.