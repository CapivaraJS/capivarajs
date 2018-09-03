import * as _ from 'lodash';
import { Constants } from '../constants';
import { Observe } from '../core/observer';
import { MapDom } from '../map/map-dom';
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
        Observe.observe(objectObserve[this.element['$instance'].config.controllerAs], (changes) => {
          if (changes.length > 0) {
            this.updateScopes(objectObserve.element[Constants.SCOPE_ATTRIBUTE_NAME]);
          }
          scope.$emit('$onChanges', changes);
          this.executeObservers(objectObserve, '$onChanges', changes);
          this.executeObservers(objectObserve, '_$$checkBindings', changes);
        });
      });
    }
  }

  private updateScopes(scope: Scope) {
    if (!scope.$parent) {
      scope.mapDom.reload();
    } else {
      this.updateScopes(scope.$parent);
    }
  }

  private executeObservers(objectObserve, observeName, changes) {
    if (objectObserve[this.element['$instance'].config.controllerAs][observeName]) {
      objectObserve[this.element['$instance'].config.controllerAs][observeName](changes);
    }
  }

}
