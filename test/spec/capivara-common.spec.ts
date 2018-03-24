import {} from 'jasmine';
import { Common } from '../../src/common';

describe('test method evalInContext', () => {
    const person = { firstName: 'Mateus', lastName: 'Miranda de Almeida', idade: 22 };
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
    let element = document.createElement('div');
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
});

describe('This will test the scope function', () => {
    let element = document.createElement('div');
    element.id = 'elementDiv';
    element.innerHTML = '<p>Sample example</p>';
    document.body.appendChild(element);
    let otherElement = document.createElement('div');
    otherElement.id = 'otherElementDiv';
    element.innerHTML = '<p>This is Other sample example</p>';
    document.body.appendChild(otherElement);
    
    let scope = Common.getScope(element);

    it('Should not contain the getScope element', () =>{
        expect(Common.getScope(element)).not.toEqual(otherElement);
    });
    it('Should contain the getScope element', () => {
        expect(Common.getScope(element)).toEqual(scope);
    });
});

