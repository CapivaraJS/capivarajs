import { ScopeProxy } from './scope.proxy';
import { MapDom } from '../map/map-dom';
import { Constants } from '../constants';
import { setTimeout } from 'timers';

export class Scope {

    //Dados disponíveis nesse escopo
    public scope: ScopeProxy;

    public $parent: Scope;

    public mapDom: MapDom;

    public watchers;

    constructor(_element: HTMLElement){
        if(!_element || !_element.nodeName){
            console.warn('Unable to create a scope, it is necessary to report an html element.');
        }
        this.watchers = new Array();
        this.applyScopeInElement(_element, this);
        this.mapDom = new MapDom(_element);
        this.scope = new ScopeProxy({}, this);
        setTimeout(() => this.executeOnInit(), 0);
    }

    getScopeProxy(){
        return this.scope;
    }

    /**
     * @method void Aplicado um escopo em um elemento HTML.
     * @param element Elemento que será aplicado o escopo
     * @param scope Escopo que será aplicado no elemento
     */
    applyScopeInElement(element: any, scope: Scope){
        if(element && element.nodeName) element[Constants.SCOPE_ATTRIBUTE_NAME] = scope;
    }

    executeOnInit(){
        this.watchers
            .filter(watcher => watcher.event == '$onInit')
            .forEach(watcher => watcher.callback());
    }

    $on = (event, callback) => {
        this.watchers.push({ event, callback });
    }
    
}
