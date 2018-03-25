import WatchJS from 'melanke-watchjs';
import { MapDom } from '../map/map-dom';
import { Scope } from './scope';

export class ScopeProxy {

    public scope: Scope;
    public mapDom: MapDom;
    public element: HTMLElement;

    constructor(_scope: Scope, _mapDom: MapDom, _element: HTMLElement) {
        this.scope = _scope;
        this.mapDom = _mapDom;
        this.element = _element;
        this.createWatcherScope(this);
    }

    public createWatcherScope(objectObserve) {
        if (this.element['$instance']) {
            WatchJS.watch(objectObserve, this.element['$instance'].config.controllerAs, () => this.mapDom.reload());
        }
    }

}
