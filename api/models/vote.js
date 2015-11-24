var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
  value: { type: Number, required: true }
});

module.exports = mongoose.model("Vote", voteSchema);