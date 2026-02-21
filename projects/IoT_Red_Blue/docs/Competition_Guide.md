# IoT Red vs Blue: Competition Guide

This guide outlines the rules, scoring, and workflow for the **Cyber Hack IoT Competition**. Students will work in teams of two, switching between offensive (Red) and defensive (Blue) roles.

##  Objective
Accumulate the highest score by successfully executing attacks (Red) and professionally securing the system (Blue).

##  Competition Format
- **Round 1 (45 mins):** Team A (Red) vs Team B (Blue).
- **Intermission (10 mins):** Review and Reset.
- **Round 2 (45 mins):** Team B (Red) vs Team A (Blue).

---

##  Red Team (Attackers)
Your goal is to compromise the IoT ecosystem using the vulnerabilities identified in Phases A-D.

| Task ID | Description | Points | Verification |
| :--- | :--- | :--- | :--- |
| **R1.1** | **Discovery**: Find the API server IP and open port. | 5 | Find the `flag` field in the root `/` response. |
| **R1.2** | **Enumeration**: List all active readings from `/api/data`. | 10 | Show `curl` response. |
| **R1.3** | **NoSQL Injection**: Use `$ne` operator to find the "Hidden Internal Device". | 20 | Capture the Device ID (starts with `CTF{`). |
| **R1.4** | **Brute Force**: Access the Admin Panel (`/api/admin/login`). | 25 | Capture the `flag` from the successful login response. |
| **R1.5** | **Spoofing**: Inject a reading with Temperature > 100°C. | 15 | Verify on the Blue Dashboard. |
| **R1.6** | **Denial of Service**: Successfully slow down or crash the dashboard. | 15 | Blue Team confirms lag. |

---

##  Blue Team (Defenders)
Your goal is to use the Dashboard and source code to identify and stop the Red Team.

| Task ID | Description | Points | Verification |
| :--- | :--- | :--- | :--- |
| **B1.1** | **Detection**: Identify the Red Team's IP address from logs. | 10 | Show log entry in Dashboard. |
| **B1.2** | **Remediation**: Implement `Joi` validation to stop malformed data. | 25 | Show code snippet in `index.js`. |
| **B1.3** | **Isolation**: Block the Red Team's IP via a firewall or server-side check. | 15 | Red Team confirms `403` status. |
| **B1.4** | **Analysis**: Correlate a spoofed packet with a specific log timestamp. | 10 | Explain the attack in the log. |
| **B1.5** | **Hardening**: Change the Admin password to a secure value. | 10 | Red Team confirms Brute Force fails. |
| **B1.6** | **Uptime**: Maintain a functional dashboard despite a DoS attack. | 20 | Continuous monitoring proof. |

---

##  Scoring & Submission
1.  **Submission**: Each team must maintain a **Scorecard.md** documenting their success with screenshots or command logs.
2.  **Verification**: The Instructor (or opposing team) must sign off on each achievement.
3.  **Bonus**: 10 bonus points for the most professional "Incident Report" written during the intermission.

##  Rules of Engagement
- Do not attack infrastructure outside of the `localhost` network.
- Do not use automated tools that could damage the host OS.
- All attacks must be documented to count for points.
