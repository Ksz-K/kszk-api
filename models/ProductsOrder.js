const mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});
const ProductsOrder = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  theCart: [orderSchema]
});
module.exports = mongoose.model("productsOrder", ProductsOrder);
