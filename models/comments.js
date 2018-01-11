const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  created: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.SchemaTypes.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
