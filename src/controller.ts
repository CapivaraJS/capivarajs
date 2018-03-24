import { Constants } from './constants';
import { Scope } from './scope/scope';

export class Controller {

    constructor(element?: HTMLElement, callback?) {
        const scope = new Scope(element);
        if (element && element.parentNode && element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME]) {
            scope.$parent = element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME];
        }
        callback(scope.getScopeProxy());
    }
}
