import { Common } from '../common';
import { Constants } from '../constants';
import { Component } from './component';
import { ComponentInstance } from './component.instance';
import { Controller } from './controller';

const packageJson = require("../../package.json");

export class Capivara {
    /**
     * @name capivara.components
     * @description Armazena os componentes criados
     */
    public scopes;
    public components;
    public $watchers;
    private version;

    constructor() {
        this.version = packageJson.version;
        this.components = {};
        this.scopes = [];
        this.$watchers = [];
        if (!Element.prototype.hasOwnProperty('hasAttributeStartingWith')) {
            Object.defineProperty(Element.prototype, 'hasAttributeStartingWith', {
                value: function hasAttributeStartingWith(attr) {
                    return Array.from(this.attributes).filter((attributeNode: any) => {
                        return attributeNode.nodeName.indexOf(attr) === 0;
                    }).length > 0;
                },
            });
        }
        document.addEventListener("DOMContentLoaded", (event) => {
            this.createComponents();
            this.createListeners();
        });
    }

    private createComponents() {
        Object.keys(this.components).forEach((componentName) => {
            const elms: any = document.querySelectorAll(componentName) || [];
            Array.from(elms).forEach((elm) => {
                this.constroyIfComponent(elm);
            });
        });
    }

    private constroyIfComponent(addedNode) {
        const component = this.components[addedNode.nodeName];
        if (component) {
            component.createNewInstance(addedNode).create();
        }
        if (addedNode.children) {
            (Array.from(addedNode.children) || []).forEach((child) => this.constroyIfComponent(child));
        }
    }

    private destroyIfComponent(removedNode) {
        if (removedNode['$instance'] && !removedNode['$instance'].destroyed) {
            removedNode['$instance'].destroy();
        }
        if (removedNode.children) {
            (Array.from(removedNode.children) || []).forEach((child) => this.destroyIfComponent(child));
        }
    }

    private onMutation(mutations) {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((addedNode) => {
                    this.constroyIfComponent(addedNode);
                });
                mutation.removedNodes.forEach((removedNode) => {
                    this.destroyIfComponent(removedNode);
                });
            }
        });
    }

    private createListeners() {
        const MutationObserver = window['MutationObserver'] || window['WebKitMutationObserver'] || window['MozMutationObserver'];
        const observer = new MutationObserver((mutations) => this.onMutation(mutations));
        observer.observe(document.body, {
            attributes: false,
            childList: true,
            subtree: true,
            characterData: false,
        });
    }

    /**
     * @name capivara.component
     * @description Registra um novo componente capivara
     */
    public component(componentName, config) {
        if (window["capivara"].components[componentName]) {
            console.error("A registered component with this name already exists.");
            return;
        }
        window["capivara"].components[componentName.toUpperCase()] = new Component(componentName, config);
    }
    /**
     * @name capivara.componentBuilder
     * @description Faz a inicialização de um componente.
     */
    public componentBuilder(hashName) {
        return new Promise((resp) => {
            let elms = window["capivara"].isElement(hashName) ? [hashName] : Array.from(document.querySelectorAll("[\\#" + hashName + "]"));
            if (elms.length === 0) { console.error("CapivaraJS did not find its component with the hash " + hashName); }
            let instance;
            const findElementAndCreateInstance = () => {
                elms = window["capivara"].isElement(hashName) ? [hashName] : Array.from(document.querySelectorAll("[\\#" + hashName + "]"));
                (elms || []).forEach((elm) => {
                    const component = window["capivara"].components[elm.nodeName];
                    if (!component) {
                        console.error("We did not find a registered entry under the name: " + elm.nodeName);
                        return;
                    }
                    if (!instance) {
                        instance = elm['$instance'];
                    }
                });
                return instance;
            };
            setTimeout(() => {
                const componentInstance = findElementAndCreateInstance();
                resp(componentInstance);
            });
        });
    }
    /**
     * @name capivara.controller
     * @description Cria um novo controller para fazer manipulação de um determinado elemento.
     */
    public controller(elm, callback) {
        new ComponentInstance(elm, { controller: callback }).create();
    }
    /**
     * @name capivara,isArray
     * @description Verifica se um valor é um Array.
     */
    public isArray(value) {
        return Array.isArray(value) || value instanceof Array;
    }
    /**
     * @name capivara,isObject
     * @description Verifica se um valor é um Objeto.
     */
    public isObject(value) {
        return value !== null && typeof value === "object";
    }
    public isObjectConstructor(obj) {
        if (!obj) {
            return false;
        }
        return obj.__proto__.constructor.name === 'Object';
    }
    /**
     * @name capivara,isDate
     * @description Verifica se um valor é uma Data.
     */
    public isDate(value) {
        return toString.call(value) === "[object Date]";
    }
    /**
     * @name capivara,isElement
     * @description Verifica se um valor é um NodeElement.
     */
    public isElement(value) {
        return !!(value &&
            (value.nodeName  // We are a direct element.
                || (value.prop && value.attr && value.find)));
    }
    /**
     * @name capivara,isFunction
     * @description Verifica se um valor é uma função.
     */
    public isFunction(value) {
        return typeof value === "function";
    }
    /**
     * @name capivara,isNumber
     * @description Verifica se um valor é um número.
     */
    public isNumber(value) {
        return typeof value === "number";
    }
    /**
     * @name capivara,isString
     * @description Verifica se um valor é uma string.
     */
    public isString(value) {
        return typeof value === "string";
    }
    /**
     * @name capivara,merge
     * @description Faz a junção de objetos em um único objeto.
     */
    public merge(...args) {
        return (Object.assign as any)(...args);
    }
    /**
     * @name capivara,copy
     * @description Faz a copia de um objeto para que seja criada a referência.
     */
    public copy(value) {
        return Object.assign(value);
    }
    /**
     * @name capivara,replaceAll
     * @description Faz a devida alteração em todas as  ocorrências
     */
    public replaceAll(str, needle, replacement) {
        return str.split(needle).join(replacement);
    }
    /**
     * @name capivara,constants
     * @description Modifica o nome das diretivas que são criadas pelo capivara.
     */
    public constants(obj) {
        Object.keys(obj).forEach((key) => {
            if (Constants[key]) { Constants[key] = obj[key]; }
        });
    }

    public $on(evtName, callback) {
        window["capivara"].$watchers.push({ evtName, callback });
    }

    public $emit(evtName, ...args) {
        window["capivara"]
            .$watchers
            .filter((watcher) => watcher.evtName === evtName)
            .forEach((watcher) => {
                watcher.callback(...args);
            });
    }
}
