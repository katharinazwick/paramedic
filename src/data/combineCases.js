export function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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
