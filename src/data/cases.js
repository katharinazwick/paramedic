import { basisCases } from "./basisCase.js";
import { healthStatuts, allergy, preExistingConditions, medications } from "../enum/sampler.js"; // falls vorhanden
import { applyVitalEffects, combineCases, pickRandom } from "./utils.js";
import {generateInitialSituationNeutral} from "../enum/initialSituation/initialSituation.js";

export const cases = [];

export function generateCases(numCases = 200) {
    for (let i = 1; i <= numCases; i++) {
        // 1–2 Basisfälle zufällig wählen
        const pickCount = Math.random() < 0.3 ? 2 : 1; // 30% Chance 2 Fälle
        const picked = [];
        while (picked.length < pickCount) {
            const candidate = pickRandom(basisCases);
            if (!picked.includes(candidate)) picked.push(candidate);
        }

        const combined = combineCases(picked);

        // Alter und Gesundheitsstatus bestimmen
        const age = 4 + (i % 85);
        const health = healthStatuts[i % healthStatuts.length];

        // Basale Vitalwerte
        let vitals = { puls: 80, respiratoryRate: 14, bloodPressure: "120/80", temp: 36.6 };

        // VitalEffects aus Basisfall anwenden
        vitals = applyVitalEffects(vitals, combined.vitalEffects);

        // Alters- und Healthmodifikator
        if (age < 14 || age > 60) vitals.puls *= 1.25;
        if (health === "schlecht") vitals.puls += 10;

        // Anzeigenformat
        const pulsDisplay = `${Math.round(vitals.puls)}/min`;
        const respiratoryDisplay = `${Math.round(vitals.respiratoryRate)}/min`;
        const bp = vitals.bloodPressure || "nicht messbar";
        const temp = vitals.temp ? `${vitals.temp} °C` : "unbekannt";

        // Push in das globale Array
        cases.push({
            id: i,
            state: 5,
            maxState: 10,
            minState: 0,
            typ: combined.typ,
            initialSituation: generateInitialSituationNeutral(),
            symptom: combined.symptoms.join(", "),
            age: age,
            health: health,
            skincolor: combined.skincolor,
            bloodPressure: bp,
            puls: pulsDisplay,
            respiratoryRate: respiratoryDisplay,
            temp: temp,
            recap: "< " + (combined.vitalEffects.recap) + " min",
            allergy: allergy[i % allergy.length],
            preExistingConditions: preExistingConditions[i % preExistingConditions.length],
            medications: medications[i % medications.length],
            measures: combined.measures,
            contraindications: combined.contraindications
        });
    }
    return cases;
}
