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

### 5. Start the Project Website (Blue Team Dashboard)
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
*Website runs at: http://localhost:3001*


## Learning Resources
- [Concepts](docs/Red_vs_Blue_Concepts.md): Role definitions and background.
- [IoT Security Primer](docs/IoT_Security_Primer.md): Supporting technical details.
- [Review Questions](docs/Questions.md): Test your knowledge.

## Scenarios
- **Part A (Static):** Intercept the traffic from `sensor.js` and spoof it. See [Part A Guide](docs/Part_A_Guide.md).
- **Part B (Dynamic):** Use NoSQL injection to find the hidden device ID. See [Part B Guide](docs/Part_B_Guide.md).
- **Part C (Auth):** Brute force the admin login. See [Part C Guide](docs/Part_C_Guide.md).
- **Part D (DoS):** Flood the server to disrupt service. See [Part D Guide](docs/Part_D_Guide.md).
- **Part E (Dashboard):** Use the web console to detect and respond to threats. See [Part E Guide](docs/Part_E_Guide.md).


## Tools
- **Blue Team Monitor (`/rpi_simulator/monitor.js`)**: A script to detect anomalies and surges in traffic.

