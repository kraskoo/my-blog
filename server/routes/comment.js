const express = require('express');
const router = new express.Router();
const { common: commonMessages, comment: messages } = require('../services/messages');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

router.post('/create', (req, res) => {
  const body = req.body;
  if (body) {
    const { content, author, postId } = body;
    Post.findById(postId).then(post => {
      Comment.create({ content, author, post: postId }).then((comment) => {
        post.comments.push(comment._id);
        post.save().then(() => {
          return res.status(200).json({
            success: true,
            message: messages.createdComment
          });
        }).catch(err => {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        });
      }).catch(err => {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      });
    }).catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    });
  } else {
    return res.status(400).json({
      success: false,
      message: commonMessages.requiredBody
    });
  }
});

module.exports = router;