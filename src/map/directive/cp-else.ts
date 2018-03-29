import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPElse implements Directive {

    private element: any;
    private map: MapDom;
    private elementComment;
    private prevElement;
    private parentCondition;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        if (Common.getAttributeCpElse(this.element)) {
            throw new Error(`${Constants.ELSE_ATTRIBUTE_NAME} don't expect arguments`);
        }
        this.prevElement = _element.previousSibling;
        this.map = _map;
        this.elementComment = document.createComment('cpElse');
    }

    public create() {
        this.parentCondition = Common.getScope(this.element).parentCondition;
        if (!this.parentCondition) {
            throw new Error(`syntax error ${Constants.ELSE_ATTRIBUTE_NAME} used on element ` +
                `<${this.element.nodeName.toLowerCase()}> without corresponding ${Constants.IF_ATTRIBUTE_NAME}.`);

        }
        this.init();
    }

    public hasValidCondition(_element, conditions) {
        if (_element && ((_element.hasAttribute && _element.hasAttribute(Constants.IF_ATTRIBUTE_NAME)) || (_element.nodeType === 8 && _element.data.indexOf('cpIf') !== -1))) {
            if (_element['$$cpDestroyed']) { return false; }
            return !((_element.nodeType === 8 && _element.data.indexOf('cpIf') !== -1) && conditions.length === 0);
        }
        if (_element && _element.previousSibling) {
            if (_element.hasAttribute && _element.hasAttribute(Constants.ELSE_IF_ATTRIBUTE_NAME)) {
                conditions.push(_element);
            }
            return this.hasValidCondition(_element.previousSibling, conditions);
        }
    }

    public init() {
        if (!this.element) {
            return;
        }
        try {
            Common.createElement(this.element, this.elementComment);
            if (this.hasValidCondition(this.element, [])) {
                Common.destroyElement(this.element, this.elementComment);
            }
        } catch (ex) {
            Common.destroyElement(this.element, this.elementComment);
        }
    }
}
