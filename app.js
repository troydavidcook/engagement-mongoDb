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
const seedImages            = require('./seeds');
const seedBtsImages         = require('./seedsbts');
const path                  = require('path');

// const router = express.Router();

const indexRoutes = require('./routes/index');
const imageRoutes = require('./routes/images');
const btsImageRoutes = require('./routes/bts_images');
const commentRoutes = require('./routes/comments');


const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://troydavidcook:l0gical@ds157667.mlab.com:57667/kevin_dallyn', { useMongoClient: true });
// mongoose.connect('mongodb://localhost/engagementk&d', { useMongoClient: true });

seedImages();
seedBtsImages();

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Engagement running on port ${port}`);
});

app.use(indexRoutes);
app.use('/images', imageRoutes);
app.use('/bts_images', btsImageRoutes);
app.use('/images/:id/comments', commentRoutes);

