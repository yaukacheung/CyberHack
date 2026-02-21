# Part A: The Static Target & Traffic Spoofing

## Objective
A sensor node (`rpi-01`) is continuously sending temperature data to the central server. Your goal is to **intercept** or **spoof** this data to trigger a high-temperature alarm on the Blue Team dashboard.

> [!NOTE]
> **Real-World Scenario:** In 2017, researchers demonstrated how unencrypted telemetry from industrial temperature sensors could be spoofed to falsely trigger emergency shutdown procedures in manufacturing plants.

---

##  Red Team Instructions (Offense)

### 1. Reconnaissance
Before attacking, you must understand the normal baseline.
- **Action:** Observe the simulated traffic. You will notice clear-text HTTP `POST` requests being sent to `/api/data`.
- **Payload Structure:** `{ "deviceId": "rpi-01", "temp": "22.5", "timestamp": "..." }`

### 2. The Attack (Data Spoofing)
Since the server does not authenticate the origin of the data, anyone can pretend to be `rpi-01`.
- **Action:** Use `curl` or write a Python script to inject a critical temperature reading.
- **Command:**
  ```bash
  curl -X POST http://localhost:3000/api/data \
       -H "Content-Type: application/json" \
       -d '{"deviceId":"rpi-01","temp":150.0,"humidity":50}'
  ```

> [!TIP]
> **Pro Tip for Automation:** Create a bash loop to flood the system with varying high temperatures to make the attack harder to manually filter out.

### 3. Success Condition
The database registers the 150-degree reading, and the Blue Team Dashboard triggers an "URGENT" visual alert.

---

##  Blue Team Instructions (Defense)

### 1. Detection
- **Action:** Monitor the incoming logs in your terminal or SIEM dashboard. 
- **Indicator of Compromise (IoC):** You will see a sudden, physically impossible temperature spike (e.g., jumping from 22°C to 150°C in one second) that breaks the expected 5-second reporting interval.

### 2. Mitigation Strategy
The core issue is **Broken Access Control**. The server trusts any incoming data.
- **Action:** Implement a hardcoded API Key check or dynamic token validation in `server/index.js`.

**Code Patch (Example):**
```javascript
// Inside your POST /api/data route
const API_SECRET = process.env.SENSOR_SECRET || "default_secret";

if (req.headers['x-api-key'] !== API_SECRET) {
    return res.status(403).json({ error: "Unauthorized Sensor Request" });
}
```

### 3. Verification
Restart the server. The Red Team's `curl` command should now return a `403 Forbidden` error, while legitimate sensors (once updated with the key) continue to function.
