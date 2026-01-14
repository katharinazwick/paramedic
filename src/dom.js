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

///TODO:
/*
1. css überarbeiten
2. cases: Maßnahmen & Contraindikation, Atemfrequenz, Altersabhängigkeit, weitere Erkrankungen & Nebenfälle inkludieren ggf. neue Contras oder manuell (Schock)
3.timer => roter Balken (auch bei contra)
4. rtw bericht wenn gewonnen (mit auswertung und korrektur zwecks sampler)
5. code aufsplitten
6. online stellen
 */