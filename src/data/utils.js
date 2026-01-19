import {bloodPressure} from "../enum/bloodPressure.js";

export function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function applyVitalEffects(vitals, effects) {
    const result = {...vitals};

    if (effects.puls?.add) result.puls += effects.puls.add;
    if (effects.puls?.set) result.puls = effects.puls.set;

    if (effects.respiratoryRate?.add) result.respiratoryRate += effects.respiratoryRate.add;
    if (effects.respiratoryRate?.set) result.respiratoryRate = effects.respiratoryRate.set;

    if (effects.temp?.set) result.temp = effects.temp.set;

    if (effects.bloodPressure?.drop === bloodPressure.medium) {
        result.bloodPressure = "110/70"
    } else if (effects.bloodPressure?.drop === bloodPressure.low) {result.bloodPressure = "90/60"}
    else if (effects.bloodPressure?.drop === bloodPressure.high) {result.bloodPressure = "160/100"}

    return result;
}

export function combineCases(casesArray) {
    const combined = {
        typ: casesArray.map(c => c.typ).join(" + "),
        symptoms: [],
        skincolor: casesArray[0].skincolor,
        vitalEffects: {},
        measures: new Set(),
        contraindications: new Set()
    };

    casesArray.forEach(c => {
        combined.symptoms.push(...c.symptoms);
        c.measures.forEach(m => combined.measures.add(m));
        c.contraindications.forEach(k => combined.contraindications.add(k));
        Object.assign(combined.vitalEffects, c.vitalEffects);
    });

    return {
        ...combined,
        measures: [...combined.measures],
        contraindications: [...combined.contraindications]
    };
}
