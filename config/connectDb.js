const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL environment variable not set");
    }

    // Remove the deprecated options
    await mongoose.connect(process.env.DB_URL);

    console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`.bgRed);
    process.exit(1); 
  }
};

module.exports = connectDb;
