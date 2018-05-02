import { Observe } from '../core/observer';
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
            objectObserve.scope.$on('$onInit', () => {
                Observe.observe(objectObserve[this.element['$instance'].config.controllerAs], (changes) => {
                    this.mapDom.reload();
                    objectObserve.scope.$emit('$onChanges', changes);
                    this.executeObservers(objectObserve, '$onChanges', changes);
                    this.executeObservers(objectObserve, '_$$checkBindings', changes);
                });
            });
        }
    }

    private executeObservers(objectObserve, observeName, changes) {
        if (objectObserve[this.element['$instance'].config.controllerAs][observeName]) {
            objectObserve[this.element['$instance'].config.controllerAs][observeName](changes);
        }
    }
}
