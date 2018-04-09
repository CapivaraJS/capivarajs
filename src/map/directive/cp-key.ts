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
    private directiveName;
    private keyCodes = {
        esc: 27,
        tab: 9,
        enter: 13,
        space: 32,
        up: 38,
        left: 37,
        right: 39,
        down: 40,
        delete: 8,
        alt: 18,
        ctrl: 17,
    };
    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.element['cpKey'] = this;
        this.map = _map;
        this.directiveName = this.element.attributes['0'].name;
        this.attribute = Common.getAttributeCpKey(this.element, this.directiveName);
        if (!this.attribute) {
            throw new Error(`syntax error ${Constants.KEY_ATTRIBUTE_NAME} expected arguments`);
        }
        this.elementComment = document.createComment('cpKey ' + this.attribute);
    }

    public create() {
        this.init();
    }

    public getKeyCode(attr) {
        if ( this.keyCodes[attr] !== undefined) {
            return this.keyCodes[attr];
        } else {
            return attr;
        }
    }

    public init() {
        let keyPressed = '';
        const value = this.directiveName.replace(Constants.KEY_ATTRIBUTE_NAME, '').replace(/ /g, '').split('.');
        value.forEach( (attr) => {
            const actualKeyCode =  this.getKeyCode(attr);
            if (actualKeyCode !== undefined) {
                keyPressed += actualKeyCode;
            }
        });
        const final = parseInt(keyPressed, 10);
        const onKeyPress = (e) => {
            if (e.keyCode === final) {

                this.attribute = this.attribute.replace(/ /g, '');
                Common.executeFunctionCallback(this.element, this.attribute);
            }
        };
        // Remove the old element
        window.removeEventListener("keypress", onKeyPress);
        // Add a new element
        window.addEventListener("keypress", onKeyPress);
    }
}
