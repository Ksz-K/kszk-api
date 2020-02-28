const mongoose = require("mongoose");

const PolandSchema = mongoose.Schema({
  place: {
    type: String,
    required: true
  },
  addInfo: {
    type: String,
    required: true
  },
  community: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  voivodeship: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("poland", PolandSchema);
