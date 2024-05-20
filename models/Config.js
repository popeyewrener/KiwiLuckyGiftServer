const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    dealerProfitPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    multiplierProbabilities: {
        type: Map,
        of: Number,
        required: true,
        validate: {
            validator: function (v) {
                return Array.from(v.values()).reduce((sum, prob) => sum + prob, 0) === 100;
            },
            message: 'Sum of probabilities must be 100%'
        }
    },
    totalSentGifts: {
        type: Number,
        required: true,
        default: 0
    },
    totalStreamerCommision: {
        type: Number,
        required: true,
        default: 0
    },
    totalDealerCommision: {
        type: Number,
        required: true,
        default: 0
    },
    totalLotteryPrize: {
        type: Number,
        required: true,
        default: 0
    }
    
    // Add more configuration parameters as needed
}, { timestamps: true, collection: 'Config'});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
