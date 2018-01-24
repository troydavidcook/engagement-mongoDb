const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware');

const router = express.Router();

// =============================
//      Authorization Routes
// =============================

// -------------------------------
//    Passport User.register tool
// -------------------------------

// var newUser = new User({
//   username : username,
//   email : email,
//   tel : tel,
//   country : country
// });

// User.register(newUser, password, function(err, user) {
//  if (errors) {
//      // handle the error
//  }
//  passport.authenticate("local")(req, res, function() {
//      // redirect user or do whatever you want
//  });
// });
// }

router.get('/', (req, res) => {
  res.render('index/index');
});

router.get('/signup', (req, res) => {
  res.render('index/signup');
});

router.post('/signup', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    console.log(newUser);
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/signup');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Welcome to The Proposal, ${user.username}!`);
      return res.redirect('/images');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('index/login');
});

router.post('/login', passport.authenticate(
  'local',
  {
    successRedirect: '/images',
    failureRedirect: '/signup',
  },
), (req, res) => {
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out!');
  res.redirect('back');
});

module.exports = router;
