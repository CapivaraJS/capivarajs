import { Observe } from './index';

export namespace Polyfill {
    const keyObserver = '__observer__';

    export function watchProperty(obj, prop, handler) {
        let oldVal = obj[prop];
        let newVal = oldVal;

        const getter = () => {
            return newVal;
        };

        const setter = (val) => {
            oldVal = newVal;
            const value = (newVal = val);
            if (oldVal !== val) {
                handler([{
                    type: 'update',
                    object: obj,
                    name: prop,
                    oldValue: oldVal,
                }]);
            }
            return value;
        };

        if (delete obj[prop]) {
            Object.defineProperty(obj, prop, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        }
    }

    export function updateProperties(delta, obj, handler) {
        const added = delta.added,
            deleted = delta.deleted,
            hasAdded = !!added.length,
            hasDeleted = !!deleted.length,
            all = delta.all,
            allL = all.length,
            response = [];

        for (let i = 0; i < allL; i++) {
            watchProperty(obj, all[i], handler);
            if (hasAdded && i <= added.length) {
                response.push({
                    type: 'add',
                    object: obj,
                    name: added[i],
                });
            }
            if (hasDeleted && i <= deleted.length) {
                response.push({
                    type: 'deleted',
                    object: obj,
                    name: deleted[i],
                });
            }
        }
        Observe.unobserve(obj);
        Observe.observe(obj, handler);
        handler(response);
    }

    export function unWatchProperty(obj, prop) {
        const val = obj[prop];
        delete obj[prop];
        obj[prop] = val;
    }

    export function setDirtyCheck(obj, time, fn) {
        Object.defineProperty(obj, keyObserver, {
            enumerable: false,
            configurable: true,
            writable: false,
            value: setInterval(fn, time),
        });
    }

    export function clearDirtyCheck(obj) {
        clearInterval(obj[keyObserver]);
        delete obj[keyObserver];
    }
}
