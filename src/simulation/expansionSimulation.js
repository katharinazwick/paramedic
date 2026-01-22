import {gameState} from "../state/gameState.js";
import {causesArray} from "../strings/causes.js";
import {allergy, condition, medications, preExistingConditions} from "../strings/sampler.js";
import {dom} from "../ui/dom.js";
import {enableGame} from "../ui/enableDisable.js";
import {renderSelect} from "../selects/renderSelects.js";
import {validateHandoverFields} from "../handover/validation.js";
import {endSimulation} from "./endSimulation.js";

export function expansionSimulation() {
    if (gameState.decayTimer) clearInterval(gameState.decayTimer);

    let html = `
        <h2>🚑 Übergabe an den Rettungsdienst</h2>

        <div class="summary-section">
            <h3>Symptome</h3>
            <p>${gameState.current.symptom}</p>
        </div>

        <div class="summary-section">
            <h3>Übergabedaten</h3>

            <div class="handover-form">
                ${renderSelect("Ursache 1", "cause1", causesArray)}
                ${renderSelect("Ursache 2 (falls vorhanden)", "cause2", causesArray)}
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
            <button id="handoverConfirm" class="btn confirm">Übergabe bestätigen</button>
            <button id="newEndBtn" class="btn danger" disabled>Simulation auswerten</button>
        </div>
    `;
    dom.summaryContent.innerHTML = html;
    dom.summaryModal.classList.remove("hidden");

    const causes = gameState.current.typ
        .split("+")
        .map(c => c.trim());
    if (causes.length <= 1) document.querySelector('select[name="cause2"]').disabled = true;

    enableGame(false);

    const handoverBtn = document.getElementById("handoverConfirm");
    const endBtn = document.getElementById("newEndBtn");

    if (handoverBtn && endBtn) {
        handoverBtn.addEventListener("click", () => {
            validateHandoverFields(gameState.current);
            endBtn.disabled = false;
        });

        endBtn.addEventListener("click", () => {
            endSimulation();
        });
    }
}