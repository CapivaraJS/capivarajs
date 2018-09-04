import { Constants } from '../constants';
import { Scope } from '../scope/scope';

export class Controller {

    constructor(element?: HTMLElement, callback?) {
        const scope = new Scope(element);
        callback(scope.getScopeProxy());
    }
}
