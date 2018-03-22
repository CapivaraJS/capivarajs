import * as _ from 'lodash';
import 'object.observe';
import WatchJS from 'melanke-watchjs';
import { Constants } from './constants';
import { Common } from './common';
import { ComponentConfig } from './component.config';
import { CPIf } from "./map/directive/cp-if";

export class ComponentInstance {

    config: ComponentConfig;
    element: any;
    contextObj;
    componentScope;
    destroyed: boolean;
    constantsValue = {};
    functionsValue = {};
    bindingsValue = {};

    constructor(_element, _config: ComponentConfig) {
        _config.controllerAs = _config.controllerAs || '$ctrl';
        this.element = _element;
        this.element.$instance = this;
        this.config = _config;
        this.config.controller = this.config.controller || function () { };
        this.element.innerHTML = this.config.template;
        this.destroyed = true;
        this.registerController();
    }

    registerController() {
        window['capivara'].controller(this.element, (scope) => {
            this.componentScope = scope;
        });
    }

    initController() {
        if (this.destroyed) {
            if (this.config.controller) {
                this.componentScope[this.config.controllerAs] = new this.config.controller(this.componentScope);
                Object['observe'](this.componentScope[this.config.controllerAs], (changes) => {
                    Common.getScope(this.element).mapDom.reload();
                });
            }
            this.applyContains();
            this.applyFunctions();
            this.applyBindings();
            if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$onInit) {
                this.componentScope[this.config.controllerAs].$onInit();
            }
            this.destroyed = false;
            Common.getScope(this.element).$emit('$onInit');
        }
    }

    /**
     * @description Renderiza o template no elemento.
     */
    build() {
        if (!this.element.hasAttribute(Constants.IF_ATTRIBUTE_NAME)) {
            this.initController();
        }
        /**
         * @description Olhamos o evento global para ser possível desparar o evento destroy nos controllers.
         */
        window['capivara'].$on('DOMNodeRemoved', () => setTimeout(() => { if (!document.body.contains(this.element)) this.destroy(); }, 0));
    }

    /**
     * @description Função executada quando o elemento é destruído do documento.
     */
    destroy() {
        this.destroyed = true;
        if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$destroy) {
            this.componentScope[this.config.controllerAs].$destroy();
        }
    }


    /**
     * @description
     * @param obj Contexto dos bindings, o contexto é o objeto que possui os valores dos bindings
     */
    context(obj) {
        this.contextObj = obj;
        return this;
    }

    /**
     * @description Cria os bindings que o componente espera.
     * @param _bindings Objeto com o nome dos bindings
     */
    bindings(_bindings = {}) {
        if (!this.contextObj) {
            console.error('Bindings ainda não aplicados. Primeiro, é necessário informar o contexto.');
            return this;
        }
        this.bindingsValue = _bindings;
        return this;
    }

    applyBindings() {
        (this.config.bindings || []).forEach(key => {
            if (this.bindingsValue[key]) {
                this.setAttributeValue(this.bindingsValue, key);
                this.createObserverContext(this.bindingsValue, key);
                this.createObserverScope(this.bindingsValue, key);
            }
        });
    }

    /**
    * @description Observa o componente quando houver alteração é modificado o contexto
    */
    createObserverScope(_bindings, key) {
        WatchJS.watch(Common.getScope(this.element).scope[this.config.controllerAs]['$bindings'], key,
            () => {
                _.set(this.contextObj, _bindings[key], Common.getScope(this.element).scope[this.config.controllerAs]['$bindings'][key]);
                Common.getScope(this.element).mapDom.reload();
            });

        //Mantém compatibilidade
        WatchJS.watch(Common.getScope(this.element).scope['$bindings'], key,
            () => {
                _.set(this.contextObj, _bindings[key], Common.getScope(this.element).scope['$bindings'][key]);
                Common.getScope(this.element).mapDom.reload();
            });
    }

    /**
     * @description Observa o contexto, quando houver alteração é modificado no escopo do componente
     */
    createObserverContext(_bindings, key) {
        WatchJS.watch(this.contextObj, this.getFirstAttribute(_bindings, key),
            () => {
                this.setAttributeValue(_bindings, key);
            });
    }

    getFirstAttribute(_bindings, key) {
        return _bindings[key].indexOf('.') != -1 ? _bindings[key].substring(0, _bindings[key].indexOf('.')) : _bindings[key];
    }

    setAttributeValue(_bindings, key) {
        _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$bindings.' + key, _.get(this.contextObj, _bindings[key]));
        //Mantém compatibilidade
        _.set(Common.getScope(this.element).scope, '$bindings.' + key, _.get(this.contextObj, _bindings[key]));
        Common.getScope(this.element).mapDom.reload();
    }

    /**
     * @description Crie valores sem referências
     * @param _constants Objeto com o nome das constants
     */
    constants(_constants) {
        this.constantsValue = _constants;
        return this;
    }

    applyContains() {
        (this.config.constants || []).forEach(key => {
            if (this.constantsValue[key]) {
                _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants.' + key, this.constantsValue[key]);
                //Mantém compatibilidade
                _.set(Common.getScope(this.element).scope, '$constants.' + key, this.constantsValue[key]);
            }
        });
    }

    functions(_functions) {
        this.functionsValue = _functions;
        return this;
    }

    applyFunctions() {
        (this.config.functions || []).forEach(key => {
            if (this.functionsValue[key]) {
                _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions.' + key, this.functionsValue[key]);
                //Mantém compatibilidade
                _.set(Common.getScope(this.element).scope, '$functions.' + key, this.functionsValue[key]);
            }
        });
    }

}