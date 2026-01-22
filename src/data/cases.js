import {basisCases} from "./basisCase.js";
import {healthStatuts, allergy, preExistingConditions, medications, condition} from "../strings/sampler.js";
import {combineCases, pickRandom} from "./combineCases.js";
import {generateInitialSituationNeutral} from "../strings/initialSituation/initialSituation.js";
import {applyVitalEffects} from "./applyVitalEffects.js";

export const cases = [];

export function generateCases(numCases = 200) {
    for (let i = 1; i <= numCases; i++) {
        // 1–2 Basisfälle zufällig wählen
        const pickCount = Math.random() < 0.3 ? 2 : 2; // 30% Chance 2 Fälle
        const picked = [];
        const first = pickRandom(basisCases);

        picked.push(first);

        if (pickCount === 2) {
            const compatibleCandidates = getCompatibleCandidates(picked, basisCases.filter(c => c !== first));

            if (compatibleCandidates.length > 0) {
                const second = pickRandom(compatibleCandidates);
                picked.push(second);
            }
        }
        const combined = combineCases(picked);

        // Alter und Gesundheitsstatus bestimmen
        let age = 12 + (i % 85);
        const health = healthStatuts[i % healthStatuts.length];

        // Basale Vitalwerte
        let vitals = {
            puls: 80,
            respiratoryRate: 14,
            bloodPressureSystole: 120,
            bloodPressureDiastole: 70,
            temp: 36.6,
            recap: "< 10",
        };
        // VitalEffects aus Basisfall anwenden
        vitals = applyVitalEffects(vitals, combined.vitalEffects);

        // Alters- und Healthmodifikator
        if (age < 14) {
            vitals.puls *= 1.4;
            vitals.bloodPressureSystole /= 1.8;
            vitals.bloodPressureDiastole /= 1.8;
            age += " 👼🏼"
        } else if (age > 60) {
            vitals.puls *= 1.2;
            vitals.bloodPressureSystole *= 1.1;
            vitals.bloodPressureDiastole *= 1.1;
            age += " 👴🏾👵🏻"
        }
        if (health === "schlecht 😞") vitals.puls += 10;

        // Anzeigenformat
        const pulsDisplay = `${Math.round(Math.round(vitals.puls))}/min`;
        const respiratoryDisplay = `${Math.round(vitals.respiratoryRate)}/min`;
        const bp = (Math.round(vitals.bloodPressureSystole) + "/" + Math.round(vitals.bloodPressureDiastole)) || "nicht messbar";
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
            skinColor: combined.skinColor,
            bloodPressure: bp,
            puls: pulsDisplay,
            respiratoryRate: respiratoryDisplay,
            temp: temp,
            recap: vitals.recap + " sek",
            allergy: allergy[i % allergy.length],
            preExistingConditions: preExistingConditions[i % preExistingConditions.length],
            medications: medications[i % medications.length],
            measures: combined.measures,
            contraindications: combined.contraindications,
            negativeMeasures: combined.negativeMeasures,
            condition: condition[2],
        });
    }
    return cases;
}

function getCompatibleCandidates(existingCases, candidates) {
    return candidates.filter(candidate =>
        existingCases.every(ec =>
            ec.canCombineWith.includes(candidate.typ) &&
            candidate.canCombineWith.includes(ec.typ)
        )
    );
}
