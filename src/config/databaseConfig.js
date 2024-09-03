// src/config/databaseConfig.js

// Placeholder for database connection setup
// Replace with your actual database configuration (e.g., using Mongoose)
const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); 
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
   // process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;