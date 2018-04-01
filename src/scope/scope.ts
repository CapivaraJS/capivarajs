import { Common } from '../common';
import { Constants } from '../constants';
import { Eval } from '../core/eval';
import { MapDom } from '../map/map-dom';
import { ScopeProxy } from './scope.proxy';

export class Scope {

    // Dados disponíveis nesse escopo
    public scope: ScopeProxy;

    public $parent: Scope;

    public mapDom: MapDom;

    public watchers;

    public id;

    constructor(_element: HTMLElement) {
        if (!_element || !_element.nodeName) {
            console.warn('Unable to create a scope, it is necessary to report an html element.');
        }
        Common.setScopeId(this);
        this.watchers = [];
        Scope.addScope(_element, this);
        this.mapDom = new MapDom(_element);
        this.scope = new ScopeProxy(this, this.mapDom, _element);
        if (!_element['$instance']) {
            this.$emit('$onInit');
        }
    }

    public getScopeProxy() {
        return this.scope;
    }

    /** #Mudar não poderia ser adicionar a referencia do scope do componente no elemento do componente
     * @method void Aplicado um escopo em um elemento HTML.
     * @param element Elemento que será aplicado o escopo
     * @param scope Escopo que será aplicado no elemento
     */
    public static addScope(element: any, scope: Scope) {
        if (element && element.nodeName) { element[Constants.SCOPE_ATTRIBUTE_NAME] = scope; }
    }

    public $on = (evtName, callback) => {
        this.watchers.push({ evtName, callback });
    }

    public $emit = (evtName, ...args) => {
        this.watchers
            .filter((watcher) => watcher.evtName === evtName)
            .forEach((watcher) => {
                watcher.callback.call(...args);
            });
    }

    public $eval = (source) => {
        return Eval.exec(this.scope, source);
    }

}
