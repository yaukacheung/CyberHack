const axios = require('axios');
require('dotenv').config({ path: '../.env' });

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000/api/data';
const DEVICE_ID = process.env.DEVICE_ID || 'rpi-01';
const INTERVAL = parseInt(process.env.SEND_INTERVAL_MS) || 5000;

const sendData = async () => {
    const data = {
        deviceId: DEVICE_ID,
        temp: (20 + Math.random() * 5 + (Math.sin(Date.now() / 10000) * 2)).toFixed(2),
        humidity: (40 + Math.random() * 10).toFixed(1)
    };

    try {
        await axios.post(SERVER_URL, data);
        console.log(`[${DEVICE_ID}] Data sent: T=${data.temp}, H=${data.humidity}`);
    } catch (err) {
        console.error(`[${DEVICE_ID}] Connection Error: ${err.message}. Retrying in ${INTERVAL}ms...`);
    }
};

// Start the simulation
setInterval(sendData, INTERVAL);
console.log(`Sensor ${DEVICE_ID} started. Sending to ${SERVER_URL} every ${INTERVAL}ms`);
