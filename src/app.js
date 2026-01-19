import {cases, generateCases} from './data/cases.js';
import {generateValueSelect} from "./selects/valueOptions.js";
import {generateMeasureSelect} from "./selects/measureOption.js";
import {allergy, preExistingConditions, medications} from "./enum/sampler.js";
import {causesArray} from "./enum/causes.js";
import {measure} from "./enum/measure.js";


// DOM
const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('endBtn');
const resetBtn = document.getElementById('resetBtn');
const expansionBtn = document.getElementById('expansionBtn');
const scenarioText = document.getElementById('scenarioText');
const scenarioMeta = document.getElementById('scenarioMeta');
const queryInput = document.getElementById('queryInput');
const askResult = document.getElementById('askResult');
const measureInput = document.getElementById('measureInput');
const measureList = document.getElementById('measureList');
const logArea = document.getElementById('logArea');
const summaryModal = document.getElementById('summary');
const summaryContent = document.getElementById('summaryContent');
const closeSummary = document.getElementById('closeSummary');

let current = null;
let userValues = {};
let userMeasures = [];
let askedHistory = [];
let lastActionTime = null;
let decayTimer = null;
let endReason = null;

function startDecayTimer() {
    if (decayTimer) clearInterval(decayTimer);

    decayTimer = setInterval(() => {
        const now = Date.now();
        if (!lastActionTime) lastActionTime = now;

        const diff = now - lastActionTime;
        /*if (diff >= 30_000) { // 1/2 Minute
            changeState(-1, '1 min lang keine Maßnahme');
            lastActionTime = now;
        }*/
    }, 5_000);
}

function updateStateUI() {
    if (!current) return;

    const bar = document.getElementById('statusBar');
    if (!bar) return;

    const percent = Math.max(0, Math.min(1, current.progress)) * 100;

    bar.style.width = `${percent}%`;
    bar.style.height = '100%';

    if (percent <= 25) {
        bar.style.backgroundColor = '#d9534f'; // rot
    } else if (percent <= 75) {
        bar.style.backgroundColor = '#f0ad4e'; // gelb
    } else {
        bar.style.backgroundColor = '#5cb85c'; // grün
    }
}


function log(msg) {
    const d = document.createElement('div');
    d.textContent = `${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} — ${msg}`;
    logArea.prepend(d);
}

function enableGame(b) {
    endBtn.disabled = !b;
    resetBtn.disabled = !b;
    expansionBtn.disabled = !b;
    queryInput.disabled = !b;
    measureInput.disabled = !b;
}

function startSimulation() {
// zufällig eines der Szenarien wählen
    current = cases[Math.floor(Math.random() * cases.length)];
    //current = generateCases();
    console.log(current);
    current.progress = 0.5; // 50 %
    current.step = 0.5 / current.measures.length; // z. B. 0.25 bei 4 Maßnahmen
    updateStateUI();
    startDecayTimer();
    userValues = {};
    userMeasures = [];
    askedHistory = [];
    scenarioText.textContent = current.initialSituation;
    scenarioMeta.innerHTML = `<small>${current.symptom}</small>`;
    askResult.textContent = '';
    measureList.innerHTML = '';
    logArea.innerHTML = '';
    summaryContent.innerHTML = '';
    summaryModal.classList.add('hidden');
    enableGame(true);
    log('Simulation gestartet — Ursprungsituation angezeigt');
}

const translationsENDE = {
    age: "Alter",
    allergy: "Allergien",
    bloodPressure: "Blutdruck",
    health: "Allgemeinzustand",
    medications: "Medikamente",
    preExistingConditions: "Vorerkrankungen",
    puls: "Puls",
    respiratoryRate: "Atemfrequenz",
    recap: "Rekap-Zeit",
    skincolor: "Hautfarbe",
    symptom: "Symptom",
    temp: "Temperatur"
};

function askValue() {
    let key = queryInput.value;
    const value = current[key];
    askResult.textContent = Array.isArray(value)
        ? value.join(", ")
        : value;
// speichern
    userValues[key] = value;
    key = translationsENDE[key];
    askedHistory.push({key, value});
    log(`Abgefragt: ${key} → ${Array.isArray(value) ? value.join(', ') : value}`);
    queryInput.value = '';
}

function saveMeasure() {
    const text = measureInput.value;
    if (!text) return;

    if (userMeasures.length === 0) {
        const isSelfProtection = measure.selfProtection.includes(text);

        if (!isSelfProtection) {
            log(`❌ Eigensicherung vergessen!`);
            log(`💥 Du bist selbst verunglückt`);
            disable()
            return;
        }
    }
    // doppelte Maßnahmen verhindern
    if (userMeasures.includes(text)) {
        log(`ℹ Maßnahme bereits durchgeführt: ${text}`);
        return;
    }

    userMeasures.push(text);
    measureInput.value = '';
    renderMeasures();

    lastActionTime = Date.now();

    // ✔ richtige Maßnahme (exakte Übereinstimmung)
    const isCorrect = current.measures.includes(text);

    // ❌ Kontraindikation (exakte Übereinstimmung)
    const isContra = current.contraindications.includes(text);

    if (isContra) {
        current.progress = 0;
        updateStateUI();
        endReason = "contra";
        endSimulation();
        return;
    }

    if (isCorrect) {
        current.progress += current.step;
        updateStateUI();
        log(`✔ richtige Maßnahme (${text}) → +${current.step.toFixed(2)}`);
    } else {
        log(`⚠ neutrale Maßnahme: ${text}`);
    }
    if (current.progress >= 1) { //beendet sofort kein platz für sampler
        endReason = "success"
        log('✅ Patient stabilisiert – Zeit für Betreuung');
    }
    /*if (current.progress <= 0) {
        endReason = "timeout";
        endSimulation();
    }*/

}


function renderMeasures() {
    measureList.innerHTML = '';
    userMeasures.forEach(m => {
        const el = document.createElement('div');
        el.className = 'measure-badge';
        el.textContent = m;
        measureList.appendChild(el);
    });
}


function endSimulation() {
// show summary
    if (decayTimer) clearInterval(decayTimer);
    let resultText = '';

    switch (endReason) {
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
    const correct = current; // reference
    let html = `<h2>Zusammenfassung der Simulation</h2><p>${resultText}</p>`;
    html += `<h3>Ursprungssituation</h3><p>${correct.initialSituation}</p>`;
    html += `<h3>Deine abgefragten Werte</h3>`;
    if (askedHistory.length === 0) html += `<p><em>Du hast keine Werte abgefragt.</em></p>`;
    else {
        html += `<ul>`;
        for (const a of askedHistory) {
            html += `<li><strong>${a.key}: </strong> ${a.value}</li>`;
        }
        html += `</ul>`;
    }

    html += `<h3>Deine Maßnahmen</h3>`;
    if (userMeasures.length === 0) html += `<p><em>Keine Maßnahmen gespeichert.</em></p>`;
    else {
        html += `<ul>`;
        for (const m of userMeasures) {
            const match = correct.measures.find(cm => cm.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(cm.toLowerCase()));
            html += `<li>${m} ${match ? '<span style="color:#8ef08e">✔</span>' : '<span style="color:#ff9b9b">✖</span>'}</li>`;
        }
        html += `</ul>`;
    }

    const missing = correct.measures.filter(x => !userMeasures.includes(x));
    html += `<h3>Fehlende Maßnahmen</h3><p>${missing.join(', ')}</p>`;

    summaryContent.innerHTML = html;
    summaryModal.classList.remove('hidden');
    enableGame(false);
}

function renderSelect(label, name, options) {
    return `
        <label>
            ${label}
            <select name="${name}">
                <option value="" selected disabled>Bitte auswählen</option>
                ${options.map(o => `<option value="${o}">${o}</option>`).join("")}
            </select>
        </label>
    `;
}

function expansionSimulation() {
    if (decayTimer) clearInterval(decayTimer);
    let html = `
        <h2>Übergabe an den Rettungsdienst</h2>

        <div class="summary-section">
            <h3>Ursprungssituation</h3>
            <p>${current.initialSituation}</p>
        </div>

        <div class="summary-section">
            <h3>Übergabedaten</h3>

            <div class="handover-form">
                ${renderSelect("Ursache", "cause", causesArray)}
                ${renderSelect("Vorerkrankungen", "preExistingConditions", preExistingConditions)}
                ${renderSelect("Allergien", "allergies", allergy)}
                ${renderSelect("Medikamente", "medications", medications)}

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

    summaryContent.innerHTML = html;
    summaryModal.classList.remove("hidden");
    enableGame(false);
}

function getRawHandoverValues(current) {
    return {
        cause: current.typ,
        preExistingConditions: current.preExistingConditions,
        allergies: current.allergy,
        medications: current.medications,
        puls: parseInt(current.puls), // "120/min" → 120
        bloodPressure: current.bloodPressure
    };
}

function isCorrect(expected, actual) {
    if (expected === undefined) return true;
    if (expected === null) return true;

    // Zahlenvergleich (z. B. Puls)
    if (!isNaN(expected)) {
        return Math.abs(Number(expected) - Number(actual)) <= 5; // Toleranz
    }

    return expected.toString() === actual.toString();
}

function setFeedbackForInput(input, correct, expected) {
    let feedback = input.parentElement.querySelector(".feedback");

    if (!feedback) {
        feedback = document.createElement("span");
        feedback.className = "feedback";
        input.parentElement.appendChild(feedback);
    }

    if (correct) {
        feedback.innerHTML = " ✅";
        feedback.style.color = "green";
    } else {
        feedback.innerHTML = ` ❌ <span class="solution">(${expected})</span>`;
        feedback.style.color = "red";
    }
}

function validateHandoverFields(current) {
    const inputs = document.querySelectorAll(".handover-form input, .handover-form select");
    const raw = getRawHandoverValues(current);

    inputs.forEach(input => {
        const name = input.name;
        const expected = raw[name];
        const actual = input.value.trim();

        const correct = isCorrect(expected, actual);
        setFeedbackForInput(input, correct, expected);
    });
}

document.addEventListener("click", (e) => {
    if (e.target.id === "handoverConfirm") {
        validateHandoverFields(current);
    }
});


function resetAll() {
    generateCases();
    if (decayTimer) clearInterval(decayTimer);
    current = null;
    userValues = {};
    userMeasures = [];
    askedHistory = [];
    scenarioText.textContent = 'Drücke "Neue Simulation starten" um loszulegen.';
    scenarioMeta.innerHTML = '';
    measureList.innerHTML = '';
    askResult.textContent = '';
    logArea.innerHTML = '';
    summaryContent.innerHTML = '';
    summaryModal.classList.add('hidden');
    enableGame(false);

    // Events
    startBtn.addEventListener('click', startSimulation);
    queryInput.addEventListener('change', askValue);
    queryInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') askValue();
    });
    measureInput.addEventListener('change', saveMeasure);
    measureInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveMeasure();
    });
    endBtn.addEventListener('click', endSimulation);
    resetBtn.addEventListener('click', resetAll);
    expansionBtn.addEventListener('click', expansionSimulation);
    closeSummary.addEventListener('click', () => summaryModal.classList.add('hidden'));
    closeSummary.addEventListener('click', disable);
}

function disable() {
    queryInput.disabled = true;
    measureInput.disabled = true;
}


// initial
generateValueSelect(queryInput);
generateMeasureSelect(measureInput);
resetAll();
