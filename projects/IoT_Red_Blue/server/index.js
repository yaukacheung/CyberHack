const Hapi = require('@hapi/hapi');
const connectDB = require('./config/db');
const Sensor = require('./models/Sensor');

const init = async () => {

    // Connect to Database
    await connectDB();

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Route: Root
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'IoT Command Center Online';
        }
    });

    // Route: Receive Sensor Data (VULNERABLE: No Auth, No Rate Limit)
    server.route({
        method: 'POST',
        path: '/api/data',
        handler: async (request, h) => {
            try {
                const { deviceId, temp, humidity } = request.payload;

                // Intentionally weak validation?
                // For now, simple save
                const newReading = new Sensor({
                    deviceId,
                    temp,
                    humidity
                });

                await newReading.save();
                return h.response({ msg: 'Data Received' }).code(201);
            } catch (err) {
                return h.response({ error: err.message }).code(500);
            }
        }
    });

    // Route: Get Data (VULNERABLE: NoSQL Injection possible in query)
    // Dynamic Target logic could use this
    server.route({
        method: 'GET',
        path: '/api/data',
        handler: async (request, h) => {
            try {
                const query = request.query;
                // If user passes ?deviceId[$ne]=null, they dump everything.
                // This is a classic NoSQL injection if handled blindly.
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
