import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPAttr implements Directive {
    private readonly element: any;
    private map: MapDom;
    private attributes = [];

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        Array.from(this.element.attributes).forEach((attribute: any) => {
            if (attribute.nodeName && attribute.nodeName.startsWith(Constants.ATTR_ATTRIBUTE_NAME)) {
                if (!attribute.value) {
                    throw new Error(`syntax error ${Constants.ATTR_ATTRIBUTE_NAME} expected arguments`);
                }
                this.attributes.push(attribute.name);
            }
        });
    }

    public create() {
        this.init();
    }

    public init() {
        this.attributes.forEach((attribute) => {
            const attributeValue = this.element.getAttribute(attribute);
            const attr = attribute.replace(Constants.ATTR_ATTRIBUTE_NAME + '.', '');
            const value = Common.evalInMultiContext(this.element, attributeValue);
            if (value === undefined || value === null) {
                this.element.setAttribute(attr, '');
            } else {
                this.element.setAttribute(attr, value);
            }
        });
    }
}
