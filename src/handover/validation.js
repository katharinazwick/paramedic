import {gameState} from "../state/gameState.js";
import {getRawHandoverValues} from "./rawValues.js";
import {isCorrect} from "./isCorrect.js";
import {setFeedbackForInput} from "./feedback.js";
import {dom} from "../ui/dom.js";
import {disable} from "../ui/enableDisable.js";

export function validateHandoverFields(current) {
    const inputs = document.querySelectorAll(".handover-form input, .handover-form select");
    const raw = getRawHandoverValues(current);

    inputs.forEach(input => {
        const name = input.name;
        const expected = raw[name];
        const actual = input.value.trim();

        const correct = isCorrect(expected, actual);
        setFeedbackForInput(input, correct, expected);
    });
}

document.addEventListener("click", (e) => {
    if (e.target.id === "handoverConfirm") {
        validateHandoverFields(gameState.current);
    }
});