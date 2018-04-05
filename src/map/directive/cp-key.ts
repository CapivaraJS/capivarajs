import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPKey implements Directive {

    private element: any;
    private map: MapDom;
    private attribute;
    private elementComment;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.element['cpKey'] = this;
        this.map = _map;
        this.attribute = Common.getAttributeCpKey(this.element);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.KEY_ATTRIBUTE_NAME} expected arguments`);
        }
        this.elementComment = document.createComment('cpKey ' + this.attribute);
    }

    public create() {
        this.init();
    }

    public init() {
        const onKeyPress = (e) => {
            if (e.key === "Enter") {
                this.attribute = this.attribute.replace(/ /g, '');
                Common.executeFunctionCallback(this.element, this.attribute);
            }
        };
        // Remove the old element
        window.removeEventListener("keydown", onKeyPress);
        // Add a new element
        window.addEventListener("keydown", onKeyPress);
    }
}
