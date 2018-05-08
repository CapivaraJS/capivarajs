import * as _ from 'lodash';
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
            return Eval.exec(source, context, prefix);
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

    export function getAttributeCpMin(element) {
        return element.getAttribute(Constants.MIN_ATTRIBUTE_NAME);
    }

    export function getAttributeCpStep(element) {
        return element.getAttribute(Constants.STEP_ATTRIBUTE_NAME);
    }

    export function getAttributeCpMax(element) {
        return element.getAttribute(Constants.MAX_ATTRIBUTE_NAME);
    }

    export function getAttributeCpMaxLength(element) {
        return element.getAttribute(Constants.MAX_LENGTH_ATTRIBUTE_NAME);
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

    export function getAttributeCpPlaceholder(element) {
        return element.getAttribute(Constants.PLACEHOLDER_ATTRIBUTE_NAME);
    }

    export function getAttributeCpChange(element) {
        return element.getAttribute(Constants.CHANGE_ATTRIBUTE_NAME);
    }

    export function getScope(element) {
        return element[Constants.SCOPE_ATTRIBUTE_NAME];
    }

    export function isComponent(element) {
        const component = window['capivara'].components[element.nodeName.toUpperCase()];
        return component ? true : false;
    }

    export function getScopeParent(element) {
        if (getScope(element)) {
            return getScope(element).scope;
        }
        if (element.parentNode) {
            return getScopeParent(element.parentNode);
        }
    }

    export function executeFunctionCallback(element, attribute, evt?, additionalParameters?) {
        const callback = getCallbackFunc(element, attribute);
        if (callback && !isNative(callback)) {
            const params = attribute.substring(attribute.indexOf('(') + 1, attribute.lastIndexOf(')')), args = [];
            let context = callback.__ctx__ || getScope(element);
            params.split(',').forEach((param) => {
                if (additionalParameters) {
                    const paramValue = additionalParameters[param.trim()];
                    if (paramValue !== undefined) {
                        args.push(paramValue);
                    }
                } else if (param === Constants.EVENT_ATTRIBUTE_NAME) {
                    args.push(evt);
                } else {
                    const valueScope = evalInContext(param, context.scope);
                    args.push(valueScope === undefined ? evalInContext(param, context.scope) : valueScope);
                }
            });
            if (context.mapDom.element.$instance) {
                context = context[context.mapDom.element.$instance.config.controllerAs] || context.scope[context.mapDom.element.$instance.config.controllerAs];
            }
            return callback.call(context, ...args);
        }
    }

    export function getCallbackFunc(element, attribute) {
        const callback = _.get(getScope(element).scope, attribute.substring(0, attribute.indexOf('(')));
        if (!callback && element.parentNode && getScope(element.parentNode)) {
            return getCallbackFunc(element.parentNode, attribute);
        }
        return callback;
    }

    export function isNative(fn) {
        return /{\s*\[native code]\s*}/.test('' + fn);
    }

    export function destroyElement(element, elementComment) {
        element.$$cpDestroyed = true;
        if (element.replaceWith) {
            element.replaceWith(elementComment);
        }
        if (element.$instance) { element.$instance.destroy(); }
    }

    export function createElement(element, elementComment) {
        element.$$cpDestroyed = false;
        if (elementComment.replaceWith) {
            elementComment.replaceWith(element);
        }
        if (element.$instance) { element.$instance.initController(true); }
    }

    export function isValidCondition(element, condition) {
        const scope = isComponent(element) && element.parentNode && element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME] ? getScope(element.parentNode).scope : getScope(element).scope;
        const result = evalInContext(condition, scope);
        return result;
    }

    export function appendBefore(element, elementToInsert) {
        element.parentNode.insertBefore(elementToInsert, element);
    }

    export function appendAfter(element, elementToInsert) {
        element.parentNode.insertBefore(elementToInsert, element.nextSibling);
    }

    export function setScopeId(scope) {
        if (!scope.id) {
            window['capivara'].scopes.push(scope);
            scope.id = window['capivara'].scopes.length;
        }
    }

    export function parentHasIgnore(element) {
        if (element.hasAttribute && element.hasAttribute(Constants.IGNORE_BINDINGS)) { return true; }
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
