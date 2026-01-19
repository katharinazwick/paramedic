export function isCorrect(expected, actual) {
    if (expected === undefined) return true;
    if (expected === null) return true;

    // Zahlenvergleich (z. B. Puls)
    if (!isNaN(expected)) {
        return Math.abs(Number(expected) - Number(actual)) <= 5; // Toleranz
    }

    return expected.toString() === actual.toString();
}