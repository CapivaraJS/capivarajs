import _ from 'lodash';
import { MapDom } from '../map-dom';
import { Common } from '../../common';
import { Constants } from '../../constants';
export class CPInit {

    private element: any;
    private map: MapDom;
    private attribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        Common.getScope(_element).$on('$onInit', () => {
            this.element = _element;
            this.map = _map;
            this.attribute = Common.getAttributeCpInit(this.element);
            this.init();
        });
    }

    init() {
        this.attribute = this.attribute.replace(/ /g, '');
        let callback = Common.getCallbackClick(this.element, this.attribute);
        if (callback && !Common.isNative(callback)) {
            let params = this.attribute.substring(this.attribute.indexOf('(') + 1, this.attribute.length - 1), args = [];
            params.split(',').forEach(param => {
                let value = _.get(Common.getScope(this.element).scope, param);
                args.push(value != undefined ? value : param);
            });
            callback.call(null, ...args);
        }
    }
}