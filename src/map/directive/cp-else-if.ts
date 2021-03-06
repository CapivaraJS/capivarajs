import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPElseIf implements Directive {

    private readonly element: any;
    private readonly attribute;
    private readonly elementComment;
    private map: MapDom;
    private prevElement;
    private parentCondition;
    private cpElseIf;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.element['cpElseIf'] = this;
        this.attribute = Common.getAttributeCpElseIf(this.element);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.ELSE_IF_ATTRIBUTE_NAME} expected arguments`);
        }
        this.prevElement = _element.previousSibling;
        this.map = _map;
        this.elementComment = document.createComment('CPElseIf ' + this.attribute);
    }

    public create() {
        if (this.element.hasAttribute(Constants.REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        this.integrationCpElse();
        this.parentCondition = Common.getScope(this.element).parentCondition;
        if (!this.parentCondition) {
            throw new Error(`syntax error ${Constants.ELSE_IF_ATTRIBUTE_NAME} used on element ` +
                `<${this.element.nodeName.toLowerCase()}> without corresponding ${Constants.IF_ATTRIBUTE_NAME}.`);
        }
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
            if (!Common.isValidCondition(this.parentCondition.element, Common.getAttributeCpIf(this.parentCondition.element))) {
                Common.createElement(this.element, this.elementComment);
                if (!Common.isValidCondition(this.element, this.attribute)) {
                    Common.destroyElement(this.element, this.elementComment);
                }
            } else {
                Common.destroyElement(this.element, this.elementComment);
            }
        } catch (ex) {
            Common.destroyElement(this.element, this.elementComment);
        }
    }

}
