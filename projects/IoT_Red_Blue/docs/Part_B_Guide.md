# Part B: The Dynamic Target

## Objective
There is a "High Value" device hidden in the database. Its ID is NOT `rpi-01`. It changes every time the simulation restarts (conceptually, or you can randomize it). Your goal is to find it and crash it.

## Scenario
The API has a vulnerability: **NoSQL Injection**.

## Red Team Instructions (The Hunt)
1.  **Recon:** You don't know the Device ID.
2.  **Vulnerability Scanning:**
    *   Try to query the GET endpoint: `GET /api/data?deviceId=...`
    *   What happens if you send a MongoDB operator instead of a string?
    *   Payload: `GET /api/data?deviceId[$ne]=rpi-01` (Find devices where ID is NOT rpi-01).
3.  **Exploit:**
    *   The server returns a list of *other* devices. One of them is the target (e.g., `secret-sensor-99`).
4.  **Attack:**
    *   Now flood the server with data for `secret-sensor-99`.

## Blue Team Instructions
1.  **Audit:** Review the code in `server/index.js`.
2.  **Fix:**
    *   Sanitize the `query` input.
    *   Ensure `deviceId` is always a String, never an Object (which allows `$ne`, `$gt`, etc.).
    *   Use Joi validation.
