const mongoose = require('mongoose');
const Image = require('./models/images');
const BtsImage = require('./models/bts_images');

const seedPageImages = [
  {
    url: 'https://i.imgur.com/nGgBqpx.jpg',
  },
  {
    url: 'https://i.imgur.com/K1EaA47.jpg',
  },
  {
    url: 'https://i.imgur.com/Bo5BXp6.jpg',
  },
  {
    url: 'https://i.imgur.com/tqFPgrA.jpg',
  },
  {
    url: 'https://i.imgur.com/S7R5J98.jpg',
  },
  {
    url: 'https://i.imgur.com/LPOHxOt.jpg',
  },
  {
    url: 'https://i.imgur.com/STsEsKg.jpg',
  },
  {
    url: 'https://i.imgur.com/biA0qL4.jpg',
  },
  {
    url: 'https://i.imgur.com/FLJGJut.jpg',
  },
  {
    url: 'https://i.imgur.com/SVJ1Ele.jpg',
  },
  {
    url: 'https://i.imgur.com/EeUL98S.jpg',
  },
];

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

const seedImages = () => {
  Image.remove({}, (err) => {
    if (err) {
      console.log('Error: ', err);
    }
    console.log('Images removed');
    seedPageImages.forEach((seed) => {
      Image.create(seed, (err) => {
        if (err) {
          console.log('Error: ', err);
        } else {
          console.log('Image added.');
        }
      });
    });
  });
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


module.exports = seedImages;
