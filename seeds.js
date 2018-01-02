const Image = require('./models/images');
const mongoose = require('mongoose');

const seedData = [
  {
    url: 'https://i.imgur.com/tTTiLVx.jpg',
  },
  {
    url: 'https://i.imgur.com/6rpY8bL.jpg',
  },
  {
    url: 'https://i.imgur.com/XZRZt8Z.jpg',
  },
];

const seedDatabase = () => {
  Image.remove({}, (err) => {
    if (err) {
      console.log('Error: ', err);
    }
    console.log('Images removed');
    seedData.forEach((seed) => {
      Image.create(seed, (err, photo) => {
        if (err) {
          console.log('Error: ', err);
        } else {
          console.log('Image added.');
        }
      });
    });
  });
};

module.exports = seedDatabase;
