import 'object.observe';
import {Component} from "./component";
import { ComponentInstance } from './component.instance';
import {Constants} from "./constants";
import evalContext from './eval';
const packageJson = require("../package.json");

(function(capivara) {
    if (!capivara) {

        window["capivara"] = {
            $eval: evalContext,
            /**
             * @name capivara.components
             * @description Armazena os componentes criados
             */
            scopes: [],
            components: {},
            $watchers: [],
            /**
             * @name capivara.component
             * @description Registra um novo componente capivara
             */
            component(componentName, config) {
                if (window["capivara"].components[componentName]) {
                    console.error("A registered component with this name already exists.");
                    return;
                }
                window["capivara"].components[componentName.toUpperCase()] = new Component(componentName, config);
            },
            /**
             * @name capivara.componentBuilder
             * @description Faz a inicialização de um componente.
             */
            componentBuilder(hashName) {
                let elms = window["capivara"].isElement(hashName) ? [hashName] : Array.from(document.querySelectorAll("[\\#" + hashName + "]"));
                if (elms.length === 0) { console.error("CapivaraJS did not find its component with the hash " + hashName); }
                let instance;
                const findElementAndCreateInstance = () => {
                    elms = window["capivara"].isElement(hashName) ? [hashName] : Array.from(document.querySelectorAll("[\\#" + hashName + "]"));
                    elms.forEach((elm) => {
                        const component = window["capivara"].components[elm.nodeName];
                        if (!component) {
                            console.error("We did not find a registered entry under the name: " + elm.nodeName);
                            return;
                        }
                        if (!instance) { instance = component.createNewInstance(elm); }
                    });
                    return instance;
                };

                return findElementAndCreateInstance();
            },
            /**
             * @name capivara.controller
             * @description Cria um novo controller para fazer manipulação de um determinado elemento.
             */
            controller(elm, callback) {
                new ComponentInstance(elm, { controller: callback }).build();
            },
            /**
             * @name capivara,isArray
             * @description Verifica se um valor é um Array.
             */
            isArray(value) {
                return Array.isArray(value) || value instanceof Array;
            },
            /**
             * @name capivara,isObject
             * @description Verifica se um valor é um Objeto.
             */
            isObject(value) {
                return value !== null && typeof value === "object";
            },
            isObjectConstructor(obj) {
                if (!obj) {
                    return false;
                }
                return obj.__proto__.constructor.name === 'Object';
            },
            /**
             * @name capivara,isDate
             * @description Verifica se um valor é uma Data.
             */
            isDate(value) {
                return toString.call(value) === "[object Date]";
            },
            /**
             * @name capivara,isElement
             * @description Verifica se um valor é um NodeElement.
             */
            isElement(value) {
                return !!(value &&
                    (value.nodeName  // We are a direct element.
                        || (value.prop && value.attr && value.find)));
            },
            /**
             * @name capivara,isFunction
             * @description Verifica se um valor é uma função.
             */
            isFunction(value) {
                return typeof value === "function";
            },
            /**
             * @name capivara,isNumber
             * @description Verifica se um valor é um número.
             */
            isNumber(value) {
                return typeof value === "number";
            },
            /**
             * @name capivara,isString
             * @description Verifica se um valor é uma string.
             */
            isString(value) {
                return typeof value === "string";
            },
            /**
             * @name capivara,merge
             * @description Faz a junção de objetos em um único objeto.
             */
            merge(...args) {
                return (Object.assign as any)(...args);
            },
            /**
             * @name capivara,copy
             * @description Faz a copia de um objeto para que seja criada a referência.
             */
            copy(value) {
                return Object.assign(value);
            },
            /**
             * @name capivara,replaceAll
             * @description Faz a devida alteração em todas as  ocorrências
             */
            replaceAll(str, needle, replacement) {
                return str.split(needle).join(replacement);
            },
            /**
             * @name capivara,constants
             * @description Modifica o nome das diretivas que são criadas pelo capivara.
             */
            constants(obj) {
                Object.keys(obj).forEach((key) => {
                    if (Constants[key]) { Constants[key] = obj[key]; }
                });
            },
            $on(evtName, callback) {
                window["capivara"].$watchers.push({evtName, callback});
            },
            $emit(evtName, ...args) {
                window["capivara"]
                    .$watchers
                    .filter((watcher) => watcher.evtName === evtName)
                    .forEach((watcher) => {
                        watcher.callback(...args);
                    });
            },
            version: packageJson.version,
        };
        document.addEventListener("DOMNodeRemoved", (evt) => window["capivara"].$emit("DOMNodeRemoved", evt));
    } else {
        console.warn("CapivaraJS tried to load more than once.");
    }

})(window["capivara"]);

export default window["capivara"];
