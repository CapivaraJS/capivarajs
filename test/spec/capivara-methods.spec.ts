import {} from 'jasmine';
import capivara from '../../src/index';

describe('test method isArray', () => {    
    it('Should not be an array', () => {
        expect(capivara.isArray({})).toBe(false);
    });
    it('Shoulded be array', () => {
        expect(
            capivara.isArray([]) &&
            capivara.isArray([{name: 'My Array'}])
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
            capivara.isObject(new Array())
        ).toBeTruthy();
    });
});