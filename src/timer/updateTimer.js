import {dom} from "../ui/dom.js";

export function updateTimerUI(remainingMs, totalMs) {
    const seconds = Math.ceil(remainingMs / 1000);
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");

    dom.timerText.textContent = `${min}:${sec}`;

    const percent = (remainingMs / totalMs) * 100;
    dom.timerBar.style.width = `${percent}%`;
}
