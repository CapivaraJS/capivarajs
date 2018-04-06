import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPInit implements Directive {

    private attribute;
    private element: any;
    private map: MapDom;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = Common.getAttributeCpInit(this.element);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.INIT_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public create() {
        this.init();
    }

    public init() {
        this.attribute = this.attribute.replace(/ /g, '');
        Common.executeFunctionCallback(this.element, this.attribute);
    }
}
