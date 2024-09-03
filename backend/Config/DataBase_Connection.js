const mongoose = require("mongoose");

const connectMongoDb = async () => {
  try {
    const MongoDb_Connection_String = process.env.MongoDb_Connection_String;
    await mongoose.connect(MongoDb_Connection_String, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
module.exports = connectMongoDb;
