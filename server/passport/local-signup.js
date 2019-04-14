const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const encryption = require('../utilities/encryption');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  email = email.trim();
  password = password.trim();
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName.trim();
  const user = { firstName, lastName, email, password };
  User.find({ email }).then(users => {
    if (users.length > 0) {
      return done('E-mail already exists!');
    }

    user.salt = encryption.generateSalt();
    user.password = encryption.generateHashedPassword(user.salt, user.password);
    user.roles = ['Regular'];
    User.create(user).then(() => {
      return done(null);
    }).catch(() => {
      return done('Something went wrong :( Check the form for errors.')
    });
  });
});