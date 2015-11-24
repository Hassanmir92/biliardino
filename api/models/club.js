var mongoose = require('mongoose');
var Vote     = mongoose.model('Vote');

var clubSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  numberOfTables: Number,
  address: String,
  lat: Number,
  lng: Number,
  votes: [Vote.schema],
  bookable: Boolean,
  approved: Boolean
});

module.exports = mongoose.model("Club", clubSchema);