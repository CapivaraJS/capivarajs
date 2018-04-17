import * as _ from 'lodash';
import WatchJS from 'melanke-watchjs';
import { Common } from '../common';
import { Constants } from '../constants';
import { ComponentConfig } from './component.config';
import { Controller } from './controller';
import { Observe } from './observer';

export class ComponentInstance {

    public config: ComponentConfig;
    public element: any;
    public contextObj;
    public componentScope;
    public destroyed: boolean;
    public constantsValue = {};
    public functionsValue = {};
    public bindingsValue = {};

    constructor(_element, _config: ComponentConfig) {
        _config.controllerAs = _config.controllerAs || '$ctrl';
        this.element = _element;
        this.element.$instance = this;
        this.config = _config;
        this.config.controller = this.config.controller || function () { };
        if (this.config.template) {
            this.element.innerHTML = this.config.template;
        }
        this.destroyed = true;
        this.registerController();
    }

    public registerController() {
        new Controller(this.element, (scope) => {
            this.componentScope = scope;
        });
    }

    public initController() {
        if (this.destroyed) {
            if (this.config.controller) {
                this.componentScope[this.config.controllerAs] = new this.config.controller(this.componentScope);
            }
            this.applyContains();
            this.applyFunctions();
            this.applyBindings();
            if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$onInit) {
                this.componentScope[this.config.controllerAs].$onInit();
            }
            this.destroyed = false;
            Common.getScope(this.element).$emit('$onInit');
            Common.getScope(this.element).mapDom.reload();
        }
    }

    /**
     * @description Renderiza o template no elemento.
     */
    public build() {
        if (!this.element.hasAttribute(Constants.IF_ATTRIBUTE_NAME)) {
            this.initController();
        }
        /**
         * @description Olhamos o evento global para ser possível desparar o evento destroy nos controllers.
         */
        window['capivara'].$on('DOMNodeRemoved', () => setTimeout(() => { if (!document.body.contains(this.element)) { this.destroy(); } }, 0));
    }

    /**
     * @description Função executada quando o elemento é destruído do documento.
     */
    public destroy() {
        Observe.unobserve(this.componentScope[this.config.controllerAs]);
        this.destroyed = true;
        if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$destroy) {
            this.componentScope[this.config.controllerAs].$destroy();
        }
        window['capivara'].scopes = window['capivara'].scopes.filter((scope) => {
            return scope.id !== this.componentScope.scope.id;
        });
    }

    /**
     * @description
     * @param obj Contexto dos bindings, o contexto é o objeto que possui os valores dos bindings
     */
    public context(obj) {
        this.contextObj = obj;
        return this;
    }

    /**
     * @description Cria os bindings que o componente espera.
     * @param _bindings Objeto com o nome dos bindings
     */
    public bindings(_bindings = {}) {
        if (!this.contextObj) {
            console.error('Bindings ainda não aplicados. Primeiro, é necessário informar o contexto.');
            return this;
        }
        this.bindingsValue = _bindings;
        return this;
    }

    public applyBindings() {
        (this.config.bindings || []).forEach((key) => {
            this.setAttributeValue(this.bindingsValue, key);
            this.createObserverContext(this.bindingsValue, key);
            this.createObserverScope(this.bindingsValue, key);
        });
    }

    /**
    * @description Observa o componente quando houver alteração é modificado o contexto
    */
    public createObserverScope(_bindings, key) {
        const $ctrl = Common.getScope(this.element).scope[this.config.controllerAs];

        $ctrl.$$checkBindings = (changes) => {
            _.set(this.contextObj, _bindings[key], $ctrl['$bindings'][key]);
        };

        WatchJS.watch(Common.getScope(this.element).scope['$bindings'], key,
            () => {
                _.set(this.contextObj, _bindings[key], Common.getScope(this.element).scope['$bindings'][key]);
                Common.getScope(this.element).mapDom.reload();
            });
    }

    /**
     * @description Observa o contexto, quando houver alteração é modificado no escopo do componente
     */
    public static getFirstAttribute(_bindings, key) {
        return _bindings[key].indexOf('.') !== -1 ? _bindings[key].substring(0, _bindings[key].indexOf('.')) : _bindings[key];
    }

    public createObserverContext(_bindings, key) {
        WatchJS.watch(this.contextObj, ComponentInstance.getFirstAttribute(_bindings, key),
            () => {
                this.setAttributeValue(_bindings, key);
            });
    }

    public setAttributeValue(_bindings, key) {
        _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$bindings.' + key, _.get(this.contextObj, _bindings[key]));
        // Mantém compatibilidade
        _.set(Common.getScope(this.element).scope, '$bindings.' + key, _.get(this.contextObj, _bindings[key]));
        Common.getScope(this.element).mapDom.reload();
    }

    /**
     * @description Crie valores sem referências
     * @param _constants Objeto com o nome das constants
     */
    public constants(_constants) {
        this.constantsValue = _constants;
        return this;
    }

    public applyContains() {
        (this.config.constants || []).forEach((key) => {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants.' + key, this.constantsValue[key]);
            // Mantém compatibilidade
            _.set(Common.getScope(this.element).scope, '$constants.' + key, this.constantsValue[key]);
        });
    }

    public functions(_functions) {
        this.functionsValue = _functions;
        return this;
    }

    public applyFunctions() {
        (this.config.functions || []).forEach((key) => {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions.' + key, this.functionsValue[key]);
            // Mantém compatibilidade
            _.set(Common.getScope(this.element).scope, '$functions.' + key, this.functionsValue[key]);
        });
    }

}
