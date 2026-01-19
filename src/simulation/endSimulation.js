import {gameState} from "../state/gameState.js";
import {dom} from "../ui/dom.js";
import {enableGame} from "../ui/enableDisable.js";

export function endSimulation() {
// show summary
    if (gameState.decayTimer) clearInterval(gameState.decayTimer);
    let resultText = '';

    switch (gameState.endReason) {
        case "success":
            resultText = '✅ <strong>Patient stabilisiert</strong> – alle Maßnahmen korrekt durchgeführt.';
            break;
        case "contra":
            resultText = '❌ <strong>Patient verstorben</strong> – Kontraindikation angewendet';
            break;
        /*case "timeout":
            resultText = '⚠ <strong>Patient verstorben</strong> – zu lange keine wirksamen Maßnahmen.';
            break;*/
        default:
            resultText = 'Simulation beendet.';
    }
    const correct = gameState.current; // reference
    let html = `<h2>Zusammenfassung der Simulation</h2><p>${resultText}</p>`;
    html += `<h3>Ursache</h3><p>${correct.typ}</p>`;
    html += `<h3>Symptome</h3><p>${correct.symptom}</p>`;
    html += `<h3>Deine abgefragten Werte</h3>`;
    if (gameState.askedHistory.length === 0) html += `<p><em>Du hast keine Werte abgefragt.</em></p>`;
    else {
        html += `<ul>`;
        for (const a of gameState.askedHistory) {
            html += `<li><strong>${a.key}: </strong> ${a.value}</li>`;
        }
        html += `</ul>`;
    }

    html += `<h3>Deine Maßnahmen</h3>`;
    if (gameState.userMeasures.length === 0) html += `<p><em>Keine Maßnahmen gespeichert.</em></p>`;
    else {
        html += `<ul>`;
        for (const m of gameState.userMeasures) {
            const match = correct.measures.find(cm => cm.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(cm.toLowerCase()));
            html += `<li>${m} ${match ? '<span style="color:#8ef08e">✔</span>' : '<span style="color:#ff9b9b">✖</span>'}</li>`;
        }
        html += `</ul>`;
    }

    const missing = correct.measures.filter(x => !gameState.userMeasures.includes(x));
    html += `<h3>Fehlende Maßnahmen</h3><p>${missing.join(', ')}</p>`;

    dom.summaryContent.innerHTML = html;
    dom.summaryModal.classList.remove('hidden');
    enableGame(false);
}