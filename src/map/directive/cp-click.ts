import * as _ from 'lodash';
import {Common} from '../../common';
import {Constants} from '../../constants';
import {MapDom} from '../map-dom';
import {Directive} from './directive.interface';

export class CPClick implements Directive {

    private readonly element: any;
    private readonly eventName;
    private map: MapDom;
    private attribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = this.element.getAttribute(Constants.CLICK_ATTRIBUTE_NAME);
        this.eventName = 'click';
        if (!this.attribute) {
            this.attribute = this.element.getAttribute(Constants.DBLCLICK_ATTRIBUTE_NAME);
            this.eventName = 'dblclick';
        }
        if (!this.attribute) {
            throw new Error(`syntax error cp-${this.eventName} expected arguments`);
        }
    }

    public create() {
        this.init();
    }

    public getIndexRow(element) {
        const index = _.get(Common.getScope(element).scope, Constants.REPEAT_INDEX_NAME);
        if (index === undefined && element.parentNode) {
            return this.getIndexRow(element.parentNode);
        }
        return index;
    }

    public init() {
        const onClick = (evt) => {
            this.attribute = this.attribute.trim();
            Common.executeFunctionCallback(this.element, this.attribute, evt);
        };
        // Remove old event
        this.element.removeEventListener(this.eventName, onClick);
        // Add new event
        this.element.addEventListener(this.eventName, onClick);
    }
}
