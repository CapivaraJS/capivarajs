import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of click without parameters', () => {
    const template = `
        <input cp-model="$ctrl.var" $ctrl.change="$ctrl.change()" ">
        <button cp-click="$ctrl.clicked()"
        <h1>[[$ctrl.cont]]</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            this.cont = 0;
            this.var = 'hello';
        };

        this.clicked = function() {
            this.var = this.var + 'aaa';
        };

        this.change = () => {
            this.cont = this.cont + 1;
        };

        $ctrl.$onViewInit = () => {
            it('The value of the cont must be 3', (done) => {
                element.querySelector('button').click();
                element.querySelector('button').click();
                element.querySelector('button').click();
                expect(this.cont).toEqual('3');
                done();
            });
        };
    });
});
