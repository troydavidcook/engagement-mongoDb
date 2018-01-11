const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride        = require('method-override');
const LocalStrategy         = require('passport-local');
const session               = require('express-session');
const bodyParser            = require('body-parser');
const Image                 = require('./models/images');
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

app.get('/signup', (req, res) => {
  res.render('/signup');
});

app.get('/login', (req, res) => {
  res.render('./index/login'); 
});

// GET Routes
app.get('/photos', (req, res) => {
  Image.find({}, (err, photos) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('photos', { photos });
    }
  });
});

// SHOW Routes
app.get('/photos/:id', (req, res) => {
  const imageId = req.params.id;
  Image.findById(imageId, (err, fetchedImage) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('show', { photo: fetchedImage });
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Engagement running on port ${port}`);
});
