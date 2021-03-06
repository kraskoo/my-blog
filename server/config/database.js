const mongoose = require('mongoose');
const User = require('../models/User');
mongoose.Promise = global.Promise;

module.exports = (settings) => {
  mongoose.connect(settings.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;
  db.once('open', err => {
    if (err) {
      throw err;
    }

    console.log('MongoDB ready!');
    User.seedAdminUser();
  });
  db.on('error', err => console.log(`Database error: ${err}`));
};