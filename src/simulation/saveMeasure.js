import {dom} from "../ui/dom.js";
import {gameState} from "../state/gameState.js";
import {measure} from "../enum/measure.js";
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
            log(`❌ Eigensicherung vergessen!`);
            log(`💥 Du bist selbst verunglückt`);
            disable()
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

    gameState.lastActionTime = Date.now();

    // ✔ richtige Maßnahme (exakte Übereinstimmung)
    const isCorrect = gameState.current.measures.includes(text);

    // ❌ Kontraindikation (exakte Übereinstimmung)
    const isContra = gameState.current.contraindications.includes(text);

    if (isContra) {
        gameState.current.progress = 0;
        updateStateUI();
        gameState.endReason = "contra";
        endSimulation();
        return;
    }

    if (isCorrect) {
        gameState.current.progress += gameState.current.step;
        updateStateUI();
        log(`✔ richtige Maßnahme (${text}) → +${gameState.current.step.toFixed(2)}`);
    } else {
        log(`⚠ neutrale Maßnahme: ${text}`);
    }
    if (gameState.current.progress >= 1) { //beendet sofort kein platz für sampler
        gameState.endReason = "success"
        log('✅ Patient stabilisiert – Zeit für Betreuung');
    }
    /*if (current.progress <= 0) {
        endReason = "timeout";
        endSimulation();
    }*/

}