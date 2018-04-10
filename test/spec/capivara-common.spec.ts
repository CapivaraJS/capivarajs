import { } from 'jasmine';
import { Common } from '../../src/common';
import capivara from '../../src/index';

describe('test method evalInContext', () => {
    const person = { firstName: 'Mateus', lastName: 'Miranda de Almeida', age: 22 };
    it('Should return object first name', () => {
        expect(Common.evalInContext('firstName', person)).toEqual(person.firstName);
    });
    it('Should return object last name', () => {
        expect(Common.evalInContext('lastName', person)).toEqual(person.lastName);
    });
    it('Should return object first name and last name', () => {
        expect(Common.evalInContext('firstName + \' \' + lastName', person)).toEqual(person.firstName + ' ' + person.lastName);
    });
    it('Should return the sum of the values', () => {
        expect(Common.evalInContext('numberOne + numberTwo', { numberOne: 10, numberTwo: 20 })).toEqual(30);
    });
    it('Should return the values subtraction', () => {
        expect(Common.evalInContext('numberOne - numberTwo', { numberOne: 50, numberTwo: 10 })).toEqual(40);
    });
    it('Should return the division of values', () => {
        expect(Common.evalInContext('numberOne / numberTwo', { numberOne: 100, numberTwo: 10 })).toEqual(10);
    });
    it('Should return the multiplication of values', () => {
        expect(Common.evalInContext('numberOne * numberTwo', { numberOne: 100, numberTwo: 50 })).toEqual(5000);
    });
    it('Should return the value of the math operation', () => {
        expect(Common.evalInContext('numberOne + ((10 * numberTwo) / 25)', { numberOne: 70, numberTwo: 80 })).toEqual(102);
    });
});

describe('test method will test all the getAttribute functions', () => {
    const element = document.createElement('div');
    element.setAttribute('cp-show', 'myVariable');
    it('Should contain the attribute cp-show', () => {
        expect(Common.getAttributeCpShow(element)).toEqual('myVariable');
    });
    element.setAttribute('cp-if', 'myVariable');
    it('Should contain the attribute cp-if', () => {
        expect(Common.getAttributeCpIf(element)).toEqual('myVariable');
    });
    element.setAttribute('cp-else-if', 'myVariable');
    it('Should contain the attribute cp-else-if', () => {
        expect(Common.getAttributeCpElseIf(element)).toEqual('myVariable');
    });
    element.setAttribute('cp-else', 'myVariable');
    it('Should contain the attribute cp-else', () => {
        expect(Common.getAttributeCpElse(element)).toEqual('myVariable');
    });
    element.setAttribute('cp-init', 'myVariable');
    it('Should contain the attribute cp-init', () => {
        expect(Common.getAttributeCpInit(element)).toEqual('myVariable');
    });
    element.setAttribute('cp-class', 'myVariable');
    it('Should contain the attribute cp-class', () => {
        expect(Common.getAttributeCpClass(element)).toEqual('myVariable');
    });
    element.setAttribute('cp-style', 'myVariable');
    it('Should contain the attribute cp-style', () => {
        expect(Common.getAttributeCpStyle(element)).toEqual('myVariable');
    });
    element.setAttribute('cp-src', 'myVariable');
    it('Should contain the attribute cp-src', () => {
        expect(Common.getAttributeCpSrc(element)).toEqual('myVariable');
    });
});

describe('This will test the scope function', () => {
    const element = document.createElement('div');
    element.id = 'elementDiv';
    element.innerHTML = '<p>Simple example</p>';
    document.body.appendChild(element);
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.$onInit = function() {
            $ctrl.nome = "Test";
            it('Should get the scope with value of the name', () => {
                expect(Common.getScope(element).scope.$ctrl.nome).toEqual($ctrl.nome);
            });
        };
    });
});

describe('This will test the append function', () => {
    const element = document.createElement('div');
    element.id = 'elementDiv';
    element.innerHTML = '<p id="pDemo">Sample example</p>';
    document.body.appendChild(element);
    const pElement = document.getElementById('pDemo');
    const pSibling = document.createElement('p');
    pSibling.innerHTML = 'Hello';
    Common.appendBefore(pElement, pSibling);
    it('Should get the before element', () => {
        expect(pElement.previousElementSibling).toEqual(pSibling);
    });
    it('Should get the after element', () => {
        expect(pSibling.nextElementSibling).toEqual(pElement);
    });
});

describe('This will test the isNative function', () => {
    const element = document.createElement('div');
    element.id = 'elementDiv';
    element.innerHTML = '<p id="pDemo">Sample example</p>';
    document.body.appendChild(element);
    const pElement = document.getElementById('pDemo');
    const pAttr = pElement.getAttributeNode;
    it('Should get the native element', () => {
        expect(Common.isNative(pAttr)).toEqual(true);
    });
    it('Should get the native element', () => {
        expect(Common.isNative(pElement)).not.toEqual(true);
    });
});

describe('This will test the destroy element function', () => {
    const element = document.createElement('div');
    element.id = 'demo';
    const elementComment = document.createComment("Sample Comment");
    capivara.controller(element, function() { });
    Common.destroyElement(element, elementComment);
    it('Should destroy the element', () => {
        expect(element['$instance'].destroyed).toEqual(true);
    });
});

describe('This will test create element function', () => {
    const element = document.createElement('div');
    element.id = 'demo';
    const elementComment = document.createComment("Sample Comment");
    capivara.controller(element, function() { });
    Common.destroyElement(element, elementComment);
    Common.createElement(element, elementComment);
    it('Should create the element', () => {
        expect(element['$instance'].destroyed).toEqual(false);
    });
});

describe('This will test the getFirstKey function', () => {
    it('Should get the first key', () => {
        expect(Common.getFirstKey('Some Random: (text)')).toEqual('SomeRandom:text');
    });
});

describe('This will test the regexIndexOf function', () => {
    it('Should get machs with this regex', () => {
        expect(Common.regexIndexOf('abc', '[a-d]+', 0)).toEqual(0);
    });
    it('Should get no machs with this regex', () => {
        expect(Common.regexIndexOf('afg', '[a-d]+', 1)).not.toEqual(0);
    });
});

describe('This will test the getFunctionArgs function', () => {
    it('Should get the parameter of function', () => {
        const myFunction = (firstName, lastName) => {};
        expect(Common.getFunctionArgs(myFunction)).toEqual(["firstName", "lastName"]);
    });
});
