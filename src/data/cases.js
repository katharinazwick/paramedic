import { basisCase } from "./basisCase.js";

const healthStatuts = ["gut", "schlecht", "psychisch belastet"];
const allergy = ["keine", "Pollen", "Hausstaub", "Penicillin", "Nüsse"];
const preExistingConditions = ["keine", "Asthma", "Diabetes", "Epilepsie", "Herzerkrankung"];
const medications = ["keine", "Insulin", "Betablocker", "Antiepileptika", "Asthmaspray"];

export const cases = [];

function randInt(max) { return Math.floor(Math.random() * max); }
function pickRandom(arr) { return arr[randInt(arr.length)]; }

// zusätzliche Probleme-Pool (kann ein Fall ergänzend haben)
const extraProblemsPool = ["Schock", "Herzproblem", "SHT", "Beckenfraktur", "Atemstillstand", "Vergiftung"];

for (let i = 1; i <= 200; i++) {
    const basis = basisCase[(i - 1) % basisCase.length]; // benutze (i-1) damit alle Basisfälle zyklisch verwendet werden
    const age = 4 + (i % 85);
    const health = healthStatuts[i % healthStatuts.length];

    // Puls aus Basis; manche Einträge sind 'nicht messbar' oder 0 -> robust behandeln
    let basePuls = basis.vital && typeof basis.vital.puls === "number" ? basis.vital.puls : null;
    let pulsNumeric = basePuls;
    if (pulsNumeric === null) {
        // fallback: schätzen nach Zustand
        pulsNumeric = health === "schlecht" ? 120 : 90;
    }
    if (age < 12) pulsNumeric += 15;
    if (health === "schlecht") pulsNumeric += 10;

    // zusätzl. Probleme zufällig (0-2)
    const extraCount = randInt(3);
    const extraProblems = [];
    for (let k = 0; k < extraCount; k++) {
        const candidate = pickRandom(extraProblemsPool);
        if (!extraProblems.includes(candidate) && !basis.possibleAdditionalProblems?.includes(candidate)) {
            extraProblems.push(candidate);
        }
    }
    /*const contraindications = Array.from(new Set([...(basis.contraindications || [])]));
    if (extraProblems.includes("Beckenfraktur")) contraindications.push("Schocklage nicht empfohlen (Beckenfraktur)");
    if (extraProblems.includes("SHT")) contraindications.push("Schocklage nicht empfohlen (SHT)");*/

    const bp = basis.vital && basis.vital.bloodPressure ? basis.vital.bloodPressure : "nicht messbar";
    const temp = basis.vital && (basis.vital.temp !== undefined) ? `${basis.vital.temp} °C` : "unbekannt";

    let pulsDisplay = (pulsNumeric === 0 || basis.vital?.puls === "nicht messbar") ? (basis.vital?.puls === 0 ? "0/min" : "nicht messbar") : `${pulsNumeric}/min`;

    cases.push({
        id: i,
        state: 5,
        maxState: 10,
        minState:0,
        typ: basis.typ,
        initialSituation: basis.initialSituation,
        symptom: basis.symptom,
        age: age,
        health: health,
        skincolor: basis.skincolor,
        bloodPressure: bp,
        puls: pulsDisplay,
        respiratoryRate: basis.vital.respiratoryRate, //bearbeiten
        temp: temp,
        recap: "<1 min",
        allergy: allergy[i % allergy.length],
        preExistingConditions: preExistingConditions[i % preExistingConditions.length],
        medications: medications[i % medications.length],
        measures: basis.measures,
        cause: basis.cause,
        contraindications: basis.contraindications,
        //additionalProblems: extraProblems
    });
}
