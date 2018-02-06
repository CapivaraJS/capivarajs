import _ from 'lodash';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';

export class CPClick {

    private element: any;
    private map: MapDom;
    private atribute;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.atribute = this.element.getAttribute(Constants.CLICK_ATRIBUTE_NAME);
        this.init();
    }

    init() {
        const onClick = (evt) => {
            this.atribute = this.atribute.replace(/ /g,'');
            let callback = _.get(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, this.atribute.substring(0, this.atribute.indexOf('(')));
            if(callback){
                let params = this.atribute.substring(this.atribute.indexOf('(') + 1, this.atribute.length -1), args = [];
                params.split(',').forEach(param => args.push(_.get(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, param)));
                callback.call(null, ...args);
            }
        }
        //Remove old event
        this.element.removeEventListener('click', onClick);
        //Add new event
        this.element.addEventListener('click', onClick);
    }

}