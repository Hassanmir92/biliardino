var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("Vote", voteSchema);