//Dependencies///

const mongoose = require("mongoose");
const Schema = mongoose.Schema


///Schema ///
const productSchema = Schema({
  name: { type: String, required: true},
  description: { type: String},
  price: { type: Number, min: 0},
  qty: {type: Number,  min: 0},
  img: { type: String}
});



//Export -this will allow use of this  in the server.js file ///
const Product = mongoose.model("Product", productSchema);

module.exports= Product;
