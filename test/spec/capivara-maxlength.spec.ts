import {} from 'jasmine';
import capivara from '../../src/index';

describe('Directive cp-maxlength', () => {

    it("Expected field maxLength are equal to 10", function(done) {
        const template = `
        <input type="text" cp-maxlength="10"/>
    `;
        const element = document.createElement('div');
        element.innerHTML = template;
        capivara.controller(element, function() {
            const $ctrl = this;
            $ctrl.$onViewInit = () => {
                setTimeout(function() {
                    expect(element.querySelector('input').maxLength).toEqual(10);
                    done();
                }, 0);
            };
        });
    });

    it("Expected field maxLength are equal to the local variable", function(done) {
        const template = `
        <input type="text" cp-maxlength="$ctrl.max"/>
    `;
        const element = document.createElement('div');
        element.innerHTML = template;
        capivara.controller(element, function() {
            const $ctrl = this;
            $ctrl.max = 20;
            $ctrl.$onViewInit = () => {
                setTimeout(function() {
                    expect(element.querySelector('input').maxLength).toEqual($ctrl.max);
                    done();
                }, 0);
            };
        });
    });
});
