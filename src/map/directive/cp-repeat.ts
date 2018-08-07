import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { Controller } from '../../core/controller';
import capivara from '../../index';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPRepeat implements Directive {

  private readonly attribute;
  private readonly originalElement;
  private readonly referenceNode;
  private readonly regex;
  private map: MapDom;
  private element;
  private lastArray = [];
  private elms = [];
  private attributeAlias;
  private attributeScope;

  constructor(_element: HTMLElement, _map: MapDom) {
    this.element = _element.cloneNode(true);
    this.originalElement = _element;
    this.map = _map;
    this.attribute = _element.getAttribute(Constants.REPEAT_ATTRIBUTE_NAME).replace(/\s+/g, ' ');
    this.regex = new RegExp('^[\\s*|\\S]+\\s+' + Constants.REPEAT_ATTRIBUTE_OPERATOR.replace(/ /g, '') + '\\s+\\S+\\s*', 'g');
    const matches = this.attribute.match(this.regex);
    if (!this.attribute || (!matches || matches.length === 0)) {
      throw new Error(`syntax error invalid ${Constants.REPEAT_ATTRIBUTE_NAME} expresion: ${this.attribute}`);
    }
    this.referenceNode = document.createComment('start repeat ' + this.attribute);
    if (this.originalElement.parentNode.replaceChild) {
      this.originalElement.parentNode.replaceChild(this.referenceNode, this.originalElement);
    }
  }

  public create() {
    this.attributeAlias = this.attribute.substring(0, this.attribute.indexOf(Constants.REPEAT_ATTRIBUTE_OPERATOR)).replace(/ /g, '');
    this.attributeScope = this.attribute.substring(this.attribute.indexOf(Constants.REPEAT_ATTRIBUTE_OPERATOR) + Constants.REPEAT_ATTRIBUTE_OPERATOR.length, this.attribute.length).replace(/ /g, '');
    this.applyLoop();
  }

  public applyLoop() {
    const array = Common.evalInMultiContext(this.originalElement, this.attributeScope);
    if (array && !_.isEqual(array, this.lastArray)) {
      this.lastArray = array.slice();
      this.removeChildes();
      this.loop(array.slice().reverse(), this.attributeAlias);
    }
  }

  public removeChildes() {
    this.elms.forEach((elm) => {
      this.referenceNode.parentNode.removeChild(elm);
    });
  }

  private afterLoop() {
    setTimeout(() => {
      this.elms.forEach((elm) => {
        elm.style.visibility = 'visible';
      });
    }, 1);
  }

  public loop(array, attributeAlias) {
    this.elms = array.map((row, index) => {
      const elm = this.element.cloneNode(true);
      elm.removeAttribute(Constants.REPEAT_ATTRIBUTE_NAME);
      new Controller(elm, () => { });
      elm.classList.add('binding-repeat');
      elm.style.visibility = 'hidden';
      Common.appendAfter(this.referenceNode, elm);
      Common.getScope(elm).scope[attributeAlias] = row;
      return elm;
    });
    this.elms.reverse().forEach((elm, index) => {
      Common.getScope(elm).scope[Constants.REPEAT_INDEX_NAME] = index;
      this.createChildrenComponents(elm);
    });
    const shift = Object.assign([], this.elms)[this.elms.length - 1];
    if (shift) {
      Common.appendAfter(shift, this.referenceNode.parentNode.appendChild(document.createComment('end repeat ' + this.attribute)));
    }
    this.afterLoop();
  }

  private createChildrenComponents(elm) {
    (Array.from(elm.children) || []).forEach((child) => {
      capivara.constroyIfComponent(child);
    });
  }

}
