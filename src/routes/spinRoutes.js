// src/routes/spinRoutes.js

const express = require('express');
const router = express.Router();
const spinController = require('../controllers/spinController');
const historyController  = require('../controllers/historyController');

router.post('/', spinController.spinWheel);
router.post('/history', historyController.historyController);

module.exports = router;