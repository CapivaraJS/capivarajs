import {} from 'jasmine';
import capivara from '../../src/index';

describe('Directive cp-disable', () => {

    it('Should check if disable is truth', () => {
        const template = `<button cp-disable="true" cp-click="$ctrl.addOne()"></button>`;
        const element = document.createElement('div');
        const btnSelect = element.querySelector('button');
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
        btnSelect.click();
        expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(0);
    });

    it('Should check if disable is false', () => {
        const template = `<button cp-disable="false" cp-click="$ctrl.addOne()"></button>`;
        const element = document.createElement('div');
        const btnSelect = element.querySelector('button');
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
        btnSelect.click();
        expect(element['$instance'].componentScope.$ctrl.clicked).toEqual(1);
    });

    it('Should update disable value changed', () => {
        const template = `<button cp-disable="$ctrl.clicked"></button>`;
        const element = document.createElement('div');
        const btnSelect = element.querySelector('button');
        element.innerHTML = template;
        capivara.controller(element, function() {
            const $ctrl = this;
            $ctrl.$onInit = () => {
                $ctrl.clicked = false;
            };
        });
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disable')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = true;
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(true);
            element['$instance'].componentScope.$ctrl.clicked = 'false';
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = 'true';
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(true);
            element['$instance'].componentScope.$ctrl.clicked = null;
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = undefined;
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = {};
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = [];
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = 0;
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = 1;
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(true);
            element['$instance'].componentScope.$ctrl.clicked = '0';
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(false);
            element['$instance'].componentScope.$ctrl.clicked = '1';
        }, 0);
        setTimeout(function() {
            expect(btnSelect.hasAttribute('disabled')).toEqual(true);
        }, 0);
    });
});
