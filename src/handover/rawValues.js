export function getRawHandoverValues(current) {
    return {
        cause: current.typ,
        preExistingConditions: current.preExistingConditions,
        allergies: current.allergy,
        medications: current.medications,
        puls: parseInt(current.puls), // "120/min" → 120
        bloodPressure: current.bloodPressure
    };
}