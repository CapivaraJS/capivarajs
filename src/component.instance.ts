import { Constants } from './constants';
import WatchJS from 'melanke-watchjs';

export class ComponentInstance {

    config: any;
    element: any;
    contextObj;
    
    constructor(_element, _config){
        this.element = _element;
        this.config = _config;
        this.create();
    }

    create(){
        this.element.innerHTML = this.config.template;
        window['capivara'].controller(this.element, this.config.controller);
    }

    setValueContextInScope(key, value){
        this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope[key] = value;
    }

    context(obj){
        this.contextObj = obj;
        return this;
    }

    bindings(_bindings){
        Object.keys(_bindings).forEach(key => {
            if(_bindings[key].context){
                this.setValueContextInScope(key, _bindings[key].context[_bindings[key].property]);
                WatchJS.watch(this.contextObj, _bindings[key], 
                        () => this.setValueContextInScope(key, _.get(this.contextObj, _bindings[key])));

                WatchJS.watch(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, key, 
                        () => { _bindings[key].context[_bindings[key].property] = this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope[key] });
            }
        })
    }

}