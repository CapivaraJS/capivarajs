import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { KeyCode } from '../../core/util/keycodes.enum';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPKey implements Directive {

    private element: any;
    private map: MapDom;
    private attributes;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.attributes = [];
        this.element['cpKey'] = this;
        this.map = _map;
        Array.from(this.element.attributes).forEach((attribute: any) => {
            if (attribute.nodeName && attribute.nodeName.startsWith(Constants.KEY_ATTRIBUTE_NAME)) {
                if (!attribute.value) {
                    throw new Error(`syntax error ${Constants.KEY_ATTRIBUTE_NAME} expected arguments`);
                }
                this.attributes.push(attribute.name);
            }
        });
    }

    public create() {
        this.init();
    }

    public onKeyPress(evt) {
        if (evt.target && evt.target['cpKey']) {
            evt.target['cpKey'].attributes.forEach((attribute) => {
                const indexSeparator = attribute.lastIndexOf('.');
                if (indexSeparator === -1) {
                    Common.executeFunctionCallback(evt.target['cpKey'].element, evt.target['cpKey'].element.getAttribute(attribute), evt);
                } else {
                    const watchKeyName = attribute.substring(attribute.lastIndexOf('.') + 1);
                    const watchKey = !isNaN(watchKeyName) ? Number(watchKeyName) : KeyCode[(watchKeyName || '').toUpperCase()];
                    if (watchKey !== undefined && evt.keyCode === watchKey) {
                        Common.executeFunctionCallback(evt.target['cpKey'].element, evt.target['cpKey'].element.getAttribute(attribute), evt);
                    }
                }
            });
        }
    }

    public init() {
        this.attributes.forEach((attribute) => {
            const indexSeparator = attribute.lastIndexOf('.');
            const keyType = attribute.substring(0, (indexSeparator === -1 ? attribute.length : indexSeparator)).replace(Constants.KEY_ATTRIBUTE_NAME, '');
            // Remove old event
            this.element.removeEventListener(`key${keyType}`, this.onKeyPress);
            // Add new event
            this.element.addEventListener(`key${keyType}`, this.onKeyPress);
        });
    }

}
