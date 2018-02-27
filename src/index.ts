import { Controller } from './controller';
import { Constants } from './constants';
import { Component } from './component';
import { throws } from 'assert';

const packageJson = require('../package.json');

(function (capivara) {

    if (!capivara) {
        
        window['capivara'] = {
            /**
             * @name capivara.components
             * @description Armazena os componentes criados 
             */
            components: {},
            $watchers: [],
            /**
             * @name capivara.component
             * @description Registra um novo componente capivara
             */
            component: function (componentName, config) {
                if (window['capivara'].components[componentName]) {
                    console.error('A registered component with this name already exists.');
                    return;
                }
                window['capivara'].components[componentName.toUpperCase()] = new Component(componentName, config);
            },
            /**
             * @name capivara.componentBuilder
             * @description Faz a inicialização de um componente.
             */
            componentBuilder: function(hashName){
                let elms = Array.from(document.querySelectorAll('[\\#'+hashName+']'));
                if(elms.length == 0) console.error('CapivaraJS did not find its component with the hash ' + hashName);
                let instance;
                elms.forEach(elm => {
                    let component = window['capivara'].components[elm.nodeName];
                    if(!component) {
                        console.error('We did not find a registered entry under the name: '+elm.nodeName);
                        return;
                    }
                    if(!instance) instance = component.createNewInstance(elm);
                });
                return instance;
            },
            /**
             * @name capivara.controller
             * @description Cria um novo controller para fazer manipulação de um determinado elemento.
             */
            controller: function () {
                Controller.apply(this, arguments);
            },
            /**
             * @name capivara,isArray
             * @description Verifica se um valor é um Array.
             */
            isArray: function(value) {
                return Array.isArray(value) || value instanceof Array;
            },
            /**
             * @name capivara,isObject
             * @description Verifica se um valor é um Objeto.
             */
            isObject: function(value){
                return value !== null && typeof value === 'object';
            },
            /**
             * @name capivara,isDate
             * @description Verifica se um valor é uma Data.
             */
            isDate: function(value){
                return toString.call(value) === '[object Date]';
            },
            /**
             * @name capivara,isElement
             * @description Verifica se um valor é um NodeElement.
             */
            isElement: function(value){
                return !!(value &&
                    (value.nodeName  // We are a direct element.
                    || (value.prop && value.attr && value.find)));
            },
            /**
             * @name capivara,isFunction
             * @description Verifica se um valor é uma função.
             */
            isFunction: function(value){
                return typeof value === 'function';
            },
            /**
             * @name capivara,isNumber
             * @description Verifica se um valor é um número.
             */
            isNumber: function(value){
                return typeof value === 'number';
            },
            /**
             * @name capivara,isString
             * @description Verifica se um valor é uma string.
             */
            isString: function(value){
                return typeof value === 'string';
            },
            /**
             * @name capivara,merge
             * @description Faz a junção de objetos em um único objeto.
             */
            merge: function(...args){
                return (Object.assign as any)(...args);
            },
            /**
             * @name capivara,copy
             * @description Faz a copia de um objeto para que seja perdida a referência.
             */
            copy(value){
                return Object.assign({}, value);
            },
            /**
             * @name capivara,replaceAll
             * @description Faz a devida alteração em todas as  ocorrências
             */
            replaceAll: function(str, needle, replacement){
                return str.split(needle).join(replacement);
            },
            /**
             * @name capivara,constants
             * @description Modifica o nome das diretivas que são criadas pelo capivara.
             */
            constants: function (obj) {
                Object.keys(obj).forEach(key => {
                    if (Constants[key]) Constants[key] = obj[key];
                });
            },
            $on: function(evtName, callback){
                window['capivara'].$watchers.push({ evtName, callback });
            },
            $emit: function(evtName, ...args){
                window['capivara']
                    .$watchers
                    .filter(watcher => watcher.evtName == evtName)
                    .forEach(watcher => {
                        watcher.callback.call(...args);
                    });
            },
            version: packageJson.version
        };

        let onNodeRemove = (evt) => window['capivara'].$emit('DOMNodeRemoved');
        document.addEventListener('DOMNodeRemoved', onNodeRemove);

    } else {
        console.warn('CapivaraJS tried to load more than once.');
    }

})(window['capivara']);