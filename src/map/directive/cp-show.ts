import _ from 'lodash';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Common } from '../../common';

export class CPShow {

    private element: any;
    private map: MapDom;
    private atribute;
    private initialDisplay;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.initialDisplay = this.element.style.display || 'block';
        this.map = _map;
        this.atribute = Common.getAttributeCpShow(this.element);

        Common.getScope(this.element).$on('$onInit', () => this.init());
    }

    init() {
        try{
            Common.evalInContext(this.atribute, Common.getScope(this.element).scope) ? this.show() : this.hide();
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