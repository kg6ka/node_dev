var User = require('./users');
var l10n = require('./l10n/en');

var user = new User('John');
console.log(user.getName);
user.setName = 'Phile';
console.log(`${l10n.hello} ${user.getName}`);