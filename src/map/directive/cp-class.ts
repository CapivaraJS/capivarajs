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
            this.attribute.split(';')
                .map(attr => {
                    return {
                        // value sempre tem q ser um valor boleano, todos os outros frameworks passam um boolean para saber se devem ativar ou desativar
                        // a classe, entao value tem q ser um boolean que so vai deixar o addClass acontecer se ele for true
                        key: attr.substring(0, attr.indexOf(':')).replace(/'/g, "").replace(/"/, '').replace(/{/g, '').replace(/}/, ''),
                        // value: Common.evalInContext(attr.substring(attr.indexOf(':') + 1, attr.length).replace(/{/g, '').replace(/}/, ''), Common.getScope(this.element).scope)
                    }
                })
                .forEach(p => {
                        this.addClass(this.element, p.key.replace(/ /g, ''));
                });
        } catch (e) {
        }
    }

    addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!this.hasClass(el, className)) el.className += " " + className
    }

    hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }
}