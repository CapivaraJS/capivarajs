import { MapDom } from '../map-dom';
import { Common } from '../../common';
import { Constants } from '../../constants';

export class CPShow {

    private element: any;
    private map: MapDom;
    private attribute;
    private initialDisplay;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.initialDisplay = this.element.style.display || '';
        this.map = _map;
        this.attribute = Common.getAttributeCpShow(this.element);
        if(!this.attribute) {
            throw `syntax error ${Constants.SHOW_ATTRIBUTE_NAME} expected arguments`
        }
        Common.getScope(this.element).$on('$onInit', () => this.init());
    }

    init() {
        try{
            Common.isValidCondition(this.element, Common.getAttributeCpShow(this.element)) ? this.show() : this.hide();
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