import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of if with fixed object', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Show this</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = false;

        $ctrl.$onInit = () => {
            it('Expected to add the style', () => {
                expect(element.querySelector('h1')).toEqual(null);
            });
        };
    });
});
