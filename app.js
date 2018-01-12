const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride        = require('method-override');
const Image                 = require('./models/images');
const session               = require('express-session');
const LocalStrategy         = require('passport-local');
const bodyParser            = require('body-parser');
const User                  = require('./models/user');
const passport              = require('passport');
const mongoose              = require('mongoose');
const express               = require('express');
const mongoDb               = require('mongodb');
const seedDatabase          = require('./seeds');
const path                  = require('path');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/engagementk&d', { useMongoClient: true });

seedDatabase();

// ==================
//   Passport Config
// ==================
app.use(session({
  secret: 'Random secret key that I haven\'t set in an environment variable',
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

app.set('view engine', 'ejs');

// =======================
//  Restful routing below
// =======================

// Index routes
app.get('/', (req, res) => {
  res.render('./index');
});

// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

app.post('/signup', (req, res) => {
  const newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/images/:id');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash(`success', 'Successfully Signed up, as ${user.username}`);
    });
  });
});

// app.get('/login', (req, res) => {
//   res.render('./index/login');
// });

app.post('/login', passport.authenticate(
  'local',
  {
    successRedirect: '/images/:id',
    failureRedirect: '/images/:id',
  },
), (req, res) => {
});

// GET Routes
app.get('/images', (req, res) => {
  Image.find({}, (err, images) => {
    console.log(images);
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('images', { images });
    }
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/index');
});

// SHOW Routes
app.get('/images/:id', (req, res) => {
  const imageId = req.params.id;
  Image.findById(imageId, (err, fetchedImage) => {
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
