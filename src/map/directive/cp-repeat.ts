import _ from 'lodash';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Scope } from '../../scope/scope';
import { Controller } from '../../controller';

export class CPRepeat {

    private map: MapDom;
    private atribute;
    private element;
    private originalElement;
    private referenceNode;
    private lastArray = [];

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element.cloneNode(true);
        this.originalElement = _element;
        this.map = _map;
        this.atribute = _element.getAttribute(Constants.REPEAT_ATRIBUTE_NAME).replace(/\s+/g, ' ');
        this.referenceNode = document.createComment('start repeat ' + this.atribute);
        this.originalElement.replaceWith(this.referenceNode);
        this.originalElement[Constants.SCOPE_ATTRIBUTE_NAME].$on('$onInit', () => this.applyLoop());
    }

    applyLoop() {
        let attributeAlias = this.atribute.substring(0, this.atribute.indexOf(Constants.REPEAT_ATRIBUTE_OPERATOR));
        let attributeScope = this.atribute.substring(this.atribute.indexOf(Constants.REPEAT_ATRIBUTE_OPERATOR) + Constants.REPEAT_ATRIBUTE_OPERATOR.length, this.atribute.length);
        let array = _.get(this.originalElement[Constants.SCOPE_ATTRIBUTE_NAME].scope, attributeScope);
        if (array && !_.isEqual(array, this.lastArray)) {
            this.lastArray = array.slice();
            this.removeChilds();
            this.loop(array, attributeAlias);            
        }
    }

    removeChilds(){
        Array.from(this.referenceNode.parentNode.childNodes)
            .forEach((elm: any) => {
                if(elm.nodeName == this.originalElement.nodeName || elm.nodeName == '#comment' && elm.data == 'end repeat ' + this.atribute){
                    this.referenceNode.parentNode.removeChild(elm);
                }
            })
    }

    loop(array, attributeAlias){
        array.map((row, index) => {
            let elm = this.element.cloneNode(true);
            elm.removeAttribute(Constants.REPEAT_ATRIBUTE_NAME);
            this.referenceNode.parentNode.appendChild(elm);
            new Controller(elm, () => { });
            elm[Constants.SCOPE_ATTRIBUTE_NAME].scope[attributeAlias] = row;
            elm[Constants.SCOPE_ATTRIBUTE_NAME].scope[Constants.REPEAT_INDEX_NAME] = index;
            return elm;
        })
        this.referenceNode.parentNode.appendChild(document.createComment('end repeat ' + this.atribute));
    }

}