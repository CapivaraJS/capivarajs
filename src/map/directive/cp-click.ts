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

    isNative(fn){
        return (/\{\s*\[native code\]\s*\}/).test('' + fn);
    }

    getCallbackClick(element){
        let callback = _.get(element[Constants.SCOPE_ATTRIBUTE_NAME].scope, this.atribute.substring(0, this.atribute.indexOf('(')));
        if(!callback && element.parentNode && element.parentNode[Constants.SCOPE_ATTRIBUTE_NAME]){
            return this.getCallbackClick(element.parentNode);
        }
        return callback;
    }

    getIndexRow(element){
        let index = _.get(element[Constants.SCOPE_ATTRIBUTE_NAME].scope, Constants.REPEAT_INDEX_NAME);
        if(index == undefined && element.parentNode){
            return this.getIndexRow(element.parentNode);
        }
        return index;
    }

    init() {
        const onClick = (evt) => {
            this.atribute = this.atribute.replace(/ /g,'');
            let callback = this.getCallbackClick(this.element);
            if(callback && !this.isNative(callback)){
                let params = this.atribute.substring(this.atribute.indexOf('(') + 1, this.atribute.length -1), args = [];
                params.split(',').forEach(param => args.push(_.get(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, param)));
                callback.call(null, ...args);
            }
            // else{
            //     let atribute = this.atribute;
            //     const evalWithinContext = function(context, code){
            //         (function(code) { eval(code); }).apply(context, [code]);
            //     };
            //     evalWithinContext(this.element[Constants.SCOPE_ATTRIBUTE_NAME].scope, atribute);
            // }
        }
        //Remove old event
        this.element.removeEventListener('click', onClick);
        //Add new event
        this.element.addEventListener('click', onClick);
    }

}