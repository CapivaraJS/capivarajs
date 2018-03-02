import * as _ from 'lodash';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Common } from '../../common';

export class CPModel {

    private element: any;
    private map: MapDom;
    private attribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = this.element.getAttribute(Constants.MODEL_ATTRIBUTE_NAME);
        if(!this.attribute) {
            throw `syntax error ${Constants.MODEL_ATTRIBUTE_NAME} expected arguments`
        }
        this.init();
        this.applyValueInModel();
    }

    init() {
        this.map.addCpModels(this);
        this.element.addEventListener('input', evt => this.applyValueInModel());
    }

    applyModelInValue() {
        let value = _.get(Common.getScope(this.element).scope, this.attribute);
        if (this.element.value != value) {
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

    applyValueInModel() {
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