// Generiert 200 realistische Sanitäts-Fallbeispiele (San A/B-orientiert)
// VITALPARAMETER SIND SYMPTOM- UND URSACHENABHÄNGIG (NICHT ZUFÄLLIG)

// ---------------- BASISFÄLLE (medizinisch plausibel, San A/B vollständig) ----------------
const basisFaelle = [
    // ATEMWEGE / ATMUNG
    {
        typ: "Asthmaanfall",
        Ursprungssituation: "Kalte Umgebung, körperliche Belastung, bekannte Atemwegserkrankung",
        Symptom: "pfeifende Atmung, verlängerte Ausatmung, Angst",
        hautfarbe: "blass",
        vital: { Blutdruck: "125/80", Puls: 115, Temperatur: 36.6 },
        ursache: "Asthma bronchiale",
        maßnahmen: ["Sitzend lagern", "Beruhigen", "Sauerstoff", "Asthmaspray assistieren"]
    },
    {
        typ: "Pneumothorax",
        Ursprungssituation: "Sturz mit Brustkorbaufprall, kalte Umgebung",
        Symptom: "plötzliche Atemnot, einseitiger Brustschmerz",
        hautfarbe: "blass",
        vital: { Blutdruck: "110/70", Puls: 120, Temperatur: 36.5 },
        ursache: "Luft im Pleuraspalt",
        maßnahmen: ["Oberkörper hoch", "Beruhigen", "Sauerstoff", "Notruf"]
    },
    {
        typ: "Lungenödem",
        Ursprungssituation: "Wohnung, bekannte Herzerkrankung, nächtliche Atemnot",
        Symptom: "Rasselgeräusche, schaumiger Auswurf, starke Atemnot",
        hautfarbe: "grau-zyanotisch",
        vital: { Blutdruck: "170/100", Puls: 110, Temperatur: 37.0 },
        ursache: "Linksherzinsuffizienz",
        maßnahmen: ["Oberkörper hoch", "Beine tief", "Sauerstoff", "Notruf"]
    },
    {
        typ: "Rauchgasinhalation",
        Ursprungssituation: "Wohnungsbrand, starke Rauchentwicklung",
        Symptom: "Husten, Atemnot, Ruß im Gesicht",
        hautfarbe: "grau",
        vital: { Blutdruck: "110/70", Puls: 120, Temperatur: 37.4 },
        ursache: "Toxische Gase",
        maßnahmen: ["Frischluft", "Sauerstoff", "Oberkörper hoch", "Notruf"]
    },

    // KREISLAUF / SCHOCK
    {
        typ: "Hypovolämischer Schock",
        Ursprungssituation: "Verkehrsunfall, starke Blutung, nasse Kleidung",
        Symptom: "kaltschweißig, Tachykardie, Unruhe",
        hautfarbe: "blass-grau",
        vital: { Blutdruck: "85/60", Puls: 135, Temperatur: 35.9 },
        ursache: "Blutverlust",
        maßnahmen: ["Blutung stillen", "Schocklage", "Wärmeerhalt", "Notruf"]
    },
    {
        typ: "Anaphylaktischer Schock",
        Ursprungssituation: "Sommer, Insektenstich im Freibad",
        Symptom: "Atemnot, Quaddeln, Schwellung",
        hautfarbe: "gerötet",
        vital: { Blutdruck: "80/50", Puls: 140, Temperatur: 37.2 },
        ursache: "Allergische Reaktion",
        maßnahmen: ["Notruf", "Sauerstoff", "Schocklage", "Überwachung"]
    },
    {
        typ: "Kardiogener Schock",
        Ursprungssituation: "Wohnung, bekannter Herzpatient, Brustschmerz",
        Symptom: "kalte Haut, Atemnot, Schwäche",
        hautfarbe: "aschfahl",
        vital: { Blutdruck: "70/45", Puls: 120, Temperatur: 36.7 },
        ursache: "Herzversagen",
        maßnahmen: ["Oberkörper hoch", "Sauerstoff", "Notruf", "Beruhigen"]
    },

    // NEUROLOGIE
    {
        typ: "Schlaganfall",
        Ursprungssituation: "Frühmorgen, plötzliche Sprachstörung",
        Symptom: "hängender Mundwinkel, Sprachstörung, Lähmung",
        hautfarbe: "normal",
        vital: { Blutdruck: "190/105", Puls: 90, Temperatur: 36.8 },
        ursache: "Zerebrale Durchblutungsstörung",
        maßnahmen: ["Oberkörper leicht hoch", "Notruf", "Nichts essen/trinken"]
    },
    {
        typ: "Epileptischer Anfall",
        Ursprungssituation: "Supermarkt, plötzliches Zusammenbrechen",
        Symptom: "Krampfanfälle, Bewusstlosigkeit",
        hautfarbe: "zyanotisch",
        vital: { Blutdruck: "140/90", Puls: 130, Temperatur: 37.8 },
        ursache: "Epilepsie",
        maßnahmen: ["Umgebung sichern", "Zeit messen", "Atemwege frei", "Notruf"]
    },

    // STOFFWECHSEL
    {
        typ: "Hypoglykämie",
        Ursprungssituation: "Schule, bekannt diabetisch, kalte Hände",
        Symptom: "Zittern, Verwirrtheit, Schwitzen",
        hautfarbe: "blass",
        vital: { Blutdruck: "120/75", Puls: 115, Temperatur: 36.5 },
        ursache: "Unterzuckerung",
        maßnahmen: ["Zucker oral", "Überwachung", "Notruf bei Bewusstseinsstörung"]
    },
    {
        typ: "Hyperglykämie",
        Ursprungssituation: "Wohnung, starker Durst, warme Umgebung",
        Symptom: "Müdigkeit, tiefe Atmung",
        hautfarbe: "trocken",
        vital: { Blutdruck: "100/65", Puls: 110, Temperatur: 38.2 },
        ursache: "Insulinmangel",
        maßnahmen: ["Notruf", "Sauerstoff", "Überwachung"]
    },

    // TRAUMA / UMWELT
    {
        typ: "Unterkühlung",
        Ursprungssituation: "Winter, alkoholisierte Person im Freien",
        Symptom: "Zittern, verlangsamte Sprache",
        hautfarbe: "blass",
        vital: { Blutdruck: "100/65", Puls: 55, Temperatur: 34.0 },
        ursache: "Kälteeinwirkung",
        maßnahmen: ["Wärmeerhalt", "Vorsichtig erwärmen", "Notruf"]
    },
    {
        typ: "Verbrennungsschock",
        Ursprungssituation: "Küchenbrand, großflächige Verbrennungen",
        Symptom: "starke Schmerzen, Blasen",
        hautfarbe: "gerötet",
        vital: { Blutdruck: "90/60", Puls: 130, Temperatur: 36.4 },
        ursache: "Flüssigkeitsverlust",
        maßnahmen: ["Steril abdecken", "Schocklage", "Notruf"]
    },
    {
        typ: "Stromunfall",
        Ursprungssituation: "Baustelle, Stromschlag, feuchte Umgebung",
        Symptom: "Bewusstseinsstörung, Muskelkrämpfe",
        hautfarbe: "blass",
        vital: { Blutdruck: "105/70", Puls: 100, Temperatur: 36.6 },
        ursache: "Elektrischer Strom",
        maßnahmen: ["Eigenschutz", "Stromquelle trennen", "Notruf", "Überwachung"]
    },

    // TAUCH- / WASSERUNFÄLLE
    {
        typ: "Ertrinkungsunfall",
        Ursprungssituation: "Kalter See, bewusstlos geborgen",
        Symptom: "keine Atmung, Unterkühlung",
        hautfarbe: "zyanotisch",
        vital: { Blutdruck: "nicht messbar", Puls: 0, Temperatur: 32.0 },
        ursache: "Hypoxie",
        maßnahmen: ["HLW", "Beatmung", "Notruf", "Wärmeerhalt"]
    },
    {
        typ: "Dekompressionsunfall",
        Ursprungssituation: "Tauchen, schnelle Auftauchphase",
        Symptom: "Gelenkschmerzen, Lähmungserscheinungen",
        hautfarbe: "marmoriert",
        vital: { Blutdruck: "140/85", Puls: 105, Temperatur: 36.7 },
        ursache: "Gasembolien",
        maßnahmen: ["100% Sauerstoff", "Notruf", "Flach lagern"]
    }
];

// ---------------- PARAMETER ----------------
const gesundheitStatus = ["gut", "schlecht", "psychisch belastet"];
const allergien = ["keine", "Pollen", "Hausstaub", "Penicillin", "Nüsse"];
const vorerkrankungen = ["keine", "Asthma", "Diabetes", "Epilepsie", "Herzerkrankung"];
const medikamente = ["keine", "Insulin", "Betablocker", "Antiepileptika", "Asthmaspray"];

// ---------------- GENERATOR ----------------
export const faelle = [];

for (let i = 1; i <= 200; i++) {
    const basis = basisFaelle[i % basisFaelle.length];
    const alter = 4 + (i % 85);
    const gesundheit = gesundheitStatus[i % gesundheitStatus.length];

    let puls = basis.vital.Puls;
    if (alter < 12) puls += 15;
    if (gesundheit === "schlecht") puls += 10;

    faelle.push({
        id: i,
        Ursprungssituation: basis.Ursprungssituation,
        Symptom: basis.Symptom,
        Alter: alter,
        gesundheit: gesundheit,
        hautfarbe: basis.hautfarbe,
        Blutdruck: basis.vital.Blutdruck,
        Puls: puls + "/min",
        Temperatur: basis.vital.Temperatur + " °C",
        recapzeit: "2 min",
        allergien: allergien[i % allergien.length],
        vorerkrankung: vorerkrankungen[i % vorerkrankungen.length],
        medikamenteneinnahme: medikamente[i % medikamente.length],
        maßnahmen: basis.maßnahmen,
        ursache: basis.ursache
    });
}

