/**
 * monitor.js - Blue Team Monitoring Tool
 * 
 * This tool simulates an IDS/Monitor by checking for attack patterns in the server behavior.
 * In a real scenario, this would tail a log file or listen to a stream.
 */

const axios = require('axios');

const TARGET_URL = 'http://localhost:3000/api/data';
const CHECK_INTERVAL = 3000;

console.log("--- IoT Blue Team Monitor Started ---");
console.log(`Target: ${TARGET_URL}`);
console.log("Status: Listening for anomalies...\n");

let lastCount = 0;

async function runCheck() {
    try {
        const response = await axios.get(TARGET_URL);
        const currentCount = response.data.length;

        if (lastCount !== 0 && currentCount - lastCount > 10) {
            console.error(`[CRITICAL] Data surge detected! ${currentCount - lastCount} new entries in 3 seconds.`);
            console.warn("[ADVICE] Check IP logs and implement rate limiting immediately.");
        } else if (lastCount !== 0 && currentCount - lastCount > 0) {
            console.log(`[INFO] Normal traffic: ${currentCount - lastCount} new readings.`);
        }

        lastCount = currentCount;
    } catch (err) {
        if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
            console.error("[ALERT] Server is UNREACHABLE! Possible DoS attack in progress.");
        } else {
            console.error(`[ERROR] Monitor failed: ${err.message}`);
        }
    }
}

setInterval(runCheck, CHECK_INTERVAL);
