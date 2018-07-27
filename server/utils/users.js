/**
 *  Use new ES6 classes
 */
var _ = require('lodash');

class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var foundUser = this.getUser(id);
        
        if(foundUser) {
            _.remove(this.users, (user) => foundUser.id == user.id);
        }
        return foundUser;
    }

    getUser(id) {
        return _.find(this.users, {id});
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        
        return namesArray;
    }

}

module.exports = {Users};