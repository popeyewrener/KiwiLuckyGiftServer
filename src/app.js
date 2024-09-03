// src/app.js

const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const spinRoutes = require('./routes/spinRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

// Database connection (assuming you have databaseConfig.js set up)
const connectDB = require('./config/databaseConfig');
connectDB();


app.use(express.json());

app.use(authMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the Spin API!');
});

// Mount spin routes
app.use('/spin', spinRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});