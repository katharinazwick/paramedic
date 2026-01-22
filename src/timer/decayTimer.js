import {gameState} from "../state/gameState.js";
import {updateTimerUI} from "./updateTimer.js";
import {unconscious} from "./unconscious.js";
import {disableQueryMeasure} from "../ui/enableDisable.js";
import {breakTimer} from "./breakTimer.js";
import {dom} from "../ui/dom.js";


export function startDecayTimer() {
     const TOTAL_TIME = 2 * 60 * 1000;

    const UNCONSCIOUS_TIME = 30 * 1000;

    if (gameState.decayTimer) {
        clearInterval(gameState.decayTimer);
        gameState.decayTimer = null;
    }
    gameState.decayStart = null;
    gameState.decayElapsed = 0;
    gameState.isPaused = false;
    dom.breakBtn.classList.toggle("paused", false);


    gameState.decayStart = Date.now() - (gameState.decayElapsed || 0);
    gameState.isBreak = false;

    let unconsciousTriggered = gameState.decayElapsed >= UNCONSCIOUS_TIME;

    gameState.decayTimer = setInterval(() => {
        if (gameState.isBreak) return;

        const elapsed = Date.now() - gameState.decayStart;
        gameState.decayElapsed = elapsed;

        const remaining = Math.max(TOTAL_TIME - elapsed, 0);
        updateTimerUI(remaining, TOTAL_TIME);

        // unconscious() auslösen
        if (!unconsciousTriggered && elapsed >= UNCONSCIOUS_TIME) {
            unconsciousTriggered = true;
            unconscious();
        }

        // Timer beenden
        if (elapsed >= TOTAL_TIME) {
            clearInterval(gameState.decayTimer);
            gameState.decayTimer = null;
            disableQueryMeasure();
        }
    }, 200);

    breakTimer();
    return  TOTAL_TIME;
}
