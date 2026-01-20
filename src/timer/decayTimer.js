import {gameState} from "../state/gameState.js";
import {expansionSimulation} from "../simulation/expansionSimulation.js";
import {updateTimerUI} from "./updateTimer.js";
import {unconscious} from "./unconscious.js";

export function startDecayTimer() {
    const TOTAL_TIME = 5 * 60 * 10000; // 5 Minuten
    const UNCONSCIOUS_TIME = 3 * 60 * 10000; // 3 Minuten

    if (gameState.decayTimer) {
        clearInterval(gameState.decayTimer);
    }

    const startTime = Date.now();
    let unconsciousTriggered = false;

    gameState.decayTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(TOTAL_TIME - elapsed, 0);

        // ⏱ Anzeige aktualisieren
        updateTimerUI(remaining, TOTAL_TIME);

        // 💤 Nach 3 Minuten unconscious()
        if (!unconsciousTriggered && elapsed >= UNCONSCIOUS_TIME) {
            unconsciousTriggered = true;
            unconscious();
        }

        // ☠️ Nach 5 Minuten endSimulation()
        if (elapsed >= TOTAL_TIME) {
            clearInterval(gameState.decayTimer);
            gameState.decayTimer = null;
            expansionSimulation()
        }
    }, 200);
}
