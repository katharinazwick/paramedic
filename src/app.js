import {faelle} from './data.js';
//import {renderMeasures} from './measures/renderMeasure.js';

// DOM
const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('endBtn');
const resetBtn = document.getElementById('resetBtn');
const scenarioText = document.getElementById('scenarioText');
const scenarioMeta = document.getElementById('scenarioMeta');
const askBtn = document.getElementById('askBtn');
const queryInput = document.getElementById('queryInput');
const askResult = document.getElementById('askResult');
const measureInput = document.getElementById('measureInput');
const saveMeasureBtn = document.getElementById('saveMeasureBtn');
const measureList = document.getElementById('measureList');
const logArea = document.getElementById('logArea');
const summaryModal = document.getElementById('summary');
const summaryContent = document.getElementById('summaryContent');
const closeSummary = document.getElementById('closeSummary');
const newAfterSummary = document.getElementById('newAfterSummary');

let current = null;
let userValues = {};
let userMeasures = [];
let askedHistory = [];

function log(msg) {
    const d = document.createElement('div');
    d.textContent = `${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} — ${msg}`;
    logArea.prepend(d);
}

function enableGame(b) {
    endBtn.disabled = !b;
    resetBtn.disabled = !b;
    askBtn.disabled = !b;
    saveMeasureBtn.disabled = !b;
}

function startSimulation() {
// zufällig eines der Szenarien wählen
    current = faelle[Math.floor(Math.random() * faelle.length)];
    userValues = {};
    userMeasures = [];
    askedHistory = [];
    scenarioText.textContent = current.Ursprungssituation;
    scenarioMeta.innerHTML = `<small>${current.Symptom}</small>`;
    askResult.textContent = '';
    measureList.innerHTML = '';
    logArea.innerHTML = '';
    summaryContent.innerHTML = '';
    summaryModal.classList.add('hidden');
    enableGame(true);
    log('Simulation gestartet — Ursprungsituation angezeigt');
}

function askValue() {
    const q = queryInput.value.trim();
    if (!q) return;
    const key = findKeyByName(q);
    if (!key) {
        askResult.textContent = `Feld "${q}" nicht gefunden`;
        return;
    }
    const value = current[key];
    askResult.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
// speichern
    userValues[key] = value;
    askedHistory.push({key, value});
    log(`Abgefragt: ${key} → ${Array.isArray(value) ? value.join(', ') : value}`);
    queryInput.value = '';
}

function findKeyByName(name) {
    const normalized = name.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');
    const keys = Object.keys(current);
    for (const k of keys) {
        const kn = k.toLowerCase();
        if (kn === normalized) return k;
        if (kn.includes(normalized)) return k;
    }
// english common short names
    const translations = {
        'bp': 'Blutdruck',
        'puls': 'Puls',
        'symptom': 'Symptom',
        'ursache': 'ursache',
        'massnahme': 'maßnahmen',
        'maßnahme': 'maßnahmen',
        'recap': 'recapzeit'
    };
    if (translations[normalized]) return translations[normalized];
    return null;
}

function saveMeasure() {
    const text = measureInput.value.trim();
    if (!text) return;
    userMeasures.push(text);
    measureInput.value = '';
    renderMeasures();
    log(`Maßnahme gespeichert: ${text}`);
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
    const correct = current; // reference
    let html = '';
    html += `<h3>Ursprungssituation</h3><p>${correct.Ursprungssituation}</p>`;
    html += `<h3>Deine abgefragten Werte</h3>`;
    if (askedHistory.length === 0) html += `<p><em>Du hast keine Werte abgefragt.</em></p>`;
    else {
        html += `<ul>`;
        for (const a of askedHistory) {
            const correctValue = correct[a.key];
            const userValue = userValues[a.key];
            html += `<li><strong>${a.key}:</strong> Dein Ergebnis: ${Array.isArray(userValue) ? userValue.join(', ') : userValue} — korrekt: ${Array.isArray(correctValue) ? correctValue.join(', ') : correctValue}</li>`;
        }
        html += `</ul>`;
    }

    html += `<h3>Deine Maßnahmen</h3>`;
    if (userMeasures.length === 0) html += `<p><em>Keine Maßnahmen gespeichert.</em></p>`;
    else {
        html += `<ul>`;
        for (const m of userMeasures) {
            const match = correct.maßnahmen.find(cm => cm.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(cm.toLowerCase()));
            html += `<li>${m} ${match ? '<span style="color:#8ef08e">✔ (passt zu: ' + match + ')</span>' : '<span style="color:#ff9b9b">✖</span>'}</li>`;
        }
        html += `</ul>`;
    }

   // const missing = maßnahmen - userMeasures;
    html += `<h3>Korrekte Maßnahmen</h3><p>${correct.maßnahmen.join(', ')}</p>`;
    html += `<h3>Ursache</h3><p><strong>${correct.ursache}</strong></p>`;

    summaryContent.innerHTML = html;
    summaryModal.classList.remove('hidden');
    log('Simulation beendet — Zusammenfassung angezeigt');
    enableGame(false);
}

function resetAll() {
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
    askBtn.addEventListener('click', askValue);
    queryInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') askValue();
    });
    saveMeasureBtn.addEventListener('click', saveMeasure);
    measureInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveMeasure();
    });
    endBtn.addEventListener('click', endSimulation);
    resetBtn.addEventListener('click', resetAll);
    closeSummary.addEventListener('click', () => summaryModal.classList.add('hidden'));
    newAfterSummary.addEventListener('click', () => {
        summaryModal.classList.add('hidden');
        startSimulation();
    });
}

// initial
resetAll();
