import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPModel implements Directive {

    private element: any;
    private map: MapDom;
    private attribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = this.element.getAttribute(Constants.MODEL_ATTRIBUTE_NAME);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.MODEL_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public create() {
        this.init();
        this.applyModelInValue();
    }

    public init() {
        this.map.addCpModels(this);
        this.element.addEventListener('input', () => this.applyValueInModel());
    }

    public applyModelInValue() {
        const value = _.get(Common.getScope(this.element).scope, this.attribute);
        if (this.element.value !== value) {
            switch (this.element.type) {
                case 'date':
                    this.element.valueAsDate = value || null;
                    break;
                case 'number':
                    this.element.valueAsNumber = value || null;
                    break;
                default:
                    this.element.value = value  || null;
            }
        }
    }

    public applyValueInModel() {
        switch (this.element.type) {
            case 'date':
                _.set(Common.getScope(this.element).scope, this.attribute, this.element.valueAsDate);
                break;
            case 'number':
                _.set(Common.getScope(this.element).scope, this.attribute, this.element.valueAsNumber);
                break;
            default:
                _.set(Common.getScope(this.element).scope, this.attribute, this.element.value);
        }
        this.map.reload();
    }

}
