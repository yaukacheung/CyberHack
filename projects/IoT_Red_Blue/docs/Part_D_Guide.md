# Part D: Denial of Service (DoS)

## Objective
IoT servers often have limited resources. Your goal is to **flood** the API with so many requests that legitimate sensors can no longer report their data.

## Scenario
The server processes every request synchronously and doesn't limit the number of connections from a single source.

## Red Team Instructions
1.  **Recon:** Observe the legitimate traffic from `sensor.js`.
2.  **Attack:**
    *   Write a script that sends thousands of POST requests per second to `/api/data`.
    *   Example (using a simple loop):
        ```javascript
        while(true) {
          axios.post('http://localhost:3000/api/data', { ... });
        }
        ```
3.  **Success Condition:** The legitimate `sensor.js` starts receiving `ECONNREFUSED` or timeout errors, and its data stops appearing in the database.

## Blue Team Instructions
1.  **Monitor:** Use a monitoring tool (like the automated `monitor.js`) to watch the request rate.
2.  **Detect:** Notice a massive spike in requests from a single IP address that doesn't match the known sensor IDs.
3.  **Defend:**
    *   **IP Blocking:** Use a firewall or middleware to drop all traffic from the malicious IP.
    *   **Throttling:** Implement a global rate limit for the `/api/data` endpoint.
    *   **Load Balancing:** (Conceptual) Distribute traffic across multiple instances to handle surges.
