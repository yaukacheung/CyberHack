const axios = require('axios');

const SERVER_URL = 'http://localhost:3000/api/data';
const DEVICE_ID = 'rpi-01';

const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const sendData = async () => {
    // Adding more realistic variability
    const data = {
        deviceId: 'rpi-01',
        temp: (20 + Math.random() * 5 + (Math.sin(Date.now() / 10000) * 2)).toFixed(2),
        humidity: (40 + Math.random() * 10).toFixed(1)
    };

    try {
        await axios.post(SERVER_URL, data);
        console.log(`[${DEVICE_ID}] Data sent: T=${data.temp}, H=${data.humidity}`);
    } catch (err) {
        console.error(`[${DEVICE_ID}] Error: ${err.message}`);
    }
};

// Send data every 5 seconds
setInterval(sendData, 5000);
console.log(`Sensor ${DEVICE_ID} started...`);
