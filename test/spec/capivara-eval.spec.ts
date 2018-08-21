import { } from 'jasmine';
import {Eval} from '../../src/core/eval';

describe('This will be test the eval method', () => {
    const person = { firstName: 'Mateus', lastName: 'Miranda de Almeida', age: 22 };
    it('Should return object first name', () => {
        expect(Eval.exec('firstName', person)).toEqual(person.firstName);
    });
});
