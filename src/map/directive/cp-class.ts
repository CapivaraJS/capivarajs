import * as _ from 'lodash';
import { MapDom } from '../map-dom';
import { Common } from '../../common';
import { Constants } from '../../constants';

export class CPClass {

    private element: any;
    private map: MapDom;
    private attribute;
    private elementComment;
    private elmScope;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.element['cpClass'] = this;
        this.map = _map;
        this.attribute = Common.getAttributeCpClass(this.element);
        this.elementComment = document.createComment('cpClass ' + this.attribute);
        this.elmScope = Common.getScope(_element);
        this.elmScope.$on('$onInit', () => {
            this.init();
        });
    }

    init() {
        try {
            this.attribute.split(',')
                .map(attr => {
                    return {
                        key: attr.substring(0, attr.indexOf(':')).replace(/'/g, "").replace(/"/, '').replace(/{/g, '').replace(/}/, ''),
                        value: Common.evalInContext(attr.substring(attr.indexOf(':') + 1, attr.length).replace(/{/g, '').replace(/}/, ''), Common.getScope(this.element).scope)
                    }
                })
                .forEach(cpClass => {
                    if (cpClass.value === true)
                        this.addClass(this.element, cpClass.key.replace(/ /g, ''));
                    else
                        this.removeClass(this.element, cpClass.key.replace(/ /g, ''));
                });
        } catch (e) {
            const result = Common.executeFunctionCallback(this.element, this.attribute);
            if (result && window['capivara'].isObject(result)) {
                Object.keys(result).forEach(key => {
                    if (result[key] === true)
                        this.addClass(this.element, key.replace(/ /g, ''));
                    else
                        this.removeClass(this.element, key.replace(/ /g, ''));
                });
            }
        }
    }

    removeClass(el, className) {
        if (el.classList && el.classList.contains(className))
            el.classList.remove(className);
        else if (!el.classList && el.className.indexOf(className) != -1)
            el.className = el.className.replace(className, '');
    }

    addClass(el, className) {
        if (el.classList && !el.classList.contains(className))
            el.classList.add(className);
        else if (!el.classList && el.className.indexOf(className) == -1)
            el.className += " " + className
    }

}