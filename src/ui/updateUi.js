import {gameState} from "../state/gameState.js";
import {dom} from "./dom.js";

export function updateStateUI() {
    if (!gameState.current) return;

    if (!dom.bar) return;

    const percent = Math.max(0, Math.min(1, gameState.current.stateProgress)) * 100;

    dom.bar.style.width = `${percent}%`;
    dom.bar.style.height = '100%';

    if (percent <= 25) {
        dom.bar.style.backgroundColor = '#d9534f'; // rot
    } else if (percent <= 75) {
        dom.bar.style.backgroundColor = '#efe03b'; // gelb
    } else {
        dom.bar.style.backgroundColor = '#5cb85c'; // grün
    }
}