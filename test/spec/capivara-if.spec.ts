import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of if with fixed object', () => {
    const template = `
        <h1 cp-if="$ctrl.isActive">Show this</h1>
        <button cp-click="$ctrl.click()">Click me!<button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.isActive = false;

        $ctrl.click = () => {
            $ctrl.isActive = !$ctrl.isActive;
        };

        $ctrl.$onInit = () => {
            it('Expected none html h1 tag', () => {
                expect(element.querySelector('h1')).toEqual(null);
            });
            setTimeout(function() { element.querySelector('button').click(); }, 1000);
            it('Expected html h1 tag', () => {
                setTimeout(function() {
                    expect(element.querySelector('h1')).not.toEqual(null);
                }, 3000);
            });
        };
    });
});
