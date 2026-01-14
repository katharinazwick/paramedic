import {measure} from "../enum/measure.js";

export const basisCase = [
    // ATEMWEGE / ATMUNG
    {
        typ: "Asthmaanfall",
        initialSituation: "Kalte Umgebung, körperliche Belastung, bekannte Atemwegserkrankung",
        symptom: "pfeifende Atmung, verlängerte Ausatmung, Angst",
        skincolor: "blass",
        vital: { bloodPressure: "125/80", puls: 115, temp: 36.6, respiratoryRate: 16},
        cause: "Asthma bronchiale",
        measures: [measure.elevatedPosition, measure.calmDown, measure.oxygen, measure.medication],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Anaphylaxie"]
    },
    /*{
        typ: "Pneumothorax",
        initialSituation: "Sturz mit Brustkorbaufprall, kalte Umgebung",
        symptom: "plötzliche Atemnot, einseitiger Brustschmerz",
        skincolor: "blass",
        vital: { bloodPressure: "110/70", puls: 120, temp: 36.5 },
        cause: "Luft im Pleuraspalt",
        measures: [measure.elevatedPosition, measure.calmDown, measure.oxygen,measure.sterileCover ],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Blutung", "Schock"]
    },

    {
        typ: "Lungenödem",
        initialSituation: "Wohnung, bekannte Herzerkrankung, nächtliche Atemnot",
        symptom: "Rasselgeräusche, schaumiger Auswurf, starke Atemnot",
        skincolor: "grau-zyanotisch",
        vital: { bloodPressure: "170/100", puls: 110, temp: 37.0 },
        cause: "Linksherzinsuffizienz",
        measures: [measure.elevatedPosition, measure.calmDown,measure.oxygen,measure.emergencyCall],
        contraindications: [measure.shockPosition],
        possibleAdditionalProblems: ["Kardiogener Schock", "Atemstillstand"]
    },
    {
        typ: "Rauchgasinhalation",
        initialSituation: "Wohnungsbrand, starke Rauchentwicklung",
        symptom: "Husten, Atemnot, Ruß im Gesicht",
        skincolor: "grau",
        vital: { bloodPressure: "110/70", puls: 120, temp: 37.4 },
        cause: "Toxische Gase",
        measures: ["Frischluft", "Sauerstoff", "Oberkörper hoch", "Notruf", "Seitenlage bei Bewusstlosigkeit"],
        contraindications: [],
        possibleAdditionalProblems: ["Atemstillstand", "Vergiftung"]
    },

    // ... neu hinzugefügt / ergänzt aus dem Dokument:
    {
        typ: "Reizgasvergiftung",
        initialSituation: "Demonstration / Schwimmbad / chem. Anlage",
        symptom: "Hustenreiz, Kratzen im Hals, Schleimhautreizungen",
        skincolor: "normal bis grau",
        vital: { bloodPressure: "115/75", puls: 100, temp: 37.0 },
        cause: "Inhalation von Reizgasen (z. B. Tränengas, Chlor)",
        measures: ["Eigenschutz", "Gefahrenzone verlassen", "Frischluft", "Sauerstoff", "Oberkörper hoch", "Notruf"],
        contraindications: [],
        possibleAdditionalProblems: ["Lungenödem", "Atemstillstand"]
    },
    {
        typ: "Atemstillstand / Reanimation",
        initialSituation: "Bewusstlos aufgefunden, keine normale Atmung",
        symptom: "keine Atmung, keine Lebenszeichen",
        skincolor: "zyanotisch/blass",
        vital: { bloodPressure: "nicht messbar", puls: 0, temp: 36.0 },
        cause: "Verschiedene (Herzstillstand, Ertrinken, Vergiftung, Trauma)",
        measures: ["HLW", "AED", "Beatmung mit O₂ wenn möglich", "Notruf"],
        contraindications: [],
        possibleAdditionalProblems: ["Rauchgasinhalation", "Trauma"]
    },

    // KREISLAUF / SCHOCK
    {
        typ: "Hypovolämischer Schock",
        initialSituation: "Verkehrsunfall, starke Blutung, nasse Kleidung",
        symptom: "kaltschweißig, Unruhe",
        skincolor: "blass-grau",
        vital: { bloodPressure: "85/60", puls: 135, temp: 35.9 },
        cause: "Blutverlust",
        measures: ["Blutung stillen", "Schocklage (wenn NICHT kontraindiziert)", "Wärmeerhalt", "Notruf"],
        contraindications: ["Schocklage nicht bei Wirbelsäulen/Becken/Beinen, SHT, Atemnot, Herzerkrankung, Bauchverletzung"], // siehe Dokument. :contentReference[oaicite:12]{index=12}
        possibleAdditionalProblems: ["Beckenfraktur", "Innere Blutung"]
    },
    {
        typ: "Anaphylaktischer Schock",
        initialSituation: "Sommer, Insektenstich im Freibad",
        symptom: "Atemnot, Quaddeln, Schwellung",
        skincolor: "gerötet",
        vital: { bloodPressure: "80/50", puls: 140, temp: 37.2 },
        cause: "Allergische Reaktion",
        measures: ["Notruf", "Sauerstoff", "Atemerleichternde Lagerung bei ausgeprägter Atemnot", "Überwachung"],
        contraindications: ["Schocklage bei ausgeprägter Atemnot (stattdessen sitzende/atemerleichternde Lagerung)"], // DLRG: bei starker Atemnot keine Schocklage. :contentReference[oaicite:13]{index=13}
        possibleAdditionalProblems: ["Atemstillstand"]
    },
    {
        typ: "Kardiogener Schock",
        initialSituation: "Wohnung, bekannter Herzpatient, Brustschmerz",
        symptom: "kalte Haut, Atemnot, Schwäche, gestaute Halsvenen",
        skincolor: "aschfahl",
        vital: { bloodPressure: "70/45", puls: 120, temp: 36.7 },
        cause: "Herzversagen (z. B. Infarkt)",
        measures: ["Oberkörper hoch", "Sauerstoff", "Notruf", "Beruhigen", "AED holen lassen"],
        contraindications: ["Schocklage", "Beine hoch"], // kardiogener Schock: Oberkörper hoch, keine Schocklage. :contentReference[oaicite:14]{index=14}
        possibleAdditionalProblems: ["Lungenödem", "Arrhythmie"]
    },

    // NEUROLOGIE
    {
        typ: "Schlaganfall",
        initialSituation: "Frühmorgen, plötzliche Sprachstörung",
        symptom: "hängender Mundwinkel, Sprachstörung, Lähmung",
        skincolor: "normal",
        vital: { bloodPressure: "190/105", puls: 90, temp: 36.8 },
        cause: "Zerebrale Durchblutungsstörung",
        measures: ["Oberkörper leicht hoch", "Notruf (Stroke-Alert)", "Nichts essen/trinken", "Monitoring"],
        contraindications: ["Schocklage", "Bewegung ohne ärztliche Anweisung"],
        possibleAdditionalProblems: ["Bewusstseinsverlust"]
    },
    {
        typ: "Epileptischer Anfall",
        initialSituation: "Supermarkt, plötzliches Zusammenbrechen",
        symptom: "Krampfanfälle, Bewusstlosigkeit",
        skincolor: "zyanotisch",
        vital: { bloodPressure: "140/90", puls: 130, temp: 37.8 },
        cause: "Epilepsie",
        measures: ["Umgebung sichern", "Zeit messen", "Atemwege frei halten", "Notruf"],
        contraindications: ["Nicht in den Mund stecken / kein gewaltsames Festhalten"],
        possibleAdditionalProblems: ["Verletzungen durch Sturz", "Atemstillstand"]
    },

    // STOFFWECHSEL
    {
        typ: "Hypoglykämie",
        initialSituation: "Schule, bekannt diabetisch, kalte Hände",
        symptom: "Zittern, Verwirrtheit, Schwitzen",
        skincolor: "blass",
        vital: { bloodPressure: "120/75", puls: 115, temp: 36.5 },
        cause: "Unterzuckerung",
        measures: ["Zucker oral bei bewusstem Patienten", "Überwachung", "Notruf bei Bewusstseinsstörung"],
        contraindications: ["Keine orale Gabe bei bewusstlosigkeit (aspiration risk)"],
        possibleAdditionalProblems: ["Anfallsleiden"]
    },
    {
        typ: "Hyperglykämie (ketoazidotisch)",
        initialSituation: "Wohnung, starker Durst, warme Umgebung",
        symptom: "Müdigkeit, tiefe Atmung, starker Durst",
        skincolor: "trocken",
        vital: { bloodPressure: "100/65", puls: 110, temp: 38.2 },
        cause: "Insulinmangel",
        measures: ["Notruf", "Sauerstoff bei Atemnot", "Überwachung"],
        contraindications: [],
        possibleAdditionalProblems: ["Dehydratation", "Bewusstseinsstörung"]
    },

    // TRAUMA / UMWELT
    {
        typ: "Unterkühlung",
        initialSituation: "Winter, alkoholisierte Person im Freien",
        symptom: "Zittern, verlangsamte Sprache",
        skincolor: "blass",
        vital: { bloodPressure: "100/65", puls: 55, temp: 34.0 },
        cause: "Kälteeinwirkung",
        measures: ["Wärmeerhalt", "Vorsichtig erwärmen", "Notruf"],
        contraindications: ["Keine hektischen Bewegungen, keine schnellen Erwärmungsmethoden"],
        possibleAdditionalProblems: ["Ertrinkungsunfall", "Herzrhythmusstörungen"]
    },
    {
        typ: "Verbrennungsschock",
        initialSituation: "Küchenbrand, großflächige Verbrennungen",
        symptom: "starke Schmerzen, Blasen, großflächige Rötung",
        skincolor: "gerötet",
        vital: { bloodPressure: "90/60", puls: 130, temp: 36.4 },
        cause: "Flüssigkeitsverlust durch Verbrennung",
        measures: ["Steril abdecken", "Schocklage (wenn nicht kontraindiziert)", "Notruf"],
        contraindications: ["Keine Kühlung mit Eis direkt auf große Flächen"],
        possibleAdditionalProblems: ["Inhalationstrauma", "Schock"]
    },
    {
        typ: "Stromunfall",
        initialSituation: "Baustelle, Stromschlag, feuchte Umgebung",
        symptom: "Bewusstseinsstörung, Muskelkrämpfe",
        skincolor: "blass",
        vital: { bloodPressure: "105/70", puls: 100, temp: 36.6 },
        cause: "Elektrischer Strom",
        measures: ["Eigenschutz, Stromquelle trennen", "Notruf", "Überwachung", "Atemwege sichern"],
        contraindications: [],
        possibleAdditionalProblems: ["Verbrennungen", "Herzrhythmusstörungen", "Atemstillstand"]
    },

    // TAUCH- / WASSERUNFÄLLE
    {
        typ: "Ertrinkungsunfall",
        initialSituation: "Kalter See, bewusstlos geborgen",
        symptom: "keine Atmung, Unterkühlung",
        skincolor: "zyanotisch",
        vital: { bloodPressure: "nicht messbar", puls: 0, temp: 32.0 },
        cause: "Hypoxie",
        measures: ["HLW", "Beatmung", "Notruf", "Wärmeerhalt"],
        contraindications: [],
        possibleAdditionalProblems: ["Unterkühlung", "Lungenödem"]
    },
    {
        typ: "Dekompressionsunfall",
        initialSituation: "Tauchen, schnelle Auftauchphase",
        symptom: "Gelenkschmerzen, Lähmungserscheinungen, 'marmorierte' Haut",
        skincolor: "marmoriert",
        vital: { bloodPressure: "140/85", puls: 105, temp: 36.7 },
        cause: "Gasembolien / Dekompressionskrankheit",
        measures: ["Sauerstoff", "Notruf (Tauchunfallzentrum)", "flache Lagerung", "Monitoring"],
        contraindications: ["Keine unnötigen Bewegungen, kein Tauchen"],
        possibleAdditionalProblems: ["Neurologische Ausfälle"]
    },

    // zusätzliche Fälle aus dem Dokument
    {
        typ: "Vergiftung (Alkohol / Drogen)",
        initialSituation: "Partylocation, bewusstseinsgestört",
        symptom: "Atemdepression, Übelkeit, Bewusstseinseintrübung",
        skincolor: "blass/zyanotisch",
        vital: { bloodPressure: "90/60", puls: 70, temp: 36.6 },
        cause: "toxische Substanzen",
        measures: ["Eigenschutz", "Notruf", "Seitenlage bei Bewusstsein", "Sauerstoff bei Bewusstseinstrübung"],
        contraindications: ["Keine Hausmittel", "Keine orale Gabe bei bewusstseinsstörung"],
        possibleAdditionalProblems: ["Erbrechen", "Atemstillstand"]
    },
    {
        typ: "Beckenfraktur (starker Verdacht)",
        initialSituation: "Sturz aus Höhe, Schmerzen im Hüftbereich",
        symptom: "starke Schmerzen, Unfähigkeit zu laufen",
        skincolor: "blass",
        vital: { bloodPressure: "100/60", puls: 100, temp: 36.6 },
        cause: "Trauma",
        measures: ["Keine unnötigen Lagerungswechsel", "Vakuummatratze / T-POD anlegen", "Notruf", "Wärmeerhalt"],
        contraindications: ["Schocklage (Beckenbruch = Kontraindik.)"], // Beckenbruch: Schocklage nicht. :contentReference[oaicite:16]{index=16}
        possibleAdditionalProblems: ["Innerblutung", "Schock"]
    },
    {
        typ: "Polytrauma",
        initialSituation: "Verkehrsunfall, mehrere Verletzungszonen",
        symptom: "Hinweise auf lebensbedrohliche Verletzungen, instabil",
        skincolor: "blass / aschfahl",
        vital: { bloodPressure: "variiert", puls: 120, temp: 36.6 },
        cause: "mehrere Verletzungen",
        measures: ["Strenges Vorgehen nach Schema", "Stillen lebensbedrohlicher Blutungen", "Sauerstoff", "Notruf", "HWS-Immobilisation bei Verdacht"],
        contraindications: ["Schocklage je nach Befund (z. B. Becken/SHT kontra)"],
        possibleAdditionalProblems: ["Blutung", "Pneumothorax", "SHT"]
    },
    {
        typ: "Schädel-Hirn-Trauma",
        initialSituation: "Sturz, Kopfaufprall",
        symptom: "Bewusstseinsstörung, Kopfschmerz, Übelkeit, ungleiche Pupillen",
        skincolor: "normal bis blass",
        vital: { bloodPressure: "variiert", puls: 90, temp: 36.6 },
        cause: "Kopftrauma",
        measures: ["Achsengerechte Lagerung, HWS-Immobilisation bei Verdacht", "Notruf", "Monitoring"],
        contraindications: ["Schocklage (nicht empfohlen)"], // Ganzkörper-Schräglage wegen Hirndruck nicht empfohlen. :contentReference[oaicite:17]{index=17}
        possibleAdditionalProblems: ["Neurogener Schock", "Bewusstseinsverlust"]
    },
    {
        typ: "Barotrauma (Tauch-/Druckverletzung)",
        initialSituation: "Tauchen, Druckwechsel",
        symptom: "Schmerzen in Hohlräumen (z. B. Nase, Ohr), ggf. Brustschmerz",
        skincolor: "normal",
        vital: { bloodPressure: "120/80", puls: 90, temp: 36.8 },
        cause: "Druckdifferenzen (Boyle-Mariott)",
        measures: ["Notruf (Tauchunfallzentrum)", "Monitoring", "Sauerstoff bei Bedarf"],
        contraindications: [],
        possibleAdditionalProblems: ["Pneumothorax", "Hörverlust"]
    }*/
];
