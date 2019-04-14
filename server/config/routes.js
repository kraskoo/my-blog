const authRoutes = require('../routes/auth');
const uploadRoutes = require('../routes/upload');
const staticRoutes = require('../routes/static');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/upload', uploadRoutes);
  app.use('/static', staticRoutes);
};