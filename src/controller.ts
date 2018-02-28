import { Scope } from './scope/scope';
import { Constants } from './constants'; 

export class Controller {

    constructor(element?: HTMLElement, callback?){
        let scope = new Scope(element);
        if(element && element.parentNode && element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME]){
            scope.$parent = element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME];
        }
        new callback(scope.getScopeProxy());
    }

}