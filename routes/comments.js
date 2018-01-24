const express = require('express');
const middleware = require('../middleware');
const Comment = require('../models/comments');
const Image = require('../models/images');

const router = express.Router({ mergeParams: true });


// New comment route
// router.get('/new', middleware.isLoggedIn, (req, res) => {
//   const imageId = req.params.id;
//   Image.findById(imageId, (err, image) => {
//     if (err) {
//       console.log('Error: ', err);
//     } else {
//       res.render('comments/new', { image });
//     }
//   });
// });

// Important association/ Create new comment route

router.post('/', middleware.isLoggedIn, (req, res) => {
  const imageId = req.params.id;
  Image.findById(imageId, (err, image) => {
    if (err) {
      console.log('Error: ', err);
      res.redirect('/images');
    } else {
      // Posting and assocciation.
      Comment.create(req.body.comment, (error, comment) => {
        if (err) {
          console.log('Error: ', error);
        } else {
          // add username and id to comment, then save.
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          image.comments.push(comment);
          image.save();
          req.flash('success', 'Successfully created comment.');
          res.redirect(`/images/${imageId}`);
        }
      });
    }
  });
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  const commentId = req.params.comment_id;
  Comment.findById(commentId, (err, fetchedComment) => {
    if (err) {
      console.log('Error: ', err);
      res.redirect('back');
    } else {
      res.render('comments/edit', { image_id: req.params.id, comment: fetchedComment });
      // Comment edit route
    }
  });
});

// Comment UPDATE route
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  const commentId = req.params.comment_id;
  const imageId = req.params.id;
  Comment.findByIdAndUpdate(commentId, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/images/${imageId}`);
    }
  });
});

// Comment destroy
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  const commentId = req.params.comment_id;
  const imageId = req.params.id;
  Comment.findByIdAndRemove(commentId, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      req.flash('success', 'Comment Deleted.');
      res.redirect(`/images/${imageId}`);
    }
  });
});

module.exports = router;
