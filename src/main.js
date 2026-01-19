import {generateValueSelect} from "./selects/valueOptions.js";
import {generateMeasureSelect} from "./selects/measureOption.js";
import {dom} from "./ui/dom.js";
import {resetAll} from "./simulation/resetSimulation.js";


// initial
generateValueSelect(dom.queryInput);
generateMeasureSelect(dom.measureInput);
resetAll();
