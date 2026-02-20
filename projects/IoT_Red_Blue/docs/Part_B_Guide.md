# Part B: The Dynamic Target & NoSQL Injection

## Objective
There is a "High Value" device hidden in the database collection. Its ID is NOT `rpi-01`, and it changes dynamically. Your goal is to bypass the application logic using **NoSQL Injection** to discover this hidden device and crash it with spoofed data.

> [!WARNING]
> **Real-World Scenario:** Unlike SQL Injection which targets relational databases via syntax manipulation, NoSQL injection targets the data structure itself (like JSON objects). Misconfigured MongoDB instances are a leading cause of data breaches.

---

## 🔴 Red Team Instructions (The Hunt)

### 1. Reconnaissance
You know the API allows querying devices via a GET request, but you don't know the secret ID.
- **Normal Request:** `GET /api/data?deviceId=rpi-01`

### 2. Vulnerability Exploitation
The backend likely uses a query format like `db.collection.find({ deviceId: req.query.deviceId })`. If the input is not strictly cast to a string, Express.js will parse nested query parameters into JavaScript objects.

- **Action:** Inject a MongoDB operator. We want to tell the database: "Give me data for any device where the ID is *NOT EQUAL* to `rpi-01`."
- **Payload:** `GET /api/data?deviceId[$ne]=rpi-01`

### 3. The Attack
- The server will process `{ deviceId: { $ne: "rpi-01" } }` and return an array containing the hidden device's telemetry (e.g., `secret-sensor-99`).
- **Action:** Using your script from Part A, flood the server with critical temperature data targeted specifically at `secret-sensor-99`.

---

## 🔵 Blue Team Instructions (Defense)

### 1. Detection
- **Action:** Review the server's HTTP access logs.
- **Indicator of Compromise (IoC):** Look for URL-encoded brackets in the request path: `%5B%24ne%5D` (which decodes to `[$ne]`).

### 2. Mitigation Strategy
The vulnerability exists because we lacked **Input Sanitization** and **Type Validation**.

- **Action:** Update the `/api/data` GET route in `server/index.js` to explicitly cast the input or use a validation library like `Joi`.

**Code Patch (Basic Remediation):**
```javascript
// Force the input to be a primitive string, preventing Object injection
const queriedId = String(req.query.deviceId);

// Or better, validate explicitly:
if (typeof req.query.deviceId !== 'string') {
    return res.status(400).json({ error: "Invalid Parameter Type" });
}

db.collection.find({ deviceId: queriedId });
```

### 3. Advanced Defense (Purple Team)
Consider using packages like `express-mongo-sanitize` globally across your application to recursively check `req.body` and `req.query` for keys beginning with `$` or `.`.
