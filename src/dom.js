export function getElement() {
    return {
        startBtn: document.getElementById('startBtn'),
        endBtn: document.getElementById('endBtn'),
        resetBtn: document.getElementById('resetBtn'),
        scenarioText: document.getElementById('scenarioText'),
        scenarioMeta: document.getElementById('scenarioMeta'),
        askBtn: document.getElementById('askBtn'),
        queryInput: document.getElementById('queryInput'),
        askResult: document.getElementById('askResult'),
        measureInput: document.getElementById('measureInput'),
        saveMeasureBtn: document.getElementById('saveMeasureBtn'),
        measureList: document.getElementById('measureList'),
        logArea: document.getElementById('logArea'),
        summaryModal: document.getElementById('summary'),
        summaryContent: document.getElementById('summaryContent'),
        closeSummary: document.getElementById('closeSummary'),
        newAfterSummary: document.getElementById('newAfterSummary'),
    }
}

///TODO: code aufsplitten, pop up darf nicht transparent sein, ggf auswahl an elementen statt schreiben oder autokorrektur und irgendwo legende
/// ansicht ändern so dass verlauf ganzes feld bekommt