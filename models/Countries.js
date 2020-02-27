const mongoose = require("mongoose");

const CountriesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("countries", CountriesSchema);
