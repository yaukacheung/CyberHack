const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sensor', SensorSchema);
