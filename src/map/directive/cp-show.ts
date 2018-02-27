import { MapDom } from '../map-dom';
import { Common } from '../../common';

export class CPShow {

    private element: any;
    private map: MapDom;
    private attribute;
    private initialDisplay;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.initialDisplay = this.element.style.display || 'block';
        this.map = _map;
        this.attribute = Common.getAttributeCpShow(this.element);

        Common.getScope(this.element).$on('$onInit', () => this.init());
    }

    init() {
        try{
            let scope = Common.getScope(this.element).$parent || Common.getScope(this.element);
            Common.evalInContext(this.attribute, scope.scope) ? this.show() : this.hide();
        }catch(ex){
            this.hide();
        }
    }

    hide(){
        this.element.style.display = 'none';
    }

    show(){
        this.element.style.display = this.initialDisplay;
    }

}