import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of title change', () => {
    const template = `
    <h1 cp-title="$ctrl.var">test</h1> 
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function () {
        const $ctrl = this;
        $ctrl.var = 'test1';

        $ctrl.$onViewInit = () => {
            it('expect the element title = test1 be found', (done) => {
                expect(element.querySelector('h1').getAttribute("title"))
                    .toEqual('test1');
                done();
            })

            it('expect the element title = test2 be found', (done) => {
                $ctrl.var = 'test2';
                expect(element.querySelector('h1').getAttribute("title"))
                    .toEqual('test2');
                done();
            })
        };
    });
});
