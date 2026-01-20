import {gameState} from "../state/gameState.js";
import {causesArray} from "../enum/causes.js";
import {allergy, condition, medications, preExistingConditions} from "../enum/sampler.js";
import {dom} from "../ui/dom.js";
import {enableGame} from "../ui/enableDisable.js";
import {renderSelect} from "../selects/renderSelects.js";
import {validateHandoverFields} from "../handover/validation.js";
import {resetAll} from "./resetSimulation.js";
import {endSimulation} from "./endSimulation.js";

export function expansionSimulation() {
    if (gameState.decayTimer) clearInterval(gameState.decayTimer);
    let html = `
        <h2>🚑 Übergabe an den Rettungsdienst</h2>

        <div class="summary-section">
            <h3>Ursprungssituation</h3>
            <p>${gameState.current.initialSituation}</p>
        </div>

        <div class="summary-section">
            <h3>Übergabedaten</h3>

            <div class="handover-form">
                ${renderSelect("Ursache 1", "cause1", causesArray)}
                ${renderSelect("Ursache 2 (nur wenn vorhanden)", "cause2", causesArray)}
                ${renderSelect("Vorerkrankungen", "preExistingConditions", preExistingConditions)}
                ${renderSelect("Allergien", "allergies", allergy)}
                ${renderSelect("Medikamente", "medications", medications)}
                ${renderSelect("Zustand", "condition", condition)}

                <label>
                    Puls
                    <input type="number" name="puls" placeholder="bpm">
                </label>

                <label>
                    Blutdruck
                    <input type="text" name="bloodPressure" placeholder="z.B. 120/80">
                </label>
            </div>
        </div>

        <div class="modal-actions">
            <button id="handoverConfirm" class="btn primary">Übergabe bestätigen</button>
            <button id="endBtn" class="btn primary">Simulation auswerten</button>
        </div>
    `;

    dom.summaryContent.innerHTML = html;
    dom.summaryModal.classList.remove("hidden");
    enableGame(false);
}

document.addEventListener("click", (e) => {
    if (e.target.id === "handoverConfirm") {
        validateHandoverFields(gameState.current);
    }
});

document.addEventListener("click", (e) => {
    if (e.target.id === "endBtn") {
        endSimulation();
    }
});