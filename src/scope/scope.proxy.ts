import * as _ from 'lodash';
import smartObserve from 'smart-observe';
import { Constants } from '../constants';
import { MapDom } from '../map/map-dom';
import observe from './observer';
import { Scope } from './scope';

export class ScopeProxy {

    public mapDom: MapDom;
    public element: HTMLElement;

    constructor(_scope: Scope, _mapDom: MapDom, _element: HTMLElement) {
        this.mapDom = _mapDom;
        this.element = _element;
        this.createWatcherScope(_scope, this);
    }

    public createWatcherScope(scope, objectObserve) {
        if (this.element['$instance']) {
            scope.$on('$onInit', () => {
                console.log(objectObserve[this.element['$instance'].config.controllerAs]);
                observe(objectObserve[this.element['$instance'].config.controllerAs], (newValue) => {
                    // this.updateScopes(objectObserve.element[Constants.SCOPE_ATTRIBUTE_NAME]);
                    // this.executeObservers(objectObserve, '$onChanges', newValue);
                    // this.element['$instance'].$$checkBindings();
                    // scope.verifyWatchers(newValue);
                    // console.log('oi');
                });
            });
        }
    }

    private updateScopes(scope) {
        scope.mapDom.reload();
        if (scope.$parent) {
            this.updateScopes(scope.$parent);
        }
    }

    private executeObservers(objectObserve, observeName, changes) {
        if (objectObserve[this.element['$instance'].config.controllerAs][observeName]) {
            objectObserve[this.element['$instance'].config.controllerAs][observeName](changes);
        }
    }

}
