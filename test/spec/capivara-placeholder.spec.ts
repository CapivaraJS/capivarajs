import { } from 'jasmine';
import capivara from '../../src/index';

describe('placeholder test', () => {
    const template = `
        <input cp-placeholder="$ctrl.name"/> <button cp-click="$ctrl.test()">Testing</button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.name = 'Test';

        $ctrl.test = () => {
            $ctrl.name = 'Testing';
        };

        $ctrl.$onViewInit = () => {
            const event = new Event('click');
            element.querySelector('button').dispatchEvent(event);
            it('Expected attribute focused is true', (done) => {
                setTimeout(() => {
                    expect(element.querySelector('input').getAttribute('placeholder')).toEqual('Testing');
                    done();
                });
            });

        };
    });
});
