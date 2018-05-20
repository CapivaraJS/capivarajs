import * as _ from 'lodash';
import { Common } from '../common';

export namespace Eval {
    export function replaceAt(input, search, replace, start, end) {
        return input.slice(0, start)
            + input.slice(start, end).replace(search, replace)
            + input.slice(end);
    }

    export function getIndexStart(arr, currentIndex) {
        if (currentIndex === 0) { return 0; }
        const getPreviousSize = (i, size) => {
            const index = i - 1;
            if (index === -1) { return size; }
            size += arr[index].length;
            return getPreviousSize(index, size);
        };
        return getPreviousSize(currentIndex, 0);
    }

    export function isVariable(str = '') {
        const firstChar = str.charAt(0);
        return /[a-zA-Z]/g.test(firstChar)
            || firstChar === '$'
            || firstChar === '_';
    }

    export function exec(source, context, prefix = '') {
        const contexts = Array.isArray(context) ? context : [context];
        const referenceSelf = `this.${prefix ? prefix += '.' : ''}`, regex = /\$*[a-z0-9.$]+\s*/gi, keys = source.match(regex);
        if (keys && Array.isArray(keys)) {
            keys.forEach((str, i) => {
                const key = str.replace(/\s/g, ''),
                    indexStart = getIndexStart(keys, i);
                const indexEnd = indexStart + source.substring(indexStart, source.length).indexOf(key) + key.length;
                if (!key.includes(referenceSelf)) {
                    const isVar = !prefix.trim() ? contexts.filter((c) => c.hasOwnProperty(Common.getFirstKey(key))).length > 0 : isVariable(key);
                    if (isVar) {
                        source = replaceAt(source, key, `${referenceSelf}${key}`, indexStart, indexEnd);
                    }
                }
            });
        }
        try {
            return function executeCode(str) {
                (contexts || []).forEach((c) => Object.keys(c).forEach((key) => {
                    if (!this[key]) {
                        this[key] = c[key];
                    }
                }));
                return eval(str);
            }.call({}, source);
        } catch (e) { console.error(e); }
    }
}
