import { MapDom } from '../../map/map-dom';
import { Scope } from '../scope';
import { ScopeProxy } from '../scope.proxy';
import observeDefineProperty from './define-property';
import globalFun from './global';

globalFun(typeof global === "object" && global ? global : this);
observeDefineProperty();

const nestObject2Array = (obj, parent?, key?) => {
    const nodes = [{ key, value: obj, length: 0, parent: { key: '', value: parent, length: 0 } }],
        arr = [];
    let k, node, nodeKey;
    while (nodes.length) {
        node = nodes.pop();
        nodeKey = node.key;
        const nodeValue = node.value;
        arr.push(node);
        if (typeof nodeValue === 'object') {
            /* tslint:disable */
            for (k in nodeValue) {
                if (!window['capivara'].isElement(nodeValue[k]) 
                    && !(nodeValue[k] instanceof ScopeProxy)
                    && !(nodeValue[k] instanceof Scope)
                    && !(nodeValue[k] instanceof MapDom)) {
                        console.log(nodeValue[k]);
                        // nodes.push({ key: k, value: nodeValue[k], parent: node, length: 0 });
                        // node.length++;
                }
            };
            /* tslint:enable */
        }
    }
    return arr;
};

const observeProperty = (obj, prop, updates, callback) => {
    let _value: any = obj[prop];
    Object.defineProperty(obj, prop, {
        get: () => {
            return _value;
        },
        set: (value) => {
            const oldValue = _value;
            const o = {
                name: prop,
                object: obj,
                type: 'updated',
                oldValue: _value,
            };
            _value = value;
            Object.defineProperty(o, 'value', {
                get: () => {
                    return _value;
                },
                set: (newValue) => {
                    _value = newValue;
                },
            });
            callback(o);
        },
    });
};

const observe = (object, callback) => {
    let arr = nestObject2Array(object);
    let obj, parent, item, desc, childLen, childArr, len = arr.length;

    while (len--) {
        item = arr[len];
        const k = item.key;
        parent = item.parent ? item.parent.value : window;
        const updates = [];
        if (k) {
            observeProperty(parent, k, updates, callback);
        }
    }

    const detectNewProp = () => {
        len = arr.length;
        while (len--) {
            item = arr[len];
            if (item) {
                obj = item.value;
                let k = item.key;
                parent = item.parent ? item.parent.value : window;
                if (parent && !parent[k]) {// trigger delete
                    callback({
                        name: k,
                        object: parent,
                        type: 'delete',
                        oldValue: item.value,
                    });
                    delete arr[len];
                }
                if (typeof (obj) === 'object') {
                    console.log(obj);
                    for (k in obj) {
                        if (obj.hasOwnProperty(k)) {
                            desc = Object.getOwnPropertyDescriptor(obj, k);
                            if (!desc.get && !desc.set) {
                                childArr = nestObject2Array(obj[k], obj, k);
                                childLen = childArr.length;
                                while (childLen--) {
                                    const updates = [],
                                        o = childArr[childLen],
                                        ok = o.key,
                                        ov = o.value,
                                        op = o.parent ? o.parent.value : obj;
                                    callback({
                                        name: ok,
                                        object: op,
                                        type: 'new',
                                        oldValue: '',
                                        value: ov,
                                    });
                                    observeProperty(op, ok, updates, callback);
                                }
                                arr = arr.concat(childArr);
                            }
                        }
                    }
                }
            }
        }
        const isolateId = setImmediate(detectNewProp);
    };
    const id = setImmediate(detectNewProp);
};

export default observe;
