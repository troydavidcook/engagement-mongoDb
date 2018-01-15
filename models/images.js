const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],

});

module.exports = mongoose.model('Image', imageSchema);
