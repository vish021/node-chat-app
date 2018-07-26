const expect = require('expect');
const {isRealString} = require('./validations');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        expect(isRealString(123)).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        expect(isRealString('    ')).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        expect(isRealString(' this is valid   ')).toBe(true);
    });
});