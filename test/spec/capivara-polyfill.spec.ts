import { } from 'jasmine';
import { Polyfill } from '../../src/core/observer/polyfill';

describe('test of polyfill methods', () => {
    const person = {
        name: 'John',
        lastName: 'Smith',
    };
    Polyfill.unWatchProperty(person, 'job');
    const keys = Object.keys(person);
    it('should unWatchProperty of a object ', function() {
        expect(keys.length).toEqual(3);
    });
});

// describe('test of polyfill methods', () => {
//     const person = {
//         name: 'John',
//         lastName: 'Smith',
//     };
//
//     const someFunc = function() {
//     };
//
//     Polyfill.setDirtyCheck(person, 1, '');
//     it('should setDirtyCheck of a object ', function() {
//         expect(person['__observer__']).toEqual(2);
//     });
// });

describe('test of polyfill methods', () => {
    const person = {
        name: 'John',
        lastName: 'Smith',
    };

    Polyfill.clearDirtyCheck(person);
    it('should setDirtyCheck of a object ', function() {
        expect(person['__observer__']).toEqual(undefined);
    });
});
