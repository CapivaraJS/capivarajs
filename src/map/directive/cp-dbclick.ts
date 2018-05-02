import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPdbClick implements Directive {

    private readonly element: any;
    private map: MapDom;
    private attribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.element['cpDbClick'] = this;
        this.map = _map;
        this.attribute = this.element.getAttribute(Constants.DBCLICK_ATTRIBUTE_NAME);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.DBCLICK_ATTRIBUTE_NAME} expected arguments`);
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

    private onDbClick(evt) {
        evt.target['cpDbClick'].attribute = evt.target['cpDbClick'].attribute.replace(/ /g, '');
        Common.executeFunctionCallback(evt.target['cpDbClick'].element, evt.target['cpDbClick'].attribute, evt);
    }

    public init() {
        // Remove old event
        this.element.removeEventListener('dblclick', this.onDbClick);
        // Add new event
        this.element.addEventListener('dblclick', this.onDbClick);
    }
}
