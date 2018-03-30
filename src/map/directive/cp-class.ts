import * as _ from 'lodash';
import { Common } from '../../common';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPClass implements Directive {

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
    }

    public create() {
        this.init();
    }

    public setStyleByObject(classObj) {
        if (classObj && window['capivara'].isObject(classObj)) {
            Object.keys(classObj).forEach((key) => {
                if (classObj[key] === true) {
                    CPClass.addClass(this.element, key.replace(/ /g, ''));
                } else {
                    CPClass.removeClass(this.element, key.replace(/ /g, ''));
                }
            });
        }
    }

    public init() {
        try {
            this.attribute.split(',')
                .map((attr) => {
                    return {
                        key: attr.substring(0, attr.indexOf(':')).replace(/'/g, "").replace(/"/, '').replace(/{/g, '').replace(/}/, ''),
                        value: Common.evalInContext(attr.substring(attr.indexOf(':') + 1, attr.length).replace(/{/g, '').replace(/}/, ''), Common.getScope(this.element).scope),
                    };
                })
                .forEach((cpClass) => {
                    if (window['capivara'].isObject(cpClass.value)) {
                        this.setStyleByObject(cpClass.value);
                    } else {
                        if (cpClass.value === true) {
                            CPClass.addClass(this.element, cpClass.key.replace(/ /g, ''));
                        } else {
                            CPClass.removeClass(this.element, cpClass.key.replace(/ /g, ''));
                        }
                    }
                });
        } catch (e) {
            this.setStyleByObject(Common.executeFunctionCallback(this.element, this.attribute));
        }
    }

    public static removeClass(el, className) {
        if (el.classList && el.classList.contains(className)) {
            el.classList.remove(className);
        } else if (!el.classList && el.className.indexOf(className) !== -1) {
            el.className = el.className.replace(className, '');
             }
    }

    public static addClass(el, className) {
        if (el.classList && !el.classList.contains(className)) {
            el.classList.add(className);
        } else if (!el.classList && el.className.indexOf(className) === -1) {
            el.className += " " + className;
             }
    }

}
