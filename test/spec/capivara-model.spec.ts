import { } from 'jasmine';
import capivara from '../../src/index';

describe('test model scope to field', () => {
    const template = `
        <input cp-model="$ctrl.name"/>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $ctrl.name = 'Mateus Miranda';

            it("Expected field value is equal to scope", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('input').value).toEqual($ctrl.name);
                    done();
                });
            });

        };
    });
});

describe('test model field to scope', () => {
    const template = `
        <input cp-model="$ctrl.name"/>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.$onViewInit = () => {
            element.querySelector('input').setAttribute('value', 'Mateus Miranda');
            Object.keys(element['$scope'].mapDom.directives.cpModelsElements).forEach((key) => {
                element['$scope'].mapDom.directives.cpModelsElements[key].forEach((elm) => elm.applyValueInModel());
            });
            it("Expected field value is equal to scope", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('input').value).toEqual($ctrl.name);
                    done();
                });
            });
        };
    });
});
