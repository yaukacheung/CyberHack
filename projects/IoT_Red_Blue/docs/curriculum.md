# IoT Red vs Blue: Curriculum Roadmap

Welcome to the IoT Intrusion & Defense Capstone Project. This project is divided into six progressive parts, moving from basic discovery to advanced customization.

## 🧭 Learning Path

### [Phase A: Discovery & Networking](Part_A_Guide.md)
Learn how to map the IoT network and identify the central API server using `nmap`.

### [Phase B: NoSQL Injection](Part_B_Guide.md)
Exploit a common database vulnerability to uncover hidden devices on the network.

### [Phase C: Protocol Analysis & Brute Force](Part_C_Guide.md)
Intercept traffic to identify authentication patterns and launch a credential stuffing attack.

### [Phase D: Denial of Service (DoS)](Part_D_Guide.md)
Understand how resource exhaustion can disrupt critical IoT services.

### [Phase E: Blue Team Dashboard Analysis](Part_E_Guide.md)
Switch to the defense. Use the interactive dashboard to detect, correlate, and respond to the attacks launched in previous phases.

### [Phase F: Customization & Extension](Part_F_Guide.md)
Deep dive into the source code. Learn how to add new sensors, create custom alerts, and modify the dashboard visualization.

---

## 🏆 Competition Mode
Ready to test your skills? Follow the **[Competition Guide](Competition_Guide.md)** to engage in a timed Red vs Blue exercise. 
- **Teams**: 2 groups (Red and Blue).
- **Scoring**: Points for exploitation vs. points for remediation.
- **The Switch**: Roles swap halfway through to ensure full-spectrum mastery.

---

## 🛠️ Setup Instructions
1.  **Dependencies**: Run `npm run install:all` in the project root.
2.  **Config**: Copy `.env.example` to `.env`.
3.  **Start**: Run `npm run dev` to launch the entire environment.

> [!TIP]
> Use two terminal windows: one for the Blue Team Dashboard (`npm run dev`) and one for Red Team attacks (using `curl` or `malicious_node.js`).
