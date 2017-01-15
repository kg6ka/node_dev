var user;

function User(name) {
    this.name = name;
}

Object.defineProperty(User.prototype, 'getName', {
    get: function() {
        return this.name;
    }
});

Object.defineProperty(User.prototype, 'setName', {
    set: function(name) {
        return this.name = name;
    }
});

if(module.parent) {
    module.exports = User;
    return;
}

user = new User('John');
user.setName = 'Phile';
console.log(user.getName);
