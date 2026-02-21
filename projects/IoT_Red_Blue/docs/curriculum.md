# IoT Red vs Blue: Professional Curriculum Roadmap

Welcome to the **IoT Intrusion & Defense Capstone Project**. This intensive program is divided into six progressive laboratory phases, escalating from basic network discovery to advanced system modification and threat hunting.

---

##  The Learning Path

### [Phase A: Traffic Spoofing (Broken Access Control)](Part_A_Guide.md)
Discover the network architecture and simulate an attacker injecting falsified, critical telemetry into an unauthenticated API endpoint. Learn how to implement cryptographic API key validation.

### [Phase B: The Dynamic Target (NoSQL Injection)](Part_B_Guide.md)
Exploit a massive flaw in the application's input processing logic. Utilize a MongoDB NoSQL injection to discover a dynamically hidden device profile and bypass the frontend interface.

### [Phase C: Weak Authentication (Credential Stuffing)](Part_C_Guide.md)
Intercept administrative login traffic and launch an automated brute-force attack. Transition to the Blue Team to aggressively implement rate limiting and account lockout methodologies.

### [Phase D: Resource Exhaustion (Application DoS)](Part_D_Guide.md)
Write asynchronous scripts designed to overwhelm the Node.js event pool, causing a Denial of Service. Understand the critical differences between Application-Layer throttling and OS-level IP blacklisting.

### [Phase E: Interactive SIEM Analysis (Incident Response)](Part_E_Guide.md)
Assume the role of a Tier-2 Security Operations Center (SOC) Analyst. Utilize the React Dashboard to correlate complex log data, identify stealth attacks amidst the noise, and execute the PICERL Incident Response methodology.

### [Phase F: Customization, Extension & Hardening](Part_F_Guide.md)
Transition from guided labs to independent engineering. Extend the ecosystem's hardware telemetry, develop custom Purple Team attack scripts, and secure the overarching architecture with strict schema enforcement.

---

##  Competition Execution Mode
Ready to test your skills in a live-fire environment? Follow the **[Competition Guide](Competition_Guide.md)** to engage in an officially timed, multi-stage Red vs Blue exercise. 
- **The Teams**: Participants are split into 2 dedicated groups (Offense and Defense).
- **The Scoring System**: Points are awarded dynamically—Red earns points for verifiable exploitation flags; Blue earns points for verified patching and uptime.
- **The Crucible (The Switch)**: Roles strictly swap halfway through the competition to ensure full-spectrum comprehension of both adversarial and defensive mindsets.

---

##  Environment Setup & Initialization

1.  **Dependencies**: Execute `npm run install:all` in the repository root to populate all required Node modules.
2.  **Configuration**: Duplicate the `.env.example` file to create a localized `.env`.
3.  **Deployment**: Execute `npm run dev` to simultaneously launch the API backend, the React Dashboard, and the hardware simulator ecosystem.

> [!TIP]
> **Operational Workflow:** Open two distinct terminal instances. Dedicate one strictly for the Blue Team server infrastructure (`npm run dev`), and utilize the other exclusively for executing Red Team Python scripts or `curl` commands.
