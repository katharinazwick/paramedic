export function getRawHandoverValues(current) {
    const causes = current.typ
        .split("+")
        .map(c => c.trim());
    return {
        cause1: causes,
        cause2: causes,
        preExistingConditions: current.preExistingConditions,
        allergies: current.allergy,
        medications: current.medications,
        condition: current.condition,
        puls: parseInt(current.puls),
        bloodPressure: current.bloodPressure
    };
}