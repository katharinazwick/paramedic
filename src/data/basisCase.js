import { measure } from "../enum/measure.js";
import { causes } from "../enum/causes.js";

export const basisCase = [
    // ATEMWEGE / ATMUNG => recap
    {
        typ: causes.asthma,
        initialSituation: "Kalte Umgebung, körperliche Belastung, bekannte Atemwegserkrankung",
        symptom: "pfeifende Atmung, verlängerte Ausatmung, Angst",
        skincolor: "blass",
        vital: { bloodPressure: "125/80", puls: 115, temp: 36.6, respiratoryRate: 24, recap: 1 },
        measures: [
            measure.elevatedPosition,
            measure.calmDown,
            measure.moreOxygen,
            measure.medication
        ],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Anaphylaxie"]
    },
    {
        typ: "Pneumothorax",
        initialSituation: "Sturz mit Brustkorbaufprall, kalte Umgebung",
        symptom: "plötzliche Atemnot, einseitiger Brustschmerz",
        skincolor: "blass",
        vital: { bloodPressure: "110/70", puls: 120, temp: 36.5, respiratoryRate: 26 },
        cause: "Luft im Pleuraspalt",
        measures: [
            measure.elevatedPosition,
            measure.calmDown,
            measure.moreOxygen,
            measure.sterileCover
        ],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Blutung", "Schock"]
    },
    {
        typ: "Lungenödem",
        initialSituation: "Wohnung, bekannte Herzerkrankung, nächtliche Atemnot",
        symptom: "Rasselgeräusche, schaumiger Auswurf, starke Atemnot",
        skincolor: "grau-zyanotisch",
        vital: { bloodPressure: "170/100", puls: 110, temp: 37.0, respiratoryRate: 30 },
        cause: "Linksherzinsuffizienz",
        measures: [
            measure.elevatedPosition,
            measure.calmDown,
            measure.moreOxygen,
            measure.emergencyCall
        ],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Kardiogener Schock", "Atemstillstand"]
    },
    {
        typ: "Rauchgasinhalation",
        initialSituation: "Wohnungsbrand, starke Rauchentwicklung",
        symptom: "Husten, Atemnot, Ruß im Gesicht",
        skincolor: "grau",
        vital: { bloodPressure: "110/70", puls: 120, temp: 37.4, respiratoryRate: 28 },
        cause: "Toxische Gase",
        measures: [
            measure.oxygen,
            measure.elevatedPosition,
            measure.emergencyCall,
            measure.lateralPosition
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Atemstillstand", "Vergiftung"]
    },
    {
        typ: "Reizgasvergiftung",
        initialSituation: "Demonstration / Schwimmbad / chem. Anlage",
        symptom: "Hustenreiz, Kratzen im Hals, Schleimhautreizungen",
        skincolor: "normal bis grau",
        vital: { bloodPressure: "115/75", puls: 100, temp: 37.0, respiratoryRate: 22 },
        cause: "Inhalation von Reizgasen",
        measures: [
            measure.leaveDangerZone,
            measure.moreOxygen,
            measure.elevatedPosition,
            measure.emergencyCall
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Lungenödem", "Atemstillstand"]
    },
    {
        typ: "Atemstillstand / Reanimation",
        initialSituation: "Bewusstlos aufgefunden, keine normale Atmung",
        symptom: "keine Atmung, keine Lebenszeichen",
        skincolor: "zyanotisch/blass",
        vital: { bloodPressure: "nicht messbar", puls: 0, temp: 36.0, respiratoryRate: 0 },
        cause: "Herzstillstand / Hypoxie",
        measures: [
            measure.HLW,
            measure.AED,
            measure.emergencyCall,
            measure.moreOxygen
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Trauma", "Vergiftung"]
    },

    // KREISLAUF / SCHOCK
    {
        typ: "Hypovolämischer Schock",
        initialSituation: "Verkehrsunfall, starke Blutung",
        symptom: "kaltschweißig, Unruhe",
        skincolor: "blass-grau",
        vital: { bloodPressure: "85/60", puls: 135, temp: 35.9, respiratoryRate: 30 },
        cause: "Blutverlust",
        measures: [
            measure.stopBleeding,
            measure.shockPosition,
            measure.warmth,
            measure.emergencyCall
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Innere Blutung"]
    },
    {
        typ: "Anaphylaktischer Schock",
        initialSituation: "Insektenstich",
        symptom: "Atemnot, Quaddeln, Schwellung",
        skincolor: "gerötet",
        vital: { bloodPressure: "80/50", puls: 140, temp: 37.2, respiratoryRate: 32 },
        cause: "Allergische Reaktion",
        measures: [
            measure.emergencyCall,
            measure.oxygen,
            measure.elevatedPosition,
        ],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Atemstillstand"]
    },
    {
        typ: "Kardiogener Schock",
        initialSituation: "Brustschmerz, Herzpatient",
        symptom: "kalte Haut, Atemnot",
        skincolor: "aschfahl",
        vital: { bloodPressure: "70/45", puls: 120, temp: 36.7, respiratoryRate: 28 },
        cause: "Herzversagen",
        measures: [
            measure.elevatedPosition,
            measure.oxygen,
            measure.calmDown,
            measure.emergencyCall,
            measure.AED
        ],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Lungenödem"]
    },

    // NEUROLOGIE
    {
        typ: "Schlaganfall",
        initialSituation: "plötzliche Sprachstörung",
        symptom: "Lähmung, Sprachstörung",
        skincolor: "normal",
        vital: { bloodPressure: "190/105", puls: 90, temp: 36.8, respiratoryRate: 16 },
        cause: "Zerebrale Durchblutungsstörung",
        measures: [
            measure.elevatedPosition,
            measure.emergencyCall,
        ],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Bewusstseinsverlust"]
    },
    {
        typ: "Epileptischer Anfall",
        initialSituation: "plötzlicher Krampfanfall",
        symptom: "Krampfanfälle",
        skincolor: "zyanotisch",
        vital: { bloodPressure: "140/90", puls: 130, temp: 37.8, respiratoryRate: 0 },
        cause: "Epilepsie",
        measures: [
            measure.measureTime,
            measure.emergencyCall
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Atemstillstand"]
    },

    // STOFFWECHSEL
    {
        typ: "Hypoglykämie",
        initialSituation: "Diabetiker",
        symptom: "Zittern, Schwitzen",
        skincolor: "blass",
        vital: { bloodPressure: "120/75", puls: 115, temp: 36.5, respiratoryRate: 18 },
        cause: "Unterzuckerung",
        measures: [
            measure.glucose,
            measure.emergencyCall
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Krampfanfall"]
    },
    {
        typ: "Hyperglykämie",
        initialSituation: "starker Durst",
        symptom: "tiefe Atmung",
        skincolor: "trocken",
        vital: { bloodPressure: "100/65", puls: 110, temp: 38.2, respiratoryRate: 28 },
        cause: "Insulinmangel",
        measures: [
            measure.emergencyCall,
            measure.oxygen,
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Bewusstseinsstörung"]
    },

    // TRAUMA / UMWELT
    {
        typ: "Unterkühlung",
        initialSituation: "Winter",
        symptom: "Zittern",
        skincolor: "blass",
        vital: { bloodPressure: "100/65", puls: 55, temp: 34.0, respiratoryRate: 10 },
        cause: "Kälteeinwirkung",
        measures: [
            measure.warmth,
            measure.emergencyCall
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Herzrhythmusstörungen"]
    },
    {
        typ: "Ertrinkungsunfall",
        initialSituation: "bewusstlos geborgen",
        symptom: "keine Atmung",
        skincolor: "zyanotisch",
        vital: { bloodPressure: "nicht messbar", puls: 0, temp: 32.0, respiratoryRate: 0 },
        cause: "Hypoxie",
        measures: [
            measure.HLW,
            measure.warmth,
            measure.emergencyCall
        ],
        contraindications: [],
        possibleAdditionalProblems: ["Lungenödem"]}
];
