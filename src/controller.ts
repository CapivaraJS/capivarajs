import { Scope } from './scope/scope';
import { Constants } from './constants'; 
import { setTimeout } from 'timers';

export class Controller {

    constructor(element?: HTMLElement, callback?: Function){
        let scope = new Scope(element);
        if(element && element.parentNode && element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME]){
            scope.$parent = element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME];
        }
        callback(scope.getScopeProxy());
    }

}