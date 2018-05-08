import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of click without parameters', () => {
    const template = `
        <input cp-model="$ctrl.var" cp-change="$ctrl.change()">
        <button cp-click="$ctrl.clicked()">
        <input cp-model="$ctrl.cont">
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;

        this.$onInit = function() {
            this.var = 'hello';
            this.cont = 0;
        };

        this.clicked = function() {
            this.var = this.var + 'aaa';
        };

        this.change = function() {
            this.cont = this.cont + 1;
        };

        $ctrl.$onViewInit = () => {
            it('The value of the cont must be 3', (done) => {
                setTimeout(function() {
                    element.querySelector('button').click();
                    element.querySelector('button').click();
                    element.querySelector('button').click();
                    expect($ctrl.cont).toEqual(3);
                    done();
                }, 1000);
            });
        };
    });
});
