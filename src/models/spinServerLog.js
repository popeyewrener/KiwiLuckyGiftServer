
const mongoose = require("mongoose");

const spinServerLogSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    amount: {type: Number, required: true},
    result: {type: String, required: true},
    timestamp: {type: Date, required: true, default: Date.now}



});

module.exports = mongoose.model("SpinServerLog", spinServerLogSchema);

