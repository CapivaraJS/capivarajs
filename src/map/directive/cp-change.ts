import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPChange implements Directive {

    private attribute;
    private element: any;
    private map: MapDom;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = this.element.getAttribute(Constants.CHANGE_ATTRIBUTE_NAME);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.CHANGE_ATTRIBUTE_NAME} expected arguments`);
        }
        if (!this.element.hasAttribute(Constants.MODEL_ATTRIBUTE_NAME)) {
            throw new Error(`syntax error ${Constants.MODEL_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public create() {
        this.init();
    }

    public onModelChange(newValue, oldValue) {
        console.log(newValue, oldValue);
        Common.executeFunctionCallback(this.element, this.attribute, { $newValue: newValue, $oldValue: oldValue });
    }

    public init() {
        const modelAttribute = this.element.getAttribute(Constants.MODEL_ATTRIBUTE_NAME).replace(Common.getScope(this.element).scope['__$controllerAs__'] + '.', '');
        Common.getScope(this.element).$unwatch(modelAttribute, this.onModelChange);
        Common.getScope(this.element).$watch(modelAttribute, this.onModelChange, this);
    }
}
