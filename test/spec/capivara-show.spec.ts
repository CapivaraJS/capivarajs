import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of show with fixed object', () => {
    const template = `
        <h1 cp-show="$ctrl.isActive">Show this</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = false;

        $ctrl.$onInit = () => {
            it("Expected to not find the element", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1').style.display).toEqual('none');
                    done();
                });
            }, 10000);
        };
    });
});

describe('test of show with dynamic object', () => {
    const template = `
        <h1 cp-show="$ctrl.isActive">Show this</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = true;

        $ctrl.$onInit = () => {
            it("Expected to not find the element", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1').style.display).toEqual('block');
                    done();
                });
            }, 10000);
        };

    });
});
