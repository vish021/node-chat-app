const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node'
        }, {
            id: 2,
            name: 'Jen',
            room: 'React'
        }, {
            id: 3,
            name: 'Vishal',
            room: 'Node'
        }];
    });

    it('Should add a new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Vishal',
            room: 'Test'
        };
        var addedUSer = users.addUser(user.id, user.name, user.room);
        expect(users.users).toMatchObject([user]);
    });

    it('should return the list of all users for Node course', () => {
        console.log(users.getUserList('Node'));
    });
});