import { MapDom } from '../map/map-dom';
import { Constants } from '../constants';
import { eventNames } from 'cluster';

export class Scope {

    //Dados disponíveis nesse escopo
    public scope: any;

    public $parent: Scope;

    public mapDom: MapDom;

    public watchers;

    constructor(_element: HTMLElement){
        if(!_element || !_element.nodeName){
            console.warn('Unable to create a scope, it is necessary to report an html element.');
        }
        this.watchers = new Array();
        this.addScope(_element, this)
        this.mapDom = new MapDom(_element);
        this.scope = {};
        this.createWatcherScope();
    }

    getScopeProxy(){
        return this.scope;
    }

    createWatcherScope(){
        Object['observe'](this.scope, (changes) => this.mapDom.reload());
    }

    /** #Mudar não poderia ser adicionar a referencia do scope do componente no elemento do componente
     * @method void Aplicado um escopo em um elemento HTML.
     * @param element Elemento que será aplicado o escopo
     * @param scope Escopo que será aplicado no elemento
     */
    addScope(element: any, scope: Scope){
        if(element && element.nodeName) element[Constants.SCOPE_ATTRIBUTE_NAME] = scope;
    }
    
    $on = (evtName, callback) => {
        this.watchers.push({ evtName, callback });
    }

    $emit = (evtName, ...args) => {
        this.watchers
        .filter(watcher => watcher.evtName == evtName)
        .forEach(watcher => {
            watcher.callback.call(...args);
        });
    }
    
}
