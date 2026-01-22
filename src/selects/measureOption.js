import {measure} from "../strings/measure.js";

const QUERY_FIELDS = Object.values(measure).map(value => ({
    key: value,
    label: value,
}));

export function generateMeasureSelect(selectEl) {
    selectEl.innerHTML = "";

    // Platzhalter
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Maßnahme einreichen";
    placeholder.disabled = true;
    placeholder.selected = true;
    selectEl.appendChild(placeholder);

    QUERY_FIELDS.forEach(field => {
        const option = document.createElement("option");
        option.value = field.key;
        option.textContent = field.label;
        selectEl.appendChild(option);
    });
}