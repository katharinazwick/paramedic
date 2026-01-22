import {dom} from "./dom.js";

export function enableGame(b) {
    dom.endBtn.disabled = !b;
    dom.resetBtn.disabled = !b;
    dom.expansionBtn.disabled = !b;
    dom.queryInput.disabled = !b;
    dom.measureInput.disabled = !b;
}

export function disableQueryMeasure() {
    dom.queryInput.disabled = true;
    dom.measureInput.disabled = true;
}

export function enableQueryMeasure() {
    dom.queryInput.disabled = false;
    dom.measureInput.disabled = false;
}

export function disableExpansion() {
    const inputs = document.querySelectorAll(".handover-form input, .handover-form select");
    inputs.forEach((input) => {
        input.disabled = true;
    })
}