import {dom} from "./dom.js";

export function enableGame(b) {
    dom.endBtn.disabled = !b;
    dom.resetBtn.disabled = !b;
    dom.expansionBtn.disabled = !b;
    dom.queryInput.disabled = !b;
    dom.measureInput.disabled = !b;
}

export function disable() {
    dom.queryInput.disabled = true;
    dom.measureInput.disabled = true;
}