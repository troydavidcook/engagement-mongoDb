const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  image: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],

});

module.exports = mongoose.model('Image', ImageSchema);
