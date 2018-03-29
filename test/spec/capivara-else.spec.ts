import { } from 'jasmine';
import capivara from '../../src/index';

describe('test cpElse hide element', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Show this</h1>
        <p cp-else id="thisH1">Not show this</p>
        <button cp-click="$ctrl.click()">Click me!</button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = true;

        $ctrl.$onInit = () => {
            it("Expected p not found", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('#thisH1')['$$cpDestroyed']).toEqual(true);
                    done();
                });
            });
        };
    });
});

describe('test cpElse show element', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Show this</h1>
        <p cp-else id="thisH1">Not show this</p>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = false;

        $ctrl.$onInit = () => {
            it("Expected p not found", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('#thisH1')['$$cpDestroyed']).toEqual(true);
                    done();
                });
            });
        };
    });
});
