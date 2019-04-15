const authRoutes = require('../routes/auth');
const uploadRoutes = require('../routes/upload');
const staticRoutes = require('../routes/static');
const postRoutes = require('../routes/post');
const commentRoutes = require('../routes/comment');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/upload', uploadRoutes);
  app.use('/static', staticRoutes);
  app.use('/post', postRoutes);
  app.use('/comment', commentRoutes);
};