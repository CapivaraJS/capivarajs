import {} from 'jasmine';
import capivara from '../../src/index';

describe('test of repeat with fixed object', () => {
    const template = `
    <h1 cp-repeat="person in $ctrl.persons">[[person.name]]</h1>
  `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.persons = [
            { name: 'John' },
            { name: 'Bob' },
            { name: 'Anna' },
            { name: 'Kyle' },
        ];

        $ctrl.$onInit = () => {
            it("Expected find 4 children", function(done) {
                setTimeout(function() {
                    expect(element.childElementCount).toEqual($ctrl.persons.length);
                    done();
                });
            }, 5000);
        };
    });
});

describe('test of repeat with dynamic object', () => {
    const template = `
    <h1 cp-repeat="person in $ctrl.persons">[[person.name]]</h1>
    <button type="button" cp-click="$ctrl.add()">Add Carlos</button>
  `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.persons = [
            { name: 'John' },
            { name: 'Bob' },
            { name: 'Anna' },
            { name: 'Kyle' },
        ];

        $ctrl.add = function() {
            $ctrl.persons.push({name: 'Carlos'});
        };

        $ctrl.$onInit = () => {
            setTimeout(function() { element.querySelector('button').click(); }, 2000);
            it("Expected find 5 children", function(done) {
                setTimeout(function() {
                    expect(element.childElementCount).toEqual($ctrl.persons.length);
                    done();
                });
            }, 5000);
        };
    });
});
