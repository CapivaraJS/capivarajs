import { } from 'jasmine';
import capivara from '../../src/index';

describe('test cpIf with static elements', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Not Show this</h1>
        <h2 cp-if="!$ctrl.isActive">Show this</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = false;

        $ctrl.$onInit = () => {
            it("Expected h1 not found and h2 was found", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1')['$$cpDestroyed']).toEqual(true);
                    expect(element.querySelector('h2')['$$cpDestroyed']).toEqual(false);
                    done();
                });
            });
        };
    });
});

describe('test cpIf with dynamic elements', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Show this</h1>
        <h2 cp-if="!$ctrl.isActive">Not Show this</h1>
        <button cp-click="$ctrl.clickMe()">Click me!</button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = true;
        $ctrl.clickMe = function() {
            $ctrl.isActive = !$ctrl.isActive;
        };

        $ctrl.$onInit = () => {
            it("Expected h1 found and h2 not found", function(done) {
                setTimeout(function() {
                    element.querySelector('button').click();
                    expect(element.querySelector('h1')['$$cpDestroyed']).toEqual(true);
                    expect(element.querySelector('h2')['$$cpDestroyed']).toEqual(false);
                    done();
                });
            });
        };
    });
});
