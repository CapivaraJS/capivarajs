import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPModel implements Directive {

  private readonly attribute;
  private element: any;
  private map: MapDom;

  constructor(_element: HTMLElement, _map: MapDom) {
    this.element = _element;
    this.element['cpModel'] = this;
    this.map = _map;
    this.attribute = this.element.getAttribute(Constants.MODEL_ATTRIBUTE_NAME);
    if (!this.attribute) {
      throw new Error(`syntax error ${Constants.MODEL_ATTRIBUTE_NAME} expected arguments`);
    }
  }

  public create(_element?) {
    this.init();
    this.applyModelInValue();
  }

  public init() {
    this.map.addCpModels(this);
    if (!Common.isComponent(this.element)) {
      this.element.removeEventListener('input', this.applyValueInModel);
      this.element.addEventListener('input', this.applyValueInModel);
    }
  }

  public applyModelInValue() {
    const value = _.get(Common.getScope(this.element).scope, this.attribute);
    switch (this.element.type) {
      case 'date':
        if (this.element.valueAsDate && this.element.valueAsDate.getTime() !== value.getTime()) {
          this.element.valueAsDate = value || null;
        }
        break;
      case 'number':
        if (value !== this.element.valueAsNumber && value !== undefined) {
          this.element.valueAsNumber = value || null;
        }
        break;
      default:
        if (this.element.value !== value) {
          this.element.value = value || null;
        }
    }
  }


  public applyValueInModel(evt) {
    const self = (evt ? (evt.target || evt.srcElement) : this.element)['cpModel'];
    switch (self.element.type) {
      case 'date':
        _.set(Common.getScope(self.element).scope, self.attribute, self.element.valueAsDate);
        break;
      case 'number':
        _.set(Common.getScope(self.element).scope, self.attribute, isNaN(self.element.valueAsNumber) ? undefined : self.element.valueAsNumber);
        break;
      default:
        _.set(Common.getScope(self.element).scope, self.attribute, self.element.value);
    }
  }

}
