import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPDisabled implements Directive {

    private readonly element: any;
    private readonly attribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.attribute = Common.getAttributeCpDisable(this.element);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.DISABLE_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public create() {
        this.init();
    }

    public init() {
        try {
            JSON.parse(Common.isValidCondition(this.element, Common.getAttributeCpDisable(this.element))) ? this.elementDisabled() : this.elementEnabled();
        } catch (ex) {
            this.elementEnabled();
        }
    }

    public elementDisabled() {
        this.element.setAttribute('disabled', true);
    }

    public elementEnabled() {
        this.element.removeAttribute('disabled');
    }

}
