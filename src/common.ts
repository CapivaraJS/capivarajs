import * as _ from 'lodash';
import capivara from './';
import { Constants } from './constants';
import { Eval } from './core';

export namespace Common {

  export function regexIndexOf(str, regex, startPos?) {
    const indexOf = str.substring(startPos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startPos || 0)) : indexOf;
  }

  /**
   * @description Executa o eval alterando as propriedades do source para seus determinados valores dentro do contexto.
   * @param source
   * @param context
   * @param prefix
   */
  export function evalInContext(source, context: any, prefix?) {
    if (source) {
      try {
        return Eval.exec(source, context, prefix);
      } catch (e) { }
    }
  }

  export function getFirstKey(str: string) {
    const firstKey = (str.indexOf('.') !== -1 ? str.substring(0, str.indexOf('.')) : str).replace(/ /g, '');
    return firstKey.split('(').join('').split(')').join('').replace(/!/g, '');
  }

  export function getAttributeCpShow(element) {
    return element.getAttribute(Constants.SHOW_ATTRIBUTE_NAME);
  }

  export function getAttributeCpIf(element) {
    return element.getAttribute(Constants.IF_ATTRIBUTE_NAME);
  }

  export function getAttributeCpElseIf(element) {
    return element.getAttribute(Constants.ELSE_IF_ATTRIBUTE_NAME);
  }

  export function getAttributeCpElse(element) {
    return element.getAttribute(Constants.ELSE_ATTRIBUTE_NAME);
  }

  export function getAttributeCpInit(element) {
    return element.getAttribute(Constants.INIT_ATTRIBUTE_NAME);
  }

  export function getAttributeCpStyle(element) {
    return element.getAttribute(Constants.STYLE_ATTRIBUTE_NAME);
  }

  export function getAttributeCpClass(element) {
    return element.getAttribute(Constants.CLASS_ATTRIBUTE_NAME);
  }

  export function getAttributeCpSrc(element) {
    return element.getAttribute(Constants.SRC_ATTRIBUTE_NAME);
  }

  export function getAttributeCpDisable(element) {
    return element.getAttribute(Constants.DISABLE_ATTRIBUTE_NAME);
  }

  export function getAttributeCpFocus(element) {
    return element.getAttribute(Constants.FOCUS_ATTRIBUTE_NAME);
  }

  export function getAttributeCpHide(element) {
    return element.getAttribute(Constants.HIDE_ATTRIBUTE_NAME);
  }

  export function getAttributeCpBlur(element) {
    return element.getAttribute(Constants.BLUR_ATTRIBUTE_NAME);
  }

  export function getScope(element) {
    return element[Constants.SCOPE_ATTRIBUTE_NAME];
  }

  export function isComponent(element) {
    const component = window['capivara'].components[element.nodeName.toUpperCase()];
    return component ? true : false;
  }

  export function insideComponent(element) {
    if (element && element.parentNode) {
      if (isComponent(element.parentNode)) {
        return true;
      } else {
        return insideComponent(element.parentNode);
      }
    }
    return false;
  }

  export function executeFunctionCallback(element, attribute, additionalParameters?) {
    return evalInMultiContext(element, attribute, additionalParameters);
  }

  export function isNative(fn) {
    return /{\s*\[native code]\s*}/.test('' + fn);
  }

  export function destroyElement(element, elementComment) {
    element.$$cpDestroyed = true;
    if (element.replaceWith) {
      element.replaceWith(elementComment);
    }
    capivara.destroyIfComponent(element);
  }

  export function createElement(element, elementComment) {
    element.$$cpDestroyed = false;
    if (elementComment.replaceWith) {
      elementComment.replaceWith(element);
    }
    capivara.constroyIfComponent(element, true);
  }

  export function getAllScopes(element, scopes = []) {
    if (element && element[Constants.SCOPE_ATTRIBUTE_NAME]) {
      if (scopes.filter((s) => s.id === element[Constants.SCOPE_ATTRIBUTE_NAME].id).length === 0) {
        scopes.push(element[Constants.SCOPE_ATTRIBUTE_NAME]);
      }
    }
    if (element && element.parentNode) {
      return getAllScopes(element.parentNode, scopes);
    }
    return scopes;
  }

  export function evalInMultiContext(element, condition, additionalParameters?) {
    const scopes = getAllScopes(element).map((scope) => scope.scope);
    if (additionalParameters) {
      scopes.push(additionalParameters);
    }
    return evalInContext(condition, scopes);
  }

  export function isValidCondition(element, condition) {
    return evalInMultiContext(element, condition);
  }

  export function appendBefore(element, elementToInsert) {
    element.parentNode.insertBefore(elementToInsert, element);
  }

  export function appendAfter(element, elementToInsert) {
    element.parentNode.insertBefore(elementToInsert, element.nextSibling);
  }

  export function setScopeId(scope) {
    if (!scope.id) {
      capivara.LAST_SCOPE_ID++;
      window['capivara'].scopes.push(scope);
      scope.id = capivara.LAST_SCOPE_ID;
    }
  }

  export function parentHasIgnore(element) {
    if (element.hasAttribute && (element.hasAttribute(Constants.IGNORE_BINDINGS) || element.nodeName === 'CP-TRANSCLUDE')) { return true; }
    if (element.parentNode) { return parentHasIgnore(element.parentNode); }
  }

  export function getFunctionArgs(func) {
    return (func + '')
      .replace(/[/][/].*$/mg, '') // strip single-line comments
      .replace(/\s+/g, '') // strip white space
      .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
      .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters
      .replace(/=[^,]+/g, '') // strip any ES6 defaults
      .split(',').filter(Boolean); // split & filter [""]
  }

}
