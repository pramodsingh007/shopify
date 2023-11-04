const mongoose = require("mongoose");
require('dotenv').config()

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASS

const connectDatabase = async () => {
  const db = await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.bhci9is.mongodb.net/shop?retryWrites=true&w=majority`);
  return db;
};


//default export
module.exports = connectDatabase;
