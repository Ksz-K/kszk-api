const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("todo", TodoSchema);
