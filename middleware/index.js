const Comment = require('../models/comments');

const middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(res, req, next) {
  if (req.authenticated()) {
    return next();
  }
  req.flash('error', 'Must be logged in.');
  res.redirect('/images/:id');
};

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
  const wineId = req.params.id;
  const commentId = req.params.comment_id;
  if (req.isAuthenticated()) {
    Comment.findById(commentId, (err, fetchedComment) => {
      if (err) {
        req.flash('error', 'Comment not found');
        res.redirect('back');
      } else if (fetchedComment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', 'Sorry, permission denied.');
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', 'Must be logged in.');
    res.redirect('back');
  }
};

module.exports = middlewareObj;
