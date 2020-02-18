const mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  qty: {
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
