import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { Controller } from '../../core/controller';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPRepeat implements Directive {

    private map: MapDom;
    private attribute;
    private element;
    private originalElement;
    private referenceNode;
    private lastArray = [];
    private regex;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element.cloneNode(true);
        this.originalElement = _element;
        this.map = _map;
        this.attribute = _element.getAttribute(Constants.REPEAT_ATTRIBUTE_NAME).replace(/\s+/g, ' ');
        this.regex = new RegExp('^[\\s*|\\S]+\\s+in\\s+\\S+\\s*', 'g');
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
        this.applyLoop();
    }

    public applyLoop() {
        const attributeAlias = this.attribute.substring(0, this.attribute.indexOf(Constants.REPEAT_ATTRIBUTE_OPERATOR)).replace(/ /g, '');
        const attributeScope = this.attribute.substring(this.attribute.indexOf(Constants.REPEAT_ATTRIBUTE_OPERATOR) + Constants.REPEAT_ATTRIBUTE_OPERATOR.length, this.attribute.length).replace(/ /g, '');
        const array = _.get(Common.getScope(this.originalElement).scope, attributeScope);
        if (array && !_.isEqual(array, this.lastArray)) {
            this.lastArray = array.slice();
            this.removeChildes();
            this.loop(array.slice().reverse(), attributeAlias);
        }
    }

    public removeChildes() {
        Array.from(this.referenceNode.parentNode.childNodes)
            .forEach((elm: any) => {
                if (elm.nodeName === this.originalElement.nodeName || elm.nodeName === '#comment' && elm.data === 'end repeat ' + this.attribute) {
                    this.referenceNode.parentNode.removeChild(elm);
                }
            });
    }

    public loop(array, attributeAlias) {
        const elms = array.map((row, index) => {
            const elm = this.element.cloneNode(true);
            elm.removeAttribute(Constants.REPEAT_ATTRIBUTE_NAME);
            elm.classList.add('binding-repeat');
            Common.appendAfter(this.referenceNode, elm);
            new Controller(elm, () => { });
            Common.getScope(elm).scope[attributeAlias] = row;
            Common.getScope(elm).scope[Constants.REPEAT_INDEX_NAME] = index;
            Common.getScope(elm).mapDom.reload();
            return elm;
        });
        const shift = elms.shift();
        if (shift) {
            Common.appendAfter(shift, this.referenceNode.parentNode.appendChild(document.createComment('end repeat ' + this.attribute)));
        }
    }

}
