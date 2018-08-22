import { Bindings, Constants, Functions } from './component-state';

export class Controller implements Bindings, Constants, Functions {
  public $bindings;
  public $constants;
  public $functions;
  constructor(public $scope?, public $element?) { }
}
