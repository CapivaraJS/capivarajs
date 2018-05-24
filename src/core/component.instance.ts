import * as _ from 'lodash';
import smartObserve from 'smart-observe';
import { Common } from '../common';
import { Constants } from '../constants';
import capivara from '../index';
import { ScopeProxy } from '../scope/scope.proxy';
import { ComponentConfig } from './component.config';
import { Controller } from './controller';
import { Magic } from './magic/magic';

export class ComponentInstance {

    public config: ComponentConfig;
    public element: any;
    public contextObj: any;
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
                        Array.from((templateToElm.querySelectorAll(query) || [])).forEach((transcludeReference: any) => {
                            Array.from(transclude.children).forEach((children) => {
                                Common.appendAfter(transcludeReference, children);
                            });
                            transcludeReference.parentNode.removeChild(transcludeReference);
                        });
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
                const args = [
                    this.componentScope.element[Constants.SCOPE_ATTRIBUTE_NAME],
                    this.componentScope.mapDom.element,
                    this.componentScope.mapDom,
                ];
                const controller = new this.config.controller(...args);
                this.componentScope[this.config.controllerAs] = controller;
            }
            this.contextObj = Magic.getContext(this.element);
            this.applyConstantsComponentMagic();
            this.applyFunctionsComponentMagic();
            this.applyBindingsComponentMagic();
            if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$onInit) {
                this.componentScope[this.config.controllerAs].$onInit();
            }
            this.destroyed = false;
            Object.defineProperty(this.componentScope, '__$controllerAs__', {
                value: this.config.controllerAs,
            });
            Common.getScope(this.element).$emit('$onInit');
            Common.getScope(this.element).mapDom.reload();
        }
    }

    /**
     * @description Aplica os bindings|constants|functions
     */
    public build() {
        this.applyConstantsComponentBuilder();
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
        this.element[Constants.SCOPE_ATTRIBUTE_NAME].destroy();
        if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$destroy) {
            this.componentScope[this.config.controllerAs].$destroy();
        }
        capivara.scopes = capivara.scopes.filter((scope) => {
            return scope.id !== this.componentScope.element[Constants.SCOPE_ATTRIBUTE_NAME].id;
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
        });
    }

    public applyBindingsComponentMagic() {
        if (!Common.getScope(this.element).scope[this.config.controllerAs]['$bindings']) {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$bindings', {});
            _.set(Common.getScope(this.element).scope, '$bindings', {});
        }
        (this.config.bindings || []).forEach((bindingKey) => {
            const bindAttribute = bindingKey.replace(/([A-Z])/g, "-$1").toLowerCase();
            const valueAttribute = this.element.getAttribute(bindAttribute);
            if (valueAttribute) {
                this.bindingsValue[bindingKey] = valueAttribute;
                this.setAttributeValue(this.bindingsValue, bindingKey);
                this.createObserverContext(this.bindingsValue, bindingKey);
            }
        });
    }

    public $$checkBindings() {
        const $ctrl = Common.getScope(this.element).scope[this.config.controllerAs];
        let forceUpdate = false;
        Object.keys(this.bindingsValue).forEach((key) => {
            const oldValue = _.get(this.contextObj, this.bindingsValue[key]);
            const newValue = $ctrl['$bindings'][key];
            if (!capivara.equals(oldValue, newValue)) {
                forceUpdate = true;
                _.set(this.contextObj, this.bindingsValue[key], $ctrl['$bindings'][key]);
            }
        });
        if (forceUpdate) {
            this.forceUpdateContext();
        }
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

    public observeAndSetValues(obj, _bindings, key) {
        smartObserve.watch(obj, key, () => {
            this.setAttributeValue(_bindings, key);
        });
    }

    public createObserverContext(_bindings, key) {
        if (!_bindings[key]) {
            return;
        }
        if (this.contextObj instanceof ScopeProxy) {
            if (this.contextObj[this.config.controllerAs]) {
                this.observeAndSetValues(this.contextObj[this.config.controllerAs], _bindings, key);
            } else {
                this.observeAndSetValues(this.contextObj, _bindings, key);
            }
        } else {
            smartObserve.watch(this.contextObj, _bindings[key], (newValue, oldValue) => {
               this.setAttributeValue(_bindings, key);
            });
        }
    }

    public setAttributeValue(_bindings = {}, key) {
        _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$bindings.' + key, _.get(this.contextObj, _bindings[key]));
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

    public applyConstantsComponentMagic() {
        if (!Common.getScope(this.element).scope[this.config.controllerAs]['$constants']) {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants', {});
        }
        (this.config.constants || []).forEach((constantKey) => {
            const bindAttribute = constantKey.replace(/([A-Z])/g, "-$1").toLowerCase();
            const valueAttribute = this.element.getAttribute(bindAttribute);
            if (valueAttribute) {
                const constantValue = Common.evalInContext(valueAttribute, this.contextObj);
                _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants.' + constantKey, constantValue);
            }
        });
    }

    public applyConstantsComponentBuilder() {
        (this.config.constants || []).forEach((key) => {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants.' + key, this.constantsValue[key]);
        });
    }

    public functions(_functions = {}) {
        this.functionsValue = _functions;
        return this;
    }

    public applyFunctionsComponentMagic() {
        if (!Common.getScope(this.element).scope[this.config.controllerAs]['$functions']) {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions', {});
        }
        (this.config.functions || []).forEach((functionKey) => {
            const bindAttribute = functionKey.replace(/([A-Z])/g, "-$1").toLowerCase();
            const valueAttribute = this.element.getAttribute(bindAttribute);
            if (valueAttribute) {
                const indexRelative = valueAttribute.indexOf('(');
                const callback = indexRelative !== -1 ? _.get(this.contextObj, valueAttribute.substring(0, indexRelative)) : _.get(this.contextObj, valueAttribute);
                Object.defineProperty(callback, '__ctx__', {
                    value: this.contextObj,
                });
                _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions.' + functionKey, callback);
            }
        });
    }

    public applyFunctionsComponentBuilder() {
        (this.config.functions || []).forEach((key) => {
            _.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions.' + key, this.functionsValue[key]);
            _.set(Common.getScope(this.element).scope, '$functions.' + key, this.functionsValue[key]);
        });
    }

}
