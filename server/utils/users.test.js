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

    it('should remove a user', () => {
        var user = users.users[0];
        var removedUser = users.removeUser(user.id);
        expect(removedUser).toMatchObject(user);
    });

    it('should not remove a user', () => {
        expect(users.removeUser(5)).toEqual(undefined);
    });

    it('should find a user', () => {
        expect(users.getUser(2)).toEqual(users.users[1]);
    });

    it('should not find a user', () => {
        expect(users.getUser(5)).toEqual(undefined);
    });

    it('should return the users name for Node course', () => {
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['Mike', 'Vishal']);
    });

    it('should return the users name for React course', () => {
        var userList = users.getUserList('React');

        expect(userList).toEqual(['Jen']);
    });
});