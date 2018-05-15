import { } from 'jasmine';
import capivara from '../../src/index';
import { CPClick } from '../../src/map/directive/cp-click';

describe('test of click without parameters', () => {
    const template = `
        <button cp-click="$ctrl.toggleClicked()"></button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $ctrl.clicked = false;
        };

        $ctrl.toggleClicked = () => {
            $ctrl.clicked = !$ctrl.clicked;
        };

        $ctrl.$onViewInit = () => {
            it('The value of the variable must be true', () => {
                element.querySelector('button').click();
                expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(true);
            });
        };
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

        $ctrl.$onViewInit = () => {
            it('Must be the sum of the two numbers', () => {
                element.querySelector('button').click();
                expect(element['$instance'].componentScope.$ctrl.result).toEqual(100);
            });
        };

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

        $ctrl.$onViewInit = () => {
            it('Must be the subtraction of the two numbers', () => {
                element.querySelector('button').click();
                expect(element['$instance'].componentScope.$ctrl.result).toEqual(80);
            });
        };
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

        $ctrl.$onViewInit = () => {
            it('Must be the same object', () => {
                element.querySelector('button').click();
                expect(element['$instance'].componentScope.$ctrl.result).toEqual(element['$instance'].componentScope.$ctrl.person);
            });
        };

    });
});

describe('test methods', () => {
    const template = `
        <button cp-click="$ctrl.save()"></button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;

        $ctrl.save = function() {
            $ctrl.clicked = true;
        };

        $ctrl.$onViewInit = () => {
            const cpClick = new CPClick(element.querySelector('button'), null);
            it('Should create the click event', (done) => {
                cpClick.create();
                element.querySelector('button').click();
                setTimeout(() => {
                    expect(element.querySelector('button')['$scope'].scope.$ctrl.clicked).toEqual(true);
                    done();
                }, 1000);
            });
        };

    });
});
