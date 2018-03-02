import * as _ from 'lodash';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Common } from '../../common';

export class CPClick {

    private element: any;
    private map: MapDom;
    private attribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = this.element.getAttribute(Constants.CLICK_ATTRIBUTE_NAME);
        if(!this.attribute) {
            throw `syntax error ${Constants.CLICK_ATTRIBUTE_NAME} expected arguments`
        }
        this.init();
    }

    getIndexRow(element) {
        let index = _.get(Common.getScope(element).scope, Constants.REPEAT_INDEX_NAME);
        if (index == undefined && element.parentNode) {
            return this.getIndexRow(element.parentNode);
        }
        return index;
    }

    init() {
        const onClick = (evt) => {
            this.attribute = this.attribute.replace(/ /g, '');
            let callback = Common.getCallbackClick(this.element, this.attribute);
            if (callback && !Common.isNative(callback)) {
                let params = this.attribute.substring(this.attribute.indexOf('(') + 1, this.attribute.length - 1), args = [];
                params.split(',').forEach(param => args.push(_.get(Common.getScope(this.element).scope, param)));
                callback.call(null, ...args);
            }
        };
        //Remove old event
        this.element.removeEventListener('click', onClick);
        //Add new event
        this.element.addEventListener('click', onClick);
    }

}