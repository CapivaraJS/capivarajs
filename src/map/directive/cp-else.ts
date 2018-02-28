import _ from 'lodash';
import {MapDom} from '../map-dom';
import {Common} from '../../common';
import {Constants} from '../../constants';
import {CPIf} from "./cp-if";

export class CPElse {

    private element: any;
    private map: MapDom;
    private elementComment;
    private prevElement;
    private cpIf;

    constructor(_element: HTMLElement, _map: MapDom) {
        Common.getScope(_element).$on('$onInit', () => {
            this.element = _element;
            if(Common.getAttributeCpElse(this.element)){
                throw "cp-else don't expect arguments";
            }
            this.prevElement = _element.previousSibling;
            this.cpIf = Common.getScope(this.element).cpIf;
            if (!this.cpIf) {
                throw "cp-else expected cp-if above.";
            }
            this.map = _map;
            this.elementComment = document.createComment('cpElse ');
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