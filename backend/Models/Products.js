const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true ,default:0},
    imgUrl:{ type: String, required: true },
    description: String
  });
  
  const Product = mongoose.model('Product', productSchema);

  module.exports=Product;