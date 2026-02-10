const mongoose = require('mongoose');
const Sensor = require('./models/Sensor');
require('dotenv').config({ path: '../.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/iot-red-blue';

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Add the hidden flag device for Task R1.3
        const flagDevice = await Sensor.findOneAndUpdate(
            { deviceId: 'CTF{n0sql_inj3ct_fl4g}' },
            {
                deviceId: 'CTF{n0sql_inj3ct_fl4g}',
                temp: 22.5,
                humidity: 45
            },
            { upsert: true, new: true }
        );

        console.log('Hidden device seeded successfully:', flagDevice.deviceId);
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
