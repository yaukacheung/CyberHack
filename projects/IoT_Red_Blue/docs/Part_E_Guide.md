# Part E: Interactive Dashboard Analysis

## Objective
The IoT ecosystem now includes a **Blue Team Dashboard**. Your goal is to use this visualization tool to identify, correlate, and respond to various attacks.

## Scenario
Instead of looking at raw text logs, you must monitor the live charts and the **Security Logs** panel in the web interface to stay ahead of the Red Team.

## Red Team Instructions
1.  **Combined Attack:** Launch the NoSQL Injection (`Part B`) and the Brute Force (`Part C`) attacks simultaneously.
2.  **Stealth Attempt:** Try spoofing data at a very slow interval (once per minute). Does it show up differently on the charts?

## Blue Team Instructions
1.  **Monitor:** Open Chromium and navigate to `http://localhost:3001` (if running via `npm run dev`).
2.  **Detection Patterns:**
    *   **Data Spikes:** Notice how DoS attacks flatten the chart or cause gaps.
    *   **Log Correlation:** If you see a `[SUCCESS] Admin Login` in the logs but you didn't log in, you know a brute force attempt succeeded.
3.  **Incident Response:**
    *   Go to the **Control Panel** tab in the dashboard.
    *   Use the **Emergency Database Purge** buttons to clear the malicious data once you've documented the attack.
4.  **Analysis:** Compare the `totalReadings` count against your expected sensor traffic. If the count is significantly higher, investigation is required.

---

## Discussion Point
*How does visual monitoring improve response time compared to manual log checking? What are the dangers of "Alarm Fatigue"?*
