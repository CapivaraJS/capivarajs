import _ from 'lodash';
import {MapDom} from '../map-dom';
import {Common} from '../../common';
import {Constants} from '../../constants';
import {CPIf} from "./cp-if";

export class CPElseIf {

    private element: any;
    private map: MapDom;
    private elementComment;
    private prevElement;
    private attribute;
    private cpIf;
    private cpElseIf;

    constructor(_element: HTMLElement, _map: MapDom) {
        Common.getScope(_element).$on('$onInit', () => {
            this.element = _element;
            this.attribute = Common.getAttributeCpElseIf(this.element);
            this.prevElement = _element.previousSibling;
            this.cpIf = (Common.getScope(this.element).cpIf) || Common.getScope(this.element).cpElseIf;
            if (!this.cpIf) {
                throw "cp-else-if expected cp-if or cp-else-if above.";
            }
            this.map = _map;
            this.elementComment = document.createComment('CPElseIf ');
            this.init();
        });
    }

    init() {
        if (!this.element) {
            return;
        }
        try {
            !CPIf.isValidCondition(this.cpIf.element)
                ? Common.createElement(this.element, this.elementComment)
                : Common.destroyElement(this.element, this.elementComment);
        } catch (ex) {
            Common.destroyElement(this.element, this.elementComment);
        }
    }
}