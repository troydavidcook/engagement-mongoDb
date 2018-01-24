const mongoose = require('mongoose');
const BtsImage = require('./models/bts_images');

const seedBtsPageImages = [
  {
    url: 'https://i.imgur.com/ZIIqOc0.jpg',
  },
  {
    url: 'https://i.imgur.com/1S6fZid.jpg',
  },
  {
    url: 'https://i.imgur.com/NGMF13E.jpg',
  },
  {
    url: 'https://i.imgur.com/I7XQU34.jpg',
  },
  {
    url: 'https://i.imgur.com/pXhL5Te.jpg',
  },
  {
    url: 'https://i.imgur.com/gHET9Ws.jpg',
  },
  {
    url: 'https://i.imgur.com/uLBauxZ.jpg',
  },
];

const seedBtsImages = () => {
  BtsImage.remove({}, (err) => {
    if (err) {
      console.log('Error: ', err);
    }
    console.log('BtsImages removed');
    seedBtsPageImages.forEach((seed) => {
      BtsImage.create(seed, (err) => {
        if (err) {
          console.log('Error: ', err);
        } else {
          console.log('BtsImage added.');
        }
      });
    });
  });
};


module.exports = seedBtsImages;
