import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of style with fixed object', () => {
    const template = `
        <h1 cp-style="{ background-color : $ctrl.activeStyle }"> Sample HTML text</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.activeStyle = 'red';

        $ctrl.$onInit = () => {
            it('Expected to add the style', () => {
                expect(element.querySelector('h1').style.background).toEqual('red');
            });
        };
    });
});

describe('test of style with dynamic object', () => {
    const template = `
        <h1 cp-class="$ctrl.getStyle()">Sample HTML text</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.color = 'blue';

        $ctrl.getStyle = () => {
            return {
                ['background-color'] : $ctrl.color,
            };
        };

        $ctrl.$onInit = () => {
            it("Expected to add the class", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1').style.background).toEqual('blue');
                    done();
                });
            });
        };
    });
});
