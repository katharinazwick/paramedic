import {generateCases} from "../data/cases.js";
import {gameState} from "../state/gameState.js";
import {dom} from "../ui/dom.js";
import {disableQueryMeasure, enableGame} from "../ui/enableDisable.js";
import {startSimulation} from "./startSimulation.js";
import {askValue} from "./askValue.js";
import {saveMeasure} from "./saveMeasure.js";
import {endSimulation} from "./endSimulation.js";
import {expansionSimulation} from "./expansionSimulation.js";
import {updateTimerUI} from "../timer/updateTimer.js";
import {startDecayTimer} from "../timer/decayTimer.js";

export function resetAll() {
    //const TOTAL_TIME = startDecayTimer()
    generateCases();
    updateTimerUI(2000,2000)
    if (gameState.decayTimer) clearInterval(gameState.decayTimer);
    gameState.current = null;
    gameState.userValues = {};
    gameState.userMeasures = [];
    gameState.askedHistory = [];
    dom.scenarioText.textContent = 'Drücke "Neue Simulation starten" um loszulegen.';
    dom.scenarioMeta.innerHTML = '';
    dom.measureList.innerHTML = '';
    dom.askResult.textContent = '';
    dom.logArea.innerHTML = '';
    dom.summaryContent.innerHTML = '';
    dom.summaryModal.classList.add('hidden');
    enableGame(false);

    // Events
    dom.startBtn.addEventListener('click', startSimulation);
    dom.queryInput.addEventListener('change', askValue);
    dom.queryInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') askValue();
    });
    dom.measureInput.addEventListener('change', saveMeasure);
    dom.measureInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveMeasure();
    });
    dom.endBtn.addEventListener('click', endSimulation);
    dom.resetBtn.addEventListener('click', resetAll);
    dom.expansionBtn.addEventListener('click', expansionSimulation);
    dom.closeSummary.addEventListener('click', () => dom.summaryModal.classList.add('hidden'));
    dom.closeSummary.addEventListener('click', disableQueryMeasure);
}