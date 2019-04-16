const express = require('express');
const router = new express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { common: commonMessages, post: messages } = require('../services/messages');

router.post('/create', (req, res) => {
  const body = req.body;
  if (body) {
    const { title, content, author } = body;
    const creationDate = req.body.hasOwnProperty('creationDate') ? req.body.creationDate : new Date();
    Post.create({ title, content, author, creationDate }).then(() => {
      return res.status(200).json({
        success: true,
        message: messages.createdPost
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

router.get('/all', (_req, res) => {
  Post.find({}).populate('author').populate('comments').then(posts => {
    return res.status(200).json({
      success: 200,
      message: messages.getAll,
      posts: posts
    });
  }).catch(err => {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  });
});

router.get('/get/:id', (req, res) => {
  Post.findById(req.params.id).populate('author').populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'author',
      model: 'User'
    }
  }).then(post => {
    return res.status(200).json({
      success: true,
      message: messages.get(post._id),
      post
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
    const { title, content, creationDate } = body;
    Post.findById(id).then(post => {
      post.title = title;
      post.content = content;
      post.creationDate = creationDate;
      post.save().then(() => {
        return res.status(200).json({
          success: true,
          message: messages.editedPost
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