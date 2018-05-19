import * as _ from 'lodash';
import { Common } from '../../common';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPClass implements Directive {

    private readonly element: any;
    private readonly attribute;
    private map: MapDom;
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

    public setClassByObject(classObj) {
        if (classObj && window['capivara'].isObject(classObj)) {
            Object.keys(classObj).forEach((key) => {
                if (classObj[key]) {
                    this.addClass(key.replace(/ /g, ''));
                } else {
                    this.removeClass(key.replace(/ /g, ''));
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
                        this.setClassByObject(cpClass.value);
                    } else {
                        if (cpClass.value) {
                            this.addClass(cpClass.key.replace(/ /g, ''));
                        } else {
                            this.removeClass(cpClass.key.replace(/ /g, ''));
                        }
                    }
                });
        } catch (e) {
        }
    }

    public removeClass(className) {
        if (this.element.classList && this.element.classList.contains(className)) {
            this.element.classList.remove(className);
        } else if (!this.element.classList && this.element.className.indexOf(className) !== -1) {
            this.element.className = this.element.className.replace(className, '');
        }
    }

    public addClass(className) {
        if (this.element.classList && !this.element.classList.contains(className)) {
            this.element.classList.add(className);
        } else if (!this.element.classList && this.element.className.indexOf(className) === -1) {
            this.element.className += " " + className;
        }
    }
}
