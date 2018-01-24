const mongoose = require('mongoose');
const Image = require('./models/images');

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
    url: 'https://i.imgur.com/S7R5J98.jpg',
  },
  {
    url: 'https://i.imgur.com/LPOHxOt.jpg',
  },
  {
    url: 'https://i.imgur.com/STsEsKg.jpg',
  },
  {
    url: 'https://i.imgur.com/SVJ1Ele.jpg',
  },
  {
    url: 'https://i.imgur.com/biA0qL4.jpg',
  },
  {
    url: 'https://i.imgur.com/FLJGJut.jpg',
  },
  {
    url: 'https://i.imgur.com/EeUL98S.jpg',
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
};


module.exports = seedImages;
