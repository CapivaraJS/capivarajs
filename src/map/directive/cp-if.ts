import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPIf implements Directive {

    private readonly element: any;
    private readonly attribute;
    private readonly elementComment;
    private map: MapDom;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.element['cpIf'] = this;
        this.map = _map;
        this.attribute = Common.getAttributeCpIf(this.element);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.IF_ATTRIBUTE_NAME} expected arguments`);
        }
        this.elementComment = document.createComment('cpIf ' + this.attribute);
    }

    public create() {
        if (this.element.hasAttribute(Constants.REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        this.integrationCpElse();
        this.init();
    }

    public integrationCpElse() {
        const nextElement = this.element.nextElementSibling;
        if (nextElement && (nextElement.hasAttribute(Constants.ELSE_ATTRIBUTE_NAME) || nextElement.hasAttribute(Constants.ELSE_IF_ATTRIBUTE_NAME))) {
            Common.getScope(nextElement).parentCondition = this;
        }
    }

    public init() {
        if (!this.element || this.element.hasAttribute(Constants.REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        try {
            Common.createElement(this.element, this.elementComment);
            if (!Common.isValidCondition(this.element, Common.getAttributeCpIf(this.element))) {
                Common.destroyElement(this.element, this.elementComment);
            }
        } catch (ex) {
            Common.destroyElement(this.element, this.elementComment);
        }
    }
}
