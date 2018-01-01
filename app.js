const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride = require('method-override');
const passportLocal = require('passport-local');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const mongoDb = require('mongodb');
const path = require('path');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/engagementk&d', { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.listen((port) => {
    console.log(`Engagement running on port ${port}`);
});