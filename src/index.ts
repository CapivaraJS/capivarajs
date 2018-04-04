import { Capivara } from './core';

(function(capivara) {
    if (!capivara) {
        window["capivara"] = new Capivara();
        document.addEventListener("DOMNodeRemoved", (evt) => window["capivara"].$emit("DOMNodeRemoved", evt));
    } else {
        console.warn("CapivaraJS tried to load more than once.");
    }
})(window["capivara"]);

export default window["capivara"];
