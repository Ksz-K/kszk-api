const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("todo", TodoSchema);
