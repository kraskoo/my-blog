const path = require('path');
const root = path.normalize(path.join(__dirname, '/../'));

module.exports = {
  common: {
    jwtSecretKey: 'my-bl0g'
  },
  requirements: {
    minFirstNameLength: 3,
    minLastNameLength: 3,
    minPasswordLength: 5
  },
  development: {
    rootPath: root,
    db: 'mongodb://localhost:27017/my-blog',
    port: 65535
  },
  production: {
    port: process.env.PORT
  }
};