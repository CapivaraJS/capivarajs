import * as _ from 'lodash';
import { Constants } from './constants';
import evalContext from './eval';
export namespace Common {

    export function regexIndexOf(str, regex, startpos?) {
        const indexOf = str.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    }

    /**
     * @description Executa o eval alterando as propriedades do source para seus determinados valores dentro do contexto.
     * @param source
     * @param context
     */
    export function evalInContext(source, context: any) {
        if (source) {
            return evalContext(source, context);
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

    export function getScope(element) {
        return element[Constants.SCOPE_ATTRIBUTE_NAME];
    }

    export function getScopeParent(element) {
        if (getScope(element)) {
            return getScope(element).scope;
        }
        if (element.parentNode) {
            return getScopeParent(element.parentNode);
        }
    }

    export function executeFunctionCallback(element, attribute) {
        const callback = getCallbackClick(element, attribute);
        if (callback && !isNative(callback)) {
            const params = attribute.substring(attribute.indexOf('(') + 1, attribute.length - 1), args = [];
            let context = getScope(element);
            params.split(',').forEach((param) => {
                const valueScope = evalInContext(param, context.scope);
                args.push(valueScope === undefined ? evalInContext(param, context.scope) : valueScope);
            });
            if (context.mapDom.element.$instance) {
                context = context.scope[context.mapDom.element.$instance.config.controllerAs];
            }
            return callback.call(context, ...args);
        }
    }

    export function getCallbackClick(element, attribute) {
        const callback = _.get(getScope(element).scope, attribute.substring(0, attribute.indexOf('(')));
        if (!callback && element.parentNode && getScope(element.parentNode)) {
            return getCallbackClick(element.parentNode, attribute);
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
        if (element.$instance) { element.$instance.initController(); }
    }

    export function isValidCondition(element, condition) {
        const scope = getScope(element).scope;
        // if (!(element.parentNode && element.parentNode.classList.contains('binding-repeat')) && scope.$parent) {
        //     scope = scope.$parent;
        // }
        return evalInContext(condition, scope);
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

}
