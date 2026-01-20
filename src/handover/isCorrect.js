export function isCorrect(expected, actual) {
    if (expected === undefined || expected=== null) return true;

    if (Array.isArray(expected)) {
        if (expected.length === 1 && actual === "") {
            return true;
        }
        return expected.includes(actual);
    }

    // Zahlenvergleich (z. B. Puls)
    if (!isNaN(expected)) {
        return Math.abs(Number(expected) - Number(actual)) <= 5; // Toleranz
    }

    return expected.toString() === actual.toString();
}
