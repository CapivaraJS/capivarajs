import { } from 'jasmine';
import {Eval} from '../../src/core/eval';

describe('This will be test the eval method', () => {
    const array = 'simple text';

    it('Should get the start index of the array', () => {
        expect(Eval.getIndexStart(array, 1)).toEqual(1);
    });
});

describe('This will be test the eval method', () => {
    const array = 'This is a complicated test';

    it('Should replace string on the array', () => {
        expect(Eval.replaceAt(array, 'complicated', 'easy', 0, array.length)).toEqual('This is a easy test');
    });
});

describe('This will be test the eval method', () => {
    const person = { firstName: 'Mateus', lastName: 'Miranda de Almeida', age: 22 };
    it('Should return object first name', () => {
        expect(Eval.exec('firstName', person)).toEqual(person.firstName);
    });
});
