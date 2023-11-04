const mongoose = require("mongoose");

const connectDatabase = async () => {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/shop");
  return db;
};


//default export
module.exports = connectDatabase;
