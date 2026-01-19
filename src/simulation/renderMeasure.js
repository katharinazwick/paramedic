import {dom} from "../ui/dom.js";
import {gameState} from "../state/gameState.js";

export function renderMeasures() {
    dom.measureList.innerHTML = '';
    gameState.userMeasures.forEach(m => {
        const el = document.createElement('div');
        el.className = 'measure-badge';
        el.textContent = m;
        dom.measureList.appendChild(el);
    });
}