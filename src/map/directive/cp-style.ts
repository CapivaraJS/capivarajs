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
    private cssStyle = {}
    private elmScope;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.element['cpStyle'] = this;
        this.map = _map;
        this.attribute = Common.getAttributeCpStyle(this.element);
        this.elementComment = document.createComment('cpStyle ' + this.attribute);
        this.elmScope = Common.getScope(_element);
        this.elmScope.$on('$onInit', () => {
            this.init();
        });
    }

    init() {
        try {
            this.attribute.split(';')
                .map(attr => {
                    return { 
                        key: attr.substring(0, attr.indexOf(':')).replace(/'/g, "").replace(/"/, '').replace(/{/g, '').replace(/}/, ''), 
                        value: Common.evalInContext(attr.substring(attr.indexOf(':') + 1, attr.length).replace(/{/g, '').replace(/}/, ''), Common.getScope(this.element).scope)
                    }
                })
                .forEach(style => {
                    this.element.style.setProperty(style.key.replace(/ /g, ''), style.value);
                });
        } catch (e) {
        }
    }
}