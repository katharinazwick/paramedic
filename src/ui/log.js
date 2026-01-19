import {dom} from "./dom.js";

export function log(msg) {
    const d = document.createElement('div');
    d.textContent = `${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} — ${msg}`;
    dom.logArea.prepend(d);
}