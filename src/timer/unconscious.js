import {gameState} from "../state/gameState.js";
import {measure} from "../enum/measure.js";
import {log} from "../ui/log.js";
import {updateStateUI} from "../ui/updateUi.js";
import {condition} from "../enum/sampler.js";

//funktioniert nicht
export function unconscious() {
    if (!gameState.current) return;

    const current = gameState.current;

    // Patienten, die bewusstlos + Atemstillstand nicht dürfen
    if (current.cardiacArrest === false) {
        // 50% bewusstlos, 50% bleibt wach
        const rand = Math.random();
        if (rand < 0.5) {
            current.unconscious = true;
            current.cardiacArrest = false;
        }
    } else {
        // Patienten, die auch Atemstillstand dürfen
        // 25% bewusstlos, 25% bewusstlos + Atemstillstand, 50% bleibt wach
        const rand = Math.random();
        if (rand < 0.25) {
            current.unconscious = true;
            current.cardiacArrest = false;
            current.condition = condition[0];
            gameState.endReason = "unconscious";
        } else if (rand < 0.25) {
            current.unconscious = false;
            current.cardiacArrest = true;
            current.condition = condition[1];
        } else {
            current.unconscious = false;
            current.cardiacArrest = false;
            current.condition = condition[2];
        }
    }

    // Maßnahmen anpassen
    if (current.unconscious) {
        // a) Maßnahmen entfernen, die bei Bewusstlosigkeit ungeeignet sind
        const forbidden = [measure.calmDown, measure.activity, measure.secretManeuver, measure.elevatedPosition, measure.bag, measure.compression, measure.freeze, measure.frozenPlace, measure.activity, measure.medication, measure.oxygen, measure.moreOxygen, measure.shockPosition, measure.spineboard, measure.drink, measure.glucose, measure.measureTime];
        current.measures = current.measures.filter(m => !forbidden.includes(m));

        // b) Standardmaßnahmen für Bewusstlosigkeit hinzufügen
        const needed = [measure.lateralPosition, measure.warmth, measure.moreOxygen, measure.emergencyCall];
        pushAndRemove(current, needed, forbidden);
        log("🆘 Der Patient ist bewusstlos geworden 🆘");
    } else if (current.cardiacArrest) {
        // a) Maßnahmen entfernen, die bei Bewusstlosigkeit ungeeignet sind
        const needed = [measure.HLW, measure.moreOxygen, measure.AED, measure.emergencyCall];
        const forbidden = Object.values(measure).filter(
            m => !needed.includes(m)
        );
        current.measures = current.measures.filter(m => !forbidden.includes(m));
        // b) Standardmaßnahmen für Bewusstlosigkeit hinzufügen
        pushAndRemove(current, needed, forbidden);
        log("🆘‼️ Der Patient hat einen Herzstillstand ‼️🆘");
    }
    updateStateUI();
}

function pushAndRemove(current, needed, forbidden) {
    needed.forEach(m => {
        if (!current.measures.includes(m)) {
            current.measures.push(m);
        }
        current.contraindications =
            current.contraindications.filter(x => x !== m);
    });
    forbidden.forEach(m => {
        current.contraindications.push(m);
    })
    gameState.current.stateSteps = 0.5 / gameState.current.measures.length;
    gameState.current.fullStep = 1 / gameState.current.measures.length;
    gameState.current.stateProgress -= 0.4;
}