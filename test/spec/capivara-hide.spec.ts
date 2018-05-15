import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of hide with fixed object', () => {
    const template = `
        <h1 cp-hide="$ctrl.isActive">hide this</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = false;

        $ctrl.$onInit = () => {
            it("Expected to find the element", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1').style.display).toEqual('');
                    done();
                });
            });
        };
    });
});

describe('test of hide with dynamic object', () => {
    const template = `
        <h1 cp-hide="$ctrl.isActive">hide this</h1>
        <button cp-click="$ctrl.click()">Click me!<button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = false;

        $ctrl.click = () => {
            $ctrl.isActive = true;
        };

        $ctrl.$onViewInit = () => {
            element.querySelector('button').click();
            it("Expected to not find the element", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1').style.display).toEqual('none');
                    done();
                });
            }, 5000);
        };
    });
});
