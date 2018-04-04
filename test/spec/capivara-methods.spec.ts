import { } from 'jasmine';
import { Capivara } from '../../src/core';

const capivara = new Capivara();

describe('test method isArray', () => {
    it('Should not be an array', () => {
        expect(capivara.isArray({})).toBe(false);
    });
    it('Shoulded be array', () => {
        expect(
            capivara.isArray([]) &&
            capivara.isArray([{name: 'My Array'}]),
        ).toBeTruthy();
    });
});

describe('test method isObject', () => {
    it('Should not be an object', () => {
        expect(capivara.isObject(Number(10))).toBe(false);
    });
    it('Should be an object', () => {
        expect(
            capivara.isObject(new Date()) &&
            capivara.isObject({}) &&
            capivara.isObject([]),
        ).toBeTruthy();
    });
});

describe('test method isObject', () => {
    const person = {
      name: 'John',
      lastName: "Smith",
    };
    it('Should be return true by person', () => {
        expect(capivara.isObjectConstructor(person)).toEqual(true);
    });
});

describe('test method isDate', () => {
    it('Should not be a Date', () => {
        expect(capivara.isDate(Array(10))).toBe(false);
    });
    it('Should be a Date', () => {
        expect(
            capivara.isDate(new Date()),
        ).toBeTruthy();
    });
});

describe('test method isElement', () => {
    it('Should not be a Element', () => {
        expect(capivara.isElement(String(10))).toBe(false);
    });
    it('Should be a Element', () => {
        const div = document.createElement('div');
        expect(capivara.isElement(div)).toBeTruthy();
    });
});

describe('test method isElement', () => {
    it('Should not be a Element', () => {
        expect(capivara.isFunction(Number(20))).toBe(false);
    });
    it('Should be a Element', () => {
        expect(
            capivara.isFunction(function() {
            }),
        ).toBeTruthy();
    });
});

describe('test method isNumber', () => {
    it('Should not be a Number', () => {
        expect(capivara.isNumber(String('this is a test'))).toBe(false);
    });
    it('Should be a Number', () => {
        expect(
            capivara.isNumber(10) &&
            capivara.isNumber(Number(20)),
        ).toBeTruthy();
    });
});

describe('test method isString', () => {
    it('Should not be a String', () => {
        expect(capivara.isString(['This is an array'])).toBe(false);
    });
    it('Should be a String', () => {
        expect(
            capivara.isString('This is a test') &&
            capivara.isString(String('and this it is too')),
        ).toBeTruthy();
    });
});

describe('test method replaceAll', () => {
    it('Should not be a Replace', () => {
        expect(capivara.replaceAll('This awesome framework is awesome', 'awesome', 'wonderful')).not.toEqual('This awesome framework is wonderful');
    });
    it('Should be a Replace', () => {
        expect(
            capivara.replaceAll('This awesome framework is awesome', 'awesome', 'wonderful')).toEqual('This wonderful framework is wonderful');
    });
});

describe('test method copy', () => {
    const person = {
        name: 'Bob',
        lastName: 'Smith',
    };
    const otherPerson = {
        name: 'Mark',
        lastName: 'Smith',
    };
    it('Should not be a copy', () => {
        expect(capivara.copy(person)).not.toEqual(otherPerson);
    });
    it('Should be a copy', () => {
        expect(capivara.copy(person)).toEqual(person);
    });
});

describe('test method merge', () => {
    const person = {
        name: 'Bob',
    };
    const samePerson = {
        lastName: 'Smith',
    };
    it('Should not be a merge, in this case the object will be attributed to the first object', () => {
        expect(capivara.merge(person, samePerson)).not.toEqual(samePerson);
    });
    it('Should be a merge, the same here', () => {
        expect(capivara.merge(person, samePerson)).toEqual(person);
   });
});

describe('test method $emit and $on', () => {
    capivara.$on('test', (param) => {
        it('Test parameter value', () => {
            expect(param).toEqual('Mateus');
        });
    });
    capivara.$emit('test', 'Mateus');
});

describe('test method componentBuilder', () => {
    const template = `
        <my-component id="demo"></my-component>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    document.body.appendChild(element);
    capivara.component('my-component', {
        template: '<h1 id="componentBuilder">Hello World</h1>',
    });
    capivara
        .componentBuilder(document.getElementById('demo'))
        .build();
    it('Test if the component was rendered', () => {
        expect(document.querySelector('h1#componentBuilder').innerHTML).toEqual('Hello World');
    });
});

describe('test constants', () => {
    const template = `
        <h1>{{$ctrl.label}}</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;

    capivara.constants({
        START_INTERPOLATION: '{{',
        END_INTERPOLATION: '}}',
    });

    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.label = 'Hello';

        $ctrl.$onViewInit = () => {
            it('Test if the component was rendered', (done) => {
                setTimeout(() => {
                    expect(element.querySelector('h1').innerHTML).toEqual($ctrl.label);
                    done();
                }, 1000);
            });
        };

    });
});
