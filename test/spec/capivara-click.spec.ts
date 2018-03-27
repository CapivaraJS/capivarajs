import { } from 'jasmine';
import { Common } from '../../src/common';
import capivara from '../../src/index';

describe('test of click without parameters', () => {
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
});

describe('test of click with parameters method sum', () => {
    const template = `
        <input cp-model="$ctrl.numberOne" type="number"/>
        <input cp-model="$ctrl.numberTwo" type="number"/>
        <button cp-click="$ctrl.sum($ctrl.numberOne + $ctrl.numberTwo)"></button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;

    capivara.controller(element, function() {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $ctrl.numberOne = 90;
            $ctrl.numberTwo = 10;
        };

        $ctrl.sum = (value) => {
            $ctrl.result = value;
        };

    });

    it('Must be the sum of the two numbers', () => {
        element.querySelector('button').click();
        expect(element['$instance'].componentScope.$ctrl.result).toEqual(100);
    });

});

describe('test of click with parameters method subtract', () => {
    const template = `
        <input cp-model="$ctrl.numberOne" type="number"/>
        <input cp-model="$ctrl.numberTwo" type="number"/>
        <button cp-click="$ctrl.subtract($ctrl.numberOne - $ctrl.numberTwo)"></button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;

    capivara.controller(element, function() {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $ctrl.numberOne = 90;
            $ctrl.numberTwo = 10;
        };

        $ctrl.subtract = (value) => {
            $ctrl.result = value;
        };

    });

    it('Must be the subtraction of the two numbers', () => {
        element.querySelector('button').click();
        expect(element['$instance'].componentScope.$ctrl.result).toEqual(80);
    });

});

describe('test of click with parameters object', () => {
    const template = `
        <button cp-click="$ctrl.save($ctrl.person)"></button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;

    capivara.controller(element, function() {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $ctrl.person = {
                name: 'Mateus',
            };
        };

        $ctrl.save = (person) => {
            $ctrl.result = person;
        };

    });

    it('Must be the same object', () => {
        element.querySelector('button').click();
        expect(element['$instance'].componentScope.$ctrl.result).toEqual(element['$instance'].componentScope.$ctrl.person);
    });

});
