import { basisCase } from "./basisCase.js";
import {allergy, preExistingConditions, healthStatuts, medications} from "../enum/sampler.js";


export const cases = [];

function randInt(max) { return Math.floor(Math.random() * max); }
function pickRandom(arr) { return arr[randInt(arr.length)]; }

//Werte zufällig nehmen
for (let i = 1; i <= 200; i++) {
    const basis = basisCase[(i - 1) % basisCase.length];
    const age = 4 + (i % 85);
    const health = healthStatuts[i % healthStatuts.length];

    // Puls abhängig der Gegebenheiten
    let basePuls = basis.vital && typeof basis.vital.puls === "number" ? basis.vital.puls : null;
    if (age < 14 || age > 60) basePuls *= 1.25;
    if (health === "schlecht") basePuls += 10;
    let pulsDisplay = (basePuls === 0 || basis.vital?.puls === "nicht messbar") ? (basis.vital?.puls === 0 ? "0/min" : "nicht messbar") : `${basePuls}/min`;

    //Atmung
    let baseRespiratory = basis.vital && typeof basis.vital.respiratoryRate === "number" ? basis.vital.respiratoryRate : null;
    if (age < 14 || age > 60) basePuls *= 1.75;
    if (health === "schlecht") basePuls += 5;
    let respiratoryDisplay = (basePuls === 0 || basis.vital?.puls === "nicht messbar") ? (basis.vital?.puls === 0 ? "0/min" : "nicht messbar") : `${basePuls}/min`;

    //Blutdruck & Temperatur
    const bp = basis.vital && basis.vital.bloodPressure ? basis.vital.bloodPressure : "nicht messbar";
    const temp = basis.vital && (basis.vital.temp !== undefined) ? `${basis.vital.temp} °C` : "unbekannt";

    /*const contraindications = Array.from(new Set([...(basis.contraindications || [])]));
    if (extraProblems.includes("Beckenfraktur")) contraindications.push("Schocklage nicht empfohlen (Beckenfraktur)");
    if (extraProblems.includes("SHT")) contraindications.push("Schocklage nicht empfohlen (SHT)");*/


// zusätzliche Probleme-Pool (kann ein Fall ergänzend haben)
   /* const extraProblemsPool = ["Schock", "Herzproblem", "SHT", "Beckenfraktur", "Atemstillstand", "Vergiftung"];


    // zusätzl. Probleme zufällig (0-2)
    const extraCount = randInt(3);
    const extraProblems = [];
    for (let k = 0; k < extraCount; k++) {
        const candidate = pickRandom(extraProblemsPool);
        if (!extraProblems.includes(candidate) && !basis.possibleAdditionalProblems?.includes(candidate)) {
            extraProblems.push(candidate);
        }
    }

    /*
    extraProblems && preExisting mit if = Herzproblem => schocklage zur kontraindikation
     */
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
        respiratoryRate: respiratoryDisplay,
        temp: temp,
        recap: "< " + basis.vital.recap + " min",
        allergy: allergy[i % allergy.length],
        preExistingConditions: preExistingConditions[i % preExistingConditions.length],
        medications: medications[i % medications.length],
        measures: basis.measures,
        contraindications: basis.contraindications,
        //additionalProblems: extraProblems
    });
}
