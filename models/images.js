const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],

});

module.exports = mongoose.model('Image', imageSchema);
