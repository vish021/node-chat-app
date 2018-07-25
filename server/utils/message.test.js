var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Vishal';
        var text = 'This is test';
        var message = generateMessage(from, text);
        
        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Vishal';
        var latitude = 42.5;
        var longitude = -81.27;
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message).toMatchObject({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });
        expect(typeof message.createdAt).toBe('number');
    });
});