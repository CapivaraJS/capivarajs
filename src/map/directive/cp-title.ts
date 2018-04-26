
import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';
import { Component } from '../../core';

export class CPTitle implements Directive{
    private readonly element: any;
    private map: MapDom;
    private attribute;
    
    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = this.element.getAttribute(Constants.TITLE_ATTRIBUTE_NAME);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.TITLE_ATTRIBUTE_NAME} expected arguments`);
        }
    }
    
    public create() {
        this.init();
    }

    public init() {
        const attribute = Common.evalInContext(this.attribute, Common.getScope(this.element).scope);
        this.element.setAttribute("title", attribute)
    }
}