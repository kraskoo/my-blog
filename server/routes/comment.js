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

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  Comment.findById(id).populate('author').populate({
    path: 'post',
    model: 'Post',
    populate: {
      path: 'author',
      model: 'User'
    }
  }).then(comment => {
    return res.status(200).json({
      success: true,
      message: 'Successfully get comment!',
      comment
    });
  }).catch(err => {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  });
});

router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (body) {
    const { content } = body;
    Comment.findById(id).then(comment => {
      comment.content = content;
      comment.save().then(() => {
        return res.status(200).json({
          success: true,
          message: messages.editedComment
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

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  Comment.findById(id).populate({
    path: 'post',
    model: 'Post',
    populate: {
      path: 'comments',
      model: 'Comment'
    }
  }).then(comment => {
    const post = comment.post;
    post.comments.pull(comment._id);
    post.save().then(() => {
      Comment.findByIdAndRemove(comment._id).then(() => {
        return res.status(200).json({
          success: true,
          message: messages.deletedComment
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
});

module.exports = router;