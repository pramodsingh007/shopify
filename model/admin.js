const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description: {
    type:String,
    required:true
  },
  imageUrl: {
    type:String,
    required:true
  },
  userId:{
    type:ObjectId,
    required:true
  }
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
