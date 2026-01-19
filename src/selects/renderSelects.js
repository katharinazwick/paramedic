export function renderSelect(label, name, options) {
    return `
        <label>
            ${label}
            <select name="${name}">
                <option value="" selected disabled>Bitte auswählen</option>
                ${options.map(o => `<option value="${o}">${o}</option>`).join("")}
            </select>
        </label>
    `;
}