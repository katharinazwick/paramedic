import {gameState} from "../state/gameState.js";

export function updateStateUI() {
    if (!gameState.current) return;

    const bar = document.getElementById('statusBar');
    if (!bar) return;

    const percent = Math.max(0, Math.min(1, gameState.current.progress)) * 100;

    bar.style.width = `${percent}%`;
    bar.style.height = '100%';

    if (percent <= 25) {
        bar.style.backgroundColor = '#d9534f'; // rot
    } else if (percent <= 75) {
        bar.style.backgroundColor = '#f0ad4e'; // gelb
    } else {
        bar.style.backgroundColor = '#5cb85c'; // grün
    }
}