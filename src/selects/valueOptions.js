const QUERY_FIELDS = [
    {key: "allergy", label: "Allergien"},
    {key: "health", label: "Allgemeinzustand"},
    {key: "age", label: "Alter"},
    {key: "respiratoryRate", label: "Atemfrequenz"},
    {key: "bloodPressure", label: "Blutdruck"},
    {key: "skincolor", label: "Hautfarbe"},
    {key: "medications", label: "Medikamente"},
    {key: "puls", label: "Puls"},
    {key: "recap", label: "Rekap-Zeit"},
    {key: "symptom", label: "Symptom"},
    {key: "temp", label: "Temperatur"},
    {key: "preExistingConditions", label: "Vorerkrankungen"}
];

export function generateValueSelect(selectEl) {
    selectEl.innerHTML = "";

    // Platzhalter
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Werte erfragen";
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
