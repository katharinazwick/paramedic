import {dom} from "../ui/dom.js";
import {gameState} from "../state/gameState.js";
import {log} from "../ui/log.js";
import {translationsENDE} from "../enum/translationDEEN.js";

export function askValue() {
    let key = dom.queryInput.value;
    const value = gameState.current[key];
    dom.askResult.textContent = Array.isArray(value)
        ? value.join(", ")
        : value;
// speichern
    gameState.userValues[key] = value;
    key = translationsENDE[key];
    gameState.askedHistory.push({key, value});
    log(`Abgefragt: ${key} → ${Array.isArray(value) ? value.join(', ') : value}`);
    dom.queryInput.value = '';
}