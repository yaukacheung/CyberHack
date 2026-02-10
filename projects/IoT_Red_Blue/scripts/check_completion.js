const axios = require('axios');
require('dotenv').config({ path: '../.env' });

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const TASKS = [
    { id: 'R1.1', name: 'Discovery', endpoint: '/' },
    { id: 'R1.2', name: 'Enumeration', endpoint: '/api/readings' },
    { id: 'R1.3', name: 'NoSQL Injection', endpoint: '/api/data' },
    { id: 'R1.4', name: 'Brute Force', endpoint: '/api/admin/login' }
];

async function checkTasks() {
    console.log('--- IoT Competition: Task Completion Status ---');

    // Task R1.1
    try {
        const res = await axios.get(`${SERVER_URL}/`);
        if (res.data.flag === 'CTF{iot_discovery_success}') {
            console.log('[✅] R1.1 Discovery: COMPLETED (5 pts)');
        } else {
            console.log('[❌] R1.1 Discovery: INCOMPLETE');
        }
    } catch (e) {
        console.log('[❌] R1.1 Discovery: ERROR - Is the server running?');
    }

    // Task R1.3 (Checking if student can find hidden device - logic is illustrative)
    try {
        const res = await axios.get(`${SERVER_URL}/api/data?deviceId[$ne]=test`);
        const found = res.data.some(d => d.deviceId.startsWith('CTF{'));
        if (found) {
            console.log('[✅] R1.3 NoSQL Injection: COMPLETED (20 pts)');
        } else {
            console.log('[❌] R1.3 NoSQL Injection: INCOMPLETE');
        }
    } catch (e) {
        console.log('[❌] R1.3 NoSQL Injection: ERROR');
    }

    // Task R1.5 (Spoofing - check for temp > 100 in stats)
    try {
        const res = await axios.get(`${SERVER_URL}/api/stats`);
        const found = res.data.latest.some(d => d.temp > 100);
        if (found) {
            console.log('[✅] R1.5 Spoofing: COMPLETED (15 pts)');
        } else {
            console.log('[❌] R1.5 Spoofing: INCOMPLETE');
        }
    } catch (e) {
        console.log('[❌] R1.5 Spoofing: ERROR');
    }
}

checkTasks();
