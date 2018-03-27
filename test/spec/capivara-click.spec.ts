import { } from 'jasmine';
import { Common } from '../../src/common';
import capivara from '../../src/index';

describe('test button cp-click', () => {
    const template = `
        <button cp-click="$ctrl.toogleClicked()"></button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function () {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $ctrl.clicked = false;
        };

        $ctrl.toogleClicked = () => {
            $ctrl.clicked = !$ctrl.clicked;
        };

    });

    it('The value of the variable must be true', () => {
        element.querySelector('button').click();
        expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(true);
    });

    it('The value of the variable must be false', () => {
        element.querySelector('button').click();
        expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(false);
    });

});
