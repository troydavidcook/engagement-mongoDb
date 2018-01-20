const mongoose = require('mongoose');

// This schema shows the 'ref'erence to different model, like a key would in pSQL.
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
