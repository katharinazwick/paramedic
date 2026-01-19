import {gameState} from "../state/gameState.js";

export function startDecayTimer() {
    if (gameState.decayTimer) clearInterval(gameState.decayTimer);

    gameState.decayTimer = setInterval(() => {
        const now = Date.now();
        if (!gameState.lastActionTime) gameState.lastActionTime = now;

        const diff = now - gameState.lastActionTime;
        /*if (diff >= 30_000) { // 1/2 Minute
            changeState(-1, '1 min lang keine Maßnahme');
            lastActionTime = now;
        }*/
    }, 5_000);
}