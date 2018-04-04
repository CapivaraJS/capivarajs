import { Polyfill } from './polyfill';
import { Util } from './util';

export namespace Observe {

    export function observe(obj, handler) {
        let props = Util.keys(obj);
        const propsL = props.length;
        for (let i = 0; i < propsL; i++) {
            if (Object.prototype.toString.call(obj[props[i]]) === '[object Object]' || Array.isArray(obj[props[i]])) {
                this.observe(obj[props[i]], handler);
            } else {
                Polyfill.watchProperty(obj, props[i], handler);
            }
        }
        function updateProperties() {
            if (!Util.compare(props, Util.keys(obj))) {
                Polyfill.updateProperties(Util.diff(props, Util.keys(obj)), obj, handler);
                props = Util.keys(obj);
            }
        }
        Polyfill.setDirtyCheck(obj, 50, updateProperties);
    }

    export function unObserve(obj) {
        if (!obj || !obj.__observer__) {
            return false;
        }
        const props = Object.keys(obj),
            propsL = props.length;

        for (let i = 0; i < propsL; i++) {
            if (Object.prototype.toString.call(obj[props[i]]) === '[object Object]' || Array.isArray(obj[props[i]])) {
                this.unObserve(obj[props[i]]);
            } else {
                Polyfill.unWatchProperty(obj, props[i]);
            }
        }
        Polyfill.clearDirtyCheck(obj);
    }

}
