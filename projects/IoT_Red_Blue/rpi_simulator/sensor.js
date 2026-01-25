const axios = require('axios');

const SERVER_URL = 'http://localhost:3000/api/data';
const DEVICE_ID = 'rpi-01';

const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const sendData = async () => {
    const payload = {
        deviceId: DEVICE_ID,
        temp: getRandomFloat(20, 30),
        humidity: getRandomInt(40, 60)
    };

    try {
        await axios.post(SERVER_URL, payload);
        console.log(`[${DEVICE_ID}] Data sent: T=${payload.temp}, H=${payload.humidity}`);
    } catch (err) {
        console.error(`[${DEVICE_ID}] Error: ${err.message}`);
    }
};

// Send data every 5 seconds
setInterval(sendData, 5000);
console.log(`Sensor ${DEVICE_ID} started...`);
