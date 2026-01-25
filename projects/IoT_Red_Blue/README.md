# IoT Intrusion & Defense Project (Red vs Blue)

This project simulates a vulnerable IoT environment for educational purposes. It consists of a central API server, a MongoDB database, and simulated sensor nodes.

## Prerequisites
- **Node.js**: v14+
- **MongoDB**: Must be running locally on port `27017`.

## Architecture
- **Server (`/server`)**: Hapi.js API with intentional vulnerabilities (Weak Auth, NoSQLi).
- **Simulator (`/rpi_simulator`)**: Node.js scripts to generate traffic.
    - `sensor.js`: Sends legitimate data.
    - `malicious_node.js`: Sends attack data.

## Setup & Running

### 1. Start the Database
Make sure your local MongoDB instance is running:
```bash
mongod --dbpath /data/db
```

### 2. Start the API Server
```bash
cd server
npm install
npm start
```
*Server runs at: http://localhost:3000*

### 3. Run the Simulator (Blue Team Traffic)
Open a new terminal:
```bash
cd rpi_simulator
npm install
node sensor.js
```

### 4. Run the Attack (Red Team)
Open a new terminal:
```bash
cd rpi_simulator
node malicious_node.js
```

## Scenarios
- **Part A (Static):** Intercept the traffic from `sensor.js` and spoof it. See `docs/Part_A_Guide.md`.
- **Part B (Dynamic):** Use NoSQL injection to find the hidden device ID. See `docs/Part_B_Guide.md`.
