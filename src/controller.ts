import { Scope } from './scope/scope';

export class Controller {

    constructor(element?: HTMLElement, callback?: Function){
        callback(new Scope(element).scope);
    }

}