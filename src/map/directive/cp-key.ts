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
    private keyEvent;
    private keyPressed;
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
        this.keyPressed = '';
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
        let finalKeyCode = 0, value;

        this.keyEvent = this.directiveName.split('-')[1].split('.')[0];
        value = this.directiveName.replace('cp-' + this.keyEvent, '').replace(/ /g, '').split('.');
        value.forEach( (attr) => {
            const actualKeyCode =  this.getKeyCode(attr);
            if (actualKeyCode !== undefined) {
                this.keyPressed += actualKeyCode;
            }
        });

        finalKeyCode = parseInt(this.keyPressed, 10);
        const onKeyPress = (e) => {
            if (e.keyCode === finalKeyCode) {
                this.attribute = this.attribute.replace(/ /g, '');
                Common.executeFunctionCallback(this.element, this.attribute);
            }
        };

        // Remove the old element
        window.removeEventListener(this.keyEvent, onKeyPress);
        // Add a new element
        window.addEventListener(this.keyEvent, onKeyPress);
    }
}
