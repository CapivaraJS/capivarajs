import { Capivara } from './core/capivara';

(function(capivara) {
    if (!capivara) {
        window["capivara"] = new Capivara();
    } else {
        console.warn("Gee! CapivaraJS tried to load more than once.");
    }
})(window["capivara"]);

export default window['capivara'];
