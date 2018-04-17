import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of blur', () => {
    const template = `
        <input cp-blur="$ctrl.teste()"/>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.blured = false;

        $ctrl.teste = () => {
            $ctrl.blured = true;
        };

        $ctrl.$onViewInit = () => {
            const event = new Event('focus');
            const event2 = new Event('blur');
            element.querySelector('input').dispatchEvent(event);
            element.querySelector('input').dispatchEvent(event2);
            it('Expected attribute blured is true', (done) => {
                setTimeout(() => {
                    expect($ctrl.blured).toEqual(true);
                    done();
                });
            });

        };
    });
});
