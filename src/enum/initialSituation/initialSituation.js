import {locations} from "./location.js";
import {irrelevantDetails} from "./irrelevant.js";
import {environmentDetails} from "./environment.js";

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateInitialSituationNeutral() {
    return `
        Sie werden ${pickRandom(locations)} alarmiert.
        ${pickRandom(environmentDetails)}
        ${pickRandom(irrelevantDetails)}
    `.replace(/\s+/g, " ").trim();
}
