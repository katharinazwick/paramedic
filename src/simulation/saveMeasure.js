import {dom} from "../ui/dom.js";
import {gameState} from "../state/gameState.js";
import {measure} from "../strings/measure.js";
import {log} from "../ui/log.js";
import {disable} from "../ui/enableDisable.js";
import {updateStateUI} from "../ui/updateUi.js";
import {renderMeasures} from "./renderMeasure.js";
import {endSimulation} from "./endSimulation.js";

export function saveMeasure() {
    const text = dom.measureInput.value;
    if (!text) return;

    if (gameState.userMeasures.length === 0) {
        const isSelfProtection = measure.selfProtection.includes(text);

        if (!isSelfProtection) {
            log(`❌ Eigensicherung vergessen! Deine Maßnahme wird nicht gespeichert!`);
            log(`💥 Du bist verunglückt. Kannst du deinen Patienten noch stabilisieren?`);
            gameState.current.stateProgress -= 0.3;
            updateStateUI();
            if (gameState.current.stateProgress <= 0) {
                gameState.endReason = "ownDeath";
                endSimulation();
            }
            return;
        }
    }
    // doppelte Maßnahmen verhindern
    if (gameState.userMeasures.includes(text)) {
        log(`ℹ Maßnahme bereits durchgeführt: ${text}`);
        return;
    }

    gameState.userMeasures.push(text);
    dom.measureInput.value = '';
    renderMeasures();

    //gameState.lastActionTime = Date.now();

    // ✔ richtige Maßnahme (exakte Übereinstimmung)
    const isCorrect = gameState.current.measures.includes(text);

    // ❌ Kontraindikation (exakte Übereinstimmung)
    const isContra = gameState.current.contraindications.includes(text);

    const isNegative = gameState.current.negativeMeasures.includes(text);

    if (isContra) {
        gameState.current.stateProgress -= 0.5;
        updateStateUI();
        log(`⚠️ Kontraindikation: ${text}`);
        log(`🛟 Sieh zu dass du deinen Patienten noch rettest!`);
    } else if (isCorrect) {
        gameState.current.stateProgress += gameState.current.stateSteps;
        updateStateUI();
        log(`✔ richtige Maßnahme (${text}) → +${gameState.current.stateSteps.toFixed(2)}`);
        gameState.current.fullProgress += gameState.current.fullStep;
    } else if (isNegative) {
        gameState.current.stateProgress -= 0.2;
        updateStateUI();
        log(`🪫 Keine hilfreiche Maßnahme (${text})`);
    }else {
        log(`⚠ neutrale Maßnahme: ${text}`);
    }
    const allAllowed = gameState.current.measures.every(m =>
        gameState.userMeasures.includes(m)
    );

    if (allAllowed && (gameState.current.unconscious || gameState.current.cardiacArrest)) {
        log(`🚑 Patient stabilisiert – übergebe ihn an den Rettungsdienst`);
        gameState.endReason = "unconscious";
        disable();
        return;
    }
    if (gameState.current.fullProgress >= 1) {
        gameState.endReason = "justBarely"
        log('🔋 Patient stabilisiert – Zeit für Betreuung');
    }
    if (gameState.current.stateProgress <= 0) {
        gameState.endReason = "contra";
        endSimulation();
    } else if (gameState.current.stateProgress >= 1) {
        gameState.endReason = "success"
    }
    /*if (current.progress <= 0) {
        endReason = "timeout";
        endSimulation();
    }*/

}