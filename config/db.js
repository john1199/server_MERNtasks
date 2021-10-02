const mongoose = require("mongoose");
require("dotenv").config();
 
const USER = process.env.USER_DB;
const PASS = process.env.PASSWORD;
const NAME = process.env.NAME_DB;
const URI = `mongodb+srv://${USER}:${PASS}@cluster0.rktjy.mongodb.net/${NAME}?retryWrites=true&w=majority`;
const conectarDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
