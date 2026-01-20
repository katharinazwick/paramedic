import {gameState} from "../state/gameState.js";
import {cases} from "../data/cases.js";
import {startDecayTimer} from "../timer/decayTimer.js";
import {dom} from "../ui/dom.js";
import {enableGame} from "../ui/enableDisable.js";
import {log} from "../ui/log.js";
import {updateStateUI} from "../ui/updateUi.js";

export function startSimulation() {
// zufällig eines der Szenarien wählen
    gameState.current = cases[Math.floor(Math.random() * cases.length)];
    gameState.current.stateProgress = 0.5; // 50 %
    gameState.current.fullProgress = 0; // 50 %
    gameState.current.stateSteps = 0.5 / gameState.current.measures.length;
    gameState.current.fullStep = 1 / gameState.current.measures.length;
    updateStateUI();
    startDecayTimer();
    gameState.userValues = {};
    gameState.userMeasures = [];
    gameState.askedHistory = [];
    dom.scenarioText.textContent = gameState.current.initialSituation;
    dom.scenarioMeta.innerHTML = `<small>${gameState.current.symptom}</small>`;
    dom.askResult.textContent = '';
    dom.measureList.innerHTML = '';
    dom.logArea.innerHTML = '';
    dom.summaryContent.innerHTML = '';
    dom.summaryModal.classList.add('hidden');
    enableGame(true);
    log('Simulation gestartet — Ursprungsituation angezeigt');
}