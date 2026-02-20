# Part E: Interactive Dashboard Analysis & Incident Response

## Objective
The IoT ecosystem includes a React-based **Blue Team Dashboard** acting as a rudimentary Security Information and Event Management (SIEM) interface. Your goal is to utilize this visualization tool to identify, correlate, and respond to various attacks across the infrastructure in real-time.

> [!NOTE]
> **Real-World Scenario:** "Alarm Fatigue" is a massive problem in modern Security Operations Centers (SOCs). When analysts are bombarded with thousands of low-level alerts daily, they inevitably miss critical, high-severity attacks. Effective dashboards must filter noise and visualize trends.

---

## 🔴 Red Team Instructions (The Distraction)

### 1. The Smokescreen Attack
Launch multiple attacks simultaneously to overwhelm the Blue Team's cognitive load.
- **Action:** Start the Brute Force (`Part C`) against the admin panel.
- **Action:** While the Blue Team is investigating the failed logins, launch a stealthy NoSQL Injection (`Part B`) to extract the hidden device ID.

### 2. The Low-and-Slow Spoof
Try spoofing data at an incredibly slow interval (e.g., once every 3 minutes) instead of flooding. 
- **Goal:** Does the telemetry blend in? Can the Blue Team differentiate your injected data from normal fluctuations in the environment?

---

## 🔵 Blue Team Instructions (Defense & Response)

### 1. Active Monitoring
- **Action:** Open Chromium and navigate to `http://localhost:3001`. Monitor the live charts and the **Security Logs** panel.

### 2. Threat Hunting (Detection Patterns)
Don't just wait for the screen to flash red; actively hunt for anomalies in the visualization.

- **Data Spikes/Gaps:** Notice how DoS attacks flatten the chart (data stops arriving) or cause massive, vertical spikes in the request-per-second graph.
- **Log Correlation:** If you see a `[SUCCESS] Admin Login` event in the Security Logs, but the correlated IP address matches an IP that recently generated 500 `[FAILED] Admin Login` events... you have suffered a successful brute force breach.
- **Telemetry Anomalies:** A temperature reading that swings from 20°C to 80°C in one second is physically impossible for a room sensor. This indicates a Spoofing attack.

### 3. Incident Response (PICERL Implementation)
Follow the standardized response methodology directly from the dashboard.

- **Containment:** Navigate to the **Isolation Control** tab. Blacklist the offending IP address to sever the attacker's connection to the API.
- **Eradication/Recovery:** Once the vector is confirmed and patched, use the **Emergency Database Purge** function specifically targeting the malicious payload signatures to restore the database to a known clean state.

### 4. Verification & Reporting
Compare the `totalReadings` counter against your expected baseline. Document the timeline of the attack, the vulnerabilities exploited, and the steps taken to neutralize the threat in your final project report.
