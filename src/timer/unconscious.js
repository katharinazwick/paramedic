import {gameState} from "../state/gameState.js";
import {measure} from "../enum/measure.js";
import {log} from "../ui/log.js";
import {updateStateUI} from "../ui/updateUi.js";
//funktioniert nicht
export function unconscious() {
    console.log("hallo")
    if (!gameState.current) return;

    const current = gameState.current;

    // 1️⃣ Prüfen, ob bewusstlos werden erlaubt
    if (!current.unconscious) {
        return;
    }

    // Patienten, die bewusstlos + Atemstillstand nicht dürfen
    if (current.cardiacArrest === false) {
        // 25% bewusstlos, 75% bleibt wach
        const rand = Math.random();
        if (rand < 0.25) {
            current.unconscious = true;
            current.cardiacArrest = false;
            log("Patient wird bewusstlos!!!");
        }
    } else {
        // Patienten, die auch Atemstillstand dürfen
        // 25% bewusstlos, 25% bewusstlos + Atemstillstand, 50% bleibt wach
        const rand = Math.random();
        if (rand < 0.25) {
            current.unconscious = true;
            current.cardiacArrest = false;
            log("Patient wird bewusstlos.");
        } else if (rand < 0.5) {
            current.unconscious = true;
            current.cardiacArrest = true;
            log("Patient wird bewusstlos und hat Atemstillstand");
        } else {
            current.unconscious = false;
            current.cardiacArrest = false;
            log("Patient bleibt wach.");
        }
    }

    // 3️⃣ Maßnahmen anpassen
    if (current.unconscious) {
        // a) Maßnahmen entfernen, die bei Bewusstlosigkeit ungeeignet sind
        const forbidden = [ measure.calmDown, measure.selfProtection];
        current.measures = current.measures.filter(m => !forbidden.includes(m));

        // b) Standardmaßnahmen für Bewusstlosigkeit hinzufügen
        const needed = [measure.HLW, measure.lateralPosition];
        needed.forEach(m => {
            if (!current.measures.includes(m)) {
                current.measures.push(m);
            }
        });

        log("Maßnahmen angepasst: HLW & stabile Seitenlage ergänzt, ungeeignete entfernt.");
    }

    // 4️⃣ UI aktualisieren
    if (typeof updateStateUI === "function") updateStateUI();
}
