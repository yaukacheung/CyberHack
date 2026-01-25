# IoT Project Architecture

## System Overview
The system simulates a vulnerable IoT sensor network for educational "Red vs Blue" exercises.

![Architecture Diagram](https://mermaid.ink/img/pako:eNp1kMEKwjAMhl8l5LSDO_gA3gYv3gcYe5C26bC1WdcORcS7W908CD2F5M_3J4RAjZJAh90E_dE76J1uMDo7Y0Ff453CSl9h4-C8wW612e03K4i4N_R0kF-M8XqSjYILqKCh_8MXXFBrS6i1V1Brr6CD2r4l9FDbS-hHba-hH7W9gX7U9gb6Udsb6EftH6E3tX-E_qj9I_RH7R-hP2r_CP1R-0foT-2fYB-1_4l9_AEtC1w_)
*(Note: Diagram is conceptual logic)*

### Components

1.  **API Server (Target):**
    *   **Tech:** Node.js with Hapi.js framework.
    *   **Role:** Receives sensor data and serves a dashboard.
    *   **Vulnerabilities:**
        *   Unsecured `POST /api/data` endpoint (Missing Authentication).
        *   NoSQL Injection in `GET /api/data`.

2.  **Database:**
    *   **Tech:** MongoDB.
    *   **Role:** Stores sensor readings.
    *   **Red Team Goal:** Pollute this with fake data or extract hidden entries.

3.  **Sensor Network (Simulated):**
    *   **Tech:** Node.js scripts (`axios`).
    *   **`sensor.js`:** Legitimate node sending valid data.
    *   **`malicious_node.js`:** Tool for students to modify for attacks.

## Data Flow
`Sensor (RPI)` --> `HTTP POST` --> `Hapi Server` --> `Mongoose` --> `MongoDB`

## Security Posture (Default)
*   **Encryption:** None (HTTP).
*   **Auth:** None.
*   **Input Validation:** Minimal (Vulnerable to Spoofing & Injection).
