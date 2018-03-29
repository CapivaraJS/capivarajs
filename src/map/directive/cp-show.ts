import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPShow  implements Directive {

    private element: any;
    private map: MapDom;
    private attribute;
    private initialDisplay;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.initialDisplay = this.element.style.display || '';
        this.map = _map;
        this.attribute = Common.getAttributeCpShow(this.element);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.SHOW_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public create() {
        this.init();
    }

    public init() {
        try {
            Common.isValidCondition(this.element, Common.getAttributeCpShow(this.element)) ? this.show() : this.hide();
        } catch (ex) {
            this.hide();
        }
    }

    public hide() {
        this.element.style.display = 'none';
    }

    public show() {
        this.element.style.display = this.initialDisplay;
    }

}
