import {measure} from "../enum/measure.js";
import {causes} from "../enum/causes.js";
import {bloodPressure} from "../enum/bloodPressure.js";
//beruhigen
export const basisCases = [
    {
        typ: causes.asthma,
        symptoms: ["pfeifende Atmung", "verlängerte Ausatmung"],
        skincolor: "zyanotisch",
        vitalEffects: {puls: {add: 60}, respiratoryRate: {add: 12}},
        measures: [measure.elevatedPosition, measure.calmDown, measure.moreOxygen, measure.medication, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.hypothermia, causes.sunStroke, causes.bleeding, causes.heatstroke, causes.heatExhaustion, causes.fracture, causes.poisoning]
    },
    {
        typ: causes.airwayObstruction,
        symptoms: ["Atemnot", "Angst", "Husten"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 30}, respiratoryRate: {add: 12}},
        measures: [measure.elevatedPosition, measure.calmDown, measure.moreOxygen, measure.secretManeuver, measure.emergencyCall, measure.selfProtection,measure.shockPosition],
        contraindications: [], //measure.shockPosition
        canCombineWith: [causes.asthma, causes.hypothermia, causes.sunStroke, causes.hypoglycemia, causes.hyperglycemia]
    },
    /*{
        typ: causes.pulmonaryEdema,
        symptoms: ["Atemnot", "Rasselgeräusche"],
        skincolor: "blass-blau",
        vitalEffects: {puls: {add: 20}, respiratoryRate: {add: 15}},
        measures: [measure.elevatedPosition, measure.calmDown, measure.moreOxygen, measure.medication, measure.emergencyCall, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, causes.hypothermia, causes.sunStroke]
    },
    {
        typ: causes.pneumothorax,
        symptoms: ["plötzliche Atemnot", "einseitiger Brustschmerz", "Blutung am Bauch"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 20}, respiratoryRate: {add: 12}, bloodPressure: {drop: bloodPressure.medium}},
        measures: [measure.elevatedPosition, measure.calmDown, measure.moreOxygen, measure.sterileCover, measure.stopBleeding, measure.emergencyCall, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, shocks.otwoShcok, shocks.vasovagalShock, causes.internalBleeding, causes.bleeding, causes.headInjury,causes.wounds]
    },
    {
        typ: causes.anaphylaxis,
        symptoms: ["Atemnot", "Schwellung", "Hautausschlag", "Übelkeit"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}, bloodPressure: {drop: bloodPressure.low}},
        measures: [measure.elevatedPosition, measure.moreOxygen, measure.emergencyCall, measure.medication, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, causes.sunStroke, causes.hypothermia, causes.hyperglycemia,shocks.anaphylacticShock]
    },
    {
        typ: causes.decompressionSickness,
        symptoms: ["Husten, Schwindel, Müdigkeit, Jucken, Gleichgewichtsstörung"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 30}, respiratoryRate: {add: 8}},
        measures: [measure.elevatedPosition, measure.moreOxygen, measure.emergencyCall, measure.warmth, measure.drink, measure.selfProtection],
        contraindications: [],
        canCombineWith: []
    },
    {
        typ: causes.heartAttack,
        symptoms: ["starke Brustschmerzen", "Schwitzen", "Angst", "Atemnot"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 20}, bloodPressure: {drop: bloodPressure.high}},
        measures: [measure.calmDown, measure.moreOxygen, measure.emergencyCall, measure.AED, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, shocks.septicShock, causes.sunStroke, shocks.carcinogenicShock]
    },
    {
        typ: causes.coPoisoning,
        symptoms: ["Atemprobleme"],
        skincolor: "blau-rot",
        vitalEffects: {puls: {add: 30}, respiratoryRate: {add: 15}},
        measures: [measure.elevatedPosition, measure.moreOxygen, measure.emergencyCall, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, shocks.vasovagalShock]
    },
    {
        typ: causes.intoxication,
        symptoms: ["veränderte Atmung", "Übelkeit", "Erbrechen", "Bewusstseinsstörung"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}},
        measures: [measure.oxygen, measure.emergencyCall, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, causes.sunStroke, causes.hyperglycemia]
    },
    {
        typ: causes.poisoning,
        symptoms: ["Schwindel", "Pupillenstörung", "Übelkeit"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 40}},
        measures: [measure.elevatedPosition, measure.oxygen, measure.emergencyCall, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.sunStroke,causes.hyperglycemia]
    },
    {
        typ: causes.stroke,
        symptoms: ["Bewusstseinsstörung", "Pupillenstörung", "Sprachstörung", "einseitige Lähmung"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 20}, bloodPressure: {drop: bloodPressure.medium}},
        measures: [measure.elevatedPosition, measure.moreOxygen, measure.emergencyCall, measure.selfProtection],
        contraindications: [measure.drink, measure.food],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.seizure,
        symptoms: ["Zittern", "Versteifung", "Urinabgabe"],
        skincolor: "",
        vitalEffects: {puls: {add: 40}, respiratoryRate: {add: 15}, bloodPressure: {drop: bloodPressure.low}},
        measures: [measure.flatStorage, measure.oxygen, measure.warmth,measure.measureTime, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma]
    },
    {
        typ: causes.internalBleeding,
        symptoms: ["Bauchschmerzen", "Schwitzen"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 20}, bloodPressure: {drop: bloodPressure.low}, temp: {add: 2}},
        measures: [measure.flatStorage, measure.oxygen, measure.emergencyCall, measure.warmth, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.asthma, causes.sunStroke, causes.hypothermia,causes.bleeding, causes.heartAttack, causes.skullFracture, causes.hyperventilation,causes.wounds],
    },
    {
        typ: causes.hypoglycemia,
        symptoms: ["Schwitzen", "Übelkeit"],
        skincolor: "blass",
        vitalEffects: {puls: {add: 30}, temp: {add: 2}},
        measures: [measure.glucose, measure.oxygen, measure.warmth, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.hypothermia, causes.bleeding, causes.hyperventilation,causes.wounds]
    },
    {
        typ: causes.hyperglycemia,
        symptoms: ["Hyperaktivität", "süßlicher Atemgeruch", "Durst"],
        skincolor: "",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}, bloodPressure: {drop: bloodPressure.low}},
        measures: [measure.drink, measure.activity, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.sunStroke, causes.hypothermia]
    },
    {
        typ: causes.frostbite,
        symptoms: ["Steifung"],
        skincolor: "zyanotisch",
        vitalEffects: {puls: {add: -30}, respiratoryRate: {add: -6}, temp: {add: 10}},
        measures: [measure.flatStorage, measure.sterileCover, measure.emergencyCall, measure.warmth, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.hypothermia]
    },
    {
        typ: causes.hypoglycemia,
        symptoms: ["Kälte", "Zittern"],
        skincolor: "zyanotisch",
        vitalEffects: {puls: {add: 40}, respiratoryRate: {add: 15}, temp: {add: -6}},
        measures: [measure.flatStorage, measure.glucose, measure.drink, measure.warmth, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.frostbite]
    },
    {
        typ: causes.heatstroke,
        symptoms: ["Verwirrtheit", "trockene Haut"],
        skincolor: "",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}, bloodPressure: {drop: bloodPressure.low}, temp: {add: 3}},
        measures: [measure.elevatedPosition, measure.drink, measure.emergencyCall, measure.freeze, measure.frozenPlace, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.bleeding, causes.wounds]
    },
    {
        typ: causes.sunStroke,
        symptoms: ["Kopfschmerzen", "Nackenschmerzen"],
        skincolor: "rot",
        vitalEffects: {},
        measures: [measure.elevatedPosition, measure.drink, measure.freeze, measure.frozenPlace, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.bleeding,  causes.hyperventilation, causes.burn, causes.wounds]
    },
    {
        typ: causes.heatstroke,
        symptoms: ["Kopfschmerzen", "Frieren"],
        skincolor: "rot",
        vitalEffects: {},
        measures: [measure.elevatedPosition, measure.drink, measure.emergencyCall, measure.warmth, measure.frozenPlace, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.fracture]
    },
    {
        typ: causes.burn,
        symptoms: ["Rötung", "Blasen"],
        skincolor: "rot",
        vitalEffects: {puls: {add: 20}, respiratoryRate: {add: 15}, temp: {add: 2}},
        measures: [measure.freeze, measure.emergencyCall, measure.freeze, measure.sterileCover, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.heatstroke, causes.sunStroke,  causes.hyperventilation]
    },
    {
        typ: causes.fracture,
        symptoms: ["abnormale Lage", "abnormale Beweglichkeit", "zusehende Knochenenden"],
        skincolor: "",
        vitalEffects: {puls: {add: 20}, respiratoryRate: {add: 15}, temp: {add: 2}},
        measures: [measure.freeze, measure.compression, measure.emergencyCall, measure.sterileCover, measure.lunch, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma, causes.bleeding, causes.sunStroke, causes.hypothermia, causes.hyperventilation, causes.wounds]
    },
    {
        typ: causes.wounds,
        symptoms: ["geringe Blutung", "leichte Verletzungen"],
        skincolor: "",
        vitalEffects: {},
        measures: [measure.sterileCover, measure.stopBleeding, measure.flatStorage, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.asthma,causes.bleeding, causes.sunStroke, causes.hypothermia, causes.hyperventilation]
    },
    {
        typ: causes.headInjury,
        symptoms: ["Kopfschmerzen", "Übelkeit", "Erbrechen", "Schwindel", "Erinnerungslücken", "Blutung Nase/Ohr/Mund"],
        skincolor: "",
        vitalEffects: {puls: {add: 20}},
        measures: [measure.flatStorage, measure.warmth, measure.emergencyCall, measure.moreOxygen, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.bleeding, causes.wounds]
    },
    {
        typ: causes.skullFracture,
        symptoms: ["Krämpfe", "Austreten von Hirnmasse"],
        skincolor: "rot",
        vitalEffects: {puls: {add: 20}},
        measures: [measure.flatStorage, measure.emergencyCall, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.bleeding, causes.wounds]
    },
    {
        typ: causes.barotrauma,
        symptoms: ["Atembeschwerden", "Lähmung", "Taubheitsgefühl", "Gleichgewichtsstörung", "Schwindel"],
        skincolor: "sonderbar verändert",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 15}, bloodPressure: {drop: bloodPressure.medium}},
        measures: [measure.elevatedPosition, measure.drink, measure.emergencyCall, measure.drink, measure.warmth, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: []
    },
    {
        typ: causes.hyperventilation,
        symptoms: ["Panik", "veränderte Atmung"],
        skincolor: "",
        vitalEffects: {puls: {add: 50}, respiratoryRate: {add: 30}, bloodPressure: {drop: bloodPressure.medium}},
        measures: [measure.calmDown, measure.drink, measure.elevatedPosition, measure.selfProtection],
        contraindications: [measure.oxygen, measure.moreOxygen],
        canCombineWith: []
    },
    {
        typ: causes.bleeding,
        symptoms: ["starke Blutung", "Panik"],
        skincolor: "",
        vitalEffects: {puls: {add: 30}, respiratoryRate: {add: 10}},
        measures: [measure.flatStorage, measure.oxygen, measure.warmth, measure.pressureBandage,measure.calmDown, measure.selfProtection],
        contraindications: [],
        canCombineWith: [causes.sunStroke, causes.wounds, causes.hyperventilation,causes.hypothermia]
    },
    {
        typ: causes.Rückenverletzung,
        symptoms: ["bewegungslose Lage", "starke Schmerzen"],
        skincolor: "",
        vitalEffects: {puls: {add: 30}, respiratoryRate: {add: 10}},
        measures: [measure.flatStorage, measure.oxygen, measure.warmth, measure.emergencyCall, measure.spineboard, measure.HWS, measure.selfProtection],
        contraindications: [measure.shockPosition],
        canCombineWith: [causes.wounds, causes.bleeding]
    },*/
]
