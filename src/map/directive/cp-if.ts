import _ from 'lodash';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Common } from '../../common';

export class CPIf {

    private element: any;
    private map: MapDom;
    private attribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = Common.getAttributeCpShow(this.element);

        Common.getScope(this.element).$on('$onInit', () => this.init());
    }

    init() {
        try{
            Common.evalInContext(this.attribute, Common.getScope(this.element).scope) ? this.if() : this.hide();
        }catch(ex){
            this.hide();
        }
    }

    hide(){
        console.log('hide');
        // this.element.style.display = 'none';

    }

    if(){
        console.log('if');
    }

}