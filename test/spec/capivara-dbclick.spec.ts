import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of double click', () => {
    const template = `
    <button cp-dbClick="$ctrl.foo()"></button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;

        $ctrl.foo = function() {
            $ctrl.flag = !$ctrl.flag;
        };

        $ctrl.$onViewInit = () => {
            $ctrl.flag = false;
            event = new Event('dblclick');
            element.querySelector('button').dispatchEvent(event);

            it('expect the flag toogled to be true', (done) => {
                setTimeout(() => {
                    expect($ctrl.flag).toEqual(true);
                    done();
                });
            }, 10000);

        };

    });
});
