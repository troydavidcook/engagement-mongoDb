const express = require('express');
const middleware = require('../middleware');
const BtsImage = require('../models/bts_images');

const router = express.Router();


router.get('/', (req, res) => {
  BtsImage.find({}, (err, btsImages) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('images/bts_images', { bts_image: btsImages });
    }
  });
});

// SHOW Routes
router.get('/:id', (req, res) => {
  const btsImageId = req.params.id;
  BtsImage.findById(btsImageId).populate('comments').exec((err, fetchedBtsImage) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('images/bts_show', { bts_image: fetchedBtsImage });
    }
  });
});

module.exports = router;
