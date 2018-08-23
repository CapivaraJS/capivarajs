const packageJson = require('../../package.json');
import { Constants } from '../constants';
import { Scope } from '../scope/scope';
import { Component } from './component';
import { ComponentInstance } from './component.instance';

export class CapivaraInstance {
  /**
   * @name capivara.components
   * @description Armazena os componentes criados
   */
  public scopes;
  public components;
  public $watchers;
  public version;
  public LAST_SCOPE_ID = 0;
  public core;
  public DOMMutation;

  constructor() {
    this.DOMMutation = window['MutationObserver'] || window['WebKitMutationObserver'] || window['MozMutationObserver'];
    this.version = packageJson.version;
    this.components = {};
    this.scopes = [];
    this.$watchers = [];
    if (!Element.prototype.hasOwnProperty('getAttributeStartingWith')) {
      Object.defineProperty(Element.prototype, 'getAttributeStartingWith', {
        value: function hasAttributeStartingWith(attr) {
          return Array.from(this.attributes).filter((attributeNode: any) => {
            return attributeNode.nodeName.indexOf(attr) === 0;
          });
        },
        configurable: true,
      });
    }
    if (!Element.prototype.hasOwnProperty('hasAttributeStartingWith')) {
      Object.defineProperty(Element.prototype, 'hasAttributeStartingWith', {
        value: function hasAttributeStartingWith(attr) {
          return this.getAttributeStartingWith(attr).length > 0;
        },
        configurable: true,
      });
    }

    if (document.readyState === 'complete' ||
      (document.readyState !== 'loading' && !document.documentElement['doScroll'])
    ) {
      setTimeout(() => {
        this.createListeners();
        this.createComponents();
      });
    } else {
      document.addEventListener("DOMContentLoaded", (event) => {
        this.createListeners();
        this.createComponents();
      });
    }
  }

  public createComponents() {
    Object.keys(this.components).forEach((componentName) => {
      const elms: any = document.querySelectorAll(componentName) || [];
      Array.from(elms).forEach((elm) => {
        this.constroyIfComponent(elm);
      });
    });
  }

  public hasRepeat(elm) {
    return elm && elm.classList && elm.classList.contains('binding-repeat');
  }

  public constroyIfComponent(addedNode, forceCreated?) {
    const component = this.components[addedNode.nodeName];
    if (component && (forceCreated || !addedNode.created)) {
      addedNode.created = true;
      component.createNewInstance(addedNode).create();
    }
    if (addedNode.children && (forceCreated || !this.hasRepeat(addedNode))) {
      (Array.from(addedNode.children) || []).forEach((child) => {
        this.constroyIfComponent(child, forceCreated);
      });
    }
  }

  public destroyIfComponent(removedNode) {
    removedNode.created = false;
    if (removedNode['$instance'] && !removedNode['$instance'].destroyed) {
      removedNode['$instance'].destroy();
    }
    if (removedNode.children) {
      (Array.from(removedNode.children) || []).forEach((child) => this.destroyIfComponent(child));
    }
  }

  public onMutation(mutations) {
    (mutations || []).forEach((mutation) => {
      if (mutation.type === 'childList') {
        ((mutation && mutation.addedNodes && mutation.addedNodes.forEach) ? mutation.addedNodes : []).forEach((addedNode) => {
          this.constroyIfComponent(addedNode);
        });
        ((mutation && mutation.removedNodes && mutation.removedNodes.forEach) ? mutation.removedNodes : []).forEach((removedNode) => {
          this.destroyIfComponent(removedNode);
        });
      }
    });
  }

  public createListeners() {
    if (this.DOMMutation) {
      const observer = new this.DOMMutation((mutations) => this.onMutation(mutations));
      observer.observe(document.body, {
        attributes: false,
        childList: true,
        subtree: true,
        characterData: false,
      });
    }
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
   * @name capivara.constants
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

  public simpleCompare(a, b) {
    return a === b || (a !== a && b !== b);
  }

  public isRegExp(value) {
    return toString.call(value) === '[object RegExp]';
  }

  public isDefined(value) {
    return typeof value !== 'undefined';
  }

  public isWindow(value) {
    return value && value.window === value;
  }

  public isScope(value) {
    return value instanceof Scope;
  }

  public equals(o1, o2) {
    if (o1 === o2) { return true; }
    if (o1 === null || o2 === null) { return false; }
    if (o1 !== o1 && o2 !== o2) { return true; }
    /* tslint:disable */
    let t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 === t2 && t1 === 'object') {
      if (this.isArray(o1)) {
        if (!this.isArray(o2)) { return false };
        if ((length = o1.length) === o2.length) {
          for (key = 0; key < length; key++) {
            if (!this.equals(o1[key], o2[key])) return false;
          }
          return true;
        }
      } else if (this.isDate(o1)) {
        if (!this.isDate(o2)) return false;
        return this.simpleCompare(o1.getTime(), o2.getTime());
      } else if (this.isRegExp(o1)) {
        if (!this.isRegExp(o2)) return false;
        return o1.toString() === o2.toString();
      } else {
        if (this.isScope(o1) || this.isScope(o2) || this.isWindow(o1) || this.isWindow(o2) ||
          this.isArray(o2) || this.isDate(o2) || this.isRegExp(o2)) return false;
        keySet = Object.create(null);
        for (key in o1) {
          if (key.charAt(0) === '$' || this.isFunction(o1[key])) continue;
          if (!this.equals(o1[key], o2[key])) return false;
          keySet[key] = true;
        }
        for (key in o2) {
          if (!(key in keySet) &&
            key.charAt(0) !== '$' &&
            this.isDefined(o2[key]) &&
            !this.isFunction(o2[key])) return false;
        }
        return true;
      }
    }
    return false;
  }

}
