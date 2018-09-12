import WatchJS from 'melanke-watchjs';
import { Common } from '../common';
import { Constants } from '../constants';
import { Capivara } from '../index';
import { ScopeProxy } from '../scope/scope.proxy';
import { ComponentConfig } from './component.config';
import { Controller } from './controller';
import { Magic } from './magic/magic';
import { Observe } from './observer';

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
      this.destroyed = false;
      if (this.config.controller) {
        const args = [
          this.componentScope.element[Constants.SCOPE_ATTRIBUTE_NAME],
          this.componentScope.mapDom.element,
          this.componentScope.mapDom,
        ];
        this.componentScope[this.config.controllerAs] = new this.config.controller(...args);
      }
      this.contextObj = Magic.getContext(this.element);
      this.applyConstantsComponentMagic();
      this.applyFunctionsComponentMagic();
      this.applyBindingsComponentMagic();
      if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$onInit) {
        this.componentScope[this.config.controllerAs].$onInit();
      }
      Object.defineProperty(this.componentScope, '__$controllerAs__', {
        value: this.config.controllerAs,
        configurable: true,
      });
      const context = Common.getScope(this.element);
      context.$emit('$onInit');
      context.mapDom.reload();
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
    const context = Common.getScope(this.element);
    if (context.scope.$ctrl.$onBuild) {
      context.scope.$ctrl.$onBuild();
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
    Observe.unobserve(this.componentScope[this.config.controllerAs]);
    if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$destroy) {
      this.componentScope[this.config.controllerAs].$destroy();
    }
    if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$onDestroy) {
      this.componentScope[this.config.controllerAs].$onDestroy();
    }
    try {
      window['capivara'].scopes = window['capivara'].scopes.filter((scope) => {
        return scope.id !== this.componentScope.element[Constants.SCOPE_ATTRIBUTE_NAME].id &&
          scope.id !== this.contextObj.element[Constants.SCOPE_ATTRIBUTE_NAME].id;
      });
    } catch (e) { }
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
    this.createObserverScope(this.bindingsValue);
  }

  public applyBindingsComponentMagic() {
    if (!Common.getScope(this.element).scope[this.config.controllerAs]['$bindings']) {
      Common.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$bindings', {});
      Common.set(Common.getScope(this.element).scope, '$bindings', {});
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
    this.createObserverScope(this.bindingsValue);
  }

  /**
  * @description Observa o componente quando houver alteração é modificado o contexto
  */
  public createObserverScope(_bindings = {}) {
    const $ctrl = Common.getScope(this.element).scope[this.config.controllerAs];
    Object.defineProperty($ctrl, '_$$checkBindings', {
      value: (changes) => {
        changes.forEach((change) => {
          if (change.type === 'update' && _bindings.hasOwnProperty(change.name)) {
            Common.set(this.contextObj, _bindings[change.name], change.object[change.name]);
            this.forceUpdateContext();
          }
        });
      },
      writable: true,
      configurable: true,
    });
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
    Observe.observe(obj, () => {
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
      const attrToObserve = ComponentInstance.getFirstAttribute(_bindings, key);
      WatchJS.watch(this.contextObj, attrToObserve,
        () => {
          this.setAttributeValue(_bindings, key);
        }, 1);
    }
  }

  public setAttributeRecursive(element, bindKey) {
    const scope = Common.getScope(element).scope;
    const bindKeyFormatted = bindKey.replace(/([A-Z])/g, "-$1").toLowerCase();
    Object.keys((Capivara.components)).forEach((key) => {
      const componentName = key.toLowerCase();
      const components = Array.from(this.element.querySelectorAll(componentName));
      components.forEach((component: any) => {
        if (component.firstChild) {
          const componentCtx = Common.getScope(component.firstChild).scope;
          Common.set(componentCtx[this.config.controllerAs], '$bindings.' + bindKey, Common.get(scope, component.getAttribute(bindKeyFormatted)));
        }
      });
    });
  }

  public setAttributeValue(_bindings = {}, key) {
    const parentRepeat = Common.parentHasRepeat(this.element), scope = Common.getScope(this.element).scope;

    if (this.contextObj instanceof ScopeProxy && _bindings[key].startsWith(this.config.controllerAs) && parentRepeat) {
      const ctx = Common.getScope(parentRepeat);
      if (ctx.$parent) {
        Common.set(scope, this.config.controllerAs + '.$bindings.' + key, Common.get(ctx.$parent.scope, _bindings[key]));
        Common.set(scope, '$bindings.' + key, Common.get(ctx.$parent.scope, _bindings[key]));
      }
    } else {
      Common.set(scope[this.config.controllerAs], '$bindings.' + key, Common.get(this.contextObj, _bindings[key]));
      Common.set(scope, '$bindings.' + key, Common.get(this.contextObj, _bindings[key]));
    }

    this.setAttributeRecursive(this.element, key);

    if (scope[this.config.controllerAs] && scope[this.config.controllerAs].$onChanges) {
      scope[this.config.controllerAs].$onChanges();
    }
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
      Common.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants', {});
      Common.set(Common.getScope(this.element).scope, '$constants', {});
    }
    (this.config.constants || []).forEach((constantKey) => {
      const bindAttribute = constantKey.replace(/([A-Z])/g, "-$1").toLowerCase();
      const valueAttribute = this.element.getAttribute(bindAttribute);
      if (valueAttribute) {
        const constantValue = Common.evalInContext(valueAttribute, this.contextObj);
        Common.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants.' + constantKey, constantValue);
        Common.set(Common.getScope(this.element).scope, '$constants.' + constantKey, constantValue);
      }
    });
  }

  public applyConstantsComponentBuilder() {
    (this.config.constants || []).forEach((key) => {
      Common.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$constants.' + key, this.constantsValue[key]);
      // Mantém compatibilidade
      Common.set(Common.getScope(this.element).scope, '$constants.' + key, this.constantsValue[key]);
    });
  }

  public functions(_functions = {}) {
    this.functionsValue = _functions;
    return this;
  }

  public applyFunctionsComponentMagic() {
    if (!Common.getScope(this.element).scope[this.config.controllerAs]['$functions']) {
      Common.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions', {});
      Common.set(Common.getScope(this.element).scope, '$functions', {});
    }
    (this.config.functions || []).forEach((functionKey) => {
      const bindAttribute = functionKey.replace(/([A-Z])/g, "-$1").toLowerCase();
      const valueAttribute = this.element.getAttribute(bindAttribute);
      if (valueAttribute) {
        const indexRelative = valueAttribute.indexOf('(');
        const callback = indexRelative !== -1 ? Common.get(this.contextObj, valueAttribute.substring(0, indexRelative)) : Common.get(this.contextObj, valueAttribute);
        if (callback) {
          Object.defineProperty(callback, '__ctx__', {
            value: this.contextObj,
            configurable: true,
          });
          Common.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions.' + functionKey, callback);
          Common.set(Common.getScope(this.element).scope, '$functions.' + functionKey, callback);
        }
      }
    });
  }

  public applyFunctionsComponentBuilder() {
    (this.config.functions || []).forEach((key) => {
      Common.set(Common.getScope(this.element).scope, this.config.controllerAs + '.$functions.' + key, this.functionsValue[key]);
      Common.set(Common.getScope(this.element).scope, '$functions.' + key, this.functionsValue[key]);
    });
  }

}
