import _ from 'lodash';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Scope } from '../../scope/scope';
import { Controller } from '../../controller';
import { Common } from '../../common';

export class CPRepeat {

    private map: MapDom;
    private attribute;
    private element;
    private originalElement;
    private referenceNode;
    private lastArray = [];

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element.cloneNode(true);
        this.originalElement = _element;
        this.map = _map;
        this.attribute = _element.getAttribute(Constants.REPEAT_ATTRIBUTE_NAME).replace(/\s+/g, ' ');
        this.referenceNode = document.createComment('start repeat ' + this.attribute);
        this.originalElement.replaceWith(this.referenceNode);
        Common.getScope(this.originalElement).$on('$onInit', () => this.applyLoop());
    }

    applyLoop() {
        let attributeAlias = this.attribute.substring(0, this.attribute.indexOf(Constants.REPEAT_ATTRIBUTE_OPERATOR));
        let attributeScope = this.attribute.substring(this.attribute.indexOf(Constants.REPEAT_ATTRIBUTE_OPERATOR) + Constants.REPEAT_ATTRIBUTE_OPERATOR.length, this.attribute.length);
        let array = _.get(Common.getScope(this.originalElement).scope, attributeScope);
        if (array && !_.isEqual(array, this.lastArray)) {
            this.lastArray = array.slice();
            this.removeChildes();
            this.loop(array, attributeAlias);            
        }
    }

    removeChildes(){
        Array.from(this.referenceNode.parentNode.childNodes)
            .forEach((elm: any) => {
                if(elm.nodeName == this.originalElement.nodeName || elm.nodeName == '#comment' && elm.data == 'end repeat ' + this.attribute){
                    this.referenceNode.parentNode.removeChild(elm);
                }
            })
    }

    loop(array, attributeAlias){
        array.map((row, index) => {
            let elm = this.element.cloneNode(true);
            elm.removeAttribute(Constants.REPEAT_ATTRIBUTE_NAME);
            this.referenceNode.parentNode.appendChild(elm);
            new Controller(elm, () => { });
            Common.getScope(elm).scope[attributeAlias] = row;
            Common.getScope(elm).scope[Constants.REPEAT_INDEX_NAME] = index;
            return elm;
        });
        this.referenceNode.parentNode.appendChild(document.createComment('end repeat ' + this.attribute));
    }

}