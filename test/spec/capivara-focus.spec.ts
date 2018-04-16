import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of focus', () => {
    const template = `
        <input cp-focus="$ctrl.teste()"/>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.focused = false;

        $ctrl.teste = () => {
            $ctrl.focused = true;
        };

        $ctrl.$onViewInit = () => {
            const event = new Event('focus');
            element.querySelector('input').dispatchEvent(event);
            it('Expected attribute focused is true', (done) => {
                setTimeout(() => {
                    expect($ctrl.focused).toEqual(true);
                    done();
                });
            });

        };
    });
});
