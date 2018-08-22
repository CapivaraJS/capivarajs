import { Capivara } from '../';

export class Controller {
  public $bindings;
  public $constants;
  public $functions;

  constructor(public $scope?, public $element?) {}

  public $onInit() {}
  public $onViewInit() {}
  public $destroy() {}

}
