# Part F: Customization & Extension Guide

## Objective
The goal of this final stage is to move beyond the guided scenarios and start customizing the environment. You will add new sensors, create custom attacks, and visualize new data on the dashboard.

## 1. Adding New Sensors
The system currently tracks `temp` (temperature). You can extend it to track `humidity` or `light`.

### Step 1: Update the Simulator
Open `rpi_simulator/sensor.js` and modify the payload:
```javascript
const payload = {
  deviceId: DEVICE_ID,
  temp: (Math.random() * 30 + 10).toFixed(2),
  humidity: (Math.random() * 50 + 30).toFixed(2), // New field
  timestamp: new Date().toISOString()
};
```

### Step 2: Update the Server
In `server/models/Reading.js` (if applicable) or where the API processes data, ensure the new fields are accepted.

## 2. Creating Custom Attacks
Modify `rpi_simulator/malicious_node.js` to simulate different threats:
- **Data Manipulation**: Instead of static numbers, try sending oscillating values that stay just below the alarm threshold.
- **Protocol Fuzzing**: Send non-JSON data or extremely long strings to the `/api/readings` endpoint to test the server's stability.

## 3. Dashboard Customization
The Blue Team Dashboard is built with React. You can modify the visualization logic in `client/src/app`.
- **New Charts**: Add a new `LineChart` component to track the newly added `humidity` data.
- **Alert Thresholds**: Modify the CSS in `globals.css` to change how "Urgent" alerts are highlighted.

## 4. Hardening the Defense
Use your knowledge from Chapter 10 of the textbook to improve the system:
- **Rate Limiting**: Implement a middleware in the server to block an IP if it sends more than 5 requests per second.
- **Encryption**: Proxy the simulator traffic through an SSL tunnel.

---

## Discussion Point
*Why is "extensibility" considered both a feature and a security risk in IoT systems? How can you allow users to add devices without opening new attack vectors?*
