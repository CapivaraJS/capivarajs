import _ from 'lodash';
import {MapDom} from '../map-dom';
import {Common} from '../../common';
import {Constants} from '../../constants';

export class CPIf {

    private element: any;
    private map: MapDom;
    private attribute;
    private elementComment;

    constructor(_element: HTMLElement, _map: MapDom) {
        Common.getScope(_element).$on('$onInit', () => {
            this.element = _element;
            this.integrationCpElse();
            this.map = _map;
            this.attribute = Common.getAttributeCpIf(this.element);
            this.elementComment = document.createComment('cpIf ' + this.attribute);
            this.init();
        });
    }

    integrationCpElse(){
        let nextElement = this.element.nextElementSibling;
        if(nextElement && nextElement.hasAttribute(Constants.ELSE_ATTRIBUTE_NAME)){
            Common.getScope(nextElement).cpIf = this;
        }
    }

    public static isValidCondition(element) {
        let scope = Common.getScope(element);
        if (!(element.parentNode && element.parentNode.classList.contains('binding-repeat')) && scope.$parent) {
            scope = scope.$parent;
        }
        return Common.evalInContext(Common.getAttributeCpIf(element), scope.scope);
    }

    init() {
        if (!this.element) {
            return;
        }
        try {
            CPIf.isValidCondition(this.element)
                ? Common.createElement(this.element, this.elementComment)
                : Common.destroyElement(this.element, this.elementComment);
        } catch (ex) {
            Common.destroyElement(this.element, this.elementComment);
        }
    }
}