import { } from 'jasmine';
import capivara from '../../src/index';

describe('test model scope to field', () => {
    const template = `
        <p></p>
        <input type="text" cp-maxlength="10"/>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $ctrl.name = 'Capivara J';

            it("Expected field value is equal to scope", function(done) {
                setTimeout(function() {
                    element.querySelector('input').value = $ctrl.name;
                    element.querySelector('p').innerHTML = element.querySelector('input').value;
                    expect(element.querySelector('p').innerHTML.length).toEqual($ctrl.name.length);
                    done();
                });
            });

        };
    });
});
