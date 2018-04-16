import {} from 'jasmine';
import capivara from '../../src/index';

describe('Directive cp-disabled', () => {

    it('Should check if disable is truth', () => {
        const template = `<button cp-disabled="true" cp-click="$ctrl.addOne()"></button>`;
        const element = document.createElement('div');
        element.innerHTML = template;
        capivara.controller(element, function() {
            const $ctrl = this;

            $ctrl.$onInit = () => {
                $ctrl.clicked = 0;
            };

            $ctrl.addOne = () => {
                $ctrl.clicked += 1;
            };
        });
        element.querySelector('button').click();
        expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(0);
    });

    it('Should check if disable is false', () => {
        const template = `<button cp-disabled="false" cp-click="$ctrl.addOne()"></button>`;
        const element = document.createElement('div');
        element.innerHTML = template;
        capivara.controller(element, function() {
            const $ctrl = this;

            $ctrl.$onInit = () => {
                $ctrl.clicked = 0;
            };

            $ctrl.addOne = () => {
                $ctrl.clicked += 1;
            };
        });
        element.querySelector('button').click();
        expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(1);
    });

    it('Should update disable value changed', () => {
        const template = `<button cp-disabled="$ctrl.clicked"></button>`;
        const element = document.createElement('div');
        element.innerHTML = template;
        capivara.controller(element, function() {
            const $ctrl = this;
            $ctrl.$onInit = () => {
                $ctrl.clicked = false;
            };
        });
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = true;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(true);
            element['$instance'].componentScope.$ctrl.clicked = false;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = true;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(true);
            element['$instance'].componentScope.$ctrl.clicked = null;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = undefined;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = {};
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = [];
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = 0;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = 1;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(true);
            element['$instance'].componentScope.$ctrl.clicked = 0;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = 1;
        }, 0);
        setTimeout(function() {
            expect(element.querySelector('button').hasAttribute('disabled')).toEqual(true);
        }, 0);
    });
});
