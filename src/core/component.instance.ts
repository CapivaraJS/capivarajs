import * as _ from 'lodash';
import WatchJS from 'melanke-watchjs';
import { Common } from '../common';
import { Constants } from '../constants';
import { ComponentConfig } from './component.config';
import { Controller } from './controller';
import { Magic } from './magic/magic';
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
    public listenerContextBindings = {};

    constructor(_element, _config: ComponentConfig) {
        _config.controllerAs = _config.controllerAs || '$ctrl';
        this.element = _element;
        this.element.$instance = this;
        this.config = _config;
        this.config.controller = this.config.controller || function isolatedScope() { };
        this.renderTemplate();
        this.destroyed = true;
        this.registerController();
    }

    public renderTemplate() {
        if (this.config.template) {
            if (DOMParser) {
                const templateToElm: any = new DOMParser().parseFromString(this.config.template, 'text/html');
                const transcludeTemplate = new DOMParser().parseFromString(this.element.innerHTML, 'text/html');
                if (transcludeTemplate && templateToElm && transcludeTemplate.querySelectorAll) {
                    Array.from((transcludeTemplate.querySelectorAll('cp-transclude') || [])).forEach((transclude: any) => {
                        const attrName = transclude.getAttribute('name');
                        const query = transclude.nodeName.toLowerCase() + (attrName ? '[name="' + attrName + '"]' : '');
                        Array.from((templateToElm.querySelectorAll(query) || [])).forEach((transcludeReference: any) => transcludeReference.replaceWith(transclude));
                    });
                    this.element.innerHTML = templateToElm.body.innerHTML;
                } else {
                    this.element.innerHTML = this.config.template;
                }
            } else {
                this.element.innerHTML = this.config.template;
            }
        }
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
            // this.applyContains();
            // this.applyFunctions();
            this.applyBindingsComponentMagic();
            if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$onInit) {
                this.componentScope[this.config.controllerAs].$onInit();
            }
            this.destroyed = false;
            Common.getScope(this.element).$emit('$onInit');
            Common.getScope(this.element).mapDom.reload();
        }
    }

    /**
     * @description Aplica os bindings|constants|functions
     */
    public build() {
        this.applyContainsComponentBuilder();
        this.applyFunctionsComponentBuilder();
        if (this.contextObj) {
            this.applyBindingsComponentBuilder();
        }
        if (Common.getScope(this.element).scope.$ctrl.$onBuild) {
            Common.getScope(this.element).scope.$ctrl.$onBuild();
        }
    }

    /**
     * @description Renderiza o template no elemento.
     */
    public create() {
        this.initController();
    }

    /**
     * @description Função executada quando o elemento é destruído do documento.
     */
    public destroy() {
        this.destroyed = true;
        Observe.unobserve(this.componentScope[this.config.controllerAs]);
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
        this.bindingsValue = Object.assign(this.bindingsValue, _bindings);
        return this;
    }

    public applyBindingsComponentBuilder() {
        (this.config.bindings || []).forEach((key) => {
            this.setAttributeValue(this.bindingsValue, key);
            this.createObserverContext(this.bindingsValue, key);
            this.createObserverScope(this.bindingsValue, key);
        });
    }

    public applyBindingsComponentMagic() {
        this.contextObj = Magic.getContext(this.element);
        (this.config.bindings || []).forEach((bindingKey) => {
            const bindAttribute = bindingKey.replace(/([A-Z])/g, "-$1").toLowerCase();
            const valueAttribute = this.element.getAttribute(bindAttribute);
            if (valueAttribute) {
                this.bindingsValue[bindingKey] = valueAttribute;
                this.setAttributeValue(this.bindingsValue, bindingKey);
                this.createObserverContext(this.bindingsValue, bindingKey);
                this.createObserverScope(this.bindingsValue, bindingKey);
            }
        });
    }

    /**
    * @description Observa o componente quando houver alteração é modificado o contexto
    */
    public createObserverScope(_bindings = {}, key) {
        const $ctrl = Common.getScope(this.element).scope[this.config.controllerAs];

        $ctrl._$$checkBindings = (changes) => {
            changes.forEach((change) => {
                if (change.type === 'update' && _bindings.hasOwnProperty(change.name)) {
                    _.set(this.contextObj, _bindings[change.name], $ctrl['$bindings'][change.name]);
                    this.forceUpdateContext();
                    Common.getScope(this.element).mapDom.reload();
                }
            });
        };

    }

    private forceUpdateContext() {
        if (this.contextObj) {
            if (this.contextObj['$forceUpdate']) {
                this.contextObj['$forceUpdate']();
            }
            if (this.contextObj['$apply']) {
                this.contextObj['$apply']();
            }
            if (this.contextObj['forceUpdate']) {
                this.contextObj['forceUpdate']();
            }
            if (window['ng']) {
                const debugContext = window['ng'].probe(this.element);
                if (debugContext) {
                    debugContext.injector.get(window['ng'].coreTokens.ApplicationRef).tick();
                }
            }
        }
    }

    /**
     * @description Observa o contexto, quando houver alteração é modificado no escopo do componente
     */
    public static getFirstAttribute(_bindings = {}, key) {
        return _bindings[key].indexOf('.') !== -1 ? _bindings[key].substring(0, _bindings[key].indexOf('.')) : _bindings[key];
    }

    public createObserverContext(_bindings, key) {
        if (!_bindings[key]) {
            return;
        }
        const attrToObserve = ComponentInstance.getFirstAttribute(_bindings, key);

        this.listenerContextBindings[attrToObserve] = this.listenerContextBindings[attrToObserve] || [];

        if (this.listenerContextBindings[attrToObserve].length === 0) {
            WatchJS.watch(this.contextObj, attrToObserve,
                () => {
                    this.listenerContextBindings[attrToObserve].forEach((keyListener) => {
                        this.setAttributeValue(_bindings, keyListener);
                    });
                });
        }

        this.listenerContextBindings[attrToObserve].push(key);
    }

    public setAttributeValue(_bindings = {}, key) {
        _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$bindings.' + key, _.get(this.contextObj, _bindings[key]));
        _.set(Common.getScope(this.element).scope, '$bindings.' + key, _.get(this.contextObj, _bindings[key]));
        Common.getScope(this.element).mapDom.reload();
    }

    /**
     * @description Crie valores sem referências
     * @param _constants Objeto com o nome das constants
     */
    public constants(_constants = {}) {
        this.constantsValue = _constants;
        return this;
    }

    public applyContainsComponentBuilder() {
        (this.config.constants || []).forEach((key) => {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants.' + key, this.constantsValue[key]);
            // Mantém compatibilidade
            _.set(Common.getScope(this.element).scope, '$constants.' + key, this.constantsValue[key]);
        });
    }

    public functions(_functions = {}) {
        this.functionsValue = _functions;
        return this;
    }

    public applyFunctionsComponentBuilder() {
        (this.config.functions || []).forEach((key) => {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions.' + key, this.functionsValue[key]);
            _.set(Common.getScope(this.element).scope, '$functions.' + key, this.functionsValue[key]);
        });
    }

}
