const axios = require('axios');

// Red Team Tool: Floods the server with garbage data or tries injection
const SERVER_URL = 'http://localhost:3000/api/data';
const TARGET_ID = 'rpi-01'; // Spoofing the victim

const attack = async () => {
    // Spoofing attack
    const payload = {
        deviceId: TARGET_ID,
        temp: 999.99, // Anomaly
        humidity: 0
    };

    try {
        await axios.post(SERVER_URL, payload);
        console.log(`[ATTACK] Spoofed packet sent as ${TARGET_ID}`);
    } catch (err) {
        console.error(`[ATTACK] Failed: ${err.message}`);
    }
};

// Attack every 2 seconds
setInterval(attack, 2000);
console.log('Malicious Node started...');
