import {gameState} from "../state/gameState.js";
import {disableQueryMeasure, enableQueryMeasure} from "../ui/enableDisable.js";

export function breakTimer() {

    const breakBtn = document.getElementById("breakBtn");
    let isBreak = false;
    breakBtn.addEventListener("click", () => {
        isBreak = !isBreak;

        breakBtn.classList.toggle("paused", isBreak);
        if (isBreak) {
            gameState.isBreak = true;
            disableQueryMeasure();
        } else {
            enableQueryMeasure();
            gameState.decayStart = Date.now() - gameState.decayElapsed;
            gameState.isBreak = false;
        }
    });
}


