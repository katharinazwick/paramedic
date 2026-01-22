
export function applyVitalEffects(vitals, effects ) {
    const result = {...vitals};
    if (effects.puls?.set) result.puls = effects.puls.set;

    if (effects.respiratoryRate?.set) result.respiratoryRate = effects.respiratoryRate.set;

    if(effects.bloodPressureSystole?.set) result.bloodPressureSystole = effects.bloodPressureSystole.set;
    if(effects.bloodPressureDiastole?.set) result.bloodPressureDiastole = effects.bloodPressureDiastole.set;

    if (effects.temp?.set) result.temp = effects.temp.set;

    if (effects.recap?.set) result.recap = effects.recap.set;

    return result;
}
