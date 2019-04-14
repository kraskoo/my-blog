const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

module.exports = (app) => {
  app.use(bodyParser.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ limit: '200mb', extended: false }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.setHeader('Accept', 'application/json, multipart/form-data');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  app.use(passport.initialize());
  app.use(cors());
  console.log('Express ready!');
};