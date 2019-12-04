const express = require('express');
const router = new express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { common: commonMessages, post: messages } = require('../services/messages');
const { archiveDates, topTwoLikedPosts } = require('../services/persist-data');

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

router.get('/all/:page', (req, res) => {
  let requestPage = 1;
  if (Object.keys(req.params).length > 0) {
    let { page } = req.params;
    requestPage = Number(page);
  }

  let isRanged = false;
  if (Object.keys(req.params).length > 0) {
    const { ranged } = req.query;
    isRanged = ranged.toLowerCase() === 'true'
  }

  let currentDate = new Date(Date.now());
  let month = Number(currentDate.getMonth());
  let year = Number(currentDate.getFullYear());
  let startDate = new Date(year, month, 1);
  let endDate = new Date(year, month, getDaysOfMonth(year, month));
  Post.find({}).populate('author').populate('comments').then(posts => {
    if (posts.length < 1) {
      return res.status(200).json({
        success: 200,
        message: messages.getAll,
        data: { posts: [], dates: [], topTwoLiked: [], count: 0 }
      });
    }

    const didTopTwoLikedPostsAreEmpty = topTwoLikedPosts.length === 0;
    if (didTopTwoLikedPostsAreEmpty) {
      let topTwo = posts.sort((a, b) => {
        const likeDiff = b.likes - a.likes;
        if (likeDiff === 0) {
          const datesDiff = b.creationDate - a.creationDate;
          if (datesDiff === 0) {
            return b.title.length - a.title.length;
          }

          return datesDiff;
        }

        return likeDiff;
      }).slice(0, 2);
      if (topTwo.length > 0) {
        topTwoLikedPosts.push(topTwo[0]);
      }

      if (topTwo.length > 1) {
        topTwoLikedPosts.push(topTwo[1]);
      }
    }

    let innerPosts = [];
    let dates = [];
    for (let post of posts) {
      dates.push({ post, date: post.creationDate });
      if (isRanged) {
        if (post.creationDate >= startDate && post.creationDate <= endDate) {
          innerPosts.push(post);
        }
      } else {
        innerPosts.push(post);
      }
    }

    dates = dates.sort((a, b) => b.date - a.date);
    const count = innerPosts.length;
    const hasDiffWithOriginal = count < 1;
    if (hasDiffWithOriginal) {
      const diff = dates.length < 2 ? dates.length - count : 2 - count;
      for (let i = 0; i < diff; i++) {
        innerPosts.push(dates.shift().post);
      }

      innerPosts = innerPosts.sort((a, b) => b.creationDate - a.creationDate);
    } else {
      // Skin (n - 1) * 5 posts then take first 5 posts (or go to page n)
      innerPosts = innerPosts.sort((a, b) => b.creationDate - a.creationDate).slice((requestPage - 1) * 5).slice(0, 5);
    }

    if (archiveDates.length === 0) {
      for (let i = 0; i < dates.length; i++) {
        if (hasDiffWithOriginal) {
          if (!archiveDates.includes(dates[i].date)) {
            archiveDates.push(dates[i].date);
          }
        } else {
          if (dates[i].date < startDate && !archiveDates.includes(dates[i].date)) {
            archiveDates.push(dates[i].date);
          }
        }
      }
    }

    return res.status(200).json({
      success: 200,
      message: messages.getAll,
      data: { posts: innerPosts, dates: archiveDates, topTwoLiked: topTwoLikedPosts, count }
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

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id).populate('comments').then(post => {
    const deletedComments = [];
    const comments = post.comments;
    comments.forEach(comment => {
      deletedComments.push(Comment.findByIdAndRemove(comment._id));
    });
    Promise.all(deletedComments).then(() => {
      Post.findByIdAndRemove(post._id).then(() => {
        return res.status(200).json({
          success: true,
          message: messages.deletedPost
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

router.get('/search/:search', (req, res) => {
  const params = req.params;
  if (params) {
    const { search } = params;
    Post.find({ content: { $regex: search, $options: 'i' } })
      .populate('author')
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
      .then(posts => {
        return res.status(200).json({
          success: true,
          message: messages.searchedPosts(posts.length),
          posts
        });
      }).catch(error => {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      })
  } else {
    return res.status(400).json({
      success: false,
      message: commonMessages.requiredParametes
    });
  }
});

router.get('/like/:id', (req, res) => {
  const params = req.params;
  if (params) {
    const { id } = params;
    Post.findById(id).populate('author').populate('comments').then(post => {
      let filtredPosts = topTwoLikedPosts.map((p, i) => ({ post: p, index: i }))
        .filter(p => p.post.title === post.title && p.post.content === post.content && p.post.creationDate === post.creationDate);
      if (filtredPosts.length > 0) {
        topTwoLikedPosts[filtredPosts[0].index].likes++;
      }

      ++post.likes;
      post.save().then(() => {
          filtredPosts = topTwoLikedPosts.filter(p => p.likes <= post.likes);
          if (filtredPosts.length > 0) {
            let temp = [...topTwoLikedPosts];
            temp.push(post);
            temp = temp.sort((a, b) => {
              const likeDiff = b.likes - a.likes;
              if (likeDiff === 0) {
                const datesDiff = b.creationDate - a.creationDate;
                if (datesDiff === 0) {
                  return b.title.length - a.title.length;
                }

                return datesDiff;
              }

              return likeDiff;
            }).slice(0, 2);
            topTwoLikedPosts.pop();
            topTwoLikedPosts.pop();
            topTwoLikedPosts.push(temp[0]);
            topTwoLikedPosts.push(temp[1]);
          }

        return res.status(200).json({
          success: true,
          message: messages.addedLike
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
      message: commonMessages.requiredParametes
    });
  }
});

router.get('/archives/:month/:year', (req, res) => {
  const params = req.params;
  if (params) {
    let { month, year } = params;
    month = Number(month);
    year = Number(year);
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month, getDaysOfMonth(year, month));
    Post.find({ creationDate: { $gte: startDate, $lte: endDate } }).populate('author').then(posts => {
      return res.status(200).json({
        success: true,
        message: messages.archivedPosts(startDate, endDate),
        posts
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
      message: commonMessages.requiredParametes
    });
  }
});

function getDaysOfMonth(year, month) {
  const oneDay = 24 * 60 * 60 * 1000;
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 1);
  const days = Math.round((monthEnd - monthStart) / (oneDay));
  return days;
}

function pushTopTwoIfEmpty(posts) {
}

module.exports = router;