import { } from 'jasmine';
import capivara from '../../src/index';

describe('test cpIf hide element', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Show this</h1>
        <button cp-click="$ctrl.click()">Click me!</button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = false;

        $ctrl.$onInit = () => {
            it("Expected h1 not found", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1')['$$cpDestroyed']).toEqual(true);
                    done();
                });
            });
        };
    });
});

describe('test cpIf show element', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Show this</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = true;

        $ctrl.$onInit = () => {
            it("Expected h1 not found", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1')['$$cpDestroyed']).toEqual(false);
                    done();
                });
            });
        };
    });
});
