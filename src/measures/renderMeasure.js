import {getElement} from "../dom.js";

export function renderMeasures() {
    getElement.innerHTML = '';
    getElement.forEach(m => {
        const el = document.createElement('div');
        el.className = 'measure-badge';
        el.textContent = m;
        getElement.appendChild(el);
    });
}