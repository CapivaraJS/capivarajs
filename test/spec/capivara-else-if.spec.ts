import { } from 'jasmine';
import capivara from '../../src/index';

describe('test cpElseIf hide element', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive === 1">Show this</h1>
        <h2 cp-else-if="$ctrl.isActive === 2">Show this</h2>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = 1;

        $ctrl.$onInit = () => {
            it("Expected h2 not found", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h2')['$$cpDestroyed']).toEqual(true);
                    done();
                });
            });
        };
    });
});

describe('test cpElseIf show element', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive === 1">Show this</h1>
        <h2 cp-else-if="$ctrl.isActive === 2">Show this</h2>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = 2;

        $ctrl.$onInit = () => {
            it("Expected h2 not found", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h2')['$$cpDestroyed']).toEqual(false);
                    done();
                });
            });
        };
    });
});
