
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
        contraindications: new Set(),
        negativeMeasures: new Set(),
    };

    casesArray.forEach(c => {
        combined.symptoms.push(...c.symptoms);

        c.measures.forEach(m => combined.measures.add(m));
        c.contraindications.forEach(k => combined.contraindications.add(k));
        c.negativeMeasures.forEach(k => combined.negativeMeasures.add(k));

        Object.assign(combined.vitalEffects, c.vitalEffects);
    });
    removeMeasuresByContrasFromCombined(combined);

    return {
        ...combined,
        measures: [...combined.measures],
        contraindications: [...combined.contraindications],
        negativeMeasures: [...combined.negativeMeasures],
    };
}

function removeMeasuresByContrasFromCombined(combined) {
    combined.contraindications.forEach(ci => {
        combined.measures.delete(ci);
    });
    combined.measures.forEach(ci => {
        combined.negativeMeasures.delete(ci);
    })
}

function canCasesBeCombined(casesArray) {
    return casesArray.every(a =>
        casesArray.every(b => {
            if (a === b) return true;

            return Array.isArray(a.canCombineWith)
                && a.canCombineWith.includes(b.typ);
        })
    );
}



