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
  //   theCart: {
  //     product_id: {
  //       type: String,
  //       required: true
  //     },
  //     qty: {
  //       type: String,
  //       required: true
  //     }
  //   }
  theCart: [orderSchema]
});
module.exports = mongoose.model("productsOrder", ProductsOrder);
