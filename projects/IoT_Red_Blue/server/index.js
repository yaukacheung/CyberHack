const Hapi = require('@hapi/hapi');
const connectDB = require('./config/db');
const Sensor = require('./models/Sensor');

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
    if (serverLogs.length > 100) serverLogs.shift(); // Keep last 100
    console.log(`[${entry.type}] ${entry.message} (${ip})`);
};

const init = async () => {


    // Connect to Database
    await connectDB();

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // In a real app, restrict this
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        }
    });


    // Logging Middleware (Basic IDS/Monitor)
    server.ext('onRequest', (request, h) => {
        const ip = request.info.remoteAddress;
        const method = request.method.toUpperCase();
        const path = request.path;

        // Don't log internal dashboard polls too noisily if needed, but for now log everything
        addLog('INFO', `${method} ${path}`, ip);

        if (request.payload && JSON.stringify(request.payload).length > 2000) {
            addLog('ALERT', `Large Payload Flood detected`, ip);
        }

        return h.continue;
    });

    // Route: Root
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return { msg: 'IoT Command Center Online', version: '1.5.0' };
        }
    });

    // Route: Get Security Logs (For Dashboard)
    server.route({
        method: 'GET',
        path: '/api/logs',
        handler: (request, h) => {
            return serverLogs.filter(l => l.type !== 'INFO').reverse();
        }
    });

    // Route: Get Stats (For Dashboard)
    server.route({
        method: 'GET',
        path: '/api/stats',
        handler: async (request, h) => {
            const count = await Sensor.countDocuments();
            const latest = await Sensor.find().sort({ timestamp: -1 }).limit(10);
            return { totalReadings: count, latest };
        }
    });

    // Route: Reset Database (VULNERABLE: Weak Auth)
    server.route({
        method: 'POST',
        path: '/api/reset',
        handler: async (request, h) => {
            const { username, password } = request.payload || {};
            if (username === 'admin' && password === 'password123') {
                await Sensor.deleteMany({});
                addLog('SUCCESS', 'Database Reset by Admin', request.info.remoteAddress);
                return { status: 'success' };
            }
            addLog('WARN', 'Unauthorized Reset Attempt', request.info.remoteAddress);
            return h.response({ status: 'fail' }).code(401);
        }
    });

    // Route: Admin Login (VULNERABLE for Part C: Brute Force)
    server.route({
        method: 'POST',
        path: '/api/admin/login',
        handler: async (request, h) => {
            const { username, password } = request.payload;

            if (username === 'admin' && password === 'password123') {
                addLog('SUCCESS', `Admin login`, request.info.remoteAddress);
                return { status: 'success', message: 'Welcome Admin' };
            } else {
                addLog('WARN', `Failed login attempt for ${username}`, request.info.remoteAddress);
                return h.response({ status: 'fail', message: 'Invalid Credentials' }).code(401);
            }
        }
    });

    // Route: Receive Sensor Data (VULNERABLE: No Auth, No Rate Limit)
    server.route({
        method: 'POST',
        path: '/api/data',
        handler: async (request, h) => {
            try {
                const { deviceId, temp, humidity } = request.payload;

                const newReading = new Sensor({
                    deviceId,
                    temp,
                    humidity
                });

                await newReading.save();
                return h.response({ msg: 'Data Received' }).code(201);
            } catch (err) {
                addLog('ALERT', `Data Save Error: ${err.message}`, request.info.remoteAddress);
                return h.response({ error: err.message }).code(500);
            }
        }
    });

    // Route: Get Data (VULNERABLE: NoSQL Injection possible in query)
    server.route({
        method: 'GET',
        path: '/api/data',
        handler: async (request, h) => {
            try {
                const query = request.query;

                if (JSON.stringify(query).includes('$')) {
                    addLog('ALERT', `Possible NoSQL Injection attempt: ${JSON.stringify(query)}`, request.info.remoteAddress);
                }

                const data = await Sensor.find(query).limit(50);
                return data;
            } catch (err) {
                return h.response({ error: err.message }).code(500);
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
