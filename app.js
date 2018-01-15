const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride        = require('method-override');
const Image                 = require('./models/images');
const Comment               = require('./models/comments');
const session               = require('express-session');
const LocalStrategy         = require('passport-local');
const User                  = require('./models/user');
const flash                  = require('connect-flash');
const bodyParser            = require('body-parser');
const passport              = require('passport');
const mongoose              = require('mongoose');
const express               = require('express');
const mongoDb               = require('mongodb');
const seedDatabase          = require('./seeds');
const path                  = require('path');

// const router = express.Router();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/engagementk&d', { useMongoClient: true });

// seedDatabase();

// ==================
//   Passport Config
// ==================
app.use(session({
  secret: 'Random secret key that I haven\'t set in an environment variable...',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ==========================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.set('view engine', 'ejs');

// =======================
//  Restful routing below
// =======================

// Index routes
app.get('/', (req, res) => {
  res.render('./index/index');
});

app.get('/signup', (req, res) => {
  res.render('index/signup');
});

app.post('/signup', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    console.log(newUser);
    if (err) {
      req.flash('error', err.message);
      res.redirect('/signup');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Welcome to The Proposal, ${user.username}!`);
      return res.redirect('/images');
    });
  });
});

app.get('/login', (req, res) => {
  res.render('./index/login');
});

app.post('/login', passport.authenticate(
  'local',
  {
    successRedirect: '/images',
    failureRedirect: '/login',
  },
), (req, res) => {
});

app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out!');
  res.redirect('/');
});

// GET Routes
app.get('/images', (req, res) => {
  Image.find({}, (err, images) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('images', { image: images });
      console.log(images);
    }
  });
});

// SHOW Routes
app.get('/images/:id', (req, res) => {
  const imageId = req.params.id;
  Image.findById(imageId).populate('comments').exec((err, fetchedImage) => {
    console.log(fetchedImage);
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('show', { image: fetchedImage });
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Engagement running on port ${port}`);
});
