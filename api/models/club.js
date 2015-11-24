var mongoose = require('mongoose');
var Vote     = mongoose.model('Vote');

var clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  numberOfTables: Number,
  address: { type: String, required: true },
  lat: Number,
  lng: Number,
  votes: [Vote.schema],
  bookable: Boolean,
  approved: Boolean
});

module.exports = mongoose.model("Club", clubSchema);