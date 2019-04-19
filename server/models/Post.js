const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, ref: 'User', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  creationDate: { type: Date, required: true, default: Date.now },
  likes: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;