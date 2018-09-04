import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPMouse implements Directive {

    private readonly element: any;
    private map: MapDom;
    private attributes;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.attributes = [];
        this.map = _map;
        Array.from(this.element.attributes).forEach((attribute: any) => {
            if (attribute.nodeName && attribute.nodeName.startsWith(Constants.MOUSE_ATTRIBUTE_NAME)) {
                if (!attribute.value) {
                    throw new Error(`syntax error ${Constants.MOUSE_ATTRIBUTE_NAME} expected arguments`);
                }
                this.element[attribute.name] = this;
                this.attributes.push(attribute.name);
            }
        });
    }

    public create() {
        this.init();
    }

    public onMouse(evt) {
        const directiveName = 'cp-' + evt.type;
        if (evt.target && evt.target[directiveName]) {
            Common.executeFunctionCallback(evt.target[directiveName].element, evt.target[directiveName].element.getAttribute(directiveName), { [Constants.EVENT_ATTRIBUTE_NAME] : evt });
        }
    }

    public init() {
        this.attributes.forEach((attribute) => {
            const indexSeparator = attribute.lastIndexOf('.');
            const eventType = attribute.substring(0, (indexSeparator === -1 ? attribute.length : indexSeparator)).replace(Constants.MOUSE_ATTRIBUTE_NAME, '');
            // Remove old event
            this.element.removeEventListener(`mouse${eventType}`, (evt) => this.onMouse(evt));
            // Add new event
            this.element.addEventListener(`mouse${eventType}`, this.onMouse);
        });
    }

}
