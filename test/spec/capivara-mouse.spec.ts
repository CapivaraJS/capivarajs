import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of mousein and out', () => {
    const template = `
        <input cp-mouseover="$ctrl.mousein()" cp-mouseout="$ctrl.mouseout()" cp-model="$ctrl.test">
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.mousein = function() {
            $ctrl.test = 'mousein';
        };

        $ctrl.mouseout = function() {
            $ctrl.test = 'mouseout';
        };

        $ctrl.$onViewInit = () => {
            const evtIn = new Event('mouseover');
            const evtOut = new Event('mouseout');
            element.querySelector('input').dispatchEvent(evtIn);
            element.querySelector('input').dispatchEvent(evtOut);

            it('expect the element test have value mouseout', (done) => {
                expect(element.querySelector('input').value).toEqual('mouseout');
                done();
            });
        };

    });
});
