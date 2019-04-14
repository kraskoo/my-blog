const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  creationDate: { type: Date, required: true, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;