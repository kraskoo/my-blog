const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const requiredMessaage = '{PATH} is required';

const userSchema = new mongoose.Schema({
  email: { type: String, required: requiredMessaage, unique: true },
  firstName: { type: String, required: requiredMessaage },
  lastName: { type: String, required: requiredMessaage },
  salt: { type: String, required: requiredMessaage },
  password: { type: String, required: requiredMessaage },
  profilePicture: { type: String, required: requiredMessaage, default: 'http://localhost:65535/static/avatars/defaultProfilePicture.png' },
  info: { type: String, default: '' },
  roles: [{ type: String }]
});

userSchema.method(/* Don't use arrow functions in here!!! */ {
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.password;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) {
      return;
    }

    const salt = encryption.generateSalt();
    const password = encryption.generateHashedPassword(salt, 'admin');
    User.create({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Adminov',
      salt: salt,
      password: password,
      roles: [ 'Admin' ]
    });
  });
};