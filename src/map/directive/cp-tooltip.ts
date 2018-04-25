
import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';
import { Component } from '../../core';

export class CPtooltip implements Directive{
    private readonly element: any;
    private map: MapDom;
    private attribute;
    
    
    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.element['cpTooltip'] = this;
        this.map = _map;
        this.attribute = this.element.getAttribute(Constants.TOOLTIP_ATTRIBUTE_NAME);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.TOOLTIP_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public getIndexRow(element) {
        const index = _.get(Common.getScope(element).scope, Constants.REPEAT_INDEX_NAME);
        if (index === undefined && element.parentNode) {
            return this.getIndexRow(element.parentNode);
        }
        return index;
    }
    
    public create() {
        this.init();
    }

    public init() {
        // Remove old event
        this.element.removeEventListener('dblclick', this.onDbClick);
        // Add new event
        this.element.addEventListener('dblclick', this.onDbClick);
    }
}