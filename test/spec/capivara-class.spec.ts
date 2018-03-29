import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of class with fixed object', () => {
    const template = `
        <h1 cp-class="{'demo' : $ctrl.activeClass}"></h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.activeClass = true;

        $ctrl.$onInit = () => {
            it('Expected to add the class', () => {
                expect(element.querySelector('h1').classList.contains('demo')).toEqual(true);
            });
        };

    });
});

describe('test of class with dynamic object', () => {
    const template = `
        <h1 cp-class="$ctrl.getClass()"></h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;

        $ctrl.getClass = () => {
            return {
                ['demo'] : true,
            };
        };

        $ctrl.$onInit = () => {
            it("Expected to add the class", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1').classList.contains('demo')).toEqual(true);
                    done();
                });
            });
        };
    });
});
