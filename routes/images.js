const express = require('express');
const middleware = require('../middleware');
const Image = require('../models/images');

const router = express.Router();


router.get('/', (req, res) => {
  Image.find({}, (err, images) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('images/images', { image: images });
      // console.log(images);
    }
  });
});

// SHOW Routes
router.get('/:id', (req, res) => {
  const imageId = req.params.id;
  Image.findById(imageId).populate('comments').exec((err, fetchedImage) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('images/show', { image: fetchedImage });
    }
  });
});

module.exports = router;
