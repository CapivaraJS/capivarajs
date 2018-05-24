import smartObserve from 'smart-observe';
import { Common } from '../common';
import { Constants } from '../constants';
import { CapivaraElement } from '../core/element';
import { Eval } from '../core/eval';
import { Magic } from '../core/magic/magic';
import { MapDom } from '../map/map-dom';
import observe from './observer';
import { ScopeProxy } from './scope.proxy';

export class Scope {

    // Dados disponíveis nesse escopo
    public scope: ScopeProxy;

    public $parent: Scope;

    public mapDom: MapDom;

    public watchers;

    public observers = [];

    public id;

    private cpElements = {};

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
                watcher.callback.call(this, ...args);
            });
    }

    public $eval = (source) => {
        return Eval.exec(this.scope, source);
    }

    public verifyWatchers(change) {
        if (change && change.name) {
            this.observers.forEach((observer) => {
                if (observer.key === change.name) {
                    observer.callback.call(observer.ctx, change.object[change.name], change.oldValue);
                }
            });
        }
    }

    public $watch(key: string, callback?, ctx?) {
        this.observers.push({
            key,
            callback,
            ctx,
        });
    }

    public element(element) {
        if (this.cpElements[element] && this.cpElements[element].element === element) {
            return this.cpElements[element];
        }
        const capivaraElement = new CapivaraElement(element);
        this.cpElements[element] = capivaraElement;
        return capivaraElement;
    }

    public destroy() {
        Object.keys(this.cpElements).forEach((key) => {
            this.cpElements[key].destroy();
        });
    }

}
