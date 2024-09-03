// server.js
const express = require('express');
const app = express();
const port = 3000;

// Define the possible results for the fortune wheel
const results = [
  { id: 1, name: 'Loss', multiplier: 0 },
  { id: 2, name: 'Loss', multiplier: 0 },
  { id: 3, name: 'Loss', multiplier: 0 },
  { id: 4, name: 'Loss', multiplier: 0 },
  { id: 5, name: 'Loss', multiplier: 0 },
  { id: 6, name: '1x', multiplier: 1 },
  { id: 7, name: '2x', multiplier: 2 },
  { id: 8, name: '3x', multiplier: 3 },
  { id: 9, name: '5x', multiplier: 5 },
  { id: 10, name: '10x', multiplier: 10 },
  { id: 11, name: '100x', multiplier: 100 },
];

// Define the probabilities for each result
const probabilities = [
  0.4, // Loss
  0.3, // Loss
  0.1, // Loss
  0.05, // Loss
  0.05, // Loss
  0.05, // 1x
  0.02, // 2x
  0.01, // 3x
  0.005, // 5x
  0.002, // 10x
  0.001, // 100x
];

// Calculate the total probability sum
const totalProbabilitySum = probabilities.reduce((a, b) => a + b, 0);

// Normalize the probabilities
const normalizedProbabilities = probabilities.map((p) => p / totalProbabilitySum);

// Function to get a random result based on the probabilities
function getRandomResult() {
  const random = Math.random();
  let cumulativeProbability = 0;
  for (let i = 0; i < normalizedProbabilities.length; i++) {
    cumulativeProbability += normalizedProbabilities[i];
    if (random <= cumulativeProbability) {
      return results[i];
    }
  }
  return results[0]; // Default to the first result if none of the above conditions are met
}

// Route to get a random result for the fortune wheel
app.get('/spin', (req, res) => {
  const result = getRandomResult();
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});