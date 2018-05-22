import { Scope } from '../../scope/scope';
import { Polyfill } from './polyfill';
import { Util } from './util';

export namespace Observe {

    const watchers = new WeakMap();

    export function observe(obj, handler, deg?) {
        if (!obj) {
            return;
        }
        if (!watchers.has(obj)) {
            watchers.set(obj, [handler]);
            this.create(obj, (changes) => {
                (watchers.get(obj) || []).forEach((watcher) => {
                    watcher(changes);
                });
            });
        } else {
            const handlers = watchers.get(obj);
            handlers.push(handler);
            watchers.set(obj, handlers);
        }
    }

    export function unobserve(obj) {
        this.destroy(obj);
        watchers.delete(obj);
    }

    export function create(obj, handler, objCreated = []) {
        if (obj && obj.__observer__) {
            return false;
        }
        objCreated.push(obj);
        let props = Util.keys(obj);
        const propsL = props.length;
        Polyfill.setDirtyCheck(obj, 50, updateProperties);
        for (let i = 0; i < propsL; i++) {
            if (Object.prototype.toString.call(obj[props[i]]) === '[object Object]' || Array.isArray(obj[props[i]])) {
                if (objCreated.indexOf(obj[props[i]]) === -1 && !obj[props[i]].__observer__) {
                    this.create(obj[props[i]], handler, objCreated);
                }
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
    }

    export function destroy(obj, objDestroyed = []) {
        if (!obj || !obj.__observer__) {
            return false;
        }

        objDestroyed.push(obj);
        const props = Object.keys(obj),
            propsL = props.length;

        Polyfill.clearDirtyCheck(obj);

        for (let i = 0; i < propsL; i++) {
            if (Object.prototype.toString.call(obj[props[i]]) === '[object Object]' || Array.isArray(obj[props[i]])) {
                if (objDestroyed.indexOf(obj[props[i]]) === -1 && obj[props[i]].__observer__) {
                    this.destroy(obj[props[i]], objDestroyed);
                }
            } else {
                Polyfill.unWatchProperty(obj, props[i]);
            }
        }
    }

}
