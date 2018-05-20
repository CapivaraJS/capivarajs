import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPFocus implements Directive {
    private attribute;
    private element: any;
    private map: MapDom;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.element['cpFocus'] = this;
        this.attribute = Common.getAttributeCpFocus(this.element);
        if (this.attribute === undefined) {
            throw new Error(`syntax error ${Constants.FOCUS_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public create() {
        this.init();
    }

    public onFocus(evt) {
        Common.executeFunctionCallback(evt.target['cpFocus'].element, evt.target['cpFocus'].attribute, { [Constants.EVENT_ATTRIBUTE_NAME] : evt });
    }

    public init() {
        // Remove old event
        this.element.removeEventListener('focus', this.onFocus);
        // Add new event
        this.element.addEventListener('focus', this.onFocus);
    }
}
