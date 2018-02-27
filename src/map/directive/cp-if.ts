import {MapDom} from '../map-dom';
import {Common} from '../../common';

export class CPIf {

    private element: any;
    private map: MapDom;
    private attribute;
    private elementComment;

    constructor(_element: HTMLElement, _map: MapDom) {
        Common.getScope(_element).$on('$onInit', () => {
            this.element = _element;
            this.map = _map;
            this.attribute = Common.getAttributeCpIf(this.element);
            this.elementComment = document.createComment('cpIf ' + this.attribute);
            this.init();
        });
    }

    init() {
        if(!this.element) { return; }
        try {
            let scope = Common.getScope(this.element).$parent || Common.getScope(this.element);
            Common.evalInContext(this.attribute, scope.scope) ? this.show() : this.hide();
        } catch (ex) {
            this.hide();
        }
    }

    hide() {
        this.element.replaceWith(this.elementComment);
    }

    show() {
        // let component = window['capivara'].components[this.element.nodeName];
        // if(component){ component.createNewInstance(this.element); }
        this.elementComment.replaceWith(this.element);
    }

}