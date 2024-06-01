const Config = require("../models/Config");


// Function to fetch configuration or use default values
async function getConfig() {
    let config;
    try {
        // Fetch configuration from the database
        config = await Config.findOne();

        // If config is null (no config found in the database), use default values
        if (!config) {
            config = {
                dealerProfitPercentage: 30, // Example default value
                multiplierProbabilities: new Map([
                    ['x1', 50],
                    ['x2', 30], // Example default probabilities
                    ['x3', 15],
                    ['x5', 5]
                ])
            };

            // Save default config to the database
            config = await Config.create(config);
        }

        return config;
    } catch (error) {
        console.error('Error fetching config:', error);
        throw error; // Handle or propagate the error as needed
    }
}
function calculateRewardMultiplier(multiplierProbabilities) {
    const totalProbability = Array.from(multiplierProbabilities.values()).reduce((sum, prob) => sum + prob, 0);
    const randomValue = Math.random() * totalProbability;
    let cumulativeProbability = 0;
  
    for (const [multiplier, probability] of multiplierProbabilities) {
      cumulativeProbability += probability;
      if (randomValue <= cumulativeProbability) {
        return parseInt(multiplier.replace("x", ""), 10);
      }
    }
  
    // Should never reach here (unless probabilities don't add up to 100)
    return 1; // Default to x1 in case of error
  }
module.exports = { getConfig, calculateRewardMultiplier };

// Example usage
// getConfig()
//     .then(config => {
//         console.log('Configuration:', config);
//         // Proceed with using the configuration
//     })
//     .catch(error => {
//         // Handle error
//     });
