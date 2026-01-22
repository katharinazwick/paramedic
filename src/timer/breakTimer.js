import {gameState} from "../state/gameState.js";
import {disableQueryMeasure, enableQueryMeasure} from "../ui/enableDisable.js";
import {dom} from "../ui/dom.js";

export function breakTimer() {

    let isBreak = false;
    dom.breakBtn.addEventListener("click", () => {
        isBreak = !isBreak;

        dom.breakBtn.classList.toggle("paused", isBreak);
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


