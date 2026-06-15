# 🎈 Balance Flow — MFT Challenge Disc 2.0

Eine motivierende, therapiegerechte Web-App für das Bluetooth-Balance-Board
**MFT Challenge Disc 2.0**. Sie verbindet sich per Web Bluetooth (BLE) mit der Disc,
lenkt einen sanft gleitenden Heißluftballon und zeichnet therapeutisch relevante
Kennzahlen auf.

Die gesamte App ist eine einzige, eigenständige Datei: **`index.html`**
(kein Build, kein Server nötig).

---

## Funktionen

- **GATT-Explorer & Kalibrierung** — scannt automatisch alle BLE-Services, zeigt die
  Raw-Bytes (Hex/Dezimal) live an und erkennt so die Datenquelle, auch wenn die UUIDs
  unbekannt sind. UUID-Konstanten stehen oben im Code unter `CONFIG`.
- **Vier Übungsmodi** — Freies Spiel, Statische Balance, Gewichtsverlagerung (ROM-adaptiv),
  Dual-Task (Sammeln + Kopfrechnen).
- **Live-Auswertung** — Asymmetrie Links/Rechts & Vorne/Hinten, Bewegungsumfang (ROM)
  pro Richtung, Stabilitätsindex.
- **Sitzungsberichte** — Verlaufskurven, CSV-Export und druckbarer PDF-Bericht.
- **Therapie-Sicherheit** — geführte Start-Kalibrierung (3-2-1) und Beruhigungs-Hilfe
  bei hektischen Bewegungen.
- **Demo-Modus** — ohne Hardware testbar (Maus/Finger oder Pfeiltasten).

> **Browser-Hinweis:** Web Bluetooth läuft auf Android in **Chrome** und auf dem
> iPad/iPhone im **Bluefy**-Browser (Safari unterstützt Web Bluetooth nicht).
> Der Demo-Modus funktioniert in jedem Browser.

---

## Online stellen mit GitHub Pages

Du brauchst nur ein kostenloses GitHub-Konto. Zwei Wege:

### Weg A — komplett im Browser (kein Programm nötig)

1. Auf <https://github.com> einloggen → oben rechts **„+" → „New repository"**.
2. Repository-Name z. B. `balance-flow` → **Public** wählen → **Create repository**.
3. Auf der nächsten Seite **„uploading an existing file"** anklicken.
4. Die Dateien aus diesem Ordner per Drag & Drop hineinziehen:
   `index.html`, `README.md` und `.nojekyll`
   (falls `.nojekyll` im Datei-Dialog nicht sichtbar ist, ist das kein Problem —
   sie ist optional).
5. Unten **„Commit changes"** klicken.
6. Im Repository oben auf **„Settings" → „Pages"**.
7. Unter **„Branch"** `main` und Ordner `/ (root)` wählen → **Save**.
8. Nach ein bis zwei Minuten erscheint oben die öffentliche Adresse:
   `https://farndt691-crypto.github.io/balance-flow/`

Diese URL kannst du direkt auf dem iPad (Bluefy) oder Android (Chrome) öffnen.

### Weg B — mit Git (für Fortgeschrittene)

```bash
cd Pfad/zu/diesem/Ordner
git init
git add .
git commit -m "Balance Flow App"
git branch -M main
git remote add origin https://github.com/farndt691-crypto/balance-flow.git
git push -u origin main
```

Danach in **Settings → Pages** den `main`-Branch / Root als Quelle wählen (Schritt 6–8 oben).

---

## UUIDs eintragen

Sobald du über den GATT-Explorer (Button **🛠️ Debug**) die richtige Characteristic
gefunden hast, kannst du sie dauerhaft oben in `index.html` setzen:

```js
const CONFIG = {
  SERVICE_UUID: "0000fff0-0000-1000-8000-00805f9b34fb",
  DATA_CHARACTERISTIC_UUID: "0000fff1-0000-1000-8000-00805f9b34fb",
  ...
};
```

Lässt du die Felder leer, abonniert die App automatisch alle Notify-Characteristics
und du wählst die passende per Klick im Debug-Panel.

---

## Lizenz

Deine fertige Adresse nach dem Veröffentlichen: <https://farndt691-crypto.github.io/balance-flow/>

Frei für den Einsatz in Therapie und Rehabilitation. Ohne Gewähr; ersetzt keine
ärztliche oder physiotherapeutische Beratung.
