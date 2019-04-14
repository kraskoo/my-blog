const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../config/settings').common.jwtSecretKey;
const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userToLogin = { email: email.trim(), password: password.trim() };
  User.findOne({ email }).then(user => {
    if (!user || !user.authenticate(userToLogin.password)) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';
      return done(error);
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, jwtSecretKey);
    const data = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture
    };
    if (user.roles) {
      data.roles = user.roles;
    }

    return done(null, token, data)
  });
});