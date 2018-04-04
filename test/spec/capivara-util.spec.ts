import { } from 'jasmine';
import { Util } from '../../src/core/observer/util';

describe('Tests of the util methods', () => {
    const a = [1, 2, 3, 4, 5, 6, 7];
    const b = [1, 2, 3, 9];

    const result = Util.diff(a, b);
    it('should return added elements', function() {
        expect(result.added).toEqual(['9']);
    });

    it('should return deleted elements', function() {
        expect(result.deleted).toEqual(['4', '5', '6', '7']);
    });

    it('should return all the common elements on the array', function() {
        expect(result.all).toEqual(['4', '5', '6', '7', '9']);
    });
});

describe('Tests of the util methods', () => {
    const a = ['1', '2', '3', '4', '5', '6', '7'];
    const b = ['1', '2', '3', '9'];

    const firstResult = Util.compare(a, b);
    it('should return the comparison are false', function() {
        expect(firstResult).toEqual(false);
    });

    const c = ['1', '2', '3', '4', '5', '6', '7'];
    const d = ['1', '3', '2', '4', '5', '6', '7'];

    const secondResult = Util.compare(c, d);
    it('should return the comparison are false', function() {
        expect(secondResult).toEqual(false);
    });

    const thirdResult = Util.compare(c, a);
    it('should return the comparison are true', function() {
        expect(thirdResult).toEqual(true);
    });

});

describe('Tests of the util methods', () => {
    const person = {
        name: 'John',
        lastName: 'Smith',
    };
    const getKeys = Util.keys(person);

    it('should return the keys of the object', function() {
        expect(getKeys).toEqual(["name", "lastName"]);
    });
});

describe('Tests of the util methods', () => {
    const person = {
        name: 'John',
        lastName: 'Smith',
    };
    const otherPerson = Util.clone(person);
    it('should return true if the objects are equal', function() {
        expect(Util.keys(otherPerson)).toEqual(Util.keys(person));
    });
});
