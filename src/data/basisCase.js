import {measure} from "../enum/measure.js";
import {causes} from "../enum/causes.js";
import {shocks} from "../enum/shocks.js";
//beruhigen
//eigenschutz überall
export const basisCases = [
    {
        typ: causes.asthma,
        symptoms: ["pfeifende Atmung", "verlängerte Ausatmung"],
        skincolor: "zyanotisch",
        vitalEffects: {puls: {add: 60}, respiratoryRate: {add: 12}},
        measures: [measure.elevatedPosition, measure.calmDown, measure.moreOxygen, measure.medication],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.hypothermia, shocks.anaphylacticShock]
    },
    {
        typ: causes.airwayObstruction,
        symptoms: ["Atemnot", "Angst", "Husten"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 30}, respiratoryRate: {add: 12}},
        measures: [measure.elevatedPosition, measure.calmDown, measure.moreOxygen, measure.secretManeuver, measure.emergencyCall],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.pulmonaryEdema,
        symptoms: ["Atemnot", "Rasselgeräusche"],
        skincolor: "blass-blau",
        vitalEffects: {puls: {add: 20}, respiratoryRate: {add: 15}},
        measures: [measure.elevatedPosition, measure.calmDown, measure.moreOxygen, measure.medication, measure.emergencyCall],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, causes.internalBleeding]
    },
    {
        typ: causes.pneumothorax,
        symptoms: ["plötzliche Atemnot", "einseitiger Brustschmerz", "Blutung am Bauch"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 20}, respiratoryRate: {add: 12}, bloodPressure: {drop: "leicht"}},
        measures: [measure.elevatedPosition, measure.calmDown, measure.moreOxygen, measure.sterileCover, measure.stopBleeding, measure.emergencyCall],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, shocks.septicShock, shocks.vasovagalShock]
    },
    {
        typ: causes.anaphylaxis,
        symptoms: ["Atemnot", "Schwellung", "Hautausschlag", "Übelkeit"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}, bloodPressure: {drop: "stark"}},
        measures: [measure.elevatedPosition, measure.moreOxygen, measure.emergencyCall, measure.medication],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.sunStroke]
    },
    {
        typ: causes.decompressionSickness,
        symptoms: ["Husten, Schwindel, Müdigkeit, Jucken, Gleichgewichtsstörung"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 30}, respiratoryRate: {add: 8}},
        measures: [measure.elevatedPosition, measure.moreOxygen, measure.emergencyCall, measure.warmth, measure.drink],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.heartAttack,
        symptoms: ["starke Brustschmerzen", "Schwitzen", "Angst", "Atemnot"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 20}, bloodPressure: {drop: "leicht"}},
        measures: [measure.calmDown, measure.moreOxygen, measure.emergencyCall, measure.AED],
        contraindications: [],
        canCombineWith: [causes.asthma, shocks.septicShock, causes.sunStroke]
    },
    {
        typ: causes.coPoisoning,
        symptoms: ["Atemprobleme"],
        skincolor: "blau-rot",
        vitalEffects: {puls: {add: 30}, respiratoryRate: {add: 15}},
        measures: [measure.elevatedPosition, measure.moreOxygen, measure.emergencyCall, measure.leaveDangerZone],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.intoxication,
        symptoms: ["veränderte Atmung", "Übelkeit", "Erbrechen", "Bewusstseinsstörung"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}},
        measures: [measure.oxygen, measure.emergencyCall, measure.leaveDangerZone],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.sunStroke]
    },
    {
        typ: causes.poisoning,
        symptoms: ["Schwindel", "Pupillenstörung", "Übelkeit"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 40}},
        measures: [measure.elevatedPosition, measure.oxygen, measure.emergencyCall],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.sunStroke]
    },
    {
        typ: causes.stroke,
        symptoms: ["Bewusstseinsstörung", "Pupillenstörung", "Sprachstörung", "einseitige Lähmung"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 20}, bloodPressure: {drop: "leicht"}},
        measures: [measure.elevatedPosition, measure.moreOxygen, measure.emergencyCall],
        contraindications: [measure.drink, measure.food],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.seizure,
        symptoms: ["Zittern", "Versteifung", "Urinabgabe"],
        skincolor: "",
        vitalEffects: {puls: {add: 40}, respiratoryRate: {add: 15}, bloodPressure: {drop: "stark"}},
        measures: [measure.flatStorage, measure.oxygen, measure.warmth],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.internalBleeding,
        symptoms: ["Bauchschmerzen", "Schwitzen"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 20}, bloodPressure: {drop: "stark"}, temp: {add: 2}},
        measures: [measure.flatStorage, measure.oxygen, measure.emergencyCall, measure.warmth],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.sunStroke, causes.hypothermia]
    },
    {
        typ: causes.hypoglycemia,
        symptoms: ["Schwitzen", "Übelkeit"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 30}, temp: {add: 2}},
        measures: [measure.glucose, measure.oxygen, measure.warmth],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.hypothermia]
    },
    {
        typ: causes.hyperglycemia,
        symptoms: ["Hyperaktivität", "süßlicher Atemgeruch", "Durst"],
        skincolor: "",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}, bloodPressure: {drop: "stark"}},
        measures: [measure.drink, measure.activity],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.sunStroke, causes.hypothermia]
    },
    {
        typ: causes.frostbite,
        symptoms: ["Steifung"],
        skincolor: "zyanotisch",
        vitalEffects: {puls: {add: -30}, respiratoryRate: {add: -6}, temp: {add: 10}},
        measures: [measure.flatStorage, measure.sterileCover, measure.emergencyCall, measure.warmth],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.hypoglycemia,
        symptoms: ["Kälte", "Zittern"],
        skincolor: "zyanotisch",
        vitalEffects: {puls: {add: 40}, respiratoryRate: {add: 15}, temp: {add: -6}},
        measures: [measure.flatStorage, measure.glucose, measure.drink, measure.warmth],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.heatstroke,
        symptoms: ["Verwirrtheit", "trockene Haut"],
        skincolor: "",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}, bloodPressure: {drop: "stark"}, temp: {add: 3}},
        measures: [measure.elevatedPosition, measure.drink, measure.emergencyCall, measure.freeze, measure.shadow],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.sunStroke,
        symptoms: ["Kopfschmerzen", "Nackenschmerzen"],
        skincolor: "rot",
        vitalEffects: {},
        measures: [measure.elevatedPosition, measure.drink, measure.freeze, measure.shadow],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.heatstroke,
        symptoms: ["Kopfschmerzen", "Frieren"],
        skincolor: "rot",
        vitalEffects: {},
        measures: [measure.elevatedPosition, measure.drink, measure.emergencyCall, measure.warmth, measure.shadow],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.burn,
        symptoms: ["Rötung", "Blasen"],
        skincolor: "rot",
        vitalEffects: {puls: {add: 20}, respiratoryRate: {add: 15}, temp: {add: 2}},
        measures: [measure.freeze, measure.emergencyCall, measure.freeze, measure.sterileCover],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    /////////////////
    {
        typ: causes.fracture,
        symptoms: ["abnormale Lage", "abnormale Beweglichkeit", "zusehende Knochenenden"],
        skincolor: "",
        vitalEffects: {puls: {add: 20}, respiratoryRate: {add: 15}, temp: {add: 2}},
        measures: [measure.freeze, measure.compression, measure.emergencyCall, measure.sterileCover, measure.lunch],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.wounds,
        symptoms: ["geringe Blutung", "leichte Verletzungen"],
        skincolor: "",
        vitalEffects: {},
        measures: [measure.sterileCover, measure.stopBleeding, measure.flatStorage],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.headInjury,
        symptoms: ["Kopfschmerzen", "Übelkeit", "Erbrechen", "Schwindel", "Erinnerungslücken", "Blutung Nase/Ohr/Mund"],
        skincolor: "",
        vitalEffects: {puls: {add: 20}},
        measures: [measure.flatStorage, measure.warmth, measure.emergencyCall, measure.moreOxygen],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.skullFracture,
        symptoms: ["Krämpfe", "Austreten von Hirnmasse"],
        skincolor: "rot",
        vitalEffects: {puls: {add: 20}},
        measures: [measure.flatStorage, measure.emergencyCall],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.barotrauma,
        symptoms: ["Atembeschwerden", "Lähmung", "Taubheitsgefühl", "Gleichgewichtsstörung", "Schwindel"],
        skincolor: "sonderbar verändert",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}, bloodPressure: {drop: "leicht"}},
        measures: [measure.elevatedPosition, measure.drink, measure.emergencyCall, measure.drink, measure.warmth],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.hyperventilation,
        symptoms: ["Panik", "veränderte Atmung"],
        skincolor: "",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 30}, bloodPressure: {drop: "leicht"}},
        measures: [measure.calmDown, measure.drink, measure.elevatedPosition],
        contraindications: [measure.oxygen, measure.moreOxygen],
        canCombineWith: []
    },

]
