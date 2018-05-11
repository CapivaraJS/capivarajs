import * as _ from 'lodash';
import {Common} from '../../common';
import {MapDom} from '../map-dom';
import {Directive} from './directive.interface';

export class CPSrc implements Directive {

  private readonly element: any;
  private readonly attribute;
  private map: MapDom;
  private elementComment;
  private elmScope;

  constructor(_element: HTMLElement, _map: MapDom) {
    this.element = _element;
    this.element['cpSrc'] = this;
    this.map = _map;
    this.attribute = Common.getAttributeCpSrc(this.element);
    this.elementComment = document.createComment('cpSrc ' + this.attribute);
    this.elmScope = Common.getScope(_element);
  }

  public create() {
    this.init();
  }

  public init() {
    try {
      this.element.src = '';
      const src = Common.evalInContext(this.attribute, Common.getScope(this.element).scope);
      this.addSrc(src);
    } catch (e) {
      this.addSrc(Common.executeFunctionCallback(this.element, this.attribute));
    }
  }

  public addSrc(src) {
    if (src) {
      this.element.src = src;
    }
  }
}
