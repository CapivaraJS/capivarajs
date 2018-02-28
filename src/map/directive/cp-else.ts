import _ from 'lodash';
import { MapDom } from '../map-dom';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { CPIf } from "./cp-if";

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
            this.cpIf = Common.getScope(this.element).parentCondition;
            if (!this.cpIf) {
                throw "cp-else expected cp-if or cp-else-if above.";
            }
            this.map = _map;
            this.elementComment = document.createComment('cpElse');
            this.init();
        });
    }

    parentIsIfOrElseIf(_element){
        let prev = _element.previousElementSibling;
        if(!prev) {
            return;
        }
        return (prev.hasAttribute(Constants.ELSE_IF_ATTRIBUTE_NAME) || prev.hasAttribute(Constants.IF_ATTRIBUTE_NAME));
    }

    init() {
        if (!this.element) {
            return;
        }
        try {   
            Common.createElement(this.element, this.elementComment);
            if(this.parentIsIfOrElseIf(this.element)){
                Common.destroyElement(this.element, this.elementComment)
            }
        } catch (ex) {
            Common.destroyElement(this.element, this.elementComment);
        }
    }
}