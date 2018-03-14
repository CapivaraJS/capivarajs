import * as _ from 'lodash';
import { MapDom } from '../map-dom';
import { Common } from '../../common';
import { Constants } from '../../constants';

export class CPStyle {

    private element: any;
    private map: MapDom;
    private attribute;
    private elementComment;
    private regex;
    private cssStyle = {
        properties: '',
        value: ''
    }

    constructor(_element: HTMLElement, _map: MapDom) {
        Common.getScope(_element).$on('$onInit', () => {
            this.element = _element;
            this.element['cpStyle'] = this;
            this.map = _map;
            this.attribute = Common.getAttributeCpStyle(this.element);
            this.regex = new RegExp('^[\s\t]*[^\s\t:]+[\s\t]*:[\s\t]*[^\s\t:]+[\s\t]*$', 'g');
            let matchs = this.attribute.match(this.regex).toString();
            this.elementComment = document.createComment('cpStyle ' + this.attribute);
            let temp = matchs.split(":");
            this.cssStyle.properties = temp[0];
            this.cssStyle.value = temp[1];
            this.init();
        });
    }

    init() {
        this.element.style.setProperty(this.cssStyle.properties, this.cssStyle.value);
        Common.createElement(this.element, this.element);
    }
}