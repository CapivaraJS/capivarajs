import _ from 'lodash';
import { Constants } from '../../constants';
import { Bind } from './bind';
import { MapDom } from '../map-dom';

export class CPModel implements Bind {

    private element: any;
    private map: MapDom;
    private atribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.atribute = this.element.getAttribute(Constants.MODEL_ATRIBUTE_NAME);
        this.init();
        this.applyValueInModel();
    }

    init() {
        this.map.addElementMap(this);
        this.element.addEventListener('input', evt => this.applyValueInModel());
    }

    applyModelInValue() {
        let value = _.get(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, this.atribute);
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
                _.set(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, this.atribute, this.element.valueAsDate);
                break;
            case 'number':
                _.set(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, this.atribute, this.element.valueAsNumber);
                break;
            default:
                _.set(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, this.atribute, this.element.value);
        }
        this.map.reloadBind();
    }

}