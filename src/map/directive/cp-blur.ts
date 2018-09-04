import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPBlur implements Directive {
    private attribute;
    private element: any;
    private map: MapDom;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.element['cpBlur'] = this;
        this.attribute = Common.getAttributeCpBlur(this.element);
        if (this.attribute === undefined) {
            throw new Error(`syntax error ${Constants.BLUR_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public create() {
        this.init();
    }

    public onBlur(evt) {
        Common.executeFunctionCallback(evt.target['cpBlur'].element, evt.target['cpBlur'].attribute, { [Constants.EVENT_ATTRIBUTE_NAME] : evt });
    }

    public init() {
        // Remove old event
        this.element.removeEventListener('blur', this.onBlur);
        // Add new event
        this.element.addEventListener('blur', this.onBlur);
    }
}
