# Part A: The Static Target

## Objective
A sensor node (`rpi-01`) is sending temperature data to the server. Your goal is to **intercept** or **spoof** this data to trigger a high-temperature alarm on the dashboard.

## Scenario
The sensor communicates over unencrypted HTTP (simulated).

## Red Team Instructions
1.  **Recon:** Observe the traffic (conceptually). You see `POST /api/data` with `{ "deviceId": "rpi-01" }`.
2.  **Attack:**
    *   Write a script (or use `curl`) to send a POST request pretending to be `rpi-01`.
    *   Set `temp` to `100`.
    *   `curl -X POST http://localhost:3000/api/data -d "deviceId=rpi-01&temp=100&humidity=50"`
3.  **Success Condition:** The database shows the 100-degree reading.

## Blue Team Instructions
1.  **Monitor:** Watch the database logs.
2.  **Detect:** Notice the sudden spike from `rpi-01` that doesn't match the 5-second interval.
3.  **Defend:**
    *   Implement an API Key check in `server/index.js`.
    *   Reject requests without the key.
