import { Controller } from './controller';
import { Constants } from './constants';
import { Component } from './component';

const packageJson = require('../package.json');

(function (capivara) {

    if (!capivara) {

        window['capivara'] = {
            components: {},
            component: function (componentName, config) {
                if (window['capivara'].components[componentName]) {
                    console.error('A registered component with this name already exists.');
                    return;
                }
                window['capivara'].components[componentName.toUpperCase()] = new Component(componentName, config);
            },
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
            controller: function () {
                Controller.apply(this, arguments)
            },
            constants: function (obj) {
                Object.keys(obj).forEach(key => {
                    if (Constants[key]) Constants[key] = obj[key];
                });
            },
            version: packageJson.version
        }

            // var observer = new MutationObserver(function (mutations) {
            //     mutations.forEach(function (mutation) {
            //         if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            //             Object.keys(window['capivara'].components).forEach(componentName => {
            //                 Array.from(document.querySelectorAll(componentName.toLowerCase())).forEach(element => {
            //                     window['capivara'].components[componentName].createNewInstance(element);
            //                 });
            //             });
            //         }
            //     });
            // });

            // var config = {
            //     attributes: true,
            //     childList: true,
            //     subtree: true,
            //     characterData: true
            // };

            // observer.observe(document.body, config);

    } else {
        console.warn('CapivaraJS tried to load more than once.');
    }

})(window['capivara']);