const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const Sensor = require('./models/Sensor');

const PORT = process.env.PORT || 3000;
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'password123';

// In-memory log for the dashboard (Blue Team)
const serverLogs = [];

const addLog = (type, message, ip) => {
    const entry = {
        timestamp: new Date().toISOString(),
        type, // INFO, WARN, SUCCESS, ALERT
        message,
        ip
    };
    serverLogs.push(entry);
    if (serverLogs.length > 100) serverLogs.shift();
    console.log(`[${entry.type}] ${entry.message} (${ip})`);
};

const init = async () => {
    await connectDB();

    const server = Hapi.server({
        port: PORT,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }
    });

    // IDS Logging Middleware
    server.ext('onRequest', (request, h) => {
        const ip = request.info.remoteAddress;
        addLog('INFO', `${request.method.toUpperCase()} ${request.path}`, ip);

        if (request.payload && JSON.stringify(request.payload).length > 2000) {
            addLog('ALERT', 'Large Payload Flood detected', ip);
        }
        return h.continue;
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: () => ({
            msg: 'IoT Command Center Online',
            version: '1.5.1',
            status: 'Operational',
            flag: 'CTF{iot_discovery_success}' // R1.1 Flag
        })
    });

    server.route({
        method: 'GET',
        path: '/api/logs',
        handler: () => serverLogs.filter(l => l.type !== 'INFO').reverse()
    });

    server.route({
        method: 'GET',
        path: '/api/stats',
        handler: async () => {
            const count = await Sensor.countDocuments();
            const latest = await Sensor.find().sort({ timestamp: -1 }).limit(10);
            return { totalReadings: count, latest };
        }
    });

    // VULNERABLE: Admin Login (Part C)
    server.route({
        method: 'POST',
        path: '/api/admin/login',
        handler: async (request, h) => {
            const { username, password } = request.payload || {};
            if (username === ADMIN_USER && password === ADMIN_PASS) {
                addLog('SUCCESS', 'Admin login', request.info.remoteAddress);
                return {
                    status: 'success',
                    message: 'Welcome Admin',
                    flag: 'CTF{brut3_f0rc3_m4st3r}' // R1.4 Flag
                };
            }
            addLog('WARN', `Failed login attempt for ${username}`, request.info.remoteAddress);
            return h.response({ status: 'fail', message: 'Invalid Credentials' }).code(401);
        }
    });

    // Receive Sensor Data - DEFENSE ADDED: Joi Validation
    server.route({
        method: 'POST',
        path: '/api/data',
        handler: async (request, h) => {
            try {
                const newReading = new Sensor(request.payload);
                await newReading.save();
                return h.response({ msg: 'Data Received' }).code(201);
            } catch (err) {
                addLog('ALERT', `Data Save Error: ${err.message}`, request.info.remoteAddress);
                return h.response({ error: err.message }).code(500);
            }
        },
        options: {
            validate: {
                payload: Joi.object({
                    deviceId: Joi.string().required(),
                    temp: Joi.number().required(),
                    humidity: Joi.number().required()
                }),
                failAction: (request, h, err) => {
                    addLog('ALERT', `Validation Failed: ${err.message}`, request.info.remoteAddress);
                    throw err;
                }
            }
        }
    });

    // VULNERABLE: NoSQL Injection in query (Part B)
    server.route({
        method: 'GET',
        path: '/api/data',
        handler: async (request, h) => {
            try {
                const query = request.query;
                if (JSON.stringify(query).includes('$')) {
                    addLog('ALERT', `NoSQL Injection attempt: ${JSON.stringify(query)}`, request.info.remoteAddress);
                }
                return await Sensor.find(query).limit(50);
            } catch (err) {
                return h.response({ error: err.message }).code(500);
            }
        }
    });

    // Provide Laboratory Guides (Markdown)
    server.route({
        method: 'GET',
        path: '/api/guides/{id}',
        handler: async (request, h) => {
            const guideId = request.params.id;
            const safeId = guideId.replace(/[^a-zA-Z0-9_-]/g, '');
            const filePath = path.join(__dirname, '../docs', `Part_${safeId}_Guide.md`);

            try {
                if (fs.existsSync(filePath)) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    return { id: guideId, content };
                }
                return h.response({ error: 'Guide not found' }).code(404);
            } catch (err) {
                return h.response({ error: 'Failed to read guide' }).code(500);
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
