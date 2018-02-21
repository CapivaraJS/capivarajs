import { Controller } from './controller';
import { Constants } from './constants';
import { Component } from './component';

const packageJson = require('../package.json');

(function (capivara) {

    if (!capivara) {

        window['capivara'] = {
            /**
             * @name capivara.components
             * @description Armazena os componentes criados 
             */
            components: {},
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
             * @name capivara.initComponent
             * @description Faz a inicialização de um componente.
             */
            initComponent: function(hashName){
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
             * @name capivara,constants
             * @description Modifica o nome das diretivas que são criadas pelo capivara.
             */
            constants: function (obj) {
                Object.keys(obj).forEach(key => {
                    if (Constants[key]) Constants[key] = obj[key];
                });
            },
            version: packageJson.version
        }

    } else {
        console.warn('CapivaraJS tried to load more than once.');
    }

})(window['capivara']);