export namespace Polyfill {

    export function watchProperty(obj, prop, handler) {
        let oldval = obj[prop];
        let newval = oldval;

        const getter = () => {
            return newval;
        };

        const setter = (val) => {
            oldval = newval;
            const value = (newval = val);
            if (oldval !== val) {
                handler([{
                    type: 'update',
                    object: obj,
                    name: prop,
                    oldValue: oldval,
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
        handler(response);
    }

    export function unWatchProperty(obj, prop) {
        const val = obj[prop];
        /* tslint:disable */
        delete obj[prop];
        obj[prop] = val;
        /* tslint:enable */
    }

    export function setDirtyCheck(obj, time, fn) {
        Object.defineProperty(obj, '__interval__', {
            enumerable: false,
            configurable: true,
            writable: false,
            value: setInterval(fn, time),
        });
    }

    export function clearDirtyCheck(obj) {
        clearInterval(obj.__interval__);
        /* tslint:disable */
        delete obj.__interval__;
        /* tslint:enable */
    }

}
