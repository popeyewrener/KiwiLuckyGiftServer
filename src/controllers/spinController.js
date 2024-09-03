// src/controllers/spinController.js

// const SpinResult = require('../models/spinResultModel'); // Uncomment if using a database model

exports.spinWheel = async (req, res) => {
    try {
      const sections = ['1x',
  '500x',
  '2x',
  '1000x',
  '5x',
  "0.5x",
  '10x',
  '0.2x',
  '100x',
  '0.1x'];

  //probability of each section so that the wheel is fair
  const probability = [0.1, 0.05, 0.1, 0.01, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];

  //map the sections and probability to the wheel
  const wheel = sections.map((section, index) => ({
    section,
    probability: probability[index],
  }));

  //get a random number between 0 and 1
  const randomNumber = Math.random() *0.85;


  //initialize the cumulative probability to 0
  let cumulativeProbability = 0;

  //initialize the result to null
  let result = null;

  //loop through the wheel

  for (let i = 0; i < wheel.length; i++) {
    //add the probability of the current section to the cumulative probability
    cumulativeProbability += wheel[i].probability;

    //if the random number is less than the cumulative probability
    //the result is the current section
    if (randomNumber < cumulativeProbability) {
      result = wheel[i].section;
      break;
    }

  }


      


      //push log to history db

      
  
      // Simulate saving to database (replace with actual logic)
      // await SpinResult.create({ userId: req.body.userId, spinResult: result });
  
      res.status(200).json({ spinResult: result });
    } catch (error) {
      console.error('Error spinning the wheel:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };