export namespace Util {
    export function compare(arr1, arr2) {
        if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) {
            throw new TypeError('#compare accepts two parameters, both being Arrays.');
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0, l = arr1.length; i < l; i++) {
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                if (!this.compare(arr1[i], arr2[i])) {
                    return false;
                }
            } else if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
    export function diff(arr1, arr2) {
        if (!arr1 || !arr2 || !(arr1 instanceof Array) || !(arr2 instanceof Array)) {
            throw new TypeError('#diff accepts two parameters, both being Arrays.');
        }
        const a = [],
            diffValue: any = {},
            a1L = arr1.length,
            a2L = arr2.length;

        diffValue.added = [];
        diffValue.deleted = [];
        diffValue.all = [];
        for (let i = 0; i < a1L; i++) {
            a[arr1[i]] = 1;
        }
        for (let j = 0; j < a2L; j++) {
            if (a[arr2[j]]) {
                delete a[arr2[j]];
            } else {
                a[arr2[j]] = 2;
            }
        }
        for (const k in a) {
            if (k) {
                diffValue.all.push(k);
                if (a[k] === 1) {
                    diffValue.deleted.push(k);
                } else {
                    diffValue.added.push(k);
                }
            }
        }
        return diffValue;
    }

    export function keys(obj) {
        if (Object.prototype.toString.call(obj) !== '[object Object]' && !Array.isArray(obj)) {
            throw new TypeError('#keys only accepts objects and arrays');
        }
        const props = [];
        for (const prop in obj) {
            if (prop) {
                props.push(prop);
            }
        }
        return props;
    }

    export function clone(obj) {
        const a = [];
        for (const prop in obj) {
            if (prop) {
                a[prop] = obj[prop];
            }
        }
        return a;
    }
}
