var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Vishal';
        var text = 'This is test';
        var message = generateMessage(from, text);
        
        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });
});