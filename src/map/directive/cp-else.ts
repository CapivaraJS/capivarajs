import _ from 'lodash';
import {MapDom} from '../map-dom';
import {Common} from '../../common';
import {Constants} from '../../constants';

export class CPElse {

    private element: any;
    private map: MapDom;
    private elementComment;
    private prevElement;
    private parentCondition;

    constructor(_element: HTMLElement, _map: MapDom) {
        Common.getScope(_element).$on('$onInit', () => {
            this.element = _element;
            if (Common.getAttributeCpElse(this.element)) {
                throw `cp-else don't expect arguments`;
            }
            this.prevElement = _element.previousSibling;
            this.parentCondition = Common.getScope(this.element).parentCondition;
            if (!this.parentCondition) {
                throw `syntax error cp-else used on element ` +
                `<${this.element.nodeName.toLowerCase()}> without corresponding cp-if.`;

            }
            this.map = _map;
            this.elementComment = document.createComment('cpElse');
            this.init();
        });
    }

    hasValidCondition(_element, conditions) {
        if (_element && ((_element.hasAttribute && _element.hasAttribute(Constants.IF_ATTRIBUTE_NAME)) || (_element.nodeType == 8 && _element.data.indexOf('cpIf') != -1))) {
            return !((_element.nodeType == 8 && _element.data.indexOf('cpIf') != -1) && conditions.length == 0);

        }
        if (_element && _element.previousSibling) {
            if (_element.hasAttribute && _element.hasAttribute(Constants.ELSE_IF_ATTRIBUTE_NAME)) {
                conditions.push(_element);
            }
            return this.hasValidCondition(_element.previousSibling, conditions);
        }
    }

    init() {
        if (!this.element) {
            return;
        }
        try {
            Common.createElement(this.element, this.elementComment);
            if (this.hasValidCondition(this.element, [])) {
                Common.destroyElement(this.element, this.elementComment)
            }
        } catch (ex) {
            Common.destroyElement(this.element, this.elementComment);
        }
    }
}